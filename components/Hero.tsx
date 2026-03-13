'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from '@/contexts/LanguageContext';
import { useModal } from '@/contexts/ModalContext';
import { assetPath } from '@/utils/assetPath';

export default function Hero() {
  const t = useTranslations('hero');
  const { openModal } = useModal();
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const overlayY = useTransform(scrollY, [0, 600], [0, 180]);

  const scrollToPrograms = () => {
    const el = document.getElementById('programs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const headline = t('headline');
  const words = headline.split(' ');

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      {/* Video background */}
      {!videoError ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          src={assetPath('/videos/hero-background.mp4')}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
      ) : (
        /* YouTube fallback */
        <iframe
          src="https://www.youtube.com/embed/FL3_VEvGi34?autoplay=1&mute=1&loop=1&playlist=FL3_VEvGi34&controls=0&showinfo=0&rel=0"
          allow="autoplay; fullscreen"
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 0, border: 'none', transform: 'scale(1.2)' }}
          title="Healy Gymnastics Academy"
        />
      )}

      {/* Overlay with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(8,8,8,0.85), rgba(8,8,8,0.45), rgba(8,8,8,0.75))',
          y: overlayY,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 h-full flex items-center"
        style={{ padding: '0 48px' }}
      >
        <div className="max-w-3xl">
          {/* Gold badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(201,168,76,0.12)',
              border: '1px solid rgba(201,168,76,0.3)',
              color: 'var(--gold)',
              fontSize: '12px',
              letterSpacing: '0.15em',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            {t('badge')}
          </motion.div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              color: 'var(--white)',
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Sub line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '18px',
              color: 'var(--gray)',
              marginTop: '24px',
              marginBottom: '40px',
              maxWidth: '560px',
              lineHeight: 1.6,
            }}
          >
            {t('subline')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={openModal}
              className="btn-gold px-8 py-4 text-base rounded-sm"
              style={{ fontSize: '16px', letterSpacing: '0.1em' }}
            >
              {t('ctaPrimary')}
            </button>
            <button
              onClick={scrollToPrograms}
              className="btn-outline px-8 py-4 text-base rounded-sm"
              style={{ fontSize: '16px', letterSpacing: '0.1em' }}
            >
              {t('ctaSecondary')}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 bounce-down"
        style={{ cursor: 'pointer' }}
        onClick={scrollToPrograms}
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'var(--gray)',
            textTransform: 'uppercase',
          }}
        >
          {t('scrollDown')}
        </span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="6.5" y="0" width="3" height="24" rx="1.5" fill="rgba(201,168,76,0.3)" />
          <rect x="6.5" y="0" width="3" height="10" rx="1.5" fill="var(--gold)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;0,14;0,0"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </motion.div>
    </section>
  );
}
