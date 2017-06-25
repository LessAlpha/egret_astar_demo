module btns{

    export class BtnRoundRect extends egret.Sprite{

        private numColorNormal:number;
        private numColorClick:number;

        constructor(strTxBtn:string,numWidthBtn:number=120,numHeightBtn:number=60,numColorNormal:number=0x288328,numColorClick:number=0x1C5B1C){
            super();
            this.width = numWidthBtn;
            this.height = numHeightBtn;
            this.numColorClick = numColorClick;
            this.numColorNormal = numColorNormal;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchSelf,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchSelf,this);
            this.touchEnabled = true;

            this.drawSelf(numColorNormal);

            var tfTxBtn:egret.TextField = new egret.TextField;
            this.setProps(tfTxBtn,{
                fontFamily:'Microsoft YaHei,微软雅黑',bold:true,size:numHeightBtn/2,x:numWidthBtn/2,y:numHeightBtn/2,text:strTxBtn
            },[0.5,0.5]);
            this.addChild(tfTxBtn);
        }
        private touchSelf(evt:egret.TouchEvent){
            this.drawSelf(evt.type==egret.TouchEvent.TOUCH_BEGIN?this.numColorClick:this.numColorNormal);
        }
        private drawSelf(numColor:number){
            this.graphics.clear();
            this.graphics.beginFill(numColor);
            this.graphics.drawRoundRect(0,0,this.width,this.height,this.height/3,this.height/3);
            this.graphics.endFill();
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
    
    export class BtnBmBm extends egret.DisplayObjectContainer{
        constructor(nameTextureBg:string,nameTextureTx:string,propsBg?:any,propsTx?:any){
            super();
            var bgBtn = new egret.Bitmap(RES.getRes(nameTextureBg));
            utils.setProps(bgBtn,{x:bgBtn.width/2,y:bgBtn.height/2},[0.5,0.5]);
            var txBtn = new egret.Bitmap(RES.getRes(nameTextureTx));
            utils.setProps(txBtn,{x:bgBtn.x,y:bgBtn.y},[0.5,0.5]);
            utils.addChildren(this,[bgBtn,txBtn]);

            if(propsTx) utils.setProps(txBtn,propsTx);
            if(propsBg) utils.setProps(bgBtn,propsBg);
        }
        public ctrlTouch(canTouch){
            this.alpha = canTouch ? 1 : 0.5;
        }

    }
    export class BtnBmTf extends egret.DisplayObjectContainer{

        private bgBtn:egret.Bitmap;
        private txBtn:egret.TextField;

        constructor(nameTextureBg:string,txTf:string,propsBg?:any,propsTx?:any){
            super();
            var bgBtn = new egret.Bitmap(RES.getRes(nameTextureBg));
            if(propsBg) utils.setProps(bgBtn,propsBg,[0.5,0.5]);
            utils.setProps(bgBtn,{x:bgBtn.width/2,y:bgBtn.height/2,name:'bg_btn'},[0.5,0.5]);
            if(propsBg) utils.setProps(bgBtn,propsBg,[0.5,0.5]);

            var txBtn = new egret.TextField();
            utils.setProps(txBtn,{text:txTf,x:bgBtn.width/2,y:bgBtn.height/2,name:'tx_btn'},[0.5,0.5]);
            if(propsTx)
                utils.setProps(txBtn,propsTx);

            utils.addChildren(this,[bgBtn,txBtn]);
            this.txBtn = txBtn;
            this.bgBtn = bgBtn;
        }
        public modifyPropsTx(props:any,arrAnchor?:Array<number>){
            utils.setProps(this.txBtn,props,arrAnchor);
        }
        public modifyPropsBgBtn(props:any,arrAnchor?:Array<number>){
            utils.setProps(this.bgBtn,props,arrAnchor);
        }

    }
    export function initFloatBtn(obj:any){
        obj.touchEnabled = true;
        var numYOrigin:number = obj.y;
        obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(evt:egret.TouchEvent)=>{
            if(evt.target!=obj) return;
            twScaleButton(obj,'down');
        },this);
        obj.addEventListener(egret.TouchEvent.TOUCH_END,(evt:egret.TouchEvent)=>{
            // if(evt.target!=obj) return;
            twScaleButton(obj,'up');
        },this);
        obj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,(evt:egret.TouchEvent)=>{
            // if(evt.target!=obj) return;
            twScaleButton(obj,'up');
        },this);
        
        function twScaleButton(obj:any,wayTw:string){
            var yPos = wayTw=='down'?numYOrigin+10:numYOrigin;
            egret.Tween.removeTweens(obj);
            egret.Tween.get(obj)
                .to({y:yPos},60,egret.Ease.bounceOut);
        }
    }
    export function initScaleBtn(obj:any,funEnd?:Function,scopeEnd?:any){
        obj.touchEnabled = true;
        obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(evt:egret.TouchEvent)=>{
            if(evt.target!=obj) return;
            twScaleButton(obj,'small');
        },this);
        obj.addEventListener(egret.TouchEvent.TOUCH_END,(evt:egret.TouchEvent)=>{
            if(evt.target!=obj) return;
            twScaleButton(obj,'big');
            if(funEnd)
                funEnd.call(scopeEnd)
        },this);
        obj.addEventListener(egret.TouchEvent.TOUCH_MOVE,(evt:egret.TouchEvent)=>{
            if(evt.target!=obj) return;
            twScaleButton(obj,'big');
        },this);
        obj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,(evt:egret.TouchEvent)=>{
            // if(evt.target!=obj) return;
            twScaleButton(obj,'big');
        },this);
        function twScaleButton(obj:any,wayTw:string){
            var scaleFactor = wayTw=='small'?0.9:1;
            egret.Tween.removeTweens(obj);
            egret.Tween.get(obj)
                .to({scaleX:scaleFactor,scaleY:scaleFactor},60,egret.Ease.bounceOut);
        }
    }
}