// 2.4　ジェネレータ
// *************************************************
// 2.4.1　ジェネレータの生成
// *************************************************
function* generatiorFunc() {
    console.log('ジェネレータ関数開始');
    console.log('yield 1');
    yield 1;
    console.log('yield 2');
    yield 2;
    console.log('yield 3');
    yield 3;
    console.log('ジェネレータ関数終了');
    return 'ジェネレータ関数戻り値';
}
const generator = generatiorFunc();
generator;
generator.next();
generator.next();
generator.next();
generator.next();
generator.next();
// 2.4.2　イテレータとイテラブル
// *************************************************
const generator2 = generatiorFunc();
const iterator = generator2[Symbol.iterator]();
iterator.next();
iterator.next();
iterator.next();
iterator.next();
iterator.next();
iterator === generator2;
const generator3 = generatiorFunc();
for (const v of generator3) {
    console.log('for ... of', v);
}
const arrayIterator = [1, 2, 3][Symbol.iterator]();
arrayIterator.next();
arrayIterator.next();
arrayIterator.next();
arrayIterator.next();
// 2.4.3　引数を渡したnext()の実行、およびthrow()
// *************************************************
function* resetableGeneratorFunc() {
    let count = 0;
    while (true) {
        if (yield count++) {
            count = 0;
        }
    }
}
const resetableGenerator = resetableGeneratorFunc();
resetableGenerator.next();
resetableGenerator.next();
resetableGenerator.next();
resetableGenerator.next();
resetableGenerator.next();
resetableGenerator.next(true);
function* tryCatchGeneratorFunc() {
    try {
        yield 1;
    }
    catch (err) {
        console.log('エラーをキャッチ', err);
        yield 2;
    }
}
const tryCatchGenerator = tryCatchGeneratorFunc();
tryCatchGenerator.next();
tryCatchGenerator.throw(new Error('エラー'));
tryCatchGenerator.next();
// 2.4.4　ジェネレータを利用した非同期プログラミング
// *************************************************
function parseJSONAsync(json) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(JSON.parse(json));
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
function* asyncWithGeneratorFunc(json) {
    try {
        const result = yield parseJSONAsync(json);
        console.log('パース結果', result);
    }
    catch (err) {
        console.log('エラーをキャッチ', err);
    }
}
// 正常系
const asyncWithGenerator1 = asyncWithGeneratorFunc('{"foo":1}');
const promise1 = asyncWithGenerator1.next().value;
if (promise1)
    promise1.then(result => asyncWithGenerator1.next(result));
// 異常系
const asyncWithGenerator2 = asyncWithGeneratorFunc('不正なJSON');
const promise2 = asyncWithGenerator2.next().value;
if (promise2)
    promise2.catch(err => asyncWithGenerator2.throw(err));
// 非同期処理を実行するジェネレータの汎用的なハンドリング関数
// 戻り値はPromsieインスタンス
function handleAsyncWithGenerator(generator, resolved = null) {
    // 前回yieldされたPromiseインスタンスの値を引数にnext()を実行
    // 初回はresolvedには値が入っていない（undefined)
    const { done, value } = generator.next(resolved);
    if (done) {
        return Promise.resolve(value);
    }
    return value.then(
    // 正常系では再起呼び出し
    resolved => handleAsyncWithGenerator(generator, resolved), 
    // 異常系ではthrow()メソッドを実行
    err => generator.throw(err));
}
handleAsyncWithGenerator(asyncWithGeneratorFunc('{"foo":1}'));
handleAsyncWithGenerator(asyncWithGeneratorFunc('不正なJSON'));
