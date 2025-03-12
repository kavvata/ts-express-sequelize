import { Request, Response } from "express";
import { Servidor } from "main/database/models/Servidor";

export const listarServidores = async (req: Request, res: Response) => {
  const servidores = await Servidor.findAll()

  if (servidores.length < 1) {
    res.send({ servidores: servidores, message: "lista de servidores vazia." })
    return
  }

  res.send({ servidores: servidores })
}

export const incluirServidor = async (req: Request, res: Response) => {
}
