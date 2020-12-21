import ConfigMgr from "./ConfigMgr";
import ModuleMgr from "../Module/ModuleMgr";
const { ccclass, property } = cc._decorator;
export default class LevelMgr {
    private _levelID: number = 1;
    private _levelIsLocked = new Map();
    private _UnlockedID: number = 1;
    private static instance: LevelMgr = null;
    private constructor() { }
    static getInstance() {
        if (!LevelMgr.instance) {
            LevelMgr.instance = new LevelMgr();
        }
        return LevelMgr.instance;
    }
    init() {
        if (this._levelIsLocked.size <= 0) {
            let levelDt = ConfigMgr.getInstance().getConfig('LevelDt')['arrData'];
            // for(let i=0; i<levelDt.length; ++i) {
            //     let level = levelDt[i];
            //     this._levelIsLocked[level['id']] = level['isLocked'];
            // }
            for (const level of levelDt) {  // 使用for of会创建一个副本: levelDt_1
                let key = level.id;
                let value = level.isLocked;
                this._levelIsLocked.set(key, value);
            }
        }
    }
    setLevelID(levelID: number) {
        this._levelID = levelID;
    }
    getLevelID() {
        return this._levelID;
    }
    getLevelDt(levelID) {
        return ConfigMgr.getInstance().getConfig('LevelDt').getDataByID(levelID);
    }
    getIsLocked(levelID) { //{4001: 0, 4002:1, 4003:1}
        return this._levelIsLocked.get(levelID);
    }
    setUnLocked(levelID) {
        this._levelIsLocked.set(levelID, 0);
        this._UnlockedID++;
    }
    getIsLockedDt() {
        return this._levelIsLocked;
    }
    getUnLockedID() {
        return this._UnlockedID;
    }
    // registerModule(){
    //     ModuleMgr.getInstance().registerModule('LevelMgr', this);
    // }

}
