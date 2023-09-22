// import * as http from 'http';
const http = require('http');
const fibonacci = require('./fibonacci');

http.createServer((req, res) => {
	const n = Number(req.url.substr(1));
	if (Number.isNaN(n)) {
		return res.end();
	}
	const result = fibonacci(n);
	res.end(result.toString());
}).listen(3000);
console.log('Accsess to http://localhost:3000/10');
