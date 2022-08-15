---
title: Typescript 笔记
date: 2022/07/20 17:45 #手动设置最后更新时间
categories: [Typescript] # 标签
stick: false # 是否置顶
description: Typescript
keyword: Typescript
---

# Typescript 笔记

# 1. TypeScript 介绍

## 1.1 TypeScript 是什么

- TypeScript（简称：TS）是 JavaScript 的超集（JS 有的 TS 都有）
- TypeScript = Type + JavaScript（在 JS 基础之上，为 JS 添加了类型支持）。
- TypeScript 是微软开发的开源编程语言，可以在任何运行 JavaScript 的地方运行。
- 官网：[https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- 中文官网：[https://www.tslang.cn/](https://www.tslang.cn/)
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/84dade7705a34d7c9de7cd33440bf085.png)

## 1.2 TS 为何添加类型支持

**背景**：JS 的类型系统存在“先天缺陷”，JS 代码中绝大部分错误都是类型错误（Uncaught TypeError）。
**问题**：增加了找 Bug、改 Bug 的时间，严重影响开发效率。

---

从编程语言的动静来区分，TypeScript 属于**静态**类型的**强类型**编程语言(先编译再执行)，JS 属于**动态**类型的**弱类型**编程语言。

- 静态类型：编译期做类型检查；
- 动态类型：执行期做类型检查。

---

- 对于 JS 来说：需要等到代码真正去执行的时候才能发现错误（晚）。
- 对于 TS 来说：在代码编译的时候（代码执行前）就可以发现错误（早）。
- **结论**：配合 VSCode 等开发工具，TS 可以提前到在编写代码的同时就发现代码中的错误，减少找 Bug、改 Bug 时间

## 1.3 TS 相比 JS 的优势

1.  更早（写代码的同时）发现错误，减少找 Bug、改 Bug 时间，提升开发效率。
2.  程序中任何位置的代码都有代码提示，随时随地的安全感，增强了开发体验。
3.  强大的类型系统提升了代码的可维护性，使得重构代码更加容易。
4.  支持最新的 ECMAScript 语法，优先体验最新的语法，走在前端技术的最前沿。
5.  TS 类型推断机制，不需要在代码中的每个地方都显示标注类型，在享受优势的同时，尽量降低了成本。

# 2. TypeScript 初体验

## 2.1 安装编译 TS 的工具包

Node.js/浏览器，只认识 JS 代码，不认识 TS 代码。需要先将 TS 代码转化为 JS 代码，然后才能运行。 所以需要安装编译 TS 的工具包

安装命令：

```shell
npm i -g typescript
```

这个 typescript 包是用来编译 TS 代码的包，提供了 `tsc` 命令，实现了 **TS -> JS** 的转化。
![在这里插入图片描述](https://img-blog.csdnimg.cn/06288015ecd94e14a329c104adb92ac9.png#pic_center)
验证是否安装成功：终端 `tsc –v`（查看 typescript 的版本）。有版本显示表示安装成功

## 2.2 编译并运行 TS 代码

**步骤**：

1. 创建 hello.ts 文件（注意：TS 文件的后缀名为 .ts）。
2. 将 TS 编译为 JS：在终端中输入命令，`tsc hello.ts`（此时，在**同级目录**中会出现一个**同名的 JS** 文件）。
3. 执行 JS 代码：在终端中输入命令，`node hello.js`。

![在这里插入图片描述](https://img-blog.csdnimg.cn/162b25de9c7f40dab52f2fdfb7b83995.png#pic_center)

**说明**：所有合法的 JS 代码都是 TS 代码，有 JS 基础只需要学习 TS 的类型即可。
**注意**：由 TS 编译生成的 JS 文件，代码中就**没有类型信息**了。

## 2.3 简化运行 TS 的步骤

问题描述：每次修改代码后，都要重复执行上述两个命令，才能运行 TS 代码，太繁琐。
简化方式：使用 ts-node 包，“直接”在 Node.js 中执行 TS 代码。
安装命令：`npm i -g ts-node`（ts-node 包提供了 ts-node 命令）。
使用方式：ts-node hello.ts。
解释：ts-node 命令在内部偷偷的将 TS -> JS，然后，再运行 JS 代码。

# 3. TypeScript 常用类型

- TS 提供了 JS 的所有功能，并且额外的增加了：类型系统
- JS 有类型（比如，number/string 等），但是 JS 不会检查变量的类型是否发生变化。而 TS 会检查。
- TypeScript 类型系统的主要优势：可以显示标记出代码中的意外行为，从而降低了发生错误的可能性。

## 3.1 类型注解

```typescript
let age: number = 18;
```

- 说明：代码中的 `: number` 就是**类型注解**，为变量添加 number(数值)类型约束。
- 解释：约定了什么类型，就只能给变量赋值该类型的值，否则，就会报错。

## 3.2 常用基础类型概述

可以将 TS 中的常用基础类型细分为两类：**JS 已有类型** 和 **TS 新增类型**。

- JS 已有类型
  - 原始类型(简单类型/值类型)：number/string/boolean/null/undefined/symbol。
  - 对象类型(复杂类型/引用类型)：object（包括，数组、对象、函数等对象）。
- TS 新增类型
  - 联合类型、自定义类型（类型别名）、接口、元组、字面量类型、枚举、void、any 等。

## 3.3 原始类型

- 原始类型：number/string/boolean/null/undefined/symbol。
- 特点：简单。这些类型，完全按照 JS 中类型的名称来书写。

```typescript
let age: number = 16;
let myName: string = "凉宫";
let flag: boolean = false;
let a: null = null;
let b: undefined = undefined;
let s: symbol = Symbol();
```

## 3.4 数组类型

> 对象类型（包括，数组、对象、函数等对象），在 TS 中更加细化，**每个具体的对象都有自己的类型语法**。

- 数组类型的两种写法：（推荐使用 `number[]` 写法）

```typescript
let arr1: number[] = [1, 3, 4];
let arr2: Array<number> = [1, 2, 4];
let arr3: boolean[] = [true, false, true];
let arr4: string[] = ["a", "1", "凉宫"];
// ...其他类型同理
// let arr5: string[] = [true, 2, 'abc'] 错误，数组中的元素只能是string类型
```

## 3.5 联合类型

- 联合类型表示取值可以为多种类型中的一种，使用单个 `|` 竖线分隔每个类型
- 注意：这是 TS 中联合类型的语法，只有一根竖线，不要与 JS 中的或（||）混淆。

```typescript
let money: number | string = 3; // 变量money可以是数值类型或字符串类型
// 添加括号 表示：arr1前提是数组，然后元素的值可以是number或string类型
let arr1: (number | string)[] = [1, 5, "1", "abc"];
// 不添加括号 表示： 可以arr2可以是number类型 或 元素为string类型的数组
// let arr2: number | string[] = [1, 5, "1", "abc"]; // 会错误
// let arr3: number | string[] = 12; // 正常
// let arr4: number | string[] = ["1", "ac", "凉宫"]; // 正常
```

## 3.6 类型别名

- 类型别名（自定义类型）：为任意类型起别名。
- 使用场景：当同一类型（较复杂）被多次使用时，可以通过类型别名，简化该类型的使用。

```typescript
type CustomArray = (number | string)[];
let arr1: CustomArray = [1, 2, "3", "abc"]; // ok
// let arr2: CustomArray = [1, 2, "3", true] // 报错
```

细节：

1. 使用 `type` 关键字来创建类型别名。
2. 类型别名（比如，此处的 CustomArray），可以是任意合法的变量名称。
3. 创建类型别名后，直接使用该类型别名作为变量的**类型注解**即可。

## 3.7 函数类型

### 3.7.1 两种基本用法

- 函数的类型实际上指的是：函数**参数和返回值**的类型。
- 为函数指定类型的两种方式：
  - 1 单独指定参数、返回值的类型
  - 2 同时指定参数、返回值的类型。

1、 单独指定参数、返回值的类型

- 参数类型在参数后面加上 ==类型注解==，返回值的类型是在参数小括号后面加上类型注解
- 注意 1：若加了返回值的类型，则必须要有返回值，且值符合类型要求
- 注意 2：若加了参数的类型，则调用时**必须依照形参的格式**传入实参(个数，类型，顺序)

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2;
}
const add2 = (num1: number, num2: number): number => {
  return num1 + num2;
};
function add1(): number {
  return 10;
}
add(1, 2);
```

2、 单独指定参数、返回值的类型

- 当函数作为表达式时，可以通过**类似箭头函数形式**的语法来为函数添加类型。
- 注意：这种形式只适用于函数表达式，不适用函数声明式。

```typescript
// const add = (num1, num2) => {
//   return num1 + num2; // 这种用法观感上可能不太清晰
// };
// 把第一个冒号开始到第二个等号之前作为一个整体，去掉即为普通函数
const add: (num1: number, num2: number) => number = (num1, num2) => {
  return num1 + num2; // 这种用法观感上可能不太清晰，那就用第一种吧
};
add(1, 2);
```

### 3.7.2 void 类型-无返回值

如果函数没有返回值，那么，函数返回值类型为：**void**。

```typescript
function greet(name: string): void {
  console.log(name);
}
greet("凉宫");
```

### 3.7.3 可选参数

使用函数实现某个功能时，参数可以传也可以不传。这种情况下，在给函数参数指定类型时，就用到可选参数了。

比如，数组的 slice 方法，可以 slice() 也可以 slice(1) 还可以 slice(1, 3)。

```typescript
function Myslice(start?: number, end?: number): void {
  console.log("起始索引" + start + "结束索引" + end);
}
Myslice();
Myslice(2);
Myslice(2, 5);
```

可选参数：在可传可不传的参数名称后面添加 `?`（问号）。
注意：可选参数只能出现在**参数列表的最后**，可选参数后面不能出现必选参数。

## 3.8 对象类型

### 3.8.1 基本用法

JS 中的对象是由属性和方法构成的，而 TS 中对象的类型就是在描述对象的结构（有什么类型的属性和方法）。写法如下

```typescript
// 先申明JS中的写法，在变量后面加 :{ }  在中括号里指定类型
let person: { name: string; age: number; say(): void } = {
  name: "zs",
  age: 20,
  say() {},
};
let person2: {
  name: string;
  age: number;
  greet(name: string): void;
} = {
  name: "zs",
  age: 18,
  greet(name) {
    console.log("hello" + name);
  },
};
person2.greet("凉宫");
```

1. 直接使用 `{}` 中来描述对象结构。属性采用**属性名: 类型**的形式；方法采用**方法名(): 返回值类型**的形式。
2. 如果方法有参数，就在方法名后面的小括号中指定参数类型（比如：`greet(name: string): void`）。
3. 在一行代码中指定对象的多个属性类型时，使用 ;（分号）来分隔。

- 如果一行代码只指定一个属性类型（通过换行来分隔多个属性类型），可以去掉 `;`（分号）。
- 方法的类型也可以使用箭头函数形式（比如： `sayHi: () => void` ）。

### 3.8.2 可选属性

对象的属性或方法，也可以是可选的，此时就用到**可选属性**了。
比如，在使用 axios({ … }) 时，如果发送 GET 请求，method 属性就可以省略。

```typescript
function myAxios(config: { url: string; method?: string }) {}
myAxios({
  url: "www.baidu.com",
  // 这里不传method方法可以是可以的
});
```

可选属性的语法与函数可选参数的语法一致，都使用 ?（问号）来表示。

## 3.9 接口

### 3.9.1 基本使用

当一个对象类型被多次使用时，一般会使用**接口**（interface）来描述对象的类型，达到**复用**的目的。

```typescript
// 声明接口
interface IPerson {
  name: string;
  age: number;
  sayHi(): void;
}
// 实现接口
let person: IPerson = {
  name: "zs",
  age: 20,
  sayHi() {},
};
```

细节：

1. 使用 `interface` 关键字来声明接口。
2. 接口名称（比如，此处的 IPerson），可以是任意合法的变量名称。
3. 声明接口后，直接使用接口名称作为变量的类型。
4. 若要实现接口，必须实现接口中的所有的属性和方法，否则报错

### 3.9.1 接口 vs 类型别名

interface（接口）和 type（类型别名）的对比：

- 相同点：都可以给对象指定类型。
- 不同点：
  ① 接口，只能为对象指定类型。
  ② 类型别名，不仅可以为对象指定类型，实际上可以为任意类型指定别名。

```typescript
// 声明接口
interface IPerson {
  name: string;
  age: number;
  sayHi(): void;
}
// 声明类型别名；两者比较像，注意区分
type IPerson2 = {
  name: string;
  age: number;
  sayHi(): void;
};
type numStr = number | string;
//用法上没有区别
let person2: IPerson2 = { name: "zs", age: 20, sayHi() {} };
let person: IPerson = { name: "zs", age: 20, sayHi() {} };
```

### 3.9.3 接口继承

如果两个接口之间有相同的属性或方法，可以将**公共的属性或方法**抽离出来，通过**继承**来实现**复用**。

```typescript
interface print2D {
  x: number;
  y: number;
}
// interface print3D { // 可以这样，但复用性差
//   x: number;
//   y: number;
//   z: number;
// }
interface print3D extends print2D {
  // 继承接口
  z: number; // 自己的属性 + 隐含了继承过来的所有属性和方法
}
let a: print3D = {
  // 必须实现所有的方法和属性
  x: 2,
  y: 2,
  z: 1,
};
```

1. 使用 extends（继承）关键字实现了接口 Point3D 继承 Point2D。
2. 继承后，Point3D 就有了 Point2D 的所有属性和方法（此时，Point3D 同时有 x、y、z 三个属性）。

## 3.10 元组

- 元组类型是另一种类型的数组，可以确切地标记出有多少个元素，以及特定索引对应的类型。
- 使用 `number[]` 的缺点：不严谨，因为该类型的数组中可以出现任意多个数字。

- 场景：在地图中，使用数组形式标记经纬度。指定元素个数

```typescript
let positon: number[] = [22, 33, 33, 33, 33]; // 没法限制数组元素的数量
let position2: [number, number] = [22, 33];
let position3: [string, number, number, boolean] = ["经纬度", 22, 33, true];
```

## 3.11 类型推论

- 在 TS 中，某些没有明确指出类型的地方，TS 的**类型推论机制会帮助提供类型**
- 由于类型推论的存在，这些地方，类型注解可以省略不写！
- 发生类型推论的 2 种常见场景：
  - 声明变量并立即初始化时
  - 决定函数返回值时。

```typescript
// 类型推论
let age = 18; //定义变量并立即赋值 ，TS可自动推断出类型 为 number，所有可以省略类型注解
age = "abc"; // 根据类型推论，此行报错
let age2; //定义变量没有立即赋值，TS无法推论，此时需要添加类型注解来约束
age2 = 18; // 不会报错
age2 = "abc"; // 不会报错

// function add(num1: number, num2: number): number {
//   return num1 + num2;
// }
function add(num1: number, num2: number) {
  // 省略了返回值的类型
  return num1 + num2;
}
```

推荐：能省略类型注解的地方就省略（可以充分利用 TS 类型推论的能力，提升开发效率）。
技巧：如果不知道类型，可以通过鼠标放在变量名称上，利用 VSCode 的提示来查看类型。

## 3.12 类型断言

有时候你会比 TS 更加明确一个值的类型，此时，可以使用类型断言来指定更具体的类型

```typescript
//<a href="https://www.baidu.com" id="link">百度</a>
const aLink = document.getElementById("link");
```

- 注意：`getElementById` 方法返回值的类型是 **HTMLElement**，该类型只包含所有标签**公共**的属性或方法，不包含 a 标签**特有**的 href 等属性。因此，这个类型太宽泛（不具体），无法操作 href 等 a 标签特有的属性或方法。
- 解决方式：这种情况下就需要使用**类型断言指定更加具体的类型**。

```typescript
const aLink1 = document.getElementById("link") as HTMLAnchorElement; // 推荐第一种
const aLink2 = <HTMLAnchorElement>document.getElementById("link"); // 不推荐这个
```

1.  使用 **as** 关键字，as 后面的类型是一个更加具体的类型（HTMLAnchorElement 是 HTMLElement 的子类型）。
2.  通过类型断言，aLink 的类型变得更加具体，这样就可以访问 a 标签特有的属性或方法了。
    > 技巧：在浏览器控制台，通过 `console.dir()` 打印 DOM 元素，在属性列表的最后面，即可看到该元素的具体类型。`$0`就是当前选中的元素

![在这里插入图片描述](https://img-blog.csdnimg.cn/9e5a899c2d674fe2b9662ef07248f6af.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/295550aec680411fa9a8ca76ade81b6f.png#pic_center)

## 3.13 字面量类型

判断如下两个变量类型

```typescript
let str1 = "hello TS";
const str2 = "hello TS";
// let num: 20 = 20; // num 类型为 20
```

通过 TS 类型推论机制，可以得到答案：

1.  变量 str1 的类型为：string。
2.  变量 str2 的类型为：'Hello TS'。

解释：

- str1 是一个变量（let），它的值可以是任意字符串，所以类型为：string。
- str2 是一个常量（const），它的值不能变化只能是 'Hello TS'，所以，它的类型为：'Hello TS'。
- 注意：此处的 'Hello TS'，就是一个字面量类型。也就是说某个特定的字符串也可以作为 TS 中的类型。
- 除字符串外，任意的 JS 字面量（比如，对象、数字等）都可以作为类型使用。

---

使用模式：**字面量类型配合联合类型**一起使用。
使用场景：用来表示一组**明确的可选值**列表。
比如，在贪吃蛇游戏中，游戏的方向的可选值只能是上、下、左、右中的任意一个。

```typescript
function changeDirection(direction: "up" | "down" | "left" | "right") {
  console.log(direction);
}
changeDirection("left"); // 可以
changeDirection("north"); //会报错
```

解释：参数 direction 的值只能是 up/down/left/right 中的任意一个。
优势：相比于 string 类型，使用字面量类型更加精确、严谨。

## 3.14 枚举

## 3.14.1 基本用法

枚举的功能类似于字面量类型+联合类型组合的功能，也可以表示**一组明确的可选值**。
枚举：定义一组命名常量。它描述一个值，该值可以是这些命名常量中的一个。

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
function changeDirection(direction: Direction) {
  console.log(direction);
}
changeDirection(Direction.Up);
```

- 使用 **enum** 关键字定义枚举。
- 约定枚举名称、枚举中的值以**大写字母开头**。
- 枚举中的多个值之间通过 ,（逗号）分隔。
- 定义好枚举后，直接使用枚举名称作为类型注解。
- 如上：形参 direction 的类型为枚举 Direction，那么，实参的值就应该是枚举 Direction 成员的任意一个
- 访问枚举成员，直接通过`枚举名称.枚举的成员`语法访问枚举的成员。

---

注意：在未给枚举的成员赋值时，默认为：从 0 开始自增的数值
给枚举中的成员初始化值，特点：(除第一个枚举成员外)未赋值的枚举成员从前一个枚举成员的数值上加一，如果前一个枚举成员不是数值型，则后一个枚举成员必须赋初值

```typescript
enum Direction5 {
  Up, // 0
  Down = -1, // -1
  Left, // 0
  Right = "right",
  North = -3.3,
  South, // -2,3
  East = "east",
  West = "west",
}
```

---

枚举是 TS 为数不多的非 JavaScript 类型级扩展（不仅仅是类型）的特性之一。
因为：其他类型仅仅被当做类型，而枚举不仅用作类型，还提供值（枚举成员都是有值的）。 也就是说，其他的类型会在编译为 JS 代码时自动移除。但是，枚举类型会被编译为 JS 代码！
![在这里插入图片描述](https://img-blog.csdnimg.cn/e42437cf123848689367f2691f3812a3.png#pic_center)
一般情况下，**推荐使用字面量类型+联合类型组合的方式**，因为相比枚举，这种方式更加直观、简洁、高效

## 3.15 any 类型

原则：**不推荐使用 any**！因为当值的类型为 any 时，可以对该值进行任意操作，并且不会有代码提示。（失去 TS 类型保护的优势）。

```typescript
let obj: any = { x: 0 };
obj.bar = 100;
obj();
const n: number = obj;
```

- 解释：以上操作都不会有任何类型错误提示，即使可能存在错误！
- 隐式具有 any 类型的情况：1 **声明变量**不提供类型也不提供默认值 2 **函数参数**不加类型。 因为不推荐使用 any，所以，这两种情况下都建议提供类型！

## 3.16 typeof

JS 中提供了 typeof 操作符，用来在 JS 中获取数据的类型。
TS 也提供了 typeof 操作符：可以在**类型上下文**中引用变量或属性的类型（类型查询）。

```typescript
console.log(typeof "hello TS"); // string

let p = { x: 1, y: 2 };
function formatePoint(point: { x: number; y: number }) {} // 普通写法
function formatePoint2(point: typeof p) {} // 在类型上下文中引用变量类型
let num: typeof p.x; // 在类型上下文中引用属性类型 number
// typeof 只能用来查询变量或属性的类型，下面这种会报错
function add(num1: number, num2: number) {
  return num1 + num2;
}
let res: typeof add(2, 3);// 报错
```

1. 使用 typeof 操作符来获取变量 p 的类型，结果与第一种（对象字面量形式的类型）相同。
2. typeof 出现在类型注解的位置（参数名称的冒号后面）所处的环境就在类型上下文（区别于 JS 代码）。
3. 注意：typeof 只能用来查询变量或属性的类型，无法查询其他形式的类型（比如，函数调用的类型）。

# 4. TypeScript 高级类型

TS 中的高级类型有很多，重点学习以下高级类型：

1.  class 类
2.  类型兼容性
3.  交叉类型
4.  泛型 和 keyof
5.  索引签名类型 和 索引查询类型
6.  映射类型

## 4.1 class 类

TypeScript 全面支持 ES2015 中引入的 class 关键字，并为其添加了类型注解和其他语法（比如，可见性修饰符等）

```typescript
class Person {
  name: string; // 指定类型不赋初值
  age: 20; // 赋初值，通过TS类型推断，自动将age识别为number
  gender: string = "男"; // 既给定类型，又赋初值
}
let p1 = new Person(); // p1就是Person类型的一个实例化对象
p1.name = "zs";
```

1. 声明成员 age，并设置初始值，此时，可省略类型注解（TS 类型推论 为 number 类型）
2. 声明成员 name ，类型为 string（没有初始值）。

### 4.1.1 构造函数

```typescript
class Person {
  age: number;
  gender: string;
  constructor(age: number, gender: string) {
    this.age = age; // 通过this访问实例对象，实现传参
    this.gender = gender;
  }
}
const p = new Person(16, "女");
console.log(p.age, p.gender);
```

- 成员初始化（比如，age: number）后，才可以通过 this.age 来访问实例成员。
- 需要为构造函数指定类型注解，否则会被隐式推断为 any；构造函数不需要返回值类型。

### 4.1.2 实例方法

方法的类型注解（参数和返回值）与函数用法相同。

```typescript
class Point {
  x = 1;
  y = 2;
  add(n: number): void {
    //没有返回值也可以省略：void
    this.x += n;
    this.y += n;
  }
}
const p = new Point();
p.add(4); // 对象.方法名 调用实例方法
```

### 4.1.3 类的继承

类继承的两种方式：1 `extends`（**继承父类**） 2 `implements`（**实现接口**）。
JS 中只有 extends，而 implements 是 TS 提供的。

方式一：继承父类

```typescript
class Animal {
  move() {
    console.log("走"); // 父类的方法
  }
}
class Dog extends Animal {
  // 继承 父类的方法和属性
  name = "二哈"; // 子类自己的属性
  bark() {
    // 子类自己的方法
    console.log("汪汪");
  }
}
const dog = new Dog();
dog.bark(); // 可以访问子类自己的方法和属性
dog.move(); // 同时可以访问父类的方法和属性
console.log(dog.name);
```

- 通过 extends 关键字实现继承。
- 子类 Dog 继承父类 Animal，则 Dog 的实例对象 dog 就同时具有了父类 Animal 和 子类 Dog 的所有属性和方法。

---

方式二：实现接口

```typescript
interface Singable {
  name: string;
  sing(): void;
}
class Person implements Singable {
  name: string; // 实现接口必须提供接口中所有的方法和属性
  sing(): void {
    console.log("Ciallo～(∠・ω< )⌒☆");
  }
}
const p = new Person();
p.sing();
```

- 通过 `implements` 关键字让 class 实现接口。
- Person 类实现接口 Singable 意味着，Person 类中**必须提供** Singable 接口中指定的**所有方法和属性**。

### 4.1.4 成员修饰符

类成员可见性：可以使用 TS 来控制 class 的方法或属性对于 class 外的代码是否可见。
可见性修饰符包括：1 public（公有的） 2 protected（受保护的） 3 private（私有的）

#### 4.1.4.1 public

- 在类属性或方法前面添加 `public` 关键字，来修饰该属性或方法是共有的。
- 因为 public 是默认可见性，所以，可以直接省略。

```typescript
class Animal {
  public name: string;
  public move() {
    console.log("moving");
  }
}
```

#### 4.1.4.2 protected

protected：表示**受保护的**，仅对其声明所在**类和子类中（非实例对象）可见**

```typescript
// 父类
class Animal {
  // 这个方法是受保护的
  protected move() {
    console.log("走");
  }
  run() {
    this.move();
    console.log("跑");
  }
}
const a = new Animal();
a.move(); // 错误，实例不能访问受保护的成员
// 子类
class Dog extends Animal {
  bark() {
    this.move(); // 子类中可以访问
    console.log("汪汪");
  }
}
```

- 在类属性或方法前面添加 `protected` 关键字，来修饰该属性或方法是受保护的。
- 在子类的方法内部可以通过 `this` 来访问父类中受保护的成员，但是，**对实例不可见**！

#### 4.1.4.3 private

private：表示私有的，只在当前类中可见，对**实例对象以及子类也是不可见的**
在类属性或方法前面添加 `private` 关键字，来修饰该属性或方法是私有的。

```typescript
// 父类
class Animal {
  // 这个方法是私有的的
  private move() {
    console.log("走");
  }
  run() {
    this.move(); // 只在类内部可用
    console.log("跑");
  }
}
const a = new Animal();
a.move(); // 错误，实例不能访问私有的成员
// 子类
class Dog extends Animal {
  bark() {
    this.move(); // 子类中不可以访问
    console.log("汪汪");
  }
}
```

#### 4.1.4.4 readonly

readonly（只读修饰符），表示只读，用来防止在构造函数之外对属性进行赋值。
它允许赋予默认值，但不允许后续修改

```typescript
class Person {
  // 只读属性
  readonly age: number = 18; // 可以给默认值，后续不允许修改
  constructor(age: number) {
    this.age = age;
  }
  setAge() {
    this.age = 20; // 报错了，不允许修改只读的属性
  }
}
```

- 使用 readonly 关键字修饰该属性是只读的，注意只能修饰属性**不能修饰方法**
- 注意：属性 age 后面的类型注解（比如，此处的 number）如果不加，则 age 的类型为 18 （**字面量类型**），所以这里一般都**不省略**类型注解
- 接口或者 {} 表示的对象类型，也可以使用 readonly

```typescript
// 接口
interface IPerson {
  readonly name: string;
}
let obj: IPerson = {
  name: "jack",
};
obj.name = "zs"; // 只读报错
// 对象
let obj2: { readonly name: string } = {
  name: "lucy",
};
obj2.name = "rose"; // 只读报错
```

## 4.2 类型兼容性

### 4.2.1 结构化类型

- 存在两种类型系统：1 Structural Type System（**结构化类型系统**） 2 Nominal Type System（**标明类型系统**）。
- TS 采用的是结构化类型系统，也叫做 duck typing（鸭子类型），类型检查关注的是值所具有的形状。
- 也就是说，在结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型。

```typescript
class Point {
  x: number;
  y: number;
}
class Point2D {
  x: number;
  y: number;
}
const p: Point = new Point2D(); // 结构化类型认为是同一类型不报错
```

解释：

1. Point 和 Point2D 是两个名称不同的类。
2. 变量 p 的类型被显示标注为 Point 类型，但是，它的值却是 Point2D 的实例，并且没有类型错误。
3. 因为 TS 是结构化类型系统，只检查 Point 和 Point2D 的结构是否相同（相同，都具有 x 和 y 两个属性，属性类型也相同）。
4. 但是，如果在 Nominal Type System 中（比如，C#、Java 等），它们是不同的类，类型无法兼容。

---

- 注意：在结构化类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型，这种说法并不准确。
- 更准确的说法：对于对象类型来说，A 的成员至少与 B 相同，则 B 兼容 A（成员多的可以赋值给少的）。

```typescript
class Point2D {
  x: number;
  y: number;
}
class Point3D {
  x: number;
  y: number;
  z: number;
}
const p: Point2D = new Point3D(); // 可以
// const p1: Point3D = new Point2D() // 不可以
```

- Point3D 的成员至少与 Point2D 相同，则 Point2D 兼容 Point3D。
- 所以，成员多的 Point3D 可以赋值给成员少的 Point2D。

### 4.2.2 接口兼容性

除了 class 之外，TS 中的其他类型也存在相互兼容的情况，包括：1 **接口兼容性** 2 **函数兼容性** 等。
接口之间的兼容性，类似于 class。并且，class 和 interface 之间也可以兼容。

```typescript
interface Point {
  x: number;
  y: number;
}
interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}
let p1: Point;
let p2: Point2D = { x: 1, y: 3 };
let p3: Point3D = { x: 1, y: 2, z: 3 };
p1 = p2; // 可以
p1 = p3; // 可以
// class 与 interface 之间也可以兼容
class PointThree {
  x: number;
  y: number;
  z: number;
}
let p4: Point2D = new PointThree(); // 可以
```

### 4.2.3 函数兼容性

函数之间兼容性比较复杂，需要考虑：1 **参数个数** 2 **参数类型** 3 **返回值类型**。

1、参数个数，参数多的兼容参数少的（或者说，**参数少的可以赋值给多的**）。

```typescript
type F1 = (a: number) => void;
type F2 = (a: number, b: number) => void;
let f1: F1 = function (num) {};
let f2: F2 = function (num1, num2) {};
f2 = f1; // 兼容
// f1 = f2;// 不兼容
```

1. 参数少的可以赋值给参数多的，所以，f1 可以赋值给 f2。
2. 在 JS 中**省略用不到的函数参数**实际上是很常见的，这样的使用方式，促成了 TS 中函数类型之间的兼容性。

---

2、参数类型，相同位置的参数类型对于**原始类型**要`相同`或对于**对象类型**`兼容`

```typescript
// 原始类型
type F1 = (a: number) => void;
type F2 = (a: number) => void;
type F3 = (a: string) => void;
let f1: F1;
let f2: F2 = function (num) {};
let f3: F3 = function (str) {};
f1 = f2; // 正常
f1 = f3; // 参数类型不符，报错
```

函数类型 F2 兼容函数类型 F1，因为 F1 和 F2 的第一个参数类型相同。F3 与 F1 则不兼容

```typescript
// 对象类型
interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}
let p: Point2D = { x: 3, y: 3 };
type F2 = (p: Point2D) => void; // 相当于有2个参数的函数类型
type F3 = (p: Point3D) => void; // 相当于有3个参数的函数类型
let f2: F2 = function (p) {};
let f3: F3;
f3 = f2; //可以，反之则报错
```

- 注意，此处与前面讲到的接口兼容性要区分开来。
- 技巧：**将对象拆开，把每个属性看做一个个参数**，则，参数少的（f2）可以赋值给参数多的（f3）

---

3、返回值类型

```typescript
// 原始类型：
type F1 = () => string;
type F2 = () => string;
let f1: F1;
let f2: F2 = () => {
  return "hello";
};
f1 = f2; // 兼容
// 对象类型
type F3 = () => { name: string };
type F4 = () => { name: string; age: number };
let f3: F3;
let f4: F4 = () => {
  return { name: "zs", age: 20 };
};
f3 = f4; //可以，返回值类型是对象的，要求成员多的赋值成员少的
```

- 如果返回值类型是原始类型，此时两个类型要相同，比如类型 F1 和 F2。
- 如果返回值类型是对象类型，此时成员多的可以赋值给成员少的，比如类型 F3 和 F4。

## 4.3 交叉类型

交叉类型（&）：功能类似于接口继承（extends），用于**组合多个类型为一个类型**（常用于对象类型）； 比如

```typescript
interface Person {
  name: string;
  say(): number;
}
interface Contact {
  phone: string;
}
type PersonDetail = Person & Contact;
// 使用交叉类型后，新的类型 PersonDetail 就同时具备了 Person 和 Contact 的所有属性类型
// 相当于 type PersonDetail = {name: string,phone:string,say():number}
let obj: PersonDetail = {
  name: "zs",
  phone: "324",
  say() {
    return 2;
  },
};
```

---

交叉类型（&）和接口继承（extends）的对比：

- 相同点：都可以实现对象类型的组合。
- 不同点：两种方式实现类型组合时，对于**同名属性**之间，处理类型冲突的方式不同。

```typescript
interface A {
  fn: (value: number) => string;
}
interface B extends A {
  // 报错，接口B错误扩展接口A
  fn: (value: string) => string;
}
```

```typescript
interface A {
  fn: (value: number) => string;
}
interface B {
  fn: (value: string) => string;
}
type C = A & B;
let c: C = {
  fn(value: number | string) {
    return "";
  },
};
```

接口继承会报错（类型不兼容）；交叉类型没有错误

## 4.4 泛型

泛型是可以在保证类型安全前提下，让函数等与多种类型一起工作，从而实现复用，常用于：**函数、接口、class** 中。

需求：创建一个 id 函数，传入什么数据就返回该数据本身（也就是说，参数和返回值类型相同）。

```typescript
function getID(value: number): number {
  return value;
}
function getID(value: any): any {
  return value;
}
```

- 比如,getID(10) 调用以上函数就会直接返回 10 本身。但是，该函数只接收数值类型，无法用于其他类型。
- 为了能让函数能够接受任意类型，可以将参数类型修改为 any。但是，这样就失去了 TS 的类型保护，类型不安全。
- 泛型在保证类型安全（不丢失类型信息）的同时，可以让函数等与多种不同的类型一起工作，灵活可复用。
- 实际上，在 C＃和 Java 等编程语言中，泛型都是用来实现可复用组件功能的主要工具之一。

### 4.4.1 泛型函数

- 语法：在函数名称的后面添加 `<>`（尖括号），**尖括号中添加类型变量**，比如此处的 Type。
- 类型变量 Type，是一种特殊类型的变量，它处理类型而不是值。
- 该类型变量相当于一个**类型容器**，能够捕获用户提供的类型（具体是什么类型由**用户调用该函数时指定**）。
- 因为 Type 是类型，因此可以将其作为函数参数和返回值的类型，表示参数和返回值具有相同的类型。
- 类型变量 Type，可以是任意合法的变量名称。

```typescript
// 声明泛型函数
function getID2<Type>(value: Type): Type {
  return value;
}
// 使用泛型函数
getID2<number>(2);
getID2<string>("a2a");
```

- 在调用时，尖括号中指定具体的类型，比如，此处的 number/string。
- 当传入类型 number 后，这个类型就会被函数声明时指定的类型变量 Type 捕获到。此时，Type 的类型就是 number，所以，函数 id 参数和返回值的类型也都是 number。
- 同样，如果传入类型 string，函数 id 参数和返回值的类型就都是 string。
- 这样，通过泛型就做到了让 id 函数与多种不同的类型一起工作，实现了复用的同时保证了类型安全。

---

简化调用泛型函数：

```typescript
function getID<Type>(value: Type): Type {
  return value;
}
let num = getID(2);
let str = getID("abc");
```

解释：

1.  在调用泛型函数时，可以省略 <类型> 来简化泛型函数的调用。
2.  此时，TS 内部会采用一种叫做类型参数推断的机制，来根据传入的实参自动推断出类型变量 Type 的类型。
3.  比如，传入实参 10，TS 会自动推断出变量 num 的类型 number，并作为 Type 的类型。

- 推荐：使用这种简化的方式调用泛型函数，使代码更短，更易于阅读。
- 说明：当编译器无法推断类型或者推断的类型不准确时，就需要显式地传入类型参数。

### 4.4.2 泛型约束

泛型约束：默认情况下，泛型函数的**类型变量** Type 可以代表多个类型，这导致无法访问任何属性。
比如，getID('abc') 调用函数时获取参数的长度：

```typescript
function getID<Type>(value: Type): Type {
  console.log(value.length); // 报错，不能访问value的任何属性
  return value;
}
```

解释：Type 可以代表任意类型，无法保证一定存在 length 属性，比如 number 类型就没有 length。 此时，就需要为**泛型添加约束来收缩类型**（缩窄类型取值范围）。

---

添加泛型约束收缩类型，主要有以下两种方式：1 指定更加具体的类型 2 添加约束。

1、指定更加具体的类型

```typescript
function getID<Type>(value: Type[]): Type[] {
  console.log(value.length);
  return value;
}
function getID2<Type>(value: string): boolean {
  console.log(value.toLowerCase()); // 指定更加具体的类型才能访问此类型的方法
  return false;
}
```

比如，将类型修改为 Type[]（Type 类型的数组），因为只要是数组就一定存在 length 属性，因此就可以访问了。

---

2、添加约束

```typescript
interface ILength {
  length: number;
}
function getID<Type extends ILength>(value: Type): Type {
  console.log(value.length); //将来 传入的类型必须具有length属性
  return value;
}
getID([1, 2]); // 可以，有length属性
getID(2); // 报错，没有length属性
```

解释：

1.  创建描述约束的接口 ILength，该接口要求提供 length 属性。
2.  通过 extends 关键字使用该接口，为泛型（类型变量）添加约束。
3.  该约束表示：传入的类型必须具有 length 属性。
4.  注意：传入的实参（比如，数组）只要有 length 属性即可，这也符合前面接口的类型兼容性。

---

泛型的类型变量可以有多个，并且类型变量之间还可以约束（比如，第二个类型变量受第一个类型变量约束）。
比如，创建一个函数来获取对象中存在的属性的值：

```typescript
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
let person = { name: "jack", age: 18 };
getProp(person, "name");
// 补充（了解）
getProp(18, "toFixed"); // keyof 不光作用于对象，也作用于原始类型
getProp("abc", "split"); // 能揪出该类型的属性
getProp("abc", 1);
getProp(["x"], "length");
```

解释：

1.  添加了第二个类型变量 Key，两个类型变量之间使用（,）逗号分隔。
2.  keyof 关键字接收一个对象类型，生成其键名称（可能是字符串或数字）的联合类型。
3.  本示例中 keyof Type 实际上获取的**是 person 对象所有键的联合类型**，也就是：'name' | 'age'。
4.  类型变量 Key 受 Type 约束，可以理解为：Key 只能是 Type 所有键中的任意一个，或者说只能访问对象中存在的属性。

### 4.4.3 泛型接口

泛型接口：接口也可以配合泛型来使用，以增加其灵活性，增强其复用性。

```typescript
// 声明泛型接口
interface IdFunc<Type> {
  id: (value: Type) => Type;
  ids: () => Type[];
}
let obj: IdFunc<number> = {
  id(value) {
    return value;
  },
  ids() {
    return [1, 3, 4];
  },
};
//id 方法的参数和返回值类型都是 number；ids 方法的返回值类型是 number[]。
```

1.  在接口名称的后面添加 `<类型变量>`，那么，这个接口就变成了泛型接口。
2.  接口的类型变量，对接口中所有其他成员可见，也就是接口中所有成员都可以使用类型变量。
3.  使用泛型接口时，需要**显式指定具体的类型**（比如，此处的 `IdFunc<nunber>`）。

---

实际上，JS 中的数组在 TS 中就是一个泛型接口（了解即可）
![在这里插入图片描述](https://img-blog.csdnimg.cn/d77366c2202f40f0a99a15bd52b560f8.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/cb5e10a5cde24cc68c6fcefc9081f5d7.png)
解释：当我们在使用数组时，TS 会根据数组的不同类型，来自动将类型变量设置为相应的类型。
技巧：可以通过 Ctrl + 鼠标左键（Mac：option + 鼠标左键）来查看具体的类型信息。

### 4.4.4. 泛型类

泛型类：class 也可以配合泛型来使用。

```typescript
class GenericNumber<NumType> {
  defaultValue: NumType;
  add: (x: NumType, y: NumType) => NumType; //采用的是箭头函数形式的类型书写方式
}
const myNum = new GenericNumber<number>();
myNum.defaultValue = 10;
```

1. 类似于泛型接口，在 class 名称后面添加 <类型变量>，这个类就变成了泛型类。
2. 类似于泛型接口，在创建 class 实例时，在`类名后面通过 <类型>` 来指定明确的类型，但不强制显示指定类型。

---

### 4.4.5 泛型工具类型

泛型工具类型：TS 内置了一些常用的工具类型，来简化 TS 中的一些常见操作。
说明：它们都是基于泛型实现的（泛型适用于多种类型，更加通用），并且是内置的，可以直接在代码中使用。
这些工具类型有很多，主要学习以下几个：

1.  `Partial<Type>`
2.  `Readonly<Type>`
3.  `Pick<Type, Keys>`
4.  `Record<Keys, Type>`

---

1、 泛型工具类型 - `Partial<Type>` 用来构造（创建）一个类型，将 Type 的所有属性设置为可选。

```typescript
interface Props {
  id: string;
  children: number[];
}
type PartialProps = Partial<Props>;
// 相当于 下面这个
// interface PartialProps { //可选参数
//   id?: string;
//   children?: number[];
// }
```

解释：构造出来的新类型 PartialProps 结构和 Props 相同，但所有属性都变为**可选**的。

---

2、 泛型工具类型 - `Readonly<Type>` 用来构造一个类型，将 Type 的所有属性都设置为 readonly（**只读**）。

```typescript
interface Props {
  id: string;
  children: number[];
}
type ReadonlyProps = Readonly<Props>;

let p: ReadonlyProps = {
  id: "1",
  children: [],
};
p.id = "2"; //当我们想重新给 id 属性赋值时，就会报错：无法分配到 "id" ，因为它是只读属性。
```

解释：构造出来的新类型 ReadonlyProps 结构和 Props 相同，但所有属性都变为只读的。

---

3、 泛型工具类型 - `Pick<Type, Keys>` 从 Type 中选择一组属性来构造新类型。

```typescript
interface Props {
  id: string;
  title: string;
  children: number[];
}
type PickProps = Pick<Props, "id" | "title">;
//构造出来的新类型 PickProps，只有 id 和 title 两个属性类型。
```

- Pick 工具类型有两个类型变量：1 表示选择谁的属性 2 表示选择哪几个属性。
- 其中第二个类型变量，如果只选择一个则只传入该属性名即可。
- 第二个类型变量传入的属性只能是第一个类型变量中存在的属性。

---

4、 泛型工具类型 - `Record<Keys,Type>` 构造一个对象类型，属性键为 Keys，属性类型为 Type。

```typescript
type RecordObj2 = {
  a: string[];
  b: string[];
  c: string[];
};
// 简化写法
type RecordObj = Record<"a" | "b" | "c", string[]>;
let obj: RecordObj = {
  a: ["abc"],
  b: ["abc"],
  c: ["abc"],
};
```

- Record 工具类型有两个类型变量：1 表示对象有哪些属性 2 表示对象属性的类型。
- 构建的新对象类型 RecordObj 表示：这个对象有三个属性分别为 a/b/c，属性值的类型都是 `string[]`。

## 4.5 索引签名类型

绝大多数情况下，我们都可以在使用对象前就确定对象的结构，并为对象添加准确的类型。
使用场景：当无法确定对象中有哪些属性（或者说对象中可以出现任意多个属性），此时，就用到索引签名类型了。

```typescript
interface AnyObject {
  [key: string]: number;
}
let obj: AnyObject = {
  a: 2,
  b: 3,
  abc: 5,
};
```

1. 使用 `[key: string]` 来约束该接口中允许出现的属性名称。表示只要是 string 类型的属性名称，都可以出现在对象中。
2. 这样，对象 obj 中就可以出现任意多个属性（比如，a、b 等）。
3. key 只是一个占位符，可以换成任意合法的变量名称。
4. 隐藏的前置知识：JS 中对象（{}）的**键是 string 类型**的。

---

在 JS 中**数组是一类特殊的对象**，特殊在数组的键（索引）是数值类型。
并且，数组也可以出现任意多个元素。所以，在数组对应的泛型接口中，也用到了索引签名类型。

```typescript
interface MyArray<T> {
  [index: number]: T;
}
let arr1: MyArray<number> = [1, 3, 5];
arr1[2];
```

1.  MyArray 接口模拟原生的数组接口，并使用 [index: number] 来作为索引签名类型。
2.  该索引签名类型表示：只要是 number 类型的键（索引）都可以出现在数组中，或者说数组中可以有任意多个元素。
3.  同时也符合数组索引是 number 类型这一前提。

## 4.6 映射类型

映射类型：基于旧类型创建新类型（对象类型），减少重复、提升开发效率。
比如，类型 PropKeys 有 x/y/z，另一个类型 Type1 中也有 x/y/z，并且 Type1 中 x/y/z 的类型相同：

```typescript
type PropKeys = "x" | "y" | "z";
type Type1 = { x: number; y: number; z: number };
```

这样书写没错，但 x/y/z 重复书写了两次。像这种情况，就可以使用映射类型来进行简化。

```typescript
type PropKeys = "x" | "y" | "z";
type Type2 = { [key in PropKeys]: number };
// 不能在接口中使用
// interface Type3 {
//   [key in PropKeys]: number; // 报错
// }
```

1.  映射类型是基于索引签名类型的，所以，该语法类似于索引签名类型，也使用了 `[]`。
2.  `Key in PropKeys` 表示 Key 可以是 PropKeys 联合类型中的任意一个，类似于 `forin(let k in obj)`。
3.  使用映射类型创建的新对象类型 Type2 和类型 Type1 结构完全相同。
4.  注意：映射类型只能在类型别名中使用，**不能在接口中使用**。

---

映射类型除了根据联合类型创建新类型外，还可以根据对象类型来创建：

```typescript
type Props = { a: number; b: string; c: boolean };
type Type3 = { [key in keyof Props]: number };
```

1. 首先，先执行 `keyof Props` 获取到对象类型 Props 中所有键的联合类型即，'a' | 'b' | 'c'。
2. 然后，`Key in` ... 就表示 Key 可以是 Props 中所有的键名称中的任意一个。

![在这里插入图片描述](https://img-blog.csdnimg.cn/6391ef3be91445c4b662e967cae6b4d9.png)

---

前面讲到的泛型工具类型（比如，`Partial<Type>`）都是基于映射类型实现的。
![在这里插入图片描述](https://img-blog.csdnimg.cn/be26a860befa4228a12f5fb30bcec0e8.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/51fd004b079f40efa21274eda4405be7.png)

1.  `keyof T` 即 keyof Props 表示获取 Props 的**所有键**，也就是：'a' | 'b' | 'c'。
2.  在 [] 后面添加 `?`（问号），表示将这些属性变为**可选的**，以此来实现 Partial 的功能。
3.  冒号后面的 `T[P]` 表示获取 T 中**每个键对应的类型**。比如，如果是 'a' 则类型是 number；如果是 'b' 则类型是 string。
4.  最终，新类型 PartialProps 和旧类型 Props 结构完全相同，只是让所有类型都变为可选了。

---

上面的 `T[P]` 语法，在 TS 中叫做**索引查询（访问）类型**， 用来查询属性的类型。
![在这里插入图片描述](https://img-blog.csdnimg.cn/40c08a9a959a46228a30ddd9f71a2eb4.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/f5a263cb0fc445d8b520c01f3f02c293.png)

解释：`Props['a']` 表示查询类型 Props 中属性 **'a' 对应的类型 number**。所以，TypeA 的类型为 number。
注意：`[]` 中的属性必须存在于被查询类型中，否则就会报错。

---

索引查询类型的其他使用方式：同时**查询多个索引的类型**

```typescript
type Props = { a: number; b: string; c: boolean };
// 获取多个类型
type TypeA = Props["a" | "b"]; // strign | number
// 获取所有类型
type TypeB = Props[keyof Props]; //strign | number | boolean
```

- 使用**字符串字面量的联合类型**，获取属性 a 和 b 对应的类型，结果为： string | number。
- 使用 **keyof** 操作符获取 Props 中所有键对应的类型，结果为： string | number | boolean。

# 5. TypeScript 类型声明文件

## 5.1 概述

几乎所有的 JavaScript 应用都会引入许多第三方库来完成任务需求；这些第三方库不管是否是用 TS 编写的，最终都要编译成 JS 代码，才能发布给开发者使用。

是 TS 提供了类型，才有了代码提示和类型保护等机制。

但在项目开发中使用第三方库时，会发现它们几乎都有相应的 TS 类型，这些类型就是由类型声明文件提供的；

**类型声明文件**：用来**为已存在的 JS 库提供类型信息**。

这样在 TS 项目中使用这些库时，就像用 TS 一样，都会有代码提示、类型保护等机制了。

## 5.2 中的两种文件类型

TS 中有两种文件类型：1 .ts 文件 2 .d.ts 文件。

- .`ts` 文件：

  - 既包含类型信息又可包含执行代码。
  - 可以被编译为 .js 文件，然后，执行代码。
  - 用途：编写程序代码的地方。

- `d.ts` 文件：
  - 只包含类型信息的类型声明文件。
  - 不会生成 .js 文件，仅用于提供类型信息。
  - 用途：为 JS 提供类型信息。

总结：.ts 是 implementation（代码实现文件）；.d.ts 是 declaration（类型声明文件）。 如果要为 JS 库提供类型信息，要使用 .d.ts 文件。

## 5.3 类型声明文件的使用说明

在使用 TS 开发项目时，类型声明文件的使用包括以下两种方式：

1.  使用已有的类型声明文件
2.  创建自己的类型声明文件

### 5.3.1 使用已有的类型声明文件

使用已有的类型声明文件包括：1 **内置类型声明文件** 2 **第三方库的类型声明文**件。

1、内置类型声明文件：TS 为 JS 运行时可用的所有标准化内置 API 都提供了声明文件。
比如，在使用数组时，数组所有方法都会有相应的代码提示以及类型信息：
![在这里插入图片描述](https://img-blog.csdnimg.cn/1ab18539287f4d678abf7ce259fd7d3a.png)
实际上这都是 TS 提供的内置类型声明文件；可以通过 Ctrl + 鼠标左键（Mac：option + 鼠标左键）来查看内置类型声明文件内容。

比如，查看 forEach 方法的类型声明，在 VSCode 中会自动跳转到 lib.es5.d.ts 类型声明文件中。

当然，像 window、document 等 BOM、DOM API 也都有相应的类型声明（lib.dom.d.ts）。

---

2、第三方库的类型声明文件：目前，几乎所有常用的第三方库都有相应的类型声明文件。
第三方库的类型声明文件有两种存在形式：1 库自带类型声明文件 2 由 DefinitelyTyped 提供。

#### 5.3.1.1 库自带类型声明文件

库自带类型声明文件：比如，axios。
![在这里插入图片描述](https://img-blog.csdnimg.cn/53ab296a233643748c9d6b9ac9111e21.png)
解释：这种情况下，正常导入该库，TS 就会自动加载库自己的类型声明文件，以提供该库的类型声明。

#### 5.3.3.2 由 DefinitelyTyped 提供

- DefinitelyTyped 是一个 github 仓库，用来**提供高质量 TypeScript 类型声明**
  地址：[https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
- 可以通过 npm/yarn 来下载该仓库提供的 TS 类型声明包，这些包的名称格式为：@types/\*。 比如，@types/react、@types/lodash 等。
- 说明：在实际项目开发时，如果你使用的第三方库没有自带的声明文件，VSCode 会给出明确的提示，如下图的...点
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/93d430852810475dbf8f2addcecbb62b.png#pic_center)
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/0ad9068f261a415c9e153610a6d31b58.png)
  解释：当安装 @types/_ 类型声明包后，TS 也会自动加载该类声明包，以提供该库的类型声明。
  补充：TS 官方文档提供了一个页面，可以来查询 @types/_ 库，地址为：[https://www.typescriptlang.org/dt/search?search=](https://www.typescriptlang.org/dt/search?search=)

### 5.3.2 创建自己的类型声明文件

创建自己的类型声明文件包含：1 项目内共享类型 2 为已有 JS 文件提供类型声明。

1、 项目内共享类型：如果`多个 .ts` 文件中都用到同一个类型，此时可以创建 .d.ts 文件提供该类型，**实现类型共享**。

操作步骤：

1.  创 建如 index`.d.ts` 类型声明文件，文件名合法即可。
2.  创建需要共享的类型，并使用 **export 导出**（TS 中的类型也可以使用 import/export 实现模块化功能）。
3.  在需要使用共享类型的 .ts 文件中，通过 import 导入即可（.d.ts 后缀导入时，直接省略）。

```typescript
// 在index.d.ts文件中声明类型，并导出
type Props = { x: string; y: number };
export { Props };
// 在需要使用该类型的文件中导入即可
import { Props } from "./index";
let a: Props = { x: "2", y: 2 };
```

---

2、 为已有 JS 文件提供类型声明：

1.  场景一：在将 JS 项目迁移到 TS 项目时，为了让已有的 .js 文件有类型声明。
2.  场景二：成为库作者，创建库给其他人使用。

注意：类型声明文件的编写与模块化方式相关，不同的模块化方式有不同的写法。但由于历史原因，JS 模块化的发展经历过多种变化（AMD、CommonJS、UMD、ESModule 等），而 TS 支持各种模块化形式的类型声明。这就导致，类型声明文件相关内容又多又杂。
演示：基于最新的 ESModule（import/export）来为已有 .js 文件，创建类型声明文件。
![在这里插入图片描述](https://img-blog.csdnimg.cn/8dda19d6f7404e6bbc8d3185686ec9b2.png#pic_center)

- 说明：在导入 .js 文件时，TS 会自动加载与 .js 同名的 .d.ts 文件，以提供类型声明。
- declare 关键字：用于类型声明，为其他地方（比如，.js 文件）已存在的变量声明类型，而不是创建一个新的变量。
- 对于 type、interface 等这些明确就是 TS 类型的（只能在 TS 中使用的），可以省略 declare 关键字。
- 对于 let、function 等具有双重含义（在 JS、TS 中都能用），应该使用 declare 关键字，明确指定此处用于类型声明。

# 6. tsconfig.json 配置文件

- tsconfig.json 文件指定：项目文件和项目编译所需的配置项。
- 注意：TS 的配置项非常多（100+），用到时查文档即可[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)。

1.  tsconfig.json 文件所在目录为项目根目录（与 package.json 同级）。
2.  tsconfig.json 文件 可以自动生成，命令：`tsc --init`。

以下仅做展示

```json
{
  // 编译选项
  "compilerOptions": {
    // 生成代码的语言版本
    "target": "es5",
    // 指定要包含在编译中的 library
    "lib": ["dom", "dom.iterable", "esnext"],
    // 允许 ts 编译器编译 js 文件
    "allowJs": true,
    // 跳过声明文件的类型检查
    "skipLibCheck": true,
    // es 模块 互操作，屏蔽 ESModule 和 CommonJS 之间的差异
    "esModuleInterop": true,
    // 允许通过 import x from 'y' 即使模块没有显式指定 default 导出
    "allowSyntheticDefaultImports": true,
    // 开启严格模式
    "strict": true,
    // 对文件名称强制区分大小写
    "forceConsistentCasingInFileNames": true,
    // 为 switch 语句启用错误报告
    "noFallthroughCasesInSwitch": true,
    // 生成代码的模块化标准
    "module": "esnext",
    // 模块解析（查找）策略
    "moduleResolution": "node",
    // 允许导入扩展名为.json的模块
    "resolveJsonModule": true,
    // 是否将没有 import/export 的文件视为旧（全局而非模块化）脚本文件。
    "isolatedModules": true,
    // 编译时不生成任何文件（只进行类型检查）
    "noEmit": true,
    // 指定将 JSX 编译成什么形式
    "jsx": "react-jsx"
  },
  // 指定允许 ts 处理的目录
  "include": ["src"]
}
```

---

除了在 tsconfig.json 文件中使用编译配置外，还可以通过命令行来使用。
使用演示：`tsc hello.ts --target es6` 后面加上特定参数

注意：

- tsc 后带有输入文件时（比如，tsc hello.ts），将**忽略 tsconfig.json** 文件。
- tsc 后不带输入文件时（比如，tsc），才会启用 tsconfig.json。 所有推荐配置 tsconfig.json 文件,然后直接 `tsc`
