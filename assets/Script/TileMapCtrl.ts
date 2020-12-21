import ConfigMgr from "./Manager/ConfigMgr";
import ResMgr from "./Manager/ResMgr";
import ModuleBase from "./Module/ModuleBase";
import LevelMgr from "./Manager/LevelMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TileMapCtrl extends ModuleBase {

    private _tileMap: cc.TiledMap;
    private _path: cc.Vec2[] = [];
    private _index: number=0;
    private _pathMap=new Map();
    onInit() {
        this._tileMap = this.node.getComponent(cc.TiledMap);
        this._index = LevelMgr.getInstance().getLevelID() - 4000;
        let tileName:string = 'tilemap'+this._index;
        this._tileMap.tmxAsset = ResMgr.getInstance().getTileMap(tileName);
        let objLayer = this._tileMap.getObjectGroup('obj');
        let obj = objLayer.getObjects();
        for(let point of obj) {
            this._path[<number>point['name']] = cc.v2(point['x'], point['y']);
        }
    }
    onLateInit() {
        this.sendMsg('topBar', 'updateLevelID', this._index);
        let LevelDt = ConfigMgr.getInstance().getConfig('LevelDt').getDataByID(4000+this._index);
        //存下当前关卡所拥有的金钱数。
        this.sendMsg('topBar', 'InitMoney');
        this.sendMsg('topBar', 'updateMoney', LevelDt['money']);
    }
    getPath() {
        return this._path;
    }

    getTileByPos(pos:cc.Vec2):cc.Vec2{
        let mapSize = this._tileMap.getMapSize();
        let tileSize = this._tileMap.getTileSize();
        let mapHeight = mapSize.height*tileSize.height;
        let x = Math.floor(pos.x / tileSize.width);
        let y = Math.floor((mapHeight - pos.y) / tileSize.height);
        return cc.v2(x, y);
    }

    getPosByTile(tile:cc.Vec2){
        let mapSize = this._tileMap.getMapSize();
        let tileSize = this._tileMap.getTileSize();
        let mapHeight = mapSize.height*tileSize.height;
        let x = tileSize.width*tile.x + tileSize.width/2;
        let y = mapHeight - tileSize.height*tile.y - tileSize.height/2;
        return cc.v2(x, y);
    }

    getBgLayer() {
        return this._tileMap.getLayer('bg');
    }
}
