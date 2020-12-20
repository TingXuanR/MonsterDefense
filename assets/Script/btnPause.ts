// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class btnPause extends cc.Component {


    onLoad () {
        this.node.on('click', this.onBtnStart, this);
    }

    onBtnStart () {
        let pausePage = cc.find('Game/pausePage');
        pausePage.active = true;
        pausePage.getChildByName('tipMsg').active = false;
        cc.director.pause();
    }

    // update (dt) {}
}
