import express from "express";
import { Guitar } from "./Guitars.js";
import cors from "cors";

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json());
app.use("/api", cors());
app.set("view engine", "ejs");

/*app.get("/", (req,res) => {
    res.type("text/html");
    console.log(req.query);
    res.render("home", {guitars: guitar.getAll()});
   });*/

app.get("/", (req,res, next) => {
    Guitar.find({}).lean()
    .then((guitars) => {
        res.render("newreacthome2", {guitars: JSON.stringify(guitars)});
    });
});

/*app.get('/api/guitars', (req,res,next) => {
    Guitar.find({}).lean()
        .then((guitars) => {
            res.render('reacthome', {guitars});
        })
        .catch(err => next(err));
});*/

app.get("/detail", (req,res,next) => {
    Guitar.findOne({ model:req.query.model }).lean()
        .then((guitar) => {
            res.render("detail", {result: guitar, model: req.query.model} );
        })
        .catch(err => next(err));
});

app.get('/api/guitars/delete/:id', (req,res,next) => {
    Guitar.deleteOne({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result});
    });
});

app.post('/api/guitars/add/', (req,res,next) => {
    if (!req.body._id) { 
        let guitar = new Guitar(req.body);
        guitar.save((err, newGuitar) => {
            if (err) return next(err);
            res.json({updated: 0, _id: newGuitar._id});
        });
    } else {
        Guitar.updateOne({ _id: req.body._id}, {model:req.body.model, make: req.body.make, type: req.body.type, year: req.body.year}, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

app.get('/api/guitars/add/:model/:make/:type/:year', (req,res, next) => {
    let model = req.params.model;
    Guitar.updateOne({ model: model}, {model:modle, make: req.params.make, type: req.params.type, year: req.params.year}, {upsert: true }, (err, result) => {
        if (err) return next(err); 
        res.json({updated: result.nModified});
    });
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

