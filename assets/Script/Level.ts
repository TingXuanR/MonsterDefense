import LevelMgr from "./LevelMgr";

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
        let index = this.pageView.getCurrentPageIndex();
        this.levelMgr.setLevelID(1000+index+1);
        cc.director.loadScene('Game');
    }

    // update (dt) {}
}
