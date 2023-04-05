import express from "express"
import cors from "cors"

import { RouteAuth } from "./routes/auth.routes"
import { RouteAdmin } from "./routes/admin.routes"

const app = express();

app.use(cors())

// para: req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
app.use('/api', RouteAuth)
app.use('/api/v1', RouteAdmin)

app.listen(3000, () => {
    console.log('Servidor Corriendo PRUEBA 2');
})