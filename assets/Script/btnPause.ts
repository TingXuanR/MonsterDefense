
const {ccclass, property} = cc._decorator;

@ccclass
export default class btnPause extends cc.Component {


    onLoad () {
        this.node.on('click', this.onBtnStart, this);
    }

    onBtnStart () {
        if(cc.director.getScene().name === 'Menu') {  
            cc.game.end();
        }
        let pausePage = cc.find('Game/pausePage');
        pausePage.active = true;
        cc.director.pause();
    }

    // update (dt) {}
}
