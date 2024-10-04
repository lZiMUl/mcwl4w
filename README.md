# mcwl4w

mcwl4w is a project designed to provide a convenient whitelist application for Minecraft servers through an online
website. It allows players to submit their application information, such as username and email, via a simple web form.
This project aims to enhance server management efficiency while optimizing the gaming experience for players, ensuring
that only eligible players can join the server.

## Browser Support

| ![Chrome][chrome-shield] | ![Edge][edge-shield] | ![Firefox][firefox-shield] | ![Safari][safari-shield] | ![Opera][opera-shield] |
|--------------------------|----------------------|----------------------------|--------------------------|------------------------|
| Latest ✔                 | Latest ✔             | Latest ✔                   | Latest ✔                 | Latest ✔               |                                                                                                                      |

<br />

<div align="center">
  <a href="https://github.com/lZiMUl/mcwl4w/">
    <img src="/assets/image/icon/logo.png" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">mcwl4w</h3>
  <p align="center">
    <br />
    <a href="https://github.com/lZiMUl/mcwl4w"><strong>Explore the documentation for this project »</strong></a>
    <br />
    <br />
    <a href="https://github.com/lZiMUl/mcwl4w/issues">Report Bugs</a>
    ·
    <a href="https://github.com/lZiMUl/mcwl4w/issues">Propose New Features</a>
  </p>
</div>

[![BiliBili][bilibili-shield]][bilibili-url]
[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

## [前往中文 README](./README_CN.md)

## Features

- **Online Whitelist Application**：Players can submit their application information through the website.。
- **Efficient Management**：Server administrators can easily manage and review applications.
- **Optimized Experience**：Ensures that only eligible players can join the server.

## Preview Images

<img src="/assets/image/preview/preview1.png" alt="Logo" width="500" height="*">

<img src="/assets/image/preview/preview2.png" alt="Logo" width="500" height="*">

<img src="/assets/image/preview/preview3.png" alt="Logo" width="500" height="*">

<img src="/assets/image/preview/preview4.png" alt="Logo" width="500" height="*">

## Installation

1. **Download the project locally**
    ```bash
    git clone https://github.com/lZiMUl/mcwl4w.git && cd mcwl4w
    ```

2. **Install project dependencies**
   ```bash
   # For foreign network environments
   npm run install
   # For domestic network environments
   npm run install:china
    ```

3. **Modify the project configuration file**
   ```text
   Enter the project's config folder
   Modify the configuration items in default.toml
   ```

4. **Compile the project**
    ```bash
    npm run build
    ```

5. **Run the project**
    ```bash
    npm run start
    ```

## Usage

1. Visit the homepage of the website.
2. Fill out and submit the whitelist application form.
3. The administrator reviews the application and updates the whitelist.

## Contribution

Contributions in any form are welcome! Please fork this project and submit a pull request.

## License

This project is open-sourced under the MIT License.

## Contact

If you have any questions or suggestions, please contact [lZiMUl@lzimul.com](mailto:lZiMUl@lzimul.com)。

#### Below is the default configuration. If you encounter any configuration issues, you can copy and paste it here ;-)

   ```toml
# Global Configuration
[globalConfig]
# Website Title
title = "Minecraft Server - Whitelist Self-Verification"
# Contact Prompt
contactContent = "Join Discord Group"
# Group Number
contactNumber = "123456789"
# Link
contactLink = "https://discord.com/"

# Web Service Configuration
[webService]
# Host
host = "0.0.0.0"
# Port
port = 80
# Website session timeout (unit: minutes)
sessionTimeout = 10

# Email Service Configuration
[emailService]
# Host
host = "smtp.gmail.com"
# Port
port = 587
# User
username = ""
# Password
password = ""
# Verification code expiration time (unit: minutes)
verifyCodeExpireTime = 5

# Rcon Service Configuration
[rconService]
# Host
host = "127.0.0.1"
# Port
port = 25575
# Password
password = ""

   ```

<!-- links -->

[your-project-path]:lZiMUl/mcwl4w

[bilibili-shield]: https://img.shields.io/badge/mcwl4w%20Developer%20Bilibili-red?logo=bilibili

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