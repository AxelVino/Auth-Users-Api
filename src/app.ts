import dotenv from "dotenv";
dotenv.config();
import "@config/mongodb";
import "module-alias/register";
import app from "@server/server";
import https from "https";
import fs from "fs";

const port = process.env.PORT || 4000;

const options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
