import express from "express";
import {router} from "./routes";
import {db} from './config/db';
import colors from "colors";

//Conectar a base de datps
async function connectDB() {
    try {
        await db.authenticate();
        await db.sync();
        console.log(colors.bgGreen.bold('Conexión exitosa'));
    } catch (err) {
        console.log(err);
        console.log(colors.red.bold("Hubo un error al conectar a la BD"));
    }
}

connectDB().then();


export const server = express();

//Esta /api va a ir después de la url dominio. EJ: localhost:8080/api/productos
server.use('/api/productos', router);