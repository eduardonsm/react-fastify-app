import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCostumerService  } from "../services/DeleteCostumerService";

class DeleteCostumerController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const deleteCostumerService = new DeleteCostumerService();
        const customer = await deleteCostumerService.execute({id});

        return reply.send(customer);
    }
}
export { DeleteCostumerController };