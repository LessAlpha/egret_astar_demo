class PoolBM extends egret.Bitmap{
    private static cacheDict:Object = {};
    /**生产*/
    public static produce(textureName:string):PoolBM{
        if(this.cacheDict[textureName]==null){
            this.cacheDict[textureName] = [];
        }
        var dict:PoolBM[] = this.cacheDict[textureName];
        var water:PoolBM;
        if(dict.length>0) {
            water = dict.pop();
        } else {
            water = new PoolBM(textureName);
        }
        //console.warn('生产后的长度：',dict.length);
        //water.textureName = textureName;
        return water;
    }
    /**回收*/
    public static reclaim(water:PoolBM,textureName:string):void{
        if(this.cacheDict[textureName]==null)
            this.cacheDict[textureName] = [];
        var dict:PoolBM[] = this.cacheDict[textureName];
        if(dict.indexOf(water)!=-1){
            dict.push(water);
            console.warn('回收后的长度：',dict.length);
        }
    }

    //public textureName:string;

    public constructor(textureName:string) {
        super(RES.getRes(textureName));
    }
}
class PoolMC extends egret.MovieClip{
    private static cacheDict:Object = {};
    /**生产*/
    public static produce(mcName:string,dataJson:string,textureJson:string):PoolMC{
        if(this.cacheDict[mcName]==null){
            this.cacheDict[mcName] = [];
        }
        var dict:PoolMC[] = this.cacheDict[mcName];
        var mc:PoolMC;
        if(dict.length>0) {
            mc = dict.pop();
        } else {
            var data = RES.getRes(dataJson);
            var texture = RES.getRes(textureJson);
            var mcDataFactory :egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
            mc = new PoolMC(mcDataFactory.generateMovieClipData(mcName));
        }
        //console.warn('生产后的长度：',dict.length);
        //mc.mcName = mcName;
        return mc;
    }
    /**回收*/
    public static reclaim(mc:PoolMC,mcName:string):void{
        if(this.cacheDict[mcName]==null)
            this.cacheDict[mcName] = [];
        var dict:PoolMC[] = this.cacheDict[mcName];
        if(dict.indexOf(mc)!=-1){
            dict.push(mc);
            console.warn('回收后的长度：',dict.length);
        }
    }

    public constructor(mcName:egret.MovieClipData) {
        super(mcName);
    }

}