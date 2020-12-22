
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
    changeOpacity(cards){
        let tileMapCtrl = <TileMapCtrl>this.getModule('TileMap');
        for(let card of cards) {
            for (const tower of this._towers) {
                let towerTile = tileMapCtrl.getTileByPos(tower.getPosition());
                if(towerTile.x===card.x && towerTile.y===card.y) {  
                   tower.opacity = 100;
                }
            }
        }
    }

    restoreOpacity() {
        for (const tower of this._towers) {
            if(tower.opacity !== 255) {  
               tower.opacity = 255;
            }
        }
    }
}
