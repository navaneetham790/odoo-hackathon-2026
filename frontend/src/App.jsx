import React from 'react';
import { 
  Building2, 
  Users, 
  CalendarCheck, 
  Wallet, 
  ArrowRight,
  CheckCircle2,
  Menu,
  ShieldCheck,
  Clock,
  PieChart
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 rounded-sm bg-white"></div>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Dayflow</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">How it Works</a>
              <a href="#testimonials" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Testimonials</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-slate-600 hover:text-slate-900 font-medium px-3 py-2">Sign In</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm hover:shadow">
                Start Free Trial
              </button>
            </div>
            
            <div className="md:hidden flex items-center">
              <button className="text-slate-600">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Introducing Dayflow HRMS 2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
            Every workday, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">perfectly aligned.</span>
          </h1>
          
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate Human Resource Management System. Digitize and streamline employee onboarding, attendance, leave, and payroll in one secure platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-sm flex items-center justify-center gap-2">
              Book a Demo
            </button>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> No credit card required</div>
            <div className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> 14-day free trial</div>
          </div>
        </div>
      </section>

      {/* Dashboard Mockup Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-10 lg:-mt-20 relative z-20 mb-32">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden transform transition-transform hover:-translate-y-2 duration-500">
          <div className="bg-slate-100 rounded-t-xl h-8 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="bg-slate-50 p-4 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Mockup Content */}
             <div className="col-span-1 space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><Users className="text-blue-600"/></div>
                   <div><p className="text-sm text-slate-500">Total Employees</p><p className="text-xl font-bold">1,248</p></div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><Clock className="text-green-600"/></div>
                   <div><p className="text-sm text-slate-500">Present Today</p><p className="text-xl font-bold">1,180</p></div>
                </div>
             </div>
             <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-center items-center h-64 border-dashed border-2">
                <PieChart className="w-12 h-12 text-slate-300 mb-2"/>
                <p className="text-slate-500 font-medium">Payroll Overview Chart</p>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to manage your team</h2>
            <p className="text-lg text-slate-500">Dayflow replaces your scattered spreadsheets and disjointed tools with one seamless, powerful platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Employee Profiles</h3>
              <p className="text-slate-500 leading-relaxed">Securely store personal details, job history, and documents. Role-based access ensures privacy between Admin and Employees.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Attendance Tracking</h3>
              <p className="text-slate-500 leading-relaxed">Daily and weekly views with simple check-in/out. Instantly identify present, absent, and half-day statuses.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <CalendarCheck className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Leave Management</h3>
              <p className="text-slate-500 leading-relaxed">Employees apply for paid or sick leave with a few clicks. HR gets a unified dashboard to approve or reject requests.</p>
            </div>
            {/* Feature 4 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                <Wallet className="w-7 h-7 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Payroll Visibility</h3>
              <p className="text-slate-500 leading-relaxed">Admins manage salary structures and ensure accuracy, while employees get transparent, read-only access to their payslips.</p>
            </div>
             {/* Feature 5 */}
             <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Authentication</h3>
              <p className="text-slate-500 leading-relaxed">Enterprise-grade security for Sign-Up and Sign-In. Enforced password rules and mandatory email verification.</p>
            </div>
             {/* Feature 6 */}
             <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Approval Workflows</h3>
              <p className="text-slate-500 leading-relaxed">Streamlined communication between staff and management. Changes reflect immediately across the entire system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your HR operations?</h2>
          <p className="text-xl text-slate-300 mb-10">Join thousands of companies using Dayflow to manage their most valuable asset: their people.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg">
            Create Your Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-[2px] bg-white"></div>
            </div>
            <span className="font-bold text-lg text-slate-900">Dayflow</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Dayflow HRMS. Built for Odoo Hackathon.</p>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
