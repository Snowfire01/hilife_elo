import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import recordMatchRoute from "./routes/recordMatch";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.post("/recordMatch", recordMatchRoute);

app.listen(port, () => {
   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
