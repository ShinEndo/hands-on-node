// 4.3　worker_threadsモジュールによるマルチスレッド化
// *************************************************
// 4.3.1 worker_threadsモジュールの使い方
// *************************************************
import worker_threads from 'worker_threads';
import os from 'os';

console.log('メインスレッド', worker_threads.threadId);

// CPUコアの数だけスレッドを起動
const cpuCount = os.cpus().length;
for (let i = 0; i < cpuCount; i++) {
	// サブスレッドで実行するファイルのパスを指定してWorkerをnew
	const worker = new worker_threads.Worker(`${__dirname}/web-app.ts`);
	console.log('サブスレッド', worker.threadId);
}
