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
  // 建立實例的方法，如下四個：
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

let toyota = new Car('TOYOTA', 'blue')
console.log('toyota  =>', toyota)

toyota.setName('Benze')
console.log('toyota  =>', toyota)