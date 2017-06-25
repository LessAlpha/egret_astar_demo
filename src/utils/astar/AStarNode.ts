/**
 * Created by May on 2015/5/20.
 */

// module may
// {
//     export 
    class AStarNode
    {
        public x:number;
        public y:number;
        
        public f:number;
        public g:number;
        public h:number;
        
        public walkable:boolean = true;
        public parent:AStarNode;
        public costMultiplier:number = 1.0;

        public constructor(x:number, y:number)
        {
            this.setXY(x,y);
        }

        public setXY(x:number, y:number){
            this.x = x;
            this.y = y;
        }
    
        

    }
// }
