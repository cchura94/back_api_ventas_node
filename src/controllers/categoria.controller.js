// https://dev.to/nedsoft/central-error-handling-in-express-3aej
import models from "../database/models/index"

export default {
    listar: async (req, res) => {
        try{
            const categorias = await models.Categoria.findAll();
    
            return res.status(200).json(categorias);

        }catch(err){
            return res.status(500).json({message:err.message});
        }
    },
    guardar: async (req, res) => {

        try {
            const { nombre, detalle } = req.body;

            const cat = await models.Categoria.create({ nombre, detalle });
            if (cat.id) {
                return res.status(201).json({ message: "Categoria Registrada" });
            }

        } catch (error) {
            return res.status(422).json({message: error.message})
        }

        // return res.status(500).json({ message: "Ocurrio un error al registrar la categoria" })
    },
    mostrar: async (req, res) => {
        const id = req.body.id

        const categoria = await models.Categoria.findByPk(id);
        if (categoria === null) {
            return res.status(404).json({ message: "categoria No encontrada" })
        } else {
            return res.status(200).json(categoria);
        }

    },
    modificar: async (req, res) => {
        const id = req.params.id
        const { nombre, detalle } = req.body;

        const cat = await models.Categoria.findByPk(id);
        if (cat) {
            await models.Categoria.update({ nombre, detalle }, {
                where: {
                    id: cat.id
                }
            })
            return res.status(200).json({ message: "categoria Actualizada" })
        } else {
            return res.status(404).json({ message: "categoria No encontrada" })
        }

    },
    eliminar: async (req, res) => {
        const id = req.params.id

        await models.Categoria.destroy({
            where: {
                id: id
            },
        });

        return res.status(200).json({ message: "categoria Eliminada" })

    }
}