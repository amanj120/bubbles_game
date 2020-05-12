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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.width = this.size;
        this.node.height = this.size;
        this.node.getComponent(cc.CircleCollider).radius = 0.75 * (this.size/2);

        this.node.parent.on(cc.Node.EventType.MOUSE_DOWN,(e)=>{
            var loc = e.getLocation()
            var temp_x = loc.x - cc.winSize.width/2;
            var temp_y = loc.y - cc.winSize.height/2;
            var n = this.norm(temp_x, temp_y);
            this.dx -= 2*temp_x/n;
            this.dy -= 2*temp_y/n;
        });

        this.node.parent.on(cc.Node.EventType.TOUCH_START,(e)=>{
            var loc = e.getLocation()
            var temp_x = loc.x - cc.winSize.width/2;
            var temp_y = loc.y - cc.winSize.height/2;
            var n = this.norm(temp_x, temp_y);
            this.dx -= 2*temp_x/n;
            this.dy -= 2*temp_y/n;
        });
    },

    norm(x,y){
        return Math.sqrt((x*x) + (y*y));
    },

    start () {
        
    },

    update: function (dt) {
        this.absx += this.dx;
        this.absy += this.dy;

        var uS = this.game.universeSize;
        var rad = this.getComponent(cc.CircleCollider).radius

        if(this.absx < -uS + rad){
            this.absx = -uS + rad;
            this.dx = -this.dx;
        }
        if(this.absx > uS - rad){
            this.absx = uS - rad;
            this.dx = -this.dx;
        }

        this.dx *= this.friction;
        this.dy *= this.friction;
    },

    onCollisionEnter: function (other, self) {
        a = this.node.getComponent('player')
        b = other.node.getComponent('food');
        this.game.elastic(a, b);
    },

});
