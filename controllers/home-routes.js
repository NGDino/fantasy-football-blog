const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, User, Post } = require('../models');
const withAuth = require('../utils/auth');

module.exports = router;

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_text',
            'created_at'
          ],
          order: [
            ['created_at', 'DESC']
          ],
        include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // get all posts mapped
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // console.log(dbPostData[0]);
        res.render('homepage', {
           posts,
           loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/post/:id', withAuth, (req,res)=>{
Post.findOne({
    where:{
    id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post_text',
      'created_at'
    ],
    include: [
    {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'created_at'],
        include: 
        { 
        model: User,
        attributes: ['username']
        }
    },
    {
        model: User,
        attributes: ['username']
    }
    ]
})
.then(dbPostData => {
    if(!dbPostData){
    res.status(404).json({ message: 'No post found with this id' });
    return;
    }
    //serialize the data
    const post= dbPostData.get ({ plain: true });
    //pass data to template
    res.render('single-post', { 
    post,
    loggedIn: req.session.loggedIn
    });
})
.catch(err =>{
    console.log(err);
    res.status(500).json(err)
});
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