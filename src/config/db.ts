import {Sequelize} from 'sequelize-typescript'
import dotenv from 'dotenv'

//Importamos las variables de entorno
dotenv.config();

//Agarramos la DATABASE_URL que ya tenemos
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error("Falta la variable de entorno DATABASE_URL");
}

//La base de datos, en este caso, externa subida a render
export const db = new Sequelize(DATABASE_URL, {
    /**
     * dirname retorna la ubicacion del archivo actual,
     * nos salimos de la carpeta y entramos a models
     * diciendo que todos los arhivos de la carpeta models que tengan .ts son modelos
     */
    models: [__dirname + '/../models/**/*.{ts,js}'],
    logging: false, //Desactivamos el logging de Sequelize
});