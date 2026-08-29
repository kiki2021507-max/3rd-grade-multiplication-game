/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Volume2, VolumeX, PenTool, Sparkles, RefreshCw, Clock, Target, Flame } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface HeaderProps {
  onOpenScratchpad: () => void;
  onNewRandomProblem: () => void;
  elapsedSeconds: number;
  score: number; // 12 - wrongAttempts (e.g. 12, 11, 7...)
  wrongCount: number;
  streakCount: number;
}

function formatKoreanTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}초`;
  if (secs === 0) return `${mins}분`;
  return `${mins}분 ${secs}초`;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenScratchpad,
  onNewRandomProblem,
  elapsedSeconds,
  score,
  wrongCount,
  streakCount,
}) => {
  const [isMuted, setIsMuted] = useState(sounds.getIsMuted());

  const handleToggleMute = () => {
    const nextMute = sounds.toggleMute();
    setIsMuted(nextMute);
    if (!nextMute) {
      sounds.playClick();
    }
  };

  return (
    <header className="w-full flex items-center justify-between flex-wrap gap-2.5 bg-white/95 backdrop-blur-md px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-2xl sm:rounded-3xl border-2 border-amber-300 shadow-sm">
      {/* Title & Mascot */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-amber-400 flex items-center justify-center text-lg sm:text-2xl shadow-xs shrink-0">
          🐰
        </div>
        <div>
          <h1 className="font-jua text-base sm:text-xl md:text-2xl text-slate-800 tracking-tight leading-none flex items-center gap-1.5">
            <span>동물 친구들과 함께하는 곱셈 미션</span>
          </h1>
          <p className="text-[10px] sm:text-xs text-amber-700 font-medium mt-0.5">
            초등학교 3학년 4단계 곱셈 연산 모험
          </p>
        </div>
      </div>

      {/* Middle: Live Mission Badges (Time, Score, Streak) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
        {/* Streak Counter (if 2 or more) */}
        {streakCount >= 2 && (
          <div
            className="bg-rose-500 text-white font-jua text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-xl flex items-center gap-1 shadow-xs animate-bounce"
            title={`${streakCount}문제 연속 정답 달성!`}
          >
            <span>🔥</span>
            <span>{streakCount}연속 정답!</span>
          </div>
        )}

        {/* Total Time */}
        <div
          className="bg-amber-50 border border-amber-200 text-amber-900 px-2.5 sm:px-3 py-1 rounded-xl flex items-center gap-1.5 font-jua text-xs sm:text-sm shadow-xs"
          title="미션 총 소요 시간"
        >
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>소요 시간: <b className="text-amber-800">{formatKoreanTime(elapsedSeconds)}</b></span>
        </div>

        {/* Challenge Score (Starts at 12, wrong decreases) */}
        <div
          className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-2.5 sm:px-3 py-1 rounded-xl flex items-center gap-1.5 font-jua text-xs sm:text-sm shadow-xs"
          title="도전 횟수 점수 (12점 만점)"
        >
          <Target className="w-3.5 h-3.5 text-emerald-600" />
          <span>도전 점수: <b className="text-emerald-700 text-sm sm:text-base">{score}</b></span>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Quick New Problem */}
        <button
          id="header-new-problem-btn"
          type="button"
          onClick={() => {
            sounds.playClick();
            onNewRandomProblem();
          }}
          className="p-1.5 sm:px-3 sm:py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs sm:text-sm font-jua flex items-center gap-1 transition-all"
          title="새로운 숫자 문제 생성"
        >
          <RefreshCw className="w-4 h-4 text-amber-600" />
          <span className="hidden md:inline">새 문제</span>
        </button>

        {/* Scratchpad Button */}
        <button
          id="header-scratchpad-btn"
          type="button"
          onClick={() => {
            sounds.playClick();
            onOpenScratchpad();
          }}
          className="p-1.5 sm:px-3 sm:py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs sm:text-sm font-jua flex items-center gap-1 transition-all"
          title="계산 연습장 열기"
        >
          <PenTool className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline">연습장</span>
        </button>

        {/* Sound toggle */}
        <button
          id="sound-toggle-btn"
          type="button"
          onClick={handleToggleMute}
          className={`p-1.5 sm:p-2 rounded-xl transition-all border ${
            isMuted
              ? 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
              : 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
          }`}
          title={isMuted ? '소리 켜기' : '소리 끄기'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>
    </header>
  );
};
