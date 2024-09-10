---
title: yashan数据库安装运营实操--崖山数据库
date: 2024-08-30 18:00:00
tags:
  - 数据库
categories:
  - 技术 
# top_img: false
# top_img: https://img02.anheyu.com/adminuploads/1/2022/09/05/6315e146a8bbd.webp
cover: https://img.fangsikai.com/i/2024/09/10/pangpm.png
thumbnail : https://img.fangsikai.com/i/2024/09/10/pangpm.png
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
[3.需要升级SSL](https://www.fangsikai.com/2024/08/30/linux/centos_openSSL/)
[4.VM虚拟机网卡ens33丢失](https://blog.csdn.net/chaochaodayizhi/article/details/126242395)

### 二 、创建安装用户
``` shell
#!/bin/bash
############################################################
## scripts: ysdb_user.sh
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

### 四、安装踩坑--安装版本问题
``` shell
安装成功：yashandb-personal-23.1.1.100-linux-x86_64.tar.gz 可以完成安装，并成功启动

安装失败：yashandb-personal-23.2.3.100-linux-x86_64.tar.gz 可以完成安装，无法部署，
报错信息：prohibited operation，please check if the IP and username are correct。检查无误。
```
### 五、执行安装过程

#### 1、以yashan的账户登录，创建inst 目录
``` bash
解压:  tar zxf yashandb-personal-23.2.3.100-linux-x86_64.tar.gz

```
#### 2、在inst 目录执行生成部署文件
注意给/home/yashan/yasdb_data、/home/yashan/yasdb_home 授权

``` bash

[yashan@localhost inst]$ sudo ./bin/yasboot package se gen --cluster yashandb -u yashan -p yashan --ip 192.168.230.135 --port 22 --install-path /home/yashan/yasdb_home  --data-path /home/yashan/yasdb_data --begin-port 1688
 hostid   | group | node_type | node_name | listen_addr          | replication_addr     | data_path
------------------------------------------------------------------------------------------------------------------
 host0001 | dbg1  | db        | 1-1       | 192.168.230.135:1688 | 192.168.230.135:1689 | /home/yashan/yasdb_data
----------+-------+-----------+-----------+----------------------+----------------------+-------------------------

Generate config success


```

#### 3、执行部署,注意 prog=100标识部署完成

``` shell

[yashan@localhost inst]$ sudo ./bin/yasboot cluster deploy -t yashandb.toml
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 task | 39bfc7e3b93423b6 | DeployYasdbCluster | -      | yashandb | RUNNING | -           | 0        | -
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | progress | cost
------------------------------------------------------------------------------------------------------------
 type | uuid             | name               | hostid | index    | status  | return_code | prog
------------------------------------------------------------------------------------------------
 task | 39bfc7e3b93423b6 | DeployYasdbCluster | -      | yashandb | SUCCESS | 0           | 100
------+------------------+--------------------+--------+----------+---------+-------------+-----
task completed, status: SUCCESS


```
如部署出现问题，可以清除,在重新部署

``` shell
[yashan@localhost inst]$ sudo ./bin/yasboot cluster clean --cluster yashandb --purge
Are you sure you want to CLEAN cluster: [yashandb], AND ALL DATA WILL BE DELETED (-p/--purge is given)?
[yes/no]: yes
 type | uuid             | name              | hostid | index    | status  | return_code | progress | cost
-----------------------------------------------------------------------------------------------------------
 type | uuid             | name              | hostid | index    | status  | return_code | progress | cost
-----------------------------------------------------------------------------------------------------------
 task | da56493acbf07873 | CleanYasdbCluster | -      | yashandb | SUCCESS | 0           | 100      | 1
------+------------------+-------------------+--------+----------+---------+-------------+----------+------
task completed, status: SUCCESS

```
#### 4、配置环境变量

``` shell
$ cd /home/yashan/yasdb_home/yashandb/23.1.1.100/conf
# 如~/.bashrc中已存在YashanDB相关的环境变量，将其清除

$ cat yashandb.bashrc >> ~/.bashrc
$ source ~/.bashrc


```

#### 5、修改数据库初始密码文件

``` shell
$ cd /home/yashan/yasdb_data/db-1-1/instance
$ mv yasdb.pwd yasdb1.pwd
$ yaspwd file=yasdb.pwd
Enter password for SYS:

注意：数据库密码如有@字符，会导致yasql链接不上
```
#### 6、查看数据库实例

``` shell
[yashan@localhost instance]$ yasboot cluster status -c yashandb
 host_id  | node_type | nodeid | pid
---------------------------------------
 host0001 | db        | 1-1:1  | 72746
----------+-----------+--------+-------

```

#### 7、yasql连接接数据库并查询

``` sql 
[yashan@localhost instance]$ yasql sys/fang!@#123
Connected to:
YashanDB Server Personal Edition Release 23.1.1.100 x86_64 - X86 64bit Linux


-- 查询数据库id
SQL> select database_id from v$database;

          DATABASE_ID
---------------------
           2226856082

1 row fetched.


-- 查询数据库实例状态
SQL> SELECT status FROM V$INSTANCE;

STATUS
-------------
OPEN

1 row fetched.

```


#### 8、关闭/启动数据库

``` sql
--- 关机
[yashan@localhost instance]$ yasboot cluster stop -c yashandb
 type | uuid             | name             | hostid | index    | status  | return_code | progress | cost
----------------------------------------------------------------------------------------------------------
 type | uuid             | name             | hostid | index    | status  | return_code | progress | cost
----------------------------------------------------------------------------------------------------------
 type | uuid             | name             | hostid | index    | status  | return_code | progress | cost
----------------------------------------------------------------------------------------------------------
 task | c16eafa57641c31a | StopYasdbCluster | -      | yashandb | SUCCESS | 0           | 100      | 2
------+------------------+------------------+--------+----------+---------+-------------+----------+------
task completed, status: SUCCESS

---开机
[yashan@localhost instance]$ yasboot cluster start -c yashandb
 type | uuid             | name              | hostid | index    | status  | return_code | progress | cost
-----------------------------------------------------------------------------------------------------------
 type | uuid             | name              | hostid | index    | status  | return_code | progress | cost
-----------------------------------------------------------------------------------------------------------
 type | uuid             | name              | hostid | index    | status  | return_code | progress | cost
-----------------------------------------------------------------------------------------------------------
 task | a378db90e21e770d | StartYasdbCluster | -      | yashandb | SUCCESS | 0           | 100      | 3
------+------------------+-------------------+--------+----------+---------+-------------+----------+------
task completed, status: SUCCESS

-- 重启数据库--至open
[yashan@localhost instance]$ yasboot cluster restart -c yashandb
 type | uuid             | name                | hostid | index    | status  | return_code | progress | cost
-------------------------------------------------------------------------------------------------------------
 type | uuid             | name                | hostid | index    | status  | return_code | progress | cost
-------------------------------------------------------------------------------------------------------------
 type | uuid             | name                | hostid | index    | status  | return_code | progress | cost
-------------------------------------------------------------------------------------------------------------
 task | d9bc834c5978e824 | ReStartYasdbCluster | -      | yashandb | SUCCESS | 0           | 100      | 4
------+------------------+---------------------+--------+----------+---------+-------------+----------+------
task completed, status: SUCCESS
-- 重启数据库--至nomount
[yashan@localhost instance]$ yasboot cluster restart -c yashandb -m nomount

 type | uuid             | name                | hostid | index    | status  | return_code | progress | cost
-------------------------------------------------------------------------------------------------------------
 type | uuid             | name                | hostid | index    | status  | return_code | progress | cost
-------------------------------------------------------------------------------------------------------------
 type | uuid             | name                | hostid | index    | status  | return_code | progress | cost
-------------------------------------------------------------------------------------------------------------
 type | uuid             | name                | hostid | index    | status  | return_code | progress | cost
-------------------------------------------------------------------------------------------------------------
 task | d2bbaff1452b741e | ReStartYasdbCluster | -      | yashandb | SUCCESS | 0           | 100      | 5
------+------------------+---------------------+--------+----------+---------+-------------+----------+------
task completed, status: SUCCESS

-- 重启数据库--至mount
[yashan@localhost instance]$ yasboot cluster restart -c yashandb -m mount
 type | uuid             | name                | hostid | index    | status  | return_code | progress | cost
-------------------------------------------------------------------------------------------------------------
 type | uuid             | name                | hostid | index    | status  | return_code | progress | cost
-------------------------------------------------------------------------------------------------------------
 type | uuid             | name                | hostid | index    | status  | return_code | progress | cost
-------------------------------------------------------------------------------------------------------------
 type | uuid             | name                | hostid | index    | status  | return_code | progress | cost
-------------------------------------------------------------------------------------------------------------
 task | 5651433b842f6395 | ReStartYasdbCluster | -      | yashandb | SUCCESS | 0           | 100      | 5
------+------------------+---------------------+--------+----------+---------+-------------+----------+------
task completed, status: SUCCESS





```
### 六、客户端无法连接数据库
``` shell
a、查看端口情况：lsof -i:1688
[root@localhost yasdb_data]# lsof -i:1688
COMMAND   PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
yasdb   75868 yashan   16u  IPv4 187542      0t0  TCP localhost.localdomain:nsjtp-data (LISTEN)

b、查看防火墙情况：
[root@localhost yasdb_data]# firewall-cmd --list-all
public (active)
  target: default
  icmp-block-inversion: no
  interfaces: ens33
  sources:
  services: dhcpv6-client ssh
  ports:
  protocols:
  masquerade: no
  forward-ports:
  source-ports:
  icmp-blocks:
  rich rules:
c、添加防火墙端口
[root@localhost yasdb_data]# firewall-cmd --add-port=1688/tcp --permanent
success
[root@localhost yasdb_data]# firewall-cmd --reload
success

d、查看防火墙情况，注意端口已添加

[root@localhost yasdb_data]# firewall-cmd --list-all
public (active)
  target: default
  icmp-block-inversion: no
  interfaces: ens33
  sources:
  services: dhcpv6-client ssh
  ports: 1688/tcp
  protocols:
  masquerade: no
  forward-ports:
  source-ports:
  icmp-blocks:
  rich rules:
e、使用telnet测试端口,测试通，则驱动可以链接

telnet 192.168.230.135 1688 


```