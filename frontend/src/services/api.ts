import axios from "axios";

export const api = axios.create({
  baseURL: "https://react-fastify-app-production.up.railway.app",
});