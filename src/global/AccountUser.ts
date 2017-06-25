

class AccountUser{

    public AccountData = {
        coin:0,//金币数
        diamond:0//钻石数
    };
    
    
    public modifyCoins(numOffset:number){
        this.AccountData.coin += numOffset;
    }
    public get getCoin():number{
        return this.AccountData.coin;
    }
    public get getDiamond():number{
        return this.AccountData.diamond;
    }
    
    private static inst :AccountUser;
    static getInst(){
        if(!this.inst)
            this.inst = new AccountUser;
        return this.inst;
    }
}