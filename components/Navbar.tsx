'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations, useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '@/contexts/ModalContext';

const navSections = ['home', 'programs', 'team', 'gallery', 'competition', 'contact'];
const sectionIds = ['hero', 'programs', 'team', 'gallery', 'competition', 'contact'];

export default function Navbar() {
  const t = useTranslations('nav');
  const { lang, isRTL, toggleLanguage } = useLanguage();
  const { openModal } = useModal();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = sectionIds.indexOf(entry.target.id);
          if (idx !== -1) {
            setActiveSection(navSections[idx]);
          }
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (sectionKey: string) => {
    const idx = navSections.indexOf(sectionKey);
    const id = sectionIds[idx];
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Logo + Brand */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo.png"
              alt="HGA Logo"
              width={32}
              height={32}
              style={{ objectFit: 'contain' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: '18px',
                color: 'var(--gold)',
                letterSpacing: '0.08em',
              }}
            >
              HEALY GYMNASTICS ACADEMY
            </span>
          </button>

          {/* Center: Nav links (desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navSections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
              >
                {t(section as 'home' | 'programs' | 'team' | 'gallery' | 'competition' | 'contact')}
              </button>
            ))}
          </div>

          {/* Right: CTA + Lang toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={openModal}
              className="btn-gold px-5 py-2 text-sm rounded-sm"
            >
              {t('bookTrial')}
            </button>
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium transition-colors hover:text-yellow-400"
              style={{ color: 'var(--gray)', letterSpacing: '0.05em' }}
            >
              {lang === 'en' ? 'عر' : 'EN'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-0.5"
              style={{ background: 'var(--gold)' }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-0.5"
              style={{ background: 'var(--gold)' }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-0.5"
              style={{ background: 'var(--gold)' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? -100 : 100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
            style={{ background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col items-center gap-8">
              {navSections.map((section, i) => (
                <motion.button
                  key={section}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  onClick={() => scrollToSection(section)}
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: '40px',
                    color: activeSection === section ? 'var(--gold)' : 'var(--white)',
                    letterSpacing: '0.1em',
                  }}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {t(section as 'home' | 'programs' | 'team' | 'gallery' | 'competition' | 'contact')}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 mt-4"
              >
                <button
                  onClick={() => { openModal(); setMobileOpen(false); }}
                  className="btn-gold px-8 py-3 text-base rounded-sm"
                >
                  {t('bookTrial')}
                </button>
                <button
                  onClick={toggleLanguage}
                  className="btn-outline px-4 py-3 text-base rounded-sm"
                >
                  {lang === 'en' ? 'عر' : 'EN'}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
