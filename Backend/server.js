import { connectDB } from "./data/database.js";
import express from "express";
import { config } from "dotenv";
import createRouter from "./routes/route.js"
import cors from "cors";

connectDB();
const app = express();

config({
    path: "./data/config.env",
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials:true,
    allowedHeaders:'Origin, X-Requested-With, Content-Type, Accept',
}));

app.use("/api", createRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is Listening on port ${process.env.PORT}`);
})