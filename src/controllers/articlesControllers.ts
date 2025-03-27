import { ArticleRepository } from "@repositories/articlesRepositories";
import { ArticleProductService } from "@services/ArticlesServices";
import { Request, Response } from "express";
import {
  IArticleRepository,
  IArticleProductService,
  ArticleProduct,
} from "types/ArticlesTypes";

const articlesRepository: IArticleRepository = new ArticleRepository();
const articlesService: IArticleProductService = new ArticleProductService(
  articlesRepository
);

export const findArticles = async (_req: Request, res: Response) => {
  try {
    const articles = await articlesService.findArticles();
    if (!(articles.length == 0)) {
      res.json(articles);
    } else {
      res.status(404).json({ message: "no articles found." });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
  return;
};

export const findArticleById = async (req: Request, res: Response) => {
  try {
    const article = await articlesService.findArticleById(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: "Not article found." });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
  return;
};

export const createArticle = async (req: Request, res: Response) => {
  try {
    const newArticle: ArticleProduct = req.body;
    const result = await articlesService.createArticle(newArticle);
    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
  return;
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const article = await articlesService.updateArticle(
      req.params.id,
      req.body
    );
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: "Not article found." });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
  return;
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const article = await articlesService.deleteArticle(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: "Not article found." });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
  return;
};
