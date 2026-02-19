'use server'
import { QdrantClient } from "@qdrant/js-client-rest";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { repoToCollectionName, shouldIncludeFile } from "@/lib/util";

const emmbeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
});
const qclient = new QdrantClient({ 
    url: "http://localhost:6333",
});
 
  
export const generateEmbeddings = async (url: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return "Unauthorized";
  }

  if (!url) {
    return "Invalid URL";
  }

  try {
    const loader = new GithubRepoLoader(url, {
      branch: "main",
      recursive: true,
      maxConcurrency: 3,
      accessToken: process.env.GITHUB_TOKEN,
    });

    let docs = await loader.load();

    // Filter files
    docs = docs.filter((doc) =>
      shouldIncludeFile(doc.metadata.source)
    );

    if (!docs.length) {
      return "No valid source files found";
    }

    // Split smaller to prevent Qdrant payload explosion
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 800,
      chunkOverlap: 100,
    });

    const splitDocs = await splitter.splitDocuments(docs);

    const collectionName = repoToCollectionName(url);
 
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      emmbeddings,
      {
        client: qclient,
        collectionName,
      }
    ).catch(async () => {
      return await QdrantVectorStore.fromDocuments([], emmbeddings, {
        client: qclient,
        collectionName,
      });
    });
    
    // BATCH INSERT (FIX 32MB ERROR)
    const BATCH_SIZE = 100;

    for (let i = 0; i < splitDocs.length; i += BATCH_SIZE) {
      const batch = splitDocs.slice(i, i + BATCH_SIZE);
      await vectorStore.addDocuments(batch);
    }

    return "success";
  } catch (err: any) {
    console.error("Embedding Error:", err.message);
    return "failed";
  }
};

// export const generateEmbeddings = async (url: string ) => {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//         return "Unauthorized: user not authenticated";
//     }

//     if (!url  ) {
//         return "Invalid parameters"
//     }
 
//     const loader = new GithubRepoLoader(
//         url, {
//         branch: "main",
//         recursive: true,
//         maxConcurrency: 5,
//         unknown: "warn",
//         accessToken: process.env.GITHUB_TOKEN,
//     });

//     let docs = await loader.load();

//     docs = docs.filter((doc) =>
//         !ignorePatterns.some((p) => p.test(doc.metadata.source))
//     );

//     const splitter = new RecursiveCharacterTextSplitter({
//         chunkSize: 1200,
//         chunkOverlap: 200,
//     });

//     const splitDocs = await splitter.splitDocuments(docs);

//     const collectionName = repoToCollectionName(url);

//     const vectorStore = await QdrantVectorStore.fromDocuments(
//         splitDocs,
//         emmbeddings,
//         {
//             client: qclient,
//             collectionName: collectionName,
//         }
//     ); 

//     if (vectorStore) {

//         return "success";
//     } else {
//         return "failed";
//     }
// }