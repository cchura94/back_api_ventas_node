import { Op } from "sequelize";
import models from "./../database/models"
import { validationResult } from "express-validator";
// models.Sequelize.Op
export default {
    listar: async (req, res) => {
        try{
            // api/producto?q=&page=3&limit=10&categoria_id=2
            let q = req.query.q
            // let cat_id = req.query.categoria_id
            let page = parseInt(req.query.page)
            let limit = parseInt(req.query.limit)

            let offset = (page-1) * limit
            
            const productos = await models.Producto.findAndCountAll({
                where: {
                    nombre: {
                      [Op.like]: `%${q}%`
                    },
                    // categoriaId: cat_id
                  },
                  offset: offset,
                  limit: limit,
                  include: [models.Categoria]
            });
    
            return res.status(200).json(productos);

        }catch(err){
            return res.status(500).json({message:err.message});
        }
    },
    guardar: async(req, res) => {
         try {
            // const { nombre, detalle } = req.body;
            let errors = validationResult(req)
            if(!errors.isEmpty()){
                console.log(errors);
                return res.status(422).json({errors: errors.array()})
            }

            const prod = await models.Producto.create(req.body);
            if (prod.id) {
                return res.status(201).json({ message: "Producto Registrado" });
            }

        } catch (error) {
            return res.status(422).json({message: error.message})
        }

    },
    actualizarImagen: async(req, res) => {
        let id = req.params.id;
        let datos = {}
        if(req.file){
            datos.imagen = req.file.filename;
        }

        await models.Producto.update(datos, {where: {id}})

        return res.status(200).json({message: "Imagen Actualizada"});

    },
    mostrar: (req, res) => {

    },
    modificar: (req, res) => {

    },
    eliminar: (req, res) => {
        
    }
}