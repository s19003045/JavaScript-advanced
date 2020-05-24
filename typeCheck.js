'use strict'
/**
 * 練習重點：各種型別的檢查
 *
 */

class TypeCheck {
  isInteger(x) {
    if (Number.isInteger(x)) {
      return true
    }
    return false
  }

  isNumber(x) {
    if (typeof x === 'number') {
      return true
    }
    return false
  }

  isString(x) {
    if (typeof x === 'string') {
      return true
    }
    return false
  }

  isBoolean(x) {
    if (typeof x === 'boolean') {
      return true
    }
    return false
  }

  isArray(x) {
    if (Array.isArray(x)) {
      return true
    }
    return false
  }

  isFunction(x) {
    if (typeof x === 'function') {
      return true
    }
    return false
  }

  isObject() {
    if (typeof x === 'object' && !Array.isArray(x)) {
      return true
    }
    return false
  }
}

// 建立實例
const typeCheck = new TypeCheck()


//檢查是否為 integer
console.log('====== 使用 Number 物件來檢查是否為 integer ======')
console.log(Number.isInteger(123))   // true
console.log(Number.isInteger('123'))   // false
console.log(Number.isInteger('123abc'))   // false
console.log(Number.isInteger('abc123'))   // false
console.log(Number.isInteger(1234.456))   // false
console.log(Number.isInteger(0.23423))   // false


console.log('====== 使用建立的物件來檢查是否為 integer ======')
console.log(typeCheck.isInteger(123))   // true
console.log(typeCheck.isInteger('123'))   // false
console.log(typeCheck.isInteger('123abc'))   // false
console.log(typeCheck.isInteger('abc123'))   // false
console.log(typeCheck.isInteger(1234.456))   // false
console.log(typeCheck.isInteger(0.23423))   // false


console.log('====== 使用 Number 物件來檢查是否為 finite ======')
// 檢查是否為 finite (有限)
console.log(Number.isFinite(1234))   // true
console.log(1 / 9)  //0.1111111111111111
console.log(Number.isFinite(1 / 9))   // true
console.log(Number.isFinite('123'))   // false



