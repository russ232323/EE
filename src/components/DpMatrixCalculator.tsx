import React, { useState } from 'react';
import {
  Grid,
  AlertTriangle,
  Award,
  CheckCircle2,
  Info,
  HelpCircle,
  TrendingUp,
  XCircle,
  Sliders,
  Sparkles
} from 'lucide-react';
import { TOK_EE_MATRIX } from '../data/lectureContent';

const GRADES = ['A', 'B', 'C', 'D', 'E'];

interface SubjectScore {
  name: string;
  group: string;
  score: number;
}

export const DpMatrixCalculator: React.FC = () => {
  const [selectedEE, setSelectedEE] = useState<string>('A');
  const [selectedTOK, setSelectedTOK] = useState<string>('B');

  // 6 subject scores (1 to 7)
  const [subjects, setSubjects] = useState<SubjectScore[]>([
    { name: 'Language A: Literature (HL)', group: 'Group 1', score: 7 },
    { name: 'Language B: Spanish (SL)', group: 'Group 2', score: 7 },
    { name: 'Economics (HL)', group: 'Group 3', score: 7 },
    { name: 'Physics (HL)', group: 'Group 4', score: 7 },
    { name: 'Mathematics: AA (SL)', group: 'Group 5', score: 7 },
    { name: 'Chemistry / Elective (SL)', group: 'Group 6', score: 7 },
  ]);

  const matrixEntry = TOK_EE_MATRIX[selectedEE]?.[selectedTOK] || {
    points: 0,
    failing: false,
    label: '0 Points',
  };

  const subjectTotal = subjects.reduce((sum, s) => sum + s.score, 0);
  const coreBonusPoints = matrixEntry.points;
  const grandTotal = subjectTotal + coreBonusPoints;
  const isFailing = matrixEntry.failing;

  const handleSubjectChange = (index: number, val: number) => {
    const updated = [...subjects];
    updated[index].score = val;
    setSubjects(updated);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <Award className="w-3.5 h-3.5" />
            Diploma Programme Core Assessment
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            The Extended Essay + TOK Matrix &amp; Simulator
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Explore how your Extended Essay and Theory of Knowledge grades combine to award up to 3 bonus points toward your 45-point IB Diploma.
          </p>
        </div>

        {/* Total Score Badge */}
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center min-w-[170px] ${
          isFailing
            ? 'bg-red-50 border-red-200 text-red-900'
            : grandTotal >= 40
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : 'bg-indigo-50 border-indigo-200 text-indigo-900'
        }`}>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-80">
            {isFailing ? 'Failing Condition' : 'Predicted Total Score'}
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono mt-0.5">
            {isFailing ? 'NO DIPLOMA' : `${grandTotal} / 45`}
          </div>
          <div className="text-[11px] font-medium mt-1">
            {isFailing
              ? 'Grade E disqualifies diploma'
              : `${subjectTotal} subjects + ${coreBonusPoints} core`}
          </div>
        </div>
      </div>

      {/* Critical Warning Banner if E is selected */}
      {isFailing && (
        <div className="mt-6 bg-red-50 border-2 border-red-300 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 text-red-950 animate-pulse">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm sm:text-base text-red-900">
              Fatal Failing Condition: Grade E in {selectedEE === 'E' && selectedTOK === 'E' ? 'Both EE and TOK' : selectedEE === 'E' ? 'the Extended Essay' : 'Theory of Knowledge'}
            </h4>
            <p className="text-xs sm:text-sm text-red-800 mt-1 leading-relaxed">
              As emphasized by the teacher: <strong>An E in either component is a non-negotiable failing condition.</strong> Even if a candidate earns maximum marks (42/42) across all 6 subjects, an E in the Extended Essay or TOK means the <strong>IB Diploma will NOT be awarded</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Main Grid: 5x5 Matrix on Left, Subject Sliders on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: Interactive 5x5 Table */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Grid className="w-4 h-4 text-indigo-600" />
              Interactive 5×5 Matrix (Click any cell)
            </h3>
            <span className="text-xs text-slate-500">EE (Vertical) × TOK (Horizontal)</span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-slate-50/50 p-2">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-xs font-semibold text-slate-500 bg-slate-100 rounded-tl-lg">
                    EE \ TOK
                  </th>
                  {GRADES.map((tokGrade) => (
                    <th
                      key={tokGrade}
                      className={`p-2 text-xs font-bold ${
                        selectedTOK === tokGrade ? 'bg-indigo-600 text-white' : 'text-slate-700 bg-slate-100'
                      }`}
                    >
                      TOK: {tokGrade}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GRADES.map((eeGrade) => (
                  <tr key={eeGrade}>
                    <td
                      className={`p-2 text-xs font-bold border-t border-slate-200 ${
                        selectedEE === eeGrade ? 'bg-indigo-600 text-white' : 'text-slate-700 bg-slate-100'
                      }`}
                    >
                      EE: {eeGrade}
                    </td>

                    {GRADES.map((tokGrade) => {
                      const entry = TOK_EE_MATRIX[eeGrade][tokGrade];
                      const isSelected = selectedEE === eeGrade && selectedTOK === tokGrade;

                      let cellColor = 'bg-white text-slate-700 hover:bg-slate-100';
                      if (entry.failing) {
                        cellColor = 'bg-red-100/70 text-red-800 hover:bg-red-200/80';
                      } else if (entry.points === 3) {
                        cellColor = 'bg-emerald-100/70 text-emerald-900 font-bold hover:bg-emerald-200';
                      } else if (entry.points === 2) {
                        cellColor = 'bg-sky-100/70 text-sky-900 font-semibold hover:bg-sky-200';
                      } else if (entry.points === 1) {
                        cellColor = 'bg-amber-100/70 text-amber-900 hover:bg-amber-200';
                      } else {
                        cellColor = 'bg-slate-100 text-slate-600 hover:bg-slate-200';
                      }

                      return (
                        <td
                          key={tokGrade}
                          onClick={() => {
                            setSelectedEE(eeGrade);
                            setSelectedTOK(tokGrade);
                          }}
                          className={`p-2.5 text-xs border border-slate-200/80 cursor-pointer transition relative ${cellColor} ${
                            isSelected ? 'ring-3 ring-indigo-600 z-10 font-black shadow-md scale-105' : ''
                          }`}
                        >
                          {entry.failing ? (
                            <span className="font-bold text-red-700 flex items-center justify-center gap-0.5">
                              <XCircle className="w-3 h-3" /> E
                            </span>
                          ) : (
                            <span className="text-sm font-bold">+{entry.points}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Matrix Legend */}
          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-200 border border-emerald-400"></span>
              +3 Points (Max)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-sky-200 border border-sky-400"></span>
              +2 Points
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-200 border border-amber-400"></span>
              +1 Point
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-slate-200 border border-slate-400"></span>
              0 Points (Pass)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-200 border border-red-400"></span>
              Failing Condition (No Diploma)
            </span>
          </div>

          {/* Selected Combination Explanation Card */}
          <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Selected Pair: Extended Essay ({selectedEE}) + TOK ({selectedTOK})
            </div>
            <p className="leading-relaxed">
              {isFailing ? (
                <span className="text-red-700 font-semibold">
                  This combination includes an Elementary (Grade E). The student will NOT be awarded the IB diploma, regardless of marks obtained in their subjects.
                </span>
              ) : matrixEntry.points === 0 ? (
                <span>
                  <strong>0 Bonus Points awarded.</strong> While you earn no extra points from the core, getting {selectedEE} in EE and {selectedTOK} in TOK is <strong>not a failing condition</strong>. You can still earn the IB Diploma if your subject scores reach 24+ points!
                </span>
              ) : (
                <span>
                  This combination awards <strong>+{matrixEntry.points} bonus points</strong> to your total diploma score.
                  {matrixEntry.points === 3 && ' This is the maximum score possible from the core!'}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right Column: 6 Subject Simulator */}
        <div className="lg:col-span-5 bg-slate-50/70 p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              6 Subjects Simulator (Max 42)
            </h3>
            <span className="text-xs font-mono font-bold text-indigo-700">
              {subjectTotal} / 42 pts
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-4">
            Each subject is graded from 1 to 7. Adjust sliders to test your overall diploma threshold:
          </p>

          <div className="space-y-3.5">
            {subjects.map((sub, idx) => (
              <div key={sub.name} className="bg-white p-3 rounded-lg border border-slate-200/90 shadow-2xs">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-800 truncate pr-2">
                    {sub.name}
                  </span>
                  <span className="font-bold font-mono text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded">
                    Grade {sub.score}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">1</span>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={sub.score}
                    onChange={(e) => handleSubjectChange(idx, Number(e.target.value))}
                    className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="text-[10px] text-slate-400 font-mono">7</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200">
            <span className="text-[11px] text-slate-500 font-semibold">Presets:</span>
            <button
              onClick={() => setSubjects(subjects.map((s) => ({ ...s, score: 7 })))}
              className="text-xs px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition"
            >
              All 7s (42)
            </button>
            <button
              onClick={() => setSubjects(subjects.map((s) => ({ ...s, score: 6 })))}
              className="text-xs px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition"
            >
              All 6s (36)
            </button>
            <button
              onClick={() => setSubjects(subjects.map((s) => ({ ...s, score: 5 })))}
              className="text-xs px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition"
            >
              All 5s (30)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
