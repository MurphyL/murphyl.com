---
unique: a-mini-hadoop-cluster
title: 搭建一个小规模的Hadoop集群
author: murph
tags: [ Hadoop ]
release: true
---

在公司里搭建了一个小规模的`Hadoop`集群，用以处理异构的数据。一初选型时可能有些武断，但是为了快速响应“适用大多数场景，最好能够实用`SQL`之类的语句快速开发”的需求，因而也就选了这个相对熟悉的技术栈。由于此前没有`Hadoop`集群的运维经验，折腾的过程也就是照着文档来回倒腾，算是废了些功夫。本文简单的记录了操作过程，也许此后能够用得着。

<!-- more -->

### 集群规划

为了便于文案描述得方便，本文以三个实体节点来记录是如何搭建一个小型的分布式`Hadoop`集群。后文将以`hadoop1`、`hadoop2`、`hadoop3`分别命名三个节点，初步规划一下集群中的各个组件。

|  节点   | 部署组件  |
| :----: | :----: |
| hadoop1  | NameNode、NodeManager、DataNode |
| hadoop2  | Secondary NameNode、NodeManager、DataNode |
| hadoop3  | ResourceManager、NodeManager、DataNode |

### 前期准备

在部署`Hadoop`集群的各组件之前，需要对各个节点做一些前期的准备工作，这些事项是必须的。

- 设置各节点的`hostname`，分别命名为`hadoop1`、`hadoop2`、`hadoop3`；

```sh
# 配置Hostname
vi /etc/hostname
```

- 修改各节点`hosts`文件，使彼此之间能够通过节点名称互相访问；

```sh
# 修改Hosts文件
vi /etc/hosts
```

- 为个节点创建名为`hadoop`的用户，然后配置节点间`hadoop`用户的`SSH`免密登陆；

```sh
# 创建Hadoop用户
useradd -m hadoop

# 生成SSH密钥
ssh-keygen -t rsa ~/.ssh/id_rsa

# 配置密钥文件到指定用户
ssh-copy-id ~/.ssh/id_rsa.pub hadoop@hadoop1
```

- 使用`hadoop`用户创建数据目录；

```sh
# 创建用户组
groupadd supergroup

# 创建hive用户
useradd -m -g supergroup hive

# 创建数据目录
mkdir -p /data/hadoop/hdfs/datanode /data/hadoop/hdfs/namenode /data/hadoop/tmp

# 修改各个数据目录的权限
sudo chown -R hive:supergroup /data/hadoop/hdfs/datanode
sudo chown -R hive:supergroup /data/hadoop/hdfs/namenode
sudo chown -R hive:supergroup /data/hadoop/tmp
```

### 组件部署

`Hadoop`集群中，最主要的组件是`HDFS`和`YARN`。

- `HDFS`是分布式的文件存储系统，用以存储和管理待处理的数据；
- `YARN`是一个资源调度模块，负责管理与分配集群资源（内存、`CPU`等）、以及客户端提交的任务；

**Ps**. `Map/Reduce`和上文的`HDFS`和`YARN`有所不同，它是抽象的编程框架。`Map/Reduce`任务的逻辑由用户编写，多半是处理`HDFS`中准备好的数据；`YARN`接收并管理客户端提交的`Map/Reduce`任务，负责给任务分配必须的资源。

> 前期安装，配置操作暂且略过，本位仅记录了主要的运维操作

#### 启动`HDFS`

> 仅在`NameNode`节点操作即可。

```sh
# 格式化NameNode
$HADOOP_HOME/bin/hadoop namenode -format

# 若是重启节点，则先停止相应的服务
# $HADOOP_HOME/sbin/stop-dfs.sh

# 启动NameNode
$HADOOP_HOME/sbin/start-dfs.sh

# 通过Web UI确认HDFS状态
curl http://0.0.0.0:50070
```

#### 启动`YARN`

> 仅在`ResourceManager`节点操作即可。

```sh
# 若是重启节点，则先停止相应的服务
# $HADOOP_HOME/sbin/stop-yarn.sh

# 启动Yarn服务
$HADOOP_HOME/sbin/start-yarn.sh

# 通过Web UI确认YARN状态
curl http://0.0.0.0:8088/cluster
```


### 参考资料

- [HDFS Commands Guide](https://hadoop.apache.org/docs/r2.7.1/hadoop-project-dist/hadoop-hdfs/HDFSCommands.html#dfs)