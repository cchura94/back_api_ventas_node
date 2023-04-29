"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productoCheck = exports.pedidoCheck = exports.categoriaCheck = void 0;
var _expressValidator = require("express-validator");
const productoCheck = () => {
  return [(0, _expressValidator.body)('nombre').trim().not().notEmpty().withMessage('El campo nombre es obligatorio'), (0, _expressValidator.body)('categoriaId').not().isEmpty().withMessage('la Categoria es Obligatoria')];
};
exports.productoCheck = productoCheck;
const categoriaCheck = () => {
  return [(0, _expressValidator.body)('nombre').trim().not().notEmpty().withMessage('El campo nombre es obligatorio')];
};
exports.categoriaCheck = categoriaCheck;
const pedidoCheck = () => {
  return [(0, _expressValidator.body)('clienteId').trim().not().notEmpty().withMessage('El campo ClienteId es obligatorio')];
};
exports.pedidoCheck = pedidoCheck;