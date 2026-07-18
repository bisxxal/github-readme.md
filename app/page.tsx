'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleCheck,
  Code2,
  Copy,
  FileCode2,
  Github,
  Layers2,
  Sparkles,
  WandSparkles,
} from 'lucide-react';

const codeLines = [
  ['1', '# ', 'acme/velocity'],
  ['2', '', ''],
  ['3', '> ', 'An opinionated starter for shipping faster.'],
  ['4', '', ''],
  ['5', '## ', 'What’s inside'],
  ['6', '', '• Type-safe API layer'],
  ['7', '', '• Auth and database included'],
  ['8', '', '• Deploy in minutes'],
  ['9', '', ''],
  ['10', '## ', 'Quick start'],
];

function Mark() {
  return (
    <span className="grid size-6 place-items-center rounded-[5px] border border-white/15 bg-white/[0.06] text-[11px] font-medium tracking-[-0.08em] text-white">
      .md
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08090a] text-[#e5e5e6]">
      <nav className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#08090a]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 lg:px-0">
          <Link href="/" className="flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.02em] text-white">
            <Mark />
            readme.md
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            <a href="#how-it-works" className="px-3 py-2 text-[13px] text-[#8a8f98] transition hover:text-white">How it works</a>
            <a href="#examples" className="px-3 py-2 text-[13px] text-[#8a8f98] transition hover:text-white">Examples</a>
            <a href="#features" className="px-3 py-2 text-[13px] text-[#8a8f98] transition hover:text-white">Features</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="hidden text-[13px] text-[#d0d6e0] transition hover:text-white sm:block">Sign in</Link>
            <Link href="/sign-in" className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-[#08090a] transition hover:bg-[#e5e5e6]">Get started</Link>
          </div>
        </div>
      </nav>

      <section className="relative mx-auto max-w-[1200px] px-5 pb-12 pt-20 lg:px-0 lg:pt-28">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[440px] bg-[linear-gradient(180deg,rgba(8,9,10,0)_5%,rgba(110,115,120,0.22)_100%)]" />
        <div className="relative">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.025] px-3 py-1.5 text-[12px] text-[#d0d6e0]">
            <span className="size-1.5 rounded-full bg-[#e4f222]" />
            Documentation, generated from your codebase
          </div>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[760px]">
              <h1 className="text-balance text-[50px] font-[510] leading-[0.95] tracking-[-0.05em] text-white sm:text-[72px] lg:text-[84px]">
                Your repository has a story. Let it tell it.
              </h1>
            </div>
            <p className="max-w-[270px] pb-1 text-[16px] leading-6 tracking-[-0.01em] text-[#8a8f98]">
              Turn any GitHub codebase into a clear, thoughtful README—without starting from a blank page.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/sign-in" className="inline-flex items-center gap-2 rounded-md bg-[#e4f222] px-4 py-2.5 text-[14px] font-medium text-[#08090a] transition hover:bg-[#effa48]">
              Generate a README <ArrowRight size={16} />
            </Link>
            <a href="#how-it-works" className="inline-flex items-center gap-1 text-[14px] text-[#d0d6e0] transition hover:text-white">
              See how it works <ChevronRight size={15} />
            </a>
          </div>

          <ProductPreview />
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0b0c0d]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-12 gap-y-6 px-5 py-7 lg:px-0">
          <p className="text-[13px] text-[#62666d]">Built for repositories that deserve better than a blank README.</p>
          <div className="flex flex-wrap items-center gap-x-9 gap-y-3 font-mono text-[13px] text-[#8a8f98]">
            <span>Next.js</span><span>TypeScript</span><span>Python</span><span>Go</span><span>Rust</span><span>React</span>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-[1200px] px-5 py-28 lg:px-0">
        <div className="grid gap-12 border-b border-white/[0.07] pb-20 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="mb-4 font-mono text-[12px] text-[#8a8f98]">01 — CONTEXT, NOT GUESSWORK</p>
            <h2 className="max-w-xs text-[34px] font-[510] leading-[1.05] tracking-[-0.035em] text-white">It reads the code before it writes.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <InfoCard icon={<Github size={18} />} title="Connect a repository" text="Paste a public GitHub URL. Nothing to install." />
            <InfoCard icon={<Layers2 size={18} />} title="Map the project" text="We inspect structure, dependencies, scripts, and intent." />
            <InfoCard icon={<WandSparkles size={18} />} title="Review the draft" text="Get an editable README that sounds like your project." />
          </div>
        </div>
      </section>

      <section id="examples" className="mx-auto max-w-[1200px] px-5 pb-28 lg:px-0">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-mono text-[12px] text-[#8a8f98]">02 — A CLEARER FIRST IMPRESSION</p>
            <h2 className="text-[38px] font-[510] leading-none tracking-[-0.04em] text-white sm:text-[48px]">From source files to signal.</h2>
          </div>
          <p className="max-w-[260px] text-[14px] leading-5 text-[#8a8f98]">The important parts, in the order a new contributor needs them.</p>
        </div>
        <div className="grid overflow-hidden rounded-xl border border-[#23252a] bg-[#0f1011] md:grid-cols-2">
          <div className="border-b border-[#23252a] p-5 md:border-b-0 md:border-r sm:p-7">
            <div className="mb-8 flex items-center justify-between"><span className="font-mono text-[12px] text-[#62666d]">repository / analysis</span><span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-[11px] text-[#8a8f98]">scanning</span></div>
            <div className="space-y-2 font-mono text-[13px]">
              {['src', '  app', '  components', 'package.json', 'README.md'].map((item, i) => <div key={item} className="flex items-center gap-3 text-[#8a8f98]"><span className="w-4 text-right text-[#383b3f]">{i + 1}</span><Code2 size={14} className={i === 3 ? 'text-[#e4f222]' : 'text-[#62666d]'} /><span>{item}</span></div>)}
            </div>
            <div className="mt-9 space-y-3 border-t border-white/[0.07] pt-5">
              {['Next.js 16', 'TypeScript', 'Tailwind CSS'].map((item) => <div key={item} className="flex items-center gap-2 text-[13px] text-[#d0d6e0]"><CircleCheck size={14} className="text-[#e4f222]" /> {item} detected</div>)}
            </div>
          </div>
          <div className="bg-[#0b0c0d] p-5 sm:p-7">
            <div className="mb-7 flex items-center justify-between"><span className="font-mono text-[12px] text-[#62666d]">README.md</span><button className="flex items-center gap-1.5 text-[12px] text-[#8a8f98] transition hover:text-white"><Copy size={13} /> Copy</button></div>
            <div className="space-y-2 font-mono text-[13px] leading-6">
              {codeLines.map(([num, syntax, text]) => <div key={num} className="flex gap-3"><span className="w-4 select-none text-right text-[#383b3f]">{num}</span><span className={syntax ? 'text-[#e4f222]' : 'text-[#d0d6e0]'}>{syntax}</span><span className={syntax === '>' ? 'text-[#8a8f98]' : 'text-[#e5e5e6]'}>{text}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-white/[0.07] bg-[#0b0c0d]">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-24 lg:grid-cols-2 lg:px-0">
          <div><p className="mb-4 font-mono text-[12px] text-[#8a8f98]">03 — DOCUMENTATION THAT HOLDS UP</p><h2 className="max-w-md text-[42px] font-[510] leading-[1.02] tracking-[-0.04em] text-white">A useful README is a better welcome.</h2></div>
          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            <Feature title="Grounded in your code" text="Dependencies and scripts become useful instructions, not filler." />
            <Feature title="Ready to make yours" text="Every section is editable in a focused Markdown workspace." />
            <Feature title="The right structure" text="Setup, usage, architecture, and contribution details where they belong." />
            <Feature title="Made for GitHub" text="Copy clean Markdown or take it straight to your repository." />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-28 text-center lg:px-0">
        <Sparkles className="mx-auto mb-5 text-[#e4f222]" size={20} />
        <h2 className="mx-auto max-w-2xl text-[44px] font-[510] leading-[1.02] tracking-[-0.045em] text-white sm:text-[60px]">Give your next contributor a better start.</h2>
        <p className="mx-auto mt-5 max-w-md text-[16px] leading-6 text-[#8a8f98]">A thoughtful README is only one repository URL away.</p>
        <Link href="/sign-in" className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#e4f222] px-4 py-2.5 text-[14px] font-medium text-[#08090a] transition hover:bg-[#effa48]">Generate your README <ArrowRight size={16} /></Link>
      </section>

      <footer className="border-t border-white/[0.07]"><div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-4 px-5 py-7 text-[12px] text-[#62666d] sm:flex-row lg:px-0"><div className="flex items-center gap-2"><Mark /> <span>readme.md</span></div><span>Clear documentation, from the code up.</span><a className="transition hover:text-white" href="https://github.com/bisxxal" target="_blank">GitHub</a></div></footer>
    </main>
  );
}

function ProductPreview() {
  return <div className="relative mt-16 overflow-hidden rounded-xl border border-[#383b3f] bg-[#0f1011] shadow-[0_20px_70px_rgba(0,0,0,0.42)]">
    <div className="flex h-11 items-center justify-between border-b border-[#23252a] px-4"><div className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#383b3f]" /><span className="size-2 rounded-full bg-[#383b3f]" /><span className="size-2 rounded-full bg-[#383b3f]" /></div><span className="font-mono text-[11px] text-[#62666d]">readme.md / workspace</span><span className="w-10" /></div>
    <div className="grid min-h-[370px] md:grid-cols-[205px_1fr_215px]"><aside className="hidden border-r border-[#23252a] p-4 md:block"><p className="mb-4 font-mono text-[11px] text-[#62666d]">EXPLORER</p>{['acme-velocity', 'src', 'public', 'package.json', 'README.md'].map((f, i) => <div key={f} className={`mb-1 flex items-center gap-2 rounded px-2 py-1.5 text-[12px] ${i === 4 ? 'bg-white/[0.06] text-white' : 'text-[#8a8f98]'}`}><FileCode2 size={13} className={i === 4 ? 'text-[#e4f222]' : ''} />{f}</div>)}</aside>
    <div className="p-5 sm:p-7"><div className="mb-8 flex items-center justify-between"><div className="flex items-center gap-2 text-[12px] text-[#d0d6e0]"><FileCode2 size={14} className="text-[#e4f222]" /> README.md <span className="text-[#62666d]">• saved</span></div><span className="rounded bg-[#e4f222]/10 px-2 py-1 text-[11px] text-[#e4f222]">AI draft</span></div><div className="max-w-[530px] font-mono text-[13px] leading-7"><p className="text-[23px] font-medium tracking-[-0.04em] text-white"># acme/velocity</p><p className="mt-2 text-[#8a8f98]">A production-ready foundation for modern web apps.</p><p className="mt-6 text-[#e4f222]">## Quick start</p><div className="mt-2 rounded-md border border-white/[0.08] bg-[#08090a] px-3 py-2 text-[#d0d6e0]"><span className="text-[#62666d]">$</span> npm install<br /><span className="text-[#62666d]">$</span> npm run dev</div><p className="mt-5 text-[#e4f222]">## Included</p><p className="text-[#d0d6e0]">Authentication, database, tests, and deployment tooling.</p></div></div>
    <aside className="hidden border-l border-[#23252a] p-4 lg:block"><p className="mb-4 font-mono text-[11px] text-[#62666d]">READY TO PUBLISH</p>{['Project overview', 'Quick start', 'Tech stack', 'Contributing'].map((item) => <div key={item} className="mb-3 flex items-center gap-2 text-[12px] text-[#d0d6e0]"><Check size={13} className="text-[#e4f222]" />{item}</div>)}<button className="mt-5 w-full rounded-md border border-white/[0.1] py-2 text-[12px] text-[#d0d6e0] transition hover:bg-white/[0.05]">Copy Markdown</button></aside></div>
  </div>;
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="rounded-md border border-white/[0.08] bg-white/[0.02] p-4"><div className="mb-8 text-[#d0d6e0]">{icon}</div><h3 className="mb-2 text-[14px] font-medium text-white">{title}</h3><p className="text-[13px] leading-5 text-[#8a8f98]">{text}</p></div>; }
function Feature({ title, text }: { title: string; text: string }) { return <div><div className="mb-3 h-px w-8 bg-[#e4f222]" /><h3 className="mb-2 text-[15px] font-medium text-white">{title}</h3><p className="text-[14px] leading-5 text-[#8a8f98]">{text}</p></div>; }
