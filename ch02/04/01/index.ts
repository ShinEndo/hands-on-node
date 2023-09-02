// 2.4　ジェネレータ
// *************************************************
// 2.4.1　ジェネレータの生成
// *************************************************
function* generatiorFunc() {
    console.log('ジェネレータ関数開始');
    console.log('yield 1');
    yield 1
    console.log('yield 2');
    yield 2
    console.log('yield 3');
    yield 3
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
