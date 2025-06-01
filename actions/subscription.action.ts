'use server';

import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function createSubscription(planId: string) {
  try {
    const auth = await currentUser();
    if (!auth?.id) throw new Error('Unauthorized');

    const user = await prisma.user.findUnique({
      where: { externalId: auth.id },
      include: { subscription: true },
    });

    if (!user) throw new Error('User not found');

    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) throw new Error('Plan not found');

    // Create or get Stripe customer
    let stripeCustomerId = user.subscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: { userId: user.id },
      });
      stripeCustomerId = customer.id;
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: plan.stripePriceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // Save to database
    await prisma.subscription.create({
      data: {
        userId: user.id,
        planId: plan.id,
        stripeCustomerId,
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    return {
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error('Subscription creation error:', error);
    throw error;
  }
}

export async function cancelSubscription() {
  try {
    const auth = await currentUser();
    if (!auth?.id) throw new Error('Unauthorized');

    const user = await prisma.user.findUnique({
      where: { externalId: auth.id },
      include: { subscription: true },
    });

    if (!user?.subscription) throw new Error('No active subscription found');

    // Cancel at period end
    await stripe.subscriptions.update(user.subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    // Update local subscription
    await prisma.subscription.update({
      where: { id: user.subscription.id },
      data: { cancelAtPeriodEnd: true },
    });

    return { success: true };
  } catch (error) {
    console.error('Subscription cancellation error:', error);
    throw error;
  }
}

export async function getCurrentSubscription() {
  try {
    const auth = await currentUser();
    if (!auth?.id) throw new Error('Unauthorized');

    const user = await prisma.user.findUnique({
      where: { externalId: auth.id },
      include: {
        subscription: {
          include: {
            plan: true,
          },
        },
      },
    });

    if (!user) throw new Error('User not found');

    // If no subscription exists, return default free plan details
    if (!user.subscription) {
      return {
        plan: {
          id: 'free',
          name: 'Free Plan',
          type: 'FREE',
          price: 0,
          interval: 'monthly',
          features: [
            '1,000 responses/month',
            'Basic analytics',
            'Email support',
            'Standard integrations',
          ],
          stripePriceId: 'price_free',
        },
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        cancelAtPeriodEnd: false,
      };
    }

    return user.subscription;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    throw error;
  }
}

export async function updateSubscription(priceId: string) {
  try {
    const auth = await currentUser();
    if (!auth?.id) throw new Error('Unauthorized');

    const user = await prisma.user.findUnique({
      where: { externalId: auth.id },
      include: { subscription: true },
    });

    if (!user?.subscription) throw new Error('No active subscription found');

    // Update subscription
    const subscription = await stripe.subscriptions.retrieve(
      user.subscription.stripeSubscriptionId
    );

    await stripe.subscriptions.update(subscription.id, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceId,
        },
      ],
      proration_behavior: 'always_invoice',
    });

    return { success: true };
  } catch (error) {
    console.error('Subscription update error:', error);
    throw error;
  }
}

export async function getAvailablePlans() {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: { price: 'asc' },
    });
    return plans;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
}

export async function createCheckoutSession(planId: string) {
  try {
    const auth = await currentUser();
    if (!auth?.id) throw new Error('Unauthorized');

    const user = await prisma.user.findUnique({
      where: { externalId: auth.id },
    });

    if (!user) throw new Error('User not found');

    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) throw new Error('Plan not found');

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription`,
      customer_email: user.email!,
      metadata: {
        userId: user.id,
        planId: plan.id,
      },
    });

    return { url: session.url };
  } catch (error) {
    console.error('Checkout session creation error:', error);
    throw error;
  }
}
