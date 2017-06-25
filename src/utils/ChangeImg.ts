class ChangeImg extends egret.Bitmap{

    private duration:number = 500;
    private timerChange:egret.Timer;
    private textureArr:Array<string>;

    constructor(textureArr){
        super();
        this.textureArr = textureArr;
        this.init();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.startChange,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.stopChange,this);        
    }
    
    
    public startChange(){
        this.timerChange.reset();
        this.timerChange.start();
    }
    public stopChange(){
        this.timerChange.stop();
    }
    public setDuration(time:any){
        this.duration = time;
        this.timerChange.delay = this.duration;
        this.startChange();
    }

    

    private init(){
        this.timerChange = new egret.Timer(this.duration);
        this.timerChange.addEventListener(egret.TimerEvent.TIMER,this.changeTexture,this);
    }

    private changeTexture(){
        this.textureArr.push(this.textureArr.shift());
        this.texture = RES.getRes(this.textureArr[0]);
    }


}