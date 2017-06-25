module ConfMap{

    export var numWidthMap :number = 750;
    export var SizeMapConf = {
        numWidthMap : 750,
        numHeightMap : 950,
        numSizeGrid : 50,
        numCols : 15,
        numRows : 19
    };

    export var MapAttack = [
        [
            {x:3,y:18,occupied:false},{x:3,y:17,occupied:false},{x:3,y:16,occupied:false},{x:3,y:15,occupied:false},{x:3,y:14,occupied:false},
            {x:4,y:14,occupied:false},{x:5,y:14,occupied:false},{x:6,y:14,occupied:false},{x:7,y:14,occupied:false},{x:8,y:14,occupied:false},{x:9,y:14,occupied:false},{x:10,y:14,occupied:false},
            {x:11,y:14,occupied:false},{x:11,y:15,occupied:false},{x:11,y:16,occupied:false},{x:11,y:17,occupied:false},{x:11,y:18,occupied:false},
            {x:5,y:16,occupied:false},{x:9,y:16,occupied:false},
            {x:4,y:18,occupied:false},{x:4,y:17,occupied:false},{x:4,y:16,occupied:false},{x:4,y:15,occupied:false},
            {x:5,y:15,occupied:false},{x:6,y:15,occupied:false},{x:7,y:15,occupied:false},{x:8,y:15,occupied:false},{x:9,y:15,occupied:false},
            {x:10,y:18,occupied:false},{x:10,y:17,occupied:false},{x:10,y:16,occupied:false},{x:10,y:15,occupied:false},
        ]
        ,[
            {x:2,y:18,occupied:false},{x:2,y:17,occupied:false},{x:2,y:16,occupied:false},{x:2,y:15,occupied:false},{x:2,y:14,occupied:false},{x:2,y:13,occupied:false},
            {x:3,y:13,occupied:false},{x:4,y:13,occupied:false},{x:5,y:13,occupied:false},{x:6,y:13,occupied:false},{x:7,y:13,occupied:false},{x:8,y:13,occupied:false},{x:9,y:13,occupied:false},{x:10,y:13,occupied:false},{x:11,y:13,occupied:false},
            {x:12,y:13,occupied:false},{x:12,y:14,occupied:false},{x:12,y:15,occupied:false},{x:12,y:16,occupied:false},{x:12,y:17,occupied:false},{x:12,y:18,occupied:false}
        ],
    ];

    export var ConfScene = [
        {
            ArrMap:
                [
                    [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
                    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1],
                    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                    [1,1,1,1,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
                    [1,1,1,1,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
                    [1,1,1,1,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
                    [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
                ],
            Ways:
                [
                    {start:{x:0,y:2},end:{x:3,y:12}},
                    {start:{x:14,y:4},end:{x:9,y:12}}
                ]
        },
        {
            ArrMap:
                [
                    [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
                    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1],
                    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
                    [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
                    [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
                    [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
                    [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
                ],
            Ways:
                [
                    {start:{x:0,y:2},end:{x:5,y:19}},
                    {start:{x:14,y:4},end:{x:9,y:19}}
                ]
        },
    ];
}