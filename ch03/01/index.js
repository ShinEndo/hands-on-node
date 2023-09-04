"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// 3　EventEmitterとストリーム
// *************************************************
// 3.1　ObserverパターンとEventEmitter
// *************************************************
var http = require('http');
// サーバーオブジェクト（EventEmitterのインスタンス）を生成
var server = http.createServer();
// requestイベントのリスナ登録
server.on('request', function (req, res) {
    // レスポンスを返す
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello,World!');
    res.end();
});
// listening（リクエストの受付開始）イベントのリスナ登録
server.on('listening', function () {
    // ...
});
// errorイベントのリスナ登録
server.on('error', function (err) {
    // ...
});
// close（リクエストの受付終了）イベントのリスナ登録
server.on('close', function () {
    // ...
});
// サーバーの起動
server.listen(8000);
// 3.1.1　EventEmitterの利用
// *************************************************
var events = require("events");
// EventEmitterインスタンスの生成
var eventEmitter = new events.EventEmitter();
// この関数には一部問題がある
function createFizzBuzzEventEmitter(until) {
    var eventEmitter = new events.EventEmitter();
    process.nextTick(function () { return _emitFizzBuzz(eventEmitter, until); });
    return eventEmitter;
}
// async/await構文が使えるよう、イベントを発行する部分を別の関数に切り離す
function _emitFizzBuzz(eventEmitter, until) {
    return __awaiter(this, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    eventEmitter.emit('start');
                    count = 1;
                    _a.label = 1;
                case 1:
                    if (!(count <= until)) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 2:
                    _a.sent();
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
                    return [3 /*break*/, 1];
                case 3:
                    eventEmitter.emit('end');
                    return [2 /*return*/];
            }
        });
    });
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
    this.off('start', startListener)
        .off('Fizz', fizzListener)
        .off('Buzz', BuzzListener)
        .off('FFizzBuzz', fizzBuzzListener)
        .off('end', endListener);
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
var fooEventEmitter = new events.EventEmitter();
fooEventEmitter.on('foo', function () {
    console.log('fooイベントリスナの実行');
});
console.log('fooイベント発行', fooEventEmitter.emit('foo'));
// 3.1.2　EventEmitterとメモリリーク
// *************************************************
var barEventEmitter = new events.EventEmitter();
for (var i = 0; i < 11; i++) {
    barEventEmitter.on('bar', function () { return console.log('bar'); });
}
var messageEveneEmitter = new events.EventEmitter();
// ブロック内での変数（listener）の宣言
{
    var listener = function () { return console.log('Hello'); };
    messageEveneEmitter.on('message', listener);
}
// listener()メソッドでmessageイベントのリスナを取得
// listenerの参照が残っており、ブロックが終了してもGCの対象にならない
messageEveneEmitter.listeners('message');
// リスナを100個まで登録できるようにする
var bazEventListener = new events.EventEmitter();
bazEventListener.setMaxListeners(100);
var _loop_1 = function (i) {
    bazEventListener.on('baz', function () { return console.log('baz', i); });
};
for (var i = 0; i < 100; i++) {
    _loop_1(i);
}
bazEventListener.emit('baz');
// 全EventEmitterを対象に、MAxListenersのデフォルト値を100にする
// events.EventEmitter.defaultMaxListeners = 100;
// 3.1.3　エラーハンドリング
// *************************************************
// → error-events.ts参照
