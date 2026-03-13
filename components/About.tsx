'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from '@/contexts/LanguageContext';
import { assetPath } from '@/utils/assetPath';

export default function About() {
  const t = useTranslations('about');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Left: 60% */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="section-label mb-4">{t('label')}</p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 300,
                color: 'var(--white)',
                lineHeight: 1.2,
                marginBottom: '24px',
              }}
            >
              {t('headline')}
            </h2>
            <div className="gold-rule" />
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '16px',
                color: 'var(--gray)',
                lineHeight: 1.8,
                marginBottom: '20px',
              }}
            >
              {t('body1')}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '16px',
                color: 'var(--gray)',
                lineHeight: 1.8,
                marginBottom: '40px',
              }}
            >
              {t('body2')}
            </p>

            {/* Landmark mention */}
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '14px',
                color: 'rgba(201,168,76,0.7)',
                letterSpacing: '0.05em',
                marginBottom: '32px',
              }}
            >
              📍 {t('landmark')}
            </p>

            {/* Stat box */}
            <div
              className="inline-flex flex-col gap-1 px-8 py-6 rounded-sm"
              style={{
                background: 'var(--warm-dark)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '40px',
                  color: 'var(--gold)',
                  lineHeight: 1,
                }}
              >
                70+
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '13px',
                  color: 'var(--gray)',
                  letterSpacing: '0.1em',
                }}
              >
                {t('stat').replace('70+ ', '')}
              </span>
            </div>
          </motion.div>

          {/* Right: 40% — stacked images */}
          <motion.div
            className="lg:col-span-2 relative h-[500px]"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            {/* Back image */}
            <div
              className="absolute"
              style={{
                width: '75%',
                height: '60%',
                top: '0',
                right: '0',
                transform: 'rotate(3deg)',
                border: '2px solid var(--gold)',
                boxShadow: '8px 8px 40px rgba(201,168,76,0.15)',
                overflow: 'hidden',
                borderRadius: '2px',
              }}
            >
              <Image
                src={assetPath('/images/gallery/image5.png')}
                alt="Healy Gymnastics Academy training session"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Middle image */}
            <div
              className="absolute"
              style={{
                width: '70%',
                height: '55%',
                bottom: '60px',
                left: '0',
                transform: 'rotate(-2deg)',
                border: '2px solid var(--gold)',
                boxShadow: '8px 8px 40px rgba(201,168,76,0.15)',
                overflow: 'hidden',
                borderRadius: '2px',
                zIndex: 2,
              }}
            >
              <Image
                src={assetPath('/images/gallery/image8.png')}
                alt="Gymnastics athletes at Healy Academy Kuwait"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Front accent */}
            <div
              className="absolute"
              style={{
                width: '45%',
                height: '38%',
                bottom: '0',
                right: '8%',
                transform: 'rotate(1deg)',
                border: '2px solid var(--gold)',
                boxShadow: '0 0 40px rgba(201,168,76,0.25)',
                overflow: 'hidden',
                borderRadius: '2px',
                zIndex: 3,
                background: 'var(--warm-dark)',
              }}
            >
              <Image
                src={assetPath('/images/gallery/image9.png')}
                alt="Gymnastics competition at Healy Academy"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'rgba(201,168,76,0.05)' }}
              />
            </div>

            {/* Warm glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.08), transparent 70%)',
                zIndex: 4,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
