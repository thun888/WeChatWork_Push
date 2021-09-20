## WxWork_Push

顾名思义，一个利用企业微信进行消息推送的程序

灵感来自Server酱Turbo版

#### 使用方式

1. 准备个Cloudflare账号

2. 复制index.js内内容到worker编辑页面内，并将touser，agentid等填写，保存退出

   ![image-20210920151319123](https://asstes.thun888.xyz/file/pic-bed/2021/09/e1c767d022f4abf0865cccfe260184bb.png)

   | 变量名     | 应填内容                              |
   | ---------- | ------------------------------------- |
   | touser     | 微信id,如果企业只有一个人也可以填@all |
   | agentid    | 应用ID                                |
   | corpid     | 企业ID                                |
   | corpsecret | 应用的凭证密钥                        |
   | weburl     | 部署完成后的域名+/get/                |

3. 注册一个企业以获取以上变量，可以参考[Server酱·Turbo版 (ftqq.com)](https://sct.ftqq.com/forward)（[网页截图](https://asstes.thun888.xyz/file/pic-bed/2021/09/4f4633a0b5f843a17263289553a5976e.png)）

4. 在cf中新建一个kv存储，名称随意

   ![image-20210920152306663](https://asstes.thun888.xyz/file/pic-bed/2021/09/1394e65f6d88e8363afbbd208b519e69.png)

5. 在worker详情中绑定kv，确保**变量名称**为**PUSHSAVE**

   ![image-20210920152429290](https://asstes.thun888.xyz/file/pic-bed/2021/09/c7d3f9825cac0f9b3fad72a98dd29e21.png)

6. ok了

#### 请求方式

http(s)://yourdomain/push/推送内容

![image-20210920152750949](https://asstes.thun888.xyz/file/pic-bed/2021/09/0ae4b1b58ff1d25b18cae99b11232505.png)

#### 特性

预览部分默认截取前20个字，超过会被截断（但在页面中可查看全部，或在41行更改）

![image-20210920153051987](https://asstes.thun888.xyz/file/pic-bed/2021/09/fd33e6ee1591503038118d0d995b3dd7.png)

卡片方式推送（当然别的也可以，不是特有的啊~）

听微信官方说要下线卡片信息还没下线，目前默认使用卡片，也可以更改为[别的形式](https://work.weixin.qq.com/api/doc/90000/90135/90236)

![image-20210920153337051](https://asstes.thun888.xyz/file/pic-bed/2021/09/f54484c2c404160a13162803ea8bba0c.png)

#### 优点

相较于我在github上找到的其他项目而言

1. 无需服务器，基于CFW
2. 信息存储。存储在kv中，并在点击卡片后跳转

#### Todo

- [ ] 支持post
- [ ] 支持密码校验
- [ ] ...

> 当初只是写来自用所以没考虑这些方面，日后增加