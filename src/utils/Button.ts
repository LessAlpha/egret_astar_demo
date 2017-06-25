/**
 * Created by May on 2015/4/8.
 */

class Button extends egret.DisplayObjectContainer
{
    static STATE_NORMAL:string = "normal";
    static STATE_PRESSED:string = "pressed";

    public bitmap:egret.Bitmap;
    private _normalTexture:egret.Texture;
    private _pressedTexture:egret.Texture;

    private _callback:Function;
    private _scope:any;
    private _params:any[];

    private _py:number = 5;

    public reactDelay:number = 100;

    constructor()
    {
        super();

        this.bitmap = new egret.Bitmap();
        this.addChild(this.bitmap);

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onPressed, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this._onTapped, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._onReleased, this);
    }

    public enableTouch(){
        this.touchEnabled = true;
        this.alpha = 1;
    }
    public disableTouch(){
        this.touchEnabled = false;
        this.alpha = 0.5;
    }

    public initStyle(normal:string, pressed:string):void
    {
        this._normalTexture = RES.getRes(normal);
        this._pressedTexture = RES.getRes(pressed);

        this._setState();
    }

    public initCallback(callback:Function, scope:any, ...params:any[]):void
    {
        this._callback = callback;
        this._scope = scope;
        this._params = params;
    }


    private _setState(s:string = Button.STATE_NORMAL):void
    {
        if(s == Button.STATE_NORMAL)
        {
            this.bitmap.texture = this._normalTexture;
            this.bitmap.y = 0;
        }
        else
        {
            this.bitmap.texture = this._pressedTexture;
            this.bitmap.y = this._py;
        }
    }

    private _onPressed(evt:egret.TouchEvent):void
    {
        this._setState(Button.STATE_PRESSED);
    }

    private _onReleased(evt:egret.TouchEvent):void
    {
        this._setState(Button.STATE_NORMAL);
        console.log('release')
    }

    private _onTapped(evt:egret.TouchEvent):void
    {
        this._setState(Button.STATE_NORMAL);
        egret.Tween.get(this, {override:true}).wait(this.reactDelay).call(this._callback, this._scope, this._params);
    }

    /**
     * example
     */
    //var btn = new Button();
    //utils.setProperties(btn,{x:100,y:100});
    //btn.initStyle('btn-buy-normal','btn-buy-click');
    //btn.initCallback((data)=>{
    //    //console.log(data.key1);
    //},this,{key1:'name1'});//param可有可无
    //this.addChild(btn);
}