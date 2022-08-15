---
title: ES6笔记
date: 2022/05/13 12:24 #手动设置最后更新时间
categories: [ES6, promise] # 标签
stick: false # 是否置顶
description: ES6
keyword: ES6模块化 promise
---

# ES6

# 1. 简介

- ES 的全称是 ECMAScript , 它是由 ECMA 国际标准化组织,制定的一项脚本语言的标准化规范。
- ES6 实际上是一个泛指，泛指 ES2015 及后续的版本，涵盖了 ES2015、ES2016、ES2017 等等
- 查看兼容性：[http://kangax.github.io/compat-table/es6/ ](http://kangax.github.io/compat-table/es6/)
- ECMAScript 历史版本查看网址：[历史版本查看](http://www.ecma-international.org/publications/standards/Ecma-262-arch.htm)
-

# 2. let 与 const

## 2.1 let

ES6 中新增的用于声明变量的关键字。

- let 声明的变量只在所处于的块级有效

```javascript
if (true) {
  let b = 20;
  console.log(b); //20
  if (true) {
    let c = 30;
  }
  console.log(c); // c is not defined
}
console.log(b); // b is not defined
```

- 使用 let 关键字声明的变量才具有块级作用域，使用 var 声明的变量不具备块级作用域特性。

```javascript
if (true) {
  let num = 100;
  var abc = 200;
}
console.log(abc); //200
console.log(num); //num is not defined
```

- 防止循环变量变成全局变量

```javascript
for (var i = 0; i < 2; i++) {}
console.log(i); //2
for (let j = 0; j < 2; j++) {}
console.log(j); // j is not defined
```

- 使用 let 关键字声明的变量没有变量提升

```javascript
console.log(b); // undefined
var b = 200;
console.log(a); //Cannot access 'a' before initialization
let a = 100;
```

- 使用 let 关键字声明的变量具有暂时性死区特性

```javascript
var num = 10;
if (true) {
  //num和这个块绑定了，同时块中num又在申明前使用了，就报错了
  console.log(num); //Cannot access 'num' before initialization
  let num = 20;
}
```

- 面试题
  此题的关键点在于每次循环都会产生一个块级作用域，每个块级作用域中的变量都是不同的，函数执行时输出的是自己上一级（循环产生的块级作用域）作用域下的 i 值.

```javascript
let arr = [];
for (let i = 0; i < 2; i++) {
  arr[i] = function () {
    console.log(i);
  };
}
arr[0](); // 2
arr[1](); // 2
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/c6be0787dc054f088c4ea03be11df9ba.png#pic_center)

```javascript
var arr = [];
for (var i = 0; i < 2; i++) {
  arr[i] = function () {
    console.log(i);
  };
}
arr[0](); // 0
arr[1](); // 1
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/e01bebc39d854b02b0c7d49d9b317f2b.png#pic_center)

## 2.2 const

作用：声明常量，常量就是值（内存地址）不能变化的量。

- 具有块级作用域

```javascript
if (true) {
  const a = 10;
  if (true) {
    const a = 20;
    console.log(a); // 20
  }
  console.log(a); //10
}
console.log(a); //a is not defined
```

- 声明常量时必须赋值

```javascript
//const PI = 3.14;
const PI;//Missing initializer in const declaration
```

- 常量赋值后，值不能修改。

```javascript
const PI = 3.14; //基本数据类型值不可更改
// PI = 100; //Assignment to constant variable.
const ary = [100, 200]; //复杂数据类型内存地址不可更改，内容可变
ary[0] = 123;
ary = [1, 2]; //Assignment to constant variable.
console.log(ary);
```

## 2.3 let、const、var 的区别

1. 使用 var 声明的变量，其作用域为该语句所在的函数内，且存在变量提升现象。
2. 使用 let 声明的变量，其作用域为该语句所在的代码块内，不存在变量提升。
3. 使用 const 声明的是常量，在后面出现的代码中不能再修改该常量的值。(基本数据类型值不可更改,复杂数据类型内存地址不可更改，内容可变)
4. 应用场景：声明对象类型使用 const，非对象类型声明选择 let

| var          | let            | const          |
| ------------ | -------------- | -------------- |
| 函数级作用域 | 块级作用域     | 块级作用域     |
| 变量提升     | 不存在变量提升 | 不存在变量提升 |
| 值可更改     | 值可更改       | 值不可更改     |

# 3. 解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构

## 3.1 数组的解构赋值

- 可以从数组中提取值，按照对应位置，对变量赋值。

```javascript
let ary = [1, 2, 3];
let [a, b, c] = ary;
console.log(a); // 1
console.log(b); // 2
console.log(c); //3
```

- 如果解构不成功，变量的值就等于 undefined

```javascript
let [a] = [];
console.log(a); //undefined
let [b, c] = [1];
console.log(b); // 1
console.log(c); // undefined
```

## 3.2 对象的解构赋值

- 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，**变量必须与属性同名**，才能取到正确的值。

```javascript
let person = {
  name: "zhangsan",
  age: 20,
  do: function () {
    console.log("唱歌");
  },
};
let { name, age, cando } = person;
console.log(name); // 'zhangsan'
console.log(age); // 20
cando(); //输出 唱歌
```

- 对象的解构赋值，可以很方便地将对象的成员，赋值到某个变量。

```javascript
let person = { name: "zhangsan", age: 20 };
let { name: myName, age: myAge } = person; // myName myAge 属于别名 ，
//从person对象中匹配name,age属性，如果有，则赋值到myName，myAge
console.log(myName); // 'zhangsan'
console.log(myAge); // 20
```

# 4. 箭头函数

ES6 中新增的定义函数的方式，简化函数定义语法

```javascript
() => {}; //(放参数) ,{放函数体}
const fn = () => {};
const fn1 = () => {
  console.log(1);
};
// 相当于
//const fn1 = function(){
//	console.log(1);
//}
```

- 函数体中只有一句代码，且代码的执行结果就是返回值，可以省略大括号，且必须省略 return

```javascript
function sum1(n1, n2) {
  return n1 + n2;
}
const sum2 = (n1, n2) => {
  return n1 + n2;
};
const sum3 = (n1, n2) => n1 + n2;
console.lof(sum3(1, 2));
```

- 如果形参只有一个，可以省略小括号

```javascript
function fn1(v) {
  return v;
} //等价于下面
const fn2 = (v) => v;
```

- 不能使用 arguments 变量

```javascript
function fn1() {
  console.log(arguments);
}
fn1(1, 2, 3); // 有输出
let fn = () => {
  console.log(arguments);
};
fn(1, 2, 3); // 报错 arguments is not defined
```

- 箭头函数没有自己的 this 对象，内部的 this 就是定义时上层作用域中的 this。箭头函数内部的 this 指向是固定的，相比之下，普通函数的 this 指向是可变的。

```javascript
function fn() {
  console.log(this);
  return () => {
    console.log(this);
  };
}
let obj = { name: "zhangsan" };
fn(); //window
fn()(); // window window
ffn = fn.bind(obj);
ffn(); // obj
ffn()(); // obj obj
```

- 例题 1：this 指向

```javascript
let obj = {
  // 对象没有作用域
  age: 20,
  say: () => {
    console.log(this); //window
    console.log(this.age); //undefined
  },
};
obj.say();
```

- 例题二 ：this 指向

```javascript
window.name = "凉宫";
function getName() {
  // 普通函数定义
  console.log(this.name);
}
let getName2 = () => {
  console.log(this.name);
};
getName(); //凉宫
getName2(); // 凉宫
const school = {
  name: "it",
};
getName.call(school); // it
getName2.call(school); // 凉宫
```

- 例题三： this 指向，实现点击 div 几秒后变色

```javascript
let ad = document.querySelector(".ad"); // ad为某个div类名
ad.addEventListener("click", function () {
  let _this = this; //保存外层的this;
  setTimeout(function () {
    //setTimeout 内的this指向window，故要做处理
    _this.style.background = "blue";
  }, 4000);
});
ad.addEventListener("click", function () {
  setTimeout(() => {
    // 箭头函数的this 指向在函数申明时所在作用域下的this
    this.style.background = "pink";
  }, 2000);
});
```

使用场景：
箭头函数适合与 this 无关的回调. 定时器, 数组的方法回调
箭头函数不适合与 this 有关的回调. 事件回调, 对象的方法(this 会指到对象外层的 this，而不是这个对象)

# 5. rest 剩余参数

## 5.1 用于数组

- 剩余参数:剩余参数语法允许我们将一个不定数量的参数表示为一个数组。
- 用于获取函数的实参，用来代替 arguments

用法示例 1：

```javascript
function date() {
  //arguments示例
  console.log(arguments);
}
date("凉宫", "长门", "朝比奈");
//rest 参数示例
function date2(...args) {
  console.log(args);
}
date2("凉宫", "长门", "朝比奈");
//rest 参数必须要放到参数最后
function fn(a, b, ...args) {
  console.log(a); //1
  console.log(b); // 2
  console.log(args); //[3,4,5,6]
}
fn(1, 2, 3, 4, 5, 6);
let ary1 = ["张三", "李四", "王五"];
let [s1, ...s2] = ary1;
console.log(s1); // 张三
console.log(s2); // ['李四', '王五']
```

用法示例 2：配合 forEach 遍历

```javascript
const sum = (...args) => {
  let total = 0;
  args.forEach((item) => (total += item));
  return total;
};
console.log(sum(10, 20)); //30
console.log(sum(10, 20, 30)); // 60
```

- 剩余参数和解构配合使用

```javascript
let students = ["wangwu", "zhangsan", "lisi"];
let [s1, ...s2] = students;
console.log(s1); // 'wangwu'
console.log(s2); // ['zhangsan', 'lisi']
```

## 5.2 用于对象

Rest 参数与 spread 扩展运算符在 ES6 中已经引入，不过 ES6 中只针对于数组，在 ES9 中为对象提供了像数组一样的 rest 参数和扩展运算符

```javascript
//rest 参数
function connect({ host, port, ...user }) {
  console.log(host); // 127.0.0.1
  console.log(port); //  3306
  console.log(user); // {username: 'root', password: 'root'}
}
connect({
  host: "127.0.0.1",
  port: 3306,
  username: "root", // 把后面多的参数，直接封装成一个对象
  password: "root",
});
```

# 6. 扩展运算符

扩展运算符（spread）也是三个点（`...`）。

## 6.1 数组的扩展运算符

作用：将一个数组转为**用逗号分隔的参数序列**，对数组进行解包。

- 数组的合并

```javascript
console.log(...[1, 2, 3]); // 1 2 3
let a = [4, 5, 6];
let b = [1, 2, 3, ...a]; // b = [1,2,3,4,5,6]
let c = [1, ...[2, 3, 4], 5]; // b = [1,2,3,4,5]
console.log(b, c);
```

- 数组的克隆

```javascript
const a = ["h", "e", "y"];
const b = [...a]; // b = ['h','e','y']; 若果数组里面有复杂数据类型，是浅拷贝
```

- 将伪数组转为真正的数组

```javascript
//伪数组：具有length属性但length属性不是动态的，可按索引方式存储数据，
//但它不具有数组的方法，本质是一个 Object
const divs = document.querySelectorAll("div");
const divArr = [...divs]; // 具有了数组的属性和方法
```

## 6.2 对象的扩展运算符

```javascript
//对象合并
const msg = {
  name: "凉宫",
  age: 18,
};
const features = {
  hight: "158cm",
  cute: true,
};
const person = {
  ...msg,
  ...features,
};
console.log(person); // {name: '凉宫', age: 18, hight: '158cm', cute: true}
```

# 7. Array 的扩展方法

## 7.1 扩展运算符

- 扩展运算符可以将数组拆分成以逗号分隔的参数序列

```javascript
let ary = ["a", "b", "c"];
//...ary // "a", "b", "c"
console.log(...ary); // a b c
console.log("a", "b", "c"); // a b c
//========================
const people = ["凉宫", "长门", "朝比奈"];
function say() {
  console.log(arguments);
}
say(...people); //等价于 say('凉宫','长门','朝比奈');
// 注意和rest剩余参数区分
```

- 扩展运算符可以应用于合并数组。

```javascript
let ary1 = [1, 2, 3];
let ary2 = [4, 5, 6];
// ...ary1 // 1, 2, 3
// ...ary1 // 4, 5, 6
let ary3 = [...ary1, ...ary2];
console.log(ary3); //[1, 2, 3, 4, 5, 6]
```

- 合并数组的第二种方法

```javascript
let ary1 = [1, 2, 3];
let ary2 = [4, 5, 6];
ary1.push(...ary2);
console.log(ary1); //[1, 2, 3, 4, 5, 6]
```

- 利用扩展运算符将伪数组转换为真正的数组

```javascript
<div>1</div>
<div>4</div>
<div>3</div>
<script>
	let oDivs = document.getElementsByTagName('div');
	console.log(oDivs); //oDivs是个对象
	let ary = [...oDivs]; // [div, div, div]
	ary.push('a');//将伪数组转为数组的好处是可以用数组的方法
	console.log(ary); //[div, div, div, 'a']
</script>
```

-

## 7.2 Array.from()

- 将类数组或可遍历对象转换为真正的数组

```javascript
let arrayLike = {
  0: "张三",
  1: "李四",
  2: "王五",
  length: 3, //要加这个属性
};
let ary = Array.from(arrayLike);
console.log(ary); //Array(3)
```

- 方法还可以接受第二个参数，作用类似于数组的 map 方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```javascript
let arrayLike = {
  0: 1,
  1: 2,
  length: 2,
};
let ary = Array.from(arrayLike, (item) => item * 2);
console.log(ary); //Array(2)
```

## 7.3 find()

- 用于找出第一个符合条件的数组成员，如果没有找到返回 undefined

```javascript
let ary = [
  {
    id: 1,
    name: "张三",
  },
  {
    id: 2,
    name: "李四",
  },
];
let target = ary.find((item) => item.id == 2); //参数为函数, 返回true则找到;item为每次遍历的元素
console.log(target);
```

## 7.4 findIndex()

- 用于找出第一个符合条件的数组成员的位置，如果没有找到返回-1

```javascript
let ary = [10, 20, 50];
let index = ary.findIndex((item) => item > 15);
console.log(index); //1
```

## 7.5 includes()

- 表示某个数组是否包含给定的值，返回布尔值。

```javascript
let ary = ["a", "b", "c"];
let result = ary.includes("a");
console.log(result); // true
result = ary.includes("e");
console.log(result); // false
// 以前是通过indexof函数，找不到则返回-1，否则返回下标
```

# 8. String 的扩展方法

## 8.1 模板字符串

- ES6 新增的创建字符串的方式，使用反引号定义。

```javascript
let name = `zhangsan`;
```

- 模板字符串中可以解析变量。`${}`

```javascript
let name = `张三`;
let sayHello = `我的名字叫${name}`;
console.log(sayHello); //我的名字叫张三
```

- 模板字符串中可以换行

```javascript
let html = `
	<div>
		<span>${result.name}</span>
		<span>${result.age}</span>
	</div>
`;
console.log(html);
```

- 在模板字符串中可以调用函数，显示函数的返回值

```javascript
const fn = () => {
  return "我是fn函数";
};
let html = `我是模板字符串${fn()}`;
console.log(html); // 我是模板字符串我是fn函数
```

## 8.2 startsWith()

- startsWith()：表示参数字符串是否在原字符串的头部，返回布尔值
- endsWith()：表示参数字符串是否在原字符串的尾部，返回布尔值

```javascript
let str = "Hello ECMAScript 2015";
let r1 = str.startsWith("Hello");
console.log(r1); //true
let r2 = str.endsWith("2015");
console.log(r2); //true
```

## 8.3 repeat()

- repeat 方法表示将原字符串重复 n 次，返回一个新字符串。

```javascript
"x".repeat(3); // "xxx"
"hello".repeat(2); // "hellohello"
```

# 9. 数值扩展

`Number.EPSILON` 是 JavaScript 表示的最小精度
EPSILON 属性的值接近于 2.2204460492503130808472633361816E-16

```javascript
function equal(a, b) {
  if (Math.abs(a - b) < Number.EPSILON) {
    return true;
  } else {
    return false;
  }
}
console.log(0.1 + 0.2 === 0.3); // false;注意计算机小数运算丢精度问题
console.log(equal(0.1 + 0.2, 0.3)); // true;
```

---

可以表示二进制和八进制，十六进制

```javascript
let b = 0b1010;
let o = 0o777;
let d = 100;
let x = 0xff;
console.log(x); //255
```

---

`Number.isFinite` ：检测一个数值是否为有限数

```javascript
console.log(Number.isFinite(100)); // true
console.log(Number.isFinite(100 / 0)); // false
console.log(Number.isFinite(Infinity)); // false
```

---

`Number.isNaN`：检测一个数值是否为 NaN；返回 true 表示不是数组，false 表示是一个数字

```javascript
console.log(Number.isNaN(123));
false;
```

---

字符串转整数：`Number.parseInt`，
字符串转浮点数：`Number.parseFloat`

```javascript
console.log(Number.parseInt("5211314love")); // 5211314
console.log(Number.parseFloat("3.1415926圆周率")); // 3.1415926
```

---

`Number.isInteger` ：判断一个数是否为整数

```javascript
console.log(Number.isInteger(5)); // true
console.log(Number.isInteger(2.5)); // false
```

---

`Math.trunc` ：将数字的小数部分抹掉

```javascript
console.log(Math.trunc(3.5)); // 3
```

---

`Math.sign` ：判断一个数到底为正数 负数 还是零，返回值分别为·1, 0，-1

```javascript
console.log(Math.sign(100)); // 1
console.log(Math.sign(0)); // 0
console.log(Math.sign(-20000)); // -1
```

# 10. 对象的扩展

`Object.is`：用来比较两个值是否严格相等

```javascript
Object.is("foo", "foo"); // true
Object.is({}, {}) + // false
  // 有 两个比较特殊（了解即可）
  0 ===
  -0; //true
NaN === NaN; // false
Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
```

---

`Object.assign` ：对象的合并，将源对象的所有可枚举属性，复制到目标对象上；若有同名属性，后面的会覆盖前面的

```javascript
const target = {
  host: "localhost",
  port: 3306,
};
const source1 = {
  host: "127.0.0.1",
  port: 33060,
  test: "test",
};
console.log(Object.assign(target, source1));
```

---

JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法
`Object.setPrototypeOf` ：设置一个对象的原型对象（prototype）
`Object.getPrototypeof` ：读取一个对象的原型对象

```javascript
const nation = {
  name: "China",
};
const cities = {
  area1: "beijing",
};
Object.setPrototypeOf(cities, nation); // 将nation对象设为cities对象的原型
nation.language = "chinese"; // 往原型对象上加属性
console.log(cities.language);
console.log(Object.getPrototypeOf(cities)); // 获取cities的原型对象
```

# 11. Set 集合

## 11.1 基本使用

- ES6 提供了新的数据结构 Set(集合)。它类似于数组，但是成员的值都是唯一的，没有重复的值。集合实现了 iterator 接口，所以可以使用『扩展运算符』和『for…of…』进行遍历
- Set 本身是一个构造函数，用来生成 Set 数据结构。

```javascript
const s = new Set();
```

Set 函数可以接受一个**数组**作为参数，用来初始化。

```javascript
const s2 = new Set(["a", "b"]);
console.log(s2.size); //2
```

Set 没有重复的值。可以用于数组去重

```javascript
const s3 = new Set(["a", "a", "b", "b"]);
console.log(s3.size); //2
const ary = [...s3]; //将set数据结构分解成以,号分割的离散量，再加个[]成了数组
console.log(ary);
```

集合的属性和方法：

- size():返回集合的元素个数
- add(value)：添加某个值，返回 Set 结构本身
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
- has(value)：返回一个布尔值，表示该值是否为 Set 的成员
- clear()：清除所有成员，没有返回值

```javascript
const s4 = new Set();
//向set结构中添加值 使用add方法
s4.add("a").add("b");
console.log(s4.size); //2
//从set结构中删除值 用到的方法是delete
const r1 = s4.delete("c");
console.log(s4.size);
console.log(r1); //false
//判断某一个值是否是set数据结构中的成员 使用has
const r2 = s4.has("d");
console.log(r2); //false
//清空set数据结构中的值 使用clear方法
s4.clear();
console.log(s4.size);
```

- 遍历:Set 结构的实例与数组一样，也拥有 forEach 方法，用于对每个成员执行某种操作，没有返回值。

```javascript
const s5 = new Set(["a", "b", "c"]);
s5.forEach((value) => {
  console.log(value);
});
```

## 11.2 巧用

- 数组去重

```javascript
let arr = [1, 2, 3, 4, 3, 2, 1];
let result = [...new Set(arr)]; // 把arr扔到set里自动去重，再通过扩展运算符展开，最后纳入[]
console.log(result); // [1, 2, 3, 4]
```

- 求交集

```javascript
let arr = [1, 2, 3, 4];
let arr2 = [3, 4, 5, 6];
let result = [...new Set(arr)].filter((item) => {
  let s2 = new Set(arr2);
  return s2.has(item);
});
console.log(result); //[3, 4]
```

- 并集

```javascript
let arr = [1, 2, 3, 4];
let arr2 = [3, 4, 5, 6];
let union = [...new Set([...arr, ...arr2])];
console.log(result); // [1, 2, 3, 4, 5, 6]
```

- 差集

```javascript
let arr = [1, 2, 3, 4];
let arr2 = [3, 4, 5, 6];
let diff = [...new Set(arr)].filter((item) => !new Set(arr2).has(item));
console.log(diff); // [1, 2]
```

# 12. Map

- ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合。但是“键”
  的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
- Map 也实现了 iterator 接口，所以可以使用『扩展运算符』和『for…of…』进行遍历。

Map 的属性和方法：

1. size 返回 Map 的元素个数
2. set 增加一个新元素，返回当前 Map
3. get 返回键名对象的键值
4. has 检测 Map 中是否包含某个元素，返回 boolean 值
5. clear 清空集合，返回 undefined

```javascript
//声明 Map
let m = new Map();
//添加元素
m.set("name", "凉宫");
m.set("say", function () {
  console.log("hello!!");
});
// obj作为键
let obj = {
  age: 20,
};
m.set(obj, ["北京", "上海"]);
//size 获得多少对键值对
// console.log(m.size); // 3
//删除
// m.delete('name');
//获取
m.get("say");
m.get(obj);
//清空
m.clear();
//遍历
for (let v of m) {
  console.log(v);
}
```

# 13. 类和对象

- 面向对象的思维特点:
  ① 抽取（抽象）对象共用的属性和行为组织(封装)成一个类(模板)
  ② 对类进行实例化, 获取类的对象

## 13.1 类简介

- 在 ES6 中新增加了类的概念，可以使用 `class` 关键字声明一个类，之后以这个类来实例化对象。
- 类抽象了对象的公共部分，它泛指某一大类（class）
- 对象特指某一个，通过类实例化一个具体的对象

## 13.2 对象简介

- 在 JavaScript 中，对象是一组无序的相关属性和方法的集合，所有的事物都是对象，例如字符串、数值、数组、函数等。
- 对象是由属性和方法组成的：
  ① 属性：事物的特征，在对象中用属性来表示（常用名词）
  ② 方法：事物的行为，在对象中用方法来表示（常用动词）

## 13.3 创建类

- 类申明语法：

```javascript
class className {
  // class body
}
```

- 创建实例:

```javascript
let xx = new className();
```

- 注意： 类必须使用 new 实例化对象

## 13.4 构造函数

- `constructor()` 方法是类的构造函数(默认方法)，用于传递参数,返回实例对象，通过 `new` 命令生成对象实例时，自动调用该方法。如果没有显示定义, 类内部会自动给我们创建一个`constructor()`
- 语法：

```javascript
class Person {
  // 类的共有属性放到 constructor 里面
  constructor(name, age) {
    // constructor 构造方法或者构造函数
    this.name = name;
    this.age = age;
  }
}
```

创建实例：

```javascript
let lg = new Person("凉宫", 18);
```

## 13.5 类添加方法

语法：

```javascript
class Person {
  constructor(name, age) {
    // constructor 构造器或者构造函数
    this.name = name;
    this.age = age;
  }
  say() {
    console.log(this.name + "你好");
  }
}
```

创建实例并调用方法：

```javascript
let ldh = new Person("刘德华", 18);
ldh.say();
```

注意： 方法之间**不能加逗号分隔**，同时方法**不**需要添加 **function** 关键字。

---

对比 ES5 和 ES6 创建类的方式：

```js
function Bike(brand, price) {
  this.brand = brand;
  this.price = price;
}
//添加方法
Bike.prototype.ride = function () {
  console.log("骑车!!");
};
//实例化对象
let bike = new Bike("大行", 5999);
bike.ride();
//class
class Car {
  //构造方法 名字不能修改
  constructor(brand, price) {
    this.brand = brand;
    this.price = price;
  }
  //方法必须使用该语法, 不能使用 ES5 的对象完整形式
  drive() {
    console.log("开车!!");
  }
}
let car = new Car("奔驰", 499999);
car.drive();
```

## 13.6 类的静态成员

ES6 添加静态成员，用类名去访问

```js
class Phone {
  //静态属性
  static name = "手机";
  static change() {
    console.log("我可以改变世界");
  }
}
let nokia = new Phone();
console.log(nokia.name); // undefined；不能通过实例去访问静态成员
console.log(Phone.name); // 可以，通过类名去访问
```

ES5 中添加静态成员如下：

```clike
function Phone() {
}
Phone.name = '手机'; // 直接给类（方法）添加成员，是静态成员
Phone.change = function () {
  console.log("我可以改变世界");
}
Phone.prototype.price = '6k'; // 通过给原型链添加属性，实例可以访问到
let nokia = new Phone(); //
console.log(nokia.name); // undefined ，不能通过实例去访问
// nokia.change();
console.log(nokia.price); // 可以访问
```

## 13.7 类的私有成员

可以通过 # 的方式来标识私有属性和方法。

```javascript
class Person {
  //公有属性
  name;
  //私有属性,在属性名前面加上 # 号
  #age;
  #weight;
  //构造方法
  constructor(name, age, weight) {
    this.name = name;
    this.#age = age;
    this.#weight = weight;
  }
  intro() {
    console.log(this.name);
    console.log(this.#age);
    console.log(this.#weight);
  }
}
//实例化
const girl = new Person("小加加", 16, "3w-ton");
// console.log(girl.#weight); // 类外部无权访问私有属性
girl.intro(); //  通过类内部方法可调用
```

# 14. 类的继承

## 14.1 继承

- 语法：

```javascript
class Father {
  // 父类
}
class Son extends Father {
  // 子类继承父类
}
```

- 案例：

```javascript
class Father {
  constructor(surname) {
    this.surname = surname;
  }
  say() {
    console.log("你的姓是" + this.surname);
  }
}
class Son extends Father {
  // 这样子类就继承了父类的属性和方法
}
let damao = new Son("刘");
damao.say();
```

- 继承中的属性或者方法查找原则采用就近原则：继承中,如果实例化子类输出一个方法,先看子类有没有这个方法,如果有就先执行子类的，如果子类里面没有,就去查找父类有没有这个方法。

## 14.2 super 关键字

- `super` 关键字用于访问和调用对象父类上的函数。可以调用父类的构造函数，也可以调用父类的普通函数`super.方法()`.
- 语法：

```javascript
class Person {
  // 父类
  constructor(surname) {
    this.surname = surname;
  }
}
class Student extends Person {
  // 子类继承父类
  constructor(surname, firstname) {
    super(surname); // 调用父类的constructor(surname)
    this.firstname = firstname; // 定义子类独有的属性
  }
}
```

- 注意: 子类在构造函数中使用`super`, 必须放到 this 前面 (必须先调用父类的构造方法,再使用子类构造方法)

## 14.3 方法的重写

子类覆盖父类(方法名、返回值、参数的类型和个数)相同的方法

```js
class Father {
  constructor(name) {
    this.name = name;
  }
  call() {
    console.log("手机可以打电话！");
  }
}
class Son extends Father {
  constructor(name) {
    super(name);
  }
  call() {
    console.log("这是子类的函数");
  }
}
const xiaomi = new Son("小米");
xiaomi.call(); // 调用的是子类的方法
```

## 14.4 get 和 set

在“类”的内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

- get 关键字将对象属性与函数进行绑定，当属性被**访问时**，对应函数被执行
- set 关键字将对象属性与函数进行绑定，当属性**被赋值**时，对应函数被执行。

```javascript
class Phone {
  get price() {
    console.log("价格属性被读取了");
    return "xxx";
  }
  set price(newVal) {
    console.log("价格属性被修改了");
  }
}
//实例化对象
let s = new Phone();
// console.log(s.price);
s.price = "free";
```

## 14.5 注意点

1.  在 ES6 中类没有变量提升，所以必须**先定义类**，才能通过类实例化对象.
2.  类里面的共有属性和方法一定要加 this 使用.
3.  constructor 里面的 this 指向实例对象, 方法里面的 this 指向这个方法的调用者

```javascript
<body>
    <button>点击</button>
    <script>
        let that;
        let _that;
        class Star {
            constructor(uname, age) {
                // constructor 里面的this 指向的是 创建的实例对象
                that = this;
                this.uname = uname;
                this.age = age;
                // this.sing();
                this.btn = document.querySelector('button');
                this.btn.onclick = this.sing;
            }
            sing() {
            // 这个sing方法里面的this 指向的是 btn 这个按钮,因为这个按钮调用了这个函数
                console.log(that.uname);
                // that里面存储的是constructor里面的this
            }
            dance() {
                // 这个dance里面的this 指向的是实例对象 ldh 因为ldh 调用了这个函数
                _that = this;
                console.log(this);
            }
        }
        let ldh = new Star('刘德华');
        console.log(that === ldh);
        ldh.dance();
        console.log(_that === ldh);
        // 1. 在 ES6 中类没有变量提升，所以必须先定义类，才能通过类实例化对象
        // 2. 类里面的共有的属性和方法一定要加this使用.
    </script>
</body>
```

# 15. 简化对象写法

ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```javascript
let name = "凉宫";
let change = function () {
  console.log("我可以改变");
};
const school = {
  //属性和方法简写
  name,
  change,
  improve() {
    console.log("提升自我");
  },
};
// 对比原先写法
const school1 = {
  name: name,
  change: change,
  improve: function () {
    console.log("提升自我");
  },
};
```

# 16. 形参赋初值

ES6 允许给函数参数赋值初始值

- 形参初始值 具有默认值的参数, 一般位置要靠后(潜规则)

```javascript
function add(a, b, c = 10) {
  return a + b + c;
}
let result = add(1, 2);
console.log(result);
```

- 与解构赋值结合

```javascript
function connect({ host = "127.0.0.1", username, password, port }) {
  console.log(host);
  console.log(username);
  console.log(password);
  console.log(port);
}
connect({
  host: "baidu.com",
  username: "root",
  password: "root",
  port: 3306,
});
```

# 17. Symbol 类型

ES6 引入了一种新的原始数据类型 **Symbol** ，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，是一种类似于字符串的数据类型。
Symbol 特点

1. Symbol 的值是唯一的，用来解决命名冲突的问题
2. Symbol 值不能与其他数据进行运算
3. Symbol 定 义 的 对 象 属 性 不 能 使 用 `for…in` 循环遍历 ， 但是可以 使用 `Reflect.ownKeys` 来获取对象的所有键名

## 17.1 Symbol 基本使用

- 创建 Symbol

```javascript
let s = Symbol();
let s2 = Symbol("凉宫"); //可以接受一个字符串作为参数，用于描述区分。
let s3 = Symbol("凉宫");
console.log(s2 === s3); // false
```

- 通过 Symbol.for()创建；通过基于传入的字符串作为参数，新建 Symbol 值；若原先已经用该字符串创建过，则直接返回已创建过的 Symbol 值

```javascript
let s1 = Symbol.for("凉宫");
let s2 = Symbol.for("凉宫");
console.log(s1 === s2); // true
```

- 不能与其他数据进行运算，如下都会报错

```javascript
let s = Symbol();
let result1 = s + 100; //数字运算
let result2 = s > 100; //比较
let result3 = s + "h"; //字符串拼接
let result4 = s + s; //自己加自己
```

- 用于对象的属性名，能保证不会出现同名的属性

```javascript
let mySymbol = Symbol();
// 第一种写法
let a = {};
a[mySymbol] = "Hello!";
// 第二种写法
let a = {
  [mySymbol]: "Hello!",
};
// Symbol 值作为对象属性名时，不能用点运算符。
a.mySymbol; //undefined
```

## 17.2 Symbol 内置值

除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。可以称这些方法为魔术方法，因为它们会在特定的场景下自动执行。

| 内置值                    | 描述                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Symbol.hasInstance        | 当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法                                         |
| Symbol.isConcatSpreadable | 对象的 Symbol.isConcatSpreadable 属性等于的是一个布尔值，表示该对象用于 Array.prototype.concat()时，是否可以展开。 |
| Symbol.species            | 创建衍生对象时，会使用该属性                                                                                       |
| Symbol.match              | 当执行 str.match(myObject) 时，如果该属性存在，会调用它，返回该方法的返回值。                                      |
| Symbol.replace            | 当该对象被 str.replace(myObject)方法调用时，会返回该方法的返回值。                                                 |
| Symbol.search             | 当该对象被 str. search (myObject)方法调用时，会返回该方法的返回值。                                                |
| Symbol.split              | 当该对象被 str. split (myObject)方法调用时，会返回该方法的返回值。                                                 |
| Symbol.iterator           | 对象进行 for...of 循环时，会调用 Symbol.iterator 方法，返回该对象的默认遍历器                                      |
| Symbol.toPrimitive        | 该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。                                           |
| Symbol. toStringTag       | 在该对象上面调用 toString 方法时，返回该方法的返回值                                                               |
| Symbol. unscopables       | 该对象指定了使用 with 关键字时，哪些属性会被 with 环境排除。                                                       |

详情可参考：[阮一峰 ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/symbol)

# 18. Iterator 迭代器

迭代器（Iterator）就是一种机制。它是一种接口，为各种不同的数据结构提
供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作。

1. ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费
2. 原生具备 iterator 接口的数据(可用 for of 遍历)
   a) Array
   b) Arguments
   c) Set
   d) Map
   e) String
   f) TypedArray
   g) NodeList
3. 工作原理
   a) 创建一个指针对象，指向当前数据结构的起始位置
   b) 第一次调用对象的 next 方法，指针自动指向数据结构的第一个成员
   c) 接下来不断调用 next 方法，指针一直往后移动，直到指向最后一个成员
   d) 每调用 next 方法返回一个包含 value 和 done 属性的对象

注: 需要自定义遍历数据的时候，要想到迭代器。

小示例：自定义遍历数据

```javascript
//声明一个对象
const sos = {
  name: "sos团",
  stus: ["凉宫", "长门", "阿虚"],
  // 自定义iterator 接口，自定义遍历
  [Symbol.iterator]() {
    //索引变量
    let index = 0;
    return {
      next: () => {
        if (index < this.stus.length) {
          const result = { value: this.stus[index], done: false };
          //下标自增
          index++;
          //返回结果
          return result;
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  },
};
//遍历这个对象  , 这个v是属性值
for (let v of sos) {
  console.log(v);
}
```

# 19. Generator 生成器函数

## 19.1 Generator 简介

- 生成器函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同
- Generator 函数有两个特征。一是，function 关键字与函数名之间有一个`*`星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态
- 调用 Generator 函数后，会指向内部状态的 Iterator Object，要手动`next`才会执行 yield 表达式

```javascript
//生成器其实就是一个特殊的函数
//异步编程  如：纯回调函数  node fs  ajax mongodb
//Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行
function* gen() {
  // 业务逻辑1
  yield "一只没有耳朵";
  // 业务逻辑2
  yield "一只没有尾部";
  // 业务逻辑3
  return "xxx"; //结束执行
}
let iterator = gen();
console.log(iterator.next()); // 结果：{value: '一只没有耳朵', done: false}
console.log(iterator.next()); // 结果：{value: '一只没有尾部', done: false}
console.log(iterator.next()); // 结果：{value: 'xxx', done: true}
// value属性就是当前yield表达式的值hello，done属性的值false，表示遍历还没有结束
//for...of循可以自动遍历 Generator 函数运行时生成的Iterator对象，且不需要调用next方法
// for (let v of gen()) {
//   console.log(v);
// }
```

## 19.2 next 带参数

next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值

```javascript
function* gen(arg) {
  console.log("arg:", arg);
  let one = yield 111;
  console.log("one:", one);
  let two = yield 222;
  console.log("two:", two);
}
//执行获取迭代器对象
let iterator = gen("AAA");
//next方法可以传入实参
iterator.next();
console.log(iterator.next("BBB")); //{value: 222, done: false}
console.log(iterator.next("CCC")); // {value: undefined, done: true}
```

小示例：

```javascript
// 异步编程  文件操作 网络操作(ajax, request) 数据库操作
// 1s 后控制台输出 111  2s后输出 222  3s后输出 333
// 回调地狱
// setTimeout(() => {
//     console.log(111);
//     setTimeout(() => {
//         console.log(222);
//         setTimeout(() => {
//             console.log(333);
//         }, 3000);
//     }, 2000);
// }, 1000);

//模拟 先获取用户数据  再订单数据  最后商品数据
function getUsers() {
  setTimeout(() => {
    let data = "用户数据";
    //调用 next 方法, 并且将数据传入
    iterator.next(data);
  }, 1000);
}
function getOrders() {
  setTimeout(() => {
    let data = "订单数据";
    iterator.next(data);
  }, 1000);
}
function getGoods() {
  setTimeout(() => {
    let data = "商品数据";
    iterator.next(data);
  }, 1000);
}
function* gen() {
  let users = yield getUsers();
  let orders = yield getOrders();
  let goods = yield getGoods();
}
//调用生成器函数
let iterator = gen();
iterator.next();
```

# 20. ES6 模块化

## 20.1 模块化规范分类

- 在 ES6 模块化规范诞生之前，JavaScript 社区已经尝试并提出了 AMD、CMD、Common|S 等模块化规范。
- 这些由社区提出的模块化标准，存在一定的差异性与局限性、并不是浏览器与服务器通用的模块化标准，例如:
  ① AMD 和 CMD 适用于浏览器端的 Javascript 模块化
  ② CommonJS 适用于服务器端的 Javascript 模块化
- 太多的模块化规范给开发者增加了学习的难度与开发的成本。因此，大一统的 ES6 模块化规范诞生了!

## 20.2 何谓 ES6 模块化规范

- ES6 模块化规范是浏览器端与服务器端通用的模块化开发规范。它的出现极大的降低了前端开发者的模块化学习成本，开发者不需再额外学习 AMD、CMD 或 CommonJS 等模块化规范。
- ES6 模块化规范中定义:
  - 每个 js 文件都是一个独立的模块
  - 导入其它模块成员使用 import 关键字
  - 向外共享模块成员使用 export 关键字

## 20.3 体验 ES6 模块化

node.js 中默认仅支持 Common]S 模块化规范，若想基于 node.js 体验与学习 ES6 的模块化语法，可以按照如下两个步骤进行配置:
① 确保安装了 v14.15.1 或更高版本的 node.js(在终端 `node -v` 查看版本)
② 在 package.json 的根节点中添加"type": "module"节点
![在这里插入图片描述](https://img-blog.csdnimg.cn/577bfee37c8b4fb3af534deafe21ddec.png#pic_center)

## 20.4 ES6 模块化的基本语法

- ES6 的模块化主要包含如下 3 种用法:
  ① 默认导出与默认导入
  ② 按需导出与按需导入
  ③ 直接导入并执行模块中的代码

### 20.4.1 默认导入或导出

1、默认导出语法： `export default 默认导出的成员`

```javascript
let n1 = 10; // 定义模块私有成员 n1
let n2 = 20; // 定义模块私有成员 n2(外界访问不到n2，因为在此没有被共享出去)
function show() {} // 定义模块私有方法 show
export default {
  // 使用 export default 默认导出语法，向外共享 n1 和 show 两个成员
  n1,
  show,
};
```

- 默认导出注意事项：每个模块中，只允许使用唯一的一次 export default，否则会报错!

![在这里插入图片描述](https://img-blog.csdnimg.cn/f144593e87e3464d967f14e4faa03965.png#pic_center)

2、默认导出语法： `import 接收名称 from '模块标识符'`，一般为路径；

```javascript
// 从 默认导出.js 模块中导入 它向外共享的成员
// 并使用 xxx 成员进行接收
import xxx from "./默认导出.js";
console.log(xxx); //输出结果  { n1: 10, show: [Function: show] }
```

- 默认导出注意事项：默认导入时的接收名称可以任意名称，只要是合法的成员名称即可

```javascript
import m1 from './默认导出.js'; //m1 是合法命名
import 123m from './默认导出.js'; // 不合法，不能以数字开头
```

### 20.4.2 按需导入或导出

1、按需导出语法：`export 按需导出的成员`

```javascript
export let s1 = "aaa"; // 向外导出变量 s1
export let s2 = 123; // 向外导出变量 s2
export function say() {
  // 向外导出方法 say
}
```

2、按需导出语法：`import {s1} from '模块标识符'`

```javascript
import { s1, say } from "./按需导出.js";
console.log(s1); // aaa
console.log(say); //[Function: say]
```

- 按需导入或导出的注意事项
  ① 每个模块中可以使用多次按需导出
  ② 按需导入的成员名称必须和按需导出的名称保持一致
  ③ 按需导入时，可以使用**as**关键字进行**重命名**
  ④ 按需导入可以和默认导入一起使用

```javascript
// 写在{} 里面的是按需导入的成员，写在{}外面的是默认导入的成员
import info, { s1, say } from "./按需导出.js";
console.log(s1); //aaa
console.log(say); //[Function: say]
console.log(info); // { a: 20}
import { s1 as sss } from "./按需导出.js";
console.log(sss);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/afe669fbd78045e8ab4fe820cb0b8a9c.png#pic_center)

### 20.4.3 直接导入并执行模块中的代码

如果只想单纯地执行某个模块中的代码，并不需要得到模块中向外共享的成员。此时，可以直接导入并执行模块代码，示例代码如下:

```javascript
import "./test.js";
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ef9ef21b757a4591bdfd43557ae6c9f8.png#pic_center)
直接导入不需要接收名，没有意义。

# 21. Promise

## 21.1 回调地狱

多层回调函数的相互嵌套，就形成了**回调地狱**。示例代码如下:

```javascript
setTimeout(() => {
  // 第1层回调函数
  console.log("延时1秒后输出");
  setTimeout(() => {
    // 第2层回调函数
    console.log("再延时2秒后输出");
    setTimeout(() => {
      // 第 3 层回调函数
      console.log("再延时3秒后输出");
      setTimeout(() => {
        // 第 3 层回调函数
        console.log("再延时4秒后输出");
      }, 4000);
    }, 3000);
  }, 2000);
}, 1000);
```

回调地狱的缺点:

- 代码耦合性太强，牵一发而动全身，难以维护
- 大量冗余的代码相互嵌套，代码的可读性变差

如何解决回调地狱：

- 为了解决回调地狱的问题，ES6 (ECMAScript 2015）中新增了 Promise 的概念。

## 21.2 Promise 的基本概念

① Promise 是一个构造函数

- 我们可以创建 Promise 的实例`const p = new Promise()`
- new 出来的 Promise 实例对象，代表一个异步操作

② `Promise.prototype`上包含一个.then()方法

- 每一次 new Promise()构造函数得到的实例对象，
- 都可以通过原型链的方式访问到.then()方法，例如`p.then()`

③ .then()方法用来预先指定成功和失败的回调函数

- p.then(成功的回调函数，失败的回调函数)
- `p.then(result => { }, error =>{))`
- 调用.then()方法时，成功的回调函数是必选的、失败的回调函数是可选的

## 21.3 基于回调函数顺序读取文件

```javascript
import fs from "fs";
// 读取文件 1.txt
fs.readFile("./day2/file/1.txt", "utf-8", (err1, r1) => {
  if (err1) return console.log(err1.message);
  console.log(r1); // 读取文件1成功
  // 读取文件 2.txt
  fs.readFile("./day2/file/2.txt", "utf-8", (err2, r2) => {
    if (err2) return console.log(err2.message);
    console.log(r2); // 读取文件2成功
    // 读取文件 3.txt
    fs.readFile("./day2/file/3.txt", "utf-8", (err3, r3) => {
      if (err3) return console.log(err3.message);
      console.log(r3); // 读取文件3成功
    });
  });
});
```

## 21.4 基于 then-fs 读取文件内容

由于 node.,js 官方提供的**fs 模块**仅支持以**回调函数**的方式读取文件，不支持 Promise 的调用方式。因此，需要先运行如下的命令，安装 then-fs 这个第三方包，从而支持我们基于 Promise 的方式读取文件的内容:

```shell
npm install then-fs
```

### 21.4.1 then-fs 的基本使用

调用 then-fs 提供的 readFile()方法，可以异步地读取文件的内容，它的返回值是 Promise 的实例对象。因此可以调用.then()方法为每个 Promise 异步操作指定成功和失败之后的回调函数。示例代码如下:

```javascript
// 基于Promise的方式读取文件
import thenFs from "then-fs";
// 注意：.then()中的失败回调函数是可选的，可以被省略
thenFs.readFile("./day2/file/1.txt", "utf-8").then((r1) => {
  console.log(r1),
    (err1) => {
      console.log(err1.message);
    };
});
thenFs.readFile("./day2/file/2.txt", "utf-8").then((r2) => {
  console.log(r2),
    (err2) => {
      console.log(err2.message);
    };
});
thenFs.readFile("./day2/file/3.txt", "utf-8").then((r3) => {
  console.log(r3),
    (err3) => {
      console.log(err3.message);
    };
});
```

注意:上述的代码无法保证文件的读取顺序，需要做进一步的改进!

### 21.4.2 .then()方法的特性

如果上一个.then()方法中返回了一个新的 Promise 实例对象，则可以通过下一个.then()继续进行处理。通过.then()方法的链式调用，就解决了回调地狱的问题。

## 21.5 基于 Promise 顺序读取文件内容

Promise 支持**链式调用**，从而来解决回调地狱的问题。示例代码如下:

```javascript
import thenFs from "then-fs";
thenFs
  .readFile("./day2/file/1.txt", "utf-8") //1. 返回值是Promise的实例对象
  .then((r1) => {
    //2. 通过 .then 为第一个Promise 实例指定成功之后的回调函数
    console.log(r1);
    return thenFs.readFile("./day2/file/2.txt", "utf-8"); // 3. 在第一个.then中 返回一个新的Promise实例对象
  })
  .then((r2) => {
    // 4. 继续使用.then 为上一个.then的返回值(新的Promise实例) 指定成功之后的回调函数
    console.log(r2);
    return thenFs.readFile("./day2/file/3.txt", "utf-8"); // 5. 在第二个 .then中再返回一个新的 Promise实例对象
  })
  .then((r3) => {
    // 6. 继续调用 .then 为上一个 .then 的返回值 指定成功之后的回调函数
    console.log(r3);
  });
```

## 21.6 通过.catch 捕获错误

在 Promise 的链式操作中如果发生了错误，可以`Promise.prototype.catch`方法进行捕获和处理:

```javascript
import thenFs from "then-fs";
thenFs
  .readFile("./day2/file/1111.txt", "utf-8") // 1111.txt 文件不存在，导致读取失败，后面的3个.then都不执行
  .then((r1) => {
    console.log(r1);
    return thenFs.readFile("./day2/file/2.txt", "utf-8");
  })
  .then((r2) => {
    console.log(r2);
    return thenFs.readFile("./day2/file/3.txt", "utf-8");
  })
  .then((r3) => {
    console.log(r3);
  })
  .catch((err) => {
    // 捕获第一个发生的错误，并输出错误的信息
    console.log(err.message);
  });
```

如果不希望前面的错误导致后续的.then 无法正常执行，则可以将.catch 的**调用提前**，示例代码如下:

```javascript
import thenFs from "then-fs";
thenFs
  .readFile("./day2/file/1111.txt", "utf-8") // 1111.txt 文件不存在，导致读取失败
  .catch((err) => {
    // 捕获第一个发生的错误，并输出错误信息
    //由于错误已被及时处理，不影响后续.then的整成运行
    console.log(err.message);
  })
  .then((r1) => {
    console.log(r1); // undefined
    return thenFs.readFile("./day2/file/2.txt", "utf-8");
  })
  .then((r2) => {
    console.log(r2); // bbbbbbbbbb
    return thenFs.readFile("./day2/file/3.txt", "utf-8");
  })
  .then((r3) => {
    console.log(r3); // cccccccccc
  });
```

## 21.7 Promise.all()方法

Promise.all()方法会发起并行的 Promise 异步操作，等**所有的异步操作**全部结束后才会执行下一步的.then 操作（等待机制）。示例代码如下:

```javascript
import thenFs from "then-fs";
// 1. 定义一个数组，存放3个读文件的异步操作
const promiseArr = [
  thenFs.readFile("./day2/file/1.txt", "utf-8"),
  thenFs.readFile("./day2/file/2.txt", "utf-8"),
  thenFs.readFile("./day2/file/3.txt", "utf-8"),
];
// 2. 将Promise 的数组，作为Promise.all()的参数
Promise.all(promiseArr)
  .then(([r1, r2, r3]) => {
    // 所有文件读取成功(等待机制)
    console.log(r1, r2, r3);
  })
  .catch((err) => {
    // 捕获 Promise异步操作中的错误
    console.log(err.message);
  });
```

注意: 数组中 Promise 实例的顺序，就是最终结果的顺序!

## 21.8 Promise.race()方法

Promise.race()方法会发起并行的 Promise 异步操作，只要任何一个异步操作完成，就立即执行下一步的.then 操作（赛跑机制）。示例代码如下:

```javascript
import thenFs from "then-fs";
// 1. 定义一个数组，存放3个读文件的异步操作
const promiseArr = [
  thenFs.readFile("./day2/file/1.txt", "utf-8"),
  thenFs.readFile("./day2/file/2.txt", "utf-8"),
  thenFs.readFile("./day2/file/3.txt", "utf-8"),
];
Promise.race(promiseArr) // 2. 将Promise 的数组，作为Promise.race()的参数
  .then((result) => {
    // 只要任何一个异步操作完成，就立即执行成功的回调函数(赛跑机制)
    console.log(result);
  })
  .catch((err) => {
    // 捕获 Promise异步操作中的错误
    console.log(err.message);
  });
```

## 21.9 基于 Promise 封装读文件的方法

方法的封装要求:

- 方法的名称要定义为 getFile
- 方法接收一个形参 fpath，表示要读取的文件的路径
- 方法的返回值为 Promise 实例对象

### 21.9.1 getFile 方法的基本定义

```javascript
// 1. 方法的名称为getFile、
// 2. 方法接收一个参数 fpath ，表示要读取的文件路径
function getFile(fpath) {
  // 3. 方法的返回值为Promise的实例对象
  return new Promise();
}
```

第 5 行代码中的`new Promise()`只是创建了一个形式上的异步操作。

### 21.9.2 创建具体的异步操作

如果想要创建具体的异步操作，则需要在 new Promise()构造函数期间，传递一个 function 函数，将具体的异步操作定义到 function 函数内部。示例代码如下:

```javascript
import fs from "fs";
// 1. 方法的名称为getFile、
// 2. 方法接收一个参数 fpath ，表示要读取的文件路径
function getFile(fpath) {
  // 3. 方法的返回值为Promise的实例对象
  // 4. 下面代码表示 这是一个具体的，读文件的异步操作
  fs.readFile(fpath, "utf-8", (err, dataStr) => {});
  return new Promise();
}
```

### 21.9.3 获取.then 的两个实参

通过.then()指定的成功和失败的回调函数，可以在 function 的形参中进行接收，示例代码如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/23bc251248b64d44a325c7cd0c71a65c.png#pic_center)

### 21.9.4 调用 resolve 和 reject 回调函数

Promise 异步操作的结果，可以调用 resolve 或 reject 回调函数进行处理。示例代码如下:

```javascript
import fs from "fs";
function getFile(fpath) {
  // resolve 是 成功的回调函数，reject 是失败的回调函数
  return new Promise(function (resolve, reject) {
    fs.readFile(fpath, "utf-8", (err, dataStr) => {
      if (err) return reject(err); // 如果读取失败，则调用失败的回调函数
      resolve(dataStr); // 如果读取成功，则调用成功的回调函数
    });
  });
}
// getFile方法的调用过程
getFile("./day2/file/1.txt").then(成功的回调函数, 失败的回调函数);
getFile("./day2/file/1.txt").then(成功的回调函数, 失败的回调函数);
// getFile("./day2/file/1.txt").then(
//   (r1) => {
//     console.log(r1);
//   },
//   (err) => { //后面这个失败的函数可以不写，可以用.catch来捕获
//     console.log(err.message);
//   }
// );
```

# 22. async/await

## 22.1 什么是 async/await

- async/await 是 ES8(ECMAScript 2017）引入的新语法，用来简化 Promise 异步操作。
- 在 async/await 出现之前，开发者只能通过链式.then()的方式处理 Promise 异步操作。示例代码如下;

```javascript
thenFs
  .readFile("./day2/file/1.txt", "utf-8")
  .then((r1) => {
    console.log(r1);
    return thenFs.readFile("./day2/file/2.txt", "utf-8");
  })
  .then((r2) => {
    console.log(r2);
    return thenFs.readFile("./day2/file/3.txt", "utf-8");
  })
  .then((r3) => {
    console.log(r3);
  });
```

.then 链式调用的优点：解决了回调地狱的问题
.then 链式调用的缺点：代码冗余、阅读性差、不易理解

---

使用 async/await 简化 Promise 异步操作的示例代码如下：

```javascript
import thenFs from "then-fs";
// 按照顺序读取文件1,2,3的内容
async function getAllFile() {
  const r1 = await thenFs.readFile("./day2/file/1.txt", "utf-8");
  console.log(r1);
  const r2 = await thenFs.readFile("./day2/file/2.txt", "utf-8");
  console.log(r2);
  const s3 = await thenFs.readFile("./day2/file/3.txt", "utf-8");
  console.log(s3);
}
getAllFile();
```

## 22.2 async 函数

- async 函数的返回值为 promise 对象，可分为成功类型的 promise 或失败类型的 promise
- promise 对象的结果由 async 函数执行的返回值决定

```javascript
//async 函数
async function fn() {
  // 1.return的不是promise对象，则这个fn函数的返回值为成功类型的promise
  // return '尚硅谷';
  // 2. 抛出错误, fn返回的结果是一个失败类型的 Promise
  // throw new Error('出错啦!');
  // 3. 返回的结果如果是一个 Promise 对象，看它调用的是resolve，还是reject
  return new Promise((resolve, reject) => {
    resolve("成功的数据"); // 调用resolve 则fn返回值是成功的promise
    // reject("失败的错误"); // 调用reject，则fn返回值是失败的promise
  });
}
const result = fn();
console.log(result);
```

---

```javascript
//async 函数
async function fn() {
  return new Promise((resolve, reject) => {
    resolve("成功的数据"); // 在这里指定它成功，下面调用.then方法，就回去执行成功的回调
    // reject("失败的错误");
  });
}
const result = fn();
// //调用 then 方法
result.then(
  (value) => {
    // 成功的回调
    console.log(value);
  },
  (reason) => {
    // 失败的回调
    console.warn(reason);
  }
);
```

## 22.3 await 表达式

1. await 必须写在 async 函数中
2. await 右侧的表达式一般为 promise 对象
3. await 返回的是 promise 成功的值
4. await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理

```javascript
//创建 promise 对象
const p = new Promise((resolve, reject) => {
  // resolve("用户数据"); //这个调resolve，让这个p为成功类型的promise
  reject("失败啦!"); // 这个调reject，让这个p为失败类型的promise
  // throw new Error("错误啦"); // 模拟抛出错误
});
// await 要放在 async 函数中.
async function main() {
  try {
    let result = await p; // await p 表达式,返回成功或失败类型的promise对象的值
    console.log(result); //  这里的result 就为 上面reject或resolve中参数传过来的值
  } catch (e) {
    console.log(e); // 如果上面抛出错误，这里就会捕获
  }
}
//调用函数
main();
```

## 22.4 async 结合 await 示例

```javascript
//1. 引入 fs 模块
const fs = require("fs");
//读取『为学』.md文件中的内容
function readWeiXue() {
  return new Promise((resolve, reject) => {
    fs.readFile("./resources/为学.md", (err, data) => {
      //如果失败
      if (err) reject(err);
      //如果成功
      resolve(data);
    });
  });
}
function readChaYangShi() {
  return new Promise((resolve, reject) => {
    fs.readFile("./resources/插秧诗.md", (err, data) => {
      //如果失败
      if (err) reject(err);
      //如果成功
      resolve(data);
    });
  });
}
function readGuanShu() {
  return new Promise((resolve, reject) => {
    fs.readFile("./resources/观书有感.md", (err, data) => {
      //如果失败
      if (err) reject(err);
      //如果成功
      resolve(data);
    });
  });
}
//声明一个 async 函数
async function main() {
  //先获取为学内容
  let weixue = await readWeiXue();
  //再获取插秧诗内容
  let chayang = await readChaYangShi();
  // 最后获取观书有感
  let guanshu = await readGuanShu();
}
main();
```

## 22.5 async/await 的使用注意事项

如果在 function 中使用了`await`，则 function 必须被`async`修饰
在 async 方法中，第一个 await **之前**的代码会**同步执行**，await**之后**的代码会**异步执行**

示例例题：

```javascript
// 1.txt,2.txt,3.txt内容分别放了一堆 a, b，c
import thenFs from "then-fs";
console.log("A");
async function getAllFile() {
  console.log("C");
  // 正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
  // 这里如果不带await，打印的则是Promise 对象，带了打印文件内容
  const r1 = await thenFs.readFile("./day2/file/1.txt", "utf-8");
  console.log(r1);
  const r2 = await thenFs.readFile("./day2/file/2.txt", "utf-8");
  console.log(r2);
  const s3 = await thenFs.readFile("./day2/file/3.txt", "utf-8");
  console.log(s3);
  console.log("D");
}
getAllFile();
console.log("B");
```

结果如下图所示
![在这里插入图片描述](https://img-blog.csdnimg.cn/b839316c97d140188323a8e18b3daadd.png#pic_center)

# 23. EventLoop

## 23.1 JS 是单线程语言

JavaScript 是一门单线程执行的编程语言。也就是说，同一时间只能做一件事情。
![在这里插入图片描述](https://img-blog.csdnimg.cn/7acf3f15604c48b4b2042b705a6616d0.png#pic_center)
**单线程**执行任务队列的**问题**：如果前一个任务非常耗时，则后续的任务就不得不一直等待，从而导致程序假死的问题。

## 23.2 同步任务和异步任务

为了防止某个耗时任务导致程序假死的问题，JavaScript 把待执行的任务分为了两类:

- 同步任务( synchronous)
  - 又叫做非耗时任务，指的是在主线程上排队执行的那些任务
  - 只有前一个任务执行完毕，才能执行后一个任务
- 异步任务（ asynchronous)
  - 又叫做耗时任务，异步任务由 JavaScript 委托给宿主环境进行执行
  - 当异步任务执行完成后，会通知 JavaScript 主线程执行异步任务的回调函数

## 23.3 同步/异步任务的执行过程

① 同步任务由 JavaScript 主线程次序执
② 行异步任务委托给宿主环境执行
③ 已完成的异步任务对应的回调函数，会被加入到任务队列中等待执行
④ JavaScript 主线程的执行栈被清空后，会读取任务队列中的回调函数，依次序执行
⑤ JavaScript 主线程不断重复上面的第 4 步
![在这里插入图片描述](https://img-blog.csdnimg.cn/aba30bcc7e9b4b6c929d7d575ed9a38b.png#pic_center)

## 23.4 EventLoop 的基本概念

JavaScript 主线程从“任务队列”中读取异步任务的回调函数，放到执行栈中依次执行。这个过程是循环不断的，所以整个的这种运行机制又称为 EventLoop （事件循环)。见上图。

结合 EventLoop 分析输出顺序：题一：

```javascript
import thenFs from "then-fs";
console.log("A");
thenFs.readFile("./day2/file/1.txt", "utf-8").then((dataStr) => {
  console.log("B");
});
setTimeout(() => {
  console.log("C");
}, 0);
console.log("D");
```

答：正确的输出结果:ADCB。其中:

- A 和 D 属于同步任务。会根据代码的先后顺序依次被执行
- C 和 B 属于异步任务。它们的回调函数会被加入到任务队列中，等待主线程空闲时再执行

![在这里插入图片描述](https://img-blog.csdnimg.cn/9d58ca88e95f41a39f61be3353a85522.png#pic_center)

# 24. 宏任务和微任务

## 24.1 何谓宏任务和微任务

JavaScript 把异步任务又做了进一步的划分，异步任务又分为两类，分别是：

- 宏任务(fmacrotask)
  - 异步 Ajax 请求
  - setTimeout、setInterval
  - 文件操作
  - 其他宏任务
- 微任务(microtask)
  - Promise.then、.catch 和 .finally
  - process.nextTick
  - 其他微任务

![在这里插入图片描述](https://img-blog.csdnimg.cn/c7acacdd504d4ff881798126211447c0.png#pic_center)

## 24.2 宏任务和微任务的执行顺序

每一个宏任务执行完之后，都会检查是否存在待执行的微任务，如果有，则执行完所有微任务之后，再继续执行下一个宏任务。
![在这里插入图片描述](https://img-blog.csdnimg.cn/47cfcce8e2ae44408c34429281a3a1e8.png#pic_center)
练习 1：分析以下代码的输出顺序

```javascript
setTimeout(() => {
  console.log("1");
});
new Promise((resolve) => {
  console.log("2");
  resolve();
}).then(() => {
  console.log("3");
});
console.log("4");
```

正确的输出顺序是:2431
分析：
① 先执行所有的同步任务：(执行第 5 行、第 10 行代码)
② 再执行微任务：(执行第 8 行代码)
③ 再执行下一个宏任务：(执行第 2 行代码)
![在这里插入图片描述](https://img-blog.csdnimg.cn/9d662893933045fab5af350cde958ce3.png#pic_center)
练习 2：经典面试题
请分析以下代码的输出顺序

```javascript
console.log("1");
setTimeout(() => {
  console.log("2");
  new Promise((resolve) => {
    console.log("3");
    resolve();
  }).then(() => {
    console.log("4");
  });
});
new Promise((resolve) => {
  console.log("5");
  resolve();
}).then(() => {
  console.log("6");
});
setTimeout(() => {
  console.log("7");
  new Promise((resolve) => {
    console.log("8");
    resolve();
  }).then(() => {
    console.log("9");
  });
});
```

正确的输出顺序是：156234789

# 25. 其他

## 25.1 \*\* 运算符

在 ES7 中引入指数运算符「\*\*」，用来实现幂运算，功能与 Math.pow 结果相同

```javascript
console.log(2 ** 10); //  1024
console.log(Math.pow(2, 10));
1024;
```

## 25.2 Object 新增方法

1. `Object.values()`方法返回一个给定对象的所有可枚举属性值的数组
2. `Object.entries()`方法返回一个给定对象自身可遍历属性 [key,value] 的数组 3.`Object.getOwnPropertyDescriptors`

```javascript
//声明对象
const person = {
  name: "凉宫",
  age: 16,
  friends: ["阿虚", "长门", "朝比奈"],
};
// 获取对象所有的键
console.log(Object.keys(person)); // ['name', 'age', 'friends']
// 获取对象所有的值
console.log(Object.values(person)); // ['凉宫', 16, Array(3)]
// 获取对象的键值对数组
console.log(Object.entries(person)); //[['name', '凉宫'], ['age', 16], ['friends', Array(3)]]
// 适合用来创建 Map
const m = new Map(Object.entries(person));
console.log(m);
// 对象属性的描述对象;
console.log(Object.getOwnPropertyDescriptors(person));
// 比如：
// age:
// configurable: true
// enumerable: true
// value: 16
// writable: true
```
