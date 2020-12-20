// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class btnReturn extends cc.Component {

    onLoad() {
        this.node.on('click', this.onBtnClik, this);
    }
    onBtnClik() {
        if(cc.director.isPaused()) {
            cc.director.resume();
        }
        cc.director.loadScene('Menu');
    }
}
