import { ArticleModel } from "@models/Articles";
import { IArticleRepository, ArticleProduct } from "types/ArticlesTypes";
import { Query } from "types/RepositoryTypes";

// OPERACIONES DEL REPOSITORY

export class ArticleRepository implements IArticleRepository {
  async create(data: ArticleProduct): Promise<ArticleProduct> {
    const newArticle = new ArticleModel(data);
    return await newArticle.save();
  }

  async find(query?: Query): Promise<ArticleProduct[]> {
    return await ArticleModel.find(query || {}).exec();
  }

  async findById(id: string): Promise<ArticleProduct | null> {
    return await ArticleModel.findById(id).exec();
  }
  async update(
    id: string,
    data: Partial<ArticleProduct>
  ): Promise<ArticleProduct | null> {
    return await ArticleModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await ArticleModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}
