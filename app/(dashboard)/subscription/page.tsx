import {
  getCurrentSubscription,
  getAvailablePlans,
} from '@/actions/subscription.action';
import SubscriptionUsage from '@/components/subscription/usage';
import PricingPlans from '@/components/subscription/pricing-plans';
import { Card } from '@/components/ui/card';
import { Zap, Shield, Clock } from 'lucide-react';

export default async function SubscriptionPage() {
  const [currentSubscription, plans] = await Promise.all([
    getCurrentSubscription(),
    getAvailablePlans(),
  ]);

  return (
    <div className='relative min-h-screen'>
      <div className='relative container px-10 mx-auto py-10 space-y-12'>
        {/* Header Section */}
        <div className='text-center max-w-3xl mx-auto'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4'>
            Subscription & Usage
          </h1>
          <p className='text-muted-foreground text-lg'>
            Monitor your usage and upgrade your plan to unlock more features
          </p>
        </div>

        {/* Quick Stats */}
        <div className='grid md:grid-cols-3 gap-6'>
          <Card className='p-6 border-primary/20 bg-primary/5'>
            <div className='flex items-center gap-4'>
              <div className='p-3 rounded-full bg-primary/10'>
                <Zap className='h-6 w-6 text-primary' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Current Plan</p>
                <h3 className='text-xl font-semibold'>
                  {currentSubscription?.plan?.name || 'Free'}
                </h3>
              </div>
            </div>
          </Card>
          <Card className='p-6 border-primary/20 bg-primary/5'>
            <div className='flex items-center gap-4'>
              <div className='p-3 rounded-full bg-primary/10'>
                <Shield className='h-6 w-6 text-primary' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Status</p>
                <h3 className='text-xl font-semibold capitalize'>
                  {currentSubscription?.status || 'Active'}
                </h3>
              </div>
            </div>
          </Card>
          <Card className='p-6 border-primary/20 bg-primary/5'>
            <div className='flex items-center gap-4'>
              <div className='p-3 rounded-full bg-primary/10'>
                <Clock className='h-6 w-6 text-primary' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Next Billing</p>
                <h3 className='text-xl font-semibold'>
                  {currentSubscription?.currentPeriodEnd
                    ? new Date(
                        currentSubscription.currentPeriodEnd
                      ).toLocaleDateString()
                    : 'N/A'}
                </h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Usage Section */}
        <div className='relative'>
          <div className='absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl -z-10' />
          <SubscriptionUsage subscription={currentSubscription} />
        </div>

        {/* Pricing Plans */}
        <div className='relative pt-10'>
          <div className='absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/5 blur-2xl -z-10' />
          <PricingPlans currentPlan={currentSubscription?.plan} plans={plans} />
        </div>
      </div>
    </div>
  );
}
