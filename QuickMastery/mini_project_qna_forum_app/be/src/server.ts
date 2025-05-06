import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { cleanTables, seed, seedThenClean } from "./db/index.js"; /** Seeding */

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

// Use json
app.use(express.json());

// Use cors (currently running on local machine)
app.use(cors());

// Define route
// app.use("/api", routes);

// Listen
async function startServer(): Promise<void> {
    // await seed(); /** Seed database */

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

startServer();
