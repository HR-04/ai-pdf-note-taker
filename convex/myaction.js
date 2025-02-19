"use node";

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const ingest = action({
  args: {
    splitText: v.array(v.string()), // Accept splitText as an array of strings
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("Ingesting text chunks for fileId:", args.fileId);
    console.log("Text chunks:", args.splitText);

    await ConvexVectorStore.fromTexts(
      args.splitText, // array of text chunks
      { fileId: args.fileId }, // metadata
      new GoogleGenerativeAIEmbeddings({
        apiKey: 'AIzaSyCUosaWisfGnP-W6E3kI5Ld5epd4LFG0Nw',
        model: "embedding-001", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    console.log("Ingestion completed for fileId:", args.fileId);
    return "Completed...";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("Searching for query:", args.query);
    console.log("Filtering by fileId:", args.fileId);

    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: 'AIzaSyCUosaWisfGnP-W6E3kI5Ld5epd4LFG0Nw',
        model: "embedding-001", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    // Perform similarity search with more results
    const results = await vectorStore.similaritySearch(args.query, 10); // Increase the number of results
    console.log("Raw results from similaritySearch:", results);

    // Filter results by fileId
    const filteredResults = results.filter((q) => q.metadata.fileId === args.fileId);
    console.log("Filtered results:", filteredResults);

    return JSON.stringify(filteredResults);
  },
});