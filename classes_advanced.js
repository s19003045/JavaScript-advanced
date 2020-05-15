'use strict'
/**
 * 學習重點：
 * 1.class 關鍵字：用來宣告類別
 * 2.static 關鍵字：定義類別的靜態屬性及方法 => 只有類別本身可使用，繼承的子類別或類別建構的實例都無法使用
 * 3.extends 關鍵字：繼承類別，可繼承 constructor、 prototype 的屬性及方法
 * 4.super 關鍵字：覆寫母類別的屬性或方法
 *
 */



// ===== 類別的 static method =====
/**
 * 何謂靜態方法？
 * 
 * 靜態方法：把一個方法賦值給 class 函數本身，而不是賦給 class 的 prototype 
 */
//宣告靜態方法 =>
// 方式一：
class User {
  static staticMethod() {
    console.log(this === User);
  }
}

User.staticMethod(); // true

// 方式二：
class User1 { }

User1.staticMethod = function () {
  console.log(this === User1);
};

User1.staticMethod(); // true

// 調用靜態方法的方式
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static compare(a, b) {
    return a.date < b.date ? -1 : 1;
  }

  sayHello() {
    console.log('I am class Article')
  }
}

console.log(Article.prototype)  // print: Article {}
console.log(Article.prototype.sayHello)  // print: [Function: sayHello]

console.log(Article)  //print:  [Function: Article]
console.log(Article.compare)  //print:  [Function: compare]

let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

console.log(articles)
/**print :
[
  Article { title: 'HTML', date: 2019 - 01 - 31T16: 00: 00.000Z },
Article { title: 'CSS', date: 2018 - 12 - 31T16: 00: 00.000Z },
Article { title: 'JavaScript', date: 2019 - 11 - 30T16: 00: 00.000Z }
]

 */

// 靜態方法調用場景，例如 => 實例可調用類別的靜態方法
articles.sort(Article.compare)   // Article.compare 乃 class 的靜態方法
console.log(articles)
/**
 * print:
[
  Article { title: 'CSS', date: 2018-12-31T16:00:00.000Z },
  Article { title: 'HTML', date: 2019-01-31T16:00:00.000Z },
  Article { title: 'JavaScript', date: 2019-11-30T16:00:00.000Z }
]
 */
var article = new Article()
var ages = [55, 76, 84, 57, 34, , 99, 68, 100, 1, 12]

console.log(ages)  // print: [ 55, 76, 84, 57, 34, <1 empty item>, 99, 68, 100, 1, 12 ]

console.log(article.compare)  //print: undefined
ages.sort(article.compare)  //ages.sort(undefined)  => 相當於執行 ages.sort()
console.log(ages)  // print: [ 1, 100, 12, 34, 55, 57, 68, 76, 84, 99, <1 empty item> ]

console.log(article.__proto__)   // print: Article {}
/**
 * 可見 實例 article.__proto__ 不包含靜態方法
 * 或可以說，Article 類別的 prototype 不包含靜態方法 compare
 */


class Article10 {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static createTodays() {
    // 记住 this = Article
    return new this("Today's digest", new Date());
  }
}

let article10 = Article10.createTodays();

console.log(article10.title); // Today's digest
console.log(article10.date)  // 2020-05-14T15:59:39.031Z


// ===== 類別的 static 屬性 =====
/**
 * 何謂靜態屬性？
 *
 * 靜態方法：把一個屬性賦值給 class 函數本身，而不是賦給 class 的 prototype
 */
//靜態屬性
class Human {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  static hairColor = 'black'
}

// 上面的靜態屬性宣告相當於： Human.hairColor = 'black'
console.log(Human.hairColor)  // print: black


// ====== 繼承 ======

class Mammals {
  constructor(name, speed) {
    this.name = name
    this.speed = speed
  }

  static planet = "Earth"

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed
  }

  run(speed) {
    console.log(`${this.name} runs on speed ${this.speed}`)
  }

  sleep() {
    console.log(`${this.name} is sleeping.`)
  }

  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still.`);
  }
}

// 繼承 class Mammals
class Dog extends Mammals {
  barking() {
    console.log(`${this.name} is barking on ${Mammals.planet}.`)  //可以取得 母類別的 靜態屬性 planet
  }
}

console.log(Dog)

let dogs = [
  new Dog('Golden Retriever', 10),  //黃金獵犬
  new Dog('beagle', 5),  // 米格魯
  new Dog('Bulldog', 4),  // 鬥牛犬
]

dogs[0].barking()  //print: Golden Retriever is barking on Earth.
// 子類別 Dog 建立的實例可以透過 __proto__ 取用類別 Dog 的 prototype 方法

dogs[1].run()  // print: beagle runs on speed 5
// 子類別 Dog 建立的實例可以透過 __proto__ 取用類別 Dog 的 prototype 方法

console.log(dogs[0].__proto__ === Dog.prototype)  //true
// 子類別 Dog 建立的實例 乃繼承自 Dog.prototype
console.log(Dog.__proto__ === Mammals)  //true
// 子類別 Dog 乃繼承自 Mammals 類別
console.log(Dog.prototype.__proto__ === Mammals.prototype)  //true
// 子類別的 prototype 是繼承自 Mammals 的 prototype

console.log(Dog.prototype.__proto__.constructor === Mammals.prototype.constructor)  //true

console.log('dogs before sort:', dogs)
/**print:
dogs before sort: [
  Dog { name: 'Golden Retriever', speed: 10 },
  Dog { name: 'beagle', speed: 5 },
  Dog { name: 'Bulldog', speed: 4 }
]
 */
dogs.sort(Mammals.compare)  // 子類別建立的實例 可以使用 母類別 的 static method

console.log('dogs sorted on speed:', dogs)
/**print:
dogs sorted on speed: [
  Dog { name: 'Bulldog', speed: 4 },
  Dog { name: 'beagle', speed: 5 },
  Dog { name: 'Golden Retriever', speed: 10 }
]
 */


// 覆寫或延伸： super 關鍵字
class Rabbit extends Mammals {
  run() {  //延伸父類的方法
    super.run(); // 先執行一次 Mammals run function
    console.log('Rabbit jump!');  // 再執行這個
  }

  sleep() {  //覆寫父類的方法
    console.log(`${this.name} never sleeps. He always jump !`)  // 完全覆寫 Mammals sleep function
  }

  hide() {
    console.log(`${this.name} hides!`);
  }

  stop() {
    // super.stop(); // 調用父類的 stop
    this.hide(); // 然後 hide
    setTimeout(() => super.stop(), 1000); // 1 秒后調用父類的 stop
    // setTimeout(function () { super.stop() }, 1000);   // 會報 error，無法調用 super
    // SyntaxError: 'super' keyword unexpected here

    setTimeout(() => console.log('this(in arrow function): ', this))  // this 指實例本身
    setTimeout(function () { console.log('this(in function): ', this) })  // this 指的是全域
  }
}

var peterRabbit = new Rabbit('peter rabbit', 2)

peterRabbit.run()
/**
 * peter rabbit runs on speed 2
 * Rabbit jump!
 */

peterRabbit.sleep() // print: peter rabbit never sleeps. He always jump !

console.log('this(global): ', this)
peterRabbit.stop()
/**
peter rabbit stands still.
peter rabbit hides!
 */

//這樣也可以達到繼承的效果 => extends 後面可接 function
function f(phrase) {
  return class {
    sayHi() { console.log(phrase) }
  }
}

class User11 extends f("Hello") { }

new User11().sayHi(); // Hello


// 覆寫 父類的 constructor
class Mouse extends Mammals {

  //錯誤示範：
  // constructor(name, earLength) {
  //   this.name = name
  //   this.speed = 0
  //   this.earLength = earLength
  // }
  // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

  // 正確示範：
  constructor(name, speed, earLength) {
    super()  // 在使用 this 之前，必須先 super
    this.name = name.toUpperCase()
    this.speed = speed + 5
    this.earLength = earLength
  }
  eat() {
    console.log(`${this.name} eat something.`)
  }
}

const mickey = new Mouse('mickey', 15, 50)
console.log(mickey)  // print: Mouse { name: 'MICKEY', speed: 20, earLength: 50 }
