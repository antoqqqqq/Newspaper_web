import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()


app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});
app.listen(3300, function () {
    console.log('Server started on http://localhost:3300');
});