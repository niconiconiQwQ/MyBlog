---
title: vuex+动画+过渡+ESlint
date: 2022/07/16 09:16
categories: [Vuex]
stick: false
description: vuex+动画+过渡+ESlint
keyword: vuex
---

# vuex+动画+过渡+ESlint

笔记未完结，后续还需修改

# 1. Vuex

## 1.1 Vuex 概述

### 1.1.1 什么是 Vuex

Vuex 是实现组件全局状态(数据）管理的一种机制，是实现集中式状态（数据）管理的一个 Vue 插件，可以方便的实现组件之间威据的共享。
![在这里插入图片描述](https://img-blog.csdnimg.cn/e825dbd47b5e4b3a908ca116ab3fd62c.png#pic_center)

> 知识回顾：组件之间的共享数据方式
>
> - 父向子传值:v-bind 属性绑定
> - 子向父传值: v-on 事件绑定
> - 兄弟组件之间共享数据: EventBus
> - $on：接收数据的那个组件
> - $emit：发送数据的那个组件

### 1.1.2 使用 Vuex 统一管理状态的好处

- 能够在 vuex 中集中管理共享的数据，易于开发和后期维护
- 能够高效地实现组件之间的数据共享，提高开发效率
- 存储在 vuex 中的数据都是响应式的，能够实时保持数据与页面的同步

### 1.1.3 什么样的数据适合存储到 Vuex 中

一般情况下，只有组件之间共享的数据，才有必要存储到 vuex 中;对于组件中的私有数据，依旧存储在组件自身的 data 中即可。

## 1.2 Vuex 的基本使用

1、安装 vuex 依赖包(Vue2 项目用 vuex3，Vue3 项目用 vuex4)

```shell
npm install vuex@3 --save
npm install vuex --save # 默认下最新的
```

2、创建文件：`src/store/index.js`

```javascript
//引入Vue核心库
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//应用Vuex插件
Vue.use(Vuex);
//准备actions对象——响应组件中用户的动作
const actions = {};
//准备mutations对象——修改state中的数据
const mutations = {};
//准备state对象——保存具体的数据
const state = {};
//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
});
```

3、，在`main.js`中将 store 对象挂载到 vue 实例中

```javascript
//引入store
import store from "./store/index.js";
const app = new Vue({
  render: (h) => h(App),
  // 将创建的共享数据对象，挂载到Vue实例中
  // 所有的组件，就可以直接从store中获取全局的数据
  store,
});
app.$mount("#app");
```

## 1.3 Vuex 的核心概念

Vuex 中的主要核心概念如下：

- State
- Mutaion
- Action
- Getter

![在这里插入图片描述](https://img-blog.csdnimg.cn/921f14914eed4f9ca998036281b1af44.png#pic_center)

### 1.3.1 State

state 提供唯一的公共数据源，所有共享的数据都要统一放到 Store 的 State 中进行存储

```javascript
// 创建store数据源，提供唯一公共数据
const store = new Vuex.Store({
  state: { count: 0 },
});
```

组件访问 State 中数据的第一种方式

```javascript
this.$store.state.全局数据名称; // 在template标签里，this可以省略
```

组件访问 State 中数据的第二种方式

```javascript
// 从 vuex 中按需导入 mapState 函数
import { mapState } from "vuex";
```

通过导入的 mapState 函数，将当前组件需要的全局数据，映射为当前组件的 computed 计算属性

```javascript
computed: {
  ...mapState(['count'])
}
```

### 1.3.2 Mutation

Mutation 用于变更 Store 中的数据
① 只能通过 mutation 变更 Store 数据，不可以直接操作 Store 中的数据
② 通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有数据的变化

定义 Mutation

```javascript
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    add(state) {
      // 变更状态
      state.count++;
    },
  },
});
```

触发 mutation

```javascript
methods: {
  handle1() {
    // 触发mutations的第一种方式
    this.$store.commit("add");
  },
},
```

#### 1.3.2.1 带参数触发 mutations

可以在触发 mutation 时传递参数：

```javascript
// 定义Mutation
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    addN(state, step) {
      // 变更状态
      state.count += step;
    },
  },
});
```

```javascript
// 触发mutation
methods: {
  handle1() {
    // 在调用commit函数时，携带参数。commit的作用就是调用某个mutation 函数
    this.$store.commit("addN", 3);
  },
},
```

#### 1.3.2.2 触发 mutation 方式二

this.$store.commit()是触发 mutations 的第一种方式，触发 mutations 的第二种方式如下：

```javascript
// 1. 从 vuex 中按需导入 mapMutations 函数
import { mapMutations } from "vuex";
```

通过导入的 mapMutations 函数，将需要的 mutations 函数，映射为当前组件的 methods 方法

```javascript
// 2. 将指定的mutations函数，映射为当前组件的methods函数
methods: {
  ...mapMutations(['add', 'addN'])
}
```

注意：在 mutations 中，不支持异步操作，如 setTimeout 等

### 1.3.3 Action

Action 用于处理异步任务
如果通过异步操作变更数据，必须通过 Action，而不能使用 Mutation，但是在 Action 中还是要通过触发 mutation 的方式间接变更数据

```javascript
// 定义Action
const store = new Vuex.Store({
  // ...省略其他代码
  mutations: {
    add(state) {
      state.count++;
    },
  },
  actions: {
    // 在action中，不能直接修改 state中的数据
    // 必须通过 commit 触发某个mutations 中的函数
    addAsync(context) {
      setTimeout(() => {
        context.commit("add");
      }, 1000);
    },
  },
});
```

#### 1.3.3.1 触发 Actions 方式一

```javascript
// 触发 Action
methods: {
  handle(){
    // 触发 actions的第一种方式
    this.$store.dispatch('addAsync')
  }
}
```

同样触发 actions 异步任务时可以携带参数

```javascript
const store = new Vuex.Store({
  // ...省略其他代码
  mutations: {
    addN(state, step) {
      state.count += step;
    },
  },
  actions: {
    addAsync(context, setp) {
      setTimeout(() => {
        context.commit("addN", step);
      }, 1000);
    },
  },
});
// ===========分隔符===============
methods: {
  handle(){
    // 调用dispatch函数时，携带参数
    this.$store.dispatch('addAsync', 5)
  }
}
```

#### 1.3.3.2 触发 actions 方式二

this.$store.dispatch()是触发 actions 的第一种方式，触发 actions 的第二种方式如下

```javascript
// 1. 从 vuex 中按需导入 mapActions 函数
import { mapActions } from "vuex";
```

通过导入的 mapActions 函数，将需要的 actions 函数，映射为当前组件的 methods 方法：

```javascript
// 2. 将指定的actions函数，映射为当前组件的methods函数
methods: {
  ...mapActions(['addAsync', 'addNAsync'])
}
```

### 1.3.4 Getter

Getter 用于对 Store 中的数据进行加工处理形成新的数据
① Getter 可以对 Store 中已有的数据加工处理之后形成新的数据，类似 Vue 的计算属性
② Store 中数据发生变化，Getter 的数据也会跟着变化

```javascript
// 定义 Getter
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  // getter 不会修改state里的数据，只起到包装作用
  getters: {
    showNum: (state) => {
      return `当前最新的数量是${state.count}`;
    },
  },
});
```

- 使用 getters 的第一种方式：

```javascript
this.$store.getters.名称;
```

- 使用 getters 的第二种方式：

```javascript
import { mapGetters } from 'vuex';
computed: {
  ...mapGetters(['showNum'])
}
```

### 1.3.5 四个 map 方法汇总

1、 mapState 方法：用于帮助我们映射`state`中的数据为计算属性

```javascript
computed: {
    //借助mapState生成计算属性：sum、school、subject（对象写法）
     ...mapState({sum:'sum',school:'school',subject:'subject'}),

    //借助mapState生成计算属性：sum、school、subject（数组写法）
    ...mapState(['sum','school','subject']),
},
```

2、mapGetters 方法：用于帮助我们映射`getters`中的数据为计算属性

```javascript
computed: {
    //借助mapGetters生成计算属性：bigSum（对象写法）
    ...mapGetters({bigSum:'bigSum'}),

    //借助mapGetters生成计算属性：bigSum（数组写法）
    ...mapGetters(['bigSum'])
},
```

3、mapActions 方法：用于帮助我们生成与`actions`对话的方法，即：包含`$store.dispatch(xxx)`的函数

```javascript
methods:{
    //靠mapActions生成：incrementOdd、incrementWait（对象形式）
    ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})

    //靠mapActions生成：incrementOdd、incrementWait（数组形式）
    ...mapActions(['jiaOdd','jiaWait'])
}
```

4、mapMutations 方法：用于帮助我们生成与`mutations`对话的方法，即：包含`$store.commit(xxx)`的函数

```javascript
methods:{
    //靠mapActions生成：increment、decrement（对象形式）
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),

    //靠mapMutations生成：JIA、JIAN（对象形式）
    ...mapMutations(['JIA','JIAN']),
}
```

备注：mapActions 与 mapMutations 使用时，若**需要传递参数**：必须在模板中绑定事件时传递好参数，否则参数是事件对象。

### 1.3.6 Module

为了解决多种数据分类更加明确，增加后期维护性，可以将 store 分割成模块。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块

#### 1.3.6.1 基本使用

```javascript
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { count: 0),
  mutations: {
	 increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
 },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

注意的是：对于模块内部的 mutation 和 getter，接收的第一个参数是模块的**局部状态对象**，actions 中的**局部状态**通过 context.state 暴露出来

#### 1.3.6.2 命名空间用法

在`src/store/index.js`文件(若没有则创建)中，定义如下两个局部状态 countAbout 和 personAbout

```javascript
const countAbout = {
  namespaced:true,//开启命名空间
  state:{sum:1},
  mutations: { ... },
  actions: { ... },
  getters: {
    bigSum(state){
       return state.sum * 10
    }
  }
}
const personAbout = {
  namespaced:true,//开启命名空间
  state:{ ... },
  mutations: { ... },
  actions: { ... }
}
// 如果上个布局的状态内容越来越多，建议分离出去，单独导入
const store = new Vuex.Store({
  modules: {
    countAbout,
    personAbout
  }
})
```

开启命名空间后，组件中读取 state 数据：

```javascript
//方式一：自己直接读取
this.$store.state.personAbout.list // 缺点比较长
//方式二：借助mapState读取：
...mapState('countAbout',['sum','school','subject'])// 参数一为模块的空间名称
```

开启命名空间后，组件中读取 getters 数据：

```javascript
//方式一：自己直接读取
this.$store.getters['personAbout/firstPersonName']
//方式二：借助mapGetters读取：
...mapGetters('countAbout',['bigSum'])
```

开启命名空间后，组件中调用 dispatch

```javascript
//方式一：自己直接dispatch
this.$store.dispatch('personAbout/addPersonWang',person)
//方式二：借助mapActions：
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```

开启命名空间后，组件中调用 commit

```javascript
//方式一：自己直接commit
this.$store.commit('personAbout/ADD_PERSON',person)
//方式二：借助mapMutations：
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
```

# 4. Vue 封装的过渡与动画

概述：在插入、更新或移除 DOM 元素时，在合适的时候给元素添加样式类名。
作用范围：一般搭配 v-if、v-show、动态组件、组件根节点来使用。

1、准备好样式：

- 元素进入的类名：
  1.  v-enter：进入的起点
  2.  v-enter-active：进入过程中
  3.  v-enter-to：进入的终点
- 元素离开的类名：
  1.  v-leave：离开的起点
  2.  v-leave-active：离开过程中
  3.  v-leave-to：离开的终点

![在这里插入图片描述](https://img-blog.csdnimg.cn/d161d411c86449f082f685e027df6312.png#pic_center)
2、使用`<transition>`包裹要过渡的元素，并配置 name 属性( 若没配置 name，v- 是上述类名的默认前缀，配置了，则以 name 的值作为前缀 如：`hello-enter`)：

小示例：

```javascript
<button @click="isShow = !isShow">显示/隐藏</button>
<transition name="hello" appear>// 如果加上appear属性，表示一出现就有动画
  <h1 v-show="isShow">你好啊！</h1>
</transition>
//=====================================
h1 {
  background-color: orange;
}
.hello-enter-active {
  animation:  0.5s linear;
}
.hello-leave-active {
  animation: slider 0.5s linear reverse;
}
@keyframes slider {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}
```

备注：若有多个元素需要过度，则需要使用：`<transition-group>`，且每个元素都要指定`key`值。

小示例：

```javascript
<button @click="isShow = !isShow">显示/隐藏</button>
<transition-group name="hello" appear>
	<h1 v-show="!isShow" key="1">你好啊！</h1>
	<h1 v-show="isShow" key="2">hihihihihi！</h1>
</transition-group>
//===============================
h1{
	background-color: orange;
}
/* 进入的起点、离开的终点 */
.hello-enter,.hello-leave-to{
	transform: translateX(-100%);
}
.hello-enter-active,.hello-leave-active{
	transition: 0.5s linear;
}
/* 进入的终点、离开的起点 */
.hello-enter-to,.hello-leave{
	transform: translateX(0);
}
```

# 6. ESlint
