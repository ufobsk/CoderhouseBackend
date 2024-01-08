import 'dotenv/config'; //lo importo para el ejemplo
import bcrypt from 'bcrypt';

//encriptar la contraseña
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)));

const hashPasword = createHash('Coder');
// console.log(hashPasword )

//Validar contraseña encriptada
export const validatePassword = (passwordSend, passwordBDD) => bcrypt.compareSync(passwordSend, passwordBDD);

// console.log(validatePassword('Coder', hashPasword ))