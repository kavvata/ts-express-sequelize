import { app } from "main/app";
import { Servidor, ServidorInstance } from "main/models/Servidor";
import request from "supertest";

describe("Teste entre rota listarServidores e banco de dados", () => {
  const listaIdsServidor = new Array<number>();

  beforeAll(async () => {
    await Servidor.sync({ force: true });

    let servidor = await Servidor.create({
      nomeCompleto: "Joao da Silva",
      email: "joao@teste.com",
      matricula: "1001",
      cpf: "123.456.789-10",
    });
    listaIdsServidor.push(servidor.id);

    servidor = await Servidor.create({
      nomeCompleto: "Maria da Silva",
      email: "maria@teste.com",
      matricula: "1002",
      cpf: "125.486.780-71",
    });
    listaIdsServidor.push(servidor.id);
  });

  afterAll(async () => {
    listaIdsServidor.forEach(async (id) => {
      await Servidor.destroy({ where: { id: id } });
    });
  });

  it("deve listar todos os servidores com sucesso", async () => {
    const response = await request(app).get("/servidores");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("servidores");
    expect(response.body.servidores).toBeInstanceOf(Array);

    response.body.servidores.forEach((servidor: ServidorInstance) => {
      expect(listaIdsServidor).toContain(servidor.id);
    });
  });
});

describe("Teste entre rota incluirServidor e banco de dados", () => {
  let servidorExistenteId: number;
  let servidorId: number;

  afterEach(async () => {
    if (servidorId) {
      await Servidor.destroy({ where: { id: servidorId } });
    }

    if (servidorExistenteId) {
      await Servidor.destroy({ where: { id: servidorExistenteId } });
    }
  });

  it("deve cadastrar um novo servidor com sucesso", async () => {
    const servidorDados = {
      nomeCompleto: "Joao da Silva",
      email: "joao@teste.com",
      matricula: "1001",
      cpf: "123.456.789-10",
    };
    const response = await request(app).post("/servidores").send(servidorDados);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    servidorId = response.body.id as number;

    expect(response.body.nomeCompleto as string).toBe(
      servidorDados.nomeCompleto,
    );
    expect(response.body.email as string).toBe(servidorDados.email);
    expect(response.body.matricula as string).toBe(servidorDados.matricula);
    expect(response.body.cpf as string).toBe(servidorDados.cpf);
  });

  it("deve retornar erro ao tentar cadastrar servidor com mesma matricula", async () => {
    const servidorExistenteDados = {
      nomeCompleto: "Maria da Silva",
      email: "maria@teste.com",
      matricula: "1001",
      cpf: "125.486.780-71",
    };

    const existente = await Servidor.create(servidorExistenteDados);
    servidorExistenteId = existente.id;

    const novoServidorDados = {
      nomeCompleto: "Joao da Silva",
      email: "joao@teste.com",
      matricula: "1001",
      cpf: "123.456.789-10",
    };

    const response = await request(app)
      .post("/servidores")
      .send(novoServidorDados);

    if (response.body.id) {
      servidorId = response.body.id;
    }
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Erro ao cadastrar servidor: Matrícula já cadastrada",
    );
  });

  it("deve retornar erro ao tentar cadastrar servidor com mesmo cpf", async () => {
    const servidorExistenteDados = {
      nomeCompleto: "Maria da Silva",
      email: "maria@teste.com",
      matricula: "1002",
      cpf: "123.456.789-10",
    };

    const existente = await Servidor.create(servidorExistenteDados);
    servidorExistenteId = existente.id;

    const novoSerivdorDados = {
      nomeCompleto: "Joao da Silva",
      email: "joao@teste.com",
      matricula: "1001",
      cpf: "123.456.789-10",
    };

    const response = await request(app)
      .post("/servidores")
      .send(novoSerivdorDados);

    if (response.body.id) {
      servidorId = response.body.id;
    }

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Erro ao cadastrar servidor: CPF já cadastrado",
    );
  });
});
