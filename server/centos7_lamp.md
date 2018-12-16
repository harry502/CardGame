# Centos 7 安装 lamp 环境 （yum安装） #
本文转载自：[Centos 7 安装 lamp 环境 （yum安装）](https://blog.csdn.net/weixin_42242253/article/details/81112263)
## 配置防火墙 ##
CentOS 7.0默认使用的是防火墙作为防火墙。（防火墙在Centos 7默认打开）

关闭防火墙：
```shell
#停止firewall
systemctl stop firewalld.service 
#禁止firewall开机启动
systemctl disable firewalld.service
```

## 关闭SELINUX ##
```shell
vi /etc/selinux/config
#注释掉
#SELINUX=enforcing 
#增加
SELINUX=disabled 
#保存退出
:wq! 
#使配置立即生效
setenforce 0
```

## 安装的Apache ##
```shell
#根据提示，输入Y安装即可成功安装
yum install httpd 
#启动apache
systemctl start httpd.service 
#停止apache
systemctl stop httpd.service 
#重启apache
systemctl restart httpd.service 
#设置apache开机启动
systemctl enable httpd.service
```

## 安装MariaDB的（MySQL的） ##
```shell
#询问是否要安装，输入Y即可自动安装,直到安装完成
yum install mariadb mariadb-server
#启动MariaDB
systemctl start mariadb.service 
#停止MariaDB
systemctl stop mariadb.service 
#重启MariaDB
systemctl restart mariadb.service 
#设置开机启动
systemctl enable mariadb.service
```
常用mysql操作
```shell
#修改root密码
set password for 'root'@'localhost'=password('root');
#创建mysql用户
CREATE USER 'card'@'%' IDENTIFIED BY '123456'; 
#mysql授权远程连接（navicat等）
grant all on *.* to 'card'@'%';
```

## 安装PHP以及组件，使用PHP支持MariaDB ##
```shell
#这里选择以上安装包进行安装，根据提示输入Y回车
yum install php php-mysql php-gd libjpeg* php-ldap php-odbc php-pear php-xml php-xmlrpc php-mbstring php-bcmath php-mhash php-devel
#重启MariaDB
systemctl restart mariadb.service 
#重启apache
systemctl restart httpd.service
```

## 测试 ##
```shell
cd /var/www/html
vi index.php

#输入下面内容
<?PHP phpinfo();?>

#保存退出
:WQ!

#在客户端浏览器输入服务器的IP地址，可以看到如下图所示相关的配置信息！
```