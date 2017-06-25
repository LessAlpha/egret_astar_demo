
class MapLine {

    static xLeftCamp:number;
    static xRightCamp:number;
    static dataMap;
    static initData(){

        var wStage = GlobalData.wStage;
        var xCenter = wStage/2;
        var xLeftCamp:number = xCenter - 150;
        var xRightCamp:number = xCenter + 150;
        
        MapLine.dataMap = [
            [//第一关
                [{x:xCenter-210,y:0},{x:xCenter-210,y:310},{x:xLeftCamp,y:310},{x:null,y:310},{x:null,y:null}],
                [{x:xCenter+210,y:0},{x:xCenter+210,y:310},{x:xRightCamp,y:310},{x:null,y:310},{x:null,y:null}]
            ]
        ];
    }
}