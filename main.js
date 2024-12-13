import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
import data from "./data/data.js"; 

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));
Handlebars.registerHelper('add', function (value, addition) {
    return parseInt(value) + addition;
});
app.get('/', (req, res) => {
    res.render('home', data);
});
app.get('/login', (req, res) => {
    res.render('Login', { layout: 'auth' })
})
app.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword', { layout: 'auth' })
})
app.get('/register', (req, res) => {
    res.render('register', { layout: 'auth' })
})
app.listen(3300, function () {
    console.log('Server started on http://localhost:3300');
});