---
unique: shell-dev-tips
title: Shell脚本开发技巧
author: murph
release: true
tags: [ Linux ]
---

摆弄`Linux`的时候难免会接触到各种类型的`Shell`脚本。使用的时候可能没什么感觉，但写过脚本的小伙伴多少能够体会：`Shell`的坑可不是一般的多。尽管`Shell`是一门并不怎么严谨的语言，然而很多时候又不得不用。最近折腾了一阵子，从各处扒来了些有用的`Tips`，简单的整理下以备后用。由于`Shell`解释器种类繁多，本文的内容均针对`Bash`（Bourne-Again Shell）描述记录。

<!-- more -->

## `fail-fast`和错误处理

在`Shebang`之后加上下面这一句，能避免很多问题，更重要的是能让很多隐藏的问题暴露出来。加上这些选项后有时候可能会不太方便，动不动就退出。但还是应该坚持`fail-fast` 原则，也就是有异常时停止正常运行，而不是继续尝试运行可能存在缺陷的过程。

```bash
set -x -e -u -o pipefail   # 也可以缩写为 set -xeuo pipefail
```

下面简单的说明一下每个参数的作用：

- `-x`：在执行每一个命令之前，把经过变量展开之后的命令打印出来；

> 这个在调试脚本时非常有用，正式运行的脚本可以去掉

- `-e`：遇到失败命令（返回码非零）时，脚本将立即退出执行；

> `Shell`有一点非常不好，脚本执行异常时会继续运行下一条命令

- `-u`：试图访问未定义的变量，就立即退出；

> 如果在`Shell`脚本中使用一个未定义的变量，默认是会展开成一个空串

- `-o pipefail`：只要管道中的一个子命令失败，整个管道命令就失败；

> `pipefail`与`-e`结合使用的话，就可以做到管道中的一个子命令失败，就退出脚本

## 用`readonly`来声明静态变量

静态变量不会改变，它的值一旦在脚本中定义后不能被修改：

```bash
readonly JAVA_HOME="$HOME/Download/java-1.8.16"
```

## 环境变量用大写字母命名，而自定义变量用小写

所有的`Bash`环境变量用大写字母去命名，因此用小写字母来命名你的自定义变量以避免变量名冲突：

```bash
# 定义自定义变量用小写，而环境变量用大写
JAVA_HOME="$HOME/Download/java-1.8.16"
export PATH=$PATH:$JAVA_HOME
```

## 参考资料

- [Bash脚本教程](https://wangdoc.com/bash/)
- [编写可靠Bash脚本的一些技巧](https://mp.weixin.qq.com/s/bXc-ZnCDoxa82-tgVtyaVg)
- [Linux中高效编写Bash脚本的10个技巧](https://linux.cn/article-8618-1.html)