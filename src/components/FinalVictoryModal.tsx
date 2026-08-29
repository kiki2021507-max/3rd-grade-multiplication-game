/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AnimalAvatar } from './AnimalAvatar';
import { Trophy, Award, RotateCcw, Sparkles, CheckCircle2, Heart, Clock, Target } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FinalVictoryModalProps {
  isOpen: boolean;
  onRestart: () => void;
  totalElapsedSeconds: number;
  score: number; // 12 - wrongAttempts (12, 11, 7 ...)
  wrongCount: number;
  totalAttempts: number;
}

function formatKoreanTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}초`;
  if (secs === 0) return `${mins}분`;
  return `${mins}분 ${secs}초`;
}

export const FinalVictoryModal: React.FC<FinalVictoryModalProps> = ({
  isOpen,
  onRestart,
  totalElapsedSeconds,
  score,
  wrongCount,
  totalAttempts,
}) => {
  useEffect(() => {
    if (isOpen) {
      sounds.playVictory();
      // Continuous celebration bursts
      const duration = 2.8 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto animate-pop-in">
      <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-lg w-full border-4 border-amber-400 shadow-2xl flex flex-col items-center text-center gap-4 my-auto relative">
        {/* Certificate Golden Frame */}
        <div className="w-full border-2 border-dashed border-amber-300 rounded-2xl p-4 sm:p-6 bg-gradient-to-b from-amber-50/80 to-white flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5 text-amber-500">
            <Sparkles className="w-7 h-7 animate-spin-slow" />
            <Trophy className="w-12 h-12 text-amber-500 fill-amber-400 animate-bounce" />
            <Sparkles className="w-7 h-7 animate-spin-slow" />
          </div>

          <div className="font-jua text-amber-700 text-lg sm:text-xl tracking-wider font-extrabold flex items-center gap-1">
            <span>🏆 MISSION CLEAR!</span>
          </div>

          <h1 className="font-jua text-2xl sm:text-3xl text-slate-900 font-black">
            🎉 모든 곱셈 미션을 성공했어요!
          </h1>

          <div className="bg-amber-100/80 text-amber-900 font-jua text-base sm:text-lg px-4 py-1.5 rounded-full border border-amber-300 shadow-xs">
            👑 칭호: <b>곱셈 마스터!</b>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            LEVEL 1부터 LEVEL 4까지 총 12문제를 모두 맞히며 곱셈 연산을 완벽하게 정복했습니다!
          </p>

          {/* Stats: Total Time & Score */}
          <div className="w-full grid grid-cols-2 gap-2.5 my-1 font-jua">
            <div className="bg-white p-3 rounded-2xl border-2 border-amber-200 shadow-xs flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-500 text-xs font-sans font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>총 소요 시간</span>
              </div>
              <div className="text-xl sm:text-2xl text-amber-900 font-bold mt-1">
                {formatKoreanTime(totalElapsedSeconds)}
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border-2 border-emerald-200 shadow-xs flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-500 text-xs font-sans font-medium">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                <span>총 도전 점수 (12점 만점)</span>
              </div>
              <div className="text-xl sm:text-2xl text-emerald-700 font-bold mt-1">
                {score}점 <span className="text-xs text-slate-500 font-sans">(오답 {wrongCount}회)</span>
              </div>
            </div>
          </div>

          {/* 4 Animal Friends Team */}
          <div className="grid grid-cols-4 gap-2 my-1 w-full max-w-xs justify-items-center">
            <div className="flex flex-col items-center">
              <AnimalAvatar type="rabbit" mood="cheering" size="sm" />
              <span className="text-[11px] font-jua text-rose-600 mt-1">토토</span>
            </div>
            <div className="flex flex-col items-center">
              <AnimalAvatar type="bear" mood="cheering" size="sm" />
              <span className="text-[11px] font-jua text-amber-700 mt-1">포포</span>
            </div>
            <div className="flex flex-col items-center">
              <AnimalAvatar type="fox" mood="cheering" size="sm" />
              <span className="text-[11px] font-jua text-blue-600 mt-1">로로</span>
            </div>
            <div className="flex flex-col items-center">
              <AnimalAvatar type="panda" mood="cheering" size="sm" />
              <span className="text-[11px] font-jua text-emerald-600 mt-1">루루</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-rose-500 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>동물 친구들이 언제나 응원해! 정말 자랑스러워!</span>
          </div>
        </div>

        {/* Restart Button */}
        <button
          id="victory-restart-btn"
          type="button"
          onClick={() => {
            sounds.playClick();
            onRestart();
          }}
          className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-jua text-xl sm:text-2xl rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all border-2 border-emerald-600 active:scale-98"
        >
          <RotateCcw className="w-6 h-6" />
          <span>다시 도전하기</span>
        </button>
      </div>
    </div>
  );
};
