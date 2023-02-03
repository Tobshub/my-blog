import express from "express";
import { config } from "dotenv";
import cors from "cors";
import appRouter from "./app-router";
import { PrismaConnect } from "./config/prisma";

config(); /** load env variables */
PrismaConnect() /** connect to mongodb with prisma */;

export const env = {
  PORT: process.env.PORT,
  JwtSecret: process.env.JWT_SECRET,
  password: process.env.USER_PASSWORD,
  email: process.env.USER_EMAIL,
};

const app = express();

app.use(cors(), express.json());

app.use("/api", appRouter, (req, res) => {
  res.send("hello from the server");
});

app.use("/", (req, res) => {
  res.send("what are you looking for here?");
});

const port = env.PORT || 4040;

app.listen(port, () => {
  console.log(`live (port ${port})`);
});
