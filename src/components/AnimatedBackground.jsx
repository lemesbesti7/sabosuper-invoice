import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 150;
const MOUSE_ATTRACT_DISTANCE = 200;
const MOUSE_ATTRACT_STRENGTH = 0.02;
const DRIFT_SPEED = 0.3;

function createParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * DRIFT_SPEED,
    vy: (Math.random() - 0.5) * DRIFT_SPEED,
    size: 1 + Math.random() * 2,
    phase: Math.random() * Math.PI * 2,
    oscillationSpeed: 0.005 + Math.random() * 0.01,
    oscillationAmplitude: 0.2 + Math.random() * 0.3,
    isCyan: Math.random() < 0.15, // ~15% cyan highlights
  };
}

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    // Initialize particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height)
    );

    // Mouse tracking (passive)
    function onMouseMove(e) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }
    function onMouseLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('resize', resize);

    function animate(time) {
      const w = canvas.width;
      const h = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic oscillation
        p.phase += p.oscillationSpeed;
        const oscX = Math.sin(p.phase) * p.oscillationAmplitude;
        const oscY = Math.cos(p.phase * 0.7) * p.oscillationAmplitude;

        p.x += p.vx + oscX;
        p.y += p.vy + oscY;

        // Mouse attraction
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_ATTRACT_DISTANCE && dist > 0) {
          const force = (1 - dist / MOUSE_ATTRACT_DISTANCE) * MOUSE_ATTRACT_STRENGTH;
          p.x += dx * force;
          p.y += dy * force;
        }

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw particle
        const alpha = p.isCyan ? 0.6 : 0.3 + Math.sin(p.phase) * 0.15;
        const color = p.isCyan ? '6, 182, 212' : '139, 92, 246';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.3;
            // Use cyan if either endpoint is cyan
            const isCyanLink = a.isCyan || b.isCyan;
            const color = isCyanLink ? '6, 182, 212' : '139, 92, 246';
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* Gradient animation layer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2,
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 25%, #0a0a0f 50%, #0a1a2e 75%, #0a0a0f 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite',
          willChange: 'transform',
        }}
      />
      {/* Canvas neural mesh */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}
