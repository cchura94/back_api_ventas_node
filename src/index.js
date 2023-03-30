import express from "express"
import cors from "cors"

import { Route } from "./routes/auth.routes"

const app = express();

app.use(cors())

// para: req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
app.use('/api', Route)

app.listen(3000, () => {
    console.log('Servidor Corriendo PRUEBA 2');
})