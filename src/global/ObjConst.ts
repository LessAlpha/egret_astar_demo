
interface xy{
    x:number,y:number
}
interface gridOccupied{
    x:number,y:number,occupied:boolean
}

/**僵尸动画*/
enum AnimMonster {
    DOWN_MOVE = 0,
    SIDE_MOVE = 1,
        
    DOWN_ATTACK = 2,
    SIDE_ATTACK = 3,
        
    DEAD = 4
}

enum StatusMonsterInMap{
    MOVE_IN_LINE = 0,
    MOVE_TO_ATTACK = 1,
    STATIC_ATTACK = 2,
    SEARCHING_WAY = 3
}
/**上下左右*/
enum Directions{
    UP = 0 ,
    RIGHT = 1 ,
    DOWN = 2 ,
    LEFT = 3
}
/** */
enum BulletTypes{
    COMMON = 0
}

//主角类型
enum HeroTypes{
    COMMON = 0
}
