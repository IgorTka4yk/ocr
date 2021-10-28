import express from "express";
import dotenv from "dotenv";
import log4js from "log4js";

import routes from "./api/routes";

dotenv.config();

const logger = log4js.getLogger();
logger.level = process.env.SERVER_LOG_LEVEL || "error";

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(express.json());

app.use("/api/v1/", routes);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
