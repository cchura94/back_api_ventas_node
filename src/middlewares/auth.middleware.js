import jwt, { decode } from "jsonwebtoken"

export const auth = function(req, res, next){
    let token = null

    if(req.headers.authorization){
        // Bearer abx.xyz.123
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token){
        return res.status(401).json(
            {
                auth: false,
                message: "No se proporcionó el token de seguridad"
            }
        )
    }

    jwt.verify(token, "MI_CODIGO_SECRETO", (error, decode) => {
        if(error){
            return res.status(401).json({
                auth: false,
                message: "El token ingresado ha expirado"
            })
        }
        // correcto
        req.user = decode.user;
        next()
    })

}
