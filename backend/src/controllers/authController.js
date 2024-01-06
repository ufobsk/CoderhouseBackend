import Logger from '../services/logger.js'; 

export const isAdmin = (req, res, next) => {
    if (req.user && req.user._doc.role === 'admin') {
        next();
    } else {
        Logger.warn('Intento de acceso no autorizado a recurso de administradores'); 
        res.status(403).send({ error: 'No tienes permisos para acceder a este recurso.' });
    }
}

export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        Logger.warn('Intento de acceso no autenticado'); 
        res.status(403).send({ error: 'No estás autenticado' });
    }
}