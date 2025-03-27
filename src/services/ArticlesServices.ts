import {
  ArticleProduct,
  IArticleProductService,
  IArticleRepository,
} from "types/ArticlesTypes";
import { Query } from "types/RepositoryTypes";

//Reglas de negocio

export class ArticleProductService implements IArticleProductService {
  private articleRepository: IArticleRepository;

  constructor(articleRepository: IArticleRepository) {
    this.articleRepository = articleRepository;
  }

  async createArticle(articleProduct: ArticleProduct): Promise<ArticleProduct> {
    return this.articleRepository.create(articleProduct);
  }

  async findArticles(query?: Query): Promise<ArticleProduct[]> {
    return this.articleRepository.find(query);
  }

  async findArticleById(id: string): Promise<ArticleProduct | null> {
    return this.articleRepository.findById(id);
  }

  async updateArticle(
    id: string,
    articleProduct: Partial<ArticleProduct>
  ): Promise<ArticleProduct | null> {
    return this.articleRepository.update(id, articleProduct);
  }

  async deleteArticle(id: string): Promise<boolean> {
    return this.articleRepository.delete(id);
  }
}
