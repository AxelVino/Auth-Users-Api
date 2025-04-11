import express, { Application } from "express";
import morgan from "morgan";
import routes from "@routes/routes";
import cookieParser from "cookie-parser";
import { corsOptions } from "../config/corsOptions";
import cors from "cors";
import { errorHandler } from "@middlewares/errorHandler";
import { NotFoundError } from "../errors/notFoundError";

//Levantar el server con express

const app: Application = express();

app.use(cors(corsOptions));

//Luego condicionar esto para que no se realice en modo produccion
app.use((req, _res, next) => {
  console.log("Origin:", req.headers.origin);
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1", routes());
app.use((_req, _res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export default app;
