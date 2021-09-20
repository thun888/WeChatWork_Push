addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

//变量
const touser = "t****88"
const agentid = "1******"
const corpid = "ww9**************8"
const corpsecret = "k***s--oc3*****************************nKuY"
const weburl = "https://*********888.xyz/get/"

//获取access_token部分
const getit = {
  method: "GET",
}
const token_url = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid='+ corpid +'&corpsecret=' + corpsecret

//page
const html404 = `<!DOCTYPE html>
<body>
  <h1>404 | 错误</h1>
  <p>找不到对应的内容:(</p>
</body>`
const roothtml = `<!DOCTYPE html>
<body>
  <h1>错误</h1>
  <p>做甚？</p>
</body>`

async function handleRequest(request) {
  const { pathname } = new URL(request.url);
  //获取access_token部分
  const token = await JSON.parse(await (await fetch(token_url, getit)).text())
  const post_url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + token.access_token;
  //console.log(post_url)
  console.log(pathname)
  if (pathname.startsWith('/push/')) {
    var nsave = pathname.slice(6)
    var save = decodeURI(nsave)
    //console.log(save)
    var description = save.slice(0,20)
    let random_key=await save_text(save)
    const post = await postit(post_url,description,random_key)
    return new Response(`ok`)
  }else if (pathname.startsWith('/get/')) {//页面
    var save = pathname.slice(5)
    console.log(save)
    const value = await PUSHSAVE.get(save)
    if (value === null) {
    return new Response(html404, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
    status: 404
  })
  }else{
    const web = `
<html>
	<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
        <style>
            div {
                word-wrap: break-word;
                word-break: normal;
            }
        </style>
    </head>
	<body>
		<div class="jumbotron">
			<h1 class="display-4">设备通知</h1>
			<p class="lead">${value}</p>
			<hr class="my-5">
			<p>看完了吗，看完了就走吧👀</p>
			<a class="btn btn-primary btn-lg" href="#" role="button" onclick="window.close();">(^///^)</a>
		  </div>
      <div id="footer" style="position:fixed;width: 100%;text-align: center;bottom: 0px;display: block;">
		  <p>Page By <a href="https://blog.thun888.xyz/">Thun888</a></p>
		  <p>Powered by CloudFlare&amp;企业微信API</p>
      </div>
	</body>
</html>`
    return new Response(web, {
      headers: { "content-type": "text/html;charset=UTF-8" }
    })
  }
  }else{
        return new Response(roothtml, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
    status: 404
  })
  }
} 


//存档
async function save_text(TEXT){
    let random_key=await randomString()
    let is_exist=await PUSHSAVE.get(random_key)
    console.log(is_exist)
    if (is_exist == null){
        return await PUSHSAVE.put(random_key, TEXT),random_key
    }else{
        save_text(TEXT)
    }
}

async function randomString(len) {
　　len = len || 6;
　　let $chars = '0123456789qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKOLP';
　　let maxPos = $chars.length;
　　let result = '';
　　for (i = 0; i < len; i++) {
　　　　result += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return result;
}

//push部分
async function postit(post_url,description,random_key) {
const text_body = {
  title: "设备通知",
  description: "预览：" + description,
  url: weburl + random_key
}

const post_body = {
  touser: touser,
  msgtype: "textcard",
  agentid: agentid,
  textcard: text_body
}
const post = {
  body: JSON.stringify(post_body),
  method: "POST",
  headers: {
    "content-type": "application/json;charset=UTF-8"
    }
  }
  //console.log("ok")
  return await JSON.parse(await (await fetch(post_url, post)).text())
}

