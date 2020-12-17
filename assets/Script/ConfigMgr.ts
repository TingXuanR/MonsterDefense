import ConfigDt from './ConfigDt'

export default class ConfigMgr {
    static instance: ConfigMgr

    static getInstance() {
        if (!ConfigMgr.instance) {
            ConfigMgr.instance = new ConfigMgr();
        }
        return ConfigMgr.instance;
    }

    private constructor() {}

    private mapDt = new Map()

    // add
    addConfig(key: string, config) {
        if (!key || !config || typeof(key) !== 'string') {
            return;
        }
        this.mapDt.set(key, config);
    }

    // remove
    removeConfig(key: string){
        if (!key || typeof(key) !== 'string') {
            return;
        }
        delete this.mapDt[key];
    }
    // get
    getConfig(key: string){
        if (!key || typeof(key) !== 'string') {
            return  null;
        }
        return this.mapDt.get(key);
    }
}