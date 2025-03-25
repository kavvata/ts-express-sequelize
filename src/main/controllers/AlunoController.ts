import { Request, Response } from "express";
import { Aluno } from "main/models/Aluno";

// 🔹 Listar todos os alunos
export const listarAlunos = async (_req: Request, res: Response) => {
  const alunos = await Aluno.findAll();
  res.send({ alunos: alunos });
};

// 🔹 Cadastrar um novo aluno
export const cadastrarAluno = async (req: Request, res: Response) => {
  const { nome, email, matricula } = req.body;

  let existente = await Aluno.findOne({
    where: { matricula: matricula },
  });
  if (existente) {
    res
      .status(403)
      .send({ message: "Erro ao cadastrar Aluno: Matrícula já cadastrada" });
    return;
  }

  // 🔹 Criando o aluno sem verificações adicionais
  let novoAluno = await Aluno.create({ nome, email, matricula });

  res.status(201).send({
    message: "Aluno cadastrado com sucesso.",
    novoAluno,
  });
};
