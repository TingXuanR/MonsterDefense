import ModuleBase from "./Module/ModuleBase";
import LevelMgr from "./Manager/LevelMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JudgeVictory extends ModuleBase {

    onInit() {
        this.node.active = false;
    }

    setState(isWin) {
        this.node.active = true;
        let tipMsgN = this.node.getChildByName('tipMsg');
        if (isWin) {
            this.scheduleOnce(() => {
                let levelID = LevelMgr.getInstance().getLevelID() + 1;
                if (levelID <= 4003) {
                    LevelMgr.getInstance().setLevelID(levelID);
                    if (LevelMgr.getInstance().getIsLocked(levelID)) {
                        LevelMgr.getInstance().setUnLocked(levelID);
                    }
                }
                else {
                    LevelMgr.getInstance().setLevelID(4001);
                }
                cc.director.loadScene('Game');
            }, 2);
        }
        else {
            tipMsgN.getComponent(cc.RichText).string = '<color=#EB4641>游戏结束╮(╯_╰)╭  </color>';
            this.scheduleOnce(() => {
                cc.director.loadScene('Menu');
            }, 2);
        }
    }
}
