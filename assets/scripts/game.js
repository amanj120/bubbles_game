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
        for(var i = 0; i < this.numFood; i++){
            this.spawnNewStar();
        }
    },

    spawnNewStar: function() {
        var newFood = cc.instantiate(this.foodPrefab);
        this.node.addChild(newFood);
        newFood.setPosition(this.getNewStarPosition());

        var pl = this.player.getComponent('player');
        var fd =  newFood.getComponent('food');
        // put the newly added node under the Canvas node
        
        // set up a random position for the star
        
        // Staging a reference of Game object on a star component
        fd.game = this;
        fd.dx = (Math.random() - 0.5);
        fd.dy = (Math.random() - 0.5);
        fd.size = Math.pow(Math.random(),2) * pl.sizeInPixels * 4; 
        //up to 4 times as big as player, half of them are edible from the get go. Too many small ones 
        fd.player = pl;
    },

    getNewStarPosition: function () {
        var maxX = this.node.width/2;
        var maxY = this.node.height/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        randY = (Math.random() - 0.5) * 2 * maxY;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    start () {

    },
});
