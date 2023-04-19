import { body } from "express-validator"

export const productoCheck = () => {
    return [
        body('nombre').trim().not().notEmpty().withMessage('El campo nombre es obligatorio'),
        body('categoriaId').not().isEmpty().withMessage('la Categoria es Obligatoria')
    ]
}

export const categoriaCheck = () => {
    return [
        body('nombre').trim().not().notEmpty().withMessage('El campo nombre es obligatorio'),
    ]
}

export const pedidoCheck = () => {
    return [
        body('clienteId').trim().not().notEmpty().withMessage('El campo ClienteId es obligatorio')
    ]
}