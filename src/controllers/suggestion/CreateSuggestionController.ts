import { Request, Response } from "express";
import { CreateSuggestionService } from "../../services/suggestion/CreateSuggestionService"
class CreateSuggestionController {
    async handle(req: Request, res: Response) {
        const { subject, suggestedBook } = req.body;

        const createSuggestionService = new CreateSuggestionService();

        try {
            const suggestion = await createSuggestionService.execute({ subject, suggestedBook });
            return res.json(suggestion);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateSuggestionController };