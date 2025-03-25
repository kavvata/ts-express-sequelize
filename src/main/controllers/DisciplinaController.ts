import { Request, Response } from "express";
import { Disciplina } from "../models/Disciplina";

// 🔹 Listar disciplinas
export const listarDisciplinas = async (req: Request, res: Response) => {
  const disciplinas = await Disciplina.findAll();
  res.send(disciplinas);
};

// 🔹 Cadastrar disciplina
export const cadastrarDisciplina = async (req: Request, res: Response) => {
  const { nome } = req.body;

  if (nome) {
    let disciplinaExistente = await Disciplina.findOne({ where: { nome } });
    if (!disciplinaExistente) {
      let novaDisciplina = await Disciplina.create({ nome });

      res.status(201);
      res.send({
        message: "Disciplina cadastrada com sucesso.",
        novaDisciplina,
      });
    } else {
      res.status(400).send({ error: "Nome da disciplina já existe." });
      return;
    }
  }

  res.status(400).send({ error: "Nome da disciplina não enviado." });
  return;
};
