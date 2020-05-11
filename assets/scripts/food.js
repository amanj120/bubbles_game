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

    update: function (dt) {
        // judge if the distance between the star and main character is less than the collecting distance for each frame
        this.absx += this.dx;
        this.absy += this.dy;

        this.node.x = this.absx - this.player.absx;
        this.node.y = this.absy - this.player.absy;

        // this.node.width = this.size;
        // this.node.height = this.size;

        uS = this.game.universeSize;

        // if(this.absx < -uS - this.size/2){
        //     this.onPicked();
        // }
        // if(this.absx > uS + this.size/2){
        //     this.onPicked();
        // }

        var rad = this.getComponent(cc.CircleCollider).radius

        if(this.absx < -uS + rad){
            this.absx = -uS + rad;
            this.dx = -this.dx;
        }
        if(this.absx > uS - rad){
            this.absx = uS - rad;
            this.dx = -this.dx;
        }


        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDrawBoundingBox = true;
        manager.enabledDebugDraw = true;


        // if(this.node.y < -uS + this.size/2){
        //     this.node.y= -uS + this.size/2;
        //     this.dy = -this.dy;
        // }
        // if(this.node.y > uS - this.size/2){
        //     this.node.y = uS - this.size/2;
        //     this.dy = -this.dy;
        // }

        // if (this.getPlayerDistance() < (this.size + this.player.size)/2) {
        //     // invoke collecting behavior
        //     this.onPicked();
        //     return;
        // }
    },

    onCollisionEnter: function (other, self) {
        if(other.node.group == "default"){
            other_obj = other.node.getComponent('food');

            if(this.id < other_obj.id){
                console.log('collision occured');

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
            }
        }
    },

    start () {

    },
});
