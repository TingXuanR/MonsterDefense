import ModuleBase from "./Module/ModuleBase";
import ConfigMgr from "./ConfigMgr";
import ResMgr from "./ResMgr";
import TileMapCtrl from "./TileMapCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyMgr extends ModuleBase {

    private _enemyID: number = 0;
    private _count: number = 0;
    private _wave;
    private _tileMapCtrl: TileMapCtrl;

    onInit() {
        this.crateWithData();
    }

    crateWithData() {
        let index = ConfigMgr.getInstance().getConfig('mapIndex');
        let levelID = index + 4000;
        let levelDt = ConfigMgr.getInstance().getConfig('LevelDt').getDataByID(levelID);
        let enemyDt = ConfigMgr.getInstance().getConfig('EnemyDt');
        this._tileMapCtrl = <TileMapCtrl>this.getModule('TileMap');
        let waves = levelDt['wave_id'];
        for (let wave_id of waves) {
            this._wave = ConfigMgr.getInstance().getConfig('WaveDt').getDataByID(wave_id);
            this._enemyID=this._wave['enemy_id'];
            if (this._wave) {
                this.schedule(this.addEnemy, this._wave['interval']);
            }
            
        }

    }

    addEnemy() {
        if (this._count >= this._wave['enemy_num']) {
            this.unschedule(this.addEnemy);
        }

        let prefabEnemy = ResMgr.getInstance().getPrefab('Enemy1');//+ (this._enemyID - 1000));
        let enemyN = cc.instantiate(prefabEnemy);
        enemyN.parent = this._tileMapCtrl.node;
        let birthPos = this._tileMapCtrl.getPath()[0];
        enemyN.x = birthPos.x;
        enemyN.y = birthPos.y;
        this._count++;
    }
}
