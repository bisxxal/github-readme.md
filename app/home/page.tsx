"use client"
import { toastError } from "@/lib/toast"
import { useRouter } from "next/navigation"
import { motion,  AnimatePresence } from "framer-motion"
import {   useState } from "react"
import { Github, ArrowRight, Zap } from "lucide-react"

 
function DashBoardPage() {
    const router = useRouter()
    const [inputValue, setInputValue] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submitForm = async (formData: FormData) => {
        const url = formData.get("github") as string
        if (!url) {
            toastError("Please enter a GitHub URL")
            return
        }
        try {
            const parsedUrl = new URL(url)
            if (parsedUrl.hostname !== "github.com") {
                toastError("Only GitHub repository URLs are allowed")
                return
            }
            const parts = parsedUrl.pathname.replace(/^\/|\/$/g, "").split("/")
            if (parts.length < 2) {
                toastError("Please enter a valid GitHub repository URL")
                return
            }

            const owner = parts[0]
            const repo = parts[1]
            const cleanRepoUrl = `${owner}/${repo}/`

            setIsSubmitting(true)
            await new Promise((r) => setTimeout(r, 400))
            router.push(cleanRepoUrl)
        } catch {
            toastError("Invalid URL format")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Stagger variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.2 },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    }


    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">

         
            {/* ── Main Content ── */}
            <motion.div
                className="relative z-10 w-full max-w-2xl px-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Sub-headline */}
                <motion.p
                    className="text-center text-gray-400 text-xl mb-10 leading-relaxed"
                    variants={itemVariants}
                >
                    Paste any GitHub repository URL and let AI craft a{" "}
                    <span className="text-gray-200 font-medium">beautiful, professional</span> README in seconds.
                </motion.p>

                {/* Form Card */}
                <motion.div variants={itemVariants}>
                    <form action={submitForm}>
                        <motion.div
                            className="relative rounded-2xl p-[1px]"
                            animate={{
                                background: isFocused
                                    ? "linear-gradient(135deg, #92f509, #4ade80, #6366f1)"
                                    : "linear-gradient(135deg, rgba(137,233,0,0.3), rgba(99,102,241,0.2))",
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="rounded-2xl bg-[#0a0a1a]/90 backdrop-blur-xl p-6 sm:p-8">
                                {/* Input label */}
                                <motion.label
                                    className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3 tracking-wide uppercase"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <Github className="w-4 h-4 text-[#89E900]" />
                                    GitHub Repository URL
                                </motion.label>

                                {/* Input wrapper */}
                                <div className="relative mb-4">
                                    <motion.input
                                        id="github-url-input"
                                        type="text"
                                        name="github"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder="https://github.com/username/repository"
                                        className="w-full px-4 py-3.5 pr-12 rounded-xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-gray-600 text-sm transition-all duration-300 focus:bg-white/8 focus:border-[#89E900]/60"
                                        style={{ caretColor: "#89E900" }}
                                        whileFocus={{ scale: 1.005 }}
                                    />
                                    {/* URL icon indicator */}
                                    <AnimatePresence>
                                        {inputValue && (
                                            <motion.div
                                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
                                            >
                                                <Zap className="w-4 h-4 text-[#89E900]" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Submit button */}
                                <motion.button
                                    id="generate-readme-btn"
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full relative overflow-hidden rounded-xl py-3.5 font-bold text-sm tracking-wide text-white disabled:opacity-50 cursor-pointer"
                                    style={{
                                        background: "linear-gradient(135deg, #92f509 0%, #5c9e02 100%)",
                                        boxShadow: "0 0 30px rgba(146,245,9,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 0 50px rgba(146,245,9,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                >
                                    {/* Shimmer sweep */}
                                    <motion.div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                                        }}
                                        animate={{ x: ["-100%", "200%"] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                                    />

                                    <AnimatePresence mode="wait">
                                        {isSubmitting ? (
                                            <motion.div
                                                key="loading"
                                                className="flex items-center justify-center gap-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <motion.div
                                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                                                />
                                                <span>Generating...</span>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="idle"
                                                className="flex items-center justify-center gap-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <span>Generate README</span>
                                                <motion.div
                                                    animate={{ x: [0, 4, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                >
                                                    <ArrowRight className="w-4 h-4" />
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                        </motion.div>
                    </form>
                </motion.div>

                 
            
            </motion.div>
        </div>
    )
}

export default DashBoardPage