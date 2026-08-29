/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Problem, StageConfig, AnswerState } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { VerticalMathHelper } from './VerticalMathHelper';
import { Lightbulb, RotateCcw, PenTool, LayoutGrid, CheckCircle, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ProblemCardProps {
  problem: Problem;
  stageConfig: StageConfig;
  userAnswer: string;
  onUserAnswerChange: (val: string) => void;
  answerState: AnswerState;
  onOpenScratchpad: () => void;
  onSubmitAnswer: () => void;
  onRetry: () => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  stageConfig,
  userAnswer,
  onUserAnswerChange,
  answerState,
  onOpenScratchpad,
  onSubmitAnswer,
  onRetry,
}) => {
  const [showVertical, setShowVertical] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto focus input on problem change or idle state
  useEffect(() => {
    if (answerState === 'idle') {
      inputRef.current?.focus();
      setShowHint(false);
    }
  }, [problem.id, answerState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only numbers
    const clean = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    onUserAnswerChange(clean);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (userAnswer.trim().length > 0 && answerState === 'idle') {
        onSubmitAnswer();
      }
    }
  };

  const getAnimalMood = () => {
    if (answerState === 'correct') return 'happy';
    if (answerState === 'incorrect') return 'thinking';
    if (showHint) return 'thinking';
    return 'idle';
  };

  return (
    <div className="w-full bg-white rounded-3xl p-4 sm:p-7 border-3 border-amber-300 shadow-xl flex flex-col gap-5 relative overflow-hidden transition-all">
      {/* Decorative top header / Tag */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-amber-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-jua text-base sm:text-lg text-amber-900 bg-amber-100 px-3 py-1 rounded-xl">
            {stageConfig.title}
          </span>
          <span className="text-xs sm:text-sm text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-lg">
            {problem.typeDesc}
          </span>
        </div>

        {/* Action Toggles: Scratchpad, Layout mode, Hint */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            id="toggle-view-mode-btn"
            type="button"
            onClick={() => {
              sounds.playClick();
              setShowVertical(!showVertical);
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-jua flex items-center gap-1 transition-all border ${
              showVertical
                ? 'bg-blue-100 text-blue-800 border-blue-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
            title="가로셈/세로셈 보기 전환"
          >
            <LayoutGrid className="w-4 h-4 text-blue-600" />
            <span>{showVertical ? '가로셈 보기' : '세로셈 보기'}</span>
          </button>

          <button
            id="open-scratchpad-btn"
            type="button"
            onClick={() => {
              sounds.playClick();
              onOpenScratchpad();
            }}
            className="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl text-xs sm:text-sm font-jua flex items-center gap-1 transition-all"
            title="손글씨 계산 연습장 열기"
          >
            <PenTool className="w-4 h-4 text-amber-700" />
            <span>연습장</span>
          </button>

          <button
            id="toggle-hint-btn"
            type="button"
            onClick={() => {
              sounds.playClick();
              setShowHint(!showHint);
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-jua flex items-center gap-1 transition-all border ${
              showHint
                ? 'bg-amber-500 text-white border-amber-600'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>힌트</span>
          </button>
        </div>
      </div>

      {/* Animal Character Speech Bubble & Avatar */}
      <div className="flex items-center gap-3 sm:gap-4 bg-amber-50/80 p-3.5 sm:p-4 rounded-2xl border border-amber-200">
        <AnimalAvatar
          type={stageConfig.character.type}
          mood={getAnimalMood()}
          size="md"
        />
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-jua text-sm text-slate-800 font-bold">
              {stageConfig.character.name}
            </span>
            <span className="text-xs text-slate-500">
              ({stageConfig.character.title})
            </span>
          </div>

          <div className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed">
            {answerState === 'correct' ? (
              <span className="text-emerald-700 font-jua text-base sm:text-lg flex items-center gap-1.5 animate-pop-in">
                <span>🎉 정답!</span>
                <span>정말 잘했어요! 🌟</span>
              </span>
            ) : answerState === 'incorrect' ? (
              <div className="text-rose-700 font-jua text-base sm:text-lg flex flex-col animate-shake">
                <span>앗! 아쉬워요!</span>
                <span className="text-xs sm:text-sm text-rose-600 font-sans font-semibold">천천히 다시 도전해 봐요! 💪</span>
              </div>
            ) : showHint ? (
              <span className="text-blue-800">
                💡 <b>힌트:</b> {problem.hint}
              </span>
            ) : (
              <span>{stageConfig.character.greeting}</span>
            )}
          </div>
        </div>
      </div>

      {/* BIG NUMBERS MATH QUESTION AREA */}
      <div className="my-2 py-4 sm:py-6 bg-slate-50/80 rounded-3xl border-2 border-slate-200 flex flex-col items-center justify-center relative">
        {showVertical ? (
          /* Vertical Multiplication View */
          <div className="flex flex-col items-center">
            <VerticalMathHelper
              problem={problem}
              userAnswer={userAnswer}
              isCorrect={answerState === 'correct'}
            />
          </div>
        ) : (
          /* Extra Large Horizontal View */
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 px-2 select-none">
            {/* Number 1 */}
            <span className="font-jua text-4xl sm:text-6xl md:text-7xl text-slate-800 tracking-wider">
              {problem.num1}
            </span>

            {/* Multiply Sign */}
            <span className="font-jua text-4xl sm:text-6xl md:text-7xl text-rose-500 font-black px-1 sm:px-2">
              ×
            </span>

            {/* Number 2 */}
            <span className="font-jua text-4xl sm:text-6xl md:text-7xl text-slate-800 tracking-wider">
              {problem.num2}
            </span>

            {/* Equals Sign */}
            <span className="font-jua text-4xl sm:text-6xl md:text-7xl text-amber-500 font-black px-1 sm:px-2">
              =
            </span>

            {/* Question Mark or Answer Input Box */}
            <div className="inline-flex items-center justify-center">
              <input
                ref={inputRef}
                id="math-answer-input-box"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                disabled={answerState === 'correct'}
                value={userAnswer}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="?"
                autoComplete="off"
                className={`w-32 sm:w-44 md:w-52 h-16 sm:h-20 md:h-24 text-center font-jua text-4xl sm:text-5xl md:text-6xl rounded-2xl border-4 transition-all outline-none font-bold shadow-inner ${
                  answerState === 'correct'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                    : answerState === 'incorrect'
                    ? 'bg-rose-50 border-rose-500 text-rose-700 animate-shake'
                    : 'bg-white border-amber-400 focus:border-amber-500 text-blue-700 focus:ring-4 focus:ring-amber-200'
                }`}
              />
            </div>
          </div>
        )}

        {/* Sub-label under question */}
        <div className="mt-3 text-xs sm:text-sm text-slate-500 font-medium">
          {showVertical
            ? '세로셈으로 자릿수를 맞춰 계산해 보세요!'
            : '키패드 또는 키보드로 정답을 입력하고 [정답 확인]을 눌러주세요.'}
        </div>
      </div>

      {/* Answer feedback banner when state is correct or incorrect */}
      {answerState === 'correct' && (
        <div className="bg-emerald-100 border-2 border-emerald-400 rounded-2xl p-4 flex items-center justify-between animate-pop-in">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <div className="font-jua text-lg sm:text-xl text-emerald-950 font-bold">
                🎉 정답! 정말 잘했어요!
              </div>
              <div className="text-xs sm:text-sm text-emerald-800 font-medium">
                멋진 실력이에요! 다음 문제로 출발합니다.
              </div>
            </div>
          </div>
          <span className="text-2xl animate-bounce">🥕</span>
        </div>
      )}

      {answerState === 'incorrect' && (
        <div className="bg-rose-100 border-2 border-rose-400 rounded-2xl p-4 flex items-center justify-between animate-pop-in">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💭</span>
            <div>
              <div className="font-jua text-lg sm:text-xl text-rose-950 font-bold">
                앗! 아쉬워요!
              </div>
              <div className="text-xs sm:text-sm text-rose-800 font-medium">
                천천히 다시 도전해 봐요!
              </div>
            </div>
          </div>
          <button
            id="retry-problem-btn"
            type="button"
            onClick={onRetry}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-jua text-sm sm:text-base flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>다시 풀기</span>
          </button>
        </div>
      )}

      {/* Step by Step hint accordion if expanded */}
      {showHint && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex flex-col gap-2 animate-pop-in">
          <div className="flex items-center gap-2 font-jua text-blue-900 text-base">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <span>{problem.calculationSteps.title}</span>
          </div>
          <div className="text-sm text-slate-700 bg-white p-3 rounded-xl border border-blue-100">
            <p className="font-medium mb-1.5 text-blue-800">{problem.calculationSteps.description}</p>
            <ul className="space-y-1 text-slate-600 text-xs sm:text-sm">
              {problem.calculationSteps.breakdown.map((step, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
