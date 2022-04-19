import { getAll, getItem } from './data.js';
import http from 'http';
import { parse } from "querystring";
const PORT = 3000;
const server = http.createServer((req,res) => {
    let url_parts = req.url.split("?"); 
    let query = parse(url_parts[1]);
    var path = req.url.toLowerCase();
    switch(url_parts[0]) {
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
            res.write(`Guitar model: ${query['model']}`);
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