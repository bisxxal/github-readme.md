'use server'
import { QdrantClient } from "@qdrant/js-client-rest";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { ignorePatterns, repoToCollectionName } from "@/lib/util";

const emmbeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
});
const qclient = new QdrantClient({
    // url: process.env.QDRANT_URL!,
    // apiKey: process.env.QDRANT_API_KEY!,
    url: "http://localhost:6333",
});


export const generateEmbeddings = async (url: string ) => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return "Unauthorized: user not authenticated";
    }

    if (!url  ) {
        return "Invalid parameters"
    }
 
    const loader = new GithubRepoLoader(
        url, {
        branch: "main",
        recursive: true,
        maxConcurrency: 5,
        unknown: "warn",
        accessToken: process.env.GITHUB_TOKEN,
    });

    let docs = await loader.load();

    docs = docs.filter((doc) =>
        !ignorePatterns.some((p) => p.test(doc.metadata.source))
    );

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1200,
        chunkOverlap: 200,
    });

    const splitDocs = await splitter.splitDocuments(docs);

    const collectionName = repoToCollectionName(url);

    const vectorStore = await QdrantVectorStore.fromDocuments(
        splitDocs,
        emmbeddings,
        {
            client: qclient,
            collectionName: collectionName,
        }
    ); 

    if (vectorStore) {

        return "success";
    } else {
        return "failed";
    }

}
 