import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { cleanTables, seed, seedThenClean } from "./db/index.js"; /** Seeding */
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

// Use json
app.use(express.json());

// USe cookie parser
app.use(cookieParser());


// Use cors (currently running on local machine)
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));

// Define route
app.use("/forum/api", routes);

// Listen
async function startServer(): Promise<void> {
    // await seed(); /** Seed database */
    // await cleanTables();

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

startServer();
