'use client';

import { toastError } from '@/lib/toast';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, CircleDashed, Eye, EyeOff, FileText, Github, LockKeyhole, ScanLine, Sparkles } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type ScanState = 'idle' | 'scanning' | 'ready';

export default function DashboardPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [repoName, setRepoName] = useState('your repository');
  const [privateAccess, setPrivateAccess] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [showToken, setShowToken] = useState(false);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (scanState !== 'idle') return;

    try {
      if (!url) throw new Error('Please enter a GitHub URL');
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname !== 'github.com') throw new Error('Only GitHub repository URLs are allowed');
      const parts = parsedUrl.pathname.replace(/^\/|\/$/g, '').split('/');
      if (parts.length < 2 || !parts[0] || !parts[1]) throw new Error('Please enter a valid GitHub repository URL');
      if (privateAccess && !accessToken.trim()) throw new Error('Add a GitHub token to scan a private repository');

      const destination = `${parts[0]}/${parts[1]}/`;
      setRepoName(`${parts[0]}/${parts[1]}`);
      if (privateAccess) {
        sessionStorage.setItem('readme-md-private-access', JSON.stringify({ token: accessToken.trim(), repo: `${parts[0]}/${parts[1]}` }));
      }
      setScanState('scanning');
      await new Promise((resolve) => setTimeout(resolve, 1150));
      setScanState('ready');
      await new Promise((resolve) => setTimeout(resolve, 850));
      router.push(destination);
    } catch (error) {
      toastError(error instanceof Error ? error.message : 'Invalid URL format');
    }
  }

  const isScanning = scanState !== 'idle';

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08090a] text-[#e5e5e6]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(228,242,34,0.06),transparent_64%)]" />
      <header className="relative z-20 flex h-16 items-center justify-between border-b border-white/[0.07] px-5">
        <div className="flex items-center gap-2.5 text-[15px] font-medium text-white"><span className="grid size-6 place-items-center rounded-[5px] border border-white/15 bg-white/[0.06] text-[11px] tracking-[-0.08em]">.md</span> readme.md</div>
        <span className="font-mono text-[11px] text-[#62666d]">NEW DOCUMENTATION</span>
      </header>

      <AnimatePresence mode="wait">
        {!isScanning && (
          <motion.div key="intro" className="absolute inset-x-5 top-[20%] mx-auto max-w-xl text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45 }}>
            <div className="mx-auto mb-6 grid size-10 place-items-center rounded-md border border-white/[0.1] bg-white/[0.03] text-[#e4f222]"><Sparkles size={18} /></div>
            <p className="mb-4 font-mono text-[12px] text-[#8a8f98]">START WITH THE SOURCE</p>
            <h1 className="text-balance text-[40px] font-[510] leading-[1.02] tracking-[-0.045em] text-white sm:text-[52px]">Make a README worth reading.</h1>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-6 text-[#8a8f98]">Paste a public repository URL. We’ll map the codebase and build a useful first draft.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed z-30 w-[calc(100%-2.5rem)] max-w-[620px]"
        initial={{ top: '50%', right: '50%', x: '50%', y: '-10%', scale: 0.98, opacity: 0 }}
        animate={isScanning
          ? { top: '88px', right: '24px', x: 0, y: 0, scale: 0.82, opacity: 1 }
          : { top: '50%', right: '50%', x: '50%', y: '-10%', scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 27, mass: 0.9 }}
      >
        <form onSubmit={submitForm} className="rounded-xl border border-[#383b3f] bg-[#0f1011] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-2 rounded-lg bg-[#08090a] p-1.5">
            <Github className="ml-2 shrink-0 text-[#8a8f98]" size={18} />
            <input
              aria-label="GitHub repository URL"
              type="url"
              value={url}
              disabled={isScanning}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="github.com/owner/repository"
              className="min-w-0 flex-1 bg-transparent px-2 py-2 text-[14px] text-white outline-none placeholder:text-[#62666d] disabled:cursor-default"
            />
            <button type="submit" disabled={isScanning} className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#e4f222] px-3.5 py-2.5 text-[13px] font-medium text-[#08090a] transition hover:bg-[#effa48] disabled:cursor-default">
              {scanState === 'idle' ? <>Generate <ArrowRight size={15} /></> : scanState === 'scanning' ? <><CircleDashed className="animate-spin" size={15} /> Scanning</> : <><Check size={15} /> Ready</>}
            </button>
          </div>
          <AnimatePresence initial={false}>
            {!isScanning && privateAccess && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2">
                <LockKeyhole size={15} className="shrink-0 text-[#e4f222]" />
                <input aria-label="GitHub personal access token" type={showToken ? 'text' : 'password'} value={accessToken} onChange={(event) => setAccessToken(event.target.value)} placeholder="GitHub token with repository read access" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-[#62666d]" />
                <button type="button" aria-label={showToken ? 'Hide token' : 'Show token'} onClick={() => setShowToken((visible) => !visible)} className="text-[#8a8f98] transition hover:text-white">{showToken ? <EyeOff size={15} /> : <Eye size={15} />}</button>
              </div>
            </motion.div>}
          </AnimatePresence>
          {!isScanning && <div className="flex items-center justify-between px-2 pb-1 pt-2 text-[11px] text-[#62666d]"><button type="button" onClick={() => setPrivateAccess((enabled) => !enabled)} className="flex items-center gap-1.5 transition hover:text-[#d0d6e0]"><span className={`grid size-3.5 place-items-center rounded border ${privateAccess ? 'border-[#e4f222] bg-[#e4f222] text-[#08090a]' : 'border-[#62666d]'}`}>{privateAccess && <Check size={10} strokeWidth={3} />}</span> Private repository</button><span>{privateAccess ? 'Token is used only for this scan.' : 'Public repositories need no token.'}</span></div>}
        </form>
      </motion.div>

      <AnimatePresence>
        {isScanning && <motion.section className="mx-auto max-w-[640px] px-5 pb-16 pt-44" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.28, duration: 0.4 }}>
          <div className="mb-7 flex items-center justify-between"><div><p className="font-mono text-[11px] text-[#62666d]">REPOSITORY ANALYSIS</p><h2 className="mt-2 text-[21px] font-medium tracking-[-0.025em] text-white">{repoName}</h2></div><span className={`rounded px-2 py-1 font-mono text-[11px] ${scanState === 'ready' ? 'bg-[#e4f222]/10 text-[#e4f222]' : 'bg-white/[0.05] text-[#8a8f98]'}`}>{scanState === 'ready' ? 'COMPLETE' : 'IN PROGRESS'}</span></div>
          <div className="overflow-hidden rounded-xl border border-[#23252a] bg-[#0f1011]">
            <ScanRow icon={<ScanLine size={16} />} label="Reading repository structure" done={scanState === 'ready'} active={scanState === 'scanning'} />
            <ScanRow icon={<FileText size={16} />} label="Finding scripts and dependencies" done={scanState === 'ready'} active={scanState === 'scanning'} delay="delay-150" />
            <ScanRow icon={<Sparkles size={16} />} label="Drafting your documentation" done={scanState === 'ready'} active={scanState === 'scanning'} delay="delay-300" last />
          </div>
          <motion.p className="mt-5 text-center text-[13px] text-[#62666d]" animate={{ opacity: scanState === 'ready' ? 1 : 0.6 }}>{scanState === 'ready' ? 'Opening your editable README…' : 'Looking for the details that matter.'}</motion.p>
        </motion.section>}
      </AnimatePresence>

      {!isScanning && <div className="absolute inset-x-5 bottom-10 mx-auto flex max-w-xl items-center justify-center gap-5 text-[12px] text-[#62666d]"><span className="flex items-center gap-1.5"><Check size={13} className="text-[#e4f222]" />Public repositories</span><span className="flex items-center gap-1.5"><Check size={13} className="text-[#e4f222]" />Editable Markdown</span><span className="flex items-center gap-1.5"><Check size={13} className="text-[#e4f222]" />No setup</span></div>}
    </main>
  );
}

function ScanRow({ icon, label, done, active, delay = '', last = false }: { icon: React.ReactNode; label: string; done: boolean; active: boolean; delay?: string; last?: boolean }) {
  return <div className={`flex items-center gap-3 px-4 py-4 ${last ? '' : 'border-b border-[#23252a]'}`}><span className="text-[#8a8f98]">{icon}</span><span className="flex-1 text-[13px] text-[#d0d6e0]">{label}</span>{done ? <Check size={16} className="text-[#e4f222]" /> : <span className={`size-2 rounded-full bg-[#62666d] ${active ? `animate-pulse ${delay}` : ''}`} />}</div>;
}
