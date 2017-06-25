/**
 * Created by d8q8 on 2015/1/19.
 * @class JSSDK
 * @constructor
 **/

interface SignPackage {
    appId:string;
    nonceStr:string;
    timestamp:number;
    signature:string;
    url:string;
}

class JSSDK extends egret.EventDispatcher{
    public CLASS_NAME:string = "JSSDK";

    //private btn_sharetimeline:egret.gui.Button;//分享朋友圈按钮
    //private btn_shareappmessage:egret.gui.Button;//分享朋友按钮
    //private btn_shareqq:egret.gui.Button;//分享QQ按钮
    //private btn_shareweibo:egret.gui.Button;//分享微博按钮

    private title:string;
    private desc:string;
    private link:string;
    private imgUrl:string;
    private signPackage:SignPackage;
    private url:string;
    private param:string = "";

    public wxshareinfo:any = [];
    private static wxConfig:JSSDK = null;

    private funCallAfterShare:any;
    private scopeCallAfterShare:any;
    
    public setCallAfterShare(funCall:any,scopeCall:any){
        this.funCallAfterShare = funCall;
        this.scopeCallAfterShare = scopeCall;
    }
    private willCallAfterShare(){

    }
    
    private afterShare(){
        
    }
    

    public static getInstance():JSSDK
    {
        if(JSSDK.wxConfig == null)
        {
            JSSDK.wxConfig = new JSSDK();
        }
        return JSSDK.wxConfig;
    }
    public init():void
    {
        //微信分享配置
        //RES.getResAsync("WeiXinShare_json",this.onLoadWeiXinConfig,this);
        this.onLoadWeiXinConfig(RES.getRes('wxconfig_json'));
    }
    public changeDescShare(desc:string){
        this.onLoadWeiXinConfig(RES.getRes('wxconfig_json'),desc);
    }
    private onLoadWeiXinConfig(data:any,desc?:string):void
    {
        //定义皮肤
        //this.skinName = "skins.jssdk.ShareSkin";
        //初始化分享内容
        //this.title = "【分享】警惕这些身体求救信号";
        //this.desc = "困了就要睡觉，渴了就要喝水，累了就要休息，烦了就要发泄……这些我们都明白，其实有时候身体就会向你发出这样一些健康信号，可惜的是，很多人往往不在意！";
        //this.link =  "http://mp.weixin.qq.com/s?biz=MjM5MTIxMzYxMQ==&mid=207223086&idx=1&sn=08bf703c6750bfc88de4317ee1d2d9e6#rd";
        //this.imgUrl ="http://mmbiz.qpic.cn/mmbiz/OvWLC4Ooz2bM8cePicfRaRk0ibWvMH7zvr2ARsDF36D9Q3U2kJuiaAR1FusBKiaCJ7h598NjaNYRuicicQTBpr3dFcbg/640?tp=webp";
        this.wxshareinfo = data;
        this.title = data['title'];
        this.desc = desc||data['descNomal'];
        this.link =  data['link'];
        this.imgUrl = data['imgUrl'];
        var hr:string = window.location.href;//
        //你的后端数据JSON入口                                     必须要
        this.url = data['jsonphp']+ encodeURIComponent(hr);
        //获取签名
        this.getSignPackage();
        //console.log(this.desc);
    }
    
    /**
     * 获取签名分享
     */
    private getSignPackage() {
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(this.url);
        urlloader.load(req);
        req.method = egret.URLRequestMethod.GET;
        urlloader.addEventListener(egret.Event.COMPLETE, (e)=> {
            this.signPackage = <SignPackage>JSON.parse(e.target.data);
            //alert(e.target.data);
            //........................................................
            //基本配置

            this.getWeiXinConfig();
            //下面可以加更多接口,可自行扩展
            //this.getWeiXinShareTimeline();//分享朋友圈
            //this.getWeiXinShareAppMessage();//分享朋友
            //this.getWeiXinShareQQ();//分享QQ
            //this.getWeiXinShareWeiBo();//分享到腾讯微博
            //this.getWeiXinShareCamera();//获得相机
            //........................................................
            var THIS = this;
            wx.ready(function():void{
                THIS.shareInfo();
            })
        }, this);
    }

    /**
     * 获取微信配置
     */
    private getWeiXinConfig() {
        /*
         * 注意：
         * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
         * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
         * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
         *
         * 如有问题请通过以下渠道反馈：
         * 邮箱地址：weixin-open@qq.com
         * 邮件主题：【微信JS-SDK反馈】具体问题
         * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
         */
        //配置参数
        var bodyConfig = new BodyConfig();
        bodyConfig.debug = false;// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        bodyConfig.appId = this.signPackage.appId;// 必填，公众号的唯一标识
        bodyConfig.timestamp = this.signPackage.timestamp;// 必填，生成签名的时间戳
        bodyConfig.nonceStr = this.signPackage.nonceStr;// 必填，生成签名的随机串
        bodyConfig.signature = this.signPackage.signature;// 必填，签名，见附录1

        bodyConfig.jsApiList = [// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',//判断当前客户端是否支持指定JS接口
            'onMenuShareTimeline',//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            'onMenuShareAppMessage',//获取“分享给朋友”按钮点击状态及自定义分享内容接口
            'onMenuShareQQ',//获取“分享到QQ”按钮点击状态及自定义分享内容接口
            'onMenuShareWeibo',//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
            'hideMenuItems',//批量隐藏功能按钮接口
            'showMenuItems',//批量显示功能按钮接口
            'hideAllNonBaseMenuItem',//隐藏所有非基础按钮接口
            'showAllNonBaseMenuItem',//显示所有功能按钮接口
            'translateVoice',//识别音频并返回识别结果接口
            'startRecord',//开始录音接口
            'stopRecord',//停止录音接口
            'playVoice',//播放语音接口
            'pauseVoice',//暂停播放接口
            'stopVoice',//停止播放接口
            'uploadVoice',//上传语音接口
            'downloadVoice',//下载语音接口
            'chooseImage',//拍照或从手机相册中选图接口
            'previewImage',//预览图片接口
            'uploadImage',//上传图片接口
            'downloadImage',//下载图片接口
            'getNetworkType',//获取网络状态接口
            'openLocation',//使用微信内置地图查看位置接口
            'getLocation',//获取地理位置接口
            'hideOptionMenu',//隐藏右上角菜单接口
            'showOptionMenu',//显示右上角菜单接口
            'closeWindow',//关闭当前网页窗口接口
            'scanQRCode',//调起微信扫一扫接口
            'chooseWXPay',//发起一个微信支付请求
            'openProductSpecificView',//跳转微信商品页接口
            'addCard',//批量添加卡券接口
            'chooseCard',//调起适用于门店的卡券列表并获取用户选择列表
            'openCard'//查看微信卡包中的卡券接口
        ];
        wx.config(bodyConfig);
        var SELF = this;
        wx.ready(function() {
            SELF.getWeiXinShareTimeline();
            SELF.getWeiXinShareAppMessage();
            SELF.getWeiXinShareQQ();
            SELF.getWeiXinShareWeiBo();
        });
    }
    
    public WWshareInfo(rank:string):void{
        var desc:string =  this.wxshareinfo["desc_self"] + this.wxshareinfo["desc1"] +rank+
            this.wxshareinfo["desc2"];
        //console.log(desc);
        this.getWeiXinShareTimeline(desc);//分享朋友圈
        this.getWeiXinShareAppMessage(desc);//分享朋友
        this.getWeiXinShareQQ(desc);//分享QQ
        this.getWeiXinShareWeiBo(desc);//分享到腾讯微博
    }
    
    public shareInfo():void
    {
        this.getWeiXinShareTimeline();//分享朋友圈
        this.getWeiXinShareAppMessage();//分享朋友
        this.getWeiXinShareQQ();//分享QQ
        this.getWeiXinShareWeiBo();//分享到腾讯微博
    }

    /**
     * 获取微信分享到朋友圈
     */
    private getWeiXinShareTimeline(desc:string = "0") {
        var info = this.sharelinkset();
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        if(desc == "0"){
            bodyMenuShareTimeline.title = this.title;
        }else{
            bodyMenuShareTimeline.title = desc;
        }
        bodyMenuShareTimeline.link = info["link"];
        bodyMenuShareTimeline.imgUrl = this.imgUrl;
        bodyMenuShareTimeline.trigger = ()=> {
            //alert('用户点击分享到朋友圈');
            Net.getInstent().requestAction(5);
        };
        bodyMenuShareTimeline.success = ()=> {
            this.getsharecount(info["scount"]);
            this.willCallAfterShare();           

        };
        bodyMenuShareTimeline.cancel = ()=> {
            //alert('已取消');
        };
        bodyMenuShareTimeline.fail = (res)=> {
            //alert(JSON.stringify(res));
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
    }

    /**
     * 获取微信分享到朋友
     */
    private getWeiXinShareAppMessage(desc:string = "0"){
        var info = this.sharelinkset();
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        //alert(this.title);
        bodyMenuShareAppMessage.title = this.title;
        if(desc == "0"){
            bodyMenuShareAppMessage.desc = this.desc;
        }
        else{
            bodyMenuShareAppMessage.desc = desc;
        }
        bodyMenuShareAppMessage.link = info["link"];
        bodyMenuShareAppMessage.imgUrl = this.imgUrl;
        //alert(this.imgUrl);
        bodyMenuShareAppMessage.trigger = ()=> {
            //alert('用户点击发送给朋友');
            Net.getInstent().requestAction(5);
        };
        bodyMenuShareAppMessage.success = ()=> {
            //alert(decode_user_name);
            this.getsharecount(info["scount"]);
            this.willCallAfterShare();
        };
        bodyMenuShareAppMessage.cancel = ()=> {
            //alert('已取消');
        };
        bodyMenuShareAppMessage.fail = (res)=> {
            //alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);

    }

    /**
     * 获取微信分享到QQ
     */
    private getWeiXinShareQQ(desc:string = "0"){
        var info = this.sharelinkset();
        var bodyMenuShareQQ = new BodyMenuShareQQ();
        bodyMenuShareQQ.title = this.title;
        
        if(desc == "0")
        {
            bodyMenuShareQQ.desc = this.desc;
        }
        else
        {
            bodyMenuShareQQ.desc = desc;
        }
        //console.log(bodyMenuShareQQ.desc);
        bodyMenuShareQQ.link = info["link"];
        bodyMenuShareQQ.imgUrl = this.imgUrl;
        bodyMenuShareQQ.trigger = ()=> {
            Net.getInstent().requestAction(5);
        };
        bodyMenuShareQQ.complete = (res)=> {
        };
        bodyMenuShareQQ.success = ()=> {
            //alert(JSON.stringify(res));
            //alert('用户点击分享到QQ');
            this.getsharecount(info["scount"]);
            this.willCallAfterShare();
        };
        bodyMenuShareQQ.cancel = ()=> {
            //alert('已取消');
        };
        bodyMenuShareQQ.fail = (res)=> {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareQQ(bodyMenuShareQQ);
    }

    /**
     * 获取微信分享到腾讯微博
     */
    private getWeiXinShareWeiBo(desc:string = "0"){
        //this.btn_shareweibo.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=> {
        var info = this.sharelinkset();
        var bodyMenuShareWeibo = new BodyMenuShareWeibo();
        bodyMenuShareWeibo.title = this.title;
        if(desc == "0"){
            bodyMenuShareWeibo.desc = this.desc;
        }else{
            bodyMenuShareWeibo.desc = desc;
        }
        bodyMenuShareWeibo.link = info["link"];
        bodyMenuShareWeibo.imgUrl = this.imgUrl;
        bodyMenuShareWeibo.trigger = ()=> {
            //alert('用户点击分享到微博');
            Net.getInstent().requestAction(5);
        };
        bodyMenuShareWeibo.complete = (res)=> {
        };
        bodyMenuShareWeibo.success = ()=> {
            //alert(JSON.stringify(res));
            this.getsharecount(info["scount"]);
            this.willCallAfterShare();
            //alert('已分享');
        };
        bodyMenuShareWeibo.cancel = ()=> {
            //alert('已取消');
        };
        bodyMenuShareWeibo.fail = (res)=> {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareWeibo(bodyMenuShareWeibo);
        //alert('已注册获取“分享到微博”状态事件');
        //}, this);
    }

    //按分享次数设置共享链
    private sharelinkset(){
        var req_param_arry = window['GetRequest']();
        var share_count:string = String(req_param_arry["scount"]);
        var tempLink:string = "";
        var scount:number;
        tempLink = this.link;
        if(this.param != ""){
            if(tempLink.indexOf("?") <= 0){
                tempLink = tempLink + "?";
            }else{
                tempLink = tempLink + "&";
            }
            tempLink = tempLink + this.param;
        }
        if(tempLink.indexOf("?") <= 0){
            tempLink = tempLink + "?";
        }else{
            tempLink = tempLink + "&";
        }
        if(share_count && share_count!="undefined"){
            if(share_count == "1"){
                scount = 2;
            }else{
                scount = 3;
            }
        }else{
            scount = 1;
        }
        tempLink = tempLink + "scount=" + scount;
        var info={"link":tempLink,"scount":share_count.toString()};
        return info;
    }

    //告知后台分享次数
    private getsharecount(scount:string){
        //alert(scount);
        if(scount == "1"){
            Net.getInstent().requestAction(6);
        }
        else if(scount == "2"){
            Net.getInstent().requestAction(7);
        }
        else if(scount == "3"){
            Net.getInstent().requestAction(8);
        }
    }

    public setShareparam(param:string){
        this.param = param;
    }

    //扫描二维码
    public WWscanQRCode(){
        alert("scan");
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果(他妈的返回的是链接地址)

               alert(res.resultStr);
                //var data = JSON.parse(res.resultStr);
                //alert("f_receive:"+data['f_receive']);
                //alert("f_code:"+data['f_code']);
            }
        });
    }
}