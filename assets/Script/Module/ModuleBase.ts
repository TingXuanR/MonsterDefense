import ModuleMgr from "./ModuleMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ModuleBase extends cc.Component {

    onInit () {}

    onLateInit () {}

    onUpdate (dt) {}

    onLateUpdate (dt) {}

    onRelease () {}

    sendMsg() {

    }

    getModule(key: string) {
        return ModuleMgr.getInstance().getModule(key);
    }

}
