import models from "./../database/models"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ErrorHandler } from "../helpers/error"

export default {
    async login(req, res){
        const { email, password } = req.body
        console.log(req.body)

        let user = await models.User.findOne({
            where: {email: email}
        })

        // si el usuario no existe
        if(!user){
            return res.status(401).json({message: "Credeciales Incorrectas"})
            // throw new ErrorHandler(401, 'Credeciales Incorrectas')
            
        }

        // verificar la contraseña
        let correcto = await bcrypt.compare(password, user.password);

        if(correcto){
            // generar el TOKEN JWT
            let payload = {
                id: user.id,
                email: user.email,
                time: new Date()
            }

            const token = jwt.sign(payload, "MI_CODIGO_SECRETO", {
                expiresIn: 60*60
            });

            return res.status(200).json({
                access_token: token,
                user: user,
                error: false
            });

        }else{
            return res.status(401).json({message: "Contraseña Incorrecta"})
        }                
    },
    async register(req, res){
        const { name, email, password } = req.body
        if(email){
            let user = await models.User.findOne({
                where: {email: email}
            })

            if(!user){
                // cifrear el password
                const hash = await bcrypt.hash(password, 12);
                await models.User.create({name: name, email: email, password: hash});
                return res.status(201).json({message: "Usuario Registrado"})

            }else{
                res.status(422).json({message: "El correo ya existe"})
            }
        }else{
            res.status(422).json({message: "El correo es obligatorio"})
        }
        
    },
    perfil(req, res){

        return res.status(200).json({user: req.user})
        
    },
    logout(req, res){
        
    },    
}