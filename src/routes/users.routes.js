import express from 'express';
import multer from 'multer';
import * as userController from '../controllers/userController.js';
import passport from 'passport';
import { recoveryEmail } from '../config/nodemailer.js';

const router = express.Router();

const upload = multer({ dest: 'documents/' });

// Rutas para la interfaz de usuario

router.get('/login', userController.showLogin); 
router.get('/register', userController.showRegister); 
router.post('/register', userController.postRegister); 
router.get('/logout', userController.getLogout); 

router.post('/login', (req, res, next) => {
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

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { 
    successRedirect: '/', 
    failureRedirect: '/users/login', 
}));

// Rutas para la API

router.post('/api/register', userController.postRegisterAPI);
router.post('/api/login', userController.postLoginAPI);
router.get('/api/logout', userController.getLogoutAPI);
router.get('/api/github', passport.authenticate('github'));
router.post('/password_recovery', userController.postPasswordRecovery);
router.post('/reset_password/:token', userController.postResetPassword);
router.post('/api/:uid/documents', upload.array('documents'), userController.uploadDocuments); 

export default router;