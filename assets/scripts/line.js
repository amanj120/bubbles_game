cc.Class({
    extends: cc.Component,

    properties: {
        absy: {
            type: cc.Float,
            default: 0,
        },
        dy: {
            type: cc.Float,
            default: 4, //max = 8
        }
    },

    onLoad () {
        this.absy = -this.node.parent.height/2;
        this.node.width = this.game.universeSize * 4;
        this.node.height = this.game.node.height;
    },

    start () {

    },

    update: function (dt) {
        this.absy += this.dy;
        this.node.y = this.absy - this.player.absy;
        this.dy = Math.min(3 + (this.game.maxy/250), 8) //max speed is 8, but game gets harder as you get better

        if(this.absy < this.player.absy - (7 * this.player.size)){
            this.absy = this.player.absy -  (7 * this.player.size);
        }

        var dist = (this.absy - this.player.absy) * (128/(-7 * this.player.size))
        if(dist <= 0){
            this.game.background.color = new cc.Color(255, 127, 127);
        } else {
            this.game.background.color = new cc.Color(255-(dist/2), 127, 127+dist);
        }
        
        if(this.node.y >= this.player.size){ //the line caught up to the player
            cc.director.loadScene("not_game");
        }
    },
});
