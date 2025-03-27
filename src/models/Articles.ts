import mongoose, { Schema } from "mongoose";
import { ArticleProduct } from "types/ArticlesTypes";

// Modelo de usuario

const ArticleSchema: Schema = new Schema<ArticleProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ArticleModel = mongoose.model<ArticleProduct>(
  "ArticleProduct",
  ArticleSchema
);
