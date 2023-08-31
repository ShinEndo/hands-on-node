// 2.3.1　Promiseインスタンスの生成と状態遷移
// *************************************************
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
var toBeFulfilled = parseJSONAsync('{"foo":1}');
// const toBeRejected = parseJSONAsync('不正なJSON');
console.log('******************** Promise生成直後 ********************');
console.log(toBeFulfilled);
// console.log(toBeRejected);
setTimeout(function () {
    console.log('******************** 1秒後 ********************');
    console.log(toBeFulfilled);
    // console.log(toBeRejected);
}, 1000);
// コンストラクタを使ってfullfilledなPromiseインスタンスを生成
var toBeFulfilled2 = new Promise(function (resolve) { return resolve({ foo: 1 }); });
console.log(toBeFulfilled2);
// Promise.resolve()を使ってfullfilledなPromiseインスタンスを生成
var toBeFulfilled3 = Promise.resolve({ foo: 1 });
console.log(toBeFulfilled3);
// コンストラクタを使ってrejectedなPromiseインスタンスを生成
var toBeRejected2 = new Promise(function (reject) { return reject(new Error('エラー')); });
console.log(toBeRejected2);
// Promise.reject()を使ってrejectedなPromiseインスランスを生成
// const toBeRejected3 = Promise.reject(new Error('エラー'));
// console.log(toBeRejected3);
