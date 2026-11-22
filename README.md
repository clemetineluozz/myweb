# lzx的秘密基地 · 个人主页

一个自己一页页排出来的个人小站。深灰黑底、暖白字，薄荷绿做主点缀、
琥珀橙做次点缀；标题正文统一用无衬线字体，靠字重和字距拉开层次，
细线分区、大留白。刻意避开了模板化的渐变、玻璃拟态和圆角卡片阴影，
看起来像一个懂点排版的人慢慢搭出来的，而不是套模板生成的。

## 目录结构

```
D:\MYWEB\
├─ index.htm              首页
├─ web\                   网页文件
│   ├─ jianjie.htm        关于我（四个锚点）
│   ├─ xiangce.htm        相册：views 与 tastes 两个板块
│   ├─ aihao.htm          我的爱好（听音乐 / 画画 / 电子游戏 / 二次元）
│   ├─ music.htm          我喜欢的音乐（纯封面墙，点图跳转听歌）
│   └─ contact.htm        给我留言
├─ images\
│   ├─ album\             相册图片
│   │   ├─ views\         风景 / 建筑 / 街拍（9 张）
│   │   ├─ tastes\        美食（4 张）
│   │   └─ *-mascot.jpg   两个板块标题旁的表情小图标
│   ├─ music\             17 张专辑封面 + 5 张「最近在听」封面
│   ├─ gta6.jpg           GTA6 官方美术图（爱好页用）
│   └─ *.jpg / *.gif      表情素材与「还在装修」小图
├─ css\style.css          样式表
└─ js\main.js             日期、计数、当前页高亮、相册灯箱
```

根目录还留了 `index.html`、`jianjie.html` 等旧文件，它们只做跳转用，
免得以前收藏的链接失效。真正的页面是 `.htm` 那批。

## 本地预览

直接双击 `index.htm` 就能看；或者在这个目录里执行：

```bash
python -m http.server 8000
```

然后打开 `http://localhost:8000/index.htm`。

## 一些说明

- 站点原名「小小的家」，现已改名为「lzx的秘密基地」，并去掉了原来的房子 logo，
  页头改为纯文字排版。导航精简为 6 项，动画作品栏目及其页面已删除。
- 相册全部换成自己的照片，只分 **views** 和 **tastes** 两个板块，纯图片展示，
  没有多余说明；两个板块标题各配了一张表情小图标（views 戴帽子的、tastes 吃寿司的）。
  点任意一张可放大，再点一下或按 Esc 关闭。
  图片用浏览器 canvas 压过（长边不超过 1500px），加载更快。
- 页脚有自动日期和本机访问计数，纯装饰，换台电脑会从 1 重新数。
- 原来的「学习心得」栏目已删掉，换成「我的爱好」：听音乐、画画、玩电子游戏
  （配了 GTA6 官方美术图）和二次元文化；首页欢迎语也换成了口语化的说法。
- 卡通表情素材：简介页捂嘴笑、留言页挥手，在 images/ 下的
  avatar-smile.jpg、avatar-wave.jpg。
- 「我喜欢的音乐」页取消了按歌手分类，22 张专辑封面平铺成一个 5 列封面墙
  （含 Magdalena Bay《Imaginal Disk》、Olivia Dean《The Art of Loving》、
  Florence + The Machine《How Big, How Blue, How Beautiful》、ROSALÍA《LUX》、
  Taylor Swift《Midnights》等）。点任意一张封面会跳转到网易云音乐对应专辑的
  搜索页，悬停时出现 ▶ 播放图标；封面在 images/music/，通过 iTunes 公开接口
  抓取并本地保存，不依赖外链；版权归各唱片公司。
- 邮箱统一用 `U202615166@hust.edu.cn`，导航、简介页与留言页的 `mailto:` 都是这一个。

## 发布

整个 `MYWEB` 文件夹传到任意静态托管即可，不用构建。
所有 `href` 和 `src` 都是相对路径，移动到别处也不会断图断链。
