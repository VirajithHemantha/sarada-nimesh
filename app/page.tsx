'use client';

import { useState, useEffect, Suspense } from 'react';
import { VideoIntro } from '@/components/video-intro';
import HeroSection from '@/components/sections/HeroSection';
import InvitationSection from '@/components/sections/InvitationSection';

import CeremonyDetails from '@/components/sections/CeremonyDetails';
import CountdownSection from '@/components/sections/CountdownSection';
import GallerySection from '@/components/sections/GallerySection';
import VenueLocation from '@/components/sections/VenueLocation';
import RSVPSection from '@/components/sections/RSVPSection';
import BlessingsSection from '@/components/sections/BlessingsSection';
import FooterSection from '@/components/sections/FooterSection';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('scroll-smooth');
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-background">
      {/* Persistent floating music player */}
      <MusicPlayer />

      {!isOpened ? (
        <VideoIntro onIntroEnd={() => setIsOpened(true)} />
      ) : (
        <>
          <Suspense fallback={null}>
            <HeroSection />
            <InvitationSection />
          </Suspense>
          <CeremonyDetails />
          <CountdownSection />
          <GallerySection />
          <VenueLocation />
          <RSVPSection />
          <BlessingsSection />
          <FooterSection />
        </>
      )}
    </div>
  );
}
