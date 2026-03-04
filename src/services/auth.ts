import { Request, Response } from "express";
import User from "../models/auth.model";
import { sendErrorResponse, sendSuccessResponse } from "../utils/utils";

//Registro de usuario
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, lastname, phone, email, password } = req.body;

        //Hasheasmo la contraseña con bcrypt
        const bcrypt = require("bcrypt");
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const createdUser = await User.create({ name, lastname, phone, email, password: hashedPassword });

        sendSuccessResponse(res, 201, "Usuario registrado correctamente", {
            name: createdUser.name,
            lastname: createdUser.lastname,
            phone: createdUser.phone,
            email: createdUser.email,
        });

    } catch (error) {
        console.error("Error en registerUser():", error);

        return sendErrorResponse(res, 500, "Error en el servidor", error); //CAMBIAR EN PRODUCCION
    }
};