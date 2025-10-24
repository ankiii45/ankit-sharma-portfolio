\
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Mail, Linkedin, Download, MapPin } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Portfolio with parallax background and hover parallax effects + intro auto-fade
export default function AnkitPortfolio() {
  const resumeUrl = '/files/Ankit_Sharma_Resume_Optimized.pdf';
  const bgRef = useRef(null);

  // Helper for scroll animations
  const FadeInSection = ({ children, delay = 0 }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2 });

    useEffect(() => {
      if (inView) controls.start('visible');
    }, [controls, inView]);

    const variants = {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay } }
    };

    return (
      <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
        {children}
      </motion.div>
    );
  };

  // Parallax gradient background
  useEffect(() => {
    const canvas = bgRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    let scrollY = 0;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
      });
    }

    function draw() {
      const gradient = ctx.createLinearGradient(0, scrollY * 0.2, w, h + scrollY * 0.4);
      gradient.addColorStop(0, '#e0f7fa');
      gradient.addColorStop(1, '#c7d2fe');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = 'rgba(14,165,233,0.3)';
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      });
      requestAnimationFrame(draw);
    }
    draw();

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax tilt effect
  const handleMouseMove = (e, element) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / 20).toFixed(2);
    const rotateY = ((x - centerX) / -20).toFixed(2);
    element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    element.style.boxShadow = `${(rotateY*-2).toFixed(0)}px ${(rotateX*2).toFixed(0)}px 20px rgba(14,165,233,0.08)`;
  };

  const resetTilt = (element) => {
    element.style.transform = 'rotateX(0deg) rotateY(0deg)';
    element.style.boxShadow = '';
  };

  // Intro overlay auto-fade
  useEffect(() => {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;
    setTimeout(() => {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    }, 1800);
  }, []);

  return (
    <div className="relative min-h-screen text-slate-900 overflow-hidden">
      {/* Animated Background */}
      <canvas ref={bgRef} id="bg-animation" className="fixed inset-0 -z-10"></canvas>

      {/* Intro overlay */}
      <div id="intro-overlay" style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(90deg, rgba(14,165,233,0.1), rgba(167,139,250,0.08))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 60,
        transition: 'opacity .6s ease'
      }}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: 44, fontWeight: 700, color: '#0f172a', marginBottom: 6}}>Ankit Sharma</div>
          <div style={{fontSize: 16, color: '#475569'}}>Welcome to My Portfolio</div>
        </div>
      </div>

      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between backdrop-blur-md bg-white/30 rounded-xl shadow-sm border border-white/40">
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <img src="/assets/as_logo_gradient.svg" alt="AS" style={{width:48,height:48,borderRadius:999}} />
          <div>
            <h1 className="text-3xl font-bold text-[#0f172a]">Ankit Sharma</h1>
            <p className="text-sm text-[#475569]">Aspiring Business & Data Analyst — PGPM (Finance)</p>
          </div>
        </div>
        <nav className="flex items-center gap-6 text-[#1e293b] font-medium">
          <a href="#projects" className="hover:text-[#0ea5e9] transition">Projects</a>
          <a href="#experience" className="hover:text-[#0ea5e9] transition">Experience</a>
          <a href="#contact" className="hover:text-[#0ea5e9] transition">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <FadeInSection>
        <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div>
            <h2 className="text-5xl font-extrabold text-[#0f172a] leading-tight">Hi — I’m <span className="text-[#0284c7]">Ankit Sharma</span></h2>
            <p className="mt-5 text-[#334155] text-lg">PGPM candidate (Finance) at ICFAI Business School with a BCA background and over 2 years of professional experience in resource management, content research, and analytics. I create data-driven solutions to enhance decision-making and business performance.</p>

            <div className="mt-8 flex gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white rounded-lg shadow-lg hover:brightness-110 transition">View Work</a>
              <a href={resumeUrl} download className="inline-flex items-center gap-2 px-5 py-3 border border-[#cbd5e1] rounded-lg text-[#1e293b] hover:bg-[#f1f5f9] transition"><Download size={16}/>Download Resume</a>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[#475569] text-sm">
              <MapPin size={16}/> Kolkata, India
            </div>
          </motion.div>

          <motion.div
            className="p-8 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 glow-border transition-transform duration-200 ease-out"
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => resetTilt(e.currentTarget)}>
            <h3 className="text-lg font-semibold text-[#0f172a]">Key Skills</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {['Power BI','Excel','Microsoft Office','Google Suite','Canva','Content Research'].map((s)=> (
                <span key={s} className="px-4 py-2 bg-gradient-to-r from-[#bae6fd] to-[#e0f2fe] text-[#0369a1] rounded-full text-sm font-medium shadow-sm">{s}</span>
              ))}
            </div>
          </motion.div>
        </section>
      </FadeInSection>

      {/* Project Cards with Parallax Tilt */}
      <FadeInSection delay={0.2}>
        <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-bold text-[#0f172a]">Projects</h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{
              title: 'E-Commerce Site Design — 2021',
              desc: 'Led a group project designing an e-commerce site with improved UX and affordable product delivery.'
            }, {
              title: 'MBA Project — AI & IoT in Retail',
              desc: 'Research on how AI and IoT adoption enhances retail customer experience and drives business growth.'
            }].map((p, i) => (
              <div key={i}
                   className="p-8 bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 ease-out glow-border"
                   onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                   onMouseLeave={(e) => resetTilt(e.currentTarget)}>
                <h4 className="font-semibold text-[#0f172a] text-lg">{p.title}</h4>
                <p className="mt-2 text-[#334155] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* Experience Section */}
      <FadeInSection delay={0.3}>
        <section id="experience" className="max-w-6xl mx-auto px-6 py-20 bg-gradient-to-r from-[#f8fafc]/80 to-[#e0f2fe]/80 rounded-3xl">
          <h3 className="text-3xl font-bold text-[#0f172a]">Experience</h3>
          <div className="mt-8 space-y-6">
            {[{
              title: 'Resource Management — Phaguni Sharma Interior',
              period: 'Mar 2023 — Apr 2025',
              bullets: [
                'Coordinated on-site teams and vendors to maintain quality standards and meet deadlines.',
                'Managed manpower schedules and finances ensuring smooth project delivery.',
                'Maintained accurate inventory and procurement records to support timely material flow.'
              ]
            },{
              title: 'Senior Content Writer — Royal Research',
              period: 'Mar 2022 — Feb 2023',
              bullets: [
                'Created research-based reports and academic papers under strict deadlines.',
                'Reviewed and proofread content ensuring clarity, coherence, and compliance.',
              ]
            }].map((exp, idx) => (
              <div key={idx} className="p-6 bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl shadow-md hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-[#0f172a]">{exp.title}</h4>
                  <span className="text-sm text-[#475569]">{exp.period}</span>
                </div>
                <ul className="mt-3 list-disc list-inside text-[#334155] text-sm space-y-1">
                  {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* Education & Contact */}
      <FadeInSection delay={0.4}>
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-[#0f172a]">Education</h3>
              <ul className="mt-3 text-[#334155] text-sm space-y-1">
                <li><b>PGPM (Finance)</b> — ICFAI Business School (2025–2027)</li>
                <li><b>BCA</b> — Brainware University (84.22%) (2018–2021)</li>
                <li><b>HSC</b> — Central Model School (71%) (2016–2018)</li>
                <li><b>SSC</b> — Kalyani Public School (74.1%) (2016)</li>
              </ul>
            </div>
            <div className="p-8 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-[#0f172a]">Certifications & Activities</h3>
              <p className="mt-3 text-sm text-[#334155]">Certificate in Digital Marketing — WEBGURU Infosystem (Jul–Aug 2020)</p>
              <ul className="mt-3 list-disc list-inside text-sm text-[#334155] space-y-1">
                <li>Datalogix (Analytics Club)</li>
                <li>E-Cell (Entrepreneur Club)</li>
                <li>Placement Cell — IBS Mumbai</li>
              </ul>
            </div>
          </div>
        </section>

        <footer id="contact" className="max-w-6xl mx-auto px-6 py-20">
          <div className="p-8 bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] rounded-3xl shadow-2xl text-white flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <h4 className="text-xl font-semibold">Get in touch</h4>
              <p className="mt-3 text-sm flex items-center gap-2"><Mail size={16}/> <a href="mailto:ankitsharma25@ibsindia.org" className="hover:underline">ankitsharma25@ibsindia.org</a></p>
              <p className="mt-1 text-sm flex items-center gap-2"><Linkedin size={16}/> <a href="https://linkedin.com/in/ankit45" target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/ankit45</a></p>
              <p className="mt-1 text-sm flex items-center gap-2"><MapPin size={16}/> Kolkata, India</p>
            </div>
            <div className="w-full md:w-1/2">
              <form action={`mailto:ankitsharma25@ibsindia.org`} method="post" encType="text/plain" className="flex flex-col gap-3">
                <input className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-900" placeholder="Your name" name="name" />
                <input className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-900" placeholder="Your email" name="email" />
                <textarea className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-900" placeholder="Message" rows={4} name="message" />
                <button type="submit" className="px-5 py-3 bg-white text-[#0ea5e9] font-medium rounded-lg hover:bg-slate-100 transition">Send Message</button>
              </form>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-[#475569]">© {new Date().getFullYear()} Ankit Sharma — Designed with professionalism and passion</p>
        </footer>
      </FadeInSection>
    </div>
  );
}
