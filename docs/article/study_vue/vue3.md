---
title: vue3 新语法
date: 2022/07/16 19:54
categories: [Vue]
stick: false
description: vue3 新语法
keyword: vue3 新语法
---

# vue3 新语法

# 1. vite 的基本使用

vite 官网：[https://vitejs.cn](https://vitejs.cn)
vue 官方文档：[https://v3.cn.vuejs.org/guide/installation.html#vite](https://v3.cn.vuejs.org/guide/installation.html#vite)

- vite：新一代前端构建工具。
- 相比 webpack 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。

## 1.1 创建 vite 的项目

按照顺序执行如下的命令，即可基于 vite 创建 vue 3.x 的工程化项目：

```shell
npm init vite@latest
// 中间根据提示来构建vue3项目
cd deom
npm install
npm run dev
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/650e9541da6641f0b3fda64c30ef39cb.png#pic_center)

## 1.2 梳理项目的结构

使用 vite 创建的项目结构如下：

- node_modules 目录用来存放第三方依赖包
- public 是公共的静态资源目录
- src 是项目的源代码目录（程序员写的所有代码都要放在此目录下）
- .gitignore 是 Git 的忽略文件
- index.html 是 SPA 单页面应用程序中唯一的 HTML 页面
- package.json 是项目的包管理配置文件
- vite.config.js 是 vite 的配置文件
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/2735b4cb7ef74ccb9402fa6aac682913.png#pic_center)
  在 src 这个项目源代码目录之下，包含了如下的文件和文件夹：
- assets 目录用来存放项目中所有的静态资源文件（css、fonts 等）
- components 目录用来存放项目中所有的自定义组件
- App.vue 是项目的根组件
- index.css 是项目的全局样式表文件(上图没有)
- main.js 是整个项目的打包入口文件

## 1.3 vite 项目的运行流程

在工程化的项目中，vue 要做的事情很单纯：通过 main.js 把 App.vue 渲染到 index.html 的指定区域中。其中：
① App.vue 用来编写待渲染的模板结构
② index.html 中需要预留一个 el 区域
③ main.js 把 App.vue 渲染到了 index.html 所预留的区域中

- 步骤一：在 App.vue 中编写模板结构
  清空 App.vue 的默认内容，并书写如下的模板结构：

```xml
<template>
  <h1>这是App.vue根组件</h1>
</template>
```

- 步骤二：在 index.html 中预留 el 区域
  打开 index.html 页面，确认预留了 el 区域：

```xml
<body>
  <!--id 为app的div元素，就是将来vue要控制的区域 -->
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
```

- 步骤三：在 main.js 中进行渲染
  按照 vue 3.x 的标准用法，把 App.vue 中的模板内容渲染到 index.html 页面的 el 区域中：

```javascript
// 1.从vue中按需引入一个名为createApp的工厂函数：作用创建vue的“单页面应用程序实例”
import { createApp } from "vue";
// 2. 导入待渲染的App组件
import App from "./App.vue";
// 3.调用createApp()函数，返回值是“单页面应用程序实例对象”，用常量spa_app接收
// 同时把App组件作为参数传给createApp函数，表示要把App渲染到index.html页面上
const spa_app = createApp(App);
// 4. 挂载：调用spa_app实例的mount方法，用来指定vue实际要控制的区域
spa_app.mount("#app");
// createApp(App).mount("#app"); 可以简写
```

> 建议安装 vue3 开发者工具插件
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/c6d70df3093c4e8ea332dd74d22c8588.png#pic_center)

# 2. 组件的基本使用

## 2.1 注册组件的两种方式

vue 中注册组件的方式分为“全局注册”和“局部注册”两种，其中：

- 被全局注册的组件，可以在全局任何一个组件内使用
- 被局部注册的组件，只能在当前注册的范围内使用

## 2.2 全局注册组件

使用 app.component() 方法注册的全局组件，直接以标签的形式进行使用即可

```javascript
import { createApp } from "vue";
import App from "./App.vue";
// 1.在main.js文件中，  导入需要被全局注册的组件
import Left from "./components/Left.vue";
import Right from "./components/Right.vue";
const spa_app = createApp(App);
// 2. 调用spa_app实例的component()方法全局注册组件
spa_app.component("my-left", Left);
spa_app.component("my-right", Right);
spa_app.mount("#app");
```

```xml
<template>
  <h1>这是App.vue根组件</h1>
  <!-- 在其他组件中，直接以标签的形式，使用全局注册过的组件 -->
  <my-left></my-left>
  <my-right></my-right>
</template>
```

## 2.3 局部祖册

```javascript
<template>
  <h1>这是App.vue根组件</h1>
  <my-left></my-left>
</template>
<script>
// 导入需要的组件
import Left from "./components/Left.vue";
export default {
  // 2. 通过 components节点，为当前组件注册私有子组件
  components: {
    "my-left": Left,
  },
};
</script>
```

## 2.4 全局注册和局部注册的区别

- 被全局注册的组件，可以在全局任何一个组件内使用
- 被局部注册的组件，只能在当前注册的范围内使用

应用场景：

- 如果某些组件在开发期间的使用频率很高，推荐进行全局注册；
- 如果某些组件只在特定的情况下会被用到，推荐进行局部注册。

## 2.5 组件注册时名称的大小写

在进行组件的注册时，定义组件注册名称的方式有两种：

- ① 使用 kebab-case 命名法（俗称短横线命名法，例如 my-swiper 和 my-search）
  **短横线命名法的特点**：必须严格按照短横线名称进行使用
- ② 使用 PascalCase 命名法（俗称帕斯卡命名法或大驼峰命名法，例如 MySwiper 和 MySearch）
  **帕斯卡命名法的特点**：既可以严格按照帕斯卡名称进行使用，又可以转化为短横线名称进行使用

## 2.6 通过 name 属性注册组件

在注册组件期间，除了可以直接提供组件的注册名称之外，还可以把组件的 name 属性作为注册后组件的名称，示例代码如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/a7bf1263834647939495cbe8bcb6105e.png)

# 3. 自定义事件

## 3.1 什么是自定义事件

在封装组件时，为了让组件的使用者可以监听到组件内状态的变化，此时需要用到组件的自定义事件。
![在这里插入图片描述](https://img-blog.csdnimg.cn/c790327edcda4d66a954f404fe90db40.png)

## 3.2 自定义事件的 3 个使用步骤

- 在封装组件时：
  ① 声明自定义事件
  ② 触发自定义事件
- 在使用组件时：
  ③ 监听自定义事件

### 3.2.1 声明自定义事件

开发者为自定义组件封装的自定义事件，必须事先在 emits 节点中声明，示例代码如下：

```javascript
<template>
  <div>
    <h2>Counter 组件</h2>
    <p>count 的值为 {{ count }}</p>
    <button @click="add">点击加1</button>
  </div>
</template>
<script>
export default {
  // 1.申明自定义事件
  emits: ["countChange"],// 为当前Counter组件在emits节点下申明自定义事件
</script>
```

### 3.2.2 触发自定义事件

在 emits 节点下声明的自定义事件，可以通过 `this.$emit('自定义事件的名称')` 方法进行触发，示例代码如下：

```javascript
<template>
  <div>
    <h2>Counter 组件</h2>
    <p>count 的值为 {{ count }}</p>
    <button @click="add">点击加1</button>
  </div>
</template>
<script>
export default {
  // 1.申明自定义事件
  emits: ["countChange"],
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    add() {
      this.count++;
      // 2. this.$emit()触发自定义事件,
      // 参数为在emits节点下申明过的自定义事件名
      this.$emit("countChange");
       // 当点击加1按钮，调用了add()函数，自动触发了countChange事件
    },
  },
};
</script>
```

### 3.2.3 监听自定义事件

在使用自定义的组件时，可以通过 **v-on** (简写@)的形式监听自定义事件。示例代码如下：

```javascript
<template>
  <div class="app-container">
    <h1>这是App.vue根组件</h1>
    <!-- 当前在app组件中，使用了Counter组件，并监听了countChange事件-->
    <!--一旦监听到了Counter组件的countChange事件，就调用getCount函数-->
    <Counter @countChange="getCount"></Counter>
  </div>
</template>
<script>
import Counter from "./components/Counter.vue";
export default {
  components: {
    Counter,
  },
  methods: {
    getCount() {
      console.log("触发了countChange自定义事件");
    },
  },
};
</script>
```

## 3.3 自定义事件传参

在调用 `this.$emit()` 方法触发自定义事件时，可以通过第 2 个参数为自定义事件传参，示例代码如下：

```javascript
// ======事件触发方
methods: {
  add() {
    this.count++;
    // 2. 触发自定义事件时，通过第二个参数传参
    this.$emit("countChange", this.count);
  },
},
//===========事件监听方
methods: {
  getCount(val) {
    console.log("触发了countChange自定义事件", val);
  },
},
```

# 4. 组件上的 v-model

## 4.1 为什么需要在组件上使用 v-model

v-model 是双向数据绑定指令，当需要维护组件内外数据的同步时，可以在组件上使用 v-model 指令。示意图如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/da5fc388e5af4f44bc3931b1c81ace66.png)
counter 组件中数据的变化，也会自动同步到外界
外界数据的变化会自动同步到 counter 组件中

## 4.2 在组件上使用 v-model 的步骤

### 4.2.1 父向子

① 父组件通过 v-bind: 属性绑定的形式，把数据传递给子组件
② 子组件中，通过 props 接收父组件传递过来的数据
![在这里插入图片描述](https://img-blog.csdnimg.cn/6c04536295244e2d916895fbaecbbc99.png)
实现点击父组件 app 中加 1 按钮，把数据同步到子组件中

```javascript
// ===================App父组件
<template>
  <div class="app-container">
    <h1>这是App.vue根组件---{{ count }}</h1>
    <!-- 通过number自定义属性，给 Counter 组件传一个 count 的值 -->
    <Counter v-model="count" :number="count"></Counter>
    <button @click="count++">点击加1</button>
  </div>
</template>
<script>
import Counter from "./components/Counter.vue";
export default {
  data() {
    return {
      count: 0,
    };
  },
  components: {
    Counter,
  },
};
</script>

// =========================Counter子组件
<template>
  <div>
    <h2>Counter 组件</h2>
    <p>count 的值为 {{ number }}</p>
  </div>
</template>
<script>
export default {
  // 接收从外部传来的数据
  props: ["number"],
};
```

### 4.2.2 子向父

① 在 v-bind: 指令之前添加 v-model 指令
② 在子组件中声明 emits 自定义事件，格式为 update:xxx
③ 调用 $emit() 触发自定义事件，更新父组件中的数据
![在这里插入图片描述](https://img-blog.csdnimg.cn/92381b10d4d344cfa2744105ef8574ff.png)
点击子组件的加 1 按钮，把数据同步给父组件

```javascript
//==================app父组件
<template>
  <div class="app-container">
    <h1>这是App.vue根组件---{{ count }}</h1>
    <Counter v-model:number="count"></Counter>
  </div>
</template>
<script>
import Counter from "./components/Counter.vue";
export default {
  data() {
    return {
      count: 0,
    };
  },
  components: {
    Counter,
  },
};
// =================== Counter子组件
<template>
  <div>
    <h2>Counter 组件</h2>
    <p>count 的值为 {{ number }}</p>
    <button @click="add">点击加1</button>
  </div>
</template>
<script>
export default {
  props: ["number"],
  emits: ["update:number"],
  methods: {
    add() {
      this.$emit("update:number", this.number + 1);
    },
  },
};
```

# 5. 组件的生命周期

## 5.1 组件运行的过程

![在这里插入图片描述](https://img-blog.csdnimg.cn/dd9e51f048694b1489021291b1e577e8.png)
组件的生命周期指的是：组件从创建 -> 运行（渲染） -> 销毁的整个过程，强调的是一个时间段。

## 5.2 如何监听组件的不同时刻

vue 框架为组件内置了不同时刻的生命周期函数，生命周期函数会伴随着组件的运行而自动调用。例如：
① 当组件在内存中被创建完毕之后，会自动调用 created 函数
② 当组件被成功的渲染到页面上之后，会自动调用 mounted 函数
③ 当组件被销毁完毕之后，会自动调用 unmounted 函数

## 5.3 如何监听组件的更新

当组件的 data 数据更新之后，vue 会自动重新渲染组件的 DOM 结构，从而保证 View 视图展示的数据和 Model 数据源保持一致。
当组件被重新渲染完毕之后，会自动调用 updated 生命周期函数。

## 5.4 组件中主要的生命周期函数

| 生命周期函数 | 执行时机                     | 所属阶段 | 执行次数  | 应用场景             |
| ------------ | ---------------------------- | -------- | --------- | -------------------- |
| created      | 组件在内存中创建完毕后       | 创建阶段 | 唯一 1 次 | 发 ajax 请求初始数据 |
| mounted      | 组件初次在页面中渲染完毕后   | 创建阶段 | 唯一 1 次 | 操作 DOM 元素        |
| updated      | 组件在页面中被重新渲染完毕后 | 运行阶段 | 0 或以上  | -                    |
| unmounted    | 组件被销毁后（页面和内存）   | 销毁阶段 | 唯一 1 次 | -                    |

注意：在实际开发中，created 是最常用的生命周期函数！

## 5.5 组件中全部的生命周期函数

| 生命周期函数  | 执行时机                     | 所属阶段 | 执行次数  | 应用场景             |
| ------------- | ---------------------------- | -------- | --------- | -------------------- |
| beforeCreate  | 在内存中开始创建组件之前     | 创建阶段 | 唯一 1 次 | -                    |
| created       | 组件在内存中创建完毕后       | 创建阶段 | 唯一 1 次 | 发 ajax 请求初始数据 |
| beforeMount   | 在把组件初次渲染到页面之前   | 创建阶段 | 唯一 1 次 | -                    |
| mounted       | 组件初次在页面中渲染完毕后   | 创建阶段 | 唯一 1 次 | 操作 DOM 元素        |
| beforeUpdate  | 在组件被重新渲染之前         | 运行阶段 | 唯一 1 次 | 操作 DOM 元素        |
| updated       | 组件在页面中被重新渲染完毕后 | 运行阶段 | 0 或 以上 | -                    |
| beforeUnmount | 在组件被销毁之前             | 销毁阶段 | 唯一 1 次 | -                    |
| unmounted     | 组件被销毁后（页面和内存）   | 销毁阶段 | 唯一 1 次 | -                    |

疑问：为什么不在 beforeCreate 中发 ajax 请求初始数据？
答：在 beforeCreate 生命周期函数中，data 还没初始化，不能访问 data 里面的数据。 所以 ajax 请求回来的数据没地方存，在 beforeCreate 中发 ajax 请求初始数据没有意义。

## 5.6 完整的生命周期图示

可以参考 vue 官方文档给出的“[生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)”，进一步理解组件生命周期执行的过程：

![在这里插入图片描述](https://img-blog.csdnimg.cn/ee0d6b4258e543dc8fdbb3802b1263ec.jpeg#pic_center)

# 6. 组件之间的数据共享

## 6.1 组件之间的关系

在项目开发中，组件之间的关系分为如下 3 种：
① 父子关系(AB,AC)
② 兄弟关系(BC,BE)
③ 后代关系(AD,AJ)
![在这里插入图片描述](https://img-blog.csdnimg.cn/27c3084e692140ad814cda6d2e2b3923.png)

## 6.2 父子组件之间的数据共享

父子组件之间的数据共享又分为：
① 父 -> 子共享数据
② 子 -> 父共享数据
③ 父 <-> 子双向数据同步

### 6.2.1 父组件向子组件共享数据

父组件通过 `v-bind` (简写`:`)属性绑定向子组件共享数据。同时，子组件需要使用 props 接收数据。示例代码如下：

子组件：

```javascript
<template>
  <div>
    <h1>Myleft组件</h1>
    <p>{{ msg }}</p>
    <p>名字：{{ user.name }}年龄：{{ user.age }}</p>
  </div>
</template>

<script>
export default {
  props: ["msg", "user"],
};
</script>
```

父组件：

```javascript
<template>
  <div>
    <h1>App根组件</h1>
    <Myleft :msg="message" :user="userinfo"></Myleft>
  </div>
</template>
<script>
import Myleft from "./components/Myleft.vue";
export default {
  data() {
    return {
      message: "hello vue",
      userinfo: { name: "zs", age: 20 },
    };
  },
  components: {
    Myleft,
  },
};
</script>
```

### 6.2.2 子组件向父组件共享数据

子组件通过自定义事件的方式向父组件共享数据。示例代码如下：

父组件：

```javascript
<template>
  <div>
    <h1>App根组件</h1>
    <!-- 1. 监听子组件的自定时事件n1change -->
    <Myleft @n1change="getn1"></Myleft>
    <p>{{ n1FromSon }}</p>
  </div>
</template>
<script>
import Myleft from "./components/Myleft.vue";
export default {
  data() {
    return {
      n1FromSon: 0,
    };
  },
  methods: {
    // 2. 通过形参，接收子组件传递过来的参数
    getn1(n1) {
      this.n1FromSon = n1;
    },
  },
  components: {
    Myleft,
  },
};
</script>
```

子组件：

```javascript
<template>
  <div>
    <h1>Myleft组件</h1>
    <p>{{ n1 }}</p>
    <button @click="addN1">点我加1</button>
  </div>
</template>

<script>
export default {
  emits: ["n1change"], // 声明自定义事件
  data() {
    return {
      n1: 0,
    };
  },
  methods: {
    addN1() {
      this.n1++;
      // 数据变化时，触发自定义事件，并传了参数
      this.$emit("n1change", this.n1);
    },
  },
};
</script>
```

### 6.2.3 父子组件之间数据的双向同步

父组件在使用子组件期间，可以使用 `v-model` 指令维护组件内外数据的双向同步：
![在这里插入图片描述](https://img-blog.csdnimg.cn/a6fa49da5bfe466c9b84437983e75cf5.png)
父组件：

```javascript
<template>
  <div>
    <h1>App根组件的 count 为{{ count }}</h1>
    <button @click="count++">App的按钮加1</button>
    <Counter v-model:number="count"></Counter>
    <p></p>
  </div>
</template>
<script>
import Counter from "./components/Counter.vue";
export default {
  data() {
    return {
      count: 0,
    };
  },
  components: {
    Counter,
  },
};
</script>
```

子组件：

```javascript
<template>
  <div>
    <h1>Counter组件的 number 为 {{ number }}</h1>
    <p>{{ number }}</p>
    <button @click="addN1">Counter的按钮加1</button>
  </div>
</template>
<script>
export default {
  // 1. 声明自定义属性
  props: ["number"],
  // 2. 声明自定义事件，格式固定为 （update:自定义属性）
  emits: ["update:number"],
  methods: {
    addN1() {
      // 3.数据变化时，触发自定义事件，
      this.$emit("update:number", this.number + 1);
    },
  },
};
</script>
```

## 6.3 兄弟组件之间的数据共享

兄弟组件之间实现数据共享的方案是 **EventBus**。可以借助于第三方的包 mitt 来创建 eventBus 对象，从而实现兄弟组件之间的数据共享。示意图如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/ff97ad6a636342729e1b6e5fbb061bdf.png)

### 6.3.1 安装 mitt 依赖包

在项目中运行如下的命令，安装 mitt 依赖包：

```shell
npm i mitt
```

### 6.3.2 创建公共的 EventBus 模块

在项目中创建公共的 eventBus 模块如下：

```javascript
// eventBus.js
// 导入mitt包
import mitt from "mitt";
// 创建eventBus的实例对象
const bus = mitt();
// 将 EventBus的实例对象共享出去
export default bus;
```

### 6.3.3 在数据接收方自定义事件

在数据接收方，调用 `bus.on('事件名称', 事件处理函数)` 方法注册一个自定义事件。示例代码如下：

```javascript
<template>
  <div>
    <h2>Right组件 的count值 {{ num }}</h2>
  </div>
</template>
<script>
// 导入 eventBus.js 模块，得到共享的 bus对象
import bus from "../eventBus.js";
export default {
  data() {
    return {
      num: 0,
    };
  },
  // 一定要在created函数中，申明自定义事件
  created() {
    // 调用bus.on()方法注册一个自定义事件，通过事件处理函数的形参接收数据
    bus.on("countChange", (count) => {
      this.num = count;
    });
  },
};
</script>
```

### 6.3.4 在数据接发送方触发事件

在数据发送方，调用 bus.emit('事件名称', 要发送的数据) 方法触发自定义事件。示例代码如下：

```javascript
<template>
  <div>
    <h2>Left组件的count值 {{ count }}</h2>
    <button @click="addCount">点我给兄弟组件发送数据</button>
  </div>
</template>
<script>
// 导入 eventBus.js 模块，得到共享的bus对象
import bus from "../eventBus.js";
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    addCount() {
      this.count++;
      bus.emit("countChange", this.count); // 调用bus.emit方法触发自定义事件，并发送数据
    },
  },
};
</script>
```

## 6.4 后代关系组件之间的数据共享

后代关系组件之间共享数据，指的是父节点的组件向其子孙组件共享数据。此时组件之间的嵌套关系比较复杂，可以使用 **provide** 和 **inject** 实现后代关系组件之间的数据共享。
![在这里插入图片描述](https://img-blog.csdnimg.cn/7bb95e74cafc4a3897b096b0a02ece4e.png#pic_center)

### 6.4.1 父节点通过 provide 共享数据

父节点的组件可以通过 **provide** 方法，对其子孙组件共享数据：

```javascript
<template>
  <div>
    <h1>App根组件</h1>
    <Son></Son>
  </div>
</template>
<script>
import Son from "./components/Son.vue";
export default {
  data() {
    return {
      color: "red", // 1. 定义“父组件”要想“子孙组件”共享的数据
    };
  },
  provide() {
    // 2. provide 函数 return 的对象中，包含了“要向子孙组件共享的数据”
    return {
      color: this.color,
    };
  },
  components: {
    Son,
  },
};
</script>
```

### 6.4.2 子孙节点通过 inject 接收数据

子孙节点可以使用 **inject** 数组，接收父级节点向下共享的数据。示例代码如下：

```javascript
<template>
  <div>
    <h3>Grandson组件 -- {{ color }}</h3>
  </div>
</template>

<script>
export default {
  // 子孙组件，使用 inject节点，接收父组件向下共享的数据，并在页面上使用
  inject: ["color"],
};
</script>
```

### 6.4.3 父节点对外共享响应式的数据

父节点使用 provide 向下共享数据时，可以结合 computed 函数向下共享响应式的数据。示例代码如下：

```javascript
<template>
  <div>
    <h1>App根组件</h1>
    <button @click="color = 'blue'">toggle blue</button>
    <Son></Son>
  </div>
</template>
<script>
// 1. 从 vue 中按需导入cpmputed函数
import Son from "./components/Son.vue";
import { computed } from "vue";
export default {
  data() {
    return {
      color: "red", // 1. 定义“父组件”要想“子孙组件”共享的数据
    };
  },
  provide() {
    // 2. provide 函数 return 的对象中，包含了“要向子孙组件共享的数据”
    return {
      // 3. 使用computed函数，可以把要共享的数据包装为响应式的数据
      color: computed(() => this.color),
    };
  },
  components: {
    Son,
  },
};
</script>
```

### 6.4.4 子孙节点使用响应式的数据

如果父级节点共享的是响应式的数据，则子孙节点必须以 `.value` 的形式进行使用()。示例代码如下：

```javascript
<template>
  <div>
  <!-- 响应式的数据，要以 .value的形式进行使用，但现在不加也可解析出数据-->
    <h3>Grandson组件 -- {{ color.value }}</h3>
  </div>
</template>

<script>
export default {
  // 子孙组件，使用 inject节点，接收父组件向下共享的数据，并在页面上使用
  inject: ["color"],
};
</script>
```

> 如果遇到错误提示不要慌，其实`.value`不用加也能解析出数据，以后会剔除 `.value`：
> [Vue warn]: injected property "color" is a ref and will be auto-unwrapped and no longer needs `.value` in the next minor release. To opt-in to the new behavior now, set `app.config.unwrapInjectedRef = true` (this config is temporary and will not be needed in the future.)

## 6.5 vuex

vuex 是终极的组件之间的数据共享方案。在企业级的 vue 项目开发中，vuex 可以让组件之间的数据共享变得高效、清晰、且易于维护。
![在这里插入图片描述](https://img-blog.csdnimg.cn/bf82859cfda1412a80c71781f788b8e6.png)

## 6.6 组件间的通信总结

- 父子关系
  ① 父 -> 子 属性绑定
  ② 子 -> 父 事件绑定
  ③ 父 <-> 子 组件上的 v-model
- 兄弟关系
  ④ EventBus
- 后代关系
  ⑤ provide & inject
- 全局大范围数据共享
  ⑥ vuex

# 7. vue 3.x 中全局配置 axios

## 7.1 为什么要全局配置 axios

在实际项目开发中，几乎每个组件中都会用到 axios 发起数据请求。此时会遇到如下两个问题：
① 每个组件中都需要导入 axios（代码臃肿）
② 每次发请求都需要填写完整的请求路径（不利于后期的维护）
![在这里插入图片描述](https://img-blog.csdnimg.cn/5958a6360bdd4b0f9213714e8a863a5f.png)

## 7.2 如何全局配置 axios

在 main.js 入口文件中，通过 app.config.globalProperties 全局挂载 axios，示例代码如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/511aefdf699b43a0ac016c6c59d37cd7.png)
在 main.js 文件中配置如下信息

```javascript
import { createApp } from "vue";
import App from "./App1.vue";
// 1. 导入 axios
import axios from "axios";
const app = createApp(App);
// 2. 为axios配置请求的根路径
axios.defaults.baseURL = "https://applet-base-api-t.itheima.net";
// 3. 将axios挂在为app的全局自定义属性，每个组件可以通过this直接访问到全局挂载的自定义属性
// 自定义属性可以自己命名如axios等 ,不一定取 $http
app.config.globalProperties.$http = axios;
app.mount("#app");
```

在组件中发起 axios 请求如下：

```javascript
<template>
  <div>
    <h1>App跟组件1</h1>
    <button @click="postInfo">发起post请求</button>
    <button @click="getInfo">发起get请求</button>
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
    async getInfo() {
      const { data: res } = await this.$http.get("/api/get", {
        params: {
          name: "ls",
          age: 21,
        },
      });
      console.log(res);
    },
  },
};
</script>
```

# 8. 自定义指令

对比 vue2 改动其实很小，内容和 vue2 很相似，权当复习

## 8.1 什么是自定义指令

vue 官方提供了 v-for、v-model、v-if 等常用的内置指令。除此之外 vue 还允许开发者自定义指令。
vue 中的自定义指令分为两类，分别是：

- 私有自定义指令
- 全局自定义指令

## 8.2 声明私有自定义指令的语法

在每个 vue 组件中，可以在 directives 节点下声明私有自定义指令。示例代码如下：

```javascript
<script>
export default {
  directives: {
    // 定义一个私有指令
    focus: {
      // 当被绑定的元素插入到DOM中时，自动触发 mounted 函数
      mounted(el) {
        el.focus(); // 让被绑定的元素自动获得焦点
      },
    },
  },
};
</script>
```

## 8.3 使用自定义指令

在使用自定义指令时，需要加上 v- 前缀。示例代码如下：

```xml
<!-- 申明自定义指令时，指令的名字是 focus -->
<!-- 使用自定义指令时，需要加上 v- 指令前缀 -->
<input type="text" v-fouus />
```

## 8.4 声明全局自定义指令的语法

全局共享的自定义指令需要通过“单页面应用程序的实例对象”进行声明，示例代码如下：

```javascript
import { createApp } from "vue";
const app = createApp(App);
// 注册一个全局自定义指令 v-focus
app.directive("focus", {
  // 当被绑定的元素插入到DOM中时，自动触发mounted函数
  mounted(el) {
    // 让元素获得焦点
    el.focus();
  },
});
```

## 8.5 updated 函数

mounted 函数只在元素第一次插入 DOM 时被调用，当 DOM 更新时 mounted 函数不会被触发。 updated 函数会在每次 DOM 更新完成后被调用。示例代码如下：

```javascript
app.directive("focus", {
  mounted(el) {
    // 第一次插入DOM时触发这个函数
    el.focus();
  },
  updated(el) {
    // 每次DOM更新时会自动触发updated函数
    el.focus();
  },
});
```

注意：在 vue2 的项目中使用自定义指令时，【 mounted -> bind 】【 updated -> update 】

## 8.6 函数简写

如果 mounted 和 updated 函数中的逻辑完全相同，则可以简写成如下格式：

```javascript
app.directive("focus", (el) => {
  // 在 mounted和updated时都会触发相同的业务处理，则可用简写
  el.focus();
});
```

## 8.7 指令的参数值

在绑定指令时，可以通过“等号”的形式为指令绑定具体的参数值，示例代码如下：

```javascript
<template>
  <h1>Post组件</h1>
  <!-- 在使用v-color自定义指令时，可用通过“等号”绑定指令的值 -->
  <p v-color="'blue'">hello 1</p>
  <p v-color="'green'">hello 2</p>
</template>
<script>
//==================
// 全局注册一个全局自定义指令 v-color 控制字体颜色
app.directive("color", (el, binding) => {
  // binding.value 即使通过 “等号” 为指令绑定的值
  el.style.color = binding.value;
});
```

# 9. vue-router

## 9.1 vue-router 的版本

vue-router 目前有 3.x 的版本和 4.x 的版本。其中：

- vue-router 3.x 只能结合 vue2 进行使用
- vue-router 4.x 只能结合 vue3 进行使用
  vue-router 3.x 的官方文档地址：[https://v3.router.vuejs.org/zh/](https://v3.router.vuejs.org/zh/)
  vue-router 4.x 的官方文档地址：[https://router.vuejs.org/zh/](https://router.vuejs.org/zh/)

## 9.2 vue-router 4.x 的基本使用步骤

① 在项目中安装 vue-router
② 定义路由组件
③ 声明路由链接和占位符
④ 创建路由模块
⑤ 导入并挂载路由模块

### 9.2.1 在项目中安装 vue-router

在 vue3 的项目中，只能安装并使用 vue-router 4.x。安装的命令如下：

```shell
npm install vue-router@4 -S
```

### 9.2.2 定义路由组件

在项目中定义 Home.vue、Movie.vue、About.vue 三个组件，将来要使用 vue-router 来控制它们的展示与切换：
![在这里插入图片描述](https://img-blog.csdnimg.cn/b1db2881384b4e2ca333dedd964757e8.png#pic_center)

### 9.2.3 声明路由链接和占位符

可以使用 `<router-link>` 标签来声明路由链接，并使用 `<router-view>` 标签来声明路由占位符。示例代码如下：

```xml
<template>
  <div>
    <h1>App 组件</h1>
    <!-- 声明路由链接 -->
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-link to="/movie">电影</router-link>
    <!-- 声明路由占位符 -->
    <router-view></router-view>
  </div>
</template>
```

### 9.2.4 创建路由模块

在项目中创建 router.js 路由模块，在其中按照如下 4 个步骤创建并得到路由的实例对象：
① 从 vue-router 中按需导入两个方法
② 导入需要使用路由控制的组件
③ 创建路由实例对象
④ 向外共享路由实例对象
⑤ 在 main.js 中导入并挂载路由模块

1、从 vue-router 中按需导入两个方法

```javascript
// 1. 从 vue-router中按需导入两个方法
// createRouter 方法 用于创建路由的实例对象
// createWebHashHistory 用于指定路由的工作模式(hash模式)
import { createRouter, createWebHashHistory } from "vue-router";
```

2、导入需要使用路由控制的组件

```javascript
// 2. 导入组件，这些组件将要以路由的方式，来控制他们的切换
import Home from "../components/router-start/Home.vue";
import Movie from "../components/router-start/Movie.vue";
import About from "../components/router-start/About.vue";
```

3、创建路由实例对象

```javascript
// 3.1 创建路由实例对象
const router = createRouter({
  // 3.2 通过routes数组，指定路由规则
  history: createWebHashHistory(),
  // path 是hash地址，component是要展示的组件
  routers: [
    { path: "/home", component: Home },
    { path: "/movie", component: Movie },
    { path: "/about", component: About },
  ],
});
```

4、向外共享路由实例对象

```javascript
// 4. 向外共享路由实例对象
// 供其他模块导入并使用
export default router;
```

5、在 main.js 中导入并挂载路由模块

```javascript
import { createApp } from "vue";
import App from "./components/router-start/About.vue";
// 1. 导入路由模块
import router from "./components/router-start/router.js";
const app = createApp(App);
//2. 挂在路由模块
// app.use()方法用来挂载“第三方插件模块”
app.use(router);
app.mount("#app");
```

## 9.3 路由高亮

可以通过如下的两种方式，将激活的路由链接进行高亮显示：
① 使用默认的高亮 class 类
② 自定义路由高亮的 class 类

### 9.3.1 默认的高亮 class 类

被激活的路由链接，默认会应用一个叫做 router-link-active 的类名。开发者可以使用此类名选择器，为激活的路由链接设置高亮的样式：

```css
/* 在index.css全局样式表中，重新router-link-active的样式 */
.router-link-active {
  background-color: red;
  color: white;
  font-weight: bold;
}
```

### 9.3.2 自定义路由高亮的 class 类

在创建路由的实例对象时，开发者可以基于 linkActiveClass 属性，自定义路由链接被激活时所应用的类名：

```javascript
const router = createRouter({
  // 指定被激活的路由链接，会应用router-active这个类名
  // 默认的router-link-active 类名会被覆盖掉
  linkActiveClass: "router-active",
  history: createWebHashHistory(),
  routers: [
    { path: "/home", component: Home },
    { path: "/movie", component: Movie },
    { path: "/about", component: About },
  ],
});
```

# 10. 常用组合式 API

官网教程：[https://v3.cn.vuejs.org/guide/composition-api-introduction.html](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)

## 10.1 setup

- setup 理解：Vue3.0 中一个新的配置项，值为一个函数。
- setup 是所有 Composition API（组合 API）“ 表演的舞台 ”
- 组件中所用到的：数据、方法等等，均要配置在 setup 中。
- setup 函数的两种返回值：
  - 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
  - 若返回一个渲染函数：则可以自定义渲染内容。（了解即可）
- 注意点：
  1.  尽量不要与 Vue2.x 配置混用
      - Vue2.x 配置（data、methos、computed...）中可以访问到 setup 中的属性、方法。
      - 但在 setup 中不能访问到 Vue2.x 配置（data、methos、computed...）。
      - 如果有重名, setup 优先。
  2.  setup 不能是一个 async 函数，因为返回值不再是 return 的对象, 而是 promise, 模板看不到 return 对象中的属性。（后期也可以返回一个 Promise 实例，但需要 Suspense 和异步组件的配合）

```javascript
// 只是演示setup，暂时不考虑响应式的问题
export default {
  setup() {
    //数据
    let name = "张三";
    //方法
    function sayHello() {
      alert(`我叫${name}`);
    }
    return {
      //返回一个对象，这里返回的任何内容都可以用于组件的其余部分
      name, // 返回数据，类比vue2定义在data中的数据
      sayHello, //返回的函数，它的行为与将其定义在 methods 选项中的行为相同
    };
  },
  // 组件的“其余部分”
};
```

---

setup 执行的时机

- 在 beforeCreate 之前执行一次，所以 this 是 undefined。

setup 的参数

- props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
- context：上下文对象，包括如下属性
  - attrs: 值为对象，包含：组件外部传递过来，但没有在 props 配置中声明的属性, 相当于 `this.$attrs`。
  - slots: 收到的插槽内容, 相当于 `this.$slots`。
  - emit: 分发自定义事件的函数, 相当于 `this.$emit`。

```javascript
import { reactive } from "vue";
export default {
  props: ["msg", "school"], // 外部传入的数据
  emits: ["hello"], // vue3新增，用来定义一个组件可以向其父组件触发的事件。
  setup(props, context) {
    console.log(context.attrs); //非响应式对象，相当与Vue2中的$attrs
    console.log(context.emit); //触发自定义事件的，等同于 $emit
    console.log(context.slots); //插槽，非响应式对象，等同于 $slots
    //数据
    let person = reactive({
      name: "张三",
      age: 18,
    });
    function test() {
      context.emit("hello", 666);
    }
    return {
      person,
      test,
    };
  },
};
```

## 10.2 ref 函数

- ref 函数作用: 定义响应式的数据
- 语法
  - `const xxx = ref(initValue)`
  - JS 中操作数据： `xxx.value`
  - 模板中读取数据: 不需要.value，直接：`<div>{{xxx}}</div>`
- 示例如下:

```javascript
<template>
  // 这里直接用 setup中定义的数据
  <h2>姓名：{{ name }}年龄：{{ age }}工作种类：{{ job.type }}</h2>
  <h3>工作薪水：{{ job.salary }}</h3>
  <button @click="changeInfo">修改人的信息</button>
</template>
// 1, 先导入ref
import { ref } from "vue";
export default {
  setup() {
    //数据
    let name = ref("张三");
    let age = ref(18);
    let job = ref({
      type: "前端工程师",
      salary: "300",
    });
    //方法
    function changeInfo() {
      name.value = '李四'
      age.value = 48
      job.value.type = 'UI设计师'
    }
    //返回一个对象（常用）
    return {
      name,
      age,
      job,
      changeInfo,
    };
  },
};
```

- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型(但对象一般用 reactive 函数)。
  - 基本类型的数据：响应式依然是靠`Object.defineProperty()`的`get`与`set`完成的（数据劫持）。
  - 对象类型的数据：内部“ 求助 ”了 Vue3.0 中的一个新函数—— `reactive`函数。

## 10.3 reactive 函数

- 作用: 定义一个**对象类型**的响应式数据（基本类型不要用它，要用`ref`函数）
- 语法：`const 代理对象= reactive(源对象)`接收一个对象（或数组），返回一个代理对象（Proxy 的实例对象，简称 proxy 对象）
- reactive 定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

```javascript
<template>
  <h2>姓名：{{ person.name }}</h2>
  <h3>工作种类：{{ person.job.type }}</h3>
  <h3>工作薪水：{{ person.job.salary }}</h3>
  <h3>爱好：{{ person.hobby }}</h3>
  <button @click="changeInfo">修改人的信息</button>
</template>
<script>
// 1. 导入 reactive
import { reactive } from "vue";
export default {
  name: "App",
  setup() {
    //数据
    let person = reactive({
      name: "张三",
      job: {
        type: "前端工程师",
        salary: "300元",
      },
      hobby: ["唱", "跳", "rap"],
    });
    //方法
    function changeInfo() {
      person.name = "李四";
      person.job.type = "UI设计师";
      person.hobby[0] = "学习";
      // 这里不用像vue2那样调用push,pop,shift,splice等更改数组的方法或set/Vue.set方法，也能实现响应式
    }
    //返回一个对象（常用）
    return {
      person,
      changeInfo,
    };
  },
};
</script>
```

## 10.4 reactive 对比 ref

- 从定义数据角度对比：
  - ref 用来定义：基本类型数据
  - reactive 用来定义：对象（或数组）类型数据。
  - 备注：ref 也可以用来定义对象（或数组）类型数据, 它内部会自动通过`reactive`转为代理对象。
- 从原理角度对比：
  - ref 通过 `Object.defineProperty()`的`get`与`set`来实现响应式（数据劫持）。
  - reactive 通过使用 Proxy 来实现响应式（数据劫持）, 并通过 Reflect 操作源对象内部的数据。
- 从使用角度对比：
  - ref 定义的数据：操作数据需要`.value`，读取数据时模板中直接读取不需要`.value`。
  - reactive 定义的数据：操作数据与读取数据：均不需要`.value`。

## 10.5 计算属性与监视

### 10.5.1 computed 函数

与 Vue2.x 中 computed 配置功能一致

示例：

```javascript
<template>
  <h1>一个人的信息</h1>
  姓：<input type="text" v-model="person.firstName">
  名：<input type="text" v-model="person.lastName">
  <div>全名：{{fullName}}</div>
  全名：<input type="text" v-model="fullName">
</template>
import {computed} from 'vue'
setup(){
	let person = reactive({
		firstName:'张',
		lastName:'三'
	})
	// let xxx = computed(() => {
		// 业务..
		return xxxxx;
	})
	//计算属性——简写（没有考虑计算属性被修改的情况）
    /* let fullName = computed(()=>{
        return person.firstName + '-' + person.lastName
    }) */
    //计算属性——完整（考虑读和写）
    let fullName = computed({
        get(){
            return person.firstName + '-' + person.lastName
        },
        set(value){
            const nameArr = value.split('-')
            person.firstName = nameArr[0]
            person.lastName = nameArr[1]
        }
    })
    return {
		person,fullName
	}
}
```

### 10.5.2 watch 函数

与 Vue2.x 中 watch 配置功能一致

两个**注意点**：

- 监视 reactive 定义的响应式数据时：oldValue 无法正确获取、且强制开启了深度监视（deep 配置失效）。
- 监视 reactive 定义的响应式数据中某个属性(当然通常是要监视对象属性才会去开 deep)时：deep 配置有效。

```javascript
import { ref, reactive, watch } from "vue";
let sum = ref(0);
let msg = ref("你好啊");
let person = reactive({
  name: "张三",
  age: 18,
  job: {
    j1: {
      salary: 20,
    },
  },
});
//情况一：监视ref定义的一个响应式数据
watch(
  sum,
  (newValue, oldValue) => {
    // 参数一：监视的是谁；参数二：监视的回调；参数三：监视的配置对象
    console.log("sum变化了", newValue, oldValue);
  },
  { immediate: true }
);

//情况二：监视多个ref定义的响应式数据
watch([sum, msg], (newValue, oldValue) => {
  console.log("sum或msg变化了", newValue, oldValue);
});

/* 情况三：监视reactive定义的响应式数据
			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
*/
watch(
  person,
  (newValue, oldValue) => {
    console.log("person变化了", newValue, oldValue);
  },
  { immediate: true, deep: false }
); //此处的deep配置不再奏效

//情况四：监视reactive定义的一个响应式数据中的某个属性
watch(
  () => person.name,
  (newValue, oldValue) => {
    console.log("person的name变化了", newValue, oldValue);
  },
  { immediate: true, deep: true }
);

//情况五：监视reactive定义的响应式数据中的某些属性
watch(
  [() => person.name, () => person.age],
  (newValue, oldValue) => {
    console.log("person的name或age变化了", newValue, oldValue);
  },
  { immediate: true, deep: true }
);

//特殊情况
watch(
  () => person.job,
  (newValue, oldValue) => {
    console.log("person的job变化了", newValue, oldValue);
  },
  { deep: true }
); //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
return { sum, msg, person };
```

watch 监视 ref 数据的说明

```javascript
let sum = ref(0);
let person = ref({
  name: "张三",
  age: 18,
  job: {
    j1: {
      salary: 20,
    },
  },
});
// watch监听的是RefImpl对象，不要写sum.value。
// 否则取出的就是真正的值数字0，无法监听!!
watch(sum, (newValue, oldValue) => {
  console.log("sum的值变化了", newValue, oldValue);
});
// 通过ref传对象(不推荐)，内部还是调用reactive方法，将proxy代理对象赋值给 RefImpl.value，所以需要监听value的值
watch(person.value, (newValue, oldValue) => {
  console.log("person.value", newValue, oldValue);
});
// 或者不写.value，而开启deep。因为这个person是RefImpl对象，由reactive创建的响应式数据默认就是“深层”监视的，不用特意去写deep
watch(
  person,
  (newValue, oldValue) => {
    console.log("person的值变化了", newValue, oldValue);
  },
  { deep: true }
);
```

### 10.5.3 watchEffect 函数

- watch 的套路是：既要指明监视的属性，也要指明监视的回调。
- watchEffect 的套路是：不用指明监视哪个属性，监视的回调中用到哪些属性，那就监视哪些属性。
- watchEffect 有点像 computed：
  - 但 computed 注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而 watchEffect 更注重的是过程（回调函数的函数体），所以不用写返回值。

```javascript
import { ref, reactive, watch, watchEffect } from "vue";
export default {
  setup() {
    //数据
    let sum = ref(0);
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          salary: 20,
        },
      },
    });
    //监视
    /* watch(sum,(newValue,oldValue)=>{
				console.log('sum的值变化了',newValue,oldValue)
			},{immediate:true}) */
    //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。注意是所用到的数据
    watchEffect(() => {
      const x1 = sum.value;
      const x2 = person.job.j1.salary;
      console.log("watchEffect所指定的回调执行了");
    });
    //返回一个对象（常用）
    return { sum, person };
  },
};
```

## 10.6 生命周期函数

- Vue3.0 中可以继续使用 Vue2.x 中的生命周期钩子，但有有两个被更名：
  - `beforeDestroy`改名为 `beforeUnmount`
  - `destroyed`改名为 `unmounted`
- Vue3.0 也提供了 Composition API 形式的生命周期钩子，与 Vue2.x 中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`

```javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
export default {
  setup() {
    //通过组合式API的形式去使用生命周期钩子
    onBeforeMount(() => {
      console.log("---onBeforeMount---");
    });
    onMounted(() => {
      console.log("---onMounted---");
    });
    onBeforeUpdate(() => {
      console.log("---onBeforeUpdate---");
    });
    onUpdated(() => {
      console.log("---onUpdated---");
    });
    onBeforeUnmount(() => {
      console.log("---onBeforeUnmount---");
    });
    onUnmounted(() => {
      console.log("---onUnmounted---");
    });
  },
};
```

## 10.7 自定义 hook 函数

- 什么是 hook？—— 本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装。
- 类似于 vue2.x 中的 mixin。
- 自定义 hook 的优势: 复用代码, 让 setup 中的逻辑更清楚易懂。

1、单独新建 js 文件，引入 Composition API，最终暴露一个函数，在函数体中书写功能代码

```javascript
import { reactive, onMounted, onBeforeUnmount } from "vue";
export default function () {
  //实现鼠标“打点”相关的数据
  let point = reactive({
    x: 0,
    y: 0,
  });
  //实现鼠标“打点”相关的方法
  function savePoint(event) {
    point.x = event.pageX;
    point.y = event.pageY;
    console.log(event.pageX, event.pageY);
  }
  //实现鼠标“打点”相关的生命周期钩子
  onMounted(() => {
    window.addEventListener("click", savePoint);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", savePoint);
  });
  return point;
}
```

2、导入，并调用导入的函数

```javascript
<template>
  <h2>当前点击时鼠标的坐标为：x：{{ point.x }}，y：{{ point.y }}</h2>
</template>
<script>
import usePoint from "../hooks/usePoint";
export default {
  name: "Demo",
  setup() {
    let point = usePoint();
    //返回一个对象（常用）
    return { point };
  },
};
</script>
```

## 10.8 toRef

- 作用：创建一个 ref 对象，其 value 值指向另一个对象中的某个属性，保持对其源 属性的响应式连接。
- 语法：`const xxx = toRef(person,'name')`
- 应用场景: 要将响应式对象中的某个属性单独提供给外部使用时。
- 扩展：`toRefs`与`toRef`功能一致，但可以批量创建多个 ref 对象，语法：`toRefs(person)`

说明示例：

```javascript
const person = reactive({
  name: "zs",
  age: 20,
});
const age2 = person.age;
age2++; // 这个不会影响源数据age的值，也就是age2这个不是响应式的
const ageRef = toRef(person, "age");
ageRef.value++; // 对ageRef的值的修改也会响应到源对象的age属性上
console.log(person.foo); // 21
```

有时用来简化模板里的写法，示例：

```javascript
<template>
  <h4>{{ person }}</h4>
  <h2>姓名：{{ name }}</h2>
  <h2>薪资：{{ job.j1.salary }}K</h2>
  <button @click="name += '~'">修改姓名</button>
  <button @click="job.j1.salary++">涨薪</button>
</template>
<script>
import { reactive, toRef, toRefs } from "vue";
export default {
  setup() {
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          salary: 20,
        },
      },
    });
    const x = toRefs(person);
    console.log("******", x);
    //返回一个对象（常用）
    return {
      person,
      // name:toRef(person,'name'),
      // age:toRef(person,'age'),
      // salary:toRef(person.job.j1,'salary'),
      ...toRefs(person),
    };
  },
};
</script>
```

# 11. 其他组合式 API

## 11.1 shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

- 应用场景
  - 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

示例：

```javascript
<template>
  <h4>当前的x.y值是：{{ x.y }}</h4>
  <button @click="x = { y: 888 }">点我替换x</button>
  <button @click="x.y++">点我x.y++</button> // 不起作用的
  <hr />
  <h4>{{ person }}</h4>
  <h2>年龄：{{ age }}</h2>
  <h2>薪资：{{ job.j1.salary }}K</h2>
  <button @click="age++">增长年龄</button>
  <button @click="job.j1.salary++">涨薪</button>
</template>

<script>
import { ref, reactive, toRef, toRefs, shallowReactive, shallowRef } from "vue";
export default {
  setup() {
    //只考虑第一层数据的响应式
    let person = shallowReactive({
      age: 18,
      job: {
        j1: {
          salary: 20,
        },
      },
    });
    let x = shallowRef({ // 不会监视y的数据变化
      y: 0,
    });
    //返回一个对象（常用）
    return {
      x,
      person,
      ...toRefs(person),
    };
  },
};
</script>
```

## 11.2 readonly 与 shallowReadonly

- readonly: 让一个**响应式数据**变为**只读**的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时(如数据是别的组件传过来的，允许你用但不希望你修改)。

```javascript
import { ref, reactive, toRefs, readonly, shallowReadonly } from "vue";
export default {
  setup() {
    let sum = ref(0);
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          salary: 20,
        },
      },
    });
    person = readonly(person);
    // person = shallowReadonly(person) // 一层为只读，深层还是能改的
    // sum = readonly(sum)
    return { sum, ...toRefs(person) };
  },
};
```

## 11.3 toRaw 与 markRaw

toRaw：

- 作用：将一个由`reactive`生成的**响应式对象**转为**普通对象**(ref 生成的不行)。
- 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。

```javascript
const foo = {};
const reactiveFoo = reactive(foo);
console.log(toRaw(reactiveFoo) === foo); // true
```

markRaw：

- 作用：标记一个对象，使其永远不会再成为响应式对象。
- 应用场景:
  1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
  2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

```javascript
const foo = markRaw({});
console.log(isReactive(reactive(foo))); // false
// 嵌套在其他响应式对象中时也可以使用
const bar = reactive({ foo });
console.log(isReactive(bar.foo)); // false
```

## 11.4 customRef

作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

实现防抖效果：

```javascript
<template>
	<input type="text" v-model="keyword">
	<h3>{{keyword}}</h3>
</template>

<script>
	import {ref,customRef} from 'vue'
	export default {
		name:'Demo',
		setup(){
			// let keyword = ref('hello') //使用Vue准备好的内置ref
			//自定义一个myRef
			function myRef(value,delay){
				let timer
				//通过customRef去实现自定义
				return customRef((track,trigger)=>{
					return{
						get(){
							track() //告诉Vue这个value值是需要被“追踪”的
							return value
						},
						set(newValue){
							clearTimeout(timer)
							timer = setTimeout(()=>{
								value = newValue
								trigger() //告诉Vue去更新界面
							},delay)
						}
					}
				})
			}
			let keyword = myRef('hello',500) //使用程序员自定义的ref
			return {
				keyword
			}
		}
	}
</script>
```

## 11.5 响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

```javascript
import {
  ref,
  reactive,
  toRefs,
  readonly,
  isRef,
  isReactive,
  isReadonly,
  isProxy,
} from "vue";
export default {
  setup() {
    let car = reactive({ name: "奔驰", price: "40W" });
    let sum = ref(0);
    let car2 = readonly(car);
    console.log(isRef(sum)); // true
    console.log(isReactive(car)); // true
    console.log(isReadonly(car2)); // true
    console.log(isProxy(car)); // true
    console.log(isProxy(sum)); // false
    return { ...toRefs(car) };
  },
};
```

## 11.6 Composition API 的优势

### 11.6.1 Options API 存在的问题

使用传统 OptionsAPI 中，新增或者修改一个需求，就需要分别在 data，methods，computed 里修改 。
![在这里插入图片描述](https://img-blog.csdnimg.cn/5a9c0c345ea846d39c600292694c1e46.gif#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/a715b45280704ee0a028e6b5c4c7691e.gif#pic_center)

### 11.6.2 Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。
![在这里插入图片描述](https://img-blog.csdnimg.cn/e3544ceafb784ef388c82612ef18b1d3.gif#pic_center)
要让组合式 API 发挥其特点，把数据，方法，计算属性等按功能点进行封装，封装出来的就是 hook 函数.
![在这里插入图片描述](https://img-blog.csdnimg.cn/42ff0f5b152145b281537b40c036ef1f.gif#pic_center)

# 12. 新的组件

## 12.1 Fragment

- 在 Vue2 中: 组件必须有一个根标签
- 在 Vue3 中: 组件可以没有根标签, 内部会将多个标签包含在一个 Fragment 虚拟元素中
- 好处: 减少标签层级, 减小内存占用

## 12.2 Teleport

什么是 Teleport？—— `Teleport` 是一种能够将我们的组件 html 结构**移动到指定位置**的技术。有时用于模态框/弹窗。

```xml
<teleport to="移动位置"> <!-- css选择器 --> <!--如： <teleport to="body"> -->
	<div v-if="isShow" class="mask">
		<div class="dialog">
			<h3>我是一个弹窗</h3>
			<button @click="isShow = false">关闭弹窗</button>
		</div>
	</div>
</teleport>
```

## 12.3 Suspense(试验中)

作用：等待异步组件时渲染一些额外内容，让应用有更好的用户体验。可用于网速慢，组件加载慢，用一些 loading 效果替换
`<suspense>` 组件有两个插槽。它们都只接收一个直接子节点。**default** 插槽里的节点会尽可能展示出来。如果不能，则展示 **fallback** 插槽里的节点。

使用步骤：

- 异步引入组件

```javascript
// import Child from './components/Child'//这种是静态引入
import { defineAsyncComponent } from "vue";
const Child = defineAsyncComponent(() => import("./components/Child.vue")); // 这种是异步引入
```

- 使用`Suspense`包裹组件，并配置好`default`与 `fallback`

```javascript
<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Suspense>
      <template v-slot:default>
        <Child />
      </template>
      <template v-slot:fallback>
        <h3>加载中.....</h3>
      </template>
    </Suspense>
  </div>
</template>
```

# 13. vue 响应式原理

## 13.1 vue2.x 的响应式

实现原理：

- 对象类型：通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）。
- 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

```javascript
Object.defineProperty(data, "count", {
  get() {},
  set() {},
});
```

存在问题：

- 新增属性、删除属性, 界面不会更新。
- 直接通过下标修改数组, 界面不会自动更新。

简单模拟 Vue2 中实现响应式

```javascript
// 源数据
let person = {
  name: "张三",
  age: 18,
};
// 模拟Vue2中实现响应式
// 准备一个空对象
let p = {};
Object.defineProperty(p, "name", {
  configurable: true,
  get() {
    //有人读取name时调用
    return person.name;
  },
  set(value) {
    //有人修改name时调用
    console.log("有人修改了name属性，我发现了，我要去更新界面！");
    person.name = value;
  },
});
Object.defineProperty(p, "age", {
  get() {
    //有人读取age时调用
    return person.age;
  },
  set(value) {
    //有人修改age时调用
    console.log("有人修改了age属性，我发现了，我要去更新界面！");
    person.age = value;
  },
});
```

## 13.2 Vue3.0 的响应式

实现原理:

- 通过 Proxy（代理）: 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
- 通过 Reflect（反射）: 对源对象的属性进行操作。

```javascript
new Proxy(data, {
  // 拦截读取属性值
  get(target, prop) {
    return Reflect.get(target, prop);
  },
  // 拦截设置属性值或添加新属性
  set(target, prop, value) {
    return Reflect.set(target, prop, value);
  },
  // 拦截删除属性
  deleteProperty(target, prop) {
    return Reflect.deleteProperty(target, prop);
  },
});
```

MDN 文档中描述的 Proxy 与 Reflect：

- Proxy：[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- Reflect：[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

```javascript
//源数据
let person = {
  name: "张三",
  age: 18,
};
//模拟Vue3中实现响应式
const p = new Proxy(person, {
  //有人读取p的某个属性时调用
  get(target, propName) {
    console.log(`有人读取了p身上的${propName}属性`);
    return Reflect.get(target, propName);
  },
  //有人修改p的某个属性、或给p追加某个属性时调用
  set(target, propName, value) {
    console.log(`有人修改了p身上的${propName}属性，我要去更新界面了！`);
    Reflect.set(target, propName, value);
  },
  //有人删除p的某个属性时调用
  deleteProperty(target, propName) {
    console.log(`有人删除了p身上的${propName}属性，我要去更新界面了！`);
    return Reflect.deleteProperty(target, propName);
  },
});
```

# 14. 其他改动

## 14.1 全局 API 的转移

Vue 2.x 有许多全局 API 和配置。

- 例如：注册全局组件、注册全局指令等。

```javascript
//注册全局组件
Vue.component('MyButton', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})

//注册全局指令
Vue.directive('focus', {
  inserted: el => el.focus()
}
```

- Vue3.0 中对这些 API 做出了调整,将全局的 API，即：`Vue.xxx`调整到应用实例（`app`）上

| 2.x 全局 API（`Vue`）    | 3.x 实例 API (`app`)        |
| ------------------------ | --------------------------- |
| Vue.config.xxxx          | app.config.xxxx             |
| Vue.config.productionTip | 移除                        |
| Vue.component            | app.component               |
| Vue.directive            | app.directive               |
| Vue.mixin                | app.mixin                   |
| Vue.use                  | app.use                     |
| Vue.prototype            | app.config.globalProperties |

## 14.2 其他改变

- data 选项应始终被声明为一个函数。
- 过渡类名的更改：

```css
//Vue2.x写法
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-leave,
.v-enter-to {
  opacity: 1;
}
//========分割线=========

// Vue3.x写法
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

- 移除 keyCode 作为 v-on 的修饰符，同时也不再支持`config.keyCodes`

---

- 移除`v-on.native`修饰符。
  > 同时，新增的 emits 选项允许子组件定义真正会被触发的事件。
  > 对于子组件中未被定义在 emits 的所有事件监听器，将作为原生事件监听器添加到子组件的根元素中

父组件中绑定事件

```javascript
<my-component
  v-on:close="handleComponentEvent"
  v-on:click="handleNativeClickEvent"
/>
```

子组件中声明自定义事件

```javascript
<script>
  export default {
    emits: ['close']
  }
</script>
```

---

- 移除过滤器（filter）
  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

更多改动，可参照官网：[https://v3.cn.vuejs.org/guide/migration/introduction.html](https://v3.cn.vuejs.org/guide/migration/introduction.html)
