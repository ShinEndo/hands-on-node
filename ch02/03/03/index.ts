// 2.3.3　Promiseのスタチェックメソッドを使った非同期処理の並行実行
// *************************************************

// 2.3.3.1　Promise.all()
// *************************************************
const allResolved = Promise.all([
    1, // Promsie以外のものも含められる
    Promise.resolve('foo'),
    Promise.resolve(true),
]);
console.log(allResolved);
setTimeout(()=>console.log(allResolved),0);

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
    return new Promise(resolve => setTimeout(resolve,1000));
}

const start = performance.now();
asyncFunc().then(asyncFunc).then(asyncFunc).then(asyncFunc).then(()=>console.log('逐次実行所要時間', performance.now() - start));
Promise.all([asyncFunc,asyncFunc,asyncFunc,asyncFunc]).then(()=>console.log('並行実行所要時間', performance.now() - start));

// 2.3.3.2　Promise.race()
// *************************************************
function wait(time) {
    return new Promise(resolve => setTimeout(resolve,time));
}

const fulfilledFirst = Promise.race([
    wait(10).then(()=>1),
    wait(20).then(()=>'foo'),
    wait(30).then(()=>Promise.reject(new Error('エラー'))),
]);

const rejectFirst = Promise.race([
    wait(20).then(()=>1),
    wait(30).then(()=>'foo'),
    wait(10).then(()=> Promise.reject(new Error('エラー'))),
]);

const containsNonPromise = Promise.race([
    wait(10).then(()=>1),
    'foo',
    wait(20).then(()=>Promise.reject(new Error('エラー'))),
]);

fulfilledFirst;
rejectFirst;
containsNonPromise;

const raceWithEmptyArray = Promise.race([]);
raceWithEmptyArray;

function withTimeout(promise,timeout) {
    return Promise.race([
        promise,
        new Promise((_,reject) => setTimeout(()=>reject(new Error('タイムアウト')),timeout)),
    ])
}

// const promise = new Promise(resolve => setTimeout(()=>resolve(1),20));
const shouldBeResolved = withTimeout(new Promise(resolve => setTimeout(()=>resolve(1),20)),30);
const shouldBeRejected = withTimeout(new Promise(resolve => setTimeout(()=>resolve(1),20)),10);

// 2.3.3.3　Promise.allSettled()
// *************************************************
const allSettled = Promise.allSettled([
    1,
    Promise.resolve('foo'),
    Promise.reject(new Error('エラー')),
    Promise.resolve(true)
]);
allSettled;

Promise.allSettled([]);

// 2.3.3.4　Promise.any()
// *************************************************
const anyFulfilled = Promise.any([
    Promise.resolve('foo'),
    Promise.reject(new Error('エラー')),
    Promise.resolve(true)
]);

const noneFulfilled = Promise.any([
    Promise.reject(new Error('エラー1')),
    Promise.reject(new Error('エラー2')),
]);
noneFulfilled;

noneFulfilled.catch(err => console.log(err.errors));
noneFulfilled.catch(err => console.log(err.errors[0]));
noneFulfilled.catch(err => console.log(err.errors[1]));

Promise.any([]);
Promise.any([]).catch(err => console.log(err.erros));