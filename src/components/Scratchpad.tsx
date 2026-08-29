/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pen, Trash2, RotateCcw, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const Scratchpad: React.FC<ScratchpadProps> = ({ isOpen, onClose, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [penColor, setPenColor] = useState('#2563EB'); // Blue default
  const [penSize, setPenSize] = useState(4);

  const colors = [
    { label: '파랑', value: '#2563EB', bg: 'bg-blue-600' },
    { label: '검정', value: '#1E293B', bg: 'bg-slate-800' },
    { label: '빨강', value: '#DC2626', bg: 'bg-red-600' },
    { label: '초록', value: '#16A34A', bg: 'bg-green-600' },
  ];

  // Resize canvas according to container
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Support high DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [isOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : penColor;
    ctx.lineWidth = tool === 'eraser' ? 24 : penSize;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    sounds.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-xs ${className}`}>
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 w-full max-w-2xl flex flex-col overflow-hidden animate-pop-in h-[500px] max-h-[85vh]">
        {/* Header toolbar */}
        <div className="bg-amber-100 px-4 py-2.5 flex items-center justify-between border-b-2 border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <h3 className="font-jua text-lg sm:text-xl text-amber-900">쓱싹쓱싹 계산 연습장</h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Tool buttons */}
            <div className="flex items-center bg-white/80 rounded-xl p-1 border border-amber-300">
              <button
                id="scratchpad-pen-btn"
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setTool('pen');
                }}
                className={`p-1.5 rounded-lg flex items-center gap-1 text-xs sm:text-sm font-medium transition-all ${
                  tool === 'pen' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:bg-amber-50'
                }`}
                title="연필"
              >
                <Pen className="w-4 h-4" />
                <span className="hidden sm:inline">펜</span>
              </button>

              <button
                id="scratchpad-eraser-btn"
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setTool('eraser');
                }}
                className={`p-1.5 rounded-lg flex items-center gap-1 text-xs sm:text-sm font-medium transition-all ${
                  tool === 'eraser' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:bg-amber-50'
                }`}
                title="지우개"
              >
                <Eraser className="w-4 h-4" />
                <span className="hidden sm:inline">지우개</span>
              </button>
            </div>

            {/* Color buttons */}
            {tool === 'pen' && (
              <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-amber-300">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setPenColor(c.value);
                    }}
                    className={`w-6 h-6 rounded-full transition-transform ${c.bg} ${
                      penColor === c.value ? 'ring-2 ring-offset-1 ring-slate-800 scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            )}

            {/* Clear button */}
            <button
              id="scratchpad-clear-btn"
              type="button"
              onClick={clearCanvas}
              className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-xl transition-colors border border-rose-300"
              title="모두 지우기"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              id="scratchpad-close-btn"
              type="button"
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition-colors"
              title="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Canvas Area with grid background to help line up math columns */}
        <div className="flex-1 relative bg-[#FAFAF7] overflow-hidden touch-none cursor-crosshair">
          {/* Subtle math grid pattern */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(90deg, #CBD5E1 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full block relative z-10"
          />
          <div className="absolute bottom-2 right-3 text-xs text-slate-400 pointer-events-none select-none">
            손가락이나 마우스로 자유롭게 계산해보세요!
          </div>
        </div>
      </div>
    </div>
  );
};
