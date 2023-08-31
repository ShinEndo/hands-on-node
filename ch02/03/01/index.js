// 2.3.1　Promiseインスタンスの生成と状態遷移
// *************************************************
function parseJSONAsync(json) {
    // Promiseインスタンスを生成して返す（この時点ではpending状態）
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            try {
                // fullfilled状態にする（解決）
                resolve(JSON.parse(json));
            }
            catch (err) {
                // reject状態にする
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
