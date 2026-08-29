/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Problem, StageConfig, StageId } from '../types';

export const STAGES_CONFIG: Record<StageId, StageConfig> = {
  1: {
    id: 1,
    level: 1,
    title: 'LEVEL 1: 세 자리 수 × 한 자리 수',
    subTitle: '세 자리 수에 한 자리 수를 곱해봐요!',
    targetCount: 3,
    character: {
      type: 'rabbit',
      name: '토끼 대장 토토',
      title: '당근 숲의 길잡이',
      themeColor: '#FF6B6B',
      bgColor: '#FFE3E3',
      badge: '🥕',
      greeting: '안녕! 나는 토토야! LEVEL 1 미션을 시작해보자!',
      correctMsg: '정답! 정말 잘했어! 🥕',
      hintMsg: '일의 자리부터 차근차근 곱하고, 올림수를 잊지 마!',
      clearMsg: '다음 미션에 도전해 볼까요?',
    },
    badgeIcon: '🐰',
    colorScheme: {
      primary: 'bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white',
      primaryLight: 'bg-rose-50 text-rose-700 border-rose-200',
      primaryDark: 'text-rose-900',
      border: 'border-rose-300',
      badgeBg: 'bg-rose-100 text-rose-600',
      bg: 'from-rose-50 to-orange-50',
    },
  },
  2: {
    id: 2,
    level: 2,
    title: 'LEVEL 2: 몇십 × 몇십',
    subTitle: '0의 마법 규칙을 이용해 곱해봐요!',
    targetCount: 3,
    character: {
      type: 'bear',
      name: '곰돌이 박사 포포',
      title: '꿀단지 연구원',
      themeColor: '#F59E0B',
      bgColor: '#FEF3C7',
      badge: '🍯',
      greeting: '반가워! 나는 포포 박사야! LEVEL 2에 도전해보자!',
      correctMsg: '정답! 정말 잘했어! 달콤한 꿀처럼 완벽해! 🍯',
      hintMsg: '앞의 숫자끼리 먼저 곱하고, 뒤에 0을 두 개 붙여봐!',
      clearMsg: '다음 미션에 도전해 볼까요?',
    },
    badgeIcon: '🐻',
    colorScheme: {
      primary: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white',
      primaryLight: 'bg-amber-50 text-amber-800 border-amber-200',
      primaryDark: 'text-amber-900',
      border: 'border-amber-300',
      badgeBg: 'bg-amber-100 text-amber-700',
      bg: 'from-amber-50 to-yellow-50',
    },
  },
  3: {
    id: 3,
    level: 3,
    title: 'LEVEL 3: 몇십몇 × 몇십',
    subTitle: '몇십몇에 몇십을 척척 곱해봐요!',
    targetCount: 3,
    character: {
      type: 'fox',
      name: '사막여우 로로',
      title: '사막의 지혜왕',
      themeColor: '#3B82F6',
      bgColor: '#DBEAFE',
      badge: '⭐',
      greeting: '어서와! 나는 사막여우 로로야! LEVEL 3에 도전해보자!',
      correctMsg: '정답! 정말 잘했어! 반짝반짝 멋져! ⭐',
      hintMsg: '몇십몇에 앞 숫자를 곱한 뒤, 끝에 0을 하나 붙이면 끝!',
      clearMsg: '다음 미션에 도전해 볼까요?',
    },
    badgeIcon: '🦊',
    colorScheme: {
      primary: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white',
      primaryLight: 'bg-blue-50 text-blue-700 border-blue-200',
      primaryDark: 'text-blue-900',
      border: 'border-blue-300',
      badgeBg: 'bg-blue-100 text-blue-600',
      bg: 'from-blue-50 to-indigo-50',
    },
  },
  4: {
    id: 4,
    level: 4,
    title: 'LEVEL 4: 몇십몇 × 몇십몇',
    subTitle: '최종 미션! 두 자리 수 곱셈 마스터!',
    targetCount: 3,
    character: {
      type: 'panda',
      name: '아기 판다 루루',
      title: '대나무 숲의 마스터',
      themeColor: '#10B981',
      bgColor: '#D1FAE5',
      badge: '🎋',
      greeting: '안녕! 최종 관문인 LEVEL 4에 온 걸 환영해! 차근차근 풀어보자!',
      correctMsg: '정답! 정말 잘했어! 넌 진정한 곱셈 마스터야! 🏆',
      hintMsg: '일의 자리 곱한 값과 십의 자리 곱한 값을 더해줘!',
      clearMsg: '모든 곱셈 미션을 성공했어요!',
    },
    badgeIcon: '🐼',
    colorScheme: {
      primary: 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white',
      primaryLight: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      primaryDark: 'text-emerald-900',
      border: 'border-emerald-300',
      badgeBg: 'bg-emerald-100 text-emerald-700',
      bg: 'from-emerald-50 to-teal-50',
    },
  },
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Track recently generated problems to prevent duplication
const recentProblemKeys = new Set<string>();

/**
 * Generates a 3rd-grade appropriate multiplication problem for a specific stage
 * without repeating recently generated problems.
 */
export function generateProblem(stageId: StageId, forceRegrouping?: boolean, excludeKey?: string): Problem {
  let attempts = 0;
  while (attempts < 20) {
    attempts++;
    const prob = createRawProblem(stageId, forceRegrouping);
    const key = `${prob.num1}x${prob.num2}`;

    // Check if this problem was recently seen or matches excludeKey
    if (key !== excludeKey && !recentProblemKeys.has(key)) {
      recentProblemKeys.add(key);
      // Keep set size manageable
      if (recentProblemKeys.size > 25) {
        const first = recentProblemKeys.values().next().value;
        if (first) recentProblemKeys.delete(first);
      }
      return prob;
    }
  }

  // Fallback
  return createRawProblem(stageId, forceRegrouping);
}

function createRawProblem(stageId: StageId, forceRegrouping?: boolean): Problem {
  const shouldRegroup = forceRegrouping !== undefined ? forceRegrouping : Math.random() > 0.45;
  const id = `${stageId}-${Date.now()}-${randomInt(100, 999)}`;

  switch (stageId) {
    case 1: {
      // 1단계: 세 자리 수 × 한 자리 수
      let num1: number;
      let num2: number;
      let hasRegrouping = false;

      if (!shouldRegroup) {
        // Without carrying (e.g. 123 * 3, 214 * 2, 321 * 2)
        num2 = randomInt(2, 4);
        const h = randomInt(1, Math.floor(9 / num2));
        const t = randomInt(1, Math.floor(9 / num2));
        const o = randomInt(1, Math.floor(9 / num2));
        num1 = h * 100 + t * 10 + o;
        hasRegrouping = false;
      } else {
        // With carrying (e.g. 148 * 4, 256 * 3, 319 * 6, 175 * 5)
        num2 = randomInt(3, 8);
        num1 = randomInt(115, 650);
        // check if has regrouping
        const o = num1 % 10;
        const t = Math.floor((num1 % 100) / 10);
        const h = Math.floor(num1 / 100);
        hasRegrouping = (o * num2 >= 10) || (t * num2 + Math.floor((o * num2) / 10) >= 10);
      }

      const answer = num1 * num2;
      const onesPart = (num1 % 10) * num2;
      const tensPart = (Math.floor((num1 % 100) / 10) * 10) * num2;
      const hundredsPart = (Math.floor(num1 / 100) * 100) * num2;

      return {
        id,
        stageId: 1,
        num1,
        num2,
        answer,
        hasRegrouping,
        typeDesc: hasRegrouping ? '올림이 있는 세 자리 수 × 한 자리 수' : '올림이 없는 세 자리 수 × 한 자리 수',
        hint: `일의 자리부터 (${num1 % 10}×${num2}), 십의 자리 (${Math.floor((num1 % 100) / 10)}0×${num2}), 백의 자리 (${Math.floor(num1 / 100)}00×${num2})를 차례로 계산해요.`,
        calculationSteps: {
          title: `${num1} × ${num2} 단계별 계산법`,
          description: `세 자리 수를 백, 십, 일의 자리로 나누어 곱하고 모두 더해요.`,
          breakdown: [
            `1) 일의 자리: ${num1 % 10} × ${num2} = ${onesPart}`,
            `2) 십의 자리: ${Math.floor((num1 % 100) / 10) * 10} × ${num2} = ${tensPart}`,
            `3) 백의 자리: ${Math.floor(num1 / 100) * 100} × ${num2} = ${hundredsPart}`,
            `4) 모두 더하기: ${onesPart} + ${tensPart} + ${hundredsPart} = ${answer}`,
          ],
        },
      };
    }

    case 2: {
      // 2단계: 몇십 × 몇십
      // e.g. 20 * 30, 40 * 50, 70 * 80, 30 * 90
      const a = randomInt(1, 9);
      const b = randomInt(2, 9);
      const num1 = a * 10;
      const num2 = b * 10;
      const answer = num1 * num2;
      const frontProduct = a * b;

      return {
        id,
        stageId: 2,
        num1,
        num2,
        answer,
        hasRegrouping: frontProduct >= 10,
        typeDesc: '0의 규칙을 활용하는 몇십 × 몇십',
        hint: `앞의 숫자 ${a}와 ${b}를 곱한 뒤(${frontProduct}), 뒤에 0을 두 개 붙여요!`,
        calculationSteps: {
          title: `${num1} × ${num2} 단계별 계산법`,
          description: `0을 잠시 떼어놓고 앞의 수끼리 곱한 뒤 0 두 개(00)를 붙여요.`,
          breakdown: [
            `1) 앞의 숫자끼리 곱하기: ${a} × ${b} = ${frontProduct}`,
            `2) 0이 2개 있으므로 100배: ${frontProduct} × 100`,
            `3) 정답 완성: ${answer}`,
          ],
        },
      };
    }

    case 3: {
      // 3단계: 몇십몇 × 몇십
      // e.g. 24 * 30, 35 * 20, 48 * 40, 16 * 50
      let twoDigit: number;
      if (!shouldRegroup) {
        // e.g. 23 * 30, 12 * 40, 31 * 20
        const t = randomInt(1, 3);
        const o = randomInt(1, 3);
        twoDigit = t * 10 + o;
      } else {
        twoDigit = randomInt(14, 78);
        while (twoDigit % 10 === 0) {
          twoDigit = randomInt(14, 78);
        }
      }

      const tensMultiplier = randomInt(2, 8) * 10;
      const multiplierDigit = tensMultiplier / 10;
      const num1 = twoDigit;
      const num2 = tensMultiplier;
      const answer = num1 * num2;
      const intermediate = num1 * multiplierDigit;

      return {
        id,
        stageId: 3,
        num1,
        num2,
        answer,
        hasRegrouping: (num1 % 10) * multiplierDigit >= 10,
        typeDesc: '몇십몇 × 몇십 연산',
        hint: `${num1}에 ${multiplierDigit}을 먼저 곱한 뒤 (${intermediate}), 뒤에 0을 하나 붙여요!`,
        calculationSteps: {
          title: `${num1} × ${num2} 단계별 계산법`,
          description: `${num1}에 ${multiplierDigit}을 곱하고 10배(0 붙이기)를 해줘요.`,
          breakdown: [
            `1) ${num1} × ${multiplierDigit} = ${intermediate}`,
            `2) ${num2}은 10이 ${multiplierDigit}개이므로 10배: ${intermediate} × 10`,
            `3) 정답 완성: ${answer}`,
          ],
        },
      };
    }

    case 4: {
      // 4단계: 몇십몇 × 몇십몇
      // e.g. 23 * 14, 35 * 24, 42 * 31, 56 * 23
      let num1: number;
      let num2: number;

      if (!shouldRegroup) {
        // simple 2-digit e.g. 21 * 13, 32 * 21
        const t1 = randomInt(1, 3);
        const o1 = randomInt(1, 3);
        const t2 = randomInt(1, 3);
        const o2 = randomInt(1, 3);
        num1 = t1 * 10 + o1;
        num2 = t2 * 10 + o2;
      } else {
        num1 = randomInt(16, 68);
        num2 = randomInt(14, 49);
        while (num1 % 10 === 0) num1 = randomInt(16, 68);
        while (num2 % 10 === 0) num2 = randomInt(14, 49);
      }

      const answer = num1 * num2;
      const onesDigit2 = num2 % 10;
      const tensDigit2 = Math.floor(num2 / 10);
      const step1Result = num1 * onesDigit2;
      const step2Result = num1 * (tensDigit2 * 10);

      return {
        id,
        stageId: 4,
        num1,
        num2,
        answer,
        hasRegrouping: true,
        typeDesc: '두 자리 수 × 두 자리 수 세로셈',
        hint: `먼저 ${num1} × ${onesDigit2}를 구하고, ${num1} × ${tensDigit2 * 10}을 구해서 둘을 더해요!`,
        calculationSteps: {
          title: `${num1} × ${num2} 세로셈 단계별 계산`,
          description: `아래 숫자의 일의 자리 곱과 십의 자리 곱을 구한 후 더해요.`,
          breakdown: [
            `1) ${num1} × ${onesDigit2}(일의 자리) = ${step1Result}`,
            `2) ${num1} × ${tensDigit2}0(십의 자리) = ${step2Result}`,
            `3) 두 결과를 더하기: ${step1Result} + ${step2Result} = ${answer}`,
          ],
        },
      };
    }
  }
}
