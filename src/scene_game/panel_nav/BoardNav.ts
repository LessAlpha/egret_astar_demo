

class BoardNav extends egret.DisplayObjectContainer{
    
    
    constructor(){
        super();
        this.initComps();        
    }

    private touchIcon(evt:egret.TouchEvent){

    }
    
    private initComps(){

        var bmIcon0 :egret.Bitmap = new egret.Bitmap(RES.getRes('a_1'));
        utils.setProps(bmIcon0,{x:bmIcon0.width/2,y:bmIcon0.height/2},[0.5,0.5]);
        btns.initFloatBtn(bmIcon0);
        this.addChild(bmIcon0);

        var arrIcon:Array<egret.Bitmap> = [];
        var bmIcon:egret.Bitmap;
        for(var i:number=0; i<6; i++){
            bmIcon = new egret.Bitmap(RES.getRes(i<3?'a_'+(i+2):'a_0'));//todo
            utils.setProps(bmIcon,{x:140+89*i,y:bmIcon0.y,name:''+(i+2)},[0.5,0.5]);
            this.addChild(bmIcon);
            arrIcon.push(bmIcon);
            if(i<3){
                bmIcon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchIcon,this);
                btns.initFloatBtn(bmIcon);
            }
        }
        
    }
}