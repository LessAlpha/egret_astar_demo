/**
 * 金币信息面板
 */

class PanelCoins extends egret.DisplayObjectContainer{

    private boardPhoto:BoardPhoto;
    private compDiamond :CompCoins;
    private compCoin :CompCoins;
    constructor(){
        super();
        this.initComps();
    }
    
    public updateCoins(){
        this.compCoin.setCoinsSum(AccountUser.getInst().AccountData.coin);
    }
    
    private initComps(){

        var bmBoard:egret.Bitmap = new egret.Bitmap(RES.getRes('f_9'));

        var boardPhoto:BoardPhoto = new BoardPhoto;

        var compCoin :CompCoins = new CompCoins(TypesCoin.GOLD);
        utils.setProps(compCoin,{x:bmBoard.width/2,y:bmBoard.height/2},[0.5,0.5]);

        var compDiamond :CompCoins = new CompCoins(TypesCoin.DIAMOND);
        utils.setProps(compDiamond,{x:bmBoard.width-compDiamond.width/2-30,y:compCoin.y},[0.5,0.5]);

        utils.addChildren(this,[bmBoard,boardPhoto,compCoin,compDiamond]);
        this.boardPhoto = boardPhoto;
        this.compDiamond = compDiamond;
        this.compCoin = compCoin;

    }
}