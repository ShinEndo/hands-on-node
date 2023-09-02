// 2.3.3　Promiseのスタチェックメソッドを使った非同期処理の並行実行
// *************************************************
// 2.3.3.1　Promise.all()
// *************************************************
var allResolved = Promise.all([
    1,
    Promise.resolve('foo'),
    Promise.resolve(true),
]);
console.log(allResolved);
setTimeout(function () { return console.log(allResolved); }, 0);
// const containsReject = Promise.all([
//     1,
//     Promise.resolve('foo'),
//     Promise.reject(new Error('エラー')),
//     Promise.resolve(true),
// ]);
// console.log(containsReject);
// setTimeout(()=>console.log(containsReject),0);
// const emptyAll = Promise.all([]);
function asyncFunc() {
    return new Promise(function (resolve) { return setTimeout(resolve, 1000); });
}
var start = performance.now();
asyncFunc().then(asyncFunc).then(asyncFunc).then(asyncFunc).then(function () { return console.log('逐次実行所要時間', performance.now() - start); });
Promise.all([asyncFunc, asyncFunc, asyncFunc, asyncFunc]).then(function () { return console.log('並行実行所要時間', performance.now() - start); });
