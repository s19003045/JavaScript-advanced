'use strict'
/**
 * 學習重點：JS shallow copy and deep copy
 */

//shallow copy
const furniture = ['table', 'bed', 'desk', 'chair']
const shallowCopyFurniture = furniture
console.log('furniture:', furniture)
console.log('shallowCopyFurniture:', shallowCopyFurniture)
console.log('furniture === shallowCopyFurniture:', furniture === shallowCopyFurniture)  // furniture === shallowCopyFurniture: true



//deep copy
const fruits = ['apple', 'banana', 'water lemon']
console.log('fruits:', fruits)
function deepCopy(data) {
  return JSON.parse(JSON.stringify(data))
}
const birthday = {
  father: '02-19',
  mother: '10-19',
  Abby: '10-15',
  Doris: '04-13',
  Oliver: '07-24'
}
const fruitsCopy = deepCopy(fruits)
console.log('fruitsCopy:', fruitsCopy)

console.log('fruits === fruitsCopy:', fruits === fruitsCopy)  // fruits === fruitsCopy: false

const birthdayCopy = deepCopy(birthday)
console.log('birthday === birthdayCopy:', birthday === birthdayCopy)  // birthday === birthdayCopy: false


//實現一個函數 clone，可以對 JavaScript 中的 5 種主要的數據類型（包括 Number、String、Object、Array、Boolean）進行值複製
function cloneAnyData(data) {
  let res
  if (typeof data === 'number') {
    res = data
    return res
  }
  if (typeof data === 'string') {
    res = data
    return res
  }
  if (typeof data === 'object' && Array.isArray(data)) {
    let res = JSON.parse(JSON.stringify(data))
    return res
  }
  if (typeof data === 'object' && !Array.isArray(data)) {
    let res = JSON.parse(JSON.stringify(data))
    return res
  }
  if (typeof data === 'boolean') {
    res = data
    return res
  }
}

let age = 18
let name = 'John'
let isMale = true
let transportation = ['train', 'bus', 'bicycle']
let family = {
  mother: 'Mary',
  father: 'Johnson',
  son: 'Peter',
  daughter: 'Jene'
}

let copyAge = cloneAnyData(age)
console.log('copyAge:', copyAge)
console.log('age === copyAge:', age === copyAge)

let copyName = cloneAnyData(name)
console.log('copyName:', copyName)
console.log('name === copyName:', name === copyName)

let copyIsMale = cloneAnyData(isMale)
console.log('copyIsMale:', copyIsMale)
console.log('isMale === copyIsMale:', isMale === copyIsMale)

let copyTransportation = cloneAnyData(transportation)
console.log('copyTransportation:', copyTransportation)
console.log('transportation === copyTransportation:', transportation === copyTransportation)

let copyFamily = cloneAnyData(family)
console.log('copyFamily:', copyFamily)
console.log('family === copyFamily:', family === copyFamily)