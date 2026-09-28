export interface TTSAudioResponse {
  audioBase64?: string;
  mimeType?: string;
  cached?: boolean;
  error?: string;
}

export async function requestGeminiTTS(
  text: string,
  voiceName: string = 'Puck',
  speakerStyle?: string
): Promise<{ audioUrl: string; source: 'gemini' | 'browser' }> {
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        voiceName,
        speakerStyle: speakerStyle || 'Clear, scholarly IB physics teacher lecturing with engaging pedagogical authority',
      }),
    });

    if (res.ok) {
      const data: TTSAudioResponse = await res.json();
      if (data.audioBase64) {
        const mime = data.mimeType || 'audio/wav';
        const audioUrl = `data:${mime};base64,${data.audioBase64}`;
        return { audioUrl, source: 'gemini' };
      }
    }

    const errData = await res.json().catch(() => ({}));
    console.warn('Gemini TTS endpoint response:', errData);
    throw new Error(errData.error || 'Gemini TTS request was not fulfilled');
  } catch (err) {
    console.warn('Falling back to browser audio/speech synthesis:', err);
    throw err;
  }
}

export function playWithWebSpeech(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
    onError?: (e: any) => void;
    onBoundary?: (charIndex: number) => void;
  }
): SpeechSynthesisUtterance | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options?.rate || 1.0;
  utterance.pitch = options?.pitch || 1.0;
  utterance.lang = 'en-US';

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(
    v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
  ) || voices.find(v => v.lang.startsWith('en'));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  if (options?.onEnd) utterance.onend = options.onEnd;
  if (options?.onError) utterance.onerror = options.onError;
  if (options?.onBoundary) {
    utterance.onboundary = (e) => {
      options.onBoundary?.(e.charIndex);
    };
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
}
