
/**
 *  怪兽属性
 *  name:名字
 *  attack/defence_physics:物理攻击/防御
 *  attack/defence_fire:火焰攻击/防御
 *  attack/defence_ice:寒冰攻击/防御
 *  attack/defence_poison:毒性攻击/防御
 *  attack/defence_lightning:闪电攻击/防御
 *  attack/defence_real:真实伤害/防御
 *
 */
interface MonsterParam{
    name:string;

    attack_physics:number;
    attack_fire:number;
    attack_ice:number;
    attack_poison:number;
    attack_lightning:number;
    attack_real:number;

    defence_physics:number;
    defence_fire:number;
    defence_ice:number;
    defence_poison:number;
    defence_lightning:number;
    defence_real:number;

}
/**
 * 枪属性
 */
interface GunParam{
    name:string;
    
}
/**
 * 子弹属性
 *
 */
interface BulletParam{
    name:string;

}

/**
 * 装备属性
 */
interface EquipmentParam{
    name:string;


}

/**
 *
 */

