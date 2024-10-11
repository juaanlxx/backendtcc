import prismaClient from "../../prisma";
import { addDays } from 'date-fns';

interface LoanRequest {
  userEmail: string;
  bookIsbn: string; 
}

class CreateLoanService {
  async execute({ userEmail, bookIsbn }: LoanRequest) {
    const user = await prismaClient.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }


    const book = await prismaClient.book.findUnique({
      where: { isbn: bookIsbn },
    });

    if (!book) {
      throw new Error('Livro não encontrado.');
    }


    if (book.availableQuantity <= 0) {
      throw new Error('Livro indisponível para empréstimo.');
    }


    const returnDate = addDays(new Date(), 14);


    const loan = await prismaClient.loan.create({
      data: {
        loanDate: new Date(),
        returnDate,
        status: 'active',
        userEmail,
        bookId: bookIsbn,
      },
      select: {
        id: true,
        loanDate: true,
        returnDate: true,
        status: true,
        user: {
          select: {
            name: true,
            email: true,
            address: true,
            cpf: true,
          },
        },
        book: {
          select: {
            title: true,
            isbn: true,
          },
        },
      },
    });


    await prismaClient.book.update({
      where: { isbn: bookIsbn },
      data: {
        availableQuantity: book.availableQuantity - 1,
        available: book.availableQuantity - 1 > 0, 
      },
    });

    return loan; 
  }
}

export { CreateLoanService }; 
