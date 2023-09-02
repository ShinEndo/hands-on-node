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