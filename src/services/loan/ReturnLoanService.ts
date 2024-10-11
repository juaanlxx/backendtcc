import prismaClient from "../../prisma";

interface ReturnRequest {
    userEmail: string;
    bookIsbn: string;
}

class ReturnLoanService {
    async execute({ userEmail, bookIsbn }: ReturnRequest) {
        // Verificar se o usuário existe
        const user = await prismaClient.user.findUnique({
            where: {
                email: userEmail,
            },
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Verificar se o livro existe
        const book = await prismaClient.book.findUnique({
            where: {
                isbn: bookIsbn,
            },
        });

        if (!book) {
            throw new Error('Livro não encontrado');
        }

        const loan = await prismaClient.loan.findFirst({
            where: {
                userEmail: userEmail,
                bookId: bookIsbn,
                status: 'active', // Verifica se o empréstimo está ativo
            },
        });

        if (!loan) {
            throw new Error('Empréstimo não encontrado ou já devolvido');
        }

        await prismaClient.loan.update({
            where: { id: loan.id },
            data: { status: 'returned' },
        });

      
        await prismaClient.book.update({
            where: { isbn: bookIsbn },
            data: {
                availableQuantity: { increment: 1 },
                available: true,
            },
        });

        
        const updatedBook = await prismaClient.book.findUnique({
            where: { isbn: bookIsbn },
        });

        if (updatedBook && updatedBook.availableQuantity > 0) {
            await prismaClient.book.update({
                where: { isbn: bookIsbn },
                data: { available: true },
            });
        }

        return { message: 'Devolução registrada com sucesso!' };
    }
}

export { ReturnLoanService };
