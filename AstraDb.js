import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from 'dotenv';
dotenv.config({
    path: "./.env",
})

// Initialize the client
const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
export const db = client.db('https://d5631518-200c-49e6-8804-54883dd68004-us-east-2.apps.astra.datastax.com');

// (async () => {
  //   const colls = await db.listCollections();
  //   console.log('Connected to AstraDB:', colls);
  // })();
  
  export const connectDB = async () => {
    const colls = await db.listCollections();
    console.log('Connected to AstraDB:', colls);
  }