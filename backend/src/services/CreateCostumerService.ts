import prismaClient from "../prisma";

interface ICreateCostumerService {
    name: string;
    email: string;
}

class CreateCostumerService {

    async execute({name, email}: ICreateCostumerService) {
        if (!name || !email) {
        throw new Error("Name and email are required.");
        }
    
        const customer = await prismaClient.customer.create({
            data: {
                name,
                email,
                status:true
            }
        });
              
        return customer;
    }
}
export { CreateCostumerService };

