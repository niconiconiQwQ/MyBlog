---
title: Express 框架
date: 2022/05/24 10:48
categories: [Express]
stick: false
description: Express 框架
keyword: Express
---

# Express 框架

# 1. Express 简介

- 官方概念：Express 是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。
- 通俗的理解：Express 的作用和 Node.js 内置的 http 模块类似，是专门用来创建 Web 服务器的。
- Express 的本质：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。
  Express 的中文官网： [http://www.expressjs.com.cn/](http://www.expressjs.com.cn/)
- 对于前端程序员来说，最常见的两种服务器，分别是：
  ① **Web 网站服务器**：专门对外提供 Web 网页资源的服务器。
  ② **API 接口服务器**：专门对外提供 API 接口的服务器。
- 使用 Express，我们可以方便、快速的创建 Web 网站的服务器或 API 接口的服务器。

# 2. Express 的基本使用

## 2.1 安装

在项目所处的目录中，运行如下的终端命令，即可将 express 安装到项目中使用：

```shell
npm i express
```

## 2.2 创建基本的 Web 服务器

```javascript
// 1. 导入 express
const express = require("express");
// 2. 创建 web 服务器
const app = express();
// 3. 调用 app.listen(端口号,启动成功的回调函数)，启动服务器
app.listen(80, () => {
  console.log("express server running at http://127.0.0.1");
});
```

## 2.3 监听 GET/POST 请求

```javascript
app.get("请求URL", (req, res) => {
  /*处理函数*/
});
app.post("请求URL", (req, res) => {
  /*处理函数*/
});
```

- 参数解释：
  参数 1：客户端请求的 URL 地址
  参数 2：请求对应的处理函数
  req：请求对象(包含了与请求相关的属性和方法)
  res：响应对象(包含了与响应相关的属性和方法)

## 2.4 把内容响应给客户端

通过 `res.send()` 方法，可以把处理好的内容，发送给客户端：

```javascript
app.post("/user", (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个 文本字符串
  res.send("请求成功");
});
app.get("/", (req, res) => {
  //向客户端响应JSON对象
  res.send({ name: "zs", age: 20 });
});
```

## 2.5 获取 URL 中携带的查询参数

通过 `req.query` 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数：

```javascript
app.get("/", (req, res) => {
  // 客户端使用 ?name=zs&age=20 这种查询字符串的形式，发送到服务器的参数，
  // 可以通过 req.query 访问到 例如 req.query.name
  // 注意：默认情况下，req.query 是一个空对象
  console.log(req.query);
  res.send(req.query);
});
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/41f93370c0774855985a05128ed60417.png#pic_center)

## 2.6 获取 URL 中的动态参数

通过 `req.params` 对象，可以访问到 URL 中，通过 `:` 匹配到的动态参数：

```javascript
// 在url地址中，可以通过 :参数名 的形式，匹配到动态参数值
app.get("/user/:ids/:username", (req, res) => {
  // req.params 是动态匹配到的 URL 参数，默认也是一个空对象
  console.log(req.params);
  res.send(req.params);
});
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/97c20957c0054966b3ed8f791f2e6d20.png#pic_center)

## 2.7 综合示例

```javascript
// 1. 导入 express
const express = require("express");
// 2. 创建 web 服务器
const app = express();

// 4. 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
app.get("/user", (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
  res.send({ name: "zs", age: 20, gender: "男" });
});
app.post("/user", (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个 文本字符串
  res.send("请求成功");
});
app.get("/", (req, res) => {
  // 通过 req.query 可以获取到客户端发送过来的 查询参数
  // 注意：默认情况下，req.query 是一个空对象
  console.log(req.query);
  res.send(req.query);
});
// 注意：这里的 :id 是一个动态的参数
app.get("/user/:ids/:username", (req, res) => {
  // req.params 是动态匹配到的 URL 参数，默认也是一个空对象
  console.log(req.params);
  res.send(req.params);
});
// 3. 启动 web 服务器
app.listen(80, () => {
  console.log("express server running at http://127.0.0.1");
});
```

# 3. 托管静态资源

## 3.1 express.static()

express 提供 `express.static()`，通过它，可以非常方便地创建一个静态资源服务器， 例如，通过如下代码就可以将 `public` 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：

```javascript
app.use(express.static("public"));
// 例如：public目录下包含,image,css,js目录，要通过下面(省去public的)地址去访问
// http://localhost:3000/images/bg.jpg
// http://localhost:3000/css/style.css
// http://localhost:3000/js/login.js
```

注意：Express 在**指定**的静态目录中查找文件，并对外提供资源的访问路径。因此，**存放静态文件的目录名不会出现在 URL 中**。

## 3.2 托管多个静态资源目录

- 如果要托管多个静态资源目录，请多次调用 express.static() 函数：
- 访问静态资源文件时，express.static() 函数会根据目录的**添加顺序**查找所需的文件。

```javascript
app.use(express.static("public1"));
app.use(express.static("public2"));
// public1  和 public2 目录中存在同名文件,则前面的public1的那个会被访问
```

## 3.3 挂载路径前缀

如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式：

```javascript
app.use("/public", express.static("public"));
//现在，就可以通过带有 /public 前缀地址来访问 public 目录中的文件了：
//http://localhost:3000/public/images/kitten.jpg
//http://localhost:3000/public/css/style.css
//http://localhost:3000/public/js/app.js
```

# 4. nodemon 工具

- nodemon 工具，它能够监听项目文的变动，当代码被修改后，nodemon 会自动帮我们重启项目，极大方便了开发和调试。不需要改代码后手动(Ctrl + c)重启服务器
- 地址：[https://www.npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon)
- 下载:在终端中，运行如下命令，即可将 nodemon 安装为全局可用的工具：

```shell
npm i nodemon -g
```

- 使用：

```shell
# nodemon + 文件路径
# 原先
node app.js
# 现在
nodemon app.js
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/579b97b069724018b37a6176244fcb14.png#pic_center)

# 5. Express 路由

## 5.1 路由的概念

- 广义上来讲，路由就是映射关系。
- 在 Express 中，路由指的是客**户端的请求**与**服务器处理函数**之间的**映射**关系。
- Express 中的路由分 3 部分组成，分别是**请求的类型**、请求的 URL **地址**、**处理函数**，格式如下：

```javascript
app.METHOD(PATH, FUNCTION);
// 例如：
app.get("/", (req, res) => {});
app.post("/", (req, res) => {});
```

## 5.2 路由的匹配过程

- 路由的匹配过程：每当一个请求到达服务器之后，需要先经过**路由的匹配**，只有匹配成功之后，才会调用对应的处理函数。
- 在匹配时，会按照路由的顺序进行匹配，如果**请求类型**和**请求的 URL** 同时匹配成功，则 Express 会将这次请求，转交给对应的 function 函数进行处理。

![在这里插入图片描述](https://img-blog.csdnimg.cn/4cb621ca38854dc39ab1ddd7e60067d8.png#pic_center)

- 路由匹配的注意点：
  ① 按照定义的先后顺序进行匹配
  ② 请求类型和请求的 URL 同时匹配成功，才会调用对应的处理函数

## 5.3 路由的使用

在 Express 中使用路由最简单的方式，就是把路由挂载到 app 上，示例代码如下：路由很多的情况推荐将路由模块化

```javascript
const express = require("express");
const app = express();
// 挂载路由
app.get("/", (req, res) => {
  res.send("hello world.");
});
app.post("/", (req, res) => {
  res.send("Post Request.");
});
app.listen(80, () => {
  console.log("http://127.0.0.1");
});
```

## 5.4 模块化路由

- 为了方便对路由进行模块化的管理，Express **不建议**将路由直接挂载到 app 上，而是推荐**将路由抽离为单独的模块**。
- 将路由抽离为单独模块的步骤如下
  ① 创建路由模块对应的 .js 文件
  ② 调用 express.Router() 函数创建路由对象
  ③ 向路由对象上挂载具体的路由
  ④ 使用 module.exports 向外共享路由对象
  ⑤ 使用 app.use() 函数注册路由模块

### 5.4.1 创建路由模块

```javascript
// 这是路由模块 03.router.js
// 1. 导入 express
const express = require("express");
// 2. 创建路由对象
const router = express.Router();
// 3. 挂载具体的路由
router.get("/user/list", (req, res) => {
  res.send("Get user list.");
});
router.post("/user/add", (req, res) => {
  res.send("Add new user.");
});
// 4. 向外导出路由对象
module.exports = router;
```

### 5.4.2 注册路由模块

- 使用`app.use()`注册路由模块，其中可以为路由**模块添加前缀**(类似于托管静态资源时，为静态资源统一挂载访问前缀一样)

```javascript
// 这是服务器端
// 1. 导入路由模块
const router = require("./03.router");
// 2. 使用app.use()注册路由模块
// app.use(router);  下面这个是为路由模块添加前缀 即添加了统一访问的前缀
app.use("/api", router);
// 注意： app.use() 函数的作用，就是来注册全局中间件
app.listen(80, () => {
  console.log("http://127.0.0.1");
});
```

# 6. Express 中间件

## 6.1 中间件概念

1、什么是中间件

- 中间件（Middleware ），特指业务流程的**中间处理环节**。

2、Express 中间件的**调用流程**：

- 当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行**预处理**。

![在这里插入图片描述](https://img-blog.csdnimg.cn/f4c973e1073c4fc0ae7655c2f9a0a392.png#pic_center)

3、Express 中间件的**格式**

- Express 的中间件，本质上就是一个 function 处理函数，Express 中间件的格式如下：
- 注意：中间件函数的形参列表中，必须包含 **next** 参数。而路由处理函数中只包含 req 和 res。

![在这里插入图片描述](https://img-blog.csdnimg.cn/dacfc1152eb441589c8603487b18fc2b.png#pic_center)

4、next 函数的作用

- next 函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。

![在这里插入图片描述](https://img-blog.csdnimg.cn/3a011903ceea42f6a1498a03b1c8372c.png#pic_center)

## 6.2 中间件的使用

### 6.2.1 定义中间件函数

```javascript
// 定义一个最简单的中间件函数
const mw = (req, res, next) => {
  // 业务处理
  // 在当前中间件业务处理完毕后，必须调用next()
  //把流转关系，转交给下一个中间件或路由
  next();
};
```

### 6.2.2 全局生效的中间件

- 客户端发起的**任何请求**，到达服务器之后，**都会触发**的中间件，叫做全局生效的中间件。
- 通过调用 app.use(中间件函数)，即可定义一个全局生效的中间件，示例代码如下：

```javascript
const mw = (req, res, next) => {
  //处理
  next();
};
// 全局生效的中间件
app.use(mw);
// 也可以直接
// app.use((req, res, next) => {
//   next()
// })
```

### 6.2.3 定义多个全局中间件

可以使用 app.use() 连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的**先后顺序依次进行调用**，示例代码如下：

```javascript
// 定义第一个全局中间件
app.use((req, res, next) => {
  console.log("调用了第1个全局中间件");
  next();
});
// 定义第二个全局中间件
app.use((req, res, next) => {
  console.log("调用了第2个全局中间件");
  next();
});
// 定义一个路由
app.get("/user", (req, res) => {
  res.send("User page."); //被请求后，就会调用先1,2中间件
});
```

### 6.2.4 局部生效的中间件

不使用 app.use() 定义的中间件，叫做局部生效的中间件，示例代码如下

```javascript
// 1. 定义中间件函数
const mw = (req, res, next) => {
  console.log("调用了局部生效的中间件");
  next();
};
// 2. mw中间件只在带中间件参数的路由中生效
app.get("/", mw, (req, res) => {
  res.send("Home page.");
});
// 不会影响下面这个路由
app.get("/user", (req, res) => {
  res.send("Home page.");
});
```

### 6.2.5 定义多个局部中间件

可以在路由中，通过如下两种等价的方式，使用多个局部中间件：

```javascript
const mw1 = (req, res, next) => {
  next();
};
const mw2 = (req, res, next) => {
  next();
};
app.get("/", mw1, mw2, (req, res) => {
  res.send("Home page.");
});
app.get("/", [mw1, mw2], (req, res) => {
  res.send("Home page.");
});
```

### 6.2.6 中间件参数共享

多个中间件之间，**共享**同一份 **req 和 res**。基于这样的特性，我们可以在上游的中间件中，统一为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

![在这里插入图片描述](https://img-blog.csdnimg.cn/94479c5f28694f55bd097bf7d4b4394f.png#pic_center)

```javascript
const express = require("express");
const app = express();
app.use((req, res, next) => {
  // 获取到请求到达服务器的时间
  const time = Date.now();
  // 为 req 对象，挂载自定义属性，从而把时间共享给后面的所有路由
  req.startTime = time;
  next();
});
app.get("/", (req, res) => {
  res.send("Home page." + req.startTime);
});
app.get("/user", (req, res) => {
  res.send("User page." + req.startTime);
});
app.listen(80, () => {
  console.log("http://127.0.0.1");
});
```

### 6.2.7 使用注意事项

① 一定要在**路由之前**注册中间件
② 客户端发送过来的请求，可以**连续调用**多个中间件进行处理
③ 执行完中间件的业务代码之后，不要忘记**调用 next()** 函数
④ 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码
⑤ 连续调用多个中间件时，多个中间件之间，下游 **共享** 上游 req 和 res 对象

## 6.3 中间件的分类

Express 官方把常见的中间件用法，分成了 5 大类，分别是：
① 应用级别的中间件
② 路由级别的中间件
③ 错误级别的中间件
④ Express 内置的中间件
⑤ 第三方的中间件

### 6.3.1 应用级别的中间件

通过 app.use() 或 app.get() 或 app.post() ，绑定到 app 实例上的中间件，叫做应用级别的中间件，代码示例如下：

```javascript
// 应用级别中间件 （全局中间件）
app.use((req, res, next) => {
  next();
});
// 应用级别中间件 （局部中间件）
app.get("/", mw, (req, res) => {
  res.send("hello");
});
```

### 6.3.2 路由级别的中间件

绑定到 express.Router() 实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上，代码示例如下：

```javascript
const app = express();
const router = express.Router();
// 路由级别中间件
Router.use((req, res, next) => {
  //业务
  next();
});
app.use("/", router);
```

### 6.3.3 错误级别的中间件

- 错误级别中间件的作用：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。
- 格式：错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 **(err, req, res, next)**。
- 注意：错误级别的中间件，必须注册在**所有路由之后**！其他的中间件，必须在路由之前进行配置

```javascript
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  // 1.1 人为的制造错误
  throw new Error("服务器内部发生了错误！");
  res.send("Home page.");
});
// 2. 定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
app.use((err, req, res, next) => {
  console.log("发生了错误！" + err.message); //在服务器打印错误信息
  res.send("Error：" + err.message); // 向客户端响应错误信息
});
```

### 6.3.4 Express 内置的中间件

自 Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：

- ① **express.static** 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）
- ② **express.json** 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
- ③ **express.urlencoded** 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

```javascript
const express = require("express");
const app = express();
// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json());
// 通过 express.urlencoded() 这个中间件，来解析 表单中的 url-encoded 格式的数据
app.use(express.urlencoded({ extended: false }));
app.post("/", (req, res) => {
  // 在服务器，可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据
  //可以是JSON 格式的表单数据和 url-encoded 格式的数据
  // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined
  console.log(req.body);
  res.send("ok");
});
// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log("Express server running at http://127.0.0.1");
});
```

- `req.body` 属性，接收客户端发送过来的请求体数据

![在这里插入图片描述](https://img-blog.csdnimg.cn/70b2ba8c8c544199aaa853f2883989f8.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/8526046a3c3b4d128bb9e794c67717dd.png#pic_center)

### 6.3.5 第三方的中间件

- 非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，可以按需下载并配置第三方中间件，从而提高项目的开发效率。
- 例如：在 express@4.16.0 之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据。使用步骤如下：
  ① 运行 npm install body-parser 安装中间件
  ② 使用 require 导入中间件
  ③ 调用 app.use() 注册并使用中间件
- Express 内置的 express.urlencoded 中间件，就是基于 body-parser 这个第三方中间件进一步封装出来的。

## 6.4 自定义中间件

### 6.4.1 需求描述与实现步骤

- 手动模拟一个类似于 express.urlencoded 这样的中间件，来解析 POST 提交到服务器的表单数据。
- 实现步骤：
  ① 定义中间件
  ② 监听 req 的 data 事件
  ③ 监听 req 的 end 事件
  ④ 使用 querystring 模块解析请求体数据
  ⑤ 将解析出来的数据对象挂载为 req.body
  ⑥ 将自定义中间件封装为模块

### 6.4.2 定义中间件

使用 app.use() 来定义全局生效的中间件，代码如下

```javascript
app.use((req, res, next) => {
  //中间件的业务逻辑
});
```

### 6.4.3 监听 req 的 data 事件

- 在中间件中，需要监听 req 对象的 data 事件，来获取客户端发送到服务器的数据。
- 如果数据量比较大，无法一次性发送完毕，则客户端**会把数据切割后，分批发送到服务器**。所以 data 事件可能会触发多次，每一次触发 data 事件时，**获取到数据只是完整数据的一部分**，需要手动对接收到的数据进行拼接。

```javascript
let str = "";
// 监听req对象的data事件(客户端发送过来的新的请求体数据);
req.on("data", (chunk) => {
  //拼接请求体数据，隐式转换为字符串
  str += chunk;
});
```

### 6.4.4 监听 req 的 end 事件

当请求体数据接收完毕之后，会自动触发 req 的 end 事件。因此，我们可以在 req 的 end 事件中，拿到并处理完整的请求体数据。示例代码如下：

```javascript
// 监听req对象的end事件(请求体发完后触发)
req.on("end", () => {
  //业务处理
});
```

### 6.4.5 使用 querystring 模块解析请求体数据

Node.js 内置了一个 `node:querystring` 模块，专门用来处理查询字符串。通过这个模块提供的 parse() 函数，可以轻松把查询字符串，解析成对象的格式。示例代码如下：

```javascript
// 导入 node:querystring模块
const qs = require("node:querystring");
//调用 qs.parse() 方法，把查询字符串解析为对象
const body = qs.parse();
```

### 6.4.6 将解析出来的数据对象挂载为 req.body

**上游**的中间件和下游的中间件及路由之间，**共享**同一份 req 和 res。因此，我们可以将解析出来的数据，挂载为 req 的自定义属性，命名为 `req.body`，供下游使用。示例代码如下：

```javascript
req.on('end',() => {
	const body = qs.parse();
	req.body = body; 将解析出来的请求体对象，挂载为req.body属性
	next(); // 一定要调用next()函数，执行后续业务
})
```

### 6.4.7 将自定义中间件封装为模块

为了优化代码的结构，我们可以把自定义的中间件函数，封装为独立的模块，示例代码如下：

```javascript
// 这边是封装的模块内的代码 模块名 mybp.js;
const qs = require('node:querystring');
cosnt bodyParse = (req,res,next) => {
	//业务...
}
module.exports = bodyParse; // 向外导出解析请求体数据的中间件函数
//=======================================
// 这边是服务器端去引用自定义中间件模块
// 导入自定义模块
const bodyParser = require('mybp');
// 注册自定义中间件模块
app.use(bodyParser);
```

### 6.4.8 完整代码

- 引用自定义中间件

```javascript
// 导入 express 模块
const express = require("express");
// 创建 express 的服务器实例
const app = express();
// 1. 导入自己封装的中间件模块
const mybp = require("./mybp");
// 2. 将自定义的中间件函数，注册为全局可用的中间件
app.use(mybp);
app.post("/user", (req, res) => {
  res.send(req.body);
});
// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log("Express server running at http://127.0.0.1");
});
```

- 自定义中间件模块

```javascript
// 导入 Node.js 内置的 querystring 模块
const qs = require("querystring");
const bodyParser = (req, res, next) => {
  // 定义中间件具体的业务逻辑
  // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
  let str = "";
  // 2. 监听 req 的 data 事件
  req.on("data", (chunk) => {
    str += chunk;
  });
  // 3. 监听 req 的 end 事件
  req.on("end", () => {
    // 在 str 中存放的是完整的请求体数据
    // console.log(str)
    // TODO: 把字符串格式的请求体数据，解析成对象格式
    const body = qs.parse(str);
    req.body = body;
    next();
  });
};
module.exports = bodyParser;
```

# 7. 使用 Express 写接口

## 7.1 创建简单接口

1 创建基本的服务器

```javascript
const express = require("express");
const app = express();
// 写业务逻辑...
app.listen(80, () => {
  console.log("express server running at http://127.0.0.1");
});
```

2 创建 API 路由模块

```javascript
// apiRouter.js 模块
const express = require("expresss");
const apiRouter = express.Router();
// 挂载你的路由...
module.exports = apiRouter;
//================
// app.js 导入并注册路由模块
const apiRouter = require("./apiRouter.js");
app.use("/api", apiRouter);
```

3 编写 GET 接口

```javascript
apiRouter.get("/get", (req, res) => {
  //获取到客户端通过查询字符串，发送到服务器的数据
  const query = req.query;
  //调用res.send()方法，把数据响应给客户端
  res.send({
    status: 0, // 自定义状态
    msg: "GET请求成功", // 状态描述
    data: query, //需要响应给客户端的具体数据
  });
});
```

4 编写 POST 接口

```javascript
apiRouter.post("/post", (req, res) => {
  // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
  const body = req.body;
  //调用res.send()方法，把数据响应给客户端
  res.send({
    status: 0, // 自定义状态
    msg: "GET请求成功", // 状态描述
    data: query, //需要响应给客户端的具体数据
  });
});
```

注意：如果要获取 URL-encoded 格式的请求体数据，必须配置中间件 app.use(express.urlencoded({ extended: false }))

## 7.2 CORS 跨域资源共享

### 7.2.1 接口的跨域问题

- 上面的形式编写的 GET 和 POST 接口，存在一个很严重的问题：**不支持跨域请求**。
- 解决接口跨域问题的方案主要有两种：
  ① CORS（主流的解决方案，推荐使用）
  ② JSONP（有缺陷的解决方案：只支持 GET 请求）

![在这里插入图片描述](https://img-blog.csdnimg.cn/1183f63e54d0445c8a1eefea1e1c73c4.png#pic_center)

### 7.2.2 使用 cors 中间件解决跨域问题

cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题。使用步骤如下：
① 运行 npm install cors 安装中间件
② 使用 const cors = require('cors') 导入中间件
③ 在路由之前调用 app.use(cors()) 配置中间件

```javascript
// 一定要在路由之前，配置 cors 这个中间件，从而解决接口跨域的问题
const cors = require("cors");
app.use(cors());
// 挂一些路由
```

注意：在路由之前，配置 cors 这个中间件，从而解决接口跨域的问题

![在这里插入图片描述](https://img-blog.csdnimg.cn/6b1f2de3175744c8a10e43b32cc58ca2.png#pic_center)

### 7.2.3 什么是 CORS

- CORS （Cross-Origin Resource Sharing，跨域资源共享）由一系列 **HTTP 响应头**组成，这些 HTTP 响应头决定浏览器**是否阻止**前端 JS 代码跨域获取资源。
- 浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头，就可以解除浏览器端的跨域访问限制。

![在这里插入图片描述](https://img-blog.csdnimg.cn/8504003e3da54980b72796070f468442.png#pic_center)

### 7.2.4 CORS 的注意事项

- CORS 主要在**服务器端**进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了 CORS 的接口。
- CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、FireFox3.5+）。

### 7.2.5 响应头部..Origin

响应头部中可以携带一个 **Access-Control-Allow-Origin** 字段，其语法如下:

```javascript
Access-Control-Allow-Origin: <origin> | *
//例如，下面的字段值将只允许来自 https://www.baidu.com 的请求：
res.setHeader('Access-Control-Allow-Origin','https://www.baidu.com');
//指定了通配符 *，表示允许来自任何域的请求，示例代码如下：
res.setHeader('Access-Control-Allow-Origin','*');
```

其中，origin 参数的值指定了允许访问该资源的外域 URL。\*则表示全部

### 7.2.6 响应头部..Headers

- CORS 响应头部 - Access-Control-Allow-Headers，在默认情况下，CORS 仅支持客户端向服务器发送如下的 9 个请求头：Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）
- 如果客户端向服务器发送了**额外的请求头信息**，则需要在**服务器端**，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败！

```javascript
// 允许客户端额外向服务器发送 Content-Type 请求头和 x-Custom-Header 请求头
// 注意：多个请求头之前用 , 号分割
res.setHeader(
  "Access-Control-Allow-Headers",
  "Content-Type",
  "x-Custom-Header"
);
```

### 7.2.7 响应头部..Methods

- 默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。
- 如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 **Access-Control-Alow-Methods**来指明实际请求所允许使用的 HTTP 方法。

```javascript
// 只允许 POST GET DELETE HEAD 请求方法
res.setHeader("Access-Control-Allow-Methods", "POST,GET,DELETE,HEAD");
// 允许所有HTTP请求
res.setHeader("Access-Control-Allow-Methods", "*");
```

### 7.2.8 CORS 请求的分类

- 户端在请求 CORS 接口时，根据**请求方式和请求头**的不同，可以将 CORS 的请求分为两大类，分别是：
  ① 简单请求
  ② 预检请求
- **简单请求**：同时满足以下两大条件的请求，就属于简单请求
  ① 请求方式：GET、POST、HEAD 三者之一
  ② HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain）
- **预检请求**：只要符合以下任何一个条件的请求，都需要进行预检请求：
  ① 请求方式为 GET、POST、HEAD 之外的请求 Method 类型
  ② 请求头中包含自定义头部字段
  ③ 向服务器发送了 application/json 格式的数据
- 在浏览器与服务器正式通信之前，浏览器会先发送 **OPTION** 请求进行预检，以获知服务器是否允许该实际请求，所以这一次的 OPTION 请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。
- 简单请求和预检请求的**区别**
  简单请求的特点：客户端与服务器之间只会发生**一次**请求。
  预检请求的特点：客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求。

# 8. 回顾 JSONP 接口

## 8.1 JSONP 概念和特点

- 概念：浏览器端通过 `<script>` 标签的 src 属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做 JSONP。
- 特点：
  ① JSONP 不属于真正的 Ajax 请求，因为它没有使用 XMLHttpRequest 这个对象。
  ② JSONP 仅支持 GET 请求，不支持 POST、PUT、DELETE 等请求。

## 8.2 创建 JSONP 接口的注意事项

如果项目中已经配置了 **CORS 跨域资源共享**，为了防止冲突，必须在配置 CORS 中间件**之前**声明 JSONP 的接口。否则 JSONP 接口会被处理成开启了 CORS 的接口。示例代码如下：

```javascript
//要测试,创建jsonp接口，如果有（cors）则必须在配置 cors 中间件之前，配置 JSONP 的接口
app.get("/api/jsonp", (req, res) => {});
// 再配置cors中间件，后续配置接口都会处理成cors接口
app.use(cors());
app.ger("api/get", (req, res) => {}); //这是一个开启了cors的接口
```

## 8.3 实现 JSONP 接口的步骤

① 获取客户端发送过来的回调函数的名字
② 得到要通过 JSONP 形式发送给客户端的数据
③ 根据前两步得到的数据，拼接出一个函数调用的字符串
④ 把上一步拼接得到的字符串，响应给客户端的 `<script>` 标签进行解析执行

```javascript
app.get("/api/jsonp", (req, res) => {
  // 1. 获取客户端发送过来的回调函数的名字
  const funcName = req.query.callback;
  // 2. 要通过  JSONP 形式发送给客户端的数据
  const data = { name: "zs", age: 22 };
  // 3. 根据前两步得到的数据，拼接出一个函数调用的字符串
  const scriptStr = `${funcName}(${JSON.stringify(data)})`;
  // 4.  把上一步拼接得到的字符串，响应给客户端的  `<script>` 标签进行解析执行
  res.send(scriptStr);
});
```

## 8.4 在网页中发起 JSONP 请求

- 在网页中使用 jQuery 发起 JSONP 请求，调用 $.ajax() 函数，提供 JSONP 的配置选项，从而发起 JSONP 请求，示例代码如下：

```javascript
$("#btn").on("click", function () {
  // 绑一个按钮
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1/api/jsonp",
    dataType: "jsonp", //一定要加dataType,表示发起jsonp请求
    success: function (res) {
      console.log(res);
    },
  });
});
```
