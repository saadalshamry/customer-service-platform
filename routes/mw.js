module.exports = {
  // MIDDLEWARE
  isLoggedIn: function(req, res, next) {
    if (req.session.user) {
      return next(null);
    }
    res.status(403).render("403");
  }
};
