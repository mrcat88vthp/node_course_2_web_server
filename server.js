import express from 'express';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import hbs from 'hbs';
import fs from 'fs';

//khai báo biến
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.port || 3000;

//handlebars
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

//console.log('__dirname:', __dirname);
//console.log('__filename:', __filename);

app.use((req, res, next) => {    
    var now = new Date().toString();
    var log = `${now}: ${req.method} - URL: ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if (err)
            console.error('Lỗi:', err);
    });
    next();    
});

/*
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    /*
    res.send({
        name: 'Mr Cat',
        likes: [
            'Pes',
            'AOE'
        ]
    });
    */
   res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!',
        //currentYear: new Date().getFullYear()
   });
})
.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        //currentYear: new Date().getFullYear()
    });
})
.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
