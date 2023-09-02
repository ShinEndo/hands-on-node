// 2.3.2　then()、catch()、finally()
// *************************************************
// 2.3.2.1　then()
// *************************************************
var stringPromise = Promise.resolve('{"foo":1}');
console.log(stringPromise);
var numberPromise = stringPromise.then(function (str) { return str.length; });
console.log(numberPromise, ':numberPromise');
console.log(stringPromise, ':stringPromise');
setTimeout(function () { return console.log(numberPromise, ':numberPromise'); }, 0);
setTimeout(function () { return console.log(stringPromise, ':stringPromise'); }, 0);
// const unrecoveredPromise = Promise.reject(new Error('エラー')).then(() => 1);
// setTimeout(() => console.log(unrecoveredPromise, 'unrecoveredPromise'),0);
var recoveredPromise = Promise.reject(new Error('エラーメッセージ')).then(function () { return 1; }, function (err) { return err.message; });
setTimeout(function () { return console.log(recoveredPromise, 'recoveredPromise'); }, 0);
// const rejectedPromise = stringPromise.then(()=>{throw new Error('エラー')});
// setTimeout(() => console.log(rejectedPromise, 'rejectedPromise'),0);
function parseJSONAsync(json) {
    // Promiseインスタンスを生成して返す（この時点ではpending状態）
    return new Promise(function (resolve, reject) {
        return setTimeout(function () {
            try {
                // fullfilled状態にする（解決）
                resolve(JSON.parse(json));
            }
            catch (err) {
                // reject状態にする（拒否）
                reject(err);
            }
        }, 1000);
    });
}
var objPromise = stringPromise.then(parseJSONAsync);
objPromise;
var rejectedObjPromsie = Promise.resolve('不正なJSON').then(parseJSONAsync);
rejectedObjPromsie;
// 2.3.2.2　catch()
// *************************************************
// then()でonFulfilled()を省略
var withoutOnFulfilled = Promise.reject(new Error('エラー')).then(undefined, function () { return 0; });
withoutOnFulfilled;
// catch()の利用で同じ処理になる
var catchedPromise = Promise.reject(new Error('エラー')).catch(function () { return 0; });
catchedPromise;
// 2.3.2.3　finally()
// *************************************************
var onFinally = function () { return console.log('finallyのコールバック'); };
Promise.resolve().finally(onFinally);
Promise.reject(new Error('エラー')).finally(onFinally);
var returnValueInFinally = Promise.resolve(0).finally(function () { return 2; });
returnValueInFinally;
var throwErrorInFinally = Promise.resolve(1).finally(function () { throw new Error('エラー'); });
throwErrorInFinally;
Promise.resolve('foo').finally(function () {
    return new Promise(function (resolve) {
        return setTimeout(function () {
            console.log('finally()で1秒経過');
            resolve();
        }, 1000);
    });
}).then(console.log);
