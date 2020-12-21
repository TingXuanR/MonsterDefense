
import ModuleBase from "../Module/ModuleBase";
import ResMgr from "../Manager/ResMgr";
import EnemyMgr from "../Manager/EnemyMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Tower extends ModuleBase {

    private _bulletId:number=0;
    private _name: string = 'tower';
    private _interval: number = 0;
    private _ack: number = 0;
    private _speed: number = 0;
    private _scope: number = 0;

    initWithData(towerDt) {
        this._bulletId = towerDt['bulletId'];
        this._name = towerDt['name'];
        this._interval = towerDt['interval'];
        this._ack = towerDt['ack'];
        this._speed = towerDt['speed'];
        this._scope = towerDt['scope'];
        this.schedule(this.attack, this._interval);
        
    }
    startSchedule() {
        // cc.tween(this.node)
        // .call(this.attack.bind(this))
        // .repeatForever()
        // .delay(this._interval)
        // .start();
        this.schedule(this.attack, this._interval);
    }
    attack() {
        let targetJs = <EnemyMgr>this.getModule('Enemy');
        let target = targetJs.getEnemyByRadius(this._scope,this.node.getPosition());
        if(target) {
            let prefabBullet = ResMgr.getInstance().getPrefab('Bullet'+this._bulletId);
            let bulletN = cc.instantiate(prefabBullet);
            bulletN.parent = cc.find('Game/bulletMgr');
            bulletN.x = this.node.getPosition().x;
            bulletN.y = this.node.getPosition().y;
            let bulletJs = bulletN.getComponent('bullet');
            let bulletDt = {'ack': this._ack, 'scope': this._scope, 'speed': this._speed};
            bulletJs.createWithData(bulletDt);
            bulletJs.setTarget(target);
        }
    }
}
