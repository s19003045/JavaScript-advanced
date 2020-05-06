'user strict'
/**
 * 練習重點：JS 的 this
 *
 */

/**
 * This 是什麼？
 - this 是 JavaScript 的一個關鍵字。
 - this 是 function 執行時，自動生成的一個內部物件。
 - 隨著 function 執行場合的不同，this 所指向的值，也會有所不同。
 - 在大多數的情況下， this 代表的就是呼叫 function 的物件 (Owner Object of the function)。
 * 
 */

// 範例一：
var getGender = function () {
  return people1.gender;
};

var people1 = {
  gender: 'female',
  getGender: getGender
};

var people2 = {
  gender: 'male',
  getGender: getGender
};

console.log(people1.getGender());  // female
console.log(people2.getGender());  // female


// 範例二：
var getGender2 = function () {
  return this.gender;
};

var people1 = {
  gender: 'female',
  getGender: getGender2
};

var people2 = {
  gender: 'male',
  getGender: getGender2
};

console.log(people1.getGender());  // female
console.log(people2.getGender());  // male


// 範例三：函式 foo 增加屬性 count，試著讓函式 foo 的 count++
/**
 * 結果：因為 foo 函式中的 this 指的是全域物件
 * (在 browser 中指的是 window，在 node.js 環境中指的是 global)，
 * 而 global 或 window 的 count 未定義，所以未依照預期的增加 count
 */
var foo = function () {
  console.log('this.count', this.count) // 第一次印出 this.count undefined，第二次以後印出 this.count NaN
  this.count++;  // undefined++ 會變成 NaN，  NaN++ 一樣是 NaN
  console.log('this.count in foo:', this.count)  //印出 this.count in foo: NaN
};

foo.count = 0;

for (var i = 0; i < 5; i++) {
  foo();  //每次皆印出 this.count in foo: NaN
}

console.log('foo:', foo)   // 印出 foo: [Function: foo] { count: 0 }

function sayHello(msg) {
  console.log('msg:', msg)
  console.log('foo() in sayHello()')
  foo()
}

sayHello('goodness')
/**
// 印出結果：
msg: goodness
foo() in sayHello()
this.count in foo: NaN
 *
 */


/**
 * 先寫在前頭，以便再往下看時，知道運行在 browser 及 node.js 底下之不同。
 * 
 * 在瀏覽器下的全域物件 (或稱環境物件) 叫 window 。這個 window 會將所有的「全域變數」都變成這個物件的「屬性」。

假設我們在瀏覽器下宣告一個全域變數: var a = 123;
這個時候你可以試著執行： console.log(window.a); ， 應該會得到 「123」 的結果。
 */


// 範例四：
// 注意：這邊都是用 var 來宣告函式表達式，若是用 const 來宣告函式表達式，則結果會不同。
var bar = function () {
  console.log('this.a in bar():', this.a);
  // this 指的是 全域物件 global 或 window，但未定義 a 這個屬性
  // browser 會印出 undefined

};

var foo2 = function () {
  var a = 123;
  console.log('this in foo2():', this)  // 在 node.js 印出 global ，在 browser 印出 window
  this.bar();  // this 指的是全域物件 global 或 window，
  // 在 node.js 底下，this.bar() 並不是 global 的屬性，所以會跳 error。
  // 在 browser 底下，this.bar() 等同於 window.bar() ，因為 bar 變成是 window 的屬性，所以可以執行。
};
bar()  // 印出 undefined
// foo2(); // 在 node.js 環境下，會跳 error，如下：
/**
 * this.bar()
                 ^
TypeError: this.bar is not a function
 */

// 在 node.js 環境底下，上面會跳 error ，但是 browser 底下，則不會跳 error：
// foo2()函式中的 this.bar() 會印出 undefined


// 將上述改成用 const 宣告函式
const bar10 = function () {
  console.log(this.a);
  // this 指的是 全域物件 global，但未定義 a 這個屬性
  // 所以會印出 undefined
};
const foo10 = function () {
  const a = 123;
  //this.bar10();  // browser 跳 error: VM1030:8 Uncaught TypeError: this.bar is not a function
  // node.js 跳 error: TypeError: this.bar10 is not a function
};

foo10();


// 範例五：
var foo3 = 'foo';
var obj = {
  foo3: 'foo3 in Object'
};

var sayFoo = function () {
  console.log(this.foo3);
};

obj.sayFoo = sayFoo;

obj.sayFoo();   // 會印出 foo3 in Object
sayFoo();   // browser 會印出 foo，node.js 會印出 undefined


// 範例六：很容易踩的誤區
var obj = {

  func1: function () {
    // 這裡的 this 指的是 obj 物件本身
    console.log('this === obj  =>', this === obj); // true

    var func2 = function () {
      // 這裡的 this 跟上層不同！這邊的 this = 全域物件 (global / window)
      console.log('this === obj  =>', this === obj);  // false
    };

    func2();
  }
};

obj.func1();
/**
 * 重點整理：
 *
 * 1.當 function 是某個物件的 method 時，他的 this 會指向物件本身。
 *
 * 2.JavaScript 中，用來切分變數的最小作用範圍 (scope)，也就是我們說的有效範圍的單位，就是 function。
 *
 * 3.當沒有特定指明 this 的情況下，預設綁定 (Default Binding) this 為 「全域物件」，也就是 window。
 */


// 例外狀況： ES5 的嚴格模式下，會禁止 this 自動指定為全域物件
var obj11 = {

  func1: function () {
    "use strict";
    console.log('this === obj11  =>', this === obj11);

    var func2 = function () {
      // 宣告成嚴格模式後，這裡的 this 會變成 undefined。
      console.log('this  =>', this);

      console.log('this === obj11  =>', this === obj11);  // false
    };

    func2();
  }
};

obj11.func1();







