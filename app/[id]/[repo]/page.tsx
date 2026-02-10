'use client'
import { usePathname, useSearchParams } from 'next/navigation';
import { generateEmbeddings } from "@/action/vector.embdings"
import { toastError, toastSuccess } from "@/lib/toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Repofront from '@/components/repofront';
import { chatAIAction } from "@/action/chat.ai";
import { useState } from "react"
import MDEditor from '@uiw/react-md-editor';
import ReadmeEditor from "@/components/ui/readmeeditor";


const Idpage = () => {
    const path = usePathname();
    const owner = path.split("/")[1];
    const repo = path.split("/")[2];

    const client = useQueryClient();
 
    const giturl = `https://github.com/${path}`

    const createCollections = useMutation({
        mutationFn: async () => {
            return await generateEmbeddings(giturl);
        },
        onSuccess: (data) => {
            if (data) {
                const col = data?.collection as string;
                toastSuccess('collection added successfully!');
                client.invalidateQueries({ queryKey: ['modelsinfo'] });
                // router.push(`/chatbot?c=${col}`);
            } else {
                toastSuccess('failed to add collection ');
            }
        },
    });


    const search = useSearchParams(); // github.com/bisxxal/readmemd  
    const collections = search.get("c") || "";

    const [messages, setMessages] = useState()
    const [isLoading, setIsLoading] = useState(false)


    const handleSend = async () => {
        setIsLoading(true)
        try {
            const res = await chatAIAction(collections);
            if (!res) return;
            setMessages(res)
        } catch (err) {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className=' w-full bg-[#1c1b21] text-white min-h-screen px-10'>

            <div className=' w-full pt-5 h-screen justify-between gap-10 center '>
                <Repofront owner={owner} repo={repo} />

                <div className='center flex-col border h-[95%] rounded-3xl overflow-hidden w-full border-black'>

                    <form >
                        <div className="card  mb-6 p-4  py-5 rounded-3xl flex flex-col placeholder:text-gray-50">
                            <button onClick={()=>createCollections()} disabled={createCollections.isPending} className="buttonbg disabled:opacity-20 px-4 py-2 rounded text-white">Generate ReadMe File</button>
                        </div>
                    </form>



                    <div className=" w-full h-screen overflow-scroll">
                        <MDEditor.Markdown source={messages} style={{ padding: '50px', borderRadius: '20px' }} />
                    </div>

                    <ReadmeEditor value={messages} setValue={setMessages} extraCommands={[]} style={{ padding: '50px' }} />
                </div>
            </div>

        </div>
    )
}

export default Idpage