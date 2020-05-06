'user strict'
/**
 * 練習重點：
 * JavaScript 之 Iterator
 * 
 * 
 * 
 */

// 範例：使用 iterator ，從 1 印至 5 ?
// 建立一個物件，定義 [Symbol.iterator] 屬性
const range = {
  start: '1',
  end: '5',
  [Symbol.iterator]() {
    this.current = this.start
    return this
  },
  next: function () {
    if (this.current >= 1 && this.current <= 5) {
      return { done: false, value: this.current++ };
    }

    return { done: true };
  }
};

for (let num of range) {
  console.log(num)
}


//範例：不使用 for loop ，就可以迭代
/**
 * 自行建立迭代器，可以很彈性在迭代器中去做想做的事
 * 
 * 然後再利用迴圈 loop，除了設定停止點之外，
 * 還可以在迴圈中做其他想做的事
 */
const numberGroup = {
  start: 1,
  end: Infinity,
  [Symbol.iterator]() {
    this.current = this.start
    return this
  },
  next() {
    if (this.current >= 1 && this.current < this.end) {
      console.log('anything I want to do in iterator')  // 加入自己想做的事
      return { value: this.current++, done: false }
    }
    console.log('anything I want to do in iterator')  // 加入自己想做的事
    return { value: undefined, done: true }
  }
}

const numberGroupInterator = numberGroup[Symbol.iterator]()

while (true) {
  const result = numberGroupInterator.next()
  console.log('anything I want to do in while loop')  // 加入自己想做的事
  if (result.value > 50) {
    break
  }
  console.log('result:', result, '\n')
}


//範例：使用 for...of loop 來迭代陣列中的元素
const cities = ['Taiwan', 'Japan', 'USA', 'Canada', 'Singapore']

cities.other = 'India'
console.log('cities:', cities)
// 印出值
for (let city of cities) {
  console.log('city: ', city)
}
// 印出 key
for (let index in cities) {
  console.log('index:', index)
}
/**
 * 說明：
 * 因為陣列本身含有 [Symbol.iterator] 屬性，
 * 所以可讓 for...of loop 迭代之
 */




// 範例：使用自定義的 iterator 將陣列中的元素印出
/**
 * 建立自定義的迭代器，
 * 在需要時，使用 .next() 將結果印出
 */
const fruits = ['apple', 'banana', 'water lemon']
function makeIterator(array) {
  let initialIndex = 0
  return {
    next: function () {
      return initialIndex < array.length ?
        { value: array[initialIndex++], done: false } : { value: undefined, done: true }
    }
  }
}
const printFruits = makeIterator(fruits)

console.log('printFruits:', printFruits)

console.log(printFruits.next()) // 馬上印出第一個
setTimeout(() => {
  console.log(printFruits.next())  // 過了1秒，印第二個
  setTimeout(() => {
    console.log(printFruits.next())  // 再過1秒，印第三個
    setTimeout(() => {
      console.log(printFruits.next())  // 再過1秒，印第四個
      setTimeout(() => {
        console.log(printFruits.next())  // 再過1秒，印第五個

      }, 1000)
    }, 1000)
  }, 1000)
}, 1000)


// ===========哪些東西是可以迭代的?

// 陣列可以迭代
const car = ['Benz', 'BMW', 'TOYATA', function (msg) { return this }]
for (let v of car) {
  console.log(v)
}

// String 可以迭代
const someMsg = 'Today is a good day.'
for (let v of someMsg) {
  console.log(v)
}

// "類陣列物件"不能使用 for...of loop 來迭代，
// 因為沒有 [Symbol.iterator] 屬性
const arrayLike = {
  0: 'Hello',
  1: 'World',
  length: 2,
};
// 下面這段跳 error =>
// TypeError: arrayLike is not iterable
/**
for (let v of arrayLike) {
  console.log(v)
}
 */

/**
 * 補充：
 * 類陣列物件（array-like object）是指它 (1) 有屬性 length (2) 能用 index 指定元素值，白話說就是個很像陣列的物件 ╮(╯_╰)╭
 *
 */

const transformArrayLike = Array.from(arrayLike)
// Array.from() 會依據傳進去的類陣列物件的 length ，將 length 內的值轉成 array，
// 轉成 array 之後，教具備 array 的屬性及方法。
// 所以超出 length 的值就不會被放進 array 中
// 如果類陣列物件沒有定義 length ，則轉成的陣列是空陣列

console.log('transformArrayLike:', transformArrayLike)

// 測試可迭代物件(具備[Symbol.iterator]屬性)
rangeForArray = {
  start: 1,
  end: 5,
  [Symbol.iterator]() {
    this.current = this.start;
    return this;
  },
  next() {
    if (this.current >= 1 && this.current <= 50) {
      return { done: false, value: this.current++ };
    }

    return { done: true };
  },
};

console.log('rangeForArray:', rangeForArray)
const rangeArray = Array.from(rangeForArray);
rangeArray.push(6);
console.log('rangeArray(rangeForArray 轉成 array):', rangeArray)


