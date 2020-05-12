// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    
    properties: {
        foodPrefab: {
            default: null,
            type: cc.Prefab,
        },
        player: {
            default: null,
            type: cc.Node,
        },
        line: {
            default: null,
            type: cc.Node,
        },
        background: {
            default: null,
            type: cc.Node,
        },
        numFood: {
            default: 20,
            type: cc.Integer,
        },
        universeSize: {
            default: 500,
            type: cc.Integer,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.background.getComponent('background').player = this.player.getComponent('player');
        this.line.getComponent('line').player = this.player.getComponent('player');
        for(var i = 0; i < this.numFood; i++){
            this.spawnNewStar(i);
        }
    },

    spawnNewStar: function(id_num) {
        var newFood = cc.instantiate(this.foodPrefab);
        
        var pl = this.player.getComponent('player');
        var fd =  newFood.getComponent('food');
        var ln = this.line.getComponent("line");
        // put the newly added node under the Canvas node
        
        // set up a random position for the star
        
        // Staging a reference of Game object on a star component
        fd.game = this;
        pl.game = this;
        fd.line = ln;
        fd.player = pl;

        // fd.dx = (Math.random() - 0.5);
        // fd.dy = (Math.random() - 0.5);
        // fd.absx = (Math.random()-0.5) * this.universeSize * 2;
        // fd.absy = pl.absy + ((Math.random()-0.5) * this.universeSize * 2);
        // var s = (Math.pow(Math.random(),2)+0.125) * pl.size * (16/9); 
        // fd.node.width = s
        // fd.node.height = s
        // fd.size = s
        // //up to 2.25 times as big as player, half of them are smaller than the player, all are at least half the size of the player 
        fd.id = id_num;
        // fd.node.x = fd.absx - pl.absx;
        // fd.node.y = fd.absy - pl.absy;

        // fd.node.getComponent(cc.CircleCollider).radius = 0.75 * (s/2);
        fd.absy = ln.absy - this.universeSize;
        this.node.addChild(newFood);

    },

    elastic: function (a, b){
        console.log("collision occured");

        var a_dx = a.dx;
        var a_dy = a.dy;
        var b_dx = b.dx;
        var b_dy = b.dy;

        var a_absx = a.absx;
        var a_absy = a.absy;
        var b_absx = b.absx;
        var b_absy = b.absy;

        var a_mass = a.size * a.size;
        var b_mass = b.size * b.size;

        var normal_x = b_absx - a_absx;
        var normal_y = b_absy - a_absy;


        var norm = Math.sqrt((normal_x*normal_x) + (normal_y*normal_y));
        normal_x /= norm;
        normal_y /= norm; //points from center of a to center of b

        var a_normal = a_dx * normal_x + a_dy * normal_y;
        var b_normal = b_dx * normal_x + b_dy * normal_y;
        var a_perp_x = a_dx - a_normal * normal_x;
        var a_perp_y = a_dy - a_normal * normal_y;
        var b_perp_x = b_dx - b_normal * normal_x;
        var b_perp_y = b_dy - b_normal * normal_y;
        
        var plus = a_mass + b_mass;
        var minus = a_mass - b_mass;

        var new_a_normal = (minus/plus)*a_normal + (2*b_mass/plus)*b_normal
        var new_b_normal = (2*a_mass/plus)*a_normal - (minus/plus)*b_normal

        a.dx = a_perp_x + new_a_normal*normal_x
        a.dy = a_perp_y + new_a_normal*normal_y
        b.dx = b_perp_x + new_b_normal*normal_x;
        b.dy = b_perp_y + new_b_normal*normal_y;
    },

    start () {

    },
});
