import ConfigMgr from "./ConfigMgr";

export default class LevelMgr{
    levelID: number;
    constructor(){
        this.levelID = 1;
    }
    setLevelID(levelID: number){
        this.levelID = levelID;
    }
    getLevelDt(levelID) {
        return ConfigMgr.getInstance().getConfig('LevelID').getDataByID(levelID);
    }
}
