<div align="center">
<img src="./src/assets/openai.svg" style="width:64px;height:64px;margin:0 32px" alt="icon"/>

<h1 align="center">ChatGPT Web</h1>

</div>

## 🎮 开始使用

**Node 环境**

`node` 需要 `^16 || ^18 || ^19` 版本（node >= 16.19.0），可以使用 nvm 管理本地多个 node 版本。

```
# 查看 node 版本
node -v

# 查看 npm 版本
npm -v

# 查看 yarn 版本
yarn -v

```

**1.安装依赖**

```
yarn install
```

**2.运行**

```
# web项目启动
yarn dev:web
```

**3.打包**

```
yarn build
```

## ⛺️ 环境变量

> 如果是前后端分离模式部署项目则需要填以下配置

#### `VITE_APP_REQUEST_HOST`

请求服务端的`Host`地址。

## 🚧 开发

> 强烈不建议在本地进行开发或者部署，由于一些技术原因，很难在本地配置好 OpenAI API 代理，除非你能保证可以直连 OpenAI 服务器。

#### 本地开发

1. 安装 nodejs 和 yarn 具体细节请询问 ChatGPT
2. 执行 `yarn install` 即可
3. web 项目开发 `yarn dev:web`
4. 服务端项目开发 `yarn dev`
5. 打包项目 `yarn build`

## 🎯 部署

> 直接将`WEB`项目打包好的 `dist` 目录上传到服务器即可。注意服务器 IP 地址位置！
