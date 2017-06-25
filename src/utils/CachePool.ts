/**
 * Created by liu on 2015/12/9.
 */
/**
 * 缓存对象池
 */
class CachePool{
    public static cacheDict:Object = {};
    /**生产*/
    public static produce(classFactory:any){
        var key = classFactory.keyClass;
        if(this.cacheDict[key]==null){
            this.cacheDict[key] = [];
        }
        var arr = this.cacheDict[key];
        var result;
        if(arr.length>0) {
            result = arr.pop();
        } else {
            result = new classFactory();
            result.key = key;
        }
        // console.warn('生产后的长度：',arr.length);
        return result;
    }
    /**回收*/
    public static reclaim(obj:any):void{
        var key = obj.key;
        if(this.cacheDict[key]==null)
            this.cacheDict[key] = [];
        var arr = this.cacheDict[key];
        if(arr.indexOf(obj) == -1){
            arr.push(obj);
            // console.warn('回收后的长度：',arr.length);
        }
    }
    /**将某数组中含有另外一个数组中的元素移除掉并回收到对象池*/
    public static reclaimObjFromArr(arrOriginal:Array<any>,arrReclaim:Array<any>){
        for(var j in arrReclaim){
            var obj = arrReclaim[j];
            arrOriginal.splice(arrOriginal.indexOf(obj),1);
            CachePool.reclaim(obj);
        }
    }

}
