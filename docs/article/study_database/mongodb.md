---
title: MongoDB简介+安装+基本CRUD+索引
date: 2022/07/29 15:46
categories: [类别, demo类别] # 标签
stick: false # 是否置顶
description: 这是此篇文章的描述
keyword: 设置keyword,设置keyword,设置keyword,设置keyword
---

# 简介+安装+基本 CRUD+索引

# 1. MongoDB 相关概念

## 1.1 业务应用场景

### 1.1.1 三高需求

传统的关系型数据库（如 MySQL,Oracle,SQL Server），在数据操作的“三高”需求以及应对 Web2.0 的网站需求面前，显得力不从心。

> 解释：“三高”需求：
>
> - High performance - 对数据库高并发读写的需求。
> - Huge Storage - 对海量数据的高效率存储和访问的需求。
> - High Scalability && High Availability- 对数据库的高可扩展性和高可用性的需求。

MongoDB 可应对“三高”需求，具体的应用场景如下：

- ① 社交场景：使用 MongoDB 存储存储用户信息，以及用户发表的朋友圈信息，通过地理位置索引实现附近的人、地点等功能。
- ② 游戏场景：使用 MongoDB 存储游戏用户信息，用户的装备、积分等直接以内嵌文档的形式存储，方便查询、高效率存储和访问。
- ③ 物流场景：使用 MongoDB 存储订单信息，订单状态在运送过程中会不断更新，以 MongoDB 内嵌数组的形式来存储，一次查询就能将订单所有的变更读取出来。
- ④ 物联网场景：使用 MongoDB 存储所有接入的智能设备信息，以及设备汇报的日志信息，并对这些信息进行多维度的分析。
- ⑤ 视频直播：使用 MongoDB 存储用户信息、点赞互动信息等。

以上应用场景中，数据操作方面的共同特点是：

- ① 数据量大
- ② 写入操作频繁（读写都很频繁）
- ③ 价值较低的数据，对事务性要求不高

对于这样的数据，更适合使用 MongoDB 来实现数据的存储。

### 1.1.2 何时选择 MongoDB

应用不需要事务(银行、财务等系统对事物要求极高)及复杂 join 支持
新应用，需求会变，数据模型无法确定，想快速迭代开发
应用需要 2000-3000 以上的读写 QPS（更高也可以）
应用需要 TB 甚至 PB 级别数据存储
应用发展迅速，需要能快速水平扩展
应用要求存储的数据不丢失
应用需要 99.999%高可用
应用需要大量的地理位置查询、文本查询

## 1.2 MongoDB 简介

MongoDB 是一个开源、高性能、无模式的**文档型**数据库，当初的设计就是用于简化开发和方便扩展，是 NoSQL 数据库产品(如 Redis，Cassandra)中的一种。是最像关系型数据库（MySQL）的**非关系型数据库**。

它支持的**数据结构**非常**松散**，是一种类似于 **JSON** 的 格式叫 BSON，所以它既可以存储比较复杂的数据类型，又相当的灵活。

MongoDB 中的记录是一个文档，它是一个由**字段和值**对（ﬁeld:value）组成的数据结构。MongoDB 文档类似于 JSON 对象，即一个文档认为就是一个对象。字段的数据类型是字符型，它的值除了使用基本的一些类型外，还可以包括其他文档、普通数组和文档数组。

官网：[https://www.mongodb.com/](https://www.mongodb.com/)
中文社区：[https://mongoing.com/](https://mongoing.com/)

## 1.3 体系结构

MySQL 和 MongoDB 对比
![在这里插入图片描述](https://img-blog.csdnimg.cn/ffdc0219948349c286a5cad4d17bf5e0.png)
术语对比
|SQL 术语/概念 | MongoDB 术语/概念| 解释/说明 |
|--|--|--|
| database | database | 数据库|
| table | collection | 数据库**表** / **集合** |
| row | document | 数据记录**行** / **文档** |
| column | ﬁeld |数据**字段** / **域** |
| index | index| 索引 |
| table joins | - | 表连接 / MongoDB 不支持 |
| - | 嵌入文档 |MongoDB 通过嵌入式文档来替代多表连接|
| primary key | primary key | 主键 / MongoDB 自动将`_id`字段设置为主键 |

## 1.4 数据模型

MongoDB 的最小存储单位就是文档(document)对象。文档(document)对象对应于关系型数据库的行。数据在 MongoDB 中以 BSON（Binary-JSON）文档的格式存储在磁盘上。

BSON（Binary Serialized Document Format）是一种类 json 的一种二进制形式的存储格式，简称 Binary JSON。BSON 和 JSON 一样，支持内嵌的文档对象和数组对象，但是 BSON 有 JSON 没有的一些数据类型，如 Date 和 BinData 类型。

BSON 采用了类似于 C 语言结构体的名称、对表示方法，支持内嵌的文档对象和数组对象，具有轻量性、可遍历性、高效性的三个特点，可以有效描述非结构化数据和结构化数据。这种格式的优点是灵活性高，但它的缺点是空间利用率不是很理想。

Bson 中，除了基本的 JSON 类型：string,integer,boolean,double,null,array 和 object，mongo 还使用了特殊的数据类型。这些类型包括 date,object id,binary data,regular expression 和 code。每一个驱动都以特定语言的方式实现了这些类型，查看你的驱动的文档来获取详
细信息。

BSON 数据类型参考列表：
| 数据类型 | 描述 | 举例 |
|--|--|--|
| 字符串 String | UTF-8 字符串都可表示为字符串类型的数据 | {"x" : "foobar"} |
| 对象 Object | 对象数据类型 | {"x" :Object()} |
| 对象 id ObjectId| 对象 id 是文档的自动生成的唯一 ID | {"X" :ObjectId() } |
| 布尔值 Boolean| 真或者假：true 或者 false | {"x":true} |
| 数组 Array| 值的集合或者列表可以表示成数组 | {"x" ： ["a", "b", "c"]} |
| 日期 Date| 日期类型 | {"x" ：Date() } |
| 时间戳 Timestamp| 时间戳类型 | {"x" ：Timestamp() } |
| 32 位整数 32-bit integer| 类型不可用。JavaScript 仅支持 64 位浮点数，所以 32 位整数会被自动转换。 | shell 是不支持该类型的，shell 中默认会转换成 64 位浮点数 |
| 64 位整数 64-bit integer| 不支持这个类型。shell 会使用一个特殊的内嵌文档来显示 64 位整数 | shell 是不支持该类型的，shell 中默认会转换成 64 位浮点数 |
| null | 表示空值或者未定义的对象 |{"x":null} |
| 符号 Symbol|shell 不支持，shell 会将数据库中的符号类型的数据自动转换成字符串 | - |
| 正则表达式 Regular Expression | 文档中可以包含正则表达式，采用 JavaScript 的正则表达式语法 | {"x" ： /foobar/i} |
| 二进制数据 Binary data| 二进制数据可以由任意字节的串组成，不过 shell 中无法使用 | - |
| 最大值/最小值 Min key / Max key| BSON 包括一个特殊类型，表示可能的最大值。shell 中没有这个类型。 | - |

提示：
shell 默认使用 64 位浮点型数值。{“x”：3.14}或{“x”：3}。对于整型值，可以使用 NumberInt（4 字节符号整数）或 NumberLong（8 字节符号整数），{“x”:NumberInt(“3”)}{“x”:NumberLong(“3”)}

## 1.5 MongoDB 的特点

MongoDB 主要有如下特点：
（1）高性能：

- MongoDB 提供高性能的数据持久性。特别是对嵌入式数据模型的支持减少了数据库系统上的 I/O 活动。
- 索引支持更快的查询，并且可以包含来自嵌入式文档和数组的键。（文本索引解决搜索的需求、TTL 索引解决历史数据自动过期的需求、地理位置索引可用于构建各种 O2O 应用）
- mmapv1、wiredtiger、mongorocks（rocksdb）、in-memory 等多引擎支持满足各种场景需求。
- Gridfs 解决文件存储的需求。

（2）高可用性：

- MongoDB 的复制工具称为副本集（replica set），它可提供自动故障转移和数据冗余。

（3）高扩展性：

- MongoDB 提供了水平可扩展性作为其核心功能的一部分。
- 分片将数据分布在一组集群的机器上。（海量数据存储，服务能力水平扩展）
- 从 3.4 开始，MongoDB 支持基于片键创建数据区域。在一个平衡的集群中，MongoDB 将一个区域所覆盖的读写只定向到该区域内的那些片。

（4）丰富的查询支持：

- MongoDB 支持丰富的查询语言，支持读和写操作(CRUD)，比如数据聚合、文本搜索和地理空间查询等。

（5）其他特点：如无模式（动态模式）、灵活的文档模型

# 2. 安装部署

## 2.1 安装 MongoDB

> ==**注意：这里安装的是 mongodb 6.0.0 版本，mongosh 版本**==

### 2.1.1 下载

从 MongoDB 官网下载安装，MongoDB 下载地址：[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

版本的选择：

- MongoDB 的版本命名规范如：x.y.z；
- y 为奇数时表示当前版本为开发版，如：1.5.2、4.1.13；
- y 为偶数时表示当前版本为稳定版，如：1.6.3、4.0.10；
- z 是修正版本号，数字越大越好。
- 详情：[https://www.mongodb.com/docs/manual/release-notes/#release-version-numbers](https://www.mongodb.com/docs/manual/release-notes/#release-version-numbers)

![在这里插入图片描述](https://img-blog.csdnimg.cn/861cb7d1316a44288c9c18c73b5c7eed.png#pic_center)

### 2.1.2 安装+配置+启动

以下仅截图了部分重要的步骤，其余 next 即可

1、选择自定义安装
![在这里插入图片描述](https://img-blog.csdnimg.cn/5c3969c4a4d64e569d4cec574fde2f8b.png#pic_center)
2、更换安装路径，默认下在 c 盘
![在这里插入图片描述](https://img-blog.csdnimg.cn/3b8ee3a3b0b642c7b2ed0f6fab4cfb02.png#pic_center)
3、将 MongoDB 设置为 Windows 服务
![在这里插入图片描述](https://img-blog.csdnimg.cn/9f3949518c46452f975f5cdb3ab954ea.png#pic_center)
4、这里先取消勾选图形管理界面。
![在这里插入图片描述](https://img-blog.csdnimg.cn/b652ca5fb54e43b580ce2450beae7962.png#pic_center)

> 我这里安装还额外弹出如下问题，若未出现请略过
> 按如下点击然后重启电脑![请添加图片描述](https://img-blog.csdnimg.cn/151a88c680084052865de3006ec062ad.png)![请添加图片描述](https://img-blog.csdnimg.cn/fd6627530ffc4f1fa43da01457e2111f.png)
> 5、安装完后配置环境(方便在任何目录下都能运行相关命令)，根据自己的安装路径来，找到 mongodb 的 bin 目录
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/3705ac8a8993415194d81f15684be92c.png#pic_center)

6、终端输入 mongod 看看有没有信息，如有则环境配置的成功。不是内部或外部命令等提示，则有可能配错了
![在这里插入图片描述](https://img-blog.csdnimg.cn/554f61575f144be3a66b2e5fa7ea0e09.png#pic_center)

7、创建 MongoDB 存储数据的数据目录
MongoDB 的默认数据目录路径是 MongoDB 文件根目录的`\data\db`。在 MongoDB 下载目录下，创建 data 文件(若没有的话)，在 data 里创建 db 文件

8、命令行参数方式启动服务
在 MongoDB 的 bin 目录下，**启动**MongoDB 的数据库，ctrl + c 可以停掉

```shell
mongod --dbpath=..\data\db
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/3d2ebea94fef40028d34b08cc933fa80.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2c43b61160b74dfebd7bcebd65a3dec7.png#pic_center)

mongoDB 的**默认端口是 27017**，如果我们想改变默认的启动端口，可以通过--port 来指定端口。

8、连接 MongoDB 数据库，先安装 MongoDB Shell

### 2.1.3 配置文件方式启动服务

自己创建 mongodb 的配置文件，在 mongodb 根目录中新建 config 文件夹，该文件夹中新建配置文件 mongod.conf ，内如参考如下：注意路径根据自己的来填

```powershell
storage:
  #The directory where the mongod instance stores its data.Default Value is "\data\db" on Windows.
  dbPath: D:\developer_tools\MongoDBServer6.0\data\db
```

详细配置项内容可以参考官方文档：[https://www.mongodb.com/docs/manual/reference/configuration-options/](https://www.mongodb.com/docs/manual/reference/configuration-options/)

> 【注意】
> 1）配置文件中如果使用双引号，比如路径地址，自动会将双引号的内容转义。如果不转义，则会报错：`error-parsing-yaml-config-file-yaml-cpp-error-at-line-3-column-15-unknown-escape-character-d`
> 解决：
> a. 对 \ 换成 / 或 \\
> b. 如果路径中没有空格，则无需加引号。
> 2）配置文件中不能以 Tab 分割字段
> 解决：
> 将其转换成空格。

启动方式：

```powershell
mongod -f ../config/mongod.conf
或
mongod --config ../config/mongod.conf
# 注意这里的配置文件路径要根据自己的实际情况来写
```

启动成功如图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/14839e59d26b48879192677bd5a73199.png#pic_center)
更多参数配置：

```powershell
systemLog:
  destination: file
  #The path of the log file to which mongod or mongos should send all diagnostic logging information
  path: "D:/developer_tools/MongoDBServer6.0/log/mongod.log"
  logAppend: true
storage:
  journal:
     enabled: true
  #The directory where the mongod instance stores its data.Default Value is "/data/db".
  dbPath: "D:/developer_tools/MongoDBServer6.0/data"
net:
  bindIp: 127.0.0.1
  port: 27017
setParameter:
  enableLocalhostAuthBypass: false
```

## 2.2 安装 MongoDB Shell

为了连接 MongoDB 数据库，请下载 MongoDB Shell (mongosh)：[https://www.mongodb.com/try/download/tools](https://www.mongodb.com/try/download/tools)
![在这里插入图片描述](https://img-blog.csdnimg.cn/53f19be0902043ac9f4fd65db478af4a.png#pic_center)
安装，选择路径
![请添加图片描述](https://img-blog.csdnimg.cn/716dbdd8eb5e4044ac026970a6e78233.png)
配置环境
![请添加图片描述](https://img-blog.csdnimg.cn/7c4228e45cd74e1e864938a57fccb020.png)
任意目录下，终端输入 `mongosh --help` 查看，若有信心则配置成功
![在这里插入图片描述](https://img-blog.csdnimg.cn/d6456bdb7fdb46df992418eb2e0e21f1.png#pic_center)

## 2.3 Shell 连接(mongo 命令)

先启动数据库服务(终端启动后不要叉 X 掉，否则服务关了)，然后在命令提示符输入以下 shell 命令即可完成登陆

```powershell
mongosh
或
mongosh --host=127.0.0.1 --port=27017
# 注意：版本低的命令可能是 mongo 不带 sh ，试试即可
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/a2847d7ab5224535971e429ce3acb2a4.png#pic_center)

```powershell
# 查看已经有的数据库
show databases
# 退出mongodb
exit
# 更多参数可以通过help帮助查看：
mongosh --help
```

MongoDB javascript shell 是一个基于 javascript 的解释器，故是支持 js 程序的。
![在这里插入图片描述](https://img-blog.csdnimg.cn/6abfd59b23f34088ac5acab7d8fc0347.png#pic_center)

## 2.4 Compass 图形化界面客户端

MongoDB 官网下载 MongoDB Compass,地址：[https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)

![在这里插入图片描述](https://img-blog.csdnimg.cn/345eef82564e43a0847118413b4b8043.png#pic_center)
连接
![在这里插入图片描述](https://img-blog.csdnimg.cn/58a860f1c45b4e51813fb9b72a527792.png#pic_center)
可视化操作
![在这里插入图片描述](https://img-blog.csdnimg.cn/3df261c4d2f0482e83e0066e72128c93.png#pic_center)

# 3. 基本常用命令

mondoDB 服务器的启动与关闭

```sql
net start mongodb
net stop mongodb
```

## 3.1 数据库操作

### 3.1.1 选择和创建数据库

选择和创建数据库，如果数据库不存在则自动创建

```sql
use 数据库名称
```

查看有权限查看的所有的数据库

```sql
show dbs # 或
show databases
```

注意: 在 MongoDB 中，集合只有在内容插入后才会创建! 即创建集合(数据表)后要再插入一个文档(记录)，集合才会真正创建。

查看当前正在中的数据库名称

```sql
db
```

MongoDB 中默认的数据库为 test，如果你没有选择数据库，集合将存放在 test 数据库中。

### 3.1.2 数据库命名

数据库名可以是满足以下条件的任意 UTF-8 字符串。

- 不能是空字符串（"")。
- 不得含有`' '`（空格)、.、$、/、\和\0 (空字符)。
- 应全部小写。
- 最多 64 字节。

---

有一些数据库名是保留的，可以直接访问这些有特殊作用的数据库：如

- **admin**： 从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。
- **local**: 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合
- **conﬁg:** 当 Mongo 用于分片设置时，conﬁg 数据库在内部使用，用于保存分片的相关信息。

### 3.1.3 数据库的删除

语法格式如下：

```sql
db.dropDatabase()
db.dropDatabase('数据库名')
```

## 3.2 集合操作

集合，类似关系型数据库中的表。 可以显示的创建，也可以隐式的创建。

### 3.2.1 集合的显式创建

显式创建集合语法如下

```sql
db.createCollection('集合名')
```

查看当前库中的集合：

```sql
show collections
或
show tables
```

集合的命名规范：

- 集合名不能是空字符串`""`。
- 集合名不能含有\0 字符（空字符)，这个字符表示集合名的结尾。
- 集合名不能以"system."开头，这是为系统集合保留的前缀。
- 用户创建的集合名字不能含有保留字符。有些驱动程序的确支持在集合名里面包含，这是因为某些系统生成的集合中包含该字符。除非你要访问这种系统创建的集合，否则千万不要在名字里出现$。

### 3.2.2 集合的隐式创建

当向一个集合中插入一个文档的时候，如果集合不存在，则会自动创建集合。通常我们使用隐式创建文档即可

```sql
db.col.insert({"name" : "凉宫"})
show collections # 即可查看到数据库中多了col集合
```

### 3.2.3 集合的删除

集合删除语法格式如下：

```sql
db.集合名.drop()
```

如果成功删除选定集合，则 drop() 方法返回 **true**，否则返回 false。

## 3.3 文档基本 CRUD

文档（document）的数据结构和 JSON 基本一样。所有存储在集合中的数据都是 BSON 格式。

### 3.3.1 文档的插入

#### 3.3.1.1 单个文档插入

使用`insertOne()`方法向集合中插入文档，语法如下：

```sql
db.collection.insertOne(
   <document>,
   {
      writeConcern: <document>
   }
)
```

参数说明
| 参数 | 类型 | 描述 |
|--|--|--|
| document | 文档 | 要插入到集合中的文档 |
| writeConcern| 文档 | (可选)；写入策略，默认为 1，即要求确认写操作，0 是不要求 |

【示例】：要向 collection 的集合(表)中插入一条测试数据：

```sql
db.collection.insertOne({"articleid":"1","createdatetime":new Date(),"likenum":NumberInt(10),"state":null})
```

提示：
1）collection 集合如果不存在，则会隐式创建
2）mongo 中的数字，默认情况下是 double 类型，如果要存整型，必须使用函数 NumberInt(整型数字)，否则取出来就有问题了。
3）插入当前日期使用 new Date()
4）插入的数据没有指定 `_id` ，会自动生成主键值
5）如果某字段没值，可以赋值为 null，或不写该字段。

执行后，如下，说明插入一个数据成功了。
![在这里插入图片描述](https://img-blog.csdnimg.cn/79597999f84b48e09ff1b27185472c27.png#pic_center)
注意：

1. 文档中的键/值对是**有序的**。
2. 文档中的**值**不仅可以是在双引号里面的字符串，还可以是其他几种数据类型（甚至可以是整个嵌入的文档)。
3. MongoDB**区分类型和大小写**。
4. MongoDB 的文档**不能有重复的键**。
5. **文档的键是字符串**。除了少数例外情况，键可以使用任意 UTF-8 字符。

文档键命名规范：

- 键不能含有\0 (空字符)。这个字符用来表示键的结尾。
- `.`和`$`有特别的意义，只有在特定环境下才能使用。
- 以下划线`_`开头的键是保留的(不是严格要求的)。

#### 3.3.1.2 多个文档插入

语法：

```sql
db.collection.insertMany(
   [ <document 1> , <document 2>, ... ],
   {
      writeConcern: <document>,
      ordered: <boolean>
   }
)
```

参数说明
| 参数 | 类型 | 描述 |
|--|--|--|
| [documents..] | 数组 | 要插入到集合中的文档 |
| writeConcern| 文档 | (可选)；写入策略，默认为 1，即要求确认写操作，0 是不要求 |
| ordered| 布尔 | 可选。如果为真，则按顺序插入数组中的文档，如果其中一个文档出现错误，MongoDB 将返回而 不处理数组中的其余文档。如果为假，则执行无序插入，如果其中一个文档出现错误，则继续处理 数组中的主文档 |

```sql
db.collection.insertMany([
  { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
  { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
  { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
])
```

提示：
插入时指定了 `_id` ，则主键就是该值。
如果某条数据插入失败，将会终止插入，但已经插入成功的数据不会回滚掉。
因为批量插入由于数据较多容易出现失败，因此，可以使用 try catch 进行异常捕捉处理，测试的时候可以不处理。如（了解）：

```sql
try {
  db.collection.insertMany([
    { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
    { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
    { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
])
} catch (e) {
  print (e);
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/9e188183409e4abb8cbe42315b934b4a.png#pic_center)

### 3.3.2 文档的基本查询

查询数据的语法格式如下：

```sql
db.collection.find(query, projection)
```

参数说明
| 参数 | 类型 | 描述 |
|--|--|--|
| query | 文档 | 可选。使用查询运算符指定选择筛选器。若要返回集合中的所有文档，请省略此参数或传递空文档 ( {} ) |
| projection| 文档 | 可选。指定要在与查询筛选器匹配的文档中返回的字段（投影）。若要返回匹配文档中的所有字段， 请省略此参数。 |

1、查询所有
查询集合中的**所有文档**，可以在 find 方法中传一个空文档作为查询过滤条件(或什么都不传)

```sql
db.collection.find() -- 查询所有记录
db.collection.find( {} ) -- 查询所有记录
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/040820225c4947efb81dbfd889c14e1b.png#pic_center)

这里你会发现每条文档会有一个叫`_id`的字段，这个相当于我们原来关系数据库中表的**主键**，当你在插入文档记录时没有指定该字段，MongoDB 会自动创建，其类型是 ObjectID 类型。

如果我们在插入文档记录时指定该字段也可以，其类型可以是**ObjectID 类型**，也可以是 MongoDB 支持的任意类型。(但不建议自己添加)

---

2、按条件查询
也可指定过滤参数确定**选择条件**：

```sql
db.collection.find( { item: "journal" } ) -- 查询 item为 journal的 记录
db.collection.find( { item: "mat", qty: 85, tags: ["gray"] } )
```

如果只需要返回符合条件的**第一条**数据，我们可以使用`ﬁndOne`命令来实现，语法和 ﬁnd 一样。

```sql
db.collection.findOne();
```

---

3、投影查询（Projection Query）

如果要查询结果返回部分字段，则需要使用投影查询（不显示所有字段，只显示指定的字段）。
默认情况下，都是显示的；在`要显示的字段:1`过滤出指定字段；`不显示的字段:0`指定某字段不显示，

```sql
# 查询 userid为 1003的文档，且只显示 userid 和 nickname 字段
db.collection.find({userid:"1003"},{userid:1,nickname:1})
# { "_id" : "4", "userid" : "1003", "nickname" : "凯撒" }
# { "_id" : "5", "userid" : "1003", "nickname" : "凯撒" }
```

### 3.3.3 文档的更新

#### 3.3.3.1 单个文档更新

语法如下：

```sql
db.collection.updateOne(filter, update, options)
```

```sql
db.collection.updateOne(
   <filter>,
   <update>,
   {
     upsert: <boolean>,
     writeConcern: <document>,
     collation: <document>,
     arrayFilters: [ <filterdocument1>, ... ],
     hint:  <document|string>        // Available starting in MongoDB 4.2.1
   }
)
```

参数说明：除了前两个必选的，配置对象都是可选的。关注前三个即可
| 参数 | 类型 | 说明 |
|--|--|--|
| filter | document | 查询条件；可以指定一个空文档{ }以更新集合中返回的第一个文档。 |
| update| document or pipeline | 要应用的修改。该值可以是：包含更新运算符表达式的文档，或仅包含：对的替换文档，或在 MongoDB 4.2 中启动聚合管道。管道可以由以下阶段组成： |
| upsert | boolean |如果设置为 true，则在没有与查询条件匹配的文档时创建新文档。默认值为 false，如果找不到匹配项，则不会插入新文档。 |
| writeConcern| document | 表示写问题的文档。抛出异常的级别。 |
| collation| document | 指定用于操作的排序规则。 |
| arrayFilters| array | 一组过滤器文档，用于确定要为数组字段的更新操作修改哪些数组元素。 |
| hint| Document or string | 指定用于支持查询谓词的索引的文档或字符串。该选项可以采用索引规范文档或索引名称字符串。如果指定的索引不存在，则说明操作错误。 |

为了更新文档，MongoDB 提供了更新操作符（例如`$set`）来修改字段值。
如果字段不存在，则某些更新操作符（例如`$set`）将创建该字段。 格式为

```sql
{ $set: { <field1>: <value1>, ... } }
```

---

【示例】

```sql
db.collection.updateOne(
    { id: "233" },
    {
        $set: { "name": "lucy", age: 20 }
    }
)
```

【解释】：在 collection 集合中，找到 id 属性值为 233 的文档，并更新它的 name 属性 和 age 属性，值分别为 lucy 和 20(updateOne 函数，记住第一个参数是查询条件，第二个具体的修改)

#### 3.3.3.2 多个文档更新

```sql
db.collection.updateMany(filter, update, options)
```

参数与上面的一样。
【示例】：

```sql
db.collection.updateMany(
    {},
    {
        $set: { age: 20 }
    }
)
```

【解释】：这里的查询参数为空对象，则所有文档都会作为查询对象，然后把他们的 age 属性都改为 20，注意，如果有文档并没有 age 属性，也会为其自动创建并赋值

#### 3.3.3.3 自增长

运算符`$inc`将字段增加一个指定的值(可正可负)，形式如下

```sql
{ $inc: { <field1>: <amount1>, <field2>: <amount2>, ... } }
```

【示例】：修改数据并自增某字段值

```sql
db.collection.updateOne({条件},{$inc:{自增的字段:步进值}})
db.collection.updateOne(
   { userid: "abc123" },
   { $inc: { num: -2, "orders": 1 } }
)
```

注意：若字段不存在，则会自动创建。在具有空值 null 的字段上使用$inc 运算符将 ​​ 产生错误。

### 3.3.4 删除文档

#### 3.3.4.1 单个文档删除

语法：

```sql
db.collection.deleteOne(
   <filter>,
   {
      writeConcern: <document>,
      collation: <document>,
      hint: <document|string>        // Available starting in MongoDB 4.4
   }
)
```

参数说明

| 参数         | 类型               | 说明                                                                                                                         |
| ------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| filter       | document           | 使用查询运算符指定删除条件，若指定一个空文档{ }，则删除集合中返回的第一个文档                                                |
| writeConcern | document           | 表示写问题的文档。省略使用默认的写入策略。与事务操作有关                                                                     |
| collation    | document           | 指定用于操作的排序规则。                                                                                                     |
| hint         | Document or string | 指定用于支持查询谓词的索引的文档或字符串。该选项可以采用索引规范文档或索引名称字符串。如果指定的索引不存在，则说明操作错误。 |

【示例】:删除 idCard 为 11 的文档

```sql
db.collection.deleteOne( { "idCard" : "11" };
```

#### 3.3.4.2 多个文档删除

语法：同上

【示例】：删除 gender 字段为 boy 的文档

```sql
db.collection.deleteMany( { "gender" : "boy" } )
db.collection.deleteMany( { } )
```

注意：若传入空文档 ( { })，则删除所有文档，慎用哦

## 3.4 分页查询

### 3.4.1 统计查询

```sql
db.collection.countDocuments(query, options)
```

参数说明
| 参数 | 类型 | 描述 |
|--|--|--|
| query | document | 查询选择条件。若要计算所有文档，请指定一个空文档{}。 |
| options | document | 可选。影响计数行为的其他选项。 |

其中 options 文档可以包含以下内容
| 字段 | 类型 | 描述 |
|--|--|--|
| limit | integer | 可选。要计算的最大文件数。 |
| skip| integer | 可选。计数前要跳过的文档数。 |
| hint| string or document | 可选。用于查询的索引名称或索引规范。 |
| maxTimeMS| integer | 可选。允许计数运行的最长时间。 |

【示例】
统计所有文档数

```sql
db.collection.countDocuments({})
```

统计 gender 字段为 boy 的文档数

```sql
db.collection.countDocuments( { gender:"boy"} )
```

### 3.4.2 分页列表查询

可以使用`limit()`方法来读取**指定数量**的数据，使用`skip()`方法来**跳过指定数量**的数据。
【示例 1】：表示 在 collection 集合中，查询所有数据并限制显示前三条。

```sql
db.collection.find().limit(3)
```

【示例 2】：表示 在 collection 集合中，根据查询结果并跳过前三条数据显示

```sql
db.collection.find().skip(3)
```

【分页查询】：先跳过 0 条，显示 2 条；再跳过两条的基础上，再显示 2 条记录·；以此分页

```sql
//第一页
db.collection.find().skip(0).limit(2)
//第二页
db.collection.find().skip(2).limit(2)
//第三页
db.collection.find().skip(4).limit(2)
```

### 3.4.3 排序查询

`sort()` 方法对数据进行排序，sort() 方法可以通过参数指定排序的字段，其中 **1 为升序**排列，而 **-1 是降序**排列。

【示例 1】：表示查询 collection 集合所有文档，并按 age 字段升序排序

```sql
db.collection.find().sort({age:1})
```

【示例 2】：表示查询 collection 集合所有文档，并先按 age 字段升序，level 降序排序

```sql
db.collection.find().sort({age:1,level:-1})
```

**注意**：skip(), limilt(), sort()三个放在一起执行的时候，执行的顺序是先 sort(), 然后是 skip()，最后是显示的 limit()，和命令编写顺序无关。

## 3.5 更多查询

### 3.5.1 正则的复杂条件查询

MongoDB 的模糊查询是通过正则表达式的方式实现的；此正则表达式是 js 的语法

#### 3.5.1.1 方式一正则表达式对象

```sql
db.集合.find({字段:/正则表达式/})
```

【示例】

```sql
db.collection.find({content:/home/}) # 查询 content字段，包含 home 的集合
db.collection.find({content:/^house/}) # 查询 content字段，以house开头的集合
```

#### 3.5.1.2 方式二$regex 运算符

MongoDB 使用 $regex 操作符来设置匹配字符串的正则表达式。

```sql
{ <field>: { $regex: /pattern/, $options: '<options>' } }
{ <field>: { $regex: 'pattern', $options: '<options>' } }
{ <field>: { $regex: /pattern/<options> } }
```

options 参数说明
| 选项 | 描述 |语法限制 |
|--|--|--|
| i | 不区分大小写,`{<field>:{$regex/pattern/i,$options:'i'}`，设置 i 选项后，模式中的字母会进行大小写不敏感匹配 | -|
| m | m 多行匹配模式，`{<field>:{$regex/pattern/,$options:'m'}`，m 选项会更改^和$元字符的默认行为，分别使用与行的开头和结尾匹配，而不是与输入字符串的开头和结尾匹配。 | -|
| x | x 忽略非转义的空白字符，`{<field>:{$regex:/pattern/,$options:'x'}`，设置x选项后，正则表达式中的非转义的空白字符将被忽略，同时井号(#)被解释为注释的开头注。 | 只能显式位于option选项中|
| s | s 单行匹配模式`{<field>:{$regex:/pattern/,$options:'s'}`，设置 s 选项后，会改变模式中的点号(.)元字符的默认行为，它会匹配所有字符，包括换行符(\n) |只能显式位于 option 选项中 |

【示例】

```sql
db.collection.find({content:{ $regex:/home/,$option:"i"} }) # 匹配content字段包含不区分大小写的home的文档
```

注意：

- 要在查询表达式中包含正则`$in`表达式，您只能使用 JavaScript 正则表达式对象（即/pattern/ ）
- i，m，x，s 可以组合使用，例如:`{name:{$regex:/j*k/,$options:"si"}}`，组合使用一定要写在$options 中

**$not**操作员可以正则操作

```sql
db.collection.find( { item: { $not: { $regex: /home/ } } } )
```

### 3.5.2 比较查询

<, <=, >, >= 这些比较操作符在 mongodb 中有另外的表示方式
|操作 | 格式 |  
|--|--|
| 等于 = | `{<key>:<value>}` |  
| 小于 <| `{<key>:{$lt:<value>}}` |
| 小于或等于 <=| `{<key>:{$lte:<value>}}` |
| 大于 >| `{<key>:{$gt:<value>}}` |
| 大于或等于 >=| `{<key>:{$gte:<value>}}` |
| 不等于 !=| `{<key>:{$ne:<value>}}` |

```sql
db.集合名称.find({ "field" : { $gt: value }}) // 大于: field > value
db.集合名称.find({ "field" : { $lt: value }}) // 小于: field < value
db.集合名称.find({ "field" : { $gte: value }}) // 大于等于: field >= value
db.集合名称.find({ "field" : { $lte: value }}) // 小于等于: field <= value
db.集合名称.find({ "field" : { $ne: value }}) // 不等于: field != value
```

### 3.5.3 包含查询

包含使用`$in`操作符，后面跟一个数组

```sql
db.comment.find({userid:{$in:["1003","1004"]}}) # 查询 userid 是 1003 或 1004 的文档
```

不包含使用`$nin`操作符

```sql
db.comment.find({userid:{$nin:["1003","1004"]}}) # 查询userid 不是 1003,1004的文档
```

### 3.5.4 条件连接查询

如果需要查询同时满足两个以上条件，需要使用`$and`操作符将条件进行关联

```sql
$and:[ {  },{  },{ } ]
```

【示例】：查询 num 字段大于等于 700 ，小于 2000 的文档

```sql
db.collection.find({$and:[{num:{$gte:NumberInt(700)}},{num:{$lt:NumberInt(2000)}}]})
```

---

如果两个以上条件之间是或者的关系，我们使用 `$or` 操作符进行关联

```sql
$or:[ {  },{  },{   } ]
```

【示例】：查询 userid 为 1003，或者 num 小于 1000 的文档记录

```sql
db.comment.find({$or:[ {userid:"1003"} ,{num:{$lt:1000} }]})
```

## 3.6 常用命令小结

```sql
选择切换数据库：use testdb2
插入数据：db.collection.insertOne({bson数据}) db.collection.insertMany([{bson数据},{bson数据},{bson数据}])
查询所有数据：db.collection.find();
条件查询数据：db.collection.find({条件})
查询符合条件的第一条记录：db.collection.findOne({条件})
查询符合条件的前几条记录：db.collection.find({条件}).limit(条数)
查询符合条件的跳过的记录：db.collection.find({条件}).skip(条数)
修改数据：db.collection.updateOne({条件},{$set:{要修改部分的字段:数据}) db.collection.updateMany({条件},{$set:{要修改部分的字段:数据})
修改数据并自增某字段值：db.collection.updateOne({条件},{$inc:{自增的字段:步进值}})
删除数据：db.collection.deleteOne({条件}) db.collection.deleteMany({条件})
统计查询：db.collection.count({条件})
模糊查询：db.collection.find({字段名:/正则表达式/})
条件比较运算：db.collection.find({字段名:{$gt:值}})
包含查询：db.collection.find({字段名:{$in:[值1，值2]}})或db.collection.find({字段名:{$nin:[值1，值2]}})
条件连接查询：db.collection.find({$and:[{条件1},{条件2}]})或db.collection.find({$or:[{条件1},{条件2}]})
```

# 4. 索引-Index

## 4.1 概述

索引支持在 MongoDB 中**高效执行查询**。如果没有索引，MongoDB 必须执行集合扫描，即扫描集合中的每个文档

索引是特殊的数据结构，它以易于遍历的形式存储集合数据集的一小部分。索引存储特定字段或一组字段的值，按字段值排序。索引条目的排序支持高效的相等匹配和基于范围的查询操作

MongoDB 索引使用 B 树数据结构（确切的说是 B-Tree，MySQL 是 B+Tree）

## 4.2 索引的类型

### 4.2.1 单字段索引

MongoDB 支持在文档的单个字段上创建用户定义的升序/降序索引，称为单字段索引（Single Field Index）。

对于单个字段索引和排序操作，索引键的排序顺序（即升序或降序）并不重要，因为 MongoDB 可以在任何方向上遍历索引。
![在这里插入图片描述](https://img-blog.csdnimg.cn/65ebbd317e544973ad1f8da0419b7e43.png#pic_center)

### 4.2.2 复合索引

MongoDB 还支持多个字段的用户定义索引，即复合索引（Compound Index）。

复合索引中列出的字段顺序具有重要意义。例如，如果复合索引由 { userid: 1, score: -1 } 组成，则索引首先按 userid 正序排序，然后在每个 userid 的值内，再在按 score 倒序排序。
![在这里插入图片描述](https://img-blog.csdnimg.cn/7e0cef53f6cf4e4a95fdecf369bba477.png#pic_center)

### 4.2.3 其他索引(了解)

地理空间索引（Geospatial Index）、文本索引（Text Indexes）、哈希索引（Hashed Indexes）。

- 地理空间索引（Geospatial Index）:为了支持对地理空间坐标数据的有效查询，MongoDB 提供了两种特殊的索引：返回结果时使用平面几何的二维索引和返回结果时使用球面几何的二维球面索引。
- 文本索引（Text Indexes）:MongoDB 提供了一种文本索引类型，支持在集合中搜索字符串内容。这些文本索引不存储特定于语言的停止词（例如“the”、“a”、“or”），而将集合中的词作为词干，只存储根词。
- 哈希索引（Hashed Indexes）：为了支持基于散列的分片，MongoDB 提供了散列索引类型，它对字段值的散列进行索引。这些索引在其范围内的值分布更加随机，但只支持相等匹配，不支持基于范围的查询。

## 4.3 索引的基本操作

### 4.3.1 查看索引

返回一个集合中的所有索引的数组。

```sql
db.collection.getIndexes()
```

【示例】:结果显示的是默认 \_id 索引
![在这里插入图片描述](https://img-blog.csdnimg.cn/5420175e3e91435c9d76faf04b5516c7.png#pic_center)
v 表示当前索引版本号，key 可以看出在哪个字段加了索引(1 表示升序)，name 表示索引名称

> 默认*id 索引：
> MongoDB 在创建集合的过程中，默认在 \_id 字段上创建一个唯一的索引，默认名字为 \_id* ，该索引可防止客户端插入两个具有相同值的文
> 档，您不能在\_id 字段上删除此索引。
> 注意：该索引是唯一索引，因此值不能重复，即 \_id 值不能重复的。在分片集群中，通常使用 \_id 作为片键。

### 4.3.2 索引的创建

在集合上创建索引，语法：

```sql
db.collection.createIndex(keys, options, commitQuorum)
```

参数说明
| 参数 | 类型 | 描述 |
|--|--|--|
| keys | document | 包含字段和值对的文档，其中字段是索引键，值描述该字段的索引类型。比如： `{字段:1或-1}` ，其中 1 为指定按升序创建索引，按降序创建索引指定为 -1 |
| options | document | 可选。包含一组控制索引创建的选项的文档 |
| commitQuorum | integer or string | 可选。包含数据的投票副本集成员（即提交仲裁）的最小数量，包括主节点，必须在主节点标记为就绪之前报告成功的索引构建。 |

options 选项说明
| 参数 | 类型 | 描述 |
|--|--|--|
| background | boolean | 建索引过程会阻塞其它数据库操作，background 可指定以后台方式创建索引，即增加"background" 可选参数。 "background" 默认值为 false。 |
| unique | boolean | 建立的索引是否唯一。指定为 true 创建唯一索引。默认值为 false. |
| name | string | 索引的名称。如果未指定，MongoDB 的通过连接索引的字段名和排序顺序生成一个索引名称。 |
|partialFilterExpression | document | 如果指定，则索引仅引用与过滤器表达式匹配的文档。 |
| sparse | boolean | 对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为 true 的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 false. |
| expireAfterSeconds | integer | 指定一个以秒为单位的数值，完成 TTL 设定，设定集合的生存时间。 |
| hidden | boolean | 确定索引是否 对查询计划程序隐藏的标志。隐藏索引不会作为查询计划选择的一部分进行评估。 |
| storageEngine | document | 允许用户在创建索引时基于每个索引配置存储引擎。 |
| collation| document | 指定索引的排序规则。如果没有指定排序规则，则以默认排序规则创建索引若指定了排序规则，则会使用指定的排序规则创建索引。|

以上为所有索引共有的，不同索引还有自己特有的配置对象。

---

【单字段索引示例】对 userid 字段建立升序索引：

```sql
db.collection.createIndex({userid:1})
```

如果 keys 文档指定了多个字段，则会创建复合索引。

【复合索引索引示例】:为 userid，nickname 字段建立复合索引，

```sql
db.collection.createIndex({userid:1,nickname:-1})
```

---

创建多个索引语法

```sql
db.collection.createIndexes( [ keyPatterns ], options, commitQuorum )
```

【示例】

```sql
db.collection.createIndexes([{"a": 1}, { "b": 1} ])
```

### 4.3.3 移除索引

可以移除指定的索引，或移除所有索引

1、指定索引的移除

```sql
db.collection.dropIndex(index)
```

参数说明
| 参数 | 类型 | 描述 |
|--|--|--|
| index | string or document | 指定要删除的索引。可以通过索引名称或索引规范文档指定索引。若要删除文本索引，请指定索引名称。 |

【示例】

```sql
db.collection.dropIndex( "userid") # 或使用索引规范文档
db.collection.dropIndex({"userid": 1}) # 后面的数值根据实际创建的来
```

2、移除所有索引

```sql
db.collection.dropIndexes(indexes)
```

参数说明
| 参数 | 类型 | 描述 |
|--|--|--|
| indexs | string or document or array of strings | 可选。指定要删除的一个或多个索引。删除单个索引，请指定索引名称、索引规范文档（除非索引是 文本索引）或索引名称数组。要删除文本索引，请指定索引名称或索引名称的数组，而不是索引规范文档。要删除多个索引请指定索引名称的数组。 |

若不填参数，则删除默认索引`_id`以外的所有索引，
【示例】

```sql
db.collection.dropIndexes( "a" ) #删除 名称为a的索引
db.collection.dropIndexes( [ "a1", "a2", "a3" ] ) # 删除 a1,a2,a3索引
```

## 4.4 索引的使用

### 4.4.1 执行计划

分析查询性能（Analyze Query Performance）通常使用执行计划（解释计划、Explain Plan）来查看查询的情况，如查询耗费的时间、是否基于索引查询等。

通常，我们想知道，建立的索引是否有效，效果如何，都需要通过执行计划查看。

```sql
db.collection.explain(verbosity).<method(...)>
```

参数说明：各模式差异请查阅[官网](https://docs.mongoing.com/can-kao/mongo-shell-methods/collection-methods/db-collection-explain#xiang-xi-mo-shi)
| 参数 | 类型 | 描述 |
|--|--|--|
| verbosity | string | 可选。指定解释输出的详细模式。该模式会影响 explain()的行为并确定要 return 的信息量。有："queryPlanner"，"executionStats"和"allPlansExecution"。 默认模式为"queryPlanner"。 |

- queryPlanner：执行计划的详细信息，包括查询计划、集合信息、查询条件、最佳执行计划、查询方式和 MongoDB 服务信息等
- executionStats：最佳执行计划的执行情况和被拒绝的计划等信息
- allPlansExecution：选择并执行最佳执行计划，并返回最佳执行计划和其他执行计划的执行情况
  > aggregate() ；count()；find()；remove()；distinct()；findAndModify()；mapReduce()

若要使用`db.collection.explain()`，请将上述方法之一附加到 explain()后面，返回有关方法的查询计划的信息

【示例】

```sql
db.collection.explain().find( { name: "zs" } )
```

### 4.4.2 涵盖的查询

（Covered Queries）当查询条件和查询的投影**仅包含索引字段时**，MongoDB 直接从索引返回结果，而不扫描任何文档或将文档带入内存。 这些覆盖的查询可以非常有效。

```sql
db.comment.explain().find({userid:"1003"},{userid:1,_id:0})
```
