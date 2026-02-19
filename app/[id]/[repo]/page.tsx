'use client'
import { usePathname } from 'next/navigation';
import { generateEmbeddings } from "@/action/vector.embdings"
import { toastSuccess } from "@/lib/toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Repofront from '@/components/repofront';
import { chatAIAction } from "@/action/chat.ai";
import { useState } from "react"
import MDEditor from '@uiw/react-md-editor';
import ReadmeEditor from "@/components/ui/readmeeditor";
import { repoToCollectionName } from '@/lib/util';
import Loading from '@/components/ui/loading';
import ChainOfThought from '@/components/ui/Cot';

const Idpage = () => {
    const client = useQueryClient();
    const path = usePathname();
    const owner = path.split("/")[1];
    const repo = path.split("/")[2];
    const giturl = `https://github.com${path}`
    const [messages, setMessages] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [switcher, setSwitcher] = useState(true);

    const createCollections = useMutation({
        mutationFn: async () => {
            return await generateEmbeddings(giturl);
        },
        onSuccess: (data) => {
            if (data) {
                const col = data?.collection as string;
                console.log(col, data)
                toastSuccess('collection added successfully!');
                client.invalidateQueries({ queryKey: ['modelsinfo'] });
            } else {
                toastSuccess('failed to add collection ');
            }
        },
    });

    const collectionName = repoToCollectionName(giturl);

    const generateReadme = useMutation({
        mutationFn: async () => {
            return await chatAIAction(collectionName);
        },
        onSuccess: (data) => {
            if (data) {
                setMessages(data)
            }
        },
    });

    const collectionForm = async () => {
        createCollections.mutate()
    }

    return (
        <div className=' w-full min-h-screen px-10'>

            <div className=' w-full h-screen justify-between gap-10 center  '>

                <Repofront owner={owner} repo={repo} />

                {/* // Other side */}

                <div className=' flex justify-start flex-col border border-[#ffffff4c] h-[95%] rounded-3xl  w-full '>
                    <div className='w-full pt-3 flex-col center '>
                        {messages && <div className='flex justify-between items-center w-fit overflow-hidden border border-[#cba6f787] rounded-full mx-auto  '>
                            <button onClick={() => setSwitcher(true)} className={`${switcher ? "   buttonbg " : "  "} rounded-l-4xl px-4 py-2 `}>Preview</button>
                            <button onClick={() => setSwitcher(false)} className={`${switcher ? "  " : "buttonbg  "} rounded-r-4xl px-4 py-2 `}>Edit</button>
                        </div>}
                    </div>

                    {!messages && !generateReadme.isPending && <div className='w-full h-full center '>
                        <form   action={collectionForm}>
                            <div className="card   p-4  py-5 rounded-3xl flex flex-col placeholder:text-gray-50">
                                <button type='submit' disabled={createCollections.isPending} className="buttonbg disabled:opacity-20 px-4 py-2 rounded text-white">Create collections</button>
                            </div>
                        </form>
                        <button onClick={() => generateReadme.mutate()} className='buttonbg p-2'>Generate readme</button>
                    </div>}

                    {generateReadme.isPending && <ChainOfThought />}

                    {switcher ? messages && <div className=" w-full h-full overflow-scroll">
                        <MDEditor.Markdown source={messages} style={{ padding: '40px', backgroundColor: 'transparent', borderRadius: '20px' }} />
                    </div>
                        : <ReadmeEditor value={messages} setValue={setMessages} />
                    }
                </div>
            </div>

        </div>
    )
}

export default Idpage