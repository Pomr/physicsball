cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = false;   //碰撞框
        this.derail = false;
        this.addScore = 0;
    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider) {
        this.derail = true;
    },

    onCollisionStay: function (other, self) {
        var canvas=this.node.parent.parent;
        if (this.derail == true) {
            if (other.tag == 1) {
                this.addScore += other.node.getComponent("brick").hp;
                canvas.getComponent("game").mark+=this.addScore;
                canvas.getChildByName("data").getChildByName("score").getChildByName("mark").getComponent(cc.Label).string=canvas.getComponent("game").mark;
            }
            else if(other.tag==2){
                other.node.getComponent("addball").add();
            }
            other.node.destroy();
            this.node.destroy();
            canvas.getChildByName("background").getChildByName("down").getComponent("down").boomDerail = false;
        }
    },
    
    update(dt) {

    },
});
//刚体的矩形碰撞 不支持static 
        // var rc=cc.rect(-360,-500,113600,113600);
        // this.colliderList = cc.director.getPhysicsManager().testAABB(rc);
        // console.log(this.colliderList);