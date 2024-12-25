import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash'; // Add this for flash messages
import './config/passport.js'; // Passport configuration
import authRoutes from './routes/auth.route.js'; // Ensure correct import
import data from './data/data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Configure view engine with Handlebars
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

// Static files middleware
app.use(express.static('public'));
app.use('/static', express.static('static'));

// Middleware for body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure session and Passport.js
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Flash messages middleware (optional)
app.use(flash()); // Flash messages setup
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Store logged-in user info
    res.locals.success_msg = req.flash('success_msg'); // For success messages
    res.locals.error_msg = req.flash('error_msg'); // For error messages
    next();
});

// Register Handlebars helpers
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});
Handlebars.registerHelper('add', function (value, addition) {
    return parseInt(value) + addition;
});

// Routes
app.get('/', (req, res) => {
    res.render('home', data); // Homepage
});
app.get('/login', (req, res) => {
    res.render('Login', { layout: 'auth' }); // Login page
});
app.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword', { layout: 'auth' }); // Forgot password page
});
app.get('/register', (req, res) => {
    res.render('register', { layout: 'auth' }); // Register page
});

// Include Google/Facebook login routes
app.use(authRoutes); // Ensure the import is correct (it should export the correct routes)

// Start the server
const PORT = process.env.PORT || 3300;
app.listen(PORT, function () {
    console.log(`Server started on http://localhost:${PORT}`);
});
