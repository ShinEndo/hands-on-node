// 4.3　worker_threadsモジュールによるマルチスレッド化
// *************************************************
// 4.3.1 worker_threadsモジュールの使い方
// *************************************************
const http = require('http');
const { Worker } = require('worker_threads');

http.createServer((req, res) => {
	const n = Number(req.url?.substr(1));
	if (Number.isNaN(n)) {
		return res.end();
	}
	// コンストラクらの第二引数で値を渡しつつサブスレッドを生成
	new Worker(`${__dirname}/fibonacci.ts`, {
		workerData: n,
	}).on('message', (result) => res.end(result.toString()));
}).listen(3000);

export {};
