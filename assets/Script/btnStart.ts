

const {ccclass, property} = cc._decorator;

@ccclass
class btnStart extends cc.Component {

    @property(cc.PageView)
    pageView: cc.PageView = null;

    index: number = 0;

    onLoad () {
        this.node.on('click', this.onBtnStart, this);
        this.index = cc.find('Canvas/Menu/PageView').getComponent('PageView').getCurrentPageIndex();
    }

    start () {

    }

    onBtnStart() {
        cc.director.loadScene('Game');
    }
    // update (dt) {}
}
