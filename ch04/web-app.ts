// 4.2　clusterモジュールによるマルチプロセス化
// *************************************************
// 4.2.1　Webアプリケーションのマルチプロセス化
// *************************************************
const http = require('http');
const fibonacci = require('./fibonacci.ts');

http.createServer((req, res) => {
	const n = Number(req.url.substr(1));
	if (Number.isNaN(n)) {
		return res.end();
	}
	const result = fibonacci(n);
	res.end(result.toString());
}).listen(3000);
console.log('Accsess to http://localhost:3000/10');

export {};
