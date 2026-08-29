/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Delete, CheckCircle2, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface KeypadProps {
  onDigitPress: (digit: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  submitDisabled?: boolean;
}

export const Keypad: React.FC<KeypadProps> = ({
  onDigitPress,
  onBackspace,
  onClear,
  onSubmit,
  disabled = false,
  submitDisabled = false,
}) => {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'];

  const handleKey = (key: string) => {
    if (disabled) return;
    sounds.playClick();
    if (key === 'C') {
      onClear();
    } else if (key === '⌫') {
      onBackspace();
    } else {
      onDigitPress(key);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-2.5">
      {/* 3x4 Number Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {digits.map((digit) => {
          const isSpecial = digit === 'C' || digit === '⌫';
          return (
            <button
              key={digit}
              id={`keypad-btn-${digit === '⌫' ? 'backspace' : digit === 'C' ? 'clear' : digit}`}
              type="button"
              disabled={disabled}
              onClick={() => handleKey(digit)}
              className={`h-14 sm:h-16 rounded-2xl font-jua text-2xl sm:text-3xl font-bold flex items-center justify-center transition-all duration-100 shadow-sm active:scale-95 active:shadow-inner select-none ${
                isSpecial
                  ? digit === 'C'
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300'
                    : 'bg-rose-100 hover:bg-rose-200 text-rose-800 border-2 border-rose-300'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-amber-400'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {digit === '⌫' ? <Delete className="w-7 h-7" /> : digit}
            </button>
          );
        })}
      </div>

      {/* Main Big Submit Button */}
      <button
        id="check-answer-submit-btn"
        type="button"
        disabled={disabled || submitDisabled}
        onClick={() => {
          if (!submitDisabled && !disabled) {
            onSubmit();
          }
        }}
        className={`w-full h-15 sm:h-16 rounded-2xl font-jua text-2xl sm:text-3xl text-white font-bold flex items-center justify-center gap-3 transition-all duration-150 shadow-md active:scale-98 ${
          submitDisabled || disabled
            ? 'bg-slate-300 text-slate-500 cursor-not-allowed border-2 border-slate-300'
            : 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 border-2 border-amber-600 shadow-amber-500/20'
        }`}
      >
        <CheckCircle2 className="w-7 h-7" />
        <span>정답 확인</span>
      </button>
    </div>
  );
};
