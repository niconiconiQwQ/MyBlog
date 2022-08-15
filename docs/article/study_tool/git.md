---
title: Git 笔记
date: 2022/05/20 09:35 #手动设置最后更新时间
categories: [Git] # 标签
stick: false # 是否置顶
description: Git笔记
keyword: Git
---

# Git 笔记

# 1. 版本控制

## 1.1 文件的版本

- 缺点：
  ① 操作麻烦：每次都需要复制->粘贴->重命名。
  ② 命名不规范：无法通过文件名知道具体做了哪些修改。
  ③ 容易丢失：如果硬盘故障或不小心删除，文件容易丢失。
  ④ 协作困难：需要手动合并每个人对项目文件的修改，合并时极易出错。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/83a5896a8b4445548633c0ee8b4d1d28.png#pic_center)

## 1.2 版本控制

版本控制（Revision control）是一种在开发的过程中用于管理我们对文件、目录或工程等内容的修改历史，方便查看更改历史记录，备份以便恢复以前的版本的软件工程技术。

## 1.3 版本控制软件

- 概念：版本控制软件是一个用来记录文件变化，以便于将来查阅特定版本修订情况的系统，又称：**版本控制系统**。
- 通俗理解：把手工管理文件版本的方式，改为由软件管理文件的版本；这个负责管理文件版本的软件，又叫“版本控制软件”。

## 1.4 使用版本控制软件的好处

- 操作简便：只需识记几组简单的终端命令，即可快速上手常见的版本控制软件
- 易于对比：基于版本控制软件提供的功能，能够方便地比较文件的变化细节，从而查找出导致问题的原因
- 易于回溯：可以将选定的文件回溯到之前的状态，甚至将整个项目都回退到过去某个时间点的状态
- 不易丢失：在版本控制软件中，被用户误删除的文件，可以轻松的恢复回来
- 协作方便：基于版本控制软件提供的分支功能，可以轻松实现多人协作开发时的代码合并操作

## 1.5 版本控制系统的分类

- 本地版本控制系统：单机运行，使维护文件版本的操作工具化
- 集中化的版本控制系统：联网运行，支持多人协作开发;性能差、用户体验不好
- 分布式版本控制系统：联网运行，支持多人协作开发;性能优秀、用户体验好

### 1.5.1 本地版本控制系统

![在这里插入图片描述](https://img-blog.csdnimg.cn/ac1dc40032ae418da6cf2c57ff4e38ab.png#pic_center)

- 特点：使用软件来记录文件的不同版本，提高了工作效率，降低了手动维护版本的出错率
- 缺点：
  ① 单机运行，不支持多人协作开发
  ② 版本数据库故障后，所有历史更新记录会丢失

### 1.5.2 集中化的版本控制系统

![在这里插入图片描述](https://img-blog.csdnimg.cn/819781192f284a25bc1e2097f565b7d9.png#pic_center)

- 特点：基于服务器、客户端的运行模式服务器保存文件的所有更新记录客户端只保留最新的文件版本
- 优点：联网运行，支持多人协作开发
- 缺点：
  ① 不支持离线提交版本更新
  ② 中心服务器崩溃后，所有人无法正常工作
  ③ 版本数据库故障后，所有历史更新记录会丢失
- 典型代表：SVN

### 1.5.3 分布式版本控制系统

![在这里插入图片描述](https://img-blog.csdnimg.cn/29224169e95143daa2ad16149e8f6093.png#pic_center)

- 特点：基于服务器、客户端的运行模式
  服务器保存文件的所有更新版本
  客户端是服务器的完整备份，并不是只保留文件的最新版本
- 优点：
  ① 联网运行，支持多人协作开发
  ② 服务器故障或损坏后，可使用任何一个客户端的备份进行恢复
  ③ 服务器故障或损坏后，可使用任何一个客户端的备份进行恢复
- 典型代表：Git
  > Git 与 SVN 的主要区别
  >
  > - SVN 是集中式版本控制系统，版本库是集中放在中央服务器的，而工作的时候，用的都是自己的电脑，所以首先要从中央服务器得到最新的版本，然后工作，完成工作后，需要把自己做完的活推送到中央服务器。集中式版本控制系统是必须联网才能工作，对网络带宽要求较高。
  > - Git 是分布式版本控制系统，没有中央服务器，每个人的电脑就是一个完整的版本库，工作的时候不需要联网了，因为版本都在自己电脑上。协同的方法是这样的：比如说自己在电脑上改了文件 A，其他人也在电脑上改了文件 A，这时，你们两之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。Git 可以直接看到更新了哪些代码和文件！

# 2. Git 介绍

## 2.1 Git 基本概念

1、什么是 Git：

- Git 是一个开源的分布式版本控制系统，是目前世界上最先进、最流行的版本控制系统。可以快速高效地处理从很小到非常大的项目版本管理。

2、Git 的特性

- Git 之所以快速和高效，主要依赖于它的如下两个特性:
  ① 直接记录快照，而非差异比较
  ② 近乎所有操作都是本地执行

## 2.2 SVN 的差异比较

- 传统的版本控制系统（例如 SVN)是基于差异的版本控制，它们存储的是一组基本文件和每个文件随时间逐步累积的差异。

![在这里插入图片描述](https://img-blog.csdnimg.cn/60e37a108011454082909616eb2831cc.png#pic_center)

- 好处：节省磁盘空间
- 缺点：耗时，效率低。在每次切换版本的时候，都需要在基本文件的基础上，应用每个差异，从而生成目标版本对应的文件。

## 2.3 Git 的记录快照

- Git 快照是在原有文件版本的基础上重新生成一份新的文件，类似于备份。为了效率，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。

![在这里插入图片描述](https://img-blog.csdnimg.cn/a1402cc44a8147899b6f92bf2d4bf191.png#pic_center)

- 缺点:占用磁盘空间较大
- 优点:版本切换时非常快，因为每个版本都是完整的文件快照，切换版本时直接恢复目标版本的快照即可。
- 特点:空间换时间

## 2.4 近乎所有操作都是本地执行

- 在 Git 中的绝大多数操作都只需要访问本地文件和资源，一般不需要来自网络上其它计算机的信息。
- 特性:
  ① 断网后依旧可以在本地对项目进行版本管理
  ② 联网后，把本地修改的记录同步到云端服务器即可

## 2.5 Git 中的三个区域

- 使用 Git 管理的项目，拥有三个区域，分别是工作区、暂存区、Git 仓库。
- 工作区(Working Directory)：处理工作的区域
- 暂存区((Stage/Index))：已完成的工作的临时存放区域，等待被提交
- Git 仓库((Repository 或 Git Directory))：最终的存放区域
  > 远程的 git 仓库(Remote Directory) 是远程的，上面三个是本地的

![在这里插入图片描述](https://img-blog.csdnimg.cn/7552ed6d67e947e7be8ac945f76a242b.jpeg#pic_center)

## 2.6 Git 中的三种状态

- 已修改**modified**：表示修改了文件，但还没将修改的结果放到暂存区
- 已暂存**staged**：表示对已修改文件的当前版本做了标记，使之包含在下次提交的列表中
- 已提交**committed**：表示文件已经安全地保存在本地的 Git 仓库中
- 注意：
  ① 工作区的文件被修改了，但还没有放到暂存区，就是已修改状态。
  ② 如果文件已修改并放入暂存区，就属于已暂存状态。
  ③ 如果 Git 仓库中保存着特定版本的文件，就属于已提交状态。

## 2.7 Git 基本工作流程

- Git 基本工作流程：
  ① 在工作区中修改文件
  ② 将你想要下次提交的更改进行暂存
  ③ 提交更新，找到暂存区的文件，将快照永久性存储到 Git 仓库

![在这里插入图片描述](https://img-blog.csdnimg.cn/5fd994b4bdaa47d2ade268c35eb0000b.png#pic_center)

# 3. Git 安装并配置

## 3.1 下载安装

官网下载：[https://git-scm.com/](https://git-scm.com/)
国内的镜像：[https://npm.taobao.org/mirrors/git-for-windows/](https://npm.taobao.org/mirrors/git-for-windows/)
安装教程：[Git 详细安装教程](https://blog.csdn.net/mukes/article/details/115693833?spm=1001.2014.3001.5506)

## 3.2 配置用户信息

安装完 Git 之后，要做的第一件事就是设置自己的用户名和邮件地址。因为通过 Git 对项目进行版本管理的时候，Git 需要使用这些基本信息，来记录是谁对项目进行了操作

随便找个文件夹右键，点击 Git Bash Here，输入如下命令。

```bash
# 设置自己的用户名
git config --global user.name "xxxxxxx"
# 设置邮件地址
git config --global user.email "xxxxxx@qq.com"
```

注意：如果使用了--global，那么该命令只需要运行一次，即可永久生效

## 3.3 Git 全局配置文件

- 通过`git config --global user.name`和`git config --global user.email` 配置的用户名和邮箱地址，会被写入到 C:/Users/用户名文件夹/.gitconfig 文件中。这个文件是 Git 的全局配置文件，配置一次即可永久生效。
- 可以使用文本编辑器打开此文件，从而查看自己曾经对 Git 做了哪些全局性的配置。

![在这里插入图片描述](https://img-blog.csdnimg.cn/ae98f8075e2244fbaac8f453ede9e30b.png#pic_center)

## 3.4 用命令检查配置信息

除了使用文本编辑器查看全局的配置信息之外，还可以运行如下的终端命令，快速的查看 Git 的全局配置信息:

```bash
# 查看所有的配置文件
git config -l
#查看系统config
git config --list --system
# 查看所有的全局配置项
git config --list --global
# 查看指定的全局配置项
git config --list user.name
git config --list user.email
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/50c0812681954be3a3b481d04a2e4beb.png#pic_center)

## 3.5 获取帮助信息

可以使用`git help <verb>`命令，无需联网即可在浏览器中打开帮助手册，例如:

```bash
# 要想打开 git config 命令的帮助手册
git help config
```

如果不想查看完整的手册，可以使用 -h 获得更简明的“help”输出

```bash
# 想要获取git config 命令的快速参考
git config -h
```

# 4. Git 基本操作

## 4.1 获取 Git 仓库的两种方式

- ① 将尚未进行版本控制的本地目录转换为 Git 仓库
- ② 从其它服务器克隆一个已存在的 Git 仓库

以上两种方式都能在自己电脑上得到一个可用的 Git 仓库

```bash
# 1. 将尚未进行版本控制的本地目录转换为Git仓库 ,即初始化
git init
# 2. 从其它服务器克隆一个已存在的Git仓库 ,例如github上
git git clone git@github.com:niconiconiQwQ/p2.git
```

## 4.2 在现有目录中初始化仓库

- 如果自己有一个尚未进行版本控制的项目目录，想要用 Git 来控制它，需要执行如下两个步骤:
  ① 在项目目录中，通过鼠标右键打开“Git Bash"
  ② 执行`git init`命令将当前的目录转化为 Git 仓库

```bash
git init
```

- `git init`命令会创建一个名为`.git`的隐藏目录，这个.git 目录就是当前项目的 Git 仓库，里面包含了初始的必要文件，这些文件是 Git 仓库的必要组成部分。

![在这里插入图片描述](https://img-blog.csdnimg.cn/5d84360d17e84fae8158907555b5aaf0.png#pic_center)

## 4.3 工作区中文件的四种状态

工作区中的每一个文件可能有 4 种状态，这四种状态共分为两大类，如图所示:
![在这里插入图片描述](https://img-blog.csdnimg.cn/091df398f96c42048bafd69af0f19389.png#pic_center)

① 未跟踪(Untracked)：不被 Git 所管理的文件(如新建的文件)
② 未修改(Unmodified)：工作区中文件的内容和 Git 仓库中文件的内容保持一致
③ 已修改(Modified)：工作区中文件的内容和 Git 仓库中文件的内容不一致
④ 已暂存(Staged)：工作区中被修改的文件已被放到暂存区，准备将修改后的文件保存到 Git 仓库中
Git 操作的终极结果：让工作区中的文件都处于“未修改”的状态

## 4.4 检查文件的状态

可以使用 git status 命令查看文件处于什么状态，例如：

```bash
git status
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ef1bfc903c1c478db18a0e3d44512dc4.png#pic_center)

- 在状态报告中可以看到新建的 index.html 文件出现在 Untracked files(未跟踪的文件）下面。
- 未跟踪的文件意味着 Git 在之前的快照（提交）中没有这些文件;Git 不会自动将之纳入跟踪范围，除非明确地告诉它“我需要使用 Git 跟踪管理该文件”。
- 以精简的方式显示文件状态
  使用`git status`输出的状态报告很详细，但有些繁琐。如果希望以精简的方式显示文件的状态，可以使用如下两条完全等价的命令，其中`-s`是`--short`的简写形式:

```bash
git status -s
git status --short
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/a63b6fcdeb614ff2b6c9aa02d2d5897e.png#pic_center)

前面有红色??的就是未被追踪的文件

## 4.5 跟踪新文件

使用命令`git add` 开始跟踪一个文件。例如，要跟踪 index.html 文件，运行如下的命令即可;

```bash
# git add . 后面是 . 就是追踪当前目录所有文件
git add index.html
```

此时再运行 git status 命令，会看到 index.html 文件在 Changes to be committed 这行的下面，说明已被跟踪，并处于暂存状态:
![在这里插入图片描述](https://img-blog.csdnimg.cn/6b4bcedd70b342a094d1d329800e7558.png#pic_center)

以精简的方式显示文件的状态,新添加到暂存区中的文件前面有绿色的 A 标记

## 4.6 提交更新

现在暂存区中有一个 index.html 文件等待被提交到 Git 仓库中进行保存。可以执行`git commit`命令进行提交，其中`-m `选项后面是本次的提交消息，用来对提交的内容做进一步的描述:

```bash
git commit -m "修改描述"
```

提交成功之后，再次检查文件的状态，得到提示如下:
证明工作区中所有的文件都处于“未修改”的状态，没有任何文件需要被提交。
![在这里插入图片描述](https://img-blog.csdnimg.cn/68b6980c484347f2aa857dd646872ec5.png#pic_center)

## 4.7 对已提交的文件进行修改

目前，index.html 文件已经被 Git 跟踪，并且工作区和 Git 仓库中的 index.html 文件内容保持一致。当我们修改了工作区中 index.html 的内容之后，再次运行 git status 和 git status -s 命令，会看到如下的内容:
![在这里插入图片描述](https://img-blog.csdnimg.cn/a5a06de07c0f4f278d1574e4aa31d25e.png#pic_center)

- 文件 index.html 出现在 Changes not staged for commit 这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区。
- 注意:修改过的、没有放入暂存区的文件前面有红色的 M 标记。

## 4.8 暂存已修改文件

目前，工作区中的 index.html 文件已被修改，如果要暂存这次修改，需要再次运行 git add 命令，这个命令是个多功能的命令，主要有如下 3 个功效:
① 可以用它开始跟踪新文件
② 把已跟踪的、且已修改的文件放到暂存区
③ 把有冲突的文件标记为已解决状态
![在这里插入图片描述](https://img-blog.csdnimg.cn/4ced917d49b747e692da7dfbc498e665.png#pic_center)

## 4.9 提交已暂存的文件

再次运行 git commit -m "提交消息"命令，即可将暂存区中记录的 index.html 的快照，提交到 Git 仓库中进行保存:
![在这里插入图片描述](https://img-blog.csdnimg.cn/57a24a4d1e484098be84f0670c16dbac.png#pic_center)

## 4.10 撤销对文件的修改

```bash
git checkout
```

- 撤销对文件的修改指的是:把对工作区中对应文件的修改，还原成 Git 仓库中所保存的版本。
- 操作的结果:所有的修改会丢失，且无法恢复!危险性比较高，请慎重操作!
- 撤销操作的本质:用 Git 仓库中保存的文件，覆盖工作区中指定的文件。

![在这里插入图片描述](https://img-blog.csdnimg.cn/d7072e5e3ea64291b965217b81c57e56.png#pic_center)

## 4.11 向暂存区添加多个文件

一次性将所有新增和修改过的文件加入暂存区（常用）

```bash
git add .
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/5d4c1447cea7497ba066d24f005869c7.png#pic_center)

## 4.12 移除暂存文件

如果需要从暂存区移除对应的文件，使用`git reset HEAD`

```bash
git reset HEAD 文件名
# 移除所有暂存区文件
git reset HEAD .
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/9cfac74fd66447818e6e016ce926680c.png#pic_center)

## 4.13 跳过使用暂存区

```bash
git commit -a -m "描述信息"
```

- Git 标准的工作流程是工作区 → 暂存区 →Git 仓库，但有时候这么做略显繁琐，此时可以跳过暂存区，直接将工作区中的修改提交到 Git 仓库，这时候 Git 工作的流程简化为了工作区 →Git 仓库。
- Git 提供了一个跳过使用暂存区域的方式，只要在提交的时候，给 git commit 加上-a 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤

![在这里插入图片描述](https://img-blog.csdnimg.cn/6231e7d84ba542aa9f8a6e0859c5cb87.png#pic_center)

## 4.14 删除文件

- 从 Git 仓库中移除文件的方式有两种:
  ① 从 Git 仓库和工作区中同时移除对应的文件
  ② 只从 Git 仓库中移除指定的文件，但保留工作区中对应的文件
- 注意：删除文件的操作**慎用**

```bash
# 从 Git仓库和工作区中同时移除对应的文件
git rm -f index.js
# 只从Git仓库中移除指定的文件，但保留工作区中对应的文件
git rm --cached index.css
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/8c2c8c163a6d4bbe8c48740a82e496f9.png#pic_center)

D 标记为将本次删除了，仓库还在，下次的提交操作将删除仓库的该文件

## 4.15 忽略文件

- 一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。在这种情况下，我们可以创建一个名为`.gitignore`的配置文件，列出要忽略的文件的匹配模式。
- 文件.gitignore 的格式规范如下:
  ① 以`#`开头的是注释
  ② 以 `/` 结尾的是目录
  ③ 以 `/` 开头防止递归
  ④ 以 `!` 开头表示取反
  ⑤ 可以使用 glob 模式进行文件和文件夹的匹配(glob 指简化了的正则表达式)
- 所谓的 glob 模式是指简化了的正则表达式:
  ① 星号`*`匹配零个或多个任意字符
  ② `[abc]`匹配任何一个列在方括号中的字符（此案例匹配一个 a 或匹配一个 b 或匹配一个 c)
  ③ 问号`?`只匹配一个任意字符
  ④ 在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如`[0-9]`表示匹配所有 0 到 9 的数字)
  ⑤ 两个星号`**`表示匹配任意中间目录（比如`a/**/z`可以匹配 a/z、 a/b/z 或 a/b/c/z 等)
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/76afd3f710d04b218f01a86283eedba5.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/d62594b6a67d465a9c0ef3623bb7a663.png#pic_center)

## 4.16 查看提交历史

如果希望回顾项目的提交历史，可以使用`git log`这个简单且有效的命令。
![在这里插入图片描述](https://img-blog.csdnimg.cn/87999fc43f054715bebff59ec7d4a205.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/e71c689b2bc34755bfacdee4ec9834c4.png#pic_center)

git log 信息过多，输入 q 退出

```bash
 git log -2 --pretty=format:"%h | %an | %ar | %s"
#|也可以改成其他间隔符
```

## 4.17 回退指定版本

![在这里插入图片描述](https://img-blog.csdnimg.cn/58831b0e13924dfba56cb23c7fc37c1e.png#pic_center)

处在最新版本用 `git log --pretty=oneline` 查看历史
如果当前处于旧的版本(即已经执行过回退操作)，用 `git reflog --pretty=oneline`查看全部历史

## 4.18 克隆远程仓库

`git clone` 拷贝一个 Git 仓库到本地，让自己能够查看该项目，或者进行修改。

```bash
git clone "地址"
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/e5079a63549840c09b38a1d1ae30ca1e.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/df3b127cfad346f78dbbb5db298a0e02.png#pic_center)

拷贝一个 Git 仓库到本地，让自己能够查看该项目，或者进行修改。

## 4.19 小结

初始化 Git 仓库的命令

```bash
git init
```

查看文件状态的命令

```bash
git status
git status -s
```

一次性将文件加入暂存区的命令

```bash
git add .
```

将暂存区的文件提交到 Git 仓库的命令

```bash
git commit -m"提交消息"
```

> 额外常用命令：
> 1）cd : 改变目录。
> 2）cd . . 回退到上一个目录，直接 cd 进入默认目录
> 3）pwd : 显示当前所在的目录路径。
> 4）ls(ll): 都是列出当前目录中的所有文件，只不过 ll(两个 ll)列出的内容更为详细。
> 5）touch : 新建一个文件 如 touch index.js 就会在当前目录下新建一个 index.js 文件。
> 6）rm: 删除一个文件, rm index.js 就会把 index.js 文件删除。
> 7）mkdir: 新建一个目录,就是新建一个文件夹。
> 8）rm -r : 删除一个文件夹, rm -r src 删除 src 目录
> 9）mv 移动文件, mv index.html src index.html 是我们要移动的文件, src 是目标文件夹,当然, 这样写,必须保证文件和目标文件夹在同一目录下。
> 10）reset 重新初始化终端/清屏。
> 11）clear 清屏。
> 12）history 查看命令历史。
> 13）help 帮助。
> 14）exit 退出。
> 15）#表示注释

# 5. Git 分支

分支在 GIT 中相对较难，分支就是科幻电影里面的平行宇宙，如果两个平行宇宙互不干扰，那对现在的你也没啥影响。不过，在某个时间点，两个平行宇宙合并了，我们就需要处理一些问题了！

## 5.1 分支在实际开发中的作用

在进行多人协作开发的时候，为了防止互相干扰，提高协同开发的体验，建议每个开发者都基于分支进行项目功能的开发，例如:
![在这里插入图片描述](https://img-blog.csdnimg.cn/14d52cbdb98f422599f8b80626afdfe4.png#pic_center)

## 5.2 master 主分支

- 在初始化本地 Git 仓库的时候，Git 默认已经帮我们创建了一个名字叫做 master 的分支。通常我们把这个 master 分支叫做主分支。 -在实际工作中，master 主分支的作用是:用来保存和记录整个项目已完成的功能代码。
- 因此，不允许程序员直接在 master 分支上修改代码，因为这样做的风险太高，容易导致整个项目崩溃。

## 5.3 功能分支

- 由于程序员不能直接在 master 分支上进行功能的开发，所以就有了功能分支的概念。
- 功能分支指的是专门用来开发新功能的分支，它是临时从 master 主分支上分叉出来的，当新功能开发且测试完毕后，最终需要合并到 master 主分支上

## 5.4 查看分支列表

```bash
git branch
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/de215f3789de4beb9b2fc2eba5c0eb80.png#pic_center)

分支名前面的\*号表示当前所处的分支，master 是主分支

## 5.5 创建新分支

使用`git branch`命令，可以基于当前分支，创建一个新的分支，此时，新分支中的代码和当前分支完全一样:

```bash
git branch 分支名
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/d9c449c44add4cb890fe4f45bca7f871.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/5fd56e9ceaee4a178cc097d189c45722.png#pic_center)

## 5.6 切换分支

使用 git checkout 命令，可以切换到指定的分支上进行开发

```bash
git checkout login
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/09c6a2fe4d2045e9b7a6094fea95508f.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/dca8955743df4a1480dc21268553b6fd.png#pic_center)

## 5.7 分支的快速创建和切换

使用 `git checkout -b` 命令，可以创建指定名称的新分支，并立即切换到新分支上:

```bash
git checkout -b 分支名
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/60b55da56e9243dfa85b8557b88698ae.png#pic_center)

## 5.8 合并分支

功能分支的代码开发测试完毕之后，可以使用如下的命令，将完成后的代码合并到 master 主分支上:

```bash
# 1. 先切换到master分支上
git checkout master
# 2. 再执行合并
git merge 分支名
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/d79c2ebf4c1440b5b4597e5b409bd266.png#pic_center)

在分支上所做的操作可以看到目录里的内容确实有改变，在切换回主分支时，可以看到目录里的内容又变成主分支的内容，只有合并分支，才会把分支的改动合并入主分支
![在这里插入图片描述](https://img-blog.csdnimg.cn/bc3f7fd86ebc4472bde08416d1f3ddcc.png#pic_center)

## 5.9 删除分支

当把功能分支的代码合并到 master 主分支上以后，就可以使用如下的命令，删除对应的功能分支:

```bash
git branch -d 分支名
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/1cb7c8c88eb84b5a8a39973bd7fb09e0.png#pic_center)

在删除某分支时，不能处于此分支，要切换到其他分支去删除它

## 5.10 遇到冲突时的分支合并

如果在两个不同的分支中，对同一个文件进行了不同的修改，Git 就没法干净的合并它们。此时，我们需要打开这些包含冲突的文件然后手动解决冲突。

```bash
# 假设:在把reg分支合并到master分支期间，代码发生了冲突
git checkout master
git merge red
# 打开包含冲突的文件，手动解决冲突之后，再执行如下的命令
git add .
git commit -m "解决了分支合并冲突的问题"
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/461feab369644f0cb1f8eb84f8edae14.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/96cb958df70d408ca8f61a78acacf6d8.png#pic_center)

## 5.11 将本地分支推送到远程仓库

如果是第一次将本地分支推送到远程仓库，需要运行如下的命令:

```bash
#-u表示把本地分支和远程分支进行关联，只在第一次推送的时候需要带-u参数
git push -u 远程仓库的别名 本地分支名称:远程分支名称
# 实际案例:
git push -u origin payment:pay
#如果希望远程分支的名称和本地分支名称保持一致，可以对命令进行简化:
git push -u origin payment
```

注意:第一次推送分支需要带`-u`参数(因为远程还没有此分支)，此后可以直接使用`git push`推送代码到远程分支。
![在这里插入图片描述](https://img-blog.csdnimg.cn/96da8e0e709347beb0cb517641d6fc52.png#pic_center)

## 5.12 查看远程仓库分支列表

```bash
git remote show 远程仓库名
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/5cd567f717ac40deb2fa02f5c975a732.png#pic_center)

## 5.13 跟踪分支

跟踪分支指的是:从远程仓库中，把远程分支下载到本地仓库中。需要运行的命令如下:

```bash
#从远程仓库中，把对应的远程分支下载到本地仓库，保持本地分支和远程分支名称相同git checkout 远程分支的名称
#示例:
git checkout blue
# 从远程仓库中，把对应的远程分支下载到本地仓库，并把下载的本地分支进行重命名
git checkout -b 本地分支名称 远程仓库名称/远程分支名称
#示例:
git checkout -b skyblue origin/blue
```

示例一：
![在这里插入图片描述](https://img-blog.csdnimg.cn/610e808aa53044f8a22716cd133bb34d.png#pic_center)

示例二：
![在这里插入图片描述](https://img-blog.csdnimg.cn/82435a6da0624c8eb992786db72facd3.png#pic_center)

## 4.14 拉取远程分支最新代码

可以使用如下的命令，把远程分支最新的代码下载到本地对应的分支中:

```bash
git pull <远程主机名> <远程分支名>:<本地分支名>
# 比如，取回origin主机的next分支，与本地的master分支合并
git pull origin next:master
# 如果远程分支是与当前分支合并，则冒号后面的部分可以省略。
git pull origin next
```

## 5.15 删除远程分支

```bash
# 删除远程仓库中，指定名称的远程分支
git push 远程仓库名称 --delete 远程分支名称
# 示例：
git push origin --delete blue
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ec10efa9f1f142f1b4133ee5277b7699.png#pic_center)

# 6. 开源

## 6.1 什么是开源

![在这里插入图片描述](https://img-blog.csdnimg.cn/0d2391bcff20431e90f9900f070dfb84.png#pic_center)

开源不仅提供程序，还提供程序的源代码
闭源只提供程序，不提供源代码

## 6.2 开源许可协议

开源并不意味着完全没有限制，为了限制使用者的使用范围和保护作者的权利，每个开源项目都应该遵守开源许可协议（ Open Source License ) 。

常见的五种开源协议：
① BSD ( Berkeley Software Distribution)
② Apache Licence 2.0
③ **GPL** (GNu General Public License)

- 具有传染性的一种开源协议，不允许修改后和衍生的代码做为闭源的商业软件发布和销售
- 使用 GPL 的最著名的软件项目是:Linux

④ LGPL (GNU Lesser General Public License)
⑤ **MIT** ( Massachusetts Institute of Technology, MIT)

- 是目前限制最少的协议，唯一的条件:在修改后的代码或者发行包中，必须包含原作者的许可信息
- 使用 MIT 的软件项目有:jquery、Node.js

## 6.3 开源项目托管平台

专门用于免费存放开源项目源代码的网站，叫做开源项目托管平台。目前世界上比较出名的开源项目托管平台主要有以下 3 个:

- ① Github（全球最牛的开源项目托管平台，没有之一)
- ② Gitlab(对代码私有性支持较好，因此企业用户较多)
- ③ Gitee (又叫做码云，是国产的开源项目托管平台。访问速度快、纯中文界面、使用友好)

注意:以上 3 个开源项目托管平台，只能托管以 Git 管理的项目源代码，因此，它们的名字都以 Git 开头。

# 7. github

## 7.1 创建仓库

![在这里插入图片描述](https://img-blog.csdnimg.cn/60f6f3a914e84010869c533b7f9d57fb.png#pic_center)

## 7.2 远程仓库两种访问方式

- Github 上的远程仓库，有两种访问方式，分别是 HTTPS 和 SSH。它们的区别是:
  ① HTTPS:零配置;但是每次访问仓库时，需要重复输入 Github 的账号和密码才能访问成功
  ② SSH:需要进行额外的配置;但是配置成功后，每次访问仓库时，不需重复输入 Github 的账号和密码
- 注意:在实际开发中，推荐使用 SSH 的方式访问远程仓库。

![在这里插入图片描述](https://img-blog.csdnimg.cn/ee2472632d9a4e84893c8c912351b0d9.png#pic_center)

## 7.3 基于 HTTPS 将本地仓库上传到 github

![在这里插入图片描述](https://img-blog.csdnimg.cn/c3619e5cf3aa4555bc2595355df8ee05.png#pic_center)

https 每次都要输账号密码
![在这里插入图片描述](https://img-blog.csdnimg.cn/eccb03d988dc441990071cb261cb91bc.png#pic_center)

上传完，仓库是这样的
![在这里插入图片描述](https://img-blog.csdnimg.cn/da966cd624c347be91beb58f16672028.png#pic_center)

## 7.4 SSH key

- sSH key 的作用:实现本地仓库和 Github 之间免登录的加密数据传输。
- SSH key 的好处:免登录身份认证、数据加密传输。
- SSH key 由两部分组成，分别是:
  ① id_rsa(私钥文件，存放于客户端的电脑中即可)
  ② id_rsa.pub(公钥文件，需要配置到 Github 中)

### 7.4.1 生成 SSH key

① 在任意目录打开 Git Bash
② 粘贴如下的命令，并将your_email@example.com替换为注册 Github 账号时填写的邮箱:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

③ 连续敲击 3 次回车，即可在 C:\Users\用户名文件夹\.ssh 目录中生成 id_rsa 和 id_rsa.pub 两个文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/4e8d4be0abd84f7fba628f4832afb1ad.png#pic_center)

### 7.4.2 配置 SSH key

① 使用记事本打开 id_rsa.pub 文件，复制里面的文本内容
② 在浏览器中登录 Github，点击头像->Settings -> SSH and GPG Keys -> New SSH key
③ 将 id_rsa.pub 文件中的内容，粘贴到 Key 对应的文本框中
④ 在 Title 文本框中任意填写一个名称，来标识这个 Key 从何而来
![在这里插入图片描述](https://img-blog.csdnimg.cn/395f235770ed48d582b43c419647133d.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/32a1146b077b45ed82665962af9726a7.png#pic_center)

- 检测 github 的 SSH key 是否配置成功
  打开 git Bash，输入

```bash
ssh -T git@github.com
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/a95260ebbfcf46478ead69b6be79317d.png#pic_center)

## 7.5 基于 SSH 将本地仓库上传到 github

![在这里插入图片描述](https://img-blog.csdnimg.cn/089879bbd2664b7e93d9a9c77da4cba1.png#pic_center)

## 7.6 克隆 github 仓库

![在这里插入图片描述](https://img-blog.csdnimg.cn/56446ba674954aa185c7d718fbc75891.png#pic_center)

```bash
git clone git@github.com:niconiconiQwQ/p2.git
```

# 思维导图

![在这里插入图片描述](https://img-blog.csdnimg.cn/6465bd13c2a64eedb003416b5c7f04bc.png#pic_center)

> @[toc]

# 1. 版本控制

## 1.1 文件的版本

- 缺点：
  ① 操作麻烦：每次都需要复制->粘贴->重命名。
  ② 命名不规范：无法通过文件名知道具体做了哪些修改。
  ③ 容易丢失：如果硬盘故障或不小心删除，文件容易丢失。
  ④ 协作困难：需要手动合并每个人对项目文件的修改，合并时极易出错。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/83a5896a8b4445548633c0ee8b4d1d28.png#pic_center)

## 1.2 版本控制

版本控制（Revision control）是一种在开发的过程中用于管理我们对文件、目录或工程等内容的修改历史，方便查看更改历史记录，备份以便恢复以前的版本的软件工程技术。

## 1.3 版本控制软件

- 概念：版本控制软件是一个用来记录文件变化，以便于将来查阅特定版本修订情况的系统，又称：**版本控制系统**。
- 通俗理解：把手工管理文件版本的方式，改为由软件管理文件的版本；这个负责管理文件版本的软件，又叫“版本控制软件”。

## 1.4 使用版本控制软件的好处

- 操作简便：只需识记几组简单的终端命令，即可快速上手常见的版本控制软件
- 易于对比：基于版本控制软件提供的功能，能够方便地比较文件的变化细节，从而查找出导致问题的原因
- 易于回溯：可以将选定的文件回溯到之前的状态，甚至将整个项目都回退到过去某个时间点的状态
- 不易丢失：在版本控制软件中，被用户误删除的文件，可以轻松的恢复回来
- 协作方便：基于版本控制软件提供的分支功能，可以轻松实现多人协作开发时的代码合并操作

## 1.5 版本控制系统的分类

- 本地版本控制系统：单机运行，使维护文件版本的操作工具化
- 集中化的版本控制系统：联网运行，支持多人协作开发;性能差、用户体验不好
- 分布式版本控制系统：联网运行，支持多人协作开发;性能优秀、用户体验好

### 1.5.1 本地版本控制系统

![在这里插入图片描述](https://img-blog.csdnimg.cn/ac1dc40032ae418da6cf2c57ff4e38ab.png#pic_center)

- 特点：使用软件来记录文件的不同版本，提高了工作效率，降低了手动维护版本的出错率
- 缺点：
  ① 单机运行，不支持多人协作开发
  ② 版本数据库故障后，所有历史更新记录会丢失

### 1.5.2 集中化的版本控制系统

![在这里插入图片描述](https://img-blog.csdnimg.cn/819781192f284a25bc1e2097f565b7d9.png#pic_center)

- 特点：基于服务器、客户端的运行模式服务器保存文件的所有更新记录客户端只保留最新的文件版本
- 优点：联网运行，支持多人协作开发
- 缺点：
  ① 不支持离线提交版本更新
  ② 中心服务器崩溃后，所有人无法正常工作
  ③ 版本数据库故障后，所有历史更新记录会丢失
- 典型代表：SVN

### 1.5.3 分布式版本控制系统

![在这里插入图片描述](https://img-blog.csdnimg.cn/29224169e95143daa2ad16149e8f6093.png#pic_center)

- 特点：基于服务器、客户端的运行模式
  服务器保存文件的所有更新版本
  客户端是服务器的完整备份，并不是只保留文件的最新版本
- 优点：
  ① 联网运行，支持多人协作开发
  ② 服务器故障或损坏后，可使用任何一个客户端的备份进行恢复
  ③ 服务器故障或损坏后，可使用任何一个客户端的备份进行恢复
- 典型代表：Git
  > Git 与 SVN 的主要区别
  >
  > - SVN 是集中式版本控制系统，版本库是集中放在中央服务器的，而工作的时候，用的都是自己的电脑，所以首先要从中央服务器得到最新的版本，然后工作，完成工作后，需要把自己做完的活推送到中央服务器。集中式版本控制系统是必须联网才能工作，对网络带宽要求较高。
  > - Git 是分布式版本控制系统，没有中央服务器，每个人的电脑就是一个完整的版本库，工作的时候不需要联网了，因为版本都在自己电脑上。协同的方法是这样的：比如说自己在电脑上改了文件 A，其他人也在电脑上改了文件 A，这时，你们两之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。Git 可以直接看到更新了哪些代码和文件！

# 2. Git 介绍

## 2.1 Git 基本概念

1、什么是 Git：

- Git 是一个开源的分布式版本控制系统，是目前世界上最先进、最流行的版本控制系统。可以快速高效地处理从很小到非常大的项目版本管理。

2、Git 的特性

- Git 之所以快速和高效，主要依赖于它的如下两个特性:
  ① 直接记录快照，而非差异比较
  ② 近乎所有操作都是本地执行

## 2.2 SVN 的差异比较

- 传统的版本控制系统（例如 SVN)是基于差异的版本控制，它们存储的是一组基本文件和每个文件随时间逐步累积的差异。

![在这里插入图片描述](https://img-blog.csdnimg.cn/60e37a108011454082909616eb2831cc.png#pic_center)

- 好处：节省磁盘空间
- 缺点：耗时，效率低。在每次切换版本的时候，都需要在基本文件的基础上，应用每个差异，从而生成目标版本对应的文件。

## 2.3 Git 的记录快照

- Git 快照是在原有文件版本的基础上重新生成一份新的文件，类似于备份。为了效率，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。

![在这里插入图片描述](https://img-blog.csdnimg.cn/a1402cc44a8147899b6f92bf2d4bf191.png#pic_center)

- 缺点:占用磁盘空间较大
- 优点:版本切换时非常快，因为每个版本都是完整的文件快照，切换版本时直接恢复目标版本的快照即可。
- 特点:空间换时间

## 2.4 近乎所有操作都是本地执行

- 在 Git 中的绝大多数操作都只需要访问本地文件和资源，一般不需要来自网络上其它计算机的信息。
- 特性:
  ① 断网后依旧可以在本地对项目进行版本管理
  ② 联网后，把本地修改的记录同步到云端服务器即可

## 2.5 Git 中的三个区域

- 使用 Git 管理的项目，拥有三个区域，分别是工作区、暂存区、Git 仓库。
- 工作区(Working Directory)：处理工作的区域
- 暂存区((Stage/Index))：已完成的工作的临时存放区域，等待被提交
- Git 仓库((Repository 或 Git Directory))：最终的存放区域
  > 远程的 git 仓库(Remote Directory) 是远程的，上面三个是本地的

![在这里插入图片描述](https://img-blog.csdnimg.cn/7552ed6d67e947e7be8ac945f76a242b.jpeg#pic_center)

## 2.6 Git 中的三种状态

- 已修改**modified**：表示修改了文件，但还没将修改的结果放到暂存区
- 已暂存**staged**：表示对已修改文件的当前版本做了标记，使之包含在下次提交的列表中
- 已提交**committed**：表示文件已经安全地保存在本地的 Git 仓库中
- 注意：
  ① 工作区的文件被修改了，但还没有放到暂存区，就是已修改状态。
  ② 如果文件已修改并放入暂存区，就属于已暂存状态。
  ③ 如果 Git 仓库中保存着特定版本的文件，就属于已提交状态。

## 2.7 Git 基本工作流程

- Git 基本工作流程：
  ① 在工作区中修改文件
  ② 将你想要下次提交的更改进行暂存
  ③ 提交更新，找到暂存区的文件，将快照永久性存储到 Git 仓库

![在这里插入图片描述](https://img-blog.csdnimg.cn/5fd994b4bdaa47d2ade268c35eb0000b.png#pic_center)

# 3. Git 安装并配置

## 3.1 下载安装

官网下载：[https://git-scm.com/](https://git-scm.com/)
国内的镜像：[https://npm.taobao.org/mirrors/git-for-windows/](https://npm.taobao.org/mirrors/git-for-windows/)
安装教程：[Git 详细安装教程](https://blog.csdn.net/mukes/article/details/115693833?spm=1001.2014.3001.5506)

## 3.2 配置用户信息

安装完 Git 之后，要做的第一件事就是设置自己的用户名和邮件地址。因为通过 Git 对项目进行版本管理的时候，Git 需要使用这些基本信息，来记录是谁对项目进行了操作

随便找个文件夹右键，点击 Git Bash Here，输入如下命令。

```bash
# 设置自己的用户名
git config --global user.name "xxxxxxx"
# 设置邮件地址
git config --global user.email "xxxxxx@qq.com"
```

注意：如果使用了--global，那么该命令只需要运行一次，即可永久生效

## 3.3 Git 全局配置文件

- 通过`git config --global user.name`和`git config --global user.email` 配置的用户名和邮箱地址，会被写入到 C:/Users/用户名文件夹/.gitconfig 文件中。这个文件是 Git 的全局配置文件，配置一次即可永久生效。
- 可以使用文本编辑器打开此文件，从而查看自己曾经对 Git 做了哪些全局性的配置。

![在这里插入图片描述](https://img-blog.csdnimg.cn/ae98f8075e2244fbaac8f453ede9e30b.png#pic_center)

## 3.4 用命令检查配置信息

除了使用文本编辑器查看全局的配置信息之外，还可以运行如下的终端命令，快速的查看 Git 的全局配置信息:

```bash
# 查看所有的配置文件
git config -l
#查看系统config
git config --list --system
# 查看所有的全局配置项
git config --list --global
# 查看指定的全局配置项
git config --list user.name
git config --list user.email
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/50c0812681954be3a3b481d04a2e4beb.png#pic_center)

## 3.5 获取帮助信息

可以使用`git help <verb>`命令，无需联网即可在浏览器中打开帮助手册，例如:

```bash
# 要想打开 git config 命令的帮助手册
git help config
```

如果不想查看完整的手册，可以使用 -h 获得更简明的“help”输出

```bash
# 想要获取git config 命令的快速参考
git config -h
```

# 4. Git 基本操作

## 4.1 获取 Git 仓库的两种方式

- ① 将尚未进行版本控制的本地目录转换为 Git 仓库
- ② 从其它服务器克隆一个已存在的 Git 仓库

以上两种方式都能在自己电脑上得到一个可用的 Git 仓库

```bash
# 1. 将尚未进行版本控制的本地目录转换为Git仓库 ,即初始化
git init
# 2. 从其它服务器克隆一个已存在的Git仓库 ,例如github上
git git clone git@github.com:niconiconiQwQ/p2.git
```

## 4.2 在现有目录中初始化仓库

- 如果自己有一个尚未进行版本控制的项目目录，想要用 Git 来控制它，需要执行如下两个步骤:
  ① 在项目目录中，通过鼠标右键打开“Git Bash"
  ② 执行`git init`命令将当前的目录转化为 Git 仓库

```bash
git init
```

- `git init`命令会创建一个名为`.git`的隐藏目录，这个.git 目录就是当前项目的 Git 仓库，里面包含了初始的必要文件，这些文件是 Git 仓库的必要组成部分。

![在这里插入图片描述](https://img-blog.csdnimg.cn/5d84360d17e84fae8158907555b5aaf0.png#pic_center)

## 4.3 工作区中文件的四种状态

工作区中的每一个文件可能有 4 种状态，这四种状态共分为两大类，如图所示:
![在这里插入图片描述](https://img-blog.csdnimg.cn/091df398f96c42048bafd69af0f19389.png#pic_center)

① 未跟踪(Untracked)：不被 Git 所管理的文件(如新建的文件)
② 未修改(Unmodified)：工作区中文件的内容和 Git 仓库中文件的内容保持一致
③ 已修改(Modified)：工作区中文件的内容和 Git 仓库中文件的内容不一致
④ 已暂存(Staged)：工作区中被修改的文件已被放到暂存区，准备将修改后的文件保存到 Git 仓库中
Git 操作的终极结果：让工作区中的文件都处于“未修改”的状态

## 4.4 检查文件的状态

可以使用 git status 命令查看文件处于什么状态，例如：

```bash
git status
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ef1bfc903c1c478db18a0e3d44512dc4.png#pic_center)

- 在状态报告中可以看到新建的 index.html 文件出现在 Untracked files(未跟踪的文件）下面。
- 未跟踪的文件意味着 Git 在之前的快照（提交）中没有这些文件;Git 不会自动将之纳入跟踪范围，除非明确地告诉它“我需要使用 Git 跟踪管理该文件”。
- 以精简的方式显示文件状态
  使用`git status`输出的状态报告很详细，但有些繁琐。如果希望以精简的方式显示文件的状态，可以使用如下两条完全等价的命令，其中`-s`是`--short`的简写形式:

```bash
git status -s
git status --short
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/a63b6fcdeb614ff2b6c9aa02d2d5897e.png#pic_center)

前面有红色??的就是未被追踪的文件

## 4.5 跟踪新文件

使用命令`git add` 开始跟踪一个文件。例如，要跟踪 index.html 文件，运行如下的命令即可;

```bash
# git add . 后面是 . 就是追踪当前目录所有文件
git add index.html
```

此时再运行 git status 命令，会看到 index.html 文件在 Changes to be committed 这行的下面，说明已被跟踪，并处于暂存状态:
![在这里插入图片描述](https://img-blog.csdnimg.cn/6b4bcedd70b342a094d1d329800e7558.png#pic_center)

以精简的方式显示文件的状态,新添加到暂存区中的文件前面有绿色的 A 标记

## 4.6 提交更新

现在暂存区中有一个 index.html 文件等待被提交到 Git 仓库中进行保存。可以执行`git commit`命令进行提交，其中`-m `选项后面是本次的提交消息，用来对提交的内容做进一步的描述:

```bash
git commit -m "修改描述"
```

提交成功之后，再次检查文件的状态，得到提示如下:
证明工作区中所有的文件都处于“未修改”的状态，没有任何文件需要被提交。
![在这里插入图片描述](https://img-blog.csdnimg.cn/68b6980c484347f2aa857dd646872ec5.png#pic_center)

## 4.7 对已提交的文件进行修改

目前，index.html 文件已经被 Git 跟踪，并且工作区和 Git 仓库中的 index.html 文件内容保持一致。当我们修改了工作区中 index.html 的内容之后，再次运行 git status 和 git status -s 命令，会看到如下的内容:
![在这里插入图片描述](https://img-blog.csdnimg.cn/a5a06de07c0f4f278d1574e4aa31d25e.png#pic_center)

- 文件 index.html 出现在 Changes not staged for commit 这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区。
- 注意:修改过的、没有放入暂存区的文件前面有红色的 M 标记。

## 4.8 暂存已修改文件

目前，工作区中的 index.html 文件已被修改，如果要暂存这次修改，需要再次运行 git add 命令，这个命令是个多功能的命令，主要有如下 3 个功效:
① 可以用它开始跟踪新文件
② 把已跟踪的、且已修改的文件放到暂存区
③ 把有冲突的文件标记为已解决状态
![在这里插入图片描述](https://img-blog.csdnimg.cn/4ced917d49b747e692da7dfbc498e665.png#pic_center)

## 4.9 提交已暂存的文件

再次运行 git commit -m "提交消息"命令，即可将暂存区中记录的 index.html 的快照，提交到 Git 仓库中进行保存:
![在这里插入图片描述](https://img-blog.csdnimg.cn/57a24a4d1e484098be84f0670c16dbac.png#pic_center)

## 4.10 撤销对文件的修改

```bash
git checkout
```

- 撤销对文件的修改指的是:把对工作区中对应文件的修改，还原成 Git 仓库中所保存的版本。
- 操作的结果:所有的修改会丢失，且无法恢复!危险性比较高，请慎重操作!
- 撤销操作的本质:用 Git 仓库中保存的文件，覆盖工作区中指定的文件。

![在这里插入图片描述](https://img-blog.csdnimg.cn/d7072e5e3ea64291b965217b81c57e56.png#pic_center)

## 4.11 向暂存区添加多个文件

一次性将所有新增和修改过的文件加入暂存区（常用）

```bash
git add .
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/5d4c1447cea7497ba066d24f005869c7.png#pic_center)

## 4.12 移除暂存文件

如果需要从暂存区移除对应的文件，使用`git reset HEAD`

```bash
git reset HEAD 文件名
# 移除所有暂存区文件
git reset HEAD .
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/9cfac74fd66447818e6e016ce926680c.png#pic_center)

## 4.13 跳过使用暂存区

```bash
git commit -a -m "描述信息"
```

- Git 标准的工作流程是工作区 → 暂存区 →Git 仓库，但有时候这么做略显繁琐，此时可以跳过暂存区，直接将工作区中的修改提交到 Git 仓库，这时候 Git 工作的流程简化为了工作区 →Git 仓库。
- Git 提供了一个跳过使用暂存区域的方式，只要在提交的时候，给 git commit 加上-a 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤

![在这里插入图片描述](https://img-blog.csdnimg.cn/6231e7d84ba542aa9f8a6e0859c5cb87.png#pic_center)

## 4.14 删除文件

- 从 Git 仓库中移除文件的方式有两种:
  ① 从 Git 仓库和工作区中同时移除对应的文件
  ② 只从 Git 仓库中移除指定的文件，但保留工作区中对应的文件
- 注意：删除文件的操作**慎用**

```bash
# 从 Git仓库和工作区中同时移除对应的文件
git rm -f index.js
# 只从Git仓库中移除指定的文件，但保留工作区中对应的文件
git rm --cached index.css
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/8c2c8c163a6d4bbe8c48740a82e496f9.png#pic_center)

D 标记为将本次删除了，仓库还在，下次的提交操作将删除仓库的该文件

## 4.15 忽略文件

- 一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。在这种情况下，我们可以创建一个名为`.gitignore`的配置文件，列出要忽略的文件的匹配模式。
- 文件.gitignore 的格式规范如下:
  ① 以`#`开头的是注释
  ② 以 `/` 结尾的是目录
  ③ 以 `/` 开头防止递归
  ④ 以 `!` 开头表示取反
  ⑤ 可以使用 glob 模式进行文件和文件夹的匹配(glob 指简化了的正则表达式)
- 所谓的 glob 模式是指简化了的正则表达式:
  ① 星号`*`匹配零个或多个任意字符
  ② `[abc]`匹配任何一个列在方括号中的字符（此案例匹配一个 a 或匹配一个 b 或匹配一个 c)
  ③ 问号`?`只匹配一个任意字符
  ④ 在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如`[0-9]`表示匹配所有 0 到 9 的数字)
  ⑤ 两个星号`**`表示匹配任意中间目录（比如`a/**/z`可以匹配 a/z、 a/b/z 或 a/b/c/z 等)
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/76afd3f710d04b218f01a86283eedba5.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/d62594b6a67d465a9c0ef3623bb7a663.png#pic_center)

## 4.16 查看提交历史

如果希望回顾项目的提交历史，可以使用`git log`这个简单且有效的命令。
![在这里插入图片描述](https://img-blog.csdnimg.cn/87999fc43f054715bebff59ec7d4a205.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/e71c689b2bc34755bfacdee4ec9834c4.png#pic_center)

git log 信息过多，输入 q 退出

```bash
 git log -2 --pretty=format:"%h | %an | %ar | %s"
#|也可以改成其他间隔符
```

## 4.17 回退指定版本

![在这里插入图片描述](https://img-blog.csdnimg.cn/58831b0e13924dfba56cb23c7fc37c1e.png#pic_center)

处在最新版本用 `git log --pretty=oneline` 查看历史
如果当前处于旧的版本(即已经执行过回退操作)，用 `git reflog --pretty=oneline`查看全部历史

## 4.18 克隆远程仓库

`git clone` 拷贝一个 Git 仓库到本地，让自己能够查看该项目，或者进行修改。

```bash
git clone "地址"
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/e5079a63549840c09b38a1d1ae30ca1e.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/df3b127cfad346f78dbbb5db298a0e02.png#pic_center)

拷贝一个 Git 仓库到本地，让自己能够查看该项目，或者进行修改。

## 4.19 小结

初始化 Git 仓库的命令

```bash
git init
```

查看文件状态的命令

```bash
git status
git status -s
```

一次性将文件加入暂存区的命令

```bash
git add .
```

将暂存区的文件提交到 Git 仓库的命令

```bash
git commit -m"提交消息"
```

> 额外常用命令：
> 1）cd : 改变目录。
> 2）cd . . 回退到上一个目录，直接 cd 进入默认目录
> 3）pwd : 显示当前所在的目录路径。
> 4）ls(ll): 都是列出当前目录中的所有文件，只不过 ll(两个 ll)列出的内容更为详细。
> 5）touch : 新建一个文件 如 touch index.js 就会在当前目录下新建一个 index.js 文件。
> 6）rm: 删除一个文件, rm index.js 就会把 index.js 文件删除。
> 7）mkdir: 新建一个目录,就是新建一个文件夹。
> 8）rm -r : 删除一个文件夹, rm -r src 删除 src 目录
> 9）mv 移动文件, mv index.html src index.html 是我们要移动的文件, src 是目标文件夹,当然, 这样写,必须保证文件和目标文件夹在同一目录下。
> 10）reset 重新初始化终端/清屏。
> 11）clear 清屏。
> 12）history 查看命令历史。
> 13）help 帮助。
> 14）exit 退出。
> 15）#表示注释

# 5. Git 分支

分支在 GIT 中相对较难，分支就是科幻电影里面的平行宇宙，如果两个平行宇宙互不干扰，那对现在的你也没啥影响。不过，在某个时间点，两个平行宇宙合并了，我们就需要处理一些问题了！

## 5.1 分支在实际开发中的作用

在进行多人协作开发的时候，为了防止互相干扰，提高协同开发的体验，建议每个开发者都基于分支进行项目功能的开发，例如:
![在这里插入图片描述](https://img-blog.csdnimg.cn/14d52cbdb98f422599f8b80626afdfe4.png#pic_center)

## 5.2 master 主分支

- 在初始化本地 Git 仓库的时候，Git 默认已经帮我们创建了一个名字叫做 master 的分支。通常我们把这个 master 分支叫做主分支。 -在实际工作中，master 主分支的作用是:用来保存和记录整个项目已完成的功能代码。
- 因此，不允许程序员直接在 master 分支上修改代码，因为这样做的风险太高，容易导致整个项目崩溃。

## 5.3 功能分支

- 由于程序员不能直接在 master 分支上进行功能的开发，所以就有了功能分支的概念。
- 功能分支指的是专门用来开发新功能的分支，它是临时从 master 主分支上分叉出来的，当新功能开发且测试完毕后，最终需要合并到 master 主分支上

## 5.4 查看分支列表

```bash
git branch
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/de215f3789de4beb9b2fc2eba5c0eb80.png#pic_center)

分支名前面的\*号表示当前所处的分支，master 是主分支

## 5.5 创建新分支

使用`git branch`命令，可以基于当前分支，创建一个新的分支，此时，新分支中的代码和当前分支完全一样:

```bash
git branch 分支名
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/d9c449c44add4cb890fe4f45bca7f871.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/5fd56e9ceaee4a178cc097d189c45722.png#pic_center)

## 5.6 切换分支

使用 git checkout 命令，可以切换到指定的分支上进行开发

```bash
git checkout login
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/09c6a2fe4d2045e9b7a6094fea95508f.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/dca8955743df4a1480dc21268553b6fd.png#pic_center)

## 5.7 分支的快速创建和切换

使用 `git checkout -b` 命令，可以创建指定名称的新分支，并立即切换到新分支上:

```bash
git checkout -b 分支名
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/60b55da56e9243dfa85b8557b88698ae.png#pic_center)

## 5.8 合并分支

功能分支的代码开发测试完毕之后，可以使用如下的命令，将完成后的代码合并到 master 主分支上:

```bash
# 1. 先切换到master分支上
git checkout master
# 2. 再执行合并
git merge 分支名
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/d79c2ebf4c1440b5b4597e5b409bd266.png#pic_center)

在分支上所做的操作可以看到目录里的内容确实有改变，在切换回主分支时，可以看到目录里的内容又变成主分支的内容，只有合并分支，才会把分支的改动合并入主分支
![在这里插入图片描述](https://img-blog.csdnimg.cn/bc3f7fd86ebc4472bde08416d1f3ddcc.png#pic_center)

## 5.9 删除分支

当把功能分支的代码合并到 master 主分支上以后，就可以使用如下的命令，删除对应的功能分支:

```bash
git branch -d 分支名
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/1cb7c8c88eb84b5a8a39973bd7fb09e0.png#pic_center)

在删除某分支时，不能处于此分支，要切换到其他分支去删除它

## 5.10 遇到冲突时的分支合并

如果在两个不同的分支中，对同一个文件进行了不同的修改，Git 就没法干净的合并它们。此时，我们需要打开这些包含冲突的文件然后手动解决冲突。

```bash
# 假设:在把reg分支合并到master分支期间，代码发生了冲突
git checkout master
git merge red
# 打开包含冲突的文件，手动解决冲突之后，再执行如下的命令
git add .
git commit -m "解决了分支合并冲突的问题"
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/461feab369644f0cb1f8eb84f8edae14.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/96cb958df70d408ca8f61a78acacf6d8.png#pic_center)

## 5.11 将本地分支推送到远程仓库

如果是第一次将本地分支推送到远程仓库，需要运行如下的命令:

```bash
#-u表示把本地分支和远程分支进行关联，只在第一次推送的时候需要带-u参数
git push -u 远程仓库的别名 本地分支名称:远程分支名称
# 实际案例:
git push -u origin payment:pay
#如果希望远程分支的名称和本地分支名称保持一致，可以对命令进行简化:
git push -u origin payment
```

注意:第一次推送分支需要带`-u`参数(因为远程还没有此分支)，此后可以直接使用`git push`推送代码到远程分支。
![在这里插入图片描述](https://img-blog.csdnimg.cn/96da8e0e709347beb0cb517641d6fc52.png#pic_center)

## 5.12 查看远程仓库分支列表

```bash
git remote show 远程仓库名
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/5cd567f717ac40deb2fa02f5c975a732.png#pic_center)

## 5.13 跟踪分支

跟踪分支指的是:从远程仓库中，把远程分支下载到本地仓库中。需要运行的命令如下:

```bash
#从远程仓库中，把对应的远程分支下载到本地仓库，保持本地分支和远程分支名称相同git checkout 远程分支的名称
#示例:
git checkout blue
# 从远程仓库中，把对应的远程分支下载到本地仓库，并把下载的本地分支进行重命名
git checkout -b 本地分支名称 远程仓库名称/远程分支名称
#示例:
git checkout -b skyblue origin/blue
```

示例一：
![在这里插入图片描述](https://img-blog.csdnimg.cn/610e808aa53044f8a22716cd133bb34d.png#pic_center)

示例二：
![在这里插入图片描述](https://img-blog.csdnimg.cn/82435a6da0624c8eb992786db72facd3.png#pic_center)

## 4.14 拉取远程分支最新代码

可以使用如下的命令，把远程分支最新的代码下载到本地对应的分支中:

```bash
git pull <远程主机名> <远程分支名>:<本地分支名>
# 比如，取回origin主机的next分支，与本地的master分支合并
git pull origin next:master
# 如果远程分支是与当前分支合并，则冒号后面的部分可以省略。
git pull origin next
```

## 5.15 删除远程分支

```bash
# 删除远程仓库中，指定名称的远程分支
git push 远程仓库名称 --delete 远程分支名称
# 示例：
git push origin --delete blue
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ec10efa9f1f142f1b4133ee5277b7699.png#pic_center)

# 6. 开源

## 6.1 什么是开源

![在这里插入图片描述](https://img-blog.csdnimg.cn/0d2391bcff20431e90f9900f070dfb84.png#pic_center)

开源不仅提供程序，还提供程序的源代码
闭源只提供程序，不提供源代码

## 6.2 开源许可协议

开源并不意味着完全没有限制，为了限制使用者的使用范围和保护作者的权利，每个开源项目都应该遵守开源许可协议（ Open Source License ) 。

常见的五种开源协议：
① BSD ( Berkeley Software Distribution)
② Apache Licence 2.0
③ **GPL** (GNu General Public License)

- 具有传染性的一种开源协议，不允许修改后和衍生的代码做为闭源的商业软件发布和销售
- 使用 GPL 的最著名的软件项目是:Linux

④ LGPL (GNU Lesser General Public License)
⑤ **MIT** ( Massachusetts Institute of Technology, MIT)

- 是目前限制最少的协议，唯一的条件:在修改后的代码或者发行包中，必须包含原作者的许可信息
- 使用 MIT 的软件项目有:jquery、Node.js

## 6.3 开源项目托管平台

专门用于免费存放开源项目源代码的网站，叫做开源项目托管平台。目前世界上比较出名的开源项目托管平台主要有以下 3 个:

- ① Github（全球最牛的开源项目托管平台，没有之一)
- ② Gitlab(对代码私有性支持较好，因此企业用户较多)
- ③ Gitee (又叫做码云，是国产的开源项目托管平台。访问速度快、纯中文界面、使用友好)

注意:以上 3 个开源项目托管平台，只能托管以 Git 管理的项目源代码，因此，它们的名字都以 Git 开头。

# 7. github

## 7.1 创建仓库

![在这里插入图片描述](https://img-blog.csdnimg.cn/60f6f3a914e84010869c533b7f9d57fb.png#pic_center)

## 7.2 远程仓库两种访问方式

- Github 上的远程仓库，有两种访问方式，分别是 HTTPS 和 SSH。它们的区别是:
  ① HTTPS:零配置;但是每次访问仓库时，需要重复输入 Github 的账号和密码才能访问成功
  ② SSH:需要进行额外的配置;但是配置成功后，每次访问仓库时，不需重复输入 Github 的账号和密码
- 注意:在实际开发中，推荐使用 SSH 的方式访问远程仓库。

![在这里插入图片描述](https://img-blog.csdnimg.cn/ee2472632d9a4e84893c8c912351b0d9.png#pic_center)

## 7.3 基于 HTTPS 将本地仓库上传到 github

![在这里插入图片描述](https://img-blog.csdnimg.cn/c3619e5cf3aa4555bc2595355df8ee05.png#pic_center)

https 每次都要输账号密码
![在这里插入图片描述](https://img-blog.csdnimg.cn/eccb03d988dc441990071cb261cb91bc.png#pic_center)

上传完，仓库是这样的
![在这里插入图片描述](https://img-blog.csdnimg.cn/da966cd624c347be91beb58f16672028.png#pic_center)

## 7.4 SSH key

- sSH key 的作用:实现本地仓库和 Github 之间免登录的加密数据传输。
- SSH key 的好处:免登录身份认证、数据加密传输。
- SSH key 由两部分组成，分别是:
  ① id_rsa(私钥文件，存放于客户端的电脑中即可)
  ② id_rsa.pub(公钥文件，需要配置到 Github 中)

### 7.4.1 生成 SSH key

① 在任意目录打开 Git Bash
② 粘贴如下的命令，并将your_email@example.com替换为注册 Github 账号时填写的邮箱:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

③ 连续敲击 3 次回车，即可在 C:\Users\用户名文件夹\.ssh 目录中生成 id_rsa 和 id_rsa.pub 两个文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/4e8d4be0abd84f7fba628f4832afb1ad.png#pic_center)

### 7.4.2 配置 SSH key

① 使用记事本打开 id_rsa.pub 文件，复制里面的文本内容
② 在浏览器中登录 Github，点击头像->Settings -> SSH and GPG Keys -> New SSH key
③ 将 id_rsa.pub 文件中的内容，粘贴到 Key 对应的文本框中
④ 在 Title 文本框中任意填写一个名称，来标识这个 Key 从何而来
![在这里插入图片描述](https://img-blog.csdnimg.cn/395f235770ed48d582b43c419647133d.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/32a1146b077b45ed82665962af9726a7.png#pic_center)

- 检测 github 的 SSH key 是否配置成功
  打开 git Bash，输入

```bash
ssh -T git@github.com
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/a95260ebbfcf46478ead69b6be79317d.png#pic_center)

## 7.5 基于 SSH 将本地仓库上传到 github

![在这里插入图片描述](https://img-blog.csdnimg.cn/089879bbd2664b7e93d9a9c77da4cba1.png#pic_center)

## 7.6 克隆 github 仓库

![在这里插入图片描述](https://img-blog.csdnimg.cn/56446ba674954aa185c7d718fbc75891.png#pic_center)

```bash
git clone git@github.com:niconiconiQwQ/p2.git
```
