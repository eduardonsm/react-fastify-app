import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = fastify({ logger: true });

const start = async () => {
    await app.register(cors, {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
    });
    
    await app.register(routes);

    try {
        await app.listen({ port: 3333 });
        console.log("Server is running on http://localhost:3333");
    } catch (err) {
        process.exit(1);
    }
};

start();
