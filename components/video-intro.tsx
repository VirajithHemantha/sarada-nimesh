'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoIntroProps {
  onIntroEnd: () => void;
}

export function VideoIntro({ onIntroEnd }: VideoIntroProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as any).connection;
    const getDeviceMemory = () => (navigator as any).deviceMemory;

    const updatePerformanceMode = () => {
      const constrainedNetwork = Boolean(connection?.saveData) || /2g/.test(connection?.effectiveType ?? "");
      const lowMemory = typeof getDeviceMemory() === "number" && getDeviceMemory() <= 4;
      const smallScreen = window.innerWidth < 768;
      setIsLowPerformanceMode(motionMedia.matches || constrainedNetwork || lowMemory || smallScreen);
    };

    updatePerformanceMode();
    motionMedia.addEventListener("change", updatePerformanceMode);
    window.addEventListener("resize", updatePerformanceMode);
    connection?.addEventListener?.("change", updatePerformanceMode);

    return () => {
      motionMedia.removeEventListener("change", updatePerformanceMode);
      window.removeEventListener("resize", updatePerformanceMode);
      connection?.removeEventListener?.("change", updatePerformanceMode);
    };
  }, []);

  const startIntro = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
      setIsVideoPlaying(true);
    } else {
      onIntroEnd();
    }
  };

  return (
    <motion.div
      key="video-intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        transition: { duration: 1, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden"
    >
      {/* Elegant Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: 'url("/images/elegant_intro_bg.png")' }} 
      />

      <div className="absolute inset-0 opacity-10 paper-grain pointer-events-none" />

      {/* Background Video Strip for Mobile / Full for Desktop */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-[35vh] md:h-full group">
          <video
            ref={videoRef}
            muted
            playsInline
            onEnded={onIntroEnd}
            className="w-full h-full object-cover shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)]"
            src="/Use_the_uploaded_202604161807.mp4"
          />
          {/* Colorful Frame for the strip */}
          <div className="absolute inset-0 border-y-2 border-white/40 md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 md:hidden" />
        </div>
      </div>

      {/* Soft colorful overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b from-rose-50/10 via-transparent to-sky-50/20 transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`} />

      {/* Initial Black Screen with Centered Button */}
      <AnimatePresence>
        {!isVideoPlaying && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-[110] bg-cover bg-center flex flex-col items-center justify-center"
            style={{ backgroundImage: 'url("/images/elegant_intro_bg.png")' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-r from-rose-200 via-stone-200 to-rose-300 blur-2xl opacity-60 animate-pulse" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startIntro}
                className="group relative flex flex-col items-center gap-4 bg-gradient-to-br from-[#fdfaf5] via-white to-[#f5ebe0] backdrop-blur-md border-2 border-[#e6ccb2] px-16 py-8 rounded-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] shadow-[#e6ccb2]/40 transition-all duration-500 hover:shadow-[#ddb892]/60"
              >
                <span className="font-serif text-lg md:text-xl tracking-[0.6em] uppercase font-bold bg-gradient-to-r from-[#9c6644] via-[#7f5539] to-[#9c6644] bg-clip-text text-transparent drop-shadow-sm">
                  View Invitation
                </span>
                <div className="w-16 h-[2px] bg-gradient-to-r from-[#e6ccb2] via-[#ddb892] to-[#e6ccb2] group-hover:w-32 transition-all duration-500" />
                <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-[#9c6644] animate-pulse bg-[#fdfaf5] px-4 py-1.5 rounded-full border border-[#e6ccb2]">
                  Tap to Reveal
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Monogram with color accent */}
      <div className={`absolute top-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}>
        <p className="font-serif text-[11px] tracking-[0.8em] font-bold uppercase flex flex-col items-center gap-3">
          <span className="bg-gradient-to-r from-pink-400 via-amber-400 to-sky-400 bg-clip-text text-transparent opacity-80">H & R</span>
          <span className="h-px w-8 bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
        </p>
      </div>
    </motion.div>
  );
}
