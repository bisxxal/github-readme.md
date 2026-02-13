"use client"
import { toastError } from "@/lib/toast"
import { useRouter } from "next/navigation"

function DashBoardPage() {
    const router = useRouter();
    const submitForm = async (formData: FormData) => {
        const url = formData.get("github") as string;

        if (!url) {
            toastError("Please enter a GitHub URL");
            return;
        }

        try {
            const parsedUrl = new URL(url);
            if (parsedUrl.hostname !== "github.com") {
                toastError("Only GitHub repository URLs are allowed");
                return;
            }
            const parts = parsedUrl.pathname.replace(/^\/|\/$/g, "").split("/");
            if (parts.length < 2) {
                toastError("Please enter a valid GitHub repository URL");
                return;
            }

            const owner = parts[0];
            const repo = parts[1];

            const cleanRepoUrl = `${owner}/${repo}/`;

            router.push(cleanRepoUrl);

        } catch (error) {
            toastError("Invalid URL format");
        }
    };

    return (
        <div className=" w-full px-10">
            <h1 className=" text-center text-gray-600 font-bold text-4xl my-5">Dashboard</h1>
            <h2 className=" text-xl font-semibold">Upload Context</h2>

            <form action={submitForm}>
                <div className="card  mb-6 p-4  py-5 rounded-3xl flex flex-col placeholder:text-gray-50">
                    <h2 className="text-2xl text-gray-700 font-bold mb-4">Add github link</h2>
                    <input
                        type="text"
                        name="github"
                        placeholder="https://github.com/bisxxal"
                        className="w-full p-2 mb-4 border-2 bordercolor outline-none placeholder:text-amber-900/30 !rounded-xl"
                    />
                    <button type="submit" className="buttonbg disabled:opacity-20 px-4 py-2 rounded text-white">Submit</button>
                </div>
            </form>


        </div>
    )
}


export default DashBoardPage