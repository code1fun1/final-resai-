import React from 'react';
import { Seo } from "../utilities/Seo";
const RefundPolicyPage = () => {
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
            <h1 className="text-3xl font-bold mb-8 text-center">Returns &amp; Refund Policy</h1>

            <div className="p-6 md:p-8">
              <p className="text-muted-foreground mb-6">
                <strong>Effective Date</strong>: May 18, 2025
              </p>

              <p className="mb-8">
                This Returns &amp; Refund Policy outlines the terms under which ResAI website offers refunds for services purchased via{' '}
                <a href="https://resai.co/" className="text-primary hover:underline">
                https://resai.co/
                </a>{' '}
                or through direct engagement.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Service Nature</h2>
                <p>
                  All services provided by ResAI are digital, customized, and knowledge-based (e.g., business plans, websites, marketing strategies).
                  Due to the nature of these services, we do not offer returns once the service has been rendered.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Refund Eligibility</h2>
                <p className="mb-4">Refunds may be considered in the following cases:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>
                    <strong>Technical failure on our part</strong>: If a product or service fails to function due to a verifiable error on our end and we are unable to resolve it within a reasonable timeframe.
                  </li>
                  <li>
                    <strong>Duplicate Payment</strong>: If the same transaction is charged more than once.
                  </li>
                  <li>
                    <strong>Non-delivery</strong>: If a service is not delivered and no work has started.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Refund Process</h2>
                <p className="mb-4">To request a refund:</p>
                <ol className="list-decimal pl-6 mb-4 space-y-3">
                  <li>
                    Email us at{' '}
                    <a href="mailto:resaiadmin@resai.co" className="text-primary hover:underline">
                    resaiadmin@resai.co
                    </a>{' '}
                    with:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Order ID or Invoice</li>
                      <li>Reason for refund request</li>
                      <li>Proof (if applicable)</li>
                    </ul>
                  </li>
                  <li>Our team will respond within 7 business days.</li>
                  <li>If approved, the refund will be processed within 10 business days via your original method of payment.</li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. No Refund Scenarios</h2>
                <p className="mb-4">Refunds will not be issued in the following cases:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Services have been delivered and accepted</li>
                  <li>Change of mind after work has started</li>
                  <li>Delay caused by client in providing required inputs</li>
                  <li>Custom code or website assets already handed over</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Dispute Resolution</h2>
                <p>
                  In case of disagreements, we encourage direct resolution. If unresolved, disputes shall be governed by the laws of India and fall under the jurisdiction of the courts in Bangalore, Karnataka.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                <p className="mb-4">For any refund-related queries:</p>
                <p className="mb-1">
                  <strong>ResAI website</strong>
                </p>
                <p className="mb-1">
                  Email:{' '}
                  <a href="mailto:resaiadmin@resai.co" className="text-primary hover:underline">
                  resaiadmin@resai.co
                  </a>
                </p>
                <p>Phone: +91-9985308286</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicyPage;
