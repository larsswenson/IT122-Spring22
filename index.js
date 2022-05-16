import * as guitar from "./data.js";
import express from "express";
import { Guitar } from "./Guitars.js";
import cors from "cors";

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json());
app.use('/api', cors());
app.set("view engine", "ejs");

/*app.get("/", (req,res) => {
    res.type("text/html");
    console.log(req.query);
    res.render("home", {guitars: guitar.getAll()});
   });*/

app.get('/api/guitars', (req,res) => {
    Guitar.find({}).lean()
        .then((guitars) => {
            res.json(guitars)
        })
        .catch(err => next(err));
});

app.get('/api/guitars/:model', (req,res,next) => {
    Guitar.findOne({ model:req.params.model }).lean()
        .then((guitar) => {
            res.json(guitar)
        })
        .catch(err => next(err));
});

app.get('/api/guitars/delete/:model', (req,res) => {
    Guitar.deleteOne({ model:req.params.model }, (err, result) => {
        if (err) return next(err);
        console.log(result)
        res.json({"message": "guitar deleted"})    
    });
});

app.post('/api/guitars/add', (req,res,next) => {
    const newGuitar = {'model':'starfire', 'make':'guild', 'type': 'electric semi-hollow body', 'year': '1960'}
    Guitar.updateOne({'model':'starfire'}, newGuitar, {upsert:true}, (err, result) => {
        if (err) return next(err);
        console.log(result);
        res.json({"message": "guitar added"})
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



