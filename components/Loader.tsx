'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Loader() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const shown = sessionStorage.getItem('hga-loader-shown');
    if (shown) return;

    setShow(true);
    sessionStorage.setItem('hga-loader-shown', 'true');

    // Phase 1: gymnast runs (0-1000ms)
    // Phase 2: letters appear (800-1800ms)
    // Phase 3: full reveal (1600-2800ms)
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const t3 = setTimeout(() => setPhase(3), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (!show) return null;

  const letters = ['H', '·', 'G', '·', 'A'];

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#080808' }}
        >
          {/* Gymnast silhouette running across */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
            <div className="gymnast-run inline-block">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 0 12px #C9A84C)' }}
              >
                {/* Head */}
                <circle cx="40" cy="10" r="6" fill="#C9A84C" />
                {/* Body */}
                <line x1="40" y1="16" x2="40" y2="45" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" />
                {/* Left arm up */}
                <line x1="40" y1="25" x2="15" y2="10" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
                {/* Right arm down/out */}
                <line x1="40" y1="25" x2="65" y2="35" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
                {/* Left leg kick back */}
                <line x1="40" y1="45" x2="20" y2="65" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
                {/* Right leg forward kick */}
                <line x1="40" y1="45" x2="65" y2="30" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
                {/* Foot right */}
                <line x1="65" y1="30" x2="75" y2="38" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                {/* Foot left */}
                <line x1="20" y1="65" x2="12" y2="72" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Gold line sweep */}
          {phase >= 1 && (
            <div
              className="absolute"
              style={{
                top: '50%',
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'var(--gold)',
                transformOrigin: 'left',
                animation: 'sweepLine 0.8s ease-out forwards',
                opacity: 0.4,
              }}
            />
          )}

          {/* Center content */}
          <div className="flex flex-col items-center gap-4 z-10">
            {/* Logo */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Healy Gymnastics Academy Logo"
                  width={60}
                  height={60}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </motion.div>
            )}

            {/* H · G · A letters */}
            {phase >= 1 && (
              <div className="flex items-center gap-3">
                {letters.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.1,
                      ease: 'easeOut',
                    }}
                    style={{
                      fontFamily: 'var(--font-bebas)',
                      fontSize: '80px',
                      color: 'var(--gold)',
                      lineHeight: 1,
                      letterSpacing: letter === '·' ? '0' : '0.05em',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Full name */}
            {phase >= 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '14px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--gray)',
                }}
              >
                HEALY GYMNASTICS ACADEMY
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
