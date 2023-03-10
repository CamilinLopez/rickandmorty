const { RouterLogin, passport } = require("../controllers/loginControlles");


RouterLogin.post('/login', passport.authenticate('local', {
  successRedirect: '/rickandmorty/succes',
  failureRedirect: '/rickandmorty/error',
  failureFlash: true
}));

RouterLogin.get("/succes", asegurarAutenticado, (req, res) => {
  const email = req.user.email;
  const password = req.user.password;

  res.send(
    {
      email,
      password,
      status: "succes"
    });

});

RouterLogin.get("/error", (req, res) => {
  const errorMessage = req.flash('error')[0];
  res.send(
    {
      page: "/login",
      status: "error",
      message: errorMessage
    });
});


RouterLogin.get("/logout", (req, res) => {
  req.logOut(() => {
    console.log("deslogeado")
    res.send({
      page: "/login"
    });
  })
})

RouterLogin.get("/test", (req, res) => {
  if (req.isAuthenticated()) {
    return res.send({
      status: "succes"
    })
  }
  res.redirect("/rickandmorty/error");
})

function asegurarAutenticado(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/rickandmorty/error")
}

module.exports = { RouterLogin }