'use strict';
/**
 * 練習重點：JS 函數原型最實用的 3 個方法 — call、apply、bind
 *
 * 以下範例及說明：參考 Huli 的文章[淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂]
 * link: https://blog.techbridge.cc/2019/02/23/javascript-this/
 */

function hello(a, b) {
  console.log(this, a, b)
}


hello(1, 2) // undefined 1 2
hello.call(undefined, 1, 2) // undefined 1 2
hello.apply(undefined, [1, 2]) // undefined 1 2
/**
 * call 與 apply 的方式只差在 傳入的參數方式不同，
 * apply 用的是陣列
 */
let good = 'John'
let playGame = {
  name: 'Mario',
}

// .call 及 .apply ()中的第一個參數會覆蓋掉 hello() 函式中的 this
hello.call(good, 1, 2) // John 1 2
hello.apply(good, [1, 2]) // John 1 2

hello.call(playGame, 1, 2) // { name: 'Mario' } 1 2
hello.apply(playGame, [1, 2]) // { name: 'Mario' } 1 2

hello.call('yo', 1, 2) // yo 1 2
hello.apply('hihihi', [1, 2]) // hihihi 1 2


// 試著在類別本體中引用 this
var Tree = class Tree {
  constructor(name, color) {
    this.name = name
    this.color = color
  }
  hello() {
    console.log(this)
  }
}

const smallTree = new Tree()
// 比較二種方法
smallTree.hello()  // Tree { name: undefined, color: undefined }
smallTree.hello.call('John')  // John
smallTree.hello.apply('Mary')  // Mary


// 第三種方法：bind
// bind 會回傳一個新的 function
smallTree.hello.bind('bind me')  // 空格
let bindMe = smallTree.hello.bind('bind me')
console.log(bindMe)   // [Function: bound hello]
console.log(bindMe())
// bind me
// undefined

bindMe()  // bind me

bindMe.call('Peter')  // Peter


/**
 * 用法上要注意：
 *
 * 1.使用 .bind() 之後，就無法再使用 .call() 去變更 this
 *
 * 2.在非嚴謹模式下，無論是用 call、apply 還是 bind，
 * 你傳進去的如果是 primitive 都會被轉成 object
 * 例：
 * smallTree.hello.call('John')  // [String: 'John']
 */

/**
 * 重點結錄：
 * 1.在物件以外的 this 基本上沒有任何意義，硬要輸出的話會給個預設值
 * 2.可以用 call、apply 與 bind 改變 this 的值
 */


//==== 物件中的 this====
const obj = {
  value: 1,
  hello: function () {
    console.log(this.value)
  }
}

obj.hello() // 1

/**
 * 重點：this 的值跟作用域跟程式碼的位置在哪裡完全無關，只跟「你如何呼叫」有關
 * 變數、物件(例如JSON 物件、函式)的作用域在宣告時就已經定義好了，不會因為在哪裡呼叫變數、物件，
 * 而作用域就因此改變
 *
 * 作用域屬於靜態，this 屬於動態。
 *
 * But,
 * this 的值則可以動態改變，
 * 會因為「怎麼」呼叫 this, this 的值就怎麼改變
 *
 *
 */

//範例：物件中的 this 
const obj50 = {
  value: 1,
  hello: function () {
    console.log(this ? `this.value:${this.value}` : `this:${this}`)
  }
}

obj50.hello() // 1
const hey = obj50.hello
hey() // undefined

// 如何判斷 this 到底是誰?
/**
 * 方法：把所有的 function call，都轉成利用call的形式來看，就很容易懂了
 */
const obj101 = {
  value: 1,
  hello: function () {
    console.log(this ? `this.value:${this.value}` : `this:${this}`)
  }
}

obj101.hello() //    =>  this.value:1
obj101.hello.call(obj101) // 轉成 call    =>  this.value:1
const hey101 = obj101.hello
hey101() //    =>  this:undefined
hey101.call() // 轉成 call   =>  this:undefined


// 複習一下
/**
 *
一但脫離了物件，this 的值就沒什麼意義，
在沒意義的情況底下就會有個預設值，
嚴格模式就是undefined，
非嚴格模式底下就是全域物件。

1.嚴格模式底下就都是undefined
2.非嚴格模式，瀏覽器底下是window
3.非嚴格模式，node.js 底下是global
 */


// 練習判讀 this
function see() {
  console.log(this)
}

var a = { value: 1, see }
var b = { value: 2, see }
see()   // 轉換： see.call()  =>   undefined
a.see()  // 轉換： a.see.call(a)  =>  { value: 1, see: [Function: see]}
b.see.apply(a)  // 不用轉換： b.see.apply(a)   => { value: 1, see: [Function: see] }

// 重點整理
/**
1.脫離物件的 this 基本上沒有任何意義
2.沒有意義的 this 會根據嚴格模式以及環境給一個預設值
3.嚴格模式底下預設就是 undefined，非嚴格模式在瀏覽器底下預設值是 window
4.可以用 call、apply 與 bind 改變 this 的值
5.要看 this，就看這個函式「怎麽」被呼叫
6.可以把 a.b.c.hello() 看成 a.b.c.hello.call(a.b.c)，以此類推，就能輕鬆找出 this 的值
 */


// 使用上述公式(轉換成 call 的模式)的例外：箭頭函式
const objArrow = {
  x: 1,
  hello: function () {
    // 這邊印出來的 this 是什麼，test 的 this 就是什麼
    // 就是我說的：
    // 在宣告它的地方的 this 是什麼，test 的 this 就是什麼
    console.log(this)
    const test = () => {
      console.log(this.x)
    }
    test()
  }
}

objArrow.hello() // 1
const hello = objArrow.hello
hello() // '嚴謹模式下'  => undefined  ;  '非嚴謹模式下'  => window

