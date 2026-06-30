'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Link as LinkIcon, MessageCircleHeart, CheckCircle2 } from 'lucide-react';

const PREFIXES = ['Mr.', 'Mrs.', 'Mr. & Mrs.', 'Miss.', 'Family of', 'Dear'];

export default function AdminPage() {
  const [prefix, setPrefix] = useState(PREFIXES[0]);
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    // Safely get base URL in client
    setBaseUrl(window.location.origin);
  }, []);

  const handleGenerate = () => {
    if (!guestName.trim()) {
      setGeneratedLink('');
      return;
    }
    
    const params = new URLSearchParams({
      prefix,
      guest: guestName.trim()
    });
    
    setGeneratedLink(`${baseUrl}/?${params.toString()}`);
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const getMessageTemplate = () => {
    return `Dear ${prefix} ${guestName.trim()} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Nimesh & Sarada`;
  };

  const handleCopyLink = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const handleCopyMessage = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(getMessageTemplate());
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch (err) {
      console.error('Failed to copy message', err);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff8ee_0%,#fff1df_45%,#fbe7d2_100%)] px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(190,126,84,0.4) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl shadow-[0_20px_52px_rgba(191,126,84,0.18)] rounded-[2.5rem] border border-[#edd8bf] p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-5xl font-medium text-[#4d3732] mb-4">
              Invitation Link <span className="text-[#c06f58]">Generator</span>
            </h1>
            <p className="text-[#7b6258]">Create personalized wedding invitation links for your guests.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#bf7752]">Prefix</label>
                <select
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="w-full h-14 rounded-2xl border border-[#efdcc9] bg-white/65 px-4 text-[#4a3b3c] outline-none transition-all duration-300 focus:border-[#bf7752] focus:bg-white focus:shadow-[0_10px_20px_rgba(191,119,82,0.12)]"
                >
                  {PREFIXES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#bf7752]">Guest Name</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    setGeneratedLink('');
                  }}
                  placeholder="e.g. Sanjaya"
                  className="w-full h-14 rounded-2xl border border-[#efdcc9] bg-white/65 px-4 text-[#4a3b3c] placeholder-[#d9b89e] outline-none transition-all duration-300 focus:border-[#bf7752] focus:bg-white focus:shadow-[0_10px_20px_rgba(191,119,82,0.12)]"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!guestName.trim()}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#ca7c57] to-[#be7752] text-white font-bold uppercase tracking-[0.1em] shadow-[0_10px_20px_rgba(191,119,82,0.35)] transition-all hover:shadow-[0_15px_30px_rgba(171,98,64,0.42)] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
            >
              Generate Link
            </button>
          </div>

          <AnimatePresence>
            {generatedLink && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 40 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-8 border-t border-[#efdcc9]">
                  <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <button
                      onClick={handleCopyLink}
                      className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-[#bf7752] text-[#bf7752] font-semibold tracking-wide transition-colors hover:bg-[#bf7752] hover:text-white"
                    >
                      {copiedLink ? <CheckCircle2 className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />}
                      {copiedLink ? 'Link Copied!' : 'Copy Link Only'}
                    </button>
                    
                    <button
                      onClick={handleCopyMessage}
                      className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-[#bf7752] text-white font-semibold tracking-wide shadow-md transition-all hover:bg-[#ab6240]"
                    >
                      {copiedMessage ? <CheckCircle2 className="h-5 w-5" /> : <MessageCircleHeart className="h-5 w-5" />}
                      {copiedMessage ? 'Message Copied!' : 'Copy Full Message'}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#bf7752]">Message Preview</label>
                    <div className="p-6 rounded-2xl border border-[#efdcc9] bg-white/40 whitespace-pre-wrap text-[#4a3b3c] font-medium leading-relaxed">
                      {getMessageTemplate()}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
