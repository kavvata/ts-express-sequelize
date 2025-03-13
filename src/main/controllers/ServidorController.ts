import { Request, Response } from "express";
import { Servidor, ServidorCreationAttributes } from "main/models/Servidor";

export const listarServidores = async (_req: Request, res: Response) => {
  const servidores = await Servidor.findAll();

  if (servidores.length < 1) {
    res.send({ servidores: servidores, message: "lista de servidores vazia." });
    return;
  }

  res.send({ servidores: servidores });
};

export const incluirServidor = async (req: Request, res: Response) => {
  const attrsObrigatorios = ["matricula", "cpf", "email", "nomeCompleto"];

  if (!attrsObrigatorios.some((attr) => req.body[attr])) {
    res.status(422).send({
      message: "Erro ao cadastrar servidor: dados do servidor inválidos.",
    });
    return;
  }

  const attrs = req.body as ServidorCreationAttributes;

  let existente = await Servidor.findOne({
    where: { matricula: attrs.matricula },
  });
  if (existente) {
    res
      .status(403)
      .send({ message: "Erro ao cadastrar servidor: Matrícula já cadastrada" });
    return;
  }
  existente = await Servidor.findOne({ where: { cpf: attrs.cpf } });
  if (existente) {
    res
      .status(403)
      .send({ message: "Erro ao cadastrar servidor: CPF já cadastrado" });
    return;
  }

  try {
    const novoServidor = await Servidor.create({
      nomeCompleto: attrs.nomeCompleto,
      email: attrs.email,
      matricula: attrs.matricula,
      cpf: attrs.cpf,
    });

    res.status(201).send(novoServidor);
  } catch (error) {
    res.status(500).send({ message: "Erro ao cadastrar servidor" });
    console.log(error);
  }
};
