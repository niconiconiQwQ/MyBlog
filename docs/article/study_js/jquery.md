---
title: JQuery 笔记
date: 2022/05/15 07:51 #手动设置最后更新时间
categories: [JQuery] # 标签
stick: false # 是否置顶
description: JQuery
keyword: JQuery
---

# JQuery 笔记

# 1. jQuery 概述

## 1.1 JavaScript 库

- JavaScript 库：即 library，是一个封装好的特定的集合（方法和函数）。从封装一大堆函数的角度理解库，就是在这个库中，封装了很多预先定义好的函数在里面，比如动画 animate、hide、show，比如获取元素等。
- 简单理解： 就是一个 JS 文件，里面对我们原生 js 代码进行了封装，存放到里面。这样我们可以快速高效的使用这些封装好的功能了。
- 比如 jQuery，就是为了快速方便的操作 DOM，里面基本都是函数（方法）。
- 常见的 JavaScript 库：jQuery、Prototype、YUI、Dojo、Ext JS、移动端的 zepto。这些库都是对原生 JavaScript 的封装，内部都是用 JavaScript 实现的

## 1.2 jQuery 的概念

- jQuery 是一个快速、简洁的 JavaScript 库。j 就是 JavaScript； Query 查询； 意思就是查询 js，把 js 中的 DOM 操作做了封装，我们可以快速的查询使用里面的功能。
- jQuery 封装了 JavaScript 常用的功能代码，优化了 DOM 操作、事件处理、动画设计和 Ajax 交互。
- 学习 jQuery 本质： 就是学习调用这些函数（方法）。
- jQuery 的优点
  ① 轻量级。核心文件才几十 kb，不会影响页面加载速度
  ② 跨浏览器兼容。基本兼容了现在主流的浏览器
  ③ 链式编程、隐式迭代
  ④ 对事件、样式、动画支持，大大简化了 DOM 操作
  ⑤ 支持插件扩展开发。有着丰富的第三方的插件，例如：树形菜单、日期控件、轮播图等
  ⑥ 免费、开源

## 1.3 jQuery 下载

官网地址： [https://jquery.com/](https://jquery.com/)
![在这里插入图片描述](https://img-blog.csdnimg.cn/1b534ce7399e4798a657ad759898361f.png#pic_center)
在自己的 html 里引入即可

```c
<script src="jquery.min.js"></script> // 引入
$(function() { // 使用咯
	$('div').hide();
})
```

# 2. jQuery 的基本使用

## 2.1 jQuery 的入口函数

- 写法一：

```c
$(function () {
... // 此处是页面 DOM 加载完成的入口
}) ;
```

- 写法二：

```c
$(document).ready(function(){
... // 此处是页面DOM加载完成的入口
});
```

- 注意：
  ① 等着 DOM 结构渲染完毕即可执行内部代码，不必等到所有外部资源加载完成，jQuery 帮我们完成了封装。
  ② 相当于原生 js 中的 DOMContentLoaded。
  ③ 不同于原生 js 中的 load 事件是等页面文档、外部的 js 文件、css 文件、图片加载完毕才执行内部代码。
  ④ 推荐使用第一种方式。

## 2.2 jQuery 的顶级对象 $

- $ 是 jQuery 的别称，在代码中可以使用 jQuery 代替 $，但一般为了方便，通常都直接使用 $ 。
- $ 是 jQuery 的顶级对象， 相当于原生 JavaScript 中的 window。把元素利用$包装成 jQuery 对象，就可以调用 jQuery 的方法。

```c
<script>
    // 1. $ 是jQuery的别称
    $(function() {
        alert(11);
    });
    jQuery(function() {
        jQuery('div').hide();
    });
    // 2. $同时也是jQuery的 顶级对象
</script>
```

## 2.3 jQuery 和 DOM 对象

### 2.3.1 两者对比

- 用原生 JS 获取来的对象就是 DOM 对象
- jQuery 方法获取的元素就是 jQuery 对象。
- jQuery 对象本质是： 利用$对 DOM 对象包装后产生的对象（伪数组形式存储）。
- 只有 jQuery 对象才能使用 jQuery 方法，DOM 对象则使用原生的 JavaScirpt 方法。

```c
<div></div>
<script>
    // 1. DOM 对象：  用原生js获取过来的对象就是DOM对象
    var myDiv = document.querySelector('div'); // myDiv 是DOM对象
    console.dir(myDiv);
    // 2. jQuery对象： 用jquery方式获取过来的对象是jQuery对象。 本质：通过$把DOM元素进行了包装
    $('div'); // $('div')是一个jQuery 对象
    console.dir($('div'));
    // 3. jQuery 对象只能使用 jQuery 方法，DOM 对象则使用原生的 JavaScirpt 属性和方法
    // myDiv.style.display = 'none'; 可以使用
    // myDiv.hide(); myDiv是一个dom对象不能使用 jquery里面的hide方法
    // $('div').style.display = 'none'; 这个$('div')是一个jQuery对象不能使用原生js 的属性和方法
</script>
```

### 2.3.2 相互转换

- DOM 对象与 jQuery 对象之间是可以相互转换的。
- 因为原生 js 比 jQuery 更大，原生的一些属性和方法 jQuery 没有给我们封装. 要想使用这些属性和方法需要把 jQuery 对象转换为 DOM 对象才能使用。

1. DOM 对象转换为 jQuery 对象： `$(DOM对象)`
2. jQuery 对象转换为 DOM 对象（两种方式)
   方式一：`$('div') [index]` index 是索引号
   方式二：`$('div') .get(index)` index 是索引号

```c
<video src="mov.mp4" muted></video>
    <script>
        // 1. DOM对象转换为 jQuery对象
        // (1) 我们直接获取视频，得到就是jQuery对象
        // $('video');
        // (2) 我们已经使用原生js 获取过来 DOM对象
        var myvideo = document.querySelector('video');
        // $(myvideo).play();  jquery里面没有play 这个方法
        // 2.  jQuery对象转换为DOM对象
        // myvideo.play();
        $('video')[0].play()
        $('video').get(0).play()
    </script>
```

# 3. jQuery 选择器

原生 JS 获取元素方式很多，很杂，而且兼容性情况不一致，因此 jQuery 给我们做了封装，使获取元素统一标准。

### 3.1.1 基础选择器

$('选择器') ：里面选择器直接写 CSS 选择器即可，但是要加引号
| 名称 | 用法 | 描述 |
|--|--|--|
| ID 选择器 | $("#id") | 获取指定 ID 的元素 |
| 全选选择器 | $("\*") | 匹配所有元素 |
| 类选择器 | $(".class") | 获取同一类 class 的元素 |
| 标签选择器 | $("div") | 获取同一类标签的所有元素 |
| 并集选择器 | $("div,p,li") | 选取多个元素 |
| 交集选择器 | $("li.current") | 交集元素 |

```c
<div class="nav">我是nav div</div>
<script>
    $(function() {
       $(".nav");
    })
</script>
```

### 3.1.2 层级选择器

![在这里插入图片描述](https://img-blog.csdnimg.cn/b68d2ac6d7b24fbd8bd2a07e2cf6c6a1.png#pic_center)

```c
<ul>
	<li>我是ul 的</li>
</ul>
<script>
    $(function() {
       $("ul li");
    })
</script>
```

> 知识补充
> jQuery 设置样式：`$('div').css('属性', '值')`

### 3.1.3 筛选选择器

![在这里插入图片描述](https://img-blog.csdnimg.cn/278a8df44aca470f903e1efd73becf77.png#pic_center)

```c
<ul>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
</ul>
<ol>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
</ol>
<script>
    $(function() {
        $("ul li:first").css("color", "red");
        $("ul li:eq(2)").css("color", "blue");
        $("ol li:odd").css("color", "skyblue");
        $("ol li:even").css("color", "pink");
    })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/993004df08c44445bbff1e7fcc77f76d.png#pic_center)

```c
<ol>
    <li>我是ol 的li</li>
    <li class="item">我是ol 的li</li>
    <li>我是ol 的li</li>
</ol>
<ul>
    <li>我是ol 的li</li>
    <li>我是ol 的li</li>
</ul>
<div class="current">俺有current</div>
<div>俺木有current</div>
<script>
    // 注意一下都是方法 带括号
    $(function() {
        // 1. 兄弟元素siblings 除了自身元素之外的所有亲兄弟
        $("ol .item").siblings("li").css("color", "red");
        // 2. 第n个元素
        var index = 2;
        // (1) 我们可以利用选择器的方式选择
        // $("ul li:eq(2)").css("color", "blue");
        // $("ul li:eq("+index+")").css("color", "blue");
        // (2) 我们可以利用选择方法的方式选择更推荐这种写法
        // $("ul li").eq(2).css("color", "blue");
        // $("ul li").eq(index).css("color", "blue");
        // 3. 判断是否有某个类名
        console.log($("div:first").hasClass("current"));
    });
</script>
```

> 补充
> parents();取得一个包含着所有匹配元素的祖先元素的元素集合

```javascript
<div class="one">
    <div class="two">
        <div class="three">
            <div class="four">我不容易</div>
        </div>
    </div>
</div>
<script>
    console.log($(".four").parent().parent().parent());
    console.log($(".four").parents());
    console.log($(".four").parents(".one"));
</script>
```

重点记住： parent() ， children()， find() ， siblings() ， eq()

# 4. 隐式迭代

- 遍历内部 DOM 元素（伪数组形式存储）的过程就叫做隐式迭代。
- 简单理解：给匹配到的所有元素进行循环遍历，执行相应的方法，而不用我们再进行循环，操作，方便我们调用。

```c
<div>惊喜不，意外不</div>
<div>惊喜不，意外不</div>
<div>惊喜不，意外不</div>
<div>惊喜不，意外不</div>
<ul>
    <li>相同的操作</li>
    <li>相同的操作</li>
    <li>相同的操作</li>
</ul>
<script>
    // 1. 获取四个div元素
    console.log($("div"));
    // 2. 给四个div设置背景颜色为粉色 jquery对象不能使用style
    $("div").css("background", "pink");
    // 3. 隐式迭代就是把匹配的所有元素内部进行遍历循环，给每一个元素添加css这个方法
    $("ul li").css("color", "red");
</script>
```

# 5. 排他思想

想要多选一的效果，排他思想：当前元素设置样式，其余的兄弟元素清除样式。

```c
$(this).css('color','red');  //设置当前元素设置样式
$(this).siblings(). css('color','');//其余的兄弟元素清除样式
```

> 知识补充：
> .index() 函数：搜索匹配的元素，并返回相应元素的索引值，从 0 开始计数。不传递参数，返回这个元素在同辈中的索引位置。  
> 例子如下：

```c
<ul>
  <li id="foo">foo</li>
  <li id="bar">bar</li>
  <li id="baz">baz</li>
</ul>
<script>
	$('#bar').index();  //2
</script>
```

# 6. 链式编程

- 链式编程是为了节省代码量，看起来更优雅。
- 使用链式编程一定注意是哪个对象执行样式.

```c
$(this).css('color', 'red').sibling().css('color', ''); //写法样式
```

例子：

```c
<body>
    woshi body 的文字
    <button>快速</button>
    <button>快速</button>
    <script>
        $(function() {
            // 1. 隐式迭代 给所有的按钮都绑定了点击事件
            $("button").click(function() {
                // 2. 让当前元素颜色变为红色
                // $(this).css("color", "red");
                // 3. 让其余的姐妹元素不变色
                // $(this).siblings().css("color", "");
                // 链式编程
                // $(this).css("color", "red").siblings().css("color", "");
                // 我的颜色为红色, 我的兄弟的颜色为空
                // $(this).siblings().css('color', 'red');
                // 我的兄弟变为红色  ,我本身不变颜色
                $(this).siblings().parent().css('color', 'blue');
                // 最后是给我的兄弟的爸爸 body 变化颜色
            });
        })
    </script>
</body>
```

# 7. jQuery 样式操作

## 7.1 操作 css 方法

- jQuery 可以使用 css() 方法来修改简单元素样式； 也可以操作类，修改多个样式

1. 参数只写属性名，则是返回属性值：

```c
$(this).css('color');
```

2. 参数是属性名，属性值，逗号分隔，是设置一组样式，属性必须加引号，值如果是数字可以不用跟单位和引号：

```c
$(this).css('color', 'red');
```

3. 参数可以是对象形式，方便设置多组样式。属性名和属性值用冒号隔开， 属性可以不用加引号:

```c
$(this).css({color:'white',font-size:'20px'});
```

案例：

```c
<div></div>
<script>
    // 操作样式之css方法
    $(function() {
        console.log($("div").css("width"));
        // $("div").css("width", "300px");
        // $("div").css("width", 300);
        // $("div").css(height, "300px"); 属性名一定要加引号
        $("div").css({
            width: 400,
            height: 400,
            backgroundColor: "red"
                // 如果是复合属性则必须采取驼峰命名法，如果值不是数字，则需要加引号
        })
    })
</script>
```

## 7.2 设置类样式方法

作用等同于以前的 classList，可以操作类样式， 注意操作类里面的参数不要加点。

1. 添加类

```c
$(“div”).addClass('current');
```

2. 移除类

```c
$(“div”).removeClass('current');
```

3. 切换类

```c
$(“div”).toggleClass('current');
```

类操作与 className 区别：原生 JS 中 className 会覆盖元素原先里面的类名。 jQuery 里面类操作只是对指定类进行操作，不影响原先的类名。

```c
<div class="current"></div>
<script>
    $(function() {
        // 1. 添加类 addClass()
        $("div").click(function() {
        	$(this).addClass("current");
        });
        // 2. 删除类 removeClass()
        $("div").click(function() {
        	$(this).removeClass("current");
        });
        // 3. 切换类 toggleClass()
        $("div").click(function() {
            $(this).toggleClass("current");
        });
    })
</script>
```

# 8. jQuery 效果

## 8.1 显示隐藏效果

1、显示语法规范

```c
show([speed,[easing],[fn]])
```

- 显示参数
  （1）参数都可以省略， 无动画直接显示。
  （2）speed：三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
  （3）easing：(Optional) 用来指定切换效果，默认是“swing”，可用参数“linear”。
  （4）fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。

2、隐藏语法规范

```c
hide([speed,[easing],[fn]])
```

显示参数同上

3、切换语法规范

```c
toggle([speed,[easing],[fn]])
```

显示参数同上。平时一般不带参数，直接显示隐藏即可
**案例：**

```c
<button>显示</button>
<button>隐藏</button>
<button>切换</button>
<div></div>
<script>
    $(function() {
        $("button").eq(0).click(function() {
            $("div").show(1000, function() {
                alert(1);
            });
        })
        $("button").eq(1).click(function() {
            $("div").hide(1000, function() {
                alert(1);
            });
        })
        $("button").eq(2).click(function() {
                $("div").toggle(1000);
            })
            // 一般情况下，我们都不加参数直接显示隐藏就可以了
    });
</script>
```

## 8.2 滑动效果

1、下滑效果语法规范

```c
slideDown([speed,[easing],[fn]])
```

下滑效果参数
（1）参数都可以省略。
（2）speed:三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
（3）easing:(Optional) 用来指定切换效果，默认是“swing”，可用参数“linear”。
（4）fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。
2、上滑效果语法规范

```c
slideUp([speed,[easing],[fn]])
```

上滑效果参数同上

3、滑动切换效果

```c
slideToggle([speed,[easing],[fn]])
```

滑动切换效果参数同上
**案例：**

```c
<button>下拉滑动</button>
<button>上拉滑动</button>
<button>切换滑动</button>
<div></div>
<script>
    $(function() {
        $("button").eq(0).click(function() {
            // 下滑动 slideDown()
            $("div").slideDown();
        })
        $("button").eq(1).click(function() {
            // 上滑动 slideUp()
            $("div").slideUp(500);
        })
        $("button").eq(2).click(function() {
            // 滑动切换 slideToggle()
            $("div").slideToggle(500);
        });
    });
</script>
```

## 8.3 事件切换

```c
hover([over,]out)
```

（1）over:鼠标移到元素上要触发的函数（相当于 mouseenter）
（2）out:鼠标移出元素要触发的函数（相当于 mouseleave）
（3）如果只写一个函数，则鼠标经过和离开都会触发它

```c
<script>
    $(function() {
        // 1. 事件切换 hover 就是鼠标经过和离开的复合写法
        // $(".nav>li").hover(function() {
        //     $(this).children("ul").slideDown(200);
        // }, function() {
        //     $(this).children("ul").slideUp(200);
        // });
        // 2. 事件切换 hover  如果只写一个函数，那么鼠标经过和鼠标离开都会触发这个函数
        $(".nav>li").hover(function() {
            $(this).children("ul").slideToggle();
        });
    })
</script>
```

## 8.4 动画队列及其停止排队方法

1、动画或效果队列
动画或者效果一旦触发就会执行，如果多次触发，就造成多个动画或者效果排队执行。

2、停止排队

```c
stop()
```

(1）stop() 方法用于停止动画或效果。
(2) 注意： stop() 写到动画或者效果的前面， 相当于停止结束上一次的动画。

```c
<script>
    $(function() {
        $(".nav>li").hover(function() {
            // stop 方法必须写到动画的前面
            $(this).children("ul").stop().slideToggle();
        });
    })
</script>
```

## 8.5 淡入淡出效果

1、淡入效果语法规范

```c
fadeIn([speed,[easing],[fn]])
```

- 淡入效果参数：
  （1）参数都可以省略。
  （2）speed：三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
  （3）easing：(Optional) 用来指定切换效果，默认是“swing”，可用参数“linear”。
  （4）fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。

2、淡出效果语法规范

```c
fadeOut([speed,[easing],[fn]])
```

淡出效果参数同上

3、淡入淡出切换效果语法规范

```c
fadeToggle([speed,[easing],[fn]])
```

淡入淡出切换效果参数同上
4、渐进方式调整到指定的不透明度语法规范

```c
fadeTo([[speed],opacity,[easing],[fn]])
```

- 效果参数
  （1）opacity 透明度必须写，取值 0~1 之间。
  （2）speed：三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。必须写。其他同上

**案例：**

```c
<button>淡入效果</button>
<button>淡出效果</button>
<button>淡入淡出切换</button>
<button>修改透明度</button>
<div></div>
<script>
    $(function() {
        $("button").eq(0).click(function() {
            // 淡入 fadeIn()
            $("div").fadeIn(1000);
        })
        $("button").eq(1).click(function() {
            // 淡出 fadeOut()
            $("div").fadeOut(1000);
        })
        $("button").eq(2).click(function() {
            // 淡入淡出切换 fadeToggle()
            $("div").fadeToggle(1000);
        });
        $("button").eq(3).click(function() {
            //  修改透明度 fadeTo() 这个速度和透明度要必须写
            $("div").fadeTo(1000, 0.5);
        });
    });
</script>
```

## 8.6 自定义动画 animate

语法

```c
animate(params,[speed],[easing],[fn])
```

参数
（1）params: 想要更改的样式属性，以对象形式传递，必须写。 属性名可以不用带引号， 如果是复合属性则需要采取驼峰命名法 borderLeft。其余参数都可以省略。
（2）speed：三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
（3）easing：(Optional) 用来指定切换效果，默认是“swing”，可用参数“linear”。
（4）fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。

```c
<button>动起来</button>
<div></div>
<script>
    $(function() {
        $("button").click(function() {
            $("div").animate({
                left: 500,
                top: 300,
                opacity: .4,
                width: 500
            }, 500);
        })
    })
</script>
```

# 9. jQuery 属性操作

## 9.1 设置或获取元素固有属性值

所谓元素固有属性就是元素本身自带的属性，比如 `<a>` 元素里面的 href ，比如 `<input>` 元素里面的 type。

1、获取属性语法

```c
prop('属性')
```

2、设置属性语法

```c
prop('属性', '属性值')
```

## 9.2 设置或获取元素自定义属性值

用户自己给元素添加的属性，我们称为自定义属性。 比如给 div 添加 index =“1”。

1、获取属性语法

```c
attr('属性')      // 类似原生 getAttribute()
```

2、设置属性语法

```c
attr('属性', '属性值')   // 类似原生 setAttribute()
```

案例：

```c
<a href="http://www.itcast.cn" title="都挺好">都挺好</a>
<input type="checkbox" name="" id="" checked>
<div index="1" data-index="2">我是div</div>
<span>123</span>
<script>
    $(function() {
        //1. element.prop("属性名") 获取元素固有的属性值
        console.log($("a").prop("href"));
        $("a").prop("title", "我们都挺好");
        $("input").change(function() {
            console.log($(this).prop("checked"));
        });
        // 2. 元素的自定义属性 我们通过 attr()
        console.log($("div").attr("index"));
        $("div").attr("index", 4);
        console.log($("div").attr("data-index"));
    })
</script>
```

## 9.3 数据缓存 data()

data() 方法可以在指定的元素上存取数据，并不会修改 DOM 元素结构。一旦页面刷新，之前存放的数据都将被移除。
1、附加数据语法

```c
data('name','value')   // 向被选元素附加数据
```

2、获取数据语法

```c
date('name') //  向被选元素获取数据
```

同时，还可以读取 HTML5 自定义属性 data-index ，得到的是数字型

```c
//数据缓存 data() 这个里面的数据是存放在元素的内存里面
$("span").data("uname", "andy");
console.log($("span").data("uname"));
// 这个方法获取data-index h5自定义属性 第一个 不用写data-  而且返回的是数字型
console.log($("div").data("index"));
```

# 10. jQuery 文本属性值

主要针对元素的内容还有表单的值操作。
1、普通元素内容 `html()`（ 相当于原生 inner HTML)

```c
html() // 获取元素的内容
html('内容')   // 设置元素的内容
```

2、普通元素文本内容 `text()` (相当与原生 innerText)

```javascript
text(); // 获取元素的文本内容
text("文本内容"); // 设置元素的文本内容
```

3、表单的值 `val()`（ 相当于原生 value)

```javascript
val(); // 获取表单的值
val("内容"); // 设置表单的值
```

案例：

```javascript
<div>
    <span>我是内容</span>
</div>
<input type="text" value="请输入内容">
<script>
    // 1. 获取设置元素内容 html()
    console.log($("div").html());
    // $("div").html("123");
    // 2. 获取设置元素文本内容 text()
    console.log($("div").text());
    $("div").text("123");

    // 3. 获取设置表单值 val()
    console.log($("input").val());
    $("input").val("123");
</script>
```

> 知识补充 toFixed(数字)函数：表示保留几位小数点
> 表单 change 事件常用哦

# 11. jQuery 元素操作

主要是遍历、创建、添加、删除元素操作。

## 11.1 遍历元素

jQuery 隐式迭代是对同一类元素做了同样的操作。 如果想要给同一类元素做不同操作，就需要用到遍历。

1、语法 1

```javascript
$("div").each(function (index, domEle) {
  xxx;
});
```

- 注意：
  ①each() 方法遍历匹配的每一个元素。主要用 DOM 处理。 each 每一个
  ② 里面的回调函数有 2 个参数： index 是每个元素的索引号; demEle 是每个**DOM 元素对象**，不是 jquery 对象
  ③ 所以要想使用 jquery 方法，需要给这个 dom 元素转换为 jquery 对象 $(domEle)

2、语法 2

```javascript
$.each(object, function (index, element) {
  xxx;
});
```

- 注意：
  ①$.each()方法可用于遍历任何对象。主要用于数据处理，比如数组，对象
  ② 里面的函数有 2 个参数： index 是每个元素的索引号; element 遍历内容

```javascript
<div>1</div>
<div>2</div>
<div>3</div>
<script>
    $(function() {
        // 如果针对于同一类元素做不同操作，需要用到遍历元素（类似for，但是比for强大）
        var sum = 0;
        // 1. each() 方法遍历元素
        var arr = ["red", "green", "blue"];
        $("div").each(function(i, domEle) {
            // 回调函数第一个参数一定是索引号  可以自己指定索引号号名称
            // 回调函数第二个参数一定是 dom元素对象 也是自己命名
            // domEle.css("color"); dom对象没有css方法
            $(domEle).css("color", arr[i]);
            sum += parseInt($(domEle).text());
        })
        // 2. $.each() 方法遍历元素 主要用于遍历数据，处理数据
        $.each($("div"), function(i, ele) {
            console.log(i);
            console.log(ele);
        });
        $.each(arr, function(i, ele) {
            console.log(i);
            console.log(ele);
        })
        $.each({
            name: "andy",
            age: 18
        }, function(i, ele) {
            console.log(i); // 输出的是 name age 属性名
            console.log(ele); // 输出的是 andy  18 属性值
        })
    })
</script>
```

## 11.2 创建元素

语法：

```javascript
$("<li></li>");
```

动态的创建了一个 `<li>`

## 11.3 添加元素

1、内部添加

```javascript
element.append("内容"); //把内容放入匹配元素内部最后面，类似原生 appendChild。
element.prepend("内容"); //把内容放入匹配元素内部最前面。
```

2、 外部添加

```javascript
element.after("内容"); //  把内容放入目标元素后面
element.before("内容"); //  把内容放入目标元素前面
```

- 注意：
  ① 内部添加元素，生成之后，它们是父子关系。
  ② 外部添加元素，生成之后，他们是兄弟关系。

## 11.4 删除元素

```javascript
element.remove(); //删除匹配的元素（本身）
element.empty(); // 删除匹配的元素集合中所有的子节点
element.html(""); // 清空匹配的元素内容
```

- 注意：
  ① remove 删除元素本身。
  ② empt() 和 html('''') 作用等价，都可以删除元素里面的内容，只不过 html 还可以设置内容。

```javascript
<ul>
    <li>原先的li</li>
</ul>
<div class="test">我是原先的div</div>
<script>
    $(function() {
        // 1. 创建元素
        var li = $("<li>我是后来创建的li</li>");
        // 2. 添加元素
        // (1) 内部添加
        // $("ul").append(li);  内部添加并且放到内容的最后面
        $("ul").prepend(li); // 内部添加并且放到内容的最前面
        // (2) 外部添加
        var div = $("<div>我是后妈生的</div>");
        //$(".test").after(div);
        $(".test").before(div);
        // 3. 删除元素
        // $("ul").remove(); 可以删除匹配的元素
        // $("ul").empty(); // 可以删除匹配的元素里面的子节点 孩子
        $("ul").html(""); // 可以删除匹配的元素里面的子节点 孩子
    })
</script>
```

# 12. jQuery 尺寸、位置操作

## 12.1 jQuery 尺寸

![在这里插入图片描述](https://img-blog.csdnimg.cn/d97eb25803db45f7a7fcb56cc7c2a287.png#pic_center)

- 以上参数为空，则是获取相应值，返回的是数字型。
- 如果参数为数字，则是修改相应值。
- 参数可以不必写单位。

```javascript
<div></div>
<script>
	$(function() {
		// 1. width() / height() 获取设置元素 width和height大小
		console.log($("div").width());
		// $("div").width(300);
		// 2. innerWidth() / innerHeight()  获取设置元素 width和height + padding 大小
		console.log($("div").innerWidth());
		// 3. outerWidth()  / outerHeight()  获取设置元素 width和height + padding + border 大小
		console.log($("div").outerWidth());
		// 4. outerWidth(true) / outerHeight(true) 获取设置 width和height + padding + border + margin
		console.log($("div").outerWidth(true));
	})
</script>
```

## 12.2 jQuery 位置

- 位置主要有三个： offset()、position()、scrollTop()/scrollLeft()

- 1、**offset()** 设置或获取元素偏移
  ① offset() 方法设置或返回被选元素相对于文档的偏移坐标，跟父级没有关系。
  ② 该方法有 2 个属性 left、top 。offset().top 用于获取距离文档顶部的距离，offset().left 用于获取距离文档左侧的距离。
  ③ 可以设置元素的偏移：offset({ top: 10, left: 30 });
- 2、**position()** 获取元素偏移
  ① position()方法用于返回被选元素相对于带有定位的父级偏移坐标，如果父级都没有定位，则以文档为准。
  ② 该方法有 2 个属性 left、top。position().top 用于获取距离定位父级顶部的距离，position().left 用于获取距离定位父级左侧的距离。
  ③ 该方法只能获取。

```javascript
<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <script>
        $(function() {
            // 1. 获取设置距离文档的位置（偏移） offset
            console.log($(".son").offset());
            console.log($(".son").offset().top);
            // $(".son").offset({
            //     top: 200,
            //     left: 200
            // });
            // 2. 获取距离带有定位父级位置（偏移） position   如果没有带有定位的父级，则以文档为准
            // 这个方法只能获取不能设置偏移
            console.log($(".son").position());
            // $(".son").position({
            //     top: 200,
            //     left: 200
            // });
        })
    </script>
</body>
```

- 3、**scrollTop()/scrollLeft()** 设置或获取元素被卷去的头部和左侧
  ① scrollTop() 方法设置或返回被选元素被卷去的头部。
  ② 不跟参数是获取，参数为不带单位的数字则是设置被卷去的头部。

```javascript
<style>
   body {height: 2000px;}
   .back {
        position: fixed;
        width: 50px;
        height: 50px;
        background-color: pink;
        right: 30px;
        bottom: 100px;
        display: none;
    }
    .container {
        width: 900px;
        height: 500px;
        background-color: skyblue;
        margin: 400px auto;
    }
</style>
<div class="back">返回顶部</div>
<div class="container"></div>
<script>
    $(function() {
        $(document).scrollTop(100);
        // 被卷去的头部 scrollTop()  / 被卷去的左侧 scrollLeft()
        // 页面滚动事件
        var boxTop = $(".container").offset().top;
        $(window).scroll(function() {
            if ($(document).scrollTop() >= boxTop) {
                $(".back").fadeIn();
            } else {
                $(".back").fadeOut();
            }
        });
        // 返回顶部
        $(".back").click(function() {
            // $(document).scrollTop(0);
            $("body, html").stop().animate({
                scrollTop: 0
            });
            // $(document).stop().animate({
            //     scrollTop: 0
            // }); 不能是文档而是 html和body元素做动画
        })
    })
</script>
```

# 13. jQuery 事件

## 13.1 jQuery 事件注册

- 单个事件注册语法：`element.事件(function(){})`

```javascript
$("div").click(function () {
  事件处理程序;
});
```

- 其他事件和原生基本一致。比：mouseover、mouseout、blur、focus、change、keydown、keyup、resize、scroll 等

## 13.2 jQuery 事件处理

### 13.2.1 on() 绑定事件

- on() 方法在匹配元素上绑定一个或多个事件的事件处理函数
- 语法：`element.on(events,[selector],fn)`
  ①events:一个或多个用空格分隔的事件类型，如"click"或"keydown" 。
  ②selector: 元素的子元素选择器 。
  ③fn:回调函数 即绑定在元素身上的侦听函数。
- 优势 1：可以绑定多个事件，多个处理事件处理程序。

```javascript
$("div").on({
  mouseover: function () {},
  mouseout: function () {},
  click: function () {},
});
```

如果事件处理程序相同

```javascript
$("div").on("mouseover mouseout", function () {
  $(this).toggleClass("current");
});
```

- 优势 2：可以事件委派操作 。事件委派的定义就是，把原来加给子元素身上的事件绑定在父元素身上，就是把事件委派给父元素。

```javascript
$("ul").on("click", "li", function () {
  alert("hello world!");
});
```

- 优势 3：动态创建的元素，click() 没有办法绑定事件， on() 可以给动态生成的元素绑定事件

```javascript
$("div").on("click", "p", function () {
  alert("可以给动态生成的元素绑定事件");
});
$("div").append($("<p>我是动态创建的p</p>"));
```

- 案例：

```javascript
<div></div>
    <ul>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
    </ul>
    <ol>

    </ol>
    <script>
        $(function() {
            // 1. 单个事件注册
            // $("div").click(function() {
            //     $(this).css("background", "purple");
            // });
            // $("div").mouseenter(function() {
            //     $(this).css("background", "skyblue");
            // });

            // 2. 事件处理on
            // (1) on可以绑定1个或者多个事件处理程序
            // $("div").on({
            //     mouseenter: function() {
            //         $(this).css("background", "skyblue");
            //     },
            //     click: function() {
            //         $(this).css("background", "purple");
            //     },
            //     mouseleave: function() {
            //         $(this).css("background", "blue");
            //     }
            // });
            $("div").on("mouseenter mouseleave", function() {
                $(this).toggleClass("current");
            });
            // (2) on可以实现事件委托（委派）
            // $("ul li").click();
            $("ul").on("click", "li", function() {
                alert(11);
            });
            // click 是绑定在ul 身上的，但是 触发的对象是 ul 里面的小li
            // (3) on可以给未来动态创建的元素绑定事件
            // $("ol li").click(function() {
            //     alert(11);
            // })
            $("ol").on("click", "li", function() {
                alert(11);
            })
            var li = $("<li>我是后来创建的</li>");
            $("ol").append(li);
        })
    </script>
```

### 13.2.2 off() 解绑事件

- off() 方法可以移除通过 on() 方法添加的事件处理程序。

```javascript
$("p").off(); // 解绑p元素所有事件处理程序
$("p").off("click"); // 解绑p元素上面的点击事件    后面的off是侦听函数名
$("ul").off("click", "li"); // 解绑事件委托
```

- 如果有的事件只想触发一次， 可以使用 one() 来绑定事件。
- 案例：

```javascript
<div></div>
<ul>
    <li>我们都是好孩子</li>
    <li>我们都是好孩子</li>
</ul>
<p>我是p</p>
<script>
   $(function() {
        $("div").on({ //可用对象形式传入事件
            click: function() {
                console.log("我点击了");
            },
            mouseover: function() {
                console.log('我鼠标经过了');
            }
        });
        $("ul").on("click", "li", function() {
            alert(11);
        });
        // 1. 事件解绑 off
        // $("div").off();  // 这个是解除了div身上的所有事件
        $("div").off("click"); // 这个是解除了div身上的点击事件
        $("ul").off("click", "li");
        // 2. one() 它只能触发事件一次
        $("p").one("click", function() {
            alert(11);
        })
    })
</script>
```

### 13.2.3 自动触发事件

- 有些事件希望自动触发, 比如轮播图自动播放功能跟点击右侧按钮一致。可以利用定时器自动触发右侧按钮点击事件，不必鼠标点击触发。

```javascript
element.click(); // 第一种简写形式
element.trigger("type"); // 第二种自动触发模式
element.triggerHandler(type); // 第三种自动触发模式
```

- `triggerHandler`模式不会触发元素的默认行为，这是和前面两种的区别。
- 案例：

```javascript
<div></div>
<input type="text">
<script>
    $(function() {
        $("div").on("click", function() {
            alert(11);
        });
        // 自动触发事件
        // 1. 元素.事件()
        // $("div").click();会触发元素的默认行为
        // 2. 元素.trigger("事件")
        // $("div").trigger("click");会触发元素的默认行为
        $("input").trigger("focus");
        // 3. 元素.triggerHandler("事件") 就是不会触发元素的默认行为
        $("div").triggerHandler("click");
        $("input").on("focus", function() {
            $(this).val("你好吗");
        });
        // $("input").triggerHandler("focus");
    });
</script>
```

## 13.3 jQuery 事件对象

事件被触发，就会有事件对象的产生。

```javascript
element.on(events, [selector], function (event) {});
```

- 阻止默认行为：`event.preventDefault()` 或者 return false
- 阻止冒泡： `event.stopPropagation()`

```javascript
<div></div>
<script>
    $(function() {
        $(document).on("click", function() {
            console.log("点击了document");
        })
        $("div").on("click", function(event) {
            // console.log(event);
            console.log("点击了div");
            event.stopPropagation();
        })
    })
</script>
```

# 14. jQuery 拷贝对象

- 如果想要把某个对象拷贝（合并） 给另外一个对象使用，此时可以使用 $.extend() 方法
- 语法：

```javascript
$.extend([deep], target, object1, [objectN]);
```

- 注意：
  ①deep: 如果设为 true 为深拷贝， 默认为 false 浅拷贝
  ②target: 要拷贝的目标对象
  ③object1:待拷贝到第一个对象的对象。
  ④objectN:待拷贝到第 N 个对象的对象。
  ⑤ 浅拷贝是把被拷贝的对象复杂数据类型中的地址拷贝给目标对象，修改目标对象会影响被拷贝对象。
  ⑥ 深拷贝，前面加 true， 完全克隆(拷贝的对象,而不是地址)，修改目标对象不会影响被拷贝对象。

```javascript
<script>
    $(function() {
        var targetObj1 = {};
        var obj1 = {
            id: 1,
            name: "andy"
        };
        $.extend(targetObj1, obj1);
        var targetObj2 = {
            id: 0
        };
        var obj2 = {
            id: 1,
            name: "andy"
        };
        $.extend(targetObj2, obj2); // 会覆盖targetObj 里面原来的数据
        var targetObj3 = {
            id: 0,
            msg: {
                sex: '男'
            }
        };
        var obj3 = {
            id: 1,
            name: "andy",
            msg: {
                age: 18
            }
        };
        $.extend(targetObj3, obj3);// 会覆盖targetObj 里面原来的数据
        // // 1. 浅拷贝把原来对象里面的复杂数据类型地址拷贝给目标对象
        // targetObj3.msg.age = 20;
        // console.log(targetObj);
        // console.log(obj);
        // 2. 深拷贝把里面的数据完全复制一份给目标对象 如果里面有不冲突的属性,会合并到一起
        $.extend(true, targetObj3, obj3);
        targetObj.msg.age = 20;
        console.log(targetObj); // msg :{sex: "男", age: 20}
        console.log(obj);
    })
</script>
```

# 15. 多库共存

- 问题概述：jQuery 使用`$`作为标示符，随着 jQuery 的流行,其他 js 库也会用这`$`作为标识符， 这样一起使用会引起冲突。
- 客观需求：需要一个解决方案，让 jQuery 和其他的 js 库不存在冲突，可以同时存在，这就叫做多库共存。
- jQuery 解决方案：
  ① 把里面的 `$` 符号 统一改为 jQuery。 比如 `jQuery('div')`
  ②jQuery 变量规定新的名称：`$.noConflict()`如： `var otherName = $.noConflict();`

```javascript
<div></div>
<span></span>
<script>
    $(function() {
        function $(ele) {
            return document.querySelector(ele);
        }
        console.log($("div"));
        // 1. 如果$ 符号冲突 我们就使用 jQuery
        jQuery.each();
        // 2. 让jquery 释放对$ 控制权 让用自己决定
        var suibian = jQuery.noConflict();
        console.log(suibian("span"));
        suibian.each();
    })
</script>
```

# 16. jQuery 插件

## 16.1 插件概述

- jQuery 功能比较有限，想要更复杂的特效效果，可以借助于 jQuery 插件完成。
- 这些插件也是依赖于 jQuery 来完成的，所以必须要先引入 jQuery 文件，因此也称为 jQuery 插件。
- jQuery 插件常用的网站：
  ①jQuery 插件库： [https://www.jq22.com/](https://www.jq22.com/)  
  ②jQuery 之家：[http://www.htmleaf.com/](http://www.htmleaf.com/)
- jQuery 插件使用步骤：
  ① 引入相关文件。（jQuery 文件 和 插件文件）
  ② 复制相关 html、css、js (调用插件)。
- jQuery 插件演示：

## 16.2 瀑布流插件

一：下载 [http://www.htmleaf.com/jQuery/pubuliuchajian/](http://www.htmleaf.com/jQuery/pubuliuchajian/)
![在这里插入图片描述](https://img-blog.csdnimg.cn/964ef56960be469ba93c2182b7c63a3d.png#pic_center)
二：解压下载的文件，打开 demo，查看网页源码
![在这里插入图片描述](https://img-blog.csdnimg.cn/6b3f716a2ae14c1f8c542bd7d202effa.png#pic_center)
三：把 html 结构拿到
![在这里插入图片描述](https://img-blog.csdnimg.cn/004f1b4179014163abed13a5a3173238.png#pic_center)

四：把相关 css 文件拿到自己的项目里，引入 css
![在这里插入图片描述](https://img-blog.csdnimg.cn/53618c1477774bb083984cc412143564.png#pic_center)
五：复制内部样式，到自己页面
![在这里插入图片描述](https://img-blog.csdnimg.cn/121380b9f1ad4d3890aa8292dd865e7d.png#pic_center)

六：把相关 js 文件拿到自己的项目里，引入 js
![在这里插入图片描述](https://img-blog.csdnimg.cn/e3bc15bd79444c2abdee5def247792c6.png#pic_center)
七：根据该插件的使用说明自己更改内容，样式等

## 16.3 懒加载插件

- 图片懒加载（图片使用延迟加载在可提高网页下载速度。它也能帮助减轻服务器负载）。当我们页面滑动到可视区域，再显示图片。使用 jquery 插件 EasyLazyload 注意，此时的 js 引入文件和 js 调用必须写到 DOM 元素（图片）最后面
- 使用步骤：
  一：下载 [https://www.jq22.com/jquery-info11629](https://www.jq22.com/jquery-info11629)
  二：同样复制 html 结构，js
  三：将**图片**的 src 替换为 data-lazy-src
  四：`<script src="js/EasyLazyload.min.js"></script>` 注意引入这，要放在所有需要懒加载图片的最下方。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/930a84d6ff2c47eeb8ae4effdf1734dc.png#pic_center)

## 16.4 全屏滚动插件

- 下载：
  gitHub：[https://github.com/alvarotrigo/fullPage.js](https://github.com/alvarotrigo/fullPage.js)
  中文翻译网站：[http://www.dowebok.com/demo/2014/77/](http://www.dowebok.com/demo/2014/77/) -使用：同理，配合官方说明使用

## 16.5 bootstrap 使用

- 中文网下载 [https://www.bootcss.com/](https://www.bootcss.com/)
- 把 bootstrap.min.css 和 bootstrap.bundle.min.js 文件拷到自己项目目录，同时需要 jquery.min.js 文件。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2b95e825a1814e02a3256efc538520c2.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/71d5a2a898854bd5b748980db3290296.png#pic_center)

- 然后引入 css，jquery 的 js 和 bootstrap 的 js，如下

```javascript
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="bootstrap.min.css" />
  <script src="jquery.min.js"></script>
  <script src="bootstrap.bundle.min.js"></script>
  <title>Document</title>
</head>
```

- 选组件，复制结构即可

![在这里插入图片描述](https://img-blog.csdnimg.cn/e80bb819d880489a960058421dd28229.png#pic_center)

- 也可使用 js 插件，使用方法同上；地址：[https://v3.bootcss.com/javascript/](https://v3.bootcss.com/javascript/)

![在这里插入图片描述](https://img-blog.csdnimg.cn/937b17770efc44bd928abfbe4810bd34.png#pic_center)
