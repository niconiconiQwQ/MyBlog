---
title: 路由 + axios
date: 2022/07/14 21:44
categories: [axios]
stick: false
description: 路由 + axios
keyword: axios
---

# 路由+axios

# 1.路由的概念与原理

## 1.1 什么是路由

- 理解：一个路由（route）就是一组映射关系（key - value），key 为路径, value 可能是 function 或 component，多个路由需要路由器（router）进行管理。
- 路由分为两大类：
  ① 后端路由：value 是 function, 用于处理客户端提交的请求
  ② 前端路由：value 是 component，用于展示页面内容。

### 1.1.1 前端路由

通俗易懂的概念：Hash 地址与组件之间的对应关系。Hash 地址就是`<a>`标签的锚点链接
工作过程：当浏览器的路径改变时, 对应的组件就会显示。

### 1.1.2 后端路由

工作过程：服务器接收到一个请求时, 根据请求路径找到匹配的函数来处理请求, 返回响应数据。

后端路由指的是：请求方式、请求地址与 function 处理函数之间的对应关系。在 node.js 中，基于 express 框架路由的基本用法如下：

```javascript
const express = require("express");
const router = express.Router();
router.get("/userlist", function (req, res) {
  /* 路由的处理函数*/
});
router.post("/userlist", function (req, res) {
  /* 路由的处理函数*/
});
module.export = router;
```

## 1.2 SPA 与前端路由

- SPA（single page web application) 指的是一个 web 网站只有唯一的一个 HTML 页面，所有组件的展示与切换都在这唯一的一个页面内完成。点击页面中的导航链接不会刷新页面，只会做页面的局部更新，数据需要通过 ajax 请求获取。
- 在 SPA 的项目中，不同功能之间的切换，要依赖于前端路由来完成！

## 1.3 前端路由的工作方式

① 用户点击了页面上的**路由链接**
② 导致了 URL **地址栏**中的 **Hash 值**发生了变化
③ 前端路由**监听**了到 **Hash 地址**的**变化**
④ 前端路由把当前 **Hash 地址对应的组件**渲染都浏览器中
![在这里插入图片描述](https://img-blog.csdnimg.cn/46d35eac716a43f2be1c3257bf5ac5cb.png)
结论：前端路由，指的是 Hash 地址与组件之间的对应关系！

## 1.4 实现简易的前端路由

步骤 1：导入并注册 Home、Movie、About 三个组件
步骤 2：通过 `<component>` 标签 **is** 属性，动态切换要显示的组件。
步骤 3：在 App.vue 组件中，为 `<a>` 链接添加对应的 hash 值
步骤 4：在 created 生命周期函数中，监听浏览器地址栏中 hash 地址的变化，动态切换要展示的组件的名称

```javascript
<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <!-- 为a标签添加对应的hash值 -->
    <a href="#">首页</a>
    <a href="#">电影</a>
    <a href="#">关于</a>
    <!-- 2.1 通过 is 属性，指定要展示的组件的名称 -->
    <component :is="comName"></component>
    <hr />
  </div>
</template>

<script>
// 1.1 导入并注册 Home、Movie、About 三个组件
import Home from "@/components/Home.vue";
import Movie from "@/components/Movie.vue";
import About from "@/components/About.vue";

export default {
  name: "App",
  data() {
    return {
      // 2.2 要展示的组件名称，值必须为字符串
      comName: "Home",
    };
  },
  // 1.2 注册组件
  components: {
    Home,
    Movie,
    About,
  },
  created() {
    // 当前App组件一被创建，就立即监听window对象的onhashchange事件
    window.onhashchange = () => {
      // URL中#后面的部分改变时就会触发hashchange事件
      switch (
        location.hash // 通过location.hash 拿到#即后面的URL片段内容
      ) {
        case "#/home":
          this.comName = "Home";
          break;
        case "#/movie":
          this.comName = "Movie";
          break;
        case "#/about":
          this.comName = "About";
          break;
      }
    };
  },
};
</script>
```

# 2. vue-router 的基本使用

## 2.1 什么是 vue-router

- ue-router 是 vue.js 官方给出的路由解决方案。它只能结合 vue 项目进行使用，能够轻松的管理 SPA 项目中组件的切换。
- vue-router 的官方文档地址：[https://router.vuejs.org/zh/](https://router.vuejs.org/zh/)

## 2.2 vue-router 安装和配置的步骤

① 安装 vue-router 包
② 创建路由模块
③ 导入并挂载路由模块
④ 声明路由链接和占位符

### 2.2.1 在项目中安装 vue-router

在 vue2 的项目中，安装 vue-router 的命令如下：

```shell
npm i vue-router@3.5.2 -S
```

注意：vue3 中用 vue-router 4x，vue2 中用 vue-router 3x

### 2.2.2 创建路由模块

在 src 源代码目录下，新建 router/index.js 路由模块，并初始化如下的代码：

```javascript
// src/router/index.js 就是当前项目的路由模块
// 1. 导入Vue 和 VueRouter的包
import Vue from "vue";
import VueRouter from "vue-router";
// 2.调用 Vue.use()函数，把VueRouter安装为Vue项目的插件
// Vue.use()函数的作用，就是用来安装插件的
Vue.use(VueRouter);
// 3. 创建路由的实例对象
const router = new VueRouter();
// 4. 向外共享路由的实例对象
export default router;
```

### 2.2.3 导入并挂载路由模块

在 src/main.js 入口文件中，导入并挂载路由模块。示例代码如下：

```javascript
import Vue from "vue";
import App from "./App.vue";
// 导入路由模块，目的是拿到路由的实例对象
// 在进行模块化导入的时候，如果给定的是文件夹，则默认导入这个文件夹下的index.js文件
// import router from "@/router/index.js";
import router from "@/router";
new Vue({
  render: (h) => h(App),
  // 在Vue项目中，要把路由用起来，必须把路由实例对象，通过下面的方式进行挂载
  // router: 路由的实例对象
  // router: router,
  //在ES6中，若对象属性名和本地变量名相同时，赋值可以省略冒号和值，直接写属性
  router,
}).$mount("#app");
```

### 2.2.4 声明路由链接和占位符

在 src/App.vue 组件中，使用 vue-router 提供的 `<router-link>` 和 `<router-view>` 声明路由链接和占位符：

```xml
<template>
  <div class="app-container">
    <h1>App2 组件</h1>
    <!-- 1. 定义路由链接 -->
    <a href="#/home"></a>
    <a href="#/movie"></a>
    <a href="#/about"></a>
    <hr />
    <!-- 2. 定义路由的占位符 -->
    <!-- 只要在项目中安装和配置了vue-router，就可以使用 router-view 组件了 -->
    <!-- 它的作用就是占位符 -->
    <router-view></router-view>
  </div>
</template>
```

把`<a>`链接改为`<router-link>`，to 属性相当于 href，但 to 的属性值省去了`#`，

```xml
<template>
  <div class="app-container">
    <h1>App2 组件</h1>
    <!-- 1. 定义路由链接 -->
    <!-- 当安装和配置了vue-router后，就可以使用router-link来代替普通的a链接-->
    <router-link to="/home"></router-link>
    <router-link to="/movie"></router-link>
    <router-link to="/about"></router-link>
    <hr />
    <!-- 2. 定义路由的占位符 -->
    <!-- 只要在项目中安装和配置了vue-router，就可以使用 router-view 组件了 -->
    <!-- 它的作用就是占位符 -->
    <router-view></router-view>
  </div>
</template>
```

### 2.2.5 声明路由的匹配规则

在 src/router/index.js 路由模块中，通过 routes 数组声明路由的匹配规则。示例代码如下：

```javascript
import Vue from "vue";
import VueRouter from "vue-router";
// 2. 导入需要使用路由切换展示的组件
import Home from "@/components/Home.vue";
import Movie from "@/components/Movie.vue";
import About from "@/components/About.vue";
Vue.use(VueRouter);
// 2. 创建路由的实例对象，并传入参数
const router = new VueRouter({
  // routes 是一个数组，用来定义 “hash”与“组件”之间的对应关系
  // path表示要匹配的hash地址，这里不带#；component表示要展示的路由组件
  routes: [
    { path: "/home", component: Home }, // 这些叫做路由规则
    { path: "/movie", component: Movie },
    { path: "/about", component: About },
  ],
});
export default router;
```

注意点:

1. 路由组件通常存放在`pages或views`文件夹，一般组件通常存放在`components`文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息。
4. 整个应用只有一个 router，可以通过组件的`$router`属性获取到。

# 3. vue-router 的常见用法

## 3.1 路由重定向

- 路由重定向指的是：用户在访问地址 A 的时候，强制用户跳转到地址 C ，从而展示特定的组件页面。
- 通过路由规则的 **redirect** 属性，指定一个新的路由地址，可以很方便地设置路由的重定向：

```javascript
const router = new VueRouter({
  routes: [
    // 当用户访问 / 时，通过redirect属性跳转到 /home对应的路由规则
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/movie", component: Movie },
    { path: "/about", component: About },
  ],
});
```

## 3.2 嵌套(多级)路由

通过路由实现组件的嵌套展示，叫做嵌套路由。
![在这里插入图片描述](https://img-blog.csdnimg.cn/69f69be574b8474d8616019eef0249c9.png#pic_center)
描述：
① 点击父级路由链接显示模板内容
② 模板内容中又有子级路由链接
③ 点击子级路由链接显示子级模板内容
实现步骤：
① 声明子路由链接和子路由占位符
② 在父路由规则中，通过 **children** 属性嵌套声明子路由规则

### 3.2.1 声明子路由链接和子路由占位符

在 About.vue 组件中，声明 tab1 和 tab2 的子路由链接以及子路由占位符。示例代码如下：

```xml
<template>
  <div class="about-container">
    <h3>About 组件</h3>
    <!-- 在about组件中，申明两个子路由链接 -->
    <router-link to="/about/tab1"></router-link>
    <router-link to="/about/tab2"></router-link>
    <hr>
    <!-- 在about组件中，申明子路由占位符 -->
    <router-view></router-view>
  </div>
</template>
```

### 3.2.2 通过 children 属性声明子路由规则

在 src/router/index.js 路由模块中，导入需要的组件，并使用 children 属性声明子路由规则：

```javascript
// 导入需要的组件
import Tab1 from "@/components/tabs/Tab1.vue";
import Tab2 from "@/components/tabs/Tab2.vue";

const router = new VueRouter({
  routes: [
    {
      // 父路由规则
      path: "/about",
      component: About,
      // 子路由规则，在children里，路由不带 /，
      children: [
        { path: "tab1", component: Tab1 }, //访问 /about/tab1时，展示Tab1组件
        { path: "tab2", component: Tab2 }, //访问 /about/tab2时，展示Tab2组件
      ],
    },
  ],
});
```

> 补充 **默认子路由**
> 默认子路由：如果 children 数组中，某个路由规则的 path 值为空字符串，则这条路由规则，叫做默认子路由；作用：一访问父组件，则会自动显示默认子路由对应的子组件。和路由重定向有点类似
>
> ```javascript
> routes: [
>     {  // 父路由规则
>       path: "/about",
>       component: About,
>       // 子路由规则，在children里，路由一般不带/，
>       children: [
>
>         { path: "", component: Tab1 }, //默认子路由, 访问 about/时，直接显示 Tab1组件
>         //{ path: "/", redirect: "tab1" }, 路由重定向也能实现，我更喜欢这种
>         { path: "tab2", component: Tab2 },//访问 /about/tab2时，展示Tab2组件
>       ],
>    },
>   ],
> ```

## 3.3 动态路由匹配

思考：有如下 3 个路由链接：
![在这里插入图片描述](https://img-blog.csdnimg.cn/6419591f44ab4691b9cc0c2e00e11952.png)
定义如下 3 个路由规则，是否可行???
![在这里插入图片描述](https://img-blog.csdnimg.cn/8df8d21100604fffb071e73a3c0a9718.png)
可行；但是路由规则的**复用性**差。如果有一千部电影，就要创建一千个路由规则

### 3.3.1 动态路由的概念

- 动态路由指的是：把 Hash 地址中可变的部分定义为参数项，从而提高路由规则的复用性。
- 在 vue-router 中使用英文的冒号（`:`）来定义路由的参数项。示例代码如下：

```javascript
const router = new VueRouter({
  routes: [
    // 在movie组件中，希望给根据后面的参数来指定对应的电影信息，参数名自取
    { path: '/movie/:movieid',component:Movie}，// :movieid 就是占个位，params中就有一项key为moviedid，value为跳转携带的参数
    // 将 以下3个路由规则，合并成一个，提高了路由规则的复用性
    //{ path: '/movie/1',component: Movie},
    //{ path: '/movie/2',component: Movie},
    //{ path: '/movie/3',component: Movie},
  ],
});
```

下面是 App 组件的路由链接和占位符

```xml
<template>
  <div class="app-container">
    <h1>App 组件</h1>
    <!-- 1. 定义路由链接 -->
    <router-link to="/movie/1">电影1</router-link>
    <router-link to="/movie/2">电影2</router-link>
    <router-link to="/movie/3">电影3</router-link>
    <hr />
    <router-view></router-view>
  </div>
</template>
```

> 知识补充
> `<router-link>`的 replace 属性
>
> - 作用：控制路由跳转时操作浏览器历史记录的模式
> - 浏览器的历史记录有两种写入方式：分别为`push`和`replace`，`push`是追加历史记录，`replace`是替换当前记录。路由跳转时候默认为`push`
> - 如何开启`replace`模式：`<router-link replace .......>跳转</router-link>`

### 3.3.2 $route.params 参数对象

在动态路由渲染出来的组件中，可以使用 `this.$route.params` 对象**访问**到动态匹配的**参数值**。后续可根据这个参数值，来渲染对应的内容

```xml
<template>
  <div class="movie-container">
    <!-- this.$route 是路由的参数对象 -->
    <h3>Movie 组件 --- {{ this.$route.params.movieid }}</h3>
  </div>
</template>
```

### 3.3.3 使用 props 接收路由参数

为了简化路由参数的获取形式，vue-router 允许在路由规则中开启 props 传参。示例代码如下：

```javascript
//在router的index.js文件中
//在定义路由规则中，申明 props: true 选项
// 则把路由收到的所有params参数通过props传给Movie
{ path: "/movie/:movieid", component: Movie, props: true }
```

```xml
在Movie组件中
<template>
  <div class="movie-container">
    <!-- this.$route 是路由的参数对象 -->
    <h3>Movie 组件</h3>
    <h4>没有开启props传参的写法--{{ this.$route.params.movieid }}</h4>
    <h4>直接使用props中接收的路由参数--{{ movieid }} --</h4>
  </div>
</template>

<script>
export default {
  name: "Movie",
  props: ["movieid"], //使用props接收路由规则中匹配到的参数
};
</script>
```

---

配置 `props: true`的这种写法只能解决 params 参数，不能解决 query 参数

```javascript
{
	path: "/movie",
	component: Movie,
	props($route){ // 这里能够接收到$route参数，使用其中的属性
		// 返回值中的key-value同样会以props的形式传给Movie组件
		return { movieid:route.query.movieid }
	}
}
```

### 3.3.4 路由的 query 参数

通过路径后面`?`传递 k-v 参数

```html
// 方式一
<!-- 跳转并携带query参数，to的字符串写法 -->
<router-link to="/home/message?id=666&title=你好">跳转</router-link>
// 当然可以用ES6的模板字符串去动态拼接
<router-link :to="`/home/message?id=${xxx.id}&title=${xxx.title}`"
  >跳转</router-link
>
// 方式二：(推荐)
<!-- 跳转并携带query参数，to的对象写法 -->
<router-link
  :to="{
		path:'/home/message',
		query:{
		   id:666,
            title:'你好'
		}
	}"
  >跳转</router-link
>
```

组件通过`$route.query`属性接收参数：

```javascript
$route.query.id;
$route.query.title;
```

### 3.3.5 route 参数对象信息一览

![在这里插入图片描述](https://img-blog.csdnimg.cn/c990bc791b064ec8ae01b047b4995e5a.png#pic_center)

```xml
<template>
  <div class="app-container">
    <h1>App 组件</h1>
    <!-- hash地址中，"/" 后面的参数项，叫做“路径参数”" -->
    <!-- 在路由“参数对象”中，需要使用 this.$route.params来访问路径参数 -->
    <router-link to="/movie/1">电影1</router-link>
    <!-- hash地址中，“?” 后面的参数项 ，叫做“查询参数”  -->
    <!-- 在路由“参数对象”中，需要使用 this.$route.query来访问查询参数 -->
    <router-link to="/movie/2?name=zs&year=2022">电影2</router-link>
    <!-- 在this.$route 中，path只是路径部分，fullPaht是完整地址 -->
    <hr />
    <router-view></router-view>
  </div>
</template>
```

## 3.4 声明式导航&编程式导航

在浏览器中，点击链接实现导航的方式，叫做声明式导航。例如：

- 普通网页中点击 `<a>` 链接、vue 项目中点击 `<router-link>` 都属于声明式导航

在浏览器中，调用 API 方法实现导航的方式，叫做编程式导航。例如：

- 普通网页中调用 `location.href` 跳转到新页面的方式，属于编程式导航

### 3.4.1 vue-router 中的编程式导航 API

vue-router 提供了许多编程式导航的 API，其中最常用的导航 API 分别是：
① `this.$router.push`('hash 地址')：跳转到指定 hash 地址，从而展示对应的组件并**增加**一条历史记录
② `this.$router.replace`('hash 地址')：跳转到指定的 hash 地址，从而展示对应的组件并**替换**掉当前的历史记录
③ `this.$router.go`(数值 n)：实现导航历史前进、后退

#### 3.4.1.1 $router.push

调用 `this.$router.push()` 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面。示例代码如下：

```javascript
<template>
  <div class="home-container">
    <h3>Home 组件</h3>
    <button @click="gotoMovie2">通过push跳转到Movie2</button>
  </div>
</template>
<script>
export default {
  methods: {
    gotoMovie2() {
      // 通过编程式导航API，导航跳转到指定页面
      this.$router.push("/movie/2");
    },
  },
};
</script>
```

$router.push 方法的参数可以是一个字符串路径，或者一个描述地址的对象

```javascript
// 字符串路径
this.$router.push("/users/haruhi");
// 带有路径的对象
this.$router.push({ path: "/users/haruhi" });
// 命名的路由，并加上参数
this.$router.push({ name: "user", params: { username: "haruhi" } });
// 带查询参数，结果是 /register?username=haruhi
this.$router.push({ path: "/register", query: { username: "haruhi" } });
// replace也是同上多种写法，后面不再赘述
this.$router.replace({ name: "user", params: { username: "haruhi" } });
// 还有一些
this.$router.forward(); //前进
this.$router.back(); //后退
this.$router.go(); //可前进也可后退
```

#### 3.4.1.2 $router.replace

调用 `this.$router.replace()` 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面。

| 方法    | 区别                                               |
| ------- | -------------------------------------------------- | -------------------------------------------------- |
| push    | push 会增加一条历史记录                            | replace 不会增加历史记录，而是替换掉当前的历史记录 |
| replace | replace 不会增加历史记录，而是替换掉当前的历史记录 |

#### 3.4.1.3 $router.go

调用 `this.$router.go()` 方法，可以在浏览历史中前进和后退。示例代码如下：

```javascript
<template>
  <div class="movie-container">
    <h3>Movie 组件</h3>
    <button @click="goBack">返回</button>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      // 后退到前一次的页面，如果后退数值超出上限，则原地不动
      this.$router.go(-1);
      // 正数表示前进，负数后退
    },
  },
};
</script>
```

`$router.go` 的简化用法

- 在实际开发中，一般只会前进和后退一层页面。因此 vue-router 提供了如下两个便捷方法：
  ① `$router.back()`：在历史记录中，后退到上一个页面
  ② `$router.forward()`：在历史记录中，前进到下一个页面

```javascript
<template>
  <div class="movie-container">
    <h3>Movie 组件</h3>
    <!-- 在行内使用编程式导航跳转的时候，this必须要省略，否则会报错 -->
    <button @click="$router.back()">返回</button>
    <button @click="$router.forward()">前进</button>
    <!-- 方法内只有一行代码，可以如上简写到行内，而不必再申明方法 -->
    <button @click="goBack">返回</button>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.back();// 可以简写到行内
    },
  },
};
</script>
```

## 3.5 命名路由

通过 name 属性为路由规则定义名称的方式，叫做命名路由。示例代码如下：

```javascript
{
  // 使用 name 属性为当前的路由规则定义一个“名称”
  name: "mov",
  path: "/movie:id",
  component: Movie,
}
```

注意：命名路由的 name 值不能重复，必须保证唯一性！

### 3.5.1 使用命名路由实现声明式导航

为 `<router-link>` 标签**动态绑定 to** 属性的值，并通过 name 属性指定要跳转到的路由规则。期间还可以用 **params** 属性指定跳转期间要携带的路由参数。示例代码 如下：

```xml
<template>
  <div>
    <h3>Home 组件</h3>
    //这里用到了params参数，所有路由那里要:占位
    <router-link :to="{ name: 'mov', params: { mid: 3 } }">go to Movie</router-link>
    <!--
    也可以传query参数，同时路由规则那就别去用:占位了
	<router-link :to="{ name: 'mov', query: { mid: 3 } }">go to Movie</router-link>
	-->
  </div>
</template>
```

### 3.5.2 使用命名路由实现编程式导航

调用 **push** 函数期间指定一个配置对象，name 是要跳转到的路由规则、params 是携带的路由参数：

```javascript
<template>
  <div>
    <h3>Home 组件</h3>
    <button @click="gotoMovie(3)">go to Movie</button>
  </div>
</template>
<script>
export default {
  name: "Home",
  methods: {
    gotoMovie(id) {
      this.$router.push({ name: "mov", params: { mid: id } });
    },
  },
};
</script>
```

特别注意：路由携带 params 参数时，若使用 to 的对象写法，则不能使用 path 配置项，必须使用 name 配置！

## 3.6 缓存路由组件

### 3.6.1 keep-alive

作用：让不展示的路由组件保持挂载，不被销毁。
用法：在路由占位符`<router-view>`外一层包裹`<keep-alive>`

```xml
// 缓存所有
<keep-alive>
    <router-view></router-view>
</keep-alive>
// 只缓存指定的一个路由组件
<keep-alive include="UserInfo">
    <router-view></router-view>
</keep-alive>
// 缓存指定的多个路由组件
<keep-alive :include="['UserInfo','UserMsg']">
    <router-view></router-view>
</keep-alive>
```

注意：

- **include**属性，后面接**组件名**(别写成路由名)，只有名称匹配的组件会被缓存。用于有多个路由组件在此切换展示，而有些路由组件没必要缓存数据
- **exclude** 属性：任何名称匹配的组件都不会被缓存

### 3.6.2 路由组件特有的生命周期钩子

当组件在 `<keep-alive>` 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

- activated：被 keep-alive 缓存的组件激活时调用。
- deactivated：被 keep-alive 缓存的组件失活时调用。

## 3.7 导航守卫

导航守卫可以控制路由的访问权限。示意图如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/24eb354d36da4e1891f24ccd57a2056e.png#pic_center)

### 3.7.1 全局前置守卫

#### 3.7.1.1 全局前置守卫

每次发生路由的导航跳转时，都会触发全局前置守卫。因此，在全局前置守卫中，程序员可以对每个路由进行访问权限的控制：

```javascript
// 创建路由的实例对象
const router = new VueRouter({});
// 为 router 实例对象，声明全局前置导航守卫、
// 在发生路由的切换之前，必然会触发beforeEach指定的function回调函数(初始化也会执行一次)
router.beforeEach(fn);
```

#### 3.7.1.2 守卫方法的 3 个形参

全局前置守卫的回调函数中接收 3 个形参，格式如下：

```javascript
// 创建路由的实例对象
const router = new VueRouter({});
router.beforeEach((to, from, next) => {
  // to是将要访问的路由的信息对象
  // from 是将要离开的路由的信息对象
  // next 是一个函数，调用next()表示放行，允许这次路由导航
  next();
});
```

注意：
① 在守卫方法中如果不声明 next 形参，则默认允许用户访问每一个路由！
② 在守卫方法中如果声明了 next 形参，则必须调用 next() 函数，否则不允许用户访问任何一个路由！

#### 3.7.1.3 next 函数的 3 种调用方式

参考示意图，分析 next 函数的 3 种调用方式最终导致的结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/52d8ef38e75b410cbf361b1f51731445.png#pic_center)

- 当前用户拥有后台主页的访问权限，直接放行：next()
- 当前用户没有后台主页的访问权限，强制其跳转到登录页面：next('/login')
- 当前用户没有后台主页的访问权限，不允许跳转到后台主页：next(false)

#### 3.7.1.4 控制后台主页的访问权限

```javascript
router.beforeEach(function (to, from, next) {
  // 1. 要拿到用户将要访问的 hash 地址
  // 2. 判断 hash 地址是否等于 /main。
  // 2.1 如果等于 /main，证明需要登录之后，才能访问成功
  // 2.2 如果不等于 /main，则不需要登录，直接放行  next()
  // 3. 如果访问的地址是 /main。则需要读取 localStorage 中的 token 值
  // 3.1 如果有 token，则放行
  // 3.2 如果没有 token，则强制跳转到 /login 登录页
  if (to.path === "/main") {
    // 也可以用to.name 跟 组件名
    // 要访问后台主页，需要判断是否有 token
    const token = localStorage.getItem("token");
    if (token) {
      //如果有token 放行
      next();
    } else {
      // 没有token，强制跳转到登录页
      next("/login");
    }
  } else {
    next(); // 访问的不是 后台主页直接放行
  }
});
```

### 3.7.2 全局后置钩子

全局后置钩子：初始化时执行、每次路由切换后执行

```javascript
router.afterEach((to, from) => {
  // ...业务，如配置网页标题
  if (to.meta.title) {
    document.title = to.meta.title; //事先在元信息里配了数据，修改网页的title
  } else {
    // 没有配标题就设置默认
    document.title = "test";
  }
});
```

### 3.7.3 路由独享的守卫

可以在路由配置上直接定义 beforeEnter 守卫，该路由独有的守卫，只在进入路由时触发

```javascript
const router = new VueRouter({
  routes: [
    {
      path: "/foo",
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      },
    },
  ],
});
```

### 3.7.4 组件内守卫

可以在路由**组件内直接定义**以下路由导航守卫

```javascript
beforeRouteEnter 进入守卫：通过路由规则，进入该组件时被调用
beforeRouteUpdate 更新守卫：路由更新时触发
beforeRouteLeave 离开守卫：通过路由规则，离开该组件时被调用
```

```javascript
beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不能获取组件实例 `this`，因为当守卫执行前，组件实例还没被创建
  next(vm => {
    // 可以通过传一个回调给 next来访问组件实例，通过 `vm` 访问组件实例
  })

  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
beforeRouteLeave (to, from, next) {
 // 导航离开该组件的对应路由时调用，可以访问组件实例 `this`
 //通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

## 3.8 路由元信息

配置路由元信息，由用户自定义一些属性，可巧用于导航守卫的权限，或配置其他信息

```javascript
const router = new VueRouter({
  routes: [
    {
      path: "/foo",
      component: Foo,
      meta: { isAuth: true, msg: "hello" }, //配置自定义属性
    },
  ],
});
```

如下：简单的设置路由权限

```javascript
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    //需要权限
    //。。。业务
  } else {
    // 不需要权限，放行
    next();
  }
});
```

## 3.9 路由器的两种工作模式

history 或 hash，vue-router 默认为 hash 模式。

```javascript
const router = new VueRouter({
  mode: 'history',
  //mode:'hash',
  routes: [...]
})
```

- 对于一个 url 来说，什么是 hash 值？—— `#`号及其后面的内容就是 hash 值。
- hash 值不会包含在 HTTP 请求中，即：hash 值不会带给服务器。
- hash 模式：
  - 地址中永远带着`#`号，不美观 。
  - 若以后将地址通过第三方手机 app 分享，若 app 校验严格，则地址会被标记为不合法。
  - 兼容性较好。
- history 模式：
  - 地址干净，美观 。
  - 兼容性和 hash 模式相比略差。
  - 应用部署上线时需要后端人员支持，解决刷新页面服务端 404 的问题。

[更详细内容参照官网](https://v3.router.vuejs.org/zh/guide/essentials/history-mode.html)

# 4. vue 中使用 axios

## 4.1 vue2 项目中全局配置 axios

需要在 main.js 入口文件中，通过 Vue 构造函数的 prototype 原型对象全局配置 axios：

```javascript
import Vue from "vue";
import App from "./App.vue";
// 1. 导入aixos
import axios from "axios";
Vue.config.productionTip = false;
// 2. 全局配置 axios的请求根路径
axios.defaults.baseURL = "http://www.liulongbin.top:3006";
// 3. 把 axios 挂载到 Vue.prototype上，供每个 .vue 组件的实例直接使用
//  取名为$http，也可以叫 axios等
// Vue.prototype.axios = axios;
Vue.prototype.$http = axios;
// 今后在每个.vue组件中要发起请求，直接调用this.$http.请求方式
// 但是 ，把axios挂载到vue的原型对象上，有一个缺点，不利于API接口的复用
new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

在组件中代码如下

```javascript
<template>
  <div class="right-container">
    <h1>Right组件</h1>
    <button @click="postInfo">发起post请求</button>
  </div>
</template>

<script>
export default {
  methods: {
    async postInfo() {
      const { data: res } = await this.$http.post("/api/post", {
        name: "zs",
        age: 20,
      });
      console.log(res);
    },
  },
};
</script>
```

## 4.2 vue3 项目中全局配置 axios

```javascript
import { createApp } from "vue";
import App from "./App.vue";
// 1. 导入axios
import axios from "./axios";
const app = createApp(App);
// 2. 配置请求根路径
axios.defaults.baseURL = "http://www.liulongbin.top:3006";
// 3. 全局配置axios
app.config.globalProperties.$http = axios;
app.mount("#app");
```

## 4.3 axios 拦截器

### 4.3.1 什么是拦截器

拦截器（英文：Interceptors）会在每次发起 ajax 请求和得到响应的时候自动被触发。
![在这里插入图片描述](https://img-blog.csdnimg.cn/e47d5454896447149b3c085122157354.png)

应用场景：
① Token 身份认证
② Loading 效果
③ etc…

### 4.3.2 配置请求拦截器

通过 `axios.interceptors.request.use(成功的回调, 失败的回调)` 可以配置请求拦截器。示例代码如下：

```javascript
// 配置请求拦截器
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // 参数上带有很多信息，包括 method请求方式，url路径,headers头部信息等
    return config;
  },
  function (err) {
    // Do something with request error
    return Promise.reject(err);
  }
);
```

注意：失败的回调函数可以被省略！

#### 4.3.2.1 请求拦截器 – Token 认证

```javascript
import axios from "axios";
axios.defaults.baseURL = "https://applet-base-api-t.itheima.net";
// 配置请求拦截器
axios.interceptors.request.use((config) => {
  // 第二个失败的回调函数可以省略
  // 为当前请求配置Token认证字段,给headers添加Authorization字段
  // 值固定为 Bearer加一个空格开头，再接上token信息
  config.headers.Authorization = "Bearer xxx";
  return config; // 必须返回一个config
});
Vue.prototype.$http = axios;
```

#### 4.3.2.2 请求拦截器 – 展示 Loading 效果

借助于 element ui 提供的 Loading 效果组件（[https://element.eleme.cn/#/zh-CN/component/loading](https://element.eleme.cn/#/zh-CN/component/loading)）可以方便的实现 Loading 效果的展示：

```javascript
// 1. 按需导入 loading 效果组件
import { loading } from "element-ui";
// 2. 声明变量，用来存储 loading 组件的实例对象
let loadingInstance = null;
// 配置请求拦截器
axios.interceptors.request.use((config) => {
  // 3. 调用loading组的service()方法，创建Loading组件的实例，并全屏展示loading效果
  loadingInstance = loading.service({ fullscreen: true });
  return config;
});
```

### 4.3.3 配置响应拦截器

通过 `axios.interceptors.response.use(成功的回调, 失败的回调)` 可以配置响应拦截器。示例代码如下：

```javascript
// 配置响应拦截器
axios.interceptors.response.use(
  function (response) {
    // Do something eith response data
    return response;
  },
  function (err) {
    // Do something with response err
    return Promise.reject(err);
  }
);
```

注意：失败的回调函数可以被省略！

#### 4.3.3.1 响应拦截器 – 关闭 Loading 效果

调用 Loading 实例提供的 `close()` 方法即可关闭 Loading 效果，示例代码如下：

```javascript
// 配置响应拦截器
axios.interceptors.response.use((response) => {
  // 调用loading实例的close()方法即可关闭loading效果
  loadingInstance.close();
  return response;
});
```

## 4.4 proxy 跨域代理

### 4.4.1 回顾：接口的跨域问题

- 例如下面例子：协议，域名，端口号都不同，显然存在跨域问题
  vue 项目运行的地址：http://localhost:8080/
  API 接口运行的地址：https://www.escook.cn/api/users
- 由于当前的 API 接口没有开启 CORS 跨域资源共享，因此默认情况下，上面的接口无法请求成功
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/db911f1d5a0543ff9cab7e8fd268083b.png)
  > **跨域问题报错如图** > ![在这里插入图片描述](https://img-blog.csdnimg.cn/1e40b34cac4f484d97a284fd4a690279.png#pic_center)

### 4.4.2 通过代理解决接口的跨域问题

通过 **vue-cli** 创建的项目在遇到接口跨域问题时，可以通过代理的方式来解决：
![在这里插入图片描述](https://img-blog.csdnimg.cn/e7ffef9e47fa45659d0ee835c491edd5.png)
① 把 axios 的请求**根路径**设置为 vue 项目的运行地址（接口请求不再跨域）
② vue 项目发现请求的接口不存在，把请求转交给 proxy 代理
③ 代理把请求根路径替换为 devServer.proxy 属性的值，发起真正的数据请求
④ 代理把请求到的数据，转发给 axios

### 4.4.3 在项目中配置 proxy 代理

步骤 1，在 main.js 入口文件中，把 axios 的请求根路径改造为当前 web 项目的根路径：

```javascript
// 配置请求根路径
axios.defaults.baseURL = "http://localhost:8081/"; // 这个是当前你跑项目的根路径
// axios.defaults.baseURL = "https://www.escook.cn"; //这个是真正的接口根路径
```

步骤 2，在项目根目录下创建 **vue.config.js** 的配置文件，并声明如下的配置：

```javascript
module.exports = {
  devServer: {
    // 当前项目在开发调试阶段
    // 会将任何未知请求(没有匹配到静态文件的请求)代理到 https://www.escook.cn
    // 开启代理方式一：(这种写法只能配置一个代理，且不够灵活)
    proxy: "https://www.escook.cn",
  },
};
```

注意：
① devServer.proxy 提供的代理功能，仅在开发调试阶段生效
② 项目上线发布时，依旧需要 API 接口服务器开启 CORS 跨域资源共享(需要后端处理)

说明：

1. 这种方式配置简单，不能配置多个代理，不能灵活的控制请求是否走代理。
2. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求才会转发给服务器 （优先匹配前端资源）

---

演示更丰富的配置

```js
module.exports = {
  devServer: {
	proxy: {
     '/api': { // 这行表示只要请求的前缀是api，才会去代理；前缀-表示紧跟协议域名端口号后面的第一个片段
       target: 'http://localhost:5000', // 代理目标的基础路径
       pathRewrite:{'^/api',''} // 表示 正则匹配/api开头的路径全替换为空
       ws: true, // 用于支持websocket
       changeOrigin: true //
     },
     // 还可以配置代理..根据需要自行添加多少个代理
     '/foo': {
       target: '<other_url>',
       // ....
     }
   }
  },
};
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。
