'use strict'
/**
 * 學習重點：fibonacci sequence
 */


/**
 * 建立 fibonacci 函式-方法一
 * @param {*} number
 * @returns [*] array 
 */
function fibonacci(number) {
  const res = [0, 1]
  for (let i = 2; i < number; i++) {
    res.push(res[i - 2] + res[i - 1])
  }
  return res
}

const fibonacci10_forLoop = fibonacci(10)
console.log(fibonacci10_forLoop)



/**
 * 建立 fibonacci 函式-方法二
 * @param {*} number 
 * @returns [*] array
 */
function fibonacci2(array, number) {
  if (array.length < number) {
    array.push(array[array.length - 2] + array[array.length - 1])
    return fibonacci2(array, number)
  } else {
    return array
  }
}

const initial = [0, 1]
const fibonacci10_recursive = fibonacci2(initial, 50)
console.log(fibonacci10_recursive)


/**
 * 方法三：
 * 尋找數列中第 n 個數字
 */
function fibona(number) {
  if (number === 0 || number === 1) {
    return number
  }
  return fibona(number - 2) + fibona(number - 1)
}
console.log(fibona(20))
