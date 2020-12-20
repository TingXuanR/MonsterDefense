// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ModuleBase from "../Module/ModuleBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class topBarMgr extends ModuleBase {

    private _levelIDN:cc.Node=null;
    private _waveN:cc.Node=null;
    private _moneyN:cc.Node=null;
    private _hpN:cc.Node=null;
    private _hpImgN:cc.Node=null;
    private _hp = 10;
    private _imgScale: number = 1;
    private _money: number=0;
    onInit() {
        this._levelIDN = this.node.getChildByName('levelID');
        this._waveN = this.node.getChildByName('wave');
        this._moneyN = this.node.getChildByName('money');
        this._hpN = this.node.getChildByName('hp');
        this._hpImgN = this.node.getChildByName('hpBar').getChildByName('PlayerHP');
    }
    InitMoney() {
        this._money = 0;
    }
    getMoney() {
        return this._money;
    }
    updateLevelID(levelID:number=0) {
        let content = '<color=#00ff00>Level: </c><color=#0fffff>'+levelID+'</color>';
        let com = this._levelIDN.getComponent(cc.RichText);
        com.string = content;
    }
    updateWave(wave:number=0) {
        let content = '<color=#00ff00>Wave: </c><color=#0fffff>'+wave+'</color><color=#288973>/3</color>';
        this._waveN.getComponent(cc.RichText).string = content;
    }
    updateMoney(money:number=0) {
        this._money += money;
        let content = '<color=#00ff00>Money: </c><color=#0fffff>'+this._money+'</color>';
        this._moneyN.getComponent(cc.RichText).string = content;
    }
    updateHP(hp:number=0) {
        this._hp -= hp;
        this._imgScale -= 0.1*hp;
        this._imgScale = this._imgScale <= 0 ? 0:this._imgScale;
        let content = '<color=#00ff00>Hp: </c><color=#0fffff>'+this._hp+'</color><color=#288973>/10</color>';
        this._hpN.getComponent(cc.RichText).string = content;
        this._hpImgN.setScale(this._imgScale, 1);
    }
}
