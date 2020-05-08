// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        dx: {
            type: cc.Float,
            default: 0,
        },
        dy: {
            type: cc.Float,
            default: 0,
        },
        size: { //in pixels
            type: cc.Float,
            default: 0,
        },
    },

    getPlayerDistance: function () {
        // judge the distance according to the position of the player node
        var playerPos = this.game.player.getPosition();
        // calculate the distance between two nodes according to their positions
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked: function() {
        // When the stars are being collected, invoke the interface in the Game script to generate a new star
        this.game.spawnNewStar();
        // then destroy the current star's node
        this.node.destroy();
    },

    update: function (dt) {
        // judge if the distance between the star and main character is less than the collecting distance for each frame
        this.node.x += this.player.dx + this.dx;
        this.node.y += this.player.dy + this.dy;

        this.node.width = this.size;
        this.node.height = this.size;

        uS = this.game.universeSize;

        if(this.node.x < -uS + this.size/2){
            this.node.x = -uS + this.size/2;
            this.dx = -this.dx;
        }
        if(this.node.x > uS - this.size/2){
            this.node.x = uS - this.size/2;
            this.dx = -this.dx;
        }
        if(this.node.y < -uS + this.size/2){
            this.node.xy= -uS + this.size/2;
            this.dy = -this.dy;
        }
        if(this.node.y > uS - this.size/2){
            this.node.y = uS - this.size/2;
            this.dy = -this.dy;
        }

        if (this.getPlayerDistance() < (this.size + this.player.sizeInPixels)/2) {
            // invoke collecting behavior
            this.onPicked();
            return;
        }
    },

    start () {

    },
});
