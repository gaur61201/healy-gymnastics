'use client';

import Image from 'next/image';
import { useTranslations } from '@/contexts/LanguageContext';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/healygymnasticsacademy',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/96551703013',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const columns = [
    {
      title: 'Academy',
      links: [
        { label: t('links.about'), onClick: () => scrollTo('about') },
        { label: t('links.team'), onClick: () => scrollTo('team') },
        { label: t('links.competition'), onClick: () => scrollTo('competition') },
        { label: t('links.gallery'), onClick: () => scrollTo('gallery') },
      ],
    },
    {
      title: navT('programs'),
      links: [
        { label: 'Toddler Gymnastics' },
        { label: 'Recreational' },
        { label: 'Competitive Team' },
        { label: 'Boys Artistic' },
        { label: 'Rhythmic' },
        { label: 'Adult Fitness' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { label: t('links.contact'), onClick: () => scrollTo('contact') },
        { label: t('links.whatsapp'), href: 'https://wa.me/96551703013' },
        { label: t('links.privacy') },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: '+965 5170 3013', href: 'tel:+96551703013' },
        { label: 'info@healygym.com', href: 'mailto:info@healygym.com' },
        { label: 'Al Salmiya, Kuwait City' },
        { label: 'healygym.com', href: 'https://www.healygym.com' },
      ],
    },
  ];

  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top: Logo + tagline */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 mb-12"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
        >
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo.png"
              alt="Healy Gymnastics Academy"
              width={48}
              height={48}
              style={{ objectFit: 'contain' }}
            />
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '22px',
                  color: 'var(--gold)',
                  letterSpacing: '0.08em',
                  lineHeight: 1.1,
                }}
              >
                HEALY GYMNASTICS ACADEMY
              </p>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: 'var(--gray)' }}>
                {t('tagline')}
              </p>
              <p style={{ fontFamily: 'var(--font-cairo)', fontSize: '12px', color: 'rgba(201,168,76,0.5)' }}>
                {t('taglineAr')}
              </p>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  color: 'var(--gray)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,168,76,0.4)';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(201,168,76,0.15)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gray)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,168,76,0.15)';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(201,168,76,0.08)';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <p
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '16px',
                  color: 'var(--gold)',
                  letterSpacing: '0.1em',
                  marginBottom: '16px',
                }}
              >
                {col.title}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link, i) => (
                  <li key={i}>
                    {link.href ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{
                          fontFamily: 'var(--font-dm-sans)',
                          fontSize: '13px',
                          color: 'var(--gray)',
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                        }}
                        className="hover:text-yellow-400"
                      >
                        {link.label}
                      </a>
                    ) : link.onClick ? (
                      <button
                        onClick={link.onClick}
                        style={{
                          fontFamily: 'var(--font-dm-sans)',
                          fontSize: '13px',
                          color: 'var(--gray)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          textAlign: 'left',
                          transition: 'color 0.2s',
                        }}
                        className="hover:text-yellow-400"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'var(--gray)' }}>
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}
        >
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: 'var(--gray)' }}>
            {t('copyright')}
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(201,168,76,0.1)' }}
            >
              <Image src="/images/logo.png" alt="HGA" width={14} height={14} style={{ objectFit: 'contain' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '13px', color: 'rgba(201,168,76,0.4)', letterSpacing: '0.1em' }}>
              HEALY GYMNASTICS ACADEMY · KUWAIT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
