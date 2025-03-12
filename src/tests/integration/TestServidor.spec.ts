import { app } from "main/app";
import { Servidor, ServidorInstance } from "main/database/models/Servidor";
import request from "supertest";

describe("Teste de rotas de listagem de servidores", () => {
  const listaIdsServidor = new Array<number>

  beforeAll(async () => {
    let servidor = await Servidor.create({
      nomeCompleto: "Joao da Silva",
      email: "joao@teste.com",
      matricula: "1001",
      cpf: "123.456.789-10"
    })
    listaIdsServidor.push(servidor.id)

    servidor = await Servidor.create({
      nomeCompleto: "Maria da Silva",
      email: "maria@teste.com",
      matricula: "1002",
      cpf: "125.486.780-71"
    })
    listaIdsServidor.push(servidor.id)
  })

  afterAll(async () => {
    listaIdsServidor.forEach(async id => {
      await Servidor.destroy({ where: { id: id } })
    })
  })

  it("deve listar todos os servidores com sucesso", async () => {
    const response = await request(app).get('/servidores/')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('servidores')
    expect(response.body.servidores).toBeInstanceOf(Array)
    const servidores = response.body.servidores;

    servidores.forEach((servidor: ServidorInstance) => {
      expect(listaIdsServidor).toContain(servidor.id)
    })
  })
})
