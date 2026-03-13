'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/contexts/LanguageContext';

const schema = z.object({
  parentName: z.string().min(2, 'parentNameRequired'),
  childName: z.string().min(2, 'childNameRequired'),
  childAge: z.string().min(1, 'ageRequired'),
  phone: z.string().min(8, 'phoneInvalid').regex(/^[\d\s+()-]+$/, 'phoneInvalid'),
  program: z.string().min(1, 'programRequired'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const programs = [
  'Toddler Gymnastics (Ages 3–5)',
  'Recreational Gymnastics (Ages 5–12)',
  'Competitive Team (Ages 6–16)',
  'Boys Artistic Gymnastics (Ages 5–16)',
  'Rhythmic Gymnastics (Ages 5–14)',
  'Adult Fitness (Ages 16+)',
];

const ages = Array.from({ length: 14 }, (_, i) => `${i + 3}`);

export default function EnrollmentForm() {
  const t = useTranslations('enrollment');
  const tErr = useTranslations('enrollment.errors');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const msg = encodeURIComponent(
      `${t('whatsappPrefix')}\n\n` +
      `Parent: ${data.parentName}\n` +
      `Child: ${data.childName} (Age ${data.childAge})\n` +
      `Phone: ${data.phone}\n` +
      `Program: ${data.program}` +
      (data.message ? `\nMessage: ${data.message}` : '')
    );
    window.open(`https://wa.me/96551703013?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  const fieldClass = 'input-gold w-full px-4 py-3 rounded-sm text-sm';

  return (
    <section
      id="enroll"
      ref={ref}
      className="section-pad w-full flex flex-col items-center text-center"
      style={{ background: 'var(--surface)' }}
    >
      <div className="w-full max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-center w-full"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: 'var(--white)',
              letterSpacing: '0.02em',
              marginBottom: '8px',
            }}
          >
            {t('headline')}
          </h2>
          <p className="text-center w-full mx-auto" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: 'var(--gray)' }}>
            {t('subline')}
          </p>
          <div className="gold-rule mx-auto mt-6" />
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Parent Name */}
              <div>
                <input
                  {...register('parentName')}
                  placeholder={t('parentName')}
                  className={fieldClass}
                />
                {errors.parentName && (
                  <p className="text-red-400 text-xs mt-1">
                    {tErr(errors.parentName.message as 'parentNameRequired' | 'childNameRequired' | 'ageRequired' | 'phoneRequired' | 'phoneInvalid' | 'programRequired')}
                  </p>
                )}
              </div>

              {/* Child Name */}
              <div>
                <input
                  {...register('childName')}
                  placeholder={t('childName')}
                  className={fieldClass}
                />
                {errors.childName && (
                  <p className="text-red-400 text-xs mt-1">
                    {tErr(errors.childName.message as 'parentNameRequired' | 'childNameRequired' | 'ageRequired' | 'phoneRequired' | 'phoneInvalid' | 'programRequired')}
                  </p>
                )}
              </div>

              {/* Age + Phone row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <select
                    {...register('childAge')}
                    className={fieldClass}
                    style={{
                      background: 'var(--surface2)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      color: 'var(--white)',
                    }}
                  >
                    <option value="">{t('selectAge')}</option>
                    {ages.map((a) => (
                      <option key={a} value={a}>{a} {parseInt(a) === 1 ? 'year' : 'years'}</option>
                    ))}
                  </select>
                  {errors.childAge && (
                    <p className="text-red-400 text-xs mt-1">
                      {tErr('ageRequired')}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register('phone')}
                    placeholder={t('phone')}
                    type="tel"
                    className={fieldClass}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">
                      {tErr(errors.phone.message as 'parentNameRequired' | 'childNameRequired' | 'ageRequired' | 'phoneRequired' | 'phoneInvalid' | 'programRequired')}
                    </p>
                  )}
                </div>
              </div>

              {/* Program */}
              <div>
                <select
                  {...register('program')}
                  className={fieldClass}
                  style={{
                    background: 'var(--surface2)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    color: 'var(--white)',
                  }}
                >
                  <option value="">{t('selectProgram')}</option>
                  {programs.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.program && (
                  <p className="text-red-400 text-xs mt-1">{tErr('programRequired')}</p>
                )}
              </div>

              {/* Message */}
              <textarea
                {...register('message')}
                placeholder={t('message')}
                rows={4}
                className={fieldClass}
                style={{ resize: 'none' }}
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full py-4 rounded-sm mt-2"
                style={{ fontSize: '15px', letterSpacing: '0.12em', opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? '...' : t('submit')}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="flex flex-col items-center gap-6 py-16 text-center"
            >
              {/* Gold checkmark */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15, delay: 0.2 }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="38" stroke="var(--gold)" strokeWidth="3" fill="rgba(201,168,76,0.1)" />
                  <path d="M22 40l14 14 22-22" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </motion.div>
              <p
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '28px',
                  color: 'var(--gold)',
                  letterSpacing: '0.05em',
                }}
              >
                {t('success')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
