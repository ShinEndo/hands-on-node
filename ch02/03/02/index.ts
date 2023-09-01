// 2.3.2　then()、catch()、finally()
// *************************************************
// 2.3.2.1　then()
// *************************************************
const stringPromise = Promise.resolve('{"foo":1}');
console.log(stringPromise);

const numberPromise = stringPromise.then((str) => str.length);
console.log(numberPromise, ':numberPromise');
console.log(stringPromise, ':stringPromise');
setTimeout(() => console.log(numberPromise, ':numberPromise'), 0);
setTimeout(() => console.log(stringPromise, ':stringPromise'), 0);

const unrecoveredPromise = Promise.reject(new Error('エラー')).then(() => 1);
console.log(unrecoveredPromise);
