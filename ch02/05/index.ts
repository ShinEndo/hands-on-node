// 2.5　async/await
// *************************************************
// 2.5.1　async/await構文の使い方
// *************************************************
function parseJSONAsync(json) {
    return new Promise((resolve,reject)=>setTimeout(()=>{
        try{
            resolve(JSON.parse(json));
        } catch(err) {
            reject(err);
        }
    }))
}

async function asyncFunc(json) {
    try {
        const result = await parseJSONAsync(json);
        console.log('パース結果',result);
    } catch(err) {
        console.log('エラーをキャッチ',err);
    }
}

// 正常系
asyncFunc('{"foo":1}');

// 異常系
asyncFunc('不正なJSON');

async function asyncReturnFoo() {return 'foo'}
const awaitFoo = asyncReturnFoo();
awaitFoo.then(result => console.log(result));

// async function asyncThrow() {throw new Error('エラー')}
// asyncThrow();

async function pauseAndResume(pausePeriod) {
    console.log('pauseAndResume開始');
    await new Promise(resolve => setTimeout(resolve, pausePeriod));
    console.log('pauseAndResume再開');
}

pauseAndResume(1000);
console.log('asnyc関数外の処理はawaitの影響を受けない');

// 2.5.2　async/await構文のメリット
// *************************************************
// 2.5.3　async/await構文と非同期処理の並行実行
// *************************************************
// 2.5.4　トップレベルawait
// *************************************************
// [ Memo ]
// REPLでトップレベルawaitを使用する
// ------------------------------
// node --experimental-repl-await
// ex) await Promise.resolve('foo'); 
// 2.5.5　for await ... of
// *************************************************
// type IteratorResult<T> = {   value: T;   done: boolean; } | {   value?: undefined;   done: true; }
interface IteratorResult<T> {
    done: boolean;
    value?: T;
  }

const asyncIterable = {
    [Symbol.asyncIterator](){
        let i = 0;
        // asyncイテレータ
        return {
            next() : Promise<IteratorResult<number>> {
                if(i > 3) {
                    return Promise.resolve({done: true});
                }
                return new Promise(resolve => setTimeout(()=>resolve({value: i++,done: false}),100));
            }
        }
    }
}

for await (const element of asyncIterable){
    console.log(element);
};

async function* asyncGenerator() {
    let i = 0;
    while(i <= 3) {
        await new Promise(resolve => setTimeout(resolve,100));
        yield i++
    }
}

for await (const element of asyncGenerator()) {
    console.log(element);
}

export {}