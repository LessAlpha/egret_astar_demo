class PoolTF extends egret.TextField{
    private static cacheDict:Object = {};
    /**生产*/
    public static produce(textShow:string):PoolTF{
        if(this.cacheDict[textShow]==null){
            this.cacheDict[textShow] = [];
        }
        var dict:PoolTF[] = this.cacheDict[textShow];
        var water:PoolTF;
        if(dict.length>0) {
            water = dict.pop();
        } else {
            water = new PoolTF(textShow);
        }
        //console.warn('生产后的长度：',dict.length);
        //water.textShow = textShow;
        return water;
    }
    /**回收*/
    public static reclaim(water:PoolTF,textShow:string):void{
        if(this.cacheDict[textShow]==null)
            this.cacheDict[textShow] = [];
        var dict:PoolTF[] = this.cacheDict[textShow];
        if(dict.indexOf(water) == -1){
            dict.push(water);
            //console.warn('回收后的长度：',dict.length);
        }
    }

    //public textShow:string;

    public static key = 'ADD_SCORE';
    public constructor(textShow:string) {
        super();
        utils.setProps(this,{text:''+textShow,textAlign:'center',textColor:0xf5c51e,size:30,fontFamily:'Microsoft Yahei'},[0.5,1]);

    }
    public setText(textString:string){
        this.text = '' + textString;
    }
}