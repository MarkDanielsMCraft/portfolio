import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Clock,
  Coffee,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Layout,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  ShieldCheck,
  Sun,
  User,
  X
} from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import ReactLenis from 'lenis/react';

const DecryptText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [4, -4]);
  const rotateY = useTransform(x, [-100, 100], [-4, 4]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SystemStatus = ({ statusText, locationText, timeLocale }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-24 right-6 z-50 hidden md:flex items-center gap-4 px-4 py-2 surface border rounded-full text-[10px] mono text-muted shadow-soft">
      <div className="flex items-center gap-2">
        <Globe size={12} className="text-accent" />
        <span>{locationText}</span>
      </div>
      <div className="w-px h-3 border-l border-[var(--color-border)]" />
      <div className="flex items-center gap-2">
        <Clock size={12} className="text-emerald-600" />
        <span className="text-emerald-600">{time.toLocaleTimeString(timeLocale)}</span>
      </div>
      <div className="w-px h-3 border-l border-[var(--color-border)]" />
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-emerald-600 font-semibold">{statusText}</span>
      </div>
    </div>
  );
};

const RevealOnScroll = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.2 1']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
};

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.08, y: middleY * 0.08 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;
  return (
    <motion.div
      className="relative"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 140, damping: 18, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const ThemeToggle = ({ theme, onToggle, labels }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label="Toggle theme"
    className="flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold tracking-wide surface hover:shadow-soft transition"
  >
    {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
    <span>{theme === 'light' ? labels.dark : labels.light}</span>
  </button>
);

const LanguageToggle = ({ language, onToggle, label }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label="Toggle language"
    className="flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold tracking-wide surface hover:shadow-soft transition"
  >
    <span className="mono text-[10px] tracking-[0.2em]">{label}</span>
    <span className="text-base leading-none" aria-hidden>
      {language === 'en' ? '🇬🇧' : '🇩🇪'}
    </span>
    <span className="mono text-[10px] tracking-[0.2em]">EN/DE</span>
    <span className="sr-only">{language.toUpperCase()}</span>
  </button>
);

const SkillBadge = ({ text, variant = 'default' }) => (
  <span className={`badge badge-${variant}`}>{text}</span>
);

const QAReportModal = ({ isOpen, onClose, report, labels }) => {
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full max-w-3xl surface border rounded-3xl p-6 md:p-8 shadow-strong max-h-[85vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="qa-report-title"
        aria-describedby="qa-report-subtitle"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs mono text-muted">{labels.reportLabel}</p>
            <h3 id="qa-report-title" className="text-2xl font-semibold mt-2">{report.title}</h3>
            <p id="qa-report-subtitle" className="text-sm text-muted mt-2">{report.subtitle}</p>
          </div>
          <button
            ref={closeButtonRef}
            className="icon-button"
            onClick={onClose}
            aria-label="Close report"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {report.summary.map((item) => (
            <div key={item.label} className="surface-soft rounded-2xl p-4">
              <p className="text-xs mono text-muted">{item.label}</p>
              <p className="text-lg font-semibold mt-2">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-xs mono text-muted">{labels.findings}</p>
          <div className="mt-3 grid gap-3">
            {report.findings.map((finding) => (
              <div key={finding.title} className="surface-soft rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{finding.title}</p>
                  <span className={`badge ${finding.severity === 'High' ? 'badge-accent' : 'badge-muted'}`}>
                    {finding.severity}
                  </span>
                </div>
                <p className="text-sm text-muted mt-2">{finding.description}</p>
                <p className="text-xs mono text-muted mt-3">{labels.status}: {finding.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('theme') || 'light';
  });
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem('language') || 'en';
  });
  const [activeReport, setActiveReport] = useState(null);
  const [isDockCompact, setIsDockCompact] = useState(false);
  const dockTimerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      setIsDockCompact(true);
      if (dockTimerRef.current) {
        window.clearTimeout(dockTimerRef.current);
      }
      dockTimerRef.current = window.setTimeout(() => {
        setIsDockCompact(false);
      }, 1600);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      if (dockTimerRef.current) {
        window.clearTimeout(dockTimerRef.current);
      }
    };
  }, []);

  const socialLinks = {
    github: 'https://github.com/MarkDanielsMCraft',
    linkedin: 'https://www.linkedin.com/in/markdanielsm',
    email: 'redselig-63-besorgung@icloud.com',
    cvUrl: 'mailto:redselig-63-besorgung@icloud.com?subject=CV%20Request'
  };
  const content = {
    en: {
      nav: [
        { label: 'About', href: '#about' },
        { label: 'Profiles', href: '#profiles' },
        { label: 'Services', href: '#services' },
        { label: 'Case Studies', href: '#case-studies' },
        { label: 'Process', href: '#process' },
        { label: 'Experience', href: '#experience' },
        { label: 'Education', href: '#education' }
      ],
      systemStatus: {
        location: 'AUGSBURG, DE',
        status: 'AVAILABLE',
        timeLocale: 'en-GB'
      },
      theme: { dark: 'Dark', light: 'Light' },
      language: { label: 'LANG' },
      hero: {
        badge: 'Seeking working student roles',
        title: 'Quality-first systems and data integrity for products that need to',
        titleAccent: 'ship clean',
        subtitle:
          'International Information Systems student at TH Augsburg. I focus on data validation, backend logic, and manual testing, using projects to apply coursework and improve real systems.',
        impact:
          'Recent focus: data validation for multi-cohort tracking, React 19 QA upgrades, and mobile-first UX verification.',
        proof: ['Manual QA', 'Data Validation', 'Backend Logic', 'React 19', 'SQL', 'Git / GitHub'],
        ctaPrimary: 'View case studies',
        ctaSecondary: 'CV',
        location: 'Augsburg, DE',
        languages: 'EN / DE / Luganda'
      },
      profile: {
        label: 'SYSTEM PROFILE',
        status: 'Available',
        focusLabel: 'Core focus',
        focusValue: 'Data QA + backend logic',
        highlights: [
          { label: 'Primary', value: 'Manual QA' },
          { label: 'Secondary', value: 'Data Validation' },
          { label: 'Currently', value: 'React 19' },
          { label: 'Based in', value: 'Augsburg' }
        ],
        tagline: 'Build. Verify. Improve.'
      },
      about: {
        label: 'ABOUT',
        title: 'Student profile',
        body:
          'I study International Information Systems to connect business needs with reliable technical delivery. I enjoy working with data, backend logic, and QA workflows, and I use small projects to turn coursework into practical systems.',
        skills: [
          { text: 'Java (OOP)' },
          { text: 'SQL / Databases' },
          { text: 'Backend Logic' },
          { text: 'Manual QA', variant: 'accent' },
          { text: 'Data Validation', variant: 'accent' },
          { text: 'UI/UX Verification' },
          { text: 'Git / GitHub' },
          { text: 'React (Learning)' }
        ]
      },
      cv: {
        label: 'CV',
        title: 'Request my CV',
        subtitle: 'Available on request to protect personal details.',
        view: 'Request CV'
      },
      profiles: {
        label: 'PROFILES',
        title: 'Social footprint',
        subtitle: 'Where I share work, write updates, and connect with teams.',
        items: [
          {
            title: 'LinkedIn',
            subtitle: 'Work history, education, and QA focus.',
            link: 'https://www.linkedin.com/in/markdanielsm',
            icon: <Linkedin size={18} />,
            meta: ['Open to roles', 'International Systems', 'Data + QA'],
            stats: [
              { label: 'Focus', value: 'QA + Data' },
              { label: 'Locale', value: 'Augsburg' }
            ]
          },
          {
            title: 'GitHub',
            subtitle: 'Projects, experiments, and learning logs.',
            link: 'https://github.com/MarkDanielsMCraft',
            icon: <Github size={18} />,
            meta: ['React 19', 'QA notes', 'Mini tools'],
            stats: [
              { label: 'Primary', value: 'Web QA' },
              { label: 'Stack', value: 'React / Vite' }
            ]
          },
          {
            title: 'Email',
            subtitle: 'Direct contact for collaborations and roles.',
            link: 'mailto:redselig-63-besorgung@icloud.com',
            icon: <Mail size={18} />,
            meta: ['Fast reply', 'Open for QA', 'Working student'],
            stats: [
              { label: 'Availability', value: 'Open' },
              { label: 'Type', value: 'Working student' }
            ]
          }
        ]
      },
      services: {
        label: 'SERVICES',
        title: 'What I deliver',
        tagline: 'systems-first QA',
        items: [
          {
            title: 'QA & Release Confidence',
            description:
              'Manual testing for UI, logic, and edge cases. Clear bug reports with reproduction steps and impact notes.',
            icon: <ShieldCheck size={18} />
          },
          {
            title: 'Data Quality Assurance',
            description:
              'Validation of spreadsheets, dashboards, and operational data. Cross-checks for consistency and integrity.',
            icon: <Database size={18} />
          },
          {
            title: 'UX Verification',
            description:
              'Usability checks across devices, privacy banners, and friction analysis for conversion flows.',
            icon: <Layout size={18} />
          }
        ]
      },
      caseStudies: {
        label: 'CASE STUDIES',
        title: 'Proof of work',
        challenge: 'Challenge',
        actions: 'Actions',
        outcomes: 'Outcomes',
        report: 'Open QA report',
        visit: 'Visit project',
        items: [
          {
            title: 'StartGermany Survival Kit',
            focus: 'QA + React 19 upgrade validation',
            summary:
              'Tested a responsive guide platform during a React 19 upgrade, focusing on navigation, counters, and tag filters.',
            challenge: 'Prevent regressions during a major framework upgrade while keeping guide data reliable.',
            actions: [
              'Verified dynamic counters and tags with manual edge-case runs.',
              'Configured ESLint to catch syntax issues before deployment.',
              'Validated responsive layouts on desktop and mobile views.'
            ],
            outcomes: [
              'Stable navigation and data accuracy after upgrade.',
              'Cleaner QA workflow before release.',
              'Clearer UI behavior on small screens.'
            ],
            signals: ['Cross-browser checks', 'React 19 upgrade path', 'Data accuracy checks'],
            tech: ['React 19', 'ESLint', 'Vite', 'Manual QA'],
            link: 'https://startgermany.vercel.app/',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200',
            report: {
              title: 'StartGermany QA Snapshot',
              subtitle: 'Manual regression run focused on navigation, counters, and filters.',
              summary: [
                { label: 'Coverage', value: 'Desktop + Mobile' },
                { label: 'Browsers', value: 'Chrome + Safari' },
                { label: 'Status', value: 'Release-ready' }
              ],
              findings: [
                {
                  title: 'Counter sync on rapid filter changes',
                  severity: 'High',
                  description: 'Counters can lag by one state when filters are toggled quickly.',
                  status: 'Resolved'
                },
                {
                  title: 'Tag filter focus state on mobile',
                  severity: 'Medium',
                  description: 'Focus outline missing after scroll on small screens.',
                  status: 'Resolved'
                }
              ]
            }
          },
          {
            title: 'Lyia Braids Booking Flow',
            focus: 'UX + compliance testing',
            summary: 'Designed and tested a mobile-first booking experience with a direct WhatsApp handoff.',
            challenge: 'Reduce booking friction while keeping GDPR compliance and cross-browser consistency.',
            actions: [
              'Tested layout behavior across Chrome, Safari, and mobile views.',
              'Implemented cookie consent and verified interaction states.',
              'Optimized CTA placement for fast contact.'
            ],
            outcomes: [
              'Consistent experience across browsers.',
              'Clear consent flow without blocking the booking path.',
              'Streamlined contact journey.'
            ],
            signals: ['Consent compliance checks', 'Mobile CTA placement', 'UX friction audit'],
            tech: ['Tailwind CSS', 'UX QA', 'GDPR'],
            link: 'https://lyia-braids.vercel.app/',
            image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200',
            report: {
              title: 'Lyia Braids QA Snapshot',
              subtitle: 'Mobile-first UX validation with consent coverage.',
              summary: [
                { label: 'Coverage', value: 'Mobile-first' },
                { label: 'Browsers', value: 'Chrome + Safari' },
                { label: 'Status', value: 'Live' }
              ],
              findings: [
                {
                  title: 'Cookie banner overlap on smaller screens',
                  severity: 'Medium',
                  description: 'Consent banner overlaps CTA on narrow devices.',
                  status: 'Resolved'
                },
                {
                  title: 'WhatsApp CTA contrast',
                  severity: 'Low',
                  description: 'Contrast adjusted for better readability in bright conditions.',
                  status: 'Resolved'
                }
              ]
            }
          }
        ]
      },
      reportModal: {
        reportLabel: 'QA REPORT',
        findings: 'Findings',
        status: 'Status'
      },
      process: {
        label: 'PROCESS',
        title: 'How I work',
        steps: [
          {
            title: 'Scope & Hypotheses',
            description: 'Clarify what success means and list risk-heavy areas first.'
          },
          {
            title: 'Test Design',
            description: 'Create scenarios, edge cases, and device/browser coverage.'
          },
          {
            title: 'Execution & Reporting',
            description: 'Run checks, capture evidence, and write clear reproduction steps.'
          },
          {
            title: 'Fix Verification',
            description: 'Retest, close gaps, and update documentation.'
          }
        ]
      },
      tooling: {
        label: 'TOOLING',
        title: 'Tools I use weekly',
        items: ['VS Code', 'Microsoft Excel', 'Google Sheets', 'MS Office', 'GitHub', 'Vite', 'ChatGPT/Copilot']
      },
      experience: {
        label: 'EXPERIENCE',
        title: 'Student work',
        items: [
          {
            company: 'Malengo gGmbH',
            role: 'Working Student (Program Data Support)',
            period: '12/2025 - Present',
            tasks: [
              'Validate tracking sheets for Kenya TVET cohorts 2024B, 2025A, 2025B with daily checks.',
              'Cross-verify attendance, vaccination records, and status reports for discrepancies.',
              'Structure operational data files for accurate reporting and handover clarity.'
            ],
            icon: <Database className="text-accent" />
          },
          {
            company: 'Study in Germany (DAAD)',
            role: 'Volunteer Blogger',
            period: '03/2025 - Present',
            tasks: ['Write and verify articles for international students, focusing on clarity and accuracy.'],
            icon: <Globe className="text-accent" />
          },
          {
            company: 'Amazon',
            role: 'Sortation Associate',
            period: '06/2025 - 11/2025',
            tasks: [
              'Executed digital workflows following strict safety and quality procedures.',
              'Maintained high accuracy in a fast-paced, target-driven environment.'
            ],
            icon: <ShieldCheck className="text-accent" />
          }
        ]
      },
      education: {
        label: 'EDUCATION',
        title: 'Education',
        items: [
          {
            degree: 'B.Sc. International Information Systems',
            school: 'Technische Hochschule Augsburg',
            period: '10/2025 - Present',
            focus: 'Focus: IT systems, backend logic, data processes.'
          }
        ]
      },
      footer: {
        label: "LET'S TALK",
        title: 'Ready to validate your next release',
        subtitle: 'Working student roles in QA, data validation, backend, or web QA.',
        ctaPrimary: 'Get in touch',
        ctaSecondary: 'Buy me some coffee'
      }
    },
    de: {
      nav: [
        { label: 'Ueber mich', href: '#about' },
        { label: 'Profile', href: '#profiles' },
        { label: 'Leistungen', href: '#services' },
        { label: 'Fallstudien', href: '#case-studies' },
        { label: 'Prozess', href: '#process' },
        { label: 'Erfahrung', href: '#experience' },
        { label: 'Ausbildung', href: '#education' }
      ],
      systemStatus: {
        location: 'AUGSBURG, DE',
        status: 'VERFUEGBAR',
        timeLocale: 'de-DE'
      },
      theme: { dark: 'Dunkel', light: 'Hell' },
      language: { label: 'SPRACHE' },
      hero: {
        badge: 'Suche Werkstudentenstellen',
        title: 'Qualitaet, Datenintegritaet und Systemdenken fuer Produkte, die',
        titleAccent: 'sauber liefern',
        subtitle:
          'Ich studiere Internationale Informationssysteme an der TH Augsburg. Fokus auf Datenvalidierung, Backend-Logik und manuelles Testing; eigene Projekte nutze ich, um Studieninhalte praktisch anzuwenden und Systeme zu verbessern.',
        impact:
          'Aktueller Fokus: Datenvalidierung fuer mehrere Kohorten, React-19-QA-Upgrades und mobile UX-Verifikation.',
        proof: ['Manuelles QA', 'Datenvalidierung', 'Backend-Logik', 'React 19', 'SQL', 'Git / GitHub'],
        ctaPrimary: 'Fallstudien ansehen',
        ctaSecondary: 'Lebenslauf',
        location: 'Augsburg, DE',
        languages: 'EN / DE / Luganda'
      },
      profile: {
        label: 'SYSTEMPROFIL',
        status: 'Verfuegbar',
        focusLabel: 'Schwerpunkt',
        focusValue: 'Data QA + Backend-Logik',
        highlights: [
          { label: 'Primaer', value: 'Manuelles QA' },
          { label: 'Sekundaer', value: 'Datenvalidierung' },
          { label: 'Aktuell', value: 'React 19' },
          { label: 'Standort', value: 'Augsburg' }
        ],
        tagline: 'Bauen. Pruefen. Verbessern.'
      },
      about: {
        label: 'UEBER MICH',
        title: 'Studentenprofil',
        body:
          'Ich studiere Internationale Informationssysteme, um Geschaeftsziele mit zuverlaessiger technischer Umsetzung zu verbinden. Ich arbeite gerne mit Daten, Backend-Logik und QA-Prozessen und nutze eigene Projekte, um Studieninhalte praktisch anzuwenden.',
        skills: [
          { text: 'Java (OOP)' },
          { text: 'SQL / Datenbanken' },
          { text: 'Backend-Logik' },
          { text: 'Manuelles Testing', variant: 'accent' },
          { text: 'Datenvalidierung', variant: 'accent' },
          { text: 'UI/UX Verifikation' },
          { text: 'Git / GitHub' },
          { text: 'React (im Aufbau)' }
        ]
      },
      cv: {
        label: 'LEBENSLAUF',
        title: 'Lebenslauf anfragen',
        subtitle: 'Auf Anfrage verfuegbar, um persoenliche Daten zu schuetzen.',
        view: 'Lebenslauf anfragen'
      },
      profiles: {
        label: 'PROFILE',
        title: 'Soziale Praesenz',
        subtitle: 'Wo ich Projekte teile, Updates schreibe und mich vernetze.',
        items: [
          {
            title: 'LinkedIn',
            subtitle: 'Berufserfahrung, Ausbildung und QA-Fokus.',
            link: 'https://www.linkedin.com/in/markdanielsm',
            icon: <Linkedin size={18} />,
            meta: ['Offen fuer Rollen', 'Informationssysteme', 'Data + QA'],
            stats: [
              { label: 'Fokus', value: 'QA + Daten' },
              { label: 'Standort', value: 'Augsburg' }
            ]
          },
          {
            title: 'GitHub',
            subtitle: 'Projekte, Experimente und Lernnotizen.',
            link: 'https://github.com/MarkDanielsMCraft',
            icon: <Github size={18} />,
            meta: ['React 19', 'QA-Notizen', 'Mini Tools'],
            stats: [
              { label: 'Schwerpunkt', value: 'Web QA' },
              { label: 'Stack', value: 'React / Vite' }
            ]
          },
          {
            title: 'Email',
            subtitle: 'Direkter Kontakt fuer Zusammenarbeit und Rollen.',
            link: 'mailto:redselig-63-besorgung@icloud.com',
            icon: <Mail size={18} />,
            meta: ['Schnelle Antwort', 'QA offen', 'Werkstudent'],
            stats: [
              { label: 'Verfuegbar', value: 'Offen' },
              { label: 'Typ', value: 'Werkstudent' }
            ]
          }
        ]
      },
      services: {
        label: 'LEISTUNGEN',
        title: 'Was ich liefere',
        tagline: 'Systemorientiertes QA',
        items: [
          {
            title: 'QA & Release-Sicherheit',
            description:
              'Manuelles Testing fuer UI, Logik und Edge Cases. Saubere Bug-Reports mit Repro-Schritten und Impact.',
            icon: <ShieldCheck size={18} />
          },
          {
            title: 'Datenqualitaet',
            description:
              'Validierung von Tabellen, Dashboards und operativen Daten. Abgleich fuer Konsistenz und Integritaet.',
            icon: <Database size={18} />
          },
          {
            title: 'UX-Verifikation',
            description:
              'Usability-Checks ueber Devices, Privacy-Banner und Friktionsanalyse fuer Conversion-Flows.',
            icon: <Layout size={18} />
          }
        ]
      },
      caseStudies: {
        label: 'FALLSTUDIEN',
        title: 'Arbeitsproben',
        challenge: 'Herausforderung',
        actions: 'Aktionen',
        outcomes: 'Ergebnisse',
        report: 'QA-Report oeffnen',
        visit: 'Projekt ansehen',
        items: [
          {
            title: 'StartGermany Survival Kit',
            focus: 'QA + React 19 Upgrade-Validierung',
            summary:
              'Responsive Guide-Plattform waehrend eines React-19-Upgrades getestet, Fokus auf Navigation, Counter und Tags.',
            challenge: 'Regressionen bei einem grossen Framework-Upgrade vermeiden und Daten verlaesslich halten.',
            actions: [
              'Dynamische Counter und Tags mit Edge-Case-Tests geprueft.',
              'ESLint konfiguriert, um Syntaxfehler vor dem Deployment zu finden.',
              'Responsive Layouts auf Desktop und Mobile validiert.'
            ],
            outcomes: [
              'Stabile Navigation und Datenpraezision nach dem Upgrade.',
              'Sauberer QA-Workflow vor dem Release.',
              'Klareres UI-Verhalten auf kleinen Screens.'
            ],
            signals: ['Cross-Browser Checks', 'React-19-Upgrade', 'Datenchecks'],
            tech: ['React 19', 'ESLint', 'Vite', 'Manuelles QA'],
            link: 'https://startgermany.vercel.app/',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200',
            report: {
              title: 'StartGermany QA Snapshot',
              subtitle: 'Manueller Regression-Run mit Fokus auf Navigation, Counter und Filter.',
              summary: [
                { label: 'Abdeckung', value: 'Desktop + Mobile' },
                { label: 'Browser', value: 'Chrome + Safari' },
                { label: 'Status', value: 'Release-ready' }
              ],
              findings: [
                {
                  title: 'Counter Sync bei schnellen Filterwechseln',
                  severity: 'High',
                  description: 'Zaehler haengt bei schnellen Filterwechseln um einen Zustand hinterher.',
                  status: 'Behoben'
                },
                {
                  title: 'Tag-Fokuszustand auf Mobile',
                  severity: 'Medium',
                  description: 'Focus-Outline fehlt nach Scroll auf kleinen Screens.',
                  status: 'Behoben'
                }
              ]
            }
          },
          {
            title: 'Lyia Braids Booking Flow',
            focus: 'UX + Compliance-Testing',
            summary: 'Mobile-first Booking-Flow mit direktem WhatsApp-Handoff gestaltet und getestet.',
            challenge: 'Reibung im Buchungsprozess reduzieren und GDPR-Compliance sichern.',
            actions: [
              'Layout-Verhalten in Chrome, Safari und Mobile getestet.',
              'Cookie-Consent integriert und Interaktionszustand geprueft.',
              'CTA-Platzierung fuer schnelle Kontaktaufnahme optimiert.'
            ],
            outcomes: [
              'Konsistente Experience ueber Browser hinweg.',
              'Klare Consent-Logik ohne Blockade der Buchung.',
              'Vereinfachter Kontaktfluss.'
            ],
            signals: ['Consent-Checks', 'Mobile CTA', 'UX Reibungsanalyse'],
            tech: ['Tailwind CSS', 'UX QA', 'GDPR'],
            link: 'https://lyia-braids.vercel.app/',
            image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200',
            report: {
              title: 'Lyia Braids QA Snapshot',
              subtitle: 'Mobile-first UX-Validierung mit Consent-Abdeckung.',
              summary: [
                { label: 'Abdeckung', value: 'Mobile-first' },
                { label: 'Browser', value: 'Chrome + Safari' },
                { label: 'Status', value: 'Live' }
              ],
              findings: [
                {
                  title: 'Cookie-Banner ueberlappt CTA',
                  severity: 'Medium',
                  description: 'Banner ueberlappt CTA auf schmalen Displays.',
                  status: 'Behoben'
                },
                {
                  title: 'WhatsApp CTA Kontrast',
                  severity: 'Low',
                  description: 'Kontrast fuer bessere Lesbarkeit angepasst.',
                  status: 'Behoben'
                }
              ]
            }
          }
        ]
      },
      reportModal: {
        reportLabel: 'QA REPORT',
        findings: 'Findings',
        status: 'Status'
      },
      process: {
        label: 'PROZESS',
        title: 'So arbeite ich',
        steps: [
          {
            title: 'Scope & Hypothesen',
            description: 'Ziele klaeren und risikoreiche Bereiche zuerst priorisieren.'
          },
          {
            title: 'Testdesign',
            description: 'Szenarien, Edge Cases sowie Device/Browser-Abdeckung festlegen.'
          },
          {
            title: 'Ausfuehrung & Reporting',
            description: 'Tests ausfuehren, Belege sichern und klare Repro-Schritte schreiben.'
          },
          {
            title: 'Fix-Verifikation',
            description: 'Nachtesten, Luecken schliessen und Doku aktualisieren.'
          }
        ]
      },
      tooling: {
        label: 'TOOLS',
        title: 'Tools, die ich woechentlich nutze',
        items: ['VS Code', 'Microsoft Excel', 'Google Sheets', 'MS Office', 'GitHub', 'Vite', 'ChatGPT/Copilot']
      },
      experience: {
        label: 'ERFAHRUNG',
        title: 'Praxis & Werkstudentenjobs',
        items: [
          {
            company: 'Malengo gGmbH',
            role: 'Werkstudent (Programmdaten-Unterstuetzung)',
            period: '12/2025 - Heute',
            tasks: [
              'Tracking-Sheets fuer Kenya-TVET-Kohorten 2024B, 2025A, 2025B taeglich validiert.',
              'Abgleich von Anwesenheit, Impfstatus und Statusberichten zur Fehlerfindung.',
              'Operative Datenfiles strukturiert fuer Reporting und saubere Handover.'
            ],
            icon: <Database className="text-accent" />
          },
          {
            company: 'Study in Germany (DAAD)',
            role: 'Freiwilliger Blogger',
            period: '03/2025 - Heute',
            tasks: ['Artikel fuer internationale Studierende verfassen und auf Klarheit pruefen.'],
            icon: <Globe className="text-accent" />
          },
          {
            company: 'Amazon',
            role: 'Sortation Associate',
            period: '06/2025 - 11/2025',
            tasks: [
              'Digitale Workflows nach strikten Sicherheits- und Qualitaetsprozessen ausgefuehrt.',
              'Hohe Genauigkeit in einem schnellen, zielgetriebenen Umfeld gehalten.'
            ],
            icon: <ShieldCheck className="text-accent" />
          }
        ]
      },
      education: {
        label: 'AUSBILDUNG',
        title: 'Studium',
        items: [
          {
            degree: 'B.Sc. Internationale Informationssysteme',
            school: 'Technische Hochschule Augsburg',
            period: '10/2025 - Heute',
            focus: 'Schwerpunkt: IT-Systeme, Backend-Logik, Datenprozesse.'
          }
        ]
      },
      footer: {
        label: 'KONTAKT',
        title: 'Bereit, deinen naechsten Release zu validieren',
        subtitle: 'Werkstudentenstellen in QA, Datenvalidierung, Backend oder Web QA.',
        ctaPrimary: 'Kontakt aufnehmen',
        ctaSecondary: 'Kauf mir einen Kaffee'
      }
    }
  };

  const t = content[language];

  return (
    <ReactLenis root>
      <div className="min-h-screen page" onMouseMove={handleMouseMove}>
        <SystemStatus
          statusText={t.systemStatus.status}
          locationText={t.systemStatus.location}
          timeLocale={t.systemStatus.timeLocale}
        />

        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 grid-surface" />
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: noiseBg }} />
          <motion.div
            className="absolute inset-0 opacity-40"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  520px circle at ${mouseX}px ${mouseY}px,
                  var(--spotlight),
                  transparent 75%
                )
              `
            }}
          />
          <div className="absolute -top-[20%] right-[10%] h-[38vw] w-[38vw] rounded-full blur-[120px] bg-[var(--glow-1)] opacity-70" />
          <div className="absolute -bottom-[30%] left-[10%] h-[34vw] w-[34vw] rounded-full blur-[120px] bg-[var(--glow-2)] opacity-70" />
        </div>

        <div className="relative z-10">
          <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : 'nav-clear'}`}>
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
              <Magnetic>
                <a href="#" className="flex items-center gap-3 text-lg font-semibold tracking-tight" aria-label="Mark Daniels Mbaziira">
                  <img src="/logo.png" alt="Mark Daniels Mbaziira" className="logo-mark" />
                  <span className="sr-only">Mark Daniels Mbaziira</span>
                </a>
              </Magnetic>

              <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
                {t.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <LanguageToggle
                  language={language}
                  label={t.language.label}
                  onToggle={() => setLanguage(language === 'en' ? 'de' : 'en')}
                />
                <ThemeToggle
                  theme={theme}
                  labels={t.theme}
                  onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                />
                <a href={`mailto:${socialLinks.email}`} className="button-primary">
                  {t.footer.ctaPrimary}
                </a>
              </div>

              <div className="md:hidden flex items-center gap-2">
                <ThemeToggle
                  theme={theme}
                  labels={t.theme}
                  onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                />
                <button className="icon-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

              {isMenuOpen && (
                <div className="md:hidden surface border rounded-2xl mt-3 mx-6 p-4 flex flex-col gap-4 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <LanguageToggle
                      language={language}
                      label={t.language.label}
                      onToggle={() => setLanguage(language === 'en' ? 'de' : 'en')}
                    />
                    <ThemeToggle
                      theme={theme}
                      labels={t.theme}
                      onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    />
                  </div>
                  {t.nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="hover:text-accent transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                  <a href={`mailto:${socialLinks.email}`} className="button-primary w-full text-center">
                    {t.footer.ctaPrimary}
                  </a>
                </div>
              )}
          </nav>

          <section className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-24">
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-[0.2em] surface">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  {t.hero.badge}
                </div>

                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] mt-6">
                  {t.hero.title} <span className="text-accent">{t.hero.titleAccent}</span>.
                </h1>

                <p className="mt-6 text-lg text-muted max-w-xl">
                  {t.hero.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Magnetic>
                    <a href="#case-studies" className="button-primary">
                      {t.hero.ctaPrimary} <ChevronRight size={16} />
                    </a>
                  </Magnetic>
                    <a href={socialLinks.cvUrl} target="_blank" rel="noreferrer noopener" className="button-ghost">
                    {t.hero.ctaSecondary} <ExternalLink size={14} />
                  </a>
                </div>

                <div className="mt-6 surface-soft rounded-2xl p-4">
                  <p className="text-sm text-muted">{t.hero.impact}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {t.hero.proof.map((item) => (
                      <span key={item} className="badge badge-muted">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-6 text-sm text-muted">
                  <span className="flex items-center gap-2"><MapPin size={14} /> {t.hero.location}</span>
                  <span className="flex items-center gap-2"><Globe size={14} /> {t.hero.languages}</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
                <TiltCard className="surface border rounded-3xl p-6 shadow-strong">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src="/logo.png" alt="Mark Daniels" className="logo-mark logo-mark--sm" />
                      <div className="text-xs mono text-muted">{t.profile.label}</div>
                    </div>
                    <span className="badge badge-accent">{t.profile.status}</span>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-sm text-muted">{t.profile.focusLabel}</p>
                      <h3 className="text-2xl font-semibold">{t.profile.focusValue}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {t.profile.highlights.map((item) => (
                        <div key={item.label} className="surface-soft rounded-2xl p-4">
                          <p className="text-muted">{item.label}</p>
                          <p className="font-semibold">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 text-sm text-muted">
                      <DecryptText text={t.profile.tagline} />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </section>

          <section id="about" className="py-16 px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
              <RevealOnScroll>
                <div className="surface border rounded-3xl p-8">
                  <div className="flex items-center gap-2 text-xs mono text-muted">
                    <User size={14} /> {t.about.label}
                  </div>
                  <h2 className="mt-4 text-3xl font-semibold">{t.about.title}</h2>
                  <p className="text-sm mono text-muted mt-2">Mark Daniels Mbaziira</p>
                  <p className="mt-4 text-muted">{t.about.body}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {t.about.skills.map((skill) => (
                      <SkillBadge key={skill.text} text={skill.text} variant={skill.variant} />
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <div className="surface border rounded-3xl p-8">
                  <div className="flex items-center gap-2 text-xs mono text-muted">
                    <FileText size={14} /> {t.cv.label}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{t.cv.title}</h3>
                  <p className="mt-3 text-muted">{t.cv.subtitle}</p>
                  <div className="mt-6 flex gap-3">
                    <a href={socialLinks.cvUrl} className="button-primary">
                      {t.cv.view} <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          <section id="services" className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <RevealOnScroll>
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-xs mono text-muted">{t.services.label}</p>
                    <h2 className="text-3xl font-semibold mt-2">{t.services.title}</h2>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-muted text-sm">
                    <Cpu size={16} /> {t.services.tagline}
                  </div>
                </div>
              </RevealOnScroll>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {t.services.items.map((service, idx) => (
                  <RevealOnScroll key={service.title} delay={idx * 0.1}>
                    <div className="surface border rounded-3xl p-6 h-full">
                      <div className="icon-pill">{service.icon}</div>
                      <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                      <p className="mt-3 text-muted text-sm">{service.description}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          <section id="profiles" className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <RevealOnScroll>
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-xs mono text-muted">{t.profiles.label}</p>
                    <h2 className="text-3xl font-semibold mt-2">{t.profiles.title}</h2>
                    <p className="text-muted mt-2 max-w-xl">{t.profiles.subtitle}</p>
                  </div>
                </div>
              </RevealOnScroll>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {t.profiles.items.map((profile, idx) => (
                  <RevealOnScroll key={profile.title} delay={idx * 0.1}>
                    <a href={profile.link} target="_blank" rel="noreferrer noopener" className="social-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="social-avatar">{profile.icon}</span>
                          <div>
                            <h3 className="text-lg font-semibold">{profile.title}</h3>
                            <p className="text-sm text-muted">{profile.subtitle}</p>
                          </div>
                        </div>
                        <ArrowUpRight size={16} />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {profile.meta.map((item) => (
                          <span key={item} className="badge badge-muted">{item}</span>
                        ))}
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        {profile.stats.map((stat) => (
                          <div key={stat.label} className="surface-soft rounded-2xl p-3">
                            <p className="text-xs mono text-muted">{stat.label}</p>
                            <p className="text-sm font-semibold mt-1">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </a>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          <section id="case-studies" className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <RevealOnScroll>
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-xs mono text-muted">{t.caseStudies.label}</p>
                    <h2 className="text-3xl font-semibold mt-2">{t.caseStudies.title}</h2>
                  </div>
                  <div className="flex items-center gap-4 text-muted text-sm">
                    <a href={socialLinks.github} target="_blank" rel="noreferrer noopener" className="hover:text-accent">GitHub</a>
                    <a href={socialLinks.linkedin} target="_blank" rel="noreferrer noopener" className="hover:text-accent">LinkedIn</a>
                  </div>
                </div>
              </RevealOnScroll>

              <div className="grid lg:grid-cols-2 gap-8 mt-8">
                {t.caseStudies.items.map((study, idx) => (
                  <RevealOnScroll key={study.title} delay={idx * 0.1}>
                    <div className="surface border rounded-3xl overflow-hidden h-full">
                      <div className="relative h-52 sm:h-60 max-[360px]:h-44 overflow-hidden">
                        <img
                          src={study.image}
                          alt={study.title}
                          loading="lazy"
                          decoding="async"
                          width="1200"
                          height="700"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-xs uppercase tracking-[0.2em]">{study.focus}</p>
                          <h3 className="text-2xl font-semibold">{study.title}</h3>
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <p className="text-muted text-sm">{study.summary}</p>
                        <div>
                          <p className="text-xs mono text-muted">{t.caseStudies.challenge}</p>
                          <p className="text-sm mt-2">{study.challenge}</p>
                        </div>
                        <div>
                          <p className="text-xs mono text-muted">{t.caseStudies.actions}</p>
                          <ul className="mt-2 space-y-2 text-sm">
                            {study.actions.map((item) => (
                              <li key={item} className="flex gap-2">
                                <ChevronRight size={14} className="text-accent mt-1" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs mono text-muted">{t.caseStudies.outcomes}</p>
                          <ul className="mt-2 space-y-2 text-sm">
                            {study.outcomes.map((item) => (
                              <li key={item} className="flex gap-2">
                                <ChevronRight size={14} className="text-emerald-600 mt-1" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {study.tech.map((tech) => (
                            <span key={tech} className="badge">{tech}</span>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                          <button
                            type="button"
                            onClick={() => setActiveReport(study.report)}
                            className="button-ghost"
                          >
                            {t.caseStudies.report}
                          </button>
                          <a href={study.link} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-accent">
                            {t.caseStudies.visit} <ArrowUpRight size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          <section id="process" className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <RevealOnScroll>
                <p className="text-xs mono text-muted">{t.process.label}</p>
                <h2 className="text-3xl font-semibold mt-2">{t.process.title}</h2>
              </RevealOnScroll>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {t.process.steps.map((step, idx) => (
                  <RevealOnScroll key={step.title} delay={idx * 0.1}>
                    <div className="surface border rounded-3xl p-6">
                      <div className="text-xs mono text-muted">0{idx + 1}</div>
                      <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm text-muted">{step.description}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          <section id="tooling" className="py-16 px-6">
            <div className="max-w-6xl mx-auto surface border rounded-3xl p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-xs mono text-muted">{t.tooling.label}</p>
                  <h2 className="text-2xl font-semibold mt-2">{t.tooling.title}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {t.tooling.items.map((tool) => (
                    <span key={tool} className="badge badge-muted">{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="experience" className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <RevealOnScroll>
                <div className="flex items-center gap-2 text-xs mono text-muted">
                  <Calendar size={14} /> {t.experience.label}
                </div>
                <h2 className="text-3xl font-semibold mt-2">{t.experience.title}</h2>
              </RevealOnScroll>

              <div className="space-y-6 mt-8">
                {t.experience.items.map((exp, idx) => (
                  <RevealOnScroll key={exp.company} delay={idx * 0.1}>
                    <div className="surface border rounded-3xl p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="icon-pill">{exp.icon}</div>
                            <div>
                              <h3 className="text-xl font-semibold">{exp.company}</h3>
                              <p className="text-sm text-muted">{exp.role}</p>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs mono text-muted">{exp.period}</span>
                      </div>
                      <ul className="mt-4 space-y-2 text-sm text-muted">
                        {exp.tasks.map((task) => (
                          <li key={task} className="flex gap-2">
                            <ChevronRight size={14} className="text-accent mt-1" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          <section id="education" className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <RevealOnScroll>
                <div className="flex items-center gap-2 text-xs mono text-muted">
                  <Calendar size={14} /> {t.education.label}
                </div>
                <h2 className="text-3xl font-semibold mt-2">{t.education.title}</h2>
              </RevealOnScroll>

              <div className="space-y-6 mt-8">
                {t.education.items.map((edu) => (
                  <RevealOnScroll key={edu.degree}>
                    <div className="surface border rounded-3xl p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold">{edu.degree}</h3>
                          <p className="text-sm text-muted">{edu.school}</p>
                        </div>
                        <span className="text-xs mono text-muted">{edu.period}</span>
                      </div>
                      <p className="mt-4 text-sm text-muted">{edu.focus}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          <footer className="py-16 px-6">
            <div className="max-w-6xl mx-auto surface border rounded-3xl p-10 text-center">
              <p className="text-xs mono text-muted">{t.footer.label}</p>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4">{t.footer.title}</h2>
              <p className="text-muted mt-3">{t.footer.subtitle}</p>
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                <a href={`mailto:${socialLinks.email}`} className="button-primary">
                  <Mail size={16} /> {t.footer.ctaPrimary}
                </a>
                <a href="https://buymeacoffee.com/markdanielsmcraft" target="_blank" rel="noreferrer noopener" className="button-ghost">
                  <Coffee size={16} /> {t.footer.ctaSecondary}
                </a>
              </div>
              <div className="mt-10 flex flex-col md:flex-row items-center justify-between text-xs text-muted gap-4">
                <p>© 2026 Mark Daniels Mbaziira. Built with React 19.</p>
                <div className="flex gap-4">
                  <a href={socialLinks.linkedin} target="_blank" rel="noreferrer noopener" className="hover:text-accent">LinkedIn</a>
                  <a href={socialLinks.github} target="_blank" rel="noreferrer noopener" className="hover:text-accent">GitHub</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <div className={`fixed bottom-6 left-6 z-50 hidden md:flex flex-col gap-3 ${isDockCompact ? 'dock-compact' : ''}`}>
        <a href={`mailto:${socialLinks.email}`} className="dock-button">
          <Mail size={16} />
          <span className="dock-text">{t.footer.ctaPrimary}</span>
        </a>
        <a href={socialLinks.cvUrl} target="_blank" rel="noreferrer noopener" className="dock-button">
          <FileText size={16} />
          <span className="dock-text">{t.hero.ctaSecondary}</span>
        </a>
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer noopener" className="dock-button">
          <ArrowUpRight size={16} />
          <span className="dock-text">LinkedIn</span>
        </a>
        <a href="https://buymeacoffee.com/markdanielsmcraft" target="_blank" rel="noreferrer noopener" className="dock-button">
          <Coffee size={16} />
          <span className="dock-text">{t.footer.ctaSecondary}</span>
        </a>
      </div>
      <QAReportModal
        isOpen={Boolean(activeReport)}
        report={activeReport}
        labels={t.reportModal}
        onClose={() => setActiveReport(null)}
      />
    </ReactLenis>
  );
};

export default App;
