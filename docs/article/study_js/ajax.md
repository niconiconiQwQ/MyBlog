---
title: Ajax 笔记
date: 2022/05/18 12:34 #手动设置最后更新时间
categories: [Ajax] # 标签
stick: false # 是否置顶
description: Ajax
keyword: Ajax
---

# Ajax 笔记

# 1. 服务器的基本概念

## 1.1 客户端与服务器

- 上网的本质目的：通过互联网的形式来获取和消费资源
- 上网过程中，负责存放和对外提供资源的电脑，叫做服务器。
- 上网过程中，负责获取和消费资源的电脑，叫做客户端。

![在这里插入图片描述](https://img-blog.csdnimg.cn/70d3fa643e284588af5bb920855d64e7.png#pic_center)

## 1.2 URL 地址

- URL（全称是 UniformResourceLocator）中文叫统一资源定位符，用于标识互联网上每个资源的唯一存放位置。 如：http://www.baidu.com
- 浏览器只有通过 URL 地址，才能正确定位资源的存放位置，从而成功访问到对应的资源。
- URL 地址一般由三部组成：
  ① 客户端与服务器之间的通信协议
  ② 存有该资源的服务器名称
  ③ 资源在服务器上具体的存放位置
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/bac5ffb54695488583dafd191eea8c59.png#pic_center)

## 1.3 客户端与服务器的通信过程

- 客户端与服务器之间的通信过程，分为 请求 – 处理 – 响应 三个步骤。
- 网页中的每一个资源，都是通过 请求 – 处理 – 响应 的方式从服务器获取回来的。

![在这里插入图片描述](https://img-blog.csdnimg.cn/0999e152e037466a9b2be2a08fe2d2e7.png#pic_center)

- 基于浏览器的开发者工具分析通信过程
  ① 打开 Chrome 浏览器
  ②Ctrl+Shift+I 打开 Chrome 的开发者工具
  ③ 切换到 Network 面板
  ④ 选中 Doc 页签
  ⑤ 刷新页面，分析客户端与服务器的通信过程
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/515f40d4f60b4bd0b7657bcfa927b589.png#pic_center)

## 1.4 服务器对外提供的资源

- 网页中的资源：文字内容，Image 图片，Audio 音频，Video 视频，网页中的数据..
- HTML 是网页的骨架，CSS 是网页的颜值，Javascript 是网页的行为，数据则是网页的灵魂，骨架、颜值、行为皆为数据服务
- 在网页中请求服务器上的数据资源，需要用`XMLHttpRequest`对象。

```javascript
let xhrObj = new XMLHttpRequest();
```

客户端请求服务器时，请求的方式有很多种，最常见的两种请求方式分别为 get 和 post 请求。

- `get` 请求通常用于获取服务端资源（向服务器要资源）
  例如：根据 URL 地址，从服务器获取 HTML 文件、css 文件、js 文件、图片文件、数据资源等
- `post` 请求通常用于向服务器提交数据（往服务器发送资源）
  例如：登录时向服务器提交的登录信息、注册时向服务器提交的注册信息、添加用户时向服务器提交的用户信息等各种数据提交操作

# 2. Ajax 简介

- Ajax 的全称是 Asynchronous Javascript And XML（异步 JavaScript 和 XML）。
- 通俗的理解：在网页中利用 XMLHttpRequest 对象和服务器进行数据交互的方式，就是 Ajax。

![在这里插入图片描述](https://img-blog.csdnimg.cn/17332f6290b141ecb5c3595ba5f9d8b0.png#pic_center)

# 3. jQuery 中的 Ajax

- 浏览器中提供的 `XMLHttpRequest` 用法比较复杂，所以 jQuery 对`XMLHttpRequest` 进行了封装，提供了一系列 Ajax 相关的函数，极大地降低了 Ajax 的使用难度。
- jQuery 中发起 Ajax 请求最常用的三个方法如下：
  $.get()
$.post()
  $.ajax()

## 3.1 $.get()函数

jQuery 中 $.get() 函数的功能单一，专门用来发起 get 请求，从而将服务器上的资源请求到客户端来进行使用。

```javascript
$.get(url, [data], [callback]);
```

其中，三个参数各自代表的含义如下：
| 参数名 | 参数类型 | 是否必选 | 说明 |
|--|--|--|--|
| url | string | 是 | 要请求的资源地址 |
| data | object | 否 | 请求资源期间要携带的参数 |
| callback | function | 否| 请求成功时的回调函数 |

案例 1：$.get()发起不带参数的请求

```javascript
<button id="btnGET">发起不带参数的GET请求</button>
<script>
	$(function () {
		$('#btnGET').on('click', function () {
			$.get('http://www.liulongbin.top:3006/api/getbooks', function (res) {
				console.log(res);
			})
		})
	})
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/7e50f7d319c848fc8a2d7d2ce4904570.png#pic_center)

案例 2：$.get()发起带参数的请求

```javascript
$(function () {
  $("#btnGETINFO").on("click", function () {
    $.get(
      "http://www.liulongbin.top:3006/api/getbooks",
      { id: 1 },
      function (res) {
        console.log(res);
      }
    );
  });
});
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/57c2b899e51e4b9db3123cd90e71f348.png#pic_center)

## 3.2 $.post()函数

jQuery 中 $.post() 函数的功能单一，专门用来发起 post 请求，从而向服务器提交数据

```javascript
$.post(url, [data], [callback]);
```

| 参数名   | 参数类型 | 是否必选 | 说明                     |
| -------- | -------- | -------- | ------------------------ |
| url      | string   | 是       | 提交数据的地址           |
| data     | object   | 否       | 要提交的数据             |
| callback | function | 否       | 数据提交成功时的回调函数 |

案例：

```javascript
<button id="btnPOST">发起POST请求</button>
<script>
  $(function () {
    $('#btnPOST').on('click', function () {
      $.post('http://www.liulongbin.top:3006/api/addbook', { bookname: '水浒传', author: '施耐庵', publisher: '天津图书出版社' }, function (res) {
        console.log(res)
      })
    })
  })
</script>
```

## 3.3 $.ajax()函数

相比于 $.get() 和 $.post() 函数，jQuery 中提供的 $.ajax() 函数，是一个功能比较综合的函数，它允许我们对 Ajax 请求进行更详细的配置。

```javascript
$.ajax({
  type: "", // 请求的方式，例如    GET 或    POST
  url: "", // 请求的    URL 地址
  data: {}, // 这次请求要携带的数据
  success: function (res) {}, // 请求成功之后的回调函数
});
```

# 4. 接口

## 4.1 接口的概念

使用 Ajax 请求数据时，被请求的 URL 地址，就叫做数据接口（简称接口）。同时，每个接口必须有请求方式。
例如：
http://www.liulongbin.top:3006/api/getbooks 获取图书列表的接口(GET 请求)
http://www.liulongbin.top:3006/api/addbook 添加图书的接口（POST 请求）

## 4.2 分析接口的请求过程

- 通过 GET 方式请求接口的过程

![在这里插入图片描述](https://img-blog.csdnimg.cn/5f824fcd0ea34c4caa9576bd981ccee6.png#pic_center)

- 通过 POST 方式请求接口的过程

![在这里插入图片描述](https://img-blog.csdnimg.cn/1e6a6ae571b9470ab0f7b1f792a32482.png#pic_center)

## 4.3 接口测试工具 PostMan

为了验证接口能否被正常被访问，我们常常需要使用接口测试工具，来对数据接口进行检测。
好处：接口测试工具能让我们在不写任何代码的情况下，对接口进行调用和测试。
下载：[https://www.getpostman.com/downloads/](https://www.getpostman.com/downloads/)

- 使用 PostMan 测试 GET 接口步骤：
  ① 选择请求的方式
  ② 填写请求的 URL 地址
  ③ 填写请求的参数
  ④ 点击 Send 按钮发起 GET 请求
  ⑤ 查看服务器响应的结果
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/0714d2e0b71d4d04bda142b1791e1a18.png#pic_center)

- 使用 PostMan 测试 POST 接口步骤：
  ① 选择请求的方式
  ② 填写请求的 URL 地址
  ③ 选择 Body 面板并勾选数据格式
  ④ 填写要发送到服务器的数据
  ⑤ 点击 Send 按钮发起 POST 请求
  ⑥ 查看服务器响应的结果
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/a5956fac463342aaa5b9f656be55dd55.png#pic_center)

## 4.4 接口文档

什么是接口文档

- 接口文档，顾名思义就是接口的说明文档，它是我们调用接口的依据。好的接口文档包含了对接口 URL，参数以及输出内容的说明，我们参照接口文档就能方便的知道接口的作用，以及接口如何进行调用。

接口文档的组成部分

- 接口文档可以包含很多信息，也可以按需进行精简，不过，一个合格的接口文档，应该包含以下 6 项内容，从而为接口的调用提供依据：
  ① 接口名称：用来标识各个接口的简单说明，如登录接口，获取图书列表接口等。
  ② 接口 URL：接口的调用地址。
  ③ 调用方式：接口的调用方式，如 GET 或 POST。
  ④ 参数格式：接口需要传递的参数，每个参数必须包含参数名称、参数类型、是否必选、参数说明这 4 项内容。
  ⑤ 响应格式：接口的返回值的详细描述，一般包含数据名称、数据类型、说明 3 项内容。
  ⑥ 返回示例（可选）：通过对象的形式，例举服务器返回数据的结构。

接口文档示例：

![在这里插入图片描述](https://img-blog.csdnimg.cn/d02153ec89584a49b0ee8c91d22052a8.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/46a1689a7be64b7ab14e0812621b28f2.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/0db67fb36c584595ab269595f5bfca10.png#pic_center)

# 5. form 表单

## 5.1 什么是表单

表单在网页中主要负责数据采集功能。HTML 中的`<form>`标签，就是用于采集用户输入的信息，并通过`<form>`标签的提交操作，把采集到的信息提交到服务器端进行处理。

## 5.2 表单的组成部分

- 表单由三个基本部分组成：
  ① 表单标签
  ② 表单域
  ③ 表单按钮
- 表单域：包含了文本框、密码框、隐藏域、多行文本框、复选框、单选框、下拉选择框和文件上传框等。

```javascript
<form>
  {" "}
  //表单标签
  <input type="text" name="email_or_mobile" />
  <input type="password" name="password" />
  <input type="checkbox" name="remember_me" checked />
  <button type="submit">提交</button> //表单按钮
</form>
```

## 5.3 form 标签的属性

`<form>`标签用来采集数据，`<form>`标签的属性则是用来规定如何把采集到的数据发送到服务器。
| 属性 | 值 | 描述 |
|--|--|--|
| action | URL 地址 |规定当提交表单时，向何处发送表单数据 |
| method | get 或 post | 规定以何种方式把表单数据提交到 action URL |
| enctype | (application/x-www-form-urlencoded) (multipart/form-data) (text/plain) | 规定在发送表单数据之前如何对其进行编码 |
| target | (\_blank) ( \_self) (\_parent) (\_top) (framename) | 规定在何处打开 action URL |

1、action

- action 属性用来规定当提交表单时，向何处发送表单数据。
- action 属性的值应该是后端提供的一个 URL 地址，这个 URL 地址专门负责接收表单提交过来的数据。
- 当 `<form>` 表单在未指定 action 属性值的情况下，action 的默认值为当前页面的 URL 地址。
- 注意：当提交表单后，页面会立即跳转到 action 属性指定的 URL 地址

2、target

- target 属性用来规定在何处打开 action URL。
- 它的可选值有 5 个，默认情况下，target 的值是 \_self，表示在当前窗口中打开 action URL。

| 值        | 描述                           |
| --------- | ------------------------------ |
| \_blank   | 在新窗口中打开。               |
| \_self    | 默认。在相同的框架中打开。     |
| \_parent  | 在父框架集中打开。（很少用）   |
| \_top     | 在整个窗口中打开。（很少用）   |
| framename | 在指定的框架中打开。（很少用） |

3、method

- method 属性用来规定以何种方式把表单数据提交到 action URL。 它的可选值有两个，分别是 get 和 post。
- 默认情况下，method 的值为 get，表示通过 URL 地址的形式，把表单数据提交到 action URL。
- 注意：
  get 方式适合用来提交少量的、简单的数据。
  post 方式适合用来提交大量的、复杂的、或包含文件上传的数据。
- 在实际开发中，`<form>` 表单的 post 提交方式用的最多，很少用 get。例如登录、注册、添加数据等表单操作，都需要使用 post 方式来提交表单。

4、enctype

- enctype 属性用来规定在发送表单数据之前如何对数据进行编码。
- 它的可选值有三个，默认情况下，enctype 的值为 application/x-www-form-urlencoded，表示在发送前编码所有的字符。
- 注意：在涉及到文件上传的操作时，必须将 enctype 的值设置为 multipart/form-data。如果表单的提交不涉及到文件上传操作，则直接将 enctype 的值设置为 application/x-www-form-urlencoded 即可！

| 值                                | 描述                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| application/x-www-form-urlencoded | 在发送前编码所有字符（默认）                                 |
| multipart/form-data               | 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。 |
| text/plain                        | 空格转换为 “+” 加号，但不对特殊字符编码。（很少用）          |

## 5.4 表单的同步提交及缺点

- 通过点击 submit 按钮，触发表单提交的操作，从而使页面跳转到 action URL 的行为，叫做表单的同步提交。
- 表单同步提交的缺点
  ① `<form>`表单同步提交后，整个页面会发生跳转，跳转到 action URL 所指向的地址，用户体验很差。
  ② `<form>`表单同步提交后，页面之前的状态和数据会丢失。
- 如何解决表单同步提交的缺点
  解决方案：表单只负责采集数据，Ajax 负责将数据提交到服务器。也就是阻止表单的默认行为(自动跳转等)

```javascript
e.preventDefault();
```

# 6. Ajax 提交表单数据

## 6.1 监听表单提交事件

```javascript
$(function () {
  //jquery
  // 第一种方式
  // $('#form1').submit(function (e) {
  //   alert('监听到了表单的提交事件');
  //   e.preventDefault();
  // })
  // 第二种方式
  $("#form1").on("submit", function (e) {
    alert("监听到了表单的提交事件2");
    e.preventDefault();
  });
});
```

## 6.2 阻止表单默认提交行为

当监听到表单的提交事件以后，可以调用事件对象的 `event.preventDefault()` 函数，来阻止表单的提交和页面的跳转

```javascript
$("#form1").submit(function (e) {
  // 阻止表单的提交和页面的跳转
  e.preventDefault();
});
$("#form1").on("submit", function (e) {
  // 阻止表单的提交和页面的跳转
  e.preventDefault();
});
```

## 6.3 快速获取表单中的数据

- 为了简化表单中数据的获取操作，jQuery 提供了 `serialize()` 函数，可以一次性获取到表单中的所有的数据。

```javascript
$(selector).serialize();
```

- 注意：在使用 serialize() 函数快速获取表单数据时，必须为每个表单元素添加 name 属性！

```javascript
<body>
  <form action="/login" id="f1">
    <input type="text" name="user_name" />
    <input type="password" name="password" />
    <button type="submit">提交</button>
  </form>
  <script>
    $(function (){" "}
    {$("#f1").on("submit", function (e) {
      e.preventDefault();
      let data = $("#f1").serialize(); //获取所有表单元素的数据
      console.log(data); //username=用户名的值&password=密码的值
    })}
    )
  </script>
</body>
```

> 小知识：重置表单元素内容 formDom.reset(); $('form')[0].reset(); 前者原生 DOM，后者 jquery 对象转原生 DOM 对象

# 7. art-template 模板引擎

## 7.1 模板引擎简介

- 模板引擎，顾名思义，它可以根据程序员指定的模板结构和数据，自动生成一个完整的 HTML 页面。
- 好处：
  ① 减少了字符串的拼接操作
  ② 使代码结构更清晰
  ③ 使代码更易于阅读与维护
- 原先渲染 UI 结构时遇到的问题：通过字符串拼接的形式，来渲染 UI 结构。
  如果 UI 结构比较复杂，则拼接字符串的时候需要格外注意引号之前的嵌套。且一旦需求发生变化，修改起来也非常麻烦。

```javascript
let rows = []
$.each(res.data, function (i, item) { // 循环拼接字符串
rows.push('<li class="list-group-item">'+ item.content +'<span class="badge
cmt-date">评论时间：'+ item.time +'</span><span class="badge cmt-person">评论人：'+
item.username +'</span></li>')
})
$('#cmt-list').empty().append(rows.join('')) // 渲染列表的UI结构
```

## 7.2 art-template 安装

- 在浏览器中访问 [http://aui.github.io/art-template/zh-cn/docs/installation.html](http://aui.github.io/art-template/zh-cn/docs/installation.html) 找到下载链接后，鼠标右键， 选择“链接另存为”，将 art-template 下载到本地，然后，通过 `<script>` 标签加载到网页上进行使用。
- 中文官网：[http://aui.github.io/art-template/zh-cn/](http://aui.github.io/art-template/zh-cn/)

![在这里插入图片描述](https://img-blog.csdnimg.cn/b0b3a33c22284c7a9ae1659afacb7b26.png#pic_center)

## 7.3 基本使用

① 导入 art-template
② 定义数据
③ 定义模板
④ 调用 template 函数
⑤ 渲染 HTML 结构

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
	//导入 art-template模板引擎
    <script src="lib//template-web.js"></script>
    <script src="lib/jquery.min.js"></script>
  </head>
  <body>
    <div class="content"></div>
    //定义模板,模板的 HTML 结构，必须定义到 script 中,
    //且设置type="text/html",设置id属性
    <script type="text/html" id="temp1">
      <h4>{{name}}----{{age}}</h4>
    </script>
    <script>
      $(function () {
      	//定义数据
        let data = {
          name: "zs",
        };
        //调用 template 函数
        let htmlStr = template("temp1", data);
        console.log(htmlStr);
        //渲染HTML结构
        $(".content").html(htmlStr);
      });
    </script>
  </body>
</html>

```

## 7.4 标准语法

art-template 提供了 `{{ }}` 这种语法格式，在 `{{ }}` 内可以进行变量输出，或循环数组等操作，这种 `{{ }}` 语法在 art-template 中被称为标准语法。

### 7.4.1 标准输出

在 `{{ }}` 语法中，可以进行变量的输出、对象属性的输出、三元表达式输出、逻辑或输出、加减乘除等表达式输出。

```javascript
{
  {
    value;
  }
}
{
  {
    obj.key;
  }
}
{
  {
    obj["key"];
  }
}
{
  {
    a ? b : c;
  }
}
{
  {
    a || b;
  }
}
{
  {
    a + b;
  }
}
```

例子：

```javascript
<script type="text/html" id="tpl-user">
	<h1>{{name}}    ------    {{age}}</h1>
</script>
<script>
    let data = { name: 'zs', age: 20};
    let htmlStr = template('tpl-user', data);
    $('#container').html(htmlStr); //渲染
</script>
```

### 7.4.2 原文输出

如果要输出的 value 值中，包含了 HTML 标签结构，则需要使用原文输出语法，才能保证 HTML 标签被正常渲染。

```javascript
{{@ value }}
```

例子：

```javascript
<script type="text/html" id="tpl-user">
	{{@ test}}
</script>
<script>
    let data = { test: '<h3>测试原文输出</h3>'};
    let htmlStr = template('tpl-user', data);
    $('#container').html(htmlStr); //渲染
</script>
```

### 7.4.3 条件输出

如果要实现条件输出，则可以在 {{ }} 中使用 if … else if … /if 的方式，进行按需输出。

```javascript
{{if value}} 按需输出的内容    {{/if}}
{{if v1}} 按需输出的内容 {{else if v2}} 按需输出的内容 {{/if}}
```

例子：

```javascript
<script type="text/html" id="tpl-user">
	<div>
      {{if flag === 0}}
      flag的值是0
      {{else if flag === 1}}
      flag的值是1
      {{/if}}
    </div>
</script>
<script>
    let data = {flag: 1};
    let htmlStr = template('tpl-user', data);
    $('#container').html(htmlStr); //渲染
</script>
```

### 7.4.4 循环输出

如果要实现循环输出，则可以在 {{ }} 内，通过 each 语法循环数组，当前循环的索引使用 $index 进行访问，当前的循环项使用 $value 进行访问。

```javascript
{{each arr}}
{{$index}} {{$value}}
{{/each}}
```

例子：

```javascript
<script type="text/html" id="tpl-user">
	<ul>
      {{each hobby}}
      <li>索引是:{{$index}}，循环项是:{{$value}}</li>
      {{/each}}
    </ul>
</script>
<script>
    let data = {hobby: ['吃饭', '睡觉', '写代码']};
    let htmlStr = template('tpl-user', data);
    $('#container').html(htmlStr); //渲染
</script>
```

### 7.4.5 过滤器

过滤器语法类似管道操作符，它的上一个输出作为下一个输入。

```javascript
{
  {
    value | filterName;
  }
}
```

定义过滤器的基本语法如下：

```javascript
template.defaults.imports.名字自取 = function (value) {
  /*return处理的结果*/
};
```

例子：

```javascript
<script type="text/html" id="tpl-user">
	<h3>{{regTime | dateFormat}}</h3>
</script>
<script>
	template.defaults.imports.dateFormat = function (date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      return y + '-' + m + '-' + d;
    }
    let data = {regTime: new Date()};
    let htmlStr = template('tpl-user', data);
    $('#container').html(htmlStr); //渲染
</script>
```

# 8. XMLHttpRequest

## 8.1 XMLHttpRequest 简介

XMLHttpRequest（简称 xhr）是浏览器提供的 Javascript 对象，通过它，可以请求服务器上的数据资源。jQuery 中的 Ajax 函数，就是基于 xhr 对象封装出来的。

## 8.2 readyState 属性

XMLHttpRequest 对象的 readyState 属性，用来表示当前 Ajax 请求所处的状态。每个 Ajax 请求必然处于以下状态中的一个：
| 值 | 状态 | 描述 |
|--|--|--|
| 0 | UNSENT | XMLHttpRequest 对象已被创建，但尚未调用 open 方法 |
| 1 | OPENED | open() 方法已经被调用。 |
| 2 |HEADERS_RECEIVED | send() 方法已经被调用，响应头也已经被接收。 |
| 3 | LOADING | 数据接收中，此时 response 属性中已经包含部分数据。 |
| 4 | DONE | Ajax 请求完成，这意味着数据传输已经彻底完成或失败。 |

## 8.3 使用 xhr 发起 GET 请求

- 步骤：
  ① 创建 xhr 对象
  ② 调用 xhr.open() 函数
  ③ 调用 xhr.send() 函数
  ④ 监听 xhr.onreadystatechange 事件
- xhr 属性提示
  ① `xhr.responseText` 在一个请求被发送后，从服务器端返回文本。
  ② `xhr.status` 返回了 XMLHttpRequest 响应中的数字状态码,在请求完成前，status 的值为 0，XMLHttpRequest 出错，浏览器返回的 status 也为 0。status 200 代表一个成功的请求
  ③ `xhr.responseText` 在一个请求被发送后，从服务器端返回文本。

```javascript
<script>
   // 1. 创建 XHR 对象
   let xhr = new XMLHttpRequest();
   // 2. 调用 open 函数
   xhr.open('GET', 'http://www.liulongbin.top:3006/api/getbooks');//请求方式 + 地址
   // 3. 调用 send 函数
   xhr.send();
   // 4. 监听 onreadystatechange 事件
   xhr.onreadystatechange = function () {
     if (xhr.readyState === 4 && xhr.status === 200) { // 固定写法 不要改
       // 获取服务器响应的数据
       console.log(xhr.responseText); //返回的数据
     }
   }
</script>
```

## 8.4 带参数的 GET 请求

- 使用 xhr 对象发起带参数的 GET 请求时，只需在调用 xhr.open 期间，为 URL 地址指定参数即可：

```javascript
// ...省略不必要的代码
xhr.open("GET", "http://www.liulongbin.top:3006/api/getbooks?id=1");
// ...省略不必要的代码
```

- 这种在 URL 地址后面拼接的参数，叫做查询字符串。

## 8.5 查询字符串

- 定义：查询字符串（URL 参数）是指在 URL 的末尾加上用于向服务器发送信息的字符串（变量）。
- 格式：将英文的 `?` 放在 URL 的末尾，然后再加上 **参数＝值** ，想加上多个参数的话，使用 `&` 符号进行分隔。以这个形式，可以将想要发送给服务器的数据添加到 URL 中。

```javascript
// 不带参数的    URL 地址
http://www.liulongbin.top:3006/api/getbooks
// 带一个参数的    URL 地址
http://www.liulongbin.top:3006/api/getbooks?id=1
// 带两个参数的    URL 地址
http://www.liulongbin.top:3006/api/getbooks?id=1&bookname=西游记
```

- GET 请求携带参数的本质：
  无论使用 $.ajax()，还是使用 $.get()，又或者直接使用 xhr 对象发起 GET 请求，当需要携带参数的时候，本质上，都是直接将参数以查询字符串的形式，追加到 URL 地址的后面，发送到服务器的。

## 8.6 URL 编码与解码

### 8.6.1 什么是 URL 编码

- URL 地址中，只允许出现英文相关的字母、标点符号、数字，因此，在 URL 地址中不允许出现中文字符。如果 URL 中需要包含中文这样的字符，则必须对中文字符进行编码（转义）。
- URL 编码的原则：使用安全的字符（没有特殊用途或者特殊意义的可打印字符）去表示那些不安全的字符。
- URL 编码原则的通俗理解：使用英文字符去表示非英文字符。

```javascript
http://www.liulongbin.top:3006/api/getbooks?id=1&bookname=西游记
// 经过    URL 编码之后，URL地址变成了如下格式：
http://www.liulongbin.top:3006/api/getbooks?id=1&bookname=%E8%A5%BF%E6%B8%B8%E8%AE%B0
```

### 8.6.2 对 URL 进行编码与解码

- 浏览器提供了 URL 编码与解码的 API，分别是：
  `encodeURI()` 编码的函数
  `decodeURI()` 解码的函数

```javascript
let str = "凉宫";
let str2 = encodeURI(str);
console.log(str2); //%E5%87%89%E5%AE%AB
let str3 = decodeURI("%E5%87%89%E5%AE%AB");
console.log(str3); //凉宫
```

- 由于浏览器会自动对 URL 地址进行编码操作，因此，大多数情况下，程序员不需要关心 URL 地址的编码与解码操作。

## 8.7 xhr 发起 POST 请求

- 步骤：
  ① 创建 xhr 对象
  ② 调用 xhr.open() 函数
  ③ 设置 Content-Type 属性（固定写法）
  ④ 调用 xhr.send() 函数，同时指定要发送的数据
  ⑤ 监听 xhr.onreadystatechange 事件

```javascript
<script>
   // 1. 创建 xhr 对象
   let xhr = new XMLHttpRequest();
   // 2. 调用 open 函数
   xhr.open('POST', 'http://www.liulongbin.top:3006/api/addbook');
   // 3. 设置 Content-Type 属性(固定写法)
   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   // 4. 调用 send 函数(可带可不带参)
   xhr.send('bookname=水浒传&author=施耐庵&publisher=上海图书出版社');
   // 5. 监听事件
   xhr.onreadystatechange = function () {
     if (xhr.readyState === 4 && xhr.status === 200) {
       console.log(xhr.responseText);
     }
   }
</script>
```

# 9. XMLHttpRequest LV2

## 9.1 认识 XMLHttpRequest LV2

- 旧版 XMLHttpRequest 的缺点
  ① 只支持文本数据的传输，无法用来读取和上传文件
  ② 传送和接收数据时，没有进度信息，只能提示有没有完成
- 新版 XMLHttpRequest 的新功能
  ① 可以设置 HTTP 请求的时限
  ② 可以使用 FormData 对象管理表单数据
  ③ 可以上传文件
  ④ 可以获得数据传输的进度信息

## 9.2 设置 HTTP 请求时限

- 有时，Ajax 操作很耗时，而且无法预知要花多少时间。如果网速很慢，用户可能要等很久。新版本的 XMLHttpRequest 对象，增加了 timeout 属性，可以设置 HTTP 请求的时限

```javascript
xhr.timeout = 3000; //设置时限
```

- 上面的语句，将最长等待时间设为 3000 毫秒。过了这个时限，就自动停止 HTTP 请求。与之配套的还有一个 timeout 事件，用来指定回调函数：

```javascript
xhr.ontimeout = function (event) {
  alert("请求超时！"); //超时后调用回调函数
};
```

- 案例：

```javascript
let xhr = new XMLHttpRequest();
// 设置超时时间
xhr.timeout = 30;
// 设置超时以后的处理函数
xhr.ontimeout = function () {
  console.log("请求超时了！");
};
xhr.open("GET", "http://www.liulongbin.top:3006/api/getbooks");
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/d33ff940fdfd4905903161e8be7c2006.png#pic_center)

## 9.3 FormData 对象

- Ajax 操作往往用来提交表单数据。为了方便表单处理，HTML5 新增了一个 FormData 对象，可以管理表单数据
- FormData 接口提供了一种表示表单数据的键值对 key/value 的构造方式，并且可以轻松的将数据通过 XMLHttpRequest.send() 方法发送出去

```javascript
// 1. 创建 FormData 实例
let fd = new FormData();
// 2. 调用 append 函数，向 fd 中追加数据
fd.append("uname", "zs");
fd.append("upwd", "123456");
let xhr = new XMLHttpRequest();
xhr.open("POST", "http://www.liulongbin.top:3006/api/formdata");
xhr.send(fd);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};
```

- FormData 对象管理表单数据,用来获取网页表单中所有表单元素的值，示例代码如下：

```javascript
// 1. 通过 DOM 操作，获取到 form 表单元素
let form = document.querySelector("#form1");
form.addEventListener("submit", function (e) {
  // 阻止表单的默认提交行为
  e.preventDefault();
  // 创建 FormData，快速获取到 form 表单中的数据
  let fd = new FormData(form); // 传入指定表单对象
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://www.liulongbin.top:3006/api/formdata");
  xhr.send(fd);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText));
    }
  };
});
```

## 9.4 上传文件

- 新版 XMLHttpRequest 对象，不仅可以发送文本信息，还可以上传文件。
- 实现步骤：
  ① 定义 UI 结构
  ② 验证是否选择了文件
  ③ 向 FormData 中追加文件
  ④ 使用 xhr 发起上传文件的请求
  ⑤ 监听 onreadystatechange 事件

```javascript
<body>
  //定义 UI 结构
  <input type="file" id="file1" />
  <button id="btnUpload">上传文件</button>
  <br />
  <img src="" alt="" id="img" width="800" />
  <script>
    // 1. 获取到文件上传按钮
    let btnUpload = document.querySelector('#btnUpload');
    // 2. 为按钮绑定单击事件处理函数
    btnUpload.addEventListener('click', function () {
      // 3. 获取到用户选择的文件列表
      let files = document.querySelector('#file1').files;
      if (files.length <= 0) {
        return alert('请选择要上传的文件！');
      }
      let fd = new FormData();
      // 将用户选择的文件，添加到 FormData 中
      fd.append('avatar', files[0]);
      let xhr = new XMLHttpRequest();
      //调用open 函数，指定请求类型与URL地址。其中，请求类型必须为POST
      xhr.open('POST', 'http://www.liulongbin.top:3006/api/upload/avatar');
      xhr.send(fd);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          if (data.status === 200) {
            // 上传成功
            document.querySelector('#img').src = 'http://www.liulongbin.top:3006' + data.url;
          } else {
            console.log('图片上传失败！' + data.message);
          }
        }
      }
    })
  </script>
</body>
```

## 9.5 显示文件上传进度

- 新版本的 XMLHttpRequest 对象中，可以通过监听 `xhr.upload.onprogress` 事件，来获取到文件的上传进度。
- 语法：

```javascript
// 创建XHR对象
let xhr = new XMLHttpRequest();
// 监听xhr.upload的onprogress 事件
let.upload.onprogress = function (e) {
  // e.lengthComputable 是一个布尔值，表示当前上传的资源是否具有可计算的长度
  if (e.lengthComputable) {
    // e.loaded 已传输的字节
    // e.total 需传输的总字节
    let percentComplete = Math.ceil((e.loaded / e.total) * 100);
  }
};
```

- 案例：基于 bootstrap 的进度条

```javascript
<head>
    <!-- 导入需要的库 -->
    <link rel="stylesheet" href="bootstrap.min.css" />
    <script src="lib/jquery.min.js"></script>
    <script src="bootstrap.bundle.min.js"></script>
</head>
<body>
    <input type="file" id="file1" />
    <button id="btn">上传</button>
    <img src="" alt="" id="img" />
    <!-- 基于Bootstrap渲染进度条 -->
    <div class="progress" style="width: 500px; margin: 15px 10px;">
        <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 0%">
            0%
        </div>
    </div>
    <script>
        let btn = document.querySelector("#btn");
        btn.addEventListener("click", function () {
            //获取到用户选择的文件列表
            let files = document.querySelector("#file1").files;
            if (files.length <= 0) {
                return alert("还没选文件呢");
            }
            let fd = new FormData();
            // 将用户选择的文件，添加到 FormData 中
            fd.append("avatar", files[0]);
            let xhr = new XMLHttpRequest();
            // 监听上传进度的事件
            xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    // 计算出上传的进度
                    let percentComplete = Math.ceil((e.loaded / e.total) * 100);
                    console.log(percentComplete);
                    // 动态设置进度条
                    $('.progress-bar').attr('style', 'width: ' + percentComplete + '%;').html(percentComplete + '%');
                }
            };
            xhr.upload.onload = function (e) {
                //上传完，可以添加类样式来改变进度条外观
                $('.progress-bar').removeClass().addClass('progress-bar progress-bar-striped bg-success');
            }
            xhr.open("post", "http://www.liulongbin.top:3006/api/upload/avatar");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    if (data.status === 200) {
                        document.querySelector("#img").src =
                            "http://www.liulongbin.top:3006" + data.url;
                    } else {
                        console.log(data.message);
                    }
                }
            };
            xhr.send(fd);
        });
    </script>
</body>
```

- 案例：jQuery 实现 loading 效果

> `ajaxStart(callback)`：Ajax 请求开始时，执行 ajaxStart 函数。`$(document).ajaxStart()` 函数会监听当前文档内所有的 Ajax 请求。
> `ajaxStop(callback)` ：Ajax 请求结束时，执行 ajaxStop 函数

```javascript
<input type="file" id="file1" />
<button id="btnUpload">上传文件</button>
<br />
<img src="./images/loading.gif" alt="" style="display: none;" id="loading" />
<script>
 $(function () {
   // 监听到Ajax请求被发起了
   $(document).ajaxStart(function () {
     $('#loading').show()
   })
   // 监听到 Ajax 完成的事件
   $(document).ajaxStop(function () {
     $('#loading').hide()
   })
   $('#btnUpload').on('click', function () {
     //将jQuery对象转化为DOM 对象，并获取选中的文件列表
     let files = $('#file1')[0].files
     if (files.length <= 0) {
       return alert('请选择文件后再上传！')
     }
     let fd = new FormData()
     fd.append('avatar', files[0])
     // 发起 jQuery 的 Ajax 请求，上传文件
     $.ajax({
       method: 'POST',
       url: 'http://www.liulongbin.top:3006/api/upload/avatar',
       data: fd,
       // 不修改Content-Type 属性，使用FormData 默认的Content-Type值
       processData: false,
       // 不对FormData 中的数据进行url 编码，而是将FormData 数据原样发送到服务器
       contentType: false,
       success: function (res) {
         console.log(res)
       }
     })
   })
 })
</script>
```

# 10. 数据交换格式

## 10.1 什么是数据交换格式

- 数据交换格式，就是服务器端与客户端之间进行数据传输与交换的格式。
- 前端领域，经常提及的两种数据交换格式分别是 **XML** 和 **JSON**。其中 XML 用的非常少，重点学习 JSON。

## 10.2 XML

- XML 的英文全称是 EXtensible Markup Language，即**可扩展标记语言**。因此，XML 和 HTML 类似，也是一种标记语言。

![在这里插入图片描述](https://img-blog.csdnimg.cn/e4b66d8b3d9547e5b69ebfdbc6d38f0e.png#pic_center)

- XML 和 HTML 都是标记语言，但它们两者之间没有任何的关系。区别：
  ① **HTML** 被设计用来描述网页上的内容，是**网页内容**的载体
  ② **XML** 被设计用来传输和存储数据，是**数据**的载体
- XML 的缺点
  ① XML 格式臃肿，和数据无关的代码多，体积大，传输效率低
  ② 在 Javascript 中解析 XML 比较麻烦

## 10.3 JSON

### 10.3.1 简介

- JSON 的英文全称是 JavaScript Object Notation，即“JavaScript 对象表示法”。
- 简单来讲，JSON 就是 Javascript **对象和数组的字符串表示法**，它使用文本表示一个 JS 对象或数组的信息
- JSON 的本质是字符串。
- 作用：JSON 是一种轻量级的文本数据交换格式，在作用上类似于 XML，专门用于存储和传输数据，但是 JSON 比 XML 更小、更快、更易解析。
- JSON 中包含**对象**和**数组**两种结构，通过这两种结构的相互嵌套，可以表示各种复杂的数据结构。

### 10.3.2 对象结构

- 对象结构在 JSON 中表示为 `{ }` 括起来的内容。数据结构为 `{ key: value, key: value, … }` 的键值对结构。
- key 必须是使用英文的**双引号**包裹的字符串，value 的数据类型可以是数字、字符串、布尔值、null、数组、对象 6 种类型(value 字符串也用**双引号**包裹)。

错误示例：

```javascript
{
	name: "zs", // "name"
	'age': 20, // "age"
	"gender": '男', // "男"
	"address": undefined,  //不包含undefined类型，可以是null
	"hobby": ["吃饭", "睡觉", '敲代码'] // "敲代码"
	say: function() {} // 不能是函数，对象只能以{}的形式作为value
}
```

### 10.3.3 数组结构

- 数组结构在 JSON 中表示为 [ ] 括起来的内容。数据结构为 `["java", "javascript", 30, true … ]` 。
- 数组中数据的类型可以是数字、字符串、布尔值、null、数组、对象 6 种类型。

正确示例：

```javascript
["java", "python", "php"][(100, 200, 300.5)][(true, false, null)][
  ({ name: "zs", age: 20 }, { name: "ls", age: 30 })
][(["苹果", "榴莲", "椰子"], [4, 50, 5])];
```

### 10.3.4 JSON 语法注意事项

- 注意点：
  ① 属性名必须使用双引号包裹
  ② 字符串类型的值必须使用双引号包裹
  ③ JSON 中不允许使用单引号表示字符串
  ④ JSON 中不能写注释
  ⑤ JSON 的最外层必须是对象或数组格式
  ⑥ 不能使用 undefined 或函数作为 JSON 的值
- JSON 的作用：在计算机与网络之间存储和传输数据。
- JSON 的本质：用字符串来表示 Javascript 对象数据或数组数据

### 10.3.5 JSON 和 JS 对象的关系

- JSON 是 JS 对象的字符串表示法，它使用文本表示一个 JS 对象的信息，本质是一个字符串。

```javascript
//这是一个对象
let obj = { a: "Hello", b: "World" };
//这是一个    JSON 字符串，本质是一个字符串
let json = '{"a": "Hello", "b": "World"}';
```

### 10.3.6 JSON 和 JS 对象的互转

- 要实现从 JSON 字符串转换为 JS 对象，使用 `JSON.parse()` 方法

```javascript
let obj = JSON.parse('{"a": "Hello", "b": "World"}');
//结果是    {a: 'Hello', b: 'World'}
console.log(typeof obj); //object
```

- 要实现从 JS 对象转换为 JSON 字符串，使用 `JSON.stringify()` 方法：

```javascript
let str = JSON.stringify({ a: "Hello", b: "World" });
//结果是    '{"a": "Hello", "b": "World"}';
console.log(typeof str); //string
```

### 10.3.7 序列化和反序列化

- 把数据对象转换为字符串的过程，叫做序列化，例如：调用 `JSON.stringify()` 函数的操作，叫做 JSON 序列化。
- 把字符串转换为数据对象的过程，叫做反序列化，例如：调用 `JSON.parse()` 函数的操作，叫做 JSON 反序列化。

使用示例：

```javascript
let xhr = new XMLHttpRequest();
xhr.open("GET", "http://www.liulongbin.top:3006/api/getbooks");
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
    console.log(typeof xhr.responseText);
    let result = JSON.parse(xhr.responseText);
    console.log(result);
  }
};
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/7111c22caba7412fb4aa800e3a966c59.png#pic_center)

# 11. 封装自己的 Ajax 函数

## 11.1 要实现的效果

模仿 jquery 的 ajax()函数，自己封装 Ajax

```html
<!-- 1. 导入自定义的ajax函数库    -->
<script src="DIYAjax.js"></script>
<script>
  // 2. 调用自定义的DIYAjax 函数，发起    Ajax 数据请求
  DIYAjax({
    method: "请求类型",
    url: "请求地址",
    data: {
      /* 请求参数对象    */
    },
    success: function (res) {
      // 成功的回调函数
      console.log(res); // 打印数据
    },
  });
</script>
```

## 11.2 定义 options 参数选项

- DIYAjax() 函数是我们自定义的 Ajax 函数，它接收一个配置对象作为参数，配置对象中可以配置如下属性：
  ①method 请求的类型
  ②url 请求的 URL 地址
  ③data 请求携带的数据
  ④success 请求成功之后的回调函数

## 11.3 处理 data 参数

```javascript
/**
* 处理    data 参数
* @param {data} 需要发送到服务器的数据
* @returns {string} 返回拼接好的查询字符串    name=zs&age=10
*/
function resolveData(data) {
	let arr = [];
	for (letr k in data) {
		arr.push(k + '=' + data[k]);
	}
	return arr.join('&');
}
```

## 11.4 定义 DIYAjax()函数

在 DIYAjax() 函数中，需要创建 xhr 对象，并监听 onreadystatechange 事件

```javascript
function DIYAjax(options) {
  let xhr = new XMLHttpRequest();
  // 拼接查询字符串
  let qs = resolveData(options.data);
  // 监听请求状态改变的事件
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let result = JSON.parse(xhr.responseText);
      options.success(result);
    }
  };
}
```

判断请求的类型:不同的请求类型，对应 xhr 对象的不同操作，因此需要对请求类型进行 if … else … 的判断：

```javascript
if (options.method.toUpperCase() === "GET") {
  // 发起    GET 请求
  xhr.open(options.method, options.url + "?" + qs);
  xhr.send();
} else if (options.method.toUpperCase() === "POST") {
  // 发起    POST 请求
  xhr.open(options.method, options.url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(qs);
}
```

## 11.5 完整代码

```javascript
//data是需要发送到服务器的数据{}，转为查询字符串返回
function resolveData(data) {
  let arr = [];
  //提取data中的键值，以=号连接，放入数组
  for (let k in data) {
    let str = k + "=" + data[k];
    arr.push(str);
  }
  // 返回拼接好的查询字符串形式如：name=zs&age=10
  return arr.join("&"); //把数组元素以&连接，
}
//   let re = resolveData({ name: "za", age: 20 });
//   console.log(re);
function DIYAjax(options) {
  let xhr = new XMLHttpRequest();
  // 把外界传入的参数对象中的请求参数 转化为 查询字符串
  let qs = resolveData(options.data);
  // 判断用户传入的请求方式发起请求(get/post)
  if (options.method.toUpperCase() === "GET") {
    // 发起get请求
    xhr.open(options.method, options.url + "?" + qs);
    xhr.send();
  } else if (options.method.toUpperCase() === "POST") {
    //发起post请求
    xhr.open(options.method, options.url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(qs);
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      //服务器响应的xhr.responseText数据是JSON格式，所以要转为对象/数组
      let result = JSON.parse(xhr.responseText);
      // 请求成功之后的回调函数,返回响应数据，用于对数据的操作
      return options.success(result);
    }
  };
}
```

引入后，调用

```javascript
<script src="DIYAjax.js"></script>
<script>
      DIYAjax({
        method: "GET",
        url: "http://www.liulongbin.top:3006/api/getbooks",
        data: { id: 1 },
        success: function (res) {
          console.log(res);
        },
      });
      DIYAjax({
        method: "post",
        url: "http://www.liulongbin.top:3006/api/addbook",
        data: {
          bookname: "水浒传",
          author: "施耐庵",
          publisher: "北京图书出版社",
        },
        success: function (res) {
          console.log(res);
        },
      });
    </script>
```

# 12. axios

## 12.1 axios 简介

- Axios 是专注于网络数据请求的库。
- 相比于原生的 XMLHttpRequest 对象，axios 简单易用。
- 相比于 jQuery，axios 更加轻量化，只专注于网络数据请求。
- Vue、React 中框架中都会用到 axios 来请求数据
- 中文官网：[http://www.axios-js.com/](http://www.axios-js.com/)
- 英文官网：[https://www.npmjs.com/package/axios](https://www.npmjs.com/package/axios)
- 使用：通过`npm i axios` 或 直接在文件里引入 `axios.js` 库文件

## 12.2 axios 发起 GET 请求

使用前

- 语法

```javascript
axios
  .get("url", {
    params: {
      /*参数*/
    },
  })
  .then(callback);
```

案例：

```javascript
// 请求的URL地址
let url = "http://www.liulongbin.top:3006/api/get";
// 请求的参数对象
let paramsObj = { name: "zs", age: 20 };
// 调用    axios.get() 发起    GET 请求
axios.get(url, { params: paramsObj }).then(function (res) {
  // res.data 是服务器返回的数据
  let result = res.data;
  console.log(result);
});
```

## 12.3 axios 发起 POST 请求

- 语法

```javascript
axios
  .post("url", {
    /*参数*/
  })
  .then(callback);
```

- 案例

```javascript
// 请求的    URL 地址
let url = "http://www.liulongbin.top:3006/api/post";
// 要提交到服务器的数据
let dataObj = { location: "北京", address: "顺义" };
// 调用 axios.post() 发起    POST 请求
axios.post(url, dataObj).then(function (res) {
  // res.data 是服务器返回的数据
  let result = res.data;
  console.log(result);
});
```

## 12.4 直接使用 axios 发起请求

- axios 也提供了类似于 jQuery 中 $.ajax() 的函数
- 调用 axios 方法得到的返回值是 Promise 对象
- `.then(function(res){console.(res.data)})` 中的异步回调函数的 res 参数是 axios 在接口返回的数据上套了一层壳，真实的返回数据是在`res.data` 中
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/fdf18fce163346679899331c28298285.png#pic_center)

```javascript
axios({
  method: "请求类型",
  url: "请求的URL地址",
  data: {
    /* POST数据    */
  }, //二选一，是post请求就用data
  params: {
    /* GET参数    */
  }, //是get请求就用params
}).then(callback); //利用axios返回的Promise对象，调用.then()方法，传入成功的回调函数
```

- 直接使用 axios 发起 GET 请求

```javascript
axios({
  method: "GET",
  url: "http://www.liulongbin.top:3006/api/get",
  params: {
    // GET 参数要通过    params 属性提供
    name: "zs",
    age: 20,
  },
}).then(function (res) {
  // 这个res是axios给真实数据套了个壳之后的数据
  console.log(res.data); // res.data 才是 服务器 返回的真实数据
});
```

- 例子：

```javascript
<button id="btn1">发起GET请求</button>
<button id="btn2">发起POST请求</button>
<button id="btn3">直接使用axios发起GET请求</button>
<button id="btn4">直接使用axios发起POST请求</button>
<script>
  //发起GET请求
  document.querySelector('#btn1').addEventListener('click', function () {
    let url = 'http://www.liulongbin.top:3006/api/get'
    let paramsObj = { name: 'zs', age: 20 }
    axios.get(url, { params: paramsObj }).then(function (res) {
      console.log(res.data)
    })
  })
  //发起POST请求
  document.querySelector('#btn2').addEventListener('click', function () {
    let url = 'http://www.liulongbin.top:3006/api/post'
    let dataObj = { address: '北京', location: '顺义区' }
    axios.post(url, dataObj).then(function (res) {
      console.log(res.data)
    })
  })
  //直接使用axios发起GET请求
  document.querySelector('#btn3').addEventListener('click', function () {
    let url = 'http://www.liulongbin.top:3006/api/get'
    let paramsData = { name: '钢铁侠', age: 35 }
    axios({
      method: 'GET',
      url: url,
      params: paramsData
    }).then(function (res) {
      console.log(res.data)
    })
  })
  //直接使用axios发起POST请求
  document.querySelector('#btn4').addEventListener('click', function () {
    axios({
      method: 'POST',
      url: 'http://www.liulongbin.top:3006/api/post',
      data: {
        name: '娃哈哈',
        age: 18,
        gender: '女'
      }
    }).then(function (res) {
      console.log(res.data)
    })
  })
</script>
```

- **结合 ES6 中的 async 和 await 调用 axios**

```javascript
<button id="btn1">点我发送post请求</button>
<button id="btn2">点我发送get请求</button>
<script>
    document.querySelector('#btn1').addEventListener('click', async function () {
        // 如果调用某个方法的返回值Promise示例 ，则前面可以添加await
        // 同时， await 只能用在被 async 修饰的方法中
        // 把解构出来的data，用 冒号 进行重命名 一般命名为 res
        const { data: res } = await axios({ // 使用解构赋值，从axios封装的大对象中，把 data属性解构出来
            method: 'post',
            url: 'http://www.liulongbin.top:3006/api/post',
            data: {
                name: 'zs',
                age: 20,
            }
        });
        console.log(res);
    });
    document.querySelector('#btn2').addEventListener('click', async function () {
        const { data: res } = await axios({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/getbooks',
            params: {},
        });
        console.log(res.data);
    });
</script>
```

# 13. 跨域与 JSONP

## 13.1 同源策略

1、什么是同源

- 如果两个页面的协议，域名和端口都相同，则两个页面具有相同的源。
- 没有显示端口号，默认 80
- 例如，下表给出了相对于 `http://www.test.com/index.html` 页面的同源检测

| URL                                | 是否同源 | 原因                                      |
| ---------------------------------- | -------- | ----------------------------------------- |
| http://www.test.com/other.html     | 是       | 同源（协议、域名、端口相同）              |
| https://www.test.com/about.html    | 否       | 协议不同（http 与 https）                 |
| http://blog.test.com/movie.html    | 否       | 域名不同（www.test.com 与 blog.test.com） |
| http://www.test.com:7001/home.html | 否       | 端口不同（默认的 80 端口与 7001 端口）    |
| http://www.test.com:80/main.html   | 是       | 同源（协议、域名、端口相同）              |

2、什么是同源策略

- 同源策略（英文全称 Same origin policy）是**浏览器**提供的一个安全功能。
- MDN 官方给定的概念：同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。
- 通俗的理解：浏览器规定，A 网站的 JavaScript，不允许和非同源的网站 C 之间，进行资源的交互，例如：
  ① 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB
  ② 无法接触非同源网页的 DOM
  ③ 无法向非同源地址发送 Ajax 请求

## 13.2 跨域

1、什么是跨域

- 同源指的是两个 URL 的协议、域名、端口一致，反之，则是跨域。
- 出现跨域的根本原因：浏览器的同源策略不允许非同源的 URL 之间进行资源的交互。

2、浏览器对跨域请求的拦截

- 注意：浏览器允许发起跨域请求，但是，跨域请求回来的数据，会被浏览器拦截，无法被页面获取到！

![在这里插入图片描述](https://img-blog.csdnimg.cn/f1a24d924ce241d9b9535125e3a61104.png#pic_center)

3、如何实现跨域数据请求

- 实现跨域数据请求，最主要的两种解决方案，分别是 JSONP 和 CORS。
- JSONP：出现的早，兼容性好（兼容低版本 IE）。是前端程序员为了解决跨域问题，被迫想出来的一种临时解决方
  案。缺点是只支持 GET 请求，不支持 POST 请求。
- CORS：出现的较晚，它是 W3C 标准，属于跨域 Ajax 请求的根本解决方案。支持 GET 和 POST 请求。缺点是不兼容某些低版本的浏览器。

## 13.3 JSONP

### 13.3.1 简介/原理/缺点

- JSONP (JSON with Padding) 是 JSON 的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题。
- 实现原理： 1.由于浏览器同源策略的限制，网页中无法通过 Ajax 请求非同源的接口数据。但是 `<script>` 标签不受浏览器同 源策略的影响，可以通过 src 属性，请求非同源的 js 脚本。 2.因此，JSONP 的实现原理，就是通过 `<script>` 标签的 src 属性，请求跨域的数据接口，并通过函数调用的形式，接收跨域接口响应回来的数据。

- 自己实现一个简单的 JSONP

```javascript
//1.定义一个  success 回调函数：
<script>
	function success(data) {
	console.log('获取到了data数据：');
	console.log(data);
}
</script>
//通过  <script> 标签，请求接口数据：
<script src="http://www.liulongbin.top:3006/api/jsonp?callback=success&name=zs&a
ge=20"></script>
```

- JSONP 的缺点
  由于 JSONP 是通过 `<script>` 标签的 src 属性，来实现跨域数据获取的，所以，JSONP 只支持 GET 数据请求，不支持 POST 请求。
- 注意：JSONP 和 Ajax 之间没有任何关系，不能把 JSONP 请求数据的方式叫做 Ajax，因为 JSONP 没有用到 XMLHttpRequest 这个对象。

![在这里插入图片描述](https://img-blog.csdnimg.cn/59278d68f8ca41099b2f0d3afe6dd55e.png#pic_center)

### 13.3.2 jQuery 中的 JSONP

- jQuery 提供的 $.ajax() 函数，除了可以发起真正的 Ajax 数据请求之外，还能够发起 JSONP 数据请求，例如：

```javascript
$(function () {
  // 发起JSONP的请求
  $.ajax({
    url: "http://www.liulongbin.top:3006/api/jsonp?name=zs&age=20",
    // 代表我们要发起JSONP的数据请求
    dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback: "abc",
    success: function (res) {
      console.log(res);
    },
  });
});
```

- 默认情况下，使用 jQuery 发起 JSONP 请求，会自动携带一个 `callback=jQueryxxx` 的参数，jQueryxxx 是随机生成的一个回调函数名称。
- 在使用 jQuery 发起 JSONP 请求时，如果想要自定义 JSONP 的参数以及回调函数名称，可以通过如下两个参数来指定：

```javascript
$.ajax({
  url: "http:///www.liulongbin.top:3006/api/jsonp?name=zs&age=20",
  dataType: "jsonp",
  // 发送到服务端的参数名称，默认值为callback，一般不会去改
  jsonp: "callback",
  // 自定义的回调函数名称，默认值为jQueryxxx 格式，可以改
  jsonpCallback: "abc",
  success: function (res) {
    console.log(res);
  },
});
```

jQuery 中 JSONP 的实现过程：

- jQuery 中的 JSONP，也是通过 `<script>` 标签的 src 属性实现跨域数据访问的，只不过，jQuery 采用的是动态创建和移除 `<script>` 标签的方式，来发起 JSONP 数据请求。
- 在发起 JSONP 请求的时候，动态向 `<header>` 中 append 一个 `<script>` 标签；
- 在 JSONP 请求成功以后，动态从 `<header>` 中移除刚才 append 进去的 `<script>` 标签；

# 14. 防抖与节流

## 14.1 防抖

- 防抖策略（debounce）是当事件被触发后，延迟 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。本质上就是以最后的操作为标准
- 防抖的应用场景：用户在输入框中连续输入一串字符时，可以通过防抖策略，只在输入完后，才执行查询的请求，这样可以有效减少请求次数，节约请求资源；
- 防抖的应用场景：
  ① 搜索框搜索，用户在不断输入值时，用防抖来节约请求资源。
  ② window 触发 resize 的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

```javascript
// 防抖动函数
function debounce() {
  let timer;
  return function () {
    if (timer) clearTimeout(timer); // 每次执行的时候把前一个 setTimeout clear 掉
    timer = setTimeout(() => {
      //业务代码
    }, 20);
  };
}
```

## 14.2 节流

- 节流策略（throttle），顾名思义，可以减少一段时间内事件的触发频率。只响应第一次(前面触发的执行结束前，忽略后面的事件)
- 节流的应用场景：
  ① 鼠标连续不断地触发某事件（如点击），只在单位时间内只触发一次；
  ② 懒加载时要监听计算滚动条的位置，但不必每次滑动都触发，可以降低计算的频率，而不必去浪费 CPU 资源；
- 节流阀的概念
  节流阀为空，表示可以执行下次操作；不为空，表示不能执行下次操作。
  当前操作执行完，必须将节流阀重置为空，表示可以执行下次操作了。
  每次执行操作前，必须先判断节流阀是否为空。

案例：图片跟随鼠标移动

```javascript
<body>
  <img src="./angel.gif" alt="" id="angel" />
  <script>
    $(function () {
      // 步骤1. 定义节流阀
      let timer = null;
      // 2. 绑定 mousemove 事件
      $(document).on('mousemove', function (e) {
        // 步骤3：判断节流阀是否为空
        if (timer) { return; }
        // 3. 设置图片的位置
        // 步骤2：开启延时器
        timer = setTimeout(function () {
          $('#angel').css('top', e.pageY + 'px').css('left', e.pageX + 'px');
          timer = null;
        }, 16)
      })
    })
  </script>
</body>
```

## 14.3 防抖和节流的区别

- 防抖：如果事件被频繁触发，防抖能保证只有最有一次触发生效！前面 N 多次的触发都会被忽略！
- 节流：如果事件被频繁触发，节流能够减少事件触发的频率，因此，节流是有选择性地执行一部分事件！
