# mcwl4w

mcwl4w 是一个旨在通过在线网站为Minecraft服务器提供便捷白名单申请的项目。
它允许玩家通过简单的网页表单提交他们的申请信息，如用户名、邮箱等，这一项目旨在提升服务器管理的效率，同时优化玩家的游戏体验，确保只有符合要求的玩家能够加入服务器。

## Browser Support

| ![Chrome][chrome-shield] | ![Edge][edge-shield] | ![Firefox][firefox-shield] | ![Safari][safari-shield] | ![Opera][opera-shield] |
|--------------------------|----------------------|----------------------------|--------------------------|------------------------|
| Latest ✔                 | Latest ✔             | Latest ✔                   | Latest ✔                 | Latest ✔               |                                                                                                                      |

<br />

<p align="center">
  <a href="https://github.com/lZiMUl/mcwl4w/">
    <img src="/assets/image/icon/logo.png" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">mcwl4w</h3>
  <p align="center">
    <br />
    <a href="https://github.com/lZiMUl/mcwl4w"><strong>探索本项目的文档 »</strong></a>
    <br />
    <br />
    <a href="https://github.com/lZiMUl/mcwl4w/issues">报告Bug</a>
    ·
    <a href="https://github.com/lZiMUl/mcwl4w/issues">提出新特性</a>
  </p>
</p>

[![BiliBili][bilibili-shield]][bilibili-url]
[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

## 功能

- **在线申请白名单**：玩家可以通过网站提交申请信息。
- **高效管理**：服务器管理员可以轻松管理和审核申请。
- **优化体验**：确保只有符合要求的玩家能够加入服务器。

## 预览图

<img src="/assets/image/preview/preview1.png" alt="Logo" width="500" height="*">

<img src="/assets/image/preview/preview2.png" alt="Logo" width="500" height="*">

<img src="/assets/image/preview/preview3.png" alt="Logo" width="500" height="*">

## 安装

1. **下载项目到本地**
    ```bash
    git clone https://github.com/lZiMUl/mcwl4w.git && cd mcwl4w
    ```

2. **项目依赖安装**
   ```bash
   # 对于国外网络环境
   npm run install
   # 对于国内网络环境
   npm run install:china
    ```

3. **更改项目配置文件**
   ```text
   进入项目的 config 文件夹
   修改 default.toml 里面的配置项
   ```

4. **编译项目**
    ```bash
    npm run build
    ```

5. **运行项目**
    ```bash
    npm run start
    ```

## 使用

1. 访问网站首页。
2. 填写并提交白名单申请表单。
3. 管理员审核申请并更新白名单。

## 贡献

欢迎任何形式的贡献！请 fork 本项目并提交 pull request。

## 许可证

本项目基于 MIT 许可证开源。

## 联系

如果有任何问题或建议，请联系 [lZiMUl@lzimul.com](mailto:lZiMUl@lzimul.com)。

#### 以下是默认配置, 配置出现问题, 可以复制过去哦 ;-)

   ```toml
    # 全局配置
[globalConfig]
# 网站标题
title = "Minecraft 服务器 - 白名单自助验证"
# 提示
contactContent = "加入QQ群"
# 群号
contactNumber = "123456789"
# 链接
contactLink = "https://qm.qq.com/q/123456789"

# 网站服务配置
[webService]
# 主机
host = "0.0.0.0"
# 端口
port = 22
# 网站会话超时时间 (单位:分钟)
sessionTimeout = 10

# 邮箱服务配置
[emailService]
# 主机
host = "smtp.gmail.com"
# 端口
port = 587
# 用户
username = ""
# 密码
password = ""
# 验证码过期时间 (单位:分钟)
verifyCodeExpireTime = 5

# Rcon服务配置
[rconService]
# 主机
host = "127.0.0.1"
# 端口
port = 25575
# 密码
password = ""  
   ```

<!-- links -->

[your-project-path]:lZiMUl/mcwl4w

[bilibili-shield]: https://img.shields.io/badge/mcwl4w%20開發者B站-red?logo=bilibili

[bilibili-url]: https://space.bilibili.com/291883246

[contributors-shield]: https://img.shields.io/github/contributors/lZiMUl/mcwl4w.svg?style=flat-square

[contributors-url]: https://github.com/lZiMUl/mcwl4w/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/lZiMUl/mcwl4w?label=Forks&logo=github

[forks-url]: https://github.com/lZiMUl/mcwl4w/network/members

[stars-shield]: https://img.shields.io/github/stars/lZiMUl/mcwl4w?label=Stars&logo=github

[stars-url]: https://github.com/lZiMUl/mcwl4w/stargazers

[issues-shield]: https://img.shields.io/github/issues/lZiMUl/mcwl4w?label=Issues&logo=github

[issues-url]: https://github.com/lZiMUl/mcwl4w/issues

[license-shield]: https://img.shields.io/github/license/lZiMUl/mcwl4w?label=License&logo=github

[license-url]:https://github.com/lZiMUl/mcwl4w/blob/main/LICENSE

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/shaojintian

[chrome-shield]: /assets/image/icon/chrome.png

[edge-shield]:/assets/image/icon/edge.png

[firefox-shield]: /assets/image/icon/firefox.png

[safari-shield]: /assets/image/icon/safari.png

[opera-shield]: /assets/image/icon/opera.png