const withAuth = (req, res, next) => {
    //checks for existeence of session property
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;