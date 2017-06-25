


class GetParamConf{

    private confMonster;
    private confHero;
    private confGun;

    constructor(){
        this.confMonster = RES.getRes('monster_json');
        this.confHero = RES.getRes('hero_json');
        this.confGun = RES.getRes('gun_json');
    }

    public getMonster(id:number) :ParamMonster{

        var objConf :ParamMonster = this.confMonster[id-1];
        var paramMonster :ParamMonster = {
            id: objConf.id,//配置ID
            name: objConf.name,//名称
            type: objConf.type,//类型
            hp: objConf.hp,//血量
            speed_move: objConf.speed_move,//移动速度
            coin: objConf.coin,//消耗金币数目
            speed_attack: objConf.speed_attack,//攻击速度
            force_attack: objConf.force_attack,//攻击力
            dist_shoot: objConf.dist_shoot,//攻击距离
            level_hp: objConf.level_hp,//升级所增加的血量
            level_speed_hp: objConf.level_speed_hp,//升级所增加的
            level_coin: objConf.level_coin,//升级所增加的
            level_force_attack: objConf.level_force_attack,//升级所增加的
            level_speed_attack: objConf.level_speed_attack,//升级所增加的
            level_dist_shoot: objConf.level_dist_shoot//升级所增加的
        };
        return paramMonster;

    }
    public getGun(id:number) :ParamGun{

        var objConf :ParamGun = this.confGun[id-1];
        var paramGun :ParamGun = {
            id: objConf.id,
            name: objConf.name,
            status_equip: objConf.status_equip,
            condition: {
                pass: objConf.condition.pass,
                coin: objConf.condition.coin,
                diamond: objConf.condition.diamond
            },
            type: objConf.type,
            pos_put: objConf.pos_put,
            speed_attack: objConf.speed_attack,
            force_attack: objConf.force_attack,
            dist_shoot: objConf.dist_shoot,
            coin_cost: objConf.coin_cost,
            explode_head: objConf.explode_head,
            dizzy: objConf.dizzy,
            pass_enemies: objConf.pass_enemies,
            desc_character_only: objConf.desc_character_only
        };
        return paramGun;

    }
    public getHero(id:number) :ParamHero{

        var objConf :ParamHero = this.confHero[id-1];
        var paramHero :ParamHero = {
            id: objConf.id,
            name: objConf.name,
            condition: {
                pass: objConf.condition.pass,
                coin: objConf.condition.coin,
                diamond: objConf.condition.diamond
            },
            hp: objConf.hp,
            strength: objConf.strength,
            agility: objConf.agility,
            smart: objConf.smart,
            luck: objConf.luck,
            charm: objConf.charm,
            tech_special: objConf.tech_special,
            role_desc: objConf.role_desc
        };
        return paramHero;

    }

    private static inst:GetParamConf;
    static getInst():GetParamConf{
        if(!this.inst)
            this.inst = new GetParamConf;
        return this.inst;
    }

}

interface ParamGun{
    id: number,
    name: string,
    status_equip: number,
    condition: {
        pass: number,
        coin: number,
        diamond: number
    },
    type: number,
    pos_put: number,
    speed_attack: number,
    force_attack: number,
    dist_shoot: number,
    coin_cost: number,
    explode_head: number,
    dizzy: number,
    pass_enemies: number,
    desc_character_only: string
}
interface ParamHero{
    id: number,
    name: string,
    condition: {
        pass: number,
        coin: number,
        diamond: number
    },
    hp: number,
    strength: number,
    agility: number,
    smart: number,
    luck: number,
    charm: number,
    tech_special: string,
    role_desc: string

}
interface ParamMonster{
    id: number,//配置ID
    name: string,//名称
    type: number,//类型
    hp: number,//血量
    speed_move: number,//移动速度
    coin: number,//消耗金币数目
    speed_attack: number,//攻击速度
    force_attack: number,//攻击力
    dist_shoot: number,//攻击距离
    level_hp: number,//升级所增加的血量
    level_speed_hp: number,//升级所增加的
    level_coin: number,//升级所增加的
    level_force_attack: number,//升级所增加的
    level_speed_attack: number,//升级所增加的
    level_dist_shoot: number//升级所增加的
}