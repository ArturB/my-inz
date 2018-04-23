var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const config = require('../config/database');
var secret = config.secret;

var User = require('../models/user');
var AcVideo = require('../models/acvideo');



router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, secret, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Nie masz uprawnień. Potrzebna autoryzacja',
                message: 'Zaloguj się ponownie',
                error: err,
            });
        }
        next();
    })
});


router.get('/', function(req, res, next) {
// router.get(function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    var duid = decoded.user._id;

    AcVideo.find({user: duid}, function(err, acVideos) {
            if (err) {
                return res.status(500).json({
                    title: 'Wystąpił nieoczekiwany błąd',
                    error: err
                });
            }
            res.status(200).json({
            message: 'Success getted acVideos',
            obj: acVideos
            });
        }).populate('user', '_id'); //to execute => wykonać wszystkie

    // });  

});


router.post('/', function(req, res, next) {
	//jwt.decode is not checking if the token is valid, we did it with jwt.verify, so we just decode the token here
    var decoded = jwt.decode(req.query.token);
	User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'Wystąpił nieoczekiwany błąd',
                error: err
            });
        }
		var acVideo = new AcVideo({
			videoName: req.body.videoName,
			videoDate: req.body.videoDate,
			videoPath: req.body.videoPath,
			user: user
		})
		acVideo.save(function(err, result) {
			if (err) {
				return res.status(500).json({
					title: 'Wystąpił nieoczekiwany błąd',
					error: err
				});
			}
			user.acVideos.push(result);
            user.save();
			res.status(201).json({
				message: 'Sekwencja została dodana do konta użytkownika',
				obj: result
			});
            
		});
	});
	
});

router.delete('/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    AcVideo.findById(req.params.id, function (err, acVideo) {
        if (err) {
            return res.status(500).json({
                title: 'Wystąpił nieoczekiwany błąd',
                error: err
            });
        }
        if (!acVideo) {
            return res.status(500).json({
                title: 'Wideo nie zostało znaleziono',
                error: {message: 'Wybrane wideo nie istnieje na koncie użytkownika'}
            });
        }
        if (acVideo.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Brak autoryzacji',
                error: {message: 'Zaloguj się ponownie'}
            });
        }
        acVideo.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Wystąpił nieoczekiwany błąd',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Wideo zostało usuięte z konta użytkownika',
                obj: result
            });
        });
    });
});


module.exports = router;