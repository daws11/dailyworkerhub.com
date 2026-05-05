import type { Metadata } from "next";
import { MainNavbar } from "@/components/layout/MainNavbar";
import { LegalToc, type TocItem } from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Terms & Conditions - Daily Worker Hub",
  description: "Daily Worker Hub Terms & Conditions - Rules and conditions for using the daily worker marketplace platform in Indonesia.",
  keywords: ["terms of service", "user agreement", "platform rules", "dailyworkerhub"],
  openGraph: {
    title: "Terms & Conditions - Daily Worker Hub",
    description: "Daily Worker Hub Terms & Conditions - Rules and conditions for using the daily worker marketplace platform in Indonesia.",
    url: "https://dailyworkerhub.com/terms/en",
    siteName: "Daily Worker Hub",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions - Daily Worker Hub",
    images: ["/opengraph.jpg"],
  },
  alternates: {
    canonical: "https://dailyworkerhub.com/terms/en",
  },
};

const tocItems: TocItem[] = [
  { id: "section-1", title: "1. User Eligibility" },
  { id: "section-2", title: "2. User Types and Their Responsibilities" },
  { id: "section-3", title: "3. Prohibited Uses in the Hospitality Context" },
  { id: "section-4", title: "4. Escrow Fund and Payment Terms" },
  { id: "section-5", title: "5. Dispute Resolution" },
  { id: "section-6", title: "6. Limitation of Liability" },
  { id: "section-7", title: "7. Intellectual Property Rights" },
  { id: "section-8", title: "8. Account Suspension and Termination" },
  { id: "section-9", title: "9. Governing Law" },
  { id: "section-10", title: "10. Contact Information" },
];

export default function TermsEnPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavbar />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <LegalToc items={tocItems} />

            <div className="flex-1 max-w-4xl">
              <div className="prose prose-invert prose-slate max-w-none space-y-6">
            <h1 className="text-3xl font-bold text-foreground mb-8">Terms & Conditions</h1>
                <p className="text-muted-foreground leading-relaxed">
            Last updated: April 2026
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This policy should be read together with our{" "}
            <a href="/privacy/en" className="text-emerald-400 hover:text-emerald-300 underline">Privacy Policy</a>{" "}
            and{" "}
            <a href="/cookies/en" className="text-emerald-400 hover:text-emerald-300 underline">Cookie Policy</a>.
          </p>

          <section className="space-y-4">
            <h2 id="section-1" className="text-xl font-semibold text-foreground scroll-mt-24">1. User Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              To use Daily Worker Hub services as a worker or employer, 
              you must meet all of the eligibility requirements set out below. 
              By registering and using the platform, you represent and warrant that 
              you meet all of these requirements.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Age Requirement:</strong> You must be 
              at least 16 years of age at the time of registration. Users under 18 
              are considered minors and are responsible for ensuring they 
              have valid consent from a parent, guardian, or legal tutor before 
              using this platform for any commercial activity. Daily Worker Hub 
              does not actively verify age of majority but reserves the right to suspend 
              an account if an age violation is discovered.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Valid Identity:</strong> Each 
              user must provide true, accurate, and complete identity information 
              at the time of registration. Workers are required to verify their identity 
              through the verification system we provide, which may include 
              WhatsApp number verification and uploading official identity documents (KTP, SIM, 
              or passport). Employers are required to verify their business legality 
              before they can create job listings and make Escrow Fund deposits.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Blacklist Eligibility:</strong> Users 
              who have been previously blacklisted from the Daily Worker Hub platform due to 
              serious violations — including but not limited to fraud, harassment, 
              or Escrow Fund violations — are not permitted to create new accounts. Any 
              attempt to circumvent the blacklist by creating additional accounts will 
              be considered a serious violation and may result in appropriate legal action.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-2" className="text-xl font-semibold text-foreground scroll-mt-24">2. User Types and Their Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Worker Hub distinguishes between two main types of users with different rights and 
              obligations. Understanding your role is essential for 
              effective platform use and avoiding misunderstandings.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Employer:</strong> 
              Employers are businesses or individuals in the Bali hospitality sector — such as 
              hotels, restaurants, cafes, bars, villas, or event venues — that use 
              Daily Worker Hub to recruit daily workers. Employer responsibilities 
              include: creating accurate and non-misleading job descriptions, 
              setting fair prices that align with Bali industry standards, 
              depositing funds into the Escrow Fund before work begins, verifying 
              worker attendance at the start and end of each shift, approving or disputing completed 
              work within 24 hours of submission, and maintaining 
              professionalism in all interactions with workers. Employers who fail 
              to meet these responsibilities may face penalties including account suspension.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Worker (Daily Worker):</strong> 
              Workers are individuals who use Daily Worker Hub to find 
              daily work in the Bali hospitality sector. Worker responsibilities 
              include: completing a profile with accurate information and 
              verifiable portfolio, submitting attendance on time at 
              the start and end of shifts using the platform&apos;s attendance feature, 
              completing work according to the standards agreed upon with 
              the employer, communicating issues or inability to complete 
              work as soon as possible so the employer has time for contingency planning, 
              and maintaining professionalism and good work ethics throughout the engagement. 
              Workers who fail to meet their responsibilities may face penalties, 
              negative reviews, or blacklisting from the platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-3" className="text-xl font-semibold text-foreground scroll-mt-24">3. Prohibited Uses in the Hospitality Context</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Worker Hub has zero tolerance for platform misuse. 
              The following are explicitly prohibited uses, with 
              specific explanation of how these policies apply in the context of 
              the hospitality industry:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">No Show and Disappearance:</strong> Workers 
              who accept a job but fail to arrive at the employer&apos;s location without 
              providing adequate notice (at least 2 hours before the shift starts) 
              will be sanctioned with temporary suspension for 
              their first offense. Repeated offenses will result in permanent blacklisting. 
              Employers who, after approving a worker, cancel a shift 
              less than 12 hours before its start without valid justification will 
              also receive sanctions, as this causes workers to lose 
              other job opportunities.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Fake Attendance Records:</strong> 
              Workers who deliberately manipulate the attendance feature — including 
              using fake locations (VPN for GPS spoofing), recording attendance 
              on behalf of another worker, or using fake photos/screenshots for 
              check-in — will be immediately blacklisted and the held Escrow Funds 
              may be forfeited. Employers who deliberately manipulate records to 
              avoid payment will also face the same consequences. 
              Daily Worker Hub reserves the right to provide historical attendance data to 
              affected employers for verification purposes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Work Quality Standards:</strong> 
              Workers are expected to complete work according to reasonable 
              standards for their respective positions. Employers who find unsatisfactory 
              work quality must communicate this through the platform 
              system within 24 hours of work completion. Workers who 
              repeatedly receive quality complaints — after mediation 
              and opportunity for improvement — may be blacklisted. Excluded 
              from this category are normal differences of opinion about 
              work preferences, as long as the work meets acceptable minimum standards.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Harassment and Unprofessional Conduct:</strong> 
              All forms of harassment — including but not limited to sexual 
              harassment, discriminatory comments based on religion, ethnicity, gender, or 
              sexual orientation, bullying, or intimidation — whether from an employer or 
              worker is strictly prohibited and may be reported through the dispute system. 
              In proven cases, the offender will be permanently blacklisted without 
              opportunity for appeal, and in cases involving physical or 
              sexual threats, we will submit evidence to the relevant authorities.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Off-Platform Transactions:</strong> 
              Both employers and workers are prohibited from conducting financial 
              transactions directly outside the Daily Worker Hub Escrow System to avoid 
              platform fees. This violation will result in account suspension and 
              disqualification from the platform, as it also removes 
              the buyer/seller protection that is our core value proposition.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-4" className="text-xl font-semibold text-foreground scroll-mt-24">4. Escrow Fund and Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Escrow System is the foundation of trust in the Daily Worker Hub platform. 
              By using the platform, you agree to be bound by the following 
              Escrow Fund terms explained in detail below.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Deposit by Employer:</strong> Before 
              work begins, the employer must deposit funds into the Daily Worker Hub 
              Escrow System in the amount agreed upon with the worker for the 
              daily job service. These funds are held by the platform and cannot 
              be withdrawn by the employer while work is in progress. Deposits 
              are made through our supported payment methods — currently including 
              local Indonesian bank transfers and virtual accounts — and the deposited funds 
              will appear as &quot;pending&quot; on the employer&apos;s dashboard until work begins.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Fund Release to Workers:</strong> 
              After the worker completes the job and submits a completion notice, 
              the employer has a 24-hour window to verify the quality and quantity of 
              the work. If the employer is satisfied, they approve the fund release and the Escrow Funds 
              will be transferred to the worker&apos;s wallet on the platform. The worker can then 
              withdraw to their bank account. Withdrawals typically 
              take 1-3 business days depending on the destination bank.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Escrow Disputes:</strong> If the employer 
              is dissatisfied with the work, they may file a dispute within 24 hours of 
              submission. Funds will remain held in the Escrow Fund until the dispute is resolved through 
              our mediation process. During a dispute, both employer and worker may 
              submit supporting evidence — work result photos, conversation history, attendance 
              records — to strengthen their positions. Our mediation team will 
              decide based on the available evidence. If the dispute cannot be resolved 
              internally, it will be directed to arbitration.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Transaction Fees:</strong> Daily Worker Hub 
              charges a small Platform Fee for each successful Escrow transaction. 
              This fee is deducted from the gross Escrow amount before funds are released to the worker. 
              The fee amount is transparent and displayed to the employer before deposit 
              is made, so there are no hidden charges. The Employer bears 
              the entire Platform Fee so that the worker receives the agreed net amount.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-5" className="text-xl font-semibold text-foreground scroll-mt-24">5. Dispute Resolution</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Worker Hub provides a tiered dispute resolution process to handle 
              conflicts between employers and workers. Our goal is to resolve disputes 
              fairly, quickly, and with minimal cost to both parties.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Internal Mediation:</strong> Disputes will first 
              be handled through an internal mediation process conducted by our 
              customer success team. Both parties are asked to submit written 
              explanations of their perspectives within 48 hours of the dispute 
              being initiated. The mediation team then reviews the submitted evidence — 
              including attendance records, conversation history, photos, and more — and provides 
              a resolution recommendation within 5 business days. This recommendation is not 
              binding, but the majority of disputes are resolved at this stage.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Arbitration:</strong> If mediation does not 
              reach an agreement, the dispute will escalate to the arbitration stage where 
              an independent arbitrator — appointed by Daily Worker Hub from 
              a panel of professionals with experience in the hospitality industry — 
              will issue a binding decision for both parties. The arbitrator&apos;s 
              decision is final and cannot be appealed through the platform. 
              Arbitration costs will be borne by the losing party, unless 
              the arbitrator decides otherwise due to exceptional circumstances.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Platform Limitations:</strong> It should be 
              noted that Daily Worker Hub acts as an intermediary only. 
              We do not guarantee specific outcomes in disputes and have no 
              obligation to provide compensation beyond the amount of Escrow Funds 
              held on the platform for the disputed transaction. Users who disagree 
              with an arbitration decision may still pursue legal remedies through 
              the available legal channels in Indonesia.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-6" className="text-xl font-semibold text-foreground scroll-mt-24">6. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Worker Hub is established as a platform that facilitates labor 
              exchange in the hospitality sector, not as a party that 
              directly employs or provides workers. This clarification is important 
              to understand so that your expectations of the platform are aligned with 
              reality.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Platform as Intermediary:</strong> 
              Daily Worker Hub is never a party to the employment contract between 
              employer and worker. We provide a platform to connect both 
              parties, facilitate Escrow Fund payments, and provide tools 
              for attendance management and communication. We do not directly supervise 
              the work performed by workers at the employer&apos;s location, are not 
              responsible for the quality of work results, and have no control over 
              the work environment at the employer&apos;s premises.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Force Majeure:</strong> Daily Worker Hub 
              is not responsible for failure or delay in fulfilling 
              our obligations caused by events beyond our reasonable 
              control — including but not limited to natural disasters (earthquakes, 
              tsunamis, volcanic eruptions), outbreaks or pandemics that 
              require regional quarantine, sudden government policies 
              prohibiting certain business activities, widespread power or internet 
              outages, or critical third-party infrastructure 
              failures (such as payment providers or infrastructure) outside our control.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Indemnification:</strong> To the fullest 
              extent permitted by applicable law, Daily Worker Hub, 
              its directors, employees, and affiliates shall not be liable for 
              indirect, incidental, special, consequential, or punitive 
              damages arising from the use or inability to use the platform, 
              including but not limited to loss of profits, loss of data, 
              or loss of opportunity related to failed jobs or absent 
              workers. Our liability in any event is limited to the total 
              amount of fees you have paid to us in the 12 months prior to 
              the event giving rise to the claim.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-7" className="text-xl font-semibold text-foreground scroll-mt-24">7. Intellectual Property Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content available on the Daily Worker Hub platform — including but 
              not limited to logos, trademarks, interface design, text, graphics, 
              button icons, and software code — is the property of Daily Worker Hub or 
              its licensors and is protected by Indonesian and international copyright, 
              trademark, and intellectual property laws.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">User Content:</strong> Users 
              retain ownership of content they submit to the platform — 
              including job descriptions created by employers, photos and 
              worker portfolios, and chat messages. By posting content on 
              the platform, you grant Daily Worker Hub a non-exclusive, 
              worldwide, royalty-free license to use, reproduce, modify, 
              and distribute such content solely for platform operational 
              purposes — for example, displaying job descriptions to suitable 
              candidates or storing worker portfolios to present to employers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Prohibited Use:</strong> 
              You are not permitted to copy, reproduce, frame, scrape, 
              or systematically extract platform content for commercial purposes 
              without our written consent. Using platform data or content 
              to train machine learning models or AI systems without permission is also 
              a violation of our intellectual property rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-8" className="text-xl font-semibold text-foreground scroll-mt-24">8. Account Suspension and Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Worker Hub reserves the right to suspend or terminate user accounts under 
              certain conditions we have specified. Below is an 
              explanation of these conditions:
            </p>
              <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Temporary Suspension:</strong> 
              An account may be temporarily suspended for investigation if we 
              suspect suspicious activity — including but not 
              limited to logins from multiple unusual locations, 
              transaction patterns inconsistent with normal usage, 
              or reports from other users about suspicious behavior. 
              During the suspension period, the user cannot log in or use 
              platform functionality. The investigation will be completed within 
              a maximum of 14 days, and the account will be restored if the investigation proves 
              that no violation occurred.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Suspension with Cause:</strong> 
              An account may be suspended for longer durations — ranging from 
              7 days to 90 days — as a sanction for moderate violations 
              such as repeated no-shows, failure to respond to disputes, or 
              unprofessional platform use. During the suspension period, 
              users lose access to platform features but their data 
              remains stored.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Permanent Termination (Blacklist):</strong> 
              An account may be permanently terminated and the user blacklisted from 
              the platform for serious violations such as: fraud or breach of 
              Escrow Fund trust, proven harassment or discrimination, 
              attendance or system manipulation, creating multiple accounts to 
              circumvent blacklist, or illegal activities using the platform. 
              Blacklisted users lose permanent access to their accounts and 
              their data, and are not permitted to create new accounts with the same information.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Voluntary Termination:</strong> Users 
              may voluntarily deactivate their accounts at any time through the 
              settings menu in the dashboard. Deactivated accounts enter a 30-day 
              grace period during which the account can be restored. After 30 days, the account will 
              be permanently deleted but transaction data will be retained for 
              compliance in accordance with our retention policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-9" className="text-xl font-semibold text-foreground scroll-mt-24">9. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms and Conditions, and any dispute or claim arising 
              from or related to them, are governed by and construed in accordance with 
              the laws of the Republic of Indonesia without regard to principles of conflict of laws.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Jurisdiction:</strong> You agree that 
              any dispute that cannot be resolved through our internal mediation 
              and arbitration processes shall be submitted to the court having 
              jurisdiction in the territory of the Republic of Indonesia, specifically 
              the South Jakarta District Court as the court of first instance, 
              except for users in other regions of Indonesia who specifically 
              agree to use another court closer to their domicile.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Indonesian Legal Compliance:</strong> 
              Daily Worker Hub is operated as a fully compliant platform under 
              applicable Indonesian laws and regulations, including but not 
              limited to Law No. 11 of 2008 on Electronic Information and Transactions 
              (ITE Law), Law No. 14 of 2019 on Personal Data Protection (PDP Law), 
              and applicable tax regulations for digital platforms and Escrow 
              transactions. Users are responsible for ensuring that their platform 
              use also complies with all applicable laws in their respective 
              jurisdictions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-10" className="text-xl font-semibold text-foreground scroll-mt-24">10. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions, complaints, or wish to report a violation 
              of the Terms and Conditions, please contact us through the communication 
              channels available below.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Email:</strong> Contact our customer 
              support team at support@dailyworkerhub.com for general questions about 
              platform use, or at legal@dailyworkerhub.com for requests 
              related to legal aspects of the Terms and Conditions. We strive to 
              respond within 2-3 business days.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">In-Platform:</strong> For 
              questions about your account or ongoing disputes, use 
              the chat feature available on your dashboard to connect with our 
              customer success team directly.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Website:</strong> Visit our 
              Contact Us page at dailyworkerhub.com for complete contact information 
              including our office address, phone numbers available 
              during business hours (09:00-17:00 WIB), and a contact 
              form for specific requests.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We appreciate your trust in using Daily Worker Hub as 
              a partner in recruiting workers in the hospitality industry. We 
              will continue to strive to provide a safe, fair, 
              and effective platform for all our users.
            </p>
          </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
