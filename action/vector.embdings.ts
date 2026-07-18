'use server'
import { QdrantClient } from "@qdrant/js-client-rest";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { repoToCollectionName, shouldIncludeFile } from "@/lib/util";
import prisma from "@/lib/prisma";

const emmbeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
});
const qclient = new QdrantClient({ 
    url: "http://localhost:6333",
});
 
export const generateEmbeddings = async (url: string, accessToken?: string) => {
  
  if (!url) {
    return "Invalid URL";
  }
  const session = await getServerSession(authOptions);
  const isPrivateScan = Boolean(accessToken);


  if (!session?.user?.id) {
      return {status:400 , error:"Unauthorized: user not authenticated"};
  }
 
  try {
    // JWT sessions can outlive a local database reset. Restore the matching
    // adapter user before doing any expensive repository or vector work so a
    // collection always has a valid foreign-key owner.
    const user = await prisma.user.upsert({
      where: { id: session.user.id },
      update: {},
      create: {
        id: session.user.id,
        name: session.user.name ?? null,
        email: session.user.email ?? null,
        image: session.user.image ?? null,
      },
    });

    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== "github.com") {
      return { status: 400, error: "Please enter a github.com repository URL" };
    }
    const [owner, repo] = parsedUrl.pathname.replace(/^\/|\/$/g, "").split("/");
    if (!owner || !repo) {
      return { status: 400, error: "Please enter a complete GitHub repository URL" };
    }

    const githubToken = accessToken || process.env.GITHUB_TOKEN;
    const repositoryResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
      },
    });
    if (!repositoryResponse.ok) {
      if (repositoryResponse.status === 404) {
        return {
          status: 404,
          error: isPrivateScan
            ? "GitHub could not access this repository. Check that your token has repository read access."
            : "Repository not found. Confirm the GitHub URL or enable private repository access.",
        };
      }
      return { status: repositoryResponse.status, error: "GitHub could not verify this repository. Please try again." };
    }
    const repository = await repositoryResponse.json() as { default_branch?: string };

    const loaderOptions = {
      // Repositories can use `main`, `master`, or any custom default branch.
      branch: repository.default_branch || "main",
      recursive: true,
      maxConcurrency: 3,
      // A token supplied for a private repository is used only for this request.
      // It is never written to the database or included in the collection metadata.
      ...(githubToken
        ? { accessToken: githubToken }
        : {}),
    };
    const loader = new GithubRepoLoader(url, loaderOptions);

    let docs = await loader.load();

    // Filter files
    docs = docs.filter((doc) =>
      shouldIncludeFile(doc.metadata.source)
    );

    if (!docs.length) {
      return { status: 422, error: "No supported source files found in this repository" };
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
 

    const res = await prisma.collections.create({
      data:{
        name: collectionName,
        repoUrl: url,
        userId: user.id,
      }
    })

    if(!res){
      return {status:400 , error:"Failed to create collection record in database"};
    }
    return {status:200 , data:res};

  } catch (err: any) {
    console.error("Embedding Error:", err.message);
    return { status: 500, error: err instanceof Error ? err.message : "Unable to scan this repository. Please try again." };
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
