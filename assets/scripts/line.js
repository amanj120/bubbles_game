// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        absy: {
            type: cc.Float,
            default: 0,
        },
        dy: {
            type: cc.Float,
            default: 3, //max = 8
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.absy = -this.node.parent.height/2;
    },

    start () {

    },

    update (dt) {
        this.absy += this.dy;
        this.node.y = this.absy - this.player.absy;
        
        if(this.node.y >= this.player.size){ //the line caught up to the player
            cc.director.loadScene("not_game");
        }

    },
});
