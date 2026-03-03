import app from "./app";
import { connectDB } from "./server";
import colors from "colors";

const port = process.env.PORT || 9000;

// Iniciar el servidor
async function start() {
  await connectDB();

  //El punto de entrada del servidor
  app.listen(port, () => {
    console.log(colors.cyan.bold(`Server listening on port ${port}`));
  });
}

start();