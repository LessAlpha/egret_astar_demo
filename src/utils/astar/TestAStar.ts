/**
* Created by May on 2015/5/20.
*/

module may
{
   export class TestAStar extends egret.Sprite
   {
       private _cellSize:number = 15;//格子大小
       private _grid:AStarGrid;
       private _player:egret.Sprite;
       private _index:number;
       private _path:any[];

       public constructor()
       {
           super();
           this.makePlayer();
           this.makeGrid();
           this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
       }
       private onAddToStage(evt:egret.Event){
           this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGridClick, this);
       }

       /**
        * Creates the player sprite. Just a circle here.
        */
       private makePlayer():void
       {
           this._player = new egret.Sprite();
           this._player.graphics.beginFill(0xff0000);
           this._player.graphics.drawCircle(0, 0, 5);
           this._player.graphics.endFill();
           this._player.x = Math.random() * 600;
           this._player.y = Math.random() * 600;
           this.addChild(this._player);
       }

       /**
        * Creates a grid with a bunch of random unwalkable nodes.
        */
       private makeGrid():void
       {
           this._grid = new AStarGrid(30, 30, 20);
           for(var i:number = 0; i < 200; i++)
           {
               this._grid.setWalkable(Math.floor(Math.random() * 30),
               Math.floor(Math.random() * 30),
               false);
           }
           this.drawGrid();
       }

       /**
        * Draws the given grid, coloring each cell according to its state.
        */
       private drawGrid():void
       {
           this.graphics.clear();
           for(var i:number = 0; i < this._grid.numCols; i++)
           {
               for(var j:number = 0; j < this._grid.numRows; j++)
               {
                   var node:AStarNode = this._grid.getNode(i, j);
                   this.graphics.lineStyle(0);
                   this.graphics.beginFill(this.getColor(node));
                   this.graphics.drawRect(i * this._cellSize, j * this._cellSize, this._cellSize, this._cellSize);
               }
           }
       }

       /**
        * Determines the color of a given node based on its state.
        */
       private getColor(node:AStarNode):number
       {
           if(!node.walkable) return 0;
           if(node == this._grid.startNode) return 0xcccccc;
           if(node == this._grid.endNode) return 0xcccccc;
           return 0xffffff;
       }

       /**
        * Handles the click event on the GridView. Finds the clicked on cell and toggles its walkable state.
        */
       private onGridClick(evt:egret.TouchEvent):void
       {
           var xpos:number = Math.floor(evt.localX / this._cellSize);
           var ypos:number = Math.floor(evt.localY / this._cellSize);
           this._grid.setEndNode(xpos, ypos);

           xpos = Math.floor(this._player.x / this._cellSize);
           ypos = Math.floor(this._player.y / this._cellSize);
           this._grid.setStartNode(xpos, ypos);

           this.drawGrid();
           this.findPath();
       }

       /**
        * Creates an instance of AStar and uses it to find a path.
        */
       private findPath():void
       {
           var astar:AStar = new AStar();
           if(astar.findPath(this._grid))
           {
               this._path = astar.path;
               this._index = 0;
               this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
           }
       }

       /**
        * Finds the next node on the path and eases to it.
        */
       private onEnterFrame(evt:egret.Event):void
       {
           var targetX:number = this._path[this._index].x * this._cellSize + this._cellSize / 2;
           var targetY:number = this._path[this._index].y * this._cellSize + this._cellSize / 2;
           var dx:number = targetX - this._player.x;
           var dy:number = targetY - this._player.y;
           var dist:number = Math.sqrt(dx * dx + dy * dy);
           if(dist < 1)
           {
               this._index++;
               if(this._index >= this._path.length)
               {
                   this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
               }
           }
           else
           {
               this._player.x += dx * .5;
               this._player.y += dy * .5;
           }
       }
   }
}
