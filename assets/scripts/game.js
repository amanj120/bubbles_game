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
        score: {
            default: null,
            type: cc.Label,
        },
        maxy: {
            default: -1,
            type: cc.Integer,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        var playa = this.player.getComponent('player');
        this.background.getComponent('background').player = playa;
        this.background.getComponent('background').game = this;

       
        // self.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {}, self.node);
        // self.node.on(cc.Node.EventType.TOUCH_END, function (event) {}, self.node);

        // this.node.on(cc.Node.EventType.MOUSE_DOWN, );
        // this.node.on(cc.Node.EventType.TOUCH_START, playa.playaMoveTouch, playa);
        
        this.line.getComponent('line').player = playa;
        this.line.getComponent('line').game = this;
        playa.game = this;
        
        for(var i = 0; i < this.numFood; i++){
            this.spawn(i);
        }
    },

    spawn: function(id_num) {
        var newThing = cc.instantiate(this.foodPrefab);
        
        var pl = this.player.getComponent('player');
        var fd = newThing.getComponent('food');
        var ln = this.line.getComponent("line");

        fd.game = this;
        fd.line = ln;
        fd.player = pl;
        fd.id = id_num;
        fd.absy = ln.absy - this.universeSize; //food will take care of spawning
        this.node.addChild(newThing);
    },

    elastic: function (a, b){
        // console.log("collision occured");

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

    update: function (dt) {
        var pl = this.player.getComponent('player');
        var ln = this.line.getComponent("line");
        this.maxy = Math.trunc(Math.max(this.maxy/pl.size, pl.absy/pl.size));
        // this.score.string = ("Line Loc: " + Math.trunc((ln.absy - pl.absy)/pl.size) + " Score: " + this.maxy);
        this.score.string = (" Score: " + this.maxy);
        
    },
});
