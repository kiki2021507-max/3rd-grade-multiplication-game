/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StageId, Problem, AnswerState } from './types';
import { STAGES_CONFIG, generateProblem } from './utils/mathGenerator';
import { sounds } from './utils/soundEffects';
import { Header } from './components/Header';
import { StageProgressBar } from './components/StageProgressBar';
import { ProblemCard } from './components/ProblemCard';
import { Keypad } from './components/Keypad';
import { Scratchpad } from './components/Scratchpad';
import { StageClearModal } from './components/StageClearModal';
import { FinalVictoryModal } from './components/FinalVictoryModal';

export default function App() {
  const [currentStageId, setCurrentStageId] = useState<StageId>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // 0, 1, 2
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [problem, setProblem] = useState<Problem>(() => generateProblem(1));
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);
  const [showStageClearModal, setShowStageClearModal] = useState<boolean>(false);
  const [showFinalVictoryModal, setShowFinalVictoryModal] = useState<boolean>(false);

  // Performance & game stats
  const [totalElapsedSeconds, setTotalElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [streakCount, setStreakCount] = useState<number>(0);

  // Wrong answer auto-advance timeout ref
  const wrongAnswerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Challenge score: 12 - wrongCount (minimum 0)
  // e.g. 0 wrong = 12, 1 wrong = 11, 5 wrong = 7
  const challengeScore = Math.max(0, 12 - wrongCount);

  // Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerRunning && !showFinalVictoryModal) {
      timer = setInterval(() => {
        setTotalElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerRunning, showFinalVictoryModal]);

  // Load new random problem for current stage with anti-duplication
  const loadNewProblem = useCallback((stageId: StageId, questionIdx?: number, currentProb?: Problem) => {
    const forceRegroup = questionIdx !== undefined ? questionIdx > 0 : undefined;
    const excludeKey = currentProb ? `${currentProb.num1}x${currentProb.num2}` : undefined;
    const newProb = generateProblem(stageId, forceRegroup, excludeKey);
    setProblem(newProb);
    setUserAnswer('');
    setAnswerState('idle');
  }, []);

  // When manually switching stage
  const handleSelectStage = (stageId: StageId) => {
    if (wrongAnswerTimeoutRef.current) clearTimeout(wrongAnswerTimeoutRef.current);
    setCurrentStageId(stageId);
    setCurrentQuestionIndex(0);
    loadNewProblem(stageId, 0, problem);
  };

  // On check answer
  const handleSubmitAnswer = () => {
    if (!userAnswer.trim() || answerState !== 'idle') return;

    const parsed = parseInt(userAnswer.trim(), 10);
    if (isNaN(parsed)) return;

    // Increment total attempt count
    setTotalAttempts((prev) => prev + 1);

    if (parsed === problem.answer) {
      // 🌟 Correct Answer
      sounds.playCorrect();
      setAnswerState('correct');
      setStreakCount((prev) => prev + 1);

      // Advance after brief celebratory feedback
      setTimeout(() => {
        const nextIdx = currentQuestionIndex + 1;

        if (nextIdx >= 3) {
          // Completed 3 questions in this level!
          const updatedCompleted = Array.from(new Set([...completedStages, currentStageId]));
          setCompletedStages(updatedCompleted);

          if (currentStageId === 4) {
            // Completed all 4 levels! Show Final Victory Modal
            setIsTimerRunning(false);
            setShowFinalVictoryModal(true);
          } else {
            // Level Clear Modal
            setShowStageClearModal(true);
          }
        } else {
          // Move to next question in same level
          setCurrentQuestionIndex(nextIdx);
          loadNewProblem(currentStageId, nextIdx, problem);
        }
      }, 1300);
    } else {
      // ❌ Incorrect Answer: Rule 2
      // Do not reveal correct answer.
      // Show "앗! 아쉬워요! 천천히 다시 도전해 봐요!"
      // Keep the EXACT SAME problem (같은 숫자 문제 유지)
      // Reset streak to 0, increment wrongCount
      sounds.playIncorrect();
      setAnswerState('incorrect');
      setWrongCount((prev) => prev + 1);
      setStreakCount(0);

      // After 1.6 seconds, reset answerState to idle and clear input so student can try the same problem again
      if (wrongAnswerTimeoutRef.current) clearTimeout(wrongAnswerTimeoutRef.current);
      wrongAnswerTimeoutRef.current = setTimeout(() => {
        setAnswerState('idle');
        setUserAnswer('');
      }, 1600);
    }
  };

  // Move to next stage from modal
  const handleNextStageFromModal = () => {
    setShowStageClearModal(false);
    const nextStage = (currentStageId + 1) as StageId;
    if (nextStage <= 4) {
      setCurrentStageId(nextStage);
      setCurrentQuestionIndex(0);
      loadNewProblem(nextStage, 0, problem);
    }
  };

  // Restart everything ("다시 도전하기")
  const handleRestartAll = () => {
    if (wrongAnswerTimeoutRef.current) clearTimeout(wrongAnswerTimeoutRef.current);
    setShowFinalVictoryModal(false);
    setShowStageClearModal(false);
    setCompletedStages([]);
    setCurrentStageId(1);
    setCurrentQuestionIndex(0);
    setWrongCount(0);
    setTotalAttempts(0);
    setStreakCount(0);
    setTotalElapsedSeconds(0);
    setIsTimerRunning(true);
    loadNewProblem(1, 0);
  };

  // Keypad actions
  const handleDigitPress = (digit: string) => {
    if (answerState === 'correct') return;
    if (answerState === 'incorrect') {
      if (wrongAnswerTimeoutRef.current) clearTimeout(wrongAnswerTimeoutRef.current);
      setAnswerState('idle');
      setUserAnswer(digit);
    } else {
      if (userAnswer.length < 6) {
        setUserAnswer((prev) => prev + digit);
      }
    }
  };

  const handleBackspace = () => {
    if (answerState === 'correct') return;
    if (answerState === 'incorrect') {
      if (wrongAnswerTimeoutRef.current) clearTimeout(wrongAnswerTimeoutRef.current);
      setAnswerState('idle');
      setUserAnswer('');
      return;
    }
    setUserAnswer((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (answerState === 'correct') return;
    if (answerState === 'incorrect') {
      if (wrongAnswerTimeoutRef.current) clearTimeout(wrongAnswerTimeoutRef.current);
    }
    setAnswerState('idle');
    setUserAnswer('');
  };

  const handleRetry = () => {
    if (wrongAnswerTimeoutRef.current) clearTimeout(wrongAnswerTimeoutRef.current);
    setAnswerState('idle');
    setUserAnswer('');
  };

  const currentStageConfig = STAGES_CONFIG[currentStageId];
  const nextStageConfig = currentStageId < 4 ? STAGES_CONFIG[(currentStageId + 1) as StageId] : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/40 to-yellow-50/50 py-3 sm:py-5 px-3 sm:px-6 md:px-8 flex flex-col justify-between max-w-5xl mx-auto font-sans">
      {/* Top Header */}
      <div className="flex flex-col gap-3">
        <Header
          onOpenScratchpad={() => setIsScratchpadOpen(true)}
          onNewRandomProblem={() => loadNewProblem(currentStageId, currentQuestionIndex, problem)}
          elapsedSeconds={totalElapsedSeconds}
          score={challengeScore}
          wrongCount={wrongCount}
          streakCount={streakCount}
        />

        {/* 4 Stages & Questions Progress */}
        <StageProgressBar
          currentStageId={currentStageId}
          currentQuestionIndex={currentQuestionIndex}
          completedStages={completedStages}
          onSelectStage={handleSelectStage}
        />
      </div>

      {/* Main Interactive Play Area */}
      <main className="my-3 sm:my-4 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* Left / Top: Problem display and input card */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <ProblemCard
            problem={problem}
            stageConfig={currentStageConfig}
            userAnswer={userAnswer}
            onUserAnswerChange={(val) => {
              if (answerState === 'incorrect') {
                if (wrongAnswerTimeoutRef.current) clearTimeout(wrongAnswerTimeoutRef.current);
              }
              setAnswerState('idle');
              setUserAnswer(val);
            }}
            answerState={answerState}
            onOpenScratchpad={() => setIsScratchpadOpen(true)}
            onSubmitAnswer={handleSubmitAnswer}
            onRetry={handleRetry}
          />
        </div>

        {/* Right / Bottom: Big Tactile Keypad */}
        <div className="lg:col-span-5 bg-white/95 backdrop-blur-xs rounded-3xl p-4 sm:p-6 border-3 border-amber-300 shadow-lg flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3 px-1">
            <span className="font-jua text-base sm:text-lg text-slate-800 font-bold">
              🔢 정답 입력 키패드
            </span>
            <span className="text-xs text-slate-500 font-medium">
              (키보드 입력도 가능)
            </span>
          </div>

          <Keypad
            onDigitPress={handleDigitPress}
            onBackspace={handleBackspace}
            onClear={handleClear}
            onSubmit={handleSubmitAnswer}
            disabled={answerState === 'correct'}
            submitDisabled={!userAnswer.trim()}
          />
        </div>
      </main>

      {/* Footer info note */}
      <footer className="text-center py-2 text-xs sm:text-sm text-amber-900/80 font-medium flex items-center justify-center gap-1.5 select-none">
        <span>🐾</span>
        <span>초등학교 3학년 곱셈 마스터 (LEVEL 1: 세 자리×한 자리, LEVEL 2: 몇십×몇십, LEVEL 3: 몇십몇×몇십, LEVEL 4: 몇십몇×몇십몇)</span>
      </footer>

      {/* Scratchpad Whiteboard Modal */}
      <Scratchpad
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />

      {/* Level Clear Modal */}
      <StageClearModal
        isOpen={showStageClearModal}
        stageConfig={currentStageConfig}
        nextStageConfig={nextStageConfig}
        onNextStage={handleNextStageFromModal}
      />

      {/* Grand Finale Victory Modal */}
      <FinalVictoryModal
        isOpen={showFinalVictoryModal}
        onRestart={handleRestartAll}
        totalElapsedSeconds={totalElapsedSeconds}
        score={challengeScore}
        wrongCount={wrongCount}
        totalAttempts={totalAttempts}
      />
    </div>
  );
}
