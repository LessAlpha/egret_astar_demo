

class BulletExplode extends egret.MovieClip {
    
    static keyClass = 'BulletExplode';
    
    constructor(){
        super();
        this.initSelf();
    }
    
    
    public addSelf(container:egret.DisplayObjectContainer,posXy:xy){
        utils.setProps(this,{x:posXy.x,y:posXy.y});
        container.addChild(this);
        this.gotoAndPlay(0,1);
    }
    
    
    private remAndReclaimSelf(){
        this.parent.removeChild(this);
        CachePool.reclaim(this); 
    }
    private initSelf(){
        var json = RES.getRes('bullet_explode_1_json');
        var png = RES.getRes('bullet_explode_1_png');
        var mcFactory :egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json,png);
        this.movieClipData = mcFactory.generateMovieClipData('bullet_explode_1');
        this.addEventListener(egret.Event.COMPLETE,this.remAndReclaimSelf,this);
        
    }
    
}