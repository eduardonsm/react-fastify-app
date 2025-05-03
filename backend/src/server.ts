import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = fastify({ logger: true });

const start = async () => {
    await app.register(cors, {
        origin: true,
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
      });
    
    await app.register(routes);

    try {
        await app.listen({
            port: Number(process.env.PORT) || 3333,
            host: '0.0.0.0'
          });
        console.log("Server is running on http://localhost:3333");
    } catch (err) {
        process.exit(1);
    }
};

start();
