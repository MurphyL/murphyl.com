---
unique: dockerfile
title: 使用Dockerfile制作镜像
author: "murph"
release: true
---

`Dockerfile`的作用是将工作环境初始化的每个步骤以指令的形式存放在一个文件中，最后通过`docker build`指令生成相应的镜像，从而实现通过基础指令快速地运行多个相同配置的运行环境……这极大的简化了`Docker`的工作流，避免了大量的重复操作，也能很好的避免因为操作的差异而引入的环境差异。`Dockerfile`的语法非常简单，一般的，`Dockerfile`分为四部分：基础镜像信息、维护者信息、镜像操作指令和容器启动时执行指令。

<!--- more --->

### 创建`Dockerfile`文件

创建一个名为`Dockerfile`的文件，基础内容如下：

```dockerfile
# 第一行必须指令基于的基础镜像
FROM ubutu

# 维护者信息
MAINTAINER docker_user  docker_user@mail.com

# 镜像的操作指令
RUN apt-get update && apt-get install -y ngnix 
RUN echo "\ndaemon off;">>/etc/ngnix/nignix.conf

# 容器启动时执行指令
CMD /usr/sbin/ngnix
```

### `Dockerfile`常用指令

#### `FROM`：指定基础镜像

`FROM`是用来指定基础镜像，这个命令是`Dockerfile`中必备的指令，并且必须是第一条指令。

> 假如不需要基础镜像，可以使用空白镜像`scratch`作为基础镜像。`scratch`这个镜像是虚拟的，实际并不存在。

#### `RUN`：执行命令

从上面的例子中可以看到`RUN`可以执行一个`shell`命令。编写`Dockerfile`的时候需要尽可能将指令链接起来，因为`Dockerfile`中的每一条指令都会建立一层，如果建立太多层，不仅会使得镜像非常臃肿，也会增加构建时间。


正确的做法是，使用`&&`将多条命令合并为一条，并且删除不必要的文件、清理`apt`缓存等，尽量保持容器干净。如果没有做清理工作的话，这些冗余的文件等将会带到下一层，并且会一直跟随镜像。

```dockerfile
FROM debian:stretch

RUN buildDeps='gcc libc6-dev make wget' \
    && apt-get update \
    && apt-get install -y $buildDeps \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && mkdir -p /usr/src/redis \
    && tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1 \
    && make -C /usr/src/redis \
    && make -C /usr/src/redis install \
    && rm -rf /var/lib/apt/lists/* \
    && rm redis.tar.gz \
    && rm -r /usr/src/redis \
    && apt-get purge -y --auto-remove $buildDeps
```

#### `WORKDIR`：指定工作目录

当使用`WORKDIR`指定工作路径后，以后的每一层的当前目录都会被改为工作目录，如果目录不存在，`WORKDIR`会帮助我们创建目录。

如果需要改变以后各层的工作目录的位置，只需要再使用`WORKDIR`指令即可。

#### `COPY`：复制文件

`COPY`用于将本地的文件资源拷贝到工作环境。源路径可以是多个，也可以使用通配符，例如下面这样：

```dockerfile
COPY hom* /mydir/
COPY hom?.txt /mydir/
```

目标路径可以是容器内的绝对路径，也可以相对工作目录的相对路径。目标路径不需要我们创建，如果目标路径不存在会在复制文件前先行创建缺失的目录。

使用`COPY`复制文件时，会保留文件的元数据，比如读写权限，文件变更的时间等。如果需要修改文件的所属用户及所属组，可以通过添加`--chown=<user>:<group>`项进行修改。

#### `CMD`：容器启动命令

`CMD`指令格式分为两类：

1. `CMD <命令>`
2. `CMD ["可执行文件", "参数1", "参数2"]`

第一种形式的指令会被包装成`sh -c`的形式进行执行，比如：`CMD echo $HOME`在实际执行中，将会变成`CMD [ "sh", "-c", "echo $HOME" ]`。

第二种类型的指令会被解析成`JSON`数组，所以只能够使用双引号，而不能使用单引号。


> 当然，`Dockerfile`的指令远不止如此。

### 用`Dockerfile`创建并实用镜像

当我们的代码编写完成后，就可以执行`docker build -t <name>:<tag> ${DOCKER_FILE_PATH}`，将代码打包成一个`Docker`镜像侯`push`到镜像仓库中。使用时只需要执行`docker run <name>:<tag>`，这不仅减少了安装环境的时间，也保证了运行环境的一致性。


### 参考文章

- [使用 Dockerfile 制作镜像](https://zhuanlan.zhihu.com/p/88387401)