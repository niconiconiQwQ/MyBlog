---
title: CSS 基础 + CSS3 新特性
date: 2022/04/16 21:48 #手动设置最后更新时间
categories: [CSS3] # 标签
stick: false # 是否置顶
description: CSS 基础 + CSS3 新特性
keyword: CSS CSS3
---

# 1. CSS 简介

- CSS 是层叠样式表 ( Cascading Style Sheets ) 的简称，也称之为 CSS 样式表或级联样式表.主要用于设置 HTML 页面中的文本内容（字体、大小、对齐方式等）、图片的外形（宽高、边框样式、 边距等）以及版面的布局和外观显示样式。

# 2. CSS 引入方式

- 按照 CSS 样式书写的位置（或者引入的方式），CSS 样式表可以分为三大类： 1.行内样式表（行内式） 2.内部样式表（嵌入式） 3.外部样式表（链接式）

## 2.1 行内样式表

- 行内样式表（内联样式表）是在元素标签内部的 style 属性中设定 CSS 样式。适合于修改简单样式.

```css
<div style="color: red; font-size: 12px;">凉宫</div>
```

1. 可以控制当前的标签设置样式
2. 由于书写繁琐，并且没有体现出结构与样式相分离的思想，所以不推荐大量使用，只有对当前元素添加简 单样式的时候，可以考虑使用
3. 使用行内样式表设定 CSS，通常也被称为行内式引入

## 2.2 内部样式表

- 内部样式表（内嵌样式表）是写到 html 页面内部. 是将所有的 CSS 代码抽取出来，单独放到一个 `<style>` 标签中。

```css
<style>
div {
color: red;
font-size: 12px;
}
</style>
```

- `<style>` 标签理论上可以放在 HTML 文档的任何地方，但一般会放在文档的`<head>`标签中
- 通过此种方式，可以方便控制当前整个页面中的元素样式设置
- 代码结构清晰，但是并没有实现结构与样式完全分离
- 使用内部样式表设定 CSS，通常也被称为嵌入式引入

## 2.3 外部样式表

- 使用外部样式表设定 CSS，通常也被称为外链式或链接式引入，这种方式是开发中常用的方式

```css
<link rel="stylesheet"  href="css文件路径">
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/40f76765e0fb47508f06c02fe0378a7d.png#pic_center)

- 引入外部样式表分为两步：

1. 新建一个后缀名为 .css 的样式文件，把所有 CSS 代码都放入此文件中。
2. 在 HTML 页面中，使用<link> 标签引入这个文件。

## 2.4 CSS 引入方式总结

![在这里插入图片描述](https://img-blog.csdnimg.cn/5e74ecbb52d14a8c85fdc4dc7c220a1e.png#pic_center)

# 3. CSS 选择器

- 选择器(选择符)就是根据不同需求把不同的标签选出来这就是选择器的作用。
- 选择器分为基础选择器和复合选择器两个大类

## 3.1 CSS 基础选择器

- 基础选择器又包括：标签选择器、类选择器、id 选择器和通配符选择器

### 3.1.1 标签选择器

- 标签选择器（元素选择器）是指用 HTML 标签名称作为选择器，按标签名称分类，为页面中某一类标签指定 统一的 CSS 样式。

```css
标签名 {
  属性1: 属性值1;
  属性2: 属性值2;
  属性3: 属性值3;
  ...;
}
```

- 作用
  标签选择器可以把某一类标签全部选择出来，比如所有的 `<div>` 标签和所有的 `<span>` 标签。
- 优点
  能快速为页面中同类型的标签统一设置样式。
- 缺点
  不能设计差异化样式，只能选择全部的当前标签

### 3.1.2 类选择器

- 如果想要差异化选择不同的标签，单独选一个或者某几个标签，可以使用类选择器.

```css
.类名 {
  属性1: 属性值1;
  ...;
}
```

- 结构需要用 class 属性来调用
- 记忆口诀：样式点定义，结构类调用。一个或多个，开发最常用。
- 注意 1.类选择器使用“.”（英文点号）进行标识，后面紧跟类名（自定义，我们自己命名的）。 2.长名称或词组可以使用中横线来为选择器命名。 3.不要使用纯数字、中文等命名，尽量使用英文字母来表示。

#### 3.1.2.1 类选择器-多类名

- 可以给一个标签指定多个类名，从而达到更多的选择目的。 这些类名都可以选出这个标签.

```css
<div class="bule font20">凉宫</div>
```

- 多个类名中间必须用空格分开
- 这个标签就可以分别具有这些类名的样式
- 多类名开发中使用场景 1.可以把一些标签元素相同的样式(共同的部分)放到一个类里面. 2.这些标签都可以调用这个公共的类,然后再调用自己独有的类. 3.从而节省 CSS 代码,统一修改也非常方便.

### 3.1.3 id 选择器

- HTML 元素以 id 属性来设置 id 选择器，CSS 中 id 选择器以“#" 来定义。

```css
#id名 {
  属性1: 属性值1;
  ...;
}
```

- 注意：id 属性只能在每个 HTML 文档中出现一次。口诀: 样式#定义,结构 id 调用, 只能调用一次, 别人切勿使用.
- id 选择器和类选择器的区别 1.类选择器（class）好比人的名字，一个人可以有多个名字，同时一个名字也可以被多个人使用。
  2.id 选择器好比人的身份证号码，全中国是唯一的，不得重复。
  3.id 选择器和类选择器最大的不同在于使用次数上。 4.类选择器在修改样式中用的最多，id 选择器一般用于页面唯一性的元素上，经常和 JavaScript 搭配使用。

### 3.1.4 通配符选择器

- 在 CSS 中，通配符选择器使用“\*”定义，它表示选取页面中所有元素（标签）。

```css
* {
  属性1: 属性值1;
  ....;
}
```

- 通配符选择器不需要调用， 自动就给所有的元素使用样式

### 3.1.5 基础选择器总结

![在这里插入图片描述](https://img-blog.csdnimg.cn/bc08d9937dfb4dff954193f9ac13cba6.png#pic_center)

## 3.2 复合选择器

- 复合选择器是建立在基础选择器之上，对 基本选择器进行组合形成的
- 复合选择器可以更准确、更高效的选择目标元素（标签）
- 复合选择器是由两个或多个基础选择器，通过不同的方式组合而成的
- 常用的复合选择器包括：后代选择器、子选择器、并集选择器、伪类选择器等等

### 3.2.1 后代选择器

- 后代选择器又称为包含选择器，可以选择父元素里面子元素。其写法就是把外层标签写在前面，内层标签写在 后面，中间用空格分隔。当标签发生嵌套时，内层标签就成为外层标签的后代。

```css
<!-- 表示选择元素  1 里面的所有元素  2 (后代元素) -->
元素1 元素2 { 样式声明    }
ul li { 样式声明    }  /*  选择    ul 里面所有的    li标签元素         */
```

- 注意 1.元素 1 和 元素 2 中间用空格隔开 2.元素 1 是父级，元素 2 是子级，最终选择的是元素 2 3.元素 2 可以是儿子，也可以是孙子等，只要是元素 1 的后代即可 4.元素 1 和 元素 2 可以是任意基础选择器

### 3.2.2 子选择器

- 子元素选择器（子选择器）只能选择作为某元素的最近一级子元素。简单理解就是选亲儿子元素.

```css
<!-- 表示选择元素1 里面的所有直接后代(子元素) 元素2 -->
元素1 > 元素2 { 样式声明  }
div > p { 样式声明    }  /*  选择    div 里面所有最近一级    p 标签元素         */
```

- 注意 1.元素 1 和 元素 2 中间用 大于号 隔开 2.元素 1 是父级，元素 2 是子级，最终选择的是元素 2 3.元素 2 必须是亲儿子，其孙子、重孙之类都不归他管.

### 3.2.3 并集选择器

- 并集选择器可以选择多组标签, 同时为他们定义相同的样式。通常用于集体声明.
- 并集选择器是各选择器通过英文逗号（,）连接而成，任何形式的选择器都可以作为并集选择器的一部分。

```css
<!-- 表示选择元素1 和  元素2。 -->
元素1,元素2 { 样式声明    }
ul,div { 样式声明    }  /*  选择    ul 和         div标签元素         */
```

- 逗号可以理解为和的意思

### 3.2.4 伪类选择器

- 伪类选择器用于向某些选择器添加特殊的效果，比如给链接添加特殊效果，或选择第 1 个，第 n 个元素。
- 伪类选择器书写最大的特点是用冒号（:）表示，比如 `:hover` 、 `:first-child` 。

#### 3.2.4.1 链接伪类选择器

```css
/* a 是标签选择器         所有的链接    */
a {
  color: gray;
}
/* :hover 是链接伪类选择器    鼠标经过    */
a:hover {
  color: red; /* 鼠标经过的时候，由原来的    灰色    变成了红色    */
}
```

- 注意事项 1.为了确保生效，请按照 LVHA 的循顺序声明 :link－:visited－:hover－:active。
  2.a 链接在浏览器中具有默认样式，实际工作中都需要给链接单独指定样式。

#### 3.2.4.2 focus 伪类选择器

```css
input:focus {
  background-color: yellow;
}
```

- :focus 伪类选择器用于选取获得焦点的表单元素
- 焦点就是光标，一般情况 <input> 类表单元素才能获取，因此这个选择器也主要针对于表单元素来说。

### 3.2.5 复合选择器总结

![在这里插入图片描述](https://img-blog.csdnimg.cn/004621bfd38641b38660cc4dbc5478e6.png#pic_center)

# 4. CSS 三大特性

- CSS 三大特性：层叠性、继承性、优先级。

## 4.1 层叠性

- 相同选择器给设置相同的样式，此时一个样式就会覆盖（层叠）另一个冲突的样式
- 层叠性原则： 1.样式冲突，遵循的原则是就近原则，哪个样式离结构近，就执行哪个样式 2.样式不冲突，不会层叠
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/710b49a33a9e4196954c497ff3ba278c.png#pic_center)

## 4.2 继承性

- 子标签会继承父标签的某些样式，如（text-，font-，line-这些属性名开头的可以继承，以及 color 属性）![在这里插入图片描述](https://img-blog.csdnimg.cn/a26f80625fd343b5a8e53ac36cee7f38.png#pic_center)
- 行高的继承性
  子元素没有设置行高，则会继承父元素的行高

```css
body {
	<!-- 主体标签 -->
	font:12px/1.5 Microsoft YaHei；
}
```

- body 行高 1.5 ,里面子元素可以根据自己文字大小自动调整行高

## 4.3 优先级

- 当同一个元素指定多个选择器，就会有优先级的产生。 1.选择器相同，则执行层叠性 2.选择器不同，则根据选择器权重执行
- 注意 1.权重是有 4 组数字组成,但是不会有进位。 2.可以理解为类选择器永远大于元素选择器, id 选择器永远大于类选择器,以此类推.. 3.等级判断从左向右，如果某一位数值相同，则判断下一位数值。 4.可以简单记忆法: 通配符和继承权重为 0, 标签选择器为 1,类(伪类)选择器为 10, id 选择器 100, 行内样式表为 1000, !important 无穷大. 5.继承的权重是 0， 如果该元素没有直接选中，不管父元素权重多高，子元素得到的权重都是 0。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/4f5f1de2ce8f4293b4a6fb005e7be194.png#pic_center)
- 权重叠加：如果是复合选择器，则会有权重叠加，需要计算权重。
  div ul li ------> 0,0,0,3
  .nav ul li ------> 0,0,1,2
  a:hover -----—> 0,0,1,1
  .nav a ------> 0,0,1,1

# 5. CSS 注释

- 注释用于解释代码，它们会被浏览器忽略。CSS 中的注释以“ /_ ”开头，以“ _/ ”结尾。

```css
/* 需要注释的内容         */
```

# 6. CSS 字体属性

- CSS Fonts (字体)属性用于定义字体系列、大小、粗细、和文字样式（如斜体）。

## 6.1 字体系列

- CSS 使用 font-family 属性定义文本的字体系列。

```css
p {
  font-family: "微软雅黑";
}
div {
  font-family: Arial, "Microsoft Yahei", "微软雅黑";
}
```

- 各种字体之间必须使用英文状态下的逗号隔开
- 一般情况下,如果有空格隔开的多个单词组成的字体,加引号.
- 尽量使用系统默认自带字体，保证在任何用户的浏览器中都能正确显示
- 最常见的几个字体：body {font-family: 'Microsoft YaHei',tahoma,arial,'Hiragino Sans GB'; }

## 6.2 字体大小

- CSS 使用 font-size 属性定义字体大小。

```css
p {
  font-size: 20px;
}
```

- px（像素）大小是我们网页的最常用的单位
- 谷歌浏览器默认的文字大小为 16px
- 可以给 body 指定整个页面文字的大小

## 6.3 字体粗细

- CSS 使用 font-weight 属性设置文本字体的粗细。

```css
p {
  font-weight: bold;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/d15185bc377e42e79d2bc6fbcdad34ba.png#pic_center)

- 学会让加粗标签（比如 h 和 strong 等) 不加粗，或者其他标签加粗
- 实际开发时，更喜欢用数字表示粗细

## 6.4 文字样式

- CSS 使用 font-style 属性设置文本的风格。

```css
p {
  font-style: normal;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/b0b53e1b35ae4209bfb79bacc014d3f1.png#pic_center)

- 注意： 平时我们很少给文字加斜体，反而要给斜体标签（em，i）改为不倾斜字体。

## 6.5 字体复合属性

- 字体属性可以把以上文字样式综合来写, 这样可以更节约代码:

```css
body {
  font: font-style font-weight font-size/line-height font-family;
}
```

- 使用 font 属性时，必须按上面语法格式中的顺序书写，不能更换顺序，并且各个属性间以空格隔开
- 不需要设置的属性可以省略（取默认值），但必须保留 font-size 和 font-family 属性，否则 font 属性将不起作用

## 6.6 字体属性总结

![在这里插入图片描述](https://img-blog.csdnimg.cn/d9f155f4265d4904ab5f67eb8ddfb6ee.png#pic_center)

# 7. CSS 文本属性

- CSS Text（文本）属性可定义文本的外观，比如文本的颜色、对齐文本、装饰文本、文本缩进、行间距等。

## 7.1 文本颜色

- color 属性用于定义文本的颜色

```css
div {
  color: red;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/0918f00f2829453d9702b13e584e8a7e.png#pic_center)

- 开发中最常用的是十六进制.

## 7.2 对齐文本

- text-align 属性用于设置元素内文本内容的水平对齐方式。

```css
div {
  text-align: center;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/b147383fb3614a4b9c8fa6df6f2488eb.png#pic_center)

## 7.3 装饰文本

- text-decoration 属性规定添加到文本的修饰。可以给文本添加下划线、删除线、上划线等。

```css
div {
	text-decoration：underline；
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ef126f86caf94b7b895bd2b9bb1411d9.png#pic_center)

- 重点记住如何添加下划线,如何删除下划线

## 7.4 文本缩进

- text-indent 属性用来指定文本的第一行的缩进，通常是将段落的首行缩进。

```css
div {
  text-indent: 10px;
}
p {
  text-indent: 2em;
}
```

- 通过设置该属性，所有元素的第一行都可以缩进一个给定的长度，甚至该长度可以是负值。
- em 是一个相对单位，就是当前元素（font-size) 1 个文字的大小, 如果当前元素没有设置大小，则会按照父元 素的 1 个文字大小。

## 7.5 行间距

- line-height 属性用于设置行间的距离（行高）。可以控制文字行与行之间的距离.

```css
p {
  line-height: 26px;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/5dd7dbd943494d1cbf1964e3e74e7218.png#pic_center)

## 7.6 文本属性总结

![在这里插入图片描述](https://img-blog.csdnimg.cn/80c7ed0a93734ab18e85135b52bf415f.png#pic_center)

# 8. CSS 元素显示模式

- 元素显示模式就是元素（标签）以什么方式进行显示，比如`<div>`自己占一行，比如一行可以放多个`<span>`。
- HTML 元素一般分为块元素和行内元素两种类型。

## 8.1 块元素

- 常见的块元素有`<h1>`~`<h6>`、`<p>`、`<div>`、`<ul>`、`<ol>`、`<li>`等，其中 `<div>` 标签是最典型的块元素。
- 块级元素的特点： 1.比较霸道，自己独占一行。 2.高度，宽度、外边距以及内边距都可以控制。 3.宽度默认是容器（父级宽度）的 100%。 4.是一个容器及盒子，里面可以放行内或者块级元素。
- 注意： 1.文字类的元素内不能使用块级元素 2.`<p>` 标签主要用于存放文字，因此 `<p>` 里面不能放块级元素，特别是不能放`<div>` 3.同理， `<h1>`~`<h6>`等都是文字类块级标签，里面也不能放其他块级元素

## 8.2 行内元素

- 常见的行内元素有 `<a>`、`<strong>`、`<b>`、`<em>`、`<i>`、`<del>`、`<s>`、`<ins>`、`<u>`、`<span>`等，其中 `<span>` 标签是最典型的行内元素。有的地方也将行内元素称为内联元素。
- 行内元素的特点： 1.相邻行内元素在一行上，一行可以显示多个。 2.高、宽直接设置是无效的。 3.默认宽度就是它本身内容的宽度。 4.行内元素只能容纳文本或其他行内元素。
- 注意： 1.链接里面不能再放链接 2.特殊情况链接 `<a>` 里面可以放块级元素，但是给 `<a>` 转换一下块级模式最安全

## 8.3 行内块元素

- 在行内元素中有几个特殊的标签 —— `<img />`、`<input />`、`<td>`，它们同时具有块元素和行内元素的特点。有些资料称它们为行内块元素。
- 行内块元素的特点： 1.和相邻行内元素（行内块）在一行上，但是他们之间会有空白缝隙。一行可以显示多个（行内元素特点）。 2.默认宽度就是它本身内容的宽度（行内元素特点）。 3.高度，行高、外边距以及内边距都可以控制（块级元素特点）。

## 8.4 元素显示模式总结

![在这里插入图片描述](https://img-blog.csdnimg.cn/4e1b92355c454df6b6c279385f2e5cf4.png#pic_center)

## 8.5 元素显示模式转换

- 特殊情况下，个模式的元素需要另外一种模式的特性，我们需要元素模式的转换
- 转换为块元素：display:block;
- 转换为行内元素：display:inline;
- 转换为行内块：display: inline-block;

# 9. 单行文字垂直居中

- 让文字的行高等于盒子的高度 就可以让文字在当前盒子内垂直居中

```css
line-height: ;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/b70e0a65b52347a1a57dba2a5a7f02cc.png#pic_center)

- 行高的上空隙和下空隙把文字挤到中间了. 是如果行高小于盒子高度,文字会偏上,如果行高大于盒子高度,则文字偏下

# 10. CSS 背景

- 通过 CSS 背景属性，可以给页面元素添加背景样式。背景属性可以设置背景颜色、背景图片、背景平铺、背景图片位置、背景图像固定等。

## 10.1 背景颜色

-     background-color 属性定义了元素的背景颜色。
- 一般情况下元素背景颜色默认值是 transparent（透明），我们也可以手动指定背景颜色为透明色。

```css
background-color: 颜色值;
background-color: transparent;
```

## 10.2 背景图片

- background-image 属性描述了元素的背景图像。实际开发常见于 logo 或者一些装饰性的小图片或者是超大的背景图片, 优点是非常便于控制位置. (精灵图也是一种运用场景)

```css
background-image: none | url (url);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/598a6d50e92e47c290e77ef7d734b1db.png#pic_center)

- 注意：背景图片后面的地址，千万不要忘记加 URL， 同时里面的路径不要加引号。

## 10.3 背景平铺

- 如果需要在 HTML 页面上对背景图像进行平铺，可以使用 background-repeat 属性。

```css
background-repeat: repeat | no-repeat | repeat-x | repeat-y;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/7f54ce46ea0d49329a76ed29ae55c90e.png#pic_center)

## 10.4 背景图片位置

- background-position 属性可以改变图片在背景中的位置。

```css
background-position: x y;
```

- 参数代表的意思是：x 坐标和 y 坐标。 可以使用 方位名词 或者 精确单位
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/ec9d4a2e2bcd4623864b0f739ca35858.png#pic_center)
- 注意：

1. 参数是方位名词
   1.1 如果指定的两个值都是方位名词，则两个值前后顺序无关，比如 left top 和 top left 效果一致
   1.2 如果只指定了一个方位名词，另一个值省略，则第二个值默认居中对齐
2. 参数是精确单位
   2.1 如果参数值是精确坐标，那么第一个肯定是 x 坐标，第二个一定是 y 坐标
   2.2 如果只指定一个数值，那该数值一定是 x 坐标，另一个默认垂直居中
3. 参数是混合单位
   3.1 如果指定的两个值是精确单位和方位名词混合使用，则第一个值是 x 坐标，第二个值是 y 坐标

## 10.5 背景图像固定

- background-attachment 属性设置背景图像是否固定或者随着页面的其余部分滚动

```css
background-attachment: scroll | fixed;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/6ce02cc187c741c29b1b6dd60f2ad108.png#pic_center)

## 10.6 背景复合写法

- 当使用简写属性时，没有特定的书写顺序,一般习惯约定顺序为：
  background: 背景颜色 背景图片地址 背景平铺 背景图像滚动 背景图片位置

```css
background: transparent url(image.jpg) repeat-y fixed top;
```

## 10.7 背景色半透明

- 背景颜色半透明：background: rgba(0, 0, 0, 0.3);
- 最后一个参数是 alpha 透明度，取值范围在 0~1 之间
- 可以把 0.3 的 0 省略掉，写为 background: rgba(0, 0, 0, .3);
- **注意**：背景半透明是指盒子背景半透明，盒子里面的内容不受影响

## 10.8 背景总结

![在这里插入图片描述](https://img-blog.csdnimg.cn/6cf7459b49f0450ea8879eea826380b4.png#pic_center)

# 11. 盒子模型

- 页面布局要学习三大核心, 盒子模型, 浮动 和 定位
- 盒子模型即盛装内容的容器，它包括：边框、外边距、内边距、和 实际内容
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/8dfbcab8d13a4d92aa4a0479cd1ad932.png#pic_center)

## 11.1 边框（border）

- border 可以设置元素的边框。边框有三部分组成:边框宽度(粗细) 边框样式 边框颜色

```css
border: border-width || border-style || border-color;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/29ad4d182f324ecd8309e54a17247398.png#pic_center)

- 边框样式 border-style 可以设置如下值：
  1.none：没有边框即忽略所有边框的宽度（默认值）
  2.solid：边框为单实线(最为常用的)
  3.dashed：边框为虚线
  4.dotted：边框为点线

```css
border: 1px solid red;  简写没有顺序要求
border-top: 1px solid red;  /* 只设定上边框，    其余同理    */
```

## 11.2 表格的细线边框

- border-collapse 属性控制浏览器绘制表格边框的方式。它控制相邻单元格的边框。

```css
border-collapse: collapse;
```

## 11.3 边框影响盒子大小

- 边框会额外增加盒子的实际大小。
- 方案解决: 1.测量盒子大小的时候,不量边框. 2.如果测量的时候包含了边框,则需要 width/height 减去边框宽度

## 11.4 内边距（padding）

- padding 属性用于设置边框与内容之间的距离。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/67f4337abf154abcb2b4fdea21dd6f0d.png#pic_center)
- padding 属性（简写属性）可以有一到四个值
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/480b6822e5dd4b44a90baf9d492022cb.png#pic_center)
- 如果盒子指定了宽度和高度，此时再指定内边距，会撑大盒子。没有指定则不会
  ----解决方案：让 width/height 减去多出来的内边距大小
- padding 影响盒子好处：如做导航栏等

## 11.5 外边距（margin）

- margin 属性用于设置盒子和盒子之间的距离。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/705d71494cd14033839fa721d46cd477.png#pic_center)
- margin 简写方式代表的意义跟 padding 完全一致。

## 11.6 外边距典型应用

- 外边距可以让块级盒子水平居中，但是必须满足两个条件： 1.盒子必须指定了宽度（width）。 2.盒子左右的外边距都设置为 auto 。

```css
.header {
  width: 960px;
  margin: 0 auto;
}
```

- 常见的写法：
  1.margin-left: auto; margin-right: auto;
  2.margin: auto;
  3.margin: 0 auto;
- 注意：以上方法是让块级元素水平居中，行内元素或者行内块元素水平居中给其父元素添加 text-align:center 。

## 11.7 外边距合并

- 使用 margin 定义块元素的垂直外边距时，可能会出现外边距的合并。
  主要有两种情况: 1.相邻块元素垂直外边距的合并 2.嵌套块元素垂直外边距的塌陷

### 11.7.1 相邻块元素垂直外边距的合并

- 当上下相邻的两个块元素（兄弟关系）相遇时，如果上面的元素有下外边距 margin-bottom，下面的元素有 上外边距 margin-top ，则他们之间的垂直间距不是 margin-bottom 与 margin-top 之和。而是取两个值中的较大者
- 解决方案
  ----尽量只给一个盒子添加 margin 值。

### 11.7.2 嵌套块元素垂直外边距的塌陷

- 对于两个嵌套关系（父子关系）的块元素，父元素有上外边距同时子元素也有上外边距，此时父元素会塌陷较大的外边距值。
- 解决方案 1.可以为父元素定义上边框。 2.可以为父元素定义上内边距。 3.可以为父元素添加 overflow:hidden。

## 11.8 清除内外边距

- 网页元素很多都带有默认的内外边距，而且不同浏览器默认的也不一致。因此我们在布局前，首先要清除下网 页元素的内外边距。

```css
* {
  margin: 0; /* 清除外边距 */
  padding: 0; /* 清除内边距 */
}
```

- 注意：行内元素为了照顾兼容性，尽量只设置左右内外边距，不要设置上下内外边距。但是转换为块级和行内 块元素就可以了

# 12. 圆角边框

- 在 CSS3 中，新增了圆角边框样式，盒子可以变圆角了。
- border-radius 属性用于设置元素的外边框圆角。

```css
border-radius: length;
```

1. 参数值可以为数值或百分比的形式
2. 如果是正方形，想要设置为一个圆，把数值修改为高度或者宽度的一半即可，或者直接写为 50%
3. 该属性是一个简写属性，可以跟四个值，分别代表左上角、右上角、右下角、左下角
4. 分开写：border-top-left-radius、border-top-right-radius、border-bottom-right-radius 和 border-bottom-left-radius

# 13. 盒子阴影

- CSS3 中新增了盒子阴影，可以使用 box-shadow 属性为盒子添加阴影。

```css
box-shadow: h-shadow v-shadow blur spread color inset;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/284faec2efba404890061225db361870.png#pic_center)

- 注意： 1.默认的是外阴影(outset), 但是不可以写这个单词,否则造成阴影无效 2.盒子阴影不占用空间，不会影响其他盒子排列。

# 14. 文字阴影

- 在 CSS3 中，可以使用 text-shadow 属性将阴影应用于文本。

```css
text-shadow: h-shadow v-shadow blur color;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/483fb2a23f594288ad164d6c8960ab32.png#pic_center)

# 15. 传统网页布局三种方式

## 15.1 普通流（标准流）

- 所谓的标准流: 就是标签按照规定好默认方式排列.
- 块级元素会独占一行，从上向下顺序排列。
  ---- 常用元素：div、hr、p、h1~h6、ul、ol、dl、form、table
- 行内元素会按照顺序，从左到右顺序排列，碰到父元素边缘则自动换行。
  ---- 常用元素：span、a、i、em 等

## 15.2 浮动

### 15.2.1 为什么需要浮动

- 能让多个块级盒子(div)水平排列成一行
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/d1f2957dab364dfaa815cef0acb96b9b.png#pic_center)

注：虽然转换为行内块元素可以实现一行显示，但是他们之间会有大的空白缝隙，很难控制

- 能实现两个盒子的左右对齐
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/24f6cf07f5be4243ae41a1f97700c8d9.png#pic_center)
- 总结：有很多的布局效果，标准流没有办法完成，此时就可以利用浮动完成布局。 因为浮动可以改变元素标签默认的排列方式.
- 浮动最典型的应用：可以让多个块级元素一行内排列显示。
- 网页布局第一准则：多个块级元素纵向排列找标准流，多个块级元素横向排列找浮动。

### 15.2.2 什么是浮动

- float 属性用于创建浮动框，将其移动到一边，直到左边缘或右边缘触及包含块或另一个浮动框的边缘。

```css
选择器 {
  float: 属性值;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/22dd78b259e34bb982b4fbe3c62ffb68.png#pic_center)

### 15.2.3 浮动特性

- 1、浮动元素会脱离标准流(脱标)
  1.1 脱离标准普通流的控制（浮） 移动到指定位置（动）, （俗称脱标）
  1.2 浮动的盒子不再保留原先的位置
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/90921cc328a447078fda4a1c5064a699.png#pic_center)
- 2、浮动的元素会一行内显示并且元素顶部对齐
  **注意**： 浮动的元素是互相贴靠在一起的（不会有缝隙），如果父级宽度装不下这些浮动的盒子， 多出的盒子 会另起一行对齐。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/24f6cf07f5be4243ae41a1f97700c8d9.png#pic_center)
- 3、浮动的元素会具有行内块元素的特性.
  3.1 任何元素都可以浮动。不管原先是什么模式的元素，添加浮动之后具有行内块元素相似的特性。
  3.2 如果块级盒子没有设置宽度，默认宽度和父级一样宽，但是添加浮动后，它的大小根据内容来决定
  3.3 浮动的盒子中间是没有缝隙的，是紧挨着一起的
  3.4 行内元素同理

### 15.2.4 搭配标准流父级

- 为了约束浮动元素位置, 网页布局一般采取的策略是:先用标准流的父元素排列上下位置, 之后内部子元素采取浮动排列左右位置. 符合网页布局第一准侧.
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/006a245f061642dfa9f566ccfeb8d7e4.png#pic_center)
- 网页布局第二准侧：先设置盒子的大小, 之后设置盒子的位置.

### 15.2.5 浮动布局注意点

- 浮动和标准流的父盒子搭配。先用标准流的父元素排列上下位置, 之后内部子元素采取浮动排列左右位置
- 一个盒子里面有多个子盒子，如果其中一个盒子浮动了，那么其他兄弟也应该浮动，以防止引起问题。
- 浮动的盒子只会影响浮动盒子后面的标准流,不会影响前面的标准流.

### 15.2.6 清除浮动

#### 15.2.6.1 为什么需要清除浮动

- 由于父级盒子很多情况下，不方便给高度，但是子盒子浮动又不占有位置，最后父级盒子高度为 0 时，就会影响下面的标准流盒子。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/19ef693cd0434dce8dfee4e3314c1229.png#pic_center)

#### 15.2.6.2 清除浮动本质

- 清除浮动的本质是清除浮动元素造成的影响
- 如果父盒子本身有高度，则不需要清除浮动
- 清除浮动之后，父级就会根据浮动的子盒子自动检测高度。父级有了高度，就不会影响下面的标准流了

#### 15.2.6.3 清除浮动语法

```css
选择器 {
  clear: 属性值;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/68cb6bd6a2dd4df3952b3af2acd798c5.png#pic_center)

- 实际工作中， 几乎只用 clear: both;

#### 15.2.6.4 清除浮动方法

- 1、额外标签法也称为隔墙法。
  额外标签法会在浮动元素末尾添加一个空的标签。例如 `<div style=”clear:both”></div>`，或者其他标签 （如`<br />`等）。注意： 要求这个新的空标签必须是块级元素。
  **优点**： 通俗易懂，书写方便
  **缺点**： 添加许多无意义的标签，结构化较差
- 2、父级添加 overflow 属性
  可以给父级添加 overflow 属性，将其属性值设置为 hidden、 auto 或 scroll 。
  **优点**：代码简洁
  **缺点**：无法显示溢出的部分
- 3、父级添加 after 伪元素
  :after 方式是额外标签法的升级版。也是给父元素添加

```css
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  /* IE6、7 专有 */
  *zoom: 1;
}
```

**优点**：没有增加标签，结构更简单
**缺点**：照顾低版本浏览器

- 4、父级添加双伪元素

```css
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
```

**优点**：代码更简洁
**缺点**：照顾低版本浏览器

##### 15.2.6.5 清除浮动总结

- 为什么需要清除浮动？
  ① 父级没高度。
  ② 子盒子浮动了。
  ③ 影响下面布局了，我们就应该清除浮动了。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/cec804d4cc9e4e37be7ee7e17e0a46d7.png#pic_center)

## 15.3 定位

### 15.3.1 为什么需要定位

- 可以让某个元素自由的在一个盒子内移动位置，并且压住其他盒子
- 滚动窗口的时候，可以让盒子固定屏幕某个位置的。

### 15.3.2 定位组成

- 定位 = 定位模式 + 边偏移

- ① 定位模式
  定位模式决定元素的定位方式 ，它通过 CSS 的 position 属性来设置，其值可以分为四个：
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/9f07256b7e1741f48af2dfb1924a4eaf.png#pic_center)

- ② 边偏移
  边偏移就是定位的盒子移动到最终位置。有 top、bottom、left 和 right 4 个属性。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/01841c0ed8284d3992d173e8c19f315e.png#pic_center)

### 15.3.3 静态定位 static

- 静态定位是元素的默认定位方式，无定位的意思。

```css
选择器 {
  position: static;
}
```

- 静态定位按照标准流特性摆放位置，它没有边偏移
- 静态定位在布局时很少用到

### 15.3.4 相对定位 relative

- 对定位是元素在移动位置的时候，是相对于它原来的位置来说的

```css
选择器 {
  position: relative;
}
```

- 特点：
  ① 它是相对于自己原来的位置来移动的（移动位置的时候参照点是自己原来的位置）。
  ② 原来在标准流的位置继续占有，后面的盒子仍然以标准流的方式对待它。
  ③ 因此，相对定位并没有脱标。它最典型的应用服务于绝对定位

### 15.3.5 绝对定位 absolute

- 绝对定位是元素在移动位置的时候，是相对于它祖先元素来说的

```css
选择器 {
  position: absolute;
}
```

- 特点
  ① 如果没有祖先元素或者祖先元素没有定位，则以浏览器为准定位（Document 文档）。
  ② 如果祖先元素有定位（相对、绝对、固定定位），则以最近一级的有定位祖先元素为参考点移动位置。
  ③ 绝对定位不再占有原先的位置。（脱标了）

### 15.3.6 子绝父相

- 子级是绝对定位的话，父级要用相对定位。相对定位经常用来作为绝对定位的父级
  ① 子级绝对定位，不会占有位置，可以放到父盒子里面的任何一个地方，不会影响其他的兄弟盒子。
  ② 父盒子需要加定位限制子盒子在父盒子内显示。
  ③ 父盒子布局时，需要占有位置，因此父亲只能是相对定位。

### 15.3.7 固定定位 fixed

- 固定定位是元素固定于浏览器可视区的位置。
- 主要使用场景：可以在浏览器页面滚动时元素的位置不会改变。

```css
选择器 {
  position: fixed;
}
```

- **特点**：
  ① 以浏览器的可视窗口为参照点移动元素。
  ---- 跟父元素没有任何关系
  ---- 不随滚动条滚动。
  ② 固定定位不在占有原先的位置。（脱标了）
- 固定定位小技巧： 固定在版心右侧位置。
  ① 让固定定位的盒子 left: 50%. 走到浏览器可视区（也可以看做版心）的一半位置。
  ② 让固定定位的盒子 margin-left: 版心宽度的一半距离。多走版心宽度的一半位置
  就可以让固定定位的盒子贴着版心右侧对齐了。

### 15.3.8 粘性定位 sticky

- 粘性定位可以被认为是相对定位和固定定位的混合

```css
选择器 {
  position: sticky;
  top: 10px;
}
```

- 特点：
  ① 以浏览器的可视窗口为参照点移动元素（固定定位特点）
  ② 粘性定位占有原先的位置（相对定位特点）
  ③ 必须添加 top 、left、right、bottom 其中一个才有效
- 跟页面滚动搭配使用。 兼容性较差，IE 不支持。不常用

### 15.3.9 定位的总结

![在这里插入图片描述](https://img-blog.csdnimg.cn/7a314dbfbef14cb6a096c05cc1f81f1b.png#pic_center)

- 记住相对定位、固定定位、绝对定位 两个大的特点：  
  ① 是否占有位置（脱标否）  
  ② 以谁为基准点移动位置。
- 学习定位重点学会子绝父相。

### 15.3.10 定位叠放次序 z-index

- 在使用定位布局时，可能会出现盒子重叠的情况。此时，可以使用 z-index 来控制盒子的前后次序 (z 轴)

```css
选择器 {
  z-index: 1;
}
```

- 注意：
  ① 数值可以是正整数、负整数或 0, 默认是 auto，数值越大，盒子越靠上
  ② 如果属性值相同，则按照书写顺序，后来居上
  ③ 数字后面不能加单位
  ④ 只有定位的盒子才有 z-index 属性

### 15.3.11 定位的拓展

1. **绝对定位的盒子居中**
   ---- 加了绝对定位的盒子不能通过 margin:0 auto 水平居中，但是可以通过以下计算方法实现水平和垂直居中。
   ①left: 50%;：让盒子的左侧移动到父级元素的水平中心位置。
   ②margin-left: -100px;让盒子向左移动自身宽度的一半。
2. **定位特殊特性**
   ---- 绝对定位和固定定位也和浮动类似。
   ① 行内元素添加绝对或者固定定位，可以直接设置高度和宽度。
   ② 块级元素添加绝对或者固定定位，如果不给宽度或者高度，默认大小是内容的大小。
3. **脱标的盒子不会触发外边距塌陷**
   浮动元素、绝对定位(固定定位）元素的都不会触发外边距合并的问题。
4. **绝对定位（固定定位）会完全压住盒子**
   ① 浮动元素不同，只会压住它下面标准流的盒子，但是不会压住下面标准流盒子里面的文字（图片）
   ② 但是绝对定位（固定定位） 会压住下面标准流所有的内容。
   ③ 浮动之所以不会压住文字，因为浮动产生的目的最初是为了做文字环绕效果的。 文字会围绕浮动元素

## 15.4 网页布局总结

- 一个完整的网页，是标准流、浮动、定位一起完成布局的，每个都有自己的专门用法。
  ① 标准流：可以让盒子上下排列或者左右排列，垂直的块级盒子显示就用标准流布局。
  ② 浮动：可以让多个块级元素一行显示或者左右对齐盒子，多个块级盒子水平显示就用浮动布局。
  ③ 定位：最大的特点是有层叠的概念，就是可以让多个盒子前后叠压来显示。如果元素自由在某个盒子内移动就 用定位布局。

# 16. 元素的显示与隐藏

-让一个元素在页面中隐藏或者显示出来。类似网站广告，当我们点击关闭就不见了，但是我们重新刷新页面，会重新出现！

## 16.1 display 属性

- display 属性用于设置一个元素应如何显示。
  ①`display: none`隐藏对象
  ②`display：block` 除了转换为块级元素之外，同时还有显示元素的意思
- display 隐藏元素后，不再占有原来的位置。
- 应用及其广泛，搭配 JS 可以做很多的网页特效。

## 16.2 visibility 可见性

- visibility 属性用于指定一个元素应可见还是隐藏。
  ①`visibility：visible` 元素可视
  ②`visibility：hidden` 元素隐藏
- visibility 隐藏元素后，继续占有原来的位置。
  如果隐藏元素想要原来位置， 就用 `visibility：hidden`
  如果隐藏元素不想要原来位置， 就用 `display：none` (用处更多 重点）

## 16.3 overflow 溢出

- overflow 属性指定了如果内容溢出一个元素的框（超过其指定高度及宽度） 时，会发生什么。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/c3ab542081d74104a1ce0b0e70f55374.png#pic_center)
- 一般情况下，我们都不想让溢出的内容显示出来，因为溢出的部分会影响布局。
- 但是如果有定位的盒子， 请慎用`overflow:hidden` 因为它会隐藏多余的部分。

# 17. CSS 精灵图

## 17.1 为什么需要精灵图

- 一个网页中往往会应用很多小的背景图像作为修饰，当网页中的图像过多时，服务器就会频繁地接收和发送 请求图片，造成服务器请求压力过大，这将大大降低页面的加载速度。
- 作用：有效地减少服务器接收和发送请求的次数，提高页面的加载速度
- 核心原理：将网页中的一些小背景图像整合到一张大图中 ，这样服务器只需要一次请求就可以了。

## 17.2 精灵图的使用

- 使用精灵图核心：
  ① 精灵技术主要针对小的背景图片使用，就是把多个小背景图片整合到一张大图片中。
  ② 这个大图片也称为 sprites 精灵图 或者 雪碧图
  ③ 移动背景图片位置， 此时可以使用 `background-position` 。
  ④ 移动的距离就是这个目标图片的 x 和 y 坐标。
  ⑤ 因为一般情况下都是往上往左移动，所以数值是**负值**。
  ⑥ 使用精灵图的时候需要精确测量，每个小背景图片的大小和位置。
- 精灵图是有诸多优点的，但是缺点很明显。
  ① 图片文件还是比较大的。
  ② 图片本身放大和缩小会失真。
  ③ 一旦图片制作完毕想要更换非常复杂
- 字体图标 iconfont 很好的解决了以上问题。如下

# 18. CSS 字体图标

- 字体图标可以为前端工程师提供一种方便高效的图标使用方式，展示的是图标，本质属于字体。
- 优点
  ① 轻量级：一个图标字体要比一系列的图像要小。一旦字体加载了，图标就会马上渲染出来，减少了服务器请求
  ② 灵活性：本质其实是文字，可以很随意的改变颜色、产生阴影、透明效果、旋转等
  ③ 兼容性：几乎支持所有的浏览器，请放心使用
- 注意： 字体图标不能替代精灵技术，只是对工作中图标部分技术的提升和优化。
- 使用场景
  ① 如果遇到一些结构和样式比较简单的小图标，就用字体图标。
  ② 如果遇到一些结构和样式复杂一点的小图片，就用精灵图。

## 18.1 字体图标下载

- 推荐下载网站：
  ①icomoon 字库： [http://icomoon.io](http://icomoon.io)
  ② 阿里 iconfont 字库：[http://www.iconfont.cn/](http://www.iconfont.cn/)
- 不同浏览器所支持的字体格式是不一样的，字体图标之所以兼容，就是因为包含了主流浏览器支持的字体文件。常见的有：`.ttf` `.woff` `.eot` `.svg`（基于 SVG 字体渲染的一种格式）

## 18.2 字体图标引入

- 下载完毕之后，注意原先的文件不要删，后面会用。
  ① 把下载包里面的 fonts 文件夹放入页面根目录下

![在这里插入图片描述](https://img-blog.csdnimg.cn/4148e65a9df64c10b4486132bcc36604.png#pic_center)
② 在 CSS 样式中全局声明字体： 简单理解把这些字体文件通过 css 引入到我们页面中。注意字体文件路径的问题

```css
@font-face {
  font-family: "icomoon";
  src: url("fonts/icomoon.eot?7kkyc2");
  src: url("fonts/icomoon.eot?7kkyc2#iefix") format("embedded-opentype"), url("fonts/icomoon.ttf?7kkyc2")
      format("truetype"), url("fonts/icomoon.woff?7kkyc2") format("woff"), url("fonts/icomoon.svg?7kkyc2#icomoon")
      format("svg");
  font-weight: normal;
  font-style: normal;
}
```

③html 标签内添加小图标。
![在这里插入图片描述](https://img-blog.csdnimg.cn/08e5b3984eaa4983af97a408fa3ebf19.png#pic_center)

```css
<span>  </span>
```

④ 给标签定义字体。

```css
span {
  font-family: "icomoon";
}
```

- 务必保证 这个字体和上面@font-face 里面的字体保持一致，可以自己命名
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/3851bf83d7a647758a59e0239b2daed8.png#pic_center)

## 18.3 字体图标追加

- 原来的字体图标不够用了，我们需要添加新的字体图标到原来的字体文件中。
- 把压缩包里面的 selection.json 从新上传，然后选中自己想要新的图标，从新下载压缩包，并替换原来的文件即可。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/71d770d9e3be427b852696bf2bfdd02d.png#pic_center)

# 19. CSS 三角

- 网页中常见一些三角形，使用 CSS 直接画出来就可以，不必做成图片或者字体图标。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/0601b40a197a41749cb499c8a608bc47.png#pic_center)

```css
div {
  width: 0;
  height: 0;
  line-height: 0;
  font-size: 0;
  border: 50px solid transparent;
  border-left-color: pink;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/158a2df9558a48d6a963fcd042b0402a.png#pic_center)

# 20. CSS 用户界面样式

## 20.1 鼠标样式 cursor

- 设置或检索在对象上移动的鼠标指针采用何种系统预定义的光标形状。

```css
li {
  cursor: pointer;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/80482bf4ac964d46bad33574811bdbbd.png#pic_center)

## 20.2 轮廓线 outline

- 给表单添加 outline: 0; 或者 outline: none; 样式之后，就可以去掉默认的蓝色边框。
-

```css
input {
  outline: none;
}
```

## 20.3 防止拖拽文本域 resize

```css
textarea {
  resize: none;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/cb0a09ac62054e76b9697fc0f182bef8.png#pic_center)

# 21. vertical-align

- 使用场景：经常用于设置图片或者表单(行内块元素）和文字垂直对齐。
- 官方解释：用于设置一个元素的垂直对齐方式，只针对于行内元素或者行内块元素有效

```css
vertical-align: baseline | top | middle | bottom;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/21b184929a104396b923472eca6deafd.png#pic_center)![在这里插入图片描述](https://img-blog.csdnimg.cn/e546ab1aec3a482eb7b1731ae985c31b.png#pic_center)

- 1、图片、表单和文字对齐
  ---- 图片、表单都属于行内块元素，默认的 vertical-align 是基线对齐。
  此时可以给图片、表单这些行内块元素的 vertical-align 属性设置为 middle 就可以让文字和图片垂直 居中对齐了。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/364bb88c77714ade8b35c57886c5d86d.png#pic_center)
- 2、解决图片底部默认空白缝隙问题
  ---- bug：图片底侧会有一个空白缝隙，原因是行内块元素会和文字的基线对齐。
  解决方法有两种：
  ① 给图片添加 vertical-align:middle | top| bottom 等.（提倡使用的）
  ② 把图片转换为块级元素 display: block;

# 22. 溢出的文字省略号显示

- 1、单行文本溢出显示省略号

```css
/*1. 先强制一行内显示文本*/
white-space: nowrap;  （默认normal自动换行）
/*2. 超出的部分隐藏*/
overflow: hidden;
/*3. 文字用省略号替代超出的部分*/
text-overflow: ellipsis;
```

- 2、 多行文本溢出显示省略号
  多行文本溢出显示省略号，有较大兼容性问题， 适合于 webKit 浏览器或移动端（移动端大部分是 webkit 内核）

```css
overflow: hidden;
text-overflow: ellipsis;
/* 弹性伸缩盒子模型显示    */
display: -webkit-box;
/* 限制在一个块元素显示的文本的行数    */
-webkit-line-clamp: 2;
/* 设置或检索伸缩盒对象的子元素的排列方式    */
-webkit-box-orient: vertical;
```

更推荐让后台人员来做这个效果，因为后台人员可以设置显示多少个字，操作更简单。

# 23. 常见布局技巧

- 1、margin 负值运用
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/9e531263c78545ee9a200de5a89b948d.png#pic_center)

① 让每个盒子 margin 往左侧移动 -1px 正好压住相邻盒子边框
② 鼠标经过某个盒子的时候，提高当前盒子的层级即可（如果没有有定位，则加相对定位（保留位置），如 果有定位，则加 z-index）

- 2、文字围绕浮动元素
  巧妙运用浮动元素不会压住文字的 特性
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/1a8ec4e1efa2438fb29f14222a20da17.png#pic_center)

- 3、行内块巧妙运用
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/d1bdeebddcc74040a44a1cde54b6cd6d.png#pic_center)
  页码在页面中间显示:
  ① 把这些链接盒子转换为行内块， 之后给父级指定 text-align:center;
  ② 利用行内块元素中间有缝隙，并且给父级添加 text-align:center; 行内块元素会水平会居中
- 4、CSS 三角强化
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/191bc91ee75a4d58b6f3d07ba17e299d.png#pic_center)
  原理
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/9a4d92df8a3a4bb5beafd441efb28367.png#pic_center)

```css
div {
  width: 0;
  height: 0;
  border-color: transparent red transparent transparent;
  border-style: solid;
  border-width: 22px 8px 0 0;
}
```

# 24. CSS3 新特性

## 24.1 CSS3 新增选择器

### 24.1.1 属性选择器

- 属性选择器可以根据元素特定属性的来选择元素。 这样就可以不用借助于类或者 id 选择器。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/72d337325b5e42898dd7bae45655bd81.png#pic_center)
- 注意：类选择器、属性选择器、伪类选择器，权重为 10。

### 24.1.2 结构伪类选择器

- 结构伪类选择器主要根据文档结构来选择器元素， 常用于根据父级选择器里面的子元素
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/d324eac3a42f43058960d3f6616e3b84.png#pic_center)
- nth-child（n） 选择某个父元素的一个或多个特定的子元素（重点）
  ①n 可以是数字，关键字和公式
  ②n 如果是数字，就是选择第 n 个子元素， 里面数字从 1 开始…
  ③n 可以是关键字：even 偶数，odd 奇数
  ④n 可以是公式：常见的公式如下 ( 如果 n 是公式，则从 0 开始计算，但是第 0 个元素或者超出了元素的个数会被忽略 )
- 区别：
  ①nth-child 对父元素里面所有孩子排序选择（序号是固定的） 先找到第 n 个孩子，然后看看是否和 E 匹配
  ②nth-of-type 对父元素里面指定子元素进行排序选择。 先去匹配 E ，然后再根据 E 找第 n 个孩子
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/6b58366bef8a4f50b5d7011e3d2ef6ed.png#pic_center)
- 小结
  ① 结构伪类选择器一般用于选择父级里面的第几个孩子
  ②nth-child 对父元素里面所有孩子排序选择（序号是固定的）先找到第 n 个孩子，然后看看是否和 E 匹配
  ③nth-of-type 对父元素里面指定子元素进行排序选择。先去匹配 E ，然后再根据 E 找第 n 个孩子
  ④ 如果是无序列表，用 nth-child 更多
  ⑤ 类选择器、属性选择器、伪类选择器，权重为 10。

### 24.1.3 伪元素选择器

- 伪元素选择器可以帮助我们利用 CSS 创建新标签元素，而不需要 HTML 标签，从而简化 HTML 结构。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/828fd837d2064048b47760eae84960cc.png#pic_center)
- 注意：
  ①before 和 after 创建一个元素，但是属于行内元素
  ② 新创建的这个元素在文档树中是找不到的，所以我们称为伪元素
  ③ 语法：`element::before {}`  
  ④before 和 after 必须有 content 属性
  ⑤before 在父元素内容的前面创建元素，after 在父元素内容的后面插入元素
  ⑥ 伪元素选择器和标签选择器一样，权重为 1
- 使用场景 1：伪元素字体图标

```css
p::before {
  position: absolute;
  right: 20px;
  top: 10px;
  content: "\e91e";
  font-size: 20px;
}
```

- 使用场景 2：遮罩层

```css
/* 当我们鼠标经过了盒子，就让里面before遮罩层显示出来    */
div:hover::before {
  /* 显示元素  */
  display: block;
}
```

- 使用场景 3：伪元素清除浮动

1. 额外标签法也称为隔墙法，是 W3C 推荐的做法。
2. 父级添加 overflow 属性
3. 父级添加 after 伪元素

```css
.clearfix:after {
  content: ""; /* 伪元素必须写的属性 */
  display: block; /* 插入的元素必须是块级*/
  height: 0; /*不要看见这个元素*/
  clear: both; /* 核心代码清除浮动 */
  visibility: hidden; /* 不要看见这个元素 */
}
```

4. 父级添加双伪元素

```css
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
```

3,4 两种伪元素清除浮动算是第一种额外标签法的一个升级和优化

## 24.2 CSS3 盒子模型

- 通过 `box-sizing` 来指定盒模型,可指定为 `content-box`、`border-box`,这样计算盒子大小的方式就发生了改变
  ①`box-sizing: content-box` 盒子大小为 width + padding + border （以前默认的）
  ②`box-sizing: border-box` 盒子大小为 width，而 padding 和 border 不会撑大盒子了（前提 padding 和 border 不会超过 width 宽度）

## 24.3 CSS3 过渡

- 过渡（transition)是 CSS3 中具有颠覆性的特征之一，我们可以在不使用 Flash 动画或 JavaScript 的情况下，当元素从一种样式变换为另一种样式时为元素添加效果。
- 过渡动画： 是从一个状态 渐渐的过渡到另外一个状态
- 经常和 `:hover` 一起 搭配使用。

```css
transition: 要过渡的属性 花费时间 运动曲线 何时开始;
```

- 注意
  ① 属性：想要变化的 css 属性， 宽度高度 背景颜色 内外边距都可以 。如果想要所有的属性都 变化过渡，写一个**all** 就可以。
  ② 花费时间： 单位是 **秒**（必须写单位） 比如 0.5s
  ③ 运动曲线： 默认是 ease （可以省略）
  ④ 何时开始 ：单位是秒（必须写单位）可以设置延迟触发时间 默认是 0s （可以省略）
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/c42cb223f91f46e6b4b0b9c32a8fd421.png#pic_center)

## 24.4 CSS3 2D 转换

- 转换（transform）是 CSS3 中具有颠覆性的特征之一，可以实现元素的位移 translate、旋转 rotate、缩放 scale 等效果
- 二维坐标系
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/8609215dde27461c91d517d73a80a3aa.png#pic_center)

### 24.4.1 移动 translate

- 2D 移动是 2D 转换里面的一种功能，可以改变元素在页面中的位置，类似定位。

```css
transform: translate(x, y); /* 或者分开写 */
transform: translateX(n);
transform: translateY(n);
```

- 注意：
  ① 定义 2D 转换中的移动，沿着 X 和 Y 轴移动元素
  ②translate 最大的优点：不会影响到其他元素的位置
  ③translate 中的百分比单位是相对于自身元素的 translate:(50%,50%);
  ④ 对行内标签没有效果

### 24.4.2 旋转 rotate

- 2D 旋转指的是让元素在 2 维平面内顺时针旋转或者逆时针旋转。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/48fe029f6ebe454abbb91beb0421cc29.png#pic_center)

```css
transform: rotate(度数);
```

- 注意：
  ①rotate 里面跟度数， 单位是 **deg** 比如 rotate(45deg)
  ② 角度为正时，顺时针，负时，为逆时针
  ③ 默认旋转的中心点是元素的中心点

### 24.4.3 转换中心点

- 可以设置元素转换的中心点

```css
transform-origin: x y;
```

- 注意：
  ① 注意后面的参数 x 和 y 用空格隔开
  ②x y 默认转换的中心点是元素的中心点 (50% 50%)
  ③ 还可以给 x y 设置 像素 或者 方位名词 （top bottom left right center)

### 24.4.4 缩放 scale

- 控制元素放大还是缩小

```css
transform: scale(x, y);
```

- 注意：
  ① 注意其中的 x 和 y 用**逗号**分隔，参数不带单位
  ②transform:scale(1,1) ：宽和高都放大一倍，相对于没有放大
  ③transform:scale(2,2) ：宽和高都放大了 2 倍
  ④transform:scale(2) ：只写一个参数，第二个参数则和第一个参数一样，相当于 scale(2,2)
  ⑤transform:scale(0.5,0.5)：缩小
  ⑥sacle 缩放最大的优势：可以设置转换中心点缩放，默认以中心点缩放的，而且不影响其他盒子

### 24.4.5 综合写法

- 同时使用多个转换，其格式为：transform: translate() rotate() scale() ...等，
- 顺序会影转换的效果。（先旋转会改变坐标轴方向）
- 当同时有位移和其他属性的时候，记得要将位移放到最前

## 24.5 CSS3 动画

- 动画（animation）是 CSS3 中具有颠覆性的特征之一，可通过设置多个节点来精确控制一个或一组动画，常 用来实现复杂的动画效果。
- 相比较过渡，动画可以实现更多变化，更多控制，连续自动播放等效果。

### 24.5.1 动画使用步骤

- 步骤一：用 keyframes 定义动画（类似定义类选择器）

```css
@keyframes 动画名称 {
  0% {
    width: 100px;
  }
  100% {
    width: 200px;
  }
}
```

- 注意：
  ①0% 是动画的开始，100% 是动画的完成。这样的规则就是动画序列。
  ② 在 @keyframes 中规定某项 CSS 样式，就能创建由当前样式逐渐改为新样式的动画效果。
  ③ 动画是使元素从一种样式逐渐变化为另一种样式的效果。可以改变任意多的样式任意多的次数。
  ④ 用百分比来规定变化发生的时间，或用关键词 "from" 和 "to"，等同于 0% 和 100%。
- 步骤二：元素使用动画

```css
div {
  width: 200px;
  height: 200px;
  background-color: aqua;
  margin: 100px auto;
  /* 调用动画    */
  animation-name: 动画名称;
  /* 持续时间    */
  animation-duration: 持续时间;
}
```

### 24.5.2 动画常用属性

![在这里插入图片描述](https://img-blog.csdnimg.cn/45ad88be8b4b412eacb5ace0d54d1655.png#pic_center)

### 24.5.3 动画简写属性

- animation：动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 动画起始或者结束的状态;

```css
animation: myfirst 5s linear 2s infinite alternate;
```

- 注意：
  ① 简写属性里面不包含 animation-play-state
  ② 暂停动画：`animation-play-state: puased;` 经常和鼠标经过等其他配合使用
  ③ 想要动画走回来 ，而不是直接跳回来：`animation-direction: alternate`
  ④ 盒子动画结束后，停在结束位置：`animation-fill-mode: orwards`

### 24.5.4 速度曲线

- `animation-timing-function`：规定动画的速度曲线，默认是“ease”
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/2a69f683c1364879933ac0702b400c76.png#pic_center)

## 24.6 CSS3 3D 转换

- 特点
  ① 近大远小。
  ② 物体后面遮挡不可见

### 24.6.1 三维坐标系

- 三维坐标系其实就是指立体空间，立体空间是由 3 个轴共同组成的。
  ①x 轴：水平向右 注意： x 右边是正值，左边是负值
  ②y 轴：垂直向下 注意： y 下面是正值，上面是负值
  ③z 轴：垂直屏幕 注意： 往外面是正值，往里面是负值
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/3bba9b839e6b451d86a46f5eed414dae.png#pic_center)

### 24.6.2 3D 移动

- 3D 移动在 2D 移动的基础上多加了一个可以移动的方向，就是 z 轴方向。
- z 轴是垂直屏幕，由里指向外面，所以默认是看不到元素在 z 轴的方向上移动
- 语法：
  ①`translform:translateX(100px)`：仅仅是在 x 轴上移动
  ②`translform:translateY(100px)` :仅仅是在 Y 轴上移动
  ③`translform:translateZ(100px)`：仅仅是在 Z 轴上移动（注意：translateZ 一般用 px 单位）
  ④`transform:translate3d(x,y,z)`：其中 x、y、z 分别指要移动的轴的方向的距离

### 24.6.3 透视

- 在 2D 平面产生近大远小视觉立体，但是只是效果二维的
- 如果想要在网页产生 3D 效果需要透视（理解成 3D 物体投影在 2D 平面内）。
- 模拟人类的视觉位置，可认为安排一只眼睛去看
- 透视我们也称为视距：视距就是人的眼睛到屏幕的距离
- 距离视觉点越近的在电脑平面成像越大，越远成像越小
- 透视的单位是像素

```css
perspective: 300px;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/3af74801bb804ce789699d7f55095414.png#pic_center)

- 注意：
  ① 透视写在被观察元素的父盒子上面的
  ②z 轴：物体距离屏幕的距离，z 轴越大（正值） 我们看到的物体就越大。往外是正值
  ，往里是负值
  ③ 有了透视，才能看到 translateZ 引起的变化

### 24.6.4 3D 旋转

- 3D 旋转(rotate)指可以让元素在三维平面内沿着 x 轴，y 轴，z 轴或者自定义轴进行旋转。
- 语法：
  ①transform:rotateX(45deg)：沿着 x 轴正方向旋转 45 度
  ②transform:rotateY(45deg) ：沿着 y 轴正方向旋转 45deg
  ③transform:rotateZ(45deg) ：沿着 Z 轴正方向旋转 45deg
  ④transform:rotate3d(x,y,z,deg)： xyz 是表示旋转轴的矢量，是标示你是否希望沿着该轴旋转，最后一个标示旋转的角度。例如：`transform:rotate3d(1,0,0,45deg)` 就是沿着 x 轴旋转 45 度`transform:rotate3d(1,1,0,45deg)` 就是沿着对角线旋转 45 度
- 左手准则
  ① 左手的手拇指指向 x 轴的正方向
  ② 其余手指的弯曲方向就是该元素沿着**x 轴**旋转的方向
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/a7e74f1b1b194678b2ee72d3562fda7f.png#pic_center)
  ① 左手的手拇指指向 y 轴的正方向
  ② 其余手指的弯曲方向就是该元素沿着**y 轴**旋转的方向（正值）

### 24.6.5 3D 呈现

```css
transfrom-style：flat | preserve-3d
```

- 控制子元素是否开启三维立体环境。
- `transform-style: flat` 子元素不开启 3d 立体空间 默认的
- `transform-style: preserve-3d`; 子元素开启立体空间
- 代码写给父级，但是影响的是子盒子
- 属性很重要，必用

## 24.7 其他特性

### 24.7.1 filter 滤镜

- filter 属性将模糊或颜色偏移等图形效果应用于元素。

```css
filter: blur(5px);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/28b79b114f164fbb914109d7840036f1.png#pic_center)

- blur 模糊处理 数值越大越模糊

### 24.7.2 calc 函数

- calc() 此 CSS 函数让你在声明 CSS 属性值时执行一些计算。
- 括号里面可以使用 + - \* / 来进行计算。

```css
width: calc(100% - 80px);
```

### 24.7.3 背景线性渐变

![在这里插入图片描述](https://img-blog.csdnimg.cn/1595a2fc654c4ff898f583c9c55d46bb.png#pic_center)

```css
background: linear-gradient(起始方向, 颜色1, 颜色2, ...);
background: -webkit-linear-gradient(left, red, blue);
background: -webkit-linear-gradient(left top, red, blue);
```

- 背景渐变必须添加浏览器私有前缀
- 起始方向可以是： 方位名词 或者 度数 ， 如果省略默认就是 top

## 24.8 浏览器私有前缀

- 私有前缀
  ①`-moz-:` 代表 firefox 浏览器私有属性
  ②`-ms-:` 代表 ie 浏览器私有属性
  ③`-webkit-:` 代表 safari、chrome 私有属性
  ④`-o-:` 代表 Opera 私有属性
- 提倡的写法

```css
-moz-border-radius: 10px;
-webkit-border-radius: 10px;
-o-border-radius: 10px;
border-radius: 10px;
```

# 25. 补充

## 25.1 Emmet 语法

- Emmet 语法的前身是 Zen coding,它使用缩写,来提高 html/css 的编写速度, Vscode 内部已经集成该语法.
- 快速生成 HTML 结构语法
  ① 生成标签 直接输入标签名 按 tab 键即可 比如 div 然后 tab 键， 就可以生成 `<div></div>`
  ② 如果想要生成多个相同标签 加上 * 就可以了 比如 div*3 就可以快速生成 3 个 div
  ③ 如果有父子级关系的标签，可以用 > 比如 ul > li 就可以了
  ④ 如果有兄弟关系的标签，用 + 就可以了 比如 div+p
  ⑤ 如果生成带有类名或者 id 名字的，直接写 .demo 或者 #two tab 键就可以了
  ⑥ 如果生成的 div 类名是有顺序的， 可以用 自增符号 $
  ⑧ 如果想要在生成的标签内部写内容可以用 { } 表示
- 快速生成 CSS 样式语法
  ① 比如 w200 按 tab 可以 生成 width: 200px;
  ② 比如 lh26px 按 tab 可以生成 line-height: 26px;
