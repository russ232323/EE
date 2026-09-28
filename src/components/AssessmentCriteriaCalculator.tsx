import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Target,
  BookOpen,
  Brain,
  Layout,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { ASSESSMENT_CRITERIA, CriterionInfo } from '../data/lectureContent';

export const AssessmentCriteriaCalculator: React.FC = () => {
  const [scores, setScores] = useState<{ [key: string]: number }>({
    A: 5,
    B: 5,
    C: 10,
    D: 4,
    E: 5,
  });

  const [activeCriterionTab, setActiveCriterionTab] = useState<string>('C');

  const totalScore = (scores.A || 0) + (scores.B || 0) + (scores.C || 0) + (scores.D || 0) + (scores.E || 0);

  const getGradeInfo = (score: number) => {
    if (score >= 27) {
      return {
        grade: 'A',
        title: 'Excellent',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
        range: '27–34 marks',
        failing: false,
        nextBoundary: null,
      };
    } else if (score >= 21) {
      return {
        grade: 'B',
        title: 'Good',
        color: 'text-blue-700 bg-blue-50 border-blue-300',
        range: '21–26 marks',
        failing: false,
        nextBoundary: { grade: 'A', pointsNeeded: 27 - score },
      };
    } else if (score >= 14) {
      return {
        grade: 'C',
        title: 'Satisfactory',
        color: 'text-amber-700 bg-amber-50 border-amber-300',
        range: '14–20 marks',
        failing: false,
        nextBoundary: { grade: 'B', pointsNeeded: 21 - score },
      };
    } else if (score >= 7) {
      return {
        grade: 'D',
        title: 'Mediocre',
        color: 'text-orange-700 bg-orange-50 border-orange-300',
        range: '7–13 marks',
        failing: false,
        nextBoundary: { grade: 'C', pointsNeeded: 14 - score },
      };
    } else {
      return {
        grade: 'E',
        title: 'Elementary (FAILING CONDITION)',
        color: 'text-red-700 bg-red-50 border-red-300',
        range: '0–6 marks',
        failing: true,
        nextBoundary: { grade: 'D (Pass)', pointsNeeded: 7 - score },
      };
    }
  };

  const gradeInfo = getGradeInfo(totalScore);

  const getCriterionIcon = (code: string) => {
    switch (code) {
      case 'A':
        return <Target className="w-4 h-4 text-blue-600" />;
      case 'B':
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'C':
        return <Brain className="w-4 h-4 text-purple-600" />;
      case 'D':
        return <Layout className="w-4 h-4 text-amber-600" />;
      case 'E':
        return <MessageSquare className="w-4 h-4 text-pink-600" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const currentTabCriterion = ASSESSMENT_CRITERIA.find((c) => c.code === activeCriterionTab) || ASSESSMENT_CRITERIA[2];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 mb-2">
            <Brain className="w-3.5 h-3.5" />
            External Assessment (34 Marks Total)
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Assessment Criteria &amp; Score Simulator
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            All Extended Essays are marked externally on an absolute 34-point scale across 5 criteria.
          </p>
        </div>

        {/* Score & Grade Display */}
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center min-w-[170px] ${gradeInfo.color}`}>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-80">
            Total Score / Grade
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono mt-0.5">
            {totalScore} <span className="text-xl font-normal opacity-70">/ 34</span>
          </div>
          <div className="text-xs font-bold uppercase tracking-wider mt-1 px-2.5 py-0.5 rounded-full bg-white/60">
            Grade {gradeInfo.grade} • {gradeInfo.title}
          </div>
        </div>
      </div>

      {/* Visual Number Line / Grade Boundaries */}
      <div className="mt-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          <span>Official IB Grade Boundaries (0 – 34 Marks)</span>
          {gradeInfo.nextBoundary && (
            <span className="text-indigo-600 font-medium">
              +{gradeInfo.nextBoundary.pointsNeeded} marks needed for Grade {gradeInfo.nextBoundary.grade}
            </span>
          )}
        </div>

        {/* Multi-segment Bar */}
        <div className="relative w-full h-8 bg-slate-200 rounded-lg overflow-hidden flex font-mono text-[11px] font-bold text-center">
          <div
            style={{ width: `${(7 / 34) * 100}%` }}
            className="bg-red-400/90 text-white flex items-center justify-center border-r border-white/40"
            title="0–6: Grade E (Failing)"
          >
            E (0-6)
          </div>
          <div
            style={{ width: `${(7 / 34) * 100}%` }}
            className="bg-orange-400 text-white flex items-center justify-center border-r border-white/40"
            title="7–13: Grade D"
          >
            D (7-13)
          </div>
          <div
            style={{ width: `${(7 / 34) * 100}%` }}
            className="bg-amber-400 text-slate-900 flex items-center justify-center border-r border-white/40"
            title="14–20: Grade C"
          >
            C (14-20)
          </div>
          <div
            style={{ width: `${(6 / 34) * 100}%` }}
            className="bg-blue-400 text-white flex items-center justify-center border-r border-white/40"
            title="21–26: Grade B"
          >
            B (21-26)
          </div>
          <div
            style={{ width: `${(8 / 34) * 100}%` }}
            className="bg-emerald-500 text-white flex items-center justify-center"
            title="27–34: Grade A (Excellent)"
          >
            A (27-34)
          </div>

          {/* Current Score Pin */}
          <div
            style={{ left: `${Math.min(98, Math.max(2, (totalScore / 34) * 100))}%` }}
            className="absolute top-0 bottom-0 w-1.5 bg-slate-950 shadow-md transform -translate-x-1/2 z-10"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] font-mono px-1.5 py-0.5 rounded shadow">
              {totalScore}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1 px-1">
          <span>0 (Min)</span>
          <span>7 (Pass threshold)</span>
          <span>14 (C)</span>
          <span>21 (B)</span>
          <span>27 (A boundary)</span>
          <span>34 (Max)</span>
        </div>
      </div>

      {/* Main Grid: Interactive Sliders vs Criterion Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: 5 Criterion Sliders */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Adjust Marks for Each Criterion
          </div>

          {ASSESSMENT_CRITERIA.map((criterion) => {
            const currentVal = scores[criterion.code] || 0;
            const isCriticalThinking = criterion.code === 'C';

            return (
              <div
                key={criterion.code}
                onClick={() => setActiveCriterionTab(criterion.code)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  activeCriterionTab === criterion.code
                    ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                } ${isCriticalThinking ? 'relative overflow-hidden' : ''}`}
              >
                {isCriticalThinking && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-bl">
                    Highest Mark Weight (35.3%)
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getCriterionIcon(criterion.code)}
                    <span className="font-bold text-sm text-slate-900">
                      Criterion {criterion.code}: {criterion.name}
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {currentVal} / {criterion.maxMarks}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">0</span>
                  <input
                    type="range"
                    min="0"
                    max={criterion.maxMarks}
                    value={currentVal}
                    onChange={(e) =>
                      setScores({
                        ...scores,
                        [criterion.code]: Number(e.target.value),
                      })
                    }
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="text-xs font-mono text-slate-400">{criterion.maxMarks}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Inspector for Active Criterion */}
        <div className="lg:col-span-6 bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                {getCriterionIcon(currentTabCriterion.code)}
                <h3 className="font-bold text-slate-900 text-base">
                  Criterion {currentTabCriterion.code}: {currentTabCriterion.name}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                Max {currentTabCriterion.maxMarks} marks ({currentTabCriterion.weightPercent})
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-4">
              {currentTabCriterion.summary}
            </p>

            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                What External Examiners Specifically Check:
              </div>
              {currentTabCriterion.keyRequirements?.map((req, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Examiner Tip */}
          <div className="mt-6 pt-4 border-t border-slate-200/80 bg-white p-3.5 rounded-lg border border-slate-200/60 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-snug">
              <strong className="text-slate-900">Examiner Advice:</strong> {currentTabCriterion.examinerAdvice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
