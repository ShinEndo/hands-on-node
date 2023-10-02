// 4.3　worker_threadsモジュールによるマルチスレッド化
// *************************************************
// 4.3.5 スレッド間での値の共有
// *************************************************
const fibonacci = require('../fibonacci.ts');
const { workerData: int32Array, parentPort } = require('worker_threads');

parentPort.on('message', (n) => {
	parentPort.postMessage(fibonacci(n));
	// 処理のたびに最初の値をインクリメントする
	// int32Array[0] += 1;

	// Atomics.add()でint32Arrayの0番目の値に1を足す
	Atomics.add(int32Array, 0, 1);
});
