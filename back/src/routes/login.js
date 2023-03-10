const { RouterLogin, passport } = require("../controllers/loginControlles");
const { User } = require("../db/DB_conection");


RouterLogin.post('/login', passport.authenticate('local', {
  successRedirect: '/rickandmorty/succes',
  failureRedirect: '/rickandmorty/error',
  failureFlash: true
}));

RouterLogin.get("/succes", asegurarAutenticado, async (req, res) => {
  const email = req.user.email;
  const id = req.user.id;
  const password = req.user.password;

  await User.update({ active: true }, { where: { id } });
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


RouterLogin.get("/logout", async (req, res) => {
  const id = req.user.id;
  await User.update({ active: false }, { where: { id } });

  req.logOut(() => {
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