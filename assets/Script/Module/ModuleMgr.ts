import ModuleBase from "./ModuleBase";

export default class ModuleMgr {
    
    static instance: ModuleMgr = null;
    static getInstance() {
        if(!this.instance) {
            ModuleMgr.instance =  new ModuleMgr();
        }
        return this.instance;
    }
    private constructor(){}

    private mapModule = new Map();

    onInit () {
        let arrModule = Array.from(this.mapModule.values());
        for (const tmp of arrModule) {
            let myModule:ModuleBase = tmp as ModuleBase;
            if(myModule && myModule.onInit) {
                myModule.onInit();
            }
        }
    }

    onLateInit () {
        let arrModule = Array.from(this.mapModule.values());
        for (const tmp of arrModule) {
            let myModule:ModuleBase = tmp as ModuleBase;
            if(myModule && myModule.onInit) {
                myModule.onLateInit();
            }
        }
    }

    onUpdate (dt) {
        let arrModule = Array.from(this.mapModule.values());
        for (const tmp of arrModule) {
            let myModule:ModuleBase = tmp as ModuleBase;
            if(myModule && myModule.onInit) {
                myModule.onUpdate(dt);
            }
        }
    }

    onLateUpdate (dt) {
        let arrModule = Array.from(this.mapModule.values());
        for (const tmp of arrModule) {
            let myModule:ModuleBase = tmp as ModuleBase;
            if(myModule && myModule.onInit) {
                myModule.onLateUpdate(dt);
            }
        }
    }

    onRelease () {
        let arrModule = Array.from(this.mapModule.values());
        for (const tmp of arrModule) {
            let myModule:ModuleBase = tmp as ModuleBase;
            if(myModule && myModule.onInit) {
                myModule.onRelease();
            }
        }
    }

    sendMsg(modlueName: string, funcName: string) {
        let params: [] = [].slice.call(arguments, 2); // 将arguments这个类数组从index=2之后的元素转换为数组。
        let myModule = this.mapModule.get(modlueName);
        if(!myModule) {
            return ;
        }
        let func = myModule[funcName];
        if(func) {
            func.apply(myModule, params);
        }
    }

    registerModule(key: string, module) {
        if(!key || !module) {
            return ;
        }
        this.mapModule.set(key, module);
    }

    onRegisterModule(key: string) {
        if(!key) {
            return ;
        }
        this.mapModule.delete(key);
    }

    getModule(key: string) {
        if(!key) {
            return ;
        }
        return this.mapModule.get(key);
    }

    onDestory() {
        this.mapModule.clear();
    }


}
