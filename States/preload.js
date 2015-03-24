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

        this.game.load.spritesheet("Play", "Graphics/Buttons/Play-Button.png", 400, 150);
        this.game.load.spritesheet("Options", "Graphics/Buttons/Options-Button.png", 400, 150);
        this.game.load.spritesheet("Back", "Graphics/Buttons/Back-Button.png", 400, 150);
        this.game.load.spritesheet("SoundOn", "Graphics/Buttons/Sound-On-Button.png", 150, 150);
        this.game.load.spritesheet("SoundOff", "Graphics/Buttons/Sound-Off-Button.png", 150, 150);
        this.game.load.spritesheet("MusicOn", "Graphics/Buttons/Music-On-Button.png", 150, 150);
        this.game.load.spritesheet("MusicOff", "Graphics/Buttons/Music-Off-Button.png", 150, 150);
    },
    create: function(){
        this.game.state.start("MainMenu");
    }
};