import { useQuery } from '@tanstack/react-query'
import Loading from './ui/loading';

const Repofront = ({ owner, repo }: { owner: string, repo: string }) => {
    const { data } = useQuery({
        queryKey: ['repoData', owner, repo],
        enabled: !!owner && !!repo,
        queryFn: async () => {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //   Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
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

                        <div className='  bg-indigo-200 h-full  flex items-center flex-col rounded-3xl mb-4'>
                            <img src={data.owner.avatar_url} alt="avatar" className='w-20 h-20 mt-10 rounded-full' />

                            <div className='w-full px-5  text-medium mt-5'>
                                <h2 className=' text-2xl font-bold text-center'>{data.owner?.login}</h2>
                                <h1 className=' text-xl text-center'> {data.name}</h1>
                                
                                 <div className=' center justify-between gap-10 mt-5'>
                                <p>Stars: {data.stargazers_count}</p>
                                <p>Forks: {data.forks_count}</p>
                                </div>

                                <div className="mt-2 flex gap-4 center justify-between  text-sm">
                                    <span>⭐ {data.stargazers_count}</span>
                                    <span>🧠 {data.language}</span>
                                    <span>🍴 {data.forks_count}</span>
                                    <span> 👁️ {data.watchers_count}</span>
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