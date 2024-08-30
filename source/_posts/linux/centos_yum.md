---
title: 在 CentOS 7 中更新 yum 源
date: 2024-08-30 18:00:00
tags:
  - Linux
  - OpenSSL
categories:
  - 技术 
cover: https://img.fangsikai.com/i/2024/08/30/12gfsnx.jpg
# thumbnail : https://img.fangsikai.com/i/2024/08/14/if9nmn.webp
---


一、备份原有 yum 源
1、进入 yum 源配置目录：

``` bash
cd /etc/yum.repos.d/
```
2、备份原有 yum 源文件：

``` bash
sudo mkdir backup && sudo mv *.repo backup/
```


二、选择新的 yum 源
CentOS 7 常用的 yum 源有阿里云、网易等。这里以阿里云 yum 源为例。
下载阿里云 yum 源配置文件：

``` bash

#阿里源
sudo wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

# 网易源
sudo wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.163.com/.help/CentOS7-Base-163.repo
```


三、更新 yum 缓存
运行以下命令更新 yum 缓存，使新的 yum 源生效：

``` bash
sudo yum makecache
```
升级所有已安装的软件包到最新版本（可选）：

``` bash
sudo yum update
```
