---
title: 开源ETL工具Kettle
author: "murph"
---

`ETL`是英文`Extract-Transform-Load`的缩写，用来描述将数据从来源端经过抽取（`extract`）、转换（`transform`）、加载（`load`）至目的端的过程。`ETL`一词较常用在数据仓库，但其对象并不限于数据仓库。目的是将企业中的分散、零乱、标准不统一的数据整合到一起，为企业的决策提供分析依据， `ETL`是`BI`项目重要的一个环节。

<!--- more --->

### PAN - Kettle服务端组件

```bash
# 服务短仓库配置文件
vi ${USER_HOME}/.kettle/repositories.xml
# 服务端启动
${KETTLE_HOME}/data-integration/carte.sh 0.0.0.0 8101
# JDBC Driver
${KETTLE_HOME}/pdi-ce-8.3.0.0-371/data-integration/lib
# 启动客户端可视化图像界面
${KETTLE_HOME}/pdi-ce-8.3.0.0-371/data-integration/Spoon.bat
```

### SPOON - 可视化图形界面