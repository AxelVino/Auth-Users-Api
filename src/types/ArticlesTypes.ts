import { Document } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";

export interface ArticleProduct extends Document {
  name: string;
  brand: string;
  description: string;
  price: string;
}

export interface IArticleRepository extends Repository<ArticleProduct> {}

export interface IArticleProductService {
  createArticle(articleProduct: ArticleProduct): Promise<ArticleProduct>;
  findArticles(query?: Query): Promise<ArticleProduct[]>;
  findArticleById(id: string): Promise<ArticleProduct | null>;
  updateArticle(
    id: string,
    articleProduct: Partial<ArticleProduct>
  ): Promise<ArticleProduct | null>;
  deleteArticle(id: string): Promise<boolean>;
}
