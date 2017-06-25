/**
 * ����ȫ�ֱ���
 * @type {string}
 */
var weixin_share_title="�������";
var weixin_share_desc="��������";
var weixin_share_link="��������";
var weixin_share_img_url="����ͼƬurl";
var weixin_snsapi_base = "snsapi_base";
var weixin_snsapi_userinfo = "snsapi_userinfo";

var weixin_appid = "wxc56b6d21cc2a1950";
var weixin_code="";
/***
 * ��������
 */
//��ȡURL����
function GetRequest() {
    var url = location.search; //��ȡurl��"?"������ִ�
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//��ȡ���
function GetWindowWidth()
{
    var cur_width = 480;
    //��ȡ���ڿ��
    if (window && window.innerWidth)
        cur_width = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        cur_width = document.body.clientWidth;
    //ͨ������Document�ڲ���body���м�⣬��ȡ���ڴ�С
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
    {
        cur_width = document.documentElement.clientWidth;
    }
    return cur_width;
}
//��ȡ�߶�
function GetWindowHeight() {
    var cur_height = 800;
    //��ȡ���ڸ߶�
    if (window && window.innerHeight)
        cur_height = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        cur_height = document.body.clientHeight;
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        cur_height = document.documentElement.clientHeight;
    }
    return cur_height;
}
//�����豸���ر�
function GetWindowRatio()
{
    var cur_radio = window.devicePixelRatio || 1;
    return cur_radio;
}

//��ȡ΢��code
function ReqWeiXinCode(my_scope)
{
    var redirect_uri = encodeURI(window.location.href);
    var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+weixin_appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope="+my_scope+"&state=1#wechat_redirect";
  ///  var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
    window.location.href = url;
}

//����egret
function StartEgret(my_scope)
{
    var data = GetRequest();
    if (data['code'] == undefined)
    {
        ReqWeiXinCode(my_scope);
    }
    if (data['code'] != undefined)
    {
        weixin_code = data['code'];
        egret.runEgret({renderMode:"webgl", audioType:0});
    }
    //weixin_code="0314ac1941bb9700935ab219e758340z";
   // egret.runEgret();
}
