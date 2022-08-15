---
title: 前后端的身份认证
date: 2022/05/26 08:31
categories: [cookie]
stick: false
description: 前后端的身份认证
keyword: 前后端的身份认证
---

# 前后端的身份认证

# 思维导图

![在这里插入图片描述](https://img-blog.csdnimg.cn/c7938e20240b4f99a216986b4170e4b7.png#pic_center)

# 1. Web 开发模式

- 目前主流的 Web 开发模式有两种，分别是：
  ① 基于**服务端渲染**的传统 Web 开发模式
  ② 基于**前后端分离**的新型 Web 开发模式

## 1.1 服务端渲染的 Web 开发模式

1、服务端渲染的概念：服务器发送给客户端的 HTML 页面，是**在服务器通过字符串的拼接**，**动态生成**的。因此，客户端不需要使用 Ajax 这样的技术额外请求页面的数据。代码示例如下：

```javascript
app.get('/index.html',(req,res) => {
	//1. 要渲染的数据
	cost user = {name:'zs',age: 20}
	//2. 服务端通过字符串的拼接，动态生成HTML内容
	const html = `<h1>姓名：${user.name}，年龄：${user.age}</h1>`;
	// 3. 把生成好的页面内容响应给客户端。所有客户端拿到的
	//是带有真实数据的HTML页面/元素内容
	res.send(html);
})
```

2、服务端渲染的优缺点

- 优点：
  ① 前端耗时少。因为服务器端负责动态生成 HTML 内容，浏览器只需要直接渲染页面即可。尤其是移动端，更省电。
  ② 有利于 SEO。因为服务器端响应的是完整的 HTML 页面内容，所以爬虫更容易爬取获得信息，更有利于 SEO。
- 缺点：
  ① **占用服务器端资源**。即服务器端完成 HTML 页面内容的拼接，如果请求较多，会对服务器造成一定的访问压力。
  ② **不利于前后端分离，开发效率低**。使用服务器端渲染，则无法进行分工合作，尤其对于前端复杂度高的项目，不利于项目高效开发。

## 1.2 前后端分离的 Web 开发模式

1、前后端分离的概念：前后端分离的开发模式，**依赖于 Ajax 技术的广泛应用**。简而言之，前后端分离的 Web 开发模式，就是**后端只负责提供 API 接口，前端使用 Ajax 调用接口**的开发模式。

2、前后端分离的优缺点
优点：
① **开发体验好**。前端专注于 UI 页面的开发，后端专注于 api 的开发，且前端有更多的选择性。
② **用户体验好**。Ajax 技术的广泛应用，极大的提高了用户的体验，可以轻松实现页面的局部刷新。
③ **减轻了服务器端的渲染压力**。因为页面最终是在每个用户的浏览器中生成的。
缺点：
① **不利于 SEO**。因为完整的 HTML 页面需要在客户端动态拼接完成，所以爬虫对无法爬取页面的有效信息。（解决方
案：利用 Vue、React 等前端框架的 SSR （server side render）技术能够很好的解决 SEO 问题！）

## 1.3 如何选择 Web 开发模式

根据业务场景，不能盲目选择使用何种开发模式

- 比如企业级网站，主要功能是展示而没有复杂的交互，并且需要良好的 SEO，则这时我们就需要使用服务器端渲染；
- 类似后台管理项目，交互性比较强，不需要考虑 SEO，那么就可以使用前后端分离的开发模式。

- 另外，具体使用何种开发模式并不是绝对的，为了同时兼顾了首页的渲染速度和前后端分离的开发效率，一些网站采用了**首屏服务器端渲染 + 其他页面前后端分离的开发模式**。

# 2. 身份认证

## 2.1 什么是身份认证

- 身份认证（Authentication）又称“身份验证”、“鉴权”，是指通过一定的手段，完成对用户身份的确认。
- 在 Web 开发中，也涉及到用户身份的认证，例如：各大网站的手机验证码登录、邮箱密码登录、二维码登录等。
- 身份认证的目的，是为了确认当前所声称为某种身份的用户，确实是所声称的用户。例如：
  你去找快递员取快递，你要怎么证明这份快递是你的。
  如何才能保证网站不会错误的将 “马云的存款数额”显示到“我的账户”上。

## 2.2 不同开发模式下的身份认证

- 对于服务端渲染和前后端分离这两种开发模式来说，分别有着不同的身份认证方案
  ① **服务端渲染**推荐使用 **Session 认证机制**
  ② **前后端分离**推荐使用 **JWT 认证机制**

# 3. Session 认证机制

## 3.1 HTTP 协议的无状态性

HTTP 协议的无状态性，指的是客户端的**每次 HTTP 请求都是独立的**，连续多个请求之间没有直接的关系，服务器**不会主动保留每次 HTTP 请求的状态**。
比如：客户请求收营员算账，每一次算账请求都是独立的，平等的，但是 vip1，vip2 等等特权顾客不应该区分结算嘛？
![在这里插入图片描述](https://img-blog.csdnimg.cn/37a70262bda240719501dadbacc0c2f0.png#pic_center)

## 3.2 如何突破 HTTP 无状态的限制

对于超市来说，为了方便收银员在进行结算时给 VIP 用户打折，超市可以为每个 VIP 用户发放会员卡。
![在这里插入图片描述](https://img-blog.csdnimg.cn/5af975472e2a4c3c91100ce22819b66a.png#pic_center)

注意：现实生活中的会员卡**身份认证方式**，在 Web 开发中的专业术语叫做 **Cookie**。

## 3.3 什么是 Cookie

- Cookie 是存储在用户浏览器中的一段**不超过 4 KB 的字符串**。它由一个名称（Name）、一个值（Value）和其它几个用于控制 Cookie **有效期**、**安全性**、**使用范围**的**可选属性**组成。
- 不同域名下的 Cookie 各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的 Cookie 一同发送到服务器。 Cookie 的几大特性：
  ① 自动发送
  ② 域名独立
  ③ 过期时限
  ④ 4KB 限制
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/a5d32eb1aa0b44f89d883cc346767115.png#pic_center)

## 3.4 Cookie 产生过程

- 客户端第一次请求服务器的时候，服务器通过**响应头**的形式，向客户端发送一个身份认证的 Cookie，客户端会自动将 Cookie 保存在浏览器中。
- 随后，当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的 Cookie，通过请求头的形式发送给服务器，服务器即可验明客户端的身份。

![在这里插入图片描述](https://img-blog.csdnimg.cn/24bcdb43c17b459083ca0eee8b11daa4.png#pic_center)

## 3.5 Cookie 不具有安全性

由于 Cookie 是存储在浏览器中的，而且浏览器也提供了读写 Cookie 的 API，因此 Cookie 很容易被伪造，不具有安全性。因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器。
![在这里插入图片描述](https://img-blog.csdnimg.cn/d8b84b1eb2e14564aead10c1da52fb17.png#pic_center)

注意：千万不要使用 Cookie 存储重要且隐私的数据！比如用户的身份信息、密码等。

## 3.6 提高身份认证的安全性

为了防止客户伪造会员卡，收银员在拿到客户出示的会员卡之后，可以在收银机上进行刷卡认证。只有收银机确认存在的会员卡，才能被正常使用。
![在这里插入图片描述](https://img-blog.csdnimg.cn/75c2692f6fe74f14886ab2d6480697c8.png#pic_center)

这种“会员卡 + 刷卡认证”的设计理念，就是 Session 认证机制的精髓。

## 3.7 Session 的工作原理

![在这里插入图片描述](https://img-blog.csdnimg.cn/deb909e249cc4a519ed9b76a5d7153bb.png#pic_center)

# 4. 在 Express 中使用 Session 认证

## 4.1 安装 express-session 中间件

在 Express 项目中，只需要安装 express-session 中间件，即可在项目中使用 Session 认证：

```shell
npm i express-session
```

## 4.2 配置 express-session 中间件

express-session 中间件安装成功后，需要通过 app.use() 来注册 session 中间件，示例代码如下：

```javascript
// 1. 导入 session 中间件
const session = require('express-session');
// 2. 配置 session 中间件
app.use(session{
	secret:'keyboard', //secret 属性的值可以任意设置，复杂的好
	resave:false, //固定写法
	saveUninitiaLized:true //固定写法
})
```

## 4.3 向 session 中存数据

当 express-session 中间件配置成功后，即可通过 req.session 来访问和使用 session 对象，从而存储用户的关键信息：

```javascript
app.post("/api/login", (req, res) => {
  // 判断用户提交的登陆信息是否正确
  if (req.body.username !== "admin" || req.body.password !== "000000") {
    return res.send({ status: 1, msg: "登录失败" });
  }
  // 将登录成功后的用户信息，保存到 Session 中
  // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
  req.session.user = req.body; // 往session对象上挂载user 属性：请求体数据
  req.session.islogin = true; // 挂载user 属性：用户的登录状态
  res.send({ status: 0, msg: "登录成功" });
});
```

## 4.4 从 session 中取数据

可以直接从 req.session 对象上获取之前存储的数据，示例代码如下

```javascript
// 获取用户姓名的接口
app.get("/api/username", (req, res) => {
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: "fail" });
  }
  res.send({
    status: 0,
    msg: "success",
    username: req.session.user.username,
  });
});
```

## 4.5 清空 session

调用 req.session.destroy() 函数，即可清空服务器保存的 session 信息。session.destroy() 只清空当前用户的 session

```javascript
// 退出登录的接口
app.post("/api/logout", (req, res) => {
  // 清空客户端对应的 Session 信息
  req.session.destroy();
  res.send({
    status: 0,
    msg: "退出登录成功",
  });
});
```

# 5. JWT 认证机制

JWT（英文全称：JSON Web Token）是目前最流行的跨域认证解决方案。

## 5.1 了解 Session 认证的局限性

- Session 认证机制**需要配合 Cookie 才能实现**。由于 Cookie 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域 Session 认证。
- 注意：
  ① 当前端请求后端接口不存在跨域问题的时候，推荐使用 Session 身份认证机制。
  ② 当前端需要跨域请求后端接口的时候，推荐使用 JWT 认证机制。

## 5.2 JWT 的工作原理

![在这里插入图片描述](https://img-blog.csdnimg.cn/c9c547df5c4347c6922f9bea1a70baec.png#pic_center)

总结：用户的信息通过 Token 字符串的形式，保存在客户端浏览器中。服务器通过还原 Token 字符串的形式来认证用户的身份。

## 5.3 JWT 的组成部分

WT 通常由三部分组成，分别是 **Header**（头部）、**Payload**（有效荷载）、**Signature**（签名）。
三者之间使用英文的“.”分隔，格式如下：

```javascript
Header.Payload.Signature;
//下面是  JWT 字符串的示例：
eyJhbGciOiCJ9.eyJ0b2tlTU5Y3MjYwMzY2M30.PI7iWTa_E;
```

各部分含义：

- Payload 部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串。
- Header 和 Signature 是安全性相关的部分，只是为了保证 Token 的安全性。

## 5.4 JWT 的使用方式

- 客户端收到服务器返回的 JWT 之后，通常会将它储存在 **localStorage** 或 **sessionStorage** 中。
- 此后，客户端每次与服务器通信，都要带上这个 JWT 的字符串，从而进行身份认证。推荐的做法是把 JWT 放在 **HTTP 请求头**的 **Authorization** 字段中，格式如下：

```javascript
Authorization: Bearer <token>
```

# 6. 在 Express 中使用 JWT

## 6.1 安装 JWT 相关的包

运行如下命令，安装如下两个 JWT 相关的包：

```shell
npm install jsonwebtoken express-jwt
```

- **jsonwebtoken** 用于生成 JWT 字符串
- **express-jwt** 用于将 JWT 字符串解析还原成 JSON 对象

## 6.2 导入 JWT 相关的包

使用 require() 函数，分别导入 JWT 相关的两个包：

```javascript
// 1. 导入用于生成JWT字符串的包
const jwt = require("jsonwebtoken");
// 2. 导入用于将 客户端发送过来的 JWT 字符串解析还原成 JSON 对象的包
// 旧版本的导入方式用 const expressJWT = require('express-jwt');
const { expressjwt: expressJWT } = require("express-jwt");
```

## 6.3 定义 secret 密钥

- 为了保证 **JWT 字符串的安全性**，防止 JWT 字符串在网络传输过程中被别人破解，我们需要专门定义一个用于**加密**和**解密**的 secret 密钥：
  ① 当生成 JWT 字符串的时候，需要使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串
  ② 当把 JWT 字符串解析还原成 JSON 对象的时候，需要使用 secret 密钥进行解密

```javascript
// secret 秘钥的本质：就是一个字符串。
const secretKey = "ajafjkasfj"; // 随便设，复杂的更好
```

## 6.4 在登录成功后生成 JWT 字符串

调用 jsonwebtoken 包提供的 sign() 方法，将用户的信息加密成 JWT 字符串，响应给客户端：

```javascript
// 登录接口
app.post('/api/login',(req,res){
	// 登录失败略...
	// 登录成功之后调用jwt.sign()方法生成JWT 字符串，通过token 属性响应给客户端
	const tokenStr = jwt.sign({ username : userinfo.username }, secretKey, {
    expiresIn: "60s", //token有效期 60s ,可以自己改
  });
  res.send({
    status: 200,
    message: "登录成功！",
    token: tokenStr, // 要发送给客户端的 token 字符串
  });
})
```

- jwt.sign();各参数解释：
  参数 1：用户的信息对象
  参数 2：加密的秘钥
  参数 3：配置对象，可以配置当前 token 的有效期
- 记住：千万不要把密码加密到 token 字符中

## 6.5 将 JWT 字符串还原为 JSON 对象

- 客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的 Authorization 字段，将 Token 字符串发送到服务器进行身份认证。
- 此时，服务器可以通过 express-jwt 这个中间件，自动将客户端发送过来的 Token 解析还原成 JSON 对象：

```javascript
// 使用 app.use() 来注册中间件
// .unless({ path: [/^\/api\//]}) 用来指定哪些接口不需要访问权限
app.use(
  expressJWT({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
);
```

- 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，自动挂载到 **req.auth** 属性上

## 6.6 使用 req.auth 获取用户信息

当 express-jwt 这个中间件配置成功之后，即可在那些有权限的接口中，使用 **req.auth** 对象，来访问从 JWT 字符串中解析出来的用户信息了，示例代码如下：

```javascript
// 这是一个有权限的 API 接口
app.get("/admin/getinfo", function (req, res) {
  // 使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.user);
  res.send({
    status: 200,
    message: "获取用户信息成功！",
    data: req.auth, // 要发送给客户端的用户信息
    //req.auth 是根据传入jwt.sign()的参数解析出用户信息而自动挂载上去的属性
  });
});
```

## 6.7 捕获解析 JWT 失败后产生的错误

当使用 express-jwt 解析 Token 字符串时，如果客户端发送过来的 Token 字符串**过期**或**不合法**，会产生一个解析失败的错误，影响项目的正常运行。我们可以通过 Express 的错误中间件，捕获这个错误并进行相关的处理，示例代码如下：

```javascript
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      message: "无效的token",
    });
  }
  res.send({
    status: 500,
    message: "未知的错误",
  });
});
```

## 6.8 代码示例

```javascript
const express = require("express");
const app = express();
// TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
const jwt = require("jsonwebtoken");
const { expressjwt: expressJWT } = require("express-jwt");
// 允许跨域资源共享
const cors = require("cors");
app.use(cors());
// 解析 post 表单数据的中间件
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
const secretKey = "ajafjkasfj";
// TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.auth 属性上
app.use(
  expressJWT({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
);
// 登录接口
app.post("/api/login", function (req, res) {
  // 将 req.body 请求体中的数据，转存为 userinfo 常量
  const userinfo = req.body;
  // 登录失败 用户名密码错误
  if (userinfo.username !== "admin" || userinfo.password !== "000000") {
    return res.send({
      status: 400,
      message: "登录失败！",
    });
  }
  // 登录成功
  // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  // 记住：安全起见，不要把密码加密到 token 字符中,
  const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, {
    expiresIn: "60s",
  });
  res.send({
    status: 200,
    message: "登录成功！",
    token: tokenStr, // 登录成功之后，服务器响应给客户端一个toten
  });
});

// 这是一个有权限的接口, 因为前面设置了jwt中间件，除了api开头的都有访问权限
app.get("/admin/getinfo", function (req, res) {
  // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.auth);
  res.send({
    status: 200,
    message: "获取用户信息成功！",
    data: req.auth, // 要发送给客户端的用户信息
  });
});

// TODO_06：使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      message: "无效的token",
    });
  }
  res.send({
    status: 500,
    message: "未知的错误",
  });
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8888, function () {
  console.log("Express server running at http://127.0.0.1:8888");
});
```

用 postman 测试接口
![在这里插入图片描述](https://img-blog.csdnimg.cn/7d444c061bd44dc3bab38f267d2109b2.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/fc6cbcd703484f8f985439d8818212d8.png#pic_center)
