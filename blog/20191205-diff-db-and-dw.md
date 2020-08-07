---
title: 数据仓库和数据库的区别
author: "murph"
---

今天和同事做分享，被问及这个问题时禁不住一窒，好像从来没有思考过这个问题，抑或是注入此类的问题。打哈哈的同时，竟然在心里调笑起了曾经的自己：对，“数据库”是“数据仓库”简称。二者之间没有任何区别……呸，是时候自我敲打了！嗯，是的！！！数据库和数据仓库当然是两种不同的东西，“盲人摸象”的话，它们似乎别无二致；但若要深究起来，区别还是显而易见的。

<!--more-->

既然说本质区别，一个是为了响应时间，一个是为了吞吐量。

数据仓库（Data Warehouse）是一个面向主题的（Subject Oriented）、集成的（Integrate）、相对稳定的（Non-Volatile）、反映历史变化（Time Variant）的数据集合，用于支持管理决策。

1. 面向主题：指数据仓库中的数据是按照一定的主题域进行组织；
1. 集成：指对原有分散的数据库数据经过系统加工, 整理得到的消除源数据中的不一致性；
1. 相对稳定：指一旦某个数据进入数据仓库以后只需要定期的加载、刷新；
1. 反映历史变化：指通过这些信息，对企业的发展历程和未来趋势做出定量分析预测。

数据仓库建设是一个工程，是一个过程，而不是一种可以购买的产品。企业数据处理方式是以联机事务处理形式信息，并利用信息进行决策；在信息应用过程中管理信息。

数据仓库的出现，并不是要取代数据库。目前，大部分数据仓库还是用关系数据库管理系统来管理的。数据仓库与数据库的主要区别在于：

1. 数据库是面向事务的设计，数据仓库是面向主题设计的；
1. 数据库一般存储在线交易数据，数据仓库存储的一般是历史数据；
1. 数据库设计是尽量避免冗余，数据仓库在设计是有意引入冗余；
1. 数据库是为捕获数据而设计，数据仓库是为分析数据而设计。

简而言之，数据库是面向事务的设计，数据仓库是面向主题设计的。

数据库一般存储在线交易数据，数据仓库存储的一般是历史数据。

数据库设计是尽量避免冗余，一般采用符合范式的规则来设计，数据仓库在设计是有意引入冗余，采用反范式的方式来设计。

数据库是为捕获数据而设计，数据仓库是为分析数据而设计，它的两个基本的元素是维表和事实表。