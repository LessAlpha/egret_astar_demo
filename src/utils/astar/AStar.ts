/**
 * Created by May on 2015/5/20.
 */

// module may
// {
//     export 
    class AStar
    {
        //  曼哈顿启发函数，垂直水平从起点到终点
        public static HEURISTIC_MANHATTAN:string = "manhattan";
        //  欧里几德启发函数，计算起点到终点的直线
        public static HEURISTIC_EUCLIDIAN:string = "euclidian";
        //  对角启发函数，返回起点到终点之间的具体代价，最精准
        public static HEURISTIC_DIAGONAL:string = "diagonal";

        private _open:any[];
        private _closed:any[];
        private _grid:AStarGrid;
        private _endNode:AStarNode;
        private _startNode:AStarNode;
        private _path:any[];
//		private var _heuristic:Function = manhattan;
//		private var _heuristic:Function = euclidian;
        private _heuristic:Function;    //this.diagonal;
        private _straightCost:number = 1.0;
        private _diagCost:number = Math.SQRT2;

        public constructor(heuristic:string = AStar.HEURISTIC_MANHATTAN)
        {
            switch(heuristic)
            {
                case AStar.HEURISTIC_DIAGONAL:
                    this._heuristic = this.diagonal;
                    break;
                case AStar.HEURISTIC_EUCLIDIAN:
                    this._heuristic = this.euclidian;
                    break;
                case AStar.HEURISTIC_MANHATTAN:
                    this._heuristic = this.manhattan;
                    break;
            }
        }

        public findPath(grid:AStarGrid):boolean
        {
            this._grid = grid;
            this._open = [];
            this._closed = [];

            this._startNode = this._grid.startNode;
            this._endNode = this._grid.endNode;

            this._startNode.g = 0;
            this._startNode.h = this._heuristic.call(this, this._startNode);
            this._startNode.f = this._startNode.g + this._startNode.h;

            return this.search();
        }

        private search():boolean
        {
            var node:AStarNode = this._startNode;
            while(node != this._endNode)
            {
                var startX:number = Math.max(0, node.x - 1);
                var endX:number = Math.min(this._grid.numCols - 1, node.x + 1);
                var startY:number = Math.max(0, node.y - 1);
                var endY:number = Math.min(this._grid.numRows - 1, node.y + 1);

                //收集open列表
                for(var i:number = startX; i <= endX; i++)
                {
                    for(var j:number = startY; j <= endY; j++)
                    {
                        var test:AStarNode = this._grid.getNode(i, j);
                        if(test == node || !test.walkable ||
                            !this._grid.getNode(node.x, test.y).walkable ||
                            !this._grid.getNode(test.x, node.y).walkable||(node.x!=test.x&&node.y!=test.y))//||(node.x!=test.x&&node.y!=test.y)//不能斜着走
                        {
                            continue;
                        }

                        var cost:number = this._straightCost;//直走
                        if(!((node.x == test.x) || (node.y == test.y)))//斜走
                        {
                            cost = this._diagCost;
                        }
                        var g:number = node.g + cost * test.costMultiplier;
                        var h:number = this._heuristic.call(this, test);
                        var f:number = g + h;
                        if(this.isOpen(test) || this.isClosed(test))
                        {
                            if(test.f > f)
                            {
                                test.f = f;
                                test.g = g;
                                test.h = h;
                                test.parent = node;
                            }
                        }
                        else
                        {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                            this._open.push(test);
                        }
                    }
                }
                for(var o:number = 0; o < this._open.length; o++)
                {
                }
                this._closed.push(node);
                if(this._open.length == 0)
                {
                    console.log("no path found");
                    return false;
                }
                this._open.sort(function(a:AStarNode, b:AStarNode):number
                {
                    return a.f - b.f;
                });

                node = this._open.shift();  // as AStarNode;
            }
            this.buildPath();
            return true;
        }

        private buildPath():void
        {
            this._path = [];
            var node:AStarNode = this._endNode;
            this._path.push(node);
            while(node != this._startNode)
            {
                node = node.parent;
                this._path.unshift(node);
            }
        }

        public get path():any[]
        {
            return this._path;
        }

        private isOpen(node:AStarNode):boolean
        {
            for(var i:number = 0; i < this._open.length; i++)
            {
                if(this._open[i] == node)
                {
                    return true;
                }
            }
            return false;
        }

        private isClosed(node:AStarNode):boolean
        {
            for(var i:number = 0; i < this._closed.length; i++)
            {
                if(this._closed[i] == node)
                {
                    return true;
                }
            }
            return false;
        }

        private manhattan(node:AStarNode):number
        {
            return Math.abs(node.x - this._endNode.x) * this._straightCost + Math.abs(node.y + this._endNode.y) * this._straightCost;
        }

        private euclidian(node:AStarNode):number
        {
            var dx:number = node.x - this._endNode.x;
            var dy:number = node.y - this._endNode.y;
            return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
        }

        private diagonal(node:AStarNode):number
        {
            var dx:number = Math.abs(node.x - this._endNode.x);
            var dy:number = Math.abs(node.y - this._endNode.y);
            var diag:number = Math.min(dx, dy);
            var straight:number = dx + dy;
            return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
        }

        public get visited():any[]
        {
            return this._closed.concat(this._open);
        }
    }
// }
