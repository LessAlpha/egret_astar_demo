
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/weixinapi/weixinapi.js",
	"libs/modules/SAT/SAT.js",
	"libs/myjs/global.js",
	"bin-debug/assests/CompCoins.js",
	"bin-debug/assests/MaskRectImg.js",
	"bin-debug/assests/PointXY.js",
	"bin-debug/config/ConfMap.js",
	"bin-debug/config/GetParamConf.js",
	"bin-debug/config/MapLine.js",
	"bin-debug/config/param_conf.js",
	"bin-debug/global/AccountUser.js",
	"bin-debug/global/DataLocal.js",
	"bin-debug/global/GlobalData.js",
	"bin-debug/global/ObjConst.js",
	"bin-debug/jssdk/JSSDK.js",
	"bin-debug/jssdk/Net.js",
	"bin-debug/jssdk/NetHttp.js",
	"bin-debug/logic/MathLogicCf.js",
	"bin-debug/Main.js",
	"bin-debug/scene_ctrl/SceneGame.js",
	"bin-debug/scene_ctrl/SceneLoading.js",
	"bin-debug/scene_game/BattlefieldCtrl.js",
	"bin-debug/scene_game/battlefield_ctrl/Bullet.js",
	"bin-debug/scene_game/battlefield_ctrl/BulletExplode.js",
	"bin-debug/scene_game/battlefield_ctrl/HpBarMonster.js",
	"bin-debug/scene_game/battlefield_ctrl/MapScene.js",
	"bin-debug/scene_game/battlefield_ctrl/Monster.js",
	"bin-debug/scene_game/battlefield_ctrl/PanelBullets.js",
	"bin-debug/scene_game/battlefield_ctrl/PanelMapComps.js",
	"bin-debug/scene_game/battlefield_ctrl/PanelMonsters.js",
	"bin-debug/scene_game/Gun.js",
	"bin-debug/scene_game/Hero.js",
	"bin-debug/scene_game/HpBarHero.js",
	"bin-debug/scene_game/Knife.js",
	"bin-debug/scene_game/PanelCoins.js",
	"bin-debug/scene_game/PanelNav.js",
	"bin-debug/scene_game/panel_coins/BoardPhoto.js",
	"bin-debug/scene_game/panel_nav/BoardNav.js",
	"bin-debug/scene_game/panel_nav/BoardTech.js",
	"bin-debug/scene_game/panel_nav/BoardWeapons.js",
	"bin-debug/test/SatStudy.js",
	"bin-debug/utils/astar/AStar.js",
	"bin-debug/utils/astar/AStarGrid.js",
	"bin-debug/utils/astar/AStarNode.js",
	"bin-debug/utils/astar/TestAStar.js",
	"bin-debug/utils/btns.js",
	"bin-debug/utils/Button.js",
	"bin-debug/utils/CachePool.js",
	"bin-debug/utils/ChangeImg.js",
	"bin-debug/utils/PageShare.js",
	"bin-debug/utils/PanelDrag.js",
	"bin-debug/utils/PoolBM.js",
	"bin-debug/utils/PoolTF.js",
	"bin-debug/utils/TfTimerUpdate.js",
	"bin-debug/utils/TipShow.js",
	"bin-debug/utils/TwLittle.js",
	"bin-debug/utils/utils.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};