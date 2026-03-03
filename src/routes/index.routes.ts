import { Router } from "express";
import productRoutes from "./product.routes";
import authRoutes from "./auth.routes"

const router = Router();

// Ejemplo: /api/ruta
router.use("/productos", productRoutes);
router.use("/auth", authRoutes);

export default router;