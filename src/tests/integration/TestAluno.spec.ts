import { app } from "main/app";
import { sequelize } from "main/database/connections/db";
import { Aluno } from "main/models/Aluno";
import request from "supertest";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("Teste entre rota listarServidores e banco de dados", () => {
  const listaIdsAlunos = new Array<number>();

  beforeAll(async () => {
    let aluno = await Aluno.create({
      nome: "Joao da Silva",
      email: "joao@teste.com",
      matricula: "1001",
    });
    listaIdsAlunos.push(aluno.id);

    aluno = await Aluno.create({
      nome: "Maria da Silva",
      email: "maria@teste.com",
      matricula: "1002",
    });
    listaIdsAlunos.push(aluno.id);
  });

  afterAll(async () => {
    listaIdsAlunos.forEach(async (id) => {
      await Aluno.destroy({ where: { id: id } });
    });
  });

  it("deve listar todos os servidores com sucesso", async () => {
    const response = await request(app).get("/listarTodosAlunos");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("alunos");
    expect(response.body.alunos).toBeInstanceOf(Array);
    expect(response.body.alunos.length).toBeGreaterThan(1);

    response.body.alunos.forEach((aluno: Aluno) => {
      expect(listaIdsAlunos).toContain(aluno.id);
    });
  });
});

describe("Teste entre rota cadastrarAluno e banco de dados", () => {
  let alunoExistenteId: number;
  let alunoId: number;

  afterEach(async () => {
    if (alunoId) {
      await Aluno.destroy({ where: { id: alunoId } });
    }

    if (alunoExistenteId) {
      await Aluno.destroy({ where: { id: alunoExistenteId } });
    }
  });

  it("deve cadastrar um novo aluno com sucesso", async () => {
    const alunoDados = {
      nome: "Joao da Silva",
      email: "joao@teste.com",
      matricula: "1001",
    };
    const response = await request(app)
      .post("/cadastrarAluno")
      .send(alunoDados);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("novoAluno");
    alunoId = response.body.novoAluno.id as number;

    expect(response.body.novoAluno.nome as string).toBe(alunoDados.nome);
    expect(response.body.novoAluno.email as string).toBe(alunoDados.email);
    expect(response.body.novoAluno.matricula as string).toBe(
      alunoDados.matricula,
    );
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Aluno cadastrado com sucesso.");
  });

  it("deve retornar erro ao tentar cadastrar aluno com mesma matricula", async () => {
    const alunoExistenteDados = {
      nome: "Maria da Silva",
      email: "maria@teste.com",
      matricula: "1001",
      cpf: "125.486.780-71",
    };

    const existente = await Aluno.create(alunoExistenteDados);
    alunoExistenteId = existente.id;

    const novoAlunoDados = {
      nome: "Joao da Silva",
      email: "joao@teste.com",
      matricula: "1001",
      cpf: "123.456.789-10",
    };

    const response = await request(app)
      .post("/cadastrarAluno")
      .send(novoAlunoDados);

    if (response.body.novoAluno) {
      alunoId = response.body.novoAluno.id;
    }
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Erro ao cadastrar Aluno: Matrícula já cadastrada",
    );
  });
});
