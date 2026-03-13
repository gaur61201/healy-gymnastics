'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/contexts/LanguageContext';

interface Coach {
  key: string;
  image: string;
  circleSize: number;
  badge?: string;
}

const row1: Coach[] = [
  {
    key: 'rabah',
    image: '/images/coaches/rabah.png',
    circleSize: 200,
    badge: 'FIG CERTIFIED · 20+ YEARS',
  },
  {
    key: 'haitham',
    image: '/images/coaches/haitham.png',
    circleSize: 200,
    badge: 'FIG CERTIFIED · 27+ YEARS',
  },
];

const row2: Coach[] = [
  {
    key: 'ahmed',
    image: '/images/coaches/ahmed-khatab.png',
    circleSize: 160,
    badge: 'FIG CERTIFIED · 15+ YEARS',
  },
  {
    key: 'saber',
    image: '/images/coaches/saber-ahmed.png',
    circleSize: 160,
    badge: "MASTER'S IN ARTISTIC GYMNASTICS · 10+ YEARS",
  },
  {
    key: 'ghadeer',
    image: '/images/coaches/ghadeer.png',
    circleSize: 160,
  },
];

function CoachCard({
  coach,
  index,
  isInView,
}: {
  coach: Coach;
  index: number;
  isInView: boolean;
}) {
  const t = useTranslations('team');
  const [hovered, setHovered] = useState(false);
  const coachData = t.raw(`coaches.${coach.key}`) as {
    name: string;
    title: string;
    experience: string;
    bio: string;
  };

  const size = coach.circleSize;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex flex-col items-center text-center cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Circular photo */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #C9A84C',
          boxShadow: hovered
            ? '0 0 0 6px rgba(201,168,76,0.15), 0 20px 40px rgba(201,168,76,0.2)'
            : '0 0 0 0px rgba(201,168,76,0)',
          transition: 'box-shadow 0.4s ease',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <Image
          src={coach.image}
          alt={coachData.name}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
            filter: hovered ? 'brightness(0.75)' : 'brightness(0.95)',
            transition: 'filter 0.4s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: size === 200 ? '26px' : '22px',
          color: 'var(--gold)',
          letterSpacing: '0.05em',
          lineHeight: 1.1,
          marginTop: '20px',
          marginBottom: '4px',
        }}
      >
        {coachData.name}
      </h3>

      {/* Title */}
      <p
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '12px',
          color: 'var(--gray)',
          letterSpacing: '0.08em',
          marginBottom: coach.badge ? '10px' : '0',
        }}
      >
        {coachData.title}
      </p>

      {/* Badge */}
      {coach.badge && (
        <div
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full"
          style={{
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.3)',
            color: 'var(--gold)',
            fontSize: '9px',
            letterSpacing: '0.15em',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          ★ {coach.badge}
        </div>
      )}

      {/* Bio — slides in on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.p
            key="bio"
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '13px',
              color: 'var(--gray)',
              lineHeight: 1.7,
              maxWidth: '300px',
              marginTop: '12px',
              overflow: 'hidden',
            }}
          >
            {coachData.bio}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Team() {
  const t = useTranslations('team');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="team"
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--bg)' }}
    >
      <div className="w-full flex flex-col items-center px-6">
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
              fontSize: 'clamp(32px, 5vw, 64px)',
              color: 'var(--white)',
              letterSpacing: '0.02em',
              lineHeight: 1,
              marginBottom: '12px',
            }}
          >
            {t('headline')}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '15px',
              color: 'var(--gray)',
              letterSpacing: '0.1em',
            }}
          >
            {t('subline')}
          </p>
          <div className="gold-rule mx-auto mt-6" />
        </motion.div>

        <div className="w-full flex flex-col items-center">
          {/* Row 1 — 2 featured coaches */}
          <div className="flex flex-row justify-center items-start gap-16 w-full max-w-3xl mx-auto">
            {row1.map((coach, i) => (
              <CoachCard key={coach.key} coach={coach} index={i} isInView={isInView} />
            ))}
          </div>

          {/* Row 2 — 3 coaches */}
          <div className="flex flex-row justify-center items-start gap-12 w-full max-w-5xl mx-auto mt-16">
            {row2.map((coach, i) => (
              <CoachCard key={coach.key} coach={coach} index={i + 2} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
