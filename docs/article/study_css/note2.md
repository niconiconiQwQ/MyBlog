---
title: 移动 WEB 开发
date: 2022/04/22 21:48 #手动设置最后更新时间
categories: [移动端, less] # 标签
stick: false # 是否置顶
description: 移动 WEB 开发
keyword: 移动端 less
---

# 移动 WEB 开发

# 1. 移动端基础

## 1.1 浏览器现状

- PC 端常见浏览器
  360 浏览器、谷歌浏览器、火狐浏览器、QQ 浏览 器、百度浏览器、搜狗浏览器、IE 浏览器。

![在这里插入图片描述](https://img-blog.csdnimg.cn/378203221589452dad3b03408d8f304c.png#pic_center)

- 移动端常见浏览器
  UC 浏览器，QQ 浏览器，欧朋浏览器， 百度手机浏览器，360 安全浏览器，谷歌
  浏览器，搜狗手机浏览器，猎豹浏览器等
- 国内的 UC 和 QQ，百度等手机浏览器都是根据 Webkit 修改过来的内核，国内尚无自主研发的内核
- 兼容移动端主流浏览器，处理 Webkit 内核浏览器即可。

## 1.2 手机屏幕现状

- 移动端设备屏幕尺寸非常多，碎片化严重。
- Android 设备有多种分辨率：480x800, 480x854, 540x960, 720x1280，1080x1920 等，还有 2K，4k 屏。
- iPhone 的碎片化也加剧了，其设备的主要分辨率有：640x960, 640x1136, 750x1334, 1242x2208 等。
- 作为开发者无需关注这些分辨率，因为我们常用的尺寸单位是 px 。

## 1.3 移动端调试方法

- Chrome DevTools（谷歌浏览器）的模拟手机调试

![在这里插入图片描述](https://img-blog.csdnimg.cn/5f88fa5254954af088777939ba5c6389.png#pic_center)

# 2. 视口

- 视口（viewport）就是浏览器显示页面内容的屏幕区域。 视口可以分为布局视口、视觉视口和理想视口

## 2.1 布局视口

- 布局视口 layout viewport
- 一般移动设备的浏览器都默认设置了一个布局视口，用于解决早期的 PC 端页面在手机上显示的问题。
- iOS, Android 基本都将这个视口分辨率设置为 980px，所以 PC 上的网页大多都能在手机上呈现，只不过元 素看上去很小，一般默认可以通过手动缩放网页。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/506e326a740842a3ba5408325dbb3a3b.png#pic_center)

## 2.2 视觉视口

- 视觉视口 visual viewport
- 它是用户正在看到的网站的区域。注意：是网站的区域。
- 可以通过缩放去操作视觉视口，但不会影响布局视口，布局视口仍保持原来的宽度。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/116521f385dc43648e2422986b2c7f7b.png#pic_center)

## 2.3 理想视口

- 理想视口 ideal viewport
- 为了使网站在移动端有最理想的浏览和阅读宽度而设定
- 理想视口，对设备来讲，是最理想的视口尺寸
- 需要手动添写 meta 视口标签通知浏览器操作
- meta 视口标签的主要目的：布局视口的宽度应该与理想视口的宽度一致，简单理解就是设备有多宽，我们布局的视口就多宽

## 2.4 视口总结

- 视口就是浏览器显示页面内容的屏幕区域
- 视口分为布局视口、视觉视口和理想视口
- 移动端布局想要的是理想视口就是手机屏幕有多宽，我们的布局视口就有多宽
- 要理想视口，需要给移动端页面添加 meta 视口标签

## 2.5 meta 视口标签

```css
<meta name="viewport" content="width=device-width, user-scalable=no,
initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/c6fbf880afd142a3acdf9e08389cdefa.png#pic_center)

- 注意：标准的 viewport 设置
  ① 视口宽度和设备保持一致
  ② 视口的默认缩放比例 1.0
  ③ 不允许用户自行缩放
  ④ 最大允许的缩放比例 1.0
  ⑤ 最小允许的缩放比例 1.0

# 3. 二倍图

## 3.1 物理像素&物理像素比

- 物理像素点指的是屏幕显示的最小颗粒，是物理真实存在的。这是厂商在出厂时就设置好了,比如苹果 6\7\8 是 750\* 1334
- 开发时候的 1px 不是一定等于 1 个物理像素的
- PC 端页面，1 个 px 等于 1 个物理像素的，但是移动端就不尽相同
- 一个 px 的能显示的物理像素点的个数，称为物理像素比或屏幕像素比
- Retina（视网膜屏幕）是一种显示技术，可以将把更多的物理像素点压缩至一块屏幕里，从 而达到更高的分辨率，并提高屏幕显示的细腻程度。

![在这里插入图片描述](https://img-blog.csdnimg.cn/a6f33544df87494db4d87652f5463c5a.png#pic_center)

- 对于一张 50px \* 50px 的图片,在手机 Retina 屏中打开，按照刚才的物理像素比会放大倍数，这样会造成图片模糊
- 在标准的 viewport 设置中，使用倍图来提高图片质量，解决在高清设备中的模糊问题

```css
img {
  /*原始图片100*100px*/
  width: 50px;
  height: 50px;
}
.box {
  /*原始图片100*100px*/
  background-size: 50px 50px;
}
```

## 3.2 背景缩放

- `background-size` 属性规定背景图像的尺寸

```css
background-size: 背景图片宽度 背景图片高度;
```

- 单位： 长度|百分比|cover|contain;
  `cover`把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。
  `contain`把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域

## 3.3 多倍图切图工具

- 多倍图切图工具：cutterman，一款运行在 photoshop 中的插件
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/9db3777f48f84fd3805afd1e5f81a9f0.png#pic_center)

# 4. 移动端开发选择

## 4.1 单独移动端页面

- 通常情况下，网址域名前面加 m(mobile) 可以打开移动端。通过判断设备，如果是移动设备打开，则跳到移动端页面。
  如：淘宝，京东，苏宁

## 4.2 响应式兼容 PC 移动端

- 通过判断屏幕宽度来改变样式，以适应不同终端。制作麻烦， 需要花很大精力去调兼容性问题
  如：三星电子官网
- 市场主流的选择还是单独制作移动端页面

# 5. 移动端技术解决方案

## 5.1 移动端浏览器

- 移动端浏览器基本以 webkit 内核为主，因此我们就考虑 webkit 兼容性问题。
- 可以放心使用 H5 标签和 CSS3 样式。
- 浏览器的私有前缀只需要考虑添加 webkit 即可

![在这里插入图片描述](https://img-blog.csdnimg.cn/cee745d12ae642fbb1e7d8848ac18d7f.png#pic_center)

## 5.2 CSS 初始化

- 移动端 CSS 初始化推荐使用 normalize.css
- 官网地址: [http://necolas.github.io/normalize.css/](http://necolas.github.io/normalize.css/)
- 好处：
  ①Normalize.css：保护了有价值的默认值
  ②Normalize.css：修复了浏览器的 bug
  ③Normalize.css：是模块化的
  ④Normalize.css：拥有详细的文档

## 5.3 盒子模型选择

- 传统模式宽度计算：盒子的宽度 = CSS 中设置的 width + border + padding
- CSS3 盒子模型： 盒子的宽度 = CSS 中设置的宽度 width 里面包含了 border 和 padding 。CSS3 中的盒子模型， padding 和 border 不会撑大盒子。

```css
/*CSS3盒子模型*/
box-sizing: border-box;
/*传统盒子模型*/
box-sizing: content-box;
```

- 如何选择：
  ① 移动端可以全部 CSS3 盒子模型
  ②PC 端如果完全需要兼容，就用传统模式，如果不考虑兼容性，就选择 CSS3 盒子模型

## 5.4 特殊样式

```css
box-sizing: border-box;
-webkit-box-sizing: border-box;
/*点击高亮我们需要清除清除，设置为transparent 完成透明*/
-webkit-tap-highlight-color: transparent;
/*在移动端浏览器默认的外观在iOS上加上这个属性才能给按钮和输入框自定义样式*/
-webkit-appearance: none;
/*禁用长按页面时的弹出菜单*/
img,
a {
  -webkit-touch-callout: none;
}
```

# 6. 移动端常见布局

- 移动端技术选型
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/af5222b3b3e243a1b816949c6fa5a31e.png#pic_center)

## 6.1 流式布局

- 流式布局，就是**百分比布局**，也称非固定像素布局。
- 通过盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩，不受固定像素的限制，内容向两侧填充。
- 流式布局方式是移动 web 开发使用的比较常见的布局方式。

## 6.2 flex 布局

![在这里插入图片描述](https://img-blog.csdnimg.cn/b27ea0a152214f789588014064b0c210.png#pic_center)

- PC 端页面布局，使用传统布局。
- 移动端或者不考虑兼容性问题的 PC 端页面布局，使用 flex 弹性布局

### 6.2.1 布局原理

- flex 是 flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性，任何一个容器都可以 指定为 flex 布局。
- 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成 员，称为 Flex 项目（flex item），简称"项目"。
- 注意：
  ① 当我们为父盒子设为 flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。
  ② 伸缩布局 = 弹性布局 = 伸缩盒布局 = 弹性盒布局 =flex 布局
- 布局**核心**：
  就是通过给父盒子添加 flex 属性，来控制子盒子的位置和排列方式
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/fa5a6e1a720147cebecb338d2d0faa46.png#pic_center)

### 6.2.2 父项常见属性

| 属性名          | 作用                                                   |
| --------------- | ------------------------------------------------------ |
| flex-direction  | 设置主轴的方向                                         |
| justify-content | 设置主轴上的子元素排列方式                             |
| flex-wrap       | 设置子元素是否换行                                     |
| align-content   | 设置侧轴上的子元素的排列方式（多行）                   |
| align-items     | 设置侧轴上的子元素排列方式（单行）                     |
| flex-flow       | 复合属性，相当于同时设置了 flex-direction 和 flex-wrap |

- 轴概念
  ① 默认主轴方向就是 x 轴方向，水平向右
  ② 默认侧轴方向就是 y 轴方向，水平向下
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/9e7fbce7146d4a009d6f9afe201e3dcc.png#pic_center)

#### 6.2.2.1 设置主轴方向

- `flex-direction` 属性决定主轴的方向（即项目的排列方向）
- 注意： 主轴和侧轴是会变化的，就看 `flex-direction` 设置谁为主轴，剩下的就是侧轴。子元素是跟着主轴来排列的
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/ac1e69442cac47d091fd18dbd603a535.png#pic_center)

#### 6.2.2.2 主轴上子元素排列方式

- justify-content 属性定义了项目在主轴上的对齐方式
- 注意： 使用这个属性之前一定要确定好主轴是哪个
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/fc441de3544148eab2731ad1f01e7694.png#pic_center)

#### 6.2.2.3 设置子元素换行

- 默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap 属性定义，flex 布局中默认是不换行的。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/fa1626f7bdae4311b116eaa942c26a2d.png#pic_center)

#### 6.2.2.4 侧轴上子元素排列方式

- `align-items` 该属性是控制子项在侧轴（默认是 y 轴）上的排列方式 在子项为单项（**单行**）的时候使用
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/43a4c84d548c4ea79c452059803d5403.png#pic_center)
- `align-content` 设置子项在侧轴上的排列方式 并且只能用于子项出现 换行 的情况（**多行**），在单行下是没有效果的。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/8da2a74c889542399520cfb857e345e6.png#pic_center)
- `align-content` 和 `align-items` 区别
  ①`align-items` 适用于单行情况下， 只有上对齐、下对齐、居中和 拉伸
  ②`align-content` 适应于换行（多行）的情况下（单行情况下无效）， 可以设置 上对齐、 下对齐、居中、拉伸以及平均分
  配剩余空间等属性值。
  ③ 总结就是单行找 `align-items` 多行找 `align-content`
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/85cc2a5352d742ba9a441a9d28ba9a05.png#pic_center)

### 6.2.3 子项常见属性

#### 6.2.3.1 flex 属性

- flex 属性定义子项目分配剩余空间，用 flex 来表示占多少份数。

```css
.item {
  flex: <number>; /* default 0 */
}
```

#### 6.2.3.2 align-self 属性

- `align-self` 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。
- 默认值为 auto，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch`

```css
span:nth-child(2) {
  /* 设置自己在侧轴上的排列方式  */
  align-self: flex-end;
}
```

#### 6.2.3.3 order 属性

- order 属性定义项目的排列顺序
- 数值越小，排列越靠前，默认为 0。
- 注意：和 z-index 不一样。

```css
.item {
  order: <number>;
}
```

## 6.3 rem 适配布局

问：

1.  页面布局文字能否随着屏幕大小变化而变化？
2.  流式布局和 flex 布局主要针对于宽度布局，那高度如何设置？
3.  怎么样让屏幕发生变化的时候元素高度和宽度等比例缩放？

### 6.3.1 rem 基础

- rem (root em)是一个相对单位，类似于 em，em 是父元素字体大小。
- 而 rem 的基准是相对于 html 元素的字体大小。
  比如，根元素（html）设置 font-size=12px; 非根元素设置 width:2rem; 则换成 px 表示就是 24px。
- rem 的优势：父元素文字大小可能不一致， 但是整个页面只有一个 html，可以很好来控制整个页面的元素大小

```css
/* 根html 为    12px */
html {
  font-size: 12px;
}
/* 此时    div 的字体大小就是    24px */
div {
  font-size: 2rem;
}
```

### 6.3.2 媒体查询

- 媒体查询（Media Query）是 CSS3 新语法。
  ① 使用 `@media` 查询，可以针对不同的媒体类型定义不同的样式
  ②`@media` 可以针对不同的屏幕尺寸设置不同的样式
  ③ 当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面
  ④ 目前针对很多苹果手机、Android 手机，平板等设备都用得到多媒体查询

#### 6.3.2.1 语法规范

- 用 `@media` 开头 注意@符号
- mediatype 媒体类型 如 ：`screen`
- 关键字 and not only
- media feature 媒体特性 必须有小括号包含

```css
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```

#### 6.3.2.2 mediatype 查询类型

- 将不同的终端设备划分成不同的类型，称为媒体类型

![在这里插入图片描述](https://img-blog.csdnimg.cn/200bc1c0170d4466a4d516e87dbdcb5f.png#pic_center)

#### 6.3.2.3 关键字

- 关键字将媒体类型或多个媒体特性连接到一起做为媒体查询的条件。
  ①and：可以将多个媒体特性连接到一起，相当于“且”的意思。
  ②not：排除某个媒体类型，相当于“非”的意思，可以省略。
  ③only：指定某个特定的媒体类型，可以省略。

#### 6.3.2.4 媒体特性

- 每种媒体类型都具体各自不同的特性，根据不同媒体类型的媒体特性设置不同的展示风格。暂且了解三个
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/b5a1205b0c62401c9959a1e276e09957.png#pic_center)
- **注意**： 为了防止混乱，媒体查询要按照从小到大或者从大到小的顺序来写,但是我们最喜欢的还是从小到大来写，这样代码更简洁
- **媒体查询+rem 实现元素动态大小变化**
  ①rem 单位是跟着 html 来走的，有了 rem 页面元素可以设置不同大小尺寸
  ② 媒体查询可以根据不同设备宽度来修改样式
  ③ 媒体查询+rem 就可以实现不同设备宽度，实现页面元素大小的动态变化

#### 6.3.2.5 引入资源

- 当样式比较繁多的时候，我们可以针对不同的媒体使用不同 stylesheets（样式表）。 原理，就是直接在 link 中判断设备的尺寸，然后引用不同的 css 文件。

```css
/* 语法 <link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css"> */
<link rel="stylesheet" href="styleA.css" media="screen and (min-width: 400px)">
```

### 6.3.3 rem 适配方案

- 让一些不能等比自适应的元素，达到当设备尺寸发生改变的时候，等比例适配当前设备。
- 使用媒体查询根据不同设备按比例设置 html 的字体大小，然后页面元素使用 rem 做尺寸单位，当 html 字体大小变化元素尺寸也会发生变化，从而达到等比缩放的适配。
- 步骤
  ① 按照设计稿与设备宽度的比例，动态计算并设置 html 根标签的 font-size 大小；（媒体查询）
  ② CSS 中，设计稿元素的宽、高、相对位置等取值，按照同等比例换算为 rem 为单位的值；

#### 6.3.3.1 less + 媒体查询 + rem

- less + 媒体查询 + rem
- 动态设置 html 标签 font-size 大小
  ① 假设设计稿是 750px
  ② 假设我们把整个屏幕划分为 15 等份（划分标准不一可以是 20 份也可以是 10 等份）
  ③ 一份作为 html 字体大小，这里就是 50px
  ④ 那么在 320px 设备的时候，字体大小为 320/15 就是 21.33px
  ⑤ 用我们页面元素的大小除以不同的 html 字体大小会发现他们比例还是相同的
  ⑥ 比如我们以 750 为标准设计稿
  ⑦ 一个 100*100 像素的页面元素 在 750 屏幕下， 就是 100 / 50 转换为 rem 是 2rem * 2 rem 比例是 1 比 1
  ⑧ 320 屏幕下，html 字体大小为 21.33 则 2rem = 42.66px 此时宽和高都是 42.66 但是 宽和高的比例还是 1 比 1
  ⑨ 但是已经能实现不同屏幕下 页面元素盒子等比例缩放的效果
- 总结
  ① 最后的公式： 页面元素的 rem 值 = 页面元素值（px） / （屏幕宽度 / 划分的份数）
  ② 屏幕宽度/划分的份数 就是 html font-size 的大小
  ③ 或者： 页面元素的 rem 值 = 页面元素值（px） / html font-size 字体大小

#### 6.3.3.2 flexible.js + rem

- flexible.js + rem （推荐）
  ① 不需要在写不同屏幕的媒体查询，因为里面 js 做了处理。
  ② 原理：把当前设备划分为 10 等份，但是不同设备下，比例还是一致的。
  ③ 我们要做的，就是确定好当前设备的 html 文字大小
  ④ 比如：当前设计稿是 750px， 那么我们只需要把 html 文字大小设置为 75px(750px / 10) 就可以
  ⑤ 里面页面元素 rem 值： 页面元素的 px 值 / 75 剩余的，让 flexible.js 来去算

flexible.js 地址：[https://github.com/amfe/lib-flexible](https://github.com/amfe/lib-flexible)

- VSCode 插件推荐 ：**cssrem** 一个单位换算插件
  根据需要设置 html 字体大小基准值：
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/dd18eb28fece4503841d695f7fa7cc2a.png#pic_center)

## 6.4 响应式布局

### 6.4.1 响应式开发原理

- 使用媒体查询针对不同宽度的设备进行布局和样式的设置，从而适配不同设备的目的。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/b6e785f7c5e24360a4cc60d9434b8248.png#pic_center)

### 6.4.2 响应式布局容器

- 响应式需要一个父级做为布局容器，来配合子级元素来实现变化效果。
- 原理就是在不同屏幕下，通过媒体查询来改变这个布局容器的大小，再改变里面子元素的排列方式和大小，从而实现不同 屏幕下，看到不同的页面布局和样式变化。

# 7. Less 基础

## 7.1 维护 css 的弊端

- CSS 是一门非程序式语言，没有变量、函数、SCOPE（作用域）等概念。
  ①CSS 需要书写大量看似没有逻辑的代码，CSS 冗余度是比较高的。
  ② 不方便维护及扩展，不利于复用。
  ③CSS 没有很好的计算能力
  ④ 非前端开发工程师来讲，往往会因为缺少 CSS 编写经验而很难写出组织良好且易于维护的 CSS 代码项目。

## 7.2 Less 介绍

- Less （Leaner Style Sheets 的缩写）是一门 CSS 扩展语言，也成为 CSS 预处理器。做为 CSS 的一种形式的扩展，在现有的 CSS 语法上，为 CSS 加入程序式语言的特性。它在 CSS 的语法基础之上，引入了变量，Mixin（混入），运算以及函数等功能，大大简化了 CSS 的编写，并且降低了 CSS 的维护成本
- Less 中文网址： [http://lesscss.cn/](http://lesscss.cn/)

## 7.3 Less 安装

- 如果使用 vscode 无需安装 less
- 安装步骤
  ① 安装 nodejs，网址：[http://nodejs.cn/download/](http://nodejs.cn/download/)
  ② 检查是否安装成功，使用 cmd 命令（win10 是 window +r 打开 运行输入 cmd） --- 输入“ node –v ”查看版本即可
  ③ 基于 nodejs 在线安装 Less，使用 cmd 命令“ npm install -g less ”即可
  ④ 检查是否安装成功，使用 cmd 命令“ lessc -v ”查看版本即可
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/a876ce768d9346c29823fdfac8ec2cd3.png#pic_center)

## 7.4 Less 使用

- 首先新建一个后缀名为 less 的文件， 在这个 less 文件里面书写 less 语句。

### 7.4.1 Less 变量

- 变量是指没有固定的值，可以改变的。CSS 中的一些颜色和数值等经常使用。

```css
@变量名: 值;
```

- 变量命名规范
  ① 必须有@为前缀
  ② 不能包含特殊字符
  ③ 不能以数字开头
  ④ 大小写敏感

```css
//直接使用
@color: red;
div {
  color: @color;
}
```

### 7.4.2 Less 编译

- Less 包含一套自定义的语法及一个解析器，用户根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的 CSS 文件。
- vocode Less 插件推荐
  Easy LESS 插件用来把 less 文件编译为 css 文件

### 7.4.3 Less 嵌套

- Less 嵌套写法

```css
//  #header .logo {
//   width: 300px;
// }
#header {
  .logo {
    width: 300px;
  }
}
```

- 如果遇见 （交集|伪类|伪元素选择器）
  ① 内层选择器的前面没有 & 符号，则它被解析为父选择器的后代；
  ② 如果有 & 符号，它就被解析为父元素自身或父元素的伪类。

```css
// a:hover{
//    color:red;
//}
a{
  &:hover{
      color:red;
}
```

### 7.4.4 Less 运算

- 任何数字、颜色或者变量都可以参与运算。就是 Less 提供了加（+）、减（-）、乘（\*）、除（/）算术运算。

```css
/*Less 里面写*/
@witdh: 10px + 5;
div {
  border: @witdh solid red;
}
/*生成的css*/
div {
  border: 15px solid red;
}
/*Less 甚至还可以这样    */
width: (@width + 5) * 2;
```

- 注意：
  ① 乘号（\*）和除号（/）的写法
  ② 运算符中间左右有个空格隔开 1px + 5
  ③ 对于两个不同的单位的值之间的运算，运算结果的值取第一个值的单位
  ④ 如果两个值之间只有一个值有单位，则运算结果就取该单位

# 8. 补充

## 8.1 vw vh 单位

- vw/vh 是一个相对单位（类似 em 和 rem 相对单位）
  ①vw 是：viewport width 视口宽度单位
  ②vh 是： viewport height 视口高度单位
- 相对视口的尺寸计算结果
  ①1vw = 1/100 视口宽度
  ②1vh = 1/100 视口高度
- 注意：和百分比有区别的，百分比是相对于父元素来说的，而 vw 和 vh 总是针对于当前视口来说的。
- 使用分析：
  ① 设计稿参照 iPhone678，所以视口宽度尺寸是 375 像素（像素大厨切换到 2x 模式）
  ② 那么 1vw = 375px / 100 = 3.75px
  ③ 我们元素的目标像素：50px * 50px
  ④：那么 50*50 是多少个 vw？：50 / 3.75 = 13.3333vw
  开发中使用 vw，**像素大厨**把模式改为 2x 模式
- vw 注意事项
  ① 设计到大量除法， 还是适应 LESS 搭配更好点。
  ② 本质是根据视口宽度来等比例缩放页面元素高度和宽度的，所以开发中使用 vw 就基本够用了，vh 很少使用。
  ③ 兼容性：参考网站： [https://caniuse.com/](https://caniuse.com/)
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/c2ae28811f2c4a66ae1d3b428bb664c8.png#pic_center)
