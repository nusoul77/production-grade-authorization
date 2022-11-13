import express from "express";
import bodyParser from "body-parser";
import config from "./configs/app.config.js";

import authRouter from "./routers/auth.router.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(authRouter);

app.listen(config.app.port, () => {
  console.log("Server is running...");
});
