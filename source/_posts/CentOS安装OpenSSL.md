---
title: CentOS安装OpenSSL
date: 2024-08-30 18:00:00
tags:
  - Linux
  - OpenSSL
categories:
  - 技术 
cover: https://img.fangsikai.com/i/2024/08/30/ua8phx.png
# thumbnail : https://img.fangsikai.com/i/2024/08/14/if9nmn.webp
---


###  下载依赖

``` shell
yum update -y
yum install -y perl-IPC-Cmd
yum install -y openssl openssl-devel
yum install -y zlib zlib-devel openssl-devel sqlite-devel bzip2-devel libffi libffi-devel gcc gcc-c++
yum install -y wget

```

### 下载安装包

``` shell
wget https://github.com/openssl/openssl/releases/download/openssl-3.1.1/openssl-3.1.1.tar.gz
```

``` shell

# 解压
tar -zxvf openssl-3.1.1.tar.gz

# 进入解压后的文件夹，执行配置
./config --prefix=/usr/local/ssl --openssldir=/usr/local/ssl shared zlib

# 执行编译&安装命令
make & make install

# 配置动态库链接
echo "/usr/local/ssl/lib64" > /etc/ld.so.conf.d/openssl.conf

# 更新系统的库缓存
ldconfig

# 替换旧版的目录
cp /usr/local/ssl/bin/openssl /usr/bin/openssl

# 使用新的OpenSSL版本
ldconfig -v

```
### 查看版本
``` shell

openssl version

```
