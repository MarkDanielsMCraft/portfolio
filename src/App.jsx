import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Terminal,
  Globe,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  ExternalLink,
  Database,
  Search,
  CheckCircle2,
  Menu,
  X,
  Smartphone,
  Layout,
  Cpu,
  Download,
  User,
  FileText,
  MapPin,
  Calendar,
  Eye
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update these links with your actual URLs
  const socialLinks = {
    github: "https://github.com/MarkDanielsMCraft",
    linkedin: "https://www.linkedin.com/in/mark-daniels-mbaziira/",
    email: "markdanielsmbaziira@gmail.com",
    cvUrl: "/MARK_DANIELS_MBAZIIRA_CV.pdf" // Path to your hosted CV file
  };

  const projects = [
    {
      title: "StartGermany / Survival Kit",
      tag: "QA & Development",
      description: "A comprehensive expat guide platform. I managed a high-risk migration to React 19, implementing rigorous manual verification protocols for dynamic UI logic.",
      tech: ["React 19", "ESLint", "Vite", "QA Automation"],
      link: "https://startgermany.vercel.app/",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Lyia Braids Platform",
      tag: "UX & Testing",
      description: "A professional service platform focused on frictionless booking. Conducted extensive cross-browser testing and mobile responsiveness validation.",
      tech: ["Tailwind CSS", "UX Design", "GDPR Compliance"],
      link: "https://lyia-braids.vercel.app/",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
    }
  ];

  const experience = [
    {
      company: "Malengo gGmbH",
      role: "Working Student - Data Quality",
      period: "Dec 2025 - Present",
      tasks: [
        "Managing complex relational data for Kenya TVET cohorts.",
        "Executing systematic consistency checks between attendance and status logs.",
        "Ensuring 100% data integrity for critical program reporting."
      ],
      icon: <Database className="w-6 h-6 text-blue-400" />
    },
    {
      company: "Study in Germany (DAAD)",
      role: "Volunteer Blogger",
      period: "Mar 2025 - Present",
      tasks: [
        "Content QA: Verifying accuracy and clarity for an international audience.",
        "Engaging 10k+ readers with structured academic and cultural insights."
      ],
      icon: <Globe className="w-6 h-6 text-emerald-400" />
    }
  ];

  const SkillBadge = ({ text, category }) => (
    <span className={`px-3 py-1 text-sm rounded-full border ${category === 'test' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
        category === 'tech' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' :
          'bg-slate-500/10 border-slate-500/30 text-slate-400'
      }`}>
      {text}
    </span>
  );

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 font-sans selection:bg-blue-500 selection:text-white scroll-smooth">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#05070a]/90 backdrop-blur-xl py-4 border-b border-white/5 shadow-2xl shadow-blue-900/10' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2 group cursor-pointer">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span>MARK.<span className="text-blue-500">M</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-blue-400 transition-colors">About & CV</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Work</a>
            <a href={`mailto:${socialLinks.email}`} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">Contact Me</a>
          </div>

          <button className="md:hidden p-2 bg-white/5 rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Available for Remote QA Roles
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tight mb-8 bg-gradient-to-b from-white via-white to-slate-600 bg-clip-text text-transparent">
            Precision <br className="hidden md:block" /> in Every Bit.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed mb-12">
            I specialize in <span className="text-white font-medium underline decoration-blue-500 decoration-2 underline-offset-4">Manual Software Testing</span>.
            From managing complex databases at Malengo to building React 19 apps, I ensure logic never fails the user.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#projects" className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/25 active:scale-95">
              Explore Projects <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4">
              <a href={socialLinks.github} target="_blank" className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all hover:text-blue-400"><Github className="w-5 h-5" /></a>
              <a href={socialLinks.linkedin} target="_blank" className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all hover:text-blue-400"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* About & CV Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            <div className="lg:col-span-5 space-y-8">
              <div className="relative inline-block">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden bg-slate-800 border-2 border-blue-500/30 p-1 shadow-2xl shadow-blue-500/10">
                  <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-indigo-900/40 flex items-center justify-center">
                    <User className="w-24 h-24 text-blue-500/40" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-3 rounded-2xl shadow-xl">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-black mb-6">About Me.</h2>
                <div className="space-y-4 text-slate-400 leading-relaxed text-lg">
                  <p>
                    I am an <span className="text-white">International Information Systems</span> student at TH Augsburg with a unique dual perspective.
                    I don't just "check" software; I understand the code architectures beneath it.
                  </p>
                  <p>
                    Currently, I manage critical data infrastructure at <span className="text-white">Malengo</span>, where my "Tester's Mindset" was forged.
                    When a tracking sheet for a scholar cohort shows a logic mismatch, I don't move on until I find the root cause.
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-slate-400">
                    <MapPin className="w-5 h-5 text-blue-500" /> <span>Augsburg / Remote</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <Globe className="w-5 h-5 text-blue-500" /> <span>Eng, De, Luganda</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <FileText className="w-40 h-40 text-white" />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Mark Daniels Mbaziira</h3>
                    <p className="text-blue-400 text-sm font-medium">B.Sc. Information Systems Student</p>
                  </div>
                  <div className="flex gap-3">
                    {/* View CV - Opens in new tab */}
                    <a href={socialLinks.cvUrl} target="_blank" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20">
                      <Eye className="w-4 h-4" /> View CV
                    </a>
                    {/* Download CV - Direct download */}
                    <a href={socialLinks.cvUrl} download className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-2xl text-sm font-bold transition-all border border-white/10">
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Education
                      </h4>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all">
                        <p className="font-bold text-white text-sm">TH Augsburg</p>
                        <p className="text-slate-400 text-xs">B.Sc. International Info Systems</p>
                        <p className="text-blue-500/60 text-[10px] mt-2 italic font-medium">2025 - Present</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Search className="w-4 h-4" /> Testing Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <SkillBadge text="Regression Testing" category="test" />
                        <SkillBadge text="Bug Documentation" category="test" />
                        <SkillBadge text="UI/UX QA" category="test" />
                        <SkillBadge text="Edge Cases" category="test" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Cpu className="w-4 h-4" /> Core Tech
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> React 19
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Java
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-500" /> SQL / CSV
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> GitHub Actions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Professional Path.</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="space-y-12">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-12 border-l-2 border-white/5 group hover:border-blue-600 transition-colors">
                <div className="absolute left-[-13px] top-0 p-2 bg-[#05070a] border-2 border-white/10 rounded-2xl group-hover:border-blue-600 group-hover:text-blue-500 transition-all">
                  {exp.icon}
                </div>
                <div className="flex flex-col md:flex-row md:justify-between items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-1">{exp.company}</h4>
                    <p className="text-blue-400 font-semibold tracking-wide uppercase text-xs">{exp.role}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-white/5 px-3 py-1 rounded-lg mt-2 md:mt-0">{exp.period}</span>
                </div>
                <ul className="space-y-4">
                  {exp.tasks.map((task, tidx) => (
                    <li key={tidx} className="flex gap-4 text-slate-400 text-base leading-relaxed">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/40 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black mb-4 tracking-tight">Technical Proof.</h2>
              <p className="text-slate-400 text-lg">Real-world applications where I applied rigorous testing standards.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, idx) => (
              <div key={idx} className="group relative rounded-[40px] overflow-hidden bg-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all duration-500 shadow-xl">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                  />
                </div>
                <div className="p-10 relative">
                  <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">{project.tag}</span>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 bg-white/5 rounded-lg border border-white/5 text-slate-400 font-medium">{t}</span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white/5 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all border border-white/5">
                    View Live <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="py-32 px-6 border-t border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter">Let's build <br className="sm:hidden" /> something <span className="text-blue-500">stable.</span></h2>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto text-lg leading-relaxed">
            I am ready to bring my data validation habits and technical curiosity to your team.
            Available for remote and on-site roles.
          </p>
          <a href={`mailto:${socialLinks.email}`} className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-blue-600/30 active:scale-95">
            <Mail className="w-6 h-6" /> Get in touch
          </a>

          <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-10 border-t border-white/5 pt-12">
            <div className="text-left">
              <p className="text-slate-200 font-bold text-lg mb-1">MARK DANIELS MBAZIIRA</p>
              <p className="text-slate-500 text-sm">© 2026 Crafted with precision and React 19.</p>
            </div>
            <div className="flex gap-4">
              <a href={socialLinks.github} target="_blank" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><Github className="w-5 h-5 text-slate-400 hover:text-white" /></a>
              <a href={socialLinks.linkedin} target="_blank" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><Linkedin className="w-5 h-5 text-slate-400 hover:text-white" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
