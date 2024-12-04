---
title: MYSQL5.7 通过frm、ibd还原数据库
date: 2024-12-04 11:30:00
tags:
  - 数据库
categories:
  - 技术 
# top_img: false
# top_img: https://img02.anheyu.com/adminuploads/1/2022/09/05/6315e146a8bbd.webp
cover: https://img.fangsikai.icu/i/2024/09/10/pangpm.png
thumbnail : https://img.fangsikai.icu/i/2024/09/10/pangpm.png
---

### Mysql 数据库安装

数据库：MYSQL 版本 5.7

操作系统：Windows 11 专业版 22H2

情况：由于使用微信迁移C盘，导致数据库服务中断，使用原msi文件进行安装部署，无法安装成功。

思路：使用绿色版数据库进行安装，下载好MYSQL5.7.17，由于关键文件ibdata1缺失，只有frm、ibd文件，

故可以用MySQL Utilities工具进行还原数据库。


下载地址：

https://cdn.mysql.com/archives/mysql-5.7/mysql-5.7.17-winx64.zip

下载地址：

https://cdn.mysql.com/archives/mysql-utilities/mysql-utilities-1.6.5-winx64.msi



操作步骤：

1、安装对应版本的MYSQL

my.ini 文件配置

``` shell
[mysql]
default-character-set=utf8

[mysqld]
port=3306

basedir="D:\Programs\mysql-5.7.17-winx64"

datadir="D:\Programs\mysql-5.7.17-winx64\data"

max_connections=200

character-set-server=utf8

default-storage-engine=INNODB

# 开启binlog
log_bin=mysql-bin
binlog-format=ROW
server-id=1001

```
环境变量配置：添加PATH=D:\Programs\mysql-5.7.17-winx64\bin

初始化MYSQL

``` shell
mysqld --initialize

mysqld --install 【服务名】

net start 【服务名】

net stop  【服务名】

sc delete 【服务名】
```
修改密码

```sql
mysql -uroot  --无密码登录
mysql -uroot -p 密码

-- 更新root密码
use mysql;

UPDATE user SET authentication_string=PASSWORD("xxxxxx") WHERE User="root";
```


### MySQL Utilities 数据库安装


使用链接工具可以进入mysql后，安装MySQL Utilities，配置环境变量：

PATH=D:\Program Files\MySQL\MySQL Utilities 1.6\


1、拷贝.frm 文件到data/数据库名称，目录下
原理：.frm文件存储的是表的结构信息；.ibd 文件存储的是表对应的数据信息
还原步骤：
1、先使用.frm恢复表结构；2、再使用.ibd恢复数据；

操作过程:

```shell
1、恢复表结构
执行示例：mysqlfrm --server=root:rootpassword@localhost mydb:mytable.frm --port=3307，获取到创建表的sql；

代码示范：mysqlfrm --server=root:fangsikai1987@localhost taobao:tb_device.frm --port=3307

数据库名：taobao

数据表名：tb_device

文件：tb_device.frm,  tb_device.ibd

端口：3307 注意端口与数据库不能公用，是自定义的端口

此时，data目录中的.frm文件需要被删除，重新执行创建sql；
```


2、恢复数据
a、创建表时，创建默认的.ibd文件，需要移除表空间操作，删除数据文件；
b、拷贝备份的.ibd数据文件到对应的目录，挂接表空间；

从CMD窗口拷贝的创建表--示例：
``` mysql
CREATE TABLE `taobao`.`tb_device` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pn_number` varchar(100) DEFAULT NULL COMMENT '',
  `name` varchar(100) DEFAULT NULL COMMENT '',
  `desc` varchar(1000) DEFAULT NULL COMMENT '',
  `device_type` varchar(100) DEFAULT NULL COMMENT '',
  `brand` varchar(100) DEFAULT NULL COMMENT '',
  `release_date` date DEFAULT NULL COMMENT '',
  `folder_path` varchar(200) DEFAULT NULL ,
  `done` int(11) DEFAULT '0' ,
  `param_done` int(11) DEFAULT '0' ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;
```

表空间操作--代码示范:
``` mysql


执行删除表空间

ALTER TABLE `taobao`.`tb_device` DISCARD TABLESPACE;

拷贝备份的.ibd 文件到data/数据库名称，执行表空间变更

ALTER TABLE `taobao`.`tb_device` IMPORT TABLESPACE;

```