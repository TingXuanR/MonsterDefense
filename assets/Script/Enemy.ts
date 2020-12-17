import ConfigMgr from "./ConfigMgr";
import ModuleBase from "./Module/ModuleBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    //----- 属性声明 -----//
    private _id: number;
    private _name: number;
    //生命最大值
    private _maxHp: number;
    //当前生命
    private _currHp: number;
    //死亡掉落的钱
    private _money: number;
    //移动速度
    private _speed: number;
    //
    private _ack: number;

    //已经死亡
    private _isDie: boolean = false;

    initWithData(enemyDt) {
        for (const data in enemyDt) {
            this._name = data['name'];
            this._ack = data['ack'];
            this._maxHp = data['hp'];
            this._money = data['money'];
            this._speed = data['speed'];
         }
    }
}
