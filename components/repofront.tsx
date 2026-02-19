'use client'
import { useQuery } from '@tanstack/react-query'
import Loading from './ui/loading';
import Image from 'next/image';
import { Braces, Eye, GitFork, Star } from 'lucide-react';

const Repofront = ({ owner, repo }: { owner: string, repo: string }) => {
    const { data } = useQuery({
        queryKey: ['repoData', owner, repo],
        enabled: !!owner && !!repo,
        queryFn: async () => {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className='w-1/4 pt-5 h-screen'>
            {
                data ? (
                    <div className=' flex justify-between gap-10 w-full h-[95%]  '>

                        <div className='  bg-[#26273041] h-full border border-[#cba6f71e]  flex items-center flex-col rounded-3xl mb-4'>
                            <Image height={200} width={200} src={data.owner.avatar_url} alt="avatar" className='w-32 h-32 mt-10 rounded-full' />

                            <div className='w-full px-5  text-medium mt-5'>
                                <h2 className=' text-2xl font-bold text-center'>{data.owner?.login}</h2>
                                <h1 className=' text-xl text-center'> {data.name}</h1>
                                
                                 <div className=' center flex-wrap justify-between gap-5 mt-5'>
                                <p className='center flex-col w-2/5 gap-1 rounded-2xl h-20 bg-yellow-300/30 border border-yellow-500'> <Star />  <span className=' text-xl font-bold'>{data.stargazers_count} </span></p>
                                <p className='center flex-col w-2/5 gap-1 rounded-2xl h-20 bg-green-300/30 border border-green-500'><GitFork /> <span className=' text-xl font-bold'> {data.forks_count}</span> </p>
                                <p className='center flex-col w-2/5 gap-1 rounded-2xl h-20 bg-blue-300/30 border border-blue-500'><Braces /> <span className=' text-sm font-bold'>{data.language}</span> </p>
                                <p className='center flex-col w-2/5 gap-1 rounded-2xl h-20 bg-red-300/30 border border-red-500'> <Eye /> <span className=' text-xl font-bold'>{data.watchers_count} </span> </p>
                                </div>

                                <div className="mt-2 flex gap-4 center justify-between  text-sm">
                                     
                                </div>
                                
                                <p className='text-gray-500 text-center text-xs mt-4 '>{data.description}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                   <Loading parent="w-full h-[95%] " child="rounded-2xl w-full h-full" boxes={1}/>
                )

            }
        </div>
    )
}

export default Repofront