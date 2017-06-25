/**
 * 分享页面场景
 */

class PageShare extends egret.Sprite{

    public Evts = {
        NEXT_GAME:'NEXT_GAME',
        TO_HOME:'TO_HOME'
    };
    private mcHand:egret.MovieClip;

    private bmBtnRefuse:egret.Bitmap;

    private funNextGame:Function;
    private scopeNextGame:any;
    private funToHome:Function;
    private scopeToHome:any;

    constructor(){
        super();
        this.initComps();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdd,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRem,this);
    }
    
    // public setCallNextGame(fun:Function,scope:any){
    //     this.funNextGame = fun;
    //     this.scopeNextGame = scope;
    // }
    // public setCallToHome(fun:Function,scope:any){
    //     this.funToHome = fun;
    //     this.scopeToHome = scope;
    // }
    public addSelf(container:egret.DisplayObjectContainer){
        container.addChild(this);
        container.touchChildren = false;
        egret.setTimeout(()=>{
            container.removeChild(this);
            container.touchChildren = true;
        },this,2000);
    }



    private toNextGame(){
        this.funNextGame.call(this.scopeNextGame);
        this.remSelf();
    }

    private toHome(evt:egret.Event){
        this.funToHome.call(this.scopeToHome);
        this.remSelf();
    }

    private remSelf(){
        this.parent.removeChild(this);
    }
    private onAdd(evt:egret.Event){
        this.mcHand.play(-1);
        // JSSDK.getInstance().setCallAfterShare(this.toNextGame,this);
    }
    private onRem(evt:egret.Event){
        this.mcHand.stop();
        // JSSDK.getInstance().setCallAfterShare(null,null);
    }

    private initComps(){
        utils.setProps(this,{width:GlobalData.wStage,height:GlobalData.hStage});

        this.graphics.beginFill(0x000,0.5);
        this.graphics.drawRect(0,0,this.width,this.height);
        this.graphics.endFill();
        
        // var bg:egret.Bitmap = new egret.Bitmap(RES.getRes('bg_png'));
        // utils.setProps(bg,{width:this.width,height:this.height});
        
        // var bmHome = new egret.Bitmap(RES.getRes('b_home_png'));
        // bmHome.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toHome,this);
        // btns.initScaleBtn(bmHome);
        // bmHome.touchEnabled = true;
        // utils.setProps(bmHome,{x:110,y:110},[0.5,0.5]);

        var mcHand :egret.MovieClip = utils.newMC({mcName:'hand_share',textureData:'hand_share_png',jsonData:'hand_share_json'});
        utils.setProps(mcHand,{x:this.width-130,y:30,frameRate:3});

        var bmTxShareTip:egret.Bitmap = new egret.Bitmap(RES.getRes('s3'));
        utils.setProps(bmTxShareTip,{x:this.width/2,y:this.height/2},[0.5,0.5]);

        // var bmBtnRefuse :egret.Bitmap = new egret.Bitmap(RES.getRes('b_refuse_png'));
        // utils.setProps(bmBtnRefuse,{x:bmBtnRefuse.width/2+50,y:this.height-bmBtnRefuse.height/2-40},[0.5,0.5]);
        // bmBtnRefuse.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toNextGame,this);
        // btns.initScaleBtn(bmBtnRefuse);
        // bmBtnRefuse.touchEnabled = true;

        utils.addChildren(this,[mcHand,bmTxShareTip]);
        this.mcHand = mcHand;
        // this.bmBtnRefuse = bmBtnRefuse;

    }

    private static inst:PageShare;
    static getInst(){
        if(!this.inst)
            this.inst = new PageShare();
        return this.inst;
    }

}