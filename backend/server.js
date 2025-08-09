require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


app.post("/chat", async (req, res) => {
  const userMessage = req.body.userMessage;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You're a helpful assistant." },
          { role: "user", content: userMessage },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5500", // use your actual frontend domain in production
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    res.json({ reply: aiResponse });
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(500).json({
      error: "Failed to get the response from AI.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at PORT: ${port}`);
});
