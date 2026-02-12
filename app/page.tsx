'use client';
import { Sparkles, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(136, 192, 208, 0.3)';
        ctx.fill();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(136, 192, 208, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#000000] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.4 }}
      />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#070a0d] via-[#222933] to-[#070a0d] opacity-90" />


      {/* Floating 3D GitHub Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[10%] left-[15%] animate-float-slow"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        >
          <img height={90} width={90} src="https://cdn3d.iconscout.com/3d/free/thumb/free-github-3d-icon-png-download-12387846.png" alt="" />
        </div>

        <div
          className="absolute top-[25%] right-[25%] animate-float-slow"
          style={{
            transform: `translate(${mousePosition.x * -0.025}px, ${mousePosition.y * -0.025}px)`,
          }}
        >
          <img height={90} width={90} src="https://cdn3d.iconscout.com/3d/free/thumb/free-github-3d-icon-png-download-12387846.png" alt="" />

        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="  mx-auto text-center space-y-12">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#30363d] bg-[#0d1117]/80 backdrop-blur-sm animate-slide-down">
            <div className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
            <span className="text-sm font-mono text-[#88c0d0]">
              AI-Powered README Generation
            </span>
          </div>

          {/* Main heading with glitch effect */}
          <div className="space-y-6 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
              <span className="inline-block bg-gradient-to-r from-purple-500   to-indigo-700 bg-clip-text text-transparent animate-gradient-shift">
                Didn&apos;t Know
              </span>
              <br />
              <span className="inline-block text-[#c9d1d9] mt-2">What to Write</span>
              <br />
              <span className="inline-block bg-gradient-to-r from-[#a3be8c] via-[#ebcb8b] to-[#d08770] bg-clip-text text-transparent animate-gradient-shift-reverse mt-2">
                in README?</span>
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#8b949e] max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Stop staring at a blank screen. Let our AI Agents generate a
            <span className="text-[#a3be8c] font-semibold"> beautiful  </span>
            <span className="text-[#ebcb8b] font-semibold">GitHub README</span>{' '}for your entire
            <span className="text-[#58a6ff] font-semibold"> codebase </span>
            in seconds.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={'/sign-in'} className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <Sparkles size={20} />
              Generate Now
            </Link>

            <button className="group px-8 py-4 rounded-full font-bold text-lg border-2 border-[#30363d] bg-transparent text-[#c9d1d9] hover:border-[#58a6ff] hover:bg-[#58a6ff]/10 transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </span>
            </button>
          </div>


          <div className="mt-20 relative    ">
            <div className="bg-[#161b22] border border-[#30363d] p-1 rounded-xl shadow-2xl   hover:rotate-0 transition-all duration-700 ease-out">
              <div className="bg-[#0d1117] rounded-lg p-6 text-left font-mono text-sm border border-white/5">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <p className="text-green-400">$ npx readme-agent --analyze .</p>
                <p className="text-blue-300">✔ Repository indexed</p>
                <p className="text-blue-300">✔ Tech stack detected (Next.js 16 + TS)</p>
                <p className="text-purple-400">✔ Crafting something crazy...</p>
              </div>
            </div>
          </div>
 
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(8deg); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-shift-reverse {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 10s ease-in-out infinite; }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out backwards; }
        .animate-gradient-shift { 
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-gradient-shift-reverse { 
          background-size: 200% 200%;
          animation: gradient-shift-reverse 8s ease infinite;
        }
      `}</style>
    </div>
  );
}

