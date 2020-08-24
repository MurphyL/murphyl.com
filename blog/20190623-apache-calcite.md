---
unique: apache-calcite
title: Apache Calcite：异构的数据查询引擎
author: murph
tags: [ Hadoop, OLAP ]
---

`Apache Calcite`是一款提供了标准的`SQL`语言支持数据查询引擎，起源于早期`Apache Hive`项目中的`optiq`。它的出现，能够很容易的为不同计算存储引擎套上一个`SQL`的外壳，并且能提供高效数据查询和性能优化手段。`Apache Calcite`作为数据管理框架，包含了数据库管理系统的许多部分，但省略了如数据的存储和处理数据的算法等其他部分。

<!-- more -->

在查询数据之前，需要编写一个个`Schema`来描述`Calcite`管理的数据结构——其实和使用`MySQL`并没有多少区别——不过这里仅仅是关系映射，底层通过定义各种适配器，来对接不同的查询和存储引擎，比如`ElasticSearch`、`HBase`、`MySQL`，甚至是`CSV`、`HDFS`等，这也就决定了它其实没有真正的“物理执行计划”。

值得一提的是，`Calcite`支持异构数据源查询，`SQL JOIN`之类的操作由`Calcite`分别先从不同的数据源查询数据，然后再在内存里进行合并计算。

`Apache Calcite`提供了许多优化规则，也支持我们自定义优化规则，来优化整个查询。