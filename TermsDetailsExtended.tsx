import React from 'react';

interface TermsDetailProps {
  title: string;
  children: React.ReactNode;
}

const TermsDetail = ({ title, children }: TermsDetailProps) => (
  <details className="bg-slate-800/70 border border-slate-600 rounded-xl p-4 mb-3">
    <summary className="cursor-pointer font-semibold flex items-center gap-3 list-none">
      <span className="w-3 h-3 border-2 border-slate-400 border-l-0 border-t-0 transform rotate-45 transition-transform duration-200"></span>
      {title}
    </summary>
    <div className="mt-3 text-slate-300">{children}</div>
  </details>
);

const TermsDetailsExtended = () => (
  <div className="space-y-3">
    <TermsDetail title="4) Freedom of Speech Disclaimer">
      <p>Uncensored does not mean without accountability. You are fully responsible for your speech and actions. Content may be moderated or removed when required by law or to protect the platform and users.</p>
    </TermsDetail>

    <TermsDetail title="5) Privacy & Data Usage">
      <ul className="list-disc ml-5 space-y-1">
        <li>Limited data (login info, IP, activity logs) is collected to operate the platform.</li>
        <li>Data is not sold to third parties.</li>
        <li>Data may be disclosed only as required by law or to enforce these Terms.</li>
      </ul>
    </TermsDetail>

    <TermsDetail title="6) Intellectual Property">
      <ul className="list-disc ml-5 space-y-1">
        <li>Users retain ownership of their content.</li>
        <li>By posting, users grant a non‑exclusive, worldwide license to display, distribute, and store content for platform operation.</li>
        <li>FreeBook™ Uncensored brand/name/logo are protected and may not be used without permission.</li>
      </ul>
    </TermsDetail>

    <TermsDetail title="7) Advertising Policy">
      <ul className="list-disc ml-5 space-y-1">
        <li>All advertising payments are <strong>non‑refundable</strong>.</li>
        <li>Ads must comply with applicable laws and must not mislead or defraud.</li>
        <li>Advertising may be rejected or removed if it violates standards.</li>
        <li>Payments are processed via Stripe; advertisers agree to that processor's terms.</li>
      </ul>
    </TermsDetail>
  </div>
);

export default TermsDetailsExtended;