import ConfigMgr from "./ConfigMgr";
import ResMgr from "./ResMgr";
import ModuleBase from "./Module/ModuleBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TileMapCtrl extends ModuleBase {

    private _tileMap: cc.TiledMap;
    private _path: cc.Vec2[] = [];
    onInit() {
        this._tileMap = this.node.getComponent(cc.TiledMap);
        let index:number = ConfigMgr.getInstance().getConfig('mapIndex');
        let tileName:string = 'tilemap'+index;
        this._tileMap.tmxAsset = ResMgr.getInstance().getTileMap(tileName);
        let objLayer = this._tileMap.getObjectGroup('obj');
        let obj = objLayer.getObjects();
        for(let point of obj) {
            point.convertToNodeSpaceAR(this.node);
            // point.x = point.x*0.6 - ;
            this._path.push(cc.v2(point['x'], point['y']));
        }
    }

    public getPath() {
        return this._path;
    }
}
