

class MathLogicCf {
    
    static getDirMonsterAttack(nodeMonster:AStarNode) :Directions{
        var dir :Directions = Directions.DOWN;
        var nodeHero :xy = {x:Math.floor(ConfMap.SizeMapConf.numCols/2),y:ConfMap.SizeMapConf.numRows-1};
        if(nodeMonster.y>=nodeHero.y-2){
            dir = nodeMonster.x<nodeHero.x ? Directions.RIGHT : Directions.LEFT;
        }
        return dir;
    }
    /** 由两个格子的坐标判断第2个格子相对于第1个格子的位置 */
    static getDirBtwGrids(xyGrid1:xy,xyGrid2:xy){
        var dir:Directions;
        if (xyGrid1.x < xyGrid2.x && xyGrid1.y == xyGrid2.y)
        {
            dir = Directions.RIGHT;
        }
        else if (xyGrid1.x > xyGrid2.x && xyGrid1.y== xyGrid2.y)
        {
            dir = Directions.LEFT;
        }
        else if (xyGrid1.x == xyGrid2.x && xyGrid1.y > xyGrid2.y)
        {
            dir = Directions.UP;
        }
        else if (xyGrid1.x == xyGrid2.x && xyGrid1.y < xyGrid2.y)
        {
            dir = Directions.DOWN;
        }
        return dir;
    }

    /**由枪所在点和射击点计算出枪的旋转角度*/
    static translateAngleGun(x0:number,y0:number,x1:number,y1:number):number{
        var angle :number = utils.agleBtwTwoPoin(x0,y0,x1,y1);
        if(angle>90)
            angle = -(360-angle);
        if(angle<-180)
            angle = 90;
        else if(angle<-90)
            angle = -90;
        return angle;
    }

    /**由子弹的旋转角度计算出子弹的移动信息*/
    static getBulletMoveInfo(angleShoot:number) :xy {
        var percentX :number = Math.sin(utils.angleToRadian(angleShoot));
        var percentY :number = -Math.cos(utils.angleToRadian(angleShoot));
        return {x : percentX,y : percentY};
    }
    
}