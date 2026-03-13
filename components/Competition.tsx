'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from '@/contexts/LanguageContext';

export default function Competition() {
  const t = useTranslations('competition');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="competition"
      ref={ref}
      className="section-pad diagonal-clip"
      style={{ background: 'var(--surface2)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.3)',
                color: 'var(--gold)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              {t('badge')}
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                color: 'var(--white)',
                letterSpacing: '0.02em',
                lineHeight: 0.95,
                marginBottom: '24px',
              }}
            >
              {t('headline')}
            </h2>

            <div className="gold-rule mb-6" />

            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '16px',
                color: 'var(--gray)',
                lineHeight: 1.8,
                marginBottom: '40px',
              }}
            >
              {t('body')}
            </p>

            <a
              href="https://www.healygym.com/events-2"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-8 py-4 inline-flex items-center gap-3 rounded-sm"
              style={{ fontSize: '16px', textDecoration: 'none' }}
            >
              {t('cta')}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0l8 8-8 8-1.4-1.4L12.2 9H0V7h12.2L6.6 1.4z" />
              </svg>
            </a>
          </motion.div>

          {/* Right: YouTube embed */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                border: '2px solid var(--gold)',
                boxShadow: '0 0 60px rgba(201,168,76,0.2)',
                aspectRatio: '16/9',
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/FL3_VEvGi34?rel=0&showinfo=0&modestbranding=1"
                title="Healy Gymnastics Academy Annual Competition Highlights"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
            </div>

            {/* Gold label on video */}
            <div
              className="absolute -bottom-4 left-6 px-4 py-2 rounded-sm"
              style={{
                background: 'var(--gold)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-bebas)',
                fontSize: '13px',
                letterSpacing: '0.15em',
              }}
            >
              {t('watchHighlights')}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
