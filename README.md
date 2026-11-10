# 小小的家 · 个人主页

《计算机基础》课程作业。一套六个页面、纯手写 HTML + CSS + 原生 JavaScript 的个人网站，
放到任何一个静态托管上就能打开，也可以直接双击 `index.html` 在本地浏览。

## 页面

| 文件 | 内容 |
| --- | --- |
| `index.html` | 首页：自我介绍、三张卡片、通往各分页的入口 |
| `jianjie.html` | 个人简介：概况、联系方式、能力条、教育经历（含四个锚点跳转） |
| `donghua.html` | 动画作品：地球自转、气球上浮、光线掠过三段 CSS 动画 |
| `xiangce.html` | 我的相册：三张照片，点击可放大，支持左右方向键与 Esc |
| `xuexi.html` | 学习心得：五条踩坑记录、已做到清单、待学清单 |
| `contact.html` | 写信给我：留言表单（校验后调起邮件客户端）、联系方式、复制邮箱 |

## 目录结构

```
MYWEB/
├─ index.html
├─ jianjie.html
├─ donghua.html
├─ xiangce.html
├─ xuexi.html
├─ contact.html
├─ css/
│  └─ style.css
├─ js/
│  └─ main.js
└─ images/
   ├─ favicon.svg
   ├─ logo.jpg
   ├─ mao.jpg
   ├─ qiang.jpg
   ├─ star.jpg
   └─ home.gif
```

所有页面之间的链接、图片、样式表、脚本全部使用**相对路径**，整个文件夹搬到哪里都不会断。
图片文件名统一小写——GitHub Pages 跑在 Linux 上，`MAO.jpg` 和 `mao.jpg` 是两个不同的文件。

## 本地预览

- 直接双击 `index.html` 即可（因为没有任何构建步骤，也没有跨域请求）。
- 想更接近线上环境，可以在该目录下开一个静态服务器：

```bash
python -m http.server 8000
# 然后浏览器打开 http://localhost:8000
```

## 发布到 GitHub Pages

1. 在 GitHub 上新建一个仓库，例如 `myweb`，复制仓库地址。
2. 把整个 `MYWEB` 文件夹里的内容（不是文件夹本身）提交到仓库。

   用 SourceTree：克隆仓库到本地工作目录（如 `D:\Work\myweb`）→ 把本文件夹里的文件复制进去 →
   Add → Commit → Push。

   用命令行（在 `D:\MYWEB` 里执行）：

   ```bash
   git init
   git add .
   git commit -m "个人主页：首页 + 五个分页"
   git branch -M main
   git remote add origin https://github.com/你的用户名/myweb.git
   git push -u origin main
   ```

3. 打开仓库 → Settings → Pages → Source 选 `Deploy from a branch`，Branch 选 `main`、目录选 `/ (root)`，保存。
4. 等一两分钟，访问 `https://你的用户名.github.io/myweb/`。

> 仓库名如果就叫 `你的用户名.github.io`，那地址是 `https://你的用户名.github.io/`，
> 根目录直接就是网站首页，不用带子路径。

## 已填入的信息

- 姓名：罗芷欣
- 学校 / 学院：华中科技大学 计算机科学与技术学院
- 专业：计算机科学与技术（2026 级本科）
- 邮箱：`U202615166@hust.edu.cn`（已同步到 `jianjie.html`、`contact.html` 的复制按钮和 `js/main.js` 第 162 行的表单收件地址）
- 电话：`18771997736`

页面里没有写出生年月、性别、政治面貌和宿舍号——公网上没必要放这些，答辩时老师也不看。

还需要你自己决定的：

- 相册里的三张图（小猫、模型枪、《勇敢的心》海报）来自课程素材，换成自己的照片时同步改 `alt` 和 `data-caption`
- 「个人能力」五条熟练度是按作业情况估的，觉得不合适就拖动 `<i style="width:85%">` 里的百分比
- 教育背景里的高中一项只写了「高中 · 理科」，需要写校名就补上

## 技术说明

- 不依赖任何框架、CDN、外部字体，断网也能完整打开。
- 布局用 Flexbox + Grid；断点 980 / 820 / 560px，手机、平板、桌面各一档。
- 语义化标签（`header` / `nav` / `main` / `section` / `aside` / `footer`），有跳转到主内容的 skip link。
- 图片都有 `alt`，次要图片 `loading="lazy"`；键盘焦点用 `:focus-visible` 描边。
- 系统开启「减少动态效果」时，入场动画与循环动画会自动收敛。
- 三段动画用 CSS `@keyframes` 实现，替代课程素材里已经无法播放的 `.swf`。

## 验收记录

- 六个页面的相对链接、图片、样式表、脚本全部可解析（脚本检查过所有 `href` / `src`）。
- 无头浏览器实测：移动端导航开合、相册灯箱打开/翻页/Esc 关闭、表单空值提示与邮箱格式提示均正常，控制台无报错。
- 1280px 与 390px 两档宽度下均无横向溢出。
