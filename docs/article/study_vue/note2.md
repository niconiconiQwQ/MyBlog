---
title: Vue组件化开发
date: 2022/07/13 20:28
categories: [Vue]
stick: false
description: Vue组件化开发
keyword: Vue
---

# 组件化开发

# 1. 组件化开发的概念和好处

1、组件化开发指的是：根据封装的思想，把页面上可重用的 UI 结构封装为组件，从而方便项目的开发和维护。

2、前端组件化开发的好处主要体现在以下两方面：

- 提高了前端代码的复用性和灵活性
- 提升了开发效率和后期的可维护性

3、 vue 中的组件化开发

- vue 是一个支持组件化开发的前端框架。
- vue 中规定：组件的后缀名是 .vue。之前接触到的 App.vue 文件本质上就是一个 vue 的组件。

# 2. vue 组件的三个组成部分

每个 .vue 组件都由 3 部分构成，分别是：

- template -> 组件的模板结构
- script -> 组件的 JavaScript 行为
- style -> 组件的样式

其中，每个组件中必须包含 template 模板结构，而 script 行为和 style 样式是可选的组成部分。

## 2.1 template

- vue 规定：每个组件对应的模板结构，需要定义到 `<template>` 节点中。
- 在组件的`<template>` 节点中，支持使用前面所学的指令语法，来辅助开发者渲染当前组件的 DOM 结构。

```xml
<template>
<!-- 当前组件的DOM结构，需要定义到template 标签的内部 -->
</template>
```

注意：

- **template** 是 vue 提供的容器标签，只起到**包裹性质**的作用，它不会被渲染为真正的 DOM 元素

> **vue2 和 vue3 的区别**
> 在 vue 2.x 的版本中，`<template>` 节点内的 DOM 结构仅支持单个根节点：
>
> ```xml
> <template>
>   <!-- 在vue 2.x中，template节点内的所有元素，最外层必须有唯一的根节点进行包裹，否则报错 -->
>   <div>
>     <h1>这是App.vue根组件</h1>
>     <h3>abc</h3>
>   </div>
> </template>
> ```
>
> 但是，在 vue 3.x 的版本中，`<template>` 中支持定义多个根节点：
>
> ```xml
> <template>
>   <!-- vue 3.x -->
>   <!-- 这是包含多个根结点的template结构，h1,h3标签外面没有包裹性质的根元素 -->
>   <h1>这是App.vue根组件</h1>
>   <h3>abc</h3>
> </template>
> ```

## 2.2 script

vue 规定：组件内的`<script>` 节点是可选的开发者可以在 `<script>` 节点中封装组件的 JavaScript 业务逻辑。`<script >` 节点的基本结构如下：

```javascript
<script>
  // 组件相关的data数据，method方法等 // 都需要定义到 export
  default所导出的对象中 export default {}
</script>
```

### 2.2.1 script 中的 name 节点

可以通过 name 节点为当前组件定义一个名称：

```xml
<script>
export default {
  // name 属性指向的是当前组件的名称，建议每个单词的首字母大写
  name: "MyApp",
};
</script>
```

在使用 vue-devtools 进行项目调试的时候，自定义的组件名称可以清晰的区分每个组件：

![在这里插入图片描述](https://img-blog.csdnimg.cn/3a57ae5500654449bd3253948b8f6586.png)

### 2.2.2 script 中的 data 节点

vue 组件渲染期间需要用到的数据，可以定义在 data 节点中：

```javascript
<script>
export default {
  name: "MyApp",
  // 组件的数据 data方法中，return出去的对象，就是当前组件渲染期间需要用到的数据对象
  data() {
    return {
      username: "凉宫",
    };
  },
};
// data:function(){} 简写为 data(){}
// 注意不能用箭头函数，Vue管理的函数一旦写了箭头函数，this指向就可能不是vue了，可能是window。
</script>
```

注意：vue 中规定，组件中的 data 必须是一个**函数**，不能直接指向一个数据对象。为了避免组件被复用时，数据存在引用关系。

> 知识补充：
> data 内的属性会挂载到 vm 上，不光是 data 中的数据能显示在模板中，其实 vm 身上的所有属性及 Vue 原型上的所有属性，在 vue 模板中都可以直接使用

### 2.2.3 script 中的 methods 节点

组件中的事件处理函数，必须定义到 methods 节点中，示例代码如下：

```javascript
<script>
export default {
  name: "MyApp",
  // 组件的数据 data方法中，return出去的对象，就是当前组件渲染期间需要用到的数据对象
  data() {
    return {
      count: 0,
    };
  },
  methods: { //处理函数
    addCount() {
      this.count++;
    },
  },
};
</script>
```

## 2.3 style

vue 规定：组件内的 `<style>` 节点是可选的，开发者可以在 `<style>` 节点中编写样式美化当前组件的 UI 结构。

```xml
<style>
  h1{
    font-weight: normal;
  }
</style>
```

其中 `<style>` 标签上的 lang="css" 属性是可选的，它表示所使用的样式语言。；默认只支持普通的 css 语法，可选值还有 **less**、**scss** 等。

```xml
<style lang="less">
h1{
  font-weight: normal;
  span{
    color: red;
  };
}
</style>
```

如果希望使用 less 语法编写组件的 style 样式，可以按照如下三个步骤进行配置：
① 运行 npm install less less-loader -D 命令安装依赖包，从而提供 less 语法的编译支持。注意下载 less 和 less-loader 之间兼容的版本
② 在 `<style>` 标签上添加 lang="less" 属性，即可使用 less 语法编写组件的样
③ 在 webpack.config.js 文件做如下配置即可

```javascript
module: {
    rules: [{
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
}
```

> 注意：上面 3 步是基于 webpack 构建的项目用法，如果使用 vite 构建的 vue3 项目，直接`npm install less -D`即可

# 3. 组件的基本使用

## 3.1 使用组件的三个步骤

步骤 1：使用 import 语法导入需要的组件
步骤 2：使用 components 节点注册组件
步骤 3：以标签形式使用刚才注册的组件
![在这里插入图片描述](https://img-blog.csdnimg.cn/9e48c7313a5f4697ba62a313ebc22e60.png#pic_center)
示例代码如下：

```javascript
<template>
  <div class="app-container">
      <div class="box">
      <!-- 渲染 Left 组件和 Right 组件 -->
      <!-- 3. 以标签形式，使用注册好的组件 -->
      <Left></Left>
      <Right></Right>
    </div>
  </div>
</template>
<script>
// 1. 导入需要使用的 .vue 组件
import Left from '@/components/Left.vue'
import Right from '@/components/Right.vue'
export default {
  // 2. 注册组件
  components: {
    Left, // 这里用了简写 Left:Left
    Right,
  }
}
</script>
<style lang="less">
.app-container {
  padding: 1px 20px 20px;
  background-color: #efefef;
}
.box {
  display: flex;
}
</style>
```

> 组件在注册时的细节
> 1、当注册组件时，名字由多个单词组成：
>
> - 第一种写法(kebab-case 命名)：my-left
> - 第二种写法(CamelCase 命名)：MyLeft (需要 Vue 脚手架支持)
>
> 2、组件名尽可能回避 HTML 中已有的元素名称
> 3、可以使用 name 配置项指定组件在开发者工具中呈现的名字。
> 4、关于组件标签:
> 第一种写法：`<Left></Left>`
> 第二种写法：`<Left/>` 自闭和形式
> 备注：不用使用脚手架时，`<Left/>`形式会导致后续组件不能渲染。

---

> 推荐插件 **Path Intellisense** ，智能路径提示
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/8666a6b39ffd487281e959a0b05969fc.png#pic_center)
> 然后在 setting.json 中去配置如下信息，可在当前项目中涉及路径的用'**@**'
> 符号来表示**src**这一层目录。用 vscode 打开项目目录本身，如果打开的是项目外的一层目录就不起作用了
>
> ```
> "path-intellisense.mappings": {
>     "@":"${workspaceRoot}/src",
>     "/":"${workspaceRoot}/"
>   }
> ```

## 3.2 通过 components 注册的是私有子组件

例如：
在组件 A 的 components 节点下，注册了组件 F。
则组件 F 只能用在组件 A 中；不能被用在组件 C 中。

## 3.3 注册全局组件

在 vue 项目的 **main.js** 入口文件中，通过 `Vue.component()` 方法，可以注册全局组件。示例代码如下：

```javascript
// 导入需要被全局注册的那个组件，例如 Count.vue组件
import Left from "@/components/Left.vue";
// 参数1：字符串格式，表示组建的"注册名称"
// 参数2：需要被全局注册的那个组件
Vue.component("Left", Left);
```

## 3.4 关于 VueComponent

- 例子中`<Left>`组件本质是一个名为 VueComponent 的构造函数，且不是程序员定义的，是`Vue.extend`生成的。
- 我们只需要写`<Left/>`或`<Left></Left>`，Vue 解析时会帮我们创建 school 组件的实例对象，即 Vue 帮我们执行的：`new VueComponent(options)`。
- 特别注意：每次调用 Vue.extend，返回的都是一个全新的 VueComponent！
- 关于 this 指向：
  - 组件配置中：data 函数、methods 中的函数、watch 中的函数、computed 中的函数 它们的 this 均是【VueComponent 实例对象】。
  - new Vue(options)配置中：data 函数、methods 中的函数、watch 中的函数、computed 中的函数 它们的 this 均是【Vue 实例对象】。
- VueComponent 的实例对象，也可称之为：组件实例对象，以后简称 vc。Vue 的实例对象，以后简称 vm。

# 4. 组件的 props

## 4.1 props 基础

- props 是组件的**自定义属性**，组件的使用者可以通过 props 把数据传递到子组件内部
- 可以把动态的数据项声明为 props 自定义属性，自定义属性可以在当前组件的模板结构中被直接使用

语法格式如下：

```javascript
<template>
  <div>
	<p>{{ count }}</p>
  </div>
</template>
export default {
  // props 是"自定义属性"，允许使用者通过自定义属性，为当前组件指定初始值
  // 自定义属性的名字，是封装者自定义的（只要名称合法即可）
  // props 中的数据，可以直接在模板结构中被使用
  //props中的值是只读的，不要直接修改props的值，否则终端会报错
  props: ['init'], //props:['自定义属性A','自定义属性B',...],
  data() {
    return {
      // 把 props 中的 init 值，转存到 count 上
      count: this.init
    }
  },
}
// ===========其他组件要用上面那个组件===============
<template>
  <MyCount init="6"></MyCount> // 添加自定义属性，并传值，这个6是字符串
  // <MyCount :init="6"></MyCount> 结合v-bind动态绑定，即加 :
  //让引号里面可用js表达式(变量或表达式)，这个6也就成了数字
</template>
```

props 的作用：父组件通过 props 向子组件传递要展示的数据。
props 的好处：提高了组件的复用性。

## 4.2 props 是只读的

vue 规定：组件中封装的自定义属性是只读的，程序员不能直接修改 props 的值。否则会直接报错：
![在这里插入图片描述](https://img-blog.csdnimg.cn/0f18b802aac34e5199a83fbe02cd004e.png)
要想修改 props 的值，可以把 props 的值转存到 data 中，因为 data 中的数据都是可读可写的！但是，两者命名不要一样，会起冲突。

```javascript
<template>
  <div>
	<p>{{ count }}</p>
  </div>
</template>
//============================
props:['init'],
data(){
	return{
		count:this.init  // 把this.init的值转存到count中
	}
}
```

建议：不要把 props 的值给 v-mode 绑定，因为 props 不可修改，而 v-model 是双向影响数据的
注意：若 props 传过来的值是对象类型，修改对象中的属性 Vue 并不会报错，但不推荐去改

## 4.3 props 验证

### 4.3.1 什么是 props 验证

- 指的是：在封装组件时对外界传递过来的 props 数据进行合法性的校验，从而防止数据不合法的问题。
- 使用**数组类型**的 props 节点的缺点：无法为每个 prop 指定具体的数据类型。
- 使用**对象类型**的 props 节点，可以对每个 prop 进行数据类型的校验

### 4.3.2 props 验证方法

对象类型的 props 节点提供了多种数据验证方案，例如：
① 基础的类型检查
② 多个可能的类型
③ 必填项校验
④ 属性默认值
⑤ 自定义验证函数

### 4.3.3 基础的类型检查

在声明自定义属性时，可以通过 **type** 来定义属性的值类型，从而防止组件的使用者为其绑定错误类型的数据。示例代码如下：

```javascript
export default {
  props: {
    propA: {
      // 用type属性 定义属性的值类型
      //如果传入的值不符，则会终端报错
      type: Number,
      //类型有 Number,Boolean,String,Array,Object,Function,Date,Symbol
    },
  },
};
```

### 4.3.4 多个可能的类型

如果某个 prop 属性值的类型不唯一，此时可以通过**数组**的形式，为其指定多个可能的类型，示例代码如下：

```javascript
export default {
  props: {
    propA: {
      // propA的属性值可以是Number或String
      type: [Number, String],
      //类型有 Number,Boolean,String,Array,Object,Function,Date,Symbol
    },
  },
};
```

### 4.3.5 必填项校验

在声明自定义属性时，可以通过 **required** 选项，将属性设置为必填项，强制用户必须传递属性的值。示例代码如下：

```javascript
export default {
  props: {
    propA: {
      // propA 的值类型必须是 Number 数字
      type: Number,
      // 必填项校验,表示必须要传入这个参数，不管有没有默认值，否则会报错
      required: true,
    },
  },
};
```

### 4.3.6 属性默认值

在声明自定义属性时，可以通过 **default** 来定义属性的默认值。示例代码如下：

```javascript
export default {
  // props: ['propA'], 数组形式的没有default，对象形式才能设置默认值
  props: {
    // 自定义属性A : { /* 配置选项 */ },
    // 自定义属性B : { /* 配置选项 */ },
    // 自定义属性C : { /* 配置选项 */ },
    propA: {
      // 用default属性定义 属性的默认值
      default: 0,
      // 如果外界没有传递 propA 属性，则默认值生效
    },
  },
};
```

### 4.3.7 自定义验证函数

在封装组件时，可以为 prop 属性指定自定义的验证函数，从而对 prop 属性的值进行更加精确的控制：

```javascript
export default {
  props: {
    propA: {
      // 通过validator函数，对propA属性的值进行校验。
      // “属性的值”可以通过形参的value进行接收
      validator: function (value) {
        // 本例中：propA属性的值，必须匹配夏磊字符串中的一个
        // validator函数的返回值为true表示验证通过，false表示验证失败
        return ["success", "warning", "danger"].indexOf(value) !== -1;
      },
    },
  },
};
```

## 4.5 props 的大小写命名

组件中如果使用“camelCase (驼峰命名法)”声明了 props 属性的名称，则有两种方式为其绑定属性的值：

子组件代码如下

```xml
<template>
  <div>
    <p>发布时间：{{ pubTime }}</p>
  </div>
</template>
<script>
export default {
  props:['pubTime'],// 采用驼峰命名法，为当前的组件申明了 pubTime属性
};
</script>
```

在父组件中如下

```xml
<template>
<div>
  <!-- 既可以直接用驼峰命名的形式为组件绑定属性的值 -->
  <my-article pubTime="1999"></my-article>
  <!-- 也可以使用其等价的"短横线分割命名"的形式为组件绑定属性的值 -->
  <my-article pub-time="1999"></my-article>
</div>
</template>
```

# 5. Class 与 Style 绑定

在实际开发中经常会遇到动态操作元素样式的需求。因此，vue 允许开发者通过 v-bind 属性绑定指令，为元素动态绑定 class 属性的值和行内的 style 样式。

## 5.1 以字符串形式绑定 HTML 的 class

以字符串形式绑定 HTML 的 class，适用于样式的类名不确定，需要动态指定。不变的写在 `class` , 变化的 写在 `:class`，两者组合成最终样式

例代码如下：演示通过三元表达式，动态的为元素绑定 class 的类名。

```javascript
<template>
  <div>
    <h2 class="thin" :class="isItalic ? 'italic' : ''">这是CS组件</h2>
    <button @click="isItalic = !isItalic">toggle  italic</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isItalic: true,// 字体是否倾斜
    };
  },
};
</script>
<style>
.thin {
  font-weight: 200;  /* 字体变细 */
}
.italic {
  font-style: italic;  /* 倾斜字体 */
}
</style>
```

## 5.2 以数组语法绑定 HTML 的 class

如果元素需要动态绑定多个 class 的类名，此时可以使用数组的语法格式：

```javascript
<template>
  <div>
    <h2 class="thin" :class="[isItalic ? 'italic' : '',
    isDelete ? 'delete' : '']"> 这是CS组件
    </h2>
    <button @click="isItalic = !isItalic">toggle italic</button>
    <button @click="isDelete = !isDelete">toggle delete</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isItalic: false, // 字体是否倾斜
      isDelete: false, // 字体横线删除字样
    };
  },
};
</script>
<style>
.thin {
  font-weight: 200;/* 字体变细 */
}
.italic {
  font-style: italic;/* 倾斜字体 */
}
.delete {
  text-decoration: line-through;/* 字体横线删除样式 */
}
</style>
```

## 5.3 以对象语法绑定 HTML 的 class

对象语法，可以动态决定样式用不用

```javascript
<template>
  <div>
    <h2 class="thin" :class="classObj">这是CS组件</h2>
    <button @click="classObj.italic = !classObj.italic">toggle italic</button>
    <button @click="classObj.delete = !classObj.delete">toggle delete</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classObj: { // 要求对象中，属性名是class类名，值是布尔值
        italic: false, // 字体是否倾斜
        delete: false, // 字体横线删除字样
      },
    };
  },
};
</script>
<style>
.thin {
  font-weight: 200;  /* 字体变细 */
}
.italic {
  font-style: italic;  /* 倾斜字体 */
}
.delete {
  text-decoration: line-through;  /* 字体横线删除样式 */
}
</style>
```

## 5.4 以对象语法绑定内联的 style

`:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```javascript
<template>
  <div>
    <div :style="{color: active, fontSize: fsize + 'px',
        backgroundColor: bgcolor,}">
      凉宫
    </div>
    <button @click="fsize++">size +1</button>
    <button @click="fsize--">size -1</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "red",
      fsize: 30,
      bgcolor: "blue",
    };
  },
};
</script>
```

# 6. 组件之间的样式冲突问题

默认情况下，写在 .vue 组件中的样式会**全局生效**，因此很容易造成多个组件之间的样式冲突问题。

导致组件之间样式冲突的根本原因是：
① 单页面应用程序中，所有组件的 DOM 结构，都是基于唯一的 index.html 页面进行呈现的
② 每个组件中的样式，都会影响整个 index.html 页面中的 DOM 元素

## 6.1 解决方法

为每个组件分配唯一的自定义属性，在编写组件样式时，通过属性选择器来控制样式的作用域，示例代码如下：

```javascript
<template>
  <div class="container" data-v-001>
    <h3 data-v-001>轮播图组件</h3>
  </div>
</template>

<style>
/* 通过中括号"属性选择器" ，来防止组件之间的样式冲突问题
     前提：给每个组件分配唯一的自定义属性，用来区分 */
.container[data-v-001] {
  border: 1px solid red;
}
</style>
```

但这个方法过于繁琐，下面讲述更简单的方法

## 6.2 style 节点的 scoped 属性

为了提高开发效率和开发体验，vue 为 style 节点提供了 scoped 属性，从而防止组件之间的样式冲突问题：

```javascript
<template>
  <div class="container">
    <h3>轮播图组件</h3>
  </div>
</template>

<style scoped>
/* sytle节点的 scoped属性，用来自动为每个组件分配唯一的"自定义属性"
  并且自动为当前组件的DOM标签和style样式应用这个自定义属性，防止组件间的样式冲突问题*/
.container {
  border: 1px solid red;
}
</style>
```

## 6.3 /deep/ 样式穿透

如果给当前组件的 style 节点添加了 scoped 属性，则当前组件的样式对其**子组件**是不生效的。如果想让某些样式对子组件也生效，可以使用 `/deep/` 深度选择器。

```javascript
<style lang="less" scoped>
h3 {
  color: red;
}
//没加 /deep/，生成的选择器格式为 h5[data-v-3c83f0b7]
// 加了 /deep/ 生成的选择器格式为 [data-v-3c83f0b7] h5  属性选择器配合后代先择器，来选中子组件中的元素
// 当使用第三方组件库的时候，如果有修改第三方组件默认样式的需求，需要用到 /deep/
/deep/ h5 {
  color: pink;
}
</style>
```

Vue 中 scss 不支持`/deep/`写法问题，如果选择 scss 预编译器，，则改用`::v-deep`

```css
<style lang="scss" scoped>
h3 {
  color: red;
}
::v-deep h5 {
  color: pink;
}
</style>
```

> **vue3 提示：**
> /deep/ 是 vue2.x 中实现样式穿透的方案。在 vue3.x 中推荐使用 `:deep(选择器)` 替代 /deep/。
>
> ```xml
> <style lang="scss" scoped>
> h3 {
>   color: red;
> }
> :deep(h5) {
>   color: pink;
> }
> </style>
> ```

# 7. 组件的生命周期

## 7.1 生命周期 & 生命周期函数

**生命周期**（Life Cycle）是指一个组件从创建 -> 运行 -> 销毁的整个阶段，强调的是一个时间段。
**生命周期函数**：是由 vue 框架提供的内置函数，会伴随着组件的生命周期，自动按次序执行。
注意：生命周期强调的是时间段，生命周期函数强调的是时间点。

## 7.2 组件生命周期函数的分类

![在这里插入图片描述](https://img-blog.csdnimg.cn/8b719cfc68654cc4bb1253a92a3790b2.png#pic_center)

## 7.3 生命周期图示

可以参考 vue 官方文档给出的“生命周期图示”，进一步理解组件生命周期执行的过程：[https://cn.vuejs.org/v2/guide/instance.html](https://cn.vuejs.org/v2/guide/instance.html)
![在这里插入图片描述](https://img-blog.csdnimg.cn/8123b8c2c79e4889a4b7e3396d4948fd.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/da8056cf8cd840c7930f7d570a7cdfd2.png#pic_center)
示例

```javascript
<template>
  <div class="test-container">
    <h3 id="myh3">Test.vue 组件 --- {{ books.length }} 本图书</h3>
    <p id="pppp">message 的值是：{{ message }}</p>
    <button @click="message += '~'">修改 message 的值</button>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      message: "hello vue.js",
      // 定义 books 数组，存储的是所有图书的列表数据。默认为空数组！
      books: [],
    };
  },
  watch: {
    message(newVal) {
      console.log("监视到了 message 的变化：" + newVal);
    },
  },
  methods: {
    show() {
      console.log("调用了 Test 组件的 show 方法！");
    },
    // 使用 Ajax 请求图书列表的数据
    initBookList() {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("load", () => {
        const result = JSON.parse(xhr.responseText);
        console.log(result);
        this.books = result.data;
      });
      xhr.open("GET", "http://www.liulongbin.top:3006/api/getbooks");
      xhr.send();
    },
  },
  // 创建阶段的第1个生命周期函数
  beforeCreate() {
    // console.log(this.info) // 报错 ，Cannot read property 'info' of undefined
    // console.log(this.message) // undefined
    // this.show() // 报错  this.show is not a function
  },
  created() {
    // console.log(this.info) // 传入什么打印什么
    // console.log(this.message) // hello vue.js
    // this.show() // 调用了 Test 组件的 show 方法
    // created 生命周期函数，非常常用。
    // 经常在它里面，调用 methods 中的方法，请求服务器的数据。
    // 并且，把请求到的数据，转存到 data 中，供 template 模板渲染的时候使用！
    this.initBookList();
  },
  beforeMount() {
    // const dom = document.querySelector('#myh3') 还不能操作dom元素
    // console.log(dom)
  },
  // 如果要操作当前组件的 DOM，最早，只能在 mounted 阶段执行
  mounted() {
    // console.log(this.$el)
    // const dom = document.querySelector('#myh3')
    // console.log(dom)
  },
  beforeUpdate() {
    // console.log('beforeUpdate')
    // console.log(this.message) // 这个阶段页面没来得及重新渲染，数据是最新的，
    // const dom = document.querySelector('#pppp')
    // console.log(dom.innerHTML) // 但是页面ui里面的数据是旧的
  },
  // 当数据变化之后，为了能够操作到最新的 DOM 结构，必须把代码写到 updated 生命周期函数中
  updated() {
    // console.log('updated')
    // console.log(this.message)
    // const dom = document.querySelector('#pppp')
    // console.log(dom.innerHTML)
  },
  beforeDestroy() {
    console.log("beforeDestroy");
    this.message = "aaa";
    console.log(this.message);
  },
  destroyed() {
    console.log("destroyed");
    // this.message = 'aaa'
  },
};
</script>

<style lang="less" scoped>
.test-container {
  background-color: pink;
  height: 200px;
}
</style>
```

常用的生命周期钩子：

- mounted: 发送 ajax 请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
- beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

关于销毁 Vue 实例

- 销毁后借助 Vue 开发者工具看不到任何信息。
- 销毁后自定义事件会失效，但原生 DOM 事件依然有效。
- 一般不会在 beforeDestroy 操作数据，因为即便操作数据，也不会再触发更新流程了。

生命周期函数中的 this 指向的是 vm 实例或组件实例对象

# 8. 组件间的数据共享

## 8.1 组件之间的关系

组件在**被封装好**之后，彼此之间是相互独立的，不存在父子关系
![在这里插入图片描述](https://img-blog.csdnimg.cn/0ffd49f552bc47eb8034958c8a52170a.png#pic_center)
在**使用组件**的时候，根据彼此的嵌套关系，形成了父子关系、兄弟关系
![在这里插入图片描述](https://img-blog.csdnimg.cn/f1a61aa3298c48c49ada1063074392b7.png#pic_center)
在项目开发中，组件之间的最常见的关系分为如下两种：
① 父子关系
② 兄弟关系(在这里非直接父子关系，也理解为兄弟关系，如 A 与 D)
![在这里插入图片描述](https://img-blog.csdnimg.cn/83deec544a7e40278da650fcc31e09c3.png)

## 8.2 父子组件之间的数据共享

父子组件之间的数据共享又分为：
① 父 -> 子共享数据
② 子 -> 父共享数据

### 8.2.1 父组件向子组件共享数据

父组件向子组件共享数据需要**使用自定义属性**。部分示例代码如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/3ce2dbcbd5ea493d9a331db0595f1cae.png#pic_center)
父组件负责绑定子组件并传值
子组件负责声明自定义属性(props)

### 8.2.2 子组件向父组件共享数据

子组件向父组件共享数据使用**自定义事件**。示例代码如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/ff04893728bc4c4cb09e3f2734bb1ec4.png#pic_center)
在子组件的某方法里定义一个自定义触发事件 `$emit('事件名',事件参数)`
父组件将自己的一个方法绑定那个自定义事件，在该方法中接收参数，并转存数值

> 注：自定义事件的另一种方式
> 1、给子组件添加 ref 属性，在父组件的 mounted 函数中，通过 this.refs.来获取组件的实例对象，通过`.$on`或`$once`来绑定自定义事件，`$once`绑定的只会触发一次
> 2、通过`this.$refs.xxx.$on('事件名',回调)`绑定自定义事件时，回调函数要么配置在 methods 中，要么写成箭头函数，

---

解绑自定义事件：
给哪个组件定义的自定义事件，就在哪个组件解绑。通过 `this.$off('自定义事件名')` 或 `this.$off(['事件名1','事件名2'])`

---

在组件上添加的事件 如 `<Left @click="showAlert"></Left>` 就算是和原生 DOM 事件同名，也会被认为是自定义事件，需要调用修饰符 `.native` 明确指明是原生事件 `<Left @click.native="showAlert"></Left>`

### 8.2.3 兄弟组件之间的数据共享

方式一：
在 vue2.x 中，兄弟组件之间数据共享的方案是 EventBus。非直接父子关系用 EventBus。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2b0ae49f0b91474b94127a25eb9b40c6.png#pic_center)

- EventBus 的使用步骤
  ① 创建 eventBus.js 模块，并向外共享一个 Vue 的实例对象
  ② 在数据发送方，调用 bus`.$emit('事件名称', 要发送的数据)` 方法触发自定义事件
  ③ 在数据接收方，在 created 生命周期函数里调用 bus`.$on('事件名称', 事件处理函数)` 方法注册一个自定义事件

---

方式二：全局事件总线
1、在 main.js 中，挂载全局事件总线

```js
new Vue({
	......
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm，当然也可命名其他
	},
    ......
})
```

2、使用事件总线：
接收数据：A 组件想接收数据，则在 A 组件中给$bus 绑定自定义事件，事件的回调留在 A 组件自身。

```javascript
methods:{
  demo(data){......}
}
......
mounted() {
  this.$bus.$on('事件名',this.demo)
}
```

提供数据：`this.$bus.$emit('事件名',数据)`

3、最好在 beforeDestroy 钩子中，用$off 去解绑当前组件所用到的事件。

```javascript
beforeDestroy(){
	this.$bus.$off('事件名')
}
```

## 8.3 消息订阅与发布

适用于任意组件间通信的一种方式，这里介绍 **mitt**

```javascript
import mitt from "mitt";
const emitter = mitt();
// 监听事件/订阅消息
emitter.on("foo", (e) => console.log("foo", e)); // 参数:事件名，回调函数
// 监听所有
emitter.on("*", (type, e) => console.log(type, e));
// 触发事件/ 发布消息
emitter.emit("foo", { a: "b" }); // 可携带数据
// 解绑所有事件/取消所有消息
emitter.all.clear();
// 解绑事件/取消监听消息
emitter.off("foo", fn); // unlisten
```

在 vue 中的使用步骤

1. 安装 pubsub：`npm install --save mitt`
2. 在 main.js 中全局注册(也可以模块应用，但每次在组件中导入使用比较麻烦)

```javascript
import Vue from "vue";
import App from "./App.vue";
// 导入mitt
import mitt from "mitt";
// 创建并挂载到 Vue原型上
Vue.prototype.$mitt = mitt();
new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

3. 数据接收方-订阅消息：Right 组件想接收数据，则在 Right 组件中订阅消息，订阅的回调留在 Right 组件自身。

```javascript
<script>
export default {
  data() {
    return {
      msg: {},
    };
  },
  methods: {
    getMsg(data) {
      // 写一些业务
      console.log(data);
      this.msg = data;
    }
  },
  mounted() {
    this.$mitt.on("foo", this.getMsg); //订阅消息
  },
  beforeDestroy() {
    this.$mitt.off("foo", this.getMsg); // 最好在beforeDestroy钩子中，取消订阅
  },
};
</script>
```

4. 提供数据方-发布消息

```javascript
<script>
export default {
  data() {
    return {
      message: { name: "凉宫", age: 16 },
    };
  },
  methods: {
    sendMsg() {
      this.$mitt.emit("foo", this.message);
    },
  },
};
</script>
```

# 9. ref 引用

## 9.1 什么是 ref 引用

- ref 用来辅助开发者在不依赖于 jQuery 的情况下，获取 **DOM 元素**或**组件**的引用。
  每个 vue 的组件实例上，都包含一个 `$refs` 对象，里面存储着对应的 DOM 元素或组件的引用。默认情况下，组件的 $refs 指向一个空对象。

```javascript
<template>
  <div>
    <h3>MyRef 组件</h3>
    <button @click="getRef">获取$refs 引用</button>
  </div>
</template>

export default{
  methods: {
    getRef(){
      console.log(this) /* this 是当前组件的实例对象*/
      /* this.$refs默认指向空对象 */
    }
  },
}
```

## 9.2 使用 ref 引用 DOM 元素

如果想要使用 ref 引用页面上的 DOM 元素，则可以按照如下的方式进行操作：

```javascript
<template>
  <div>
    <h3 ref="myh3">MyRef 组件</h3>
    <button @click="getRef">获取$refs 引用</button>
  </div>
</template>
<script>
export default {
  methods: {
    getRef() {
      // 通过this.$refs.引用名,可以获取到DOM元素的引用
      console.log(this.$refs.myh3);
      // 操作DOM元素，把文本颜色改为红色
      this.$refs.myh3.style.color = "red";
    },
  },
};
</script>
```

## 9.3 使用 ref 引用组件实例

如果想要使用 ref 引用页面上的组件实例，则可以按照如下的方式进行操作：

```javascript
<template>
  <!-- 已经引入my-counter实例  -->
  <!-- 使用ref 属性，为对应的“组件添加引用名称” -->
  <my-counter ref="counterRef"></my-counter>
  <button @click="getRef">获取$refsy引用</button>
</template>
<script>
export default {
  methods: {
    getRef() {
      // 通过this.$refs.引用名,可以获取到组件的实例对象
      console.log(this.$refs.myh3);
      // 引用到组件实例之后，可以调用该组件上的 methods方法和数据
      this.$refs.counterRef.add();
    },
  },
};
```

## 9.4 this.$nextTick(cb) 方法

- 组件的 $nextTick(callback) 方法，会把 callback 回调推迟到下一个 DOM 更新周期之后执行。
- 通俗的理解是：等组件的 DOM 更新完成之后，再执行 cb 回调函数。从而能保证 cb 回调函数可以操作到最新的 DOM 元素。

```javascript
<template>
  <input type="text" v-if="inputVisible" ref="ipt" />
  <button v-else @click="showInput">展示Input输入框</button>
</template>
<script>
export default {
  methods: {
    showInput() {
      this.inputVisible = true;
      // 把对input 文本框的操作，推迟到下次DOM更新之后，否则页面上根本不存在文本元素
      this.$$nextTick(() => {
        this.$refs.focus(); /* 让input获得焦点 */
      });
    },
  },
};
</script>
```

# 10. 动态组件

## 10.1 什么是动态组件

动态组件指的是动态切换组件的显示与隐藏。vue 提供了一个内置的 `<component>` 组件，专门用来实现组件的动态渲染。
① `<component>` 是组件的占位符
② 通过 is 属性动态指定要渲染的组件名称
③ `<component is="要渲染的组件的名称"></component>`

## 10.2 实现动态组件渲染

示例代码如下：

```xml
data() {
  return {
    // 1. comName 表示要展示的组件的名字
    comName: 'Left'
  }
},
components: {
  Left,
  Right
}

<!--  component 标签是 vue 内置的，作用：组件的占位符 -->
<!--  is 属性的值，表示要渲染的组件的名字 -->
<!--  is 属性的值，应该是组件在 components 节点下的注册名称 -->
<component :is="comName"></component>
<!--  点击按钮，动态切换组件的名字 -->
<button @click="comName = 'Left'">展示 Left</button>
<button @click="comName = 'Right'">展示 Right</button>
```

## 10.3 使用 keep-alive 保持状态

默认情况下，切换动态组件时无法保持组件的状态。此时可以使用 vue 内置的 `<keep-alive>` 组件保持动态组件的状态。示例代码如下：

```xml
<keep-alive>
<!-- keep-alive 会把内部的组件进行缓存，而不是销毁组件 -->
  <component :is="comName"></component>
</keep-alive>
```

组件的动态切换是创建与销毁，每次切换回来的组件因为是新建的与上一次的组件不是同一个组件实例，所以内容数据都是初始化的，把组件放到`keep-alive`中即可缓存被切换掉的组件

## 10.4 keep-alive 生命周期函数

当组件被**缓存**时，会自动触发组件的 `deactivated` 生命周期函数。
当组件被**激活**时，会自动触发组件的 `activated` 生命周期函数。

```javascript
export default {
  created() {
    console.log("Left 组件被创建了！");
  },
  destroyed() {
    console.log("Left 组件被销毁了~~~");
  },

  // 当组件第一次被创建的时候，既会执行 created 生命周期，也会执行 activated 生命周期
  // 当时，当组件被激活的时候，只会触发 activated 生命周期，不再触发 created。因为组件没有被重新创建
  activated() {
    console.log("组件被激活了，activated");
  },
  deactivated() {
    console.log("组件被缓存了，deactivated");
  },
};
```

## 10.5 keep-alive 的 include 属性

`include` 属性用来指定：只有名称匹配的组件会被缓存。多个组件名之间使用英文的逗号分隔：

```xml
<!-- 在使用 keep-alive 的时候，可以通过 include 指定哪些组件需要被缓存； -->
<!-- include中多个组件名用逗号，分隔，组件名必须是components 节点下注册过的 -->
<keep-alive include="Left,Right">
  <component :is="comName"></component>
</keep-alive>
```

`exclude` 属性指定哪些组件不需要被缓存；

```xml
<!-- 指定哪些组件不被缓存 -->
<keep-alive exclude="MyRight">
  <component :is="comName"></component>
</keep-alive>
```

注意：不要同时使用 `include` 和 `exclude` 这两个属性

> 补充 组件的**name**属性
>
> ```javascript
> export default {
>   // 当提供了 name 属性之后，组件的名称，就是 name 属性的值
>   // 对比：
>   // 1. 组件的 “注册名称” 的主要应用场景是：以标签的形式，把注册好的组件，渲染和使用到页面结构之中
>   // 2. 组件声明时候的 “name” 名称的主要应用场景：结合 <keep-alive> 标签实现组件缓存功能；以及在调试工具中看到组件的 name 名称
>   name: "MyRight",
>   components: {
>     // 如果在“声明组件”的时候，没有为组件指定 name 名称，则组件的名称默认就是“注册时候的名称”
>     Left,
>     Right,
>   },
> };
> ```

# 11. 插槽

## 11.1 什么是插槽

插槽（slot）是 vue 为组件的封装者提供的能力。允许开发者在封装组件时，把不确定的、希望由用户指定的部分定义为插槽。
![在这里插入图片描述](https://img-blog.csdnimg.cn/df7249fc833840ce89d854a280c0a438.png)
可以把插槽认为是组件封装期间，为用户预留的内容的占位符。
作用：让父组件可以向子组件指定位置插入 html 结构

## 11.2 插槽的基础用法

在封装组件时，可以通过 `<slot>` 元素定义插槽，从而为用户预留内容占位符。
示例代码如下：(在 Left 组件中预留插槽，在 App 组件中去使用)

```xml
<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <!-- 声明一个插槽区域 -->
    <!-- vue 官方规定：每一个 slot 插槽，都要有一个 name 名称 -->
    <!-- 如果省略了 slot 的 name 属性，则有一个默认名称叫做 default -->
    <!-- <slot></slot> -->
    <slot name="default"></slot>
  </div>
</template>
<!-- =========================分割线==========================-->
<template>
  <div class="app-container">
  	  <h3>App 组件</h3>
      <!-- 渲染 Left 组件 -->
      <Left>
        <!-- 默认情况下，在使用组件的时候，提供的内容都会被填充到名字为 default 的插槽之中 -->
        <p>这是在 Left 组件的内容区域，声明的 p 标签</p>
      </Left>
    </div>
</template>

```

上面代码，App 组件中的 p 标签，会被填充到 Left 组件的插槽中
如果在封装组件时没有预留任何 `<slot>` 插槽，则用户提供的任何自定义内容都会被丢弃。如上代码：若在 Left 组件中没定义插槽，则 p 标签不会被渲染

## 11.3 指定内容放到指定插槽

例如：指定`<template #插槽名>`中内容，渲染到`<slot name="default22">`插槽中

```xml
<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <slot name="default22"></slot>
  </div>
</template>
<!-- =========================分割线==========================-->
<template>
  <div class="app-container">
    <h3>App 组件</h3>
    <!-- 渲染 Left 组件 -->
    <Left>
      <!-- 默认情况下，在使用组件的时候，提供的内容都会被填充到名字为 default 的插槽之中 -->
      <!-- 1. 如果要把内容填充到指定名称的插槽中，需要使用 v-slot: 这个指令 -->
      <!-- 2. v-slot: 后面要跟上插槽的名字 -->
      <!-- 3. v-slot: 指令不能直接用在元素身上，必须用在 template 标签上 -->
      <!-- 4. template 这个标签，它是一个虚拟的标签，只起到包裹性质的作用，但是，不会被渲染为任何实质性的 html 元素 -->
      <!-- 5. v-slot: 指令的简写形式是 # -->
      <template #default22> <!--><template v-slot:default22><-->
        <p>这是在 Left 组件的内容区域，声明的 p 标签</p>
      </template>
    </Left>
  </div>
</template>
```

## 11.4 后备内容

封装组件时，可以为预留的 `<slot>` 插槽提供后备内容（默认内容）。如果组件的使用者没有为插槽提供任何内容，则后备内容会生效。示例代码如下：

```xml
<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <slot name="default">
    	<p>这个是插槽的的默认内容</p>
    </slot>
  </div>
</template>
<!-- =========================分割线==========================-->
<template>
  <div class="app-container">
    <h3>App 组件</h3>
    <Left>
      <template #default>
        <p>这是在 Left 组件的内容区域，声明的 p 标签</p>
      </template>
    </Left>
  </div>
</template>
```

## 11.5 具名插槽

- 具名插槽

如果在封装组件时需要预留**多个插槽**节点，则需要为每个 `<slot>` 插槽指定具体的 name 名称。这种带有具体名称的插槽叫做“具名插槽”。示例代码如下：

```xml
<template>
  <div class="container">
    <header>
      <!-- 页头部分 -->
      <slot name="title"></slot>
    </header>
    <main>
      <!-- 内容部分 -->
      <slot name="content"></slot>
    </main>
    <footer>
      <!-- 页脚部分 -->
      <slot name="author"></slot>
    </footer>
  </div>
</template>
```

注意：没有指定 name 名称的插槽，会有隐含的名称叫做 “default”。

- 为具名插槽提供内容

在向具名插槽提供内容的时候，我们可以在一个 `<template>` 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称，` v-slot:`可以简写为`#`。示例代码如下：

```xml
<template>
  <my-com-2>
    <template #title>
      <h1>滕王阁序</h1>
    </template>
    <template #content>
      <p>老当益壮，宁移白首之心？</p>
      <p>穷且益坚，不坠青云之志。</p>
    </template>
    <template #author>
      <p>落款: 王勃</p>
    </template>
  </my-com-2>
</template>
```

## 11.6 作用域插槽

在封装组件的过程中，可以为预留的 `<slot>` 插槽绑定 props 数据，这种带有 props 数据的 `<slot>` 叫做“作用域插槽”。示例代码如下：

```xml
<div class="box">
    <!-- 在封装组件时，为预留的slot 提供属性对应的值，这种用法叫做作用域插槽 -->
  <slot name="content" msg="hello vue"></slot>
</div>
```

使用场景：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。

- 使用作用域插槽

可以使用 `v-slot:` 或简写 `#` 的形式，接收作用域插槽对外提供的数据。示例代码如下：

```xml
<template>
  <my-com-2>
    <template #content="scope">
      <p>hello vue {{ scope.msg }}</p>
    </template>
  </my-com-2>
</template>
```

- 解构插槽

作用域插槽对外提供的数据对象，可以使用 **解构赋值(ES6)** 简化数据的接收过程。示例代码如下：

```xml
<!-- 其他组件   使用Mycom组件 -->
<template>
  <Mycom>
    <template #content="{ msg, user }">
      <p>{{ msg }}</p>
      <p>{{ user.id }}</p>
    </template>
  </Mycom>
</template>
//================分割线======================
<!--Mycom组件 -->
<template>
  <div class="container">
    <slot name="content" msg="hello vue" :user="userinfo"></slot>
  </div>
</template>
<script>
export default {
  name: "content",
  data(){
    return {
        userinfo:{
            username='凉宫',
            age=15,
        }
    }
  }
};
</script>
```

# 12. 自定义指令

- vue 官方提供了 v-text、v-for、v-model、v-if 等常用的指令。除此之外 vue 还允许开发者自定义指令。
- vue 中的自定义指令分为两类，分别是：
  ① 私有自定义指令
  ② 全局自定义指令
- 指令的功能用于解析标签(包括：标签属性，标签体内容，绑定事件...)

## 12.1 私有自定义指令

在每个 vue 组件中，可以在 `directives` 节点下声明私有自定义指令。示例代码如下：

```javascript
<template>
  <!-- 申明自定义指令时，指令的名字是color-->
  <!--在使用自定义指令时，需要加上 v- 前缀 -->
  <div class="app-container">
    <h1 v-color>App 根组件</h1>
  </div>
</template>
<script>
export default {
  directives: {
    // 定义名为 color 的指令，指向一个配置对象
    // 当指令第一次被绑定到元素上的时候，会立即触发 bind 函数
    // 形参中的 el 表示当前指令所绑定到的那个 DOM 对象
    color: {
      bind(el) {
        console.log("触发了v-color的bind函数");
        el.style.color = "red";
      },
    },
  },
};
</script>
```

> 小提示：如果指令名要由多个单词组成，要使用 kebab-case 方式命名，不要用驼峰命名

## 12.2 为自定义指令动态绑定参数值

在 template 结构中使用自定义指令时，可以通过等号（=）的方式，为当前指令动态绑定参数值：

```javascript
<h1 v-color="color">App 根组件</h1>
//================
data() {
 return {
   color: "blue",
 };
}
```

## 12.3 通过 binding 获取指令的参数值

在声明自定义指令时，可以通过形参中的第二个参数，来接收指令的参数值：

```javascript
<template>
  <div class="app-container">
    <h1 v-color="color">App 根组件</h1> <!-- 传变量 -->
    <h2 v-color="'red'">hello</h2> <!-- 直接传值 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      color: "blue",
    };
  },
  directives: {
    color: {
      bind(el, binding) { // 形参命名规范
        // 通过binding对象的，value属性，获取动态的参数值
        el.style.color = binding.value;
      },
    },
  },
};
</script>
```

## 12.4 update 和 inserted

bind 函数只调用 1 次：当指令第一次绑定到元素时调用，当 DOM 更新时 bind 函数不会被触发。 inserted 函数会在元素被插入页面时被调用，update 函数会在每次 DOM 更新时被调用。示例代码如下：

```javascript
<template>
  <div class="app-container">
    <h1 v-color="color">App 根组件</h1>
    <h2 v-color="'red'">hello</h2>
    <button @click="color = 'green'">点击改变color的颜色</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      color: "blue",
    };
  },
  directives: {
    color: {
        // 在第一次被绑定到元素的时候 会立即触发一次bind函数
      bind(el, binding) {
        console.log("触发了v-color的bind函数");
        el.style.color = binding.value;
      },
      // 在元素被插入页面时被调用
      inserted(el, binging){}
      // 在DOM更新的时候，会触发update函数
      update(el, binding) {
        console.log("触发了v-color的update函数");
        el.style.color = binding.value;
      },
    },
  },
};
</script>
```

> 小提示：bind，inserted，update 这些叫钩子函数，里面的 this 指向 window

## 12.5 函数简写

如果 bind 和 update 函数中的逻辑完全相同，则对象格式的自定义指令可以简写成函数格式：

```javascript
export default {
  data() {
    return {
      color: "blue",
    };
  },
  directives: {
    color(el, binding) {
      el.style.color = binding.value;
    },
  },
};
```

也就意味着，指令与元素绑定时，以及指令所在的模板被重新解析时，都会触发该简写形式

## 12.6 全局自定义指令

全局共享的自定义指令需要通过“Vue.directive()”进行声明，示例代码如下：

```javascript
// 全局自定义指令
/* Vue.directive('color', {
  bind(el, binding) {
    el.style.color = binding.value
  },
  update(el, binding) {
    el.style.color = binding.value
  }
}) */
//简写
// 参数1：字符串，表示全局自定义指令的名字
// 参数2：对象，用来接收指令的参数值
Vue.directive("color", function (el, binding) {
  el.style.color = binding.value;
});
```

注意，一般在 main.js 文件中进行全局声明，且放在 new vue 之前

> 知识补充
> 在 main.js 中 `Vue.config.productionTip = true;`打开如下提示，false：可以阻止 vue 在启动时生成生产提示
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/3025addbd481405587492d07879e028f.png#pic_center)

# 13. 组件库

## 13.1 什么是 vue 组件库

在实际开发中，前端开发者可以把自己封装的 .vue 组件整理、打包、并发布为 npm 的包，从而供其他人下载和使用。这种可以直接下载并在项目中使用的现成组件，就叫做 vue 组件库。

## 13.2 vue 组件库和 bootstrap 的区别

二者之间存在本质的区别：

- bootstrap 只提供了纯粹的原材料（ css 样式、HTML 结构以及 JS 特效），需要由开发者做进一步的组装和改造
- vue 组件库是遵循 vue 语法、高度定制的现成组件，开箱即用

## 13.3 最常用的 vue 组件库

PC 端

- Element UI（[https://element.eleme.cn/#/zh-CN](https://element.eleme.cn/#/zh-CN)）
- View UI（[http://v1.iviewui.com/](http://v1.iviewui.com/)）

移动端

- Mint UI（[http://mint-ui.github.io/#!/zh-cn](http://mint-ui.github.io/#!/zh-cn)）
- Vant（[https://vant-contrib.gitee.io/vant/#/zh-CN/](https://vant-contrib.gitee.io/vant/#/zh-CN/)）

## 13.4 Element UI

Element UI 是饿了么前端团队开源的一套 PC 端 vue 组件库。支持在 vue2 和 vue3 的项目中使用：

- vue2 的项目使用旧版的 Element UI（[https://element.eleme.cn/#/zh-CN](https://element.eleme.cn/#/zh-CN)）
- vue3 的项目使用新版的 Element Plus（[https://element-plus.gitee.io/zh-CN/](https://element-plus.gitee.io/zh-CN/)）

### 13.4.1 在 vue2 的项目中安装 element-ui

运行如下的终端命令：

```shell
npm i element-ui -S
```

### 13.4.2 引入 element-ui

开发者可以一次性完整引入所有的 element-ui 组件，或是根据需求，只按需引入用到的 element-ui 组件：

- 完整引入：操作简单，但是会额外引入一些用不到的组件，导致项目体积过大
- 按需引入：操作相对复杂一些，但是只会引入用到的组件，能起到优化项目体积的目的

### 13.4.3 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from "vue";
import App from "./App.vue";
// 1. 完整引入 element ui 的组件
import ElementUI from "element-ui";
// 2. 导入 element ui 组件的样式
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
// 3. 把Element注册为 vue 的插件【注册之后，即可在每个组件中直接使用一个element ui的组件】
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

### 13.4.4 按需引入

借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。

步骤 1，安装 babel-plugin-component：

```shell
npm install babel-plugin-component -D
```

步骤 2，修改根目录下的 babel.config.js 配置文件，新增 plugins 节点如下：

```javascript
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    // 加这个结点
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
```

步骤 3，如果你只希望引入部分组件，比如 Button 和 Select 那么需要在 main.js 中写入以下内容：

```javascript
import Vue from "vue";
import App from "./App.vue";
// 1. 按需导入 element ui 的组件
import { Button, Select } from "element-ui";
// 2. 注册需要的组件
Vue.use(Button);
Vue.use(Select);
/* 或这样写
Vue.component(Button.name, Button);
Vue.component(Select.name, Select); */
new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

## 13.5 把组件的导入和注册封装为独立的模块

在 src 目录下新建 element-ui/index.js 模块，并声明如下的代码：

```javascript
// 模块路径 /src/element-ui/index.js
import Vue from "vue";
// 1. 按需导入 element ui 的组件
import { Button, Select } from "element-ui";
// 2. 注册需要的组件
Vue.use(Button);
Vue.use(Select);
// ------在main.js文件中，导入--------
import "./element-ui";
```
