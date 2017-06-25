


class MapScene extends egret.Sprite{

    private aStarGrid:AStarGrid;
    private numIndScene :number = 0;

    constructor(){
        super();
        this.initComps();
        // this.addEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
    }
    /** 获取在非攻击轨道上的线路 */
    public getPathMoveInLine(ptStart:xy,ptEnd:xy){
        return this.aStarGrid.findPath(ptStart,ptEnd);
    }
    /** 获取到攻击位置的线路 */
    public getPathMoveToAttack(ptStart:xy){
        var dataMap = ConfMap.MapAttack;
        var arrMapAttack :Array<gridOccupied>;
        var grid :gridOccupied;
        var numDistShortest:number = 100;
        var gridTarget :gridOccupied;
        for(var j:number=0; j<dataMap.length; j++){
            arrMapAttack = dataMap[j];
            for(var i:number=0; i<arrMapAttack.length; i++){
                grid = arrMapAttack[i];
                if(grid.occupied)    continue;
                var distNow = this.aStarGrid.getDistBtwTwoGrid(ptStart,{x:grid.x,y:grid.y});
                if(distNow<numDistShortest){
                    numDistShortest = distNow;
                    gridTarget = grid;
                }
            }
            if(gridTarget)
                break;
        }
        gridTarget.occupied = true;
        return this.aStarGrid.findPath(ptStart,{x:gridTarget.x,y:gridTarget.y});
        
    }
    /** 释放占据的格子 */
    public realeaseGrid(grid:xy){
        var dataMap = ConfMap.MapAttack;
        var arrMapAttack :Array<gridOccupied>;
        var grid0 :gridOccupied;
        for(var j:number=0; j<dataMap.length; j++){
            arrMapAttack = dataMap[j];
            for(var i:number=0; i<arrMapAttack.length; i++){
                grid0 = arrMapAttack[i];
                if(grid0.x==grid.x&&grid0.y==grid.y){
                    grid0.occupied = false;
                    return;
                }
            }
        }
        
    }
    /** 指定场景地图 */
    public initMapData(numInd:number){
        this.numIndScene = numInd;
        this.initComps();
    }
    
    
    // private funTimerNewMonster(){
    //
    //     var way = ConfMap.ConfScene[this.numIndScene].Ways[Math.floor(Math.random()*2)];
    //     var monsterShape = new MonsterShape();
    //     this.setPathNotAttack(monsterShape,way);
    //     monsterShape.addSelf(this,way);
    //     this.arrMonster.push(monsterShape);
    //
    // }

    private initComps(){

        var confMap = ConfMap.ConfScene[this.numIndScene].ArrMap;
        var aStarGrid = new AStarGrid(confMap.length,confMap[0].length,ConfMap.SizeMapConf.numSizeGrid);
        aStarGrid.setGridMaps(confMap);
        // aStarGrid.drawGrid();
        this.addChild(aStarGrid);

        if(this.aStarGrid)
            this.removeChild(this.aStarGrid);
        this.aStarGrid = aStarGrid;
    }


}

