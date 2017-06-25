import TimerEvent = egret.TimerEvent;
/**
 * 怪兽控制面板
 */
class PanelMonsters extends egret.DisplayObjectContainer{

    public Evts = {
        UPDATE_COIN:'updateCoins'
    };
    /** 僵尸数组 */
    private arrMonsters :Array<Monster> = [];
    private mapScene :MapScene;/** 寻路组件 */

    private tmAddMonster :egret.Timer;
    private numDurationTm :number = 1000;
    
    constructor(){
        super();
        this.initComps();
        this.startTmAddMonster();
    }

    /** 移动僵尸 */
    public updateMonsters(){
        var arrMonsters :Array<Monster> = this.arrMonsters;
        var monster :Monster;
        for(var i in arrMonsters){
            monster = arrMonsters[i];
            monster.moveFrame();
        }
    }
    /**把刚干掉的僵尸从控制数组里面移除出去*/
    public clearMonsters(){
        var arrMonstersReclaim :Array<Monster> = [];
        var arrMonsters :Array<Monster> = this.arrMonsters;
        var monster :Monster;
        var numCoinGet :number = 0;
        for(var i in arrMonsters){
            monster = arrMonsters[i];
            if(monster.hasDie)
                arrMonstersReclaim.push(monster);
        }
        for(var j in arrMonstersReclaim){
            monster = arrMonstersReclaim[j];
            arrMonsters.splice(arrMonsters.indexOf(monster),1);
            this.reclaimGridOccupied(monster.gridOccupiedAttack);
            numCoinGet += monster.getCoinGet;
        }
        this.addCoinsToAccount(numCoinGet);
    }
    /**定时生产新僵尸*/
    public generateMonster(){
        var paramMonster :ParamMonster = GetParamConf.getInst().getMonster(1);        
        var ways = ConfMap.ConfScene[GlobalData.numIndMap].Ways;
        var way = ways[Math.floor(Math.random()*ways.length)];
        var path :Array<AStarNode> = this.mapScene.getPathMoveInLine(way.start,way.end);
        var monster:Monster = CachePool.produce(Monster);
        monster.addSelf(this,paramMonster,path);
        this.attachEvtWithMonster(monster);
        this.arrMonsters.push(monster);
    }
    /** 获取僵尸数组 */
    public get getMonsters(){
        return this.arrMonsters;
    }
    /////////////////////////////////////////////////
    //          内部方法
    /////////////////////////////////////////////////

    /**增加金币到账户上*/
    private addCoinsToAccount(numCoinGet:number){
        if(numCoinGet==0)   return;
        AccountUser.getInst().modifyCoins(numCoinGet);
        this.dispatchEventWith(this.Evts.UPDATE_COIN);
    }
    /**给僵尸寻找攻击主角的格子路径*/
    private searchWayToAttack(evt:egret.Event){
        var tar:Monster = evt.target;
        tar.setPathToAttack(this.mapScene.getPathMoveToAttack(tar.getNodeSelfPos));
    }
    /***/
    private attachEvtWithMonster(monster:Monster){
        monster.once(monster.Evts.REQUEST_PATH_TO_ATTACK,this.searchWayToAttack,this);
    }
    private reclaimGridOccupied(grid:xy){
        if(!grid)   return;
        this.mapScene.realeaseGrid(grid);
    }

    private startTmAddMonster(){
        this.tmAddMonster.start();
    }
    private initComps(){

        var mapScene :MapScene = new MapScene;    
        utils.setProps(mapScene,{alpha:0.3});
        
        var tmAddMonster :egret.Timer = new egret.Timer(this.numDurationTm);
        tmAddMonster.addEventListener(egret.TimerEvent.TIMER,this.generateMonster,this);      
        
        utils.addChildren(this,[mapScene]);

        this.mapScene = mapScene;
        this.tmAddMonster = tmAddMonster;
    }
    
}