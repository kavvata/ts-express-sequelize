import { Request, Response } from "express";
import { Servidor } from "main/database/models/Servidor";

export const listarServidores = async (_req: Request, res: Response) => {
  const servidores = await Servidor.findAll()

  if (servidores.length < 1) {
    return res.send({ servidores: servidores, message: "lista de servidores vazia." })
  }

  res.send({ servidores: servidores })
}

export const incluirServidor = async (req: Request, res: Response) => {
}
