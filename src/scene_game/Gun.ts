/**
 * 枪控制器
 */

class Gun extends egret.DisplayObjectContainer{
    
    public Evts = {
        SHOOT_BULLET:'shootBullet'
    };
    public paramGun :ParamGun;
    private bmFire :egret.Bitmap;
    private bmGun :egret.Bitmap;
    private tmLightOff :egret.Timer;
    private tmShoot:egret.Timer;

    constructor(){
        super();
        this.initComps();
        this.exchangeGun(1);
    }
    /** 设定角度 */
    public updateDir(angle:number){
        this.rotation = angle;
    }
    /** 切换枪支 */
    public exchangeGun(numIdGun:number){
        // if(numIdGun==this.paramGun.id) return;
        this.paramGun = GetParamConf.getInst().getGun(numIdGun);
        this.tmShoot.delay = this.paramGun.speed_attack;
        this.changeBmGun();
    }
    /**开始开枪*/
    public beginShoot(){
        this.tmShoot.stop();
        this.tmShoot.repeatCount = 0;
        this.tmShoot.reset();
        this.tmShoot.start();
        this.shootBullet();
    }
    /**结束开枪*/
    public stopShoot(){
        this.tmShoot.repeatCount = 2;
        this.tmShoot.reset();
        this.tmShoot.start();
        this.tmShoot.stop();
    }
    //////////////////////////////////////////////////////
    //          内部方法
    /////////////////////////////////////////////////////
    /** 喷出计时火焰 */
    private lightUpFire(){
        this.showFire(true);
        this.resetAndStartTmLight();
    }
    /** 开始计时熄灭火焰 */
    private resetAndStartTmLight(){
        if(this.tmLightOff.running){
            this.tmLightOff.stop();
        }
        this.tmLightOff.reset();
        this.tmLightOff.start();
    }
    private showFire(isShow:boolean){
        this.bmFire.visible = isShow;
    }
    private shootBullet(){
        this.dispatchEventWith(this.Evts.SHOOT_BULLET);
        this.lightUpFire();
    }
    private lightOffFire(evt:egret.TimerEvent){
        this.showFire(false);
    }
    private changeBmGun(){
        utils.setProps(this.bmGun,{texture:RES.getRes('d_'+this.paramGun.id)},[0.5,0]);
    }
    
    private initComps(){

        var bmFire :egret.Bitmap = new egret.Bitmap(RES.getRes('a_12'));
        utils.setProps(bmFire,{visible:false},[0.5,0]);

        var bmGun :egret.Bitmap = new egret.Bitmap();
        utils.setProps(bmGun,{y:bmFire.y+bmFire.height-10},[0.5,0]);

        var tmLightOff :egret.Timer = new egret.Timer(160,1);
        tmLightOff.addEventListener(egret.TimerEvent.TIMER,this.lightOffFire,this);

        var tmShoot :egret.Timer = new egret.Timer(100);
        tmShoot.addEventListener(egret.TimerEvent.TIMER,this.shootBullet,this);

        utils.addChildren(this,[bmGun,bmFire]);
        this.bmFire = bmFire;
        this.bmGun = bmGun;
        this.tmLightOff = tmLightOff;
        this.tmShoot = tmShoot;



    }

}