var drawer = new mdui.Drawer('#drawer');
document.getElementById('toggle').addEventListener('click', function() {
    drawer.toggle();
});

function del() {
    var getkey = window.location.href.split('#')[0]
    var key = getkey.substring(getkey.length - 5)
    var url = location.origin + "/api/del"
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', url, true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.send('key=' + key);
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