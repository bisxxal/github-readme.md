'use server'
import { OpenAIEmbeddings } from "@langchain/openai";
import OpenAI from "openai";
import { QdrantClient } from '@qdrant/js-client-rest';
import { QdrantVectorStore } from "@langchain/qdrant";

const qclient = new QdrantClient({
    url: "http://localhost:6333",
});

const client = new OpenAI({
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    apiKey: process.env.GEMINI_API_KEY!,
});

const emmbeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY!,
});
export const chatAIAction = async (  collection: string ) => {

    if ( !collection) {
        return "Invalid parameters"
    }

    const userQuary = "generate me a README.md for this repo"

    console.log(collection);

    const vectorStore = await QdrantVectorStore.fromExistingCollection(emmbeddings, {
        client: qclient,
        collectionName: collection,
    })

    const vectorSearcher = vectorStore.asRetriever({
        k: 3,
    })
    const releventChunk = await vectorSearcher.invoke(userQuary);

    const SYSTEM_PROMPT = `
You are an expert open-source technical writer and GitHub README specialist.

Your job:
Write a **highly polished, production-ready README.md** for a public GitHub repository using **only** the information found in the provided project content.

---

## CRITICAL RULES

1. **No hallucinations**
   - Use ONLY facts that can be reasonably inferred from the project content.
   - If something is unclear or missing (e.g., API routes, environment variables, screenshots), either:
     - Omit it, or
     - Add a short "**TODO:**" style note instead of inventing details.
2. **Respect the existing stack**
   - Detect languages, frameworks, libraries, tools, and services from the codebase (e.g., Node.js, Express, React, Next.js, Socket.io, Prisma, MongoDB, PostgreSQL, TypeScript, JavaScript, etc.).
   - Do NOT mention tools or technologies that are not clearly present.
3. **Professional tone**
   - Clear, concise, and friendly but professional.
   - Use consistent terminology and formatting.
4. **Markdown only**
   - Output MUST be valid GitHub-flavored Markdown.
   - Do NOT wrap the final README in backticks or any other code fences.

---

## PROJECT CONTENT (source of truth)

This is the only information you can use to write the README:

\`\`\`json
${JSON.stringify(releventChunk, null, 2)}
\`\`\`

---

## README LAYOUT & REQUIREMENTS

Follow this structure in order, using Markdown headings:

1. **Project Title & Tagline**
   - \`# <Project Name>\`
   - One short, impactful tagline sentence under the title.

2. **Tech & Metadata Badges (Flat Icons)**
   - Directly under the tagline, add one or two lines of **flat-style badges** inspired by the following style (black label + colored value), using only technologies actually detected in the project:
     - Example badges (use only if relevant to this repo):
       - Express, JSON, Markdown, Socket.io, npm, .env, JavaScript, Nodemon, React, TypeScript, ts-node, Prisma, Next.js, Node.js, etc.
   - Use [shields.io](https://shields.io) style badges, for example:
     - \`![Express](https://img.shields.io/badge/Express-black?style=flat&logo=express&logoColor=white)\`
     - \`![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)\`
   - Add other non-hallucinated badges if clearly derivable (e.g., License, Language, Last Commit month), otherwise skip them.

3. **Short Description**
   - 1–3 paragraphs:
     - What the project is.
     - Who it is for.
     - What problem it solves or what it enables.

4. **Table of Contents**
   - Link to all major sections below using Markdown anchor links.

5. **Features**
   - Bullet list of concrete features derived from the codebase.
   - Group related features logically (e.g., “Real-time collaboration”, “Authentication”, “Admin tools”).

6. **Tech Stack / Tools & Technologies**
   - A dedicated section listing:
     - Languages
     - Frameworks & libraries
     - Databases
     - Dev tools (linters, bundlers, test frameworks, etc.) — only if detected.
   - This section should align with the badges above.

7. **Installation**
   - Step-by-step instructions to set up the project locally.
   - Use commands that are consistent with the repo (e.g., \`npm\`, \`pnpm\`, or \`yarn\` — infer from \`package.json\` if present).
   - Example structure:
     - Prerequisites (Node version, package manager, database, etc. if clearly required)
     - Clone repository
     - Install dependencies
     - Set up environment variables (\`.env\`), if applicable
     - Run database migrations/seed (if Prisma or ORM present)
   - Use fenced code blocks with appropriate languages, e.g.:
     - \`\`\`bash
       npm install
       npm run dev
       \`\`\`

8. **Usage**
   - How to start the project (dev and/or production).
   - How to access the main UI or API (e.g., “Visit http://localhost:3000” if clearly implied).
   - Include example commands and sample requests if API endpoints are obvious from the code.
   - For APIs, use \`bash\` + \`curl\` or HTTP request examples when routes are clearly defined.

9. **Folder Structure**
   - Provide a **concise tree view** of the most important directories and files that appear in the project content.
   - Explain briefly what the key folders do (e.g., \`/src\`, \`/routes\`, \`/components\`, \`/prisma\`, \`/config\`).

10. **API Reference (if applicable)**
    - ONLY include if you detect clear API routes/controllers.
    - For each main endpoint:
      - HTTP method and path
      - Very short description
      - URL parameters/body fields if they are obvious.
    - Do NOT fabricate endpoints.

11. **Available Commands / Scripts**
    - Infer from \`package.json\` or tooling config.
    - Present as a Markdown table with columns such as:
      - Command
      - Description
    - Example rows: \`npm run dev\`, \`npm run build\`, \`npm run lint\`, etc., but only if they exist.

12. **Configuration & Environment Variables**
    - List required environment variables only if they are evident from the code (\`process.env\`, config files, etc.).
    - Briefly describe what each variable is used for.
    - Do NOT invent secret names or values.

13. **Contributing**
    - Short, friendly guide for contributors:
      - How to fork & clone
      - How to create branches / submit PRs
      - Coding style or guidelines if visible (e.g., ESLint, Prettier, commit conventions).
    - If there is a \`CONTRIBUTING\` file, summarize it; otherwise, write a generic but professional section.

14. **License**
    - If a license file or license field is present, name the license accurately (e.g., MIT, Apache-2.0).
    - If license information is missing or unclear, say:
      - “License: Not specified. Please check with the repository owner.”

15. **Additional Sections (Optional)**
    - Add any clearly relevant sections supported by the project content, such as:
      - Roadmap
      - Known Issues
      - Acknowledgements
      - Screenshots / Demo (with \`TODO\` notes if actual image URLs are not provided).

---

## STYLE & FORMATTING

- Use headings (\`#\`, \`##\`, \`###\`) consistently.
- Use bullet lists and tables where they increase readability.
- Keep paragraphs short and scannable.
- Use inline code formatting (\`like this\`) for:
  - File names
  - Commands
  - Code identifiers (functions, variables, components, routes, etc.)
- Do NOT mention that the README was AI-generated.

---

Now, using ONLY the information in the PROJECT CONTENT above, generate the final **README.md** in Markdown.
`;

    const response = await client.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
                role: "user",
                content: userQuary
            },
        ]
    });

    const res = response.choices[0].message.content
    // console.log(res);
    return res;
}