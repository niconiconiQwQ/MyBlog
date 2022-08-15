---
title: webpack 笔记
date: 2022/06/26 07:28 #手动设置最后更新时间
categories: [webpack] # 标签
stick: false # 是否置顶
description: webpack 笔记
keyword: webpack 笔记
---

# webpack 笔记

# 1. 前端工程化概念

## 1.1 现代化前端开发

小白眼中的前端开发：

- 会写 HTML + CSS + JavaScript 就会前端开发
- 需要美化页面样式，就拽一个 bootstrap 过来
- 需要操作 DOM 或发起 Ajax 请求，再拽一个 jQuery 过来
- 需要快速实现网页布局效果，就拽一个 Layui 过来

实际的前端开发：

- 模块化（js 的模块化、css 的模块化、资源的模块化）
- 组件化（复用现有的 UI 结构、样式、行为）
- 规范化（目录结构的划分、编码规范化、接口规范化、文档规范化、 Git 分支管理）
- 自动化（自动化构建、自动部署、自动化测试）

## 1.2 前端工程化概念

前端工程化指的是：在企业级的前端项目开发中，把前端开发所需的工具、技术、流程、经验等进行规范化、标准化。

企业中的 Vue 项目和 React 项目，都是基于工程化的方式进行开发的。

好处：前端开发自成体系，有一套标准的开发方案和流程。最大程度地提高了前端的开发效率，降低了技术选型、前后端联调等带来的协调沟通成本

## 1.3 前端工程化的解决方案

早期的前端工程化解决方案：

- grunt：[https://www.gruntjs.net/](https://www.gruntjs.net/)
- gulp：[https://www.gulpjs.com.cn/ ](https://www.gulpjs.com.cn/)

目前主流的前端工程化解决方案：

- webpack：[https://www.webpackjs.com/](https://www.webpackjs.com/)
- parcel：[https://zh.parceljs.org/](https://zh.parceljs.org/)

# 2. webpack 的基本使用

## 2.1 webpack 概述

- 概念：webpack 是前端项目工程化的具体解决方案。
- 主要功能：它提供了友好的前端模块化开发支持，以及代码压缩混淆、处理浏览器端 JavaScript 的兼容性、性能优化等强大的功能。
- 好处：让程序员把工作的重心放到具体功能的实现上，提高了前端开发效率和项目的可维护性。
- 注意：目前 Vue，React 等前端项目，基本上都是基于 webpack 进行工程化开发的。

## 2.2 webpack 的安装

在终端运行如下的命令，安装 webpack 相关的两个包：

```shell
npm  install  webpack webpack-cli -D
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/602f762e04c94cd88b2bfb1e55733da7.png#pic_center)

## 2.3 webpack 的配置

### 2.3.1 基本配置

① 在项目**根目录**中，创建名为 `webpack.config.js` 的 webpack 配置文件，并初始化如下的基本配置：

```javascript
module.exports = {
  mode: "development", // mode 用来指定构建模式，可选值有 development 和 production
};
```

② 在 package.json 的 scripts 节点下，新增 dev 脚本如下：

```javascript
"scripts": {
    "dev": "webpack"  // script 节点下的脚本, 可以通过 npm run 执行。
    //例如 npm run dev .  dev可以换成别的名字，webpack不可以改名
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/971e0a0a29964b14bbe9ae6d2a4501a0.png#pic_center)
③ 在终端中运行 npm run dev 命令，启动 webpack 进行项目的打包构建

```shell
npm run dev
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/9220deb2f39240d5bed327b9085afc70.png#pic_center)

### 2.3.2 mode 的可选值

| mode        | 环境     | 对打包生成的文件进行代码压缩和性能优化 | 打包速度                               |
| ----------- | -------- | -------------------------------------- | -------------------------------------- |
| development | 开发环境 | 不会                                   | 打包速度快，适合在开发阶段使用         |
| production  | 生产环境 | 会                                     | 打包速度很慢，仅适合在项目发布阶段使用 |

### 2.3.3 webpack.config.js

- `webpack.config.js` 是 webpack 的配置文件。webpack 在真正开始打包构建之前，会先读取这个配置文件，从而基于给定的配置，对项目进行打包。
- 注意：由于 webpack 是基于 node.js 开发出来的打包工具，因此在它的配置文件中，支持使用 node.js 相关的语法和模块进行 webpack 的个性化配置。

### 2.3.4 webpack 中的默认约定

- 在 webpack 4.x 和 5.x 的版本中，有如下的默认约定：
  ① 默认的打包入口文件为 `src -> index.js`
  ② 默认的输出文件路径为 `dist -> main.js`
- 注意：可以在 webpack.config.js 中修改打包的默认约定

### 2.3.5 自定义打包的入口与出口

在 `webpack.config.js` 配置文件中，通过 `entry` 节点指定打包的入口。通过 `output` 节点指定打包的出口。

示例代码如下：

```javascript
const path = require("path");
// 使用node.js 中的导出语法，向外导出一个webpack的配置对象
module.exports = {
  mode: "development", // 代表webpack的运行模式，可选值为两个 development 和production
  // 开发阶段用devlopment,因为开发追求打包速度，而不是体积
  // 发布上线用 production，因为上线追求体积小，而不是打包速度

  // entry : '指定要打包的文件'
  entry: path.join(__dirname, "./src/index2.js"),
  // 指定生成的文件要存放到哪里
  output: {
    // 存放的目录
    path: path.join(__dirname, "./dist"),
    // 生成的文件名
    filename: "bundle.js",
  },
};
```

# 3. webpack 中的插件

## 3.1 webpack 插件的作用

通过安装和配置第三方的插件，可以拓展 webpack 的能力，从而让 webpack 用起来更方便。最常用的 webpack 插件有如下两个：

- ① webpack-dev-server
  类似于 node.js 阶段用到的 nodemon 工具
  每当修改了源代码，webpack 会自动进行项目的打包和构建
- ② html-webpack-plugin
  webpack 中的 HTML 插件（类似于一个模板引擎插件）
  可以通过此插件自定制 index.html 页面的内容

## 3.2 webpack-dev-server

`webpack-dev-server` 可以让 webpack 监听项目源代码的变化，从而进行自动打包构建。

### 3.2.1 安装 webpack-dev-server

运行如下的命令，即可在项目中安装此插件：

```shell
npm install  webpack-dev-server -D
```

### 3.2.2 配置 webpack-dev-server

① 修改 package.json -> scripts 中的 dev 命令如下：

```javascript
"scripts": {
    "dev": "webpack serve"  // script 节点下的脚本, 可以通过 npm run 执行。
}
```

② 再次运行 npm run dev 命令，重新进行项目的打包
③ 在浏览器中访问 http://localhost:8080 地址，查看自动打包效果

- 注意：webpack-dev-server 会启动一个实时打包的 http 服务器
- 问题：如果访问 http://localhost:8080，出现如下 Cannot GET / 情况

![在这里插入图片描述](https://img-blog.csdnimg.cn/0add7db2e5f74e7780355bc5d79e4fe2.png#pic_center)
尝试在 webpack.config.js 下做如下修改之后，重新 npm run 一下

```javascript
module.exports = {
  mode: "development",
  //加入下面这段告知 webpack-dev-server，将 './' 目录下的文件 serve 到localhost:8080 下(寄存到服务器下)
  devServer: {
    static: "./",
  },
};
```

可以访问到资源了
![在这里插入图片描述](https://img-blog.csdnimg.cn/c0636021502f4075a3c16475a7583ef8.png#pic_center)

### 3.3.3 打包生成的文件路径

① 不配置 webpack-dev-server 的情况下，webpack 打包生成的文件，会存放到实际的物理磁盘上

- 严格遵守开发者在 webpack.config.js 中指定配置
- 根据 output 节点指定路径进行存放

② 配置了 webpack-dev-server 之后，打包生成的文件存放到了内存中

- 不再根据 output 节点指定的路径，存放到实际的物理磁盘上
- 提高了实时打包输出的性能，因为内存比物理磁盘速度快很多

### 3.3.4 访问生成到内存中的文件

webpack-dev-server 生成到内存中的文件，默认放到了项目的根目录中，而且是虚拟的、不可见的。

- 可以直接用 `/` 表示项目根目录，后面跟上要访问的文件名称，即可访问内存中的文件
- 例如 `/bundle.js` 就表示要访问 webpack-dev-server 生成到内存中的 bundle.js 文件
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/ec18db94682641cdbcd90f8a775f7d4e.png#pic_center)

## 3.3 html-webpack-plugin

`html-webpack-plugin` 是 webpack 中的 HTML 插件，可以通过此插件自定制 index.html 页面的内容。

需求：通过 html-webpack-plugin 插件，将 src 目录下的 index.html 首页，复制到项目根目录中一份！

### 3.3.1 安装 html-webpack-plugin

运行如下的命令，即可在项目中安装此插件：

```shell
npm  install html-webpack-plugin -D
```

### 3.3.2 配置 html-webpack-plugin

在 `webpack.config.js`中添加配置如下

```javascript
// 1.导入html-webpack-plugin 插件，得到插件的构造函数
const HtmlPlugin = require("html-webpack-plugin");
// 2. new 构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
  // 指定要复制哪个页面
  template: "./src/index.html",
  // 指定复制出来的存放路径，和文件名
  filename: "./index.html",
});
module.exports = {
  mode: "development",
  // 3. 插件的数组，将来webpack在运行时，会加载并调用这些插件
  plugins: [htmlPlugin],
```

### 3.3.3 解惑 html-webpack-plugin

① 通过 HTML 插件复制到项目根目录中的 index.html 页面，也被放到了内存中
② HTML 插件在生成的 index.html 页面，自动注入了打包的 bundle.js 文件

### 3.3.4 devServer 节点

在 webpack.config.js 配置文件中，可以通过 `devServer` 节点对 webpack-dev-server 插件进行更多的配置，示例代码如下：

```javascript
module.exports = {
  devServer: {
    open: true, // 初次打包完成后，自动打开浏览器
    host: "127.0.0.1", //实时打包所使用的主机地址
    port: 80, // 实时打包所使用的端口号
  },
};
```

注意：凡是修改了 webpack.config.js 配置文件，或修改了 package.json 配置文件，必须重启实时打包的服务器，否则最新的配置文件无法生效！

# 4. webpack 中的 loader

## 4.1 loader 概述

在实际开发过程中，webpack **默认**只能打包处理以 `.js` 后缀名结尾的模块。其他非 .js 后缀名结尾的模块，webpack 默认处理不了，需要调用 loader 加载器才可以正常打包，否则会报错！

loader 加载器的作用：协助 webpack 打包处理特定的文件模块。比如：

- css-loader 可以打包处理 .css 相关的文件
- less-loader 可以打包处理 .less 相关的文件
- babel-loader 可以打包处理 webpack 无法处理的高级 JS 语法

## 4.2 loader 的调用过程

![在这里插入图片描述](https://img-blog.csdnimg.cn/15bcc254f762442581505c1c0948e09b.png#pic_center)

## 4.3 打包处理 css 文件

前提：首先得把你 css 文件引入 webpack 的打包入口，如：

```javascript
// 导入样式（在webpack中，一切皆模块，都可以通过ES6导入语法导入和使用）
import "./index.css";
```

① 安装处理 css 文件的 loader

```shell
npm  i  style-loader css-loader -D
```

② 在 webpack.config.js 的 `module -> rules` 数组中，添加 loader 规则如下：

```javascript
module.exports = {
  module: {
    //所有第三方模块的匹配规则
    rules: [
      //文件后缀名的匹配规则
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
};
```

- 其中，test 表示匹配的文件类型， use 表示对应要调用的 loader
- 注意：
  1.use 数组中指定的 loader 顺序是固定的 2.多个 loader 的调用顺序是：从后往前调用
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/ca184fb5904f4fa7a1a28a17342c383d.png#pic_center)

## 4.4 打包处理 less 文件

前提：首先得把你 less 文件引入 webpack 的打包入口，如：

```javascript
import "./index.less";
```

① 运行命令

```javascript
npm i less-loader less -D
```

② 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：

```javascript
module: {
    rules: [{
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
        //这里less包是less-loader的内置依赖项，
        //只需要装到项目里就可以了，不需要显示申明到这个数组里去
      },
    ],
}
```

## 4.5 打包处理样式表中与 url 路径相关的文件

前提：首先得把你图片文件引入 webpack 的打包入口，如：

```javascript
import logo from "./index.png"; // 引入
$(".logo").attr("src", logo); // 使用
```

① 运行如下命令

```shell
npm i url-loader file-loader -D
```

② 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：

```javascript
module: {
  rules: [
    // 处理图片文件的loader
    // 如果需要调用一个loader，则只传一个字符串即可，如果有多个loader，则必须指定数组
    { test: /\.png|.jpg|.gif/, use: "url-loader?limit=12222" },
  ],
}
```

其中 `?` 之后的是 loader 的参数项：

- limit 用来指定图片的大小，单位是字节（byte）
- 只有 ≤ limit 大小的图片，才会被转为 base64 格式的图片(小图片适合 base64，大图片不适合转成 base64)

## 4.6 打包处理 js 文件中的高级语法

webpack 只能打包处理一部分高级的 JavaScript 语法。对于那些 webpack 无法处理的高级 js 语法，需要借助于 `babel-loader` 进行打包处理。例如 webpack 无法处理下面的 JavaScript 代码：

```javascript
// 1. 定义了名为 info 的修饰器
function info(target) {
  // 2. 为目标添加静态 info
  target.info = "Person info";
}
// 3. 为Person 类应用 info 修饰器
@info
class Person {}
// 4. 打印 Person 的静态属性 info
```

### 4.6.1 安装 babel-loader 相关的包

运行如下的命令安装对应的依赖包：

```shell
npm i babel-loader @babel/core @babel/plugin-proposal-decorators -D
```

在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：

```javascript
module: {
  //定义了不同模块的匹配规则
  rules: [
    // 在配置 babel-loader 的时候，程序员只需要把自己的代码进行转换即可；一定要排除 node_modules 目录中的 JS 文件
    // 因为第三方包中的 JS 兼容性，不需要程序员关心
    { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
  ],
}
```

### 4.6.2 配置 babel-loader

在项目根目录下，创建名为 `babel.config.js` 的配置文件，定义 Babel 的配置项如下：(下面是的@babel/plugin-proposal-decorators 是为了支持类的装饰器语法, 包括类装饰器的语法)

```javascript
module.exports = {
  // 申明 babel 可用的插件
  // 将来，webpack 在调用babel-loader的时候，会先加载plugins插件来使用
  plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
};
```

更多 babel 插件详情请参考 Babel 的官网 [https://babeljs.io/docs/en/babel-plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)

# 5. 打包发布

## 5.1 为什么要打包发布

项目开发完成之后，需要使用 webpack 对项目进行打包发布，主要原因有以下两点：

- ① 开发环境下，打包生成的文件存放于内存中，无法获取到最终打包生成的文件
- ② 开发环境下，打包生成的文件不会进行代码压缩和性能优化

为了让项目能够在生产环境中高性能的运行，因此需要对项目进行打包发布。

## 5.2 配置 webpack 的打包发布

在 package.json 文件的 scripts 节点下，新增 build 命令如下：

```javascript
"scripts": {
  "dev": "webpack serve", // 开发环境下，运行dev 命令
  "build": 'webpack --mode production' // 项目发布时，运行 build 命令
}
```

`--model` 是一个参数项，用来指定 webpack 的运行模式。production 代表生产环境，会对打包生成的文件进行代码压缩和性能优化。

注意：通过 --model 指定的参数项，会覆盖 webpack.config.js 中的 model 选项。

## 5.3 把 JS 文件统一生成到 js 目录中

在 webpack.config.js 配置文件的 output 节点中，进行如下的配置

```javascript
output: {
  // 存放的目录
  path: path.join(__dirname, "./dist"),
  // 生成的文件名
  filename: "js/bundle.js",
}
```

## 5.4 把图片文件统一生成到 images 目录中

修改 webpack.config.js 中的 url-loader 配置项，新增 outputPath 选项即可指定图片文件的输出路径：

```javascript
module: {
  rules: [
			{
			  test: /\.jpg|png|gif$/,
			  use: {
			    loader: "url-loader",
			    // 明确指定把打包生成的图片文件,存储到dist目录下的images文件夹下
			    options: { limit: 22, outputPath: "images" },
			  },
			}
    ],
}
```

或

```javascript
module: {
  rules: [
    // 在配置url-loader的时候，多个参数之间，使用&符号进行分割
    {
      test: /\.png|.jpg|.gif/,
      use: "url-loader?limit=222&outputPath=images",
    }
    ],
}
```

## 5.5 自动清理 dist 目录下的旧文件

为了在每次打包发布时自动清理掉 dist 目录中的旧文件，在 webpack.config.js 文件的 output 里添加 clean: true 即可

```javascript
output: {
    // 存放的目录
    path: path.join(__dirname, "./dist"),
    // 生成的文件名
    filename: "js/bundle.js",//打包前清理 dist 文件夹
    clean: true,
}
```

也可以如下安装并配置 clean-webpack-plugin 插件使用，不过还是上面这个轻松
![在这里插入图片描述](https://img-blog.csdnimg.cn/6f58dc67246c482cb57f0fb80aab6171.png)

# 6. Source Map

## 6.1 生产环境遇到的问题

前端项目在投入生产环境之前，都需要对 JavaScript 源代码进行压缩混淆，从而减小文件的体积，提高文件的加载效率。此时就不可避免的产生了另一个问题：
对压缩混淆之后的代码除错（debug）是一件极其困难的事情
![在这里插入图片描述](https://img-blog.csdnimg.cn/839ea21b28444eeba8b0156f879429b6.png)
因为：变量被替换成没有任何语义的名称，空行和注释被剔除

## 6.2 什么是 Source Map

- Source Map 就是一个信息文件，里面储存着位置信息。也就是说，Source Map 文件中存储着压缩混淆后的代码，所对应的转换前的位置。

- 有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码，能够极大的方便后期的调试。

## 6.3 webpack 开发环境下的 Source Map

在开发环境下，webpack 默认启用了 Source Map 功能。当程序运行出错时，可以直接在控制台提示错误行的位置，并定位到具体的源代码：
![在这里插入图片描述](https://img-blog.csdnimg.cn/88e53c8db8d44445baa985d90574b378.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/ddcc24d3777845219eb21fcbb4d0bc90.png)

### 6.3.1 默认 Source Map 的问题

开发环境下默认生成的 Source Map，记录的是生成后的代码的位置。会导致运行时报错的行数与源代码的行数不一致的问题。示意图如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/c89983d5de014144a1064aed77c97c16.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/55ed4729d5a6407a915533676a18d3f8.png)

### 6.3.2 解决默认 Source Map 的问题

开发环境下，推荐在 webpack.config.js 中添加如下的配置，即可保证运行时报错的行数与源代码的行数保持一致：

```javascript
module.exports = {
  mode: "development",
  // eval-source-map 仅限在'开发模式'下使用，不建议在'生产模式'下使用
  // 此选项生成的Source Map 能够保证'运行时报错的行数' 与 '源代码的行数保持一致'
  devtool: "eval-source-map",
};
```

## 6.4 webpack 生产环境下的 Source Map

在生产环境下，如果省略了 devtool 选项，则最终生成的文件中不包含 Source Map。这能够防止原始代码通过 Source Map 的形式暴露给别有所图之人。
![在这里插入图片描述](https://img-blog.csdnimg.cn/459cde1377024c5c98e658123a8d5617.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/60a946ed627d4628975a2d8688bb5df3.png)

### 6.4.1 只定位行数不暴露源码

在生产环境下，如果只想定位报错的具体行数，且不想暴露源码。此时可以将 devtool 的值设置为`nosources-source-map`。实际效果如图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/bf6fa586f4204931a10d61d6b0e5c291.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/e674faf151004664bb69fcd76329aecf.png)

### 6.4.2 定位行数且暴露源码

在生产环境下，如果想在定位报错行数的同时，展示具体报错的源码。此时可以将 devtool 的值设置为`source-map`。(危险，不推荐)实际效果如图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/460f5976fd89409789dd1906af3fb960.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/b624ec01e64b450ba3bba74ff2b2321f.png)
采用此选项后：你应该将你的服务器配置为，不允许普通用户访问 source map 文件！

> 看到`.map`结尾的文件，要想到 Source Map 文件，记录了源码行号信息

## 6.5 Source Map 的最佳实践

① 开发环境下：

- 建议把 devtool 的值设置为 eval-source-map
- 好处：可以精准定位到具体的错误行

② 生产环境下：

- 建议关闭 Source Map 或将 devtool 的值设置为 nosources-source-map
- 好处：防止源码泄露，提高网站的安全性

> 知识补充 ：在 webpack.config.js 中配置下列信息。在路径中引用@时，表示从 src 这一层往下找
>
> ```javascript
> module.exports = {
>   resolve: {
>     alias: {
>       // 告诉 webpack ，程序员写的代码中，@ 符号 表示 src这一层目录
>       "@": path.join(__dirname, "./src"),
>     },
>   },
> };
> ```

# 7. 尾巴

实际开发中会使命令行工具（俗称 CLI）一键生成带有 webpack 的项目；开箱即用，所有 webpack 配置项都是现成的！以上作为 webpack 中的基本概念了解即可！

记录上文涉及的各种包/插件的版本

```javascript
{
  "dependencies": {
    "css-loader": "^6.7.1",
    "style-loader": "^3.3.1",
    "webpack-dev-server": "^4.9.2"
  },
  "devDependencies": {
    "@babel/core": "^7.18.5",
    "@babel/plugin-proposal-decorators": "^7.18.2",
    "babel-loader": "^8.2.5",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.0",
    "less": "^4.1.3",
    "less-loader": "^11.0.0",
    "url-loader": "^4.1.1",
    "webpack": "^5.73.0",
    "webpack-cli": "^4.10.0"
  }
}
```
