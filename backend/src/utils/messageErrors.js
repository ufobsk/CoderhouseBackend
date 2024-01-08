import passport from "passport";

//Funcion general para retornar errores en las estrategias de passport. Las 3 estrategias tienen en comun el registro
//Primer filtro de cualquier estrategia de passport
export const passportError = (strategy) => {
    return async (req,res,next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error){
                return next(error);
            }

            if(!user){
                return res.status(401).send({error: info.messages ? info.messages : info.toString()})//Si envian el objeto lo muestro, si me mandaron otra cosa lo muestro pasado a string
            }

            req.user = user;
                next();
            }) (req, res, next); //esto es un middlewares
    };
};
//ingreso un Rol y verifico si el usuario lo cumple. Ej Admin
export const authorization = (rol) => {
    return async (req, res, next) => {
       
        // Se vuelve a consultar si el user existe porque el token puede expirar o el user borrar el historial.
        if (!req.user) {
            return res.status(401).send({ error: 'Usuario no autorizado' });
        }

        // Verifica si el rol del usuario es diferente al ingresado por parámetro
        if (req.user.rol.toLowerCase() !== rol.toLowerCase()) {
            return res.status(403).send({ error: 'Usuario sin los privilegios necesarios' });
        }

        console.log(req.user);
        next();
    };
};