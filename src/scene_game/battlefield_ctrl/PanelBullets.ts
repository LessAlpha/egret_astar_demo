/**
 * 子弹控制器
 */

class PanelBullets extends egret.DisplayObjectContainer{
    
    private arrBullets :Array<Bullet> = [];

    private ptStartBullet :xy;//

    
    constructor(ptStartBullet :xy){
        super();
        this.ptStartBullet = ptStartBullet;
        this.initComps();
    }

    /**  */
    public updatetBullets(){
        var arrBullet:Array<Bullet> = this.arrBullets;
        var bullet:Bullet;
        for(var i in arrBullet){
            bullet = arrBullet[i];
            bullet.moveFrame();
        }
    }
    /** 生产子弹 */
    public generateBullet(moveDirInfo:xy,angleShoot:number,paramsGun:ParamGun){
        var bullet:Bullet = CachePool.produce(Bullet);
        var offsetGun :number = 200;
        bullet.refreshSelf(
            angleShoot,moveDirInfo,
            {x:this.ptStartBullet.x+offsetGun*moveDirInfo.x,y:this.ptStartBullet.y+offsetGun*moveDirInfo.y},
            paramsGun,this
        );
        this.arrBullets.push(bullet);
    }
    /**销毁子弹*/
    public clearBullets(){
        var arrBulletsReclaim :Array<Bullet> = [];
        var arrBullets :Array<Bullet> = this.arrBullets;
        var bullet :Bullet;
        for(var i in arrBullets){
            bullet = arrBullets[i];
            if(bullet.hasLogout||this.isBulletOutOfField(bullet))
                arrBulletsReclaim.push(bullet);
        }
        for(var j in arrBulletsReclaim){
            bullet = arrBulletsReclaim[j];
            bullet.remAndReclaimSelf();
            arrBullets.splice(arrBullets.indexOf(bullet),1);
        }
    }
    public get getBullets(){
        return this.arrBullets;
    }

    ///////////////////////////////////////////////////
    //              内部方法
    ///////////////////////////////////////////////////
    private isBulletOutOfField(bullet:Bullet){
        return bullet.x<0||bullet.x>this.width||bullet.y<0;
    }

    private initComps(){
        utils.setProps(this,{width:ConfMap.SizeMapConf.numWidthMap,height:GlobalData.hStage});

    }
    
}