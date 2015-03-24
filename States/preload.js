/**
 * Created by b00231929 on 20/03/2015.
 */
var preload = function(game){}

preload.prototype = {
    preload: function(){
            var loadingBar = this.add.sprite(this.game.world.width/2, this.game.world.height/2, "Loading");
            loadingBar.anchor.setTo(0.5,0.5);
            this.load.setPreloadSprite(loadingBar);
        this.game.load.image("Logo", "Graphics/Logo.png")
    },
    create: function(){
        this.game.state.start("MainMenu");
    }
}