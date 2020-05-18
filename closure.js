'use strict'
/**
 * 學習重點：JS closure
 */

/**
 * 何謂 closure ?
 * 
 * 跟函式有關。
 * 
 * 閉包是函式記得並存取語彙範疇的能力，可說是指向特定範疇的參考，
 * 因此當函式是在其宣告的語彙範疇之外執行時也能正常運作。
 * 
 */

//例一：
function foo() {
  var a = 2;

  function bar() {
    console.log(a);
  }

  return bar;
}

var baz = foo();  // 取得 bar 這個函式

baz(); // 2
/**說明：
 * 當執行 baz()時，相當於執行 bar()
 * 雖然 bar 是在其宣告的範疇外執行，但因為 bar 在宣告時，即已定義了它可以
 * 存取的語彙範疇，所以仍然可以取得 變數 a 的值，而印出 console.log(a)
 * 
 * 所以 bar 存取語彙範疇的能力就是閉包。
 */


//例二：
function wait(message) {
  setTimeout(function timer() {
    console.log(message);
  }, 1000);
}

wait('Hello, 閉包!');

/**
 * 執行 wait() 時，緊接著會執行 timer()，而因為 timer 在宣告時即已定義了存取語彙範疇，
 * 即 setTimeout 內往外推至 global 的範疇，所以可以存取 message，而印出 console.log(message)
 */



//例三：從 1 ~20 依續印出

//解法一：不如預期
for (var i = 0; i < 20; i++) {
  setTimeout(() => {
    console.log(i)
  }, 100);
}
console.log('var i(outside for loop): ', i)  //var i(outside for loop):  20
/**
 * 印出結果為：
 * 20
 * 20
 * ..
 * ..
 * 20
 * 
 * 說明：因為，以 var 宣告的 i 之範疇為全域範疇
 */


//解法二：使用 IIFE
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function timer() {
      console.log(j);
    }, 500);
  })(i);
}
console.log('var i (IIFE)(outside for loop): ', i)  //var i (IIFE)(outside for loop):  6

//解法三：使用 let
for (let i = 0; i < 20; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000);
}
console.log('下面取到的 i 並不是 let i，而是 IIFE 中宣稱的 i')
console.log('let i (outside for loop): ', i)  //let i (outside for loop):  6

/**
 * 印出的結果為：
 * 1
 * 2
 * 3
 * .
 * .
 * 19
 * 20
 *
 * 說明：每次迭代時，都會重新宣告變數 i ，並將上一次迭代的結果作為這一次的初始值
 * 而宣告的 i 被限制在區塊範疇中，所以 for loop 外是無法取得 i 值
 */





//閉包之應用：
//例四：建立私有屬性，利用 closure 特性，在函式宣告之外取得私有屬性
function FastFood() {
  let inStock = {
    hamburger: 50,
    frenchFries: 100
  }

  function buyHamburger(number) {
    inStock.hamburger -= number
    console.log(`You buy ${number} hamburgers.`)
    printStock()
  }

  function buyFrenchFries(number) {
    inStock.frenchFries -= number
    console.log(`You buy ${number} frenchFries.`)
    printStock()
  }

  function printStock() {
    console.log(`\nhamburgers in stock: ${inStock.hamburger}.`)
    console.log(`french fries in stock: ${inStock.frenchFries}.`)
    console.log('-----------------------------------------')
  }
  return {
    buyHamburger,
    buyFrenchFries
  }
}

const fastFood = FastFood()

fastFood.buyFrenchFries(5)
fastFood.buyFrenchFries(3)
fastFood.buyHamburger(20)


//上例可以修改如下：使用 IIFE(immediately invoked function expression)，馬上建立實例

const fastFoodService = (function FastFood() {
  let inStock = {
    hamburger: 20,
    frenchFries: 30
  }

  function buyHamburger(number) {
    if (number > inStock.hamburgers) {
      console.log('sorry, we don\'t have enough hamburgers')
      printStock()
    } else {
      inStock.hamburger -= number
      console.log(`You buy ${number} hamburgers.`)
      printStock()
    }

  }

  function buyFrenchFries(number) {
    if (number > inStock.frenchFries) {
      console.log('sorry, we don\'t have enough french fries')
      printStock()
    } else {
      inStock.frenchFries -= number
      console.log(`You buy ${number} frenchFries.`)
    }
  }

  function printStock() {
    console.log(`\nhamburgers in stock: ${inStock.hamburger}.`)
    console.log(`french fries in stock: ${inStock.frenchFries}.`)
    console.log('-----------------------------------------')
  }
  return {
    buyHamburger,
    buyFrenchFries
  }
})()

fastFoodService.buyFrenchFries(50)
fastFoodService.buyFrenchFries(3)
fastFoodService.buyHamburger(20)


// 上述即為模組的建立方式之一
// 延伸：如何管理多個模組?

// 建立：模組依存性載入器（Module Dependency Loader）
var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]]; // (1)
    }
    modules[name] = impl.apply(null, deps); // (2)
  }

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get,
  };
})();


//利用模組依存性載入器
// bar 沒有需要任何其他的模組...
MyModules.define('bar', [], function barImpl() {
  function hello(who) {
    return 'Let me introduce: ' + who;
  }

  function world() {
    return 'Hello World';
  }

  return {
    hello: hello,
  };
});

// foo 需要 bar 模組...
MyModules.define('foo', ['bar'], function fooImpl(bar) {
  var hungry = 'hippo';

  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }

  return {
    awesome: awesome,
  };
});

var bar = MyModules.get('bar');
var foo = MyModules.get('foo');

console.log(bar.hello('hippo')); // Let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO