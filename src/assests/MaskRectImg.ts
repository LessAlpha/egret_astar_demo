

class MaskRectImg extends egret.Bitmap{
    
    private numTotal:number;
    private maskRect:egret.Rectangle;
    
    constructor(strTexture:string){
        super(RES.getRes(strTexture));
        this.maskRect = new egret.Rectangle(0,0,this.width,this.height);
        this.mask = this.maskRect;egret
    }
    public setNumTotal(numTotal:number){
        this.numTotal = numTotal;        
    }
    public updateProgress(numNow:number){
        this.maskRect.width = this.width*(numNow/this.numTotal);
        this.mask = this.maskRect;
    }
    
}