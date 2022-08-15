---
title: js进阶
date: 2022/05/12 07:37 #手动设置最后更新时间
categories: [] # 标签
stick: false # 是否置顶
description:
keyword: 正则 原型
---

# js 进阶

# 1. 构造函数和原型

## 1.1 概述

- 在典型的 OOP 的语言中（如 Java），都存在类的概念，类就是对象的模板，对象就是类的实例，但在 ES6 之前，JS 中并没用引入类的概念。
- 在 ES6 之前 ，对象不是基于类创建的，而是用一种称为构建函数的特殊函数来定义对象和它们的特征。
- 创建对象可以通过以下三种方式：
  ① 对象字面量
  ②new Object()
  ③ 自定义构造函数

```javascript
// 1. 利用 new Object() 创建对象
var obj1 = new Object();
// 2. 利用 对象字面量创建对象
var obj2 = {};
// 3. 利用构造函数创建对象
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
  this.sing = function () {
    console.log("我会唱歌");
  };
}
var ldh = new Star("刘德华", 18);
var zxy = new Star("张学友", 19);
console.log(ldh);
ldh.sing();
zxy.sing();
```

## 1.2 构造函数

- 构造函数是一种特殊的函数，主要用来初始化对象，即为对象成员变量赋初始值，它总与 new 一起使用。我们可以把对象中一些公共的属性和方法抽取出来，然后封装到这个函数里面。
- 在 JS 中，使用构造函数时要注意以下两点：
  ① 构造函数用于创建某一类对象，其首字母要大写
  ② 构造函数要和 new 一起使用才有意义
- new 在执行时会做四件事情：
  ① 在内存中创建一个新的空对象。
  ② 让 this 指向这个新的对象。
  ③ 执行构造函数里面的代码，给这个新对象添加属性和方法。
  ④ 返回这个新对象（所以构造函数里面不需要 return ）。
- 静态成员：在构造函数本上添加的成员称为静态成员，只能由构造函数本身来访问
- 实例成员：在构造函数内部创建的对象成员称为实例成员，只能由实例化的对象来访问

```javascript
// 构造函数中的属性和方法我们称为成员, 成员可以添加
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
  this.sing = function () {
    console.log("我会唱歌");
  };
}
var ldh = new Star("刘德华", 18);
// 1.实例成员就是构造函数内部通过this添加的成员 uname age sing 就是实例成员
// 实例成员只能通过实例化的对象来访问
console.log(ldh.uname);
ldh.sing();
// console.log(Star.uname); // 不可以通过构造函数来访问实例成员
// 2. 静态成员 在构造函数本身上添加的成员  sex 就是静态成员
Star.sex = "男";
// 静态成员只能通过构造函数来访问
console.log(Star.sex);
console.log(ldh.sex); // 不能通过对象来访问
```

## 1.3 构造函数的问题

- 构造函数方法很好用，但是存在浪费内存的问题。

![在这里插入图片描述](https://img-blog.csdnimg.cn/5883e1a2b31042fe83c9091ac9985f53.png#pic_center)

## 1.4 构造函数原型 prototype

- 构造函数通过原型分配的函数是所有对象所共享的。
- JavaScript 规定，每一个构造函数都有一个 prototype 属性，指向另一个对象。注意这个 prototype 就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有。
- 我们可以把那些不变的方法，直接定义在 prototype 对象上，这样所有对象的实例就可以共享这些方法。

```javascript
// 1. 构造函数的问题.
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
  // this.sing = function() {
  //     console.log('我会唱歌');
  // }
}
Star.prototype.sing = function () {
  console.log("我会唱歌");
};
var ldh = new Star("刘德华", 18);
var zxy = new Star("张学友", 19);
console.log(ldh.sing === zxy.sing);
ldh.sing();
zxy.sing();
// 2. 一般情况下,我们的公共属性定义到构造函数里面, 公共的方法我们放到原型对象身上
```

## 1.5 对象原型 `__proto__`

- 对象都会有一个属性 `__proto__` 指向构造函数的 prototype 原型对象，之所以我们对象可以使用构造函数 prototype 原型对象的属性和方法，就是因为对象有 `__proto__` 原型的存在。
- `__proto__`对象原型和原型对象 prototype 是等价的
- `__proto__`对象原型的意义就在于为对象的查找机制提供一个方向，或者说一条路线，但是它是一个非标准属性，
- 实际开发中，不可以使用这个属性，它只是内部指向原型对象 prototype

![在这里插入图片描述](https://img-blog.csdnimg.cn/5b2c2b753ea34cb8937bb538c9996035.png#pic_center)

```javascript
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
}
Star.prototype.sing = function () {
  console.log("我会唱歌");
};
var ldh = new Star("刘德华", 18);
var zxy = new Star("张学友", 19);
ldh.sing();
console.log(ldh); // 对象身上系统自己添加一个 __proto__ 指向我们构造函数的原型对象 prototype
console.log(ldh.__proto__ === Star.prototype);
// 方法的查找规则: 首先先看ldh 对象身上是否有 sing 方法,如果有就执行这个对象上的sing
// 如果没有sing 这个方法,因为有__proto__ 的存在,就去构造函数原型对象prototype身上去查找sing这个方法
```

## 1.6 constructor 构造函数

- 对象原型（`__proto__`）和构造函数（`prototype`）原型对象里面都有一个属性 constructor 属性 ，constructor 我们称为构造函数，因为它指回构造函数本身。
- constructor 主要用于记录该对象引用于哪个构造函数，它可以让原型对象重新指向原来的构造函数。
- 一般情况下，对象的方法都在构造函数的原型对象中设置。如果有多个对象的方法，我们可以给原型对象采取对象形式赋
  值，但是这样就会覆盖构造函数原型对象原来的内容，这样修改后的原型对象 constructor 就不再指向当前构造函数了。此时，我们可以在修改后的原型对象中，添加一个 constructor 指向原来的构造函数。

```javascript
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
}
// 很多情况下,我们需要手动的利用constructor 这个属性指回 原来的构造函数
// Star.prototype.sing = function() {
//     console.log('我会唱歌');
// };
// Star.prototype.movie = function() {
//     console.log('我会演电影');
// }
Star.prototype = {
  // 如果我们修改了原来的原型对象,给原型对象赋值的是一个对象,则必须手动的利用constructor指回原来的构造函数
  constructor: Star,
  sing: function () {
    console.log("我会唱歌");
  },
  movie: function () {
    console.log("我会演电影");
  },
};
var ldh = new Star("刘德华", 18);
var zxy = new Star("张学友", 19);
console.log(Star.prototype);
console.log(ldh.__proto__);
console.log(Star.prototype.constructor);
console.log(ldh.__proto__.constructor);
```

## 1.7 构造函数、实例、原型对象之间的关系

![在这里插入图片描述](https://img-blog.csdnimg.cn/d5e5c6eba01647f2a79501acf758d715.png#pic_center)

## 1.8 原型链

![在这里插入图片描述](https://img-blog.csdnimg.cn/1a64e8292bfc4a9a995c078bfca6ad94.png#pic_center)

```javascript
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
}
Star.prototype.sing = function () {
  console.log("我会唱歌");
};
var ldh = new Star("刘德华", 18);
// 1. 只要是对象就有__proto__ 原型, 指向原型对象
console.log(Star.prototype);
console.log(Star.prototype.__proto__ === Object.prototype);
// 2.我们Star原型对象里面的__proto__原型指向的是 Object.prototype
console.log(Object.prototype.__proto__);
// 3. 我们Object.prototype原型对象里面的__proto__原型  指向为 null
```

## 1.9 js 成员查找机制(规则)

① 当访问一个对象的属性（包括方法）时，首先查找这个对象自身有没有该属性。
② 如果没有就查找它的原型（也就是 **proto**指向的 prototype 原型对象）。
③ 如果还没有就查找原型对象的原型（Object 的原型对象）。
④ 依此类推一直找到 Object 为止（null）。
⑤ **proto**对象原型的意义就在于为对象成员查找机制提供一个方向，或者说一条路线。

```javascript
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
}
Star.prototype.sing = function () {
  console.log("我会唱歌");
};
Star.prototype.sex = "女";
// Object.prototype.sex = '男';
var ldh = new Star("刘德华", 18);
ldh.sex = "男";
console.log(ldh.sex);
console.log(Object.prototype);
console.log(Star.prototype);
console.log(ldh.toString());
```

## 1.10 原型对象 this 指向

- 构造函数中的 this 指向我们实例对象.
- 原型对象里面放的是方法, 这个方法里面的 this 指向的是 这个方法的调用者, 也就是这个实例对象.

```javascript
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
}
var that;
Star.prototype.sing = function () {
  console.log("我会唱歌");
  that = this;
};
var ldh = new Star("刘德华", 18);
// 1. 在构造函数中,里面this指向的是对象实例 ldh
ldh.sing();
console.log(that === ldh); //true
// 2.原型对象函数里面的this 指向的是 实例对象 ldh
```

## 1.11 扩展内置对象

- 可以通过原型对象，对原来的内置对象进行扩展自定义的方法。比如给数组增加自定义求偶数和的功能。
- 注意：数组和字符串内置对象不能给原型对象覆盖操作 `Array.prototype = {}` ，只能是 `Array.prototype.xxx = function(){}` 的方式。

```javascript
// 原型对象的应用 扩展内置对象方法
Array.prototype.sum = function() { //点的方式是在原来propotype对象基础上追加方法
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        sum += this[i];
    }
    return sum;
};
// Array.prototype = { //用对象这种方式会覆盖propotype对象
//     sum: function() {
//         var sum = 0;
//         for (var i = 0; i < this.length; i++) {
//             sum += this[i];
//         }
//         return sum;
//     }

// }
var arr = [1, 2, 3];
console.log(arr.sum());
console.log(Array.prototype);
var arr1 = new Array(11, 22, 33);
console.log(arr1.sum());
</script>
```

# 2. ES5 的继承

- ES6 之前并没有给我们提供 extends 继承。我们可以通过构造函数+原型对象模拟实现继承，被称为组合继承。

## 2.1 call()函数

- 调用这个函数, 可修改函数运行时的 this 指向

```javascript
fun.call(thisArg, arg1, arg2, ...)
```

- 参数：
  thisArg ：当前调用函数 this 的指向对象
  arg1，arg2：传递的其他参数
- 案例：

```javascript
// call 方法
function fn(x, y) {
  console.log("我想喝手磨咖啡");
  console.log(this);
  console.log(x + y);
}
var o = {
  name: "andy",
};
// fn();
// 1. call() 可以调用函数
// fn.call();
// 2. call() 可以改变这个函数的this指向 此时这个函数的this 就指向了o这个对象
fn.call(o, 1, 2);
```

## 2.2 借用构造函数继承父类型属性

- 核心原理： 通过 call() 把父类型的 this 指向子类型的 this ，这样就可以实现子类型继承父类型的属性。

```javascript
// 借用父构造函数继承属性
// 1. 父构造函数
function Father(uname, age) {
  // this 指向父构造函数的对象实例
  this.uname = uname;
  this.age = age;
}
// 2 .子构造函数
function Son(uname, age, score) {
  // this 指向子构造函数的对象实例
  Father.call(this, uname, age);
  this.score = score;
}
var son = new Son("刘德华", 18, 100);
console.log(son);
```

## 2.3 借用原型对象继承父类型方法

- 一般情况下，对象的方法都在构造函数的原型对象中设置，通过构造函数无法继承父类方法。
- 借用原型对象继承父类型方法核心原理：
  ① 将子类所共享的方法提取出来，让子类的 prototype 原型对象 = new 父类()
  ② 本质：子类原型对象等于是实例化父类，因为父类实例化之后另外开辟空间，就不会影响原来父类原型对象
  ③ 将子类的 constructor 从新指向子类的构造函数

```javascript
// 借用父构造函数继承属性
// 1. 父构造函数
function Father(uname, age) {
  // this 指向父构造函数的对象实例
  this.uname = uname;
  this.age = age;
}
Father.prototype.money = function () {
  //父构造函数的方法写在原型对象里
  console.log(100000);
};
// 2 .子构造函数
function Son(uname, age, score) {
  // this 指向子构造函数的对象实例
  Father.call(this, uname, age);
  this.score = score;
}
// Son.prototype = Father.prototype;  这样直接赋值会有问题,如果修改了子原型对象,父原型对象也会跟着一起变化
Son.prototype = new Father();
// 如果利用对象的形式修改了原型对象,别忘了利用constructor 指回原来的构造函数
Son.prototype.constructor = Son;
// 这个是子构造函数专门的方法
Son.prototype.exam = function () {
  console.log("孩子要考试");
};
var son = new Son("刘德华", 18, 100);
console.log(son);
console.log(Father.prototype);
console.log(Son.prototype.constructor);
```

## 2.4 ES6 类本质

1. class 本质还是 function
2. 类的所有方法都定义在类的 prototype 属性上
3. 类创建的实例，里面也有*proto*指向类的 prototype 原型对象
4. 所以 ES6 的类它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
5. 所以 ES6 的类其实就是语法糖：语法糖就是一种便捷写法

```javascript
//ES6之前通过构造函数+原型 实现面向对象编程
//(1)构造函数有原型对象propotype
//(2)构造函数原型对象propotype里面有constructor 指向构造函数本身
//(3)构造函数可以通过原型对象添加方法
//(4)构造函数创建的实例对象有__proto__原型指向构造函数的原型对象
//ES6 通过类实现面向对象编程
class Star {}
console.log(typeof Star);
//1.类的本质还是一个函数，可以简单认为类就是构造函数的另一种写法
//(1)类有原型对象propotype
console.log(Star.prototype);
//(2)类的原型对象propotype里面有constructor 指向类本身
console.log(Star.prototype.constructor);
//(3)类可以通过原型对象添加方法
Star.prototype.sing = function () {
  console.log("冰雨");
};
var ldh = new Star();
console.dir(ldh);
//(4)类创建的实例对象有__proto__原型指向类的原型对象
console.log(ldh.__proto__ === Star.prototype);
```

# 3. ES5 新增方法

## 3.1 数组方法

迭代(遍历)方法：forEach()、map()、filter()、some()、every()、reduce()；

### 3.1.1 forEach()

- 语法：

```javascript
array.forEach(function (currentValue, index, arr) {});
```

- 参数：
  currentValue：数组当前项的值
  index：数组当前项的索引
  arr：数组对象本身

```javascript
var arr = [1, 2, 3];
var sum = 0;
arr.forEach(function (value, index, array) {
  console.log("每个数组元素" + value);
  console.log("每个数组元素的索引号" + index);
  console.log("数组本身" + array);
  sum += value;
});
console.log(sum);
```

注意：forEach 一旦开始，无法在中间被停止，`return`也无效

### 3.1.2 filter()

- 语法：

```javascript
array.filter(function (currentValue, index, arr) {});
```

- filter() 方法**返回一个新数组**，新数组中的元素是通过检查指定数组中符合条件的所有元素,主要用于筛选数组
- 参数同上

```javascript
// filter 筛选数组
var arr = [12, 66, 4, 88, 3, 7];
var newArr = arr.filter(function (value, index) {
  // return value >= 20;
  return value % 2 === 0;
});
console.log(newArr);
```

### 3.1.3 some()

- 语法

```javascript
array.some(function (currentValue, index, arr) {});
```

- some() 方法用于查找数组中是否有满足条件的元素
- 注意它返回值是布尔值, 如果查找到这个元素, 就返回 true , 如果查找不到就返回 false.
- 如果找到第一个满足条件的元素,则终止循环. 不在继续查找.
- 参数同上

```javascript
// some 查找数组中是否有满足条件的元素
// var arr = [10, 30, 4];
// var flag = arr.some(function(value) {
//     // return value >= 20;
//     return value < 3;
// });
// console.log(flag);
var arr1 = ["red", "pink", "blue"];
var flag1 = arr1.some(function (value) {
  return value == "pink";
});
console.log(flag1);
// 1. filter 也是查找满足条件的元素 返回的是一个数组 而且是把所有满足条件的元素返回回来
// 2. some 也是查找满足条件的元素是否存在  返回的是一个布尔值 如果查找到第一个满足条件的元素就终止循环
```

- 如果查询数组中唯一的元素, 用 some 方法更合适, 在 some 里面 遇到 return true 就是终止遍历 迭代效率更高, filter 里面 return 不会终止迭代

### 3.1.4 every()

every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

```javascript
const arr = [
  { id: 1, name: "西瓜", status: true },
  { id: 2, name: "榴莲", status: true },
  { id: 3, name: "草莓", status: true },
];
const result = arr.every((item) => {
  return item.status;
});
console.log(result); //true
```

如果回调函数的每一次返回都为 truthy 值，返回 true，否则返回 false。

### 3.1.4 reduce()

`reduce()` 方法对数组中的每个元素按序执行一个由您提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

语法如下

```javascript
arr.reduce((上一次的返回值, 当前循环项) => {
  return 结果;
}, 初始值);
```

```javascript
let initialValue = 0;
let sum = [{ x: 1 }, { x: 2 }, { x: 3 }].reduce(
  (previousValue, currentValue) => previousValue + currentValue.x,
  initialValue
);
console.log(sum); // logs 6 累加
```

## 3.2 字符串方法

- `trim()` 方法会从一个字符串的两端删除空白字符。`trim()` 方法并不影响原字符串本身，它返回的是一个新的字符串。

```javascript
<input type="text"> <button>点击</button>
<div></div>
<script>
    // trim 方法去除字符串两侧空格
    var str = '   an  dy   ';
    console.log(str);
    var str1 = str.trim();
    console.log(str1);
    var input = document.querySelector('input');
    var btn = document.querySelector('button');
    var div = document.querySelector('div');
    btn.onclick = function() {
        var str = input.value.trim();
        if (str === '') {
            alert('请输入内容');
        } else {
            console.log(str);
            console.log(str.length);
            div.innerHTML = str;
        }
    }
</script>
```

## 3.3 对象方法

### 3.3.1 Object.keys()

- `Object.keys()` 方法返回一个所有元素为字符串的数组。

```javascript
// 用于获取对象自身所有的属性
var obj = {
  id: 1,
  pname: "小米",
  price: 1999,
  num: 2000,
};
var arr = Object.keys(obj);
console.log(arr);
arr.forEach(function (value) {
  console.log(value);
});
```

### 3.3.2 Object.defineProperty()

- `Object.defineProperty()` 定义新属性或修改原有的属性
- 语法

```javascript
//Object.defineProperty(obj, prop, descriptor)
Object.defineProperty(对象，修改或新增的属性名，{
		value:修改或新增的属性的值,
		writable:true/false,//如果值为false 不允许修改这个属性值
		enumerable: false,//enumerable 如果值为false 则不允许遍历
        configurable: false  //configurable 如果为false 则不允许删除这个属性 属性是否可以被删除或是否可以再次修改特性
})
```

- 参数
  ①obj：必需。目标对象
  ②prop：必需。需定义或修改的属性的名字
  ③descriptor：必需。目标属性所拥有的特性
- Object.defineProperty() 第三个参数 descriptor 说明：
  ①value: 设置属性的值
  ②writable: 值是否可以重写。true | false
  ③enumerable: 目标属性是否可以被枚举。true | false
  ④configurable: 目标属性是否可以被删除或是否可以再次修改特性 true | false

```javascript
// Object.defineProperty() 定义新属性或修改原有的属性
var obj = {
  id: 1,
  pname: "小米",
  price: 1999,
};
// 1. 以前的对象添加和修改属性的方式
// obj.num = 1000;
// obj.price = 99;
// console.log(obj);
// 2. Object.defineProperty() 定义新属性或修改原有的属性
Object.defineProperty(obj, "num", {
  value: 1000,
  enumerable: true,
});
console.log(obj);
Object.defineProperty(obj, "price", {
  value: 9.9,
});
console.log(obj);
Object.defineProperty(obj, "id", {
  // 如果值为false 不允许修改这个属性值 默认值也是false
  writable: false,
});
obj.id = 2;
console.log(obj);
Object.defineProperty(obj, "address", {
  value: "中国山东蓝翔技校xx单元",
  // 如果只为false 不允许修改这个属性值 默认值也是false
  writable: false,
  // enumerable 如果值为false 则不允许遍历, 默认的值是 false
  enumerable: false,
  // configurable 如果为false 则不允许删除这个属性 不允许再修改第三个参数里面的特性 默认为false
  configurable: false,
});
console.log(obj);
console.log(Object.keys(obj));
delete obj.address;
console.log(obj);
delete obj.pname;
console.log(obj);
Object.defineProperty(obj, "address", {
  value: "中国山东蓝翔技校xx单元",
  // 如果只为false 不允许修改这个属性值 默认值也是false
  writable: true,
  // enumerable 如果值为false 则不允许遍历, 默认的值是 false
  enumerable: true,
  // configurable 如果为false 则不允许删除这个属性 默认为false
  configurable: true,
});
console.log(obj.address);
```

# 4. 函数进阶

## 4.1 函数的定义和调用

### 4.1.1 函数的定义方式

1. 函数声明方式 function 关键字 (命名函数)
2. 函数表达式 (匿名函数)
3. new Function()

```javascript
// 1. 自定义函数(命名函数)
function fn() {}
// 2. 函数表达式 (匿名函数)
var fun = function () {};
// 3. 利用 new Function('参数1','参数2', '函数体');
var f = new Function("a", "b", "console.log(a + b)");
f(1, 2);
// 4. 所有函数都是 Function 的实例(对象)
console.dir(f);
// 5. 函数也属于对象
console.log(f instanceof Object);
```

- 注意：
  Function 里面参数都必须是字符串格式
  第三种方式执行效率低，也不方便书写，因此较少使用
  所有函数都是 Function 的实例(对象)
  函数也属于对象
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/4b2ed44f91cc4c85a394a1ce61b456e8.png#pic_center)

### 4.1.2 函数的调用方式

1. 普通函数
2. 对象的方法
3. 构造函数
4. 绑定事件函数
5. 定时器函数
6. 立即执行函数

```javascript
// 函数的调用方式
// 1. 普通函数
function fn() {
  console.log("人生的巅峰");
}
// fn();   fn.call()
// 2. 对象的方法
var o = {
  sayHi: function () {
    console.log("人生的巅峰");
  },
};
o.sayHi();
// 3. 构造函数
function Star() {}
new Star();
// 4. 绑定事件函数
// btn.onclick = function() {};   // 点击了按钮就可以调用这个函数
// 5. 定时器函数
// setInterval(function() {}, 1000);  这个函数是定时器自动1秒钟调用一次
// 6. 立即执行函数
(function () {
  console.log("人生的巅峰");
})();
// 立即执行函数是自动调用
```

## 4.2 this

### 4.2.1 函数内 this 的指向

这些 this 的指向，是当我们调用函数的时候确定的。 调用方式的不同决定了 this 的指向不同一般指向我们的调用者.

| 调用方式     | this 指向                                 |
| ------------ | ----------------------------------------- |
| 普通函数调用 | window                                    |
| 构造函数调用 | 实例对象 原型对象里面的方法也指向实例对象 |
| 对象方法调用 | 该方法所属对象                            |
| 事件绑定方法 | 绑定事件对象                              |
| 定时器函数   | window                                    |
| 立即执行函数 | window                                    |

```javascript
<button>点击</button>
<script>
    // 函数的不同调用方式决定了this 的指向不同
    // 1. 普通函数 this 指向window
    function fn() {
        console.log('普通函数的this' + this);
    }
    window.fn(); //window
    // 2. 对象的方法 this指向的是对象 o
    var o = {
        sayHi: function() {
            console.log('对象方法的this:' + this);
        }
    }
    o.sayHi(); //o
    // 3. 构造函数 this 指向 ldh 这个实例对象 原型对象里面的this 指向的也是 ldh这个实例对象
    function Star() {};
    Star.prototype.sing = function() {
    }
    var ldh = new Star();
    // 4. 绑定事件函数 this 指向的是函数的调用者 btn这个按钮对象
    var btn = document.querySelector('button');
    btn.onclick = function() {
        console.log('绑定时间函数的this:' + this);
    };
    // 5. 定时器函数 this 指向的也是window
    window.setTimeout(function() {
        console.log('定时器的this:' + this);
    }, 1000);
    // 6. 立即执行函数 this还是指向window
    (function() {
        console.log('立即执行函数的this' + this);
    })();
</script>
```

### 4.2.2 改变函数内部 this 指向

JavaScript 为我们专门提供了一些函数方法来帮我们更优雅的处理函数内部 this 的指向问题，常用的有 bind()、call()、apply() 三种方法。
1、call 方法

- call() 方法调用一个对象。简单理解为调用函数的方式，但是它可以改变函数的 this 指向
- 语法

```javascript
fun.call(thisArg, arg1, arg2, ...)
```

- 注意：
  thisArg：在 fun 函数运行时指定的 this 值
  arg1，arg2：传递的其他参数
  返回值就是函数的返回值，因为它就是调用函数
  因此当我们想改变 this 指向，同时想调用这个函数的时候，可以使用 call，比如继承

```javascript
var o = {
  name: "andy",
};
function fn(a, b) {
  console.log(this);
  console.log(a + b);
}
fn.call(o, 1, 2);
// call 第一个可以调用函数 第二个可以改变函数内的this 指向
// call 的主要作用可以实现继承
function Father(uname, age, sex) {
  this.uname = uname;
  this.age = age;
  this.sex = sex;
}

function Son(uname, age, sex) {
  Father.call(this, uname, age, sex);
}
var son = new Son("刘德华", 18, "男");
console.log(son);
```

2、apply 方法

- apply() 方法调用一个函数。简单理解为调用函数的方式，但是它可以改变函数的 this 指向。
- 语法

```javascript
fun.apply(thisArg, [argsArray]);
```

- 注意
  thisArg：在 fun 函数运行时指定的 this 值
  argsArray：传递的值，必须包含在数组里面
  返回值就是函数的返回值，因为它就是调用函数
  因此 apply 主要跟数组有关系，比如使用 Math.max() 求数组的最大值

```javascript
var o = {
  name: "andy",
};
function fn(arr) {
  console.log(this);
  console.log(arr); // 打印的是字符串'pink'
}
fn.apply(o, ["pink"]); // 传的是数组
// 1. 也是调用函数 第二个可以改变函数内部的this指向
// 2. 但是他的参数必须是数组(伪数组)
// 3. apply 的主要应用 比如说我们可以利用 apply 借助于数学内置对象求数组最大值
// Math.max();
var arr = [1, 66, 3, 99, 4];
var max = Math.max.apply(Math, arr);
```

3、bind 方法

- bind() 方法**不会**调用函数。但是能改变函数内部 this 指向
- 语法

```javascript
fun.bind(thisArg, arg1, arg2, ...)
```

- 参数
  thisArg：在 fun 函数运行时指定的 this 值
  arg1，arg2：传递的其他参数
  返回由指定的 this 值和初始化参数改造的原函数拷贝
  因此当我们只是想改变 this 指向，并且不想调用这个函数的时候，可以使用 bind

```javascript
<button>点击</button>
<button>点击</button>
<button>点击</button>
<script>
    var o = {
        name: 'andy'
    };
    function fn(a, b) {
        console.log(this);
        console.log(a + b);
    };
    var f = fn.bind(o, 1, 2); //本身不会调用函数，返回值为一个函数
    f(); //通过返回值来调用
    // 1. 不会调用原来的函数   可以改变原来函数内部的this 指向
    // 2. 返回的是原函数改变this之后产生的新函数
    // 3. 如果有的函数我们不需要立即调用,但是又想改变这个函数内部的this指向此时用bind
    // 4. 我们有一个按钮,当我们点击了之后,就禁用这个按钮,3秒钟之后开启这个按钮
    // var btn1 = document.querySelector('button');
    // btn1.onclick = function() {
    //     this.disabled = true; // 这个this 指向的是 btn 这个按钮
    //     // var that = this;
    //     setTimeout(function() {
    //         // that.disabled = false; // 定时器函数里面的this 指向的是window
    //         this.disabled = false; // 此时定时器函数里面的this 指向的是btn
    //     }.bind(this), 3000); // 这个this 指向的是btn 这个对象
    // }
    var btns = document.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function() {
            this.disabled = true;
            setTimeout(function() {
                this.disabled = false;
            }.bind(this), 2000);
        }
    }
</script>
```

4、call apply bind 总结

- 相同点:
  都可以改变函数内部的 this 指向.
- 区别:
  ①call 和 apply 会调用函数, 并且改变函数内部 this 指向.
  ②call 和 apply 传递的参数不一样, call 传递参数 aru1, aru2..形式 apply 必须数组形式[arg]
  ③bind 不会调用函数, 可以改变函数内部 this 指向.
- 主要应用场景:
  ①call 经常做继承.
  ②apply 经常跟数组有关系. 比如借助于数学对象实现数组最大值最小值
  ③bind 不调用函数,但是还想改变 this 指向. 比如改变定时器内部的 this 指向.

## 4.3 严格模式

### 4.3.1 什么是严格模式

- avaScript 除了提供正常模式外，还提供了严格模式（strict mode）。ES5 的严格模式是采用具有限制性
- 严格模式在 IE10 以上版本的浏览器中才会被支持，旧版本浏览器中会被忽略。
- 严格模式对正常的 JavaScript 语义做了一些更改：
  ① 消除了 Javascript 语法的一些不合理、不严谨之处，减少了一些怪异行为。
  ② 消除代码运行的一些不安全之处，保证代码运行的安全。
  ③ 提高编译器效率，增加运行速度。
  ④ 禁用了在 ECMAScript 的未来版本中可能会定义的一些语法，为未来新版本的 Javascript 做好铺垫。比如一些保留字如：class, enum, export, extends, import, super 不能做变量名

### 4.3.2 开启严格模式

严格模式可以应用到整个脚本或个别函数中。因此在使用时，我们可以将严格模式分为为脚本开启严格模式和为函数开启严格模式两种情况。

- 为脚本开启严格模式
  为整个脚本文件开启严格模式，需要在所有语句之前放一个特定语句`"use strict";`因为`"use strict"`加了引号，所以老版本的浏览器会把它当作一行普通字符串而忽略。

```javascript
<!-- 为整个脚本(script标签)开启严格模式 -->
<script>
    'use strict';
    //下面的js 代码就会按照严格模式执行代码
</script>
<script>
    (function() {
    //有的 script 基本是严格模式，有的 script 脚本是正常模式，这样不
    //利于文件合并，所以可以将整个脚本文件放在一个立即执行的匿名函数之中。
    //这样独立创建一个作用域而不影响其他 script 脚本文件。
        'use strict';
    })();
</script>
```

- 为函数开启严格模式
  给某个函数开启严格模式，需要把“use strict”; (或 'use strict'; ) 声明放在函数体所有语句之前。

```javascript
function fn() {
  "use strict";
  return "这是严格模式。";
}
```

### 4.3.3 严格模式中的变化

严格模式对 Javascript 的语法和行为，都做了一些改变。

- 1、变量规定
  ① 在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种用法，变量都必须先用 var 命令声明，然后再使用。
  ② 严禁删除已经声明变量。例如，delete x; 语法是错误的。

```javascript
"use strict";
// 1. 我们的变量名必须先声明再使用
// num = 10;
// console.log(num);
var num = 10;
console.log(num);
// 2.我们不能随意删除已经声明好的变量
// delete num;
```

- 2、严格模式下 this 指向问题
  ① 以前在全局作用域函数中的 this 指向 window 对象。
  ② 严格模式下全局作用域中函数中的 this 是 undefined。
  ③ 以前构造函数时不加 new 也可以 调用,当普通函数，this 指向全局对象
  ④ 严格模式下,如果 构造函数不加 new 调用, this 指向的是 undefined 如果给他赋值则 会报错
  ⑤ new 实例化的构造函数指向创建的对象实例。
  ⑥ 定时器 this 还是指向 window 。
  ⑦ 事件、对象还是指向调用者。

```javascript
//严格模式下全局作用域中函数中的 this 是 undefined。
function fn() {
  console.log(this); // undefined。
}
fn();
//严格模式下,如果 构造函数不加new调用, this 指向的是undefined 如果给他赋值则 会报错.
function Star() {
  this.sex = "男";
}
//Star();
var ldh = new Star();
console.log(ldh.sex);
// 5. 定时器 this 还是指向 window
setTimeout(function () {
  console.log(this);
}, 2000);
```

- 3、函数变化
  ① 函数不能有重名的参数。
  ② 函数必须声明在顶层.新版本的 JavaScript 会引入“块级作用域”（ ES6 中已引入）。为了与新版本接轨，不允许在非函数的代码块内声明函数。
  更多严格模式要求参考：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)

## 4.4 高阶函数

高阶函数是对其他函数进行操作的函数，它接收函数作为参数或将函数作为返回值输出。
函数也是一种数据类型，同样可以作为参数，传递给另外一个参数使用。 最典型的就是作为回调函数。同理函数也可以作为返回值传递回来

```javascript
<script>
	function fn(callback){
		callback&&callback();
	}
	fn(function(){alert('hi')}
</script>
<script>
	function fn(){
		return function() {}
	}
	fn();
</script>
```

案例：

```javascript
<div></div>
<script>
    // 高阶函数- 函数可以作为参数传递
    function fn(a, b, callback) {
        console.log(a + b);
        callback && callback();
    }
    fn(1, 2, function() {
        console.log('我是最后调用的');
    });
    document.querySelector("div").animate({
        left: 500
    }, function() {
         document.querySelector("div").css("backgroundColor", "purple");
    })
</script>
```

## 4.5 闭包

### 4.5.1 变量作用域

变量根据作用域的不同分为两种：全局变量和局部变量。

1. 函数内部可以使用全局变量。
2. 函数外部不可以使用局部变量。
3. 当函数执行完毕，本作用域内的局部变量会销毁。

### 4.5.2 什么是闭包

闭包（closure）指有权访问另一个函数作用域中变量的函数。简单理解就是 ，一个作用域可以访问另外一个函数内部的局部变量。

```javascript
// 闭包: 我们fun 这个函数作用域 访问了另外一个函数 fn 里面的局部变量 num
function fn1() {
  // fn1 就是闭包函数
  var num = 10;
  function fn2() {
    console.log(num); // 10
  }
  fn2();
}
fn1();
```

### 4.5.3 chrome 中调试闭包

1. 打开浏览器，按 F12 键启动 chrome 调试工具。
2. 设置断点。
3. 找到 Scope 选项（Scope 作用域的意思）。
4. 当我们重新刷新页面，会进入断点调试，Scope 里面会有两个参数（global 全局作用域、local 局部作用域）。
5. 当执行到 fn2() 时，Scope 里面会多一个 Closure 参数 ，这就表明产生了闭包。

![在这里插入图片描述](https://img-blog.csdnimg.cn/8de714dfa5c94c95b647aba0be6164b4.png#pic_center)

### 4.5.4 闭包的作用

- 延伸变量的作用范围。

```javascript
// 我们fn 外面的作用域可以访问fn 内部的局部变量
// 闭包的主要作用: 延伸了变量的作用范围
function fn() {
  var num = 10;
  // function fun() {
  //     console.log(num);
  // }
  // return fun;
  return function () {
    console.log(num);
  };
}
var f = fn();
f();
// 类似于
// var f = function() {
//         console.log(num);
//     }
// var f =  function fun() {
//         console.log(num);
//     }
```

### 4.5.5 闭包案例

应用一：点击 li 输出当前 li 的索引号

```javascript
<ul class="nav">
    <li>榴莲</li>
    <li>臭豆腐</li>
    <li>鲱鱼罐头</li>
    <li>大猪蹄子</li>
</ul>
<script>
    // 闭包应用-点击li输出当前li的索引号
    // 1. 我们可以利用动态添加属性的方式
    var lis = document.querySelector('.nav').querySelectorAll('li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function() {
            // console.log(i);
            console.log(this.index);

        }
    }
    // 2. 利用闭包的方式得到当前小li 的索引号
    for (var i = 0; i < lis.length; i++) {
        // 利用for循环创建了4个立即执行函数
        // 立即执行函数也成为小闭包因为立即执行函数里面的任何一个函数都可以使用它的i这变量
        (function(i) {
            // console.log(i);
            lis[i].onclick = function() {
                console.log(i);

            }
        })(i);
    }
```

应用二：定时器中的闭包

```javascript
<ul class="nav">
    <li>榴莲</li>
    <li>臭豆腐</li>
    <li>鲱鱼罐头</li>
    <li>大猪蹄子</li>
</ul>
<script>
    // 闭包应用-3秒钟之后,打印所有li元素的内容
    var lis = document.querySelector('.nav').querySelectorAll('li');
    for (var i = 0; i < lis.length; i++) {
        (function(i) {
            setTimeout(function() {
                console.log(lis[i].innerHTML);
            }, 3000)
        })(i);
    }
</script>
```

应用三：打车价格

```javascript
// 闭包应用-计算打车价格
// 打车起步价13(3公里内),  之后每多一公里增加 5块钱.  用户输入公里数就可以计算打车价格
// 如果有拥堵情况,总价格多收取10块钱拥堵费
// function fn() {};
// fn();
var car = (function () {
  var start = 13; // 起步价  局部变量
  var total = 0; // 总价  局部变量
  return {
    // 正常的总价
    price: function (n) {
      if (n <= 3) {
        total = start;
      } else {
        total = start + (n - 3) * 5;
      }
      return total;
    },
    // 拥堵之后的费用
    yd: function (flag) {
      return flag ? total + 10 : total;
    },
  };
})();
console.log(car.price(5)); // 23
console.log(car.yd(true)); // 33
console.log(car.price(1)); // 13
console.log(car.yd(false)); // 13
```

思考题：

```javascript
// 思考题 1：
var name = "The Window";
var object = {
  name: "My Object",
  getNameFunc: function () {
    return function () {
      return this.name;
    };
  },
};
console.log(object.getNameFunc()()); // The Window
var f = object.getNameFunc();
// 类似于
var f = function () {
  return this.name;
};
f();
// 思考题 2：
// var name = "The Window";
// var object = {
//     name: "My Object",
//     getNameFunc: function() {
//         var that = this;
//         return function() {
//             return that.name;
//         };
//     }
// };
// console.log(object.getNameFunc()()) // My Object
```

## 4.6 递归

- 如果一个函数在内部可以调用其本身，那么这个函数就是递归函数。
- 由于递归很容易发生“栈溢出”错误（stack overflow），所以必须要加退出条件 return。
  案例一：利用递归函数求 n 的阶乘

```javascript
// 利用递归函数求1~n的阶乘 1 * 2 * 3 * 4 * ..n
function fn(n) {
  if (n == 1) {
    return 1;
  }
  return n * fn(n - 1);
}
console.log(fn(3));
console.log(fn(4));
// 详细思路 假如用户输入的是3
//return  3 * fn(2)
//return  3 * (2 * fn(1))
//return  3 * (2 * 1)
//return  3 * (2)
//return  6
```

案例二：利用递归函数求斐波那契数列

```javascript
// 利用递归函数求斐波那契数列(兔子序列)  1、1、2、3、5、8、13、21...
// 用户输入一个数字 n 就可以求出 这个数字对应的兔子序列值
// 我们只需要知道用户输入的n 的前面两项(n-1 n-2)就可以计算出n 对应的序列值
function fb(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fb(n - 1) + fb(n - 2);
}
console.log(fb(3));
console.log(fb(6));
```

## 4.7 深/浅拷贝

- 浅拷贝只拷贝一层，更深层次对象级别的只拷贝引用。

```javascript
var obj = {
  id: 1,
  name: "andy",
  msg: {
    age: 18,
  },
};
var o = {};
// for (var k in obj) {
//     // k 是属性名   obj[k] 属性值
//     o[k] = obj[k];
// }
// console.log(o);
// o.msg.age = 20;
// console.log(obj);

console.log("--------------");
Object.assign(o, obj); // es6
console.log(o);
o.msg.age = 20;
console.log(obj);
```

- 深拷贝拷贝多层，每一级别的数据都会拷贝。

```javascript
// 深拷贝拷贝多层, 每一级别的数据都会拷贝.
var obj = {
  id: 1,
  name: "andy",
  msg: {
    age: 18,
  },
  color: ["pink", "red"],
};
var o = {};
// 封装函数
function deepCopy(newobj, oldobj) {
  for (var k in oldobj) {
    // 判断我们的属性值属于那种数据类型
    // 1. 获取属性值  oldobj[k]
    var item = oldobj[k];
    // 2. 判断这个值是否是数组
    if (item instanceof Array) {
      //这里要先判断数组，因为数组也属于对象
      newobj[k] = [];
      deepCopy(newobj[k], item);
    } else if (item instanceof Object) {
      // 3. 判断这个值是否是对象
      newobj[k] = {};
      deepCopy(newobj[k], item);
    } else {
      // 4. 属于简单数据类型
      newobj[k] = item;
    }
  }
}
deepCopy(o, obj);
console.log(o);
```

# 5. 正则表达式

## 5.1 什么是正则表达式

- 正则表达式（ Regular Expression ）是用于匹配字符串中字符组合的模式。在 JavaScript 中，正则表达式也是对象。
- 正则表通常被用来检索、替换那些符合某个模式（规则）的文本，例如验证表单：用户名表单只能输入英文字母、数字或者下划线， 昵称输入框中可以输入中文(匹配)。此外，正则表达式还常用于过滤掉页面内容中的一些敏感词(替换)，或从字符串中获取我们想要的特定部分(提取)等 。
- 特点：
  ① 灵活性、逻辑性和功能性非常的强。
  ② 可以迅速地用极简单的方式达到字符串的复杂控制。
  ③ 实际开发,一般都是直接复制写好的正则表达式. 但是要求会使用正则表达式并且根据实际情况修改正则表达式. 比如用户名: `/^[a-z0-9_-]{3,16}$/`

## 5.2 创建正则表达式

方式一：通过调用 RegExp 对象的构造函数创建

```javascript
var 变量名 = new RegExp(/表达式/);
```

方式二：通过字面量创建

```javascript
var 变量名 = /表达式/;
```

## 5.3 测试正则表达式 test

- test() 正则对象方法，用于检测字符串是否符合该规则，该对象会返回 true 或 false，其参数是测试字符串。

```javascript
regexObj.test(str);
```

- regexObj 是写的正则表达式
- str 我们要测试的文本
- 例子：

```javascript
// 1. 利用 RegExp对象来创建 正则表达式
var regexp = new RegExp(/123/);
console.log(regexp);
// 2. 利用字面量创建 正则表达式
var rg = /123/;
// 3.test 方法用来检测字符串是否符合正则表达式要求的规范
console.log(rg.test(123));
console.log(rg.test("abc"));
```

## 5.4 正则表达式的组成

- 一个正则表达式可以由简单的字符构成，比如 /abc/，也可以是简单和特殊字符的组合，比如 /ab\*c/ 。其中特殊字符也被称为元字符，在正则表达式中是具有特殊意义的专用符号，如 ^ 、$ 、+ 等。
- 特殊字符非常多，可以参考：
  ①MDN：[https://developer.mozilla.org/zhCN/docs/Web/JavaScript/Guide/Regular_Expressions](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
  ②jQuery 手册：正则表达式部分
  ③ 正则测试工具: [https://c.runoob.com/](https://c.runoob.com/)

## 5.5 正则表达式特殊字符

### 5.5.1 边界符

正则表达式中的边界符（位置符）用来提示字符所处的位置，主要有两个字符。
|边界符| 说明 |
|--|--|
| ^ | 表示匹配行首的文本(以谁开始) |
| $ | 表示匹配行尾的文本(以谁结束) |

如果 ^ 和 $ 在一起，表示必须是精确匹配。

```javascript
// 边界符 ^ $
var rg = /abc/; // 正则表达式里面不需要加引号 不管是数字型还是字符串型
// /abc/ 只要包含有abc这个字符串返回的都是true
console.log(rg.test("abc")); // true
console.log(rg.test("abcd")); // true
console.log(rg.test("aabcd")); // true
console.log("---------------------------");
var reg = /^abc/;
console.log(reg.test("abc")); // true
console.log(reg.test("abcd")); // true
console.log(reg.test("aabcd")); // false
console.log("---------------------------");
var reg1 = /^abc$/; // 精确匹配 要求必须是 abc字符串才符合规范
console.log(reg1.test("abc")); // true
console.log(reg1.test("abcd")); // false
console.log(reg1.test("aabcd")); // false
console.log(reg1.test("abcabc")); // false
```

### 5.5.2 字符类

字符类表示有一系列字符可供选择，只要匹配其中一个就可以了。所有可供选择的字符都放在方括号内。

- [] 方括号

```javascript
// 字符类: [] 表示有一系列字符可供选择，只要匹配其中一个就可以了
var rg = /[abc]/; // 只要包含有a 或者 包含有b 或者包含有c 都返回为true
console.log(rg.test("andy")); //true
console.log(rg.test("baby")); // true
console.log(rg.test("color")); // true
console.log(rg.test("red")); //false
var rg1 = /^[abc]$/; // 三选一 只有是a 或者是 b  或者是c 这三个字母才返回 true
console.log(rg1.test("aa")); //false
console.log(rg1.test("a")); //true
console.log(rg1.test("b")); //true
console.log(rg1.test("c")); //true
console.log(rg1.test("abc")); //false
```

- [-] 方括号内部 范围符-

```javascript
var reg = /^[a-z]$/; // 26个英文字母任何一个字母返回 true  - 表示的是a 到z 的范围
console.log(reg.test("a")); //true
console.log(reg.test("z")); //false
console.log(reg.test(1)); //false
console.log(reg.test("A")); //false
// 字符组合
var reg1 = /^[a-zA-Z0-9_-]$/; // 26个英文字母(大写和小写都可以)任何一个字母和_-字符返回 true
console.log(reg1.test("a")); //true
console.log(reg1.test("B")); //true
console.log(reg1.test(8)); //true
console.log(reg1.test("-")); //true
console.log(reg1.test("_")); //true
console.log(reg1.test("!")); //false
console.log("----------------");
// 如果中括号里面有^ 表示取反的意思 千万和我们边界符 ^ 别混淆
var reg2 = /^[^a-zA-Z0-9_-]$/;
console.log(reg2.test("a")); //false
console.log(reg2.test("B")); //false
console.log(reg2.test(8)); //false
console.log(reg2.test("-")); //false
console.log(reg2.test("_")); //false
console.log(reg2.test("!")); //true
```

方括号内部加上 ^ 表示取反，只要包含方括号内的字符，都返回 false 。 注意和边界符 ^ 区别

### 5.5.3 量词符

量词符用来设定某个模式出现的次数。
| 量词 | 说明 |
|--|--|
| \* | 重复零次或更多次 |
| + | 重复一次或更多次 |
| ? | 重复零次或一次 |
| {n} | 重复 n 次 |
| {n,} | 重复 n 次或更多次 |
| {n,m} | 重复 n 到 m 次 |

```javascript
//  量词是设定某个模式出现的次数
var reg = /^[a-zA-Z0-9_-]{6,16}$/; // 这个模式用户只能输入英文字母 数字 下划线 短横线但是有边界符和[] 这就限定了只能多选1
// {6,16}  中间不要有空格
console.log(reg.test("a")); // false
console.log(reg.test("8")); // false
console.log(reg.test("18")); // false
console.log(reg.test("aa")); // false
console.log("-------------");
console.log(reg.test("andy-red")); //true
console.log(reg.test("andy_red")); //true
console.log(reg.test("andy007")); //true
console.log(reg.test("andy!007")); // false
```

### 5.5.4 括号总结

大括号：量词符. 里面表示重复次数
中括号：字符集合。匹配方括号中的任意字符.
小括号：表示优先级

```javascript
// 中括号 字符集合.匹配方括号中的任意字符.
var reg = /^[abc]$/;
// a 也可以 b 也可以 c 可以
// 大括号  量词符. 里面表示重复次数
var reg1 = /^abc{3}$/; // 它只是让c重复三次   abccc
console.log(reg1.test("abc")); //false
console.log(reg1.test("abcabcabc")); //false
console.log(reg1.test("abccc")); //true
// 小括号 表示优先级
var reg2 = /^(abc){3}$/; // 它是让abc重复三次
console.log(reg2.test("abc")); //false
console.log(reg2.test("abcabcabc")); //true
console.log(reg2.test("abccc")); //false
```

### 5.5.5 预定义类

| 预定类 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| \d     | 匹配 0-9 之间的任一数字，相当于[0-9]                         |
| \D     | 匹配所有 0-9 以外的字符，相当于[ ^ 0-9]                      |
| \w     | 匹配任意的字母、数字和下划线,相当于[A-Za-z0-9_ ]             |
| \W     | 除所有字母、数字、和下划线以外的字符，相当于[ ^A-Za-z0-9_ ]  |
| \s     | 匹配空格（包括换行符，制表符，空格符等），相当于[\t\r\n\v\f] |
| \S     | 匹配非空格的字符，相当于[^\t\r\n\v\f]                        |

```javascript
// 座机号码验证:  全国座机号码  两种格式:   010-12345678  或者  0530-1234567
// 正则里面的或者 符号  |
var reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
```

### 5.5.6 正则表达式替换

- replace() 方法可以实现替换字符串操作，用来替换的参数可以是一个字符串或是一个正则表达式。
- 语法：

```javascript
stringObject.replace(regexp / substr, replacement);
```

- 注意点
  ① 第一个参数: 被替换的字符串 或者 正则表达式
  ② 第二个参数: 替换为的字符串
  ③ 返回值是一个替换完毕的新字符串

```javascript
var str = "andy和red";
var newStr = str.replace(/andy/, "baby");
console.log(newStr);
```

- 正则表达式参数`/表达式/[switch]`
  switch(也称为修饰符) 按照什么样的模式来匹配. 有三种值：
  ①g：全局匹配
  ②i：忽略大小写
  ③gi：全局匹配 + 忽略大小写

```javascript
<textarea name="" id="message"></textarea> <button>提交</button>
<script>
    var text = document.querySelector('textarea');
    var btn = document.querySelector('button');
    var div = document.querySelector('div');
    btn.onclick = function() {
        div.innerHTML = text.value.replace(/姬情|激情/g, '**');
    }
</script>
```
