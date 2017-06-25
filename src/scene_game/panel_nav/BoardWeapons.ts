/**
 * 底部武器面板
 */


class BoardWeapons extends egret.Sprite{

    public Evts = {
        USE_WEAPON:'useWeapon'
    };

    private arrIconWeapon :egret.Bitmap[];

    constructor(){
        super();
        this.initComps();
    }
    /**重置武器数组*/
    public refreshWeapons(arrIdWeapons :number[]){
        var arrIconWeapon = this.arrIconWeapon;
        var bmIcon :egret.Bitmap;
        var numId :number;
        for(var i:number=0; i<arrIconWeapon.length; i++){
            bmIcon = arrIconWeapon[i];
            if(i<arrIdWeapons.length){
                numId = arrIdWeapons[i];
                utils.setProps(bmIcon,{texture:RES.getRes('c_'+numId),name:''+numId,visible:true},[0,1]);
            }else{
                bmIcon.visible = false;
            }
        }
        
    }

    /////////////////////////////////////////////////////////
    //              内部方法
    /////////////////////////////////////////////////////////
    private touchIconTech(evt:egret.TouchEvent){
        var numIdWeapon :number = parseInt(evt.target.name);
        this.dispatchEventWith(this.Evts.USE_WEAPON,false,{id:numIdWeapon});
    }

    private initComps(){

        var arrIconWeapon:Array<egret.Bitmap> = [];
        var bmIcon:egret.Bitmap;
        for(var i:number=0; i<3; i++){
            bmIcon = new egret.Bitmap;//(RES.getRes('c_'+(i+1)))
            utils.setProps(bmIcon,{x:75*i,y:48},[0,1]);
            bmIcon.addEventListener(egret.TouchEvent.TOUCH_END,this.touchIconTech,this);
            btns.initFloatBtn(bmIcon);
            arrIconWeapon.push(bmIcon);
            this.addChild(bmIcon);
        }
        this.arrIconWeapon = arrIconWeapon;

    }

}