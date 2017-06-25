import MovieClip = egret.MovieClip;
/**
 * 行走僵尸（非BOSS
 */

class Monster extends egret.DisplayObjectContainer{

    static keyClass:string = 'Monster';
    
    public Evts = {
        REQUEST_PATH_TO_ATTACK:'requestPath',
        DIE:"DIE"
    };
    private AnimMonster =  {//僵尸的动画标签
        DOWN_MOVE : 'down_move',
        SIDE_MOVE : 'side_move',
        DOWN_ATTACK : 'down_attack',
        SIDE_ATTACK : 'side_attack',
        DEAD : 'dead'
    };

    private hpBar:HpBarMonster;//怪兽血量条

    private statusInMap :StatusMonsterInMap;
    private path :Array<AStarNode>;
    private nodeSelf :AStarNode;//当前所处在格子地图上的节点
    private numSpeed:number = 2;//僵尸的移动速度
    private labelMc :string;//当前动画标签
    private paramMonster:ParamMonster;

    public hasDie:boolean;//是否挂了
    public gridOccupiedAttack:xy;//攻击主角时占据的格子
    public mcMonster:egret.MovieClip;//怪兽动画
    
    constructor(){
        super();
        this.initComps();
    }

    /** 每帧更新 */
    public moveFrame(){

        var path:any[] = this.path;
        if(this.statusInMap == StatusMonsterInMap.STATIC_ATTACK||this.statusInMap == StatusMonsterInMap.SEARCHING_WAY) {
            return;
        }else if(path.length==0) {
            if(this.statusInMap==StatusMonsterInMap.MOVE_IN_LINE) {//进入搜寻攻击位置模式
                this.statusInMap = StatusMonsterInMap.SEARCHING_WAY;
                this.dispatchEventWith(this.Evts.REQUEST_PATH_TO_ATTACK);
            } else if(this.statusInMap==StatusMonsterInMap.MOVE_TO_ATTACK) { //进入攻击模式
                this.statusInMap = StatusMonsterInMap.STATIC_ATTACK;
            }
            return;
        }
        var nodePath0 = path[0];//正在朝向的节点
        var numSizeGrid = ConfMap.SizeMapConf.numSizeGrid;
        //转换成像素值
        var targetX:number = (nodePath0.x+0.5) * numSizeGrid ;
        var targetY:number = (nodePath0.y+0.5) * numSizeGrid ;
        var dx:number = targetX - this.x;
        var dy:number = targetY - this.y;
        var dist:number = Math.sqrt(dx * dx + dy * dy);
        if(dist < this.numSpeed) {
            path.shift();
            this.x = targetX;
            this.y = targetY;
            this.nodeSelf.setXY(nodePath0.x,nodePath0.y);
            if( path.length==0 && this.statusInMap==StatusMonsterInMap.MOVE_TO_ATTACK ){
                this.intoStatusAttack();
            }
        }else{
            if(dy!=0) {//竖着走
                this.y += this.numSpeed;
                this.updateAnim(Directions.DOWN);
            } else {//横着走
                this.x += dx>0?this.numSpeed:-this.numSpeed;
                this.updateAnim(dx>0?Directions.RIGHT:Directions.LEFT);
            }
        }
    }
    /** 设置走到攻击位置的路径 */
    public setPathToAttack(path:Array<AStarNode>){
        this.path = path;
        this.statusInMap = StatusMonsterInMap.MOVE_TO_ATTACK;
        this.gridOccupiedAttack = {x:this.path[this.path.length-1].x,y:this.path[this.path.length-1].y};
    }
    /** 被某个子弹受到攻击后的处理 */
    public beAttacked(paramBullet:ParamGun){
        this.updateHp(-paramBullet.force_attack);
        this.willDie();
        this.showMcAttack();        
    }
    /** 检测是否被子弹攻击并显示攻击效果 */
    public testBeAttacked(bullet:Bullet):boolean{
        if(this.hasDie)    return;
        var mcMonster :MovieClip = this.mcMonster;
        if(
            bullet.x>this.x-mcMonster.width/2&&bullet.x<this.x+mcMonster.width/2
            &&bullet.y>this.y-mcMonster.height&&bullet.y<this.y
        ){
            this.beAttacked(bullet.paramGun);
            return true;
        }
        return false;
    }
    /** 进入攻击模式 */
    private intoStatusAttack(){
        this.statusInMap = StatusMonsterInMap.STATIC_ATTACK;
        var dir :Directions = MathLogicCf.getDirMonsterAttack(this.nodeSelf);
        this.updateAnim(dir,true);
    }
    /**获得自身在格子地图中的节点*/
    public get getNodeSelfPos():AStarNode{
        return this.nodeSelf;
    }
    public get getCoinGet():number{
        return this.paramMonster.coin;
    }

    ///////////////////////////////////////
    /////////       内部方法
    ///////////////////////////////////////
    /**是否已经死亡*/
    private willDie(){
        if(this.paramMonster.hp<1){
            this.hasDie = true;
            this.toStatusDie();
        }
    }
    private showMcAttack(){
        var mcExplode :BulletExplode = CachePool.produce(BulletExplode);
        mcExplode.addSelf(this,{x:0,y:-this.mcMonster.height/3});
    }
    
    private updateHp(numOffset:number){
        this.paramMonster.hp += numOffset;
        this.hpBar.updateHpProgress(this.paramMonster.hp);
    }
    /** 根据方向更新僵尸在移动和攻击时候的动画 */
    private updateAnim(dir:Directions,isAttack:boolean=false){
        var AnimMonster = this.AnimMonster;
        var labelMc:string;
        if(dir==Directions.DOWN){
            if(isAttack)
                labelMc = AnimMonster.DOWN_ATTACK;
            else
                labelMc = AnimMonster.DOWN_MOVE;
        }else if(isAttack)
            labelMc = AnimMonster.SIDE_ATTACK;
        else
            labelMc = AnimMonster.SIDE_MOVE;
        if(labelMc==this.labelMc)   return;
        this.mcMonster.scaleX = dir==Directions.LEFT ? -1 : 1;
        this.mcMonster.gotoAndPlay(labelMc,-1);
        this.labelMc = labelMc;
    }
    /** 定位 */
    private posSelf(){
        var numSizeGrid = ConfMap.SizeMapConf.numSizeGrid;
        utils.setProps(this,{x:(this.nodeSelf.x+0.5)*numSizeGrid,y:(this.nodeSelf.y+0.5)*numSizeGrid});
    }
    /** 死亡状态显示 */
    private toStatusDie(){
        this.mcMonster.stop();
        this.attachEvtAfterDie();
        this.mcMonster.gotoAndPlay(this.AnimMonster.DEAD,1);
    }

    /** 添加到场景中并初始化某些数据 */
    public addSelf(container:egret.DisplayObjectContainer,paramMonster:ParamMonster,path:Array<AStarNode>){
        if(!this.paramMonster||this.paramMonster.id!=paramMonster.id){
            var mcFactory :egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes('monster_'+paramMonster.id+'_json'),RES.getRes('monster_'+paramMonster.id+'_png'));
            this.mcMonster.movieClipData = mcFactory.generateMovieClipData('monster_'+paramMonster.id);
        }
        this.mcMonster.gotoAndPlay(this.AnimMonster.DOWN_MOVE,-1);
        this.mcMonster.scaleX = 1;
        this.labelMc = null;
        this.gridOccupiedAttack = null;
        this.hpBar.y = -this.mcMonster.height;
        this.hpBar.addSelf(this,paramMonster.hp);
        this.paramMonster = paramMonster;
        this.path = path;
        this.hasDie = false;
        this.statusInMap = StatusMonsterInMap.MOVE_IN_LINE;
        this.nodeSelf = new AStarNode(path[0].x,path[0].y);
        this.posSelf();
        container.addChild(this);
    }
    private remAncReclaimSelf(){
        this.parent.removeChild(this);
        CachePool.reclaim(this);
    }
    private attachEvtAfterDie(){
        this.mcMonster.once(egret.Event.COMPLETE,this.remAncReclaimSelf,this);
    }
    private initComps(){

        var mcMonster:egret.MovieClip = new egret.MovieClip;

        var hpBar :HpBarMonster = new HpBarMonster;
        utils.setProps(hpBar,{},[0.5,0.5]);

        utils.addChildren(this,[mcMonster,hpBar]);
        this.mcMonster = mcMonster;
        this.hpBar = hpBar;
        
        utils.setProps(this,{width:0,height:0});

    }
}