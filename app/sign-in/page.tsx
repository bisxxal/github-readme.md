'use client'
import { GraduationCap, ArrowLeft, Shield} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

const SignInPage = () => {
  const { data, status } = useSession();

  const router = useRouter()
  if (data?.user && status === 'authenticated') {
    router.push('/home');
  }
 
  return (
    <div className="min-h-screen flex text-[#111827]"  >

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            className="flex absolute top-10 left-10   bg-[#ffffff1a] rounded-full p-2   group"
            onClick={() => window.history.back()}
          >
            <ArrowLeft fill='white' size={20} className=" group-hover:-translate-x-1 transition-transform duration-300" />
          </button>

          {/* Logo and Title */}
          <div className="text-center mb-8 appeartext ">
            <div className="flex items-center justify-center mb-6">
              <Link href={'/'} className=" w-16 h-16 buttonbg text-4xl rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300">
                🤖
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-red-400">Sign in to your README.MD account</p>
          </div>

          {/* Sign In Card */}
          <div className="  bg-gradient-to-r from-amber-500/20 to-red-500/20  rounded-2xl border border-amber-500 p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-amber-500 mb-2">Sign in with Google</h2>
              <p className="text-gray-400 text-sm">Access your dashboard securely</p>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={() => signIn('google')}
              className={`w-full flex items-center justify-center px-6 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg  
                }`}
            >

              <>
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>

            </button>

            {/* Security Note */}
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-500   to-red-500  bg-opacity-10 border border-purple-500 border-opacity-30 rounded-xl">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-100 font-medium mb-1">Secure Authentication</p>
                  <p className="text-xs text-gray-200">We use Google OAuth 2.0 for secure access. Your Google password is never shared with us.</p>
                </div>
              </div>
            </div>

          </div>


          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-6 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default SignInPage;




// 'use client';

// import { useEffect, useRef, useState } from 'react';

// export default function SignInPage() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const particles: Array<{
//       x: number;
//       y: number;
//       vx: number;
//       vy: number;
//       size: number;
//     }> = [];

//     for (let i = 0; i < 40; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.3,
//         vy: (Math.random() - 0.5) * 0.3,
//         size: Math.random() * 2 + 0.5,
//       });
//     }

//     function animate() {
//       if (!ctx || !canvas) return;
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       particles.forEach((particle) => {
//         particle.x += particle.vx;
//         particle.y += particle.vy;

//         if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
//         if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

//         ctx.beginPath();
//         ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
//         ctx.fillStyle = 'rgba(136, 192, 208, 0.25)';
//         ctx.fill();
//       });

//       particles.forEach((p1, i) => {
//         particles.slice(i + 1).forEach((p2) => {
//           const dx = p1.x - p2.x;
//           const dy = p1.y - p2.y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < 120) {
//             ctx.beginPath();
//             ctx.moveTo(p1.x, p1.y);
//             ctx.lineTo(p2.x, p2.y);
//             ctx.strokeStyle = `rgba(136, 192, 208, ${0.1 * (1 - distance / 120)})`;
//             ctx.lineWidth = 0.5;
//             ctx.stroke();
//           }
//         });
//       });

//       requestAnimationFrame(animate);
//     }

//     animate();

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleGoogleSignIn = () => {
//     // Handle Google OAuth sign in
//     console.log('Google sign in clicked');
//     // Add your OAuth logic here
//   };

//   return (
//     <div className="relative min-h-screen bg-[#0d1117] overflow-hidden flex items-center justify-center">
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 pointer-events-none"
//         style={{ opacity: 0.5 }}
//       />

//       {/* Animated gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] opacity-90" />
      
//       {/* Grid pattern */}
//       <div 
//         className="absolute inset-0 opacity-[0.02]"
//         style={{
//           backgroundImage: `
//             linear-gradient(#58a6ff 1px, transparent 1px),
//             linear-gradient(90deg, #58a6ff 1px, transparent 1px)
//           `,
//           backgroundSize: '60px 60px',
//         }}
//       />

//       {/* Floating decorative elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div 
//           className="absolute top-[15%] left-[10%] animate-float-slow opacity-5"
//           style={{
//             transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
//           }}
//         >
//           <GitHubIconOutline className="w-64 h-64" />
//         </div>
//         <div 
//           className="absolute bottom-[10%] right-[8%] animate-float-slower opacity-5"
//           style={{
//             transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * 0.02}px)`,
//           }}
//         >
//           <GitHubIconOutline className="w-80 h-80" />
//         </div>
//         <div 
//           className="absolute top-[50%] right-[15%] animate-float opacity-5"
//           style={{
//             transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * -0.015}px)`,
//           }}
//         >
//           <CodePattern className="w-48 h-48" />
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="relative z-10 w-full max-w-md px-6">
//         {/* Sign in card */}
//         <div className="relative group">
//           {/* Glow effect */}
//           <div className="absolute -inset-0.5 bg-gradient-to-r from-[#58a6ff] via-[#88c0d0] to-[#a3be8c] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
          
//           <div className="relative bg-[#161b22] border border-[#30363d] rounded-2xl p-8 backdrop-blur-sm animate-fade-in-up">
//             {/* Logo and branding */}
//             <div className="text-center space-y-6 mb-8">
//               <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#58a6ff]/20 to-[#88c0d0]/20 border border-[#30363d] animate-pulse-slow">
//                 <svg className="w-12 h-12 text-[#58a6ff]" viewBox="0 0 24 24" fill="currentColor">
//                   <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
//                 </svg>
//               </div>
              
//               <div className="space-y-2">
//                 <h1 className="text-3xl font-black tracking-tight">
//                   <span className="bg-gradient-to-r from-[#58a6ff] via-[#88c0d0] to-[#a3be8c] bg-clip-text text-transparent">
//                     gitreadme.md
//                   </span>
//                 </h1>
//                 <p className="text-[#8b949e] text-sm font-mono">
//                   AI-powered README generation
//                 </p>
//               </div>
//             </div>

//             {/* Divider with text */}
//             <div className="relative mb-8">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-[#30363d]" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-[#161b22] text-[#8b949e] font-medium">
//                   Sign in to continue
//                 </span>
//               </div>
//             </div>

//             {/* Google Sign In Button */}
//             <button
//               onClick={handleGoogleSignIn}
//               className="group relative w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
//             >
//               {/* Animated gradient background */}
//               <div className="absolute inset-0 bg-gradient-to-r from-[#58a6ff] to-[#88c0d0] transition-transform duration-300" />
//               <div className="absolute inset-0 bg-gradient-to-r from-[#88c0d0] to-[#a3be8c] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
//               {/* Button content */}
//               <div className="relative z-10 flex items-center gap-3 text-[#0d1117]">
//                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#0d1117"/>
//                   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#0d1117"/>
//                   <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#0d1117"/>
//                   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#0d1117"/>
//                 </svg>
//                 <span className="font-bold">Continue with Google</span>
//               </div>
              
//               {/* Shine effect */}
//               <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
//             </button>

//             {/* Security badge */}
//             <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#8b949e]">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//               <span className="font-medium">Secure OAuth 2.0 authentication</span>
//             </div>

//             {/* Privacy notice */}
//             <div className="mt-8 pt-6 border-t border-[#30363d]">
//               <p className="text-xs text-center text-[#8b949e] leading-relaxed">
//                 By signing in, you agree to our{' '}
//                 <a href="#" className="text-[#58a6ff] hover:underline transition-colors">
//                   Terms of Service
//                 </a>{' '}
//                 and{' '}
//                 <a href="#" className="text-[#58a6ff] hover:underline transition-colors">
//                   Privacy Policy
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Additional info */}
//         <div className="mt-8 text-center space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
//           <div className="flex items-center justify-center gap-2 text-sm text-[#8b949e]">
//             <div className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
//             <span className="font-mono">Ready to generate amazing READMEs</span>
//           </div>
          
//           <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#6e7681]">
//             <div className="flex items-center gap-1">
//               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
//               </svg>
//               <span>AI-Powered</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//               <span>Lightning Fast</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//               <span>100% Secure</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(3deg); }
//         }
//         @keyframes float-slow {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-30px) rotate(-3deg); }
//         }
//         @keyframes float-slower {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-40px) rotate(5deg); }
//         }
//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.7; }
//         }
//         .animate-float { animation: float 8s ease-in-out infinite; }
//         .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
//         .animate-float-slower { animation: float-slower 12s ease-in-out infinite; }
//         .animate-fade-in-up { animation: fade-in-up 0.8s ease-out backwards; }
//         .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
//       `}</style>
//     </div>
//   );
// }

// function GitHubIconOutline({ className }: { className?: string }) {
//   return (
//     <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path
//         d="M50 10C27.909 10 10 27.909 10 50c0 17.7 11.45 32.7 27.325 38 2 .367 2.725-.867 2.725-1.917 0-.95-.033-3.467-.05-6.8-11.133 2.417-13.483-5.367-13.483-5.367-1.817-4.617-4.433-5.85-4.433-5.85-3.625-2.483.275-2.433.275-2.433 4.008.283 6.117 4.117 6.117 4.117 3.567 6.1 9.35 4.35 11.625 3.317.358-2.583 1.392-4.35 2.533-5.35-8.883-1-18.208-4.442-18.208-19.767 0-4.367 1.558-7.933 4.117-10.733-.417-1.008-1.783-5.067.383-10.567 0 0 3.35-1.075 11 4.1a38.233 38.233 0 0110.017-1.35c3.4.017 6.825.458 10.017 1.35 7.642-5.175 11-4.1 11-4.1 2.167 5.5.808 9.559.392 10.567 2.567 2.8 4.108 6.366 4.108 10.733 0 15.367-9.35 18.742-18.258 19.725 1.433 1.242 2.708 3.675 2.708 7.408 0 5.35-.042 9.658-.042 10.975 0 1.067.717 2.308 2.742 1.917C78.558 82.683 90 67.692 90 50c0-22.091-17.909-40-40-40z"
//         stroke="#30363d"
//         strokeWidth="1.5"
//         fill="none"
//       />
//     </svg>
//   );
// }

// function CodePattern({ className }: { className?: string }) {
//   return (
//     <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path
//         d="M20 30L35 50L20 70M45 30L60 50L45 70M70 30L85 50L70 70"
//         stroke="#30363d"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M30 20h40M30 40h40M30 60h40M30 80h40"
//         stroke="#30363d"
//         strokeWidth="1"
//         strokeLinecap="round"
//         opacity="0.3"
//       />
//     </svg>
//   );
// }