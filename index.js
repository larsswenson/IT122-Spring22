import { getAll, getItem } from './data.js';
import http from 'http';
//import { parse } from "querystring";
const PORT = 3000;
const server = http.createServer((req,res) => {
    //let url = req.url.split("?"); 
    //let query = parse(url[1]);
    var path = req.url.toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(getAll());
            res.end();
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('About Lars')
            res.end();
            break;
        case '/detail':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(getItem('telecaster'));
            res.end();
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }
}) 

server.listen(PORT, (error)=>{
    if(error){
        console.log('Something went wrong.')
    } else {
        console.log(`Server is listening on port ${PORT}`)
    }
})