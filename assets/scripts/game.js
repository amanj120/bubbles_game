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
        for(var i = 0; i < this.numFood; i++){
            this.spawnNewStar(i);
        }
    },

    spawnNewStar: function(id_num) {
        var newFood = cc.instantiate(this.foodPrefab);
        
        var pl = this.player.getComponent('player');
        var fd =  newFood.getComponent('food');
        // put the newly added node under the Canvas node
        
        // set up a random position for the star
        
        // Staging a reference of Game object on a star component
        fd.game = this;
        pl.game = this;
        fd.dx = (Math.random() - 0.5);
        fd.dy = (Math.random() - 0.5);
        fd.absx = (Math.random()-0.5) * this.universeSize * 2;
        fd.absy = pl.absy + ((Math.random()-0.5) * this.universeSize * 2);
        var s = (Math.pow(Math.random(),2)+0.125) * pl.size * (16/9); 
        fd.node.width = s
        fd.node.height = s
        fd.size = s
        //up to 2.25 times as big as player, half of them are smaller than the player, all are at least half the size of the player 
        fd.id = id_num;
        fd.player = pl;
        fd.node.x = fd.absx - pl.absx;
        fd.node.y = fd.absy - pl.absy;

        fd.node.getComponent(cc.CircleCollider).radius = 0.7 * (fd.size/2);

        this.node.addChild(newFood);

    },

    start () {

    },
});
