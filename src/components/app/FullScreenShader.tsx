'use client';

import { useEffect, useRef } from 'react';
import { useSettings } from '@/contexts/settings-context';

export interface FullScreenShaderProps {
  speed?: number;
  className?: string;
}

export function FullScreenShader({ speed = 1, className = '' }: FullScreenShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { settings } = useSettings();
  const animationId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      time += 0.01 * speed * settings.animationSpeed;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create shader-like gradient effect
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Dynamic gradient
      const gradient = ctx.createRadialGradient(
        centerX + Math.sin(time) * 100,
        centerY + Math.cos(time * 0.8) * 80,
        0,
        centerX,
        centerY,
        Math.max(canvas.width, canvas.height)
      );
      
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add flowing lines effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const offset = time * (0.5 + i * 0.2);
        
        for (let x = 0; x < canvas.width; x += 10) {
          const y = centerY + Math.sin(x * 0.01 + offset) * 50 * Math.sin(time * 0.5 + i);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      
      animationId.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [speed, settings.animationSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        background: 'transparent',
      }}
    />
  );
}