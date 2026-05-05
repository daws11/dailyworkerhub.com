import type { Metadata } from "next";
import { MainNavbar } from "@/components/layout/MainNavbar";
import { LegalToc, type TocItem } from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Privacy Policy - Daily Worker Hub",
  description: "Daily Worker Hub Privacy Policy - Learn how we collect, use, and protect your personal data as a platform user.",
  keywords: ["privacy policy", "personal data", "data protection", "dailyworkerhub"],
  openGraph: {
    title: "Privacy Policy - Daily Worker Hub",
    description: "Daily Worker Hub Privacy Policy - Learn how we collect, use, and protect your personal data.",
    url: "https://dailyworkerhub.com/privacy/en",
    siteName: "Daily Worker Hub",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Daily Worker Hub",
    images: ["/opengraph.jpg"],
  },
  alternates: {
    canonical: "https://dailyworkerhub.com/privacy/en",
  },
};

const tocItems: TocItem[] = [
  { id: "section-1", title: "1. Information We Collect" },
  { id: "section-2", title: "2. How We Use Your Data" },
  { id: "section-3", title: "3. Legal Basis for Data Processing" },
  { id: "section-4", title: "4. Third-Party Service Integrations" },
  { id: "section-5", title: "5. Data Retention and Deletion" },
  { id: "section-6", title: "6. Security Measures We Implement" },
  { id: "section-7", title: "7. Your Rights as a Data Subject" },
  { id: "section-8", title: "8. Children's Privacy" },
  { id: "section-9", title: "9. International Data Transfers" },
  { id: "section-10", title: "10. How to Contact Us" },
];

export default function PrivacyEnPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavbar />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <LegalToc items={tocItems} />

            <div className="flex-1 max-w-4xl">
              <div className="prose prose-invert prose-slate max-w-none space-y-6">
                <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
                <p className="text-muted-foreground leading-relaxed">
                  Last updated: April 2026
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Use of the Daily Worker Hub platform is also subject to our{" "}
                  <a href="/terms/en" className="text-emerald-400 hover:text-emerald-300 underline">Terms &amp; Conditions</a>{" "}
                  and{" "}
                  <a href="/cookies/en" className="text-emerald-400 hover:text-emerald-300 underline">Cookie Policy</a>. 
                  Please read both policies for a comprehensive understanding.
                </p>

                <section className="space-y-4">
                  <h2 id="section-1" className="text-xl font-semibold text-foreground scroll-mt-24">1. Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Daily Worker Hub collects information from you in several main categories to 
                    operate the marketplace platform that connects daily hospitality workers 
                    with businesses in Bali. The first type of information we collect is basic identity 
                    data you provide when registering: full name as per ID card or passport, active 
                    email address used for account confirmation and important notifications, 
                    WhatsApp phone number which serves as the primary communication channel between workers and employers, and 
                    date of birth to verify user age eligibility.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    For employers or businesses registering their business, we collect the business name 
                    according to legal documents, business address, tax identification number (NPWP) or business registration number (NIB) for tax and 
                    compliance purposes, and bank account information used to send and 
                    receive Escrow Funds. For workers, we collect additional profile data 
                    such as hospitality job categories mastered (housekeeping, F&B service, 
                    bartender, kitchen helper, receptionist), domicile location in Bali for 
                    job matching, and portfolio or training certificates if available.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We also automatically collect device and usage information when 
                    you access the platform. This includes the IP address used to determine 
                    service location, device type and operating system for display optimization, 
                    browser used to ensure feature compatibility, activity logs 
                    recording the features used and timestamps, and cookies and similar 
                    data as described in our Cookie Policy. This usage information 
                    is collected to improve security, detect anomalous activity, and 
                    understand platform usage patterns in aggregate.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    In certain situations, particularly when disputes arise between workers and employers, 
                    we may collect additional data including Escrow Fund transaction history, attendance 
                    records submitted through the platform, communication history through our 
                    chat system, and supporting evidence uploaded by both parties for 
                    the mediation process. All of this data is stored with encryption and only accessed by 
                    authorized personnel in the context of dispute resolution.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-2" className="text-xl font-semibold text-foreground scroll-mt-24">2. How We Use Your Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The personal data we collect is used primarily to provide and 
                  maintain the operation of the Daily Worker Hub marketplace platform. Below are 
                  specific uses by data category:
                </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Core Service Provision:</strong> Your name, email, 
                    and WhatsApp number are used to create and manage your account, verify 
                    identity at login, authenticate every transaction performed, and 
                    uniquely identify you in the system. Without this identity data, 
                    the platform cannot distinguish one user from another, and the 
                    Escrow Fund feature cannot operate because there is no reference to connect 
                    deposits with the correct beneficiary.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Escrow Fund Transaction Processing:</strong> Bank 
                    account information and identity data are used exclusively to process deposits 
                    from employers to the Escrow Fund, hold funds in the Escrow account, release funds to workers 
                    after approval, and process withdrawals to workers&apos; bank accounts. 
                    Each step in the Escrow workflow requires identity validation to ensure 
                    funds reach the correct person and match the agreed amount.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Communication and Notifications:</strong> Email addresses 
                    and WhatsApp numbers are used to send Escrow Fund transaction confirmations 
                    (deposit received, funds released, withdrawal completed), work schedule notifications 
                    and attendance reminders, information on new job listings matching the worker&apos;s 
                    profile, messages from employers or workers regarding daily projects, and security alerts 
                    such as logins from new devices or password changes.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Fraud Prevention and Abuse Prevention:</strong> 
                    We use usage data and device information to detect suspicious 
                    activities such as logins from multiple locations in a short time, 
                    unusual deposit and withdrawal patterns, attempts to create multiple 
                    accounts with similar data, and platform use for illegal activities. 
                    If the system detects anomalies, we may temporarily restrict account 
                    functionality and contact the user for additional verification.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Product Improvement:</strong> Analytics data 
                    collected through cookies and activity logs is used to understand how 
                    users interact with platform features. These insights help us 
                    identify pain points in the registration flow, discover features that are 
                    rarely used and need simplification, optimize platform performance 
                    for the most commonly used devices and browsers, and develop new 
                    features that match the actual needs of Bali hospitality users.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-3" className="text-xl font-semibold text-foreground scroll-mt-24">3. Legal Basis for Data Processing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In accordance with Indonesia&apos;s applicable Personal Data Protection Law (UU PDP), 
                    Daily Worker Hub processes your personal data based on several valid 
                    legal bases depending on the context and purpose of processing:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Contract Performance:</strong> Data processing 
                    necessary to fulfill our contractual obligations to you — namely 
                    providing a fully functioning marketplace platform — is carried out on the basis 
                    of contract performance. When you agree to the Terms & Conditions and create an account, 
                    a service contract is formed between you and Daily Worker Hub. Data such as 
                    name, email, WhatsApp number, and bank account information is necessary to 
                    execute this contract, particularly to operate the Escrow Fund feature where 
                    users&apos; trust funds must be managed transparently and securely.
                  </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Legitimate Interests:</strong> We process 
                  certain data based on our legitimate interests as a platform operator to 
                  maintain system security and integrity. This includes fraud detection and prevention, 
                  monitoring of service misuse, data backup for disaster recovery, and 
                  product improvement based on usage analytics. These legitimate interests do not 
                  apply if your fundamental interests or rights as a data subject 
                  override them.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Consent:</strong> For 
                  certain data processing not covered by contract or legitimate interests, 
                  we request your explicit consent. Examples include sending 
                  marketing communications about new features or special promotions, integration 
                  with optional third-party services, and non-essential analytics cookies. 
                  You may withdraw this consent at any time through your account settings or 
                  by contacting us, and withdrawal of consent will not affect 
                  processing previously carried out.
                </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Legal Compliance:</strong> Under certain 
                    conditions, we may be required by law to process or disclose your 
                    data — for example, compliance with tax authority requests, court 
                    proceedings, or reporting obligations to law enforcement regarding 
                    suspicious financial transactions.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-4" className="text-xl font-semibold text-foreground scroll-mt-24">4. Third-Party Service Integrations</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Daily Worker Hub integrates several third-party services that are directly 
                    involved in platform operations. These parties have access to 
                    certain data according to their respective functions and are subject to 
                    data processing agreements with us:
                  </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Supabase (Database and Authentication):</strong> 
                  Supabase is the backend-as-a-service that handles Daily Worker Hub&apos;s data storage and user 
                  authentication. All profile data, Escrow Fund transaction history, and work 
                  records are managed in the Supabase database located in cloud infrastructure 
                  with end-to-end encryption. When you log in to the platform, Supabase handles 
                  the authentication process — verifying credentials, generating session tokens, and 
                  managing refresh tokens. Supabase also manages Row Level Security (RLS) that 
                  ensures each user can only access data they are entitled to. 
                  As a data processor, Supabase does not use your data for its own 
                  purposes and only processes it according to Daily Worker Hub&apos;s instructions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Third-Party Payment Provider:</strong> 
                  Our payment provider is a payment gateway that processes all financial transactions on our platform, 
                  including Escrow Fund deposits from employers and withdrawals for workers. When you 
                  make a deposit, payment data (card numbers or virtual account numbers) is processed 
                  directly by our payment provider — Daily Worker Hub never stores full card or 
                  bank account data. The payment provider handles compliance with PCI-DSS standards for 
                  payment data security, currency conversion if needed, fund settlement 
                  to local Indonesian bank accounts, and transaction success or failure notifications. 
                  Processed transaction data includes amount, timestamp, payment status, 
                  and idempotency references to prevent duplicate charges.
                </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Firebase Cloud Messaging (Push Notifications):</strong> 
                    FCM is used to send push notifications to user devices — whether 
                    via web browser or mobile app if we develop a native application in the future. 
                    These notifications cover Escrow Fund confirmations (deposit received, funds 
                    released), attendance reminders workers must submit, dispute 
                    resolution status updates, and platform announcements such as maintenance windows or 
                    new features. To send notifications, FCM stores registration tokens 
                    generated per device per browser. These tokens are not linked to personal 
                    identity data unless you are logged in, and you can disable notifications 
                    through browser settings or account settings at any time.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Firebase Analytics:</strong> We use 
                    Firebase Analytics to understand user behavior on the platform in aggregate. 
                    This analytics collects user interactions such as page views, button clicks, 
                    feature usage patterns, and conversion events in work flows (e.g. how 
                    many employers successfully complete their first deposit). This data 
                    is anonymous and cannot be used to identify you 
                    individually. Firebase Analytics does not share this data with advertisers or 
                    other third parties.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-5" className="text-xl font-semibold text-foreground scroll-mt-24">5. Data Retention and Deletion</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your personal data only for as long as necessary for the purposes 
                    described in this policy. Retention periods vary depending 
                    on the type of data and its purpose of use:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Account and Profile Data:</strong> Basic identity 
                    data (name, email, WhatsApp number) and profile information is retained for as long as your account is active. 
                    If you deactivate or delete your account, data enters a 30-day 
                    quarantine period during which you can restore your account. After 30 days without restoration, 
                    profile data will be deleted from active systems, except for transaction history 
                    data that may be required for tax compliance retention of 10 years 
                    in accordance with Indonesian tax regulations.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Escrow Fund Transaction Data:</strong> Escrow 
                    Fund transaction records, including deposits, holds, releases, and withdrawals, are retained 
                    for a minimum of 10 years for Indonesian tax and financial regulatory compliance. 
                    This data includes transaction ID, amount, timestamp, status, and references 
                    to the involved user accounts. Even after an account is deleted, this transaction 
                    data remains retained for audit and legal compliance purposes.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Activity and Security Logs:</strong> Logs 
                    recording logins, settings changes, and security activities are retained 
                    for 2 years for security audit and incident investigation purposes. 
                    These logs help us reconstruct suspicious activities in the event of 
                    unauthorized access or fraud.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Cookies and Analytics Data:</strong> Cookies 
                    stored in your browser have durations described in the 
                    Cookie Policy — from session cookies that expire when the browser closes 
                    to analytics cookies that persist for 12 months. Aggregated analytics data that 
                    has been anonymized may be retained indefinitely for comparative analysis 
                    and trend reporting.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Dispute Data:</strong> In the event of a dispute 
                    between a worker and employer, dispute-related data (submissions from both 
                    parties, communications, evidence, and resolution) is retained for 5 
                    years after the dispute is resolved for reference and potential appeal purposes. 
                    This ensures that if a related subsequent dispute arises, supporting data 
                    remains available.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-6" className="text-xl font-semibold text-foreground scroll-mt-24">6. Security Measures We Implement</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The security of users&apos; personal data and Escrow Funds is a top priority 
                    at Daily Worker Hub. We implement multiple layers of protection for 
                    safeguarding your data:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Data Encryption:</strong> All data 
                    transmitted between your device and Daily Worker Hub servers is protected with 
                    TLS 1.3 encryption — the latest encryption protocol ensuring no 
                    third party can intercept your communications while using the platform. 
                    Sensitive data such as passwords is never stored in plaintext; 
                    we use bcrypt hashing with strong salts. For sensitive 
                    financial data, we apply additional encryption at rest using AES-256.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Two-Factor Authentication (2FA):</strong> 
                    We strongly recommend all users enable 2FA on their 
                    accounts. When enabled, login requires not only a password but 
                    also a verification code sent to your WhatsApp number or generated 
                    by an authenticator app. 2FA provides an extra layer of defense even if 
                    your password is compromised.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Row Level Security (RLS) Database:</strong> 
                    Our Supabase database is configured with RLS policies that ensure 
                    every database query is automatically filtered based on user access rights. 
                    This means even if a malicious actor gains access to 
                    database credentials, they cannot extract other users&apos; data 
                    because RLS policies automatically restrict access to data that 
                    belongs to that user.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Audit Trail for Escrow Transactions:</strong> 
                    Every status change in Escrow Fund transactions — from deposit initiated to 
                    withdrawal completed — is recorded in an immutable audit log. This log includes 
                    timestamp, user ID, action taken, originating IP address, and hash 
                    of the previous transaction to detect tampering. This audit trail can 
                    be used as evidence in dispute resolution.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Regular Security Assessments:</strong> 
                    We periodically conduct vulnerability scanning and penetration testing 
                    on the platform infrastructure to identify and fix potential 
                    security weaknesses before they can be exploited.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-7" className="text-xl font-semibold text-foreground scroll-mt-24">7. Your Rights as a Data Subject</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    As a Daily Worker Hub user, you have a set of rights guaranteed 
                    by Indonesia&apos;s Personal Data Protection Law. You may 
                    exercise these rights by contacting our team through the channels 
                    available at the end of this policy:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Right of Access:</strong> You have the right to 
                    request a copy of the personal data we hold about you, including profile 
                    data, Escrow Fund transaction history, and account settings. We will provide 
                    this copy in a readable format — generally JSON or PDF — within 
                    14 business days after verifying your identity. There are conditions where 
                    we cannot fully fulfill this request if disclosure would 
                    adversely affect the rights and freedoms of others.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Right to Rectification:</strong> 
                    If you learn that the personal data we hold about you is inaccurate or 
                    incomplete, you have the right to request correction. This includes name changes, 
                    WhatsApp number updates, email address corrections, or bank account information 
                    changes. Corrections will be made within 7 business days, and we will notify 
                    you via email after the changes are applied.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Right to Erasure:</strong> 
                    You may request the deletion of your personal data from our systems — known 
                    as the &quot;right to be forgotten.&quot; However, there are important limitations: we cannot 
                    delete data if it is still required for legal obligations (e.g., Escrow 
                    Fund transaction data that must be retained for 10 years for tax compliance), 
                    to establish, exercise, or defend legal claims, or if there is an unresolved 
                    dispute. For such cases, data will be deleted as soon as 
                    the mandatory retention period expires.
                  </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Right to Portability:</strong> You have the right 
                  to receive your personal data in a structured, commonly used, 
                  and machine-readable format — such as JSON or CSV — and transfer that 
                  data to another service without hindrance from us. This right applies to data 
                  you provided to us based on consent or contract performance, and 
                  that is processed by automated means.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Right to Object:</strong> 
                  You have the right to object to the processing of your data 
                  based on our legitimate interests, including profiling carried out 
                  for platform usage analysis. When you object, we 
                  will cease processing your data unless we can demonstrate compelling 
                  legitimate grounds that override your interests, rights, and freedoms, 
                  or if the processing is necessary to establish, exercise, or defend 
                  legal claims.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">How to Exercise Your Rights:</strong> 
                  To exercise these rights, please email our team at 
                  privacy@dailyworkerhub.com with the subject &quot;Data Subject Rights Request&quot; and 
                  include: your full name as registered on your account, registered email, registered WhatsApp 
                  number, a specific description of the right you wish to exercise, and additional 
                  details that may help us process your request. We will 
                  verify your identity before processing your request — this is a 
                  security measure to prevent unauthorized access to your account. A response 
                  will be provided within 30 days in accordance with PDP Law provisions.
                </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-8" className="text-xl font-semibold text-foreground scroll-mt-24">8. Children&apos;s Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Daily Worker Hub is a platform designed for adult users in the context 
                  of professional work in the hospitality industry. We strictly do not 
                  collect personal data from individuals under the age of 16.
                </p>
                  <p className="text-muted-foreground leading-relaxed">
                    From the registration process, we implement age verification through date of 
                    birth input verified primarily through user attestation. We do not 
                    knowingly collect, use, or disclose personal information 
                    from children under the age of 16. If we learn that we have 
                    collected data from someone under 16 without verified parental 
                    or guardian consent, we will take steps to 
                    delete that information from our servers as soon as possible.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    For users aged 16-18 in Indonesian jurisdictions that consider 
                    them minors, it is important to understand that using the Daily Worker Hub platform 
                    for work activities — whether as a worker or as an employer 
                    running a business — constitutes contractual activities that are legally binding under 
                    the supervision of legal tutors or guardians. We highly recommend that 
                    parents or guardians of users in this age group monitor and 
                    provide consent before their children use the platform.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-9" className="text-xl font-semibold text-foreground scroll-mt-24">9. International Data Transfers</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Daily Worker Hub operates its business and stores data primarily in Indonesia, 
                    with cloud infrastructure using servers located in Southeast 
                    Asia — specifically Singapore and Jakarta. When your data is transferred 
                    outside Indonesia, we ensure that the transfer complies with 
                    PDP Law requirements regarding cross-border data transfers.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Some third-party vendors we use — such as Supabase which is 
                    based in Singapore and Firebase (Google) which is based in the United States 
                    — may have globally distributed infrastructure. Your data may 
                    be processed in these countries for operational purposes such as disaster 
                    recovery, load balancing, and technical support. However, all these transfers 
                    are protected by agreements requiring a level of data protection 
                    equivalent to what we apply ourselves.
                  </p>
                <p className="text-muted-foreground leading-relaxed">
                  For transfers to countries that do not yet have adequate levels of data 
                  protection according to the Indonesian government, we apply standard contractual clauses 
                  and require vendors to certify that they provide 
                  a level of security appropriate to international standards. You may request 
                  a copy of the safeguards we implement for your data transfers by 
                  contacting us at privacy@dailyworkerhub.com.
                </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-10" className="text-xl font-semibold text-foreground scroll-mt-24">10. How to Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions, concerns, or requests regarding this privacy 
                    policy or our data protection practices, please contact us 
                    through the following channels:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Email:</strong> Send an email to 
                    privacy@dailyworkerhub.com with a clear subject line and responses are typically 
                    provided within 3-5 business days. For requests concerning data subject 
                    rights, please include verification information such as your account number and 
                    registered email to expedite the process.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">In-Platform:</strong> You may also 
                    contact us through the chat feature available in your account 
                    dashboard for general questions that do not require disclosure of sensitive 
                    data.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Postal Mail:</strong> For formal 
                    requests requiring verified signatures or to escalate concerns 
                    unresolved through email, you may send mail to our office 
                    address listed on the Contact Us page on the platform.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We strive to respond to all inquiries within a reasonable timeframe and will 
                    communicate any delays if request volumes are high. 
                    If you feel our response is unsatisfactory or that the processing 
                    of your data does not comply with applicable law, you also have the right 
                    to file a complaint with the Indonesian data protection authority 
                    (Ministry of Communication and Information Technology or KOMINFO).
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
