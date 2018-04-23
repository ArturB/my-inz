var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('../config/database');
var secret = config.secret;
var User = require('../models/user');

router.post('/', function (req, res, next) {

        var user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: bcrypt.hashSync(req.body.password, 10), //10 jest argumentem ozn na ile mocne jest szyfrowanie
            email: req.body.email
        });
        user.save(function(err, result) {
            if (err) {
                if (err.name="ValidationError") {
                    res.json({
                        success: false, 
                        message: 'Użytkownik z takim adresem e-mail już istnieje'
                    });
                }
                else {
                    res.json({
                        success: false, 
                        title: 'Błąd rejestracji!',
                        err
                    });
                }
            }
            else {
                res.json({
                    success: true,
                    title: 'Rejestracja przebiegła pomyślnie!',
                    message: 'Możesz się zalogować',
                    obj: result
                });
            }

        });
    // }
});



router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                success: false,
                title: 'Błąd logowania!',
                error: err
            });
        }
        //sprawdzamy czy user (email) istnieje
        if (!user) {
            return res.json({
                success: false, 
                message: 'Nieprawidłowy login lub hasło'
            });
            return res.json({success: false, message: 'Nieprawidłowy login lub hasło'});
        }
        //sprawdzamy czy password pasuje do email    
        //poniewasz ten bcrypt nie można zdeszyfrować, algorytm, który robił szyfrowanie, sprawdza czy wersja zaszyfrowanego password, który wprowadzamy przy logowaniu jest taka sama jak ta, która istnieje w bd dla tego email. czyli porównuje req.body.password z user.password
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.json({
                success: false, 
                message: 'Nieprawidłowy login lub hasło'
            });
        }
        else {
        var token = jwt.sign({user: user}, secret, {expiresIn: '24h'});
            return res.status(200).json({
                success: true,
                message: 'Logowanie się powidło!',
                token: token,
                //userId: user._id
            });
        }
    });
});



module.exports = router;