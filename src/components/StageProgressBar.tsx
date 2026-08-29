/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StageConfig, StageId } from '../types';
import { STAGES_CONFIG } from '../utils/mathGenerator';
import { Check, Star, Lock, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface StageProgressBarProps {
  currentStageId: StageId;
  currentQuestionIndex: number; // 0, 1, 2
  completedStages: number[]; // e.g. [1]
  onSelectStage: (stageId: StageId) => void;
}

export const StageProgressBar: React.FC<StageProgressBarProps> = ({
  currentStageId,
  currentQuestionIndex,
  completedStages,
  onSelectStage,
}) => {
  const stageIds: StageId[] = [1, 2, 3, 4];
  const currentConfig = STAGES_CONFIG[currentStageId];

  return (
    <div className="w-full bg-white/95 backdrop-blur-xs rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-amber-200/90 shadow-sm flex flex-col gap-3">
      {/* Top: 4 Levels Quick Navigation */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {stageIds.map((sId) => {
          const config = STAGES_CONFIG[sId];
          const isCurrent = currentStageId === sId;
          const isCompleted = completedStages.includes(sId);
          const isAccessible = sId === 1 || completedStages.includes((sId - 1) as StageId) || isCompleted;

          return (
            <button
              key={sId}
              id={`stage-nav-btn-${sId}`}
              type="button"
              disabled={!isAccessible}
              onClick={() => {
                if (isAccessible && !isCurrent) {
                  sounds.playClick();
                  onSelectStage(sId);
                }
              }}
              className={`relative py-2 sm:py-2.5 px-1 sm:px-2.5 rounded-xl sm:rounded-2xl transition-all duration-200 flex flex-col items-center justify-center gap-0.5 text-center border-2 ${
                isCurrent
                  ? 'bg-amber-100 border-amber-500 shadow-sm scale-102 ring-2 ring-amber-400/40'
                  : isCompleted
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 cursor-pointer'
                  : isAccessible
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer'
                  : 'bg-slate-100/70 border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <span className="text-base sm:text-xl">{config.badgeIcon}</span>
                <span className="font-jua text-xs sm:text-sm font-bold truncate">
                  LEVEL {sId}
                </span>
                {isCompleted && (
                  <span className="w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[9px]">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
                {!isAccessible && (
                  <Lock className="w-3 h-3 text-slate-400 hidden sm:inline-block" />
                )}
              </div>

              <div className="text-[10px] sm:text-xs text-slate-500 truncate hidden md:block font-medium">
                {sId === 1 && '세 자리 × 한 자리'}
                {sId === 2 && '몇십 × 몇십'}
                {sId === 3 && '몇십몇 × 몇십'}
                {sId === 4 && '몇십몇 × 몇십몇'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Prominent Current Progress Bar Banner (Requirement 6) */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-2xl px-4 py-2.5 sm:py-3 border-2 border-amber-300 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 bg-amber-500 text-white font-jua text-sm sm:text-lg px-3 py-1 rounded-xl shadow-xs">
            <span>⭐</span>
            <span>LEVEL {currentStageId}</span>
          </div>
          <span className="font-jua text-sm sm:text-base text-slate-800 font-bold">
            {currentQuestionIndex + 1} / 3 문제
          </span>
          <span className="text-xs text-amber-800 hidden sm:inline-block font-medium">
            ({currentConfig.subTitle})
          </span>
        </div>

        {/* 3 Large Progress Dots (● ● ○ style) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {[0, 1, 2].map((idx) => {
            const isDone = idx < currentQuestionIndex;
            const isCurrentQ = idx === currentQuestionIndex;

            return (
              <div
                key={idx}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-jua text-xs sm:text-sm transition-all duration-300 ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-xs scale-105 ring-2 ring-emerald-300'
                    : isCurrentQ
                    ? 'bg-amber-400 text-amber-950 font-black border-2 border-amber-600 animate-pulse scale-110 shadow-sm'
                    : 'bg-slate-200 text-slate-500 border border-slate-300'
                }`}
              >
                <span>{isDone ? '●' : isCurrentQ ? '▶' : '○'}</span>
                <span>{idx + 1}번</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
