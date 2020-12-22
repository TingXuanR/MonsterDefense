// Learn TypeScript:

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
        let ani = this.node.parent.getComponent(cc.Animation);
            ani.on('finished', ()=>{
                cc.director.loadScene('Menu');
            });
            ani.play('FadeOut');
    }
}
