'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Producto.belongsTo(models.Categoria, {
        foreignKey: "categoriaId"
      });
      models.Producto.belongsToMany(models.Pedido, {
        through: "PedidoProducto",
        foreignKey: 'ProductoId',
        // replaces `categoryId`
        otherKey: 'PedidoId' // replaces `productId`
      });
    }
  }

  Producto.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'El Campo Nombre no puede estar vacio'
        },
        len: {
          args: [3, 100],
          msg: "El nombre debe tener entre 3 y 100 caracteres"
        }
      }
    },
    precio: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    imagen: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    estado: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'La categoria no debe estar vacio'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Producto'
  });
  return Producto;
};