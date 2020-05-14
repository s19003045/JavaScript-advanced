'use strict'
/**
 * 學習重點：
 * 1.class
 * 2.static method ：類別的靜態方法
 * 3.extends 關鍵字：繼承類別
 * 4.super 關鍵字
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

// 靜態方法調用場景： 
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