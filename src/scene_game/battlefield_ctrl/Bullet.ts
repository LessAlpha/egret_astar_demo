/**
 * 子弹控件
 */

class Bullet extends egret.Bitmap{

    static keyClass:string = 'Bullet';
    
    private moveInfo:{x:number,y:number};
    private numSpeed:number = 15;/**  */
    public hasLogout:boolean;/** 是否已经射中过敌人 */
    public paramGun:ParamGun;/**子弹参数*/

    constructor(){
        super();
    }
    /**逐帧移动*/
    public moveFrame(){
        utils.setProps(this,{x:this.x+this.moveInfo.x,y:this.y+this.moveInfo.y});
    }
    /** */
    public willLogout(shoot:boolean,monster:Monster){
        if(!shoot)  return;
        this.hasLogout = true;
    }
    public remAndReclaimSelf(){
        this.parent.removeChild(this);
        CachePool.reclaim(this);
    }

    /////////////////////////////////////////////////
    //                  内部方法
    ////////////////////////////////////////////////
    /** 刷新自身 */
    public refreshSelf(angle:number,moveInfo:xy,posXY:xy,paramsGun:ParamGun,container:egret.DisplayObjectContainer){
        utils.setProps(this,{
            x:posXY.x,y:posXY.y,rotation:angle,
            texture:RES.getRes('e_'+paramsGun.id)
        },[0.5,0]);
        this.hasLogout = false;
        this.paramGun = paramsGun;
        this.moveInfo = {x:this.numSpeed*moveInfo.x,y:this.numSpeed*moveInfo.y};
        this.hasLogout = false;
        container.addChild(this);
    }

    
}