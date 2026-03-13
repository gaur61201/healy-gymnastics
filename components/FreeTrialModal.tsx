'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/contexts/LanguageContext';
import { useModal } from '@/contexts/ModalContext';
import { assetPath } from '@/utils/assetPath';

export default function FreeTrialModal() {
  const t = useTranslations('modal');
  const { isOpen, openModal, closeModal } = useModal();

  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('');

  // Auto-open after 7 seconds (once per session)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const shown = sessionStorage.getItem('hga-trial-shown');
    if (shown) return;

    const timer = setTimeout(() => {
      openModal();
      sessionStorage.setItem('hga-trial-shown', 'true');
    }, 7000);

    return () => clearTimeout(timer);
  }, [openModal]);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeModal]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `${t('whatsappMsg')}\n\n` +
      `Parent: ${parentName}\n` +
      `Child: ${childName} (Age ${childAge})\n` +
      `Phone: ${phone}\n` +
      `Program: ${program}`
    );
    window.open(`https://wa.me/96551703013?text=${msg}`, '_blank');
    closeModal();
  };

  const ageOptions = t.raw('ageOptions') as string[];
  const programs = t.raw('programs') as string[];

  const thumbnails = [
    '/images/gallery/image1.png',
    '/images/gallery/image4.png',
    '/images/gallery/image7.png',
  ];

  const fieldStyle: React.CSSProperties = {
    background: '#1a1a1a',
    border: '1px solid rgba(201,168,76,0.2)',
    color: '#F5F5F0',
    padding: '12px 14px',
    borderRadius: '2px',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    width: '100%',
    fontFamily: 'var(--font-dm-sans)',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-[99000] p-4"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(4px)' }}
          onClick={closeModal}
        >
          <motion.div
            key="modal-card"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full overflow-y-auto"
            style={{
              maxWidth: '480px',
              maxHeight: '90vh',
              background: '#111111',
              borderTop: '3px solid var(--gold)',
              borderRadius: '12px',
              boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(201,168,76,0.1)',
            }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110"
              style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gray)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M13 1L1 13M1 1l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div style={{ padding: '28px 28px 32px' }}>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4"
                style={{
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  color: 'var(--gold)',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                {t('badge')}
              </div>

              {/* Headline */}
              <h2
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '36px',
                  color: 'var(--white)',
                  letterSpacing: '0.02em',
                  lineHeight: 1.1,
                  marginBottom: '8px',
                }}
              >
                {t('headline')}
              </h2>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'var(--gray)', marginBottom: '20px' }}>
                {t('subline')}
              </p>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-2 mb-6 rounded-sm overflow-hidden">
                {thumbnails.map((src, i) => (
                  <div key={i} className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '1', height: '80px' }}>
                    <Image
                      src={assetPath(src)}
                      alt={`Healy Gymnastics ${i + 1}`}
                      fill
                      style={{ objectFit: 'cover', filter: 'brightness(0.8)' }}
                    />
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder={t('parentName')}
                  required
                  style={fieldStyle}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = 'var(--gold)';
                    (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = 'rgba(201,168,76,0.2)';
                    (e.target as HTMLInputElement).style.boxShadow = 'none';
                  }}
                />
                <input
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder={t('childName')}
                  required
                  style={fieldStyle}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = 'var(--gold)';
                    (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = 'rgba(201,168,76,0.2)';
                    (e.target as HTMLInputElement).style.boxShadow = 'none';
                  }}
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    required
                    style={{...fieldStyle, background: '#1a1a1a'}}
                    onFocus={(e) => {
                      (e.target as HTMLSelectElement).style.borderColor = 'var(--gold)';
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLSelectElement).style.borderColor = 'rgba(201,168,76,0.2)';
                    }}
                  >
                    <option value="">{t('childAge')}</option>
                    {ageOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('phone')}
                    type="tel"
                    required
                    style={fieldStyle}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'var(--gold)';
                      (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)';
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'rgba(201,168,76,0.2)';
                      (e.target as HTMLInputElement).style.boxShadow = 'none';
                    }}
                  />
                </div>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  required
                  style={{...fieldStyle, background: '#1a1a1a'}}
                  onFocus={(e) => {
                    (e.target as HTMLSelectElement).style.borderColor = 'var(--gold)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLSelectElement).style.borderColor = 'rgba(201,168,76,0.2)';
                  }}
                >
                  <option value="">{t('programInterest')}</option>
                  {programs.map((p, i) => (
                    <option key={i} value={p}>{p}</option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="btn-gold w-full py-4 rounded-sm mt-2"
                  style={{ fontSize: '15px', letterSpacing: '0.1em' }}
                >
                  {t('submit')}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
