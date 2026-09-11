import type { LegalDoc } from "./types";

/**
 * Website Terms of Use, as supplied by counsel
 * (TALENTnext Terms of Use, 07.15.2026).
 *
 * The wording is the legal text verbatim — do not paraphrase, tighten, or
 * "improve" a clause here. The only editorial layer is structural: where the
 * source document set a defined term in bold it is written `**like this**`,
 * and where it printed a bare URL in brackets it is written as a link.
 *
 * The source leaves "Last updated" blank; `lastUpdated` below carries the
 * document's own revision date until a publication date is chosen.
 */
export const termsOfUseDoc: LegalDoc = {
  href: "/terms",
  title: "Website Terms of Use",
  kicker: "Legal",
  lastUpdated: "Last updated: July 15, 2026",
  description:
    "The terms and conditions governing your access to and use of the TALENTnext website.",
  blocks: [
    {
      type: "notice",
      label: "Important",
      text: "IMPORTANT: PLEASE CAREFULLY READ AND UNDERSTAND THESE TERMS OF USE. THEY CONTAIN AN ARBITRATION AGREEMENT, JURY AND CLASS ACTION WAIVERS, LIMITATIONS ON OUR LIABILITY, AND OTHER PROVISIONS THAT AFFECT YOUR LEGAL RIGHTS.",
    },
    {
      type: "paragraph",
      text: "This website is operated by TALENTnext and its affiliates including Signal 88, LLC (together, “**we**,” “**us**,” or “**our**”). These terms and conditions, together with any documents they expressly incorporate by reference (collectively, these “**Terms of Use**”), apply to your access to and use of the Website, which includes our public-facing websites, including teamsignal.com and lots.teamsignal.com and any other public-facing website, microsite, landing page, or campaign that links to these Terms of Use (collectively, the “**Public-Facing Websites**”), our password-protected websites, including portal.teamsignal.com (the “**Secure Websites**”), our password-protected applications, including Edge and Sales Enablement Tool (“**SET**”, and together with Edge, the “**Secure Apps**”), and certain third-party websites or applications used in connection with franchise development that are not owned by us but through which information may be submitted to us (the “**Franchise Sites**”), our third-party recruiting and applicant communication platforms used by us and franchisees to communicate with job applicants via SMS and other channels, which may include Avenu or TextUs (the “**Recruiting Platforms**”), and together with the Public-Facing Websites, Secure Websites, Secure Apps, Franchise Sites, and Recruiting Platforms, the “**Website**”). All Public-Facing Websites, Secure Websites, Secure Apps, and Franchise Sites that are governed by these Terms of Use will link to these Terms of Use or otherwise inform users of their application.",
    },
    {
      type: "paragraph",
      text: "Certain third-party platforms which may be used in connection with recruiting and applicant communications are governed by their own terms of service. Your use of those platforms is subject to their applicable terms. To the extent you interact with us through those platforms, these Terms of Use govern your relationship with us, and the third-party platform’s terms govern your use of the platform itself.",
    },
    {
      type: "paragraph",
      text: "**By accessing or using the Website, you accept and agree to be bound by these Terms of Use and our Privacy Notice. If you do not agree to these Terms of Use or our Privacy Notice ([https://www.talentnexthq.com/privacy-policy/](/privacy)), do not use or access the Website.**",
    },
    {
      type: "paragraph",
      text: "We may revise and update these Terms of Use in our sole discretion, and will post any updates to the Terms of Use on the Website. We will use reasonable efforts to provide notice of material changes, such as by posting a notice on the Website or sending an email to registered users. Your continued use of our Website means that you accept and agree to the modified Terms of Use.",
    },

    {
      type: "section",
      id: "intellectual-property",
      heading: "Intellectual Property",
    },
    {
      type: "paragraph",
      text: "You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Website for its intended purposes and in accordance with these Terms of Use. As a condition of your use of the Website, you warrant that you will not use the Website for any purpose that is unlawful or prohibited by these Terms of Use. You may not use the Website in any manner which could damage, disable, overburden, or impair the Website, or interfere with any other party’s use and enjoyment of the Website. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided through the Website.",
    },
    {
      type: "paragraph",
      text: "All content included as part of the Website, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Website, is our property or the property of our suppliers and is protected by copyright and other laws that protect intellectual property and proprietary rights. You agree to observe and abide by all copyright and other proprietary notices, legends, and other restrictions contained in any such content, and you will not make any changes thereto.",
    },
    {
      type: "paragraph",
      text: "You will not modify, publish, transmit, reverse engineer, participate in the transfer or sale of, create derivative works from, or in any way exploit any of the content, in whole or in part, found on the Website. Our content is not for resale. Your use of the Website does not entitle you to make any unauthorized use of any protected content, and in particular you will not delete or alter any proprietary rights or attribution notices in any content. You will use protected content solely for your personal or internal business use, as applicable, and will make no other use of the content without our express written permission. You agree that you do not acquire any ownership rights in any protected content. We do not grant you any licenses, express or implied, to our intellectual property or that of our licensors, except as expressly authorized by these Terms of Use. Requests to reproduce or distribute the content or materials found on the Website may be made by writing to Signal 88, LLC, 3880 S. 149th St., Suite 102, Omaha, NE 68144, Attention – Legal Department.",
    },

    {
      type: "section",
      id: "user-content",
      heading: "User Content on the Website",
    },
    {
      type: "paragraph",
      text: "To the extent any portion of the Website allows you to comment on, upload, submit, transmit, or otherwise post content through the Website (“**User Content**”), you may not post User Content that:",
    },
    {
      type: "list",
      items: [
        "Violates any copyright, trademark rights, patent rights, rights in know-how, privacy or publicity rights, trade secret rights, confidentiality rights, contract rights, or other rights of any individual or legal entity;",
        "Is harmful; hateful; threatening; abusive; harassing; defamatory or libelous; sexually explicit, vulgar, lewd, obscene, or pornographic; racially, ethnically, or otherwise objectionable or offensive; inappropriate; or inflammatory;",
        "Is false, deceptive, or misleading, or that you know (or reasonably should know) is false, deceptive, or misleading;",
        "Contains information that could be used for identity theft purposes, such as social security numbers, credit card, bank account, or other financial information, driver’s license numbers, security codes, or passwords;",
        "Links to materials or other content, directly or indirectly, to which you do not have a right to link or that violates these restrictions; or",
        "Violates any applicable local, state, national, or international law.",
      ],
    },
    {
      type: "paragraph",
      text: "By posting User Content on the Website, you grant us a non-exclusive, worldwide, fully paid-up, royalty-free, assignable, transferable, and sublicensable license to use, reproduce, host, store, adapt, modify, publish, publicly perform, publicly display, distribute, and prepare derivative works of such User Content, in whole or in part, throughout the universe in any form, format, or medium now known or later developed, for the purpose of operating, promoting, and improving the Website and our business. By posting User Content on the Website, you represent and warrant that your User Content, and use of it as permitted by these Terms of Use, does not violate these Terms of Use, applicable laws, or the rights of any third party.",
    },
    { type: "heading", heading: "Video Submissions" },
    {
      type: "paragraph",
      text: "If you submit video content through our Website (including through the Next In Leadership program or similar features), the license granted above applies to your video submission and extends to publication on our social media accounts and other promotional channels. You acknowledge that once published on third-party social media platforms, your video may be shared, embedded, or otherwise distributed by third parties in accordance with those platforms’ terms, and that we cannot control such downstream uses.",
    },
    {
      type: "paragraph",
      text: "If your User Content includes video or other audiovisual material depicting any person other than yourself, you further represent and warrant that you have obtained all necessary consents, releases, and permissions from each identifiable individual appearing in such content, including any consent required under applicable right-of-publicity, right-of-privacy, or similar laws.",
    },
    {
      type: "paragraph",
      text: "To the fullest extent permitted by applicable law, you waive any and all moral rights (including rights of attribution and integrity) you may have in any User Content you submit through the Website. You acknowledge that we may edit, modify, crop, or otherwise alter your User Content, including video submissions, before or after publication, and may remove any User Content at any time in its sole discretion and without notice or liability to you.",
    },
    {
      type: "paragraph",
      text: "We do not undertake any obligation to review User Content, and we do not guarantee the accuracy, integrity, or quality of any User Content and we cannot assure you that harmful, inaccurate, deceptive, offensive, threatening, defamatory, unlawful, or otherwise objectionable User Content will not appear on the Website. We do, however, reserve the right to review any or all User Content in our sole discretion. In addition, we reserve the right to alter, edit, remove, or disable access to any User Content, in whole or in part, at our sole discretion.",
    },
    {
      type: "paragraph",
      text: "UNDER NO CIRCUMSTANCES SHALL WE OR OUR AFFILIATES BE LIABLE IN ANY WAY FOR ANY USER CONTENT POSTED ON OR MADE AVAILABLE THROUGH THE WEBSITE. We do not control, are under no obligation to monitor, and are not responsible for what users post, including any offensive, inappropriate, obscene, unlawful, infringing, or otherwise objectionable User Content on the Website.",
    },

    {
      type: "section",
      id: "dmca",
      heading: "Digital Millennium Copyright Act Policy",
    },
    {
      type: "paragraph",
      text: "Our policy is to respond to notices of alleged infringement that comply with the Digital Millennium Copyright Act (“**DMCA**”). **Submitting a claim of copyright infringement is a serious matter, and before you send us a notification, you should consider whether the use at issue may be authorized by the copyright owner or otherwise permitted by law.**",
    },
    {
      type: "paragraph",
      text: "If you believe that any content on the Website infringes your copyright or the copyright of a third party that you are authorized to act for, you may send a notice to [privacy@teamsignal.com](mailto:privacy@teamsignal.com). To submit a claim, you must provide a physical or electronic signature of the copyright owner or a person authorized to act on the copyright owner’s behalf; identify your full name, mailing address, email address, and phone number; identify the copyrighted work claimed to have been infringed; identify the content on the Website that you claim is infringing with sufficient detail for us to locate it; and include a statement that: (i) you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law, (ii) the information in your notice is accurate, and (iii) under penalty of perjury, you are the copyright owner or are authorized to act on the copyright owner’s behalf. We may request additional information before acting on any notice.",
    },
    {
      type: "paragraph",
      text: "It is our policy, in appropriate circumstances and in our discretion, to suspend or terminate the accounts of users who are repeat infringers or who are repeatedly accused of infringement.",
    },

    {
      type: "section",
      id: "third-party-links",
      heading: "Links to Other Websites and Connecting through Social Media",
    },
    {
      type: "paragraph",
      text: "The Website may contain hyperlinks or other links to websites, applications, platforms, or services operated by third parties. We do not control those third-party properties and are not responsible for their content, availability, terms, privacy practices, or for any loss, damage, delay, or injury arising from your access to or use of them. Inclusion of any linked third-party property on the Website does not imply or constitute our approval or endorsement. If you leave the Website to access a third-party property, you do so at your own risk. All rules, policies (including privacy policies), and operating procedures of those third parties will apply to you while you are using their sites or services, and we are not responsible for information you provide to them.",
    },

    {
      type: "section",
      id: "google-integration",
      heading: "Google Integration and Google User Data",
    },
    {
      type: "paragraph",
      text: "SET offers an optional feature to authenticated users that lets users connect a Google account (including Gmail, Google Calendar, and/or Google Contacts) to SET, using Nylas, Inc. (“**Nylas**”) as our integration provider. This functionality is built into SET itself and is accessible only to authenticated users after they log into SET. By connecting your Google account, you authorize both us and Nylas to access and process your Google user data (which, depending on the permissions you grant, may include email messages and metadata, calendar and calendar event data, and contact records) solely to display information on property records within SET by matching email recipients with their associated contacts. We do not use your synchronized Google data for any other purpose.",
    },
    {
      type: "paragraph",
      text: "Using Nylas, we store the account data reasonably necessary to provide and support the synchronization functionality within SET, for as long as your Google account remains connected and as long as reasonably necessary to provide the connected features. You may disconnect your Google account and revoke our access at any time through your account settings within SET or through your Google Account permissions page at [https://myaccount.google.com/permissions](https://myaccount.google.com/permissions).",
    },
    {
      type: "paragraph",
      text: "Our use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements. For further detail regarding how we handle Google user data, please review our [Privacy Notice](/privacy).",
    },
    {
      type: "paragraph",
      text: "We are not responsible for the availability, accuracy, security, or content of any data obtained through your connected Google account or through Nylas. Your use of Google’s and Nylas’s respective platforms is governed by their own terms of service and privacy policies, and is subject to the disclaimers and limitations of liability set forth in the “Warranty and Limitation of Liability” section of these Terms of Use.",
    },

    { type: "section", id: "indemnification", heading: "Indemnification" },
    {
      type: "paragraph",
      text: "You agree to indemnify, defend, and hold harmless us, our affiliates, and their respective officers, directors, employees, agents, licensors, service providers, successors, and assigns from and against any and all losses, costs, liabilities, damages, judgments, awards, and expenses (including reasonable attorneys’ fees) arising out of or relating to your use of, or inability to use, the Website; your User Content; your violation of these Terms of Use; your violation of any rights of a third party; or your violation of any applicable laws, rules, or regulations. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, and in that event, you will fully cooperate with us in asserting any available defenses.",
    },

    {
      type: "section",
      id: "electronic-communications",
      heading: "Electronic Communications",
    },
    {
      type: "paragraph",
      text: "Visiting the Website, using the Website, or sending emails to us constitutes electronic communications. You consent to receive electronic communications from us, and you agree that all agreements, notices, disclosures, and other communications that we provide to you electronically, including by email, and through the Website, satisfy any legal requirement that such communications be in writing. To opt out of receiving marketing emails from us, follow the “unsubscribe” link in the applicable email or contact us using the information below. You may still receive non-marketing communications from us, including communications relating to your inquiries, transactions, account, security, or these Terms of Use.",
    },
    {
      type: "paragraph",
      text: "Text messages (SMS/MMS) sent to you by us or on our behalf through third-party platforms also constitute electronic communications. By opting in to receive text messages, you consent to receive such communications electronically and agree that they satisfy any legal requirement that such communications be in writing, to the extent permitted by applicable law.",
    },

    {
      type: "section",
      id: "tracking-technologies",
      heading: "Tracking Technologies and Analytics",
    },
    {
      type: "paragraph",
      text: "We (and our service providers) may use cookies, log files, pixel tags, web beacons, and similar technologies in connection with the Website to help the Website function, remember preferences, understand usage, improve performance, and for security and fraud-prevention purposes. For more information about these technologies and your choices (including how to control cookies), please review our [Privacy Policy](/privacy).",
    },
    {
      type: "paragraph",
      text: "Certain portions of the Website may be operated by or in connection with franchisees or franchise-development partners, including franchisee websites or microsites. If you access a franchisee or other third-party operated site or microsite, additional terms and privacy practices may apply as presented to you on that site or microsite.",
    },

    {
      type: "section",
      id: "warranty-and-liability",
      heading: "Warranty and Limitation of Liability",
    },
    {
      type: "paragraph",
      text: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE AND OUR AFFILIATES, LICENSORS, AND SUPPLIERS MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, SECURITY, OR ACCURACY OF THE WEBSITE OR OF ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES, OR RELATED GRAPHICS CONTAINED ON OR MADE AVAILABLE THROUGH THE WEBSITE FOR ANY PURPOSE. ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES, AND RELATED GRAPHICS ARE PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTY OR CONDITION OF ANY KIND. WE AND OUR AFFILIATES, LICENSORS, AND SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THE WEBSITE AND ALL RELATED INFORMATION, SOFTWARE, PRODUCTS, SERVICES, AND RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.",
    },
    {
      type: "paragraph",
      text: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WE OR OUR AFFILIATES, LICENSORS, OR SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF USE, DATA, REVENUE, PROFITS, OR GOODWILL, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF, OR INABILITY TO USE, THE WEBSITE; ANY DELAY OR INTERRUPTION IN THE WEBSITE; THE PROVISION OF OR FAILURE TO PROVIDE SERVICES; OR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES, OR RELATED GRAPHICS OBTAINED THROUGH THE WEBSITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE, EVEN IF WE OR ANY OF OUR AFFILIATES, LICENSORS, OR SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN ANY EVENT, THE TOTAL AGGREGATE LIABILITY OF US AND OUR AFFILIATES, LICENSORS, AND SUPPLIERS FOR ANY AND ALL DIRECT DAMAGES ARISING OUT OF OR RELATING TO THESE TERMS OF USE OR YOUR USE OF THE WEBSITE SHALL NOT EXCEED $1,000.00. BECAUSE SOME STATES OR JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE WEBSITE, OR WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE WEBSITE.",
    },

    {
      type: "section",
      id: "dispute-resolution",
      heading:
        "Dispute Resolution, Arbitration, Governing Law, Venue, and Jurisdiction",
    },
    {
      type: "paragraph",
      text: "You agree that: (1) any claim or dispute (whether in contract, tort, or otherwise) you may have with us or our affiliates and franchisees arising from or related to the online services or these terms will be resolved exclusively by final and binding arbitration in accordance with the American Arbitration Association’s Commercial Arbitration Rules through an arbitration proceeding to be administered by the American Arbitration Association (or any successor organization thereto) in Omaha, Nebraska. Your agreement to arbitrate any and all such disputes, claims and controversies and the results, determinations, findings, judgments and/or awards rendered through any such arbitration shall be final and binding and may be specifically enforced by legal proceedings. All issues relating to arbitrability or the enforcement of the agreement to arbitrate contained herein shall be governed by the Federal Arbitration Act (9 U.S.C. §§ 1 et seq.) (“**FAA**”) and the federal common law of arbitration. To the extent state law applies, it shall be applied in a manner consistent with the FAA. The arbitrator shall apply Nebraska law consistent with the FAA, and applicable statutes of limitations, and shall honor claims of privilege recognized at law. NO ACTION SHALL BE ARBITRATED ON A CLASS OR REPRESENTATIVE BASIS, AND YOU AND WE HEREBY WAIVE THE RIGHT TO ASSERT CLAIMS IN ANY CLASS OR REPRESENTATIVE ACTION. BOTH YOU AND WE AGREE TO WAIVE ANY RIGHT TO A TRIAL BY JURY. Finally, this arbitration provision is reciprocally binding on all parties, such that both you and we are required to arbitrate claims against one another. To the extent any dispute is not subject to arbitration, or to the extent necessary to enforce or confirm an arbitration award or seek injunctive or other equitable relief, you agree that such matter will be governed by the laws of the State of Nebraska (without regard to conflict of laws principles) and must be brought exclusively in the state or federal courts located in Douglas County, Nebraska, and you consent to the personal jurisdiction of those courts.",
    },

    {
      type: "section",
      id: "miscellaneous",
      heading: "Miscellaneous Terms",
    },
    {
      type: "paragraph",
      text: "These Terms of Use, together with our [Privacy Policy](/privacy) and any other terms or policies expressly incorporated by reference, constitute the entire agreement between you and us regarding your use of the Website. If any provision of these Terms of Use is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. Our failure to enforce any right or provision of these Terms of Use will not be deemed a waiver of such right or provision. You may not assign or transfer these Terms of Use or any rights hereunder without our prior written consent; we may assign these Terms of Use without restriction. The provisions of these Terms of Use that by their nature should survive termination shall survive, including but not limited to intellectual property provisions, warranty disclaimers, indemnification, limitations of liability, and dispute resolution provisions.",
    },

    {
      type: "section",
      id: "contact",
      heading: "Contact Information",
    },
    {
      type: "contact",
      heading: "Signal 88, LLC",
      lines: [
        "[1 (877) 498-8494](tel:+18774988494)",
        "[privacy@teamsignal.com](mailto:privacy@teamsignal.com)",
        "Attn: Legal",
        "3880 S. 149th Street, Suite 102",
        "Omaha, NE 68144",
      ],
    },
  ],
};
