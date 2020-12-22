import ConfigMgr from "../Manager/ConfigMgr";
import ModuleBase from "../Module/ModuleBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends ModuleBase {

    //----- 属性声明 -----//
    private _id: number;
    private _name: number;
    //生命最大值
    private _maxHp: number;
    //当前生命
    private _curHp: number;
    //死亡掉落的钱
    private _money: number;
    //移动速度
    private _speed: number;
    //
    private _ack: number;
    private _imgScale: number = 0;
    //已经死亡
    private _isDie: boolean = false;

    private _path: cc.Vec2[] = [];

    private _index: number = 0;

    initWithData(enemyDt) {
        this._id = enemyDt['id'];
        this._name = enemyDt['name'];
        this._ack = enemyDt['ack'];
        this._maxHp = enemyDt['hp'];
        this._curHp = enemyDt['hp'];
        this._money = enemyDt['money'];
        this._speed = enemyDt['speed'];
    }

    getPath(path) {
        this._path = path;
    }


    runPath() {
        // if(this._isDie) {
        //     return;
        // }
        this._index++;
        if (this._index > this._path.length - 1) {
            this.sendMsg('topBar', 'updateHP', 1);
            this.node.removeFromParent();
            return;
        }
        let dest = this._path[this._index];
        let pos = this.node.position;
        let dis = Math.sqrt(Math.abs(dest.x - pos.x) * Math.abs(dest.x - pos.x) + Math.abs(dest.y - pos.y) * Math.abs(dest.y - pos.y));
        let timer = dis / this._speed;

        //let moveTo = cc.moveTo(timer, dest);
        // let func = cc.callFunc(this.runPath, this);
        // let seq = cc.sequence(moveTo, func);
        // this.node.runAction(seq);
        // 当敌人在moveTo动作途中被干掉，那么怪物还是会移动。
        cc.tween(this.node)
        .to(timer, { position: cc.v3(dest)})
        .call(this.runPath.bind(this))
        .start();
    }

    onCollision(bullet) {
        if(this._isDie) {
            if(bullet) {
                bullet.removeFromParent();
            }
            return;
        }
        let bulletJs = bullet.getComponent('bullet');
        let ack = bulletJs.getAck();
        this._curHp -= ack;
        let enemyHpBar = this.node.getChildByName('EnemyHpBar').getChildByName('bar');
        let scale = this._curHp / this._maxHp >= 0 ? this._curHp / this._maxHp : 0;
        enemyHpBar.setScale(scale, 1);
        if (this._curHp <= 0) {
            this._isDie = true;
            this.sendMsg('topBar', 'updateMoney', this._money);
            this.node.stopAllActions();
            //cc.director.getActionManager().pauseTarget(this.node);
            let ani = this.node.getChildByName('enemy' + (this._id - 1000)).getComponent(cc.Animation);
            let animate = ani.play('Died_Monster' + (this._id - 1000));
            let duration = animate.duration;
            //this.sendMsg('bulletMgr', 'onTargetDeath', this.node);
            this.scheduleOnce(()=>{
                this.node.removeFromParent();
            }, duration);
        }
        else {
            bullet.removeFromParent();
        }
    }
}
