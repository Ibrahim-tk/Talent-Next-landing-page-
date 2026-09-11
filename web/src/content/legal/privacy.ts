import type { LegalDoc } from "./types";

/**
 * Privacy Notice, as supplied by counsel
 * (TALENTnext Privacy Notice, 07.15.2026).
 *
 * Wording is the legal text verbatim. The section numbering below is the
 * source document's own outline, made explicit: the Notice cross-references
 * itself constantly ("as described in Section 11", "see Section 7.2"), so the
 * numbers are load-bearing and must not be re-ordered without re-reading
 * every cross-reference in the body copy. Each section also carries an `id`,
 * which makes those references linkable later without touching this file.
 */
export const privacyNoticeDoc: LegalDoc = {
  href: "/privacy",
  title: "Privacy Notice",
  kicker: "Legal",
  lastUpdated: "Last updated: July 15, 2026",
  description:
    "How TALENTnext collects, uses, discloses, and otherwise processes information about you.",
  blocks: [
    {
      type: "paragraph",
      text: "This Privacy Notice (this “**Notice**”) explains how TALENTnext and its affiliates including Signal 88, LLC (together, “**we**,” “**us**,” or “**our**”) collects, uses, discloses, and otherwise processes information about you when you use our public-facing websites, including teamsignal.com and lots.teamsignal.com and any other public-facing website, microsite, landing page, or campaign that links to this Notice (collectively, the “**Public-Facing Websites**”), our password-protected websites, including portal.teamsignal.com (the “**Secure Websites**”), our password-protected applications, including Edge and Sales Enablement Tool (“**SET**”, and together with Edge, the “**Secure Apps**”), and certain third-party websites or applications used in connection with franchise development that are not owned by us but through which information may be submitted to us (the “**Franchise Sites**”), our third-party recruiting and applicant communication platforms used by us and franchisees to communicate with job applicants via SMS and other channels, which may include Avenu or TextUs (the “**Recruiting Platforms**”), and together with the Public-Facing Websites, Secure Websites, Secure Apps, Franchise Sites, and Recruiting Platforms, the “**Website**”). All Public-Facing Websites, Secure Websites, Secure Apps, Franchise Sites, and Recruiting Platforms that are governed by this Notice will link to this Notice or otherwise inform users of its application.",
    },
    {
      type: "paragraph",
      text: "This Notice is governed by and subject to the Terms of Use located at [https://www.talentnexthq.com/terms-of-use/](/terms) (the “**Terms of Use**”). This Notice is incorporated into and made a part of the Terms of Use. Any capitalized terms used in this Notice but not otherwise defined herein shall have the meanings ascribed to them in the Terms of Use. Likewise, any capitalized terms used in the Terms of Use but not otherwise defined therein shall have the meanings ascribed to them in this Notice. In the event of any conflict between this Notice and the Terms of Use, the Terms of Use shall control, except with respect to matters specifically addressed in this Notice relating to our data privacy and data protection practices.",
    },
    {
      type: "paragraph",
      text: "This Notice does not apply to third-party platforms, products, or services that we use as a customer or merely link to through the Website (for example, Sage Intacct or Shopify), and it does not apply to any website, application, or service that has its own separate privacy notice or policy, even if it is referenced on the Website. Those platforms, products, and services have their own privacy terms and notices.",
    },
    {
      type: "paragraph",
      text: "By accessing or using the Website, you acknowledge that you have read and understood this Privacy Notice.",
    },

    /* ---- 1 -------------------------------------------------------------- */
    {
      type: "section",
      id: "who-we-are",
      number: "1",
      heading: "Who We Are and How to Contact Us",
    },
    {
      type: "paragraph",
      text: "We operate the Website and are responsible for how your personal information is used as described in this Notice.",
    },
    {
      type: "paragraph",
      text: "If you have questions, concerns, or requests about this Privacy Notice or how we handle your information, you can contact us at:",
    },
    {
      type: "contact",
      heading: "Signal 88, LLC",
      lines: [
        "Attn: Legal",
        "3880 S 149th Street Suite 102, Omaha, NE 68144",
        "[privacy@teamsignal.com](mailto:privacy@teamsignal.com)",
        "[1 (877) 498-8494](tel:+18774988494)",
      ],
    },

    /* ---- 2 -------------------------------------------------------------- */
    {
      type: "section",
      id: "what-we-collect",
      number: "2",
      heading: "What Information We Collect",
    },
    {
      type: "subsection",
      id: "information-you-give-us",
      number: "2.1",
      heading: "Information You Give Us",
    },
    {
      type: "paragraph",
      text: "When you use forms or other features on our Website, such as when you express interest in a franchise, contact us, request information, or otherwise interact with us, we may collect:",
    },
    {
      type: "list",
      items: [
        "Your first and last name;",
        "Your email address;",
        "Your phone number;",
        "Your city, state, and country, if provided;",
        "Your answers to questions about your business experience and interest in a franchise; Your application status and employment-related communications sent or received via SMS;",
        "Video and audio recordings, including your name, likeness, voice, image, and any biographical information you include in a video submission;",
        "Your responses to franchise readiness assessments or quizzes, including information about your qualifications, financial readiness, and interest in franchise ownership; and",
        "Any other details you choose to share.",
      ],
    },
    {
      type: "paragraph",
      text: "If you move past the initial screening step, we may invite you to use a Secure Website, Secure App, or another password-protected tool to provide additional details. Certain Franchise Sites or other third-party tools used in connection with franchise development may also be subject to their own terms, conditions, or privacy notices.",
    },
    {
      type: "paragraph",
      text: "We do not collect payment card details through the public-facing portions of the Website covered by this Notice. If you make a purchase through a third-party platform, such as Shopify, that platform handles your payment information under its own privacy policy and payment terms.",
    },
    {
      type: "subsection",
      id: "information-collected-automatically",
      number: "2.2",
      heading: "Information Collected Automatically (Cookies and Similar Tools)",
    },
    {
      type: "paragraph",
      text: "When you visit the Website, we and our service providers may automatically collect certain technical and usage information using cookies and similar technologies. This information may include:",
    },
    {
      type: "list",
      items: [
        "Your browser type and version;",
        "Your device type and operating system;",
        "Your IP address and rough location (for example, city or region);",
        "Which pages you visit and when; and",
        "How you got to the Website (for example, a link from another site).",
      ],
    },
    {
      type: "paragraph",
      text: "We use cookies and similar technologies on the Website. Where required by law, we obtain your consent before placing certain non-essential cookies. You can manage your cookie preferences as described in Section 7.2. The types of cookies we use include:",
    },
    {
      type: "list",
      items: [
        "Strictly necessary cookies to help the Website work properly and to keep it secure. These cookies are essential for the Website to function and do not require your consent.",
        "Non-essential cookies from approved third parties, such as our CRM provider (for example, HubSpot), analytics providers (including Google Analytics), and marketing tools (including Meta Pixel), to help us understand how people use the Website, measure the effectiveness of our marketing campaigns, and improve our services. Where required by law, these cookies are only placed with your consent. Google Analytics collects information about your use of the Website to generate reports on website activity. Meta Pixel helps us measure the effectiveness of advertising and understand actions people take on our Website.",
      ],
    },
    {
      type: "paragraph",
      text: "We do not use Website cookies to sell your personal information or to support third-party behavioral advertising campaigns for unaffiliated advertisers.",
    },
    {
      type: "paragraph",
      text: "You can manage your cookie preferences and learn more about your choices in Section 7.2 below.",
    },
    {
      type: "subsection",
      id: "google-account-synchronization",
      number: "2.3",
      heading: "Google Account Synchronization",
    },
    {
      type: "paragraph",
      text: "SET offers an optional feature to authenticated users that allows you to connect a Google account (Gmail, Google Calendar, or Google Contacts) so that certain Google user data can be synced within SET. When you connect a Google account, we access and sync this data through our integration provider, Nylas, Inc. (“**Nylas**”). Depending on the permissions you grant, this data may include email messages and related metadata; calendar and calendar event information; and contact records.",
    },

    /* ---- 3 -------------------------------------------------------------- */
    {
      type: "section",
      id: "how-we-use",
      number: "3",
      heading: "How We Use Your Information",
    },
    {
      type: "paragraph",
      text: "We use the information we collect for the following reasons:",
    },
    {
      type: "list",
      items: [
        {
          text: "**To run and improve the Website:**",
          items: [
            "Make sure the Website works and is secure.",
            "Fix problems and understand how people use the Website.",
          ],
        },
        {
          text: "**To respond to you and manage franchise interest:**",
          items: [
            "Review and respond to your expression of interest in a franchise.",
            "Decide if you should move forward to the next step and invite you to a secure portal.",
            "Communicate with you about your inquiry and potential franchise opportunities.",
          ],
        },
        {
          text: "**To manage our sales and relationships:**",
          items: [
            "Keep track of your interest and our interactions in our customer relationship tools (for example, HubSpot).",
            "Send you information about our services and opportunities, subject to applicable law.",
          ],
        },
        {
          text: "**To analyze and improve what we do:**",
          items: [
            "Learn how visitors use the Website so we can improve its content and design.",
          ],
        },
        {
          text: "**To meet legal and safety needs:**",
          items: [
            "Follow laws and regulations.",
            "Protect our rights and the rights and safety of others.",
            "Detect and prevent fraud, security issues, or misuse of our systems.",
          ],
        },
        {
          text: "**To communicate with job applicants:**",
          items: [
            "Send and receive text messages (SMS/MMS) regarding recruiting activities, job opportunities, interview scheduling, onboarding updates, and employment-related communications via our Recruiting Platforms.",
          ],
        },
        {
          text: "**To operate the Next In Leadership program and related features:**",
          items: [
            "Review, curate, edit, and publish user-submitted video content on our Website, social media platforms, and other promotional channels.",
            "Assess your readiness for franchise ownership based on your quiz or assessment responses, and share your results and contact information with our franchise development team for follow-up communications about franchise opportunities.",
          ],
        },
        {
          text: "**To provide Google account synchronization within SET:**",
          items: [
            "Google user data synced through our Nylas integration is used solely to display information on property records within SET by matching email recipients with their associated contacts. We do not use this Google user data for any other purpose.",
          ],
        },
      ],
    },

    /* ---- 4 -------------------------------------------------------------- */
    {
      type: "section",
      id: "how-we-share",
      number: "4",
      heading: "How We Share Your Information",
    },
    {
      type: "paragraph",
      text: "We do not sell your personal information for monetary consideration, and we do not share your personal information with unaffiliated third parties for cross-context behavioral advertising.",
    },
    { type: "paragraph", text: "We may share your information with:" },
    {
      type: "list",
      items: [
        "**Service providers:** Companies that help us operate the Website and our business, such as hosting providers, CRM providers, analytics providers (including Google Analytics), marketing and advertising partners (including Meta), email service providers, recruiting and applicant communication platforms, and security providers. These parties may process information on our behalf and under contractual restrictions.",
        "**Google integration provider:** When you connect a Google account to SET, we share the resulting Google user data with Nylas, our integration provider, which facilitates the synchronization of that data within SET. Google user data is not stored exclusively in Google’s cloud; rather, using Nylas, we store the Google account data necessary to provide and support the synchronization feature within SET itself.",
        "**Our entities and franchise-related teams:** Our related companies and internal teams (including Signal Home Office and relevant franchise development personnel) that need the information to review, manage, or respond to franchise opportunities or related business inquiries.",
        "**Professional advisors:** Lawyers, accountants, auditors, and other advisors under confidentiality obligations.",
        "**Legal authorities:** Government, regulatory, or law enforcement authorities if we are required to do so by law or if we need to protect our rights or the rights and safety of others.",
        "**Business transfers:** A buyer, successor, or other relevant participant in a merger, acquisition, financing, reorganization, bankruptcy, or sale of all or part of our business or assets, subject to applicable confidentiality and legal requirements.",
        "**Social media and public platforms:** If you submit video content through our Next In Leadership program or similar features, your video (including your name, likeness, and voice) may be published on our Website and our social media accounts, where it will be publicly accessible. Social media platforms process viewer data under their own privacy policies.",
      ],
    },
    {
      type: "paragraph",
      text: "We do not allow third parties to use information they get from our Website to sell it or to run their own unrelated marketing campaigns.",
    },

    /* ---- 5 -------------------------------------------------------------- */
    {
      type: "section",
      id: "sms-communications",
      number: "5",
      heading: "Recruiting Updates SMS/Text Message Communications",
    },
    {
      type: "paragraph",
      text: "If you opt in to receive text messages from us or on our behalf through our Recruiting Platforms, the following applies:",
    },
    {
      type: "paragraph",
      text: "You may receive text messages (SMS/MMS) regarding recruiting activities, job opportunities, interview scheduling, onboarding updates, and employment-related communications as part of the “Recruiting Updates” program. Message frequency varies. You may opt out at any time by replying “STOP” to any message. After opting out, you will receive a confirmation message and will no longer receive text messages from us through that program. Reply “HELP” to any message for assistance or contact us using the details in Section 1. Message and data rates may apply depending on your wireless carrier and plan. Your consent to receive text messages is not required as a condition of employment or consideration for employment. Messages may be sent using automated technology.",
    },
    {
      type: "paragraph",
      text: "For more information about how we handle your personal information in connection with text messages, see the rest of this Privacy Notice. For platform-specific terms, please review the terms of service posted or provided by our Recruiting Platforms, as applicable.",
    },

    /* ---- 6 -------------------------------------------------------------- */
    {
      type: "section",
      id: "storage-and-transfers",
      number: "6",
      heading: "Where We Store Your Information and International Transfers",
    },
    {
      type: "paragraph",
      text: "We are based in the United States, and many of our systems and service providers are also located there.",
    },
    {
      type: "paragraph",
      text: "If you are outside the United States, this means your information may be transferred to and stored in countries that may have different data protection laws than your own. When required by law, we use safeguards to protect your information when it is transferred.",
    },
    {
      type: "paragraph",
      text: "Google user data synced through SET’s Google account integration is stored within our application infrastructure, using Nylas as our integration provider.",
    },
    {
      type: "subsection",
      id: "canadian-residents-transfers",
      number: "6.1",
      heading: "For Canadian residents",
    },
    {
      type: "paragraph",
      text: "Your personal information may be processed and stored in the United States and other countries where our service providers operate. When your information is transferred outside Canada, it may be accessed by courts, law enforcement, and national security authorities in those countries in accordance with their laws. By using the Website and providing us with your information, you consent to such transfers. You have the right to withdraw this consent at any time by contacting us as set out in Section 1, though this may limit our ability to provide services to you.",
    },
    {
      type: "subsection",
      id: "google-user-data",
      number: "6.2",
      heading: "Google User Data — Access, Retention, and Deletion",
    },
    {
      type: "paragraph",
      text: "When you connect a Google account (Gmail, Google Calendar, or Google Contacts) to SET, we access, sync, and store certain Google user data through our integration provider, Nylas. Depending on the permissions you grant, this data may include email messages and related metadata; calendars and calendar events; and contact records. We access this data only to display information on property records within SET by matching email recipients with their associated contacts, as described in Section 3. This feature is accessible only to authenticated users after logging into SET. Our use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
    },
    {
      type: "paragraph",
      text: "**How long we keep it.** We retain synced Google user data only for as long as your Google account remains connected to SET and for as long as reasonably necessary to provide the synchronization feature described in Section 3.",
    },
    {
      type: "paragraph",
      text: "**How you can delete it.** You may disconnect your Google account or delete your synced Google data at any time through your SET account settings. You may also revoke our access directly through your Google Account permissions page at [https://myaccount.google.com/permissions](https://myaccount.google.com/permissions). When you disconnect or unlink your Google account from SET, we will revoke the associated OAuth tokens and permanently delete all Google user data synced into SET.",
    },

    /* ---- 7 -------------------------------------------------------------- */
    {
      type: "section",
      id: "your-choices",
      number: "7",
      heading: "Your Choices and Your Rights",
    },
    {
      type: "subsection",
      id: "marketing-emails",
      number: "7.1",
      heading: "Marketing Emails",
    },
    {
      type: "paragraph",
      text: "If you receive marketing or informational emails from us, you can:",
    },
    {
      type: "list",
      items: [
        "Click “unsubscribe” in the email; or",
        "Contact us using the details in Section 1.",
      ],
    },
    {
      type: "paragraph",
      text: "We may still send you important, nonmarketing messages, such as responses to your inquiries.",
    },
    { type: "subsection", id: "cookies", number: "7.2", heading: "Cookies" },
    { type: "paragraph", text: "You can control cookies in several ways:" },
    {
      type: "list",
      items: [
        "Cookie preference tool: If available, you can use the cookie preference or consent management tool on the Website to view and manage your cookie choices at any time. This tool allows you to accept or reject certain categories of cookies.",
        "Browser settings: Use your browser settings to block or delete cookies.",
        "Third-party opt-outs: You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on available at [https://tools.google.com/dlpage/gaoptout](https://tools.google.com/dlpage/gaoptout).",
      ],
    },
    {
      type: "paragraph",
      text: "If you block or delete certain cookies, or if you withdraw your consent for non-essential cookies, some parts of the Website may not work properly. You can change your cookie preferences at any time using the methods described above.",
    },
    {
      type: "subsection",
      id: "california-rights",
      number: "7.3",
      heading: "Rights for Users in California and Similar Jurisdictions",
    },
    {
      type: "paragraph",
      text: "If you are a California resident, the California Consumer Privacy Act (“CCPA”) and California Privacy Rights Act (“CPRA”) provide you with specific rights regarding your personal information.",
    },
    {
      type: "heading",
      heading: "Categories of Personal Information We Collect",
    },
    {
      type: "paragraph",
      text: "We collect the following categories of personal information:",
    },
    {
      type: "list",
      items: [
        "**Identifiers**: Name, email address, phone number, IP address, and similar identifiers, and phone numbers collected in connection with recruiting communications.",
        "**Commercial Information**: Records of inquiries, franchise interest, and business interactions.",
        "**Internet or Network Activity**: Browsing history on our Website, information about your interaction with the Website, and similar usage data.",
        "**Geolocation Data**: General location information derived from your IP address (city or region level).",
        "**Professional or Employment Information**: Information about your business experience and qualifications you provide in connection with franchise inquiries, and information provided through job applications and recruiting communications via our Recruiting Platforms.",
        "**Inferences**: Inferences drawn from the above to create a profile about your preferences and characteristics related to franchise suitability.",
        "**Audio, Electronic, Visual, or Similar Information**: Video and audio recordings, including your likeness and voice, submitted through our Next In Leadership program or similar features.",
        "**Google User Data**: If you connect a Google account to SET as described in Sections 2 and 6.2, email messages and related metadata, calendar and calendar event information, and contact records synced through our Nylas integration, which fall within the Identifiers and Internet or Network Activity categories described above.",
      ],
    },
    {
      type: "paragraph",
      text: "We collect this information from you directly, automatically through cookies and similar technologies, and from third-party service providers and franchise development platforms.",
    },
    { type: "heading", heading: "How We Use Personal Information" },
    {
      type: "paragraph",
      text: "We use the categories of personal information listed above for the business and commercial purposes described in Section 3 of this Notice, including to operate the Website, respond to franchise inquiries, manage business relationships, analyze and improve our services, and comply with legal obligations.",
    },
    { type: "heading", heading: "Sale and Sharing of Personal Information" },
    {
      type: "paragraph",
      text: "We do not “sell” personal information as that term is defined under the CCPA. We do not “share” personal information for cross-context behavioral advertising as that term is defined under the CCPA. This includes Google user data synced through SET, which we do not sell or share for cross-context behavioral advertising.",
    },
    { type: "heading", heading: "Disclosure of Personal Information" },
    {
      type: "paragraph",
      text: "We may disclose the categories of personal information listed above to the categories of third parties described in Section 4, including service providers, our affiliated entities, professional advisors, legal authorities, and in connection with business transfers. This includes disclosing Google user data synced through SET to Nylas, our integration/service provider, as described in Section 4. We have disclosed personal information to service providers and business partners for business purposes in the preceding 12 months.",
    },
    { type: "heading", heading: "Sensitive Personal Information" },
    {
      type: "paragraph",
      text: "We do not collect or process “sensitive personal information” as defined by the CPRA through the Website covered by this Notice.",
    },
    { type: "heading", heading: "Retention" },
    {
      type: "paragraph",
      text: "We retain personal information as described in Section 11 of this Notice.",
    },
    { type: "heading", heading: "Your California Privacy Rights" },
    { type: "paragraph", text: "California residents have the following rights:" },
    {
      type: "list",
      items: [
        "Right to Know: You can request that we disclose what personal information we have collected, used, disclosed, sold, or shared about you in the preceding 12 months. This includes the categories and specific pieces of personal information we collected, the categories of sources, our purposes for collecting or selling, and the categories of third parties with whom we shared your information.",
        "Right to Delete: You can request that we delete personal information we collected from you, subject to certain exceptions.",
        "Right to Correct: You can request that we correct inaccurate personal information we maintain about you.",
        "Right to Opt-Out: You have the right to opt out of the “sale” or “sharing” of your personal information. Because we do not sell or share personal information as defined by the CCPA, we do not offer an opt-out mechanism for sale or sharing.",
        "Right to Limit Use of Sensitive Personal Information: Because we do not use or disclose sensitive personal information for purposes other than those permitted under the CPRA, this right does not apply.",
        "Right to Non-Discrimination: You have the right not to receive discriminatory treatment for exercising your CCPA rights.",
      ],
    },
    { type: "heading", heading: "How to Exercise Your Rights" },
    {
      type: "paragraph",
      text: "To exercise your right to know, delete, or correct, you or your authorized agent may submit a request by:",
    },
    {
      type: "contact",
      lines: [
        "**Email**: [privacy@teamsignal.com](mailto:privacy@teamsignal.com)",
        "**Phone**: [1 (877) 498-8494](tel:+18774988494)",
        "**Mail**: Signal 88, LLC, Attn: Legal - California Privacy Rights, 3880 S 149th Street Suite 102, Omaha, NE 68144",
      ],
    },
    {
      type: "paragraph",
      text: "When you submit a request, we will verify your identity by matching the information you provide with information we have on file. For requests to know specific pieces of information or to delete, we may require additional verification. We will respond to verifiable requests within 45 days of receipt, or notify you if we need more time (up to 90 days total).",
    },
    { type: "heading", heading: "Authorized Agents" },
    {
      type: "paragraph",
      text: "You may designate an authorized agent to submit requests on your behalf. We will require written proof that the agent is authorized to act on your behalf, or a valid power of attorney. We may also require you to verify your identity directly with us.",
    },
    { type: "heading", heading: "Opt-Out Preference Signals" },
    {
      type: "paragraph",
      text: "We recognize opt-out preference signals transmitted by browsers or devices in a legally compliant manner. If you enable a legally recognized opt-out preference signal (such as Global Privacy Control), we will treat it as a request to opt out of the sale or sharing of personal information for the browser or device from which the signal is sent. Because we do not currently sell or share personal information as defined under the CCPA, enabling such signals will not change our data practices, but we honor these signals to the extent required by law.",
    },
    { type: "heading", heading: "California “Shine the Light” Law" },
    {
      type: "paragraph",
      text: "California Civil Code Section 1798.83 permits California residents to request certain information about disclosure of personal information to third parties for their direct marketing purposes. We do not disclose personal information to third parties for their direct marketing purposes as defined by this law.",
    },
    {
      type: "subsection",
      id: "canada-rights",
      number: "7.4",
      heading: "Rights for Users in Canada",
    },
    {
      type: "paragraph",
      text: "If you are a resident of Canada, Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (“**PIPEDA**”) and, for Quebec residents, Quebec’s Act respecting the protection of personal information in the private sector (commonly known as “Law 25”), provide you with specific rights regarding your personal information.",
    },
    { type: "heading", heading: "Consent" },
    {
      type: "paragraph",
      text: "We collect, use, and disclose your personal information with your consent, which may be express or implied depending on the sensitivity of the information and the circumstances. By using the Website and providing us with your information, you consent to our collection, use, and disclosure of your personal information as described in this Notice. You have the right to withdraw your consent at any time, subject to legal or contractual restrictions and reasonable notice. To withdraw consent, contact us using the details in Section 1. Withdrawing consent may limit or prevent our ability to provide certain services to you.",
    },
    { type: "heading", heading: "Your Canadian Privacy Rights" },
    { type: "paragraph", text: "Canadian residents have the following rights:" },
    {
      type: "list",
      items: [
        "Right to Access: You can request access to the personal information we hold about you, including information about how it has been used and to whom it has been disclosed.",
        "Right to Correction: You can request that we correct any inaccurate or incomplete personal information we hold about you.",
        "Right to Withdraw Consent: You can withdraw your consent to our collection, use, or disclosure of your personal information at any time, subject to legal or contractual restrictions.",
        "Right to Complain: You have the right to file a complaint with the Office of the Privacy Commissioner of Canada if you believe we have not complied with Canadian privacy laws. Quebec residents may also file a complaint with the Commission d’accès à l’information du Québec.",
      ],
    },
    { type: "heading", heading: "Additional Rights for Quebec Residents" },
    {
      type: "paragraph",
      text: "If you are a resident of Quebec, you have additional rights under Law 25:",
    },
    {
      type: "list",
      items: [
        "Right to Portability: You can request that we provide your personal information in a structured, commonly used, and machine-readable format, and you can request that we transmit this information to another organization where technically feasible.",
        "Right to De-indexing: In certain circumstances, you can request that we cease disseminating your personal information through the internet or that we de-index any hyperlink attached to your name that provides access to your personal information.",
        "Right to Privacy Incident Notification: If a privacy breach occurs that presents a risk of serious injury to you, we will notify you and the Commission d’accès à l’information du Québec as required by law.",
      ],
    },
    { type: "heading", heading: "How to Exercise Your Rights" },
    {
      type: "paragraph",
      text: "To exercise any of these rights, contact us using the details in Section 1.",
    },
    {
      type: "contact",
      lines: [
        "Email: [privacy@teamsignal.com](mailto:privacy@teamsignal.com)",
        "Phone: [1 (877) 498-8494](tel:+18774988494)",
        "Mail: Signal 88, LLC, Attn: Legal - Canadian Privacy Rights, 3880 S 149th Street Suite 102, Omaha, NE 68144",
      ],
    },
    {
      type: "paragraph",
      text: "We will respond to your request within the time required by applicable law (generally within 30 days under PIPEDA, or as otherwise required by provincial law). We may need to verify your identity before responding to your request. In some cases, we may charge a minimal fee to cover our costs of responding to your request, as permitted by law.",
    },
    { type: "heading", heading: "Cross-Border Transfers" },
    {
      type: "paragraph",
      text: "As described in Section 6, your personal information may be transferred to and processed in the United States and other countries. When your information is in another country, it may be accessed by courts, law enforcement, and national security authorities in accordance with the laws of that country.",
    },
    { type: "heading", heading: "Retention" },
    {
      type: "paragraph",
      text: "We retain your personal information only for as long as necessary to fulfill the purposes described in this Notice or as required by law, as described in Section 11.",
    },
    { type: "heading", heading: "Filing a Complaint" },
    {
      type: "paragraph",
      text: "If you have concerns about how we handle your personal information, please contact us first using the details in Section 1. If you are not satisfied with our response, you may file a complaint with:",
    },
    {
      type: "list",
      items: [
        "Office of the Privacy Commissioner of Canada: [www.priv.gc.ca](https://www.priv.gc.ca) or 1-800-282-1376",
        "Commission d’accès à l’information du Québec (for Quebec residents): [www.cai.gouv.qc.ca](https://www.cai.gouv.qc.ca) or 1-888-528-7741",
      ],
    },

    /* ---- 8 -------------------------------------------------------------- */
    {
      type: "section",
      id: "childrens-privacy",
      number: "8",
      heading: "Children’s Privacy",
    },
    {
      type: "paragraph",
      text: "The Website is not directed to children, and we do not knowingly collect personal information from anyone under the age of 13. We also do not knowingly collect personal information from individuals under the age of 16 in connection with the public-facing franchise inquiry process. If you believe a child has provided us with personal information in violation of this policy, please contact us so we can delete it.",
    },

    /* ---- 9 -------------------------------------------------------------- */
    {
      type: "section",
      id: "how-we-protect",
      number: "9",
      heading: "How We Protect Your Information",
    },
    {
      type: "paragraph",
      text: "We use safeguards (technical and organizational measures) designed to protect your information from being lost, misused, or accessed without permission.",
    },
    {
      type: "paragraph",
      text: "However, no website or internet system is 100% secure. We cannot promise or guarantee perfect security, but we work to protect your information.",
    },

    /* ---- 10 ------------------------------------------------------------- */
    {
      type: "section",
      id: "third-party-websites",
      number: "10",
      heading: "Websites Affiliated with Third Parties",
    },
    {
      type: "subsection",
      id: "links-to-other-websites",
      number: "10.1",
      heading: "Links to Other Websites",
    },
    {
      type: "paragraph",
      text: "The Website may link to other sites or services that we do not control (for example, third-party platforms such as Shopify or other partners). This Privacy Notice does not apply to those other sites or services. We are not responsible for their content or privacy practices. You should read their own privacy notices.",
    },
    {
      type: "subsection",
      id: "franchise-websites",
      number: "10.2",
      heading: "Franchise Websites",
    },
    {
      type: "paragraph",
      text: "Additionally, when you use a Franchise Site, your use may also be subject to the applicable privacy policies, terms of use, and other policies of the operator of that Franchise Site, which may include its own data collection, use, and sharing practices. We encourage you to review all applicable policies to understand how your information may be collected, used, and protected in connection with your use of a Franchise Site.",
    },

    /* ---- 11 ------------------------------------------------------------- */
    {
      type: "section",
      id: "retention",
      number: "11",
      heading: "How Long We Keep Your Information",
    },
    {
      type: "paragraph",
      text: "We keep your information for as long as we reasonably need it to:",
    },
    {
      type: "list",
      items: [
        "Provide the Website and our services;",
        "Handle your inquiry or franchise interest and maintain our business records;",
        "Meet legal, tax, and accounting requirements; and",
        "Resolve disputes and enforce our agreements.",
      ],
    },
    {
      type: "paragraph",
      text: "When we no longer need your information, we will delete it or anonymize it.",
    },
    {
      type: "paragraph",
      text: "For video content submitted through the Next In Leadership program or similar features, published videos may remain publicly available on our Website and social media platforms unless you request removal. To request removal of a published video, contact us using the details in Section 1. We will use reasonable efforts to remove your video from our platforms, though we cannot guarantee removal from third-party platforms or cached versions beyond our control.",
    },

    /* ---- 12 ------------------------------------------------------------- */
    {
      type: "section",
      id: "changes",
      number: "12",
      heading: "Changes to This Privacy Notice",
    },
    {
      type: "paragraph",
      text: "We may update this Privacy Notice from time to time. When we do, we will change the “Last updated” date at the top of this page. In some cases, we may also give you a more direct notice (for example, by posting a banner on the Website).",
    },
    {
      type: "paragraph",
      text: "If you continue to use the Website after we post changes, that means you accept the updated Notice. For material changes, we will provide advance notice and, where required by law, obtain your consent before the changes take effect.",
    },
  ],
};
