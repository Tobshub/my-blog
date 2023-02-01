import express from "express";
import { config } from "dotenv";
import cors from "cors";
import appRouter from "./app-router";
import { PrismaConnect } from "./config/prisma";

config(); /** load env variables */
PrismaConnect() /** connect to mongodb with prisma */;

export const env = {
  PORT: process.env.PORT,
};

const app = express();

app.use(cors(), express.json());

app.use("*", appRouter);

const port = env.PORT || 4040;

app.listen(port, () => {
  console.log(`live (port ${port})`);
});
