'user strict'
/**
 * 練習重點：JS ES6 的 class
 * 
 */

// 類別宣告 (class declaration)
// 類別不具 hoisting, 函式有 hoisting
// 所以在使用類別建立 instance 之前，必須先宣告之

// JavaScript中沒有真正的「類別」實體。
// class 宣告出來的本體是「函式」。
// 換句話說，class 只是宣告函式的一種特別的語法。

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
  // 修正：
  // 建立 prototype 的方法，如下四個：
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

console.log('Car.prototype.getName  =>  ', Car.prototype.getName)
// 印出   =>   Car.prototype.getName  =>   [Function: getName]

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
console.log('toyota.__proto__   =>  ', toyota.__proto__)
// 印出：  toyota.__proto__   =>   Car { getColor1: [Function] }
console.log('Car.prototype   =>  ', Car.prototype)
// 印出：  Car.prototype   =>   Car { getColor1: [Function] }

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


//===== 使用 class 或函式建構式來建立 linked list====
// 方法一：使用 class 來建立 (JavaScript 並無真正的 class, class 只是語法糖)
// 建立實例時，並不是用 class 來建立實例，而是用 constructor 來建立
class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

// 將陣列中的值轉成 linked list
let head, current
const store = [1, 2, 3, 4, 5, 6]
for (i = 0; i < store.length; i++) {
  if (i === 0) {
    head = new ListNode(store[i])
    current = head
  } else {
    current.next = new ListNode(store[i])
    current = current.next
  }
}
console.log('head:', head)
/**
 * 印出結果：
head: ListNode {
  val: 1,
  next: ListNode { val: 2, next: ListNode { val: 3, next: [ListNode] } }
}
 */

//方法二：使用函式建構式來建立 liked list
function Node(val) {
  this.val = val
  this.next = null
}

// 將陣列中的值轉成 linked list
let headNode, currentNode
const storeNodes = [1, 2, 3, 4, 5, 6]
for (i = 0; i < storeNodes.length; i++) {
  if (i === 0) {
    headNode = new Node(storeNodes[i])
    currentNode = headNode
  } else {
    currentNode.next = new Node(storeNodes[i])
    currentNode = currentNode.next
  }
}
console.log('headNode:', headNode)
/**
印出結果：
headNode: Node {
  val: 1,
  next: Node { val: 2, next: Node { val: 3, next: [Node] } }
}
 */


// 接續前面，建立 prototype 的方法：get, addAtHead, addAtTail, addAtIndex, deleteAtIndex
// 透過 constructor 建立的實例都可以透過原型鏈(prototype chain) 取用上述這些方法
/**
 * Initialize your data structure here.
 */
var MyLinkedList = function () {
  this.head = null;
  this.size = 0;
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0 || index >= this.size) {
    return -1;
  }

  let cur = this.head;
  for (let i = 0; i < index; i++) {
    cur = cur.next;
  }
  return cur.val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  let cur = this.head;
  this.head = new Node(val);
  this.head.next = cur;
  this.size++;
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  let cur = this.head;
  while (cur.next) {
    cur = cur.next;
  }

  let newNode = new Node(val);

  if (!cur) {
    this.head = newNode
  } else {
    cur.next = newNode
  }
  this.size++;
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index < 0) {
    return;
  }

  if (index === 0) {
    this.addAtHead(val);
    return;
  }

  let cur = this.head;
  for (let i = 0; i < index - 1; i++) {
    cur = cur.next;
  }

  if (!cur) {
    return;
  }

  let next = cur.next;
  cur.next = new Node(val);
  cur.next.next = next;
  this.size++;
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index >= this.size) {
    return;
  }

  this.size--;

  if (index === 0) {
    this.head = this.head.next;
    return;
  }

  let cur = this.head;
  for (let i = 0; i < index - 1; i++) {
    cur = cur.next;
  }

  cur.next = cur.next.next;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = Object.create(MyLinkedList).createNew()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

var linkedList = new MyLinkedList()

console.log('linkedList:', linkedList)
linkedList.addAtHead(3)
console.log('linkedList:', linkedList)

// 使用 instance.__proto__ 取得 Constructor.prototype
console.log('likedList:', linkedList.__proto__)

//EC6(ECMAScript 2015) 已將Object.getPrototypeOf()標準化 :
//為了更好的支援，建議使用Object.getPrototypeOf() 。
//應儘量避免使用 instance.__prototype__。
console.log('Object.getPrototypeOf():', Object.getPrototypeOf(linkedList))

//使用 Constructor.prototype 
console.log('MyLinkedList.prototype:', MyLinkedList.prototype)

console.log('MyLinkedList.prototype === Object.getPrototypeOf(linkedList)  =>  ', MyLinkedList.prototype === Object.getPrototypeOf(linkedList))
console.log('MyLinkedList.prototype === linkedList.__proto__   =>  ', MyLinkedList.prototype === linkedList.__proto__)
console.log('Object.getPrototypeOf(linkedList) === linkedList.__proto__:', Object.getPrototypeOf(linkedList) === linkedList.__proto__)


// MyLinkedList.__proto__ 指向誰？  Function.prototype
console.log('MyLinkedList.__proto__ === Function.prototype  =>  ', MyLinkedList.__proto__ === Function.prototype)
// Function.prototype.__prototype__ 指向誰？  Object.prototype
console.log('Function.__proto__===Object.prototype  =>  ', Function.prototype.__proto__ === Object.prototype)
// Object.prototype.__proto__  指向誰？  null
console.log('Object.prototype.__proto__  =>  ', Object.prototype.__proto__)


// 如何知道 某方法 是實例自己本身的，還是 __porto__ 擁有的？ 使用 hasOwnProperty()
// hasOwnProperty() 裡面記得加 '...' 引號
console.log('linkedList.hasOwnProperty("addAtHead")   =>  ', linkedList.hasOwnProperty('addAtHead'))  //false
console.log('linkedList.__proto__.hasOwnProperty("addAtHead")   =>  ', linkedList.__proto__.hasOwnProperty('addAtHead'))  //true

// 為實例本身建立一個方法
linkedList.say = function (msg) { console.log(msg) }
console.log('linkedList.hasOwnProperty("say")   =>  ', linkedList.hasOwnProperty('say'))  //true



// ====== 如何知道 A 是不是 B 的 instance
// 使用 instanceOf
console.log('linkedList instanceof MyLinkedList   =>  ', linkedList instanceof MyLinkedList)  //true
console.log('linkedList instanceof Function   =>  ', linkedList instanceof Function)  //false
console.log('linkedList instanceof Array   =>  ', linkedList instanceof Array)  //false
console.log('linkedList instanceof Object   =>  ', linkedList instanceof Object)  //true

console.log('Function instanceof Object   =>  ', Function instanceof Object)  //true



// ====== 物件的 prototype 帶有 constructor 屬性
console.log('linkedList.constructor === MyLinkedList   =>  ', linkedList.constructor === MyLinkedList) //true
console.log('MyLinkedList.prototype.constructor === MyLinkedList   =>  ', MyLinkedList.prototype.constructor === MyLinkedList) //true
console.log('MyLinkedList.hasOwnProperty("constructor")   =>   ', MyLinkedList.prototype.hasOwnProperty('constructor'))  //true



// 關於 new 這個字
var secondLinkedList = new MyLinkedList()
/**
 * 上面做了幾件事：
 * 1.創建一個物件 取名為 O
 * 2.把 O 的 __proto__ 指向  MyLinkedList 的 prototype
 * 3.呼叫 MyLinkedList 的 constructor 來建構 O
 * 4.回傳 O 給 secondLinkedList
 *
 */