import { Router } from "express";

import * as ServidorController from "main/controllers/ServidorController";
import * as AlunoController from "main/controllers/AlunoController";
import * as DisciplinaController from "main/controllers/DisciplinaController";
import * as AlunoDisciplinaController from "main/controllers/AlunoDisciplinaController";

const router = Router();

router.get("/", (_req, res) => {
  res.send("oi mae!");
});

// ServidorController
router.get("/servidores", ServidorController.listarServidores);
router.post("/servidores", ServidorController.incluirServidor);
router.get("/listarTodosAlunos", AlunoController.listarAlunos);
router.post("/cadastrarAluno", AlunoController.cadastrarAluno);

router.get("/listarTodasDisciplinas", DisciplinaController.listarDisciplinas);
router.post("/cadastrarDisciplina", DisciplinaController.cadastrarDisciplina);

router.post(
  "/vincularAlunoADisciplina",
  AlunoDisciplinaController.vincularAlunoADisciplina,
);
router.get(
  "/listarDisciplinasDoAluno/:alunoId",
  AlunoDisciplinaController.listarDisciplinasDoAluno,
);

export default router;
