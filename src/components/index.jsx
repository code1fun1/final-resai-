import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import HeroSection from './HeroSection';
import CompanyLogos from './CompanyLogos';
import CTASection from './CTASection';
import ChallengesSection from './ChallengesSection';
import SolutionSection from './SolutionSection';
import HowItWorksSection from './HowItWorksSection';
import ApproachSection from './ApproachSection';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import PricingSection from './PricingSection';
import ComparisonSection from './ComparisonSection';

const Homepage = () => {
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
        <Footer />
      </main>
    </>
  );
};

export default Homepage;