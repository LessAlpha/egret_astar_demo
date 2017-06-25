/**
 * Created by May on 2015/5/20.
 */

class AStarGrid extends egret.Sprite
{
    private _startNode:AStarNode;
    private _endNode:AStarNode;
    private _nodes:any[];
    private _numCols:number;
    private _numRows:number;

    private _aStar :AStar;

    private _numGridSize :number;

    /**
     * Constructor.
     */
    public constructor(numCols:number, numRows:number, numGridSize:number)
    {
        super();
        this._numCols = numCols;
        this._numRows = numRows;
        this._nodes = [];
        this._aStar = new AStar;
        this._numGridSize = numGridSize;

        for(var i:number = 0; i < this._numCols; i++)
        {
            this._nodes[i] = [];
            for(var j:number = 0; j < this._numRows; j++)
            {
                this._nodes[i][j] = new AStarNode(i, j);
            }
        }
    }


    ////////////////////////////////////////
    // public methods
    ////////////////////////////////////////

    /**
     * Draws the given grid, coloring each cell according to its state.
     */
    public drawGrid():void
    {
        this.graphics.clear();
        for(var i:number = 0; i < this.numCols; i++)
        {
            for(var j:number = 0; j < this.numRows; j++)
            {
                var node:AStarNode = this.getNode(i, j);
                this.graphics.lineStyle(2,0x335CFF);
                this.graphics.beginFill(this.getColor(node));
                this.graphics.drawRect(i * this._numGridSize, j * this._numGridSize, this._numGridSize, this._numGridSize);
            }
        }
    }

    public setGridMaps(arrGridMaps:Array<any>){
        for(var i:number = 0; i < this._numCols; i++)
        {
            // this._nodes[i] = [];
            for(var j:number = 0; j < this._numRows; j++)
            {
                this._nodes[i][j].walkable = arrGridMaps[i][j]==0;
            }
        }
    }

    public findPath(ptStart:xy,ptTarget:xy){
        this.setStartNode(ptStart.x,ptStart.y);
        this.setEndNode(ptTarget.x,ptTarget.y);
        if(this._aStar.findPath(this))
            return this._aStar.path;
    }
    public getDistBtwTwoGrid(pt1:xy,pt2:xy){
        return Math.abs(pt1.x-pt2.x)+Math.abs(pt1.y-pt2.y);
    }



    public setGridNotWalkable(xStart:number,xEnd:number,yStart:number,yEnd:number){
        var i:number;
        var j:number;
        for(i=xStart;i<xEnd;i++){
            for(j=yStart;j<yEnd;j++){
                this.setWalkable(i,j,false);
            }
        }
    }

    /**
     * Returns the node at the given coords.
     * @param x The x coord.
     * @param y The y coord.
     */
    public getNode(x:number, y:number):AStarNode
    {
        return this._nodes[x][y];   // as AStarNode;
    }

    /**
     * Sets the node at the given coords as the end node.
     * @param x The x coord.
     * @param y The y coord.
     */
    public setEndNode(x:number, y:number):void
    {
        this._endNode = this._nodes[x][y];  // as AStarNode;
    }

    /**
     * Sets the node at the given coords as the start node.
     * @param x The x coord.
     * @param y The y coord.
     */
    public setStartNode(x:number, y:number):void
    {
        this._startNode = this._nodes[x][y];    // as AStarNode;
    }

    /**
     * Sets the node at the given coords as walkable or not.
     * @param x The x coord.
     * @param y The y coord.
     * @param value
     */
    public setWalkable(x:number, y:number, value:boolean):void
    {
        this._nodes[x][y].walkable = value;
    }

    public canWalkable(x:number, y:number):void
    {
        return this._nodes[x][y].walkable;
    }


    ////////////////////////////////////////
    // getters / setters
    ////////////////////////////////////////

    /**
     * Returns the end node.
     */
    public get endNode():AStarNode
    {
        return this._endNode;
    }

    /**
     * Returns the number of columns in the grid.
     */
    public get numCols():number
    {
        return this._numCols;
    }

    /**
     * Returns the number of rows in the grid.
     */
    public get numRows():number
    {
        return this._numRows;
    }

    /**
     * Returns the start node.
     * @returns {AStarNode}
     */
    public get startNode():AStarNode
    {
        return this._startNode;
    }

    /** 转换地图上的像素为格子坐标 */
    public transFormPixelToGrid(numX:number,numY:number):xy{
        return {x:Math.floor(numX/this._numGridSize),y:Math.floor(numY/this._numGridSize)};
    }

    /**
     * Determines the color of a given node based on its state.
     */
    private getColor(node:AStarNode):number
    {
        if(!node.walkable) return 0;
        if(node == this.startNode) return 0xcccccc;
        if(node == this.endNode) return 0xcccccc;
        return 0xffffff;
    }


}
