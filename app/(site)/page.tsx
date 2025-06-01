import Wrapper from '@/components/global/wrapper';
import Analysis from '@/components/marketing/analysis';
import CTA from '@/components/marketing/cta';
import Features from '@/components/marketing/features';
import { Footer } from '@/components/marketing/footer';
import Hero from '@/components/marketing/hero';
import Integration from '@/components/marketing/integration';
import { Header } from '@/components/marketing/navbar';
import { WhyChooseUs } from '@/components/marketing/why-choose-us';
import HowToUse from '@/components/Home/how-to-use';
import FeedbackDashboard from '@/components/Home/FeedbackDashboard';
import PricingSection from '@/components/Home/Pricing';

export default function HomePage() {
  return (
    <main>
      <Wrapper className='pt-20 relative'>
        <Header />
        <Hero />
        <WhyChooseUs />
        <Features />
        <HowToUse />
        <Analysis />
        {/* <UseCases /> */}
        <FeedbackDashboard />
        <Integration />
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        <PricingSection />
        <CTA />
      </Wrapper>
      <Footer />
    </main>
  );
}
