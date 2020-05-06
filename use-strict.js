// 'use strict'  // 全局皆適用嚴謹模式，包含變數、函式......

// 錯誤範例：未宣告即賦值
// papa = 'john'
// console.log(papa)
/**
 * 跳 error:
 * ReferenceError: papa is not defined
 */


// 錯誤範例：函式中使用 'use strict'，未宣告變數即賦值
// function sayHello() {
//   'use strict';  //只有函式內適用嚴謹模式，函式外部不受影響
//   // 使用注意，必須放在函式開頭
//   auntie = '漂亮阿姨';
// }
// sayHello()
/**
 * 未使用函式前，不會跳 error，使用函式時，則會跳 error，如下：
 * 跳 error:
 * ReferenceError: auntie is not defined
 */



// 錯誤使用，未放在函式開頭
function msg() {
  mama = 'Mary'
  'use strict'  // 錯誤使用，未放在函式開頭
}
msg()
/**
 * 執行時，不會跳 error
 */


