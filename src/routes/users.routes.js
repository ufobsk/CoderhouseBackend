import express from 'express';
import multer from 'multer';
import * as userController from '../controllers/userController.js';
import passport from 'passport';
import { recoveryEmail } from '../config/nodemailer.js';

const router = express.Router();

const upload = multer({ dest: 'documents/' });

// Rutas para la interfaz de usuario

router.get('/users/login', userController.showLogin); 
router.get('/users/register', userController.showRegister); 
router.post('/users/register', userController.postRegister); 
router.get('/users/logout', userController.getLogout); 

router.post('/users/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { 
            return next(err); 
        }
        if (!user) { 
            return res.redirect(`/users/login?error=${info.message}`); 
        }
        req.logIn(user, function(err) {
            if (err) { 
                return next(err); 
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/users/github', passport.authenticate('github'));

router.get('/users/github/callback', passport.authenticate('github', { 
    successRedirect: '/', 
    failureRedirect: '/users/login', 
}));

// Rutas para la API

router.post('/api/session/register', userController.postRegisterAPI);
router.post('/api/session/login', userController.postLoginAPI);
router.get('/api/session/logout', userController.getLogoutAPI);
router.get('/api/session/current', userController.getCurrentSession);
router.get('/api/github', passport.authenticate('github'));
router.post('/users/password_recovery', userController.postPasswordRecovery);
router.post('/users/reset_password/:token', userController.postResetPassword);
router.post('/api/:uid/documents', upload.array('documents'), userController.uploadDocuments); 
router.get('/api/users', userController.getUsers);
router.delete('/api/users', userController.deleteInactiveUsers);
router.post('/api/cart/update', userController.updateCart);

export default router;