const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var isLoggedIn = false
// Use session middleware
router.use(
  session({
    secret: 'your-secret-key', // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
  })
);

router.use(bodyParser.json());

// Simulate a user for testing
const validUser = {
  email: 'josephkafui27@gmail.com',
  password: '1234567891',
};

router.post('/login',urlencodedParser, (req, res) => {
  const { email, password } = req.body;

  if (email === validUser.email && password === validUser.password) {
    req.session.user = validUser; // Store user information in the session
    isLoggedIn=true
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid credentials ' + req.body.email + ' try again' });
  }
});

// Add this middleware to check authentication only for /admin route
router.use('/admin', (req, res, next) => {
  // Check if the user is logged in
  if (req.session.user) {
    next(); // Continue to the next middleware
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

router.get('/admin', (req, res) => {
  res.status(200).send({ message: 'Welcome to the admin page' });
});

router.get('/loginstatus', (req,res)=>{
  return res.status(200).send(isLoggedIn);
})

module.exports = router;