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
