
import ModuleBase from "../Module/ModuleBase";
import ResMgr from "./ResMgr";
import TileMapCtrl from "../TileMapCtrl";
import ConfigMgr from "./ConfigMgr";
import TowerMgr from "../Manager/TowerMgr"

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardMgr extends ModuleBase {

    private _towerDt;
    private _tileMapCtrl;
    private _isShow = false;
    private _cardN: cc.Node;
    private _bgLayer;
    private _forbidN: cc.Node;
    private _noMoneySignN: cc.Node;
    private _cards = [];
    private _money = 0;
    onInit() {

        this._tileMapCtrl = <TileMapCtrl>this.getModule('TileMap');

        let prefabCard = ResMgr.getInstance().getPrefab('Card');
        this._cardN = cc.instantiate(prefabCard);
        //this._cardN.parent = this._tileMapCtrl.node;
        this._cardN.parent = this.node;
        this._cardN.active = false;
        this._bgLayer = this._tileMapCtrl.getBgLayer();

        let prefebForbid = ResMgr.getInstance().getPrefab('Forbid');
        this._forbidN = cc.instantiate(prefebForbid);
        this._forbidN.parent = this._tileMapCtrl.node;
        this._forbidN.active = false;

        let prefabNoMoneySign = ResMgr.getInstance().getPrefab('NoMoney');
        this._noMoneySignN = cc.instantiate(prefabNoMoneySign);
        this._noMoneySignN.parent = this._tileMapCtrl.node;
        this._noMoneySignN.active = false;

        for (let i = 1; i <= 3; ++i) {
            let card:cc.Node = this._cardN.getChildByName('tower' + i);
            this._cards.push(card);
        }
    }

    addCard(pos: cc.Vec2) {
        let tile = this._tileMapCtrl.getTileByPos(pos);
        let tilePos = this._tileMapCtrl.getPosByTile(tile);
        let towerMgr = <TowerMgr>this.getModule('TowerMgr');
        
        if (!this._isShow) {
            this._isShow = true;
            
            let GID = this._bgLayer.getTileGIDAt(tile);
            if (GID == 24 &&　towerMgr.getTowerByTile(tile)===null) {
                this._cardN.active = true;
                this._cardN.x = tilePos.x;
                this._cardN.y = tilePos.y;
                
            }
            else if(GID == 24 &&　towerMgr.getTowerByTile(tile)===null){
                this._forbidN.active = true;
                this._forbidN.x = tilePos.x;
                this._forbidN.y = tilePos.y;
            }
        }
        else {
            let flag = this.isClickCard(pos);
            if(flag) {
                // 获取金钱数
                this._money = this.sendMsg('topBar', 'getMoney');       
                let towerTile = this._tileMapCtrl.getTileByPos(cc.v2(this._cardN.x, this._cardN.y));
                let towerDt = ConfigMgr.getInstance().getConfig('TowerDt').getDataByID(2000+flag);
                if(towerMgr.getTowerByTile(towerTile)!==null) {
                    return;
                }
                if(this._money - towerDt['money'] >= 0) {
                    let prefebTower = ResMgr.getInstance().getPrefab('Tower'+flag);
                    let towerN = cc.instantiate(prefebTower);
                    towerN.parent = this.node;
                    towerN.setSiblingIndex(0);  // 防止卡牌被塔挡住
                    towerN.x = this._cardN.x;
                    towerN.y = this._cardN.y;
                    towerMgr.addTower(towerN);
                    let towerJs = towerN.getComponent('Tower');
                    towerJs.initWithData(towerDt);
                    //towerJs.startSchedule();
                    this.sendMsg('topBar','updateMoney', -towerDt['money']);

                }
                else if(this._money - towerDt['money'] < 0 && this._cardN.active){
                    this._noMoneySignN.active = true;
                    this._noMoneySignN.x = this._cardN.x;
                    this._noMoneySignN.y = this._cardN.y;
                    this.scheduleOnce(()=>{
                    this._noMoneySignN.active = false;
                    }, 1);  // 1s后自动消失
                }
            }
            this._cardN.active = false;
            this._forbidN.active = false;
            this._isShow = false;
        }
    }

    isClickCard(pos) {
        let pos2 = this._cardN.convertToNodeSpaceAR(pos);
        for(let i = 0; i < 3; ++i) {
            if(this.isContains(this._cards[i], pos2)) {  //wrong--this._cards[i].getBoundingBox(pos2) 
               return i+1; 
            }
        }
        return 0;
    }

    isContains(cardNode:cc.Node, pos:cc.Vec2) {
        let left = cardNode.x - cardNode.width/2;
        let right = cardNode.x + cardNode.width/2;
        let up = cardNode.y + cardNode.height/2;
        let down = cardNode.y - cardNode.height/2;
        if(pos.x >= left && pos.x <= right && pos.y >= down && pos.y <= up)
        {
            return true;
        }
        return false;
    }
    // 不能在塔上又点击建塔
    checkClick() {

    }
}
