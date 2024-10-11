import { Request, Response } from 'express'; 
import { CreateLoanService } from '../../services/loan/CreateLoanService';

class CreateLoanController {
  async handle(req: Request, res: Response) {
    const { userEmail, bookIsbn } = req.body; 

    try {
      const createLoanService = new CreateLoanService();
      const loan = await createLoanService.execute({ userEmail, bookIsbn }); 
      return res.status(201).json(loan); 
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateLoanController }
