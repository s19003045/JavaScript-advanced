'use strict'
/**
 * 學習重點： JS scoping
 */

/**
 * scope 分二種：
 * 1.global scope
 * 2.local scope
 */

// =========global scope
const hello = 'Hello CSS-Tricks Reader!'

function sayHello() {
  console.log(hello)
}

console.log(hello) // 'Hello CSS-Tricks Reader!'
sayHello() // 'Hello CSS-Tricks Reader!'



// 使用 let 重覆宣告，會報錯
//let thing = 'something'
//let thing = 'something else' // Error, thing has already been declared


// 使用 var 重覆宣告：不會報錯，但是後來宣告的值會覆蓋前者宣告的值
var thing = 'something'
var thing = 'something else' // perhaps somewhere totally different in your code
console.log(thing) // 'something else'


//=========Local scope
/**
 * local scope 分二種：
 * 1.function scope
 * 2.block scope
 */

// function scope
function sayHello2() {
  const hello2 = 'function scope   =>   Hello CSS-Tricks Reader!'
  console.log(hello2)
}

sayHello2() // 'Hello CSS-Tricks Reader!'
// console.log(hello2) // ReferenceError: hello2 is not defined


// block scope
{
  const hello3 = 'block scope   =>  Hello CSS-Tricks Reader!'
  console.log(hello3) // 'Hello CSS-Tricks Reader!'
}

//console.log(hello3) // ReferenceError: hello3 is not defined



//====== Functions do not have access to each other’s scopes
function first() {
  const firstFunctionVariable = `I'm part of first`
}

function second() {
  first()
  //console.log(firstFunctionVariable) // Error, firstFunctionVariable is not defined
}

second()   //ReferenceError: firstFunctionVariable is not defined



//====== Nested scopes：內層的函式可以存取外層函數中的變數，稱做 lexical scoping
function outerFunction() {
  const outer = `I'm the outer function!`

  function innerFunction() {
    const inner = `I'm the inner function!`
    console.log(outer) // I'm the outer function!
  }

  //console.log(inner) // ReferenceError: inner is not defined
}

outerFunction()  //ReferenceError: inner is not defined



//====== closure
function outerFunction() {
  const outer = `I see the outer variable!`

  function innerFunction() {
    console.log(outer)
  }

  return innerFunction
}

outerFunction()() // I see the outer variable!


// 或者可以這樣寫，直接 return innerFunction
function outerFunction12() {
  const outer = `I see the outer variable!`

  return function innerFunction() {
    console.log(outer)
  }
}

outerFunction12()() // I see the outer variable!


/** closure 常用於：
1.To control side effects
2.To create private variables
 */

//當 setTimeout 與 console.log() 一起使用時，會產生不如預期的效應：
function makeCake(flavor) {
  setTimeout(_ => console.log(`Made a ${flavor} cake!`), 1000)
}
makeCake('banana')   // 一秒後，印出  Made a banana cake!



//如果不想要立即在 一秒後印出，有何辦法?
function prepareCake(flavor) {
  return function () {
    setTimeout(_ => console.log(`Made a ${flavor} cake!`), 1000)
  }
}

const makeCakeLater = prepareCake('banana')

// And later in your code...
makeCakeLater()
// Made a banana cake!



// Private variables with closures
function secret(secretCode) {
  return {
    saySecretCode() {
      console.log(secretCode)
    }
  }
}

const theSecret = secret('CSS Tricks is amazing')
theSecret.saySecretCode()
// 'CSS Tricks is amazing'


/**
 * 關於更多 closure 的介紹及練習，可見 closure.js
 */