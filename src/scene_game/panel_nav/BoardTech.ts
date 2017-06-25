

/**
 * 底部技能面板
 */


class BoardTech extends egret.DisplayObjectContainer{


    public Evts = {
        USE_TECH:'useTech'
    };

    private arrIconTech :egret.Bitmap[];
    
    constructor(){
        super();
        this.initComps();
    }
    /**重置武器数组*/
    public refreshTechs(arrIdTechs :number[]){
        var arrIconTech = this.arrIconTech;
        var bmIcon :egret.Bitmap;
        var numId :number;
        for(var i:number=0; i<arrIconTech.length; i++){
            bmIcon = arrIconTech[i];
            if(i<arrIdTechs.length){
                numId = arrIdTechs[i];
                utils.setProps(bmIcon,{texture:RES.getRes('b_'+numId),visible:true},[0,1]);
            }else{
                bmIcon.visible = false;
            }
        }

    }

    /////////////////////////////////////////////////////////
    //              内部方法
    /////////////////////////////////////////////////////////
    
    private touchIconTech(evt:egret.TouchEvent){
        
    }
    private initComps(){

        var arrIconTech:Array<egret.Bitmap> = [];
        var bmIcon:egret.Bitmap;
        for(var i:number=0; i<3; i++){
            bmIcon = new egret.Bitmap(RES.getRes('b_'+(i+1)));
            utils.setProps(bmIcon,{x:72+80*i,y:38,name:''+i},[1,1]);
            bmIcon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchIconTech,this);
            btns.initFloatBtn(bmIcon);
            arrIconTech.push(bmIcon);
            this.addChild(bmIcon);
        }

    }
}