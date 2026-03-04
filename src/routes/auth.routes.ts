import { Router, Request, Response } from "express";
import { body } from 'express-validator'
import { registerUser } from "../services/auth";
import { validateRequest, validateUniqueFields } from "../middlewares/auth.middleware";
import User from "../models/auth.model";

const router = Router();

// POST /api/auth/login
router.post("/login", (req: Request, res: Response) => {
  res.json({
    status: "success",
    msg: "Login correcto",
  });
});

// POST /api/auth/register
router.post("/register", [
  //Validamos los campos con express-validator
  body('name', 'El nombre es obligatorio').notEmpty(),
  body('lastname', 'El apellido es obligatorio').notEmpty(),
  body('phone', 'El teléfono es obligatorio').notEmpty().isMobilePhone('es-CO').withMessage('El teléfono no es válido'),
  body('email', 'El email es obligatorio').isEmail().withMessage('El email no es válido'),
  body('password', 'La contraseña es obligatoria').notEmpty().isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
  //confirmPassword debe ser igual a password
  body('confirmPassword').notEmpty().withMessage('Debes confirmar la contraseña').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden');
    }
    return true;
  }),
], validateRequest, validateUniqueFields(User, ['phone', 'email']), registerUser);

export default router;