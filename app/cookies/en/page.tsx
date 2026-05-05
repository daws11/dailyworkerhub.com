import type { Metadata } from "next";
import { MainNavbar } from "@/components/layout/MainNavbar";
import { LegalToc, type TocItem } from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Cookie Policy - Daily Worker Hub",
  description: "Daily Worker Hub Cookie Policy - Learn how we use cookies and other tracking technologies.",
  keywords: ["cookie policy", "cookies", "tracking", "privacy", "dailyworkerhub"],
  openGraph: {
    title: "Cookie Policy - Daily Worker Hub",
    description: "Daily Worker Hub Cookie Policy - Learn how we use cookies and other tracking technologies.",
    url: "https://dailyworkerhub.com/cookies/en",
    siteName: "Daily Worker Hub",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy - Daily Worker Hub",
    images: ["/opengraph.jpg"],
  },
  alternates: {
    canonical: "https://dailyworkerhub.com/cookies/en",
  },
};

const tocItems: TocItem[] = [
  { id: "section-1", title: "1. What Are Cookies?" },
  { id: "section-2", title: "2. Types of Cookies We Use" },
  { id: "section-3", title: "3. Third-Party Cookies" },
  { id: "section-4", title: "4. How to Manage Cookies" },
  { id: "section-5", title: "5. Cookie Policy Updates" },
];

export default function CookiesEnPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavbar />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <LegalToc items={tocItems} />

            <div className="flex-1 max-w-4xl">
              <div className="prose prose-invert prose-slate max-w-none space-y-6">
                <h1 className="text-3xl font-bold text-foreground mb-8">Cookie Policy</h1>
                <p className="text-muted-foreground leading-relaxed">
                  Last updated: April 2026
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This policy supplements our{" "}
                  <a href="/privacy/en" className="text-emerald-400 hover:text-emerald-300 underline">Privacy Policy</a>{" "}
                  and specifically explains how we use cookies and similar tracking technologies.
                </p>

                <section className="space-y-4">
                  <h2 id="section-1" className="text-xl font-semibold text-foreground scroll-mt-24">1. What Are Cookies?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Cookies are small text files stored on your device — whether computer, tablet, 
                    or smartphone — when you visit or use Daily Worker Hub services. Cookies 
                    are sent by the platform server and stored in your browser for various purposes, ranging 
                    from remembering language preferences and login status to tracking usage activity so 
                    we can improve your experience on our platform.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    When you create an account on Daily Worker Hub, cookies allow us to recognize your 
                    device so you don&apos;t need to log in again every time you visit the platform. Cookies also 
                    help us understand how you interact with features such as job 
                    search, worker search, daily project management, and the Escrow 
                    payment system.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    It is important to understand that cookies do not run program code, do not contain viruses, and 
                    cannot read other data stored on your device. Cookies only store 
                    information in plain text form that you can manage through your browser 
                    settings at any time.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-2" className="text-xl font-semibold text-foreground scroll-mt-24">2. Types of Cookies We Use</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Daily Worker Hub uses three main categories of cookies, each with different 
                    functions. Understanding these differences helps you know what we collect and 
                    why we need them.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-muted-foreground border border-border rounded-lg overflow-hidden">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-foreground">Cookie Type</th>
                          <th className="px-4 py-3 text-left font-semibold text-foreground">Function</th>
                          <th className="px-4 py-3 text-left font-semibold text-foreground">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="px-4 py-3 font-medium text-foreground">Essential</td>
                          <td className="px-4 py-3">
                            These cookies are strictly necessary for basic platform operation, including user 
                            authentication, login session management, security, and Escrow Fund functionality. 
                            Without these cookies, core features such as fund deposits, payment release, and 
                            push notifications will not function properly.
                          </td>
                          <td className="px-4 py-3">Session / 30 days</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-foreground">Analytics</td>
                          <td className="px-4 py-3">
                            Analytics cookies collect anonymous data about how you use the 
                            platform — which pages are visited, how much time is spent, 
                            which features are most frequently used, and where user difficulties arise. 
                            This data helps us improve UX, speed up job search and 
                            recruitment processes, and identify bugs you may encounter.
                          </td>
                          <td className="px-4 py-3">12 months</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-foreground">Functional</td>
                          <td className="px-4 py-3">
                            Functional cookies remember your personal preferences and settings, such as 
                            your selected language, preferred work locations, the hospitality 
                            job categories you search for, and notification preferences. These cookies make 
                            your experience more personal and efficient each time you return to the platform.
                          </td>
                          <td className="px-4 py-3">6 months</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not use cookies for advertising or cross-site tracking purposes. 
                    The analytics data we collect is not linked to your personal identity 
                    unless you are explicitly logged in and using platform features.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-3" className="text-xl font-semibold text-foreground scroll-mt-24">3. Third-Party Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Daily Worker Hub relies on several third-party services that, in their operation, 
                    also place cookies on your device. Below are these services 
                    along with an explanation of the data they collect:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Firebase Analytics (Google):</strong> We 
                    integrate Firebase Analytics to understand user behavior on web and mobile 
                    applications. Firebase collects anonymous interaction data including session time, 
                    features used, errors occurring, and work flow conversions — such as 
                    how many employers successfully create job listings or how many workers 
                    complete their first withdrawal process. This data is used solely for product 
                    optimization purposes and is not shared with advertisers.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Firebase Cloud Messaging (FCM):</strong> To 
                    send push notifications — such as Escrow Fund deposit confirmations, payment status, 
                    or work schedule reminders — we use FCM which may store a unique token 
                    on your device. This token enables us to send notifications even when the browser 
                    tab is closed, as long as you have granted notification permission.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Supabase:</strong> As our platform&apos;s backend, 
                    Supabase uses session cookies to manage user authentication and authorization. 
                    These cookies ensure that whenever you access features such as viewing 
                    job listing details, managing proposals, or processing Escrow Fund transactions, the system 
                    can securely verify your identity. Supabase does not use cookies 
                    for commercial tracking purposes.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Each third-party service has its own cookie and privacy policies that 
                    operate independently of this policy. We strongly encourage you to 
                    read the privacy policies of each respective third party to understand how 
                    your data is managed outside our infrastructure.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-4" className="text-xl font-semibold text-foreground scroll-mt-24">4. How to Manage Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You have full control over cookies stored on your device. Every modern web 
                    browser provides settings that allow you to block, delete, 
                    or restrict certain cookies. Below are general guides for each browser:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Google Chrome:</strong> Go to Settings → Privacy 
                    and security → Cookies and other site data. Here you can block cookies from 
                    all sites, block third-party cookies only, or delete specific cookies from 
                    Daily Worker Hub. Use the &quot;Block third-party cookies&quot; option if you want to stay logged 
                    into our platform without accepting tracking cookies from other sites.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Mozilla Firefox:</strong> Go to Options → Privacy 
                    &amp; Security → Cookies and Site Data. You can choose whether to accept all 
                    cookies, cookies from visited sites only, or block all cookies entirely. 
                    The &quot;Delete cookies when Firefox is closed&quot; option is very useful if you are using a shared 
                    device.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Safari:</strong> Go to Preferences → Privacy. 
                    Safari allows you to block all cookies or only third-party cookies. 
                    You can also delete all stored cookies through the &quot;Manage Website Data&quot; option.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Please note that disabling essential cookies will significantly impact platform functionality. 
                    For example, you will not be able to stay logged in, the Escrow System cannot verify transaction 
                    sessions, and fund deposits cannot be processed securely. For the best experience, 
                    we recommend accepting essential cookies from Daily Worker Hub while 
                    blocking third-party analytics and functional cookies if you are concerned about 
                    privacy.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-5" className="text-xl font-semibold text-foreground scroll-mt-24">5. Cookie Policy Updates</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We periodically update this cookie policy whenever there are changes in 
                    our data collection practices, new third-party service integrations, or changes 
                    to applicable regulations in Indonesia — particularly the Personal Data Protection Law 
                    (UU PDP) which came into full effect in October 2024. Any significant changes will be 
                    communicated through multiple channels:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    First, we will send an email notification to all users who have 
                    verified their accounts, explaining a summary of the key changes and the effective date 
                    of the new policy. Second, when you log in to the platform after the policy is updated, we 
                    will display a re-consent banner asking you to review and accept 
                    the latest policy before continuing use.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Third, for minor changes such as service name updates or editorial corrections, 
                    we will update the &quot;Last updated&quot; date at the top of this policy without 
                    requiring explicit re-consent. By continuing to use Daily Worker Hub services 
                    after notification of changes, you are deemed to have accepted the 
                    updated policy.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We strongly encourage you to periodically review this policy, especially 
                    before making large Escrow Fund transactions or connecting new payment methods to 
                    your Daily Worker Hub account. If you have any questions or concerns about our cookie 
                    policy, please contact our team through the Contact page available on the platform.
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
