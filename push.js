var drawer = new mdui.Drawer('#drawer');
document.getElementById('toggle').addEventListener('click', function() {
    drawer.toggle();
});

function del() {
    var getkey = window.location.href.split('#')[0]
    var key = getkey.substring(getkey.length - 5)
    var url = location.origin + "/api/del"
    var httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
    httpRequest.open('POST', url, true); //第二步：打开连接
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.send('key=' + key); //发送请求 将情头体写在send中
    /**
     * 获取数据后的处理程序
     */
    httpRequest.onreadystatechange = function() { //请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) { //验证请求是否发送成功
            var json = httpRequest.responseText; //获取到服务端返回的数据
            console.log(json);
            mdui.snackbar({
                message: 'OK'
            });
            location.reload();
        }
    };
}