import { Router } from "express";

import * as ServidorController from "main/controllers/ServidorController";

const router = Router();

router.get("/", (_req, res) => {
  res.send("oi mae!");
});

// ServidorController
router.get("/servidores", ServidorController.listarServidores);
router.post("/servidores", ServidorController.incluirServidor);

export default router;
