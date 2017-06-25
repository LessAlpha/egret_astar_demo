/**
 * Created by Administrator on 2015/7/20.
 * 
 */
class DataLocal {
    //包括游戏过程中的用户数据和一些静态变量
    public userData = {
        account: 0,
        show_tip_0:false,
        show_tip_1:false,
        show_tip_2:false,
        score:[0,0,0]
    };
    private localKey = 'smart-3';

    public initLocalData(){
        var data;
        data = egret.localStorage.getItem( this.localKey );
        if( data ){
            data = JSON.parse( data );
            // console.log('data = ',data);
            this.userData.show_tip_0 = data.show_tip_0;
            this.userData.show_tip_1 = data.show_tip_1;
            this.userData.show_tip_2 = data.show_tip_2;
            this.userData.score = data.score;
        }
        return this.userData;
    }
    

    public setLocalData(){
        //console.log( this.userData );
        var data = JSON.stringify( this.userData );
        // console.log('data = ',data)
        egret.localStorage.setItem( this.localKey, data );
    }
    
    private static inst:DataLocal;
    static getInst(){
        if(!this.inst){
            this.inst = new DataLocal;
            this.inst.initLocalData();
        }
        return this.inst;
    }
}
