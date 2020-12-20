import ModuleBase from "../Module/ModuleBase";
import ConfigMgr from "./ConfigMgr";
import ResMgr from "./ResMgr";
import TileMapCtrl from "../TileMapCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyMgr extends ModuleBase {

    private _enemyID: number = 0;
    private _count: number = 1;
    private _wave;
    private _waveIndex: number = 0;
    private _waves;
    private _tileMapCtrl: TileMapCtrl;
    private _LevelDt;
    onInit() {
        this.crateWithData();
    }

    crateWithData() {
        let index = ConfigMgr.getInstance().getConfig('mapIndex');
        let levelID = index + 4000;
        this._LevelDt = ConfigMgr.getInstance().getConfig('LevelDt').getDataByID(levelID);

        this._tileMapCtrl = <TileMapCtrl>this.getModule('TileMap');
        this._waves = this._LevelDt['wave_id'];
        let wave_id = this._waves[this._waveIndex];
        this._wave = ConfigMgr.getInstance().getConfig('WaveDt').getDataByID(wave_id);
        this._enemyID = this._wave['enemy_id'];
        if (this._wave) {
            this.schedule(this.addEnemy, this._wave['interval']);
        }
    }

    addEnemy() {
        if (this._count > this._wave['enemy_num']) {
            this._count = 1;
            this._waveIndex++;
            this.sendMsg('topBar', 'updateWave', this._waveIndex);
            this.unschedule(this.addEnemy);
            if (this._waveIndex < 3) {
                let wave_id = this._waves[this._waveIndex];
                this._wave = ConfigMgr.getInstance().getConfig('WaveDt').getDataByID(wave_id);
                this._enemyID = this._wave['enemy_id'];
                if (this._wave) {
                    this.scheduleOnce(() => {
                        this.schedule(this.addEnemy, this._wave['interval']);
                    }, this._LevelDt['interval']);
                }
            }
        }
        else {
            let prefabEnemy = ResMgr.getInstance().getPrefab('Enemy' + (this._enemyID - 1000));
            let enemyN = cc.instantiate(prefabEnemy);
            enemyN.parent = this.node;
            let birthPos = this._tileMapCtrl.getPath()[0];
            //birthPos = this._tileMapCtrl.node.convertToNodeSpaceAR(birthPos);
            enemyN.x = birthPos.x;
            enemyN.y = birthPos.y;

            let enemyJs = enemyN.getComponent('Enemy');
            let enemyDt = ConfigMgr.getInstance().getConfig('EnemyDt').getDataByID(this._enemyID);
            enemyJs.initWithData(enemyDt);
            enemyJs.getPath(this._tileMapCtrl.getPath());

            enemyJs.runPath();

            this._count++;
        }
    }

    getEnemyByRadius(radius, centerPos) {
        let enemyNs = this.node.children;
        for (const enemyN of enemyNs) {
            let pos:cc.Vec2 = enemyN.getPosition();
            let dis = Math.abs(pos.sub(centerPos).mag());
            if(dis <= radius) {
                return enemyN;
            }
        }
        return null;
    }
}
