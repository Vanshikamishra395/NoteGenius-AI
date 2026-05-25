import uploadRoute from "./routes/uploadRoute.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/upload", uploadRoute);

app.get("/", (req, res) => {
  res.send("NoteGenius Backend is running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});