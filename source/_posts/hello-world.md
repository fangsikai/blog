---
title: Hello World 建站 hexo+github+cloundflare
date: 2024-08-08 18:00:00
tags:
  - 软件
categories:
  - 技术 
# top_img: false
# top_img: https://img02.anheyu.com/adminuploads/1/2022/09/05/6315e146a8bbd.webp
cover: https://img.fangsikai.com/i/2024/09/02/hfsnjx.png
thumbnail : https://img.fangsikai.com/i/2024/08/14/if9nmn.webp
---

# 使用github+cloundflare+hexo 建站

### 建站技能：**熟悉域名系统、熟悉markdown语法、git体系、H5前端、npm**

### 建站思路

网站服务：使用[hexo](https://hexo.io/zh-cn/)编写[markdown](https://markdown.com.cn/)文档，生成html，发布到互联网免费Pages服务中；

图床服务：买一个ECS服务器，或者对象存储，或者使用百度网盘分享的链接。

### 具体实现

1、[github](https://github.com/) 提供免费pages 服务，但是github 在国内访问不方便，推荐使用[cloundflare](https://www.cloudflare-cn.com/)，提供域名注册，并**免费**提供**15年**的**多域名**证书，并提供Pages服务，设定好仓库来源（已有从github同步git的功能），而且cloundflare 提供CDN加速服务，适合作全球站，域名注册建议注册.com的域名；

2、利用[宝塔BT](https://www.bt.cn/),搭建运维平台,服务器自行提供，在BT应用上传搜索图床，有简单图床软件可以免费使用；注意要配置ssl证书，使用从cloudflare下载的多域名证书即可；

3、使用vscode搭建hexo网站，并安装[主题](https://hexo.io/themes/)，编写markdown，配置好仓库并编译上传即可。




**注意事项：**

1、hexo 的代码管理，需要分开管理，上传到代码仓库master分支（管理编写的代码）,发布代码可上传到deploy分支（管理发布的代码）；cloundflare 则选择deploy分支作为page服务分支，直接绑定主域名fangsikai.com给cloundflare的page服务；

``` bash
# hexo 基础指令
hexo serve #本地运行
hexo cl # 清理生成静态代码
hexo g # 生成静态代码
hexo d # 执行部署
```

``` bash
#hexo的配置文件_config.xml 配置参数
# 打包发布
deploy:
  type: git
  repo: git@github.com:fangsikai/blog.git
  branch: cloudflare
# 域名地址
url: https://www.fangsikai.com
```

建议使用github的ssl密钥进行编译打包上传，不用每次输入账户密码

``` bash
# git生成密钥，配置到github
ssh-keygen -t rsa -C "你的邮箱"
```

2、在cloundflare上申请域名，可设定img.fangsikai.com进行DNS解析，绑定到发布的图床服务的IP端口


#### bt宝塔软件安装简单图床：

![简单图床](https://img.fangsikai.com/i/2024/09/02/h1x46r.png)

#### cloudflare配置ssl证书：

![ssl证书](https://img.fangsikai.com/i/2024/09/02/h5hv6h.png)

#### cloudflare配置page服务：

![Page服务](https://img.fangsikai.com/i/2024/09/02/h7tu13.png)

