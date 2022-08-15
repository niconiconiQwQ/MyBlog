---
title: 常用 Markdown 语法
date: 2022/07/17 13:17 #手动设置最后更新时间
categories: [Markdown] # 标签
stick: false # 是否置顶
description: Markdown
keyword: Markdown
---

# 常用 Markdown 语法

# 1. 简介

- Markdown 是一种轻量级标记语言，编写的文件后缀为 `.md`，`.markdown`。
- 通过常用的的 markdown 的标记符，便可美化文章排版。
- 在线测试：[https://stackedit.cn/app#](https://stackedit.cn/app#)
- 编辑器：**Typora / VS Code / Sublime** 等
- **注意**：本文使用 VS Code 编辑器，并结合了 **Markdown Preview Enhanced**插件。
- 这里就写了几个常用的(没有涉及图像，数学公式等用法)，更详细的用法可参照：[Markdown Preview Enhanced 插件官网](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
  > 插件提示：
  > **快捷键 `ctrl + v , k`打开预览窗口**，在预览窗口右键有很多功能(如导出 pdf，jpg 等格式)

# 2. 标题

使用 `#` 号可表示 1-6 级标题，

```html
# 一级标题 ## 二级标题 ### 三级标题 #### 四级标题 ##### 五级标题
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/d6b3f4fd913b46f2badf34d4857c46e8.png#pic_center)
使用 `[toc]` 或 `@[toc]` 列出全部标题目录

```html
@[toc] # 一级标题 ## 二级标题 ### 三级标题 #### 四级标题 ##### 五级标题
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/fffeafcfe70c409eb27f9beb5eece21c.png#pic_center)

# 3. 字体样式

## 3.1 字体

在这里星号(或叫乘号)`*` 和下划线 `_`效果一样

- 一个 `*` 星号包裹是 _斜体文本_
- 两个 `**` 星号包裹是 **粗体文本**
- 三个 `***` 星号包裹是 **_粗斜体文本_**

```html
*斜体文本* _斜体文本_ **粗体文本** __粗体文本__ ***粗斜体文本***
___粗斜体文本___
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ab233a16357b447baf00f30cef0f3da0.png#pic_center)

## 3.2 删除线

在文字的两端加上两个波浪线 `~~` 展示~~~删除线~~~

```html
没加删除线 ~~加了删除线~~
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/1913428253ac49c296d5a3ec2df57cda.png#pic_center)

## 3.3 下划线

在文字<u>首部和尾部</u>分别加上 `<u>` 和`</u>`即可

```html
<u>带下划线文本</u>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/035f8dcbdf7448afa950efcb410f2438.png#pic_center)

## 3.4 高亮

用一对两个等号 `==` 包裹的文字会显示==高亮==

```html
==哇酷哇酷==
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/6db252e317ba4c8a9f7defa0e8b5c4c0.png#pic_center)

# 4.1 分割线

使用三个及以上的星号 `*` 、减号 `-` 可展示分割线

---

```html
--- - - - *** * * *
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/edf4b56a0811415bae6f400982583f8c.png#pic_center)

# 5. 列表

## 5.1 无序列表

无序列表使用星号 `*` 、加号 `+` 或是减号 `-` 作为列表标记，这些标记后面要添加一个空格，再填写内容。以减号 `-` 为例展示

```html
- 列表一 - 列表二 - 列表三
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/cf25f2cf90b8438ebb01025bfcd0f99e.png#pic_center)

## 5.2 有序列表

有序列表使用数字并加上 英文句号 `.` 再加个空格再写入文字

```html
1. 有序列表 1 2. 有序列表 2 3. 有序列表 3
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/4a9dd6efe50d41a6944a704f3314c360.png#pic_center)

## 5.3 列表嵌套

列表嵌套只需在子列表中的选项前面添加四个空格即可

```html
1. 有序列表第一项： - 第一项嵌套的第一个元素 - 第一项嵌套的第二个元素 2.
第二项： - 第二项嵌套的第一个元素 - 第二项嵌套的第二个元素 - 无序列表第一项： -
第一项嵌套的第一个元素 - 第一项嵌套的第二个元素 - 第二项： -
第二项嵌套的第一个元素 - 第二项嵌套的第二个元素
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/25697d8f30724bafa91296bdeb7a9019.png#pic_center)

# 6. 区块引用

> 在段落开头使用 `>` 符号 ，然后后面紧跟一个空格符号

```html
> 写你的文章... > 写你的文章...
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/98f873ac792b4523811cfba5ce5ef7d1.png#pic_center)
区块引用是可以嵌套的：

```html
> 写你的文章... >> 写你的文章... >> 写你的文章... >>> 写你的文章...
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ad290b129e7e4795afd00aa16b9bef4b.png#pic_center)
区块引用中使用列表(除列表之外，其实在区块引用中，可以用 markdown 语法来排版)

```html
> 1. 第一项 > 2. 第二项 > > - 第一项 > - 第二项 > - 第三项 > - 第三点一项
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/fad283f7f93943f3809e14e10c9c7e29.png#pic_center)
列表中使用区块

```html
- 第一项 > 写笔记 > 写笔记 - 第二项 > 写笔记 > > > > 写笔记 > > > 写笔记
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/50e7daf71eb24751b94876bebd6edeac.png#pic_center)

# 7. 代码

## 7.1 行内代码

段落上的一个函数或片段的代码可以用反引号把它包起来 ==**```**==，当然不仅用于代码，你用于文字装饰也行。例如：

```html
这是一个`print()` 函数 这是一个 `代码段`
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/f5938c301ee74e9cab67ba38d7276109.png#pic_center)

## 7.2 代码区块

以用三个反引号 ==**```**== 包裹一段代码，并指定一种语言（javascript, shell,php,java,go,html,xml,css,ruby,python,c,c++等等）,也可以不指定

````javascript
/	```javascript
/	let sum = 4;
/	const add = (num) => {
/  	  return (sum += num);
/	};
/	console.log(add(3));
/	```
````

![在这里插入图片描述](https://img-blog.csdnimg.cn/dd92a21ee5fe4a2a9d5bc5eed40e539d.png#pic_center)

# 8. 链接

[链接](https://www.baidu.com/)的格式为一个中括号 `[]`，加上一个小括号`()`，中括号里写链接名称，小括号里写链接地址，如下所示：

```html
[百度链接](https://www.baidu.com)
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2423c3f80be44604ac3ecd2762af35aa.png#pic_center)

# 9. 图片

在.md 文件中可插入图片，语法格式如下：

> 一个感叹号 `!`加一个方括号`[]`，里面放上图片的替代文字；再加一个小括号`()`，里面放上图片的网址。

```html
![alt 属性文本](图片地址) ![alt 属性文本](图片地址 "可选标题")
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/42fc96ef7d6d4324b69b425a5ee245fb.png#pic_center)

# 12. 表格

制作表格使用(竖线或符号) `|` 来分隔不同的单元格，使用(减号) `-` 来分隔表头和其他行。一个 `-` 其实也可以

```html
| 表头1 | 表头2 | 表头3 | 表头4 | | ------ | ------ | ------ | ------ | | 单元格
| 单元格 | 单元格 | 单元格 | | 单元格 | 单元格 | 单元格 | 单元格 | | 单元格 |
单元格 | 单元格 | 单元格 |
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/014d138cb3e244e5bed76c95adfecb50.png#pic_center)
设置表格的对齐方式，冒号`:`在 减号 `-`哪边，就是哪边对齐；两头冒号`:`或直接不带冒号`:`就是居中

- `-:` 设置内容和标题栏居右对齐。
- `:-` 设置内容和标题栏居左对齐。
- `:-:` 设置内容和标题栏居中对齐。

```html
| 左对齐 | 右对齐 | 居中对齐 | | :----- | -----: | :------: | | 单元格 | 单元格
| 单元格 | | 单元格 | 单元格 | 单元格 | | 单元格 | 单元格 | 单元格 |
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/7705b925c2eb4a5abda56a8d9aa53ae2.png#pic_center)
这个截图是在用 CSDN 的 markdown 撰文里截的，在 VS Code 里显示不出效果。
不同平台对 markdown 的支持会有所不同，有些效果可能略有差异，但总体差不多的。

# 13. 复选框

语法：减号 - 加上空格加再上中括号 [] ，最后写文字。中括号中可写入 `x` 或 一个空格。带 `x`的显示打钩，空格显示不打勾

```html
- [x] 复选框 - [ ] 复选框
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/79bfa2ffdb33406484cbb327e8115fd2.png#pic_center)

# 14. 折叠文字

通过`<details>`标签，可以折叠内容；`<summary>`标签做 title。`<summary>`标签可以省略，若省略 title 就是默认值 “详情” 二字。
注意：**标签与内容之间空出一行**

```html
<details>
  <summary>折叠内容详情</summary>

  - 折叠内容 1 - 折叠内容 2 > 折叠内容 3
</details>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/6a43b432e4ba4153b4a1f3f40b83468d.gif#pic_center)

# 15. 键盘字样

使用<kbd>`<kbd></kbd>`</kbd>标签包裹

```html
<kbd>ESC</kbd>
<kbd>CTRL</kbd>
<kbd>**等等**</kbd>
<kbd>`等等`</kbd>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/fcc9168fb6aa4e08a851039ac4a9f670.png#pic_center)

> 结尾：markdown 只是一个美化文章的工具，会标题，列表，链接，代码，图片，表格等最常用的语法便可基本满足日常记笔记的需求(ㆁᴗㆁ✿)。
