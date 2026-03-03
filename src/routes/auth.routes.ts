import { Router } from "express";

const router = Router();

// POST /api/auth/login
router.post("/login", (req, res) => {
  res.json({
    status: "success",
    msg: "Login correcto",
  });
});

// POST /api/auth/register
router.post("/register", (req, res) => {
  res.json({
    status: "success",
    msg: "Register correcto",
  });
});

export default router;