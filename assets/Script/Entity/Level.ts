import LevelMgr from "../Manager/LevelMgr";
import ConfigMgr from "../Manager/ConfigMgr";
import ResMgr from "../Manager/ResMgr";
import ModuleBase from "../Module/ModuleBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Level extends cc.Component {

    @property(cc.PageView)
    pageView: cc.PageView=null;
    @property(cc.Node)
    btnStart: cc.Node=null;

    levelMgr = new LevelMgr();

    onLoad () {
        this.btnStart = cc.find('Canvas/Menu/btnStart'); 
        this.btnStart.on('click', this.onBtnStart, this);
    }

    onBtnStart() {
        // First Version
        // let index = this.pageView.getCurrentPageIndex();
        // this.levelMgr.setLevelID(1000+index+1);
        // ConfigMgr.getInstance().addConfig('mapIndex', index);
        // cc.director.loadScene('Game');

        // second version
        // let prefabGame = ResMgr.getInstance().getPrefab('Game');
        // let gameN = cc.instantiate(prefabGame);
        // gameN.parent = cc.director.getScene();

        //third version
        let index = this.pageView.getCurrentPageIndex() + 1;
        ConfigMgr.getInstance().addConfig('mapIndex', index);    
        cc.director.loadScene('Game');
    }

    // update (dt) {}
}
