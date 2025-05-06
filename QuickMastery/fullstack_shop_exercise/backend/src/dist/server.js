import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import dotenv from "dotenv";
// Initialize dotenv
dotenv.config();
// Initialize express and use defined port in env
const app = express();
const port = process.env.PORT ?? 3000;
// Use json and cors
app.use(express.json());
app.use(cors());
// Define route
app.use("/api", routes);
// Listen to port
async function startServer() {
    //await testConnection();
    //await main();
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
startServer();
