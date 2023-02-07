import express from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Sodiq says hi",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      max_tokens: 2000,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err || "Something went wrong");
  }
});

app.listen(8002, () => console.log("Server started on port 8002"));
