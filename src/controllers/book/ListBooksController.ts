import { Request, Response } from "express";
import { ListBooksService } from "../../services/book/ListBooksService";

class ListBooksController {
  async handle(req: Request, res: Response) {
    const listBooksService = new ListBooksService();

    try {
      const books = await listBooksService.execute(); // Chama o serviço para obter os livros
      return res.json(books); // Retorna os livros como JSON
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Retorna erro em caso de falha
    }
  }
}

export { ListBooksController };
