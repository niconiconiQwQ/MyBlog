---
title: PC端+移动端网页特效
date: 2022/05/07 20:53 #手动设置最后更新时间
categories: [] # 标签
stick: false # 是否置顶
description:
keyword: 网页特效 前端
---

# PC 端 + 移动端网页特效

# 1. PC 端网页特效

## 1.1 元素偏移量 offset 系列

### 1.1.1 offset 概述

- offset 就是偏移量， 我们使用 offset 系列相关属性可以动态的得到该元素的位置（偏移）、大小等。
- 功能：
  ① 获得元素距离带有定位父元素的位置
  ② 获得元素自身的大小（宽度高度）
- 注意： 返回的数值都不带单位
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/24d8312f148c43509443da5e41cf56f3.png#pic_center)

### 1.1.2 常用属性

![在这里插入图片描述](https://img-blog.csdnimg.cn/9defa1de3383471e97ace3c51681b5df.png#pic_center)
案例：基本使用

```javascript
<div class="father"> // css略了
	<div class="son"></div>
</div>
<div class="w"></div>
<script>
// offset 系列
var father = document.querySelector('.father');
var son = document.querySelector('.son');
// 1.可以得到元素的偏移 位置 返回的不带单位的数值
console.log(father.offsetTop);
console.log(father.offsetLeft);
// 它以带有定位的父亲为准  如果没有父亲或者父亲没有定位 则以 body 为准
console.log(son.offsetLeft);
var w = document.querySelector('.w');
// 2.可以得到元素的大小 宽度和高度 是包含padding + border + width
console.log(w.offsetWidth);
console.log(w.offsetHeight);
</script>
```

案例：计算鼠标在盒子内的坐标

```javascript
<div class="box"></div>
<script>
	// 我们在盒子内点击， 想要得到鼠标距离盒子左右的距离。
	// 首先得到鼠标在页面中的坐标（ e.pageX, e.pageY）
	// 其次得到盒子在页面中的距离(box.offsetLeft, box.offsetTop)
	// 用鼠标距离页面的坐标减去盒子在页面中的距离， 得到 鼠标在盒子内的坐标
	var box = document.querySelector('.box');
	box.addEventListener('mousemove', function(e) {
		// console.log(e.pageX);
		// console.log(e.pageY);
		// console.log(box.offsetLeft);
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		this.innerHTML = 'x坐标是' + x + ' y坐标是' + y;
	})
</script>
```

### 1.1.3 offset 与 style 区别

| offset                                         | style                                         |
| ---------------------------------------------- | --------------------------------------------- |
| offset 可以得到任意样式表中的样式值            | style 只能得到行内样式表中的样式值            |
| offset 系列获得的数值是没有单位的              | style.width 获得的是带有单位的字符串          |
| offsetWidth 包含 padding+border+width          | style.width 获得不包含 padding 和 border 的值 |
| offsetWidth 等属性是只读属性，只能获取不能赋值 | style.width 是可读写属性，可以获取也可以赋值  |
| 想要获取元素大小位置，用 offset 更合适         | 想要给元素更改值，则需要用 style 改变         |

## 1.2 元素可视区 client 系列

client 就是客户端，我们使用 client 系列的相关属性来获取元素可视区的相关信息。通过 client 系列的相关属性可以动态的得到该元素的边框大小、元素大小等。
![在这里插入图片描述](https://img-blog.csdnimg.cn/8fadd214e7c94de28c93071cb151f2c1.png#pic_center)

### 1.2.1 常用属性

![在这里插入图片描述](https://img-blog.csdnimg.cn/e69855e4bdc4478193b2880e4b893bbc.png#pic_center)

## 1.3 元素滚动 scroll 系列

scroll 就是滚动，我们使用 scroll 系列的相关属性可以动态的得到该元素的大小、滚动距离等。
![在这里插入图片描述](https://img-blog.csdnimg.cn/94fe08b166e340f1bddb171979a0361b.png#pic_center)

### 1.3.1 常见属性

![在这里插入图片描述](https://img-blog.csdnimg.cn/ac5a04438d22493482b9a656cd44dae8.png#pic_center)

### 1.3.2 页面被卷去的头部

如果浏览器的高（或宽）度不足以显示整个页面时，会自动出现滚动条。当滚动条向下滚动时，页面上面被隐藏掉的高度，我们就称为页面被卷去的头部。滚动条在滚动时会触发 onscroll 事件。

- 页面被卷去的头部：可以通过`window.pageYOffset` 获得，如果是被卷去的左侧 `window.pageXOffset`
- 注意：元素被卷去的头部是 `element.scrollTop` , 如果是页面被卷去的头部 则是 `window.pageYOffset`

页面被卷去的头部兼容性解决方案

1. 声明了 DTD，使用 document.documentElement.scrollTop
2. 未声明 DTD，使用 document.body.scrollTop
3. 新方法 window.pageYOffset 和 window.pageXOffset，IE9 开始支持

```javascript
function getScroll() {
  return {
    left:
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft ||
      0,
    top:
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0,
  };
}
// 使用的时候
getScroll().left;
```

> 补充：滚动**窗口**至文档中的特定位置。`window.scroll(x, y)`
> 注意，里面的 x 和 y 不跟单位，直接写数字
> 页面滚动了多少，可以通过 `window.pageYOffset` 得到

## 1.4 三大系列总结

![在这里插入图片描述](https://img-blog.csdnimg.cn/05be25dbe7c84eddb42609fc4f9a6b08.png#pic_center)

- 用法区分：
  ①offset 系列 经常用于获得元素位置 offsetLeft offsetTop
  ②client 经常用于获取元素大小 clientWidth clientHeight
  ③scroll 经常用于获取滚动距离 scrollTop scrollLeft  
  ④ 注意页面滚动的距离通过 window.pageXOffset 获得

> 知识点补充：
> mouseenter 和 mouseover 的区别
> 当鼠标移动到元素上时就会触发 mouseenter 事件，类似 mouseover，它们两者之间的差别是：
> mouseover 鼠标经过自身盒子会触发，经过子盒子还会触发。 mouseenter 只会经过自身盒子触发。因为 mouseenter 不会冒泡，常跟 mouseenter 搭配 鼠标离开 mouseleave 同样不会冒泡

## 1.5 动画函数封装

### 1.5.1 动画实现原理

- 核心原理：通过定时器 setInterval() 不断移动盒子位置
- 实现步骤：
  ① 获得盒子当前位置
  ② 让盒子在当前位置加上 1 个移动距离
  ③ 利用定时器不断重复这个操作
  ④ 加一个结束定时器的条件
  ⑤ 注意此元素需要添加定位，才能使用 element.style.left

```javascript
<div></div>
<script>
	var div = document.querySelector('div');
	var timer = setInterval(function() {
		if (div.offsetLeft >= 400) {
			// 停止动画 本质是停止定时器
			clearInterval(timer);
		}
		div.style.left = div.offsetLeft + 1 + 'px';
	}, 30);
</script>
```

### 1.5.2 动画函数简单封装

注意函数需要传递 2 个参数，动画对象和移动到的距离。

```javascript
<div></div>
<span>凉宫</span>
<script>
	// 简单动画函数封装obj目标对象 target 目标位置
	function animate(obj, target) {
		var timer = setInterval(function() {
		if (obj.offsetLeft >= target) {
			// 停止动画 本质是停止定时器
			clearInterval(timer);
		}
		obj.style.left = obj.offsetLeft + 1 + 'px';
		}, 30);
	}
	var div = document.querySelector('div');
	var span = document.querySelector('span');
	// 调用函数
	animate(div, 300);
	animate(span, 200);
</script>
```

### 1.5.3 动画函数给不同元素记录不同定时器

- 如果多个元素都使用这个动画函数，每次都要 var 声明定时器。我们可以给不同的元素使用不同的定时器（自己专门用自己的定时器）。
- 核心原理：利用 JS 是一门动态语言，可以很方便的给当前对象添加属性。

```javascript
<button>点击凉宫才走</button>
<div></div>
<span>凉宫</span>
<script>
	// var obj = {};
	// obj.name = 'andy';  给对象添加属性的方式
	// 简单动画函数封装obj目标对象 target 目标位置
	// 给不同的元素指定了不同的定时器
	function animate(obj, target) {
	// 当我们不断的点击按钮，这个元素的速度会越来越快，因为开启了太多的定时器
	// 解决方案就是 让我们元素只有一个定时器执行
	// 先清除以前的定时器，只保留当前的一个定时器执行
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		if (obj.offsetLeft >= target) {
			// 停止动画 本质是停止定时器
			clearInterval(obj.timer);
		}
		obj.style.left = obj.offsetLeft + 1 + 'px';
		}, 30);
	}
	var div = document.querySelector('div');
	var span = document.querySelector('span');
	var btn = document.querySelector('button');
	// 调用函数
	animate(div, 300);
	btn.addEventListener('click', function() {
		animate(span, 200);
	})
</script>
```

### 1.5.4 缓动效果原理

缓动动画就是让元素运动速度有所变化，最常见的是让速度慢慢停下来
思路：
① 让盒子每次移动的距离`在这里插入代码片`慢慢变小，速度就会慢慢落下来。
② 核心算法： (目标值 - 现在的位置 ) / 10 做为每次移动的距离 步长
③ 停止的条件是： 让当前盒子位置等于目标位置就停止定时器
④ 注意步长值需要取整

```javascript
<button>点击凉宫才走</button>
<span>凉宫</span>
<script>
    function animate(obj, target) {
        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            // 步长值写到定时器的里面
            var step = (target - obj.offsetLeft) / 10;
            if (obj.offsetLeft == target) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
            }
            // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    }
    var span = document.querySelector('span');
    var btn = document.querySelector('button');
    btn.addEventListener('click', function() {
            animate(span, 500);
        })
        // 匀速动画 就是 盒子是当前的位置 +  固定的值 10
        // 缓动动画就是  盒子当前的位置 + 变化的值(目标值 - 现在的位置) / 10）
</script>
```

### 1.5.5 动画函数多个目标值之间移动

可以让动画函数从 800 移动到 500。
当我们点击按钮时候，判断步长是正值还是负值

1. 如果是正值，则步长 往大了取整
2. 如果是负值，则步长 向小了取整

```c
<button class="btn500">点击凉宫到500</button>
<button class="btn800">点击凉宫到800</button>
<span>凉宫</span>
<script>
    function animate(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var step = (target - obj.offsetLeft) / 10;
            // 把步长值改为整数 不要出现小数的问题
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    }
    var span = document.querySelector('span');
    var btn500 = document.querySelector('.btn500');
    var btn800 = document.querySelector('.btn800');
    btn500.addEventListener('click', function() {
        animate(span, 500);
    })
    btn800.addEventListener('click', function() {
            animate(span, 800);
        })
</script>
```

### 1.5.6 动画函数添加回调函数

回调函数原理：函数可以作为一个参数。将这个函数作为参数传到另一个函数里面，当那个函数执行完之后，再执行传进去的这个函数，这个过程就叫做回调。
回调函数写的位置：定时器结束的位置。

```c
<button class="btn500">点击凉宫到500</button>
<button class="btn800">点击凉宫到800</button>
<span>凉宫</span>
<script>
    function animate(obj, target, callback) {
        // console.log(callback);  callback = function() {}  调用的时候:callback();
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                // 回调函数写到定时器结束里面,动画结束了执行
                if (callback) {
                    // 调用函数
                    callback();
                }
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    }
    var span = document.querySelector('span');
    var btn500 = document.querySelector('.btn500');
    var btn800 = document.querySelector('.btn800');
    btn500.addEventListener('click', function() {
        animate(span, 500);
    })
    btn800.addEventListener('click', function() {
            // 调用函数
            animate(span, 800, function() {
                span.style.backgroundColor = 'red';//动画结束后的执行的函数
            });
        })
</script>
```

### 1.5.7 动画函数封装到单独 JS 文件里面

以后经常使用这个动画函数，可以单独封装到一个 JS 文件里面，使用的时候引用这个 JS 文件即可。
步骤：
① 单独新建一个 JS 文件。
②HTML 文件引入 JS 文件。

```c
function animate(obj, target, callback) {
    // console.log(callback);  callback = function() {}  调用的时候 callback()
    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            callback && callback();
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
```

## 1.6 常见网页特效案例

## 1.7 淘宝 flexible.js 分析

```javascript
(function flexible(window, document) {
  // 获取的html 的根元素
  var docEl = document.documentElement;
  // dpr 物理像素比
  var dpr = window.devicePixelRatio || 1;
  // adjust body font size  设置我们body 的字体大小
  function setBodyFontSize() {
    // 如果页面中有body 这个元素 就设置body的字体大小
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      // 如果页面中没有body 这个元素，则等着 我们页面主要的DOM元素加载完毕再去设置body的字体大小
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();
  // set 1rem = viewWidth / 10    设置我们html 元素的文字大小
  function setRemUnit() {
    var rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + "px";
  }
  setRemUnit();
  // reset rem unit on page resize  当我们页面尺寸大小发生变化的时候，要重新设置下rem 的大小
  window.addEventListener("resize", setRemUnit);
  // pageshow 是我们重新加载页面触发的事件
  window.addEventListener("pageshow", function (e) {
    // e.persisted 返回的是true 就是说如果这个页面是从缓存取过来的页面，也需要从新计算一下rem 的大小
    if (e.persisted) {
      setRemUnit();
    }
  });
  // detect 0.5px supports  有些移动端的浏览器不支持0.5像素的写法
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
```

补充

- 立即执行函数 `(function() {})()` 或者 `(function(){}())` 。主要作用： 创建一个独立的作用域。 避免了命名冲突问题

```c
<script>
// 1.立即执行函数: 不需要调用，立马能够自己执行的函数
function fn() {
	console.log(1);
}
fn();
// 2. 写法 也可以传递参数进来
// 1.(function() {})()    或者  2. (function(){}());
(function(a, b) {
	console.log(a + b);
	var num = 10;
})(1, 2); // 第二个小括号可以看做是调用函数
(function sum(a, b) {
	console.log(a + b);
	var num = 10; // 局部变量
}(2, 3));
// 3. 立即执行函数最大的作用就是 独立创建了一个作用域, 里面所有的变量都是局部变量 不会有命名冲突的情况
</script>
```

- 下面三种情况都会刷新页面都会触发 load 事件。
  ①a 标签的超链接
  ②F5 或者刷新按钮（强制刷新）
  ③ 前进后退按钮
- 注意：火狐中，有个特点，有个“往返缓存”，这个缓存中不仅保存着页面数据，还保存了 DOM 和 JavaScript 的状态；实际上是将整个页面都保存在了内存里。所以此时后退按钮不能刷新页面。
  此时可以使用 `pageshow`事件来触发。这个事件在页面显示时触发，无论页面是否来自缓存。在重新加载页面中，pageshow 会在 load 事件触发后触发；根据事件对象中的 persisted 来判断是否是缓存中的页面触发的 pageshow 事件，注意这个事件给 window 添加。

```c
<a href="http://www.baidu.com">链接</a>
<script>
    window.addEventListener('pageshow', function() {
        alert(11); //onpageshow 事件在每次加载页面时触发，为了查看页面是直接从服务器上载入还是从缓存中读取，你可以使用 PageTransitionEvent 对象的 persisted 属性来判断
    })
</script>
```

# 2. 移动端网页特效

移动端浏览器兼容性较好，我们不需要考虑以前 JS 的兼容性问题，可以放心的使用原生 JS 书写效果，但是移动端也有自己独特的地方。

## 2.1 触屏事件

触屏事件 touch（也称触摸事件），Android 和 IOS 都有。对象代表一个触摸点。触摸点可能是一根手指，也可能是一根触摸笔。触屏事件可响应用户手指（或触控笔）对屏幕或者触控板操作。

### 2.1.1 常见的触屏事件

| 触屏 touch 事件 | 说明                            |
| --------------- | ------------------------------- |
| touchstart      | 手指触摸到一个 DOM 元素时触发   |
| touchmove       | 手指在一个 DOM 元素上滑动时触发 |
| touchend        | 手指从一个 DOM 元素上移开时触发 |

```c
<div></div>
<script>
    var div = document.querySelector('div');
    div.addEventListener('touchstart', function() {
        console.log('摸了');
    });
    // 3. 手指在DOM元素身上移动事件
    div.addEventListener('touchmove', function() {
        console.log('动了');
    });
    // 4. 手指离开DOM元素事件
    div.addEventListener('touchend', function() {
        console.log('溜了');
    });
</script>
```

### 2.1.2 触摸事件对象

TouchEvent 是一类描述手指在触摸平面（触摸屏、触摸板等）的状态变化的事件。这类事件用于描述一个或多个触点，使开发者可以检测触点的移动，触点的增加和减少，等等
touchstart、touchmove、touchend 三个事件都会各自有事件对象。

常见对象列表
![在这里插入图片描述](https://img-blog.csdnimg.cn/5a2cad2941e649c3bd031684be1e829e.png#pic_center)
平时我们都是给元素注册触摸事件，所以重点记住 targetTocuhes

```c
<div></div>
<script>
    var div = document.querySelector('div');
    //手指触摸DOM元素事件
    div.addEventListener('touchstart', function(e) {
        // touches 正在触摸屏幕的所有手指的列表
        // targetTouches 正在触摸当前DOM元素的手指列表
        // 如果侦听的是一个DOM元素，他们两个是一样的
        // 因为我们一般都是触摸元素 所以最经常使用的是 targetTouches
        console.log(e.targetTouches[0]);
        // targetTouches[0] 就可以得到正在触摸dom元素的第一个手指的相关信息比如 手指的坐标等等
    });
    // 手指离开DOM元素事件
    div.addEventListener('touchend', function(e) {
        // 当我们手指离开屏幕的时候，就没有了 touches 和 targetTouches 列表
        // 但是会有 changedTouches
    });
</script>
```

### 2.1.3 移动端拖动元素

1. touchstart、touchmove、touchend 可以实现拖动元素
2. 但是拖动元素需要当前手指的坐标值，我们可以使用 `targetTouches[0]` 里面的 pageX 和 pageY
3. 移动端拖动的原理： 手指移动中，计算出手指移动的距离。然后用盒子原来的位置 + 手指移动的距离
4. 手指移动的距离： 手指滑动中的位置 减去 手指刚开始触摸的位置

- 拖动元素三步曲：
  ① 触摸元素 touchstart： 获取手指初始坐标，同时获得盒子原来的位置
  ② 移动手指 touchmove： 计算手指的滑动距离，并且移动盒子
  ③ 离开手指 touchend:
- 注意： 手指移动也会触发滚动屏幕所以这里要阻止默认的屏幕滚动 `e.preventDefault()`

```c
<div></div>
<script>
    // （1） 触摸元素 touchstart：  获取手指初始坐标，同时获得盒子原来的位置
    // （2） 移动手指 touchmove：  计算手指的滑动距离，并且移动盒子
    // （3） 离开手指 touchend:
    var div = document.querySelector('div');
    var startX = 0; //获取手指初始坐标
    var startY = 0;
    var x = 0; //获得盒子原来的位置
    var y = 0;
    div.addEventListener('touchstart', function(e) {
        //  获取手指初始坐标
        startX = e.targetTouches[0].pageX;
        startY = e.targetTouches[0].pageY;
        x = this.offsetLeft;
        y = this.offsetTop;
    });
    div.addEventListener('touchmove', function(e) {
        //  计算手指的移动距离： 手指移动之后的坐标减去手指初始的坐标
        var moveX = e.targetTouches[0].pageX - startX;
        var moveY = e.targetTouches[0].pageY - startY;
        // 移动我们的盒子 盒子原来的位置 + 手指移动的距离
        this.style.left = x + moveX + 'px';
        this.style.top = y + moveY + 'px';
        e.preventDefault(); // 阻止屏幕滚动的默认行为
    });
</script>
```

## 2.2 移动端常见特效

### 2.2.1 classList 属性

classList 属性是 HTML5 新增的一个属性，返回元素的类名。但是 ie10 以上版本支持。 该属性用于在元素中添加，移除及切换 CSS 类。有以下方法

- 添加类：`element.classList.add('类名')`
- 移除类：`element.classList.remove('类名')`
- 切换类：`element.classList.toggle('类名')`

注意以上方法里面，所有类名都不带点

```c
<head>
    <title>Document</title>
    <style>
        .bg {background-color: black;}
    </style>
</head>
<body>
    <div class="one two"></div>
    <button> 开关灯</button>
    <script>
        // classList 返回元素的类名
        var div = document.querySelector('div');
        // console.log(div.classList[1]);
        // 1. 添加类名  是在后面追加类名不会覆盖以前的类名 注意前面不需要加.
        div.classList.add('three');
        // 2. 删除类名
        div.classList.remove('one');
        // 3. 切换类
        var btn = document.querySelector('button');
        btn.addEventListener('click', function() {
            document.body.classList.toggle('bg');
        })
    </script>
</body>
```

### 2.2.1 click 延时解决方案

- 移动端 click 事件会有 300ms 的延时，原因是移动端屏幕双击会缩放(double tap to zoom) 页面。
- 解决方案：

1. 禁用缩放。 浏览器禁用默认的双击缩放行为并且去掉 300ms 的点击延迟。

```javascript
  <meta name="viewport" content="user-scalable=no">
```

2. 利用 touch 事件自己封装这个事件解决 300ms 延迟。
   原理就是：
   ① 当我们手指触摸屏幕，记录当前触摸时间
   ② 当我们手指离开屏幕， 用离开的时间减去触摸的时间
   ③ 如果时间小于 150ms，并且没有滑动过屏幕， 那么我们就定义为点击

```javascript
//封装tap，解决click 300ms 延时
function tap (obj, callback) {
	var isMove = false;
	var startTime = 0; // 记录触摸时候的时间变量
	obj.addEventListener('touchstart', function (e) {
		startTime = Date.now(); // 记录触摸时间
    });
	obj.addEventListener('touchmove', function (e) {
        isMove = true;  // 看看是否有滑动，有滑动算拖拽，不算点击
    });
	obj.addEventListener('touchend', function (e) {
		if (!isMove && (Date.now() - startTime) < 150) {  // 如果手指触摸和离开时间小于150ms 算点击
			callback && callback(); // 执行回调函数
		}
		isMove = false;  //  取反    重置
		startTime = 0;
	});
}
//调用
tap(div, function(){   // 执行代码         });
```

3. 使用插件。 fastclick 插件解决 300ms 延迟。

```c
<head>
	<script src="fastclick.js"></script> // 引入
</head>
<body>
    <div></div>
    <script>
        if ('addEventListener' in document) { //按照规定语法使用
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
            }, false);
        }
        var div = document.querySelector('div');
        div.addEventListener('click', function() {
            alert(11);
        })
    </script>
</body>
```

## 2.3 移动端常用开发插件

- JS 插件是 js 文件，它遵循一定规范编写，方便程序展示效果，拥有特定功能且方便调用。如轮播图和瀑布流插件。
- 特点：它一般是为了解决某个问题而专门存在，其功能单一，并且比较小。

- 插件的使用:
  ① 引入插件相关文件。
  ② 按照规定语法使用

- 常见插件：
  fastclick(解决点击延迟)：[https://github.com/ftlabs/fastclick](https://github.com/ftlabs/fastclick)
  Swiper(滑动插件)：[https://www.swiper.com.cn/ ](https://www.swiper.com.cn/)
  superslide(滑动插件)：[http://www.superslide2.com/](http://www.superslide2.com/)
  iscroll(滚动插件)：[https://github.com/cubiq/iscroll](https://github.com/cubiq/iscroll)
  zyMedia(视频插件)：[https://github.com/ireaderlab/zyMedia](https://github.com/ireaderlab/zyMedia)

### 2.3.1 fastclick 使用

1. 去官网找到 lib 文件里的 fastclick.js ，复制到自己新建的 fastclick.js 文件
2. 按照语法规范引入

```c
<head>
    <title>Document</title>
    <style></style>
    <script src="fastclick.js"></script> //一：引js文件
</head>
<body>
    <div></div>
    <script>
        if ('addEventListener' in document) { // 按照它的语法规范
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
            }, false);
        }
    </script>
</body>
```

### 2.3.2 Swiper 使用

1.官网下载
![在这里插入图片描述](https://img-blog.csdnimg.cn/74e7c88b93084ed99a45781216de61c0.png#pic_center) 2.复制：swiper-bundle.min.js 和 swiper-bundle.min.css 文件到自己的项目
![在这里插入图片描述](https://img-blog.csdnimg.cn/a6d63f7b3f3d45cf89f49f886e2f2eaa.png#pic_center) 3.引入：自己的页面

```c
<!DOCTYPE html>
<html>
<head>
    ...

    <link rel="stylesheet" href="dist/css/swiper-bundle.min.css"> //引入css，一般放在自己页面样式的前面
    <link rel="stylesheet" href="css/index.css">
</head>
<body>
    ...
    <script src="dist/js/swiper-bundle.min.js"></script> // 引入js
    ...
</body>
</html>
```

4.复制结构，样式，和初始化调用，到自己的代码中
![在这里插入图片描述](https://img-blog.csdnimg.cn/a54bd09a8cbb4189aaaf469b1a157179.png#pic_center) 4.查看官方 API 文档，根据需要，修改自己想要的样式、行为。css 可以在自己的页面中写，覆盖掉(可以!important)。

- 插件的使用总结
  ① 确认插件实现的功能
  ② 去官网查看使用说明
  ③ 下载插件
  ④ 打开 demo 实例文件，查看需要引入的相关文件，并且引入
  ⑤ 复制 demo 实例文件中的结构 html，样式 css 以及 js 代码

## 2.4 移动端常用开发框架

- 框架，顾名思义就是一套架构，它会基于自身的特点向用户提供一套较为完整的解决方案。框架的控制权在框架本身，使用者要按照框架所规定的某种规范进行开发。
- 前端常用的框架有 **React、Vue、Angular、Bootstrap** 等。既能开发 PC 端，也能开发移动端
- 插件一般是为了解决某个问题而专门存在，其功能单一，并且比较小。
