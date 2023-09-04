// 3　EventEmitterとストリーム
// *************************************************
// 3.1　ObserverパターンとEventEmitter
// *************************************************
const http = require('http');

// サーバーオブジェクト（EventEmitterのインスタンス）を生成
const server = http.createServer();

// requestイベントのリスナ登録
server.on('request', (req, res) => {
	// レスポンスを返す
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write('Hello,World!');
	res.end();
});

// listening（リクエストの受付開始）イベントのリスナ登録
server.on('listening', () => {
	// ...
});

// errorイベントのリスナ登録
server.on('error', (err) => {
	// ...
});

// close（リクエストの受付終了）イベントのリスナ登録
server.on('close', () => {
	// ...
});

// サーバーの起動
server.listen(8000);

// 3.1.1　EventEmitterの利用
// *************************************************
import * as events from 'events';
// EventEmitterインスタンスの生成
const eventEmitter = new events.EventEmitter();

// この関数には一部問題がある
function createFizzBuzzEventEmitter(until) {
	const eventEmitter = new events.EventEmitter();
	process.nextTick(()=>_emitFizzBuzz(eventEmitter, until));
	return eventEmitter;
}

// async/await構文が使えるよう、イベントを発行する部分を別の関数に切り離す
async function _emitFizzBuzz(eventEmitter, until) {
	eventEmitter.emit('start');
	let count = 1;
	while (count <= until) {
		await new Promise((resolve) => setTimeout(resolve, 100));
		if (count % 15 === 0) {
			eventEmitter.emit('FizzBuzz', count);
		} else if (count % 3 === 0) {
			eventEmitter.emit('Fizz', count);
		} else if (count % 5 === 0) {
			eventEmitter.emit('Buzz', count);
		}
		count += 1;
	}
	eventEmitter.emit('end');
}

function startListener() {
	console.log('start');
}

function fizzListener(count) {
	console.log('Fizz', count);
}

function BuzzListener(count) {
	console.log('Buzz', count);
}

function fizzBuzzListener(count) {
	console.log('FizzBuzz', count);
}

function endListener(this: any) {
	console.log('end');
	// thisはEventEmitterインスタンス
	// すべてのイベントからリスナを削除する
	this.off('start',startListener).off('Fizz',fizzListener).off('Buzz',BuzzListener).off('FFizzBuzz', fizzBuzzListener).off('end',endListener);
}

createFizzBuzzEventEmitter(40).on('start',startListener).on('Fizz',fizzListener).once('Buzz',BuzzListener).on('FizzBuzz',fizzBuzzListener).on('end',endListener);
createFizzBuzzEventEmitter(40).on('start',startListener).on('Fizz',fizzListener).on('Buzz',BuzzListener).on('FizzBuzz',fizzBuzzListener).on('end',endListener);

createFizzBuzzEventEmitter(0).on('start',startListener).on('end',endListener);

const fooEventEmitter = new events.EventEmitter();
fooEventEmitter.on('foo', ()=> {
	console.log('fooイベントリスナの実行');
});
console.log('fooイベント発行',fooEventEmitter.emit('foo'));