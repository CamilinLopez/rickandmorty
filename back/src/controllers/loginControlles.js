const { User } = require("../db/DB_conection");

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');

const flash = require('connect-flash');

const express = require('express');
const RouterLogin = express.Router();

RouterLogin.use(flash());
RouterLogin.use(bodyParser.urlencoded({ extended: true }));
RouterLogin.use(bodyParser.json());

RouterLogin.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: true
}));

RouterLogin.use(passport.initialize());
RouterLogin.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password' 
},
  async (email, password, done) => {

    const user = await User.findOne({
        where:{
            email,
            password
        }
    })

    if(!user) return done(null, false, { message: "Correo electrónico o contraseña incorrectos." });
    if (email === user.email && password === user.password) return done(null, user);

    return done(null, false, { message: "Correo electrónico o contraseña incorrectos." });

  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  const user = await User.findByPk(id)
  if(!user) return done("usuario no encontrado")  
  done(null, user);
});


module.exports = { RouterLogin, passport }