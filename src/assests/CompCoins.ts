

class CompCoins extends egret.DisplayObjectContainer{

    private typeCoin:TypesCoin;
    private bmtSumCoin :TfTimerUpdate;

    constructor(typeCoin:TypesCoin){
        super();
        this.typeCoin = typeCoin;
        this.initComps();
    }

    public setCoinsSum(numSum:number){
        this.bmtSumCoin.setNumTarget(numSum);
    }

    private initComps(){
        
        var bmBg :egret.Bitmap = new egret.Bitmap(RES.getRes('f_0'));

        var bmCoin :egret.Bitmap = new egret.Bitmap(RES.getRes(this.typeCoin==TypesCoin.GOLD?'f_4':'f_5'));
        utils.setProps(bmCoin,{x:27,y:bmBg.height/2},[0.5,0.5]);

        var bmPlus :egret.Bitmap = new egret.Bitmap(RES.getRes('f_6'));
        utils.setProps(bmPlus,{x:bmBg.width-bmPlus.width/2-5,y:bmCoin.y},[0.5,0.5]);

        var bmtSumCoin :TfTimerUpdate = new TfTimerUpdate('orange_fnt',[1,0.5]);
        utils.setProps(bmtSumCoin,{x:bmPlus.x-bmPlus.width/2-3,y:bmCoin.y,scaleX:0.6,scaleY:0.6});
        
        utils.addChildren(this,[bmBg,bmCoin,bmPlus,bmtSumCoin]);
        this.bmtSumCoin = bmtSumCoin;

    }
}
enum TypesCoin{GOLD,DIAMOND}