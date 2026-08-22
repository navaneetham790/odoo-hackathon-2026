import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Menu,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  MessageCircle,
  FileCheck2,
  TimerReset,
  Users,
  Wallet,
} from 'lucide-react'
import './Landing.css'

const features = [
  { icon: Users, color: 'blue', title: 'Employee Profile Management', text: 'Digitize employee records and onboarding effortlessly.' },
  { icon: Clock, color: 'emerald', title: 'Smart Attendance Tracking', text: 'Monitor daily and weekly attendance with ease.' },
  { icon: CalendarCheck, color: 'purple', title: 'Leave & Time-Off Management', text: 'Hassle-free requests for Paid, Sick, and Unpaid leave.' },
  { icon: Wallet, color: 'rose', title: 'Payroll Visibility', text: 'Transparent payroll access for every employee.' },
  { icon: Building2, color: 'indigo', title: 'Automated Workflows', text: 'One-click approval workflows for Admins and HR Officers.' },
  { icon: ShieldCheck, color: 'amber', title: 'Role-Based Security', text: 'Secure access tailored for Admins and Employees.' },
]

export default function Landing({ onNavigate }) {
  const [activeNav, setActiveNav] = useState('')

  useEffect(() => {
    const sections = ['top', 'about', 'features', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const updateActiveNav = () => {
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= 150)
        .at(-1)
      setActiveNav(current?.id ?? 'top')
    }

    updateActiveNav()
    window.addEventListener('scroll', updateActiveNav, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveNav)
  }, [])

  return (
    <main className="landing-page min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      <nav className="fixed z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2" aria-label="Dayflow home">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600"><span className="h-4 w-4 rounded-sm bg-white" /></span>
            <span className="text-xl font-bold tracking-tight">Dayflow</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#top" onClick={() => setActiveNav('top')} className={`landing-nav-link ${activeNav === 'top' ? 'landing-nav-link--active' : ''}`}>Home</a>
            <a href="#about" onClick={() => setActiveNav('about')} className={`landing-nav-link ${activeNav === 'about' ? 'landing-nav-link--active' : ''}`}>About</a>
            <a href="#features" onClick={() => setActiveNav('features')} className={`landing-nav-link ${activeNav === 'features' ? 'landing-nav-link--active' : ''}`}>Features</a>
            <a href="#contact" onClick={() => setActiveNav('contact')} className={`landing-nav-link ${activeNav === 'contact' ? 'landing-nav-link--active' : ''}`}>Contact</a>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <button onClick={() => onNavigate('sign-in')} className="landing-sign-in">Sign In</button>
            <button onClick={() => onNavigate('sign-up')} className="landing-primary-button landing-primary-button--small">Sign Up</button>
          </div>
          <button className="text-slate-600 md:hidden" aria-label="Open navigation"><Menu className="h-6 w-6" /></button>
        </div>
      </nav>

      <section id="top" className="landing-section-anchor landing-hero relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-32 lg:pt-48">
        <div className="landing-hero__glow landing-hero__glow--right" />
        <div className="landing-hero__glow landing-hero__glow--left" />
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <p className="landing-badge"><span className="landing-badge__dot" /> Built for modern teams</p>
          <h1 className="mx-auto mb-8 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">Simplify your <span className="landing-gradient-text">core HR operations.</span></h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-slate-500">Streamline onboarding, attendance, leaves, payroll visibility, and approvals in one secure platform.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button onClick={() => onNavigate('sign-in')} className="landing-dark-button">Sign In <ArrowRight className="h-5 w-5" /></button>
            <button onClick={() => onNavigate('sign-up')} className="landing-secondary-button">Sign Up</button>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm font-medium text-slate-500 sm:flex-row sm:gap-6"><span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-green-500" /> Paperless by design</span><span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-green-500" /> Secure, role-based access</span></div>
        </div>
      </section>

      <section id="about" className="landing-section-anchor bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div><p className="mb-3 font-semibold text-blue-600">ABOUT DAYFLOW</p><h2 className="mb-5 text-3xl font-bold leading-tight md:text-4xl">Everything HR needs, in one simple workspace.</h2><p className="text-lg leading-relaxed text-slate-500">Dayflow helps companies organize employee information, attendance, leave requests, and approvals without spreadsheets or paperwork.</p></div>
          <div className="landing-about-panel"><div className="landing-about-panel__header"><span className="h-3 w-3 rounded-full bg-blue-500" /><span>One place for your people</span></div><div className="grid gap-4 sm:grid-cols-2"><AboutItem icon={Users} title="Employee records" text="Keep team details organized." /><AboutItem icon={CalendarCheck} title="Leave requests" text="Approve requests in seconds." /><AboutItem icon={Clock} title="Attendance" text="Track daily work status." /><AboutItem icon={ShieldCheck} title="Secure access" text="Right access for every role." /></div></div>
        </div>
      </section>

      <section id="features" className="landing-section-anchor border-t border-slate-100 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center"><h2 className="mb-4 text-3xl font-bold md:text-4xl">Everything you need to manage your team</h2><p className="text-lg text-slate-500">Dayflow replaces scattered spreadsheets and disjointed tools with one seamless, powerful platform.</p></div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">{features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}</div>
        </div>
      </section>

      <section className="bg-slate-50 py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-14 max-w-3xl text-center"><p className="mb-3 font-semibold text-blue-600">WHY DAYFLOW</p><h2 className="mb-4 text-3xl font-bold md:text-4xl">Less admin work. Better employee experience.</h2><p className="text-lg text-slate-500">Give your HR team more time for people, while employees get clear, fast answers to everyday requests.</p></div><div className="grid gap-6 md:grid-cols-3"><Benefit icon={TimerReset} title="Save valuable time" text="Automate repetitive HR tasks and keep every record in one organized place." /><Benefit icon={FileCheck2} title="Go paperless" text="Replace paperwork and scattered spreadsheets with reliable digital workflows." /><Benefit icon={MessageCircle} title="Improve communication" text="Keep HR, managers, and employees aligned from request to approval." /></div></div></section>

      <section id="contact" className="landing-section-anchor landing-contact-section bg-slate-900"><div className="w-full px-4 pt-16 text-center sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><p className="mb-3 font-semibold text-blue-300">CONTACT US</p><h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Let’s make HR simpler together.</h2><p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">Have a question about Dayflow? Reach our team through any of the details below.</p><div className="grid gap-5 text-left md:grid-cols-3"><ContactDetail icon={Phone} title="Phone" detail="+91 98765 43210" href="tel:+919876543210" /><ContactDetail icon={Mail} title="Email" detail="hello@dayflow.com" href="mailto:hello@dayflow.com" /><ContactDetail icon={MapPin} title="Address" detail="Chennai, Tamil Nadu, India" /></div></div></div><footer className="landing-footer w-full py-7"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex justify-center"><div className="flex items-center gap-2 font-bold text-white"><span className="h-6 w-6 rounded bg-blue-500" /> Dayflow</div></div><p className="landing-footer-copyright">© 2026 Dayflow. All rights reserved.</p></div></footer></section>
    </main>
  )
}

function FeatureCard({ icon: Icon, color, title, text }) {
  return <article className="landing-feature-card"><span className={`landing-feature-icon landing-feature-icon--${color}`}><Icon className="h-7 w-7" /></span><h3 className="mb-3 text-xl font-bold">{title}</h3><p className="leading-relaxed text-slate-500">{text}</p></article>
}

function Benefit({ icon: Icon, title, text }) {
  return <article className="landing-benefit-card"><span className="landing-benefit-icon"><Icon className="h-6 w-6" /></span><h3 className="mb-2 text-xl font-bold">{title}</h3><p className="leading-relaxed text-slate-500">{text}</p></article>
}

function AboutItem({ icon: Icon, title, text }) {
  return <div className="landing-about-item"><span><Icon className="h-5 w-5" /></span><div><h3>{title}</h3><p>{text}</p></div></div>
}

function ContactDetail({ icon: Icon, title, detail, href }) {
  const content = <><span className="landing-contact-icon"><Icon className="h-6 w-6" /></span><div><h3>{title}</h3><p>{detail}</p></div></>
  return href ? <a className="landing-contact-card" href={href}>{content}</a> : <div className="landing-contact-card">{content}</div>
}
