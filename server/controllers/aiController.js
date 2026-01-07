import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import FormData from "form-data";
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");



const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const { plan } = req.plan;
    const { free_usage } = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    const tokenMap = {
      800: 1200,
      1200: 1800,
      1600: 2400,
    };
    const maxTokens = tokenMap[length] || 1600;

    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash-lite",
      messages: [
        {
          role: "system",
          content: `You are a professional article writer.

                    IMPORTANT RULES:
                    - Make headings and sub headings as required
                    - Output ONLY clean Markdown
                    - Do NOT mention fonts, sizes, styles, or formatting instructions
                    - Use Markdown headings (#, ##, ###)
                    - Write full paragraphs
                    - Include a clear conclusion
                    - Never describe how text should be formatted`,
        },
        {
          role: "user",
          content: `${prompt}\n\nIMPORTANT: Complete all paragraphs fully. Do not end mid-sentence.`,
        },
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash-lite",
      messages: [
        {
          role: "system",
          content: `
                      You are a professional blog title generator.

                      STRICT RULES:
                      - Output ONLY a Markdown bullet list
                      - Each title must be on its own line
                      - Use "-" for bullets
                      - NO paragraphs
                      - NO explanations
                      - NO unfinished titles
                      `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: 200,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type) 
    VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;
    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`INSERT INTO creations (user_id, prompt, content, type, publish) 
    VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;

    res.json({ success: true, secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const  image  = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql`INSERT INTO creations (user_id, prompt, content, type) 
    VALUES (${userId}, 'Remove background from the image', ${secure_url}, 'image')`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (!image || !object) {
      return res.json({ success: false, message: "Image and object required" });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    const upload = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(upload.public_id, {
      transformation: [
        {
          effect: `gen_remove:${object}`,
        },
      ],
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Remove ${object}`}, ${imageUrl}, 'image')
    `;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (!resume) {
      return res.json({ success: false, message: "Resume file is required" });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

   const buffer = req.file.buffer;
   const data = await pdfParse(buffer);



    const MAX_RESUME_CHARS = 6000;
    const safeResumeText = data.text.slice(0, MAX_RESUME_CHARS);

    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash-lite",
      messages: [{ role: "user", content: safeResumeText }],
      temperature: 0.7,
      max_tokens: 1800,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Resume Review', ${content}, 'resume-review')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};