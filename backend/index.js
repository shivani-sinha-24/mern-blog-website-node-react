import * as dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import fileUpload from 'express-fileupload';
import * as path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//routes
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import main from './database/database.js';
import corsOptions from './config/corsOptions.js';
import errorHandler from './middleware/errorHanlder.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const absolutePath = path.resolve(__dirname, "..", "uploads");
const app = express();


//middleware
app.use(fileUpload())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(errorHandler)

app.use(cors(corsOptions));

// Connect to MongoDB
main().catch((err) => console.error(err));


//routes
app.get('/', (req, res) => res.send('Hello World from my blogs backend. '))
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

//listening port
app.listen(3009, () => {
  console.log("server started on port :3009");
});