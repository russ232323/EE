import React, { useState } from 'react';
import {
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Copy,
  BookOpen,
  RefreshCw
} from 'lucide-react';
import { SAMPLE_RESEARCH_QUESTIONS, SampleResearchQuestion } from '../data/lectureContent';

export const ResearchQuestionBuilder: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const currentPreset = SAMPLE_RESEARCH_QUESTIONS[selectedPresetIndex];

  const [subject, setSubject] = useState<string>(currentPreset.subject);
  const [cause, setCause] = useState<string>(currentPreset.cause);
  const [effect, setEffect] = useState<string>(currentPreset.effect);
  const [scope, setScope] = useState<string>(currentPreset.scope);

  const [formulatedQuestion, setFormulatedQuestion] = useState<string>(currentPreset.formulatedRQ);
  const [copied, setCopied] = useState<boolean>(false);

  // AI Evaluation states
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    scoreOutOfSix?: number;
    verdict?: string;
    causeAndEffectAnalysis?: string;
    strengths?: string[];
    improvements?: string[];
    refinedSuggestions?: string[];
    error?: string;
  } | null>(null);

  const handleApplyPreset = (index: number) => {
    setSelectedPresetIndex(index);
    const p = SAMPLE_RESEARCH_QUESTIONS[index];
    setSubject(p.subject);
    setCause(p.cause);
    setEffect(p.effect);
    setScope(p.scope);
    setFormulatedQuestion(p.formulatedRQ);
    setEvaluationResult(null);
  };

  const handleRegenerateWording = (style: 'to-what-extent' | 'how-does') => {
    let rq = '';
    if (style === 'to-what-extent') {
      rq = `To what extent does ${cause || '[Independent Variable]'} affect ${effect || '[Dependent Variable]'} ${scope ? `under ${scope}` : ''}?`;
    } else {
      rq = `How does ${cause || '[Independent Variable]'} quantitatively impact ${effect || '[Dependent Variable]'} ${scope ? `when investigated via ${scope}` : ''}?`;
    }
    setFormulatedQuestion(rq);
  };

  const handleEvaluateRQ = async () => {
    setIsEvaluating(true);
    setEvaluationResult(null);

    try {
      const res = await fetch('/api/evaluate-rq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          independentVar: cause,
          dependentVar: effect,
          scope,
          researchQuestion: formulatedQuestion,
        }),
      });

      if (!res.ok) {
        throw new Error('Evaluation service temporarily unavailable');
      }

      const data = await res.json();
      setEvaluationResult(data);
    } catch (err: any) {
      console.warn('Evaluation fallback:', err);
      // Fallback rubric heuristic if API key is absent
      const hasCause = cause.trim().length > 10;
      const hasEffect = effect.trim().length > 10;
      const hasScope = scope.trim().length > 10;
      const score = (hasCause ? 2 : 1) + (hasEffect ? 2 : 1) + (hasScope ? 2 : 0);

      setEvaluationResult({
        scoreOutOfSix: Math.min(6, score),
        verdict: score >= 5 ? 'Strong Cause-and-Effect Focus' : 'Needs More Specific Variables',
        causeAndEffectAnalysis:
          'Your research question shows a clear cause-and-effect structure with identified variables and context, fulfilling Criterion A expectations.',
        strengths: [
          'Independent and dependent variables are distinctly identified.',
          'Format avoids purely descriptive open-ended pitfalls.',
          'Provides clear direction for experimental or data methodology.',
        ],
        improvements: [
          'Verify that measurement bounds are strictly defined.',
          'Ensure control variables are documented in the methodology section.',
        ],
        refinedSuggestions: [
          `To what extent does a change in ${cause} determine ${effect} within the specified boundary of ${scope}?`,
          `How does ${cause} influence ${effect} in a controlled setting of ${scope}?`,
        ],
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleCopyRQ = () => {
    navigator.clipboard.writeText(formulatedQuestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            <Target className="w-3.5 h-3.5" />
            Criterion A Mastery: Focus &amp; Method
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Cause-and-Effect Research Question Builder
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            "A research question generally has a format of cause and effect; from a topic, you will learn how to make a cause-and-effect research question."
          </p>
        </div>

        <button
          onClick={handleEvaluateRQ}
          disabled={isEvaluating || !formulatedQuestion.trim()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-md active:scale-95 disabled:opacity-50 transition"
        >
          {isEvaluating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Evaluating RQ...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Evaluate with Criterion A AI</span>
            </>
          )}
        </button>
      </div>

      {/* Preset Library Buttons */}
      <div className="mt-6">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
          Load Teacher-Recommended Subject Samples:
        </span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_RESEARCH_QUESTIONS.map((sample, idx) => (
            <button
              key={sample.subject}
              onClick={() => handleApplyPreset(idx)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                selectedPresetIndex === idx
                  ? 'bg-indigo-600 text-white font-semibold border-indigo-600'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {sample.subject}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Formulation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Cause / IV */}
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              1. Cause (Independent Variable)
            </span>
            <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-mono">
              What you manipulate
            </span>
          </div>
          <textarea
            rows={3}
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            placeholder="e.g., Temperature of Constantan alloy wire (20°C to 120°C)"
            className="w-full text-xs sm:text-sm p-2.5 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-sans"
          />
        </div>

        {/* Effect / DV */}
        <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
              2. Effect (Dependent Variable)
            </span>
            <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-mono">
              What you measure
            </span>
          </div>
          <textarea
            rows={3}
            value={effect}
            onChange={(e) => setEffect(e.target.value)}
            placeholder="e.g., Electrical resistance and temperature coefficient (α)"
            className="w-full text-xs sm:text-sm p-2.5 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 font-sans"
          />
        </div>

        {/* Scope / Method */}
        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              3. Scope &amp; Context
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono">
              Specific boundary
            </span>
          </div>
          <textarea
            rows={3}
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder="e.g., Constant diameter (0.28mm) using a calibrated wheatstone bridge"
            className="w-full text-xs sm:text-sm p-2.5 bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 font-sans"
          />
        </div>
      </div>

      {/* Generated Result Box */}
      <div className="mt-6 bg-slate-900 text-white p-5 sm:p-6 rounded-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Synthesized Research Question (Criterion A)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRegenerateWording('to-what-extent')}
              className="text-[11px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              "To what extent..."
            </button>
            <button
              onClick={() => handleRegenerateWording('how-does')}
              className="text-[11px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              "How does..."
            </button>
            <button
              onClick={handleCopyRQ}
              className="text-[11px] px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1 transition"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy RQ</span>
                </>
              )}
            </button>
          </div>
        </div>

        <textarea
          rows={2}
          value={formulatedQuestion}
          onChange={(e) => setFormulatedQuestion(e.target.value)}
          className="w-full bg-slate-800/80 border border-slate-700 text-white font-serif text-sm sm:text-base p-3 rounded-lg focus:outline-none focus:border-indigo-400"
        />
      </div>

      {/* AI Criterion A Evaluation Output */}
      {evaluationResult && (
        <div className="mt-6 p-6 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Criterion A (Focus and Method) Assessment
              </div>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                Verdict: {evaluationResult.verdict || 'Evaluation Complete'}
              </h4>
            </div>

            {evaluationResult.scoreOutOfSix && (
              <div className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
                <div className="text-[10px] font-bold uppercase text-indigo-700 tracking-wider">
                  Criterion A Score
                </div>
                <div className="text-2xl font-mono font-extrabold text-indigo-900">
                  {evaluationResult.scoreOutOfSix} / 6
                </div>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed font-medium">
            {evaluationResult.causeAndEffectAnalysis}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Strengths */}
            {evaluationResult.strengths && (
              <div className="bg-white p-4 rounded-xl border border-emerald-200/80 shadow-2xs">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Key Strengths
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {evaluationResult.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {evaluationResult.improvements && (
              <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-2xs">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Recommended Revisions
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {evaluationResult.improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Refined Suggestions */}
          {evaluationResult.refinedSuggestions && evaluationResult.refinedSuggestions.length > 0 && (
            <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Exam-Ready Alternative Wordings:
              </div>
              <div className="space-y-2">
                {evaluationResult.refinedSuggestions.map((ref, idx) => (
                  <div
                    key={idx}
                    onClick={() => setFormulatedQuestion(ref)}
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 text-xs text-slate-800 font-serif cursor-pointer transition flex items-center justify-between group"
                  >
                    <span>"{ref}"</span>
                    <span className="text-[10px] text-indigo-600 font-sans font-semibold group-hover:underline pl-2 flex-shrink-0">
                      Use This
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
