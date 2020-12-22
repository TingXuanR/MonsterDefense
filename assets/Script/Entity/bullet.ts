
import ModuleBase from "../Module/ModuleBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {
    private _ack:number=0;
    private _speed:number=0;
    private _target;
    createWithData(bulletDt) {
        this._ack = bulletDt['ack'];
        this._speed = bulletDt['speed'];
    }
    getAck() {
        return this._ack;
    }
    setTarget(target) {
        this._target = target;
    }
    getTarget() {
        return this._target;
    }
    update(dt) {
        if(!this._target) {
            return;
        }

        let targetPos:cc.Vec2 = this._target.getPosition();
        let pos = this.node.getPosition();

        let offset = pos.sub(targetPos);                                   
        // 得到角度 
        let angle = cc.v2(offset).signAngle(cc.v2(1,0));
        // 转化为弧度
        let degree = angle / Math.PI*180;

        this.node.angle = -(degree);

        let dir = targetPos.sub(pos).normalizeSelf();
        this.node.x += dt*dir.x*this._speed;
        this.node.y += dt*dir.y*this._speed;

        let dis = Math.abs(offset.mag());
        if(dis <= 20) {
            let enemyJs = this._target.getComponent('Enemy');
            enemyJs.onCollision(this.node);
        }
    }
}
