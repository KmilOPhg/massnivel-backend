import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';
import { sendErrorResponse } from "../utils/utils";
import { Model, ModelStatic } from "sequelize";

//Verificamos si hay errores de validación
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendErrorResponse(res, 400, "Error de validación", errors.array());
    }
    next();
}

//Validar campos registrados en la base de datos (email, teléfono)
export const validateUniqueFields = (model: ModelStatic<Model>, fields: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            //Iteramos sobre los campos a validar
            for (const field of fields) {
                if (req.body[field]) {
                    const existing = await model.findOne({
                        where: { [field]: req.body[field] }
                    });

                    // Si encontramos un registro con el mismo valor, retornamos un error
                    if (existing) {
                        return sendErrorResponse(
                            res,
                            400,
                            `El ${field} ya está registrado`
                        );
                    }
                }
            }
            next();
        } catch (error) {
            console.error("Error en validateUniqueFields():", error);
            return sendErrorResponse(res, 500, "Error en el servidor", error); //CAMBIAR EN PRODUCCION
        }
    }
}
