
/**
 *  资源加载控制器
 */

class SceneLoading extends egret.DisplayObjectContainer {

    public groupsName = {
        RES_0:'RES_0',
        RES_X:'RES_X',
        RES_GAME_2:'RES_GAME_2',
        // RES_PRELOAD:'RES_PRELOAD',
    };
    public hasLoaded = {
        RES_0:false,
        RES_X:false,
        RES_GAME_2:false,
        // RES_PRELOAD:false,
    };

    private arrCallLoaded = {
        RES_0:{fun:null,scope:null},
        RES_X:{fun:null,scope:null},
        RES_GAME_2:{fun:null,scope:null},
        // RES_PRELOAD:{fun:null,scope:null},
    };
    
    private progressUI:ProgressUI;

    public constructor(){
        super();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    public addSelf(container){
        container.addChild(this);
    }
    public remSelf(){
        if(this.parent)
            this.parent.removeChild(this);
    }
    public loadGroup(nameGroup=this.groupsName.RES_0){
        console.log(nameGroup);
        RES.loadGroup(nameGroup);
        if(this.progressUI)
            this.progressUI.resetProgressBar();
    }

    public registerLoadedCall(nameGroup:string,fun:Function,scope:any){
        this.arrCallLoaded[nameGroup].fun = fun;
        this.arrCallLoaded[nameGroup].scope = scope;
    }
    public hasLoadedGroup(nameGroup:string,fun:Function,scope:any,parent:egret.DisplayObjectContainer){
        if(!this.hasLoaded[nameGroup]){
            this.registerLoadedCall(nameGroup,fun,scope);
            this.addSelf(parent);
        }else{
            fun.call(scope);
        }
    }
    private willCall(nameGroup:string){
        var arrCallLoaded = this.arrCallLoaded;
        if(arrCallLoaded[nameGroup].fun){
            arrCallLoaded[nameGroup].fun.call(arrCallLoaded[nameGroup].scope);
            arrCallLoaded[nameGroup].fun = arrCallLoaded[nameGroup].scope = null;
            this.remSelf();
        }
    }
    private onConfigComplete(evt:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        this.registerEvents();
        this.loadGroup();
    }
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        var groupName = event.groupName;
        this.hasLoaded[groupName] = true;
        this.willCall(groupName);
        switch (groupName){
            case this.groupsName.RES_0:
                JSSDK.getInstance().init();
                this.createPanel();
                this.loadGroup(this.groupsName.RES_X);
                break;
            case this.groupsName.RES_X:
                // this.loadGroup(this.groupsName.RES_GAME_2);
                this.remSelf();
        }
        console.log('加载完成组：',groupName);
    }
    private onResourceProgress(event:RES.ResourceEvent):void {
        var nameGroup = event.groupName;
        switch (nameGroup){
            case this.groupsName.RES_0:
                // this.progressUI.setProgress(event.itemsLoaded, event.itemsTotal);
                break;
            default:
                this.progressUI.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    private registerEvents(){
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    }
    private unregisterEvents(){
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    }
    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Item:" + event.groupName + " - " + event.resItem + " has failed to load");
        this.onResourceLoadComplete(event);
    }

    private createPanel():void {
        this.progressUI = new ProgressUI;
        this.addChild(this.progressUI);
    }

    private static inst:SceneLoading;
    static getInst():SceneLoading{
        if(!this.inst)
            this.inst = new SceneLoading;
        return this.inst;
    }
}

class ProgressUI extends egret.DisplayObjectContainer{

    private barTop:egret.Bitmap;

    private textStatusLoading:egret.TextField;

    constructor(){
        super();
        this.initView();
        this.resetProgressBar();
    }
    public setProgress(current, total):void {
        var percentLoaded = current / total;//Math.floor(current/total*100).toString() + "%";
        this.barTop.mask = new egret.Rectangle(0,0,this.barTop.width*percentLoaded,this.barTop.height);
        // utils.setProps(this.textStatusLoading,{text:current + '/' + total},[0.5,0.5]);
    }
    public resetProgressBar(){
        this.barTop.mask = new egret.Rectangle(0,0,0,0);
    }

    private initView(){

        utils.setProps(this,{width:GlobalData.wStage,height:GlobalData.hStage});

        var bgLoading = new egret.Bitmap(RES.getRes('bg_loading'));
        utils.setProps(bgLoading,{width:this.width,height:this.height});
        // var san = new egret.Bitmap(RES.getRes('baijian'));
        // utils.setProps(san,{x:220,y:300},[1,1]);
        var barBottom = new egret.Bitmap(RES.getRes('loading_bg'));
        utils.setProps(barBottom,{x:(this.width-barBottom.width)/2,y:810},[0,0.5]);
        var barTop = new egret.Bitmap(RES.getRes('loading_jindu'));
        utils.setProps(barTop,{x:(this.width-barTop.width)/2,y:barBottom.y},[0,0.5]);
        utils.addChildren(this,[bgLoading,barBottom,barTop]);

        // var textStatusLoading = new egret.TextField();
        // utils.setProps(textStatusLoading,{
        //     textColor:0xf5c51e,size:40,fontFamily:'Microsoft Yahei',
        //     x:barTop.x+barTop.width/2,y:barTop.y
        // },[0.5,0.5]);
        // this.addChild(textStatusLoading);
        //
        // this.textStatusLoading = textStatusLoading;
        this.barTop = barTop;
    }
}
