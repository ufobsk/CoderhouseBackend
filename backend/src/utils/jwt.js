import jwt  from "jsonwebtoken";
import 'dotenv/config';

export const generateToken = (user) => {
   /*
	   1 parametro: objeto saociado al token
	   2do: clave privada para el cifrado
	   3ro tiempo de expiracion
   */
   const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn:'12h' });
   return token;
};
//generador de token admin manual
//console.log(generateToken({"_id":"6526ef4d730bcee0eb0b94f5","first_name":"Santiago","last_name":"Programer","age":{"$numberInt":"38"},"email":"santi@programer.com","password":"$2b$15$n6gLiYs.HR0mT4haESY/3OPgqV.P0U/9K/.uXMoZhbT/Ds15bEG9q","rol":"Admin","__v":{"$numberInt":"0"}}))

//generador de token user
// console.log(generateToken({"_id":"652975630b137928ee8ce2cd","first_name":"user4","last_name":"asda","age":{"$numberInt":"30"},"email":"koas@asd.com","password":"13456","rol":"user"}));

//Compruebo autenticación
export const authToken = (req, res, next) => {
   //consulto el header
   const authHeader=req.headers.authorization // consulto si existe el token
   if (!authHeader){
	   return res.status(401).send({error: 'Usuario no autenticado'})
   };

   const token = authHeader.split(' ')[1]; //sweparo en dos el token bearer y token. y me quedo con la parte valida
//evito accesos no deseados a mi Bdd
   jwt.sign(token, process.env.JWT_SECRET, (error, user) => {
	   if(error) {
		   return res.status(403).send({ error: 'Usuario no autorizado' })
	   };
	   //desifro el token
	   req.user = user;
	   next();
   });
};
