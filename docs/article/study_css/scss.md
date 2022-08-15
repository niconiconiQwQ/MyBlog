---
title: Sass笔记
date: 2022/06/24 08:27 #手动设置最后更新时间
categories: [Sass] # 标签
stick: false # 是否置顶
description: Sass
keyword: Sass, SCSS
---

# Sass 笔记

# 1. Sass 介绍

## 1.1 引言

CSS 预处理器的出现：css 并不能算是一们真正意义上的“编程”语言，它本身无法未完成像其它编程语言一样的嵌套、继承、设置变量等工作。为了解决 css 的不足，开发者们想到了编写一种对 css 进行预处理的“中间语言”，可以实现一些“编程”语言才有的功能，然后自动编译成 css 供浏览识别，这样既一定程度上弥补了 css 的不足，也无需一种新的语言来代替 css 以供浏览器识别，css 预处理语言就此诞生

## 1.2 什么是 Sass

- sass 是最早的 css 预处理语言，由 Ruby 开发者设计和开发。
- scss：sass 从第三代开始，放弃了缩进式风格，并且完全向下兼容普通的 css 代码，这一代的 sass 也被称为 scss,文件后缀名：`.scss`
- 功能：比 css 多出好些功能(如变量、嵌套、运算、混入(Mixin)、维承、指令、颜色处理、函数等)，更容易阅读。
- Sass 的工作方式：在 Sass 源文件中写代码，然后由 Sass 程序(Sass 编译器/转译器)将其转换为最终浏览器能认识的 CSS 文件。
- 官网：[https://sass-lang.com/](https://sass-lang.com/)
- 中文官网：[https://www.sass.hk/](https://www.sass.hk/)
- 其他 css 预处理器：less，stylus

## 1.3 出现的原因

- 传统 CSS 无法嵌套书写导致代码繁重、冗杂、逻辑混乱。
- 传统 CSS 没有变量和样式复用机制，属性值只能以字面量的形式重复输出。
- CSS 预处理器为 CSS 增加一些编程的特性，无需考虑浏览器的兼容性问题。支持嵌套、变量和逻辑等。可以让 CSS 更加简洁、提高代码复用性、逻辑分明等

## 1.4 Sass 和 Scss 的关系

Sass 的缩排语法，对于写惯 css 前端的 web 开发者来说很不直观，也不能将 css 代码加入到 Sass 里面，因此 sass 语法进行了改良，第三代开始，放弃了缩进式风格，并且完全向下兼容普通的 css 代码，这一代的 sass 也被称为 scss。与原来的语法兼容，只是它使用方括号`{}`(新)而不是缩进(旧)来表示选择器的嵌套，并使用分号(新)而不是换行符(旧)来分隔属性

## 1.5 输出风格

SASS 输出样式的风格可以有四种选择

- nestednested(默认):嵌赛缩进的 css 代码
- expanded:展开的多行 css 代码
- compact:简洁格式的 css 代码
- compressed:压缩后的 css 代码

# 2. 安装和配置

- 注意：以下是依赖**vscode 编辑器**的安装和配置

## 2.1 安装必要插件

安装 Live Sass Compiler（编译）和 Sass（代码提示）两个插件
![在这里插入图片描述](https://img-blog.csdnimg.cn/4a55536afd0a40da9556810483dde150.png#pic_center)

## 2.2 配置插件

点击插件右下角的设置图标后点击"扩展设置"，最后点击"在 settings.json 中编辑"，开始设置关于 Live Sass Compiler 的配置
![在这里插入图片描述](https://img-blog.csdnimg.cn/d309d87127254c0b970f31a539f5a785.png#pic_center)
配置说明如下：

```javascript
"liveSassCompile.settings.formats":[
  // This is Default.
  {
    /*
      nested - 嵌套格式
      expanded - 展开模式  适合开发中，代码清晰，直观方便维护
      compact - 紧凑模式
      compressed - 压缩格式 体积小,用于项目上线后
    */
      "format": "expanded", // 可定制出口css样式的格式(nested,expanded,compressed,nested)
      "extensionName": ".css", //生成出来的文件扩展名
      "savePath": null // 保存路径：null 表示保存到当前目录下, 根据需要自行修改
      // "savePath": "~/css" 表示编译的css保存到当前目录下的css文件里
  }
  /* 排除目录 */
],
  /* 排除目录 */
  "liveSassCompile.settings.excludeList": [
    "**/node_modules/**", //表示这些目录下的sass 和scss文件内容变更不会去编译
    ".vscode/**"
],
/* 是否生成对应的map */
"liveSassCompile.settings.generateMap": false,
/* 是否添加兼容前缀 如： -webkit- , -moz- ... */
"liveSassCompile.settings.autoprefix": [
    "> 1%",
    "last 2 versions"
],
"liveSassCompile.settings.showOutputWindow": true
```

详情看官方：[官方配置说明](https://github.com/ritwickdey/vscode-live-sass-compiler/blob/master/docs/settings.md)

# 3. 注释

1. 多行注释 `/* */`，内容会编译到.css 文件中
2. 单行注释 `//`，内容不会编译到.css 文件中
3. 将 `!` 作为多行注释的第一个字符表示在**压缩输出**模式下保留这条注释并输出到 CSS 文件中，通常用于添加版权信息。

例如：

```css
/* 
	hello
	world!
*/
// compile scss files to css
// it's ready to do it.
html {
  background-color: #000;
}
/*!
	Author: ...
*/
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/f5c2f1e976b74cab9bf31ec097e3f945.png#pic_center)

# 4. 变量

## 4.1 定义和使用

- 定义规则：
  变量以美元符号($)开头，后面跟变量名；
  变量名是不以数字开头的可包含字母、数字、下划线、横线（连接符）；
  写法同 css，即变量名和值之间用冒号(:)分隔；
  变量一定要先定义，后使用；

```css
$color: #000; /* 定义 */
$pen-size: 3em;
body {
  background-color: $color; /* 使用 */
  font-size: $pen-size;
}
```

- 通过连接符与下划线 定义的同名变量为同一变量，建议使用连接符

```css
$font-size: 14px;
$font_size: 16px;
.container {
  font-size: $font-size;
}
```

## 4.2 作用域

变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。将局部变量转换为全局变量可以添加 `!global` 声明

```css
$color1: #000;
body {
  $color2: #fff;
  $color3: #ccc !global;
}
div {
  color: $color1; /* 可以 */
  color: $color2; /* 错误，编译会出错 */
  color: $color3; /* 可以 */
}
```

如上：$color1为全局变量，$color2 位局部变量，$color3 为全局变量

# 5. 数据类型

SassScript 支持 7 种主要的数据类型：

- 数字：`1, 2, 13, 10px ,5a ` (其中 5a,6b 等数字开头虽然看上去不是数字单位，但在 sass 里也算数字类型，但我们变量定义要规范，不要这样写)
- 字符串：有引号字符串与无引号字符串，`"foo", 'bar', baz`
- 颜色：`blue, #04a3f9, rgba(255,0,0,0.5)`
- 布尔型：`true, false`
- 空值：`null`
- 数组 (list)：用空格或逗号作分隔符，`1.5em 1em 0 2em, Helvetica, Arial, sans-serif`
- maps：相当于 JavaScript 的 object，`(key1: value1, key2: value2)`

SassScript 也支持其他 CSS 属性值，比如 Unicode 字符集，或 `!important` 声明。然而 Sass 不会特殊对待这些属性值，一律视为无引号字符串。

判断数据类型的方式：`type-of($value)`

## 5.1 字符串 (Strings)

SassScript 支持 CSS 的两种字符串类型：`有引号字符串 (quoted strings)`，和`无引号字符串 (unquoted strings)`。

```css
$name: "Tom Bob";
$container: "top bottom";
$what: heart;
/*注：在编译 CSS 文件时不会改变其类型。只有一种情况例外，使用 `#{}`(interpolation) 时，
有引号字符串将被编译为无引号字符串，这样便于在 mixin 中引用选择器名 */
```

## 5.2 数字(Numbers)

SassScript 支持两种数字类型：`带单位数字`和`不带单位数字`。（可正可负可为零，可正可浮点）

```css
$my-age: 19;
$your-age: 19.5;
$height: 120px;
// 注：单位会和数字当做一个整体，进行算数运算
```

## 5.3 空值(Null)

只有一个取值`null`

```css
$value: null;
// 注：由于它代表空，所以不能够使用它与任何类型进行算数运算
```

## 5.4 布尔型(Booleans)

只有两个取值：`true`和`false`
只有自身是 false 和 null 才会返回 false，其他一切都将返回 true

```css
$a: true;
$b: false;
// 注：只有自身是false和null才会返回false，其他一切都将返回true
```

## 5.5 数组 (Lists)

通过空格或者逗号分隔的一系列的值。事实上，独立的值也被视为数组 —— 只包含一个值的数组。索引从`1`开始

```css
$list0: 1px 2px 5px 6px;
$list1: 1px 2px, 5px 6px;
$list2: (1px 2px) (5px 6px);
```

注意点：
数组中可以包含子数组，比如 `1px 2px, 5px 6px` 是包含 `1px 2px` 与 `5px 6px` 两个数组的数组。如果内外两层数组使用相同的分隔方式，需要用圆括号包裹内层，所以也可以写成 `(1px 2px) (5px 6px)`。变化是，之前的 `1px 2px, 5px 6px` 使用逗号分割了两个子数组 (comma-separated)，而 `(1px 2px) (5px 6px)` 则使用空格分割(space-separated)。

当数组被编译为 CSS 时，Sass 不会添加任何圆括号（CSS 中没有这种写法），所以 `(1px 2px) (5px 6px)` 与 `1px 2px, 5px 6px` 在编译后的 CSS 文件中是完全一样的，但是它们在 Sass 文件中却有不同的意义，前者是包含两个数组的数组，而后者是包含四个值的数组。

用 `()` 表示不包含任何值的空数组（在 Sass 3.3 版之后也视为空的 map）。空数组不可以直接编译成 CSS，比如编译 `font-family: ()` Sass 将会报错。如果数组中包含空数组或空值，编译时将被清除，比如 `1px 2px () 3px` 或 `1px 2px null 3px`。

基于逗号分隔的数组允许保留结尾的逗号，这样做的意义是强调数组的结构关系，尤其是需要声明只包含单个值的数组时。例如 `(1,)` 表示只包含 `1` 的数组，而 `(1 2 3,)` 表示包含 `1 2 3` 这个以空格分隔的数组的数组。

## 5.6 映射(Maps)

Maps 必须被圆括号包围，可以映射任何类型键值对（任何类型，包括内嵌 maps，不过不推荐这种内嵌方式）

```css
$map: (
  $key1: value1,
  $key2: value2,
  $key3: value3
);
```

## 5.7 颜色 (Colors)

CSS 原有颜色类型，十六进制、RGB、RGBA、HSL、HSLA 和色彩单词
SCSS 提供了内置 Colors 函数，从而更方便地使用颜色

```css
$color0: green;
$color1: lighten($color, 15%);
$color2: darken($color, 15%);
$color3: saturate($color, 15%);
$color4: desaturate($color, 15%);
$color5: (green + red);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/fa59434e79da4d389f30608bb5bee6dd.png#pic_center)

# 6. 运算

## 6.1 数字运算符

Sass 支持数字的加减乘除、取整等运算 (`+, -, *, /, %`)，如果必要会在不同单位间转换值
如果要保留运算符号，则应该使用插值语法

### 6.1.1 加 +

```css
// 纯数字
$add1: 1 + 2; // 3
$add2: 1 + 2px; // 3px
$add3: 1px + 2; // 3px
$add4: 1px + 2px; //3px

// 纯字符串
$add5: "a" + "b"; // "ab"
$add6: "a" + b; // "ab"
$add7: a + "b"; // ab
$add8: a + b; // ab

// 数字和字符串
$add9: 1 + a; // 1a
$adda: a + 1; // a1
$addb: "1" + a; // "1a"
$addc: 1 + "a"; // "1a"
$addd: "a" + 1; // "a1"
$adde: a + "1"; // a1
$addf: 1 + "1"; // "11"
```

- 总结： 1.纯数字：只要有单位，结果必有单位 2.纯字符串：第一个字符串有无引号决定结果是否有引号 3.数字和字符串：第一位有引号，结果必为引号；第一位对应数字非数字且最后一位带有引号，则结果必为引号

### 6.1.2 减 -

```css
$add1: 1 - 2; // -1
$add2: 1 - 2px; // -1px
$add3: 1px - 2; // -1px
$add4: 1px - 2px; //-1px

$sub1: a - 1; // a-1
$sub2: 1 - a; // 1-a
$sub3: "a" - 1; // "a"-1
$sub4: a - "1"; // a-"1"
```

- 总结：
  每个字段必须前部分为数字，且两个字段只能一个后部分是字符(因为此时后缀被当被单位看待了)。
  只要其中一个值首位不为数字的，结果就按顺序去除空格后拼接起来

### 6.1.3 乘 \*

```css
$num1: 1 * 2; // 2
$mul2: 1 * 2px; // 2px
$num3: 1px * 2; // 2px
$num4: 2px * 2px; // 编译不通过,在使用此变量是编译不通过

$num5: 1 * 2abc; // 2abc
```

- 注意：每个字段必须前部分为数字，且两个字段只能一个后部分是字符(因为此时后缀被当被单位看待了)。其余编译不通过

### 6.1.4 除 /

以下三种情况 / 将被视为除法运算符号：
如果值，或值的一部分，是变量或者函数的返回值
如果值被圆括号包裹
如果值是算数表达式的一部分

```css
p {
  font: 10px/8px; // Plain CSS, no division
  $width: 1000px;
  width: $width/2; // Uses a variable, does division
  width: round(1.5) / 2; // Uses a function, does division
  height: (500px/2); // Uses parentheses, does division
  margin-left: 5px + 8px/2px; // Uses +, does division
}
```

- 注意： 1.不会四舍五入，精确到小数点后 5 位 2.每个字段必须前部分为数字，且当前者只是单纯数字无单位时，后者(除数)后部分不能有字符。其余结果就按顺序去除空格后拼接起来。(因为此时后缀被当被单位看待了)

### 6.1.5 取余 %

值与"%"之间必须要有空格，否则会被看做字符串

## 6.2 关系运算符

大前提：两端必须为`数字` 或 `前部分数字后部分字符`
返回值：`true` or `false`

```css
$a: 1 > 2; // false
$a$a: 1 < 2; // true
$a: 1 >= 2; // false
$a: 1 <= 2; // true
```

## 6.3 相等运算符

作用范围：相等运算 `==, !=` 可用于所有数据类型
返回值：`true` or `false`

```css
$a: 1 == 1px; // true
$b: "a" == a; // true
```

- 注意：前部分为不带引号数字时，对比的仅仅是数字部分；反之，忽略引号，要求字符一一对应

## 6.4 布尔运算符

Sass 支持布尔型的 `and` `or` 以及 `not` 运算。

```css
$a: 1>0 and 0>=5; // false
```

- 注意：值与"and"、"or"和"not"之间必须要有空格，否则会被看做字符串

## 6.5 颜色值运算

颜色值的运算是分段计算进行的，也就是分别计算红色，绿色，以及蓝色的值 1.`颜色值与颜色值`

```css
p {
  color: #010203 + #040506;
}
// 计算 01 + 04 = 05 02 + 05 = 07 03 + 06 = 09，然后编译为
// p {color: #050709;}
```

2.`颜色值与数字`

```css
p {
  color: #010203 * 2;
}
// 计算 01 * 2 = 02 02 * 2 = 04 03 * 2 = 06，然后编译为
// p {color: #020406;}
```

3.`RGB和HSL`

```css
// 如果颜色值包含 alpha channel（rgba 或 hsla 两种颜色值），必须拥有相等的 alpha 值才能进行运算，因为算术运算不会作用于 alpha 值。
p {
  color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75);
}
// p {color: rgba(255, 255, 0, 0.75);}
```

## 6.6 运算优先级

0. `()`

1. `*`、`/`、`%`
2. `+`、`-`
3. `>` 、`<`、`>=`、`<=`

# 7. 嵌套语句

## 7.1 嵌套规则

Sass 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器，例如：

```css
#main {
  width: 97%;
  p,
  div {
    font-size: 2em;
    a {
      font-weight: bold;
    }
  }
  pre {
    font-size: 3em;
  }
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/16bb43dfbf5c410287d62a8f4a2485a5.png#pic_center)

嵌套功能避免了重复输入父选择器，而且令复杂的 CSS 结构更易于管理

## 7.2 父选择器

在嵌套 CSS 规则时，有时也需要直接使用嵌套外层的父选择器，例如，当给某个元素设定 hover 样式时，或者当 body 元素有某个 classname 时，可以用 & 代表嵌套规则外层的父选择器。(伪元素常用)

`&`父选择器

```css
a {
  color: yellow;
  &:hover {
    color: green;
  }
  &:active {
    color: blank;
  }
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/63e54c23b4f04673b36f66f76d73c6e3.png#pic_center)
编译后的 CSS 文件中 & 将被替换成嵌套外层的父选择器，如果含有多层嵌套，最外层的父选择器会一层一层向下传递：

```css
#main {
  color: black;
  a {
    font-weight: bold;
    &:hover {
      color: red;
    }
  }
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/a4c2e9ca8358433599bed6a0b69e9e14.png#pic_center)

## 7.3 属性嵌套

有些 CSS 属性遵循相同的命名空间 (namespace)，比如 font-family, font-size, font-weight 都以 font 作为属性的命名空间。为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中

```css
.container a {
  color: #333;
  font-size: 14px;
  font-family: sans-serif;
  font-weight: bold;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/af583b14b9454dfb9827a90b55bc8a1e.png#pic_center)
注意 font：后面要加一个空格

# 8. 其他补充

## 8.1 插值语法

通过 `#{}` 插值语句可以在选择器、属性名和属性值中使用变量。可以联想模板字符串

```css
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: $name;
}

// 编译后：
p.foo {
  border-color: foo;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/6bbe11554a504c99b6155e8bff880be5.png#pic_center)

## 8.2 !default

可以在变量的结尾添加 `!default` 给一个未通过 `!default` 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值。

```css
$content: "First content";
$content: "Second content?" !default;

$new_content: "First time reference" !default;

$new_content2: null;
$new_content2: "define null" !default;

#main {
  content: $content;
  new-content: $new_content;
  new_content: $new_content2;
}
```

编译结果如下图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/a91090f438194ad184d011ec665e475e.png#pic_center)
注意：变量是 null 空值时将视为未被 `!default` 赋值。

## 8.3 !global

将局部变量提升为全局变量

## 8.4 !optional

如果 `@extend` 失败会收到错误提示，比如，这样写 `a.important {@extend .notice}`，当没有 `.notice` 选择器时，将会报错，只有 `h1.notice` 包含 `.notice` 时也会报错，因为 `h1` 与 `a` 冲突，会生成新的选择器。

如果要求 `@extend` 不生成新选择器，可以通过 `!optional` 声明达到这个目的.

简而言之：当`@extend`相关代码出现语法错误时，编译器可能会给我们"乱"编译为 css，我们加上这个参数可以在出现问题后不让他编译该部分代码

# 9. @-Rules 与指令

## 9.1 @import

- Sass 拓展了 `@import` 的功能，允许其导入 SCSS 或 SASS 文件。被导入的文件将合并编译到同一个 CSS 文件中，另外，被导入的文件中所包含的变量或者混合指令 (mixin) 都可以在导入的文件中使用。
- 通常，`@import` 寻找 Sass 文件并将其导入，但在以下情况下，`@import` 仅作为普通的 CSS 语句，不会导入任何 Sass 文件。
  ① 文件拓展名是 `.css`；
  ② 文件名以 `http://` 开头；
  ③ 文件名是 `url()`；
  ④`@import` 包含 media queries。
- 如果不在上述情况内，文件的拓展名是 `.scss` 或 `.sass`，则导入成功。没有指定拓展名，Sass 将会试着寻找文件名相同，拓展名为 `.scss` 或 `.sass` 的文件并将其导入。

```css
@import "foo.scss";
@import "foo";
// 以上两种方式均可

// 以下方式均不可行
@import "foo.css";
@import "foo" screen;
@import "http://foo.com/bar";
@import url(foo);
```

Sass 允许同时导入多个文件，例如同时导入 rounded-corners 与 text-shadow 两个文件：

```css
@import "rounded-corners", "text-shadow";
```

导入文件也可以使用 `#{ }` 插值语句，但不是通过变量动态导入 Sass 文件，只能作用于 CSS 的 `url()` 导入方式：

```css
$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=\#{$family}");

// 编译为：
@import url("http://fonts.googleapis.com/css?family=Droid+Sans");
```

如果你有一个 SCSS 或 Sass 文件需要引入， 但是你又不希望它被编译为一个 CSS 文件， 这时，你就可以在文件名前面加一个下划线，就能避免被编译。 这将告诉 Sass 不要把它编译成 CSS 文件。 然后，你就可以像往常一样引入这个文件了，而且还可以省略掉文件名前面的下划线。
除此之外，还支持嵌套 @import,但是不可以在混合指令 (mixin) 或控制指令 (control directives) 中嵌套 `@import`。

## 9.2 @media

Sass 中 `@media` 指令与 CSS 中用法一样，只是增加了一点额外的功能：允许其在 CSS 规则中嵌套。如果 `@media` 嵌套在 CSS 规则内，编译时，`@media` 将被编译到文件的最外层，包含嵌套的父选择器。这个功能让 `@media` 用起来更方便，不需要重复使用选择器，也不会打乱 CSS 的书写流程。

```css
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}
// 编译为
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}
```

`@media`的 queries 允许互相嵌套使用，编译时，Sass 自动添加 `and`

```css
@media screen {
  .sidebar {
    @media (orientation: landscape) {
      width: 500px;
    }
  }
}
// 编译为：
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}
```

`@media` 甚至可以使用 SassScript（比如变量，函数，以及运算符）代替条件的名称或者值

```css
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;

@media #{$media} and ($feature: $value) {
  .sidebar {
    width: 500px;
  }
}
// 编译为：
@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
  .sidebar {
    width: 500px;
  }
}
```

## 9.3 @extend

`@extend`即`继承`。在设计网页的时候常常遇到这种情况：一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。
总的来看：支持层叠继承、多继承、允许延伸任何定义给单个元素的选择器（但是允许不一定好用）

a. `基本延伸`

```css
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
// 上面代码的意思是将 .error 下的所有样式继承给 .seriousError，
//border-width: 3px; 是单独给 .seriousError 设定特殊样式，
//这样，使用 .seriousError 的地方可以不再使用 .error。
```

`@extend` 的作用是将重复使用的样式 (`.error`) 延伸 (extend) 给需要包含这个样式的特殊样式（`.seriousError`）
注意理解以下情况：

```css
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.error.intrusion {
  background-image: url("/image/hacked.png");
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
// .error, .seriousError {
  border: 1px #f00;
  background-color: #fdd; }

.error.intrusion, .seriousError.intrusion {
  background-image: url("/image/hacked.png"); }

.seriousError {
  border-width: 3px; }
```

当合并选择器时，`@extend` 会很聪明地避免无谓的重复，`.seriousError.seriousError` 将编译为 `.seriousError`，不能匹配任何元素的选择器也会删除。

b. `延伸复杂的选择器`：Class 选择器并不是唯一可以被延伸 (extend) 的，Sass 允许延伸任何定义给单个元素的选择器，比如 `.special.cool`，`a:hover` 或者 `a.user[href^="http://"]` 等

c. ` 多重延伸`：同一个选择器可以延伸给多个选择器，它所包含的属性将继承给所有被延伸的选择器

d. `继续延伸`：当一个选择器延伸给第二个后，可以继续将第二个选择器延伸给第三个

e.`*选择器列`：暂时不可以将选择器列 (Selector Sequences)，比如 `.foo .bar` 或 `.foo + .bar`，延伸给其他元素，但是，却可以将其他元素延伸给选择器列。

尽量不使用`合并选择器列`，因为如果凭个人推理的话，会出现排列组合的情况，所以 SASS 编译器只会保留有用的组合形式，但依旧会存在排列组合的情况，有可能会留下隐患。

1.当两个列合并时，如果没有包含相同的选择器，将生成两个新选择器：第一列出现在第二列之前，或者第二列出现在第一列之前

```css
#admin .tabbar a {
  font-weight: bold;
}
#demo .overview .fakelink {
  @extend a;
}
// 编译为：
#admin .tabbar a,
#admin .tabbar #demo .overview .fakelink,
#demo .overview #admin .tabbar .fakelink {
  font-weight: bold;
}
```

2.如果两个列包含了相同的选择器，相同部分将会合并在一起，其他部分交替输出

```css
#admin .tabbar a {
  font-weight: bold;
}
#admin .overview .fakelink {
  @extend a;
}
// 编译为
#admin .tabbar a,
#admin .tabbar .overview .fakelink,
#admin .overview .tabbar .fakelink {
  font-weight: bold;
}
```

f. `在指令中延伸`
在指令中使用 `@extend` 时（比如在 `@media` 中）有一些限制：Sass 不可以将 `@media` 层外的 CSS 规则延伸给指令层内的 CSS.
g. `%placeholder`为选择器占位符，配合`@extend-Only选择器`使用。
效果：只定义了样式，但不会对原有选择器匹配的元素生效

```css
// example1:
%img {
  color: red;
}
.path {
  @extend %img;
}
// 编译后：
.path {
  color: red;
}
```

```css
// example2:
#context a%extreme {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
// 编译后：
.notice {
  @extend %extreme;
}

// 注：必须是"."和"#"选择器
```

## 9.4 @at-root

@at root 指令使一个或多个规则在文档的根发出，而不是嵌套在其父选择器下。它可以与单个内联选择器一起使用；且@at-root 使多个规则跳出嵌套

@at-root 默认情况下并不能使规则或者选择器跳出指令，通过使用 without 和 with 可以解决该问题
本知识了解即可

## 9.5 @debug

用于调试，按标准错误输出流输出

```css
$size: 9px;
.file {
  @debug $size;
}
```

## 9.6 @warn

用于警告，按标准错误输出流输出

## 9.7 @error

用于报错，按标准错误输出流输出

总结：
| 序列 | @-rules | 作用 |
| ---- | -------- | ---------------------------------- |
| 1 | @import | 导入 sass 或 scss 文件 |
| 2 | @media | 用于将样式规则设置为不同的媒体类型 |
| 3 | @extend | 以继承的方式共享选择器 |
| 4 | @at-root | 转到根节点 |
| 5 | @debug | 用于调试，按标准错误输出流输出 |
| 6 | @warn | 用于警告，按标准错误输出流输出 |
| 7 | @error | 用于报错，按标准错误输出流输出 |

# 10. 控制指令

## 10.1 if()

三元运算符
表达式：`if(expression, value1, value2)`

```css
p {
  color: if(1 + 1 == 2, green, yellow);
}

// compile:
p {
  color: green;
}
```

## 10.2 @if

条件语句
当 `@if` 的表达式返回值不是 `false` 或者 `null` 时，条件成立，输出 `{}` 内的代码
`@if` 声明后面可以跟多个 `@else if` 声明，或者一个 `@else` 声明。如果 `@if` 声明失败，Sass 将逐条执行 `@else if` 声明，如果全部失败，最后执行 `@else` 声明

`单@if`

```css
p {
  @if 1 + 1 == 2 {
    color: red;
  }
}
// compile:
p {
  color: red;
}
```

`@if - @else`

```css
p {
  @if 1 + 1 != 2 {
    color: red;
  } @else {
    color: blue;
  }
}

// compile:
p {
  color: blue;
}
```

`@if - @else if - @else`

```css
$age: 19;

p {
  @if $age == 18 {
    color: red;
  } @else if $age == 19 {
    color: blue;
  } @else {
    color: green;
  }
}

// compile:
p {
  color: blue;
}
```

## 10.3 @for

_循环语句_
表达式：`@for $var from <start> through <end>` 或 `@for $var from <start> to <end>`

through 和 to 的相同点与不同点：

- 相同点：两者均包含`<start>`的值
- 不同点：through 包含`<end>`的值，但 to 不包含`<end>`的值

```css
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}
// compile:
.item-1 {
  width: 2em;
}
.item-2 {
  width: 4em;
}
.item-3 {
  width: 6em;
}
```

## 10.4 @while

_循环语句_
表达式：`@while expression`
`@while` 指令重复输出格式直到表达式返回结果为 `false`。这样可以实现比 `@for` 更复杂的循环，只是很少会用到

```css
$i: 6;
@while $i > 0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}
// compile:
.item-6 {
  width: 12em;
}
.item-4 {
  width: 8em;
}
.item-2 {
  width: 4em;
}
```

## 10.5 @each

_循环语句_
表达式：`$var in $vars`
`$var` 可以是任何变量名
`$vars` 只能是`Lists`或者`Maps`

- 一维列表

```css
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url("/images/#{$animal}.png");
  }
}

// compile:
.puma-icon {
  background-image: url("/images/puma.png");
}
.sea-slug-icon {
  background-image: url("/images/sea-slug.png");
}
.egret-icon {
  background-image: url("/images/egret.png");
}
.salamander-icon {
  background-image: url("/images/salamander.png");
}
```

- 二维列表

```css
@each $animal, $color, $cursor in (puma, black, default), (
    sea-slug,
    blue,
    pointer
  ), (egret, white, move)
{
  .#{$animal}-icon {
    background-image: url("/images/#{$animal}.png");
    border: 2px solid $color;
    cursor: $cursor;
  }
}

// compile:
.puma-icon {
  background-image: url("/images/puma.png");
  border: 2px solid black;
  cursor: default;
}
.sea-slug-icon {
  background-image: url("/images/sea-slug.png");
  border: 2px solid blue;
  cursor: pointer;
}
.egret-icon {
  background-image: url("/images/egret.png");
  border: 2px solid white;
  cursor: move;
}
```

- maps

```css
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}

// compile:
h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.5em;
}
h3 {
  font-size: 1.2em;
}
```

一个示例：
传统 css 实现除背景色不同，其他相同的样式

```css
p {
  width: 10px;
  height: 10px;
  display: inline-block;
  margin: 10px;
}
.p0 {
  background-color: red;
}
.p1 {
  background-color: green;
}
.p2 {
  background-color: blue;
}
.p3 {
  background-color: turquoise;
}
.p4 {
  background-color: darkmagenta;
}
```

用@each 改进

```css
$color-list: red green blue turquoise darkmagenta;
@each $color in $color-list {
  $index: index($color-list, $color);
  .p#{$index - 1} {
    background-color: $color;
  }
}
```

# 11. 混合指令

混合指令（Mixin）用于定义可重复使用的样式，避免了使用无语意的 class，比如 `.float-left`。混合指令可以包含所有的 CSS 规则，绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。

注意：这不是函数！没有返回值！

## 11.1 定义混合指令

混合指令的用法是在 `@mixin` 后添加名称与样式，以及需要的参数（可选）。

```css
// 格式：
@mixin name {
  // 样式....
}
```

```css
// example：
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
```

## 11.2 引用混合样式

使用 `@include` 指令引用混合样式，格式是在其后添加混合名称，以及需要的参数（可选）。

```css
// 格式：
@include name;
// 注：无参数或参数都有默认值时，带不带括号都可以
```

```css
// example：
p {
  @include large-text;
}

// compile:
p {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
}
```

## 11.3 参数

格式：按照变量的格式，通过逗号分隔，将参数写进 Mixin 名称后的圆括号里
支持默认值；支持多参数；支持不定参数；支持位置传参和关键词传参

- a. 位置传参

```css
@mixin mp($width) {
  margin: $width;
}

body {
  @include mp(300px);
}
```

- b.关键词传参

```css
@mixin mp($width) {
  margin: $width;
}

body {
  @include mp($width: 300px);
}
```

- c.指定默认值

```css
// 定义块元素内边距，参数指定默认值
@mixin block-padding($top: 0, $right: 0, $bottom: 0, $left: 0) {
  padding-top: $top;
  padding-right: $right;
  padding-bottom: $bottom;
  padding-left: $left;
}

// 可指定参数赋值
.container {
  // 不带参数
  //@include block-padding;
  //按顺序指定参数值
  //@include block-padding(10px,20px);
  //给指定参数指定值
  @include block-padding($left: 10px, $top: 20px);
}
```

- d.可变参数
  Variable Arguments
  有时，不能确定混合指令需要使用多少个参数。这时，可以使用参数变量 `…` 声明（写在参数的最后方）告诉 Sass 将这些参数视为值列表处理

```css
/** 
    *定义线性渐变
    *@param $direction  方向
    *@param $gradients  颜色过度的值列表
 */

@mixin linear-gradient($direction, $gradients...) {
  background-color: nth($gradients, 1);
  background-image: linear-gradient($direction, $gradients);
}
使用 .table-data {
  @include linear-gradient(to right, #f00, orange, yellow);
}
```

## 11.4 向混合样式中导入内容

在引用混合样式的时候，可以先将一段代码导入到混合指令中，然后再输出混合样式，额外导入的部分将出现在 `@content` 标志的地方

可以看作参数的升级版

```css
@mixin example {
  html {
    @content;
  }
}
@include example {
  background-color: red;
  .logo {
    width: 600px;
  }
}

// compile:
html {
  background-color: red;
}

html .logo {
  width: 600px;
}
```

## 11.5 mixin 和 extend 的选择

a. @extend、@Mixin 和@function 的选择
[原文链接](https://csswizardry.com/2016/02/mixins-better-for-performance/)

结论：**@extend 我们就尽量不要使用了，而@Mixin 和@function 的差别在定义和使用上**

定义方式不同： `@function` 需要调用`@return`输出结果。而 @mixin 则不需要。

使用方式不同：`@mixin` 使用`@include`引用，而 `@function` 使用小括号执行函数。

# 12. 函数指令

## 12.1 内置函数

a. 字符串函数
索引第一个为 1，最后一个为-1；切片两边均为闭区间
| 函数名和参数类型 | 函数作用 |
| :-------------------------------------- | :-----------------------------------------: |
| quote($string)                          |                  添加引号                   |
| unquote($string) | 除去引号 |
| to-lower-case($string)                  |                  变为小写                   |
| to-upper-case($string) | 变为大写 |
| str-length($string)                     |        返回$string 的长度(汉字算一个) |
| str-index($string，$substring) | 返回$substring在$string 的位置 |
| str-insert($string, $insert, $index)    |       在$string 的$index处插入$insert |
| str-slice($string, $start-at, $end-at） | 截取$string 的$start-at和$end-at 之间的字符串 |

b. 数字函数
| 函数名和参数类型 | 函数作用 |
| ----------------------- | :----------------------------------------------------------: |
| percentage($number)     |                       转换为百分比形式                       |
| round($number) | 四舍五入为整数 |
| ceil($number)           |                         数值向上取整                         |
| floor($number) | 数值向下取整 |
| abs($number)            |                          获取绝对值                          |
| min($number...) | 获取最小值 |
| max($number...)         |                          获取最大值                          |
| random($number?:number) | 不传入值：获得 0-1 的随机数；传入正整数 n：获得 0-n 的随机整数（左开右闭） |

c. 数组函数
| 函数名和参数类型 | 函数作用 |
| -------------------------------- | :----------------------------------------------------------: |
| length($list)                    |                         获取数组长度                         |
| nth($list, n) | 获取指定下标的元素 |
| set-nth($list, $n, $value)       |                   向$list 的$n处插入$value |
| join($list1, $list2, $separator) | 拼接$list1 和 list2；$separator为新list的分隔符，默认为auto，可选择comma、space |
| append($list, $val, $separator)  | 向$list 的末尾添加$val；$separator 为新 list 的分隔符，默认为 auto，可选择 comma、space |
| index($list, $value)             |                返回$value 值在$list中的索引值                 |
| zip($lists…) | 将几个列表结合成一个多维的列表；要求每个的列表个数值必须是相同的 |

d. 映射函数
| 函数名和参数类型 | 函数作用 |
| ----------------------- | :--------------------------------------: |
| map-get($map, $key)     |        获取$map 中$key对应的$value |
| map-merge($map1, $map2) |     合并$map1 和$map2，返回一个新$map |
| map-remove($map, $key)  |     从$map 中删除$key，返回一个新$map |
| map-keys($map)          |            返回$map 所有的$key            |
| map-values($map) | 返回$map所有的$value |
| map-has-key($map, $key) | 判断$map 中是否存在$key，返回对应的布尔值 |
| keywords($args) | 返回一个函数的参数，并可以动态修改其值 |

e. 颜色函数

- **RGB 函数**
  | 函数名和参数类型 | 函数作用 |
  | ------------------------------ | :----------------------------------------------------------: |
  | rgb($red, $green, $blue)       |                     返回一个16进制颜色值                     |
  | rgba($red,$green,$blue,$alpha) | 返回一个rgba；$red,$green和$blue 可被当作一个整体以颜色单词、hsl、rgb 或 16 进制形式传入 |
  | red($color)                    |                   从$color 中获取其中红色值 |
  | green($color)                  |                   从$color 中获取其中绿色值 |
  | blue($color)                   |                   从$color 中获取其中蓝色值 |
  | mix($color1,$color2,$weight?)  |     按照$weight 比例，将$color1和$color2 混合为一个新颜色 |

- **HSL 函数**
  | 函数名和参数类型 | 函数作用 |
  | ---------------------------------------- | ------------------------------------------------------------ |
  | hsl($hue,$saturation,$lightness)         | 通过色相（hue）、饱和度(saturation)和亮度（lightness）的值创建一个颜色 |
  | hsla($hue,$saturation,$lightness,$alpha) | 通过色相（hue）、饱和度(saturation)、亮度（lightness）和透明（alpha）的值创建一个颜色 |
  | saturation($color) | 从一个颜色中获取饱和度（saturation）值 |
  | lightness($color)                        | 从一个颜色中获取亮度（lightness）值                          |
  | adjust-hue($color,$degrees)              | 通过改变一个颜色的色相值，创建一个新的颜色                   |
  | lighten($color,$amount)                  | 通过改变颜色的亮度值，让颜色变亮，创建一个新的颜色           |
  | darken($color,$amount)                   | 通过改变颜色的亮度值，让颜色变暗，创建一个新的颜色           |
  | hue($color) | 从一个颜色中获取亮度色相（hue）值 |

- **Opacity 函数**
  | | |
  | ----------------------------------------------------------- | ---------------- |
  | alpha($color)/opacity($color) | 获取颜色透明度值 |
  | rgba($color,$alpha) | 改变颜色的透明度 |
  | opacify($color, $amount) / fade-in($color, $amount)         | 使颜色更不透明   |
  | transparentize($color, $amount) / fade-out($color, $amount) | 使颜色更加透明 |

- **f. Introspection 函数**

| 函数名和参数类型               |                            函数作用                             |
| ------------------------------ | :-------------------------------------------------------------: |
| type-of($value)                |                        返回$value 的类型                        |
| unit($number)                  |                       返回$number 的单位                        |
| unitless($number)              |            判断$number 是否带单位，返回对应的布尔值             |
| comparable($number1, $number2) | 判断$number1和$number2 是否可以做加、减和合并，返回对应的布尔值 |

2.自定义函数

## 12.2 自定义函数

Sass 支持自定义函数，并能在任何属性值或 Sass script 中使用
Params: 与 Mixin 一致
支持返回值
**基本格式：**

```css
@function fn-name($params...) {
  @return $params;
}
```

```css
// example:
@function fn-name($params...) {
  @return nth($params, 1);
}
p {
  height: fn-name(1px);
}

// compiled:
p {
  height: 1px;
}
```
