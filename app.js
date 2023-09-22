// app.js

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4002;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Dummy user data (you should replace this with your database logic)
const users = [
  { id: 1, username: 'user', password: 'password' },
];

// Passport Local Strategy Configuration
passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Invalid credentials' });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// Routes
//app.set('view engine', 'ejs');

//app.get('/', (req, res) => {
  //res.render('login');
//});

//app.get('/dashboard', isAuthenticated, (req, res) => {
  //res.render('dashboard', { user: req.user });
//});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // Pass the message variable with an initial value (or you can set it based on some condition)
  res.render('login', { message: '' }); // Initialize with an empty message
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true,
  })
);

app.get('/logout', (req, res) => {
  req.logout(() => {}); // Provide an empty callback function
  res.redirect('/?message=Logged%20out%20successfully');
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

