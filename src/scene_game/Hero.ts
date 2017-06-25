

class Hero extends egret.MovieClip{
    
    private mcFactory :egret.MovieClipDataFactory;
    private Actions :Array<string> = ['left1','left2','middle','right2','right1'];
    private indAction:number;
    private paramHero :ParamHero;

    constructor(){
        super();
        this.paramHero = RES.getRes('hero_json')[0];
        this.initSelf();
    }

    public updateDir(angle:number){
        this.rotation = angle;
        this.updateAction(angle);
    }
    /**调整血量*/
    public modifyHp(numOffset:number){
        
    }
    /**更换主角*/
    public updateHero(idHero:number){
        
    }
    

    private updateAction(angle:number){
        var actions = this.Actions;
        var indAction:number;
        if(angle>=-90&&angle<-70){
            indAction = 0;
        }else if(angle>=-70&&angle<-50){
            indAction = 1;
        }else if(angle>=-50&&angle<50){
            indAction = 2;
        }else if(angle>=50&&angle<70){
            indAction = 3;
        }else 
            indAction = 4;
        
        if(indAction!=this.indAction){
            this.gotoAndPlay(actions[indAction],-1);
            this.indAction = indAction;
        }
    }
    private initSelf(){
        this.mcFactory = new egret.MovieClipDataFactory(RES.getRes('hero_'+this.paramHero.id+'_json'),RES.getRes('hero_'+this.paramHero.id+'_png'));
        this.movieClipData = this.mcFactory.generateMovieClipData('hero_'+this.paramHero.id+'');
        this.frameRate = 6;
        this.indAction = 2;

        // this.addEventListener(egret.Event.COMPLETE,()=>{console.log('COMPLETE')},this);
        // this.addEventListener(egret.Event.LOOP_COMPLETE,()=>{console.log('LOOP_COMPLETE')},this);
        // this.gotoAndPlay('left1',3);
        
        this.gotoAndPlay(this.Actions[this.indAction],-1);
    }

}