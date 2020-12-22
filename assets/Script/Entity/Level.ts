import LevelMgr from "../Manager/LevelMgr";
import ConfigMgr from "../Manager/ConfigMgr";
import ResMgr from "../Manager/ResMgr";
import ModuleBase from "../Module/ModuleBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Level extends ModuleBase {

    @property(cc.PageView)
    pageView: cc.PageView=null;
    @property(cc.Node)
    btnStart: cc.Node=null;

    private levelMgr;

    onLoad () {
        //cc.game.addPersistRootNode(this.node.parent);  
       // ModuleMgr.getInstance().registerModule('level', this);
        this.btnStart = cc.find('Canvas/Menu/btnStart'); 
        this.btnStart.on('click', this.onBtnStart, this);
        this.node.getChildByName('tipMsg').active = false;
        this.levelMgr = LevelMgr.getInstance();
        this.levelMgr.init();

    }
    start() {
        this.setImg();
    }
    setImg() { 
        let levelImg = ResMgr.getInstance().getSpriteFrame('levelUnLocked');
        let curIndex = this.levelMgr.getUnLockedID();   // 当前已解锁的最后一个关卡的下标
        for(let i = 1;i <= curIndex; ++i) {
            if(!this.levelMgr.getIsLocked(4000+i)) {
                let levelPage = cc.find('Canvas/Menu/PageView/view/content/page_'+i);
                levelPage.getComponent(cc.Sprite).spriteFrame = levelImg;
            }
        }
    }
    onBtnStart() {
        let index = this.pageView.getCurrentPageIndex()+1;
        ConfigMgr.getInstance().addConfig('mapIndex', index);
        this.checkIfLocked(index);
    }

    checkIfLocked(index:number) {
        if(!this.levelMgr.getIsLocked(4000+index)) {
            this.levelMgr.setLevelID(4000+index);
            cc.director.loadScene('Game');
        }
        else {
            this.node.getChildByName('tipMsg').active = true;
            this.scheduleOnce(()=>{this.node.getChildByName('tipMsg').active = false;}, 1);
        }
    }
    // update (dt) {}
}
