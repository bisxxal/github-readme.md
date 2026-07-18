'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Braces, Eye, GitFork, LockKeyhole, Star } from 'lucide-react';
import Loading from './ui/loading';

type RepoData = {
  name: string;
  description: string | null;
  private: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  owner: { login: string; avatar_url: string };
};

export default function Repofront({ owner, repo, accessToken, accessReady }: { owner: string; repo: string; accessToken?: string; accessReady: boolean }) {
  const { data, error, isPending } = useQuery<RepoData>({
    // Do not place the token itself in the query cache key.
    queryKey: ['repoData', owner, repo, accessToken ? 'authenticated' : 'public'],
    enabled: accessReady && Boolean(owner && repo),
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
      });
      if (!response.ok) {
        const message = response.status === 404 ? 'Repository not found, or this token cannot access it.' : `GitHub could not load this repository (${response.status}).`;
        throw new Error(message);
      }
      return response.json();
    },
    retry: false,
  });

  if (isPending || !accessReady) return <Loading parent="w-full h-[420px]" child="rounded-xl w-full h-full" boxes={1} />;

  if (error || !data) return <aside className="w-full"><div className="rounded-xl border border-white/[0.1] bg-white/[0.02] p-5 text-center"><LockKeyhole className="mx-auto mb-3 text-[#e4f222]" size={20} /><p className="text-sm text-[#d0d6e0]">Repository details unavailable</p><p className="mt-2 text-xs leading-5 text-[#8a8f98]">{error instanceof Error ? error.message : 'Try a token with repository read access.'}</p></div></aside>;

  const stats = [
    { icon: <Star size={16} />, value: data.stargazers_count, label: 'Stars' },
    { icon: <GitFork size={16} />, value: data.forks_count, label: 'Forks' },
    { icon: <Braces size={16} />, value: data.language ?? '—', label: 'Language' },
    { icon: <Eye size={16} />, value: data.watchers_count, label: 'Watching' },
  ];

  return <aside className="w-full"><div className="flex min-h-[420px] flex-col rounded-xl border border-white/[0.1] bg-white/[0.02] p-5"><div className="flex flex-col items-center"><Image height={128} width={128} src={data.owner.avatar_url} alt={`${data.owner.login} avatar`} className="size-24 rounded-full" /><p className="mt-4 text-sm text-[#8a8f98]">{data.owner.login}</p><h1 className="mt-1 flex items-center gap-2 text-xl font-medium text-white">{data.name} {data.private && <LockKeyhole size={15} className="text-[#e4f222]" />}</h1></div><div className="mt-7 grid grid-cols-2 gap-2">{stats.map((stat) => <div key={stat.label} className="rounded-md border border-white/[0.07] bg-black/20 p-3"><div className="mb-3 text-[#8a8f98]">{stat.icon}</div><p className="text-sm text-white">{stat.value}</p><p className="mt-0.5 text-[11px] text-[#62666d]">{stat.label}</p></div>)}</div>{data.description && <p className="mt-5 text-center text-xs leading-5 text-[#8a8f98]">{data.description}</p>}</div></aside>;
}
