
class Main extends egret.DisplayObjectContainer {

    static MainInst:Main;

    public constructor() {
        super();
        Main.MainInst = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event:egret.Event) {

        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stage.setContentSize(utils.getWindowWidth() * GlobalData.hStage / utils.getWindowHeight(), GlobalData.hStage);
        GlobalData.wStage = this.stage.stageWidth;
        GlobalData.hStage = this.stage.stageHeight;
        utils.setProps(this,{width:this.stage.stageWidth,height:this.stage.stageHeight});
        MapLine.initData();
        
        var sceneLoading :SceneLoading = SceneLoading.getInst();
        sceneLoading.registerLoadedCall(sceneLoading.groupsName.RES_X,this.showSceneGame,this);
        sceneLoading.addSelf(this);


    }
    
    private showSceneGame(){

        var scenaGame = new SceneGame();
        utils.setProps(scenaGame,{x:(this.width-scenaGame.width)/2});
        this.addChild(scenaGame);

        // var test = new Test();
        // utils.setProps(test,{x:(GlobalData.wStage-test.width)/2});
        // this.addChild(test);
    }
    
    
}
