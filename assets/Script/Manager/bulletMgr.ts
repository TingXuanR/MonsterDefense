
import ModuleBase from "../Module/ModuleBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletMgr extends ModuleBase {
    private _bulletDt;
    onInit() {
        

    }
    onTargetDeath(target) {
        let bulletNs = this.node.children;
        for (const bulletN of bulletNs) {
            let bullet = bulletN.getComponent('bullet');
            if(bullet.getTarget() == target) {
                bullet.setTarget(null);
                bulletN.removeFromParent();
            }
        }
    }
}
