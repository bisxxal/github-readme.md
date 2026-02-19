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
        <div className=" h-screen w-full px-10 center ">

            <form className=" w-full " action={submitForm}>
                <div className="w-2/3 mx-auto center mb-6 p-4  py-5 rounded-3xl flex flex-col placeholder:text-gray-50">
                    <h2 className="text-2xl uppercase font-bold mb-4">Add github Repo</h2>
                    <input
                        type="text"
                        name="github"
                        placeholder="https://github.com/bisxxal"
                        className="w-full p-2 mb-4 border-2 border-[#3558d59f] outline-none placeholder:text-gray-500 !rounded-xl"
                    />
                    <button type="submit" className="buttonbg disabled:opacity-20 px-4 py-2 rounded w-full text-white">GO</button>
                </div>
            </form>


        </div>
    )
}


export default DashBoardPage