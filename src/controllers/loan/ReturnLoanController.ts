import { Request, Response } from 'express';
import { ReturnLoanService } from '../../services/loan/ReturnLoanService';

class ReturnLoanController {
    async handle(req: Request, res: Response) {
        const { userEmail, bookIsbn } = req.body;

        try {
            const returnLoanService = new ReturnLoanService();
            const result = await returnLoanService.execute({ userEmail, bookIsbn });
            return res.status(200).json(result); 
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { ReturnLoanController };
