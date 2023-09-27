// 4.3　worker_threadsモジュールによるマルチスレッド化
// *************************************************
// 4.3.2 スレッドプールの実装
// *************************************************

const fibonacci = require('../fibonacci.ts');
const { parentPort } = require('worker_threads');

// messageイベントの監視によりメインスレッドからのメッセージの受信を待機、
// 受信したらフィボナッチ数を計算して結果をメインスレッドに送信
parentPort.on('message', (n) => parentPort.postMessage(fibonacci(n)));
