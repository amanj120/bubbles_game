// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    
    onLoad () {
        this.node.parent.on(cc.Node.EventType.MOUSE_DOWN,(e)=>{
            cc.director.loadScene("game");
        });
    },

    start () {

    },

    // update (dt) {},
});
