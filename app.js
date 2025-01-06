import express from 'express';
const app = express();
import dotenv from 'dotenv';
import { connectDB } from "./AstraDb.js";
import cors from 'cors';
const PORT = process.env.PORT || 3000;

dotenv.config({
    path: "./.env",
})

    app.use(cors(
        {
            origin: 'https://social-media-insight-frontend.vercel.app',
            credentials: true,
        }
    ));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.send("hello world");
})

import mediaInsight from "./routes/mediaInsight.js";

app.use("/api/v1", mediaInsight);

connectDB();

const server = app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
});

process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
})

