/**
 * Created by xubp on 2014/9/2.
 */
class Net extends egret.DisplayObjectContainer
{
    /***
     * 联网状态
     * @type {number}
     */
    private static s_serverHost_ip:string = "http://203.195.217.251";//数据上报服务器地址
    private static s_serverHost_port:string = ":8080";//数据上报服务器端口地址

    public static ACTION_GAMEEVENT_REG:number	= 4;		//游戏事件注册

    public static GAME_ID:string = "2005";//当前游戏固定id 2005 赌博游戏

    private static URL_ACTION:string = "action=";
    private static URL_EVENT_ADDR:string = "&eventaddr=";
    private static URL_LOGIN_ACC:string = "&loginacc=";
    private static URL_GAME_ID:string = "&gameid=";
    private static URL_EVENT_MASK:string = "&eventmask=";
    public NickName:string = "";//昵称

    private logicservlet:string = "/game/logicservlet?";//游戏事件
    public static platform:number = -1;//平台
    private static instent:Net=null;

    public constructor()
    {
        super();
    }

    public static getInstent():Net{
        if(Net.instent == null){
            Net.instent = new Net();
        }
        return Net.instent;
    }

    //请求链接地址
    public requestUrl(url:string){
        NetHttp.doGetRequest(url,"",this.onComplete,()=>{
            // alert("发送失败！");
        },this);

    }
    //链接成功后 返回处理方法
    private onComplete(event:egret.Event):void
    {
        //console.log("*********************onComplete data="+event.target.data);
    }

    /*
     iAction:
     1、玩家点击游戏，loading界面
     2、成功进入游戏
     3、开始游戏
     4、正常游戏
     
     5、点击分享
     6、成功分享
     7、二次分享
     8、三次分享
     
     9、结束页面
     10、累计分享行为
     11、重玩
     12、二次游戏的人数
     */
    public requestAction(iAction:number):void
    {
        var url:string;
        var iSource:number;
        if(Net.platform == -1){
            var ua:string = navigator.userAgent.toString();

            //判断是否微信用户
            var str:any=ua.match(/MicroMessenger/i);
            if(str=="MicroMessenger") {
                Net.platform = 3;//微信用户
            }else{
                Net.platform = 4;//其他用户
            }
        }
        switch (Net.platform){
            case 1:{
                iSource = 1;
            }
            case 2:{
                iSource = 1;
            }
            case 3:{
                iSource = 2;
            }
            case 4:{
                iSource = 3;
            }
        }
        url = Net.s_serverHost_ip + Net.s_serverHost_port + this.logicservlet + Net.URL_ACTION +
            Net.ACTION_GAMEEVENT_REG + Net.URL_EVENT_ADDR + iSource.toString() + Net.URL_LOGIN_ACC + this.NickName +
            Net.URL_GAME_ID + Net.GAME_ID + Net.URL_EVENT_MASK;
        url = url + iAction.toString();
        this.requestUrl(url);
        if(iAction >= 6 && iAction <= 8){
            setTimeout(function(){
                url = JSSDK.getInstance().wxshareinfo[JSSDK.getInstance().wxshareinfo["gototype"]];
                // window.location.href = url;
            },2000);
        }
    }
}
