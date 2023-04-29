import { Router } from "express"
import categoriaController from "../controllers/categoria.controller"
import productoController from "../controllers/producto.controller"
import pedidoController from "../controllers/pedido.controller"
import * as authMiddleware from "./../middlewares/auth.middleware"
import { pedidoCheck, productoCheck } from "../helpers/validators"

// para subida de archivos
import multer from "multer"

const storageLocal = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/imagenes')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
  
const upload = multer({ storage: storageLocal })


export const RouteAdmin = Router()

RouteAdmin.get("/categoria", authMiddleware.auth, categoriaController.listar);
RouteAdmin.post("/categoria", authMiddleware.auth, categoriaController.guardar);
RouteAdmin.post("/categoria-mostrar", authMiddleware.auth, categoriaController.mostrar);
RouteAdmin.put("/categoria/:id", authMiddleware.auth, categoriaController.modificar);
RouteAdmin.delete("/categoria/:id", authMiddleware.auth, categoriaController.eliminar);

// actualizacion de imagen
RouteAdmin.post("/producto/:id/actualizar-imagen", upload.single("imagen"), productoController.actualizarImagen);


// obtener productos por pedido

RouteAdmin.get("/pedido/:id/get-productos", /*authMiddleware.auth,*/ pedidoController.getProductos);

RouteAdmin.get("/producto", authMiddleware.auth, productoController.listar);
RouteAdmin.post("/producto", authMiddleware.auth, productoCheck(), productoController.guardar);
RouteAdmin.get("/producto/:id", authMiddleware.auth, productoController.mostrar);
RouteAdmin.put("/producto/:id", authMiddleware.auth, productoController.modificar);
RouteAdmin.delete("/producto/:id", authMiddleware.auth, productoController.eliminar);

// nuevo Cliente
RouteAdmin.post("/pedido/nuevo-cliente", authMiddleware.auth, pedidoController.nuevoCliente);
RouteAdmin.get("/pedido/buscar-cliente", authMiddleware.auth, pedidoController.buscarCliente);

RouteAdmin.get("/pedido", authMiddleware.auth, pedidoController.listar);
RouteAdmin.post("/pedido", authMiddleware.auth, pedidoCheck(), pedidoController.guardar);
RouteAdmin.get("/pedido/:id", authMiddleware.auth, pedidoController.mostrar);
RouteAdmin.put("/pedido/:id", authMiddleware.auth, pedidoController.modificar);
RouteAdmin.delete("/pedido/:id", authMiddleware.auth, pedidoController.eliminar);
