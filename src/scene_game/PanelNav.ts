/**
 * 底部导航栏
 */

class PanelNav extends egret.DisplayObjectContainer{

    public Evts = {
        EXCHANGE_GUN:'exchangeGun',
        USE_TECH:'useTech'
    };
    private boardTech :BoardTech;
    private boardWeapons :BoardWeapons;
    private boardNav :BoardNav;
    
    constructor(){
        super();
        this.initComps();
    }

    /** 刷新技能栏 */
    public refreshTechs(arrIdTechs:number[]){

    }
    /** 刷新武器栏 */
    public refreshWeapons(arrIdWeapons:number[]){
        
    }
    
    
    ////////////////////////////////////////////////////////////
    //                  内部方法
    ////////////////////////////////////////////////////////////

    private useTech(evt:egret.Event){
        
    }
    private exchangeGun(evt:egret.Event){
        var idGun :number = evt.data.id;
        this.dispatchEventWith(this.Evts.EXCHANGE_GUN,false,{id:idGun});
    }

    
    private initComps(){


        var bmBoard0 :egret.Bitmap = new egret.Bitmap(RES.getRes('a_9'));
        var bmBoard1 :egret.Bitmap = new egret.Bitmap(RES.getRes('a_10'));
        utils.setProps(bmBoard1,{y:bmBoard0.height-bmBoard1.height});
        utils.addChildren(this,[bmBoard0,bmBoard1]);

        var boardTech :BoardTech = new BoardTech;
        utils.setProps(boardTech,{x:0,y:35});

        var boardWeapons :BoardWeapons = new BoardWeapons;
        boardWeapons.addEventListener(boardWeapons.Evts.USE_WEAPON,this.exchangeGun,this);
        utils.setProps(boardWeapons,{x:410,y:20});

        var boardNav :BoardNav = new BoardNav;
        utils.setProps(boardNav,{x:6,y:98});

        utils.addChildren(this,[boardNav,boardTech,boardWeapons]);
        this.boardTech = boardTech;
        this.boardNav = boardNav;
        this.boardWeapons = boardWeapons;

    }
}