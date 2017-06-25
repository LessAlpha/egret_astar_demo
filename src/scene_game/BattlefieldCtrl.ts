/**
 * 子弹、僵尸控制器
 */

class BattlefieldCtrl extends egret.DisplayObjectContainer{

    public Evts = {
        UPDATE_COIN:'updateCoin',
        
    };
    
    private panelMonsters :PanelMonsters;/** 僵尸容器 */
    private panelBullets :PanelBullets;/** 子弹容器 */
    private panelMapComps :PanelMapComps;/** 地图上的其它组件 */

    private ptStartBullet :xy;/** 子弹出发点 */
    
    private tmAddMonster:egret.Timer;

    constructor(ptStartBullet :xy){
        super();
        this.ptStartBullet = ptStartBullet;
        this.initComps();
    }
    /** 逐帧更新 - 更新僵尸和子弹移动+碰撞检测+回收 */
    public updateBattlefield(){
        this.panelBullets.updatetBullets();
        this.panelMonsters.updateMonsters();
        this.conflictMonster();
        this.panelBullets.clearBullets();
        this.panelMonsters.clearMonsters();        
    }
    /** 产生普通子弹*/
    public generateBullet(moveDirInfo:xy,angleShoot:number,paramsGun:ParamGun){
        this.panelBullets.generateBullet(moveDirInfo,angleShoot,paramsGun);
    }
    
    /////////////////////////////////////////////////////////
    //      内部方法
    ////////////////////////////////////////////////////////
    
    /** 碰撞检测 */
    private conflictMonster(){
        var arrBullets :Array<Bullet> = this.panelBullets.getBullets;
        var arrMonsters :Array<Monster> = this.panelMonsters.getMonsters;
        var bullet :Bullet;
        var monster :Monster;
        var hasAttack :boolean;
        for(var i in arrBullets){
            bullet = arrBullets[i];
            for(var j in arrMonsters){
                monster = arrMonsters[j];
                hasAttack = monster.testBeAttacked(bullet);
                bullet.willLogout(hasAttack,monster);
            }
        }
    }
    /**产生僵尸*/
    private generateMonster(){
        this.panelMonsters.generateMonster();
    }
    private updateCoins(){
        this.dispatchEventWith(this.Evts.UPDATE_COIN);
    }
    
    
    private initComps(){

        utils.setProps(this,{width:ConfMap.SizeMapConf.numWidthMap,height:GlobalData.hStage});     
        
        var panelMonsters :PanelMonsters = new PanelMonsters;
        panelMonsters.addEventListener(panelMonsters.Evts.UPDATE_COIN,this.updateCoins,this);        

        var panelBullets :PanelBullets = new PanelBullets(this.ptStartBullet);

        var panelMapComps :PanelMapComps = new PanelMapComps;
        
        var tmAddMonster :egret.Timer = new egret.Timer(500);
        tmAddMonster.addEventListener(egret.TimerEvent.TIMER,this.generateMonster,this);

        utils.addChildren(this,[panelMonsters,panelMapComps,panelBullets]);
        this.panelBullets = panelBullets;
        this.panelMonsters = panelMonsters;
        this.panelMapComps = panelMapComps;
        this.tmAddMonster = tmAddMonster;

    }
}