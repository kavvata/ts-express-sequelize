import express, { Request, Response, ErrorRequestHandler } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(routes);
app.use((_req: Request, res: Response) => {
  res.status(404);
  res.json({ error: "Endpoint não encontrado." });
});

const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  res.status(400); // Bad Request
  console.log(err);
  res.json({ error: "Ocorreu algum erro." });
};

app.use(errorHandler);

// Exporta a instância do Express
export { app };

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
