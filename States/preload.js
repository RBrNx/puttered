/**
 * Created by b00231929 on 20/03/2015.
 */
var preload = function(game){};

preload.prototype = {
    preload: function(){
            var loadingBar = this.add.sprite(this.game.world.width/2, this.game.world.height/2, "Loading");
            loadingBar.anchor.setTo(0.5,0.5);
            this.load.setPreloadSprite(loadingBar);
        this.game.load.image("Logo", "Graphics/Logo.png");
        this.game.load.image("Clouds", "Graphics/Background/Background-Clouds.png");
        this.game.load.image("Hills", "Graphics/Background/Background-Hills.png");

        this.game.load.image("PlayButtonUp", "Graphics/Buttons/Play-Up.png");
        this.game.load.image("PlayButtonDown", "Graphics/Buttons/Play-Down.png");
        this.game.load.image("OpButtonUp", "Graphics/Buttons/Options-Up.png");
        this.game.load.image("OpButtonDown", "Graphics/Buttons/Options-Up.png");
        this.game.load.image("BackUp", "Graphics/Buttons/Back-Up.png");
    },
    create: function(){
        this.game.state.start("MainMenu");
    }
};