import { Request, Response } from "express";
import { Aluno } from "../models/Aluno";
import { Disciplina } from "../models/Disciplina";

export const listarDisciplinasDoAluno = async (req: Request, res: Response) => {
  const { alunoId } = req.params;

  const aluno = await Aluno.findByPk(alunoId, {
    include: { model: Disciplina }, // Inclui todas as disciplinas do aluno
  });

  if (aluno) {
    res.send(aluno); // Retorna tudo de forma crua
  }

  res.status(404).send({ error: "Aluno não encontrado." });
};

export const vincularAlunoADisciplina = async (req: Request, res: Response) => {
  const { alunoId, disciplinaId } = req.body;

  // Buscar o aluno e a disciplina no banco de dados
  const aluno = await Aluno.findByPk(alunoId);
  const disciplina = await Disciplina.findByPk(disciplinaId);

  if (!aluno || !disciplina) {
    res.status(404).send({ error: "Aluno ou disciplina não encontrada." });
    return;
  }

  // Criar o vínculo entre aluno e disciplina
  await (aluno as any).addDisciplina(disciplina); // addDisciplina vem do relacionamento belongsToMany

  res.send({ message: "Aluno vinculado à disciplina com sucesso!" });
};
