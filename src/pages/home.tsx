import { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/common/Header.tsx';
import Footer from '../components/common/Footer.tsx';
import HeroSection from '../components/HeroSection';
import CompanyLogos from '../components/CompanyLogos';
import CTASection from '../components/CTASection';
import ChallengesSection from '../components/ChallengesSection';
import SolutionSection from '../components/SolutionSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ApproachSection from '../components/ApproachSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import ComparisonSection from '../components/ComparisonSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';

const ResAILandingPageV2: FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <title>ResAI Career Engineering Platform | ATS Resume Optimization & Career Roadmap</title>
        <meta name="description" content="Transform your career with ResAI's AI-powered platform. Get ATS-optimized resumes, skill gap analysis, and personalized career roadmaps for Indian professionals. Join 3200+ successful career switchers." />
        <meta property="og:title" content="ResAI Career Engineering Platform | ATS Resume Optimization & Career Roadmap" />
        <meta property="og:description" content="Transform your career with ResAI's AI-powered platform. Get ATS-optimized resumes, skill gap analysis, and personalized career roadmaps for Indian professionals. Join 3200+ successful career switchers." />
      </Helmet>

      <main className="w-full bg-white overflow-x-hidden">
        <Header />
        <HeroSection />
        <CompanyLogos />
        <CTASection />
        <ChallengesSection />
        <SolutionSection />
        <HowItWorksSection />
        <ApproachSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <ComparisonSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default ResAILandingPageV2;
