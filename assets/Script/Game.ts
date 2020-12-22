import ModuleMgr from "./Module/ModuleMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    onLoad () {
        this._registerModule();
        ModuleMgr.getInstance().onInit();
        
    }

    start () {
        ModuleMgr.getInstance().onLateInit();
    }

    update (dt) {
        ModuleMgr.getInstance().onUpdate(dt);
    }

    lateUpdate(dt) {
        ModuleMgr.getInstance().onLateUpdate(dt);
    }

    onDestroy() {
        ModuleMgr.getInstance().onRelease();
    }

    private _registerModule() {
        let arrNodeName = ['TileMap', 'Enemy', 'TouchMgr', 'CardMgr', 'TowerMgr', 'topBar', 'bulletMgr', 'JudgePage'];  // 节点
        let arrNodeCom = ['TileMapCtrl', 'EnemyMgr', 'TouchMgr', 'CardMgr', 'TowerMgr', 'topBarMgr', 'bulletMgr', 'JudgeVictory'];  // 节点拥有的脚本组件
        for (let i = 0; i < arrNodeName.length; i++) {
            const node = this.node.getChildByName(arrNodeName[i]);
            const comp = node.getComponent(arrNodeCom[i]);
            ModuleMgr.getInstance().registerModule(arrNodeName[i], comp);
        }
    }
}
