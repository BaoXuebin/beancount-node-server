# beancount-node-server

[演示地址](http://81.69.252.147:10000/)

## 介绍

[beancount](https://github.com/beancount/) 是一个优秀的开源复式记账工具，因为其基于文本记录的特性，难以拓展到移动端；本项目旨在将常见的记账行为提取出接口以供网络调用。

本仓库使用 `node` 进行文本的读写和网络服务支持。

## 配置

`config/config.json`  

**title**: 账本名称  
**dataPath**: 账本存储位置，初始化账本时使用  
**operatingCurrency**: 账本币种
**startDate**: 账本创建时间，初始化账本时使用

## 使用

1. 安装 `python3` 环境，下载 `beancount`，`pip3 install beancount`
2. 克隆本项目到本地
2. 切换到项目根目录，在命令行执行 `node init.js`，该命令会生成基本的 beancount 账单结构和账户，你可以在 `config/init_data.json` 中查看初始内容
3. 执行 `node server.js` 启动服务

> 本项目中将 ***账户*** 默认设置为三级结构：Assets|Incom|Libilities|Expenses|Equity:Type:Name（可使用中文）  
> Type 在 *config/account_cata_list.json* 中定义，如需添加，可以修改该文件

## 可用接口（V1.0 计划开发接口）

1. [X] `GET:/account/valid?key=早餐` 查询可用账户
2. [X] `GET:/account/all` 查询可用账户(包括账户金额)
3. [X] `POST:/account?account&date` 新增账户
4. [X] `POST:/account/close?account&date` 关闭账户
5. [X] `GET:/month/stats?year&month` 月度统计信息
6. [X] `GET:/entry?type&year&month` 查询账单
7. [X] `POST:/entry` 记录账单
    ```js
    // 请求参数
    const requestbody = {
        date: "2021-08-05",
        store: "祥和面馆",
        desc: "鱼香肉丝凉面，加土豆丝",
        entries: [
            {
                account: "Assets:EBank:支付宝",
                amount: "-19"
            },
            {
                account: "Expenses:Food:午餐",
                amount: "19"
            }
        ]
    }
    ```
8. [-] `GET:/stats` 账单统计
9.  [-] `PUT:/entry` 账目修改
10. [-] `DELETE:/entry?id=` 账目删除

## Docker 部署

1. `git clone` 项目到本地
2. `cd beancount-node-server` 切换到项目根目录
3. `docker build -t beancount-node-server .` 打包镜像
4. `docker-compose up -d` 容器运行

> docker-compose.yml 中可修改本地数据挂载目录（默认：/data/beancount）和端口号（10000）