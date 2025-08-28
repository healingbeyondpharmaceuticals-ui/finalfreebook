import React from 'react';
import TermsDetailsExtended from './TermsDetailsExtended';

interface TermsDetailProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const TermsDetail = ({ title, children, defaultOpen = false }: TermsDetailProps) => {
  return (
    <details className="bg-slate-800/70 border border-slate-600 rounded-xl p-4 mb-3" open={defaultOpen}>
      <summary className="cursor-pointer font-semibold flex items-center gap-3 list-none">
        <span className="w-3 h-3 border-2 border-slate-400 border-l-0 border-t-0 transform rotate-45 transition-transform duration-200 details-chevron"></span>
        {title}
      </summary>
      <div className="mt-3 text-slate-300">
        {children}
      </div>
    </details>
  );
};

const TermsDetails = () => {
  return (
    <div className="space-y-3">
      <TermsDetail title="1) Acceptance of Terms" defaultOpen>
        <p>By signing up, these Terms become effective as of your sign‑up date. If you do not agree, do not use this platform.</p>
      </TermsDetail>

      <TermsDetail title="2) Nature of the Platform">
        <ul className="list-disc ml-5 space-y-1">
          <li>FreeBook™ Uncensored is an <strong>uncensored community forum</strong>.</li>
          <li>You are solely responsible for what you post, share, or advertise.</li>
          <li>This platform does not represent, endorse, or back your ideas, opinions, or actions.</li>
          <li>Your speech and content are your own; you assume full legal responsibility.</li>
          <li>The platform is a separate, independent entity and is not liable for your words or conduct.</li>
        </ul>
      </TermsDetail>

      <TermsDetail title="3) User Responsibilities">
        <ul className="list-disc ml-5 space-y-1">
          <li>No harassment, bullying, stalking, or threats.</li>
          <li>No human trafficking, exploitation, or illegal activity of any kind.</li>
          <li>No violations of others' rights (IP, privacy, safety).</li>
          <li>No hacking, disruption, or misuse of platform services.</li>
        </ul>
        <p className="mt-2">Violations may result in immediate termination and, if necessary, referral to law enforcement.</p>
      </TermsDetail>

      <TermsDetailsExtended />
    </div>
  );
};

export default TermsDetails;