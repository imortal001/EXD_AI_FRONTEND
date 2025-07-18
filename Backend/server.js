const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
require("dotenv").config();

const authRoutes = require("./Routes/authRoutes");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // <-- your frontend URL/port
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });








app.post("/generate-meme", async (req, res) => {
  const { inputText, memeType } = req.body;

  const prompt =
    memeType === "image"
      ? `Generate a visual meme idea and description for: \"${inputText}\"`
      : `Generate a very funny meme caption for: \"${inputText}\"`;

  try {
    const response = await axios.post(
      "https://api.together.xyz/v1/completions",
      {
        model: "meta-llama/Llama-3-8b-instruct",
        prompt: prompt,
        max_tokens: 200,
        temperature: 0.7,
        top_p: 0.9,
        stop: ["</s>"]
      },
      {
        headers: {
          "Authorization": `Bearer ${TOGETHER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const generatedText = response?.data?.choices?.[0]?.text?.trim();

    res.json({ result: generatedText });
  } catch (error) {
    if (error.response) {
      console.error("Llama API error response:", error.response.status, error.response.data);
    } else {
      console.error("Llama API error:", error.message);
    }
    res.status(500).json({ error: "Failed to generate meme", details: error.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});