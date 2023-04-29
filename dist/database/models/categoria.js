'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Categoria.hasMany(models.Producto, {
        foreignKey: "categoriaId"
      });
    }
  }
  Categoria.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'El nombre es Obligatorio'
        },
        notEmpty: {
          args: true,
          msg: "El nombre de categoria no deberia ser vacio"
        },
        len: {
          args: [3, 20],
          msg: "El nombre debe tener entre 3 y 100 caracteres"
        }
      }
    },
    detalle: DataTypes.TEXT,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Categoria'
  });
  return Categoria;
};