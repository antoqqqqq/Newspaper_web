import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js'; // Cấu hình Passport
import authRoutes from './routes/auth.js'; // Route xử lý đăng nhập/đăng ký qua Google/Facebook
import data from './data/data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Cấu hình view engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

// Static files
app.use(express.static('public'));
app.use('/static', express.static('static'));

// Middleware cho body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cấu hình session và Passport.js
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware custom
app.use(async function (req, res, next) {
    next();
});

// Flash messages middleware (optional)
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Lưu thông tin người dùng đã đăng nhập
    next();
});

// Đăng ký Handlebars helpers
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});
Handlebars.registerHelper('add', function (value, addition) {
    return parseInt(value) + addition;
});

// Routes
app.get('/', (req, res) => {
    res.render('home', data); // Trang chủ
});
app.get('/login', (req, res) => {
    res.render('Login', { layout: 'auth' }); // Trang đăng nhập
});
app.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword', { layout: 'auth' }); // Trang quên mật khẩu
});
app.get('/register', (req, res) => {
    res.render('register', { layout: 'auth' }); // Trang đăng ký
});

// Tích hợp route đăng nhập Google/Facebook
app.use(authRoutes);

// Chạy server
const PORT = process.env.PORT || 3300;
app.listen(PORT, function () {
    console.log(`Server started on http://localhost:${PORT}`);
});
