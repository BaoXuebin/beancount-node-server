# beancount-node-server

## 介绍

`beancount` 是一个优秀的开源复式记账工具，因为其基于文本记录的特性，难以拓展到移动端；本项目旨在将常见的记账行为提取出接口以供网络调用。

本仓库使用 `node` 进行文本的读写和网络服务支持。

## 配置

`config/config.json`  

**title**: 账本名称  
**dataPath**: 账本存储位置，初始化账本时使用  
**operatingCurrency**: 账本币种

## 使用

1. 克隆本项目到本地
2. 切换到项目根目录，在命令行执行 `node init.js`，该命令会生成基本的 beancount 账单结构和账户，你可以在 `config/init_data.json` 中查看初始内容
3. 执行 `node server.js` 启动服务

## 接口（已实现）

1. 模糊查询账户
    ```
    GET:/account?key=早餐
    result:
    {
        "code": 200,
        "data": [
            "Expenses:Food:早餐"
        ]
    }
    ```
2. 记录账单
    ```
    POST:/entry
    json:
    {
        "date": "2021-08-05",
        "store": "祥和面馆",
        "desc": "鱼香肉丝凉面，加土豆丝",
        "entries": [
            {
                "account": "Assets:EBank:支付宝",
                "amount": "-19"
            },
            {
                "account": "Expenses:Food:午餐",
                "amount": "19"
            }
        ]
    }
    result:
    {
      "code": 200,
      "data": "2021-08-05 * \"祥和面馆\" \"鱼香肉丝凉面，加土豆丝\"\r\n  Assets:EBank:支付宝 -19.00 CNY\r\n  Expenses:Food:午餐 19.00 CNY\r\n"
    }
    ```