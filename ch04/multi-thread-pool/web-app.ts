// 4.3　worker_threadsモジュールによるマルチスレッド化
// *************************************************
// 4.3.2 スレッドプールの実装
// *************************************************

const http = require('http');
const cpuCount = require('os').cpus().length;
const ThreadPool = require('../thread-pool');

// CPUコア数と同じサイズのスレッドプールを生成
const threadPool = new ThreadPool(cpuCount, `${__dirname}/fibonacci.ts`);

http.createServer(async (req, res) => {
	const n = Number(req.url.substr(1));
	if (Number.isNaN(n)) {
		return res.end();
	}
	const result = await threadPool.executeInThread(n);
	res.end(result.toString());
}).listen(3000);
