// 4.3　worker_threadsモジュールによるマルチスレッド化
// *************************************************
// 4.3.3 スレッド間通信とIPCの違い
// *************************************************
// 4.3.4 スレッド間での値の転送
// *************************************************
const { parentPort, workerData } = require('worker_threads');

parentPort.postMessage(
	workerData.buffer,
	workerData.transfer ? [workerData.buffer] : []
);
