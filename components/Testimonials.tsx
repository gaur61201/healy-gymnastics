'use client';

import { useTranslations } from '@/contexts/LanguageContext';

interface TestimonialItem {
  quote: string;
  parent: string;
  program: string;
}

function StarRating() {
  return (
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill="var(--gold)">
          <path d="M7 0l1.8 5.5H14l-4.7 3.4 1.8 5.5L7 11 2.9 14.4l1.8-5.5L0 5.5h5.2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div
      className="flex-shrink-0 rounded-sm"
      style={{
        width: '340px',
        padding: '28px',
        background: 'var(--surface)',
        border: '1px solid rgba(201,168,76,0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      <StarRating />
      <p
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: '17px',
          fontStyle: 'italic',
          color: 'var(--white)',
          lineHeight: 1.7,
          marginBottom: '20px',
          fontWeight: 300,
        }}
      >
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}
        >
          <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px' }}>
            {item.parent.charAt(0)}
          </span>
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '13px',
              color: 'var(--white)',
              fontWeight: 600,
            }}
          >
            {item.parent}
          </p>
          <span
            className="px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.2)',
              color: 'var(--gold)',
              fontSize: '10px',
              letterSpacing: '0.08em',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            {item.program}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as TestimonialItem[];

  // Split into two rows
  const row1 = [...items, ...items]; // doubled for seamless loop
  const row2 = [...items.slice().reverse(), ...items.slice().reverse()];

  return (
    <section
      style={{
        background: 'var(--bg)',
        padding: '96px 0',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 w-full flex flex-col items-center">
        <h2
          className="text-center w-full mx-auto"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(36px, 5vw, 60px)',
            color: 'var(--white)',
            letterSpacing: '0.02em',
            marginBottom: '8px',
          }}
        >
          {t('headline')}
        </h2>
        <p
          className="text-center w-full mx-auto"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '14px',
            color: 'var(--gray)',
            letterSpacing: '0.1em',
          }}
        >
          {t('subline')}
        </p>
        <div className="gold-rule mx-auto mt-6" />
      </div>

      {/* Row 1: scroll left */}
      <div className="mb-6 overflow-hidden">
        <div className="scroll-left testimonials-row">
          {row1.map((item, i) => (
            <TestimonialCard key={`row1-${i}`} item={item} />
          ))}
        </div>
      </div>

      {/* Row 2: scroll right */}
      <div className="overflow-hidden">
        <div className="scroll-right testimonials-row">
          {row2.map((item, i) => (
            <TestimonialCard key={`row2-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
