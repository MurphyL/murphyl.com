---
id: linux-shell-script
title: Linux Shell 脚本开发
sidebar_label: Linux Shell 脚本开发
---

## 0. set -x -e -u -o pipefail

在写脚本时，在一开始（Shebang 之后）加上下面这一句，或者它的缩略版，能避免很多问题，更重要的是能让很多隐藏的问题暴露出来：

> set -xeuo pipefail

下面说明每个参数的作用，以及一些例外的处理方式 ：

-x ：在执行每一个命令之前把经过变量展开之后的命令打印出来。

这个对于 debug 脚本、输出 Log 时非常有用。正式运行的脚本也可以不加。

-e ：遇到一个命令失败（返回码非零）时，立即退出。

bash 跟其它的脚本语言最大的不同点之一，应该就是遇到异常时继续运行下一条命令。这在很多时候会遇到意想不到的问题。加上 -e ，会让 bash 在遇到一个命令失败时，立即退出。


## 参考资料

https://mp.weixin.qq.com/s/bXc-ZnCDoxa82-tgVtyaVg