import { Router } from "express";

const router = Router();

// Ejemplo appi/productos
router.get("/", (req, res) => {
  res.json({
    status: "success",
    msg: "GET productos correcto",
  });
});

router.post("/", (req, res) => {
  res.json({
    status: "success",
    msg: "POST productos correcto",
  });
});

export default router;