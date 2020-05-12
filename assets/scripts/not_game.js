cc.Class({
    extends: cc.Component,

    onLoad () {
        this.node.parent.on(cc.Node.EventType.MOUSE_DOWN,(e)=>{
            cc.director.loadScene("game");
        });

        this.node.parent.on(cc.Node.EventType.TOUCH_START,(e)=>{
            cc.director.loadScene("game");
        });

    },

    start () {

    },
});
