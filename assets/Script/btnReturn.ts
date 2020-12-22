
const {ccclass, property} = cc._decorator;

@ccclass
export default class btnReturn extends cc.Component {

    onLoad() {
        this.node.on('click', this.onBtnClik, this);
    }
    onBtnClik() {
        cc.director.resume();
        this.node.parent.active = false;
    }
}
