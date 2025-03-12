import { Request, Response } from "express";
import { Servidor } from "main/database/models/Servidor";

export const listarServidores = async (_req: Request, res: Response) => {
  const servidores = await Servidor.findAll()

  if (servidores.length < 1) {
    res.send({ servidores: servidores, message: "lista de servidores vazia." })
    return
  }

  res.send({ servidores: servidores })
}

export const incluirServidor = async (req: Request, res: Response) => {
  const { nomeCompleto, email, matricula, cpf } = req.body

  try {
    const novoServidor = await Servidor.create({
      nomeCompleto: nomeCompleto,
      email: email,
      matricula: matricula,
      cpf: cpf
    })

    res.status(201).send(novoServidor)
  } catch (error) {
    res.status(500).send({ message: "Erro ao cadastrar servidor" })
    console.log(error)
  }
}
