'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pedido.init({
    fecha: DataTypes.DATE,
    cod_ped: DataTypes.STRING,
    estado_pedido: DataTypes.INTEGER,
    clienteId: DataTypes.INTEGER,
    observacion: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};