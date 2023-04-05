import { Router } from "express"
import categoriaController from "../controllers/categoria.controller"
import productoController from "../controllers/producto.controller"
import * as authMiddleware from "./../middlewares/auth.middleware"
export const RouteAdmin = Router()

RouteAdmin.get("/categoria",/* authMiddleware.auth, */categoriaController.listar);
RouteAdmin.post("/categoria", authMiddleware.auth, categoriaController.guardar);
RouteAdmin.post("/categoria-mostrar", authMiddleware.auth, categoriaController.mostrar);
RouteAdmin.put("/categoria/:id", authMiddleware.auth, categoriaController.modificar);
RouteAdmin.delete("/categoria/:id", authMiddleware.auth, categoriaController.eliminar);


RouteAdmin.get("/producto", authMiddleware.auth, productoController.listar);
RouteAdmin.post("/producto", authMiddleware.auth, productoController.guardar);
RouteAdmin.get("/producto/:id", authMiddleware.auth, productoController.mostrar);
RouteAdmin.put("/producto/:id", authMiddleware.auth, productoController.modificar);
RouteAdmin.delete("/producto/:id", authMiddleware.auth, productoController.eliminar);

