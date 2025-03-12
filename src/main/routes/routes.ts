import { Router } from "express"

const router = Router()

router.get('/', (_req, res) => {
  res.send('oi mae!')
})

export default router
