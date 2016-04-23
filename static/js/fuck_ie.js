/**
 * Created by Administrator on 2016/4/22.
 */
function Fuck_IE (document) {
    this.document = document
}

Fuck_IE.prototype.insert = function () {
    var body = this.document.getElementsByTagName('body');
    var str = '<div style="position: absolute;width: 100%;height: 100%;z-index:999;' +
        'background: #000000;color:#FFFFFF;text-align:center;' +
        'padding-top: 200px;font-size: 30px;">' +
        '<p>请不要使用过时的IE浏览器浏览本页面。</p>' +
        '<p>过时的浏览器存在许多安全漏洞，病毒可能利用这些漏洞危害您的电脑。</p>' +
        '<p><span>为了您的账号安全，推荐访问此链接</span><a href="http://browsehappy.com/">升级您的浏览器</a>或者下载' +
        '<a href="http://chrome.360.cn/">360极速浏览器</a>浏览本页面。</p>' +
        '<p>如果您使用的是双内核浏览器，请开启极速模式。</p>' +
        '</div>';
    document.write(str);
};



Fuck_IE.prototype.execute = function () {
    var ua = navigator.userAgent;
    var if_ie = /MSIE/;
    if (if_ie.test(ua)) {
        this.insert()
    }

};






var fuck_ie = new Fuck_IE(document);

fuck_ie.execute();