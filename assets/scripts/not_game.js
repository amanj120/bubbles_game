cc.Class({
    extends: cc.Component,

    properties: {
        // touchLocationDisplay: {
        //     default: null,
        //     type: cc.Label
        // },
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        // self.moveToPos = cc.v2(0, 0);
        // self.isMoving = false;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.director.loadScene('game');
        }, this.node);
        // self.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
        //     var touches = event.getTouches();
        //     var touchLoc = touches[0].getLocation();
        //     // // self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
        //     self.touchLocationDisplay.string = "touch move (" + Math.floor(touchLoc.x) + ', ' + Math.floor(touchLoc.y) + ')';
        // }, self.node);
        // self.node.on(cc.Node.EventType.TOUCH_END, function (event) {
        //     self.touchLocationDisplay.string = "touch end";
        // }, self.node);
    },

    // called every frame
    update: function (dt) {
        // if (!this.isMoving) return;
        // var oldPos = this.follower.position;
        // // get move direction
        // var direction = this.moveToPos.sub(oldPos).normalize();
        // // multiply direction with distance to get new position
        // var newPos = oldPos.add(direction.mul(this.followSpeed * dt));
        // // set new position
        // this.follower.setPosition(newPos);
    }
});