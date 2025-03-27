import mongoose from "mongoose";
import dotenv from "dotenv";

// Conexion a base de datos

dotenv.config();

const mongoDbUrl = process.env.MONGODB_URL_STRING as string;

export default (async () => {
  try {
    await mongoose.connect(mongoDbUrl);
    console.log("Db connected...");
  } catch (error) {
    console.log("error :>> ", error);
    process.exit(1);
  }
})();
