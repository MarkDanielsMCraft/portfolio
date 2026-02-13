import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  Code,
  Database,
  Layout,
  Server,
  Terminal,
  Cpu,
  Coffee,
  ExternalLink,
  Code2,
  TrendingUp,
  Network,
  Globe2,
  BarChart3,
  Workflow,
  Menu,
  X,
  User,
  MapPin,
  Globe,
  FileText,
  Download,
  Calendar,
  Clock,
  Radio
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue, useAnimationFrame } from 'framer-motion';
import ReactLenis from 'lenis/react';

// --- Expert Modernization Components ---

const DecryptText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));

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
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

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

const SystemStatus = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-4 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono text-slate-400 shadow-xl">
      <div className="flex items-center gap-2">
        <Globe size={12} className="text-blue-500" />
        <span>AUGSBURG, DE</span>
      </div>
      <div className="w-px h-3 bg-white/10" />
      <div className="flex items-center gap-2">
        <Clock size={12} className="text-emerald-500" />
        <span>{time.toLocaleTimeString('de-DE')}</span>
      </div>
      <div className="w-px h-3 bg-white/10" />
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-green-400 font-bold">SYSTEM ONLINE</span>
      </div>
    </div>
  );
};

// --- Existing Components (Refined) ---

const RevealOnScroll = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} transition={{ duration: 0.8, delay }}>
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
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
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
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const BackgroundParticles = () => {
  // Knowledge Particles - Mixed Info Systems (Business + Tech + Global)
  const particles = [
    // Tech / Dev
    { text: "SQL", color: "text-orange-400" },
    { text: "<div>", color: "text-blue-400" },
    { text: "API", color: "text-yellow-200" },
    { text: "git", color: "text-orange-500" },
    { text: "JSON", color: "text-yellow-400" },

    // Business / Systems
    { text: "ERP", color: "text-emerald-400" },
    { text: "SAP", color: "text-blue-300" },
    { text: "BPMN", color: "text-purple-400" },
    { text: "CRM", color: "text-pink-400" },
    { text: "ROI", color: "text-green-400" },
    { text: "KPI", color: "text-cyan-400" },
    { text: "Agile", color: "text-indigo-400" },
    { text: "Scrum", color: "text-blue-200" },

    // Icons (Visual Metaphors)
    { icon: Globe, color: "text-emerald-500", size: 24 }, // International
    { icon: Database, color: "text-blue-500", size: 24 }, // Systems
    { icon: Network, color: "text-purple-500", size: 24 }, // Connectivity
    { icon: TrendingUp, color: "text-green-500", size: 24 }, // Growth/Business
    { icon: BarChart3, color: "text-yellow-500", size: 24 }, // Analytics
    { icon: Workflow, color: "text-cyan-500", size: 24 }, // Process
    { icon: Globe2, color: "text-blue-400", size: 24 }, // Global
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
          animate={{
            opacity: [0, 0.6, 0], // Increased opacity to 0.6 for better visibility
            y: [0, -80, 0],
            rotate: item.icon ? [0, 15, -15, 0] : 0 // Slight rotation for icons
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className={`absolute ${item.color} font-mono font-bold select-none z-0`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: item.icon ? undefined : (Math.random() > 0.5 ? '1.25rem' : '0.875rem') // Randomize text size
          }}
        >
          {item.icon ? <item.icon size={item.size} /> : item.text}
        </motion.div>
      ))}
    </div>
  );
};

const SkillBadge = ({ text, category }) => (
  <span className={`
    px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm border transition-all duration-300 hover:scale-105 cursor-default
    ${category === 'tech' ? 'bg-blue-500/10 border-blue-500/20 text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/40' :
      category === 'design' ? 'bg-purple-500/10 border-purple-500/20 text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/40' :
        category === 'test' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/40' :
          'bg-slate-800/50 border-slate-700 text-slate-400'}
  `}>
    {text}
  </span>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Spotlight Logic
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;

  // Grid Pattern
  const gridBg = `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`;


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = {
    github: "https://github.com/MarkDanielsMCraft",
    linkedin: "https://www.linkedin.com/in/markdanielsm",
    email: "markdanielsmbaziira@gmail.com",
    cvUrl: "/MARK_DANIELS_MBAZIIRA_CV.pdf"
  };

  const projects = [
    {
      title: "StartGermany",
      subtitle: "Survival Kit",
      tag: "QA & Development",
      description: "• Modern Web Testing: Built and tested a responsive guide platform, manually verified stability during a major upgrade to React 19.\n• QA Workflow Automation: Configured ESLint to automatically detect syntax errors and improve code quality before deployment.\n• UI & Logic Verification: Manually tested dynamic components, such as guide counters and tag filters, to ensure real-time data accuracy.\n• AI-Assisted Workflow: Utilized AI tools for initial scaffolding while focusing on manual verification and debugging of the generated logic.",
      tech: ["React 19", "ESLint", "Vite", "QA Automation"],
      link: "https://startgermany.vercel.app/",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Lyia Braids",
      subtitle: "Service Website",
      tag: "UX & Testing",
      description: "• UX Optimization: Designed a mobile-first interface and implemented a direct-to-WhatsApp booking integration to minimize user friction.\n• Cross-Browser Testing: Verified layout consistency across Chrome, Safari, and mobile views to ensure a professional user experience.\n• Privacy Compliance: Integrated and tested GDPR-compliant cookie consent banners.",
      tech: ["Tailwind CSS", "UX Design", "GDPR Compliance"],
      link: "https://lyia-braids.vercel.app/",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
    }
  ];

  const experience = [
    {
      company: "Malengo gGmbH",
      role: "Working Student (Data Quality & Program Support)",
      period: "12/2025 - Present",
      tasks: [
        "Data Validation: Manage and validate comprehensive tracking sheets and dashboards for the Kenya TVET scholar program, covering cohorts 2024B, 2025A, and 2025B.",
        "Consistency Checks: Conduct daily verification between attendance logs, vaccination records, and status reports to identify and resolve discrepancies.",
        "Process Documentation: Structure and maintain operational data files to ensure 100% data integrity for reporting."
      ],
      icon: <Database className="w-5 h-5 text-blue-400" />
    },
    {
      company: "Study in Germany (DAAD)",
      role: "Volunteer Blogger",
      period: "03/2025 - Present",
      tasks: [
        "Content QA: Write, verify accuracy and clarity of information for the international audience."
      ],
      icon: <Globe className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <ReactLenis root>
      <div
        className="min-h-screen bg-[#050B14] text-slate-300 font-sans selection:bg-blue-500/30 selection:text-blue-200 relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <SystemStatus />

        {/* Background Layer */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Technical Grid Pattern */}
          <div
            className="absolute inset-0 z-[1] opacity-20"
            style={{
              backgroundImage: gridBg,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Cinematic Noise - Reduced Opacity for Clarity */}
          <div
            className="absolute inset-0 z-[5] opacity-[0.02] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: noiseBg }}
          />

          {/* Knowledge Particles (Floating Terms) */}
          <BackgroundParticles />

          {/* Mouse Spotlight */}
          <motion.div
            className="absolute inset-0 z-[2] opacity-40"
            style={{
              background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.03),
                transparent 80%
              )
            `,
            }}
          />

          {/* Ambient Glows - Reduced Intensity (More Deep Space) */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-900/15 rounded-full blur-[120px] mix-blend-screen"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, 40, -40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-900/15 rounded-full blur-[100px] mix-blend-screen"
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10">

          {/* Navigation */}
          <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050B14]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
              <Magnetic>
                <a href="#" className="text-xl font-bold text-white tracking-tight flex items-center gap-2 group">
                  {/* Reverted Logo to Pure Text as requested */}
                  <span className="group-hover:text-blue-400 transition-colors">Mark Daniels<span className="text-blue-500">.</span></span>
                </a>
              </Magnetic>

              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300"
              >
                {['About', 'Experience', 'Projects'].map((item) => (
                  <Magnetic key={item}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors relative group block px-2 py-1">
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                    </a>
                  </Magnetic>
                ))}
                <Magnetic>
                  <a href={`mailto:markdanielsmbaziira@gmail.com`} className="block bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 active:scale-95">
                    Contact Me
                  </a>
                </Magnetic>
              </motion.div>

              <button className="md:hidden p-2 bg-white/5 rounded-lg text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-20">
            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

              <motion.div
                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Available for Data & Systems Engineering
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white leading-[1.1] drop-shadow-lg">
                  Building Systems. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 filter drop-shadow-lg">
                    <DecryptText text="Mastering Logic." />
                  </span>
                </h1>

                <p className="max-w-xl text-lg text-slate-300 leading-relaxed mb-8">
                  I bridge the gap between technical complexity and business logic. Meticulous, data-driven, and built for precision.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Magnetic>
                    <a href="#projects" className="group flex items-center gap-2 bg-white text-black hover:bg-blue-50 px-6 py-3.5 rounded-xl font-bold transition-all shadow-xl shadow-white/5 hover:shadow-white/10 active:scale-95">
                      View Projects <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Magnetic>
                  <div className="flex items-center gap-3">
                    <Magnetic>
                      <a href="https://github.com/MarkDanielsMCraft" target="_blank" className="block p-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all hover:border-white/20 text-slate-300 hover:text-white"><Github className="w-5 h-5" /></a>
                    </Magnetic>
                    <Magnetic>
                      <a href="https://www.linkedin.com/in/markdanielsm" target="_blank" className="block p-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all hover:border-white/20 text-slate-300 hover:text-white"><Linkedin className="w-5 h-5" /></a>
                    </Magnetic>
                  </div>
                </div>
              </motion.div>

              {/* Hero Visual - Code Snapshot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden md:block perspective-1000"
              >
                <TiltCard className="relative bg-[#0a101f]/90 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur opacity-30" />

                  <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4 relative z-10">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-xs text-slate-400 font-mono ml-2">university_project.java</div>
                  </div>
                  <div className="space-y-3 font-mono text-sm relative z-10">
                    <div className="text-slate-400">// Learning Algorithms in Java</div>
                    <div className="pl-0 flex gap-4">
                      <span className="text-purple-400">public class</span> <span className="text-yellow-200">Portfolio</span> {'{'}
                    </div>
                    <div className="pl-6 flex gap-4">
                      <span className="text-purple-400">public static void</span> <span className="text-blue-400">main</span>(String[] args) {'{'}
                    </div>
                    <div className="pl-12 flex gap-4">
                      <span className="text-purple-400">Student</span> <span className="text-white">me</span> = <span className="text-purple-400">new</span> <span className="text-yellow-200">Student</span>("Mark");
                    </div>
                    <div className="pl-12 flex gap-4">
                      <span className="text-white">me</span>.<span className="text-blue-400">keepLearning</span>();
                    </div>
                    <div className="pl-12 flex gap-4">
                      <span className="text-purple-400">System</span>.out.println(<span className="text-green-300">"Build. Break. Fix. Repeat."</span>);
                    </div>
                    <div className="pl-6 text-slate-400">{'}'}</div>
                    <div className="text-slate-400">{'}'}</div>
                  </div>
                </TiltCard>
              </motion.div>

            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 animate-bounce cursor-pointer"
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-slate-400 to-transparent mx-auto" />
            </motion.div>
          </section>

          {/* Bento Grid - About/Student Life */}
          <section id="about" className="py-20 px-6 relative">
            <div className="max-w-6xl mx-auto">
              <RevealOnScroll>
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                  <User className="text-blue-500" /> Student Profile
                </h2>
              </RevealOnScroll>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Main Bio */}
                <RevealOnScroll>
                  <TiltCard className="md:col-span-2 bg-[#0a101f]/80 border border-white/5 rounded-3xl p-8 h-full hover:border-blue-500/30 transition-all backdrop-blur-md group hover:bg-[#0a101f]">
                    <p className="text-lg text-slate-200 leading-relaxed mb-6 group-hover:text-white transition-colors">
                      I am an <strong>International Information Systems student</strong> based in Augsburg, Germany. My studies bridge the gap between business logic and technical implementation.
                    </p>
                    <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
                      I look to apply my structured work style and technical understanding to manual software testing. At <span className="text-white font-semibold">Malengo</span>, I manage complex data and ensure integrity for reporting.
                    </p>
                    <div className="mt-8 flex gap-6 text-sm font-medium text-slate-400">
                      <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full"><MapPin size={14} className="text-blue-400" /> TH Augsburg</span>
                      <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full"><Globe size={14} className="text-emerald-400" /> Eng, De, Luganda</span>
                    </div>
                  </TiltCard>
                </RevealOnScroll>

                {/* Stats/Resume */}
                <RevealOnScroll delay={0.2}>
                  <TiltCard className="bg-gradient-to-br from-blue-900/10 to-indigo-900/10 border border-white/5 rounded-3xl p-8 flex flex-col justify-between h-full hover:shadow-2xl hover:shadow-blue-900/10 transition-all relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 text-blue-400"><FileText size={24} /></div>
                      <h3 className="text-xl font-bold text-white mb-1">My CV</h3>
                      <p className="text-sm text-slate-400">See my coursework & projects.</p>
                    </div>
                    <div className="flex gap-2 mt-6 relative z-10">
                      <Magnetic>
                        <a href="https://portfolio-markdanielsmcrafts-projects.vercel.app/MARK_DANIELS_MBAZIIRA_CV.pdf" target="_blank" className="block w-full bg-white text-black py-2.5 px-4 rounded-lg text-center font-bold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 group">
                          View <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </Magnetic>
                      <Magnetic>
                        <a href="https://portfolio-markdanielsmcrafts-projects.vercel.app/MARK_DANIELS_MBAZIIRA_CV.pdf" download className="block px-3 py-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white">
                          <Download size={18} />
                        </a>
                      </Magnetic>
                    </div>
                  </TiltCard>
                </RevealOnScroll>

                {/* Tech Stack */}
                <RevealOnScroll delay={0.3}>
                  <TiltCard className="md:col-span-3 bg-[#0a101f]/80 border border-white/5 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden hover:border-white/10 transition-colors">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><Cpu size={16} /> What I'm Learning</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                      <div>
                        <h4 className="text-white font-medium mb-3 text-sm">Coursework & Code</h4>
                        <div className="flex flex-wrap gap-2">
                          <SkillBadge text="Java (OOP)" category="tech" />
                          <SkillBadge text="SQL / Databases" category="tech" />
                          <SkillBadge text="Business Process Modeling" category="tech" />
                          <SkillBadge text="React 19" category="tech" />
                          <SkillBadge text="Git" category="tech" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-3 text-sm">QA & Testing</h4>
                        <div className="flex flex-wrap gap-2">
                          <SkillBadge text="Manual Testing" category="test" />
                          <SkillBadge text="Bug Reporting" category="test" />
                          <SkillBadge text="User Acceptance Testing" category="test" />
                          <SkillBadge text="Data Verification" category="test" />
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </RevealOnScroll>

              </div>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="py-20 px-6 bg-white/[0.01]">
            <div className="max-w-4xl mx-auto">
              <RevealOnScroll>
                <h2 className="text-3xl font-bold mb-12 flex items-center gap-3"><Calendar className="text-blue-500" /> Student Work</h2>
              </RevealOnScroll>

              <div className="space-y-12">
                {experience.map((exp, idx) => (
                  <RevealOnScroll key={idx} delay={idx * 0.1}>
                    <div className="relative pl-8 md:pl-0">
                      {/* Timeline Line */}
                      <div className="absolute left-0 top-2 bottom-0 w-px bg-white/10 md:left-[140px]" />

                      <div className="md:flex gap-12 group">
                        <div className="hidden md:block w-[140px] text-right flex-shrink-0 pt-1">
                          <span className="text-sm font-bold text-slate-500 group-hover:text-blue-400 transition-colors">{exp.period}</span>
                        </div>

                        <div className="relative flex-1 bg-slate-900/20 border border-white/5 p-6 rounded-2xl hover:border-blue-500/30 transition-all hover:bg-slate-900/40 backdrop-blur-sm">
                          {/* Dot */}
                          <div className="absolute left-[-37px] top-6 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-600 group-hover:bg-blue-500 group-hover:border-blue-300 transition-colors md:left-[-55px]" />

                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">{exp.company}</h3>
                              <p className="text-blue-400 font-medium text-sm">{exp.role}</p>
                            </div>
                            <div className="p-2 bg-white/5 rounded-lg text-slate-400 group-hover:text-white transition-colors">{exp.icon}</div>
                          </div>

                          <ul className="space-y-3">
                            {exp.tasks.map((task, i) => (
                              <li key={i} className="text-slate-400 text-sm leading-relaxed flex gap-3 group-hover:text-slate-300 transition-colors">
                                <ChevronRight size={14} className="mt-1 flex-shrink-0 text-slate-600 group-hover:text-blue-500 transition-colors" />
                                {task}
                              </li>
                            ))}
                          </ul>

                          {/* Mobile Period */}
                          <div className="md:hidden mt-4 pt-4 border-t border-white/5">
                            <span className="text-xs font-bold text-slate-500">{exp.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="py-24 px-6 relative">
            <div className="max-w-6xl mx-auto">
              <RevealOnScroll>
                <h2 className="text-3xl font-bold mb-12 flex items-center gap-3"><Code2 className="text-blue-500" /> Academic & Side Projects</h2>
              </RevealOnScroll>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                  <RevealOnScroll key={idx} delay={idx * 0.2}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="group bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20 transition-all backdrop-blur-md"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors z-10" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute bottom-4 left-4 z-20">
                          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest shadow-lg">
                            {project.tag}
                          </span>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                            <p className="text-sm text-slate-500 font-medium group-hover:text-slate-400 transition-colors">{project.subtitle}</p>
                          </div>
                          <Magnetic>
                            <a href={project.link} target="_blank" className="block p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all shadow-lg">
                              <ExternalLink size={18} />
                            </a>
                          </Magnetic>
                        </div>

                        <p className="text-slate-400 leading-relaxed mb-6 text-sm whitespace-pre-line">{project.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t, i) => (
                            <span key={i} className="text-[10px] px-2.5 py-1 bg-white/5 rounded-lg text-slate-400 border border-white/5 group-hover:border-white/10 group-hover:text-slate-300 transition-colors">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="absolute inset-0 bg-blue-900/5 blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <RevealOnScroll>
                <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Let's build something <span className="text-blue-500">stable.</span></h2>
                <p className="text-slate-400 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                  Currently looking for <strong>Working Student</strong> positions in Data, QA, or Web Dev.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                  <Magnetic>
                    <a
                      href={`mailto:${socialLinks.email}`}
                      className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
                    >
                      <Mail size={20} /> Get in touch
                    </a>
                  </Magnetic>

                  <Magnetic>
                    <a
                      href="https://buymeacoffee.com/markdanielsmcraft"
                      target="_blank"
                      className="flex items-center gap-3 bg-white/5 hover:bg-[#FFDD00] hover:text-black text-slate-300 px-8 py-4 rounded-2xl font-bold text-lg border border-white/10 hover:border-[#FFDD00] transition-all group active:scale-95"
                    >
                      <Coffee size={20} className="group-hover:animate-bounce" />
                      <span>Fuel my studies</span>
                    </a>
                  </Magnetic>
                </div>

                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 max-w-2xl mx-auto backdrop-blur-sm mb-16 hover:border-white/10 transition-colors">
                  <p className="text-sm text-slate-500 italic">
                    "Every coffee helps me buy more textbooks (and debug more code)."
                  </p>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 border-t border-white/5 pt-8">
                  <p>© 2026 Mark Daniels Mbaziira. Built with React 19.</p>
                  <div className="flex gap-6 mt-4 md:mt-0">
                    <a href={socialLinks.linkedin} className="hover:text-blue-400 transition-colors">LinkedIn</a>
                    <a href={socialLinks.github} className="hover:text-blue-400 transition-colors">GitHub</a>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </footer>

        </div>
      </div>
    </ReactLenis>
  );
};

export default App;
