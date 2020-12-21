
const {ccclass, property} = cc._decorator;

import ConfigMgr from './Manager/ConfigMgr';
import ConfigDt from './ConfigDt';
import ResMgr from './Manager/ResMgr';
@ccclass
export default class Loading extends cc.Component {

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar=null;

    onLoad () {
        cc.resources.loadDir('./', (finishCount: number, totalCount: number, item):void=>{
                this.progressBar.progress = finishCount/totalCount;
            }, 
            (err, assets)=>{
                if(err) {
                    return;
                } 
                for(let i = 0; i < assets.length; i++) {
                    let asset = assets[i];
                    if(asset instanceof cc.JsonAsset) {
                        let configDt = new ConfigDt(asset.json);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                        ConfigMgr.getInstance().addConfig(asset.name, configDt);
                    }
                    else if (asset instanceof cc.TiledMapAsset) {
                        ResMgr.getInstance().addData('tileMap', asset.name, asset);
                    }
                    else if(asset instanceof cc.SpriteFrame) {
                        ResMgr.getInstance().addData('spriteFrame', asset.name, asset);
                    }
                    else if(asset instanceof cc.Prefab) {
                        ResMgr.getInstance().addData('prefab', asset.name, asset);
                    }
                }
                cc.director.loadScene('Menu');    
            });
    }

    start () {

    }

    // update (dt) {}
}
