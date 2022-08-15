---
title: Vue基础+指令+侦听器+计算属性+vue-cli
date: 2022/07/06 22:34
categories: [Vue, cli]
stick: false
description: Vue基础+指令+侦听器+计算属性+vue-cli
keyword: Vue
---

# 基础+指令+侦听器+计算属性+vue-cli

# 1. vue 简介

## 1.1 什么是 vue

Vue (读音 /vjuː/，类似于 view) 是一套用于**构建用户界面**的前端**框架**。
![在这里插入图片描述](https://img-blog.csdnimg.cn/de7812c8e5854642892a2920065f0cee.png#pic_center)

### 1.1.1 理解构建用户界面

前端开发者最主要的工作，就是为网站的使用者构建出美观、舒适、好用的网页。
![在这里插入图片描述](https://img-blog.csdnimg.cn/9df4144c271143e68e67a90c1b9e0e2f.png#pic_center)

### 1.1.2 构建用户界面的传统方式

在传统的 Web 前端开发中，是基于 jQuery + 模板引擎的方式来构建用户界面的。
![在这里插入图片描述](https://img-blog.csdnimg.cn/386d101b508745eb8b382b59434e36fd.png#pic_center)

### 1.1.3 使用 vue 构建用户界面

使用 vue 构建用户界面，解决了 jQuery + 模板引擎的诸多痛点，极大的提高了前端开发的效率和体验
![在这里插入图片描述](https://img-blog.csdnimg.cn/2adc4d51a95447568828242d020eb6ab.png#pic_center)

### 1.1.4 理解框架

官方给 vue 的定位是前端框架，因为它提供了构建用户界面的一整套解决方案（俗称 vue 全家桶）

- vue（核心库）
- vue-router（路由方案）
- vuex（状态管理方案）
- vue 组件库（快速搭建页面 UI 效果的方案）

辅助 vue 项目开发的一系列工具：

- vue-cli（npm 全局包：一键生成工程化的 vue 项目-基于 webpack、大而全）
- vite（npm 全局包：一键生成工程化的 vue 项目-小而巧）
- vue-devtools（浏览器插件：辅助调试的工具）
- vetur（vscode 插件：提供语法高亮和智能提示）

## 1.2 vue 的特性

① 数据驱动视图
② 双向数据绑定

### 1.2.1 数据驱动视图

在使用了 vue 的页面中，vue 会监听数据的变化，从而自动重新渲染页面的结构。示意图如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/99cda36cc6d946d690f79be4eb2a7be8.png)
好处：当页面数据发生变化时，页面会自动重新渲染！
注意：数据驱动视图是单向的数据绑定。

### 1.2.2 双向数据绑定

在填写表单时，双向数据绑定可以辅助开发者在不操作 DOM 的前提下，自动把用户填写的内容同步到数据源中。示意图如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/36d53759257d4b95a446ea0b7a97b992.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/1f69ba9fc8114757b7097112dd8756cf.png)
好处：开发者不再需要手动操作 DOM 元素，来获取表单元素最新的值！

## 1.3 MVVM

MVVM 是 vue 实现数据驱动视图和双向数据绑定的核心原理。MVVM 指的是 Model、View 和 ViewModel，它把每个 HTML 页面都拆分成了这三个部分，如图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/b969fc78174a4063a384454b7b73460f.png)
在 MVVM 概念中：

- Model 表示当前页面渲染时所依赖的数据源。
- View 表示当前页面所渲染的 DOM 结构。
- ViewModel 表示 vue 的实例，它是 MVVM 的核心。

## 1.4 MVVM 的工作原理

ViewModel 作为 MVVM 的核心，是它把当前页面的数据源（Model）和页面的结构（View）连接在了一起。
![在这里插入图片描述](https://img-blog.csdnimg.cn/c21947fc0bbc410b8a18a22191cafd27.png)

- 当数据源发生变化时，会被 ViewModel 监听到，VM 会根据最新的数据源自动更新页面的结构
- 当表单元素的值发生变化时，也会被 VM 监听到，VM 会把变化过后最新的值自动同步到 Model 数据源中

# 2. vue 的基本使用

## 2.1 基本使用步骤

① 导入 vue.js 的 script 脚本文件
② 在页面中声明一个将要被 vue 所控制的 DOM 区域
③ 创建 vm 实例对象（vue 实例对象）

```javascript
<body>
    <!-- 2. 希望vue能够控制这个div，帮我们把数据填充到div内部 -->
    <div id="app">{{ username }}</div>
    <!-- 1. 导入vue的库文件，在window全局就有了Vue这个构造函数 -->
    <script src="./lib/vue.js"></script>
    <script>
        <!-- 3. 创建Vue的实例对象 -->
        const vm = new Vue({
            // el属性是固定写法，表示当前vm实例要控制页面上的哪个区域，接收值是一个选择器
            el: '#app',
            // data 对象就是要渲染到页面上的数据
            data: {
                username: '凉宫',
            }
        })
    </script>
</body>
```

## 2.2 基本代码与 MVVM 的对应关系

![在这里插入图片描述](https://img-blog.csdnimg.cn/5f09ffbc32954b10a3e929f0332be3f3.png)

# 3. vue 的调试工具

## 3.1 安装

1、安装 vue-devtools 调试工具

- Chrome 浏览器在线安装 vue-devtools ：[谷歌商店安装(需要魔法)](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- 其他网站收录：[无需魔法](https://chrome.zzzmh.cn/#/extension)
- FireFox 浏览器在线安装 vue-devtools ：[火狐扩展安装](https://addons.mozilla.org/zh-CN/firefox/addon/vue-js-devtools/)
- 其他安装方式可自行百度
- 我这里是 5.3.4 版本的，[需要自取](https://wwi.lanzoup.com/iSx5U06yftpa)

## 3.2 配置

2、配置 Chrome 浏览器中的 vue-devtools
点击 Chrome 浏览器右上角的 设置 按钮，选择更多工具 -> 扩展程序 ->找到 Vue.js devtools 详细信息，并勾选如下的两个选项：
![在这里插入图片描述](https://img-blog.csdnimg.cn/ac4dde659e514b2d8bd3c5ea1d05c1e6.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/e4f04ea634eb4aebb1caf38412c4ec21.png#pic_center)

## 3.3 调试

在浏览器中访问一个使用了 vue 的页面，打开浏览器的开发者工具，切换到 Vue 面板，即可使用 vue-devtools 调试当前的页面。
![在这里插入图片描述](https://img-blog.csdnimg.cn/ccfdbaff137749ea93266b7f6447c63c.png#pic_center)

# 4. vue 的指令

## 4.1 指令的概念

- 指令（Directives）是 vue 为开发者提供的模板语法，用于辅助开发者渲染页面的基本结构。
- vue 中的指令按照不同的用途可以分为如下 6 大类：
  ① 内容渲染指令
  ② 属性绑定指令
  ③ 事件绑定指令
  ④ 双向绑定指令
  ⑤ 条件渲染指令
  ⑥ 列表渲染指令

## 4.2 内容渲染指令

内容渲染指令用来辅助开发者渲染 DOM 元素的文本内容。常用的内容渲染指令有如下 3 个：

- v-text
- {{ }}
- v-html

### 4.2.1 v-text

用法示例：

```javascript
<div id="app">
    <p v-text="username"></p>
</div>
<script>
	const vm = new Vue({
	    el: '#app',
	    data: {
	        username: '凉宫',
	    }
	})
</script>
```

注意：v-text 指令会覆盖元素内默认的值。

### 4.2.2 {{ }}插值语法

vue 提供的 {{ }} 语法，专门用来解决 v-text 会覆盖默认文本内容的问题。这种 {{ }} 语法的专业名称是**插值表达式**（英文名为：Mustache）。

```javascript
<div id="app">
    <p>{{ username }}</p>
</div>
<script>
	const vm = new Vue({
	    el: '#app',
	    data: {
	        username: '凉宫',
	    }
	})
</script>
```

注意：相对于 v-text 指令来说，插值表达式在开发中更常用一些！因为它不会覆盖元素中默认的文本内容。

### 4.2.3 v-html

v-text 指令和插值表达式只能渲染纯文本内容。如果要把包含 HTML 标签的字符串渲染为页面的 HTML 元素，则需要用到 v-html 这个指令：

```javascript
<div id="app">
    <div>{{ info }}</div>
    <div v-text="info"></div>
    <div v-html="info"></div>
</div>
<script>
	const vm = new Vue({
	    el: '#app',
	    data: {
	        info: '<h4 style="color: red">妮可妮可妮</h4>',
	    }
	})
</script>
```

渲染的结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/e89e684afb864e899aca60a21d1d9a4e.png#pic_center)
注意：v-html 有安全性问题

- 在网站上动态渲染任意的 html 是有危险的，容易导致 xss 攻击
- 要在可信内容上使用 v-html，不要用在用户提交的内容上

## 4.3 属性绑定指令

如果需要为元素的**属性**动态绑定属性值，则需要用到 v-bind 属性绑定指令；因为被该指令绑定的值会被当成**表达式**来解析

用法示例如下：

```javascript
<div id="app">
	<!-- 为input的placeholder属性动态绑定属性值 -->
    <input type="text" v-bind:placeholder="tips">
    <!-- 为img的src属性动态绑定属性值 -->
    <img v-bind:src="url">
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            tips: '请输入用户名',
            url: 'https://cn.vuejs.org/images/logo.svg',
        }
    })
</script>
```

- 简写形式

由于 v-bind 指令在开发中使用频率非常高，因此，vue 官方为其提供了简写形式（简写为英文的 `:` ）。

```javascript
<div id="app">
    <input type="text" :placeholder="tips">
    <img :src="url">
</div>
```

在使用 v-bind 属性绑定期间，如果绑定内容需要进行动态拼接，则字符串的外面应该包裹单引号，例如：

```xml
<div :title="'box' + index">这是一个 div</div>
```

## 4.4 使用 Javascript 表达式

在 vue 提供的模板渲染语法中，除了支持绑定简单的数据值之外，还支持 Javascript **表达式**的运算，例如：

```javascript
<div id="app">
    <div>1 + 2 结果：{{ 1 + 2 }}</div>
    <div>are you ok：{{ true? 'yes' : 'no' }}</div>
    <div>{{tips}} 翻转后的值为：{{tips.split('').reverse().join('')}}</div>
    <div :title="'box' + index">我是box3</div>
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            index: 3,
        }
    })
</script>
```

页面渲染结果如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/6c038599877e4ba9bfe27cd74ef7a723.png#pic_center)
注意：表达式 和 语句的区分

- 表达式：一个表达式可以产生一个值，可能是运算，函数调用，字面量；表达式可以放在任何需要值的地方
- 语句：可以理解为行为，如循环语句，判断语句；

## 4.5 事件绑定指令

vue 提供了 `v-on` 事件绑定指令，用来辅助程序员为 DOM 元素绑定事件监听。语法格式如下：

```javascript
<div id="app">
  <p>count的值为{{ count }}</p>
  <button v-on:click="add">加1</button>
  <button v-on:click="sub">减1</button>
</div>
```

注意：原生 DOM 对象有 onclick、oninput、onkeyup 等原生事件，替换为 vue 的事件绑定形式后， 分别为：`v-on:click`、`v-on:input`、`v-on:keyup`

### 4.5.1 methods 节点

通过 v-on 绑定的事件处理函数，需要在 methods 节点中进行声明；且不要写成箭头函数，否则 this 就不是 vm 实例或组件实例对象

```javascript
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            count: 0,
        },
        // methods的作用就是定义事件处理函数
        methods: {
           add: function () {
               // console.log(vm === this); //this表示当前vm实例
               //通过this可以访问到data中的数据
               this.count++;
           },
           // ES6简写，省去了: function,推荐这种写法
           sub() {
               this.count--;
           },
    })
</script>
```

### 4.5.2 简写形式

由于 v-on 指令在开发中使用频率非常高，因此，vue 官方为其提供了简写形式（简写为英文的 @ ）。

```javascript
<div id="app">
    <p>count的值为{{count}}</p>
    <button @click="add">加1</button>
    <button @click="sub">减1</button>
</div>
```

### 4.5.3 绑定事件并传参

在使用 v-on 指令绑定事件时，可以使用 `( )` 进行传参，示例代码如下：

```javascript
<div id="app">
    <p>count的值为{{count}}</p>
    <button @click="add(100)">加1</button>
    <button @click="sub(100)">减1</button>
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            count: 0,
        },
        // methods的作用就是定义事件处理函数
        methods: {
           add: function (n) {
               // console.log(vm === this); //this表示当前vm实例
               //通过this可以访问到data中的数据
               this.count += n;
           },
           // ES6简写，省去了: function,推荐这种写法
           sub(n) {
               this.count -= n;
           },
    })
</script>
```

### 4.5.4 事件参数对象

在原生的 DOM 事件绑定中，可以在事件处理函数的形参处，接收事件参数对象 event。同理，在 v-on 指令 （简写为 @ ）所绑定的事件处理函数中，同样可以接收到事件参数对象 event，示例代码如下：

```javascript
<div id="app">
    <button @click="changeColor">点我变色</button>
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            count: 1
        },
        methods: {
            changeColor(e) {
                this.count++;
                console.log(e);
                if (this.count % 2 == 0) {
                    e.target.style.backgroundColor = 'red';
                } else {
                    e.target.style.backgroundColor = '';
                }
            }
        }
    })
</script>
```

注意，如果不传参，则默认传入 event；如果传入参数，则会把默认参数覆盖掉。

### 4.5.5 $event

`$event` 是 vue 提供的特殊变量，用来表示原生的事件参数对象 event。`$event` 可以解决事件参数对象 event 被覆盖的问题。示例用法如下：

```javascript
<div id="app">
    <button @click="changeColor(1,$event)">点我</button>
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            count: 0
        },
        methods: {
            changeColor(step, e) {
                this.count += step;
                console.log(e);
                if (this.count % 2 == 0) {
                    e.target.style.backgroundColor = 'red';
                } else {
                    e.target.style.backgroundColor = '';
                }
            }
        }
    })
</script>
```

### 4.5.6 事件修饰符

在事件处理函数中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。因此，vue 提供了事件修饰符的概念，来辅助程序员更方便的对事件的触发进行控制。常用的 5 个事件修饰符如下：

| 事件修饰符   | 说明                                                      |
| ------------ | --------------------------------------------------------- |
| **.prevent** | 阻止默认行为（例如：阻止 a 连接的跳转、阻止表单的提交等） |
| **.stop**    | 阻止事件冒泡                                              |
| **.once**    | 绑定的事件只触发 1 次                                     |
| .capture     | 以捕获模式触发当前的事件处理函数                          |
| .self        | 只有在 event.target 是当前元素自身时触发事件处理函数      |

```javascript
<div id="app">
    <!-- 在事件 如 @click后面加上 .prevent 可以阻止事件默认行为 如链接的自动跳转 -->
    <a href="http://www.baidu.com" @click.prevent="show">百度</a>
    // 修饰符可以连用 ，如 @click.prevent.stop 先阻止默认行为，再阻止冒泡
</div>
<script>
    const vm = new Vue({
        el: '#app',
        methods: {
            show(e) {
                // e.preventDefault(); 原生做法
                console.log('点击了a链接');
            }
        }
    })
</script>
```

### 4.5.7 按键修饰符

在监听键盘事件时，我们经常需要判断详细的按键。此时，Vue 提供了键盘相关的事件添加按键修饰符，如下：
| 按键名 | 按键修饰符 |
|--|--|
| 回车 | enter |
| 退格或删除 | delete |
| 退出 | esc |
| 空格 | space |
| 换行(特殊，必须配合 keydown) | tab |
| 上 | up |
| 下 | down |
| 左 | left |
| 右 | right |

【示例】：

```javascript
<div id="app">
    <!-- 只有按下 enter键时， 调用submit submit自行在methods定义-->
    <input type="text" @keyup.enter="submit">
    <!-- 只有在按下 Esc时， 调用clearInput -->
    <input type="text" @keyup.esc="clearInput">
</div>
```

---

- Vue 未提供的按键修饰符，可以用按键原始的 key 值去绑定(KeyboardEvent.key)，但是有个别要转为短横线命名，如【CapsLock -> cpas-lock】
- 系统修饰符(用法特殊): ctrl、alt、shift、meta
  - 配合 keyup 使用：按下键的同时，再按下其他键，再释放其他键，事件才会被触发
  - 配合 keydown 使用：正常触发
- 可以通过 Vue.config.keyCodes.自定义键名 = 键码，定制 vue 按键修饰符

## 4.6 双向绑定指令

### 4.6.1 v-model 基本使用

vue 提供了 v-model 双向数据绑定指令，用来辅助开发者在不操作 DOM 的前提下，快速获取**表单**的数据。

```javascript
<div id="app">
    // v-model:value 可以简写为 v-model ;因为v-model默认收集的就是value的值
	// <input type="text" v-model:value="username">
    <input type="text" v-model="username">
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            username: '张三',
        },
    })
</script>
```

v-model 指令只能用于 **表单元素(输入类元素)** 如（input，textarea,select）

### 4.6.2 v-model 的修饰符

为了方便对用户输入的内容进行处理，vue 为 v-model 指令提供了 3 个修饰符，分别是：

| 修饰符  | 作用                           | 示例                             |
| ------- | ------------------------------ | -------------------------------- |
| .number | 自动将用户的输入值转为数值类型 | `<input v-model.number="age" />` |
| .trim   | 自动过滤用户输入的首尾空白字符 | `<input v-model.trim="msg" />`   |
| .lazy   | 在“change”时而非“input”时更新  | `<input v-model.lazy="msg" />`   |

示例：

```javascript
<div id="app">
        <input type="text" v-model.number="n1"> + <input type="text" v-model.number="n2"> = <span>{{n1 + n2}}</span>
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                n1: 2,
                n2: 3,
            },
        })
    </script>
```

### 4.6.3 收集表单数据注意事项

若是文本框：`<input type="text"/>`，则 v-model 收集的是 value 值，用户输入的就是 value 值。

若是单选按钮：`<input type="radio"/>`，则 v-model 收集的是 value 值，要明确给标签配置 value 值，否则收集到的数据为 null。

若：`<input type="checkbox"/>`

1. 没有配置 input 的 value 属性，那么收集的就是 checked（勾选 or 未勾选，是布尔值）
2. 配置 input 的 value 属性:
   (1)v-model 的初始值是非数组，那么收集的就是 checked（勾选 or 未勾选，是布尔值）
   (2)v-model 的初始值是数组，那么收集的数据就是 value 组成的数组

## 4.7 条件渲染指令

条件渲染指令用来辅助开发者按需控制 DOM 的**显示与隐藏**。条件渲染指令有如下两个，分别是：`v-if`，`v-show`

示例用法如

```javascript
<div id="app">
    <p v-if="flag">这个p标签被v-if 控制</p>
    <p v-show="flag">这个p标签被v-show控制</p>
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            flag: true,
        },
    })
</script>
// 也可以直接给定一个布尔值 true 或 false
<p v-if="true">被 v-if 控制的元素</p>
// 也可以给 v-if 提供一个判断条件，根据判断的结果是 true 或 false，来控制元素的显示和隐藏
<p v-if="type === 'A'">良好</p>
```

### 4.7.1 v-if 和 v-show 的区别

实现原理不同：

- v-if 指令会动态地创建或移除 DOM 元素，从而控制元素在页面上的显示与隐藏；
- v-show 指令会动态为元素添加或移除 style="display: none;" 样式，从而控制元素的显示与隐藏；

性能消耗不同：

- v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此：
  如果需要非常频繁地切换，则使用 v-show 较好，如果在运行时条件很少改变，则使用 v-if 较好
  > 在实际开发中，绝大多数情况，不用考虑性能问题，直接使用 v-if 就好了！！！

### 4.7.2 v-else(-if)

- v-if 可以单独使用，或配合 v-else 指令一起使用。里面可以直接放 true 或 false，也可以放表达式。
- v-else-if 指令，顾名思义，充当 v-if 的“else-if 块”，可以连续使用。
- `v-else` 和`v-else-if` 指令必须配合 `v-if` 指令一起使用，否则它将不会被识别！且结构连续，不能被其他标签打断

```javascript
<div id="app">
    <div v-if="type === 'A'">优秀</div>
    <div v-else-if="type === 'B'">良好</div>
    <div v-else>差</div>
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            type: 'A',
        },
    })
</script>
```

## 4.8 列表渲染指令

vue 提供了 `v-for` 列表渲染指令，用来辅助开发者基于一个数组来循环渲染一个列表结构。v-for 指令需要使用 `item in items` 形式的特殊语法，其中：
① items 是待循环的数组
② item 是被循环的每一项

```javascript
data: {
    list: [
        { id: 1, name: '张三'},
        { id: 2, name: '李四'}
    ]
}
// ==============
<ul>
    <li v-for="item in list"> 名字是：{{item.name}}</li>
</ul>
```

> v-for 其实还能遍历对象，字符串，但 不常用

### 4.8.1 v-for 中的索引

v-for 指令还支持一个可选的第二个参数，即当前项的索引。语法格式为 (item, index) in items，示例代码如下：

```javascript
data: {
    list: [
        { id: 1, name: '张三'},
        { id: 2, name: '李四'}
    ]
}
// ==============
<ul>
    <li v-for="(item, index) in list"> 索引是：{{index}}，名字是：{{item.name}}</li>
</ul>
```

注意：v-for 指令中的 item 项和 index 索引都是形参，可以根据需要进行重命名。例如 (user, i) in userlist

### 4.8.2 使用 key 维护列表的状态

- 当列表的数据变化时，默认情况下，vue 会尽可能的复用已存在的 DOM 元素，从而提升渲染的性能。但这种默认的性能优化策略，会导致有状态的列表无法被正确更新。
- 为了给 vue 一个提示，以便它能跟踪每个节点的身份，从而在保证有状态的列表被正确更新的前提下，提升渲染的性能。此时，需要为每项提供一个唯一的 key 属性：

```html
<ul>
  <!-- key的值不能重复，否则终端会报错：Duplicate key detected -->
  <li v-for="user in userlist" :key="user.id"></li>
</ul>
```

### 4.8.3 key 的注意事项

① key 的值只能是字符串或数字类型
② key 的值必须具有唯一性（即：key 的值不能重复）
③ 建议把数据项 id 属性的值作为 key 的值（因为 id 属性的值具有唯一性）
④ 使用 index 的值当作 key 的值没有任何意义（因为 index 的值不具有唯一性）
⑤ 建议使用 v-for 指令时一定要指定 key 的值（既提升性能、又防止列表状态紊乱）

## 4.9 其他指令

### 4.9.1 v-clock

- v-cloak 指令没有值
- 本质是一个特殊属性，Vue 实例创建完毕并接管容器后，会删掉 v-cloak 属性。
- 使用 css 如 `[v-cloak] { display: none }`配合 v-cloak 可以解决网速慢时页面展示出{{xxx}}的问题(防止未经解析的模板出现在页面上)。

```css
<style>
  [v-cloak] {
    display: none;
  }
</style>
```

```html
<div id="root">
  <h2 v-cloak>{{name}}</h2>
</div>
```

### 4.9.2 v-once

- v-once 所在元素/组件及其所有的子节点在初次动态渲染后，就视为静态内容了。
- 以后数据的改变不会引起 v-once 所在结构的更新，可以用于优化性能。

```javascript
<div id="root">
	<h2 v-once>初始化的n值是:{{n}}</h2>
	<h2>当前的n值是:{{n}}</h2>
	<button @click="n++">点我n+1</button>
</div>
```

### 4.9.3 v-pre

v-pre 指令：跳过其所在元素和它的子元素的编译过程。
可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。

```javascript
<h2 v-pre>这里不会别vue拉去编译</h2>
```

# 5. 过滤器(Vue3 中已弃用)

过滤器（Filters）是 vue 为开发者提供的功能，常用于文本的格式化。过滤器可以用在两个地方：插值表达式和 v-bind 属性绑定。

过滤器应该被添加在 JavaScript 表达式的尾部，由“管道符”进行调用，示例代码如下：

```javascript
<!-- 在插值表达式中，通过"管道符 | " 调用capitalize 过滤器，对message的值进行格式化 -->
<p>{{ message | capitalize}}</p>
<!--  在v-bind中，通过"管道符 | " 调用formatId 过滤器，对rawId的值进行格式化  -->
<div v-bind:id="rawId | formatId"></div>
```

## 5.1 定义过滤器

在创建 vue 实例期间，可以在 filters 节点中定义过滤器，示例代码(转首字母大写)如下

```javascript
const vm = new Vue({
  el: "#app",
  data: {
    message: "hello vue.js",
  },
  filters: {
    // 过滤器函数形参中的val,永远是管道符前面的那个值
    capitalize(val) {
      //过滤器中一定要有返回值
      const first = val.charAt(0).toUpperCase();
      const last = val.slice(1);
      return first + last;
    },
  },
});
```

注意点

- 要定义到 filters 节点下，**本质是一个函数**
- 在过滤器函数中，**一定要有 return 值**
- 在过滤器的形参中，可以获取到“管道符”前面待处理的那个值

## 5.2 私有过滤器和全局过滤器

- 在 filters 节点下定义的过滤器，称为“私有过滤器”，因为它只能在当前 vm 实例所控制的 el 区域内使用。
- 如果希望在多个 vue 实例之间共享过滤器，则可以按照如下的格式定义全局过滤器：

```javascript
// Vue.filter()方法接收两个参数
// 第一个参数，是全局过滤器的名字
// 第二个参数，是全局过滤器的处理函数
Vue.filter("capitalize", (str) => {
  const first = str.charAt(0).toUpperCase();
  const last = str.slice(1);
  return first + last;
});
```

- 注意：如果全局过滤器和私有过滤器名字一致，此时按照“**就近原则**”，调用的是”私有过滤器“

## 5.3 连续调用多个过滤器

过滤器可以串联地进行调用，例如：

```html
<!-- 1. 把message 的值，交给 filterA 进行处理 -->
<!-- 2. 把filterA 处理的结果，再交给filterB处理-->
<!-- 3. 最终把filterB的处理结果，作为最终的值渲染到页面上 -->
{{ message | filterA | filterB }}
```

## 5.4 过滤器传参

过滤器的本质是 JavaScript 函数，因此可以接收参数，格式如下：

```javascript
<!-- arg1 和 arg2 是传递给filterA的参数 -->
<p>{{ message | filterA(arg1, arg2) }}}</p>
<!-- 过滤器处理函数的形参列表中 -->
// 第一个参数： 永远都是“管道符”前面的待处理的值
// 第二个参数开始,才是调用过滤器时传递过来的arg1 和arg2 参数
Vue.filter('filterA', (msg,arg1,arg2) => {
    // 过滤器代码逻辑
})
```

## 5.5 过滤器的兼容性

- 过滤器仅在 vue 2.x 和 1.x 中受支持，在 vue 3.x 的版本中剔除了过滤器相关的功能。
- 如果使用的是 2.x 版本的 vue，则依然可以使用过滤器相关的功能，如果项目已经升级到了 3.x 版本的 vue，官方建议使用计算属性或方法代替被剔除的过滤器功能
- 故本章过滤器内容做了解即可

# 6. 计算属性

## 6.1 什么是计算属性

- 计算属性定义时是一个 function 函数，它可以实时监听 data 中数据的变化，并 return 一个计算后的新值，供组件渲染 DOM 时使用。
- 这个动态计算出来的属性值可以被模板结构或 methods 方法使用。示例代码如下：

```javascript
<div class="box" :style="{ backgroundColor: rgb }">
    {{ rgb }}
</div>
<button @click="show">按钮</button>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            r: 0,
            g: 0,
            b: 0
        },
        methods: {
            // 点击按钮，在终端显示最新的颜色
            show() {
                console.log(this.rgb);
            }
        },
        // 所有的计算属性，都要定义到computed节点下，
        computed: {
		// 计算属性在定义的时候，要定义成""方法格式"
       // 最终，在这个方法中，要返回一个生成好的 rgb(x,x,x) 的字符串
            rgb() {
                return `rgb(${this.r}, ${this.g}, ${this.b})`;
            }
        }
    });
</script>
```

## 6.2 计算属性的特点

① 计算属性必须定义在 computed 节点中
② 虽然计算属性在声明的时候被定义为**function 函数**，但是计算属性的本质是一个属性,在使用计算属性的时候，当普通的属性使用即可
③ 计算属性侧重于得到一个计算的结果，因此计算属性中必须有 **return** 返回值！
④ 计算属性会缓存计算的结果，只有计算属性依赖的数据变化或初次读取该属性时，才会重新进行运算
⑤ 实现了代码的复用

## 6.3 计算属性 vs 方法

相对于方法来说，计算属性会缓存计算的结果，只有计算属性的依赖项发生变化时，才会重新进行运算。因此计算属性的性能更好：

```javascript
<template>
  <div>
    <input type="text" v-model.number="count" />
    <p>{{ count }}的值 * 2 为{{ plus2() }}</p> //计算属性和普通方法都调用2次
    <p>{{ count }}的值 * 2 为{{ plus2() }}</p> //普通方法执行2次
    <p>{{ count }}的值 * 2 为{{ plus }}</p> // 计算属性因为依赖项没变，只执行一次
    <p>{{ count }}的值 * 2 为{{ plus }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    plus() {
      // 计算属性的计算结果会被缓存，性能好
      console.log("计算属性被执行了");
      return this.count * 2;
    },
  },
  methods: {
    plus2() {
      // 方法的计算结果不会被缓存，性能低
      console.log("方法被执行了");
      return this.count * 2;
    },
  },
};
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/bc926fc0072b4bd28eab0663bc662477.png#pic_center)

# 7. 侦听器

## 7.1 什么是 watch 侦听器

watch 侦听器允许开发者监视数据的变化(不止 data 中，vm 实例上的属性都可监听)，从而针对数据的变化做特定的操作。
开发者需要在 **watch** 节点下，定义自己的侦听器。实例代码如下：

```javascript
<div id="app">
    <input type="text" v-model="username">
</div>
const vm = new Vue({
   el: '#app',
   data: {
       username: 'zs',
   },
   // 所有的侦听器，都应该被定义到 watch节点下
   watch: {
       // 侦听器的本质是一个函数, 要监视哪个数据的变化，就把数据名作为方法名
       // 参数：新值在前，旧值在后
       username(newVal, oldVal) {
       		console.log(newVal, oldVal);
       }
   }
})
```

方法对象格式如下：

```javascript
<div id="app">
    <input type="text" v-model="username">
</div>
const vm = new Vue({
   el: '#app',
   data: {
       username: 'zs',
   },
   watch: {
		username: {
			// 侦听器的处理函数
			handler(newVal, oldVal) {
			console.log(newVal, oldVal);
			// immediate 选项的默认值是false,控制侦听器是否自动触发一次
			// 适用于需要在页面一打开就触发的场景
			immediate: true,
		}
   }
})
```

- 示例：使用 watch 检测用户名是否可用
  监听 username 值的变化，并使用 jquery 发起 Ajax 请求，检测当前输入的用户名是否可用：

```javascript
const vm = new Vue({
  el: "#app",
  data: {
    username: "admin",
  },
  watch: {
    username(newVal) {
      if (newVal === "") return;
      // 1. 调用 jQuery 中的 Ajax 发起请求，判断 newVal 是否被占用！！！
      $.get("https://www.escook.cn/api/finduser/" + newVal, function (result) {
        console.log(result);
      });
    },
  },
});
```

## 7.2 immediate 选项

默认情况下，组件在初次加载完毕后不会调用 watch 侦听器。如果想让 watch 侦听器立即被调用，则需要使用 `immediate` 选项。示例代码如下：

```javascript
watch: {
    username: {
        handler(newVal, oldVal) {
            if (newVal === '') return;
            console.log(newVal, oldVal);
            $.get("https://www.escook.cn/api/finduser/" + newval, function (res) {
                console.log(res);
            })
        },
        // immediate 选项的默认值是false,控制侦听器是否自动触发一次
        // 适用于需要在页面一打开就触发的场景
        immediate: true,
    }
}
```

## 7.3 deep 选项

如果 watch 侦听的是一个对象，如果对象中的属性值发生了变化，则无法被监听到。此时需要使用 `deep` 选项，代码示例如下：

```javascript
<div id="app">
    <input type="text" v-model="info.username">
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            info: {
                username: 'zs',
            }
        },
        watch: {
            info: {
                // 侦听器的处理函数
                handler(newVal, oldVal) {
                    if (newVal === '') return;
                    console.log(newVal, oldVal);
                    $.get("https://www.escook.cn/api/finduser/" + newVal, function (res) {
                        console.log(res);
                    })
                },
                immediate: true,
                // 开启深度监听，只要对象中的任何属性变化了，就会触发"对象的侦听器"
                deep: true,
            }
        },
    })
</script>
```

## 7.4 监听对象单个属性的变化

如果只想监听对象中单个属性的变化，则可以按照如下的方式定义 watch 侦听器：

```javascript
<div id="app">
    <input type="text" v-model="info.username">
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            info: {
                username: 'zs',
            }
        },
        watch: {
			'info.username'(newVal){
				console.log(newVal);
			}
        },
    })
</script>
```

> 方法格式的侦听器 VS 对象格式的侦听器
>
> - 方法格式的侦听器
>   - 缺点 1：无法在刚进入页面的时候，自动触发！！！
>   - 缺点 2：如果侦听的是一个对象，如果对象中的属性发生了变化，不会 触发侦听器！！！
> - 对象格式的侦听器
>   - 好处 1：可以通过 **immediate** 选项，让侦听器自动触发！！！
>   - 好处 2：可以通过 **deep** 选项，让侦听器深度监听对象中每个属性> 的变化！！！

## 7.5 计算属性 vs 侦听器

计算属性和侦听器侧重对比：

- computed 能完成的功能，watch 都能完成。反之不行，侦听器中可以写异步任务。
- 计算属性侧重于监听多个值的变化，最终计算并返回一个新值
- 侦听器侧重于监听单个数据的变化，最终执行特定的业务处理，不需要有任何返回值
  > 提醒
  > 被 vue 管理的函数最好写成普通函数，这样 this 才指向 vm 实例或组件实例
  > 所有不被 Vue 管理的函数(如：定时器的回调函数，ajax 的回调)，最好写成箭头函数，这样 this 才指向 vm 实例或组件实例

# 8. vue-cli

## 8.1 单页面应用程序

### 8.1.1 什么是单页面应用程序

- 单页面应用程序（英文名：Single Page Application）简称 SPA，顾
  名思义，指的是一个 Web 网站中只有唯一的一个 HTML 页面，所有的
  功能与交互都在这唯一的一个页面内完成。
- 例如下面的这个 Demo 项目：

![在这里插入图片描述](https://img-blog.csdnimg.cn/1c8897403f94450d8d0e7d9f517384de.png)

### 8.1.2 单页面应用程序的特点

- 单页面应用程序将所有的功能局限于一个 web 页面中，**仅在该 web 页面初始化时加载相应的资源**（ HTML、JavaScript 和 CSS）。
- 一旦页面加载完成了，SPA **不会**因为用户的操作而**进行页面的重新加载或跳转**。而是利用 JavaScript 动态地变换 HTML 的内容，从而实现页面与用户的交互。

### 8.1.3 单页面应用程序的优点

SPA 单页面应用程序最显著的 3 个优点如下：

① 良好的交互体验

- 单页应用的内容的改变不需要重新加载整个页面
- 获取数据也是通过 Ajax 异步获取
- 没有页面之间的跳转，不会出现“白屏现象”

② 良好的前后端工作分离模式

- 后端专注于提供 API 接口，更易实现 API 接口的复用
- 前端专注于页面的渲染，更利于前端工程化的发展

③ 减轻服务器的压力

- 服务器只提供数据，不负责页面的合成与逻辑的处理，吞吐能力会提高几倍

### 8.1.4 单页面应用程序的缺点

任何一种技术都有自己的局限性，对于 SPA 单页面应用程序来说，主要的缺点有如下两个：

- **首屏加载慢**
  解决方案：路由懒加载、代码压缩、CDN 加速、网络传输压缩等
- **不利于 SEO**
  解决方案：SSR 服务器端渲染

### 8.1.5 如何快速创建 vue 的 SPA 项目

vue 官方提供了两种快速创建工程化的 SPA 项目的方式：
① 基于 **vite** 创建 SPA 项目
② 基于 **vue-cli** 创建 SPA 项目

|                            | vite               | vue-cli                |
| -------------------------- | ------------------ | ---------------------- |
| 支持的 vue 版本            | 仅支持 vue3.x      | 支持 3.x 和 2.x        |
| 是否基于 webpack           | 否                 | 是                     |
| 运行速度                   | 快                 | 较慢                   |
| 功能完整度                 | 小而巧（逐渐完善） | 大而全                 |
| 是否建议在企业级开发中使用 | 目前不建议         | 建议在企业级开发中使用 |

## 8.2 什么是 vue-cli

- vue-cli 是 Vue.js 开发的标准工具。它**简化**了程序员基于 **webpack** 创建工程化的 Vue 项目的过程。程序员可以专注在撰写应用上，而不必花好几天去纠结 webpack 配置的问题。
- 特点：
  ① 开箱即用
  ② 基于 webpack
  ③ 功能丰富且易于扩展
  ④ 支持创建 vue2 和 vue3 的项目
- 中文官网：[https://cli.vuejs.org/zh/](https://cli.vuejs.org/zh/)

## 8.3 安装和使用

### 8.3.1 安装

vue-cli 是 npm 上的一个全局包，使用 npm install 命令，即可方便的把它安装到自己的电脑上：

```shell
npm install -g @vue/cli
```

通过 `vue -V`或`vue -version`查看版本即可确认是否成功安装
![在这里插入图片描述](https://img-blog.csdnimg.cn/0a7f0542b45c408e9f50823c7a1bdb90.png#pic_center)

> **解决 Windows PowerShell 不识别 vue 命令的问题** > ![在这里插入图片描述](https://img-blog.csdnimg.cn/2728c5b532324fbcbe3cff877b799722.png)
> 解决方案如下：
> ① 以管理员身份运行 PowerShell
> ② 执行 set-ExecutionPolicy RemoteSigned 命令
> ③ 输入字符 Y ，回车即可

### 8.3.2 创建项目

vue-cli 提供了创建项目的两种方式：

```ruby
基于[命令行]的方式创建vue项目
vue create 项目的名称
基于[可视化面板]创建vue项目
vue ui
```

### 8.3.3 基于命令行创建 vue 项目

**vue-cli 创建项目步骤**
1、选择自动构建 vue2 或 vue3 项目，或手动构建。建议手动，下面也是手动的步骤
![在这里插入图片描述](https://img-blog.csdnimg.cn/cf1ef0d8558a4a828028063a90f95ad6.png#pic_center)
2、选择项目需要的配置
![在这里插入图片描述](https://img-blog.csdnimg.cn/819f3178489443c786e847e3b7e1f971.png#pic_center)
3、 选择 vue 版本
![在这里插入图片描述](https://img-blog.csdnimg.cn/c297aae191064dd9b596b20c3aae478d.png#pic_center)
4、选择你要用的 css 预处理器
![在这里插入图片描述](https://img-blog.csdnimg.cn/4b2f9b3ec14f4a9ead3139b89835e63a.png#pic_center)
5、选择 Babel，ESLint 的等配置的存放位置
![在这里插入图片描述](https://img-blog.csdnimg.cn/fb9caa7dec8f4f4e8daea91aded5216d.png#pic_center)
6、是否把以上选择都作为将来所有项目的预设，因为每个项目的需求和特征都不同，所以最好每次都选择一遍！
![在这里插入图片描述](https://img-blog.csdnimg.cn/232cc85192644dbfac2acb5713439108.png#pic_center)
7、项目构建成功了
![在这里插入图片描述](https://img-blog.csdnimg.cn/ac7f41abd1f94f88a68e56a7b52afaea.png#pic_center)
8、试着启动项目
cd 进入项目根目录，`npm run serve`启动项目
![在这里插入图片描述](https://img-blog.csdnimg.cn/fe401f57253f434192b8b6328f5cd018.png#pic_center)

### 8.3.4 基于 vue ui 创建 vue 项目

步骤 1：在终端下运行 vue ui 命令，自动在浏览器中打开创建项目的可视化面板：
![在这里插入图片描述](https://img-blog.csdnimg.cn/f375a39ad9ed451a9aa0bc193d24b61f.png)
步骤 2：在详情页面填写项目名称：
![在这里插入图片描述](https://img-blog.csdnimg.cn/7d5d228f8a464117b86c24b36e049d6f.png)
步骤 3：在预设页面选择手动配置项目：
![在这里插入图片描述](https://img-blog.csdnimg.cn/8b1aac24161a4b398ce294c3b9dd85c6.png#pic_center)
步骤 4：在功能页面勾选需要安装的功能（Choose Vue Version、Babel、CSS 预处理器、使用配置文件）：
![在这里插入图片描述](https://img-blog.csdnimg.cn/aa2e254e41b642f19b6438441d3be139.png#pic_center)
步骤 5：在配置页面勾选 vue 的版本和需要的预处理器：
![在这里插入图片描述](https://img-blog.csdnimg.cn/6ee4732b660b43e38efe1824b552b0ee.png#pic_center)
步骤 6：将刚才所有的配置保存为预设（模板），方便下一次创建项目时直接复用之前的配置：
![在这里插入图片描述](https://img-blog.csdnimg.cn/cfa9fe1744114401aa5c52e5f4233607.png)
步骤 7：等待项目创建并自动安装依赖包：
![在这里插入图片描述](https://img-blog.csdnimg.cn/4794cd3808844664831dba9886115eeb.png)
vue ui 的本质：通过可视化的面板采集到用户的配置信息后，在后台基于命令行的方式自动初始化项目：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20c7e83d81d7410e822f8a538e17deab.png)
项目创建完成后，自动进入项目仪表盘：
![在这里插入图片描述](https://img-blog.csdnimg.cn/fe432ac587964c649c8efac3aa6f9e51.png)

## 8.4 vue 项目的运行流程

在工程化的项目中，vue 要做的事情很单纯：通过 main.js 把 App.vue 渲染到 index.html 的指定区域中。其中：

- ① App.vue 用来编写待渲染的模板结构
- ② index.html 中需要预留一个 el 区域
- ③ main.js 把 App.vue 渲染到了 index.html 所预留的区域中

## 8.5 vue 项目文件一览

各文件功能介绍

- assets 文件夹：存放项目中用到的静态资源文件，例如：css 样式表、图片资源
- components 文件夹：程序员封装的、可复用的组件，都要放到 components 目录下
- main.js 是项目的入口文件。整个项目的运行，要先执行 main.js
- App.vue 是项目的根组件。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/a57f04059a4544e9b0707ee2e8afcc97.png#pic_center)

---

**main.js**文件分析

```javascript
// 导入 vue 这个包，得到 Vue 构造函数
import Vue from "vue";
// 导入 App.vue 根组件，将来要把 App.vue 中的模板结构，渲染到 HTML 页面中，是所有组件的父组件
import App from "./App.vue";
//import Test from './Test.vue'
// 关闭vue的生产提示
Vue.config.productionTip = false;
// 创建 Vue 的实例对象
new Vue({
  // 把 render 函数指定的组件，渲染到 HTML 页面中
  render: (h) => h(App), //render函数中，渲染的是哪个.vue组件，那么这个组件就叫做 “根组件”
  /* 
关于不同版本的Vue，打开modules找到vue包即可查看：
1.vue.js 与 vue.runtime.xxx.js 的区别：
(1).vue.js是完整版的Vue，包含：核心功能+模板解析器。
(2).vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容。
*/
}).$mount("#app");
// Vue 实例的 $mount() 方法，作用和 el: '#app' 属性完全一样！都是用来绑定控制区域的
```

---

**APP.vue** 文件分析
一般包含三部分 `<template></template>`，`<script></script>`，`<style></style>`

```javascript
// 本组件的页面结构放template里面
<template>
<!-- 注意：这个template里的内容会替换掉控制的区域 -->
<!-- 例如就是会把 <div id="app"></div>替换掉，不是填充进去  -->
  <div>
    <div class="test-box">
      <h3> {{ username }} </h3>
      <button @click="changename">修改用户名</button>
    </div>
    <div>123</div>
  </div>
</template>
// 本组件 js区域，放数据，写交互等
<script>
// 默认导出。这是固定写法！
export default {
  // data 数据源
  // 注意：.vue 组件中的 data 不能像之前一样，不能指向对象。
  // 注意：组件中的 data 必须是一个函数
  data() {
    // 这个 return 出去的 { } 中，可以定义数据
    return {
      username: 'admin'
    }
  },
  methods: {
    changename() {
      // 在组件中， this 就表示当前组件的实例对象
      console.log(this)
      this.username = '哇哈哈'
    }
  },
  // 当前组件中的侦听器
  watch: {},
  // 当前组件中的计算属性
  computed: {},
  // 当前组件中的过滤器
  filters: {}
}
</script>
// 本组件样式区域 可以通过lang属性指定 less 或 scss等预编译
<style lang="less"> //<style lang="scss">
.test-box {
  background-color: pink;
  h3 {
    color: red;
  }
}
</style>
```

---

**public/index.html** 文件分析

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <!-- 针对IE浏览器的一个特殊配置，含义是让IE浏览器以最高的渲染级别渲染页面 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- 开启移动端的理想视口 -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <!-- 配置页签图标 -->
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <!-- 引入第三方样式 -->
    <link rel="stylesheet" href="<%= BASE_URL %>css/bootstrap.css" />
    <!-- 配置网页标题 -->
    <title>Vue</title>
  </head>
  <body>
    <!-- 当浏览器不支持js时noscript中的元素就会被渲染 -->
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      >
    </noscript>
    <!-- 容器 -->
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

---

**vue.config.js**文件分析

- 使用 `vue inspect > output.js` 可以查看 vue 脚手架给你的默认配置，但在 output.js 里面的修改不会生效，仅有查看作用。
- vue.config.js 是可选的配置文件，它可以对脚手架进行个性化定制(根据在 vue.config.js 中的配置覆盖脚手架中的相应的默认配置)，详见[https://cli.vuejs.org/zh/config/](https://cli.vuejs.org/zh/config/)

```javascript
module.exports = {
  pages: {
    index: {
      //入口
      entry: "src/main.js",
    },
  },
  lintOnSave: false, //关闭语法检查
  //开启代理服务器（方式一）
  /* devServer: {
    proxy: 'http://localhost:5000'
  }, */
  //开启代理服务器（方式二）
  devServer: {
    proxy: {
      "/atguigu": {
        target: "http://localhost:5000",
        pathRewrite: { "^/atguigu": "" },
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      },
      "/demo": {
        target: "http://localhost:5001",
        pathRewrite: { "^/demo": "" },
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      },
    },
  },
};
```
