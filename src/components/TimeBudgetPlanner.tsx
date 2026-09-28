import React, { useState } from 'react';
import {
  Clock,
  AlertTriangle,
  FlaskConical,
  BookMarked,
  Layers,
  CheckCircle2,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';

interface TimeCategory {
  id: string;
  name: string;
  description: string;
  hours: number;
}

export const TimeBudgetPlanner: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<'practical' | 'theoretical' | 'interdisciplinary'>('practical');

  // Breakdown for each discipline
  const [timeBreakdown, setTimeBreakdown] = useState<{ [key: string]: number }>({
    litReview: 12,
    labSetup: 18,
    dataCollection: 20,
    supervisorMeetings: 4,
    writingDraft: 15,
    revisionsAndRPPF: 6,
  });

  const handleDisciplineChange = (type: 'practical' | 'theoretical' | 'interdisciplinary') => {
    setSelectedDiscipline(type);
    if (type === 'practical') {
      setTimeBreakdown({
        litReview: 12,
        labSetup: 18,
        dataCollection: 22,
        supervisorMeetings: 4,
        writingDraft: 15,
        revisionsAndRPPF: 6,
      }); // Total: 77 hours
    } else if (type === 'theoretical') {
      setTimeBreakdown({
        litReview: 14,
        labSetup: 0,
        dataCollection: 8,
        supervisorMeetings: 4,
        writingDraft: 12,
        revisionsAndRPPF: 4,
      }); // Total: 42 hours
    } else {
      setTimeBreakdown({
        litReview: 15,
        labSetup: 8,
        dataCollection: 14,
        supervisorMeetings: 5,
        writingDraft: 14,
        revisionsAndRPPF: 6,
      }); // Total: 62 hours
    }
  };

  const totalHours = Object.values(timeBreakdown).reduce((a, b) => a + b, 0);

  const isPractical = selectedDiscipline === 'practical';
  const hasInsufficientScienceHours = isPractical && totalHours < 60;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 mb-2">
            <Clock className="w-3.5 h-3.5" />
            Teacher's Reality Check
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Time Budget &amp; Lab Reality Planner
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Comparing the official IB 40-hour recommendation with the 70–80 hour practical reality for experimental subjects.
          </p>
        </div>

        {/* Total Hours Badge */}
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center min-w-[170px] ${
          hasInsufficientScienceHours
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : totalHours >= 70
            ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
            : 'bg-emerald-50 border-emerald-200 text-emerald-900'
        }`}>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-80">
            Total Planned Time
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono mt-0.5">
            {totalHours} <span className="text-xl font-normal opacity-70">Hours</span>
          </div>
          <div className="text-xs font-medium mt-1">
            {isPractical
              ? 'Realistic Target: 70–80 hrs'
              : 'IB Recommendation: ~40 hrs'}
          </div>
        </div>
      </div>

      {/* Discipline Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
        <button
          onClick={() => handleDisciplineChange('practical')}
          className={`p-4 rounded-xl border text-left transition flex items-start gap-3 ${
            selectedDiscipline === 'practical'
              ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20 shadow-xs'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900">Practical / Lab Science</div>
            <div className="text-xs text-slate-500 mt-0.5">Physics, Chemistry, Biology</div>
            <div className="text-[11px] font-semibold text-indigo-700 mt-1">Preset: 70–80 Hours</div>
          </div>
        </button>

        <button
          onClick={() => handleDisciplineChange('theoretical')}
          className={`p-4 rounded-xl border text-left transition flex items-start gap-3 ${
            selectedDiscipline === 'theoretical'
              ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20 shadow-xs'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900">Theoretical / Secondary</div>
            <div className="text-xs text-slate-500 mt-0.5">Math, History, Economics, Lit</div>
            <div className="text-[11px] font-semibold text-emerald-700 mt-1">Preset: ~40 Hours</div>
          </div>
        </button>

        <button
          onClick={() => handleDisciplineChange('interdisciplinary')}
          className={`p-4 rounded-xl border text-left transition flex items-start gap-3 ${
            selectedDiscipline === 'interdisciplinary'
              ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20 shadow-xs'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900">Interdisciplinary</div>
            <div className="text-xs text-slate-500 mt-0.5">CS + Physics, Digital Soc + Psych</div>
            <div className="text-[11px] font-semibold text-purple-700 mt-1">Preset: ~60 Hours</div>
          </div>
        </button>
      </div>

      {/* Teacher Warning for Lab Subjects */}
      {hasInsufficientScienceHours && (
        <div className="mt-6 bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3 text-amber-950">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sm text-amber-900">
              Physics Teacher Reality Alert: Under-Budgeting Practical Experiments
            </div>
            <p className="text-xs sm:text-sm text-amber-800 mt-0.5 leading-relaxed">
              "According to my experience as a Physics teacher, 40 hours for practical subjects like Physics, Chemistry, and Biology is not enough. As the nature of these subjects involves experiments in the school lab, you may need 70, maybe 80 hours."
            </p>
          </div>
        </div>
      )}

      {/* Sliders for time breakdown */}
      <div className="mt-8 space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Customize Your Estimated Hours Allocation:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lit Review */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-slate-800">1. Literature Review &amp; Background Theory</span>
              <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {timeBreakdown.litReview} hrs
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="30"
              value={timeBreakdown.litReview}
              onChange={(e) => setTimeBreakdown({ ...timeBreakdown, litReview: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-slate-500 mt-1">Reading academic journals and secondary sources.</p>
          </div>

          {/* Lab Setup */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-slate-800">2. Apparatus Setup &amp; Preliminary Trials</span>
              <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {timeBreakdown.labSetup} hrs
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              value={timeBreakdown.labSetup}
              onChange={(e) => setTimeBreakdown({ ...timeBreakdown, labSetup: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-slate-500 mt-1">Equipment calibration, testing variables, protocol trials.</p>
          </div>

          {/* Data Collection */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-slate-800">3. Primary Data Collection &amp; Repeat Runs</span>
              <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {timeBreakdown.dataCollection} hrs
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              value={timeBreakdown.dataCollection}
              onChange={(e) => setTimeBreakdown({ ...timeBreakdown, dataCollection: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-slate-500 mt-1">Minimum 5 iterations per value to calculate standard error.</p>
          </div>

          {/* Supervisor Meetings */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-slate-800">4. Supervisor Meetings (3–5 Hours Mandatory)</span>
              <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {timeBreakdown.supervisorMeetings} hrs
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="6"
              value={timeBreakdown.supervisorMeetings}
              onChange={(e) => setTimeBreakdown({ ...timeBreakdown, supervisorMeetings: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-slate-500 mt-1">Informal chat, 1st formal, 2nd formal, and concluding Viva Voce.</p>
          </div>

          {/* Writing Draft */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-slate-800">5. 4,000-Word Drafting &amp; Statistical Analysis</span>
              <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {timeBreakdown.writingDraft} hrs
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="30"
              value={timeBreakdown.writingDraft}
              onChange={(e) => setTimeBreakdown({ ...timeBreakdown, writingDraft: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-slate-500 mt-1">Graphs, error bars, regression analysis, structured argumentation.</p>
          </div>

          {/* Revisions and RPPF */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-slate-800">6. Revisions, RPPF Forms &amp; Bibliography</span>
              <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {timeBreakdown.revisionsAndRPPF} hrs
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="20"
              value={timeBreakdown.revisionsAndRPPF}
              onChange={(e) => setTimeBreakdown({ ...timeBreakdown, revisionsAndRPPF: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-slate-500 mt-1">Proofreading, citations check, and 3 RPPF reflection entries.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
