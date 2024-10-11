import prismaClient from "../../prisma";

interface SuggestionRequest{
    subject:string;
    suggestedBook:string;
}

class CreateSuggestionService{
    async execute({ subject, suggestedBook }: SuggestionRequest){

        if(subject === '' && suggestedBook === ''){
            throw new Error('Preencha todos os campos corretamente!')
        }

        const suggestion = await prismaClient.suggestion.create({
            data :{
               subject:subject,
               suggestedBook:suggestedBook,
            },
            select:{
                id: true,
                subject:true,
                suggestedBook:true,
            }
        })

        return suggestion;

    }
}

export { CreateSuggestionService }