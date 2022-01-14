addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})

/* WxWork_Push v0.0.4 */
/* By thun888 22/1/14 */

async function handleRequest(request) {
    const { pathname } = new URL(request.url);
    //获取access_token部分
    const token = await JSON.parse(await (await fetch(token_url, getit)).text())
    const post_url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + token.access_token;
    if (token["errcode"] != 0) {
        return new Response(`{"status":500,"msg":"请检查变量设置","tx_errcode":"` + token["errcode"] + `"}`, { status: 500 })
    }




    if (pathname.startsWith('/push') & request.method === "POST") {
        let req = await request.json()
        var description = req["desp"]
        var req_pass = req["pass"]
        if (password) {
            if (req_pass != password) {
                return new Response(`{"status":401,"msg":"Unauthorized"}`, { status: 401 })
            }
        }
        if (req["title"].length > 20) {
            var title = req["title"].substring(0, 21) + "..."
        } else {
            var title = req["title"]
        }
        if (description.length <= 150 & title === undefined) {
            const post = await postit(post_url, description)
            errcode = post["errcode"]
            if (errcode == 0) {
                return new Response(`{"status":200,"msg":"ok"}`)
            } else {
                return new Response(`{"status":500,"msg":"` + post["errmsg"] + `"}`, { status: 500 })
            }
        } else {
            if (title === undefined) {
                var title = "设备通知"
            }
            var random_key = await save_text(description, title)
            const post = await postit(post_url, description, random_key, title)
            errcode = post["errcode"]
            if (errcode == 0) {
                return new Response(`{"status":200,"msg":"ok"}`)
            } else {
                return new Response(`{"status":500,"msg":"` + post["errmsg"] + `"}`, { status: 500 })
            }
        }

    }
    if (pathname.startsWith('/push') & request.method === "GET") {
        const { search } = new URL(request.url);
        const req = await GetRequest(search)
        const description = req.desp
        var req_pass = req.pass
        if (password) {
            if (req_pass != password) {
                return new Response(`{"status":401,"msg":"Unauthorized"}`, { status: 401 })
            }
        }

        if (req.title != undefined) {
            if (req.title.length > 20) {
                var title = req.title.substring(0, 21) + "..."
            } else {
                var title = req.title
            }
        }
        if (description.length <= 150 & title === undefined) {
            const post = await postit(post_url, description)
            errcode = post["errcode"]
            if (errcode == 0) {
                return new Response(`{"status":200,"msg":"ok"}`)
            } else {
                return new Response(`{"status":500,"msg":"` + post["errmsg"] + `"}`, { status: 500 })
            }
        } else {
            if (title === undefined) {
                var title = "设备通知"
            }
            var random_key = await save_text(description, title)
            const post = await postit(post_url, description, random_key, title)
            errcode = post["errcode"]
            if (errcode == 0) {
                return new Response(`{"status":200,"msg":"ok"}`)
            } else {
                return new Response(`{"status":500,"msg":"` + post["errmsg"] + `"}`, { status: 500 })
            }
        }

    }

    if (pathname.startsWith('/get/')) { //页面
        var save = pathname.slice(5)
        console.log(save)
        const value = JSON.parse(await PUSHSAVE.get(save))
        if (value === null) {
            return new Response(html404, {
                headers: {
                    "content-type": "text/html;charset=UTF-8",
                },
                status: 404
            })
        } else {
            var title = value["t"]
            var description = value["d"]
            const web = `<html>

            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width">
                <title>WXPush</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mdui@1.0.1/dist/css/mdui.min.css" />
                <style>
                    body {
                        --bg: url("https://cdn.jsdelivr.net/gh/thun888/tuku@master/img/background.bc725154.png");
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-attachment: fixed;
                        background-image: var(--bg);
                    }
                    
                    .mdui-shadow-3 {
                        background: rgba(255, 255, 255, 0.5);
                    }
                </style>
            </head>
            
            
            
            <body class="mdui-appbar-with-toolbar">
                <div class="mdui-appbar mdui-appbar-fixed">
                    <div class="mdui-toolbar mdui-color-blue-grey-100">
                        <span class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" id="toggle"><i class="mdui-icon material-icons">menu</i></span>
                        <a href="javascript:;" class="mdui-typo-headline">Push</a>
                        <div class="mdui-toolbar-spacer"></div>
                    </div>
                </div>
            
                <!--卡片-->
                <div class="mdui-container">
                    <div class="mdui-row">
                        <div>
                            <div class="mdui-card">
                                <div class="mdui-card-content mdui-text-center">
                                    <h2>${title}</h2>
                                </div>
                                <div style="width:90%; word-wrap: break-word;word-break: normal;" class="mdui-center">
                                    <p class="lead">${description}</p>
                                </div>
                            </div>
                        </div>
            
            
            
                        <div class="mdui-drawer mdui-drawer-close mdui-color-blue-grey-100" id="drawer">
                            <ul class="mdui-list">
            
                                <li class="mdui-subheader">Manage</li>
                                <li class="mdui-list-item mdui-ripple">
                                    <i class="mdui-list-item-icon mdui-icon material-icons">delete_forever</i>
                                    <a href="javascript:del();" class="mdui-list-item-content">Delete</a>
                                </li>
            
            
                                <li class="mdui-subheader">Others</li>
                                <li class="mdui-list-item mdui-ripple">
                                    <i class="mdui-list-item-icon mdui-icon material-icons">bookmark</i>
                                    <a href="https://github.com/thun888/WxWork_Push/" class="mdui-list-item-content">Github</a>
                                </li>
            
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="footer" style="position:fixed;width: 100%;text-align: center;bottom: 0px;display: block;">
                    <p>Page By <a href="https://blog.thun888.xyz/">Thun888</a></p>
                    <p>Powered by CFW&amp;企业微信API</p>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/mdui@1.0.1/dist/js/mdui.min.js"></script>
                <script>
                var drawer = new mdui.Drawer('#drawer');
                document.getElementById('toggle').addEventListener('click', function() {
                    drawer.toggle();
                });
                
                function del() {
                    var getkey = window.location.href.split('#')[0]
                    var key = getkey.substring(getkey.length - 6)
                    var url = location.origin + "/api/del"
                    var httpRequest = new XMLHttpRequest();
                    httpRequest.open('POST', url, true);
                    httpRequest.setRequestHeader("Content-type", "application/json");
                    var obj = { key: key };
                    httpRequest.send(JSON.stringify(obj));
                
                    httpRequest.onreadystatechange = function() {
                        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                            var json = httpRequest.responseText;
                            console.log(json);
                            mdui.snackbar({
                                message: 'OK'
                            });
                            location.reload();
                        }
                    };
                }
                </script>
            </body>
            
            </html>`

            return new Response(web, {
                headers: { "content-type": "text/html;charset=UTF-8" }
            })
        }
    }
    if (pathname.startsWith('/api/del') & request.method === "POST") {
        let req = await request.json()
        var key = req["key"]
        await PUSHSAVE.delete(key)
        return new Response(`{"status":200,"msg":"ok"}`, {
            headers: {
                "content-type": "text/html;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
            },
            status: 200
        })
    } else {
        return new Response(roothtml, {
            headers: {
                "content-type": "text/html;charset=UTF-8",
            },
            status: 404
        })
    }
}


//存档
async function save_text(TEXT, title) {
    let random_key = await randomString()
    let is_exist = await PUSHSAVE.get(random_key)
    console.log(is_exist)
    if (is_exist == null) {
        var json = { t: title, d: TEXT }
        return await PUSHSAVE.put(random_key, JSON.stringify(json)), random_key
    } else {
        console.log("luckydog")
        save_text(TEXT, title)
    }
}

async function randomString(len) {　　
    len = len || 6;　　
    let $chars = '0123456789qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKOLP';　　
    let maxPos = $chars.length;　　
    let result = '';　　
    for (i = 0; i < len; i++) {　　　　 result += $chars.charAt(Math.floor(Math.random() * maxPos));　　 }　　
    return result;
}

function GetRequest(urlStr) {
    if (typeof urlStr == "undefined") {
        var url = decodeURI(location.search); //获取url中"?"符后的字符串
    } else {
        var url = "?" + urlStr.split("?")[1];
    }
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


//获取access_token部分
const getit = {
    method: "GET",
}
const token_url = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=' + corpid + '&corpsecret=' + corpsecret

//page
const html404 = `<!DOCTYPE html>
  <body>
    <h1>404 | 错误</h1>
    <p>找不到对应的内容:(</p>
  </body>`
const roothtml = `<!DOCTYPE html>
  <body>
    <h1>错误</h1>
    <p>非法访问</p>
  </body>`


//push部分
async function postit(post_url, description, random_key, title) {

    if (random_key) {

        const text_body = {
            title: title,
            description: "预览：" + description,
            url: "https://" + weburl + "/get/" + random_key
        }
        const post_body = {
            touser: touser,
            msgtype: "textcard",
            agentid: agentid,
            textcard: text_body
        }
        var body = JSON.stringify(post_body)
    } else {
        const text_body = {
            content: description
        }
        const post_body = {
            touser: touser,
            msgtype: "text",
            agentid: agentid,
            text: text_body
        }
        var body = JSON.stringify(post_body)
    }
    const post = {
        body: body,
        method: "POST",
        headers: {
            "content-type": "application/json;charset=UTF-8"
        }
    }

    return await JSON.parse(await (await fetch(post_url, post)).text())
}