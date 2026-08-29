/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Problem } from '../types';

interface VerticalMathHelperProps {
  problem: Problem;
  userAnswer: string;
  isCorrect?: boolean;
}

export const VerticalMathHelper: React.FC<VerticalMathHelperProps> = ({
  problem,
  userAnswer,
  isCorrect,
}) => {
  const { num1, num2 } = problem;
  const num1Str = String(num1);
  const num2Str = String(num2);

  // Maximum characters length
  const maxLen = Math.max(num1Str.length, num2Str.length, userAnswer.length, 4);

  return (
    <div className="bg-white/90 rounded-2xl p-4 border-2 border-slate-200 shadow-xs inline-flex flex-col items-end font-mono select-none">
      {/* Top Number */}
      <div className="text-3xl sm:text-4xl tracking-widest text-slate-800 font-bold pr-2">
        {num1Str.padStart(maxLen, ' ')}
      </div>

      {/* Bottom Number with × symbol */}
      <div className="text-3xl sm:text-4xl tracking-widest text-slate-800 font-bold flex items-center justify-end w-full border-b-4 border-slate-800 pb-1">
        <span className="text-rose-500 font-bold mr-auto pl-1">×</span>
        <span className="pr-2">{num2Str.padStart(maxLen - 1, ' ')}</span>
      </div>

      {/* User Answer or Result */}
      <div className="text-3xl sm:text-4xl tracking-widest font-bold pt-2 pr-2 min-h-[50px] flex items-center justify-end">
        {userAnswer ? (
          <span className={isCorrect === true ? 'text-emerald-600 font-extrabold' : 'text-blue-600 font-bold'}>
            {userAnswer.padStart(maxLen, ' ')}
          </span>
        ) : (
          <span className="text-slate-300">{'?'.padStart(maxLen, ' ')}</span>
        )}
      </div>
    </div>
  );
};
