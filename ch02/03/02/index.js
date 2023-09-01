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
var unrecoveredPromise = Promise.reject(new Error('エラー')).then(function () { return 1; });
console.log(unrecoveredPromise);
