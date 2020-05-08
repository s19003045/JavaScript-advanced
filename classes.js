'user strict'
/**
 * 練習重點：JS ES6 的 class
 * 
 */

// 類別宣告 (class declaration)
// 類別不具 hoisting, 函式有 hoisting
// 所以在使用類別建立 instance 之前，必須先宣告之

/**
 * 建立類別有二種方式：
 * 
 */
// 類別宣告 (class declaration)
class Car {
  constructor(name, color) {
    this.name = name   // this 指透過 contructor 建立的實例本身 
    this.color = color   // this 指透過 contructor 建立的實例本身
  }
  // 建立實例自己本身的方法(不是 prototype，這些方法並沒有要共用)，如下四個：
  setName(name) {   // 改變 實例的 name
    this.name = name
  }

  setColor(color) {  // 改變 實例的 color
    this.color = color
  }

  getName() {  // 取得 實例的 name
    return this.name
  }

  getColor() {  // 取得 實例的 color
    return this.color
  }
}
  //透過 Constructor 建立的實例，要共用的方法，使用 .prototype 來建立 function
  Car.prototype.getColor1 = function (color) {
  return color
}

  //透過 Constructor 建立的實例，只有 Constructor 自己可以使用，
  //※實例無法使用此方法
  Car.sayHello = function (msg) {
  console.log(msg)
}

console.log('Car.prototype  =>  ', Car.prototype)
// 印出   =>   Car.prototype  =>   Car { getColor1: [Function] }

console.log('Car', Car)
// 印出   =>   Car [Function: Car] { sayHello: [Function] }

// 利用 Car Constructor 來建立 Car 的實例
let toyota = new Car('TOYOTA', 'blue')

console.log('toyota  =>', toyota)
// 印出：  toyota  => Car { name: 'TOYOTA', color: 'blue' }
// 只有印出實例的屬性，不包含實例的方法

console.log('toyota.getColor()   =>  ', toyota.getColor())
// 印出：  toyota.getColor()   =>   blue
toyota.setName('Benze')
console.log('toyota  =>', toyota)
// 印出：  toyota  => Car { name: 'Benze', color: 'blue' }

// console.log('toyota.sayHello()  => ', toyota.sayHello('good bye'))
// 印出：TypeError: toyota.sayHello is not a function


// 類別途述又分二種
// 2.類別敘述 (class expression)：unnamed
var Person = class {
  constructor(name, color) {
    this.name = name   // this 指透過 contructor 建立的實例本身
    this.color = color  // this 指透過 contructor 建立的實例本身
  }
}
// 2.類別敘述 (class expression)：named
var Tree = class Tree {
  constructor(name, color) {
    this.name = name
    this.color = color
  }
}


