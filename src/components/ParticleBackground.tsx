import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  color: string;
}

export const ParticleBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let animationFrameId: number;
    let isRunning = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    // Pause canvas render loop when page/tab is hidden to save 100% CPU/battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          lastTime = performance.now();
          render(lastTime);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
      initParticles();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 110,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const container = canvas.parentElement || window;
    container.addEventListener('mousemove', handleMouseMove as any, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave as any, { passive: true });

    // Emerald, gold, and soft white particles
    const colors = ['#059669', '#10b981', '#34d399', '#d97706', '#f59e0b'];
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      // Lightweight particle count: Max 32 on desktop, max 16 on mobile for 120Hz smoothness
      const isMobile = width < 640;
      const particleCount = isMobile
        ? Math.min(Math.floor((width * height) / 30000), 16)
        : Math.min(Math.floor((width * height) / 22000), 32);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.8 + 1.2,
          baseAlpha: Math.random() * 0.3 + 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initParticles();

    let lastTime = performance.now();

    // Render loop with time-delta stabilization
    const render = (currentTime: number) => {
      if (!isRunning) return;

      const delta = Math.min((currentTime - lastTime) / 16.67, 2); // Normalized to 60fps frame
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      const maxDistance = 100;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Update position scaled by delta
        p1.x += p1.vx * delta;
        p1.y += p1.vy * delta;

        // Bounce on boundaries
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Interactive subtle mouse repulsion
        const dxMouse = p1.x - mouse.x;
        const dyMouse = p1.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (1 - distMouse / mouse.radius) * 0.6;
          p1.x += (dxMouse / distMouse) * force * 1.5;
          p1.y += (dyMouse / distMouse) * force * 1.5;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.baseAlpha;
        ctx.fill();

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#059669';
            ctx.globalAlpha = (1 - dist / maxDistance) * 0.12;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove as any);
      container.removeEventListener('mouseleave', handleMouseLeave as any);
    };
  }, []);

  return (
    <canvas
      id="particle-canvas"
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};
