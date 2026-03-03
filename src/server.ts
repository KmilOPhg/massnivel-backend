import { db } from "./config/db";
import colors from "colors";

export async function connectDB() {
  try {
    // Autenticar la conexión con la base de datos
    await db.authenticate();
    
    // Sincronizar los modelos con la base de datos
    await db.sync();
    console.log(colors.bgGreen.bold("Conexión exitosa"));
  } catch (err) {
    console.log(err);
    console.log(colors.red.bold("Error al conectar a la BD"));
  }
}