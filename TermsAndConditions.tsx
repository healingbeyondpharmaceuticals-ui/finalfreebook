import React, { useState, useEffect } from 'react';
import TermsDetails from './TermsDetails';

const TermsAndConditions = () => {
  const [agreed, setAgreed] = useState(false);
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(180deg, #0b0f13, #0e141b 35%, #0b0f13)',
      color: '#e8eef7'
    }}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-7 shadow-2xl backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-sm mb-4">
            FreeBook™ Uncensored • Terms & Conditions
          </div>
          
          <h1 className="text-3xl font-bold mb-1">Terms & Conditions</h1>
          <div className="text-slate-400 mb-4">Effective on your individual sign‑up date.</div>

          <div className="bg-slate-800/60 border border-dashed border-slate-600 rounded-xl p-4 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm">
                I have read and agree to the FreeBook™ Uncensored Terms & Conditions and understand that this is an uncensored forum. I am responsible for my own speech, content, and actions. Advertising payments are non‑refundable.
              </span>
            </label>
            <small className="text-slate-400 block mt-2">
              Tip: gate your "Create Account" button until <code className="bg-white/10 px-1 rounded">agreed</code> is checked.
            </small>
          </div>

          <TermsDetails />

          <footer className="mt-6 text-slate-400 text-sm">
            © {currentYear} FreeBook™ Uncensored. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export { TermsAndConditions };
export default TermsAndConditions;