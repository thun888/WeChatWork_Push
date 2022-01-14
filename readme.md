## WxWork_Push

顾名思义，一个利用企业微信进行消息推送的程序

#### 使用方式

1. 准备个Cloudflare账号

2. 复制index.js内内容到worker编辑页面内,保存退出

3. 将touser，agentid等变量填写

   ![image](https://user-images.githubusercontent.com/63234268/149353857-97de3335-72d1-47a0-8609-7ca92f2f43c3.png)



   | 变量名     | 应填内容                              |
   | ---------- | ------------------------------------- |
   | touser     | 微信id,如果企业只有一个人也可以填@all |
   | agentid    | 应用ID                                |
   | corpid     | 企业ID                                |
   | corpsecret | 应用的凭证密钥                        |
   | weburl     | 部署完成后的域名                |

4. 注册一个企业以获取以上变量，可以参考[Server酱·Turbo版 (ftqq.com)](https://sct.ftqq.com/forward)（[网页截图](https://asstes.thun888.xyz/file/pic-bed/2021/09/4f4633a0b5f843a17263289553a5976e.png)）

5. 在cf中新建一个kv存储，名称随意

   ![image-20210920152306663](https://asstes.thun888.xyz/file/pic-bed/2021/09/1394e65f6d88e8363afbbd208b519e69.png)

6. 在worker详情中绑定kv，确保**变量名称**为**PUSHSAVE**

   ![image-20210920152429290](https://asstes.thun888.xyz/file/pic-bed/2021/09/c7d3f9825cac0f9b3fad72a98dd29e21.png)


#### 请求方式

> **Post**
>
> path: youdomain.com/push

| **参数名称** | 说明 |
| ------------ | ---- |
| title        | 标题 |
| desp         | 内容 |

返回值[](https://open.work.weixin.qq.com/devtool/query)
| **参数名称** | 内容                                                |
| ------------ | --------------------------------------------------- |
| status       | 200（正常）/500（错误）                             |
| msg          | ok（正常），在出现错误时会返回调用微信api的错误信息 |
| tx_errcode   | 只出现于变量填写错误（获取access_token错误）时      |

[错误码查询工具 | 企业微信 (qq.com)](https://open.work.weixin.qq.com/devtool/query)


> **Get**
>
> path: youdomain.com/push


| **参数名称** | **说明** |
| ------------ | -------- |
| title        | 标题     |
| desp         | 内容     |

返回值同post

#### 特性

- Post
  - 当title长度大于20时，自动截断
  - 当省略title且desp长度小于150时，不存入kv，并直接返回文本信息
- Get
  - 当title长度大于20时，自动截断
  - 当省略title且desp长度小于200时，不存入kv，并直接返回文本信息

#### 优点

相较于我在github上找到的其他项目而言

1. 无需服务器，基于CFW
2. 信息存储。存储在kv中，并在点击卡片后跳转
3. 兼容Server酱调用方法（需自行改动相关源码）

#### Todo

- [x] 支持post方式
- [ ] 支持密码校验
- [ ] 优化推送界面
  - [ ] 前端删除存储
- [ ] 简化源码

