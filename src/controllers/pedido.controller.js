// https://dev.to/nedsoft/central-error-handling-in-express-3aej
import { Op } from "sequelize";
import models from "../database/models/index"
import { ErrorHandler } from "../helpers/error";

export default {
    listar: async (req, res) => {
        try{
            const pedidos = await models.Pedido.findAll({
                include: [models.Cliente],
                include: [models.Producto]
            });
    
            return res.status(200).json(pedidos);

        }catch(err){
            return res.status(500).json({message:err.message});
            // throw new ErrorHandler(500, 'error en la consulta')
        }
    },
    guardar: async (req, res) => {
        try {
            /*
            {
                clienteId: 20,
                carrito: [
                    {productoId: 2, cantidad: 1},
                    {productoId: 3, cantidad: 2},
                    {productoId: 4, cantidad: 1}
                ]
            }
            
            */
           const date = new Date();
           const { clienteId, carrito } = req.body;
           
           // crear pedido
           const pedido = await models.Pedido.create({fecha: date, estado: 1, clienteId: clienteId})

           // asignar los productos del carrito hacia el pedido
           carrito.forEach(async prod => {
            const producto = await models.Producto.findByPk(prod.productoId)
                // cada producto encontrado lo agregamos al pedido
                await pedido.addProducto(producto, {through: {cantidad: prod.cantidad}})
           });

           res.status(201).json({message: 'El Pedido se ha registrado', data: pedido})


        } catch (error) {
            return res.status(422).json({message: error.message})
        }

        // return res.status(500).json({ message: "Ocurrio un error al registrar la categoria" })
    },
    nuevoCliente: async (req, res) => {
        
        try {
            const { nombre_completo, ci_nit, correo, direccion, telefono } = req.body;

            const clie = await models.Cliente.create({ nombre_completo, ci_nit, correo, direccion, telefono });
            if (clie.id) {
                return res.status(201).json({ message: "Cliente Registrado", cliente: clie });
            }

        } catch (error) {
            return res.status(422).json({message: error.message})
        }

    },
    buscarCliente: async (req, res) => {
        // ?buscar=juan
        const q = req.query.buscar;
        const clie = await models.Cliente.findOne({
            where: {
                nombre_completo: {
                    [Op.like]: `%${q}%`
                }
            }
        });

        res.status(200).json(clie)

    },
    mostrar: async (req, res) => {
        const id = req.params.id

        const pedido = await models.Pedido.findByPk(id);
        if (pedido === null) {
            return res.status(404).json({ message: "pedido No encontrada" })
        } else {
            return res.status(200).json(pedido);
        }

    },
    modificar: async (req, res) => {
        const id = req.params.id
        const { nombre, detalle } = req.body;

        const cat = await models.Pedido.findByPk(id);
        if (cat) {
            await models.Pedido.update({ nombre, detalle }, {
                where: {
                    id: cat.id
                }
            })
            return res.status(200).json({ message: "pedido Actualizada" })
        } else {
            return res.status(404).json({ message: "pedido No encontrada" })
        }

    },
    eliminar: async (req, res) => {
        const id = req.params.id

        await models.Pedido.destroy({
            where: {
                id: id
            },
        });

        return res.status(200).json({ message: "pedido Eliminada" })

    }
}