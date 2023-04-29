"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _models = _interopRequireDefault(require("./../database/models"));
var _expressValidator = require("express-validator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// models.Sequelize.Op
var _default = {
  listar: async (req, res) => {
    try {
      // api/producto?q=&page=3&limit=10&categoria_id=2
      let q = req.query.q;
      // let cat_id = req.query.categoria_id
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);
      let offset = (page - 1) * limit;
      const productos = await _models.default.Producto.findAndCountAll({
        where: {
          nombre: {
            [_sequelize.Op.like]: `%${q}%`
          }
          // categoriaId: cat_id
        },

        offset: offset,
        limit: limit,
        include: [_models.default.Categoria]
      });
      return res.status(200).json(productos);
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  },
  guardar: async (req, res) => {
    try {
      // const { nombre, detalle } = req.body;
      let errors = (0, _expressValidator.validationResult)(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).json({
          errors: errors.array()
        });
      }
      const prod = await _models.default.Producto.create(req.body);
      if (prod.id) {
        return res.status(201).json({
          message: "Producto Registrado"
        });
      }
    } catch (error) {
      return res.status(422).json({
        message: error.message
      });
    }
  },
  actualizarImagen: async (req, res) => {
    let id = req.params.id;
    let datos = {};
    if (req.file) {
      datos.imagen = req.file.filename;
    }
    await _models.default.Producto.update(datos, {
      where: {
        id
      }
    });
    return res.status(200).json({
      message: "Imagen Actualizada"
    });
  },
  mostrar: (req, res) => {},
  modificar: (req, res) => {},
  eliminar: (req, res) => {}
};
exports.default = _default;