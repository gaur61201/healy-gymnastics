'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  labelKey: string;
}

const stats: StatItem[] = [
  { value: 10, suffix: '+', labelKey: 'years' },
  { value: 4, suffix: '', labelKey: 'coaches' },
  { value: 16, suffix: 'K+', labelKey: 'community' },
  { value: 1, suffix: '', prefix: '#', labelKey: 'ranked' },
];

function useCounter(target: number, duration: number = 1500, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOut cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);

  return count;
}

function StatCounter({ stat, started }: { stat: StatItem; started: boolean }) {
  const t = useTranslations('stats');
  const count = useCounter(stat.value, 1500, started);

  return (
    <div className="flex flex-col items-center text-center px-8">
      <div
        className="gold-shimmer"
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(48px, 5vw, 72px)',
          lineHeight: 1,
          letterSpacing: '0.02em',
        }}
      >
        {stat.prefix || ''}{count}{stat.suffix}
      </div>
      <p
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '13px',
          color: 'var(--gray)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: '8px',
        }}
      >
        {t(stat.labelKey as 'years' | 'coaches' | 'community' | 'ranked')}
      </p>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="diagonal-clip relative z-10"
      style={{
        background: 'var(--surface)',
        padding: '64px 0',
        marginTop: '-2px',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="relative">
              {i > 0 && (
                <div
                  className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-12"
                  style={{ width: '1px', background: 'rgba(201,168,76,0.2)' }}
                />
              )}
              <StatCounter stat={stat} started={started} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
