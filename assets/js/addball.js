cc.Class({
    extends: cc.Component,

    properties: {
        prefab_ball: cc.Prefab,
    },

    onLoad() {
    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider) {
        this.node.active = false;
        var ball = cc.instantiate(this.prefab_ball);
        var canvas = this.node.parent.parent;
        canvas.getChildByName("ball").addChild(ball);
        var pos1 = this.node.parent.convertToWorldSpaceAR(cc.v2(this.node.x, this.node.y));
        var pos2 = canvas.getChildByName("ball").convertToNodeSpaceAR(cc.v2(pos1.x, pos1.y));
        ball.setPosition(pos2.x, pos2.y);
        var rigidbody = ball.getComponent(cc.RigidBody);
        rigidbody.linearVelocity=cc.v2(180, 220);
        // rigidbody.applyLinearImpulse(cc.v2(pos2.x + 50, pos2.y + 50), rigidbody.getWorldPosition(), true);
        canvas.getComponent("game").ballNum++;
        this.node.destroy();
    },

    add:function(){    //boom的addball调用
        this.node.active = false;
        var ball = cc.instantiate(this.prefab_ball);
        var canvas = this.node.parent.parent;
        canvas.getChildByName("ball").addChild(ball);
        var pos1 = this.node.parent.convertToWorldSpaceAR(cc.v2(this.node.x, this.node.y));
        var pos2 = canvas.getChildByName("ball").convertToNodeSpaceAR(cc.v2(pos1.x, pos1.y));
        ball.setPosition(pos2.x, pos2.y);
        var rigidbody = ball.getComponent(cc.RigidBody);
        rigidbody.linearVelocity=cc.v2(180, 220);
        // rigidbody.applyLinearImpulse(cc.v2(pos2.x + 50, pos2.y + 50), rigidbody.getWorldPosition(), true);
        canvas.getComponent("game").ballNum++;
        this.node.destroy();
    },

    start() {

    },

    update(dt) { },
});
