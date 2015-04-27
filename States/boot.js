/**
 * Created by b00231929 on 20/03/2015.
 */
       var boot = function(game){
        console.log("%cStarting the Game", "color:white; background:red");
};

boot.prototype = {
    //Loads data for loading screen
    preload: function(){
        this.game.load.image("Loading","Graphics/Loading.png");
    },
    //sets up game canvas
    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.setScreenSize();
        this.game.state.start("Preload");
    }
};