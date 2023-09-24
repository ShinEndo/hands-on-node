// 4.2　clusterモジュールによるマルチプロセス化
// *************************************************
// 4.2.2.1　メッセージのシリアライズ方法の指定
// *************************************************
const dateObj = {lastDayOfHeisei: new Date(2019,3,30,9)};

const stringifiedDataObj = JSON.stringify(dateObj);

console.log(JSON.parse(stringifiedDataObj));

// console.log(typeof _.lastDayOfHeisei);

const circular = {bar: 1};

circular.foo = circular;

JSON.stringify(circular);

import v8 from "v8";
const circularWithDate = {lastDayOfHeisei: new Date(2019,3,30,9)};
circularWithDate.foo = circularWithDate;

const serializedCircularWithDate = v8.serialize(circularWithDate);

v8.deserialize(serializedCircularWithDate);

// console.log(_.lastDayOfHeisei instanceof Date);