import prismaClient from "../../prisma"; // Importa o prismaClient para fazer consultas ao banco

class ListBooksService {
  async execute() {
    const books = await prismaClient.book.findMany({
      select: {
        title: true,
        isbn: true,
        editor: true,
        publicationYear: true,
        availableQuantity: true,
        volume: true,
        numberPages: true,
        banner: true, // Certifique-se de que a imagem está armazenada no banco
      },
    });

    console.log(books);
    return books; // Retorna a lista de livros
  }
}

export { ListBooksService };
