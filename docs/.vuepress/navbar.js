module.exports = {
  //这里是将config.js中的顶部导航栏配置单独提取出来，方便配置
  navbar: [
    // 这一层设置一级标签
    // 一：首页
    {
      //设置标签
      text: "首页",
      //设置此标签的链接
      link: "/",
      //设置此导航栏的图标，请注意，导航图标只对一级标题有用，
      iconClass: "aurora-navbar-si-glyph-dial-number-1",
    },
    // 前端基础
    {
      text: "前端基础",
      iconClass: "aurora-navbar-blaze-line",
      children: [
        //在这里面的是二级标题，不能为二级标题设置图标
        {
          text: "HTML",
          children: ["/article/study_html/html.md"],
        },
        {
          text: "CSS",
          children: [
            "/article/study_css/note1.md",
            "/article/study_css/note2.md",
            "/article/study_css/scss.md",
          ],
        },
        {
          text: "JavaScript",
          children: [
            "/article/study_js/js_note1.md",
            "/article/study_js/js_note2.md",
            "/article/study_js/js_note3.md",
            "/article/study_js/jquery.md",
            "/article/study_js/es6.md",
            "/article/study_js/ajax.md",
            "/article/study_js/ts.md",
          ],
        },
      ],
    },
    // 前端框架
    {
      text: "前端框架",
      iconClass: "aurora-navbar-shoulijindu-xuanzhong",
      children: [
        {
          text: "Vue",
          children: [
            //'/readme/introduce.md',
            "/article/study_vue/note1.md",
            "/article/study_vue/note2.md",
            "/article/study_vue/note3.md",
            "/article/study_vue/note4.md",
            "/article/study_vue/vue3.md",
          ],
        },
        {
          text: "issure",
          children: ["/article/study_vue/bug.md"],
        },
      ],
    },
    // 数据库
    {
      text: "数据库",
      iconClass: "aurora-navbar-si-glyph-billiard-ball",
      children: [
        {
          text: "MySQL",
          children: ["/article/study_database/mysql.md"],
        },
        {
          text: "MongoDB",
          children: ["/article/study_database/mongodb.md"],
        },
      ],
    },
    // nodejs
    {
      text: "nodejs",
      iconClass: "aurora-navbar-weather",
      children: [
        {
          text: "nodejs基础",
          children: [
            "/article/study_nodejs/note1.md",
            "/article/study_nodejs/note2.md",
          ],
        },
        {
          text: "nodejs框架",
          children: ["/article/study_nodejs/express.md"],
        },
      ],
    },
    // 常用工具
    {
      text: "常用工具",
      children: [
        //'/readme/introduce.md',
        "/article/study_tool/webpack.md",
        "/article/study_tool/git.md",
      ],
      iconClass: "aurora-navbar-si-glyph-load",
    },
    // // 未定义
    // {
    //   text: "未定义",
    //   link: "/use.html",
    //   iconClass: "aurora-navbar-si-glyph-load",
    // },
    // 分享
    {
      text: "分享",
      iconClass: "aurora-navbar-si-glyph-egg",
      children: [
        {
          text: "插件/扩展",
          children: ["/article/share/plugin.md"],
        },
        {
          text: "工具类网站",
          children: ["/article/share/website.md"],
        },
        {
          text: "软件",
          children: ["/article/share/software.md"],
        },
      ],
    },
    // 关于
    {
      text: "About",
      iconClass: "aurora-navbar-hua2",
      children: [
        {
          text: "关于",
          children: [
            {
              text: "Me",
              link: "/about",
            },
          ],
        },
        {
          text: "说说",
          children: [
            {
              text: "说说1",
              link: "/mood",
            },
            {
              text: "说说2",
              link: "/next-mood",
            },
          ],
        },
        {
          text: "相册",
          children: [
            {
              text: "photo",
              link: "/photo",
            },
          ],
        },
      ],
    },
    //
    {
      text: "归档",
      iconClass: "aurora-navbar-a-ziyuan107",
      children: [
        {
          text: "标签",
          children: [
            {
              text: "tag",
              link: "/tag",
            },
          ],
        },
        {
          text: "时间轴",
          children: [
            {
              text: "archive",
              link: "/archive",
            },
          ],
        },
      ],
    },
    // 友链
    {
      text: "友链",
      link: "/link",
      iconClass: "aurora-navbar-guide",
    },
    // github
    {
      text: "凉宫",
      link: "https://github.com/niconiconiQwQ",
      iconClass: "aurora-navbar-github1",
    },
  ],
};
