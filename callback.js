'use strict'
/**
 * 學習重點：
 * JavaScript 之 callback
 * 
 */

// 例一：先加法，再乘法
function add(x, cb) {
  x += 2
  console.log(x)
  return cb(x)
}

function multiply(x) {
  return x * 2
}

let money = 20
let result = add(money, multiply)

console.log('result:  ', result)
console.log('money:  ', money)


// 例一：綜合所得稅費率級距

var user1Info = {
  salary: 1800000,  // 實際薪資
  incomeTax_initial: 0  // 稅額初始
}

// 計算綜所稅級距__1 
function incomeTaxCal_1(userInfo, cb) {
  let taxRate = 0.05,  // 稅率
    taxBracket_min = 0,  //級距(0 - 80萬元)
    taxBracket_max = 800000,  //級距(0 - 80萬元)

    tempoUserInfo = {
      ...userInfo,
      taxIncome_total: 0,  // 綜所稅全額
      taxIncome_1: 0,  // 此級距的徵收悅額
      bracketSalary_1: 0,  // 此級距內的綜合所得
      nextBracketSalary: 0  // 下一個級距以上的綜合所得
    }

  // 計算此級距內的綜合所得
  tempoUserInfo.bracketSalary_1 = tempoUserInfo.salary >= taxBracket_max ? taxBracket_max : tempoUserInfo.salary

  // 計算此級距的徵收悅額
  tempoUserInfo.taxIncome_1 = tempoUserInfo.bracketSalary_1 * taxRate

  // 計算到此級距之徵收總額
  tempoUserInfo.taxIncome_total += tempoUserInfo.taxIncome_1

  // 計算下一個級距以上的綜合所得
  tempoUserInfo.nextBracketSalary = tempoUserInfo.salary >= taxBracket_max ? tempoUserInfo.salary - taxBracket_max : 0

  console.log('級距一：', tempoUserInfo)

  return cb(tempoUserInfo)
}

// 計算綜所稅級距__2
function incomeTaxCal_2(tempoUserInfo, cb) {
  // console.log('tempoUserInfo:', tempoUserInfo)
  let taxRate = 0.15,  // 稅率
    taxBracket_min = 800000,  //級距(80 - 160萬元)
    taxBracket_max = 1600000, //級距(80 - 160萬元)
    tempoUserInfo2 = {
      ...tempoUserInfo,
      taxIncome_2: 0,  // 此級距的徵收悅額
      bracketSalary_2: 0,  // 此級距內的綜合所得
    }

  // 計算此級距內的綜合所得
  tempoUserInfo2.bracketSalary_2 = tempoUserInfo2.nextBracketSalary >= (taxBracket_max - taxBracket_min) ? taxBracket_max - taxBracket_min : tempoUserInfo2.nextBracketSalary

  // 計算此級距的徵收悅額
  tempoUserInfo2.taxIncome_2 = tempoUserInfo2.bracketSalary_2 * taxRate

  // 計算到此級距之徵收總額
  tempoUserInfo.taxIncome_total += tempoUserInfo2.taxIncome_2

  // 計算下一個級距以上的綜合所得
  tempoUserInfo2.nextBracketSalary = tempoUserInfo2.nextBracketSalary >= (taxBracket_max - taxBracket_min) ? tempoUserInfo2.salary - taxBracket_max : 0

  // cb(tempoUserInfo2)
  return tempoUserInfo2
}

// 計算綜所稅級距__3
function incomeTaxCal_3(tempoUserInfo, cb) {
  // console.log('tempoUserInfo:', tempoUserInfo)
  let taxRate = 0.20,  // 稅率
    taxBracket_min = 1600000,  //級距(160 - 250萬元)
    taxBracket_max = 2500000, //級距(160 - 250萬元)
    tempoUserInfo3 = {
      ...tempoUserInfo,
      taxIncome_3: 0,  // 此級距的徵收悅額
      bracketSalary_3: 0,  // 此級距內的綜合所得
    }

  // 計算此級距內的綜合所得
  tempoUserInfo3.bracketSalary_3 = tempoUserInfo3.nextBracketSalary >= (taxBracket_max - taxBracket_min) ? taxBracket_max - taxBracket_min : tempoUserInfo3.nextBracketSalary

  // 計算此級距的徵收悅額
  tempoUserInfo3.taxIncome_3 = tempoUserInfo3.bracketSalary_3 * taxRate

  // 計算到此級距之徵收總額
  tempoUserInfo.taxIncome_total += tempoUserInfo3.taxIncome_3

  // 計算下一個級距以上的綜合所得
  tempoUserInfo3.nextBracketSalary = tempoUserInfo3.nextBracketSalary >= (taxBracket_max - taxBracket_min) ? tempoUserInfo3.salary - taxBracket_max : 0

  return tempoUserInfo3
}

var user1IncomeTax1_2 = incomeTaxCal_1(user1Info, incomeTaxCal_2)

var user1IncomeTax1_3 = incomeTaxCal_3(user1IncomeTax1_2)

console.log('綜所稅 級距一 ~ 級距二：', user1IncomeTax1_2)

console.log('綜所稅 級距一 ~ 級距三：', user1IncomeTax1_3)

