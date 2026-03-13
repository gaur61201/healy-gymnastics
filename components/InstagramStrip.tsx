'use client';

import { useTranslations } from 'next-intl';

const reels = [
  '/videos/reel-01.mp4',
  '/videos/reel-02.mp4',
  '/videos/reel-03.mp4',
  '/videos/reel-04.mp4',
  '/videos/reel-05.mp4',
  '/videos/reel-06.mp4',
];

function ReelCard({ src }: { src: string }) {
  return (
    <a
      href="https://www.instagram.com/healygymnasticsacademy"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0 overflow-hidden rounded-sm"
      style={{
        width: '200px',
        height: '200px',
        border: '1px solid rgba(201,168,76,0.15)',
        transition: 'border-color 0.3s',
      }}
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(0.8)', transition: 'filter 0.3s' }}
      />
      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        style={{ background: 'rgba(201,168,76,0.15)' }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="var(--gold)" stroke="none" />
        </svg>
      </div>
      {/* Gold border on hover */}
      <div
        className="absolute inset-0 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ border: '2px solid var(--gold)' }}
      />
    </a>
  );
}

export default function InstagramStrip() {
  const t = useTranslations('instagram');
  // Duplicate for seamless loop
  const allReels = [...reels, ...reels];

  return (
    <section
      style={{ background: 'var(--surface2)', padding: '80px 0', overflow: 'hidden' }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center w-full flex flex-col items-center">
        <h2
          className="text-center w-full mx-auto"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(32px, 4vw, 52px)',
            color: 'var(--white)',
            letterSpacing: '0.05em',
            marginBottom: '8px',
          }}
        >
          {t('headline')}
        </h2>
        <a
          href="https://www.instagram.com/healygymnasticsacademy"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '15px',
            color: 'var(--gold)',
            letterSpacing: '0.05em',
            textDecoration: 'none',
          }}
          className="hover:opacity-80 transition-opacity"
        >
          {t('handle')}
        </a>
      </div>

      {/* Scrolling strip */}
      <div className="relative overflow-hidden">
        <div className="scroll-left flex gap-4 py-2">
          {allReels.map((reel, i) => (
            <ReelCard key={`${reel}-${i}`} src={reel} />
          ))}
        </div>
      </div>

      {/* Follow CTA */}
      <div className="flex justify-center mt-10">
        <a
          href="https://www.instagram.com/healygymnasticsacademy"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline px-8 py-3 rounded-sm"
          style={{
            fontSize: '14px',
            letterSpacing: '0.1em',
            textDecoration: 'none',
          }}
        >
          {t('cta')}
        </a>
      </div>
    </section>
  );
}
