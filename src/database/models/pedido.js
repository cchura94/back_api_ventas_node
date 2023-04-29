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
      models.Pedido.belongsTo(models.Cliente, {
        foreignKey:"clienteId"
      });

      models.Pedido.belongsToMany(models.Producto, {
        through: "pedidoproductos"
      })
    }
  }
  Pedido.init({
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cod_ped: DataTypes.STRING,
    estado_pedido: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    observacion: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};