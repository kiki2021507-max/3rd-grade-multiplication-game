/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type StageId = 1 | 2 | 3 | 4;

export type AnimalType = 'rabbit' | 'bear' | 'fox' | 'panda';

export interface AnimalCharacter {
  type: AnimalType;
  name: string;
  title: string;
  themeColor: string;
  bgColor: string;
  badge: string;
  greeting: string;
  correctMsg: string;
  hintMsg: string;
  clearMsg: string;
}

export interface Problem {
  id: string;
  stageId: StageId;
  num1: number;
  num2: number;
  answer: number;
  hasRegrouping: boolean;
  typeDesc: string;
  hint: string;
  calculationSteps: {
    title: string;
    description: string;
    breakdown: string[];
  };
}

export interface StageConfig {
  id: StageId;
  level: number;
  title: string;
  subTitle: string;
  targetCount: number; // 3 questions per stage
  character: AnimalCharacter;
  badgeIcon: string;
  colorScheme: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    border: string;
    badgeBg: string;
    bg: string;
  };
}

export type AnswerState = 'idle' | 'correct' | 'incorrect';

export interface SolvedRecord {
  stageId: StageId;
  questionIndex: number;
  problem: Problem;
  userAnswer: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
}
