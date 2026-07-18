'use client';

import { chatAIAction } from '@/action/chat.ai';
import { fetchCollections } from '@/action/index.action';
import { generateEmbeddings } from '@/action/vector.embdings';
import Repofront from '@/components/repofront';
import ChainOfThought from '@/components/ui/Cot';
import ReadmeEditor from '@/components/ui/readmeeditor';
import { toastError, toastSuccess } from '@/lib/toast';
import { repoToCollectionName } from '@/lib/util';
import MDEditor from '@uiw/react-md-editor';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Check, FilePenLine, FileText, Github, LoaderCircle, Pencil, ScanSearch, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RepositoryPage() {
  const client = useQueryClient();
  const path = usePathname();
  const [, owner = '', repo = ''] = path.split('/');
  const giturl = `https://github.com/${owner}/${repo}`;
  const collectionName = repoToCollectionName(giturl);
  const [readme, setReadme] = useState<string>();
  const [view, setView] = useState<'preview' | 'edit'>('preview');
  const [accessToken, setAccessToken] = useState<string>();
  const [accessReady, setAccessReady] = useState(false);

  useEffect(() => {
    const storedAccess = sessionStorage.getItem('readme-md-private-access');
    if (storedAccess) {
      try {
        const { token, repo: tokenRepo } = JSON.parse(storedAccess);
        if (tokenRepo === `${owner}/${repo}` && token) setAccessToken(token);
      } catch {
        // Ignore malformed, transient browser data.
      } finally {
        sessionStorage.removeItem('readme-md-private-access');
      }
    }
    setAccessReady(true);
  }, [owner, repo]);

  const collectionsQuery = useQuery({
    queryKey: ['modelsinfo', collectionName],
    queryFn: () => fetchCollections(collectionName),
    enabled: Boolean(collectionName),
  });

  const scanRepository = useMutation({
    mutationFn: () => generateEmbeddings(giturl, accessToken),
    onSuccess: (result) => {
      if (result && typeof result !== 'string' && result.status === 200) {
        toastSuccess('Repository scanned. Your README is ready to draft.');
        client.invalidateQueries({ queryKey: ['modelsinfo', collectionName] });
      } else {
        toastError(typeof result === 'string' ? result : result?.error ?? 'Unable to scan this repository');
      }
    },
    onError: () => toastError('The repository scan failed. Please try again.'),
  });

  const generateReadme = useMutation({
    mutationFn: () => chatAIAction(collectionName),
    onSuccess: (result) => {
      if (result) setReadme(result);
      else toastError('Unable to generate a README');
    },
    onError: () => toastError('Unable to generate a README'),
  });

  const hasCollection = Boolean(collectionsQuery.data?.data?.length);

  return (
    <main className="min-h-screen bg-[#08090a] px-4 pb-6 text-[#e5e5e6] sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(228,242,34,0.045),transparent_65%)]" />
      <header className="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between border-b border-white/[0.07]">
        <div className="flex items-center gap-3"><Link href="/home" className="grid size-8 place-items-center rounded-md border border-white/[0.1] bg-white/[0.03] text-[#8a8f98] transition hover:border-white/[0.2] hover:text-white"><ArrowLeft size={16} /></Link><div><div className="flex items-center gap-2 font-mono text-[11px] text-[#62666d]"><Github size={13} /> REPOSITORY WORKSPACE</div><h1 className="mt-1 text-[15px] font-medium tracking-[-0.02em] text-white">{owner} <span className="text-[#62666d]">/</span> {repo}</h1></div></div>
        <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[11px] text-[#8a8f98] sm:flex"><span className="size-1.5 rounded-full bg-[#e4f222]" /> Documentation studio</div>
      </header>

      <div className="relative mx-auto grid max-w-[1440px] gap-5 pt-6 xl:grid-cols-[284px_minmax(0,1fr)]">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.38 }}><Repofront owner={owner} repo={repo} accessToken={accessToken} accessReady={accessReady} /></motion.div>

        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, delay: 0.05 }} className="min-h-[calc(100vh-130px)] overflow-hidden rounded-xl border border-[#23252a] bg-[#0f1011] shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
          <div className="flex min-h-16 items-center justify-between border-b border-[#23252a] px-4 sm:px-6">
            <div className="flex items-center gap-2"><FileText size={16} className="text-[#e4f222]" /><span className="text-[13px] font-medium text-white">README.md</span><span className="hidden font-mono text-[11px] text-[#62666d] sm:inline">— generated from {repo}</span></div>
            {readme && <div className="flex items-center rounded-md border border-white/[0.08] bg-[#08090a] p-1"><button onClick={() => setView('preview')} className={`rounded px-2.5 py-1.5 text-[12px] transition ${view === 'preview' ? 'bg-white/[0.09] text-white' : 'text-[#8a8f98] hover:text-[#d0d6e0]'}`}><span className="flex items-center gap-1.5"><FileText size={13} /> Preview</span></button><button onClick={() => setView('edit')} className={`rounded px-2.5 py-1.5 text-[12px] transition ${view === 'edit' ? 'bg-white/[0.09] text-white' : 'text-[#8a8f98] hover:text-[#d0d6e0]'}`}><span className="flex items-center gap-1.5"><Pencil size={13} /> Edit</span></button></div>}
          </div>

          <AnimatePresence mode="wait">
            {!readme && !generateReadme.isPending && <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid min-h-[calc(100vh-194px)] place-items-center p-6"><div className="max-w-md text-center">
              <div className="mx-auto mb-6 grid size-12 place-items-center rounded-lg border border-white/[0.1] bg-white/[0.025] text-[#e4f222]">{scanRepository.isPending ? <LoaderCircle className="animate-spin" size={21} /> : hasCollection ? <Sparkles size={21} /> : <ScanSearch size={21} />}</div>
              {collectionsQuery.isPending ? <><h2 className="text-[24px] font-medium tracking-[-0.03em] text-white">Preparing your workspace</h2><p className="mt-3 text-sm text-[#8a8f98]">Checking the repository’s documentation state.</p></> : hasCollection ? <><p className="font-mono text-[11px] text-[#8a8f98]">SCAN COMPLETE</p><h2 className="mt-3 text-[26px] font-medium tracking-[-0.035em] text-white">Ready to write something useful.</h2><p className="mt-3 text-sm leading-6 text-[#8a8f98]">Your codebase is mapped. Create a focused README draft from the project context.</p><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => generateReadme.mutate()} className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#e4f222] px-4 py-2.5 text-[13px] font-medium text-[#08090a]">Generate README <Sparkles size={15} /></motion.button></> : <><p className="font-mono text-[11px] text-[#8a8f98]">STEP 1 OF 2</p><h2 className="mt-3 text-[26px] font-medium tracking-[-0.035em] text-white">Start with the source.</h2><p className="mt-3 text-sm leading-6 text-[#8a8f98]">We’ll inspect the structure, dependencies, and scripts to make the draft reflect the real project.</p><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => scanRepository.mutate()} disabled={scanRepository.isPending} className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#e4f222] px-4 py-2.5 text-[13px] font-medium text-[#08090a] disabled:opacity-60">{scanRepository.isPending ? <><LoaderCircle className="animate-spin" size={15} /> Scanning repository</> : <><ScanSearch size={15} /> Scan repository</>}</motion.button><p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#62666d]"><Check size={12} className="text-[#e4f222]" /> Uses your repository’s actual source files</p></>}
            </div></motion.div>}
            {generateReadme.isPending && <motion.div key="generating" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto flex min-h-[calc(100vh-194px)] max-w-lg items-center"><ChainOfThought /></motion.div>}
            {readme && <motion.div key="readme" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="h-[calc(100vh-194px)] min-h-[600px] overflow-auto">{view === 'preview' ? <MDEditor.Markdown source={readme} style={{ minHeight: '100%', padding: '32px', backgroundColor: 'transparent' }} /> : <ReadmeEditor value={readme} setValue={setReadme} />}</motion.div>}
          </AnimatePresence>
        </motion.section>
      </div>
    </main>
  );
}
