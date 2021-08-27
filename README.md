# beancount-node-server

![release version](https://img.shields.io/github/v/release/BaoXuebin/beancount-node-server)
![docker image version](https://img.shields.io/docker/v/xdbin/beancount-ns/1.0?label=docker%20image%20tag)
![docker image size](https://img.shields.io/docker/image-size/xdbin/beancount-ns/1.0?label=docker%20image%20size)

[演示地址](http://81.69.252.147:10000/)
[接口文档](https://github.com/BaoXuebin/beancount-node-server/blob/main/API.md)

## 介绍

[beancount](https://github.com/beancount/) 是一个优秀的开源复式记账工具，因为其基于文本记录的特性，难以拓展到移动端；本项目旨在将常见的记账行为提取出接口以供网络调用。

本仓库使用 `node` 进行文本的读写和网络服务支持，并基于已实现的接口内置实现了前端页面（适配移动端）。

## 使用

### 本地使用

1. 安装 `python3` 环境，下载 `beancount`，`pip3 install beancount`
2. 执行 `git clone https://github.com/BaoXuebin/beancount-node-server.git` 克隆本项目
3. 执行 `node server.js` 启动服务
4. 访问 `http://localhost:3001`，并创建一个账本

> 为了支持多人同时使用，创建账本时需要填入用户（唯一字符串）和密码  
> **用户**主要是区分账本身份（这里推荐使用邮箱），并且限制了单个用户只能创建一个账本   
> **密码**主要用于加密，当然也可以不填  
> 程序会自动创建一个文件目录（ `sha1(用户+密码)`）作为存放该用户 beancount 文件的目录

### 之前的 beancount 数据怎么导入？

1. 首先执行上面的步骤，创建一个账本
2. 将原有数据中的 account 定义数据按类型：Assets, Expenses, Income, Liabilities, Equity 分别放入对应文件中
3. 将 beancount 历史数据拷贝至 `history.bean` 文件，即可完成数据的导入
4. 由于 beancount 的高自由度，你的历史数据导入后可能会导致默认的账户分类无法兼容，可以在 `账户>>添加账户` 中选择 `+新增账户类型` 进行自定义，或者直接在 `账户>>编辑源文件` 中选择 `account_type.json` 进行修改，点击保存即可完成账户类型的自定义
5. 自定义图标。内置的图标在 `你的项目路径/public/icons` 目录下，account 取**倒数最后一个以英文字母开头**的词作为 icon 名称，你可以按此规则将下载的图标重命名后移动到图标目录。
    1. Assets:Bank:ICBC:工行1234 -> icon=ICBC
    2. Assets:Bank:ICBC:ICBC工行1234 -> icon=ICBC工行1234

> Tips  
> beancount 支持 account 的定义中包含中文，但是只能是最后一个节点（或者每个节点的第一个字符为英文，我不推荐这么定义，因为这会让 account 看起来很奇怪）。所以我习惯于将最后一个节点作为该 account 的中文注释。  
> 例如：如果要创建一个公交车出行和支付宝资产这两个账户：  
> 公交车出行定义为 `Expenses:Travel:Bus:公交车`，支付宝资产定义为 `Assets:EBank:AliPay:支付宝`


## 配置文件

`config/config.json`  

**title**: 账本名称  
**dataPath**: 账本存储位置，初始化账本时使用  
**operatingCurrency**: 账本币种
**startDate**: 账本创建时间，初始化账本时使用

`account_type.json`

用于对 beancount 的 account 进行归类，当创建一个账本后，会默认在账本对应目录维护一个用于该账本的 account_type.json 文件

`init_data.json`

默认的 beancount 初始化 account 内容

`white_list.json` 

用户白名单，默认为空，不作限制；如需限制，在该文件中添加用户名称

## 部署
### Docker

1. `git clone` 项目到本地
2. `cd beancount-node-server` 切换到项目根目录
3. `docker build -t beancount-node-server .` 打包镜像
4. `docker-compose up -d` 容器运行

> docker-compose.yml 中可修改本地数据挂载目录（默认：/data/beancount）和端口号（10000）