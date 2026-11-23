# 光源宇宙 · 静态官网

纯静态 HTML / CSS / JS，零构建、零依赖，可直接发布到 GitHub Pages。

## 站点概览

简体中文单语站点，共 9 个页面：

| 文件 | 页面 |
|---|---|
| `index.html` | 首页（首屏、三卡轮播、合作、CTA） |
| `about.html` | 关于我们（导师、宠物成员、导师资质证书灯箱） |
| `courses.html` | 课程（西塔 / 灵气 / 成长 / 塔罗） |
| `course-detail.html` | 课程详情（示例内容，可按课程补充） |
| `therapies.html` | 疗法与服务 |
| `events.html` | 活动与反馈（线下承办 / 公益讲座 / 学员结业 / 反馈轮播） |
| `contact.html` | 联系（预约咨询表单 + 问卷 + 联系方式 + 社交媒体） |
| `privacy.html` | 隐私政策（折叠 + 标签跳转） |
| `disclaimer.html` | 免责声明（折叠 + 标签跳转） |

共享 Header / Footer 由 `app.js` 在运行时注入，改一处全站生效。全站响应式（手机 / 平板 / 桌面），支持键盘焦点可见与 `prefers-reduced-motion`。

## 本地预览

直接双击 `index.html` 即可。若需要 HTTP 环境：

```bash
cd 项目目录
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

## 发布到 GitHub Pages

本目录（仓库根目录）即为站点根目录，`index.html` 在顶层，无需构建步骤。

1. **新建仓库**：在 GitHub 新建一个仓库（例如 `guangyuan-universe`），把本目录所有文件推送到 `main` 分支。
2. **开启 Pages**：仓库 → Settings → Pages → Build and deployment：
   - Source 选 `Deploy from a branch`
   - Branch 选 `main`，目录选 `/ (root)`
   - 保存
3. **等待部署**：几分钟后访问 `https://<用户名>.github.io/<仓库名>/`。

`.nojekyll` 文件已包含，用于确保 GitHub Pages 不跳过相关文件。

### 发布前必做：替换域名

站点的 `index.html`（canonical）、`sitemap.xml`、`robots.txt` 中用了占位域名 `https://USERNAME.github.io/REPO`，发布前请全局替换成你的真实地址：

- GitHub Pages 默认域名：`https://<用户名>.github.io/<仓库名>`
- 若绑定了自定义域名：`https://你的域名.com`

例如把 `https://USERNAME.github.io/REPO` 替换为 `https://lightsource.studio`。

### 若使用自定义域名

在仓库根目录新建一个无扩展名的 `CNAME` 文件，内容为你的域名（如 `lightsource.studio`），然后在域名注册商处把 DNS 的 CNAME 记录指向 `<用户名>.github.io`。

## 文件结构

```
.
├── index.html / about.html / courses.html / course-detail.html
├── therapies.html / events.html / contact.html
├── privacy.html / disclaimer.html
├── styles.css          全部样式与设计 token（顶部 :root）
├── i18n.js             简中文案表（data-i18n 键 → 文案）
├── app.js              共享 Header/Footer + 轮播、灯箱、表单等交互
├── assets/images/      全部图片（头像/证书/课程/活动/反馈/宠物等）
├── .nojekyll           GitHub Pages 配置
├── sitemap.xml
├── robots.txt
└── README.md
```

> 所有界面文案集中在 `i18n.js`；带 `data-i18n` 的元素文字由 JS 注入，改文案请改对应键值。

## 联系表单说明

联系页表单当前通过 `mailto:` 打开访客本地邮件客户端，把填写内容整理成邮件（收件人 `472826634@qq.com`）。这是纯静态站的方案，最后一步需访客在邮件中点发送。若需网页内直接提交，可接入 Formspree / Getform 等第三方静态表单服务。

## 常见问题

- **页面样式错乱 / 图片不显示**：确认是通过 HTTP 访问（GitHub Pages 或本地 `http.server`），且 `assets/images/` 目录完整上传。
- **改了内容没生效**：浏览器强刷（Cmd/Ctrl + Shift + R）；若改的是 i18n 文案，确认改的是 `i18n.js` 对应键。
- **大陆访问慢**：可把同样目录部署到 Cloudflare Pages / Vercel，无需改代码。
