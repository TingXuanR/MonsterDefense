// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ModuleBase from "../Module/ModuleBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchMgr extends ModuleBase {

    onInit() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchstart, this);
    }

    onTouchstart(event) {
        let touchPos = event.getLocation();
        this.sendMsg('CardMgr', 'addCard', touchPos);
    }
}
