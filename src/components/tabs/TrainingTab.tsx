import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  Clock, 
  Video, 
  Award, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { TabType } from '../../types';
import { TRAINING_COURSES, COMPANY_INFO } from '../../data/websiteData';
import { WhatsAppIcon } from '../SocialIcons';

interface TrainingTabProps {
  setActiveTab: (tab: TabType) => void;
}

export const TrainingTab: React.FC<TrainingTabProps> = ({ setActiveTab }) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(TRAINING_COURSES[0].id);

  const activeCourse = TRAINING_COURSES.find(c => c.id === selectedCourseId) || TRAINING_COURSES[0];

  return (
    <div className="space-y-28 md:space-y-36 pb-28 pt-36 md:pt-44">
      
      {/* 1. SECTION HEADER (Matching AI Battlepass Screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-emerald-700 tracking-wider uppercase shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          INTERACTIVE DEVELOPER TRAINING
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          THE AI BATTLEPASS & <span className="text-gradient-multi">PROGRAMMING TRACKS</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-xl font-medium italic max-w-3xl mx-auto">
          "From Python foundations to building autonomous intelligent AI systems."
        </p>
      </section>

      {/* 2. FLAGSHIP HERO CARD: AI BATTLEPASS (₹1,200) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 border-2 border-emerald-300 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-700 tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>PREMIER 3-MONTH COHORT</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                AI <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-orange-500 bg-clip-text text-transparent">BATTLEPASS</span>
                <span className="block text-xl sm:text-2xl font-black text-blue-600 mt-1">
                  Level Up from Python to Agentic AI
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
                Master Python, Machine Learning, Deep Learning, NLP, LLMs, Generative AI, RAG, and autonomous Agentic AI with 20+ live hands-on projects and personal mentorship from Manideep Juvvala.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://forms.gle/5Ax5qbXBpUDozCRN7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-orange inline-flex items-center gap-2 px-8 py-4 text-xs font-black uppercase tracking-wider"
                >
                  <span>ENROLL NOW — ₹1,200</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-green inline-flex items-center gap-2 px-7 py-4 text-xs font-black uppercase tracking-wider"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>CHAT ON WHATSAPP</span>
                </a>
              </div>
            </div>

            {/* Course Fee Pill Box */}
            <div className="lg:col-span-4 bg-slate-50 p-8 rounded-3xl border-2 border-slate-200 text-center space-y-3">
              <div className="text-xs font-black text-slate-500 uppercase tracking-wider">SPECIAL COHORT FEE</div>
              <div className="text-4xl sm:text-5xl font-black text-emerald-600 font-mono">
                ₹1,200
              </div>
              <div className="text-xs font-bold text-slate-600">Full 3-Month Access • All Live Classes</div>
              <div className="pt-2 text-[11px] font-bold text-slate-500 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>20+ Real-World AI Projects Included</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SPLIT COURSE CURRICULUM SELECTOR (Matching AI Battlepass Screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Course Tracks List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider px-2 mb-3">
              SELECT TRACK (01 - 05)
            </div>

            {TRAINING_COURSES.map((course, idx) => {
              const isSelected = course.id === selectedCourseId;
              return (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-white border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-black px-3 py-1.5 rounded-lg ${
                        isSelected
                          ? 'bg-gradient-to-r from-emerald-500 via-blue-600 to-orange-500 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                      }`}
                    >
                      TRACK 0{idx + 1}
                    </span>
                    <div>
                      <h4 className={`text-sm sm:text-base font-black transition-colors ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                        {course.title.split(':')[0]}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 font-medium mt-0.5">{course.badge} • {course.duration}</p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Active Course Detail Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 border-2 border-slate-200 shadow-xl relative space-y-6">
              
              {/* Header Badge & Track Number */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <span className="text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                  {activeCourse.badge}
                </span>
                <span className="text-3xl font-black text-slate-300 font-mono">
                  TRACK 0{TRAINING_COURSES.findIndex(c => c.id === selectedCourseId) + 1}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {activeCourse.title}
                </h3>
                <div className="flex items-center gap-3 text-xs font-bold text-blue-600 mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Duration: {activeCourse.duration}</span>
                  </span>
                  <span>•</span>
                  <span>Level: {activeCourse.level}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {activeCourse.description}
              </p>

              {/* Subtopics Covered with Checkmarks */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>KEY CURRICULUM HIGHLIGHTS & OUTCOMES</span>
                </div>
                <div className="space-y-2.5">
                  {activeCourse.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium bg-white p-3 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Covered */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-600" />
                  <span>TOOLS & FRAMEWORKS MASTERED</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeCourse.tools.map((tool, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-white text-slate-800 border border-slate-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Strictly Orange, Green */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="text-base font-black text-slate-900 font-mono">
                  {activeCourse.pricing}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/919381088104?text=Hi%20Mani%2C%20I%20want%20to%20enroll%20in%20the%20${encodeURIComponent(activeCourse.title)}%20track.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-green inline-flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>ENROLL VIA WHATSAPP</span>
                  </a>

                  <button
                    onClick={() => {
                      setActiveTab('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="btn-orange inline-flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    <span>REQUEST DETAILS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. TEACHING APPROACH (50% Theory / 50% Hands-On) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-700 uppercase">
            PEDAGOGICAL EXCELLENCE
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900">
            50% INTUITIVE CONCEPTS + 50% LIVE HANDS-ON CODING
          </h3>
          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            We avoid dry mathematical slides without context. Every theoretical algorithm is demystified intuitively and immediately coded from scratch in live code editors.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
              <div className="text-sm font-black text-blue-700 uppercase">1. Intuitive Concepts</div>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium leading-relaxed">
                Visualizing how attention mechanisms, neural weights, and pointers function before writing code.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
              <div className="text-sm font-black text-emerald-700 uppercase">2. Live Interactive Code</div>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium leading-relaxed">
                Building scripts, endpoints, and models in real-time alongside instructors with live doubt resolution.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
              <div className="text-sm font-black text-orange-700 uppercase">3. Real Portfolio Projects</div>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium leading-relaxed">
                Every project is committed to GitHub with clean documentation ready to showcase to interviewers.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
