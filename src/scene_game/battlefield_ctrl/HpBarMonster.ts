
/**
 * 主角血量条
 */

class HpBarMonster extends egret.DisplayObjectContainer{

    private bmTxHp :egret.Bitmap;
    private bmProgress :MaskRectImg;
    private numFull:number;

    constructor(){
        super();
        this.initComps();
    }

    /**添加*/
    public addSelf(container:egret.DisplayObjectContainer,numFull:number){
        this.numFull = numFull;
        this.bmProgress.setNumTotal(numFull);
        this.updateHpProgress(numFull);
        container.addChild(this);
    }
    /**更新血量条*/
    public updateHpProgress(numValNow:number){
        this.bmProgress.updateProgress(numValNow);
    }

    private initComps(){

        var bmBoard :egret.Bitmap = new egret.Bitmap(RES.getRes('a_7'));

        var bmTxHp :egret.Bitmap = new egret.Bitmap(RES.getRes('f_1'));
        utils.setProps(bmTxHp,{x:bmBoard.width/2,y:5},[0.5,0]);

        var bmProgress :MaskRectImg = new MaskRectImg('a_8');
        utils.setProps(bmProgress,{x:bmTxHp.x,y:27},[0.5,0]);

        utils.addChildren(this,[bmBoard,bmTxHp,bmProgress]);
        this.bmTxHp = bmTxHp;
        this.bmProgress = bmProgress;

    }
}