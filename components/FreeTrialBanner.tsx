'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from '@/contexts/LanguageContext';
import { useModal } from '@/contexts/ModalContext';

type Particle = { id: number; x: number; y: number; size: number; duration: number; delay: number };

export default function FreeTrialBanner() {
  const t = useTranslations('freeTrial');
  const { openModal } = useModal();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  return (
    <section
      ref={ref}
      className="diagonal-clip relative overflow-hidden w-full flex flex-col items-center text-center"
      style={{
        background: '#080808',
        padding: '100px 0',
      }}
    >
      {/* Particle dots */}
      <div suppressHydrationWarning>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'var(--gold)',
            opacity: 0.3,
            animation: `particleDrift ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      </div>

      {/* Gold gradient bars */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 w-full flex flex-col items-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-label mb-6"
          style={{ fontSize: '12px' }}
        >
          {t('label')}
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center w-full"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            color: 'var(--white)',
            letterSpacing: '0.02em',
            lineHeight: 1,
            marginBottom: '20px',
          }}
        >
          {t('headline')}
        </motion.h2>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center w-full mx-auto"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '16px',
            color: 'var(--gray)',
            marginBottom: '40px',
            lineHeight: 1.6,
          }}
        >
          {t('subline')}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={openModal}
            className="btn-gold px-12 py-5 rounded-sm"
            style={{ fontSize: '18px', letterSpacing: '0.12em' }}
          >
            {t('cta')}
          </button>

          <a
            href="https://wa.me/96551703013"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '13px',
              color: 'var(--gray)',
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t('whatsapp')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
