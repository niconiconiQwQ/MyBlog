---
title: JS 基础+DOM+BOM
date: 2022/05/04 07:54 #手动设置最后更新时间
categories: [javascript] # 标签
stick: false # 是否置顶
description: JS 基础+DOM+BOM操作
keyword: javascript js
---

# JS 基础+DOM+BOM

# 1. JavaScript 简介

## 1.1 JavaScript 是什么

- JavaScript 是一种运行在客户端的脚本语言 （Script 是脚本的意思）
- 脚本语言：不需要编译，运行过程中由 js 解释器( js 引擎）逐行来进行解释并执行
- 现在也可以基于 Node.js 技术进行服务器端编程

## 1.2 JavaScript 的作用

① 表单动态校验（密码强度检测） （ JS 产生最初的目的 ）
② 网页特效
③ 服务端开发(Node.js)
④ 桌面程序(Electron)
⑤ App(Cordova)
⑥ 控制硬件-物联网(Ruff)
⑦ 游戏开发(cocos2d-js)

## 1.3 浏览器执行 JS

浏览器分成两部分：渲染引擎和 JS 引擎

- **渲染引擎**：用来解析 HTML 与 CSS，俗称内核，比如 chrome 浏览器的 blink ，老版本的 webkit
- **JS 引擎**：也称为 JS 解释器。 用来读取网页中的 JavaScript 代码，对其处理后运行，比如 chrome 浏览器的 V8
- 浏览器本身并不会执行 JS 代码，而是通过内置 JavaScript 引擎(解释器) 来执行 JS 代码 。JS 引擎执行代码时逐行解释每一句源码（转换为机器语言），然后由计算机去执行，所以 JavaScript 语言归为脚本语言，会逐行解释执行。

## 1.4 JS 的组成

![在这里插入图片描述](https://img-blog.csdnimg.cn/76716a271b5b4fddb9243e587c27648a.png#pic_center)

- 1、ECMAScript

ECMAScript 是由 ECMA 国际（ 原欧洲计算机制造商协会）进行标准化的一门编程语言，这种语言在万维网上应用广泛，它往往被称为 JavaScript 或 JScript，但实际上后两者是 ECMAScript 语言的实现和扩展。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2cfa3adbb5a343bf96d2b368b5b237ab.png#pic_center)
ECMAScript 规定了 JS 的编程语法和基础核心知识，是所有浏览器厂商共同遵守的一套 JS 语法工业标准。

- 2、DOM ——文档对象模型
  文档对象模型（Document Object Model，简称 DOM），是 W3C 组织推荐的处理可扩展标记语言的标准编程接口。通过 DOM 提供的接口可以对页面上的各种元素进行操作（大小、位置、颜色等）。
- 3、BOM ——浏览器对象模型
  BOM (Browser Object Model，简称 BOM) 是指浏览器对象模型，它提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。通过 BOM 可以操作浏览器窗口，比如弹出框、控制浏览器跳转、获取分辨率等。

## 1.5 js 引用

- 1、行内式

```css
<input type="button" value="点我试试" onclick="alert('Hello World')" />
```

① 可以将单行或少量 JS 代码写在 HTML 标签的事件属性中（以 on 开头的属性），如：onclick
② 注意单双引号的使用：在 HTML 中推荐使用双引号, JS 中推荐使用单引号
③ 可读性差， 在 html 中编写 JS 大量代码时，不方便阅读；

- 2、内嵌 JS

```css
 <script>
    alert('Hello  World~!');
 </script>
```

可以将多行 JS 代码写到 `<script>` 标签中

- 3、外部 JS 文件

```css
<script src="my.js"></script>
```

① 利于 HTML 页面代码结构化，把大段 JS 代码独立到 HTML 页面之外，既美观，也方便文件级别的复用
② 引用外部 JS 文件的 script 标签中间不可以写代码
③ 适合于 JS 代码量比较大的情况

## 1.6 JS 注释

- 单行注释

```css
// 我是一行文字，不想被 JS引擎 执行，所以注释起来
```

- 多行注释

```css
/*
  获取用户年龄和姓名
  并通过提示框显示出来
*/
```

## 1.7 JS 输入输出语句

- alert() 主要用来显示消息给用户，console.log() 用来给程序员自己看运行时的消息。

| 方法             | 说明                           | 归属   |
| ---------------- | ------------------------------ | ------ |
| alert(msg)       | 浏览器弹出警示框               | 浏览器 |
| console.log(msg) | 浏览器控制台打印输出信息       | 浏览器 |
| prompt(info)     | 浏览器弹出输入框，用户可以输入 | 浏览器 |

## 1.8 扩展知识

### 1.8.1 解释&编译型语言

计算机不能直接理解任何除机器语言以外的语言，所以必须要把程序员所写的程序语言翻译成机器语言才能执行程序。程序语言翻译成机器语言的工具，被称为翻译器。

![在这里插入图片描述](https://img-blog.csdnimg.cn/96fa56ecc46a43a38c1ea87eb2a97bb1.png#pic_center)

- 翻译器翻译的方式有两种：一个是编译，另外一个是解释。两种方式之间的区别在于翻译的时间点不同
- 编译器是在代码执行之前进行编译，生成中间代码文件
- 解释器是在运行时进行及时解释，并立即执行(当编译器以解释方式运行的时候，也称之为解释器)
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/bf4692894a5f41939d074d615c72bd55.png#pic_center)

### 1.8.2 标识符关键字保留字

- 标识符
  标识(zhi)符：就是指开发人员为变量、属性、函数、参数取的名字。
  标识符不能是关键字或保留字。

- 关键字
  关键字：是指 JS 本身已经使用了的字，不能再用它们充当变量名、方法名。
  包括：break、case、catch、continue、default、delete、do、else、finally、for、function、if、in、 instanceof、new、return、switch、this、throw、try、typeof、var、void、while、with 等。
- 保留字
  保留字：实际上就是预留的“关键字”，意思是现在虽然还不是关键字，但是未来可能会成为关键字，同样不 能使用它们当变量名或方法名。
  包括：boolean、byte、char、class、const、debugger、double、enum、export、extends、 fimal、float、goto、implements、import、int、interface、long、mative、package、 private、protected、public、short、static、super、synchronized、throws、transient、 volatile 等。
  **注意**：如果将保留字用作变量名或函数名，那么除非将来的浏览器实现了该保留字，否则很可能收不到任何错
  误消息。当浏览器将其实现后，该单词将被看做关键字，如此将出现关键字错误。

# 2. 变量

## 2.1 变量概述

- 变量是用于存放数据的容器。 我们通过可以变量名获取数据，修改数据。
- 本质：变量是程序在内存中申请的一块用来存放数据的空间。

## 2.2 变量的使用

- 声明变量

```javascript
var age; //  声明一个 名称为age 的变量
```

①var 是一个 JS 关键字，用来声明变量( variable 变量的意思 )。使用该关键字声明变量后，计算机会自动为变量分配
内存空间
②age 是程序员定义的变量名，我们要通过变量名来访问内存中分配的空间

- 赋值

```javascript
age = 10; // 给 age  这个变量赋值为 10
```

①=用来把右边的值赋给左边的变量空间中 此处代表赋值的意思
② 变量值是程序员保存到变量空间里的值

- 变量的初始化

```javascript
var age = 18; // 声明变量同时赋值为 18
```

声明一个变量并赋值， 称之为变量的初始化。

## 2.3 变量语法扩展

- 更新变量：一个变量被重新复赋值后，它原有的值就会被覆盖，变量值将以最后一次赋的值为准。

```javascript
var age = 18;
age = 81; // 最后的结果就是81因为18 被覆盖掉了
```

- 同时声明多个变量：同时声明多个变量时，只需要写一个 var， 多个变量名之间使用英文逗号隔开

```javascript
var age = 10,
  name = "zs",
  sex = 2;
```

- 声明变量特殊情况

| 情况                         | 说明                   | 结果      |
| ---------------------------- | ---------------------- | --------- |
| var age ; console.log (age); | 只声明 不赋值          | undefined |
| console.log(age)             | 不声明 不赋值 直接使用 | 报错      |
| age = 10; console.log (age); | 不声明 只赋值          | 10        |

## 2.4 变量命名规范

- 由字母(A-Za-z)、数字(0-9)、下划线(\_)、美元符号( $ )组成，如：usrAge, num01, \_name
- 严格区分大小写。var app; 和 var App; 是两个变量
- 不能以数字开头。 18age 是错误的
- 不能是关键字、保留字。例如：var、for、while
  变量名必须有意义。 MMD BBD nl → age
- 遵守驼峰命名法。首字母小写，后面单词的首字母需要大写。 myFirstName

# 3. 数据类型

## 3.1 数据类型简介

- 在计算机中，不同的数据所需占用的存储空间是不同的，为了便于把数据分成所需内存大小不同的数据，充分利用存储空间，于是定义了不同的数据类型。
- 变量是用来存储值的所在处，它们有名字和数据类型。变量的数据类型决定了如何将代表这些值的位存储到计算机的 内存中。JavaScript 是一种弱类型或者说动态语言。这意味着不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。
- 在代码运行时，变量的数据类型是由 JS 引擎 根据 = 右边变量值的数据类型来判断的，运行完毕之后， 变量就确定了数据类型。

```javascript
//JavaScript 拥有动态类型，同时也意味着相同的变量可用作不同的类型：
var x = 6; // x 为数字
var x = "Bill"; // x 为字符串
```

- JS 把数据类型分为两类：
  ① 简单数据类型 （Number,String,Boolean,Undefined,Null）
  ② 复杂数据类型 （object)

## 3.2 简单数据类型

![在这里插入图片描述](https://img-blog.csdnimg.cn/61bbc8e697b24921987923e46a25be38.png#pic_center)

### 3.2.1 数字型 Number

- 数字类型: 既可以用来保存整数值，也可以保存小数(浮点数）。

```javascript
var age = 21; // 整数
var Age = 21.3747; // 小数
```

- 数字型进制: 最常见的进制有二进制、八进制、十进制、十六进制。在 JS 中八进制前面加 0，十六进制前面加 0x

```javascript
// 1.八进制数字序列范围：0~7
var num1 = 07; // 对应十进制的7
var num2 = 019; // 对应十进制的19
var num3 = 08; // 对应十进制的8
// 2.十六进制数字序列范围：0~9以及A~F
var num = 0xa;
```

- 数字型范围: JavaScript 中数值的最大和最小值

```javascript
alert(Number.MAX_VALUE); // 1.7976931348623157e+308
alert(Number.MIN_VALUE); // 5e-324
```

- 数字型三个特殊值:
  ①Infinity ，代表无穷大，大于任何数值
  ②-Infinity ，代表无穷小，小于任何数值
  ③NaN ，Not a number，代表一个非数值

```javascript
alert(Infinity); // Infinity
alert(-Infinity); // -Infinity
alert(NaN); // NaN
```

- isNaN()
  用来判断一个变量是否为非数字的类型，返回 true 或者 false
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/3f5f71272a6643ac8d38bb8c9b29b71b.png#pic_center)

```javascript
var usrAge = 21;
var isOk = isNaN(userAge);
console.log(isNum); // false ，21 不是一个非数字
var usrName = "andy";
console.log(isNaN(userName)); // true ，"andy"是一个非数字
```

### 3.2.2 字符串型 String

- 字符串型可以是引号中的任意文本，其语法为 双引号 " " 和 单引号' '，HTML 标签里面的属性使用的是双引号，JS 这里更推荐使用单引号。

```javascript
var strMsg = "凉宫"; // 使用双引号表示字符串
var strMsg2 = "凉宫"; // 使用单引号表示字符串
// 常见错误
var strMsg3 = 凉宫; // 报错，没使用引号，会被认为是js代码，但js没有这些语法
```

- JS 可以用单引号嵌套双引号 ，或者用双引号嵌套单引号 (外双内单，外单内双)

```javascript
var strMsg = '我是"凉宫"';  // 可以用''包含""
var strMsg2 = "我是'凉宫'"; // 也可以用"" 包含''
// 常见错误
var badQuotes = 'What on earth?"; // 报错，不能 单双引号搭配
```

- 字符串转义符

| 转义符 | 解释说明                    |
| ------ | --------------------------- |
| \n     | 换行符，n 是 newline 的意思 |
| \\\    | 斜杠 \                      |
| \\'    | ' 单引号                    |
| \\"    | ”双引号                     |
| \t     | tab 缩进                    |
| \b     | 空格 ，b 是 blank 的意思    |

- 字符串长度
  字符串是由若干字符组成的，这些字符的数量就是字符串的长度。通过字符串的 length 属性可以获取整个字符串的长度。

```javascript
var strMsg = "我是凉宫";
alert(strMsg.length); // 显示 4
```

- 字符串拼接
  ① 多个字符串之间可以使用 + 进行拼接，其拼接方式为 字符串 + 任何类型 = 拼接之后的新字符串
  ② 拼接前会把与字符串相加的任何类型转成字符串，再拼接成一个新的字符串
  ③+号总结口诀：数值相加 ，字符相连

```javascript
//1.1 字符串 "相加"
alert("hello" + " " + "world"); // hello world
//1.2 数值字符串 "相加"
alert("100" + "100"); // 100100
//1.3 数值字符串 + 数值
alert("11" + 12); // 1112
```

### 3.2.3 布尔型 Boolean

- 布尔类型有两个值：true 和 false ，其中 true 表示真（对），而 false 表示假（错）。
- 布尔型和数字型相加的时候， true 的值为 1 ，false 的值为 0。

```javascript
console.log(true + 1); // 2
console.log(false + 1); // 1
```

### 3.2.4 Undefined

- 一个声明后没有被赋值的变量会有一个默认值 undefined ( 如果进行相连或者相加时，注意结果）

```javascript
var variable;
console.log(variable); // undefined
console.log("你好" + variable); // 你好undefined
console.log(11 + variable); // NaN
console.log(true + variable); //  NaN
```

### 3.2.5 Undefined

- 一个声明变量给 null 值，里面存的值为空

```javascript
var vari = null;
console.log("你好" + vari); // 你好null
console.log(11 + vari); // 11
console.log(true + vari); //  1
```

### 3.2.6 获取变量数据类型

- `typeof` 可用来获取检测变量的数据类型

```javascript
var num = 18;
console.log(typeof num); // 结果 number
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/84e2d4fc5c50482e94736246d79e30d0.png#pic_center)

### 3.2.7 字面量

字面量是在源代码中一个固定值的表示法，通俗来说，就是字面量表示如何表达这个值
① 数字字面量：8, 9, 10
② 字符串字面量：'码农', "前端"
③ 布尔字面量：true，false

## 3.3 数据类型转换

- 把一种数据类型的变量转换成另外一种数据类型。

### 3.3.1 转换为字符串

![在这里插入图片描述](https://img-blog.csdnimg.cn/cd36208dfbe142e29941c668323e2278.png#pic_center)

- toString() 和 String() 使用方式不一样。
- 三种转换方式，推荐用第三种加号拼接字符串转换方式， 这一种方式也称之为隐式转换

### 3.3.2 转换为数字型

![在这里插入图片描述](https://img-blog.csdnimg.cn/8db9eaa3f9eb4b88abd0a58e157a4e28.png#pic_center)

```javascript
console.log(parseInt("120px")); // 120 会去到这个px单位
```

- 注意 parseInt 和 parseFloat 单词的大小写，这 2 个是重点
- 隐式转换是我们在进行算数运算的时候，JS 自动转换了数据类型

### 3.3.3 转换为布尔型

![在这里插入图片描述](https://img-blog.csdnimg.cn/f475aec1115a4cde872e03a3e7ccb2a7.png#pic_center)

- 代表空、否定的值会被转换为 false ，如 ''、0、NaN、null、undefined
-     其余值都会被转换为 true

# 4. 运算符

- 运算符（operator）也被称为操作符，是用于实现赋值、比较和执行算数运算等功能的符号。

## 4.1 算数运算符

- 概念：算术运算使用的符号，用于执行两个变量或值的算术运算。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/b59d8317b7714e96815d66db8d13b0fc.png#pic_center)
- 浮点数的精度问题
  浮点数值的最高精度是 17 位小数，但在进行算术计算时其精确度远远不如整数。不要直接判断两个浮点数是否相等 !

```javascript
var result = 0.1 + 0.2; // 结果不是 0.3，而是：0.30000000000000004
console.log(0.07 * 100); // 结果不是 7，   而是：7.000000000000001
```

## 4.2 递增和递减运算符

- 如果需要反复给数字变量添加或减去 1，可以使用递增（++）和递减（ -- ）运算符来完成。
- 在 JavaScript 中，递增（++）和递减（ -- ）既可以放在变量前面，也可以放在变量后面。放在变量前面时， 我们可以称为前置递增（递减）运算符，放在变量后面时，我们可以称为后置递增（递减）运算符。
- 递增和递减运算符必须和变量配合使用。

① 前置递增运算符：++num 前置递增，先自加，后返回值

```javascript
var num = 10;
alert(++num + 10); // 21
```

② 后置递增运算符：num++ 后置递增，先返回原值，后自加

```javascript
var num = 10;
alert(10 + num++); // 20
```

总结：
① 前置递增和后置递增运算符可以简化代码的编写，让变量的值 + 1 比以前写法更简单
② 单独使用时，运行结果相同
③ 与其他代码联用时，执行结果会不同
④ 后置：先原值运算，后自加（先人后己）
⑤ 前置：先自加，后运算（先已后人）
⑥ 开发时，大多使用后置递增/减，并且代码独占一行，例如：num++; 或者 num--;

## 4.3 比较运算符

- 比较运算符（关系运算符）是两个数据进行比较时所使用的运算符，比较运算后，会返回一个布尔值（true / false）作为比较运算的结果。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/c16fedfc8be5422c99bd81e261cfbc54.png#pic_center)
- =小结
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/f97e45ee66b949c793ff4ae416ff173d.png#pic_center)

```javascript
console.log(18 == "18");
console.log(18 === "18");
```

## 4.4 逻辑运算符

- 逻辑运算符是用来进行布尔值运算的运算符，其返回值也是布尔值。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/0bec61ed0a4d493cad5d2adc52feef96.png#pic_center)
- 1、逻辑与&&: 两边都是 true 才返回 true，否则返回 false
- 2、逻辑或 || :两边都为 false 才返回 false，否则都为 true
- 3、逻辑非 ！: 也叫作取反符，用来取一个布尔值相反的值，如 true 的相反值是 false
- 4、短路运算（逻辑中断）: 当有多个表达式（值）时,左边的表达式值可以确定结果时,就不再继续运算右边的表达式的值;
  ① 语法： 表达式 1 && 表达式 2
  ② 如果第一个表达式的值为真，则返回表达式 2
  ③ 如果第一个表达式的值为假，则返回表达式 1

```javascript
console.log(123 && 456); // 456
console.log(0 && 456); // 0
console.log(123 && 456 && 789); // 789
```

- 5、逻辑中断（短路操作）
  ① 语法： 表达式 1 || 表达式 2
  ② 如果第一个表达式的值为真，则返回表达式 1
  ③ 如果第一个表达式的值为假，则返回表达式 2

```javascript
console.log(123 || 456); //  123
console.log(0 || 456); //  456
console.log(123 || 456 || 789); //  123
```

## 4.5 赋值运算符

- 用来把数据赋值给变量的运算符。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/4c807df1d80b423a8f07d0587a90f2d2.png#pic_center)

```javascript
var age = 10;
age += 5; // 相当于 age = age + 5;
age -= 5; // 相当于 age = age - 5;
age *= 10; // 相当于 age = age * 10;
```

## 4.6 运算符优先级

![在这里插入图片描述](https://img-blog.csdnimg.cn/24a8e0612cbe4615a86d2e0d758c5d12.png#pic_center)

- 一元运算符里面的逻辑非优先级很高
- 逻辑与比逻辑或优先级高

# 5. 流程控制

流程控制主要有三种结构，分别是顺序结构、分支结构和循环结构，这三种结构代表三种代码执行的顺序。
![在这里插入图片描述](https://img-blog.csdnimg.cn/92030995c3904cc2a09698b99fbb719a.png#pic_center)

## 5.1 顺序流程控制

- 顺序结构是程序中最简单、最基本的流程控制，它没有特定的语法结构，程序会按照代码的先后顺序，依次执行，程序中大多数的代码都是这样执行的。

## 5.2 分支流程控制

- 由上到下执行代码的过程中，根据不同的条件，执行不同的路径代码（执行代码多选一的过程），从而得到不同的结果

### 5.2.1 单分支

```javascript
// 条件成立执行代码，否则什么也不做
if (条件表达式) {
  // 条件成立执行的代码语句
}
```

### 5.2.2 双分支

```javascript
// 条件成立 执行 if 里面代码，否则执行else 里面的代码
if (条件表达式) {
  // [如果] 条件成立执行的代码
} else {
  // [否则] 执行的代码
}
```

### 5.2.3 多分支

```javascript
// 适合于检查多重条件。
if (条件表达式1) {
语句1；
} else if (条件表达式2)  {
语句2；
} else if (条件表达式3)  {
语句3；
....
} else {
	// 上述条件都不成立执行此处代码
}
```

### 5.2.4 三元表达式

```javascript
表达式1 ? 表达式2 : 表达式3;
```

- 如果表达式 1 为 true ，则返回表达式 2 的值，如果表达式 1 为 false，则返回表达式 3 的值
- 简单理解： 就类似于 if else （双分支） 的简写

### 5.2.5 switch 语句

- switch 语句也是多分支语句，它用于基于不同的条件来执行不同的代码。当要针对变量设置一系列的特定值 的选项时，就可以使用 switch。

```javascript
switch (表达式) {
  case value1:
    // 表达式 等于 value1 时要执行的代码
    break;
  case value2:
    // 表达式 等于 value2 时要执行的代码
    break;
  default:
  // 表达式 不等于任何一个 value 时要执行的代码
}
```

- 注意事项：
  ① 关键字 switch 后面括号内可以是表达式或值， 通常是一个变量
  ② 关键字 case , 后跟一个选项的表达式或值，后面跟一个冒号
  ③switch 表达式的值会与结构中的 case 的值做比较
  ④ 如果存在匹配全等(===) ，则与该 case 关联的代码块会被执行，并在遇到 break 时停止，整个 switch 语句代码执行结束
  ⑤ 如果所有的 case 的值都和表达式的值不匹配，则执行 default 里的代码
  ⑥ 执行 case 里面的语句时，如果没有 break，则继续执行下一个 case 里面的语句。

- switch 语句和 if else if 语句的区别
  ① 一般情况下，它们两个语句可以相互替换
  ② switch...case 语句通常处理 case 为比较确定值的情况， 而 if…else…语句更加灵活，常用于范围判断(大于、
  等于某个范围)
  ③ switch 语句进行条件判断后直接执行到程序的条件语句，效率更高。而 if…else 语句有几种条件，就得判断多少次。
  ④ 当分支比较少时，if… else 语句的执行效率比 switch 语句高。
  ⑤ 当分支比较多时，switch 语句的执行效率比较高，而且结构更清晰。

## 5.3 循环流程控制

- 要完成具有规律性的重复操作就需要重复执行某些语句
- 在程序中，一组被重复执行的语句被称之为循环体，能否继续重复执行，取决于循环的终止条件。由循环体及循环的终止条件组成的语句，被称之为循环语句

### 5.3.1 for 循环

for 循环主要用于把某些代码循环若干次，通常跟计数有关系。其语法结构如下：

```javascript
for (初始化变量; 条件表达式; 操作表达式) {
  //循环体
}
```

① 初始化变量：通常被用于初始化一个计数器，该表达式可以使用 var 关键字声明新的变量，这个变量帮我们来记录次数。
② 条件表达式：用于确定每一次循环是否能被执行。如果结果是 true 就继续循环，否则退出循环。
③ 操作表达式：每次循环的最后都要执行的表达式。通常被用于更新或者递增计数器变量。当然，递减变量也是可以的。

### 5.3.2 双重 for 循环

- 循环嵌套是指在一个循环语句中再定义一个循环语句的语法结构，例如在 for 循环语句中，可以再嵌套一个 for 循环，这样的 for 循环语句我们称之为双重 for 循环。

```javascript
for (外循环的初始; 外循环的条件; 外循环的操作表达式) {
  for (内循环的初始; 内循环的条件; 内循环的操作表达式) {
    需执行的代码;
  }
}
```

① 内层循环可以看做外层循环的语句
② 内层循环执行的顺序也要遵循 for 循环的执行顺序
③ 外层循环执行一次，内层循环要执行全部次数

### 5.3.3 while 循环

- while 语句可以在条件表达式为真的前提下，循环执行指定的一段代码，直到表达式不为真时结束循环。

```javascript
while (条件表达式) {
  // 循环体代码
}
```

① 先执行条件表达式，如果结果为 true，则执行循环体代码；如果为 false，则退出循环，执行后面代码
② 执行循环体代码
③ 循环体代码执行完毕后，程序会继续判断执行条件表达式，如条件仍为 true，则会继续执行循环体，直到循环条件为 false 时，整个循环过程才会结束

### 5.3.4 do while 循环

- do... while 语句其实是 while 语句的一个变体。该循环会先执行一次代码块，然后对条件表达式进行判断，如果条件为真，就会重复执行循环体，否则退出循环。

```javascript
do {
  // 循环体代码 - 条件表达式为 true 时重复执行循环体代码
} while (条件表达式);
```

① 先执行一次循环体代码
② 再执行条件表达式，如果结果为 true，则继续执行循环体代码，如果为 false，则退出循环，继续执行后面代码. do…while 循环语句至少会执行一次循环体代码

### 5.3.5 continue 关键字

- continue 关键字用于立即跳出本次循环，继续下一次循环（本次循环体中 continue 之后的代码就会少执行一次）。

```javascript
for (var i = 1; i <= 5; i++) {
  if (i == 3) {
    console.log("这个包子有虫子，扔掉");
    continue; // 跳出本次循环，跳出的是第3次循环
  }
  console.log("我正在吃第" + i + "个包子呢");
}
```

### 5.3.6 break 关键字

- break 关键字用于立即跳出整个循环（循环结束）。

```javascript
for (var i = 1; i <= 5; i++) {
  if (i == 3) {
    break; // 直接退出整个for 循环，跳到整个for下面的语句
  }
  console.log("我正在吃第" + i + "个包子呢");
}
```

### 5.3.7 断点调试

- 断点调试可以帮我们观察程序的运行过程
  ① 浏览器中按 F12--> sources -->找到需要调试的文件-->在程序的某一行设置断点
  ②Watch: 监视，通过 watch 可以监视变量的值的变化，非常的常用。
  ③F11: 程序单步执行，让程序一行一行的执行，这个时候，观察 watch 中变量的值的变化。

# 6. 数组

- 数组是指一组数据的集合，其中的每个数据被称作元素，在数组中可以存放任意类型的元素。

## 6.1 创建数组

### 6.1.1 利用 new 创建数组

```javascript
var 数组名 = new Array() ；
var arr = new Array(); // 创建一个新的空数组
```

### 6.1.2 利用数组字面量创建数组

```javascript
//1. 使用数组字面量方式创建空的数组
var  数组名 = []；
//2. 使用数组字面量方式创建带初始值的数组
var  数组名 = ['小白','小黑','大黄','瑞奇'];
```

- 数组的字面量是方括号 [ ]
- 声明数组并赋值称为数组的初始化

- 数组中可以存放任意类型的数据，例如字符串，数字，布尔值等。

```javascript
var arrStus = ["小白", 12, true, 28.9];
```

## 6.2 获取数组中的元素

- 数组的索引(下标) ：用来访问数组元素的序号（数组下标从 0 开始）。
- 数组可以通过索引来访问、设置、修改对应的数组元素，我们可以通过“数组名[索引]”的形式来获取数组中的元素。访问就是获取得到的意思

```javascript
// 定义数组
var arrStus = [1, 2, 3];
// 获取数组中的第2个元素
alert(arrStus[1]);
```

## 6.3 遍历数组

- 遍历: 就是把数组中的每个元素从头到尾都访问一次

```javascript
var arr = ["red", "green", "blue"];
for (var i = 0; i < arr.length; i++) {
  console.log(arrStus[i]);
}
```

- 使用“数组名.length”可以访问数组元素的数量（数组长度）。
  ① 此处数组的长度是数组元素的个数 ，不要和数组的索引号混淆。
  ② 当我们数组里面的元素个数发生了变化，这个 length 属性跟着一起变化。

## 6.4 数组中新增元素

- 可以通过修改 length 长度来实现数组扩容的目的
  length 属性是可读写的

```javascript
var arr = ["red", "green", "blue", "pink"];
arr.length = 7;
console.log(arr);
console.log(arr[4]); //索引号是 4，5，6 的空间没有给值，默认值就是 undefined。
console.log(arr[5]);
console.log(arr[6]);
```

- 通过修改数组索引新增数组元素
  可以通过修改数组索引的方式追加数组元素
  不能直接给数组名赋值，否则会覆盖掉以前的数据

```javascript
var arr = ["red", "green", "blue", "pink"];
arr[4] = "hotpink";
console.log(arr);
```

# 7. 函数

- 函数：封装了一段可被重复调用执行的代码块。通过此代码块可以实现大量代码的重复使用。

## 7.1 函数的使用

函数在使用时分为两步：声明函数和调用函数。

- 声明函数

```javascript
// 声明函数
function 函数名() {
  //函数体代码
}
```

①function 是声明函数的关键字,必须小写
② 由于函数一般是为了实现某个功能才定义的， 所以通常我们将函数名命名为动词，比如 getSum

- 调用函数

```javascript
// 调用函数
函数名(); // 通过调用函数名来执行函数体代码
```

注意：
① 调用的时候千万不要忘记添加小括号
② 声明函数本身并不会执行代码，只有调用函数时才会执行函数体代码。

- 函数的封装：函数的封装是把一个或者多个功能通过函数的方式封装起来，对外只提供一个简单的函数接口

## 7.2 函数的参数

- 在声明函数时，可以在函数名称后面的小括号中添加一些参数，这些参数被称为形参，而在调用该函数时，同样也需要传递相应的参数，这些参数被称为实参。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/36323f45274e47ee97393b0a6cfb9fe3.png#pic_center)
- 参数的作用 : 在函数内部某些值不能固定，我们可以通过参数在调用函数时传递不同的值进去。

```javascript
// 带参数的函数声明
function 函数名(形参1, 形参2 , 形参3...) { // 可以定义任意多的参数，用逗号分隔
// 函数体
}
// 带参数的函数调用
函数名(实参1, 实参2, 实参3...);
```

- 函数参数的传递过程
  ① 调用的时候实参值是传递给形参的
  ② 形参简单理解为：不用声明的变量
  ③ 实参和形参的多个参数之间用逗号（,）分隔
- 函数形参和实参个数不匹配问题
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/96a58d218ebf4742b46cf86f6dc0beee.png#pic_center)

```javascript
function sum(num1, num2) {
  console.log(num1 + num2);
}
sum(100, 200); // 形参和实参个数相等，输出正确结果
sum(100, 400, 500, 700); // 实参个数多于形参，只取到形参的个数
sum(200);
```

注意：在 JavaScript 中，形参的默认值是 undefined。

## 7.3 函数的返回值

- 有的时候，我们会希望函数将值返回给调用者，此时通过使用 return 语句就可以实现。

```javascript
// 声明函数
function 函数名（）{
	...
	return  需要返回的值；
}
// 调用函数
函数名();    // 此时调用函数就可以得到函数体内return 后面的值
```

- 注意
  ① 在使用 return 语句时，函数会停止执行，并返回指定的值,return 语句之后的代码不被执行。

```javascript
function add(num1，num2){
//函数体
return num1 + num2; // 注意：return 后的代码不执行
alert('我不会被执行，因为前面有 return');
}
var resNum = add(21,6); // 调用函数，传入两个实参，并通过 resNum 接收函数返回值
alert(resNum);          // 27
```

② 函数都是有返回值的，如果有 return 则返回 return 后面的值，如果没有 return 则返回 undefined
③return 只能返回一个值。如果用逗号隔开多个值，以最后一个为准。

```javascript
function add(num1，num2){
	//函数体
	return num1，num2;
}
var resNum = add(21,6); // 调用函数，传入两个实参，并通过 resNum 接收函数返回值
alert(resNum);          // 6
```

- break ,continue ,return 的区别
  ①break ：结束当前的循环体（如 for、while）
  ②continue ：跳出本次循环，继续执行下次循环（如 for、while）
  ③return ：不仅可以退出循环，还能够返回 return 语句中的值，同时还可以结束当前的函数体内的代码

## 7.4 arguments 的使用

- 当我们不确定有多少个参数传递的时候，可以用 arguments 来获取。在 JavaScript 中，arguments 实际上它是当前函数的一个内置对象。所有函数都内置了一个 arguments 对象，arguments 对象中存储了传递的所有实参。
- arguments 展示形式是一个伪数组，因此可以进行遍历。伪数组具有以下特点：
  ① 具有 length 属性
  ② 按索引方式储存数据
  ③ 不具有数组的 push , pop 等方法

```javascript
function maxValue() {
  var max = arguments[0];
  for (var i = 0; i < arguments.length; i++) {
    if (max < arguments[i]) {
      max = arguments[i];
    }
  }
  return max;
}
console.log(maxValue(2, 4, 5, 9));
console.log(maxValue(12, 4, 9));
```

## 7.5 函数声明方式

### 7.5.1 自定义函数方式

- 自定义函数方式(命名函数)：利用函数关键字 function 自定义函数方式。
  ① 因为有名字，所以也被称为命名函数
  ② 调用函数的代码既可以放到声明函数的前面，也可以放在声明函数的后面

```javascript
// 声明定义方式
function fn() {...}
// 调用
fn();
```

### 7.5.2 函数表达式方式

- 函数表达式方式(匿名函数）
  ① 因为函数没有名字，所以也被称为匿名函数
  ② 这个 fn 里面存储的是一个函数
  ③ 函数表达式方式原理跟声明变量方式是一致的
  ④ 函数调用的代码必须写到函数体后面

```javascript
// 这是函数表达式写法，匿名函数后面跟分号结束
var fn = function(){...}；
// 调用的方式，函数调用必须写到函数体下面
fn();
```

# 8. 作用域

- 通常来说，一段程序代码中所用到的名字并不总是有效和可用的，而限定这个名字的可用性的代码范围就是这个名字的作用域。作用域的使用提高了程序逻辑的局部性，增强了程序的可靠性，减少了名字冲突。
- JavaScript（es6 前）中的作用域有两种：
  ① 全局作用域
  ② 局部作用域（函数作用域）

## 8.1 全局作用域

- 作用于所有代码执行的环境(整个 script 标签内部)或者一个独立的 js 文件。

## 8.2 局部作用域

- 作用于函数内的代码环境，就是局部作用域。 因为跟函数有关系，所以也称为函数作用域。
- JS 没有块级作用域（在 ES6 之前），块作用域由 { } 包括。在其他编程语言中（如 java、c#等），在 if 语句、循环语句中创建的变量，仅仅只能在本 if 语句、本循环语句中使用，如下面的 Java 代码：

```javascript
if(true){
	int num = 123;
	system.out.print(num);  // 123
}
system.out.print(num);  // 报错
```

如下 js 代码：

```javascript
if (true) {
  var num = 123;
  console.log(num); //123
}
console.log(num); //123
```

## 8.3 变量的作用域

- 在 JavaScript 中，根据作用域的不同，变量可以分为两种
  ① 全局变量
  ② 局部变量

### 8.3.1 全局变量

- 在全局作用域下声明的变量叫做全局变量（在函数外部定义的变量）。
  ① 全局变量在代码的任何位置都可以使用
  ② 在全局作用域下 var 声明的变量 是全局变量
  ③ 特殊情况下，在函数内不使用 var 声明的变量也是全局变量（不建议使用）

### 8.3.2 局部变量

- 在局部作用域下声明的变量叫做局部变量（在函数内部定义的变量）
  ① 局部变量只能在该函数内部使用
  ② 在函数内部 var 声明的变量是局部变量
  ③ 函数的形参实际上就是局部变量

- 全局变量和局部变量的区别
  ① 全局变量：在任何一个地方都可以使用，只有在浏览器关闭时才会被销毁，因此比较占内存
  ② 局部变量：只在函数内部使用，当其所在的代码块被执行时，会被初始化；当代码块运行结束后，就会被销毁，因此更节省内存空间

### 8.3.3 作用域链

- 只要是代码，就至少有一个作用域
- 写在函数内部的局部作用域
- 如果函数中还有函数，那么在这个作用域中就又可以诞生一个作用域
- 根据在内部函数可以访问外部函数变量的这种机制，用链式查找决定哪些数据能被内部函数访问，就称作作用域链
- 作用域链：采取**就近原则**的方式来查找变量最终的值。

# 9. 预解析

- JavaScript 代码是由浏览器中的 JavaScript 解析器来执行的。JavaScript 解析器在运行 JavaScript 代码的时候分为两步：预解析和代码执行。
- 预解析：在当前作用域下, JS 代码执行之前，浏览器会默认把带有 var 和 function 声明的变量在内存中进行提前声明或者定义。
- 代码执行： 从上到下执行 JS 语句。
- 预解析只会发生在通过 var 定义的变量和 function 上。学习预解析能够让我们知道为什么在变量声明之前访问变量的值是 undefined，为什么在函数声明之前就可以调用函数。

## 9.1 变量预解析

- 预解析也叫做变量、函数提升, 变量的声明会被提升到当前作用域的最上面，变量的赋值不会提升。

```javascript
console.log(num); // 会报错，num is not defined
```

```javascript
console.log(num); // undefined
var num = 10;
```

## 9.2 函数预解析

- 函数预解析（函数提升）: 函数的声明会被提升到当前作用域的最上面，但是不会调用函数。

```javascript
fn();
function fn() {
  console.log("打印"); //会执行打印
}
```

```javascript
fn();
var fn = function () {
  console.log("凉宫"); //报错了，fn is not a function
};
```

# 10. 对象

- 在 JavaScript 中，对象是一组无序的相关属性和方法的集合，所有的事物都是对象，例如字符串、数值、数组、 函数等。
- 对象是由属性和方法组成的
  ① 属性：事物的特征，在对象中用属性来表示（常用名词）
  ② 方法：事物的行为，在对象中用方法来表示（常用动词）

## 10.1 创建对象

### 10.1.1 字面量创建对象

- 对象字面量：就是花括号 { } 里面包含了表达这个具体事物（对象）的属性和方法。
- { } 里面采取键值对的形式表示
  ① 键：相当于属性名
  ② 值：相当于属性值，可以是任意类型的值（数字类型、字符串类型、布尔类型，函数类型等）

```javascript
var star = {
  name: "凉宫",
  age: 15,
  sex: "女",
  sayHi: function () {
    alert("hi");
  },
};
```

- 对象的调用
  ① 对象里面的属性调用 : 对象.属性名 ，这个小点 . 就理解为“ 的 ”
  ② 对象里面属性的另一种调用方式 : 对象[‘属性名’]，注意方括号里面的属性必须加引号
  ③ 对象里面的方法调用：对象.方法名() ，注意这个方法名字后面一定加括号

```javascript
console.log(star.name); // 调用名字属性
console.log(star["name"]); // 调用名字属性
star.sayHi(); // 调用 sayHi 方法
```

- 变量、属性、函数、方法总结
  ① 变量：单独声明赋值，单独存在
  ② 属性：对象里面的变量称为属性，不需要声明，用来描述该对象的特征
  ③ 函数：单独存在的，通过“函数名()”的方式就可以调用
  ④ 方法：对象里面的函数称为方法，方法不需要声明，使用“对象.方法名()”的方式就可以调用，方法用来描述该对象的行为和功能。

### 10.1.2 new Object 创建对象

```javascript
var andy = new Obect();
andy.name = "pink";
andy.age = 18;
andy.sex = "男";
andy.sayHi = function () {
  alert("大家好啊~");
};
```

### 10.1.3 构造函数创建对象

- 构造函数 ：是一种特殊的函数，主要用来初始化对象，即为对象成员变量赋初始值，它总与 new 运算符一起使用。我们可以把对象中一些公共的属性和方法抽取出来，然后封装到这个函数里面。
- 注意：
  ① 构造函数用于创建某一类对象，其首字母要大写
  ② 创建对象的时候，必须用 new 来调用构造函数。
  ③ 函数内的属性和方法前面需要添加 this ，表示当前对象的属性和方法。
  ④ 构造函数中不需要 return 返回结果。

```javascript
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.sayHi = function () {
    alert(
      "我的名字叫：" + this.name + "，年龄：" + this.age + "，性别：" + this.sex
    );
  };
}
var bigbai = new Person("大白", 100, "男");
var smallbai = new Person("小白", 21, "男");
console.log(bigbai.name);
console.log(smallbai.name);
```

- 构造函数和对象
  ① 构造函数，如 Stars()，抽象了对象的公共部分，封装到了函数里面，它泛指某一大类（class）
  ② 创建对象，如 new Stars()，特指某一个，通过 new 关键字创建对象的过程我们也称为对象实例化

## 10.2 new 关键字

- new 在执行时会做四件事情：
  ① 在内存中创建一个新的空对象。
  ② 让 this 指向这个新的对象。
  ③ 执行构造函数里面的代码，给这个新对象添加属性和方法
  ④ 返回这个新对象（所以构造函数里面不需要 return）。

## 10.3 遍历对象属性

- for...in 语句用于对数组或者对象的属性进行循环操作。

```javascript
for (变量 in 对象名字) {
  // 在此执行代码
}
```

语法中的变量是自定义的，它需要符合命名规范，通常会将这个变量写为 k 或者 key。

```javascript
for (var k in obj) {
  console.log(k); // 这里的 k 是属性名
  console.log(obj[k]); // 这里的 obj[k] 是属性值
}
```

# 11. 内置对象

- JavaScript 中的对象分为 3 种：自定义对象 、内置对象、 浏览器对象
- 内置对象就是指 JS 语言自带的一些对象，这些对象供开发者使用，并提供了一些常用的或是最基本而必要的功能（属性和方法）
- JavaScript 提供了多个内置对象：Math、 Date 、Array、String 等
- 多查文档 MDN: [https://developer.mozilla.org/zh-CN/](https://developer.mozilla.org/zh-CN/)

## 11.1 Math 对象

- Math 对象不是构造函数，它具有数学常数和函数的属性和方法。跟数学相关的运算（求绝对值，取整、最大值等）

```javascript
Math.PI;	// 圆周率
Math.floor(); // 向下取整
Math.ceil();   // 向上取整
Math.round();// 四舍五入版 就近取整   注意 -3.5   结果是  -3
Math.abs();// 绝对值
Math.max()/Math.min();// 求最大和最小值
Math.random(); //可以随机返回一个小数，其取值范围是 [0，1)
//得到一个两数之间的随机整数，包括两个数在内
Math.random() * (max - min + 1)) + min
```

## 11.2 日期对象

- Date 对象用来处理日期和时间，和 Math 对象不一样，他是一个构造函数，需要实例化后才能使用
  -/1、获取当前时间必须实例化

```javascript
var now = new Date();
console.log(now);
```

- 2、Date() 构造函数的参数
  ① 如果括号里面有时间，就返回参数里面的时间。例如日期格式字符串为‘2019-5-1’，可以写成 new Date('2019-5-1') 或者 new Date('2019/5/1')
  ② 如果 Date()不写参数，就返回当前时间
- 3、日期格式化
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/2ee51a6ba7ee46719c68e1b5de63de4d.png#pic_center)
- 4、获取日期的总的毫秒形式
  Date 对象是基于 1970 年 1 月 1 日（世界标准时间）起的毫秒数

```javascript
// 实例化Date对象
var now = new Date();
// 1. 用于获取对象的原始值
console.log(date.valueOf());
console.log(date.getTime());
// 2. 简单写可以这么做
var now = +new Date();
// 3. HTML5中提供的方法，有兼容性问题
var now = Date.now();
```

## 11.3 数组对象

- 1、创建数组对象的两种方式
  ① 字面量方式
  ②new Array()
- 2、检测是否为数组
  ①instanceof 运算符，可以判断一个对象是否属于某种类型
  ②Array.isArray()用于判断一个对象是否为数组，isArray() 是 HTML5 中提供的方法

```javascript
var arr = [1, 23];
var obj = {};
console.log(arr instanceof Array); // true
console.log(obj instanceof Array); // false
console.log(Array.isArray(arr)); // true
console.log(Array.isArray(obj)); // false
```

- 3、添加删除数组元素的方法
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/1eadb5519a2d4ff6a42e6cb891fe1fe5.png#pic_center)
- 4、数组排序
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/9ffc634c38ac43c0bc1caad0632f975b.png#pic_center)

```javascript
var arr = [1, 64, 9, 6];
arr.sort(function (a, b) {
  return b - a; // 降a序
  // return a - b;   // 升序
});
console.log(arr);
```

- 5、数组索引方法
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/766760bf5bcb4630b9a34a1dc0207fb3.png#pic_center)
- 6 数组转换为字符串
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/90f6ddb44594445c97f8a3c548cf3568.png#pic_center)
- 7 其他等
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/f5457bf4b6724aed8d0f06b7019f59bb.png#pic_center)

## 11.4 字符串对象

### 11.4.1 基本包装类型

- 为了方便操作基本数据类型，JavaScript 还提供了三个特殊的引用类型：String、Number 和 Boolean。
- 基本包装类型就是把简单数据类型包装成为复杂数据类型，这样基本数据类型就有了属性和方法。

```javascript
// 下面代码有什么问题？
var str = "andy";
console.log(str.length);
```

按道理基本数据类型是没有属性和方法的，而对象才有属性和方法，但上面代码却可以执行，这是因为 js 会把基本数据类型包装为复杂数据类型，其执行过程如下 ：

```javascript
// 1. 生成临时变量，把简单类型包装为复杂数据类型
var temp = new String("andy");
// 2. 赋值给我们声明的字符变量
str = temp;
// 3. 销毁临时变量
temp = null;
```

### 11.4.2 字符串的不可变

- 指的是里面的值不可变，虽然看上去可以改变内容，但其实是地址变了，内存中新开辟了一个内存空间。

```javascript
var str = "abc";
str = "hello";
// 当重新给 str 赋值的时候，常量'abc'不会被修改，依然在内存中
// 重新给字符串赋值，会重新在内存中开辟空间，这个特点就是字符串的不可变
// 由于字符串的不可变，在大量拼接字符串的时候会有效率问题
var str = "";
for (var i = 0; i < 100000; i++) {
  str += i;
}
console.log(str); // 这个结果需要花费大量时间来显示，因为需要不断的开辟新的空间
```

### 11.4.3 根据字符返回位置

- 字符串所有的方法，都不会修改字符串本身(字符串是不可变的)，操作完成会返回一个新的字符串。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/058b016f413e43a09a71e32e0ec6ecfb.png#pic_center)

### 11.4.4 根据位置返回字符

![在这里插入图片描述](https://img-blog.csdnimg.cn/465bcad7b81a4fef8189ad0a1e674cb2.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/4b03957e8ebb453dbd213b21cf2c5bd4.png#pic_center)

### 11.4.5 字符串操作方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/95a16375e5d746609131b3f953258c58.png#pic_center)

### 11.4.6 replace()方法

- replace() 方法用于在字符串中用一些字符替换另一些字符。

```javascript
replace(被替换的字符串， 要替换为的字符串)
```

### 11.4.7 split()方法

- split()方法用于切分字符串，它可以将字符串切分为数组。在切分完毕之后，返回的是一个新数组。

```javascript
var str = "a,b,c,d";
console.log(str.split(",")); // 返回的是一个数组 [a, b, c, d]
```

### 11.4.8 大小写转换

toUpperCase() //转换大写
toLowerCase() //转换小写

# 12. 简单类型与复杂类型

- 简单类型又叫做基本数据类型或者值类型，复杂类型又叫做引用类型。
  ① 值类型：简单数据类型/基本数据类型，在存储时变量中存储的是值本身，因此叫做值类型 string ，number，boolean，undefined，null
  ② 引用类型：复杂数据类型，在存储时变量中存储的仅仅是地址（引用），因此叫做引用数据类型通过 new 关键字创建的对象（系统对象、自定义对象），如 Object、Array、Date 等

## 12.1 堆和栈

- 栈（操作系统）：由操作系统自动分配释放存放函数的参数值、局部变量的值等。其操作方式类似于数据结构中的栈；简单数据类型存放到栈里面
- 堆（操作系统）：存储复杂类型(对象)，一般由程序员分配释放，若程序员不释放，由垃圾回收机制回收。复杂数据类型存放到堆里面
- JavaScript 中没有堆栈的概念，通过堆栈的方式，更容易理解代码的一些执行方式，便于将来学习其他语言。

## 12.2 简单类型的内存分配

- 值类型（简单数据类型）： string ，number，boolean，undefined，null
- 值类型变量的数据直接存放在变量（栈空间）中
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/c8049f9d3e2347778f61dcaffa1bcb27.png#pic_center)

## 12.3 复杂类型的内存分配

- 引用类型（复杂数据类型）：通过 new 关键字创建的对象（系统对象、自定义对象），如 Object、Array、Date 等
- 引用类型变量（栈空间）里存放的是地址，真正的对象实例存放在堆空间中
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/86a626bebb114d989e8f4503bd63d785.png#pic_center)

## 12.4 简单类型传参

- 函数的形参可以看做是一个变量，当我们把一个值类型变量作为参数传给函数的形参时，其实是把变量在栈空间里的值复制了一份给形参，那么在方法内部对形参做任何修改，都不会影响到的外部变量。

```javascript
function fn(a) {
	a++;
	console.log(a); //11
}
var x = 10;
fn(x);
console.log(x)； //10
```

## 12.5 复杂类型传参

- 函数的形参可以看做是一个变量，当我们把引用类型变量传给形参时，其实是把变量在栈空间里保存的堆地址复制给了形参，形参和实参其实保存的是同一个堆地址，所以操作的是同一个对象。

```javascript
function Person(name) {
  this.name = name;
}
function f1(x) {
  // x = p
  console.log(x.name); // 长门
  x.name = "凉宫";
  console.log(x.name); // 凉宫
}
var p = new Person("长门");
console.log(p.name); // 长门
f1(p);
console.log(p.name); // 凉宫
```

# 13. DOM

## 13.1 DOM 简介

- 文档对象模型（Document Object Model，简称 DOM），是 W3C 组织推荐的处理可扩展标记语言（HTML 或者 XML）的标准编程接口。
- W3C 已经定义了一系列的 DOM 接口，通过这些 DOM 接口可以改变网页的内容、结构和样式。
- DOM 树如下图：
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/7919f7e82d004ca5b18e9f48ce43a439.png#pic_center)
  ① 文档：一个页面就是一个文档，DOM 中使用 document 表示
  ② 元素：页面中的所有标签都是元素，DOM 中使用 element 表示
  ③ 节点：网页中的所有内容都是节点（标签、属性、文本、注释等），DOM 中使用 node 表示
  ④DOM 把以上内容都看做是对象

## 13.2 获取元素

### 13.2.1 根据 ID 获取

- 使用 `getElementById()` 方法可以获取带有 ID 的元素对象

```javascript
document.getElementById("id");
```

使用 console.dir() 可以打印我们获取的元素对象，更好的查看对象里面的属性和方法。

### 13.2.2 根据标签名获取

- 使用 `getElementsByTagName()` 方法可以返回带有指定标签名的对象的集合。

```javascript
document.getElementsByTagName("标签名");
```

- 注意：
  ① 因为得到的是一个对象的集合，所以我们想要操作里面的元素就需要遍历。
  ② 得到元素对象是动态的

```javascript
<ul>
	<li>知否知否，应是等你好久</li>
	<li>知否知否，应是等你好久</li>
</ul>
<ol id="ol">
	   <li>生僻字</li>
</ol>
<script>
	//1.返回元素对象的集合 以伪数组的形式存储的
	var lis = document.getElementsByTagName('li');
	console.log(lis[0]);
	// 2. 采取遍历的方式
	for (var i = 0; i < lis.length; i++) {
	    console.log(lis[i]);
	}
	// 3. 如果页面中只有一个li 返回的还是伪数组的形式
	// 4. 如果页面中没有这个元素 返回的是空的伪数组的形式
	// 5. element.getElementsByTagName('标签名'); 父元素必须是指定的单个元素
	// var ol = document.getElementsByTagName('ol'); // [ol]
	// console.log(ol[0].getElementsByTagName('li'));
	var ol = document.getElementById('ol');
	console.log(ol.getElementsByTagName('li'));
</script>
```

### 13.2.3 H5 新增方法获取

- 1、根据类名返回元素对象集

```javascript
document.getElementsByClassName("类名");
```

- 2、根据指定选择器返回第一个元素对象

```javascript
document.querySelector("选择器");
```

- 3、根据指定选择器返回所有元素

```javascript
document.querySelectorAll("选择器");
```

- 注意：
  querySelector 和 querySelectorAll 里面的选择器需要加符号，id 选择器就加`#`号,类选择器就加`.`点号

```javascript
//id选择器就加#号
document.querySelector("#nav");
//类选择器就加点.
document.querySelectorAll(".subnav");
```

### 13.2.4 获取 body 和 html

- 获取 body 元素

```javascript
doucumnet.body; // 返回body元素对象
```

- 获取 html 元素

```javascript
document.documentElement; // 返回html元素对象
```

## 13.3 事件基础

JavaScript 使我们有能力创建动态页面，而事件是可以被 JavaScript 侦测到的行为。
网页中的每个元素都可以产生某些可以触发 JavaScript 的事件，例如，我们可以在用户点击某按钮时产生一个 事件，然后去执行某些操作。

### 13.3.1 事件三要素

① 事件源 （谁）
② 事件类型 （什么事件）
③ 事件处理程序 （做啥）

### 13.3.2 执行事件步骤

① 获取事件源
② 注册事件（绑定事件）
③ 添加事件处理程序（采取函数赋值形式)

```javascript
var btn = document.getElementById("btn"); //获取事件源
btn.onclick = function () {
  // 绑定事件类型
  alert("你好吗"); //事件处理
};
```

### 13.3.3 常见的鼠标事件

![在这里插入图片描述](https://img-blog.csdnimg.cn/a5bb0dc322154990bacd4affa9e2f77e.png#pic_center)

## 13.4 操作元素

### 13.4.1 改变元素内容

- 从起始位置到终止位置的内容, 但它去除 html 标签， 同时空格和换行也会去掉

```javascript
element.innerText;
```

- 起始位置到终止位置的全部内容，包括 html 标签，同时保留空格和换行

```javascript
element.innerHTML;
```

### 13.4.2 常用元素的属性操作

- innerText、innerHTML 改变元素内容
- src、href
- id、alt、title

```javascript
var img = document.querySelector("img");
img.onclick = function () {
  img.src = "images/zxy.jpg";
  img.title = "张学友";
};
```

### 13.4.3 表单元素的属性操作

- 利用 DOM 可以操作表单元素的属性：type、value、checked、selected、disabled

```javascript
var btn = document.querySelector("button");
var input = document.querySelector("input");
btn.onclick = function () {
  input.value = "被点击了";
  // 如果想要某个表单被禁用 不能再点击使用disabled属性
  // btn.disabled = true;
  this.disabled = true;
  // this 指向的是事件函数的调用者 btn
};
```

### 13.4.4 样式属性操作

- 可以通过 JS 修改元素的大小、颜色、位置等样式
- 行内样式操作 : `element.style`
- 类名样式操作: `element.className`
- 注意：
  ①JS 里面的样式采取驼峰命名法 比如 fontSize、 backgroundColor
  ②JS 修改 style 样式操作，产生的是行内样式，CSS 权重比较高
  ③ 如果样式修改较多，可以采取操作类名方式更改元素样式。
  ④`class`因为是个保留字，因此使用`className`来操作元素类名属性
  ⑤`className` 会直接更改元素的类名，会覆盖原先的类名。

```javascript
<style>
	.change {
		color: #fff;
		font-size: 25px;
	}
</style>
<div class="first">文本</div>
<script>
	var test = document.querySelector('div');
	test.onclick = function() {
		// 如果想要保留原先的类名，可以这么做 多类名选择器
		// this.className = 'change';
		this.className = 'first change';
	}
</script>
```

### 13.4.5 排他思想

如果有同一组元素，我们想要某一个元素实现某种样式， 需要用到循环的排他思想算法：

1. 所有元素全部清除样式
2. 给当前元素设置样式
3. 注意顺序不能颠倒，首先干掉其他人，再设置自己

```javascript
var btns = document.getElementsByTagName("button");
// btns得到的是伪数组  里面的每一个元素 btns[i]
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
    // (1) 我们先把所有的按钮背景颜色去掉
    for (var i = 0; i < btns.length; i++) {
      btns[i].style.backgroundColor = "";
    }
    // (2) 然后才让当前的元素背景颜色为pink
    this.style.backgroundColor = "pink";
  };
}
```

### 13.4.6 自定义属性的操作

自定义属性目的：是为了保存并使用数据。有些数据可以保存到页面中而不用保存到数据库中。

- 获取属性值
  ①`element.属性` 获取属性值。获取内置属性值（元素本身自带的属性）
  ②`element.getAttribute('属性')`;主要获得自定义的属性 （标准） 程序员自定义的属性
- 设置属性值
  ①`element.属性 = '值'` 设置内置属性值。
  ②`element.setAttribute('属性', '值')`;主要设置自定义的属性 （标准）
- 移除属性
  `element.removeAttribute('属性')`

```javascript
<div id="demo" index="1" class="nav"></div>
    <script>
        var div = document.querySelector('div');
        //element.属性
        console.log(div.id);
        //程序员自己添加的属性我们称为自定义属性 index
        console.log(div.getAttribute('id'));
        console.log(div.getAttribute('index'));
        //element.属性= '值'
        div.id = 'test';
        div.className = 'navs';
        //element.setAttribute('属性', '值');  主要针对于自定义属性
        div.setAttribute('index', 2);
        // class 特殊  这里面写的就是class 不是className
        div.setAttribute('class', 'footer');
        // 3 移除属性 removeAttribute(属性)
        div.removeAttribute('index');
    </script>
```

- H5 自定义属性
  ①H5 规定自定义属性 data-开头做为属性名并且赋值。如
  `<div data-index='1'></div>`
  `element.setAttribute(‘data-index’, 2)`
- 获取 H5 自定义属性
  ① 兼容性获取 `element.getAttribute('data-index');`
  ②H5 新增 `element.dataset.index` 或者 `element.dataset['index']` ie11 才开始支持

```javascript
 <div getTime="20" data-index="2" data-list-name="andy"></div>
    <script>
        var div = document.querySelector('div');
        console.log(div.getAttribute('getTime'));
        div.setAttribute('data-time', 20);
        console.log(div.getAttribute('data-index'));
        console.log(div.getAttribute('data-list-name'));
        // h5新增的获取自定义属性的方法 它只能获取data-开头的
        // dataset 是一个集合里面存放了所有以data开头的自定义属性
        console.log(div.dataset);
        console.log(div.dataset.index);
        console.log(div.dataset['index']);
        // 如果自定义属性里面有多个-链接的单词，我们获取的时候采取 驼峰命名法
        console.log(div.dataset.listName);
        console.log(div.dataset['listName']);
    </script>
```

### 13.4.7 操作元素总结

![在这里插入图片描述](https://img-blog.csdnimg.cn/ce96a2be8c0d425f93df70e26883f58a.png#pic_center)

## 13.5 节点操作

### 13.5.1 为什么学节点操作

- 利用节点层级关系获取元素
  ① 利用父子兄节点关系获取元素
  ② 逻辑性强， 但是兼容性稍差
- 利用 DOM 提供的方法获取元素
  ①`document.getElementById()`
  ②`document.getElementsByTagName()`
  ③`document.querySelector` 等
  ④ 逻辑性不强、繁琐

### 13.5.2 节点概述

- 网页中的所有内容都是节点（标签、属性、文本、注释等），在 DOM 中，节点使用 node 来表示。
- HTML DOM 树中的所有节点均可通过 JavaScript 进行访问，所有 HTML 元素（节点）均可被修改，也可以创建或删除。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/ec3792bf2a2a44c9af98e96838edfd7a.png#pic_center)
- 一般地，节点至少拥有 nodeType（节点类型）、nodeName（节点名称）和 nodeValue（节点值）这三个基本属性。
  ① 元素节点 nodeType 为 1
  ② 属性节点 nodeType 为 2
  ③ 文本节点 nodeType 为 3 （文本节点包含文字、空格、换行等）
  在实际开发中，节点操作主要操作的是元素节点

### 13.5.3 节点层级

#### 13.5.3.1 父级节点

- ` node.parentNode`
  ①parentNode 属性可返回某节点的父节点，注意是最近的一个父节点
  ② 如果指定的节点没有父节(亲爸爸)点则返回 null

#### 13.5.3.2 子节点

- 1、`parentNode.childNodes`（标准），返回包含指定节点的子节点的集合，该集合为即时更新的集合。
  注意：
  ① 返回值里面包含了所有的子节点，包括元素节点，文本节点等。
  ② 如果只想要获得里面的元素节点，则需要专门处理。 所以一般不提倡使用 childNodes

```javascript
var ul = document.querySelector("ul");
for (var i = 0; i < ul.childNodes.length; i++) {
  if (ul.childNodes[i].nodeType == 1) {
    // ul.childNodes[i] 是元素节点
    console.log(ul.childNodes[i]);
  }
}
```

- 2、`parentNode.children` （非标准，但是得到了各个浏览器的支持，放心用），是一个只读属性，返回所有的子元素节点。它只返回子元素节点，其余节点不返 ，重点掌握；

- 3、`parentNode.firstChild` 返回第一个子节点，找不到则返回 null。同样，也是包含所有的节点。
- 4、`parentNode.lastChild` 返回最后一个子节点，找不到则返回 null。同样，也是包含所有的节点。
- 5、`parentNode.firstElementChild` 返回第一个子元素节点，找不到则返回 null。
- 6、`parentNode.lastElementChild` 返回最后一个子元素节点，找不到则返回 null。
- 实际开发中，firstChild 和 lastChild 包含其他节点，操作不方便，而 firstElementChild 和 lastElementChild 又有兼容性问题，解决方案：
  ① 如果想要第一个子元素节点，可以使用
  `parentNode.chilren[0]`
  ② 如果想要最后一个子元素节点，可以使用`parentNode.chilren[parentNode.chilren.length - 1]`

#### 13.5.3.3 兄弟节点

- 1、`node.nextSibling` 返回当前元素的下一个兄弟节点，找不到则返回 null。同样，也是包含所有的节点。
- 2、`node.previousSibling` 返回当前元素上一个兄弟节点，找不到则返回 null。同样，也是包含所有的节点。
- 3、`node.nextElementSibling` 返回当前元素下一个兄弟**元素**节点，找不到则返回 null。
- 4、`node.previousElementSibling` 返回当前元素上一个兄弟**元素**节点，找不到则返回 null。

```javascript
var div = document.querySelector("div");
// 1.nextSibling 下一个兄弟节点 包含元素节点或者 文本节点等等
console.log(div.nextSibling);
console.log(div.previousSibling);
// 2. nextElementSibling 得到下一个兄弟元素节点
console.log(div.nextElementSibling);
console.log(div.previousElementSibling);
```

- 解决兼容性问题：如下

```javascript
function getNextElementSibling(element) {
  var el = element;
  while ((el = el.nextSibling)) {
    if (el.nodeType === 1) {
      return el;
    }
  }
  return null;
}
```

### 13.5.4 创建节点

- `document.createElement('tagName')`
  document.createElement() 方法创建由 tagName 指定的 HTML 元素。因为这些元素原先不存在， 是根据我们的需求动态生成的，所以我们也称为动态创建元素节点。

### 13.5.5 添加节点

- 1、`node.appendChild(child)`
  node.appendChild() 方法将一个节点添加到指定父节点的子节点列表末尾。类似于 CSS 里面的 after 伪元素。
- 2、`node.insertBefore(child, 指定元素)`
  node.insertBefore() 方法将一个节点添加到父节点的指定子节点前面。类似于 CSS 里面的 before 伪元素。

```javascript
// 1. 创建节点元素节点
var li = document.createElement("li");
// 2. 添加节点 node.appendChild(child)  node 父级  child 是子级 后面追加元素  类似于数组中的push
var ul = document.querySelector("ul");
ul.appendChild(li);
// 3. 添加节点 node.insertBefore(child, 指定元素);
var lili = document.createElement("li");
ul.insertBefore(lili, ul.children[0]);
// 4. 我们想要页面添加一个新的元素 ： 1. 创建元素 2. 添加元素
```

### 13.5.6 删除节点

- `node.removeChild(child)`
  node.removeChild() 方法从 DOM 中删除一个子节点，返回删除的节点。

```javascript
<button>删除</button>
<ul>
	<li>熊大</li>
	<li>熊二</li>
	<li>光头强</li>
</ul>
<script>
var ul = document.querySelector('ul');
var btn = document.querySelector('button');
// 点击按钮依次删除里面的孩子
btn.onclick = function() {
  if (ul.children.length == 0) {
      this.disabled = true;
  } else {
      ul.removeChild(ul.children[0]);
  }
}
</script>
```

### 13.5.7 复制节点

- `node.cloneNode()`
  node.cloneNode() 方法返回调用该方法的节点的一个副本。 也称为克隆节点/拷贝节点
- 注意：
  ① 如果括号参数为空或者为 false ，则是浅拷贝，即只克隆复制节点本身，不克隆里面的子节点。
  ② 如果括号参数为 true ，则是深度拷贝，会复制节点本身以及里面所有的子节点。

### 13.5.8 三种动态创建元素区别

- document.write()
- element.innerHTML
  ③document.createElement()
  区别
- document.write 是直接将内容写入页面的内容流，但是文档流执行完毕，则它会导致页面全部重绘
  ②innerHTML 是将内容写入某个 DOM 节点，不会导致页面全部重绘
  ③innerHTML 创建多个元素效率更高（不要拼接字符串，采取数组形式拼接），结构稍微复杂
  ④createElement() 创建多个元素效率稍低一点点，但是结构更清晰
- 总结：不同浏览器下，innerHTML 效率要比 creatElement 高

## 13.6 事件高级

### 13.6.1 注册事件（绑定事件)

#### 13.6.1.1 注册事件概述

- 传统注册方式
  ① 利用 on 开头的事件 onclick
  ②`<button onclick=“alert('hi~')”></button>`
  ③`btn.onclick = function() {}`
  ④ 特点： 注册事件的唯一性
  ⑤ 同一个元素同一个事件只能设置一个处理函数，最后注册的处理函数将会覆盖前面注册的处理函数
- 方法监听注册方式
  ①w3c 标准 推荐方式
  ②`addEventListener()` 它是一个方法
  ③IE9 之前的 IE 不支持此方法，可使用 attachEvent() 代替
  ④ 特点：同一个元素同一个事件可以注册多个监听器
  ⑤ 按注册顺序依次执行

#### 13.6.1.2 addEventListener

```javascript
eventTarget.addEventListener("type", listener, [useCapture]);
```

- `eventTarget.addEventListener()`方法将指定的监听器注册到 eventTarget（目标对象）上，当该对象触发指定的事件时，就会执行事件处理函数。
- 该方法接收三个参数：
  ①type：事件类型字符串，比如 click 、mouseover ，注意这里不要带 on
  ②listener：事件处理函数，事件发生时，会调用该监听函数
  ③useCapture：可选参数，是一个布尔值，默认是 false。

#### 13.6.1.3 attachEvent

```javascript
eventTarget.attachEvent(eventNameWithOn, callback);
```

- `eventTarget.attachEvent()`方法将指定的监听器注册到 eventTarget（目标对象） 上，当该对象触 发指定的事件时，指定的回调函数就会被执行。
- 该方法接收两个参数：
  ①eventNameWithOn：事件类型字符串，比如 onclick 、onmouseover ，这里要带 on
  ②callback： 事件处理函数，当目标触发事件时回调函数被调用

- 三种方式注册事件例子如下：

```javascript
<button>传统注册事件</button>
    <button>方法监听注册事件</button>
    <button>ie9 attachEvent</button>
    <script>
        var btns = document.querySelectorAll('button');
        // 1. 传统方式注册事件
        btns[0].onclick = function() {
            alert('hi');
        }
        btns[0].onclick = function() {
                alert('hao a u');
        }
        // 2. 事件侦听注册事件 addEventListener
        // (1) 里面的事件类型是字符串 必定加引号 而且不带on
        // (2) 同一个元素 同一个事件可以添加多个侦听器（事件处理程序）
        btns[1].addEventListener('click', function() {
            alert(22);
        })
        btns[1].addEventListener('click', function() {
                alert(33);
        })
        // 3. attachEvent ie9以前的版本支持
        btns[2].attachEvent('onclick', function() {
            alert(11);
        })
    </script>
```

#### 13.6.1.4 兼容性解决方案

```javascript
 function addEventListener(element, eventName, fn) {
	// 判断当前浏览器是否支持 addEventListener 方法
	if (element.addEventListener) {
	  element.addEventListener(eventName, fn);  // 第三个参数    默认是false
	} else if (element.attachEvent) {
	  element.attachEvent('on' + eventName, fn);
	} else {
	  // 相当于 element.onclick = fn;
	  element['on' + eventName] = fn;
 }
```

- 兼容性处理的原则： 首先照顾大多数浏览器，再处理特殊浏览器

### 13.6.2 删除事件（解绑事件）

- 传统注册方式删除 `eventTarget.onclick = null;`
- 方法监听注册方式删除
  ①`eventTarget.removeEventListener(type, listener[, useCapture]);`
  ②`eventTarget.detachEvent(eventNameWithOn, callback);`

```javascript
<div>1</div>
<div>2</div>
<div>3</div>
<script>
	var divs = document.querySelectorAll('div');
	divs[0].onclick = function() {
		alert(11);
	// 1. 传统方式删除事件
		divs[0].onclick = null;
	}
	// 2. removeEventListener 删除事件
	divs[1].addEventListener('click', fn) // 里面的fn 不需要调用加小括号
	function fn() {
		alert(22);
		divs[1].removeEventListener('click', fn);
	}
	// 3. detachEvent
	divs[2].attachEvent('onclick', fn1);
	function fn1() {
		alert(33);
		divs[2].detachEvent('onclick', fn1);
	}
</script>
```

- 兼容性解决方案

```javascript
function removeEventListener(element, eventName, fn) {
  // 判断当前浏览器是否支持 removeEventListener 方法
  if (element.removeEventListener) {
    element.removeEventListener(eventName, fn); // 第三个参数默认是false
  } else if (element.detachEvent) {
    element.detachEvent("on" + eventName, fn);
  } else {
    element["on" + eventName] = null;
  }
}
```

### 13.6.3 DOM 事件流

- 事件流描述的是从页面中接收事件的顺序。
- 事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程即 DOM 事件流。
- DOM 事件流分为 3 个阶段：
  ① 捕获阶段
  ② 当前目标阶段
  ③ 冒泡阶段
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/7ec049dbabcd440180006bfc9b424c24.png#pic_center)
- 事件冒泡： IE 最早提出，事件开始时由最具体的元素接收，然后逐级向上传播到到 DOM 最顶层节点的过程。
- 事件捕获： 网景最早提出，由 DOM 最顶层节点开始，然后逐级向下传播到到最具体的元素接收的过程。

- 注意事项：
  ①JS 代码中只能执行捕获或者冒泡其中的一个阶段。
  ②onclick 和 attachEvent 只能得到冒泡阶段。
  ③addEventListener(type, listener[, useCapture])第三个参数如果是 true，表示在事件捕
  获阶段调用事件处理程序；如果是 false（不写默认就是 false），表示在事件冒泡阶段调用事件处理程序。

4. 实际开发中我们很少使用事件捕获，我们更关注事件冒泡。
5. 有些事件是没有冒泡的，比如 onblur、onfocus、onmouseenter、onmouseleave
6. 事件冒泡有时候会带来麻烦，有时候又会帮助很巧妙的做某些事件

### 13.6.4 事件对象

- 官方解释：event 对象代表事件的状态，比如键盘按键的状态、鼠标的位置、鼠标按钮的状态。
- 简单理解：事件发生后，跟事件相关的一系列信息数据的集合都放到这个对象里面，这个对象就是事件对象
- event 有很多属性和方法。
  比如：
  ① 谁绑定了这个事件。
  ② 鼠标触发事件的话，会得到鼠标的相关信息，如鼠标位置。
  ③ 键盘触发事件的话，会得到键盘的相关信息，如按了哪个键。

#### 13.6.4.1 使用语法

```javascript
 eventTarget.onclick = function(event) {
// 这个event 就是事件对象，常简写成e或者evt
}
eventTarget.addEventListener('click', function(event) {
}）
```

- event 是个形参，系统帮我们设定为事件对象，不需要传递实参过去。
  当我们注册事件时， event 对象就会被系统自动创建，并依次传递给事件监听器（事件处理函数）。

#### 13.6.4.2 兼容性方案

事件对象本身的获取存在兼容问题：

- 标准浏览器中是浏览器给方法传递的参数，只需要定义形参 e 就可以获取到。
- 在 IE6~8 中，浏览器不会给方法传递参数，如果需要的话，需要到 window.event 中获取查找。
- 解决: `e = e || window.event;`

#### 13.6.4.3 常见属性和方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/e657b0264bc34859bf12019f9392aba6.png#pic_center)

```javascript
//阻止默认行为（事件） 让链接不跳转 或者让提交按钮不提交
var a = document.querySelector("a");
a.addEventListener("click", function (e) {
  e.preventDefault(); //  dom 标准写法
});
```

- 注意: e.target 和 this 的区别：
  this 是事件绑定的元素， 这个函数的调用者（绑定这个事件的元素） 绑定谁返回谁
  e.target 是事件触发的元素。 点谁返回谁

### 13.6.5 阻止事件冒泡

- 标准写法：利用事件对象里面的 `stopPropagation()`方法
- 非标准写法：IE 6-8 利用事件对象 `cancelBubble` 属性

```javascript
var son = document.querySelector(".son");
son.addEventListener(
  "click",
  function (e) {
    alert("son");
    e.stopPropagation(); // stop 停止  Propagation 传播
    e.cancelBubble = true; // 非标准 cancel 取消 bubble 泡泡
  },
  false
);
```

- 阻止事件冒泡的兼容性解决方案

```javascript
if (e && e.stopPropagation) {
  e.stopPropagation();
} else {
  window.event.cancelBubble = true;
}
```

### 13.6.6 事件委托（代理、委派）

- 事件委托也称为事件代理
  不是每个子节点单独设置事件监听器，而是事件监听器设置在其父节点上，然后利用冒泡原理影响设置每个子节点。只操作了一次 DOM ，提高了程序的性能

```javascript
<ul>
	<li>知否知否，点我应有弹框在手！</li>
	<li>知否知否，点我应有弹框在手！</li>
	<li>知否知否，点我应有弹框在手！</li>
</ul>
<script>
// 事件委托的核心原理：给父节点添加侦听器， 利用事件冒泡影响每一个子节点
var ul = document.querySelector('ul');
ul.addEventListener('click', function(e) {
// e.target 这个可以得到我们点击的对象
e.target.style.backgroundColor = 'pink';
})
</script>
```

### 13.6.7 常用鼠标事件与对象

![在这里插入图片描述](https://img-blog.csdnimg.cn/d1ae4a4812e24a038d5b1d718f61eba7.png#pic_center)

- .禁止鼠标右键菜单:`contextmenu`主要控制应该何时显示上下文菜单，主要用于程序员取消默认的上下文菜单

```javascript
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
```

- 禁止鼠标选中（selectstart 开始选中）

```javascript
document.addEventListener("selectstart", function (e) {
  e.preventDefault();
});
```

- 鼠标事件对象
  event 对象代表事件的状态，跟事件相关的一系列信息的集合;鼠标事件对象
  MouseEvent 和键盘事件对象 KeyboardEvent 常用
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/bf6f0825d4f64da0bf604ff38150e004.png#pic_center)
  图片跟随鼠标移动案例：

```javascript
<img src="images/angel.gif" alt="">
<script>
	var pic = document.querySelector('img');
	document.addEventListener('mousemove', function(e) {
		//核心原理： 每次鼠标移动，我们都会获得最新的鼠标坐标， 把这个x和y坐标做为图片的top和left 值就可以移动图片
		var x = e.pageX;
		var y = e.pageY;
		//注意：千万不要忘记给left 和top 添加px 单位
		pic.style.left = x - 50 + 'px';
		pic.style.top = y - 40 + 'px';
	});
</script>
```

### 13.6.8 常用的键盘事件

![在这里插入图片描述](https://img-blog.csdnimg.cn/a07c1e77d3ca46aebdd39fda3257a8e4.png#pic_center)

```javascript
document.addEventListener("keyup", function () {
  console.log("我弹起了");
});
//keypress不能识别功能键 比如 ctrl shift 左右箭头
document.addEventListener("keypress", function () {
  console.log("我按下了press");
});
//2. keydown 能识别功能键 比如 ctrl shift 左右箭头
document.addEventListener("keydown", function () {
  console.log("我按下了down");
});
```

- 注意：
  ① 如果使用 addEventListener 不需要加 on
  ②onkeypress 和前面 2 个的区别是，它不识别功能键，比如左右箭头，shift 等。
  ③ 三个事件的执行顺序是： keydown -- keypress --- keyup
  ④onkeydown 和 onkeyup 不区分字母大小写，onkeypress 区分字母大小写
  ⑤ 在实际开发中，更多使用 keydown 和 keyup， 它能识别所有的键（包括功能键）
  ⑥Keypress 不识别功能键，但是 keyCode 属性能区分大小写，返回不同的 ASCII 值

| 键盘事件对象属性 | 说明                |
| ---------------- | ------------------- |
| keyCode          | 返回该键的 ASCII 值 |

```javascript
// 1. keyup 和keydown事件不区分字母大小写  a 和 A 得到的都是65
// 2. keypress 事件 区分字母大小写  a  97 和 A 得到的是65
document.addEventListener("keyup", function (e) {
  console.log("up:" + e.keyCode);
  // 可以利用keycode返回的ASCII码值来判断用户按下了那个键
  if (e.keyCode === 65) {
    alert("您按下的a键");
  } else {
    alert("您没有按下a键");
  }
});
document.addEventListener("keypress", function (e) {
  console.log("press:" + e.keyCode);
});
```

注意： onkeydown 和 onkeyup 不区分字母大小写，onkeypress 区分字母大小写。
在我们实际开发中，我们更多的使用 keydown 和 keyup， 它能识别所有的键（包括功能键）
Keypress 不识别功能键，但是 keyCode 属性能区分大小写，返回不同的 ASCII 值

# 14. BOM

## 14.1 BOM 概述

- BOM（Browser Object Model）即浏览器对象模型，它提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是 window。
- BOM 缺乏标准，JavaScript 语法的标准化组织是 ECMA，DOM 的标准化组织是 W3C，BOM 最初是 Netscape 浏览器标准的一部分。

| DOM                              | BOM                                              |
| -------------------------------- | ------------------------------------------------ |
| 文档对象模型                     | 浏览器对象模型                                   |
| 把「文档」当做一个「对象」来看待 | 把「浏览器」当做一个「对象」来看待               |
| 顶级对象是 document              | 顶级对象是 window                                |
| 主要学习的是操作页面元素         | 学习的是浏览器窗口交互的一些对象                 |
| DOM 是 W3C 标准规范              | BOM 是浏览器厂商在各自浏览器上定义的，兼容性较差 |

- BOM 比 DOM 更大，它包含 DOM。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/68f77fd5ad8644838a03aade4c3d43ae.png#pic_center)
- window 对象是浏览器的顶级对象，它具有双重角色。
  ① 它是 JS 访问浏览器窗口的一个接口。
  ② 它是一个全局对象。定义在全局作用域中的变量、函数都会变成 window 对象的属性和方法。
  注意：在调用的时候可以省略 window，对话框如 alert()、prompt() 等属于 window 对象方法。window 一个特殊属性 window.name

```javascript
var num = 10;
console.log(num); //window可以省略
console.log(window.num);
function fn() {
  console.log(11);
}
fn();
window.fn();
console.log(window.name); //特殊属性name
```

## 14.2 window 对象的常见事件

### 14.2.1 窗口加载事件

1、 `window.onload` 是窗口 (页面）加载事件,当文档内容完全加载完成会触发该事件(包括图像、脚本文件、CSS 文件等), 就调用的处理函数。

```javascript
window.onload = function () {};
//或者
window.addEventListener("load", function () {});
```

- 注意：
  ① 有了 `window.onload` 就可以把 JS 代码写到页面元素的上方，因为 onload 是等页面内容全部加载完毕，再去执行处理函数
  ② `window.onload` 传统注册事件方式 只能写一次，如果有多个，会以最后一个 `window.onload` 为准
  ③ 如果使用 `addEventListener` 则没有限制

2、 `DOMContentLoaded` 事件触发时，仅当 DOM 加载完成，不包括样式表，图片，flash 等等。

```javascript
document.addEventListener("DOMContentLoaded", function () {});
```

- 注意：如果页面的图片很多的话, 从用户访问到 onload 触发可能需要较长的时间, 交互效果就不能实现，必然影响用户的体验，此时用 DOMConntentLoaded 事件比较合适。

```javascript
// load 等页面内容全部加载完毕，包含页面dom元素 图片 flash  css 等等
window.addEventListener("load", function () {
  var btn = document.querySelector("button");
  btn.addEventListener("click", function () {
    alert("点击我");
  });
});
// DOMContentLoaded 是DOM 加载完毕，不包含图片 falsh css 等就可以执行 加载速度比 load更快一些
document.addEventListener("DOMContentLoaded", function () {
  alert(33);
});
```

### 14.2.2 调整窗口大小事件

`window.onresize` 是调整窗口大小加载事件, 当触发时就调用的处理函数。

```javascript
window.onresize = function () {};
window.addEventListener("resize", function () {});
```

- 注意：
  ① 只要窗口大小发生像素变化，就会触发这个事件。
  ② 经常利用这个事件完成响应式布局。 `window.innerWidth` 当前屏幕的宽度

```javascript
/*div {
	width: 200px;
	height: 200px;
	background-color: pink;
}*/
<div></div>;
window.addEventListener("load", function () {
  var div = document.querySelector("div");
  window.addEventListener("resize", function () {
    console.log(window.innerWidth);
    console.log("变化了");
    if (window.innerWidth <= 800) {
      div.style.display = "none";
    } else {
      div.style.display = "block";
    }
  });
});
```

## 14.3 定时器

### 14.3.1 setTimeout

- `setTimeout()` 方法用于设置一个定时器，该定时器在定时器到期后执行调用函数。

```javascript
window.setTimeout(调用函数, [延迟的毫秒数]);
```

注意：
①window 可以省略。
② 这个调用函数可以直接写函数，或者写函数名或者采取字符串‘函数名()'三种形式。第三种不推荐
③ 延迟的毫秒数省略默认是 0，如果写，必须是毫秒。
④ 因为定时器可能有很多，所以我们经常给定时器赋值一个标识符。

```javascript
setTimeout(function () {
  console.log("时间到了");
}, 2000);
function callback() {
  console.log("爆炸了");
}
var timer1 = setTimeout(callback, 3000);
var timer2 = setTimeout(callback, 5000);
// setTimeout('callback()', 3000); // 我们不提倡这个写法
```

知识补充：回调函数

1. setTimeout() 这个调用函数也称为回调函数 callback
2. 普通函数是按照代码顺序直接调用。而这个函数，需要等待时间，时间到了才去调用这个函数，因此称为回调函数。
3. 简单理解： 回调，就是回头调用的意思。上一件事干完，再回头再调用这个函数。
4. `element.onclick = function(){}`或`element.addEventListener(“click”, fn);` 里面的函数也是回调函数。

- 停止 setTimeout() 定时器
  `clearTimeout()`方法取消了先前通过调用 `setTimeout()` 建立的定时器。

```javascript
window.clearTimeout(timeoutID);
```

注意：

1. window 可以省略。
2. 里面的参数就是定时器的标识符 。

```javascript
<button>点击停止定时器</button>
<script>
	var btn = document.querySelector('button');
	var timer = setTimeout(function() {
		console.log('爆炸了');
	}, 5000);
	btn.addEventListener('click', function() {
		clearTimeout(timer);
	})
</script>
```

### 14.3.2 setInterval

- `setInterval()` 方法重复调用一个函数，每隔这个时间，就去调用一次回调函数。

```javascript
window.setInterval(回调函数, [间隔的毫秒数]);
```

- 注意：
  ①window 可以省略。
  ② 这个调用函数可以直接写函数，或者写函数名或者采取字符串 '函数名()' 三种形式。
  ③ 间隔的毫秒数省略默认是 0，如果写，必须是毫秒，表示每隔多少毫秒就自动调用这个函数。
  ④ 因为定时器可能有很多，所以我们经常给定时器赋值一个标识符。
  ⑤ 第一次执行也是间隔毫秒数之后执行，之后每隔毫秒数就执行一次。

```javascript
setInterval(function () {
  console.log("继续输出");
}, 1000);
```

- 停止 `setInterval()` 定时器
  `clearInterval()`方法取消了先前通过调用 setInterval()建立的定时器。

```javascript
window.clearInterval(intervalID);
```

注意：
①window 可以省略。
② 里面的参数就是定时器的标识符 。

```javascript
<button class="begin">开启定时器</button>
<button class="stop">停止定时器</button>
<script>
    var begin = document.querySelector('.begin');
    var stop = document.querySelector('.stop');
    var timer = null; // 全局变量  null是一个空对象
    begin.addEventListener('click', function() {
        timer = setInterval(function() {
            console.log('ni hao ma');
        }, 1000);
    })
    stop.addEventListener('click', function() {
        clearInterval(timer);
    })
</script>
```

### 14.3.3 this 指向

- this 的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定 this 到底指向谁，一般情况下 this 的最终指向的是那个调用它的对象
  现阶段
- 了解一下几个 this 指向
  ① 全局作用域或者普通函数中 this 指向全局对象 window（注意定时器里面的 this 指向 window）
  ② 方法调用中谁调用 this 指向谁
  ③ 构造函数中 this 指向构造函数的实例

```javascript
<button>点击</button>
<script>
	//1. 全局作用域或者普通函数中this指向全局对象window（ 注意定时器里面的this指向window）
	console.log(this);
	function fn() {
	    console.log(this);
	}
	window.fn();
	window.setTimeout(function() {
	    console.log(this);
	}, 1000);
	// 2. 方法调用中谁调用this指向谁
	var o = {
	    sayHi: function() {
	        console.log(this); // this指向的是 o 这个对象
	    }
	}
	o.sayHi();
	var btn = document.querySelector('button');
	btn.addEventListener('click', function() {
	        console.log(this); // this指向的是btn这个按钮对象
	    })
	// 3. 构造函数中this指向构造函数的实例
	function Fun() {
	    console.log(this); // this 指向的是fun 实例对象
	}
	var fun = new Fun();
</script>
```

## 14.4 JS 执行机制

### 14.4.1 JS 是单线程

- JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。这是因为 Javascript 这门脚本语言诞生的使命所致——JavaScript 是为处理页面中用户的交互，以及操作 DOM 而诞生的。比如对某个 DOM 元素进行添加和删除操作，不能同时进行。 应该先进行添加，之后再删除。
- 单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。这样所导致的问题是： 如果 JS 执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞的感觉。
- 体会以下两代码执行过程的区别

```javascript
console.log(1);
setTimeout(function () {
  console.log(3);
}, 1000);
console.log(2); //隔了2秒才输出
```

```javascript
console.log(1);
setTimeout(function () {
  console.log(3);
}, 0);
console.log(2); // 直接输出
```

### 14.4.2 同步和异步

为了解决 js 单线程这个问题，利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程。于是，JS 中出现了同步和异步。

- 同步：前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的、同步的。
- 异步：你在做一件事情时，因为这件事情会花费很长时间，在做这件事的同时，你还可以去处理其他事情
- 同步任务：同步任务都在主线程上执行，形成一个执行栈
- 异步任务：异步任务相关回调函数添加到任务队列中（任务队列也称为消息队列）。JS 的异步是通过回调函数实现的。异步任务有以下三种类型:
  1、普通事件，如 click、resize 等
  2、资源加载，如 load、error 等
  3、定时器，包括 setInterval、setTimeout 等

### 14.4.3 JS 执行机制

1. 先执行执行栈中的同步任务。
2. 异步任务（回调函数）放入任务队列中。
3. 一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取任务队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行。
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/4787876c15274a23868c6aa8278ebf70.png#pic_center)
   由于主线程不断的重复获得任务、执行任务、再获取任务、再执行，所以这种机制被称为事件循环（ event loop）。

## 14.5 location 对象

- window 对象给我们提供了一个 location 属性用于获取或设置窗体的 URL，并且可以用于解析 URL 。 因为这个属性返回的是一个对象，所以我们将这个属性也称为 location 对象。

### 14.5.1 URL

- 统一资源定位符 (Uniform Resource Locator, URL) 是互联网上标准资源的地址。互联网上的每个文件都有一个唯一的 URL，它包含的信息指出文件的位置以及浏览器应该怎么处理它。
- URL 的一般语法格式为
  protocol://host[:port]/path/[?query]#fragment
  http://www.itcast.cn/index.html?name=andy&age=18#link

| 组成     | 说明                                                                 |
| -------- | -------------------------------------------------------------------- |
| protocol | 通信协议 常用的 http,ftp,maito 等                                    |
| host     | 主机(域名) www.baidu.com                                             |
| port     | 端口号 可选，省略时使用方案的默认端口 如 http 的默认端口为 80        |
| path     | 路径由零或多个'/'符号隔开的字符串,一般表示主机上的一个目录或文件地址 |
| query    | 参数 以键值对的形式,通过&符号分隔开来                                |
| fragment | 片段 #后面内容 常见于链接 锚点                                       |

### 14.5.2 location 对象的属性

| location 对象属性 | 返回值                             |
| ----------------- | ---------------------------------- |
| location.href     | 获取或者设置整个 URL               |
| location.host     | 返回主机（域名）www.baidu.com      |
| location.port     | 返回端口号 ，如果未写返回空字符串  |
| location.pathname | 返回路径                           |
| location.search   | 返回参数                           |
| location.hash     | 返回片段，#后面内容常见于链接 锚点 |

重点：href 和 search

### 14.5.3 location 对象方法

| location 对象方法  | 描述                                                                   |
| ------------------ | ---------------------------------------------------------------------- |
| location.assign()  | 跟 href 一样，可以跳转页面（也称为重定向页面）                         |
| location.replace() | 替换当前页面，因为不记录历史，所以不能后退页面                         |
| location.reload()  | 重新加载页面，相当于刷新按钮或者 f5 ，如果参数为 true 强制刷新 ctrl+f5 |

```javascript
var btn = document.querySelector("button");
btn.addEventListener("click", function () {
  // 记录浏览历史，所以可以实现后退功能
  // location.assign('http://www.itcast.cn');
  // 不记录浏览历史，所以不可以实现后退功能
  // location.replace('http://www.itcast.cn');
  location.reload(true);
});
```

## 14.6 navigator 对象

- navigator 对象包含有关浏览器的信息，它有很多属性，我们最常用的是 userAgent，该属性可以返回由客户机发送服务器的 user-agent 头部的值。

```javascript
//下面前端代码可以判断用户哪个终端打开页面，实现跳转
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|
Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS
|Symbian|Windows Phone)/i))) {
    window.location.href = "";     //手机
} else {
    window.location.href = "";     //电脑
}
```

## 14.7 history 对象

- window 对象给我们提供了一个 history 对象，与浏览器历史记录进行交互。该对象包含用户（在浏览器窗口中）访问过的 URL。

| history 对象方法 | 作用                                                             |
| ---------------- | ---------------------------------------------------------------- |
| back()           | 可以后退功能                                                     |
| forward()        | 前进功能                                                         |
| go(参数)         | 前进后退功能，参数如果是 1 前进 1 个页面 如果是 -1 后退 1 个页面 |

history 对象一般在实际开发中比较少用，但是会在一些 OA 办公系统中见到。

## 14.8 存储对象

- Web 存储 API 提供了 `sessionStorage` （会话存储） 和 `localStorage`（本地存储）两个存储对象来对网页的数据进行添加、删除、修改、查询操作。
- 特征：
  1、数据存储在用户浏览器中
  2、设置、读取方便、甚至页面刷新不丢失数据
  3、容量较大，sessionStorage 约 5M、localStorage 约 20M
  4、只能存储字符串，可以将对象 JSON.stringify() 编码后存储

### 14.8.1 会话存储

- 会话存储`window.sessionStorage`

- 特点：
  ① 生命周期为关闭浏览器窗口
  ② 在同一个窗口(页面)下数据可以共享
  ③ 以键值对的形式存储使用
- 数据操作：
  ① 存储数据：`sessionStorage.setItem(key, value)`
  ② 获取数据：`sessionStorage.getItem(key)`
  ③ 删除数据：`sessionStorage.removeItem(key)`
  ④ 删除所有数据：`sessionStorage.clear()`

```javascript
<input type="text">
<button class="set">存储数据</button>
<button class="get">获取数据</button>
<button class="remove">删除数据</button>
<button class="del">清空所有数据</button>
<script>
    console.log(localStorage.getItem('username'));
    var ipt = document.querySelector('input');
    var set = document.querySelector('.set');
    var get = document.querySelector('.get');
    var remove = document.querySelector('.remove');
    var del = document.querySelector('.del');
    set.addEventListener('click', function() {
        // 当我们点击了之后，就可以把表单里面的值存储起来
        var val = ipt.value;
        sessionStorage.setItem('uname', val);
        sessionStorage.setItem('pwd', val);
    });
    get.addEventListener('click', function() {
        // 当我们点击了之后，就可以把表单里面的值获取过来
        console.log(sessionStorage.getItem('uname'));
    });
    remove.addEventListener('click', function() {
        //
        sessionStorage.removeItem('uname');
    });
    del.addEventListener('click', function() {
        // 当我们点击了之后，清除所有的
        sessionStorage.clear();
    });
</script>
```

可在谷歌浏览器 f12，应用查看
![在这里插入图片描述](https://img-blog.csdnimg.cn/58b072e7a37548bf93d09c2f1f3475cb.png#pic_center)

### 14.8.2 本地存储

- 本地存储`window.localStorage`
- 特点
  ① 声明周期永久生效，除非手动删除 否则关闭页面也会存在
  ② 可以多窗口（页面）共享（同一浏览器可以共享）
  ③ 以键值对的形式存储使用
- 数据操作：
  ① 存储数据：`localStorage.setItem(key, value)`
  ② 获取数据：`localStorage.getItem(key)`
  ③ 删除数据：`localStorage.removeItem(key)`
  ③ 删除所有数据：`localStorage.clear()`

```javascript
//案例：记住用户名
<input type="text" id="username"> <input type="checkbox" name="" id="remember"> 记住用户名
<script>
    var username = document.querySelector('#username');
    var remember = document.querySelector('#remember');
    if (localStorage.getItem('username')) {
        username.value = localStorage.getItem('username');
        remember.checked = true;
    }
    remember.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('username', username.value)
        } else {
            localStorage.removeItem('username');
        }
    })
</script>
```
