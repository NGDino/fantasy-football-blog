const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, User, Post } = require('../models');

module.exports = router;

router.get('/', (req, res) => {
    res.render('homepage');
  });

router.get('/login', (req, res) => {
if (req.session.loggedIn) {
    res.redirect('/');
    return;
}

res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports= router;