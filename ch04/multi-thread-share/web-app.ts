// 4.3　worker_threadsモジュールによるマルチスレッド化
// *************************************************
// 4.3.5 スレッド間での値の共有
// *************************************************
const http = require('http');
const cpuCount = require('os').cpus().length;
const ThreadPool = require('../thread-pool');

const sharedArrayBuffer = new SharedArrayBuffer(4);
const int32Array = new Int32Array(sharedArrayBuffer);

const threadProol = new ThreadPool(cpuCount, `${__dirname}/fibonacci.ts`, {
	workerData: int32Array,
});

// メインスレッド側のカウンタ
let count = 0;

http.createServer(async (req, res) => {
	// callsに対してはトラッキングしているリクエスト回数を渡す
	if (req.url === '/calls') {
		return res.end(`Main = ${count}, Sub = ${int32Array[0]}`);
	}

	const n = Number(req.url.substr(1));
	if (Number.isNaN(n)) {
		return res.end();
	}
	count += 1;
	const result = await threadProol.executeInThread(n);
	res.end(result.toString());
}).listen(3000);
