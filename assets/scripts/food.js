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

        uS = this.game.universeSize;

        var rad = this.getComponent(cc.CircleCollider).radius

        if(this.absx < -uS + rad){
            this.absx = -uS + rad;
            this.dx = -this.dx;
        }
        if(this.absx > uS - rad){
            this.absx = uS - rad;
            this.dx = -this.dx;
        }

        // if(this.absy < -uS + rad){
        //     this.absy = -uS + rad;
        //     this.dy = -this.dy;
        // }
        // if(this.absy > uS - rad){
        //     this.absy = uS - rad;
        //     this.dy = -this.dy;
        // }

        if(this.absy - this.line.absy <= -rad){
            this.dx = (Math.random() - 0.5);
            this.dy = (Math.random() - 0.5);
            this.absx = (Math.random()-0.5) * uS * 2;
            this.absy = this.player.absy + (Math.random()*2 + 1) * this.node.parent.height;
            this.node.x = this.absx - this.player.absx;
            this.node.y = this.absy - this.player.absy;
            var s = (Math.pow(Math.random(),2)+0.125) * this.player.size * (16/9); 
            this.node.width = s
            this.node.height = s
            this.size = s
            this.node.getComponent(cc.CircleCollider).radius = 0.75 * (s/2);
        }

    },

    onCollisionEnter: function (other, self) {
        if(other.node.group == "default"){
            a = this.node.getComponent('food')
            b = other.node.getComponent('food');
            if(a.id < b.id){
                this.game.elastic(a, b);
            }
        }
    },

    start () {

    },
});
