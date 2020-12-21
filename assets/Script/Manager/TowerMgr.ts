// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ModuleBase from "../Module/ModuleBase";
import TileMapCtrl from "../TileMapCtrl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends ModuleBase {

    private _towers:cc.Node[]=[];
    addTower(tower:cc.Node) {
        this._towers.push(tower);
    }
    getTowerByTile(tile:cc.Vec2) {
        let tileMapCtrl = <TileMapCtrl>this.getModule('TileMap');
        for (const tower of this._towers) {
            let towerTile = tileMapCtrl.getTileByPos(tower.getPosition());
            if(towerTile.x===tile.x && towerTile.y===tile.y) {  // wrong: towerTile === tile/towerTile.equals(tile)
                return tower;
                //return true;
            }
        }
        return null;
        //return false;
    }
}
