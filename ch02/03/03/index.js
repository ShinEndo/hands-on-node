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
// 2.3.3.2　Promise.race()
// *************************************************
function wait(time) {
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
}
var fulfilledFirst = Promise.race([
    wait(10).then(function () { return 1; }),
    wait(20).then(function () { return 'foo'; }),
    wait(30).then(function () { return Promise.reject(new Error('エラー')); }),
]);
var rejectFirst = Promise.race([
    wait(20).then(function () { return 1; }),
    wait(30).then(function () { return 'foo'; }),
    wait(10).then(function () { return Promise.reject(new Error('エラー')); }),
]);
var containsNonPromise = Promise.race([
    wait(10).then(function () { return 1; }),
    'foo',
    wait(20).then(function () { return Promise.reject(new Error('エラー')); }),
]);
fulfilledFirst;
rejectFirst;
containsNonPromise;
var raceWithEmptyArray = Promise.race([]);
raceWithEmptyArray;
function withTimeout(promise, timeout) {
    return Promise.race([
        promise,
        new Promise(function (_, reject) { return setTimeout(function () { return reject(new Error('タイムアウト')); }, timeout); }),
    ]);
}
// const promise = new Promise(resolve => setTimeout(()=>resolve(1),20));
var shouldBeResolved = withTimeout(new Promise(function (resolve) { return setTimeout(function () { return resolve(1); }, 20); }), 30);
var shouldBeRejected = withTimeout(new Promise(function (resolve) { return setTimeout(function () { return resolve(1); }, 20); }), 10);
// 2.3.3.3　Promise.allSettled()
// *************************************************
var allSettled = Promise.allSettled([
    1,
    Promise.resolve('foo'),
    Promise.reject(new Error('エラー')),
    Promise.resolve(true)
]);
allSettled;
Promise.allSettled([]);
// 2.3.3.4　Promise.any()
// *************************************************
var anyFulfilled = Promise.any([
    Promise.resolve('foo'),
    Promise.reject(new Error('エラー')),
    Promise.resolve(true)
]);
var noneFulfilled = Promise.any([
    Promise.reject(new Error('エラー1')),
    Promise.reject(new Error('エラー2')),
]);
noneFulfilled;
noneFulfilled.catch(function (err) { return console.log(err.errors); });
noneFulfilled.catch(function (err) { return console.log(err.errors[0]); });
noneFulfilled.catch(function (err) { return console.log(err.errors[1]); });
Promise.any([]);
Promise.any([]).catch(function (err) { return console.log(err.erros); });
