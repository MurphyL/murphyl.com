---
unique: a-mini-hadoop-cluster
title: 搭建一个小规模的Hadoop集群
author: murph
tags: [ Hadoop ]
---

在公司里搭建了一个小规模的`Hadoop`集群，用以处理异构的数据。一初选型时可能有些武断，但是为了快速响应“适用大多数场景，最好能够实用`SQL`之类的语句快速开发”的需求，因而也就选了这个相对熟悉的技术栈。由于此前没有`Hadoop`集群的运维经验，折腾的过程也就是照着文档来回倒腾，算是废了些功夫。本文简单的记录了操作过程，也许此后能够用得着。

<!-- more -->

### 集群规划

为了便于文案描述得方便，本文以三个实体节点来记录是如何搭建一个小型的分布式`Hadoop`集群。后文将以`hadoop1`、`hadoop2`、`hadoop3`分别命名三个节点，初步规划一下集群中的各个组件。

|  节点   | 部署组件  |
| :----: | :----: |
| hadoop1  | NameNode、ResourceManager |
| hadoop2  | DataNode、Secondary NameNode |
| hadoop3  | DataNode、NodeManager |

### 前期准备

1. 设置各节点的`hostname`，分别命名为`hadoop1`、`hadoop2`、`hadoop3`；

```sh
# 配置Hostname
vi /etc/hostname
```

2. 修改各节点`hosts`文件，使彼此之间能够通过节点名称互相访问；

```sh
# 修改Hosts文件
vi /etc/hosts
```

3. 为个节点创建名为`hadoop`的用户，然后配置节点间`hadoop`用户的`SSH`免密登陆；

```sh
# 生成SSH密钥
ssh-keygen -t rsa ~/.ssh/id_rsa

# 配置密钥文件到指定用户
ssh-copy-id ~/.ssh/id_rsa.pub hadoop@hadoop1
```

### 组件部署