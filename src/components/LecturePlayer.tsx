import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Sparkles,
  Award,
  ChevronRight,
  ChevronLeft,
  FastForward,
  BookOpen,
  Mic,
  AlertCircle,
  CheckCircle2,
  Share2,
  Copy
} from 'lucide-react';
import { LECTURE_CHAPTERS, LectureChapter } from '../data/lectureContent';
import { requestGeminiTTS, playWithWebSpeech } from '../utils/audioPlayer';

interface LecturePlayerProps {
  currentChapterIndex: number;
  onSelectChapter: (index: number) => void;
}

export const LecturePlayer: React.FC<LecturePlayerProps> = ({
  currentChapterIndex,
  onSelectChapter,
}) => {
  const currentChapter = LECTURE_CHAPTERS[currentChapterIndex] || LECTURE_CHAPTERS[0];

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [voiceName, setVoiceName] = useState<string>('Puck'); // Puck, Kore, Fenrir, Zephyr
  const [audioSource, setAudioSource] = useState<'gemini' | 'browser' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [customText, setCustomText] = useState<string>('');
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const webSpeechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Audio element
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      // Auto-advance to next chapter if available
      if (currentChapterIndex < LECTURE_CHAPTERS.length - 1) {
        onSelectChapter(currentChapterIndex + 1);
      }
    };
    const onError = () => {
      setIsPlaying(false);
      setIsLoadingAudio(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Update playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // When chapter changes, stop current audio and reset time
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setErrorMessage(null);
  }, [currentChapterIndex]);

  const handlePlayChapterAudio = async (textToSpeak?: string) => {
    const text = textToSpeak || currentChapter.transcript;
    setErrorMessage(null);

    // If currently playing, toggle pause
    if (isPlaying) {
      if (audioRef.current && audioSource === 'gemini') {
        audioRef.current.pause();
      } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
      setIsPlaying(false);
      return;
    }

    // If paused and has audio src loaded already
    if (audioRef.current && audioRef.current.src && audioSource === 'gemini' && audioRef.current.currentTime > 0) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    setIsLoadingAudio(true);

    try {
      // 1. Try Gemini 3.8 Flash TTS endpoint
      const result = await requestGeminiTTS(
        text,
        voiceName,
        'Clear, articulate, pedagogical IB physics and Extended Essay educator lecturing with inspiring clarity and academic warmth.'
      );

      if (audioRef.current && result.audioUrl) {
        audioRef.current.src = result.audioUrl;
        audioRef.current.playbackRate = playbackRate;
        await audioRef.current.play();
        setAudioSource('gemini');
        setIsPlaying(true);
        setIsLoadingAudio(false);
        return;
      }
    } catch (err: any) {
      console.warn('Gemini 3.8 Flash TTS fallback to Web Speech:', err);
      // Fallback gracefully to Web Speech API
      setAudioSource('browser');
      setErrorMessage('Generating lecture narration using browser speech engine (or Gemini API key when available).');

      const utterance = playWithWebSpeech(text, {
        rate: playbackRate,
        onEnd: () => {
          setIsPlaying(false);
          if (currentChapterIndex < LECTURE_CHAPTERS.length - 1) {
            onSelectChapter(currentChapterIndex + 1);
          }
        },
        onError: () => {
          setIsPlaying(false);
        },
      });

      if (utterance) {
        webSpeechUtteranceRef.current = utterance;
        setIsPlaying(true);
      }
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current && audioSource === 'gemini') {
      audioRef.current.currentTime = targetTime;
    }
  };

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(currentChapter.transcript);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-8">
      {/* Top Banner / Teacher intro */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              Gemini 3.8 Flash TTS Narration
            </span>
            <span className="text-xs text-slate-300 font-medium bg-white/10 px-2.5 py-1 rounded-md">
              Part 1: Comprehensive Introduction
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Rasoul Jafarinejad • IB Physics Educator
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs uppercase tracking-wider text-indigo-300 font-bold">
            Chapter {currentChapter.number} of {LECTURE_CHAPTERS.length} • {currentChapter.category}
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            {currentChapter.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
            {currentChapter.subtitle}
          </p>
        </div>

        {/* Audio Player Bar */}
        <div className="mt-6 bg-slate-900/80 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Control buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <button
                onClick={() => onSelectChapter(Math.max(0, currentChapterIndex - 1))}
                disabled={currentChapterIndex === 0}
                className="p-2 text-slate-300 hover:text-white disabled:opacity-30 transition rounded-lg hover:bg-white/5"
                title="Previous Chapter"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => handlePlayChapterAudio()}
                disabled={isLoadingAudio}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-95 transition"
              >
                {isLoadingAudio ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    <span>Synthesizing...</span>
                  </>
                ) : isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause Audio</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                    <span>Listen to Lecture</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onSelectChapter(Math.min(LECTURE_CHAPTERS.length - 1, currentChapterIndex + 1))}
                disabled={currentChapterIndex === LECTURE_CHAPTERS.length - 1}
                className="p-2 text-slate-300 hover:text-white disabled:opacity-30 transition rounded-lg hover:bg-white/5"
                title="Next Chapter"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Sound wave visualizer when playing */}
              {isPlaying && (
                <div className="hidden md:flex items-center gap-1 ml-2">
                  <span className="w-1 h-3 bg-amber-400 rounded-full animate-bounce"></span>
                  <span className="w-1 h-5 bg-amber-300 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  <span className="w-1 h-4 bg-amber-300 rounded-full animate-bounce [animation-delay:0.45s]"></span>
                </div>
              )}
            </div>

            {/* Time / Progress slider */}
            <div className="flex items-center gap-3 w-full sm:flex-1 max-w-md">
              <span className="text-xs font-mono text-slate-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="text-xs font-mono text-slate-400 w-10">
                {duration ? formatTime(duration) : currentChapter.durationEst}
              </span>
            </div>

            {/* Voice & Speed controls */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {/* Voice selector */}
              <select
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
                className="text-xs bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
                title="Gemini Voice Model"
              >
                <option value="Puck">Voice: Puck (Educator)</option>
                <option value="Kore">Voice: Kore (Academic)</option>
                <option value="Fenrir">Voice: Fenrir (Examiner)</option>
                <option value="Zephyr">Voice: Zephyr (Coach)</option>
              </select>

              {/* Playback speed */}
              <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 text-xs text-slate-300">
                {[1.0, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackRate(speed)}
                    className={`px-2 py-1 rounded ${
                      playbackRate === speed ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowCustomModal(true)}
                className="p-1.5 text-slate-300 hover:text-amber-400 rounded-lg hover:bg-slate-800 transition"
                title="Custom TTS Reader"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="mt-3 text-xs text-amber-300/90 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>

      {/* Chapter Overview & Highlights */}
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content & Spoken Transcript */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Executive Chapter Summary
              </h3>
              <p className="text-slate-800 text-base leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                {currentChapter.summary}
              </p>
            </div>

            {/* Key takeaway badges */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Key Insights & Requirements
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentChapter.keyPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/90 text-xs text-slate-700 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transcript with audio sync */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  Spoken Lecture Transcript
                </h4>
                <button
                  onClick={handleCopyTranscript}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition px-2 py-1 rounded hover:bg-slate-100"
                >
                  {copiedQuote ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-50/70 rounded-xl p-5 border border-slate-200 font-serif text-sm sm:text-base leading-relaxed text-slate-800 space-y-4 max-h-96 overflow-y-auto">
                {currentChapter.transcript.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="hover:bg-amber-50/50 p-1.5 rounded transition">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Teacher's Insider Tip */}
            {currentChapter.teacherTip && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200/80 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-800">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Teacher's Practical Advice
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 mt-0.5 leading-relaxed font-medium">
                    "{currentChapter.teacherTip}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Chapter Navigation List */}
          <div className="lg:col-span-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Lecture Index (10 Chapters)</span>
                <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-mono">
                  Part 1
                </span>
              </div>

              <div className="space-y-1.5">
                {LECTURE_CHAPTERS.map((ch, idx) => {
                  const isCurrent = idx === currentChapterIndex;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => onSelectChapter(idx)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs transition flex items-center justify-between group ${
                        isCurrent
                          ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                          : 'hover:bg-white text-slate-700 border border-transparent hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono flex-shrink-0 ${
                            isCurrent ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {ch.number}
                        </span>
                        <span className="truncate">{ch.title}</span>
                      </div>
                      <span
                        className={`text-[11px] font-mono flex-shrink-0 ${
                          isCurrent ? 'text-indigo-200' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      >
                        {ch.durationEst}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Custom TTS text reader */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-lg">Custom Speech Reader</h3>
              </div>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Enter any text, research question draft, or syllabus excerpt to hear it spoken with{' '}
              <strong className="text-indigo-600">gemini-3.8-flash-tts</strong>.
            </p>
            <textarea
              rows={4}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g., An excellent Extended Essay formulated in cause and effect culminates in up to 4,000 words..."
              className="w-full text-sm p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-serif"
            />
            <div className="flex items-center justify-between mt-4">
              <div className="text-xs text-slate-500">
                Voice: <strong>{voiceName}</strong>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCustomModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (customText.trim()) {
                      handlePlayChapterAudio(customText.trim());
                      setShowCustomModal(false);
                    }
                  }}
                  disabled={!customText.trim()}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition"
                >
                  Speak with Gemini TTS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
