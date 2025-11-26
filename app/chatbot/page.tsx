"use client"
import { chatAIAction } from "@/action/chat.ai";
import { useSearchParams } from "next/navigation";
import { useState } from "react"
import MDEditor from '@uiw/react-md-editor';
import ReadmeEditor from "@/components/ui/readmeeditor";

export default function ChatbotPage() {

  const search = useSearchParams();
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
    <div className="flex flex-col h-screen max-h-screen  backdrop-blur-[10px] text-white rounded-lg shadow-lg p-4">


      <MDEditor
        value={messages}
        // onChange={setMessages}
        onChange={(value) => setMessages(value)}
        height={500}

      // fullscreen={true}
      />
      {/* <MDEditor.Markdown source={messages} style={{ whiteSpace: 'pre-wrap' }} /> */}

      <ReadmeEditor value={messages} setValue={setMessages} />


      <div className=" bg-red-500 flex justify-end items-center">
        <button
          className="ml-2 buttonbg transition-colors px-4 py-2 border rounded-full text-sm font-medium"
          onClick={handleSend}
        >
          Generate README
        </button>
      </div>
    </div>
  )
}


