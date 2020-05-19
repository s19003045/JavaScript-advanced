'use strict'
/**
 * 學習重點：JS hoisting
 */

// 使用 let 宣告變數，並在宣告前呼叫變數，node.js 執行環境會報錯
// console.log(a)

// let a = 'nothing'  //ReferenceError: Cannot access 'a' before initialization


// 使用 var 宣告變數，並在宣告前呼叫變數，node.js 執行環境會報錯
// console.log(b)

// var a = 'nothing'  //ReferenceError: b is not defined

/**
 * 何謂 hoisting(拉升) ?
 *
 * =>  JS 在編譯時期，會先找出所有變數並綁定所屬範疇 (scope)，但不賦值
 */


//hoisting 的限制：注意 scope
//函式內宣告變數，變數會被限定在函式 scope 中，在scope 外呼叫該變數會報錯
function inMyMinde() {
  let name = 'john'

  var age = 18

  console.log(name)
}
// console.log(name)  //ReferenceError: name is not defined
// console.log(age)  //ReferenceError: age is not defined


// function declaration 會拉升，因此可在宣告函式前呼叫函式
// 函式拉升會連同函式內所有執行區塊同步拉升
foo()

function foo() {
  console.log('I am foo')
  return function bar() {
    console.log('I am bar')
  }
}

// function expression 不會被拉升，所以 bar() 會報錯
// bar()  //TypeError: bar is not a function

var bar = foo()

bar()


