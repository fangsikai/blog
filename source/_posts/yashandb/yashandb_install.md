---
title: yashan数据库安装--编写中
date: 2024-08-30 18:00:00
tags:
  - 数据库
categories:
  - 技术 
# top_img: false
# top_img: https://img02.anheyu.com/adminuploads/1/2022/09/05/6315e146a8bbd.webp
cover: https://img.fangsikai.com/i/2024/08/14/if9nmn.webp
thumbnail : https://img.fangsikai.com/i/2024/08/14/if9nmn.webp
---

### 一、yashan 数据库&环境信息


1、操作系统版本：Centos 7  ，虚拟机硬件：6GB内存，5GB存储
``` bash
[fang@localhost ~]$ cat /etc/centos-release
CentOS Linux release 7.9.2009 (Core)

```

2、数据库版本：yashandb-personal-23.2.3.100-linux-x86_64.tar.gz

3、参考文案：
[1.官方文档](https://doc.yashandb.com/yashandb/23.2/zh/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B/%E5%AE%89%E8%A3%85%E9%83%A8%E7%BD%B2/%E5%AE%89%E8%A3%85%E5%89%8D%E5%87%86%E5%A4%87/%E5%AE%89%E8%A3%85%E5%89%8D%E5%87%86%E5%A4%87.html) 、
[2.摩天轮](https://www.modb.pro/db/1819289732116996096)


### 二 、创建安装用户
``` shell
#!/bin/bash
############################################################
## scripts: ysdb_user.sh
## author : dash.cai
## purpose: 配置崖山数据库用户           
############################################################
groupadd yashan
useradd -g yashan -s /bin/bash -c "yashan Owner" yashan
echo "yashan" | passwd --stdin yashan
chmod +w /etc/sudoers
echo "yashan  ALL=(ALL)NOPASSWD:ALL" >> /etc/sudoers
chmod -w /etc/sudoers
```

### 三 、调整系统参数

``` shell
#!/bin/bash
############################################################
## scripts: ysdb_limits.sh
## author : dash.cai
## purpose: 配置崖山数据库资源参数
##           
############################################################
 echo "
* soft nofile 1048576
* hard nofile 1048576
* soft nproc 1048576
* hard nproc 1048576
* soft rss unlimited
* hard rss unlimited
* soft stack 8192
* hard stack 8192
" >> /etc/security/limits.conf

```