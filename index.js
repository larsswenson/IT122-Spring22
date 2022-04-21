import * as guitar from './data.js';
import express from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json());
app.set('view engine', 'ejs');

// send static file as response
app.get('/', (req,res) => {
    res.type('text/html');
    res.render('home', {guitars: guitar.getAll()});
   });

app.get('/delete', (req,res) => {
    let result = guitar.deleteItem(req.query.model);
    res.render('delete', {model: req.query.model, result: result})
   });

app.get('/detail', (req,res) => {
    res.type('text/html');
    console.log(req.query);
    let result = guitar.getItem(req.query.model);
    res.render('detail', {model: req.query.model, result: result});  
   });

// send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About page');
   });

app.post('/detail', (req,res) => {
    console.log(req.body)
    let found = guitar.getItem(req.body.model);
    res.render("detail", {model: req.body.model, result: found, guitars: guitar.getAll()});
   });

// define 404 handler
app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
   });

app.listen(app.get('port'), () => {
    console.log('Express started');
   });


