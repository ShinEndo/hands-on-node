// 4.3　worker_threadsモジュールによるマルチスレッド化
// *************************************************
// 4.3.1 worker_threadsモジュールの使い方
// *************************************************
import worker_threads from 'worker_threads';
const fibonacci = require('../fibonacci.ts');

// フィボナッチ数の計算結果をメインスレッドに送信
worker_threads.parentPort?.postMessage(fibonacci(worker_threads.workerData));

export {};
