# beancount-node-server

![release version](https://img.shields.io/github/v/release/BaoXuebin/beancount-node-server)
![license](https://img.shields.io/github/license/baoxuebin/beancount-node-server)

[演示地址](https://beancount.xdbin.com/)
[接口文档](https://github.com/BaoXuebin/beancount-node-server/blob/main/API.md)

## 介绍

[beancount](https://github.com/beancount/) 是一个优秀的开源复式记账工具，因为其基于文本记录的特性，难以拓展到移动端；本项目旨在将常见的记账行为提取出接口以供网络调用。

本仓库使用 `node` 进行文本的读写和网络服务支持，利用 `bean-query` `bean-report` 获取内容并解析，以 Json 格式返回。并基于已实现的接口内置实现了前端页面（适配移动端）。

![snapshot](https://cdn.xdbin.com/github/beancount-ns/snapshot.png)

## 特性

- [X] 私有部署
- [X] 多用户使用
- [X] 账户管理
- [X] 资产管理
- [X] 统计图表
- [X] 多币种(v1.1.0)
- [ ] 标签
- [ ] 事件
- [ ] 投资管理
- [ ] 第三方账单导入

# 安装

## 本地安装

1. 安装 [Node](https://nodejs.org/en/download/)  
2. 安装 [python3](https://www.python.org/downloads/)  
3. 安装 beancount  
    ```bash
    pip3 install beancount -i  https://pypi.tuna.tsinghua.edu.cn/simple
    ```
4. 克隆本项目或者下载下载Zip压缩包  
   ```bash
   git clone https://github.com/BaoXuebin/beancount-node-server.git
   ```
5. 启动服务  
   ```bash
   npm install # 或者使用 yarn install
   node server.js
   ```
6. 访问 `http://localhost:3001`

## NPM Package

1. 安装 [Node](https://nodejs.org/en/download/)  
2. 安装 [python3](https://www.python.org/downloads/)  
3. 安装 beancount  
    ```bash
    pip3 install beancount -i  https://pypi.tuna.tsinghua.edu.cn/simple
    ```
4. 全局安装 package
	```bash
	npm install beancount-ns -g
	```
5. `beancount-ns start` 启动服务
	```bash
    beancount-ns -h 查看帮助  
	beancount-ns -v 版本信息  

	# 自定义参数
    -p 端口号，，默认 3001
	-dp dataPath 路径，默认 /beancount
	-c operatingCurrency 币种，默认 CNY
	-d startDate 账本初始时间，默认 1970-01-01
	-b isBak 修改文件时是否自动备份，默认 true
   	```
6. 访问 `http://localhost:3001`

## Docker

![docker image version](https://img.shields.io/docker/v/xdbin/beancount-ns/latest?label=docker%20image%20tag)
![docker image size](https://img.shields.io/docker/image-size/xdbin/beancount-ns/latest?label=docker%20image%20size)

```docker
docker run --name benacount-ns -dp 10000:3001 \
-w /app \
-v "/data/beancount:/beancount" \
-v "/data/beancount/icons:/app/public/icons" \
xdbin/beancount-ns:latest \
sh -c "cp -rn /app/public/default_icons/* /app/public/icons && node server.js"
```

你也可以使用 `docker-compose` 启动镜像，创建 `docker-compose.yml` 文件（将下面的内容拷贝进文件）

```yml
version: "3.9"
services:
app:
	container_name: beancount-ns
	image: xdbin/beancount-ns:latest
	ports:
		- "10000:3001"
	# volumes 挂载目录会导 /app/public/icons 中的图标被覆盖，这里将默认图标在挂载后重新拷贝图标
	command: >
		sh -c "cp -rn /app/public/default_icons/* /app/public/icons && node server.js"
	volumes:
		- "${dataPath:-/data/beancount}:/beancount"
		- "${dataPath:-/data/beancount}/icons:/app/public/icons"
```

执行

```bash
# dataPath为beancount文件存放路径，默认 /data/beancount
export dataPath=/data/beancount && docker-compose up -d
```

# 使用

1. 项目启动后，浏览器访问 `http://localhost:3001`  
2. 首先需要输入唯一用户ID和密码创建一个账本  
2.1 **用户**主要是区分账本身份（这里推荐使用邮箱），并且限制了单个用户只能创建一个账本  
2.2 **密码**主要用于加密，当然也可以不填；**密码一旦忘记不能找回**  
1. 如果你想指定用户可用，可以在 `/config/white_list.json` 中添加用户；该文件默认为空，表示不指定用户白名单，如果该文件内容不为空，则只允许指定用户使用  
2. 项目初始化了一些常用的账户，你可以根据自己的情况自由改动，如果你之前未使用过 beancount，[awesome-beancount](https://github.com/siddhantgoel/awesome-beancount) 这个项目能给你更多的介绍。

## 旧版本数据兼容

**如果你之前已经使用该项目，在使用新的版本时，需要手动同步 `index.bean` 中的内容，将之前的 include 删除，添加下面内容**

```beancount
include "./includes.bean"
```

## 之前的 beancount 数据怎么导入？

1. 首先执行上面的步骤，创建一个账本
2. 将原有数据中的 account 定义数据按类型：Assets, Expenses, Income, Liabilities, Equity 分别放入对应文件中
3. 将 beancount 历史数据拷贝至 `history.bean` 文件，即可完成数据的导入
4. 由于 beancount 的高自由度，你的历史数据导入后可能会导致默认的账户分类无法兼容，可以在 `账户>>添加账户` 中选择 `+新增账户类型` 进行自定义，或者直接在 `账户>>编辑源文件` 中选择 `account_type.json` 进行修改，点击保存即可完成账户类型的自定义

> Tips  
> beancount 支持 account 的定义中包含中文，但是只能是最后一个节点（或者每个节点的第一个字符为英文，我不推荐这么定义，因为这会让 account 看起来很奇怪）。所以我习惯于将最后一个节点作为该 account 的中文注释。  
> 例如：如果要创建一个公交车出行和支付宝资产这两个账户：  
> 公交车出行定义为 `Expenses:Travel:Bus:公交车`，支付宝资产定义为 `Assets:EBank:AliPay:支付宝`


## 配置文件说明

### config/config.json

**title**: 账本名称  
**dataPath**: 账本存储位置，初始化账本时使用  
**operatingCurrency**: 账本币种
**startDate**: 账本创建时间，初始化账本时使用

### config/white_list.json

用户白名单，默认为空，不作限制；如需限制，在该文件中添加用户名称

### example/*

`example` 文件下为默认账本的结构和数据，你可以根据需要自行修改，文件中的 `%startDate%` 和 `%operatingCurrency%` 程序会在用户创建账本时自动替换的账本开始时间和币种，切勿修改

# 项目负责人

[@BaoXuebin](https://github.com/BaoXuebin)
# 开源协议

[MIT](https://github.com/BaoXuebin/beancount-node-server/blob/main/LICENSE) @BaoXuebin