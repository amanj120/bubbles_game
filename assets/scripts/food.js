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
        },
    },

    onLoad: function(){
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDrawBoundingBox = false;
        manager.enabledDebugDraw = false;
    },

    update: function (dt) {
        this.absx += this.dx;
        this.absy += this.dy;

        this.node.x = this.absx - this.player.absx;
        this.node.y = this.absy - this.player.absy;

        var g = this.game;
        var uS = g.universeSize;

        var rad = this.getComponent(cc.CircleCollider).radius;

        if(this.absx < -uS + rad){
            this.absx = -uS + rad;
            this.dx = -this.dx;
        }
        if(this.absx > uS - rad){
            this.absx = uS - rad;
            this.dx = -this.dx;
        }

        if(this.absy - this.line.absy <= -rad || this.absy - this.player.absy >= (5 * this.node.parent.height)){//too far below or above
            this.respawn();
        }

    },

    respawn() {
        var g = this.game;
        var uS = g.universeSize;
        this.absx = (Math.random()-0.5) * uS * 2;
        this.absy = this.player.absy + (Math.random()*2 + 1) * this.node.parent.height;
        this.node.x = this.absx - this.player.absx;
        this.node.y = this.absy - this.player.absy;
        var s = (Math.pow(Math.random(),2)+(1/4)) * this.player.size * 2;
        var speedFactor = Math.pow((2 * this.player.size/s),2);  //smaller things have about the same kinetic energy
        this.dx = (Math.random() - 0.5) * speedFactor;
        this.dy = (Math.random() - 0.5) * speedFactor;
        this.node.width = s;
        this.node.height = s;
        this.size = s;
        this.node.getComponent(cc.CircleCollider).radius = 0.75 * (s/2);
    },

    onCollisionEnter: function (other, self) {
        if(other.node.group == "default"){
            var a = this.node.getComponent('food');
            var b = other.node.getComponent('food');
            if(a.id < b.id){
                this.game.elastic(a, b);
            }
        }
    },

    onCollisionStay: function (other, self) {
        if(other.node.group == "default"){
            var a = this.node.getComponent('food');
            var b = other.node.getComponent('food');
            var dist = Math.sqrt(Math.pow((a.absx-b.absx),2) + Math.pow((a.absy-b.absy),2));
            var radii = a.node.getComponent(cc.CircleCollider).radius + b.node.getComponent(cc.CircleCollider).radius;
            if(dist-radii < -3 && a.id < b.id){
                //if they are more than 3 pixels into each other then delete, otherwise it might just be a bounce
                this.respawn();
            }
        }
    },

    start () {

    },
});
