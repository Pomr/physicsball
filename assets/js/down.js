
cc.Class({
    extends: cc.Component,

    properties: {
        prefab_sanjiao: cc.Prefab,        //0
        prefab_sanjiaoxing: cc.Prefab,    //1
        prefab_wubian: cc.Prefab,         //2
        prefab_wubianxing: cc.Prefab,     //3
        prefab_yuan: cc.Prefab,           //4
        prefab_zhengfangxing: cc.Prefab,  //5
        prefab_boom: cc.Prefab,
        prefab_addball: cc.Prefab,
    },

    click_suspend: function () {
        this.derail = true;
    },

    onLoad() {
        this.num = 0;     //碰触到底部的ball的个数
        this.derail = false;      //暂停开关
        this.changeY = 113;    //每一次上升的y轴大小
        this.boomDerail = false;  //boom生成开关——场上仅有一个boom
    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.tag == 2) {
            otherCollider.node.destroy();
            this.num++;
            console.log("num: " + this.num)
            // console.log(this.num);
            var canvas = this.node.parent.parent;
            console.log("ballNum:  " + canvas.getComponent("game").ballNum);
            if (this.num == canvas.getComponent("game").ballNum) {
                this.num = 0;
                var firstX;                         //第一行的x坐标
                canvas.getComponent("game").ballShoot = canvas.getComponent("game").ballNum;
                this.scheduleOnce(function () {
                    canvas.getComponent("game").touch_on();
                    if (this.derail == false) {
                        //已生成的块上移 行距113 
                        for (var i = 0; i < canvas.getChildByName("brick").childrenCount; i++) {
                            canvas.getChildByName("brick").children[i].y += this.changeY;
                            // var action = cc.moveBy(0.1, cc.v2(0, this.changeY));
                            // canvas.getChildByName("brick").children[i].runAction(action);
                            if (canvas.getChildByName("brick").children[i].y >= canvas.getChildByName("brick").height / 2 - canvas.getChildByName("brick").children[i].height / 2) {
                                canvas.getComponent("game").touch_off();
                                canvas.getChildByName("end").active = true;
                            }
                        }
                        //生成新的最下一行 每一行至少两个
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
                            else if (i == 4) {
                                firstX = 142
                            }
                            else {     //==5
                                firstX = 237
                            }
                            if (Math.floor(Math.random() * 6 * 2.5) == 0) {    //floor向下取整   大概2.5行(12个块)有一个addball
                                var addball = cc.instantiate(this.prefab_addball);
                                canvas.getChildByName("brick").addChild(addball);
                                addball.setPosition(firstX, -402);
                                continue;
                            }
                            if (this.boomDerail == false) {
                                if (Math.floor(Math.random() * 6 * 2.5) == 0) {    //floor向下取整   大概2.5行(12个块)有一个addball
                                    var boom = cc.instantiate(this.prefab_boom);
                                    canvas.getChildByName("brick").addChild(boom);
                                    boom.setPosition(firstX, -402);
                                    this.boomDerail=true;
                                    continue;
                                }
                            }
                            if (Math.random() < 0.7) {
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
                                canvas.getChildByName("brick").addChild(bri);
                                bri.setPosition(firstX, -402);
                                if (canvas.getComponent("game").ballNum < 8) {
                                    var hp = Math.floor(Math.random() * 1.5 * canvas.getComponent("game").ballNum);    //ball个数在10以内，方块打击个数 0-1随机数*1.5*当前球个数 
                                }
                                else if (canvas.getComponent("game").ballNum < 11) {
                                    var hp = Math.floor(Math.random() * 2 * canvas.getComponent("game").ballNum);       //方块打击个数 0-1随机数*3*当前球个数
                                }
                                else if (canvas.getComponent("game").ballNum < 17){
                                    var hp = Math.floor(Math.random() * 2.5 * canvas.getComponent("game").ballNum);
                                }
                                else {
                                    var hp = Math.floor(Math.random() * 3 * canvas.getComponent("game").ballNum);
                                }
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
                }, 0.5);
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

    start() {

    },

    // update (dt) {},
});
