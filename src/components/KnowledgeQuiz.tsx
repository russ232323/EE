import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/lectureContent';

export const KnowledgeQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const q: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === q.correctIndex) {
      setUserScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Check Your Understanding
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Lecture Comprehension Quiz
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Test your knowledge on IB Diploma rules, the 34-mark rubric, supervisor protocols, and grade boundaries.
          </p>
        </div>

        {/* Progress Badge */}
        {!quizCompleted && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-500 font-medium">Question</div>
              <div className="text-lg font-mono font-bold text-slate-900">
                {currentIdx + 1} / {QUIZ_QUESTIONS.length}
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 flex items-center justify-center font-bold text-xs text-indigo-700">
              {Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100)}%
            </div>
          </div>
        )}
      </div>

      {!quizCompleted ? (
        <div className="mt-6 max-w-3xl">
          {/* Question text */}
          <div className="text-lg font-serif font-bold text-slate-900 mb-6 leading-snug">
            {q.question}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === q.correctIndex;

              let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-2 ring-emerald-500/20';
                } else if (isSelected) {
                  btnStyle = 'border-red-400 bg-red-50 text-red-950';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition flex items-center justify-between ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-mono font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Lecture Reference &amp; Explanation
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {q.explanation}
              </p>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow transition flex items-center gap-1.5"
                >
                  <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="mt-8 text-center max-w-md mx-auto py-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center mx-auto shadow-xl mb-4">
            <Award className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-serif font-bold text-slate-900">
            Quiz Completed!
          </h3>

          <p className="text-slate-600 text-sm mt-1">
            You scored <strong className="text-indigo-600 text-lg font-mono">{userScore}</strong> out of{' '}
            <strong className="font-mono text-lg">{QUIZ_QUESTIONS.length}</strong> on the Extended Essay foundations.
          </p>

          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
            {userScore === QUIZ_QUESTIONS.length ? (
              <span className="text-emerald-700 font-semibold">
                Perfect score! You have completely mastered the organizational framework, grade boundaries, and assessment criteria of the IB Extended Essay.
              </span>
            ) : userScore >= 5 ? (
              <span className="text-blue-700 font-medium">
                Great job! You have a solid grasp of the core concepts, 34-mark scale, and EE + TOK bonus points matrix.
              </span>
            ) : (
              <span className="text-amber-700">
                Review the chapters in the audio lecture player above, especially the sections on Grade E failing conditions and 70-80h lab commitments.
              </span>
            )}
          </div>

          <button
            onClick={handleRestart}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
};
