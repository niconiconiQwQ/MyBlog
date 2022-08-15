---
title: Nodejs基础 + npm包管理
date: 2022/05/22 09:19
categories: [Nodejs, npm]
stick: false
description: 常用模块+npm包管理工具
keyword: Nodejs, npm
---

# 常用模块 + npm 包管理工具

# 1. 前提回顾

1、浏览器中的 JavaScript 的组成部分
![在这里插入图片描述](https://img-blog.csdnimg.cn/47d2d65c775843398d944908ab3d8999.png#pic_center)

2、为什么 JavaScript 可以在浏览器中被执行
![在这里插入图片描述](https://img-blog.csdnimg.cn/488ff832961f42889b13cde4e380d25c.png#pic_center)

- 不同的浏览器使用不同的 JavaScript 解析引擎：
  ① Chrome 浏览器 => V8
  ② Firefox 浏览器 => OdinMonkey（奥丁猴）
  ③ Safri 浏览器 => JSCore
  ④ IE 浏览器=> Chakra（查克拉）...
- 其中，Chrome 浏览器的 V8 解析引擎性能最好！

3、为什么 JavaScript 可以操作 DOM 和 BOM

- 每个浏览器都内置了 DOM、BOM 这样的 API 函数，因此，浏览器中的 JavaScript 才可以调用它们。

![在这里插入图片描述](https://img-blog.csdnimg.cn/b6832301896d49fca1456c22d035b2d8.png#pic_center)

5、浏览器中的 JavaScript 运行环境

- 运行环境是指代码正常运行所需的必要环境。

![在这里插入图片描述](https://img-blog.csdnimg.cn/729b10b887624410841053f23976ac2a.png#pic_center)

- 总结：
  ① V8 引擎负责解析和执行 JavaScript 代码。
  ② 内置 API 是由运行环境提供的特殊接口，只能在所属的运行环境中被调用。

# 2. 初识 Node.js

## 2.1 Node.js 简介

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
Node.js 的中文官网地址： [http://nodejs.cn/](http://nodejs.cn/)

## 2.2 Node.js 中的 JS 运行环境

![在这里插入图片描述](https://img-blog.csdnimg.cn/9f5a5b5c2c23465c92976789214113b8.png#pic_center)

- 注意：
  ① 浏览器是 JavaScript 的前端运行环境。
  ② Node.js 是 JavaScript 的后端运行环境。
  ③ Node.js 中无法调用 DOM 和 BOM 等浏览器内置 API。

## 2.3 Node.js 可以做什么

- Node.js 作为一个 JavaScript 的运行环境，仅仅提供了基础的功能和 API。然而，基于 Node.js 提供的这些基础功能，很多强大的工具和框架如雨后春笋，层出不穷，所以学会了 Node.js ，可以让前端程序员胜任更多的工作和岗位：
  ① 基于 Express 框架（http://www.expressjs.com.cn/），可以快速构建 Web 应用
  ② 基于 Electron 框架（https://electronjs.org/），可以构建跨平台的桌面应用
  ③ 基于 restify 框架（http://restify.com/），可以快速构建 API 接口项目
  ④ 读写和操作数据库、创建实用的命令行工具辅助前端开发、etc…

## 2.4 Node.js 环境的安装

- 如果希望通过 Node.js 来运行 Javascript 代码，则必须在计算机上安装 Node.js 环境才行。[http://nodejs.cn/](http://nodejs.cn/)

![在这里插入图片描述](https://img-blog.csdnimg.cn/1f82b2b23a854a5aba3f8cbf084bfb7f.png#pic_center)

- 区分 **LTS** 版本和 **Current** 版本的不同
  ① LTS 为长期稳定版，对于追求稳定性的企业级项目来说，推荐安装 LTS 版本的 Node.js。
  ② Current 为新特性尝鲜版，对热衷于尝试新特性的用户来说，推荐安装 Current 版本的 Node.js。但是，Current 版本中可能存在隐藏的 Bug 或安全性漏洞，因此不推荐在企业级项目中使用 Current 版本的 Node.js
- 查看**已安装**的 Node.js 的版本号
  打开终端，在终端输入命令 `node –v` 后，按下回车键，即可查看已安装的 Node.js 的版本号。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/d9b51cde5fdb4ab59380a9f4723ed447.png#pic_center)

- 在 Node.js 环境中执行 JavaScript 代码
  ① 打开终端
  ② 输入 node 要执行的 js 文件的路径
- 终端中的快捷键
  在 Windows 的 powershell 或 cmd 终端中，我们可以通过如下快捷键，来提高终端的操作效率：
  ① 使用 ↑ 键，可以快速定位到上一次执行的命令
  ② 使用 tab 键，能够快速补全路径
  ③ 使用 esc 键，能够快速清空当前已输入的命令
  ④ 输入 cls 命令，可以清空终端

# 3. 模块化

## 3.1 模块化简介

- 模块化是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程。对于整个系统来说，模块是可组合、分解和更换的单元。
- 编程领域中的模块化，就是遵守固定的规则，把一个大文件拆成独立并互相依赖的多个小模块。
- 模块化好处：
  ① 提高了代码的复用性
  ② 提高了代码的可维护性
  ③ 可以实现按需加载
- 模块化规范：就是对代码进行模块化的拆分与组合时，需要遵守的那些规则。例如：使用什么样的语法格式来引用模块，在模块中使用什么样的语法格式向外暴露成员
- 模块化规范的好处：大家都遵守同样的模块化规范写代码，降低了沟通的成本，极大方便了各个模块之间的相互调用，
  利人利己。

## 3.2 Node.js 中模块的分类

Node.js 中根据模块**来源**的不同，将模块分为了 3 大类，分别是：
① 内置模块（内置模块是由 Node.js 官方提供的，例如 fs、path、http 等）
② 自定义模块（用户创建的每个 .js 文件，都是自定义模块）
③ 第三方模块（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载）

## 3.3 加载模块

使用强大的 `require()` 方法，可以加载需要的内置模块、用户自定义模块、第三方模块进行使用。例如：

```javascript
// 1. 加载内置fs模块
const fs = require('fs');
//2. 加载用户的自定义模块
const custom = require(./my.js);
//3. 加载第三方模块
const monent = require('moment');
```

注意：使用 require() 方法加载其它模块时，会**执行**被加载模块中的代码。

## 3.4 模块作用域

1、 模块作用域：和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块作用域。
![在这里插入图片描述](https://img-blog.csdnimg.cn/5320c8ab990b4e638a527898c4d340c8.png#pic_center)

2、模块作用域的好处：防止了全局变量污染的问题
![在这里插入图片描述](https://img-blog.csdnimg.cn/1bbf6e1212164ce1a5994174f4dbdf9c.png#pic_center)

## 3.5 向外共享模块作用域中的成员

### 3.5.1 module 对象

在每个 .js 自定义模块中都有一个 module 对象，它里面存储了和当前模块有关的信息，打印如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/73d8efbf7e0c466b86d4112165be5890.png#pic_center)

### 3.5.2 module.exports 对象

- 在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。
- 外界用 require() 方法导入自定义模块时，得到的就是 module.exports 所指向的对象。

### 3.5.3 共享成员时的注意点

使用 require() 方法导入模块时，导入的结果，永远以 **module.exports** 指向的对象为准。
![在这里插入图片描述](https://img-blog.csdnimg.cn/b4cf9b47e751473d8f2f2fa89f2a9906.png#pic_center)

### 3.5.4 exports 对象

- 由于 module.exports 单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了 exports 对象。**默认情况下**，exports 和 module.exports 指向同一个对象。最终共享的结果，还是以 module.exports 指向的对象为准。
- exports 和 module.exports 的易错点：时刻谨记，require() 模块时，得到的永远是 module.exports 指向的对象

![在这里插入图片描述](https://img-blog.csdnimg.cn/48fa202952c148a18e55805b71420654.png#pic_center)

为了防止混乱，建议不要在同一个模块中同时使用 exports 和 module.exports

## 3.6 Node.js 中的模块化规范

- Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖。
- CommonJS 规定：
  ① 每个模块内部，module 变量代表当前模块。
  ② module 变量是一个对象，它的 exports 属性（即 module.exports）是对外的**接口**。
  ③ 加载某个模块，其实是加载该模块的 module.exports 属性。require() 方法用于加载模块。

## 3.7 模块的加载机制

1、优先从缓存中加载

- 模块在第一次加载后会被缓存。 这也意味着多次调用 require() 不会导致模块的代码被执行多次。
- 注意：不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率。

2、 内置模块的加载机制

- 内置模块是由 Node.js 官方提供的模块，内置模块的加载优先级最高。
- 例如，`require('fs')` 始终返回内置的 fs 模块，即使在 node_modules 目录下有名字相同的包也叫做 fs。

3、自定义模块的加载机制

- 使用 `require()` 加载自定义模块时，必须指定以 `./` 或 `../` 开头的**路径标识符**。在加载自定义模块时，如果没有指定 `./` 或 `../`
  这样的路径标识符，则 node 会把它当作**内置**模块或**第三方**模块进行加载。
- 同时，在使用 require() 导入自定义模块时，如果省略了文件的扩展名，则 Node.js 会按顺序分别尝试加载以下的文件：
  ① 按照确切的文件名进行加载
  ② 补全 .js 扩展名进行加载
  ③ 补全 .json 扩展名进行加载
  ④ 补全 .node 扩展名进行加载
  ⑤ 加载失败，终端报错

4、第三方模块的加载机制

- 如果传递给 require() 的模块标识符不是一个内置模块，也没有以 ‘./’ 或 ‘../’ 开头，则 Node.js 会从当前模块的父目录开始，尝试从 /node_modules 文件夹中加载第三方模块。
- 如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。
- 例如，假设在 'C:\Users\itheima\project\foo.js' 文件里调用了 require('tools')，则 Node.js 会按以下顺序查找：
  ① C:\Users\itheima\project\node_modules\tools
  ② C:\Users\itheima\node_modules\tools
  ③ C:\Users\node_modules\tools
  ④ C:\node_modules\tools

5、目录作为模块

- 当把目录作为模块标识符，传递给 require() 进行加载的时候，有三种加载方式：
  ① 在被加载的目录下查找一个叫做 package.json 的文件，并寻找 main 属性，作为 require() 加载的入口
  ② 如果目录里没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件。
  ③ 如果以上两步都失败了，则 Node.js 会在终端打印错误消息，报告模块的缺失：Error: Cannot find module 'xxx'

# 4. npm 与包

## 4.1 包的简介

- 包的概念：Node.js 中的第三方模块又叫做包。
- 包的来源：不同于 Node.js 中的内置模块与自定义模块，包是由第三方个人或团队开发出来的，免费供所有人使用。
- 为什么需要包：
  ① 由于 Node.js 的内置模块仅提供了一些底层的 API，导致在基于内置模块进行项目开发的时，效率很低。
  ② 包是基于内置模块封装出来的，提供了更高级、更方便的 API，极大的提高了开发效率。
  包和内置模块之间的关系，类似于 jQuery 和 浏览器内置 API 之间的关系。

## 4.2 包的下载

- npm, Inc. 公司提供了一个包管理工具，Node Package Manager（简称 npm 包管理工具），这个包管理工具随着 **Node.js 的安装包**一起被安装到了用户的电脑上。
- 包的下载地址：
  ① 从 [https://www.npmjs.com/](https://www.npmjs.com/) **网站**上搜索自己所需要的包
  ② 从 [https://registry.npmjs.org/](https://registry.npmjs.org/) **服务器**上下载自己需要的包
- 可以在终端中执行 `npm -v` 命令，来查看自己电脑上所安装的 npm 包管理工具的版本号：(安装了 node.js 会自带 npm,无需额外下载)

![在这里插入图片描述](https://img-blog.csdnimg.cn/24f0f0ebb3ba41a2b15123d8ddb7b93b.png#pic_center)

## 4.3 npm 基础操作

例如：格式化时间的做法
① 使用 npm 包管理工具，在项目中安装格式化时间的包 moment
② 使用 require() 导入格式化时间的包
③ 参考 moment 的官方 API 文档对时间进行格式化

```javascript
// 1. 导入需要的包
// 注意：导入的名称，就是装包时候的名称
const moment = require("moment");
//参考 moment 的官方 API 文档对时间进行格式化
//moment() 得到当前时间，format()对时间格式化
const dt = moment().format("YYYY-MM-DD HH:mm:ss");
console.log(dt);
```

### 4.3.1 安装包的命令

如果想在项目中安装指定名称的包，需要运行如下的命令：

```shell
npm install 包名
# 简写方式
npm i 包名
```

### 4.3.2 初次装包多了哪些文件

- 初次装包完成后，在项目文件夹下多一个叫做 `node_modules` 的文件夹和 `package-lock.json` 的配置文件。
- `node_modules` 文件夹用来存放所有已安装到项目中的包。require() 导入第三方包时，就是从这个目录中查找并加载包。
- `package-lock.json` 配置文件用来记录 node_modules 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等。
- 注意：我们不要手动修改 node_modules 或 package-lock.json 文件中的任何代码，npm 包管理工具会自动维护它们。

![在这里插入图片描述](https://img-blog.csdnimg.cn/a69a7a5091304a3b85f040d4a801c6e7.png#pic_center)

### 4.3.3 安装指定版本的包

默认情况下，使用 npm install 命令安装包的时候，会自动安装**最新版本**的包。如果需要安装指定版本的包，可以在包名之后，通过 @ 符号指定具体的版本，例如

```shell
install i moment@2.22.2
```

> 知识扩展：
>
> - 包的版本号是以“点分十进制”形式进行定义的，总共有三位数字，例如 2.24.0
> - 其中每一位数字所代表的的含义如下：
>   第 1 位数字：大版本
>   第 2 位数字：功能版本
>   第 3 位数字：Bug 修复版本
> - 版本号提升的规则：只要前面的版本号增长了，则后面的版本号归零。

### 4.3.4 卸载包

可以运行 `npm uninstall` 命令，来卸载指定的包：

```shell
npm uninstall 包名
```

注意：npm uninstall 命令执行成功后，会把卸载的包，自动从 package.json 的 dependencies 中移除掉。

> 需要更新某个包时，不需要卸载旧包，直接下载会覆盖原有的包

## 4.4 包管理配置文件

### 4.4.1 概述

npm 规定，在项目根目录中，必须提供一个叫做 **package.json** 的包管理配置文件。用来记录与项目有关的一些配置信息。例如：

- ① 项目的名称、版本号、描述等
- ② 项目中都用到了哪些包
- ③ 哪些包只在开发期间会用到
- ④ 那些包在开发和部署时都需要用到

多人协作的问题

- 问题需求：第三方包的体积过大，不方便团队成员之间共享项目源代码。
- 解决方案：共享时剔除 node_modules

如何记录项目中安装了哪些包

- 在项目根目录中，创建一个叫做 **package.json** 的配置文件，即可用来记录项目中安装了哪些包。从而方便剔除 node_modules 目录之后，在团队成员之间共享项目的源代码。
- 注意：今后在项目开发中，一定要把 node_modules 文件夹，添加到 `.gitignore` 忽略文件中。

### 4.4.2 快速创建 package.json

通过 `npm init -y`，可以在执行命令时所处的目录中，快速创建 package.json 这个包管理配置文件：

```javascript
//执行命令时所处的目录中，快速创建 package.json
npm init -y
```

注意：
① 上述命令只能在英文的目录下成功运行！所以，项目文件夹的名称一定要使用英文命名，不要使用中文，不能出现空格。
② 运行 npm install 命令安装包的时候，npm 包管理工具会自动把包的名称和版本号，记录到 package.json 中。
③ `npm init -y` 一般在项目创建的初期就初始化好，且在项目开发期间执行一次就好了，以便管理包

### 4.4.3 dependencies 节点

package.json 文件中，有一个 dependencies 节点，专门用来记录您使用 npm install 命令安装了哪些包。
![在这里插入图片描述](https://img-blog.csdnimg.cn/1421653d92ea4a5587386417ddbeb59c.png#pic_center)

### 4.4.4 一次性安装所有的包

- 可以试着删除 node_modules 文件，再运行 npm install 命令（或 npm i）一次性安装所有的依赖包。
- 执行 npm install 时，npm 包管理工具会先读取 `package.json` 中的 `dependencies` 节点，读取到所有依赖包和版本号之后会把这些包一次性下载到项目里。

```shell
npm install
# 简写
npm i
```

### 4.4.5 devDependencies 节点

- 如果某些包只在项目开发阶段会用到，在项目上线之后不会用到，则建议把这些包记录到 devDependencies 节点中。
- 与之对应的，如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到 dependencies 节点中。
- 可以使用如下的命令，将包记录到 devDependencies 节点中：

```shell
npm i 包名 -D
# 完整写法
npm install 包名 --save-dev
```

### 4.4.6 解决下包速度慢的问题

- 原因：在使用 npm 下包的时候，默认从国外的 https://registry.npmjs.org/ 服务器进行下载，此时，网络数据的传输需要经过漫长的海底光缆，因此下包速度会很慢。
- 解决方案一：切换 npm 的下包镜像源，淘宝镜像源：[https://registry.npmmirror.com/](https://registry.npmmirror.com/)

```shell
# 查看当前下包的镜像源,下包的镜像源，指的就是下包的服务器地址。
npm config get registry
# 切换为淘宝的镜像源
npm config set registry=https://registry.npmmirror.com/
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/f0749bf945564801bd94d2ecc13c815c.png#pic_center)

- 解决方案二：利用 nrm 工具：为了更方便的切换下包的镜像源，我们可以安装 nrm 这个小工具，利用 nrm 提供的终端命令，可以快速查看和切换下包的镜像源。

```shell
# 通过npm，将nrm安装为全局可用的工具
npm i nrm -g
# 查看所有可用镜像源
nrm ls
# 将镜像源切换为taobao
nrm use taobao
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/7718822fcd1d4de390db5c57ae269237.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/130e094f38594cf4bff445a86c38e879.png#pic_center)

## 4.5 包的分类

使用 npm 包管理工具下载的包，共分为两大类，分别是：项目包和全局包

### 4.5.1 项目包

- 那些被安装到项目的 node_modules 目录中的包，都是项目包。
- 项目包又分为两类，分别是：
  ① 开发依赖包（被记录到 devDependencies 节点中的包，只在开发期间会用到）
  ② 核心依赖包（被记录到 dependencies 节点中的包，在开发期间和项目上线之后都会用到）

```shell
npm i 包名 -D # 开发依赖包(被记录到 devDependencies 节点下)
npm i 包名 # 核心依赖包(被记录到 dependencies 节点下)
```

### 4.5.2 全局包

- 在执行 `npm install` 命令时，如果提供了 `-g` 参数，则会把包安装为全局包。
- 全局包会被默认安装到 `C:\Users\用户目录\AppData\Roaming\npm\node_modules` 目录下。

```shell
npm i 包名 -g  # 全局安装指定包
npm uninstall 包名 -g # 卸载全局包
```

注意：
① 只有工具性质的包，才有全局安装的必要性。因为它们提供了好用的终端命令。
② 判断某个包是否需要全局安装后才能使用，可以参考官方提供的使用说明即可。

> i5ting_toc 包，可以把 md 文档转为 html 页面的小工具，可用于自己整理的笔记
> `npm i i5ting_toc -g` 下载，`i5ting_toc -f 要转换的·md文件路径 -o` 即可

## 4.6 规范的包结构

- 一个规范的包，它的组成结构，必须符合以下 3 点要求：
  ① 包必须以单独的目录而存在
  ② 包的顶级目录下要必须包含 package.json 这个包管理配置文件
  ③ package.json 中必须包含 name，version，main 这三个属性，分别代表包的名字、版本号、包的入口。
- 注意：以上 3 点要求是一个规范的包结构必须遵守的格式

# 5. fs 文件系统模块

## 5.1 文件系统模块简介

- fs 模块是 Node.js 官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求。
- 例如：
  ① `fs.readFile()` 方法，用来读取指定文件中的内容
  ② `fs.writeFile()` 方法，用来向指定的文件中写入内容

如果要在 JavaScript 代码中，使用 fs 模块来操作文件，则需要使用如下的方式先导入它：

```javascript
const fs = require("fs");
```

## 5.2 读取指定文件中的内容

使用 `fs.readFile()` 方法，可以读取指定文件中的内容，语法格式如下：

```javascript
fs.readFile(path[,options],callback);
```

参数解读：
① path：必选参数，字符串，表示文件的路径。
② options：可选参数，表示以什么编码格式来读取文件。
③ callback：必选参数，文件读取完成后，通过回调函数拿到读取的结果。

示例：

```javascript
// 1. 导入 fs 模块，来操作文件
const fs = require("fs");
// 2. 调用 fs.readFile() 方法读取文件
//    参数1：读取文件的存放路径
//    参数2：读取文件时候采用的编码格式，一般默认指定 utf8
//    参数3：回调函数，拿到读取失败和成功的结果  err  dataStr
fs.readFile("./files/11.txt", "utf8", (err, dataStr) => {
  // 2.1 打印失败的结果
  // 如果读取成功，则 err 的值为 null
  // 如果读取失败，则 err 的值为 错误对象，dataStr 的值为 undefined
  if (err) {
    return console.log("读取文件失败！" + err.message);
  }
  // 2.2 打印成功的结果
  console.log(dataStr);
});
```

## 5.3 向指定的文件中写入内容

使用 `fs.writeFile()` 方法，可以向指定的文件中写入内容，语法格式如下：

```javascript
fs.writeFile(path,data[,options],callback);
```

参数解读：
① path：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径。
② data：必选参数，表示要写入的内容。
③ options：可选参数，表示以什么格式写入文件内容，默认值是 utf8。
④ callback：必选参数，文件写入完成后的回调函数。

注意：
① fs.writeFile() 方法只能用来创建文件，不能用来创建路径
② 重复调用 fs.writeFile() 写入同一个文件，新写入的内容会覆盖之前的旧内容

示例：

```javascript
const fs = require("fs");
//    参数1：表示文件的存放路径
//    参数2：表示要写入的内容
//    参数3：回调函数
fs.writeFile("./files/3.txt", "ok123", (err) => {
  // 如果文件写入成功，则 err 的值等于 null
  // 如果文件写入失败，则 err 的值等于一个 错误对象
  if (err) {
    return console.log("文件写入失败！" + err.message);
  }
  console.log("文件写入成功！");
});
```

## 5.4 路径动态拼接的问题

- 在使用 fs 模块操作文件时，如果提供的操作路径是以 `./` 或 `../` 开头的相对路径时，很容易出现路径动态拼接错误的问题。
- 原因：代码在运行的时候，会以执行 node 命令时所处的目录，动态拼接出被操作文件的完整路径。
- 解决方案：在使用 fs 模块操作文件时，直接提供完整的路径(但此方法移植性非常差、不利于维护，故推荐用下文：path 路径模块)，不要提供 `./` 或 `../` 开头的相对路径，从而防止路径动态拼接的问题。

![在这里插入图片描述](https://img-blog.csdnimg.cn/8e808f7d20464b69850368648706ba66.png#pic_center)

# 6. path 路径模块

## 6.1 path 路径模块简介

path 模块是 Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。例如：
① path.join() 方法，用来将多个路径片段拼接成一个完整的路径字符串
② path.basename() 方法，用来从路径字符串中，将文件名解析出来

如果要在 JavaScript 代码中，使用 fs 模块来操作文件，则需要使用如下的方式先导入它：

```javascript
const path = require("path");
```

## 6.2 路径拼接

使用 `path.join()` 方法，可以把多个路径片段拼接为完整的路径字符串，语法格式如下：

```javascript
path.join([...paths]);
```

参数解读：
① ...paths (string) 路径片段的序列
② 返回值: string

示例：

```javascript
const path = require("path");
const fs = require("fs");
// 注意：  ../ 会抵消前面一层路径
// const pathStr = path.join('/a', '/b/c', '../../', './d', 'e')
// console.log(pathStr)  // \a\b\d\e
// fs.readFile(__dirname + '/files/1.txt')
fs.readFile(path.join(__dirname, "./files/1.txt"), "utf8", (err, dataStr) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(dataStr);
});
```

- 注意：今后凡是涉及到路径拼接的操作，都要使用 path.join() 方法进行处理。不要直接使用 + 进行字符串的拼接。
- `__dirname` 总是指向被执行 js 文件的绝对路径

## 6.3 获取路径中的文件名

使用 `path.basename()` 方法，可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名，语法格式如下：

```javascript
paht.basename();
```

参数解读：
① path (string)：必选参数，表示一个路径的字符串
② ext (string) ：可选参数，表示文件扩展名
③ 返回:(string) ：表示路径中的最后一部分

示例：

```javascript
const path = require("path");
// 定义文件的存放路径
const fpath = "/a/b/c/index.html";
const fullName = path.basename(fpath);
console.log(fullName); //index.html
const nameWithoutExt = path.basename(fpath, ".html");
console.log(nameWithoutExt); //index
```

## 6.4 获取路径中的文件扩展名

使用 `path.extname()` 方法，可以获取路径中的扩展名部分，语法格式如下：

```javascript
path.extname(path);
```

参数解读：
① path (string)：必选参数，表示一个路径的字符串
② 返回(string)：返回得到的扩展名字符串

示例：

```javascript
const path = require("path");
const fpath = "/a/b/c/index.html";
const fext = path.extname(fpath);
console.log(fext); // .html
```

# 7. http 模块

## 7.1 知识铺垫

### 7.1.1 ip 地址

- IP 地址就是互联网上每台计算机的唯一地址，因此 IP 地址具有唯一性。只有在知道对方 IP 地址的前提下，才能与对应的电脑之间进行数据通信。
- IP 地址的格式：通常用“点分十进制”表示成（a.b.c.d）的形式，其中，a,b,c,d 都是 0~255 之间的十进制整数。例如：用点分十进表示的 IP 地址（192.168.1.1）
- 注意：
  ① 互联网中每台 Web 服务器，都有自己的 IP 地址，可以在 Windows 的终端中运行 `ping www.baidu.com` 命令，即可查看到百度服务器的 IP 地址。
  ② 在开发期间，自己的电脑既是一台服务器，也是一个客户端，为了方便测试，可以在自己的浏览器中输入 `127.0.0.1` 或`localhost`这个 IP 地址，就能把自己的电脑当做一台服务器进行访问了。

### 7.1.2 域名和域名服务器

- IP 地址和域名是一一对应的关系，这份对应关系存放在一种叫做域名服务器(DNS，Domain name server)的电脑中。使用者只需通过好记的域名访问对应的服务器即可，对应的转换工作由域名服务器实现。因此，域名服务器就是提供 IP 地址和域名之间的转换服务的服务器。
- 注意：
  ① 单纯使用 IP 地址，互联网中的电脑也能够正常工作。但是有了域名的加持，能让互联网的世界变得更加方便。
  ② 在开发测试期间， `127.0.0.1` 对应的域名是 `localhost`，它们都代表我们自己的这台电脑，在使用效果上没有任何区别。

### 7.1.3 端口号

- 在一台电脑中，可以运行成百上千个 web 服务。每个 web 服务都对应一个唯一的端口号。客户端发送过来的网络请求，通过端口号，可以被准确地交给对应的 web 服务进行处理。
- 注意：
  ① 每个端口号不能同时被多个 web 服务占用。
  ② 在实际应用中，URL 中的 80 端口可以被省略。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/b368e1af43c6416886a164541fa538a0.png#pic_center)

## 7.2 http 模块简介

- http 模块是 Node.js 官方提供的、用来创建 web 服务器的模块。通过 http 模块提供的 `http.createServer()` 方法，就能方便的把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务。
- 如果要希望使用 http 模块创建 Web 服务器，则需要先导入它：

```javascript
const http = require("http");
```

http 模块提供的作用

- 服务器和普通电脑的区别在于，服务器上安装了 web 服务器软件，例如：IIS、Apache 等。通过安装这些服务器软件，就能把一台普通的电脑变成一台 web 服务器。
- 在 Node.js 中，我们不需要使用 IIS、Apache 等这些第三方 web 服务器软件。因为我们可以基于 Node.js 提供的 http 模块，通过几行简单的代码，就能轻松的手写一个服务器软件，从而对外提供 web 服务。

## 7.3 创建最基本的 web 服务器

### 7.3.1 创建 web 服务器的基本步骤

① 导入 http 模块
② 创建 web 服务器实例
③ 为服务器实例绑定 request 事件，监听客户端的请求
④ 启动服务器

```javascript
const http = require("http");
const server = http.createServer();
// 通过服务器实例的on()方法，绑定 request 事件，监听客户端的请求
server.on("request", (req, res) => {
  // 只要客户端发起请求，就会触发request事件，从而调用该事件处理函数
  console.log("Someone visit our web server.");
});
// 4. 在8080端口,启动服务器
server.listen(8080, () => {
  console.log("server running at http://127.0.0.1:8080");
});
```

### 7.3.2 (req 请求&res 响应)对象

- 只要服务器接收到了客户端的请求，就会调用通过 server.on() 为服务器绑定的 request 事件处理函数
- 如果想在事件处理函数中，访问与**客户端**相关的数据或属性以及**服务器**相关的数据或属性，可以使用如下的方式：

```javascript
const http = require("http");
const server = http.createServer();
// req 是请求对象，包含了与客户端相关的数据和属性
server.on("request", (req, res) => {
  // req.url 是客户端请求的 URL 地址
  const url = req.url;
  // req.method 是客户端请求的 method 类型
  const method = req.method;
  const str = `Your request url is ${url}, and request method is ${method}`;
  console.log(str);
  // 调用 res.end() 方法，向客户端响应一些内容
  res.end(str);
});
server.listen(80, () => {
  console.log("server running at http://127.0.0.1");
});
```

- `req.url` 是客户端请求的 URL 地址
- `req.method` 是客户端请求的 method 类型
- `res.end()` 方法，向客户端响应一些内容

### 7.3.3 解决中文乱码问题

当调用 `res.end()` 方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式：

```javascript
res.setHeader("Content-Type", "text/html; charset=utf-8");
```

示例：

```javascript
const http = require("http");
const server = http.createServer();
server.on("request", (req, res) => {
  const str = `您请求的 URL 地址是 ${req.url}，请求的 method 类型为 ${req.method}`;
  // 调用 res.setHeader() 方法，设置 Content-Type 响应头，解决中文乱码的问题
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // res.end() 将内容响应给客户端
  res.end(str);
});
server.listen(80, () => {
  console.log("server running at http://127.0.0.1");
});
```

## 7.4 根据不同的 url 响应不同的 html 内容

- 核心实现步骤
  ① 获取请求的 url 地址
  ② 设置默认的响应内容为 404 Not found
  ③ 判断用户请求的是否为 / 或 /index.html 首页
  ④ 判断用户请求的是否为 /about.html 关于页面
  ⑤ 设置 Content-Type 响应头，防止中文乱码
  ⑥ 使用 res.end() 把内容响应给客户端

```javascript
const http = require("http");
const server = http.createServer();
server.on("request", (req, res) => {
  // 1. 获取请求的 url 地址
  const url = req.url;
  // 2. 设置默认的响应内容为 404 Not found
  let content = "<h1>404 Not found!</h1>";
  // 3. 判断用户请求的是否为 / 或 /index.html 首页
  // 4. 判断用户请求的是否为 /about.html 关于页面
  if (url === "/" || url === "/index.html") {
    content = "<h1>首页</h1>";
  } else if (url === "/about.html") {
    content = "<h1>关于页面</h1>";
  }
  // 5. 设置 Content-Type 响应头，防止中文乱码
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // 6. 使用 res.end() 把内容响应给客户端
  res.end(content);
});
server.listen(80, () => {
  console.log("server running at http://127.0.0.1");
});
```

时钟案例：

- 步骤
  ① 导入需要的模块
  ② 创建基本的 web 服务器
  ③ 将资源的请求 url 地址映射为文件的存放路径
  ④ 读取文件内容并响应给客户端
  ⑤ 优化资源的请求路径
- 要点：如何把文件的实际存放路径，作为每个资源的请求 url 地址。如下图

![在这里插入图片描述](https://img-blog.csdnimg.cn/bc2d69543cc5458095342ab6fe12b075.png#pic_center)

- 代码：

```javascript
// 1.1 导入 http 模块
const http = require("http");
// 1.2 导入 fs 模块
const fs = require("fs");
// 1.3 导入 path 模块
const path = require("path");
// 2.1 创建 web 服务器
const server = http.createServer();
// 2.2 监听 web 服务器的 request 事件
server.on("request", (req, res) => {
  // 3.1 获取到客户端请求的 URL 地址
  //     /clock/index.html
  //     /clock/index.css
  //     /clock/index.js
  const url = req.url;
  // 3.2 把请求的 URL 地址映射为具体文件的存放路径
  let fpath = "";
  if (url === "/") {
    fpath = path.join(__dirname, "./clock/index.html");
  } else {
    //     /index.html
    //     /index.css
    //     /index.js
    fpath = path.join(__dirname, "/clock", url);
  }
  // 4.1 根据“映射”过来的文件路径读取文件的内容
  fs.readFile(fpath, "utf8", (err, dataStr) => {
    // 4.2 读取失败，向客户端响应固定的“错误消息”
    if (err) return res.end("404 Not found.");
    // 4.3 读取成功，将读取成功的内容，响应给客户端
    res.end(dataStr);
  });
});
// 2.3 启动服务器
server.listen(80, () => {
  console.log("server running at http://127.0.0.1");
});
```

# 8. MySQL 模块

## 8.1 在项目中操作数据库的步骤

① 安装操作 MySQL 数据库的第三方模块（mysql）
② 通过 mysql 模块连接到 MySQL 数据库
③ 通过 mysql 模块执行 SQL 语句
![在这里插入图片描述](https://img-blog.csdnimg.cn/017784cf43554845927b2949424a1bfc.png#pic_center)

## 8.2 安装与配置 mysql 模块

1、安装 mysql 模块

- mysql 模块是托管于 npm 上的第三方模块。它提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力。
- 想要在项目中使用它，需要先运行如下命令，将 mysql 安装为项目的依赖包：

```shell
npm i mysql
```

2、配置 mysql 模块

在使用 mysql 模块操作 MySQL 数据库之前，必须先对 mysql 模块进行必要的配置，主要的配置步骤如下：

```javascript
// 1. 导入 mysql 模块
const mysql = require("mysql");
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
  host: "127.0.0.1", // 数据库的 IP 地址
  user: "root", // 登录数据库的账号
  password: "admin123", // 登录数据库的密码
  database: "my_db_01", // 指定要操作哪个数据库
});
```

3、测试 mysql 模块能否正常工作

调用 db.query() 函数，指定要执行的 SQL 语句，通过回调函数拿到执行的结果

```javascript
// 测试 mysql 模块能否正常工作
db.query("select 1", (err, results) => {
  // mysql 模块工作期间报错了
  if (err) return console.log(err.message);
  // 能够成功的执行 SQL 语句
  console.log(results);
});
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/8780ebc785d843f69b6b04e9bc890bb2.png#pic_center)

## 8.3 操作 MySQL 数据库

### 8.3.1 查询数据

查询 users 表中所有的数据：

```javascript
//查询 users 表中所有的数据
const sqlStr = "select * from users";
db.query(sqlStr, (err, results) => {
  // 查询数据失败
  if (err) return console.log(err.message);
  // 查询数据成功
  // 注意：如果执行的是 select 查询语句，则执行的结果results是数组
  console.log(results);
});
```

### 8.3.2 插入数据

向 users 表中，新增一条数据

```javascript
// 向 users 表中，新增一条数据，其中 username 的值为 Spider-Man，password 的值为 pcc123
const user = { username: "Spider-Man", password: "pcc123" };
// 定义待执行的 SQL 语句 ， ? 表示占位符
const sqlStr = "insert into users (username, password) values (?, ?)";
// 执行 SQL 语句 , 依次为? 占位符指定数组中的值
db.query(sqlStr, [user.username, user.password], (err, results) => {
  // 执行 SQL 语句失败了
  if (err) return console.log(err.message);
  // 成功了
  // 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
  // 可以通过 affectedRows 属性，来判断是否插入数据成功
  if (results.affectedRows === 1) {
    console.log("插入数据成功!");
  }
});
```

### 8.3.3 插入数据的便捷方式

向表中新增数据时，如果数据对象的每个属性和数据表的字段**一一对应**，则可以通过如下方式快速插入数据：

```javascript
// 演示插入数据的便捷方式
const user = { username: "Spider-Man2", password: "pcc4321" };
const sqlStr = "insert into users set ?"; // set ?
//  直接把数据对象当做占位符
db.query(sqlStr, user, (err, results) => {
  if (err) return console.log(err.message);
  if (results.affectedRows === 1) {
    console.log("插入数据成功");
  }
});
```

### 8.3.4 更新数据

```javascript
// 演示如何更新用户的信息
const user = { id: 6, username: "aaa", password: "000" };
// 定义 SQL 语句
const sqlStr = "update users set username=?, password=? where id=?";
// 执行 SQL 语句 ，依次为占位符指定数组中的值
db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
  if (err) return console.log(err.message);
  // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
  if (results.affectedRows === 1) {
    console.log("更新成功");
  }
});
```

### 8.3.5 更新数据的便捷方式

更新表数据时，如果数据对象的每个属性和数据表的字段**一一对应**，则可以通过如下方式快速更新表数据：

```javascript
// 演示更新数据的便捷方式
const user = { id: 6, username: "aaaa", password: "0000" };
// 定义 SQL 语句
const sqlStr = "update users set ? where id=?";
// 执行 SQL 语句
db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message);
  if (results.affectedRows === 1) {
    console.log("更新数据成功");
  }
});
```

### 8.3.6 删除数据

在删除数据时，推荐根据类似 id 这样的**唯一标识**，来删除对应的数据。示例如下：

```javascript
// 删除 id 为 5 的用户
const sqlStr = "delete from users where id=?";
db.query(sqlStr, 5, (err, results) => {
  // 只有1个?，这里也可以省略[]
  if (err) return console.log(err.message);
  // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
  if (results.affectedRows === 1) {
    console.log("删除数据成功");
  }
});
```

### 8.3.7 标记删除

- 使用 DELETE 语句，会把真正的把数据从表中删除掉。为了保险起见，推荐使用**标记删除**的形式，来**模拟删除的动作**。
- 所谓的标记删除，就是在表中设置类似于 status 这样的表示状态的字段，来标记当前这条数据是否被删除。
- 当用户执行了删除的动作时，我们并没有执行 DELETE 语句把数据删除掉，而是**执行了 UPDATE** 语句，将这条数据对应的 status 字段标记为删除即可。

```javascript
const sqlStr = "update users set status=? where id=?";
db.query(sqlStr, [0, 6], (err, results) => {
  if (err) return console.log(err.message);
  if (results.affectedRows === 1) {
    console.log("标记删除成功");
  }
});
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/9a8eb36156f3489b8fb9d45185ed61cd.png#pic_center)
