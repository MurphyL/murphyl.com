---
title: 使用Dockerfile制作镜像
author: "murph"
---

`Dockerfile`是由一系列命令和参数构成的脚本，把重复的工作集中到一个配置文件中，极大的简化了`Docker`的工作流。`Dockerfile`的语法非常简单！一般的，`Dockerfile`分为四部分：基础镜像信息、维护者信息、镜像操作指令和容器启动时执行指令。

<!--- more --->

一个简单的例子：

```dockerfile
#第一行必须指令基于的基础镜像
FROM ubutu

#维护者信息
MAINTAINER docker_user  docker_user@mail.com

#镜像的操作指令
RUN apt-get update && apt-get install -y ngnix 
RUN echo "\ndaemon off;">>/etc/ngnix/nignix.conf

#容器启动时执行指令
CMD /usr/sbin/ngnix

```