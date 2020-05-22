'use strict'
/**
 * 學習重點：JS 區分 array 與 arrayLike
 */
//區分是否為 array
function isArray(data) {
  if (typeof data === 'object' && Array.isArray(data)) {
    return true
  } else {
    return false
  }
}

let fruits = {
  0: 'apple',
  1: 'banana',
  2: 'water lemon',
  length: 3
}

let fruitsArray = [
  'apple', 'banana', 'water lemon'
]
console.log(isArray(fruits))
console.log(isArray(fruitsArray))


//轉換 arrayLike to array
//方法一
function transferArrayLike(data) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    res.push(data[i])
  }
  return res
}
console.log(transferArrayLike(fruits))  //[ 'apple', 'banana', 'water lemon' ]

//方法二
console.log([].slice.call(fruits))  //[ 'apple', 'banana', 'water lemon' ]

//方法三
console.log(Array.prototype.slice.apply(fruits))  //[ 'apple', 'banana', 'water lemon' ]

//方法四
const arr = Array.from(fruits)
console.log(arr)  //[ 'apple', 'banana', 'water lemon' ]

//方法五
//繼承 Array.prototype，因此可以使用 Array 的屬性及方法，雖然看起來還是像 object。
fruits.__proto__ = Array.prototype
fruits.push('hot')
fruits.push('orange')
console.log(fruits)
/**
Array {
  '0': 'apple',
  '1': 'banana',
  '2': 'water lemon',
  '3': 'hot',
  '4': 'orange',
  length: 5
}
 */