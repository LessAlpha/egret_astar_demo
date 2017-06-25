
class utils {

    

    ///////////////////////////////////////////////////////////
    //              DOM 类
    ///////////////////////////////////////////////////////////
    static getWindowWidth()
    {
        var cur_width = 480;
        if (window && window.innerWidth)
            cur_width = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            cur_width = document.body.clientWidth;
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
        {
            cur_width = document.documentElement.clientWidth;
        }
        return cur_width;
    }
    static getWindowHeight() {
        var cur_height = 800;
        if (window && window.innerHeight)
            cur_height = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            cur_height = document.body.clientHeight;
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            cur_height = document.documentElement.clientHeight;
        }
        return cur_height;
    }

    /////////////////////////////////////////////////////////////////////////
    //          Egret API
    ////////////////////////////////////////////////////////////////////////

    static toogleVisible(obj:any,visiblity:boolean){
        obj.visible = visiblity;
    }

    static giveMask(obj:any){
        var maskShape = new egret.Shape();
        maskShape.graphics.beginFill(0x000,1);
        maskShape.graphics.drawRect(0,0,obj.width,obj.height);
        maskShape.graphics.endFill();
        utils.setProps(maskShape,{x:obj.x-obj.anchorOffsetX,y:obj.y-obj.anchorOffsetY});
        if(obj.parent)
            obj.parent.addChild(maskShape);
        obj.mask = maskShape;
        return maskShape;
    }

    
    static showInfo(dataShow:any){
        console.log(dataShow);
    }

    static dragToPosition(objMove) {
        var tipPos = new egret.TextField();
        this.setProps(tipPos,{
            x: objMove.x,y: objMove.y,
            text: '' + parseInt(objMove.x) + ',' + parseInt(objMove.y),
            size: 15,textColor: 0x000000
            //stroke: 2,strokeColor: 0x00ff00
        });
        objMove.parent.addChild(tipPos);
        //objMove.touchEnabled = true;
        //objMove.addEventListener(egret.TouchEvent.TOUCH_MOVE,(evt:egret.TouchEvent)=>{
        //    objMove.x += (evt.stageX-objMove.parent.x-objMove.x);
        //    objMove.y += (evt.stageY-objMove.parent.y-objMove.y);
        //    tipPos.x = objMove.x;tipPos.y = objMove.y;
        //    tipPos.text = ''+parseInt(objMove.x)+' & '+parseInt(objMove.y);
        //    console.log(''+parseInt(objMove.x)+'---'+parseInt(objMove.y))
        //},this);

        window["debugScope"] = objMove.parent;
        window["keyUp"] = function () {
            objMove.y -= 2;
            showPos();
        };
        window["keyRight"] = function () {
            objMove.x += 2;
            showPos();
        };
        window["keyDown"] = function () {
            objMove.y += 2;
            showPos();
        };
        window["keyLeft"] = function () {
            objMove.x -= 2;
            showPos();
        };
        function showPos(){
            tipPos.x = objMove.x;
            tipPos.y = objMove.y;
            tipPos.text = 'x:' + parseInt(objMove.x) + ',y:' + parseInt(objMove.y);
            console.log(tipPos.text);
        }
        showPos();
    }
    /** 基于矩形的碰撞检测 **/
    static hitTestRectRect(objRect1, objRect2,offset = {xObj1:1,yObj1:1,xObj2:1,yObj2:1}):boolean {

        var rect1:egret.Rectangle = objRect1.getBounds();
        var rect2:egret.Rectangle = objRect2.getBounds();

        utils.setProps(rect1,{width:rect1.width*offset.xObj1,height:rect1.height*offset.yObj1});
        utils.setProps(rect2,{width:rect2.width*offset.xObj2,height:rect2.height*offset.yObj2});

        rect1.x = objRect1.x - objRect1.anchorOffsetX*offset.xObj1;
        rect1.y = objRect1.y - objRect1.anchorOffsetY*offset.yObj1;
        rect2.x = objRect2.x - objRect2.anchorOffsetX*offset.xObj2;
        rect2.y = objRect2.y - objRect2.anchorOffsetY*offset.yObj2;
        return rect1.intersects(rect2);

    }

    static hitTestRoundRound(objR1, objR2) {//:boolean
        if (this.distPoint(objR1, objR2) < objR1.width / 2 + objR2.width / 2)
            return true;
        else
            return false;
    }

    ///////////////////////////////////////////////////////////////
    //              Math
    ///////////////////////////////////////////////////////////////
    /**
     * 角度转弧度
     */
    static angleToRadian( angle:number ):number{
        return angle*Math.PI / 180;
    }

    /**
     * 弧度转角度
     */
    static radianToAngle( radian:number ):number{
        return radian*180/Math.PI;
    }
    /**
     * 根据两个点确定x值和y值得变化比例
     */
    static getDirPercentXY (pointSelf:{X:number,Y:number},pointDestination:{X:number,Y:number}){
        var distX = pointDestination.X - pointSelf.X;
        var distY = pointDestination.Y -pointSelf.Y;
        var total = Math.abs(distX) + Math.abs(distY);
        var xPercent = distX/total;
        var yPercent = distY/total;
        return {xPercent : xPercent, yPercent : yPercent};
    }
    /**
     * 两点之间的夹角
     */

    /** 计算两点距离 **/
    static distPoint(obj1, obj2) {
        return Math.sqrt((obj1.x - obj2.x) * (obj1.x - obj2.x) + (obj1.y - obj2.y) * (obj1.y - obj2.y));
    }

    /**
     * 获取两点之间的夹角    y轴正方向上为0°
     */
    public static agleBtwTwoPoin(px:number,py:number,mx:number,my:number){
        var x = Math.abs(px-mx);
        var y = Math.abs(py-my);
        var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        var cos = y/z;
        var radina = Math.acos(cos);//用反三角函数求弧度
        var angle = Math.round(180/(Math.PI/radina));//将弧度转换成角度
        if(mx>px&&my>py){//鼠标在第四象限
            angle = 180 - angle;
        }else if(mx==px&&my>py){//鼠标在y轴负方向上
            angle = 180;
        }else if(mx>px&&my==py){//鼠标在x轴正方向上
            angle = 90;
        }else if(mx<px&&my>py){//鼠标在第三象限
            angle = 180+angle;
        }else if(mx<px&&my==py){//鼠标在x轴负方向
            angle = 270;
        }else if(mx<px&&my<py){//鼠标在第二象限
            angle = 360 - angle;
        }
        return angle;
    }

    /**
     * 向量判断两条线是否相交
     */
    static simpleLineTest(l1p1x:number,l1p1y:number,l1p2x:number,l1p2y:number,
                                   l2p1x:number,l2p1y:number,l2p2x:number,l2p2y:number):boolean {
        var line1p1:number;
        line1p1=(l1p2x-l1p1x)*(l2p1y-l1p1y)-(l2p1x-l1p1x)*(l1p2y-l1p1y);
        var line1p2:number;
        line1p2=(l1p2x-l1p1x)*(l2p2y-l1p1y)-(l2p2x-l1p1x)*(l1p2y-l1p1y);
        var line2p1:number;
        line2p1=(l2p2x-l2p1x)*(l1p1y-l2p1y)-(l1p1x-l2p1x)*(l2p2y-l2p1y);
        var line2p2:number;
        line2p2=(l2p2x-l2p1x)*(l1p2y-l2p1y)-(l1p2x-l2p1x)*(l2p2y-l2p1y);
        if ((line1p1*line1p2<=0)&&(line2p1*line2p2<=0)) {
            return true;
        }
        return false;
    }


    /**
     * 处理对象类 ******************************************************************************************************
     */
    static setProps(obj:any, objProperty:Object, objAnchor?:Array<number>) {
        for (var i in objProperty) {
            obj[i] = objProperty[i];
        }
        if(objAnchor){
            obj.anchorOffsetX = obj.width * objAnchor[0];
            obj.anchorOffsetY = obj.height * objAnchor[1];
        }
    }


    /**
     * 创建新对象类 ******************************************************************************************************
     */
    static newMC(obj, container?:egret.DisplayObjectContainer):egret.MovieClip {

        var data = RES.getRes(obj.jsonData);
        var texture = RES.getRes(obj.textureData);
        var mcDataFactory :egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        var newChild:egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData(obj.mcName));
        if (container)
            container.addChild(newChild);
        return newChild;

    }
    static doPostRequest(reqUrl:string, postData:string, callback:Function, timeOut :Function, thisObj:any)
    {
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
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
    static doGetRequest(reqUrl:string, getData:string, callback:Function, timeOut :Function, thisObj:any)
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


    static addChildren(container:any, arr:Array<egret.DisplayObject>) {
        for (var i in arr) {
            container.addChild(arr[i]);
        }
    }

    static remChildren(container:any, arr) {
        for (var i = 0; i < arr.length; i++) {
            container.removeChild(arr[i]);
        }
    }


}


/**

     //防止掉帧产生位置变化差
     var nowTime:number = egret.getTimer();
     var fps:number = 1000/(nowTime-this._lastTimeMain);
     var speedOffset:number = 60/fps;

     //URLLoader和URLRequest的使用
     private startLoad():void {
         //创建 URLLoader 对象
         var loader:egret.URLLoader = new egret.URLLoader();
         //设置加载方式为纹理
         loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
         //添加加载完成侦听
         loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
         //添加加载失败侦听
         loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
         var url:string = "resource/assets/egret_icon.png";
         var request:egret.URLRequest = new egret.URLRequest(url);
         //开始加载
         loader.load(request);
     }

     private onLoadComplete(event:egret.Event):void {
         console.log("onLoadComplete");
         var loader:egret.URLLoader = <egret.URLLoader>event.target;
         //获取加载到的纹理对象
         var texture:egret.Texture = <egret.Texture>loader.data;
         console.log(texture);
     }

 //        var sp = new egret.Sprite();//todo 渐变颜色的图形的绘制
 //        var m = new egret.Matrix();
 //        m.createGradientBox(500,40,0,0,0);
 //        sp.graphics.beginGradientFill(egret.GradientType.LINEAR,[0xff0000,0x00ff00,0x0000ff],[0.3,0.7,1],[80,170,255],m);
 //        sp.graphics.drawRect(200,200,500,40);
 //        sp.graphics.endFill();
 //        this.addChild(sp);


 //////////////////////////////////////////   TextField   /////////////////////////////////////////////////

 utils.setProps(this.txScore,{
            x:Main.wGoal/2,y:Main.hGoal/2
            ,textColor:0xd0974d,size:24,fontFamily:'Microsoft Yahei'
            ,stroke:2,strokeColor:0x929292
            ,bold:true
            ,lineSpacing:0
            ,textAlign:egret.HorizontalAlign.CENTER
            ,verticalAlign:'middle'
            ,wordWrap:true
            ,textFlow:new egret.HtmlTextParser().parser('<font></font>')
        });

    public draw(r1,r2){
        this.remFrame();

        this.graphics.beginFill(0x555555);
        this.graphics.drawRect(r1.x,r1.y,r1.width,r1.height);
        this.graphics.endFill();

        this.graphics.beginFill(0x555555);
        this.graphics.drawRect(r2.x,r2.y,r2.width,r2.height);
        this.graphics.endFill();


    }


 */
