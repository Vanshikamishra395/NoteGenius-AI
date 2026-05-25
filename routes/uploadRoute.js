import express from "express";
import multer from "multer";
import fs from "fs";
import { PDFParse } from "pdf-parse";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);

    const parser = new PDFParse({ data: dataBuffer });

    const pdfData = await parser.getText();

    const response = `
## Summary
This is a sample AI response. Gemini quota is temporarily exhausted.

## Extracted Text Preview
${pdfData.text.substring(0, 800)}

## Important Topics
1. Topic 1
2. Topic 2
3. Topic 3

## MCQs
1. Sample question?
A. Option 1
B. Option 2
C. Option 3
D. Option 4

## Long Answer Questions
1. Explain the main concept.
2. Describe its applications.
`;

    res.json({
      message: "AI Notes Generated Successfully",
      aiResponse: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error generating AI notes",
    });
  }
});

export default router;