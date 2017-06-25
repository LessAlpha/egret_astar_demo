/**
 * 战场主控制器
 * 
 */

class SceneGame extends egret.DisplayObjectContainer{
    
    
    private panelCoins :PanelCoins;
    private panelNav :PanelNav;
    private gun :Gun;
    private hpBarHero :HpBarHero;
    private hero :Hero;
    private battlefieldCtrl :BattlefieldCtrl;

    private shootInfo:{moveDir:xy,angleShoot:number} = {moveDir:null,angleShoot:null};
    
    private stampFrameLast:number;
    
    constructor(){
        super();
        this.initComps();
        this.initEvtTouch();
        this.ctrlTouchToShoot(true);
    }
    
    private shoot(evt:egret.TouchEvent){
        this.battlefieldCtrl.generateBullet(this.shootInfo.moveDir,this.shootInfo.angleShoot,this.gun.paramGun);
    }
    /**逐帧更新函数 */
    private frameGame(evt:egret.Event){
        this.battlefieldCtrl.updateBattlefield();
    }
    /**更新枪和主角的旋转角度*/
    private updateDirHeroGun(angleShoot:number){
        this.gun.updateDir(angleShoot);
        this.hero.updateDir(angleShoot);
    }
    private ctrlTouchToShoot(canTouch:boolean){
        this.touchEnabled = canTouch;
    }
    private touchToShoot(evt:egret.TouchEvent){
        if(evt.target!=this)    return;
        var typeEvt :string = evt.type;
        this.calculateShootInfo(evt.localX,evt.localY);
        this.updateDirHeroGun(this.shootInfo.angleShoot);
        switch (typeEvt){
            case egret.TouchEvent.TOUCH_BEGIN:
                this.gun.beginShoot();
                break;
            case egret.TouchEvent.TOUCH_END:
            case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                this.gun.stopShoot();
        }
    }
    private updateCoins(){
        this.panelCoins.updateCoins();
    }
    private calculateShootInfo(ptX:number,ptY:number){
        this.shootInfo.angleShoot = MathLogicCf.translateAngleGun(this.gun.x,this.gun.y,ptX,ptY);
        this.shootInfo.moveDir = MathLogicCf.getBulletMoveInfo(this.shootInfo.angleShoot);
    }
    private exchangeGun(evt:egret.Event){
        var idGun :number = evt.data.id;
        this.gun.exchangeGun(idGun);
    }
    private useTech(evt:egret.Event){
        var idTech :number = evt.data.id;
        
    }
    private initEvtTouch(){
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchToShoot,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchToShoot,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchToShoot,this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchToShoot,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.frameGame,this);
    }
    private initComps(){

        utils.setProps(this,{width:ConfMap.SizeMapConf.numWidthMap,height:GlobalData.hStage});

        var bmBg :egret.Bitmap = new egret.Bitmap(RES.getRes('bg_1'));
        utils.setProps(bmBg,{width:this.width,height:this.height});
        var bmRed :egret.Bitmap = new egret.Bitmap(RES.getRes('a_11'));
        utils.setProps(bmRed,{x:this.width/2,y:920},[0.5,0.5]);
        
        var panelCoins :PanelCoins = new PanelCoins();
        utils.setProps(panelCoins,{x:(this.width-panelCoins.width)/2});

        var panelNav :PanelNav = new PanelNav();

        utils.setProps(panelNav,{x:(this.width-panelNav.width)/2,y:this.height-panelNav.height});

        var gun :Gun = new Gun;
        gun.addEventListener(gun.Evts.SHOOT_BULLET,this.shoot,this);
        utils.setProps(gun,{x:this.width/2,y:940},[0,1]);
        var kinfe :Knife = new Knife;
        
        
        var hpBarHero :HpBarHero = new HpBarHero;
        utils.setProps(hpBarHero,{x:this.width/2,y:1000},[0.5,0.5]);
        var hero :Hero = new Hero;
        utils.setProps(hero,{x:this.width/2,y:gun.y});

        var battlefieldCtrl :BattlefieldCtrl = new BattlefieldCtrl({x:gun.x,y:gun.y});
        battlefieldCtrl.addEventListener(battlefieldCtrl.Evts.UPDATE_COIN,this.updateCoins,this);
        utils.setProps(battlefieldCtrl,{x:(this.width-battlefieldCtrl.width)/2,y:0});

        utils.addChildren(this,[bmBg,battlefieldCtrl,bmRed,gun,hero,panelNav,hpBarHero,panelCoins]);
        this.panelCoins = panelCoins;//顶部头像和金币栏
        this.panelNav = panelNav;//底部导航栏、武器栏、技能栏
        this.gun = gun;//枪支
        this.hero = hero;//主角
        this.hpBarHero = hpBarHero;//主角血条栏
        this.battlefieldCtrl = battlefieldCtrl;//怪兽和子弹武器控制器
        
    }

}