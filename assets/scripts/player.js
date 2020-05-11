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
        absx: {
            type: cc.Float,
            default: 0,
        },
        absy: {
            type: cc.Float,
            default: 0,
        },
        friction: { //how this object slows down while moving over time
            type: cc.Float,
            default: 0.98,
        },
        size: { //corresponds to base size of circles
            default: 90,
            type: cc.Float,
        },
        id: {
            type: cc.Integer,
            default: -1,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.width = this.size;
        this.node.height = this.size;
        this.id = -1;

        this.node.parent.on(cc.Node.EventType.MOUSE_DOWN,(e)=>{
            var loc = e.getLocation()
            var temp_x = loc.x - cc.winSize.width/2;
            var temp_y = loc.y - cc.winSize.height/2;
            var n = this.norm(temp_x, temp_y);
            this.dx -= temp_x/n;
            this.dy -= temp_y/n;
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
        // this.node.width = this.currentSize;
        // this.node.height = this.currentSize;
        // this.currentSize *= this.shrink;
        // console.log(this.currentSize);
        // this.node.parent.scale = (this.size/this.currentSize); //So this works, but now I need a better way to dynamically generate food of different sizes
        this.absx += this.dx;
        this.absy += this.dy;

        uS = this.game.universeSize;

        if(this.absx < -uS + this.size/2){
            this.absx = -uS + this.size/2;
            this.dx = -this.dx;
        }
        if(this.absx > uS - this.size/2){
            this.absx = uS - this.size/2;
            this.dx = -this.dx;
        }
        // this.dx *= this.friction;
        // this.dy *= this.friction;
    },

    onCollisionEnter: function (other, self) {
        console.log('collision occured');
        other_obj = other.node.getComponent('food');

        var this_dx = this.dx;
        var this_dy = this.dy;
        var that_dx = other_obj.dx;
        var that_dy = other_obj.dy;

        var this_absx = this.absx;
        var this_absy = this.absy;
        var that_absx = other_obj.absx;
        var that_absy = other_obj.absy;

        var this_mass = this.size * this.size;
        var that_mass = other_obj.size * other_obj.size;

        var normal_x = that_absx - this_absx;
        var normal_y = that_absy - this_absy;


        var norm = Math.sqrt((normal_x*normal_x) + (normal_y*normal_y));
        normal_x /= norm;
        normal_y /= norm; //points from center of this to center of that

        var this_normal = this_dx * normal_x + this_dy * normal_y;
        var that_normal = that_dx * normal_x + that_dy * normal_y;
        var this_perp_x = this_dx - this_normal * normal_x;
        var this_perp_y = this_dy - this_normal * normal_y;
        var that_perp_x = that_dx - that_normal * normal_x;
        var that_perp_y = that_dy - that_normal * normal_y;
        
        var plus = this_mass + that_mass;
        var minus = this_mass - that_mass;

        var new_this_normal = (minus/plus)*this_normal + (2*that_mass/plus)*that_normal
        var new_that_normal = (2*this_mass/plus)*this_normal - (minus/plus)*that_normal

        this.dx = this_perp_x + new_this_normal*normal_x
        this.dy = this_perp_y + new_this_normal*normal_y
        other_obj.dx = that_perp_x + new_that_normal*normal_x;
        other_obj.dy = that_perp_y + new_that_normal*normal_y;
         
    },

    // set_rotation() { //helper method if we want our player to point in the direction of motion
    //     angle = 0
    //     if(this.x == 0){
    //         if(this.y < 0){
    //             angle = 270;
    //         } else {
    //             angle = 90;
    //         }
    //     } else {
    //         angle = Math.atan(this.y/this.x) *  180.0 / Math.PI;
    //         if(this.x < 0){
    //             angle += 180
    //             angle %= 360
    //         }
    //     }
    //     this.node.angle = (angle + 180) % 360;
    // },  
});
