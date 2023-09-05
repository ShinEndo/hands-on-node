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
    process.nextTick(() => _emitFizzBuzz(eventEmitter, until));
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
        }
        else if (count % 3 === 0) {
            eventEmitter.emit('Fizz', count);
        }
        else if (count % 5 === 0) {
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
function endListener() {
    console.log('end');
    // thisはEventEmitterインスタンス
    // すべてのイベントからリスナを削除する
    this.off('start', startListener).off('Fizz', fizzListener).off('Buzz', BuzzListener).off('FFizzBuzz', fizzBuzzListener).off('end', endListener);
}
createFizzBuzzEventEmitter(40)
    .on('start', startListener)
    .on('Fizz', fizzListener)
    .once('Buzz', BuzzListener)
    .on('FizzBuzz', fizzBuzzListener)
    .on('end', endListener);
createFizzBuzzEventEmitter(40)
    .on('start', startListener)
    .on('Fizz', fizzListener)
    .on('Buzz', BuzzListener)
    .on('FizzBuzz', fizzBuzzListener)
    .on('end', endListener);
createFizzBuzzEventEmitter(0).on('start', startListener).on('end', endListener);
const fooEventEmitter = new events.EventEmitter();
fooEventEmitter.on('foo', () => {
    console.log('fooイベントリスナの実行');
});
console.log('fooイベント発行', fooEventEmitter.emit('foo'));
// 3.1.2　EventEmitterとメモリリーク
// *************************************************
const barEventEmitter = new events.EventEmitter();
for (let i = 0; i < 11; i++) {
    barEventEmitter.on('bar', () => console.log('bar'));
}
const messageEveneEmitter = new events.EventEmitter();
// ブロック内での変数（listener）の宣言
{
    const listener = () => console.log('Hello');
    messageEveneEmitter.on('message', listener);
}
// listener()メソッドでmessageイベントのリスナを取得
// listenerの参照が残っており、ブロックが終了してもGCの対象にならない
messageEveneEmitter.listeners('message');
// リスナを100個まで登録できるようにする
const bazEventListener = new events.EventEmitter();
bazEventListener.setMaxListeners(100);
for (let i = 0; i < 100; i++) {
    bazEventListener.on('baz', () => console.log('baz', i));
}
bazEventListener.emit('baz');
// 全EventEmitterを対象に、MAxListenersのデフォルト値を100にする
// events.EventEmitter.defaultMaxListeners = 100;
// 3.1.3　エラーハンドリング
// *************************************************
// → error-events.ts参照
// 3.1.4　EventEmitterの継承
// *************************************************
class FizzBuzzEventEmitter extends events.EventEmitter {
    async start(until) {
        this.emit('start');
        let count = 1;
        while (true) {
            if (count % 15 === 0) {
                this.emit('FizzBuzz', count);
            }
            else if (count % 3 === 0) {
                this.emit('Fizz', count);
            }
            else if (count % 5 === 0) {
                this.emit('Buzz', count);
            }
            count += 1;
            if (count > until) {
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        this.emit('end');
    }
}
new FizzBuzzEventEmitter().on('start', startListener).on('Fizz', fizzListener).on('Buzz', BuzzListener).on('FizzBuzz', fizzBuzzListener).on('end', endListener).start(100);
// 3.1.5　コールバックパターン形式でイベントリスナを登録する
// *************************************************
{
    const http = require('http');
    // サーバーオブジェクトの生成
    const server = http.createServer();
    // requestイベントのリスナ登録
    server.on('request', (req, res) => {
        // クライアントからのリクエストに対する処理
    });
    // listeningイベントのリスナ登録
    server.on('listening', () => {
        // ポート待機を開始した際の処理
    });
    // 8000ポートでリクエストを待機
    server.listen(8000);
}
{
    const http = require('http');
    // サーバーオブジェクトの生成およびrequestイベントのリスナ登録
    const server = http.createServer((req, res) => {
        // クライアントからのリクエストに対する処理
    });
    // ポート監視およびlisteningイベントのリスナ登録
    server.listen(8000, () => {
        // ポート待機を開始した際の処理
    });
}
