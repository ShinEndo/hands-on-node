// 2.5.4　トップレベルawait
// *************************************************
console.log('child-a 1');
export const promise = await new Promise(resolve => setTimeout(resolve, 1000));
console.log('child-a 2');
