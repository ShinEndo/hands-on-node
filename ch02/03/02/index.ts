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

// const unrecoveredPromise = Promise.reject(new Error('エラー')).then(() => 1);
// setTimeout(() => console.log(unrecoveredPromise, 'unrecoveredPromise'),0);

const recoveredPromise = Promise.reject(new Error('エラーメッセージ')).then(()=>1,err => err.message);
setTimeout(() => console.log(recoveredPromise, 'recoveredPromise'),0);

// const rejectedPromise = stringPromise.then(()=>{throw new Error('エラー')});
// setTimeout(() => console.log(rejectedPromise, 'rejectedPromise'),0);

function parseJSONAsync(json: string) {
	// Promiseインスタンスを生成して返す（この時点ではpending状態）
	return new Promise((resolve, reject) =>
		setTimeout(() => {
			try {
				// fullfilled状態にする（解決）
				resolve(JSON.parse(json));
			} catch (err) {
				// reject状態にする（拒否）
				reject(err);
			}
		}, 1000)
	);
}

const objPromise = stringPromise.then(parseJSONAsync);
objPromise;

const rejectedObjPromsie = Promise.resolve('不正なJSON').then(parseJSONAsync);
rejectedObjPromsie;

// 2.3.2.2　catch()
// *************************************************
// then()でonFulfilled()を省略
const withoutOnFulfilled = Promise.reject(new Error('エラー')).then(undefined,()=>0);
withoutOnFulfilled;
// catch()の利用で同じ処理になる
const catchedPromise = Promise.reject(new Error('エラー')).catch(()=>0);
catchedPromise;

// 2.3.2.3　finally()
// *************************************************
const onFinally = () => console.log('finallyのコールバック');
Promise.resolve().finally(onFinally);
Promise.reject(new Error('エラー')).finally(onFinally);

const returnValueInFinally = Promise.resolve(0).finally(()=>2);
returnValueInFinally;

const throwErrorInFinally = Promise.resolve(1).finally(()=>{throw new Error('エラー')});
throwErrorInFinally;

Promise.resolve('foo').finally(()=>
    new Promise<void>(resolve =>
        setTimeout(()=>{
            console.log('finally()で1秒経過');
            resolve();
         },1000))
).then(console.log);


// 2.3.2.4　then()、catch()、finally()に渡すコールバックの実行タイミング
// *************************************************
Promise.resolve('foo').then(result => console.log('コールバック',result));
console.log('この行が先に実行される');



