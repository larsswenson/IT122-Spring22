import * as data from "./data.js";
import http from "http";
import { parse } from "querystring";

http.createServer((req,res) => {
    let url = req.url.split("?"); // separate route from query string
    let query = parse(url[1]); // convert query string to a JS object
    var path = req.url.toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write("Lars' Guitars");
            res.end(JSON.stringify(data.getAll())) // convert JS objects to text for response to the browser
            res.end();
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('About Lars');
            res.end();
            break;
        case '/detail?model=les+paul':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(data.getItem(query.model)))
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }
}).listen(process.env.PORT || 3000);

