/**
 * 火印EUI控件
 *
 var textureRelative = ['a1_png','a2_png','a3_png','a4_png','a5_png','a6_png','a7_png','a8_png','a9_png'];
 var ptRelative :egret.Point = new egret.Point(30,0);
 var arrAnchor:Array<number> = [0,0];
 var inst = new PanelDrag(textureRelative,ptRelative,arrAnchor);
 this.addChild(inst);
 */

class PanelDrag extends egret.Sprite{

    /** 两个图片之间的间隔距离*/
    private numGapPics:number = 180;
    /** 每行排布的图片总数 */
    private numSumEveryRow:number;
    /** 拖动的图片*/
    private bmPicMove:egret.Bitmap;
    /** 拖动图片在纹理数组中的索引 */
    private numIndPicMove:number = null;
    /** 纹理数组 */
    private arrStrTexture:Array<string>;
    /** 图片锚点 */
    private arrAnchor : Array<number>;
    /** 放置物的原点 */
    private ptRelative:egret.Point;

    private bmBtnShowBoardPics:btns.BtnRoundRect;
    private bmBtnGenerate:btns.BtnRoundRect;
    private bmBtnSend:btns.BtnRoundRect;

    private arrPicsLib:Array<egret.Bitmap>;
    private arrPicsPut:Array<egret.Bitmap> = [];

    // private arrPropsPicsPut:Array<{strTextureName:string,x:number,y:number}> = [];

    private boardPicsLib:egret.Sprite;
    private boardPicsPut:egret.DisplayObjectContainer;

    private bmPicMoveAdapt:egret.Bitmap;

    /**
     *
     * @param arrStrTexture     需要放置的纹理名称
     * @param ptRelative        布局页面相对于舞台原点
     * @param arrAnchor         显示对象的锚点数组 [ anchorX , anchorY ]
     */
    constructor(arrStrTexture:Array<string>,ptRelative:egret.Point,arrAnchor:Array<number>=[0.5,0.5]){
        super();
        this.numIndPicMove = null;
        this.arrStrTexture = arrStrTexture;
        this.ptRelative = ptRelative;
        this.arrAnchor = arrAnchor;
        this.initComps();
        this.showPicsBoard(false);
        this.initEvtTouch();
    }



    private touchPicPut(evt:egret.TouchEvent){
        var tar = evt.target;
        if(tar==this)   return;

        var ptTouch = new egret.Point(evt.stageX,evt.stageY);
        switch (evt.type){
            case egret.TouchEvent.TOUCH_BEGIN:
                var arrPicsPut:Array<egret.Bitmap> = this.arrPicsPut;
                var len :number = 100;
                for(var i:number=0; i<arrPicsPut.length; i++){
                    var pic = arrPicsPut[i];
                    var dist = utils.distPoint(new egret.Point(pic.x,pic.y),ptTouch);
                    if(dist<len){
                        this.bmPicMoveAdapt = pic;
                        pic.parent.setChildIndex(pic,pic.parent.numChildren+1);
                        len = dist;
                    }
                }
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                if(!this.bmPicMoveAdapt) return;
                utils.setProps(this.bmPicMoveAdapt,{x:ptTouch.x,y:ptTouch.y});
                break;
            case egret.TouchEvent.TOUCH_END:
                if(!this.bmPicMoveAdapt) return;
                utils.setProps(this.bmPicMoveAdapt,{x:ptTouch.x,y:ptTouch.y});
                this.bmPicMoveAdapt = null;
        }
    }
    private putObjToMap(strTextureName:string,ptPos:egret.Point){
        var bmObj = new egret.Bitmap(RES.getRes(strTextureName));
        bmObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchPicPut,this);
        bmObj.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchPicPut,this);
        bmObj.addEventListener(egret.TouchEvent.TOUCH_END,this.touchPicPut,this);
        this.setProps(bmObj,{x:ptPos.x,y:ptPos.y,name:strTextureName,touchEnabled:true},this.arrAnchor);
        this.boardPicsPut.addChild(bmObj);
        this.arrPicsPut.push(bmObj);
        // this.arrPropsPicsPut.push({strTextureName:strTextureName,x:ptPos.x-this.ptRelative.x,y:ptPos.y-this.ptRelative.y});
    }

    private touchPic(evt:egret.TouchEvent){
        if(this.bmBtnShowBoardPics.visible)    return;
        var ptTouch = new egret.Point(evt.stageX,evt.stageY);
        switch (evt.type){
            case egret.TouchEvent.TOUCH_BEGIN:
                var indPic:number = Math.floor(ptTouch.y/this.numGapPics)*this.numSumEveryRow+Math.floor(ptTouch.x/this.numGapPics);
                if(indPic<this.arrStrTexture.length){
                    this.setPicMoveTexture(indPic);
                    this.updatePosPicMove(ptTouch);
                    this.showPicMove();
                    this.showPicsBoard(false);
                    this.showBtns(false);
                    this.numIndPicMove = indPic;
                }else{
                    this.showPicsBoard(false);
                    this.showBtns(true);
                }
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                if(this.isDragingPic()){
                    this.updatePosPicMove(ptTouch);
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                if(this.isDragingPic()){
                    this.putObjToMap(this.arrStrTexture[this.numIndPicMove],ptTouch);
                    this.showPicsBoard(false);
                    this.showPicMove(false);
                    this.showBtns(true);
                    this.numIndPicMove = null;
                }
        }
    }

    private updatePosPicMove(ptTo:egret.Point){
        this.setProps(this.bmPicMove,{x:ptTo.x,y:ptTo.y});
    }

    private setPicMoveTexture(indPic:number){
        this.setProps(this.bmPicMove,{
            visible:true,texture:RES.getRes(this.arrStrTexture[indPic])
        },this.arrAnchor);
    }
    private showPicMove(isVisible:boolean=true){
        this.bmPicMove.visible = isVisible;
    }
    private showBtns(isVisible:boolean=true){
        this.bmBtnGenerate.visible = this.bmBtnSend.visible = this.bmBtnShowBoardPics.visible = isVisible;
    }

    private isDragingPic(){
        return this.numIndPicMove!=null;
    }

    private showPicsBoard(isVisible:boolean=true){
        this.boardPicsLib.visible = isVisible;
    }

    private touchBtnShowBoardPics(){
        this.showPicsBoard(true);
        this.showBtns(false);
    }
    private generateDataMap(){
        var arrPics = this.arrPicsPut;
        for(var i in arrPics){
            var pic = arrPics[i];
            var strLog :string = 'var bm'+pic.name+':egret.Bitmap = new egret.Bitmap(RES.getRes("'+pic.name+'"));utils.setProps(bm'+pic.name+',{x:'+Math.round(pic.x-this.ptRelative.x)+',y:'+Math.round(pic.y-this.ptRelative.y)+'},['+this.arrAnchor+'])';
            console.log(strLog);
        }
    }
    private sendDataMap(){

    }

    private initEvtTouch(){
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchPic,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchPic,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchPic,this);
        this.touchEnabled = true;
        this.bmBtnShowBoardPics.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchBtnShowBoardPics,this);
        this.bmBtnShowBoardPics.touchEnabled = true;
        this.bmBtnGenerate.addEventListener(egret.TouchEvent.TOUCH_TAP,this.generateDataMap,this);
        this.bmBtnGenerate.touchEnabled = true;
        this.bmBtnSend.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sendDataMap,this);
        this.bmBtnSend.touchEnabled = true;
    }

    private initComps(){

        this.setProps(this,{width:GlobalData.wStage,height:GlobalData.hStage});
        this.graphics.beginFill(0x000,0.3);
        this.graphics.drawRect(this.ptRelative.x,this.ptRelative.y,this.width,this.height);
        // this.graphics.drawRect(this.ptRelative.x,this.ptRelative.y,20,20);
        this.graphics.endFill();

        var bmBtnShowBoardPics:btns.BtnRoundRect = new btns.BtnRoundRect('显示');
        this.setProps(bmBtnShowBoardPics,{x:this.width/2-200,y:10},[0.5,0]);
        this.addChild(bmBtnShowBoardPics);

        var bmBtmGenerate:btns.BtnRoundRect = new btns.BtnRoundRect('生成');
        this.setProps(bmBtmGenerate,{x:this.width/2,y:bmBtnShowBoardPics.y},[0.5,0]);
        this.addChild(bmBtmGenerate);

        var bmBtmSend:btns.BtnRoundRect = new btns.BtnRoundRect('发送');
        this.setProps(bmBtmSend,{x:this.width/2+200,y:bmBtnShowBoardPics.y},[0.5,0]);
        this.addChild(bmBtmSend);

        var boardPicsLib:egret.Sprite = new egret.Sprite;
        boardPicsLib.graphics.beginFill(0x000,0.7);
        boardPicsLib.graphics.drawRoundRect(0,0,this.width,this.height,100,100);
        boardPicsLib.graphics.endFill();
        this.addChild(boardPicsLib);

        this.numSumEveryRow = Math.floor(this.width/this.numGapPics);
        var arrPicsLib:Array<egret.Bitmap> = [];
        var arrStrTexture = this.arrStrTexture;
        var bmOne:egret.Bitmap;
        for(var i:number=0; i<arrStrTexture.length; i++){
            bmOne = new egret.Bitmap(RES.getRes(arrStrTexture[i]));
            this.setProps(bmOne,{x:(i%this.numSumEveryRow+0.5)*this.numGapPics,y:(Math.floor(i/this.numSumEveryRow)+0.5)*this.numGapPics},this.arrAnchor);
            arrPicsLib.push(bmOne);
            boardPicsLib.addChild(bmOne);
        }

        this.bmBtnShowBoardPics = bmBtnShowBoardPics;
        this.bmBtnGenerate = bmBtmGenerate;
        this.bmBtnSend = bmBtmSend;
        this.arrPicsLib = arrPicsLib;
        this.boardPicsLib = boardPicsLib;

        this.bmPicMove = new egret.Bitmap;
        this.addChild(this.bmPicMove);
        this.boardPicsPut = new egret.DisplayObjectContainer;
        this.addChildAt(this.boardPicsPut,0);

    }
    private setProps(obj:any, objProperty:Object, objAnchor?:Array<number>) {
        for (var i in objProperty) {
            obj[i] = objProperty[i];
        }
        if(objAnchor){
            obj.anchorOffsetX = obj.width * objAnchor[0];
            obj.anchorOffsetY = obj.height * objAnchor[1];
        }
    }


}
