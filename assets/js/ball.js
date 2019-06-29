cc.Class({
    extends: cc.Component,

    properties: {

    },
    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider) {
        var canvas = this.node.parent.parent;
        if (otherCollider.tag == 1) {    //砖块tag=1
            canvas.getComponent("game").mark++;
            canvas.getChildByName("data").getChildByName("score").getChildByName("mark").getComponent(cc.Label).string = canvas.getComponent("game").mark;
            if (otherCollider.node.getComponent("brick").hp == 1) {
                otherCollider.node.destroy();
            }
            else {
                otherCollider.node.getComponent("brick").hp--;
                otherCollider.node.getChildByName("num").getComponent(cc.Label).string = otherCollider.getComponent("brick").hp;
            }
        }
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {

    },

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function (contact, selfCollider, otherCollider) {
    },

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function (contact, selfCollider, otherCollider) {
    },

    onLoad() {

    },

    start() {

    },

    // update (dt) {},
});
