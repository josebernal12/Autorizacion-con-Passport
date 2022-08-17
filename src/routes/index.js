const router = require('express').Router();
const passport = require('passport');

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/signin',
  failureRedirect: '/failuser',
  failureFlash: true
})); 

router.get('/signin', (req, res, next) => {
  res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/faillogin',
  failureFlash: true
}));

router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});
router.get('/failuser' ,(req,res)=>{
res.render('errorUser')
})
router.get('/faillogin' ,(req,res)=>{
  res.render('errorLogin')
  })
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/signin');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/signin')
}

module.exports = router;