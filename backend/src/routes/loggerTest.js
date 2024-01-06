import express from 'express';
import Logger from '../services/logger.js';
import { isAdmin } from '../controllers/authController.js';

const router = express.Router();

router.get('/', isAdmin, (req, res) => {
    Logger.fatal('Este es un mensaje fatal');
    Logger.error('Este es un mensaje de error');
    Logger.warn('Este es un mensaje de advertencia');
    Logger.info('Este es un mensaje informativo');
    Logger.http('Este es un mensaje http');
    Logger.debug('Este es un mensaje de depuración');
    res.send('OK: Verificacion de logs');
});

export default router;