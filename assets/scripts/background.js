cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.width = this.game.universeSize * 2;
        this.node.height = this.game.node.height;
    },

    start () {

    },

    update: function (dt) {
        this.node.x = -this.player.absx;
    },
});
