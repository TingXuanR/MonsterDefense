const {ccclass, property} = cc._decorator;

@ccclass
export default class pausePageCtrl extends cc.Component {

    onLoad() {
        this.node.active = false;
    }
    
}
