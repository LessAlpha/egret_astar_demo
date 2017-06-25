/**
 * Created by liu on 2015/11/15.
 */

class NetHttp
{

    /**
     * 发送网络请求
     * @param reqUrl http://www.aaa.com
     * @param postData uid=0&name="ch"&money=999
     * @param callback 回调函数
     * var loader:egret.URLLoader = <egret.URLLoader> event.target;
     * var data:egret.URLVariables = loader.data;
     * var js = eval("(" + data.toString() + ")");
     * @param timeOut 超时函数
     * @param thisObj
     */
    public static doPostRequest(reqUrl:string, postData:string, callback:Function, timeOut :Function, thisObj:any)
    {
        var loader:egret.URLLoader = new egret.URLLoader();
        //loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //loader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        loader.addEventListener(egret.Event.COMPLETE, callback, thisObj);
        if (timeOut) {
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, timeOut, thisObj);
        }

        var request:egret.URLRequest = new egret.URLRequest(reqUrl);
        request.method = egret.URLRequestMethod.POST;
        request.data = new egret.URLVariables(postData);
        loader.load(request);


    }
    /**
     * 发送网络请求
     * @param reqUrl http://www.aaa.com
     * @param getData uid=0&name="ch"&money=999
     * @param callback 回调函数
     * var loader:egret.URLLoader = <egret.URLLoader> event.target;
     * var data:egret.URLVariables = loader.data;
     * var js = eval("(" + data.toString() + ")");
     * @param timeOut 超时函数
     * @param thisObj
     */
    public static doGetRequest(reqUrl:string, getData:string, callback:Function, timeOut :Function, thisObj:any)
    {
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, callback, thisObj);
        if (timeOut) {
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, timeOut, thisObj);
        }

        var request:egret.URLRequest = new egret.URLRequest(reqUrl);
        request.method = egret.URLRequestMethod.GET;
        request.data = new egret.URLVariables(getData);
        loader.load(request);
    }

}