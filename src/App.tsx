/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  Grid,
  Award,
  Clock,
  Target,
  Users,
  HelpCircle,
  Sparkles,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { LecturePlayer } from './components/LecturePlayer';
import { DpMatrixCalculator } from './components/DpMatrixCalculator';
import { AssessmentCriteriaCalculator } from './components/AssessmentCriteriaCalculator';
import { TimeBudgetPlanner } from './components/TimeBudgetPlanner';
import { ResearchQuestionBuilder } from './components/ResearchQuestionBuilder';
import { SupervisionJourney } from './components/SupervisionJourney';
import { KnowledgeQuiz } from './components/KnowledgeQuiz';
import { LECTURE_CHAPTERS } from './data/lectureContent';

type TabKey = 'lecture' | 'matrix' | 'criteria' | 'time' | 'rq' | 'supervision' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('lecture');
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);

  const navItems: { key: TabKey; label: string; icon: React.ReactNode; badge?: string }[] = [
    { key: 'lecture', label: 'Lecture & TTS Audio', icon: <Volume2 className="w-4 h-4" />, badge: 'Gemini TTS' },
    { key: 'matrix', label: 'EE + TOK Matrix', icon: <Grid className="w-4 h-4" /> },
    { key: 'criteria', label: 'Assessment (34 Marks)', icon: <Award className="w-4 h-4" /> },
    { key: 'time', label: 'Time & Lab Reality', icon: <Clock className="w-4 h-4" /> },
    { key: 'rq', label: 'Cause-Effect RQ Builder', icon: <Target className="w-4 h-4" />, badge: 'AI Test' },
    { key: 'supervision', label: 'Supervision (3-5h)', icon: <Users className="w-4 h-4" /> },
    { key: 'quiz', label: 'Check Understanding', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 antialiased font-sans">
      {/* Top Header / Brand Bar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-amber-500 flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-base sm:text-lg leading-tight tracking-tight flex items-center gap-2">
                  <span>IB Extended Essay Masterclass</span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-mono font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-full">
                    Part 1
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400">
                  Lecturer: Rasoul Jafarinejad • IB Physics &amp; DP Core Educator
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                <Sparkles className="w-3.5 h-3.5" />
                gemini-3.8-flash-tts
              </span>
              <button
                onClick={() => {
                  setActiveTab('lecture');
                  setCurrentChapterIndex(0);
                }}
                className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-3 py-1.5 rounded-lg transition"
              >
                Listen to Lecture
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex overflow-x-auto no-scrollbar gap-1 border-t border-slate-800/80 pt-1 pb-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition relative ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-400/20">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-400 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Hero Infobar / Key Figures Snapshot */}
      <section className="bg-white border-b border-slate-200/80 py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="p-2 border-r border-slate-100 last:border-none">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Word Limit</div>
              <div className="text-base sm:text-lg font-bold font-mono text-slate-900 mt-0.5">Up to 4,000</div>
              <div className="text-[11px] text-slate-500">Typically 3,000–4,000 words</div>
            </div>

            <div className="p-2 border-r border-slate-100 last:border-none">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Rubric</div>
              <div className="text-base sm:text-lg font-bold font-mono text-indigo-700 mt-0.5">34 Marks</div>
              <div className="text-[11px] text-slate-500">Criteria A through E</div>
            </div>

            <div className="p-2 border-r border-slate-100 last:border-none">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Core Bonus</div>
              <div className="text-base sm:text-lg font-bold font-mono text-emerald-700 mt-0.5">+3 Points</div>
              <div className="text-[11px] text-slate-500">EE + TOK matrix combination</div>
            </div>

            <div className="p-2 border-r border-slate-100 last:border-none">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Supervision</div>
              <div className="text-base sm:text-lg font-bold font-mono text-amber-700 mt-0.5">3 – 5 Hours</div>
              <div className="text-[11px] text-slate-500">3 formal check-ins + Viva Voce</div>
            </div>

            <div className="p-2 col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Failing Condition</div>
              <div className="text-base sm:text-lg font-bold font-mono text-red-600 mt-0.5">Grade E or NS</div>
              <div className="text-[11px] text-slate-500">IB Diploma not awarded!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab 1: Lecture Player */}
        {activeTab === 'lecture' && (
          <section>
            <LecturePlayer
              currentChapterIndex={currentChapterIndex}
              onSelectChapter={setCurrentChapterIndex}
            />
          </section>
        )}

        {/* Tab 2: DP Matrix Calculator */}
        {activeTab === 'matrix' && (
          <section>
            <DpMatrixCalculator />
          </section>
        )}

        {/* Tab 3: Assessment Criteria Calculator */}
        {activeTab === 'criteria' && (
          <section>
            <AssessmentCriteriaCalculator />
          </section>
        )}

        {/* Tab 4: Time Budget Planner */}
        {activeTab === 'time' && (
          <section>
            <TimeBudgetPlanner />
          </section>
        )}

        {/* Tab 5: Research Question Builder */}
        {activeTab === 'rq' && (
          <section>
            <ResearchQuestionBuilder />
          </section>
        )}

        {/* Tab 6: Supervision Journey */}
        {activeTab === 'supervision' && (
          <section>
            <SupervisionJourney />
          </section>
        )}

        {/* Tab 7: Knowledge Quiz */}
        {activeTab === 'quiz' && (
          <section>
            <KnowledgeQuiz />
          </section>
        )}

        {/* Golden Rules Summary Checklist */}
        <section className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 mt-12 shadow-sm border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                Summary &amp; Golden Directives
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                The 5 Inviolable Rules of the Extended Essay
              </h3>
            </div>
            <span className="text-xs bg-white/10 px-3 py-1.5 rounded-lg text-slate-300 font-mono">
              DP Core Handbook
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4" />
                1. Avoid Grade E at All Costs
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Scoring 0–6 marks results in an Elementary (Grade E). Even with a perfect 42 in subjects, an E in EE or TOK automatically denies the IB diploma.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Target className="w-4 h-4" />
                2. Cause &amp; Effect Formulation
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Do not write descriptive essays. Formulate a sharp cause-and-effect research question with explicit independent and dependent variables.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Clock className="w-4 h-4" />
                3. Science Lab Reality: 70–80h
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                While the IB suggests ~40 hours, experimental science essays (Physics, Chem, Bio) demand 70–80 hours due to apparatus calibrations and repeat trials.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Award className="w-4 h-4" />
                4. Critical Thinking is 35%
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Criterion C alone carries 12 out of 34 marks. Prioritize deep error propagation, limitation evaluation, and nuanced synthesis over narrative summary.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Users className="w-4 h-4" />
                5. Qualified School Supervisor
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your official supervisor must be a qualified teacher at your school. External mentors and parents may be consulted, but cannot replace your teacher.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4" />
                6. Submission Deadline &amp; NS
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Failing to submit on time results in "NS" (Not Submitted). Just like an E, an NS in either EE or TOK means the diploma is permanently withheld.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-800">
              IB Extended Essay Masterclass &amp; Interactive Companion
            </span>{' '}
            • Based on the Diploma Programme introduction by Rasoul Jafarinejad.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-indigo-700 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Narration via gemini-3.8-flash-tts
            </span>
            <span>Coming next: Part 2 — Deep Dive into Subject Modules</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
