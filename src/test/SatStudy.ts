

class SatStudy extends egret.DisplayObjectContainer{


    private shapeCircleA :egret.Shape;
    private satCircleA :SAT.Circle;
    private shapeCircleB :egret.Shape;
    private satCircleB :SAT.Circle;
    private satPolygon:SAT.Polygon;
    private shapePolygon:egret.Shape;

    private satResponse :SAT.Response;


    constructor(){
        super();
        this.initComps();
        this.addEventListener(egret.Event.ENTER_FRAME,this.testContact,this);
    }

    private testContact(){

        this.satCircleA.pos.x = this.shapeCircleA.x;
        this.satCircleA.pos.y = this.shapeCircleA.y;
        this.satCircleB.pos.x = this.shapeCircleB.x;
        this.satCircleB.pos.y = this.shapeCircleB.y;
        this.satPolygon.pos.x = this.shapePolygon.x;
        this.satPolygon.pos.y = this.shapePolygon.y;
        this.satPolygon.setAngle(utils.angleToRadian(this.shapePolygon.rotation));
        // console.log(this.satPolygon.angle)

        var isColided:boolean = SAT.testCircleCircle(this.satCircleA,this.satCircleB,this.satResponse);

        var isColided_1:boolean = SAT.testCirclePolygon(this.satCircleA,this.satPolygon,this.satResponse);

        var isColided_2:boolean = SAT.testCirclePolygon(this.satCircleB,this.satPolygon,this.satResponse);

        if(isColided||isColided_1){
            this.drawCircle(this.shapeCircleA,100,0xffffff);
        }else{
            this.drawCircle(this.shapeCircleA,100,0x00ffff);
        }

        if(isColided||isColided_2){
            this.drawCircle(this.shapeCircleB,150,0xffffff);
        }else{
            this.drawCircle(this.shapeCircleB,150,0xff00ff);
        }



    }

    private touchEvt(evt:egret.TouchEvent){

        var tar = evt.target;
        utils.setProps(tar,{x:evt.stageX,y:evt.stageY});

    }
    private drawCircle(shape:egret.Shape,numRadius:number,numColor:number){
        shape.graphics.beginFill(numColor);
        shape.graphics.drawCircle(0,0,numRadius);
        shape.graphics.endFill();
    }

    private initComps(){

        utils.setProps(this,{width:GlobalData.wStage,height:GlobalData.hStage});

        var shapeCircleA = new egret.Shape();
        this.drawCircle(shapeCircleA,100,0x00ffff);
        shapeCircleA.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchEvt,this);
        shapeCircleA.touchEnabled = true;

        var satCircleA = new SAT.Circle(new SAT.Vector(shapeCircleA.x,shapeCircleA.y),shapeCircleA.width/2);

        var shapeCircleB = new egret.Shape();
        this.drawCircle(shapeCircleB,150,0xff00ff);
        shapeCircleB.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchEvt,this);
        shapeCircleB.touchEnabled = true;

        utils.setProps(shapeCircleB,{x:300,y:300});

        var satCircleB = new SAT.Circle(new SAT.Vector(shapeCircleB.x,shapeCircleB.y),shapeCircleB.width/2);

        var shapePolygon = new egret.Shape();
        shapePolygon.graphics.lineStyle(1,0x00ff00);
        shapePolygon.graphics.moveTo(0,0);
        shapePolygon.graphics.lineTo(0,300);
        shapePolygon.graphics.endFill();
        utils.setProps(shapePolygon,{x:500,rotation:30});

        var satPolygon = new SAT.Polygon(new SAT.Vector(shapePolygon.x,shapePolygon.y),[
            new SAT.Vector(0,0),new SAT.Vector(0,300)
        ]);

        utils.addChildren(this,[shapeCircleA,shapeCircleB,shapePolygon]);
        this.shapeCircleA = shapeCircleA;
        this.shapeCircleB = shapeCircleB;
        this.satCircleA = satCircleA;
        this.satCircleB = satCircleB;
        this.satResponse = new SAT.Response;
        this.satPolygon = satPolygon;
        this.shapePolygon = shapePolygon;
    }
}