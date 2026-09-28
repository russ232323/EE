import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  MessageSquare,
  HelpCircle,
  Clock,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';

export const SupervisionJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      title: 'Informal Introductory Meeting',
      subtitle: 'Topic Brainstorming & Feasibility',
      timing: 'Beginning of DP Year 1 / Early Stage',
      duration: '30–45 minutes',
      focus: 'Discuss personal interest, scope of the subject, initial cause-and-effect research question ideas, and laboratory resource availability.',
      studentTasks: [
        'Bring 2-3 topics of authentic personal interest.',
        'Propose an initial cause-and-effect relationship.',
        'Check equipment and laboratory safety with science technicians.',
      ],
      supervisorRole: 'Assesses whether the topic is realistic, suitably matched to the subject guide, and safe for school premises.',
    },
    {
      title: 'First Formal Reflection Session',
      subtitle: 'Planning, Methodology & RPPF Entry 1',
      timing: 'After preliminary reading & outline',
      duration: '45–60 minutes',
      focus: 'Finalize the formal research question, refine the methodology (primary experiment or secondary dataset), and evaluate initial academic sources.',
      studentTasks: [
        'Submit a detailed methodology outline and variable control list.',
        'Complete the 1st written entry on the Reflections on Planning and Progress Form (RPPF).',
        'Address ethical and risk assessment declarations.',
      ],
      supervisorRole: 'Verifies academic rigor, cautions against overly broad inquiries, and signs off on methodology.',
    },
    {
      title: 'Second Formal Reflection Session',
      subtitle: 'Interim Draft Review & Data Analysis',
      timing: 'Middle Stage / Post-Experimentation',
      duration: '45–60 minutes',
      focus: 'Review raw data, anomalous measurements, graph plotting, error propagation, and the emerging structured thesis argument.',
      studentTasks: [
        'Present collected data and preliminary mathematical/statistical models.',
        'Discuss analytical setbacks and unexpected results.',
        'Draft the 2nd RPPF reflection focusing on intellectual resilience and analytical pivots.',
      ],
      supervisorRole: 'Gives formative feedback on draft progress without line-by-line editing (per IB regulations).',
    },
    {
      title: 'Concluding Viva Voce',
      subtitle: 'Final Oral Interview & Criterion E Verification',
      timing: 'Upon completion of the 4,000-word paper',
      duration: '20–30 minutes (Oral)',
      focus: 'A concluding oral interview where the student articulates their personal findings, defends their conclusions, and reflects on their intellectual journey.',
      studentTasks: [
        'Verbally summarize findings, limitations, and future research avenues.',
        'Demonstrate authentic authorship and academic integrity.',
        'Complete the 3rd and final RPPF reflection entry.',
      ],
      supervisorRole: 'Verifies authentic authorship, drafts supervisor commentary for IB examiners, and helps determine Criterion E (Engagement) marks.',
    },
  ];

  const currentStepData = steps[activeStep];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
            <Users className="w-3.5 h-3.5" />
            Supervision &amp; Formal Protocol
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            The 3–5 Hours Supervision Cycle
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            "Your supervisor will usually be a teacher at your school suitably qualified in the subject... It is generally expected to take between 3 to 5 hours."
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3">
          <Clock className="w-5 h-5 text-indigo-600 flex-shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-slate-900">Total Contact Time</div>
            <div className="text-slate-600">3 to 5 hours recommended</div>
          </div>
        </div>
      </div>

      {/* Rules Notice: School Teacher vs Parents/Mentors */}
      <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
        <GraduationCap className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900">Official Supervision Regulation:</strong> Your supervisor must be a teacher at your school suitably qualified in your chosen discipline. While you are fully allowed to consult external subject specialists, scientists, or parents for informal guidance, <strong>they cannot assume the role, legal signing authority, or institutional responsibility of your supervisor</strong>.
        </div>
      </div>

      {/* 4 Step Timeline Stepper */}
      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          {steps.map((st, idx) => (
            <button
              key={st.title}
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                activeStep === idx
                  ? 'bg-indigo-600 text-white font-semibold shadow-md border-indigo-600'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  activeStep === idx ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  Phase {idx + 1}
                </span>
                <span className="text-[10px] opacity-80">{st.duration}</span>
              </div>
              <div className="font-bold text-xs truncate">{st.title}</div>
              <div className={`text-[11px] mt-1 line-clamp-1 ${
                activeStep === idx ? 'text-indigo-100' : 'text-slate-500'
              }`}>
                {st.subtitle}
              </div>
            </button>
          ))}
        </div>

        {/* Active Phase Details */}
        <div className="mt-6 bg-slate-50/70 border border-slate-200 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs uppercase font-bold text-indigo-600 tracking-wider">
                Phase {activeStep + 1} of 4 • {currentStepData.timing}
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mt-0.5">
                {currentStepData.title}
              </h3>
            </div>
            <span className="text-xs font-mono font-semibold bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-700 w-fit">
              Duration: {currentStepData.duration}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mt-4">
            {currentStepData.focus}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Student Deliverables */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Student Action Checklist
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {currentStepData.studentTasks.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Supervisor Role */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-600" />
                Supervisor's Mandated Responsibility
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentStepData.supervisorRole}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
                Note: Supervisors are not permitted to edit, re-write, or heavily mark up student prose. Guidance is strictly strategic and formative.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
