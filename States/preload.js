/**
 * Created by B00231929 & B00236216.
 */
var preload = function(game){};

preload.prototype = {
    /**
     * Pre-loads data for main menu
     */
    preload: function(){
        var loadingBar = this.add.sprite(this.game.world.width/2, this.game.world.height/2, "Loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);

        this.game.time.advancedTiming = true;

        this.game.load.audio("MainMenuMusic", "Music/MainMenu.ogg");
        this.game.load.audio("Course1Music", "Music/Course1.ogg");
        this.game.load.audio("Course2Music", "Music/Course2.ogg");
        this.game.load.image("Logo", "Graphics/Logo-Resized.png");
        this.game.load.image("Clouds", "Graphics/Background/Background-Clouds.png");
        this.game.load.image("Hills", "Graphics/Background/Background-Hills4.png");
        this.game.load.image("Hills1", "Graphics/Background/Background-Hills.png");

        this.game.load.spritesheet("Button", "Graphics/Buttons/Button.png", 400, 150);
        this.game.load.spritesheet("SoundOn", "Graphics/Buttons/Sound-On-Button.png", 150, 150);
        this.game.load.spritesheet("SoundOff", "Graphics/Buttons/Sound-Off-Button.png", 150, 150);
        this.game.load.spritesheet("MusicOn", "Graphics/Buttons/Music-On-Button.png", 150, 150);
        this.game.load.spritesheet("MusicOff", "Graphics/Buttons/Music-Off-Button.png", 150, 150);
        this.game.load.spritesheet("Level1", "Graphics/Buttons/Level-1-Button.png", 150, 150);
        this.game.load.spritesheet("Level2", "Graphics/Buttons/Level-2-Button.png", 150, 150);
        this.game.load.bitmapFont("8Bit", "Fonts/8Bit.png", "Fonts/8Bit.fnt");
        this.game.load.bitmapFont("8Bit2", "Fonts/8Bit-White.png", "Fonts/8Bit-White.fnt");
        this.game.load.image("BackgroundP", "Graphics/Background/Background-Pause.png");
        this.game.load.image("Scoreboard", "Graphics/Background/Scoreboard.png");
    },
    /**
     * Loads main menu
     */
    create: function(){
        this.game.state.start("MainMenu");
    }
};