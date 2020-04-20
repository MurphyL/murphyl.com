---
id: linux-system-info
title: 获取 Linux 的系统信息
sidebar_label: 获取 Linux 的系统信息
---

## CPU

`CPU`信息：

> lscpu

## 内存

> free -m

## 硬盘

使用以下命令列出已挂载的文件系统和它们的挂载点，以及已用的空间和可用的空间（兆字节为单位）：

> df -m

## 网络

`ifconfig`是显示网络接口的传统命令：

> ifconfig -a

## 系统

内核版本是多少，以及它是 64 位的吗？网络主机名是什么？使用下面的命令查出结果：

> uname -a

## 参考文档

- [用 Linux 命令显示硬件信息](https://linux.cn/article-11422-1.html)
- [10 篇有用的 Linux 命令教程](https://zhuanlan.zhihu.com/p/114350735)
- [网络故障诊断调试工具](https://mp.weixin.qq.com/s/E1M5ro-S1NHAhzkk3ZinNw)