'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function InvitationSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center bg-[#f4f4f4] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Faint floral/leaf decorations in the background corners like in the image */}
      <div className="absolute left-0 top-0 w-32 h-64 opacity-20 bg-[url('/images/leaves-left.png')] bg-no-repeat bg-contain" />
      <div className="absolute right-0 top-0 w-32 h-64 opacity-20 bg-[url('/images/leaves-right.png')] bg-no-repeat bg-contain" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gray-400 to-transparent mb-6" />

        <p className="mb-6 text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase text-gray-500">
          Wedding Celebration
        </p>

        <h2 className="font-sans text-sm sm:text-base md:text-lg font-medium tracking-[0.3em] leading-loose text-[#2b3746] uppercase max-w-2xl mb-8">
          You are cordially invited<br />
          to celebrate the union of<br />
          <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1a232f] normal-case tracking-normal mt-4 block">Nimesh & Sarada</span>
        </h2>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-16" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="relative group rounded-[40px] p-3 md:p-4 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] max-w-md w-full mx-auto"
        >
          {/* Inner image container */}
          <div className="relative overflow-hidden rounded-[32px] w-full aspect-[4/5] bg-[#e5e9e0]">
            <Image
              src="/10.png"
              alt="Couple Illustration"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
