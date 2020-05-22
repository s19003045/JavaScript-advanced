// 'use strict'
// 不能使用 use strict
// TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them

/**
 * 學習重點：Caller and callee
 * 
 */

/**
 * 在瀏灠器中執行，與在 node.js 中執行，會有所不同
 * 以下程式碼分開執行
 */

// 以下程式碼適用於 node.js
var a = function () {
  console.log(a.caller);
}
var b = function () {
  a();
}

// 透過其他函式呼叫 a 時， a.caller 回傳呼叫者本身
b();  // [Function: b]   (node.js)

// 直接呼 a 時，a.caller 會回傳 null
a();  // [Function]  (node.js)

// 以下程式碼適用於 browser
var a1 = function () {
  alert(a1.caller);
}
var b1 = function () {
  a1();
}

a1()   // null
b1()
/**
function () {
  a1();
}
 */



//@@@ callee
// 以下程式碼適用於 node.js
var aa = function () {
  console.log(arguments.callee);
}
var bb = function () {
  aa();
}
bb();  //[Function: a]  (node.js)
aa()  //[Function: a]  (node.js)


// 以下程式碼適用於 browser
var cc = function () {
  alert(arguments.callee);
}
var dd = function () {
  cc();
}
cc();  //[Function: cc] (node.js)

/**
function () {
  alert(arguments.callee);
}
 */
dd()  //[Function: cc]  (node.js)
/**
function () {
  alert(arguments.callee);
}
 */