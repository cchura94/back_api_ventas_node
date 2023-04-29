"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouteAdmin = void 0;
var _express = require("express");
var _categoria = _interopRequireDefault(require("../controllers/categoria.controller"));
var _producto = _interopRequireDefault(require("../controllers/producto.controller"));
var _pedido = _interopRequireDefault(require("../controllers/pedido.controller"));
var authMiddleware = _interopRequireWildcard(require("./../middlewares/auth.middleware"));
var _validators = require("../helpers/validators");
var _multer = _interopRequireDefault(require("multer"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// para subida de archivos

const storageLocal = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/imagenes');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = (0, _multer.default)({
  storage: storageLocal
});
const RouteAdmin = (0, _express.Router)();
exports.RouteAdmin = RouteAdmin;
RouteAdmin.get("/categoria", authMiddleware.auth, _categoria.default.listar);
RouteAdmin.post("/categoria", authMiddleware.auth, _categoria.default.guardar);
RouteAdmin.post("/categoria-mostrar", authMiddleware.auth, _categoria.default.mostrar);
RouteAdmin.put("/categoria/:id", authMiddleware.auth, _categoria.default.modificar);
RouteAdmin.delete("/categoria/:id", authMiddleware.auth, _categoria.default.eliminar);

// actualizacion de imagen
RouteAdmin.post("/producto/:id/actualizar-imagen", upload.single("imagen"), _producto.default.actualizarImagen);
RouteAdmin.get("/producto", authMiddleware.auth, _producto.default.listar);
RouteAdmin.post("/producto", authMiddleware.auth, (0, _validators.productoCheck)(), _producto.default.guardar);
RouteAdmin.get("/producto/:id", authMiddleware.auth, _producto.default.mostrar);
RouteAdmin.put("/producto/:id", authMiddleware.auth, _producto.default.modificar);
RouteAdmin.delete("/producto/:id", authMiddleware.auth, _producto.default.eliminar);

// nuevo Cliente
RouteAdmin.post("/pedido/nuevo-cliente", authMiddleware.auth, _pedido.default.nuevoCliente);
RouteAdmin.get("/pedido/buscar-cliente", authMiddleware.auth, _pedido.default.buscarCliente);
RouteAdmin.get("/pedido", authMiddleware.auth, _pedido.default.listar);
RouteAdmin.post("/pedido", authMiddleware.auth, (0, _validators.pedidoCheck)(), _pedido.default.guardar);
RouteAdmin.get("/pedido/:id", authMiddleware.auth, _pedido.default.mostrar);
RouteAdmin.put("/pedido/:id", authMiddleware.auth, _pedido.default.modificar);
RouteAdmin.delete("/pedido/:id", authMiddleware.auth, _pedido.default.eliminar);