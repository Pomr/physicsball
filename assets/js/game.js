cc.Class({
    extends: cc.Component,

    properties: {
        prefab_shoot: cc.Prefab,
        prefab_ball: cc.Prefab,
        prefab_sanjiao: cc.Prefab,        //0
        prefab_sanjiaoxing: cc.Prefab,    //1
        prefab_wubian: cc.Prefab,         //2
        prefab_wubianxing: cc.Prefab,     //3
        prefab_yuan: cc.Prefab,           //4
        prefab_zhengfangxing: cc.Prefab,  //5
    },

    onLoad() {    //发射个数 总球数
        cc.director.getPhysicsManager().enabled = true;   // 开启物理
        cc.director.getCollisionManager().enabled = true;  // 开启碰撞
        this.ballNum = 5;                    //弹球总数
        this.ballShoot = this.ballNum;        //当前发射球个数
        this.ballNow = 0;         //弹球当前数量（发球时变化）
        var firstX;                         //第一行的x坐标
        this.mark = 0;                      //分数
        this.derailNum = 0;                 //暂停相关数值
        this.node.getChildByName("data").getChildByName("ballNum").getChildByName("ballAll").getComponent(cc.Label).string = this.ballNum;
        this.node.getChildByName("data").getChildByName("ballNum").getChildByName("ballNow").getComponent(cc.Label).string = this.ballNow;
        for (var i = 0; i < 6; i++) {       //第一行的初始化
            if (i == 0) {
                firstX = -238;
            }
            else if (i == 1) {
                firstX = -143
            }
            else if (i == 2) {
                firstX = -48;
            }
            else if (i == 3) {
                firstX = 47
            }
            else if (i == 4){  
                firstX = 142
            }
            else {     //==5
                firstX = 237
            }
            if (i == 2 || i == 5) {
                var rad = Math.floor(Math.random() * 6);
                this.prefab_no;   //随机数下不同情况的prefab
                if (rad == 0) {
                    this.prefab_no = this.prefab_sanjiao;
                }
                else if (rad == 1) {
                    this.prefab_no = this.prefab_sanjiaoxing
                }
                else if (rad == 2) {
                    this.prefab_no = this.prefab_wubian
                }
                else if (rad == 3) {
                    this.prefab_no = this.prefab_wubianxing
                }
                else if (rad == 4) {
                    this.prefab_no = this.prefab_yuan
                }
                else {   //==5
                    this.prefab_no = this.prefab_zhengfangxing
                }
                var bri = cc.instantiate(this.prefab_no);
                this.node.getChildByName("brick").addChild(bri);
                bri.setPosition(firstX, -402);
                var hp = Math.floor(Math.random() * this.ballNum);
                if (hp == 0) {
                    bri.getComponent("brick").hp = hp + 1;
                    bri.getChildByName("num").getComponent(cc.Label).string = bri.getComponent("brick").hp;
                }
                else {
                    bri.getComponent("brick").hp = hp;
                    bri.getChildByName("num").getComponent(cc.Label).string = bri.getComponent("brick").hp;
                }
            }
            else {
                if (Math.random() < 0.5) {
                    var rad = Math.floor(Math.random() * 6);
                    this.prefab_no;   //随机数下不同情况的prefab
                    if (rad == 0) {
                        this.prefab_no = this.prefab_sanjiao;
                    }
                    else if (rad == 1) {
                        this.prefab_no = this.prefab_sanjiaoxing
                    }
                    else if (rad == 2) {
                        this.prefab_no = this.prefab_wubian
                    }
                    else if (rad == 3) {
                        this.prefab_no = this.prefab_wubianxing
                    }
                    else if (rad == 4) {
                        this.prefab_no = this.prefab_yuan
                    }
                    else {   //==5
                        this.prefab_no = this.prefab_zhengfangxing
                    }
                    var bri = cc.instantiate(this.prefab_no);
                    this.node.getChildByName("brick").addChild(bri);
                    bri.setPosition(firstX, -402);
                    var hp = Math.floor(Math.random() * this.ballNum);
                    if (hp == 0) {
                        bri.getComponent("brick").hp = hp + 1;
                        bri.getChildByName("num").getComponent(cc.Label).string = bri.getComponent("brick").hp;
                    }
                    else {
                        bri.getComponent("brick").hp = hp;
                        bri.getChildByName("num").getComponent(cc.Label).string = bri.getComponent("brick").hp;
                    }
                }
            }
        }
    },

    touch_on: function () {
        //触发触摸时，创建发射炮弹的指向线和鼠标点多代表的shoot预制
        this.node.on("touchstart", function (event) {
            var touchPoint = this.node.getChildByName("ball").convertToNodeSpaceAR(event.getLocation());
            // console.log("当前位置" + touchPoint.x, touchPoint.y);
            if (touchPoint.y < 0) {
                var shoot = cc.instantiate(this.prefab_shoot);
                this.node.addChild(shoot);
                this.angle;
                if (touchPoint.x < 0) {     //屏幕左半边
                    var radian = Math.atan2((touchPoint.x - 0), (touchPoint.y - 0))   //弧度
                    this.angle = 180 + radian * (180 / Math.PI);    //角度
                    shoot.getChildByName("line").rotation = this.angle;
                    //与x负半轴的夹角90-angle（弧度） , *cos=x *sin=y
                    shoot.getChildByName("add").setPosition(-Math.cos((90 - this.angle) / 180 * Math.PI) * shoot.getChildByName("line").height, -Math.sin((90 - this.angle) / 180 * Math.PI) * shoot.getChildByName("line").height);
                }
                else if (touchPoint.x > 0) {    //屏幕右半边
                    var radian = Math.atan2((touchPoint.x - 0), (touchPoint.y - 0))
                    this.angle = -180 + radian * (180 / Math.PI);
                    shoot.getChildByName("line").rotation = this.angle;
                    shoot.getChildByName("add").setPosition(Math.cos((90 + this.angle) / 180 * Math.PI) * shoot.getChildByName("line").height, -Math.sin((90 + this.angle) / 180 * Math.PI) * shoot.getChildByName("line").height);
                }
                else if (touchPoint.y = 0) {  //特殊情况 正中间
                    this.angle = 0;
                    shoot.getChildByName("line").rotation = this.angle;
                    shoot.getChildByName("add").setPosition(0, -shoot.getChildByName("line").height);
                }
            }
        }.bind(this));

        //使生成的shoot（瞄准点）跟随触摸点移动
        this.node.on("touchmove", function (event) {
            let touchPoint = this.node.getChildByName("ball").convertToNodeSpace(event.getLocation());
            if (touchPoint.y < 0) {
                this.angle;
                if (touchPoint.x < 0) {     //屏幕左半边
                    var radian = Math.atan2((touchPoint.x - 0), (touchPoint.y - 0))   //弧度
                    this.angle = 180 + radian * (180 / Math.PI);    //角度
                    this.node.getChildByName("shoot").getChildByName("line").rotation = this.angle;
                    //与x负半轴的夹角90-angle（弧度） , *cos=x *sin=y
                    this.node.getChildByName("shoot").getChildByName("add").setPosition(-Math.cos((90 - this.angle) / 180 * Math.PI) * this.node.getChildByName("shoot").getChildByName("line").height, -Math.sin((90 - this.angle) / 180 * Math.PI) * this.node.getChildByName("shoot").getChildByName("line").height);
                }
                else if (touchPoint.x > 0) {    //屏幕右半边
                    var radian = Math.atan2((touchPoint.x - 0), (touchPoint.y - 0))
                    this.angle = -180 + radian * (180 / Math.PI);
                    this.node.getChildByName("shoot").getChildByName("line").rotation = this.angle;
                    this.node.getChildByName("shoot").getChildByName("add").setPosition(Math.cos((90 + this.angle) / 180 * Math.PI) * this.node.getChildByName("shoot").getChildByName("line").height, -Math.sin((90 + this.angle) / 180 * Math.PI) * this.node.getChildByName("shoot").getChildByName("line").height);
                }
                else if (touchPoint.y = 0) {  //特殊情况 正中间
                    this.angle = 0;
                    this.node.getChildByName("shoot").getChildByName("line").rotation = this.angle;
                    this.node.getChildByName("shoot").getChildByName("add").setPosition(0, -this.node.getChildByName("shoot").getChildByName("line").height);
                }
            }
        }.bind(this));

        //删除触碰时生成的线和瞄准点
        this.node.on("touchend", function (event) {
            //瞄准所在位置转移到ball坐标下
            var touchPoint = this.node.getChildByName("ball").convertToNodeSpaceAR(event.getLocation());
            //间隔一定时间一次性出ballNum的炮弹   
            this.node.getChildByName("data").getChildByName("ballNum").getChildByName("ballAll").getComponent(cc.Label).string = this.ballNum;
            var height=this.node.getChildByName("shoot").getChildByName("line").height;
            this.node.getChildByName("shoot").destroy();
            this.callback = function () {
                this.touch_off();      //发射炮弹时，禁止再次触屏发射炮弹
                this.ballNow++;
                this.node.getChildByName("data").getChildByName("ballNum").getChildByName("ballNow").getComponent(cc.Label).string = this.ballNow;
                var ball = cc.instantiate(this.prefab_ball);
                this.node.getChildByName("ball").addChild(ball);
                ball.setPosition(cc.v2(0, 0));
                var radian = Math.atan2((touchPoint.x - 0), (touchPoint.y - 0))   //弧度
                this.angle = 180 + radian * (180 / Math.PI);    //角度
                //与x负半轴的夹角90-angle（弧度） , *cos=x *sin=y
                var rigidbody = ball.getComponent(cc.RigidBody);
                rigidbody.applyLinearImpulse(cc.v2(-Math.cos((90 - this.angle) / 180 * Math.PI) * height, -Math.sin((90 - this.angle) / 180 * Math.PI) * height), rigidbody.getWorldPosition(), true);
                // ball.getComponent(cc.RigidBody).linearVelocity = touchPoint;   //线速度
                //当发射完这一轮炮弹时 恢复触摸，生成下一行 移动上部分 判别是否结束游戏
                if (this.ballNow == this.ballShoot) {
                    this.unschedule(this.callback);
                    this.ballNow = 0;
                }
                if (this.node.getChildByName("background").getChildByName("down").getComponent("down").derail == true) {
                    this.derailNum++;
                    if (this.derailNum / this.ballNum == 2) {
                        this.node.getChildByName("background").getChildByName("down").getComponent("down").derail = false;
                        this.derailNum = 0;
                    }
                }
            }
            this.schedule(this.callback, 0.4);
        }.bind(this));
        /*this.node.on("touchcancel", function (event) {
            this.node.getChildByName("shoot").destroy();
        }.bind(this));*/
    },

    touch_off: function () {
        this.node.off("touchstart");
        this.node.off("touchmove");
        this.node.off("touchend");
        this.node.off("touchcancel");
    },

    start() {
        this.touch_on();
    },

    // update (dt) {},
});
