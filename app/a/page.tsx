
'use client';

import { Copy, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function GitReadmeLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      {/* Animated gradient background */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
        }}
      />
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 md:px-12 md:py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className={`flex items-center gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center font-mono text-sm font-bold shadow-lg shadow-blue-500/20">
              .md
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              gitreadme.md
            </span>
          </div>
          
          <div className={`flex items-center gap-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Features</a>
            <button className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center pt-20 md:pt-32 pb-20">
            {/* Badge */}
            <div className={`mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-medium text-blue-400 inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                Professional README Generator
              </span>
            </div>

            {/* Main Heading */}
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="bg-gradient-to-br from-[white] via-gray-300 to-gray-800 bg-clip-text text-transparent">
                Beautiful READMEs
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                In Seconds
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Transform your GitHub repositories with stunning, professional README files. 
              No design skills required. Just smart automation and beautiful templates.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-20 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Link href={`/sign-in`} className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-base font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                Generate README
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-base font-medium transition-all duration-300 hover:scale-105">
                View Examples
              </button>
            </div>

            {/* Preview Window */}
            <div className={`w-full max-w-5xl transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 to-cyan-400/50 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                {/* Terminal Window */}
                <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Terminal Header */}
                  <div className="bg-[#0f0f0f] border-b border-white/5 px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="ml-4 text-xs text-gray-500 font-mono">README.md</span>
                  </div>
                  
                  {/* Terminal Content */}
                  <div className="p-8 font-mono text-sm">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none">1</span>
                        <div>
                          <span className="text-purple-400">#</span>
                          <span className="text-blue-400"> Project Name</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none">2</span>
                        <div className="h-px"></div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none">3</span>
                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300 text-xs">npm</span>
                          <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-green-300 text-xs">TypeScript</span>
                          <span className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-300 text-xs">React</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none">4</span>
                        <div className="h-px"></div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none">5</span>
                        <div>
                          <span className="text-purple-400">##</span>
                          <span className="text-gray-300"> Description</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none">6</span>
                        <span className="text-gray-400">A modern, blazing-fast web application...</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none">7</span>
                        <div className="h-px"></div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none">8</span>
                        <div>
                          <span className="text-purple-400">##</span>
                          <span className="text-gray-300"> Installation</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none">9</span>
                        <div className="bg-black/40 px-3 py-2 rounded border border-white/5">
                          <span className="text-cyan-400">npm install</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="py-20">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '⚡',
                  title: 'Lightning Fast',
                  description: 'Generate professional READMEs in seconds with AI-powered automation'
                },
                {
                  icon: '🎨',
                  title: 'Beautiful Templates',
                  description: 'Choose from dozens of professionally designed templates that match your project'
                },
                {
                  icon: '🔧',
                  title: 'Fully Customizable',
                  description: 'Edit and customize every section to perfectly fit your needs'
                },
                {
                  icon: '📊',
                  title: 'Auto-detect Tech',
                  description: 'Automatically detects your tech stack and generates relevant badges'
                },
                {
                  icon: '🚀',
                  title: 'One-Click Deploy',
                  description: 'Export and push directly to your GitHub repository'
                },
                {
                  icon: '💎',
                  title: 'Premium Quality',
                  description: 'Professional-grade documentation that impresses contributors'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:scale-105 hover:border-blue-500/30"
                  style={{
                    animation: isVisible ? `fadeInUp 0.6s ease-out ${0.7 + index * 0.1}s both` : 'none'
                  }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
<DemoSection/>
          {/* CTA Section */}
          <div className="py-20 text-center">
            <div className="max-w-3xl mx-auto p-12 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 border border-blue-500/20 rounded-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to elevate your repos?
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                Join thousands of developers creating stunning documentation
              </p>
              <Link href={`/sign-in`} className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center font-mono text-xs font-bold">
                .md
              </div>
              <span className="text-sm text-gray-400">© 2024 gitreadme.md</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

const DemoSection = () => (
  <section className="py-24 border-y rounded-2xl mx-10 border-slate-800 bg-slate-950/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">See the difference</h2>
          <p className="text-slate-400">Transform bare-bones repositories into professional portfolios.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm font-mono text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
          <span>preview_mode: enabled</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Before */}
        <div className="rounded-xl border border-red-900/30 bg-red-950/5 p-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-xs font-bold text-red-500 bg-red-900/20 px-2 py-1 rounded border border-red-900/50">BEFORE</div>
          <div className="space-y-4 opacity-50 font-mono text-sm">
            <div className="h-4 bg-slate-800 w-1/3 rounded"></div>
            <div className="h-4 bg-slate-800 w-3/4 rounded"></div>
            <div className="h-32 bg-slate-800/50 w-full rounded border border-slate-800 border-dashed flex items-center justify-center text-slate-600">
              No badges, no structure, no install guide...
            </div>
          </div>
        </div>

        {/* After */}
        <div className="rounded-xl border border-green-500/30 bg-slate-900 p-6 relative shadow-2xl">
          <div className="absolute -top-[1px] -left-[1px] -right-[1px] h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
          <div className="absolute top-4 right-4 text-xs font-bold text-green-400 bg-green-900/20 px-2 py-1 rounded border border-green-900/50 flex items-center gap-1">
             <Zap className="w-3 h-3" /> GENERATED
          </div>
          
          <div className="font-mono text-sm space-y-4">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">🚀 Nexus API</h1>
              <p className="text-slate-400">High-performance scalable gateway service built with Go and gRPC.</p>
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-0.5 bg-[#00ADD8]/20 text-[#00ADD8] rounded text-xs border border-[#00ADD8]/30">Go 1.21</span>
              <span className="px-2 py-0.5 bg-[#2496ED]/20 text-[#2496ED] rounded text-xs border border-[#2496ED]/30">Docker</span>
              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs border border-green-500/30">Passing</span>
            </div>

            {/* Code Block */}
            <div className="bg-[#0D1117] p-4 rounded-lg border border-slate-800 relative group cursor-pointer hover:border-slate-700 transition-colors">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Copy className="h-4 w-4 text-slate-500" />
              </div>
              <div className="flex gap-2 mb-2 border-b border-slate-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              </div>
              <code className="text-xs text-blue-300">
                <span className="text-purple-400">$</span> git clone https://github.com/user/nexus-api<br/>
                <span className="text-purple-400">$</span> cd nexus-api<br/>
                <span className="text-purple-400">$</span> make run
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

