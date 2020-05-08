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
        friction: { //how this object slows down while moving over time
            type: cc.Float,
            default: 0.98,
        },
        shrink: { //how this object loses mass when it doesn't eat
            type: cc.Float,
            default: 0.98,
        },
        playerSize: { //how big the player is (multiply by sizeInPixels to get size of this in pixels)
            type: cc.Float,
            default: 1,
        },
        sizeInPixels: { //corresponds to base size of circles
            default: 90,
            type: cc.Integer,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.parent.on(cc.Node.EventType.MOUSE_DOWN,(e)=>{
            var loc = e.getLocation()
            var temp_x = loc.x - cc.winSize.width/2 - this.node.x;
            var temp_y = loc.y - cc.winSize.height/2 - this.node.y;
            var n = this.norm(temp_x, temp_y);
            this.dx += temp_x/n;
            this.dy += temp_y/n;
        });
    },

    norm(x,y){
        return Math.sqrt((x*x) + (y*y));
    },

    start () {
        
    },

    update (dt) {
        // this.node.x -= this.dx; //change to += to move towards the mouse
        // this.node.y -= this.dy;

        this.dx *= this.friction;
        this.dy *= this.friction;
    },

    set_rotation() { //helper method if we want our player to point in the direction of motion
        angle = 0
        if(this.x == 0){
            if(this.y < 0){
                angle = 270;
            } else {
                angle = 90;
            }
        } else {
            angle = Math.atan(this.y/this.x) *  180.0 / Math.PI;
            if(this.x < 0){
                angle += 180
                angle %= 360
            }
        }
        this.node.angle = (angle + 180) % 360;
    },  
});
