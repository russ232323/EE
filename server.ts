import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory audio cache to avoid redundant generations
const audioCache = new Map<string, { audioBase64: string; mimeType: string }>();

function pcmToWavBuffer(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  // If already RIFF WAV, return as-is
  if (pcmBuffer.length >= 4 && pcmBuffer.toString('ascii', 0, 4) === 'RIFF') {
    return pcmBuffer;
  }

  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);

  // RIFF chunk descriptor
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);

  // fmt sub-chunk
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  header.writeUInt16LE(1, 20); // AudioFormat (1 = Linear PCM)
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);

  // data sub-chunk
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: !!process.env.GEMINI_API_KEY,
      cachedAudioCount: audioCache.size,
    });
  });

  // POST /api/tts: Convert text to speech using gemini-3.8-flash-tts
  app.post('/api/tts', async (req, res) => {
    try {
      const { text, voiceName = 'Puck', speakerStyle } = req.body;

      if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ error: 'Text prompt is required.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured on the server. Please check environment settings.',
        });
      }

      // Check cache key
      const cacheKey = crypto.createHash('sha256').update(`${voiceName}:${text.trim()}`).digest('hex');
      const cached = audioCache.get(cacheKey);
      if (cached) {
        return res.json({
          audioBase64: cached.audioBase64,
          mimeType: cached.mimeType,
          cached: true,
        });
      }

      // Sanitize and limit text length for TTS safety
      const cleanText = text.trim().slice(0, 1500);

      // Explicitly invoke gemini-3.8-flash-tts per user requirement
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: cleanText,
                speechMetadata: {
                  speaker: 'Lecturer',
                  style: speakerStyle || 'Clear, warm, highly articulate educator explaining the IB Extended Essay with confidence and pedagogical clarity.',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      const rawBase64 = part?.inlineData?.data;
      const returnedMime = part?.inlineData?.mimeType || 'audio/pcm;rate=24000';

      if (!rawBase64) {
        return res.status(502).json({ error: 'No audio returned from Gemini TTS model.' });
      }

      // Ensure browser-playable WAV format
      const rawBuffer = Buffer.from(rawBase64, 'base64');
      const wavBuffer = pcmToWavBuffer(rawBuffer, 24000, 1, 16);
      const wavBase64 = wavBuffer.toString('base64');

      // Cache result
      audioCache.set(cacheKey, {
        audioBase64: wavBase64,
        mimeType: 'audio/wav',
      });

      return res.json({
        audioBase64: wavBase64,
        mimeType: 'audio/wav',
        cached: false,
      });
    } catch (err: any) {
      console.error('Error generating TTS:', err);
      return res.status(500).json({
        error: err.message || 'Failed to generate speech with gemini-3.8-flash-tts',
      });
    }
  });

  // POST /api/evaluate-rq: Evaluate a student's Research Question with gemini-3.8-flash
  app.post('/api/evaluate-rq', async (req, res) => {
    try {
      const { researchQuestion, subject, independentVar, dependentVar, scope } = req.body;

      if (!researchQuestion || typeof researchQuestion !== 'string') {
        return res.status(400).json({ error: 'Research question is required.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured on the server.',
        });
      }

      const prompt = `
You are an expert IB Diploma Programme Extended Essay (EE) Chief Examiner and educator.
Evaluate the following student's proposed Research Question against Criterion A (Focus and Method) and general IB expectations:

Subject: ${subject || 'Not specified'}
Independent Variable (Cause): ${independentVar || 'Not specified'}
Dependent Variable (Effect): ${dependentVar || 'Not specified'}
Scope/Context: ${scope || 'Not specified'}
Formulated Research Question: "${researchQuestion}"

Provide constructive feedback formatted in JSON:
{
  "scoreOutOfSix": number (1 to 6 marks for Criterion A focus),
  "verdict": string ("Excellent", "Strong with Minor Tweaks", "Needs Revision", or "Too Broad/Vague"),
  "causeAndEffectAnalysis": string (how clearly cause and effect are articulated),
  "strengths": [string],
  "improvements": [string],
  "refinedSuggestions": [string] (2-3 improved, exam-ready versions of the question)
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.error('Error evaluating RQ:', err);
      return res.status(500).json({
        error: err.message || 'Failed to evaluate research question',
      });
    }
  });

  // Server static in production, or mount Vite middleware in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IB Extended Essay Masterclass Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
