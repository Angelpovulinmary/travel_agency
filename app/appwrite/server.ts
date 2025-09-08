import { Client } from "appwrite";

// Helper to ensure env variables are defined
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
}

export const appwriteConfig = {
  endpointUrl: getEnvVar("APPWRITE_API_ENDPOINT!"),
  projectId: getEnvVar("APPWRITE_PROJECT_ID!"),
  apiKey: getEnvVar("APPWRITE_API_KEY!"),
  databaseId: getEnvVar("APPWRITE_DATABASE_ID!"),
  userCollectionId: getEnvVar("APPWRITE_USERS_COLLECTION_ID!"),
  tripCollectionId: getEnvVar("APPWRITE_TRIPS_COLLECTION_ID!"),
};
console.log("APPWRITE_ENDPOINT:", process.env.APPWRITE_API_ENDPOINT);


const client = new Client()
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId);

export { client };
