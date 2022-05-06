import * as guitar from "./data.js";
import express from "express";
import { Guitar } from "./Guitars.js";

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json());
app.set("view engine", "ejs");

app.get('/', (req, res, next) => {
    Guitar.find({}).lean()
        .then((guitars) => {
            res.render('home', { guitars });
        })
        .catch(err => next(err));
});

app.get('/detail', (req, res, next) => {
    // db query can use request parameters
    Guitar.findOne({ model:req.query.model }).lean()
        .then((guitar) => {
            res.render('detail', {result: guitar} );
        })
        .catch(err => next(err));
});

app.get("/add", (req, res) => {
    res.type("text/html")
    console.log(req.query)
    let result = guitar.addItem(req.query.model);
    res.render("add", {model: req.query.model, result: result})
   });

app.get('/delete', (req, res, next) => {
    Guitar.deleteOne({ model:req.query.model }, (err, result) => {
        if (err) return next(err);
        console.log(result)
        let deleted = result.result.n !== 0;
        Guitar.count((err, total) => {
            res.type('text/html');
            res.render('delete', {model: req.query.model, deleted: result.result.n !== 0, total: total } );    
        });
    });
});

// send plain text response
app.get("/about", (req, res) => {
    res.type("text/plain");
    res.send("About page");
   });

// define 404 handler
app.use((req, res) => {
    res.type("text/plain");
    res.status(404);
    res.send("404 - Not found");
   });

app.listen(app.get("port"), () => {
    console.log("Express started");
   });


