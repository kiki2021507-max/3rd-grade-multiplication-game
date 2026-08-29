/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StageConfig } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { ArrowRight, Star, Trophy, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface StageClearModalProps {
  stageConfig: StageConfig;
  nextStageConfig?: StageConfig;
  isOpen: boolean;
  onNextStage: () => void;
}

export const StageClearModal: React.FC<StageClearModalProps> = ({
  stageConfig,
  nextStageConfig,
  isOpen,
  onNextStage,
}) => {
  useEffect(() => {
    if (isOpen) {
      sounds.playStageClear();
      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-pop-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-4 border-amber-400 shadow-2xl flex flex-col items-center text-center gap-5 relative overflow-hidden">
        {/* Decorative Top ribbon */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-200 rounded-full opacity-40 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-rose-200 rounded-full opacity-40 pointer-events-none" />

        {/* Trophy & Stars */}
        <div className="flex items-center gap-1.5 text-amber-400">
          <Star className="w-6 h-6 fill-amber-400" />
          <Star className="w-8 h-8 fill-amber-400 -translate-y-1" />
          <Star className="w-6 h-6 fill-amber-400" />
        </div>

        {/* Animal Character Celebrating */}
        <div className="relative">
          <AnimalAvatar
            type={stageConfig.character.type}
            mood="cheering"
            size="xl"
          />
          <div className="absolute -top-2 -right-2 bg-amber-400 text-white rounded-full p-2 shadow-md">
            <Trophy className="w-5 h-5" />
          </div>
        </div>

        {/* Stage Clear Title */}
        <div className="flex flex-col gap-1.5">
          <h2 className="font-jua text-2xl sm:text-3xl text-slate-900 font-black flex items-center justify-center gap-1.5">
            <span>🎉</span>
            <span>LEVEL {stageConfig.id} 성공!</span>
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-slate-800 text-sm sm:text-base font-jua mt-2">
            <span className="text-xl mr-1">{stageConfig.badgeIcon}</span>
            <span>"다음 미션에 도전해 볼까요?"</span>
          </div>
        </div>

        {/* Next Stage Button */}
        <button
          id="stage-clear-next-btn"
          type="button"
          onClick={() => {
            sounds.playClick();
            onNextStage();
          }}
          className="w-full h-14 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-jua text-xl sm:text-2xl rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 transition-all border-2 border-amber-600 active:scale-98"
        >
          <span>{nextStageConfig ? `LEVEL ${nextStageConfig.id} 도전!` : '최종 결과 확인하기!'}</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
