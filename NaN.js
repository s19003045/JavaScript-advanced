'use strict'
/**
 * 練習重點：JS 的 NaN
 *
 */
//NaN 為全域物件
console.log(NaN)   //NaN

console.log('===============')

//NaN 可以指派給變數
let x = NaN
console.log('x  =>  ', x)   // x  =>   NaN
x = 123
console.log('x  =>  ', x)   // x  =>   123

console.log('===============')

//NaN 的特性
console.log(Number.isNaN(NaN))   //true
console.log(Number.isInteger(123))   //true
console.log(Number.isInteger(NaN))   //false
console.log(Object.getPrototypeOf(NaN))   //[Number: 0]
console.log(Boolean(NaN))   //false
console.log(String(NaN))   //'NaN'
console.log(NaN.toString())   //'NaN'
console.log(NaN.__proto__ === Number.prototype)   //true

console.log('=======全域方法檢測是否為 NaN：非嚴格檢查========')

//全域方法檢測是否為 NaN：非嚴格檢查
//會先將參數轉成 number 後，再來判斷是否為 NaN
console.log(Number('abc'))   //NaN
console.log(Number('1234abc'))   //NaN
console.log(Number('abc132'))   //NaN

// 下的判斷可以參考上面先轉換成 number 的結果
console.log(isNaN(1234))   // false
console.log(isNaN('1234'))   // false
console.log(isNaN('abc'))   // true
console.log(isNaN('1234abc'))   // true
console.log(isNaN(NaN))   // true


console.log('=======檢測是否為 NaN => Number.isNaN()========')

//檢測是否為 NaN：嚴格檢查
// Number.isNaN() 此方法會檢測是否為 Number type 且為 NaN
console.log(Number.isNaN(123))  //false
console.log(Number.isNaN('123'))  //false
console.log(Number.isNaN('abc'))  //false
console.log(Number.isNaN('123ab'))  //false
console.log(Number.isNaN(NaN))  //true

console.log('===============')