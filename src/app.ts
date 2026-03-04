import express from "express";
import router from "./routes/index.routes";

const app = express();

app.use(express.json());

//TODO lo que empiece por /api va al archivo routes/index.routes.ts
app.use("/api", router);

//Ruta para test de API
app.use('/api', (req, res) => {
    res.json({
        msg: 'Desde API'
    });
});

export default app;