/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API Sound Synthesizer
class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazy init audio context on user interaction
    const saved = localStorage.getItem('animal_math_sound_muted');
    this.isMuted = saved === 'true';
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('animal_math_sound_muted', String(this.isMuted));
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public playClick(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // ignore audio failure
    }
  }

  public playCorrect(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // High cheerful chord: C5, E5, G5, C6
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.15, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.28);
      });
    } catch {
      // ignore
    }
  }

  public playIncorrect(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.2);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // ignore
    }
  }

  public playStageClear(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Fanfare notes: C5, E5, G5, G5, C6
      const melody = [
        { freq: 523.25, duration: 0.12, time: 0 },
        { freq: 659.25, duration: 0.12, time: 0.12 },
        { freq: 783.99, duration: 0.12, time: 0.24 },
        { freq: 783.99, duration: 0.15, time: 0.38 },
        { freq: 1046.5, duration: 0.45, time: 0.55 },
      ];

      melody.forEach(item => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.freq, now + item.time);

        gain.gain.setValueAtTime(0.2, now + item.time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.time + item.duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + item.time);
        osc.stop(now + item.time + item.duration + 0.05);
      });
    } catch {
      // ignore
    }
  }

  public playVictory(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const melody = [
        { freq: 523.25, time: 0, duration: 0.15 },
        { freq: 523.25, time: 0.15, duration: 0.15 },
        { freq: 523.25, time: 0.3, duration: 0.15 },
        { freq: 659.25, time: 0.45, duration: 0.3 },
        { freq: 587.33, time: 0.75, duration: 0.15 },
        { freq: 659.25, time: 0.9, duration: 0.15 },
        { freq: 783.99, time: 1.05, duration: 0.3 },
        { freq: 1046.5, time: 1.35, duration: 0.6 },
      ];

      melody.forEach(item => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.freq, now + item.time);

        gain.gain.setValueAtTime(0.2, now + item.time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.time + item.duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + item.time);
        osc.stop(now + item.time + item.duration + 0.05);
      });
    } catch {
      // ignore
    }
  }
}

export const sounds = new SoundController();
