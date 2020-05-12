'use strict'
/**
 *
 * 練習重點：Function programming
 */



/**
 *
 * 一. Function 必須作為一級公民。
 * 意即，Function 可以像一般變數一般被當作參數傳入、
 * 被當作結果輸出、被任意 assign 給其他變數、被任意進行運算。
 * 
 */

// function can be assignable to variable
const firstFunc = function () {
  console.log('function can be assignable')
}

firstFunc()  // print: function can be assignable


// function can be return in a function
function firstFuncReturn(msg) {
  return function (msg) {
    console.log(`Return function , msg: ${msg}`)
  }
}

const getFuncReturn = firstFuncReturn()

getFuncReturn('hello return function')  // print: Return function , msg: hello return function



/**
 * 二、Function 中只能有 Expression 而非指令( instructions )。
 */

// good example
const addition = function (a, b) {
  return a + b    // just expression => OK !
}


// wrong example
const personObj = [
  { id: 1, money: 18 },
  { id: 2, money: 20 },
  { id: 3, money: 2 },
]

const personObjAft = personObj.reduce((acc, ele) => {
  acc[ele.id] = ele   //assign instruction => not ok !
  return acc
})

// good example
const personObjAftGood = personObj.reduce((acc, ele) => {
  acc = {
    ...acc,
    [ele.id]: ele    // 每次都 return 新的、包含 acc 的 object ，不改變原本 acc
  }
  return acc
})


/**
 * 三、Function 必須是 Pure Function、沒有 Side Effect
 * 
 * FP 要求 function 「無論何時何地，Output 都只與 Input 有關係」
 */

// wrong example
let outerVal = 1

const calculate = function (operatorVal, num_1, num_2) {
  const action = {
    0: '+',
    1: '-',
    2: '*',
    3: '/'
  }
  const calculateAction = {
    '+': () => num_1 + num_2,
    '-': () => num_1 - num_2,
    '*': () => num_1 * num_2,
    '/': () => num_1 / num_2
  }

  return calculateAction[action[operatorVal + outerVal]]  // outerVal not in parameter  => not OK
}

console.log(calculate(1, 2, 2))

// good example
const calculateGood = function (operatorVal, outerVal, num_1, num_2) {
  const action = {
    0: '+',
    1: '-',
    2: '*',
    3: '/'
  }
  const calculateAction = {
    '+': () => num_1 + num_2,
    '-': () => num_1 - num_2,
    '*': () => num_1 * num_2,
    '/': () => num_1 / num_2
  }

  return calculateAction[action[operatorVal + outerVal]]  // outerVal is in parameter  => OK
}

console.log(calculate(1, 0, 2, 2))


/**
 * 四、Function 「不可改變 Input 的資料」、「不可 改變狀態」
 *
 *
 */

// wrong example
const box = [1, 2, 3, 4, 5, 6, 7]

box.splice(1, 2)  // change the box obj   => not OK

console.log('box: ', box)

// good example
const box2 = [1, 2, 3, 4, 5, 6, 7]

box.slice(1, 2)  // don't change the box obj   => OK

console.log('box2: ', box2)


/**
 * 五、Function 可以任意組合得到新的 Function，且依然滿足以上這些守則
 *
 */

// good example

// 組合二個以上函式成新的函式
var compose = function (f, g) {
  return function (x) {
    return f(g(x));
  };
};

const add20 = function (x) {
  return x + 20
}

const multiply3 = function (x) {
  return x * 3
}

const add20AndMultiply3 = compose(add20, multiply3)  // 組合一個新的函式

console.log(add20AndMultiply3(35))  // print : 125

const multiply3AndAdd20 = compose(multiply3, add20)  // 組合另一個新的函式

console.log(multiply3AndAdd20(35))  // print : 165