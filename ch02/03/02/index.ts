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







