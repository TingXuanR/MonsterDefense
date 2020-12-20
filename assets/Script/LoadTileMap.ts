import ResMgr from "./Manager/ResMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadTileMap extends cc.Component {

    onLoad () {
        let prefabGame = ResMgr.getInstance().getPrefab('Game');
        let gameN = cc.instantiate(prefabGame);
        gameN.parent = cc.director.getScene(); 
    }

    // update (dt) {}
}
