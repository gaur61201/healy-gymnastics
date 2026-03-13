'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useModal } from '@/contexts/ModalContext';

interface Program {
  key: string;
  icon: string;
  color: string;
}

const programList: Program[] = [
  { key: 'toddler', icon: '🌟', color: '#C9A84C' },
  { key: 'recreational', icon: '🤸', color: '#C9A84C' },
  { key: 'competitive', icon: '🏆', color: '#E8C96A' },
  { key: 'boys', icon: '💪', color: '#C9A84C' },
  { key: 'rhythmic', icon: '🎀', color: '#C9A84C' },
  { key: 'adult', icon: '⭐', color: '#C9A84C' },
];

export default function Programs() {
  const t = useTranslations('programs');
  const { openModal } = useModal();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="programs"
      ref={ref}
      className="section-pad w-full flex flex-col items-center"
      style={{ background: 'var(--surface)' }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(40px, 6vw, 72px)',
              color: 'var(--white)',
              letterSpacing: '0.02em',
            }}
          >
            {t('headline')}
          </h2>
          <div className="gold-rule mx-auto mt-4" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
          {programList.map((prog, i) => {
            const items = t.raw(`items.${prog.key}`) as {
              name: string;
              age: string;
              level: string;
              description: string;
            };

            return (
              <motion.div
                key={prog.key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-hover gold-top-border rounded-sm flex flex-col"
                style={{
                  background: 'var(--bg)',
                  padding: '32px',
                  border: '1px solid rgba(201,168,76,0.08)',
                }}
              >
                {/* Icon */}
                <div
                  className="text-4xl mb-4"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.3))' }}
                >
                  {prog.icon}
                </div>

                {/* Name */}
                <h3
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: '28px',
                    color: 'var(--white)',
                    letterSpacing: '0.02em',
                    marginBottom: '12px',
                  }}
                >
                  {items.name}
                </h3>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: 'rgba(201,168,76,0.12)',
                      border: '1px solid rgba(201,168,76,0.25)',
                      color: 'var(--gold)',
                      fontFamily: 'var(--font-dm-sans)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {items.age}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: 'rgba(201,168,76,0.08)',
                      border: '1px solid rgba(201,168,76,0.15)',
                      color: 'var(--gray)',
                      fontFamily: 'var(--font-dm-sans)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {items.level}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="flex-grow"
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '14px',
                    color: 'var(--gray)',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                  }}
                >
                  {items.description}
                </p>

                {/* CTA */}
                <button
                  onClick={openModal}
                  className="btn-gold w-full py-3 text-sm rounded-sm mt-auto"
                  style={{ fontSize: '14px' }}
                >
                  {t('bookTrial')}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
