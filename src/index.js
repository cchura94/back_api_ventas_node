import express from "express"
import cors from "cors"
var history = require('connect-history-api-fallback');

import { ErrorHandler, handleError } from "./helpers/error"

import { RouteAuth } from "./routes/auth.routes"
import { RouteAdmin } from "./routes/admin.routes"

const app = express();
app.use(history());

const PORT = process.env.PORT || 3000

app.use(cors())

// para: req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static
app.use(express.static('public'))
app.use((req, res) => {
    console.log(path.join(__dirname, 'public/index.html'))
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
// rutas
app.use('/api', RouteAuth)
app.use('/api/v1', RouteAdmin)

app.get("/error", (req, res) => {
    throw new ErrorHandler(500, 'Error Interno del Servidor')
})

app.use((err, req, res, next) => {
    handleError(err, res)
})

app.listen(PORT, () => {
    console.log('Servidor Corriendo');
})