import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from "../utilities/Seo";

const AboutPage = () => {
  return (
    <>
      <Seo />
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none font-buttons-button-lg">
        <div
          className="container mt-[50px] mb-[auto] my-6 mx-auto p-[20px] w-[90%]"
          style={{
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="w1-[132px] mq360:w-[auto] flex flex-col items-start justify-start pt-px px-0 pb-0 box-border">
              <img
                className="h-10 relative max-w-full overflow-visible shrink-0 object-cover mq360:ms-[8px] mq550:max-w-[116px]"
                alt=""
                src="/logo@2x.png"
              />
            </div>
          </div>

          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Us</h1>

            <div className="bg-white rounded-lg shadow p-6 md:p-8 mb-10">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                ResAI is a one-stop, AI-powered career platform designed to help you grow with clarity, confidence, and purpose. From building a powerful job specific resume to interview prep to upskilling plan, ResAI brings everything you need into one seamless experience.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                We believe career growth shouldn't be confusing or overwhelming. It should be clear, guided, and accessible to everyone.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Founded in 2023, ResAI was built to simplify the way people approach their careers. Behind ResAI is a team of experienced professionals, career experts, and AI specialists who understand what it takes to succeed in today's evolving job market. Together, we combine human expertise with intelligent technology to deliver guidance you can trust.
              </p>
              <p className="mb-10 text-muted-foreground leading-relaxed">
                ResAI is built by JupiterBrains, an AI-first technology company focused on building intelligent systems that enhance decision-making, automate workflows, and unlock human potential. This foundation allows us to deliver faster, smarter, and more personalized career support at scale.
              </p>

              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <svg className="lucide lucide-target h-5 w-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                What We Do
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We help individuals take control of their careers with tools designed for real growth:
              </p>
              <ul className="list-disc pl-6 mb-10 space-y-2 text-muted-foreground">
                <li>AI-powered resume creation and optimization</li>
                <li>Personalized career path guidance</li>
                <li>Skill recommendations aligned with your goals</li>
                <li>Data-driven insights for better career decisions</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <svg className="lucide lucide-users h-5 w-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Our Mission
              </h2>
              <p className="mb-10 text-muted-foreground leading-relaxed">
                To make career growth simple, intelligent, and accessible for everyone.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-6">Reach us out at</h2>
              <div className="space-y-6">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <svg className="lucide lucide-mail h-5 w-5 text-primary flex-shrink-0 self-center" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <p className="font-semibold text-base leading-none">Email</p>
                  </div>
                  <a href="mailto:resaiadmin@resai.co" className="text-primary hover:underline ml-7 leading-none -mt-2">resaiadmin@resai.co</a>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <svg className="lucide lucide-phone h-5 w-5 text-primary flex-shrink-0 self-center" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <p className="font-semibold text-base leading-none">Phone</p>
                  </div>
                  <p className="text-muted-foreground ml-7 leading-none -mt-2">+91-9985308286</p>
                </div>
              </div>

              <div className="mt-8 flex flex-row justify-center gap-3">
                <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-3 py-1">
                    Privacy Policy
                  </button>
                </Link>
                <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-3 py-1">
                    Terms &amp; Conditions
                  </button>
                </Link>
                <Link to="/refund-policy" target="_blank" rel="noopener noreferrer">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-3 py-1">
                    Refund Policy
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
