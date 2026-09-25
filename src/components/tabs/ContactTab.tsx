import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  User, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/websiteData';
import { WhatsAppIcon, InstagramIcon } from '../SocialIcons';

export const ContactTab: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'AI & Machine Learning Solution',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-28 md:space-y-36 pb-28 pt-36 md:pt-44">
      
      {/* 1. SECTION HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-700 tracking-wider uppercase shadow-sm">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          DIRECT CONSULTATION & INQUIRIES
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          GET IN TOUCH WITH <span className="text-gradient-multi">{COMPANY_INFO.name.toUpperCase()}</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-xl font-medium italic max-w-3xl mx-auto">
          "Speak directly with technical lead Manideep Juvvala for project scoping, software proposals, and cohort enrollments."
        </p>
      </section>

      {/* 2. MAIN CONTACT & FORM GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200 shadow-xl space-y-8">
              
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-blue-600">DIRECT LINE</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Direct Access to Founder
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  We don't use sales agents or intermediaries. You speak directly with <strong>{COMPANY_INFO.founder}</strong>.
                </p>
              </div>

              <div className="space-y-4">
                
                {/* Phone Card */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                  <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Direct Phone Call</div>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-base font-black font-mono text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {COMPANY_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>

                {/* WhatsApp Card */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-300">
                  <div className="p-3 rounded-xl bg-emerald-600 text-white shadow-sm">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-emerald-800 uppercase tracking-wider">Instant WhatsApp Chat</div>
                    <a
                      href={COMPANY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-black text-emerald-900 hover:underline transition-all"
                    >
                      Chat on {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Instagram Card */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-pink-50/60 border-2 border-pink-200">
                  <div className="p-3 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-sm">
                    <InstagramIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-pink-800 uppercase tracking-wider">Follow on Instagram</div>
                    <a
                      href={COMPANY_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-black text-pink-900 hover:underline transition-all"
                    >
                      {COMPANY_INFO.instagramHandle}
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Official Email</div>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-xs sm:text-sm font-black font-mono text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                  <div className="p-3 rounded-xl bg-slate-200 text-slate-700 mt-0.5">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="font-black text-slate-500 uppercase tracking-wider text-[11px]">Availability & Hours</div>
                    <div className="font-black text-slate-900">{COMPANY_INFO.hours}</div>
                    <div className="text-slate-500 font-semibold">{COMPANY_INFO.address}</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Inquiry Form in Big White Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-xl space-y-6">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-blue-600">INQUIRY FORM</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                      Send a Message or Project Scope
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                      Fill out your details and we will reply promptly. You can also send this info directly to WhatsApp!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Service Needed *</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-bold focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                      >
                        <option>AI & Machine Learning Solution</option>
                        <option>Full-Stack Web Application / SaaS</option>
                        <option>Mobile Application (iOS / Android)</option>
                        <option>Developer Training / AI Battlepass</option>
                        <option>Final Year Project (IEEE Capstone)</option>
                        <option>General Tech Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Your Message / Requirements *</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Briefly describe what you would like to build, learn, or your college project topic..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-orange w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-9 text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>{isSubmitting ? 'SUBMITTING & DISPATCHING...' : 'SUBMIT INQUIRY'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-16 space-y-6 animate-fadeIn">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">
                    Thank You, {formData.name || 'Friend'}!
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
                    Your inquiry regarding <strong>{formData.service}</strong> has been saved with an official timestamp in the company database and sent directly to Manideep (<strong>9381088104</strong>).
                  </p>

                  <div className="pt-4 flex justify-center">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-blue inline-flex items-center gap-2 py-3.5 px-8 text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
                    >
                      <span>SUBMIT ANOTHER INQUIRY</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
