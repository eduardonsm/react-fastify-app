import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCostumerService } from "../services/CreateCostumerService";

class CreateCostumerController{
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const custumerService = new CreateCostumerService();
        const { name, email } = request.body as { name: string; email: string };
        if (!name || !email) {
            return reply.status(400).send({ error: "Name and email are required." });
        }
        const costumer = await custumerService.execute( {name, email} );
        
        reply.send(costumer);
    }
}

export { CreateCostumerController };
