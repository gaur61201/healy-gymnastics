'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/contexts/LanguageContext';

type FilterType = 'all' | 'training' | 'competitions' | 'videos';

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  filter: FilterType;
}

const galleryItems: GalleryItem[] = [
  { type: 'image', src: '/images/gallery/image1.png',  alt: 'Gymnastics training at Healy Academy Kuwait',  filter: 'training'      },
  { type: 'image', src: '/images/gallery/image2.png',  alt: 'Competitive gymnastics Kuwait',               filter: 'competitions'   },
  { type: 'image', src: '/images/gallery/image3.png',  alt: 'Rhythmic gymnastics Kuwait',                  filter: 'training'      },
  { type: 'video', src: '/videos/reel-01.mp4',         alt: 'Gymnastics reel 1',                           filter: 'videos'        },
  { type: 'image', src: '/images/gallery/image4.png',  alt: 'Kids gymnastics training Kuwait',             filter: 'training'      },
  { type: 'image', src: '/images/gallery/image5.png',  alt: 'Healy gymnastics competition highlights',     filter: 'competitions'   },
  { type: 'image', src: '/images/gallery/image6.png',  alt: 'Artistic gymnastics Kuwait',                  filter: 'training'      },
  { type: 'image', src: '/images/gallery/image7.png',  alt: 'Boys gymnastics class Kuwait',                filter: 'training'      },
  { type: 'video', src: '/videos/reel-02.mp4',         alt: 'Gymnastics reel 2',                           filter: 'videos'        },
  { type: 'image', src: '/images/gallery/image8.png',  alt: 'Annual gymnastics competition Kuwait',        filter: 'competitions'   },
  { type: 'image', src: '/images/gallery/image9.png',  alt: 'Elite gymnastics athletes Kuwait',            filter: 'competitions'   },
  { type: 'image', src: '/images/gallery/image10.png', alt: 'Healy Academy gymnasts training',             filter: 'training'      },
  { type: 'video', src: '/videos/reel-03.mp4',         alt: 'Gymnastics reel 3',                           filter: 'videos'        },
  { type: 'image', src: '/images/gallery/image11.png', alt: 'Gymnastics performance Kuwait',               filter: 'competitions'   },
  { type: 'image', src: '/images/gallery/image12.png', alt: 'Young gymnasts Kuwait',                       filter: 'training'      },
  { type: 'video', src: '/videos/reel-04.mp4',         alt: 'Gymnastics reel 4',                           filter: 'videos'        },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[index];
  if (!item) return null;

  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9000] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.90)' }}
      onClick={onClose}
    >
      {/* Media container */}
      <motion.div
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.85 }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative max-w-4xl w-full mx-16"
        onClick={(e) => e.stopPropagation()}
        style={{ border: '1.5px solid rgba(201,168,76,0.3)' }}
      >
        {item.type === 'image' ? (
          <Image
            src={item.src}
            alt={item.alt}
            width={1200}
            height={800}
            style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
          />
        ) : (
          <video
            src={item.src}
            controls
            autoPlay
            playsInline
            className="w-full"
            style={{ maxHeight: '80vh', objectFit: 'contain', display: 'block' }}
          />
        )}
      </motion.div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
        style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)' }}
      >
        ✕
      </button>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl"
          style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)' }}
        >
          ‹
        </button>
      )}

      {/* Next */}
      {index < items.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl"
          style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)' }}
        >
          ›
        </button>
      )}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Gallery() {
  const t = useTranslations('gallery');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [activeFilter, setActiveFilter]   = useState<FilterType>('all');
  const [isPaused, setIsPaused]           = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered    = activeFilter === 'all' ? galleryItems : galleryItems.filter((i) => i.filter === activeFilter);
  const loopedItems = [...filtered, ...filtered]; // duplicate for seamless loop

  // ── Auto-scroll ─────────────────────────────────────────────────────────────
  const stopScroll = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startScroll = useCallback(() => {
    stopScroll();
    intervalRef.current = setInterval(() => {
      const el = carouselRef.current;
      if (!el) return;
      // 40px/sec  →  40 × (50 / 1000) = 2px per 50 ms tick
      el.scrollLeft += 2;
      // Seamless loop: reset when we've scrolled through the first clone set
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half;
      }
    }, 50);
  }, [stopScroll]);

  // Start / stop based on pause state and lightbox
  useEffect(() => {
    if (!isPaused && lightboxIndex === null) {
      startScroll();
    } else {
      stopScroll();
    }
    return stopScroll;
  }, [isPaused, lightboxIndex, startScroll, stopScroll]);

  // Reset scroll to start when filter changes, then restart
  useEffect(() => {
    if (carouselRef.current) carouselRef.current.scrollLeft = 0;
  }, [activeFilter]);

  // ── Keyboard navigation for lightbox ────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight' && lightboxIndex < filtered.length - 1) {
        setLightboxIndex(lightboxIndex + 1);
      } else if (e.key === 'ArrowLeft' && lightboxIndex > 0) {
        setLightboxIndex(lightboxIndex - 1);
      }
    },
    [lightboxIndex, filtered.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // ── Arrow buttons ────────────────────────────────────────────────────────────
  const scrollBy = (delta: number) => {
    carouselRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // ── Filter tabs ──────────────────────────────────────────────────────────────
  const filterTabs: { key: FilterType; label: string }[] = [
    { key: 'all',          label: t('filterAll')          },
    { key: 'training',     label: t('filterTraining')     },
    { key: 'competitions', label: t('filterCompetitions') },
    { key: 'videos',       label: t('filterVideos')       },
  ];

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-pad items-center"
      style={{ background: 'var(--surface)' }}
    >
      {/* ── Centered header ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="w-full text-center flex flex-col items-center mb-4"
        >
          <h2
            className="text-center w-full mx-auto"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(40px, 6vw, 64px)',
              color: 'var(--white)',
              letterSpacing: '0.02em',
            }}
          >
            {t('headline')}
          </h2>
          <p
            className="text-center w-full"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '14px',
              color: 'var(--gray)',
              marginTop: '8px',
            }}
          >
            {t('subline')}
          </p>
          <div className="gold-rule mx-auto mt-6" />
        </motion.div>

        {/* ── Filter tabs ────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 flex-wrap mb-10"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className="relative px-5 py-2 rounded-full text-sm transition-all"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                letterSpacing: '0.08em',
                background: activeFilter === tab.key ? 'rgba(201,168,76,0.15)' : 'transparent',
                color:      activeFilter === tab.key ? 'var(--gold)'            : 'var(--gray)',
                border:     activeFilter === tab.key
                  ? '1px solid rgba(201,168,76,0.4)'
                  : '1px solid rgba(201,168,76,0.1)',
              }}
            >
              {tab.label}
              {activeFilter === tab.key && (
                <motion.div
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-4 right-4 h-0.5"
                  style={{ background: 'var(--gold)' }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Carousel (full-width, no side padding) ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="relative"
      >
        {/* Left arrow */}
        <button
          aria-label="Scroll left"
          onClick={() => scrollBy(-400)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
          style={{
            background: 'rgba(0,0,0,0.60)',
            border: '1px solid #C9A84C',
          }}
        >
          ‹
        </button>

        {/* Scroll track */}
        <div
          ref={carouselRef}
          className="flex overflow-x-hidden py-3 px-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {loopedItems.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="w-72 h-48 rounded-xl overflow-hidden flex-shrink-0 mx-2 cursor-pointer group"
              onClick={() => setLightboxIndex(i % filtered.length)}
            >
              {item.type === 'image' ? (
                <div className="relative w-full h-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                /* Video thumbnail with gold play button */
                <div className="relative w-full h-full bg-black">
                  <video
                    src={item.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.55)', transition: 'filter 0.3s' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(201,168,76,0.9)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="#080808">
                        <path d="M6 4l12 6-12 6z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          aria-label="Scroll right"
          onClick={() => scrollBy(400)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
          style={{
            background: 'rgba(0,0,0,0.60)',
            border: '1px solid #C9A84C',
          }}
        >
          ›
        </button>
      </motion.div>

      {/* ── Lightbox ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((i) => (i !== null ? i - 1 : null))}
            onNext={() => setLightboxIndex((i) => (i !== null ? i + 1 : null))}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
