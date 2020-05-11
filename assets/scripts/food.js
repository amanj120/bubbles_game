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
        absx: {
            type: cc.Float,
            default: 0,
        },
        absy: {
            type: cc.Float,
            default: 0,
        },
        id: {
            type: cc.Integer,
            default: -1,
        }
    },

    getPlayerDistance: function () {
        // judge the distance according to the position of the player node
        var playerPos = this.game.player.getPosition();
        // calculate the distance between two nodes according to their positions
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked: function() {
        // var playerArea = Math.pow(this.player.currentSize, 2);
        // var foodArea = Math.pow(this.size, 2);
        // var newArea = playerArea + foodArea;
        // var newPlayerSize = Math.sqrt(newArea);
        // this.player.currentSize = newPlayerSize;
        // When the stars are being collected, invoke the interface in the Game script to generate a new star
        this.node.destroy();
        //
        this.game.spawnNewStar(this.id);
        // then destroy the current star's node
        
    },

    foodIntersect: function (x, y){
        if(x == y){
            return false;
        } else {
            i = this.allFood[x];
            j = this.allFood[y];
            var dist = Math.sqrt(Math.pow((i.absx - j.absx), 2) + Math.pow((i.absy- j.absy), 2));
            if(dist <= i.size+j.size){
                return true;
            } else {
                return false;
            }
        }
    },

    update: function (dt) {
        // judge if the distance between the star and main character is less than the collecting distance for each frame
        this.absx += this.dx;
        this.absy += this.dy;

        this.node.x = this.absx - this.player.absx;
        this.node.y = this.absy - this.player.absy;

        // this.node.width = this.size;
        // this.node.height = this.size;

        uS = this.game.universeSize;

        // if(this.absx < -uS + this.size/2){
        //     this.absx = -uS + this.size/2;
        //     this.dx = -this.dx;
        // }
        // if(this.absx > uS - this.size/2){
        //     this.absx = uS - this.size/2;
        //     this.dx = -this.dx;
        // }

        if(this.absx < -uS - this.size/2){
            this.onPicked();
        }
        if(this.absx > uS + this.size/2){
            this.onPicked();
        }

        // if(this.node.y < -uS + this.size/2){
        //     this.node.y= -uS + this.size/2;
        //     this.dy = -this.dy;
        // }
        // if(this.node.y > uS - this.size/2){
        //     this.node.y = uS - this.size/2;
        //     this.dy = -this.dy;
        // }

        // if (this.getPlayerDistance() < (this.size + this.player.defaultSize)/2) {
        //     // invoke collecting behavior
        //     this.onPicked();
        //     return;
        // }
    },

    start () {

    },
});
