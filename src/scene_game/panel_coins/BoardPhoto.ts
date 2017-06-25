

class BoardPhoto extends egret.DisplayObjectContainer{
    
    
    constructor(){
        super();
        this.initComps();
    }

    private initComps(){
        
        var bmBgPhoto :egret.Bitmap = new egret.Bitmap(RES.getRes('f_7'));
        utils.setProps(bmBgPhoto,{x:bmBgPhoto.width/2,y:bmBgPhoto.height/2},[0.5,0.5]);

        var bmPhoto :egret.Bitmap = new egret.Bitmap(RES.getRes('g_1_0'));
        utils.setProps(bmPhoto,{x:bmBgPhoto.x,y:bmBgPhoto.y},[0.5,0.5]);

        var bmMedal :egret.Bitmap = new egret.Bitmap(RES.getRes('f_8'));
        utils.setProps(bmMedal,{x:119,y:33},[0.5,0.5]);

        var bmBgVip :egret.Bitmap = new egret.Bitmap(RES.getRes('f_3_1'));
        utils.setProps(bmBgVip,{x:171,y:bmMedal.y},[0.5,0.5]);

        var bmVip :egret.Bitmap = new egret.Bitmap(RES.getRes('f_3'));
        utils.setProps(bmVip,{x:159,y:bmBgVip.y},[0.5,0.5]);

        var bmtNumVip :egret.BitmapText = new egret.BitmapText;
        utils.setProps(bmtNumVip,{font:RES.getRes('orange_fnt'),x:bmVip.x+46,y:bmVip.y,text:'12',scaleX:0.4,scaleY:0.4},[0.5,0.5]);

        var bmBgNick :egret.Bitmap = new egret.Bitmap(RES.getRes('f_2'));
        utils.setProps(bmBgNick,{x:144,y:74},[0.5,0.5]);

        var bmNick :egret.Bitmap = new egret.Bitmap(RES.getRes('g_1_1'));
        utils.setProps(bmNick,{x:161,y:76},[0.5,0.5]);

        utils.addChildren(this,[bmBgVip,bmVip,bmMedal,bmtNumVip,bmBgNick,bmNick,bmBgPhoto,bmPhoto,])
        
    }
}