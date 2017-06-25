
class TfTimerUpdate extends egret.BitmapText{


    private numDelayUpdate:number;
    private numTimesUpdate:number = 5;//变换次数的最大值
    private tmUpdate:egret.Timer;
    private numTarget:number;
    private numOffset:number;
    private arrAnchor:Array<number>;
    constructor(strFontTexture:string,arrAnchor:Array<number>,numDelayUpdate:number=100){
        super();
        this.font = RES.getRes(strFontTexture);
        this.arrAnchor = arrAnchor;
        this.numDelayUpdate = numDelayUpdate;
        this.initSelf();
    }

    public setNumTarget(numTarget:number){
        this.stopTm();
        this.numTarget = numTarget;
        this.numOffset = Math.ceil((numTarget-this.myTextInt)/this.numTimesUpdate);
        if(this.numOffset==0)
            this.numOffset = -1;
        this.startTm();
    }

    private startTm(){
        this.tmUpdate.start();
    }
    private stopTm(){
        if(this.tmUpdate.running)
            this.tmUpdate.stop();
    }
    private funTimer(){
        if(this.hasToTarget){
            utils.setProps(this,{text:'' + this.numTarget},this.arrAnchor);            
            this.stopTm();
            return;
        }else{
            utils.setProps(this,{text:'' + (this.myTextInt+this.numOffset)},this.arrAnchor);
        }
    }
    private get myTextInt():number{
        return parseInt(this.text);
    }
    private get hasToTarget():boolean{
        if(Math.abs(this.myTextInt-this.numTarget)<=1){
            return true;
        }else if(this.numOffset<0&&(this.myTextInt+this.numOffset)<=this.numTarget){
            return true;
        }else if(this.numOffset>0&&(this.myTextInt+this.numOffset)>=this.numTarget){
            return true;
        }
        return false;
    }

    private initSelf(){

        utils.setProps(this,{text:'0'},this.arrAnchor);
        var tmUpdate:egret.Timer = new egret.Timer(this.numDelayUpdate);
        tmUpdate.addEventListener(egret.TimerEvent.TIMER,this.funTimer,this);
        this.tmUpdate = tmUpdate ;
    }
}