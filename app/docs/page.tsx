"use client"
import { generateEmbeddings } from "@/action/vector.embdings"
import { toastError, toastSuccess } from "@/lib/toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LoaderCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

function DashBoardPage() {
    const { data } = useSession();
    const router = useRouter();
    const client = useQueryClient();
    const sumbitForm = async (formData: FormData) => {
        const github = formData.get("github") as string
        if (!github) {
            return toastError('Please provide a valid github url');
        }

        const collectionName = data?.user.name + "_github_collection" + Date.now();
        createCollections.mutate({ url: github, collectionName })
    }

    const createCollections = useMutation({
        mutationFn: async ({ url, collectionName }: { url: string, collectionName: string }) => {
            return await generateEmbeddings(url, collectionName);
        },
        onSuccess: (data) => {
            if (data) {
                const col = data?.collection as string;
                toastSuccess('collection added successfully!');
                client.invalidateQueries({ queryKey: ['modelsinfo'] });
                router.push(`/chatbot?c=${col}`);
            } else {
                toastSuccess('failed to add collection ');
            }
        },
    });

    return (
        <div className=" w-full px-10">
            <h1 className=" text-center text-gray-600 font-bold text-4xl my-5">Dashboard</h1>
            <h2 className=" text-xl font-semibold">Upload Context</h2>
            <p className=" text-gray-500 text-sm my-3">Upload documents or add text to train your AI chatbot. The more context you provide, the better your chatbot will perform.</p>

            {
                createCollections.isPending && <div className=" w-full rounded-3xl text-blue-500 card h-[70px] flex items-center justify-center mb-4">
                    <LoaderCircle className=" animate-spin mr-2" />
                    <p className=" text-lg font-medium">Creating collection...</p>
                </div>
            }

            <form action={sumbitForm}>
                <div className="card  mb-6 p-4  py-5 rounded-3xl flex flex-col placeholder:text-gray-50">
                    <h2 className="text-2xl text-gray-700 font-bold mb-4">Add github link</h2>
                    <input
                        type="text"
                        name="github"
                        placeholder="https://github.com/bisxxal"
                        className="w-full p-2 mb-4 border-2 bordercolor outline-none placeholder:text-amber-900/30 !rounded-xl"
                    />
                    <button disabled={createCollections.isPending} className="buttonbg disabled:opacity-20 px-4 py-2 rounded text-white">Submit</button>
                </div>
            </form>


        </div>
    )
}


export default DashBoardPage