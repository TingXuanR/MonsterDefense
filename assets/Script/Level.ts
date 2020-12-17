import LevelMgr from "./LevelMgr";
import ConfigMgr from "./ConfigMgr";
import ResMgr from "./ResMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Level extends cc.Component {

    @property(cc.PageView)
    pageView: cc.PageView;
    @property(cc.Node)
    btnStart: cc.Node;

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
