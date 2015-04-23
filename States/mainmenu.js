/**
 * Created by b00231929 on 20/03/2015.
 */
var mainMenu = function(game){};
var Clouds;
var Play;
var PlayText;
var Options;
var OptionsText;
var Back;
var BackText;
var Fullscreen;
var FullscreenText;
var MusicOn;
var MusicOff;
var SoundOn;
var SoundOff;
var Level1;
var Level2;
var RoomNumber;

var Sound = true;
var Music = false;
var MusicControl;

mainMenu.prototype = {
    create: function(){
        //Set Menu Size to 1920 x 1080
        this.game.world.setBounds(0, 0, 1280, 720);

        //Start Menu Music
        MusicControl = this.game.add.audio("MainMenuMusic", 1, true);
        if (Music == true) MusicControl.play();

        //Load Background and Logo
        Clouds = this.game.add.tileSprite(0,0, 1920, 1080, "Clouds");
        Clouds.scale.setTo(0.67);
        var Hills = this.game.add.sprite(0,0,"Hills");
        Hills.scale.setTo(0.67);
        var Logo = this.game.add.sprite(this.game.world.width/2, this.game.world.height/5, "Logo");
        Logo.anchor.setTo(0.5, 0.5);
        Logo.scale.set(0.34);


        //Create Play Button
        Play = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 75, "Button", this.LevelSelect, this, 0, 0, 1, 0);
        Play.anchor.setTo(0.5, 0.5);
        Play.scale.setTo(0.67);
        PlayText = this.game.add.bitmapText(Play.x, Play.y-8, "8Bit", "Play", 84);
        PlayText.anchor.setTo(0.5, 0.5);
        PlayText.scale.setTo(0.67);

        //Create Options Button
        Options = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200, "Button", this.StartOptions, this, 0, 0, 1, 0);
        Options.anchor.setTo(0.5, 0.5);
        Options.scale.setTo(0.67);
        OptionsText = this.game.add.bitmapText(Options.x, Options.y-5, "8Bit", "Options", 52);
        OptionsText.anchor.setTo(0.5, 0.5);
        OptionsText.scale.setTo(0.67);

        //Set Room Number to Main Menu
        RoomNumber = 1;
    },

    update: function(){
        Clouds.tilePosition.x += 1;

        if (RoomNumber = 3) {
            if (Level2 != undefined && Level1 != undefined) {

                if (this.game.input.activePointer.isDown) {
                    if (this.game.origDragPoint) {
                        // move the camera by the amount the mouse has moved since last update
                        Level1.x -= this.game.origDragPoint.x - this.game.input.activePointer.position.x;
                        Level2.x -= this.game.origDragPoint.x - this.game.input.activePointer.position.x;
                    }
                    // set new drag origin to current position
                    this.game.origDragPoint = this.game.input.activePointer.position.clone();
                }
                else {
                    this.game.origDragPoint = null;
                }
                this.game.input.onUp.add(function () {
                    if (Math.pow(Level1.x - 640, 2) < Math.pow(Level2.x - 640, 2)) {
                        Level1.x = 640;
                        Level2.x = 960;
                    }
                    if (Math.pow(Level1.x - 640, 2) > Math.pow(Level2.x - 640, 2)) {
                        Level1.x = 320;
                        Level2.x = 640
                    }

                });
            }
        }

    },

    render: function(){
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
    },

    StartOptions: function(){
        Back = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200, "Button", this.GoBack, this, 0, 0, 1, 0);
        Back.anchor.setTo(0.5, 0.5);
        Back.scale.setTo(0.67);
        BackText = this.game.add.bitmapText(Back.x, Back.y-10, "8Bit", "Back", 84);
        BackText.anchor.setTo(0.5, 0.5);
        BackText.scale.setTo(0.67);

        Fullscreen = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 75, "Button", this.Fullscreen, this, 0 ,0 ,1, 0);
        Fullscreen.anchor.setTo(0.5, 0.5);
        Fullscreen.scale.setTo(0.67);
        FullscreenText = this.game.add.bitmapText(Fullscreen.x, Fullscreen.y-5, "8Bit", "Fullscreen", 36);
        FullscreenText.anchor.setTo(0.5, 0.5);
        FullscreenText.scale.setTo(0.67);

        if(Music == true){
            MusicOn = this.game.add.button(this.game.world.centerX - 135, this.game.world.centerY - 100, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0);
            MusicOn.scale.setTo(0.67);
        }
        if(Sound == true){
            SoundOn = this.game.add.button(this.game.world.centerX + 25, this.game.world.centerY - 100, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0);
            SoundOn.scale.setTo(0.67);
        }
        if(Music == false) {
            MusicOff = this.game.add.button(this.game.world.centerX - 135, this.game.world.centerY - 100, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0);
            MusicOff.scale.setTo(0.67);
        }
        if(Sound == false) {
            SoundOff = this.game.add.button(this.game.world.centerX + 25, this.game.world.centerY - 100, "SoundOff", this.TurnSoundOn, this, 0, 0, 1, 0);
            SoundOff.scale.setTo(0.67);
        }
        Play.destroy();
        PlayText.destroy();
        Options.destroy();
        OptionsText.destroy();

        //Set Room Number to Options
        RoomNumber = 2;
    },

    LevelSelect: function(){
        Play.destroy();
        PlayText.destroy();
        Options.destroy();
        OptionsText.destroy();

        Back = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200, "Button", this.GoBack, this, 0, 0, 1, 0);
        Back.anchor.setTo(0.5, 0.5);
        Back.scale.setTo(0.67);
        BackText = this.game.add.bitmapText(Back.x, Back.y-10, "8Bit", "Back", 84);
        BackText.anchor.setTo(0.5, 0.5);
        BackText.scale.setTo(0.67);

        Level1 = this.game.add.button(this.game.world.centerX, this.game.world.centerY +75, "Level1", this.GoToCourse1, this, 0, 0, 1, 0);
        Level2 = this.game.add.button(Level1.x+320, this.game.world.centerY+75, "Level2", this.GoToCourse2, this, 0, 0, 1, 0);
        Level1.anchor.setTo(0.5, 0.5);
        Level1.scale.setTo(0.67);
        Level2.anchor.setTo(0.5, 0.5);
        Level2.scale.setTo(0.67);
        Level1.inputEnabled = true;
        //Level2.inputEnabled = true;

        //Set Room Number to Level Select
        RoomNumber = 3;

        Level1.events.onInputUp.add(this.GoToCourse1);
        /*Level2.events.onInputOver.add(function(){
            this.game.state.start("GameState")
        });*/


    },

    GoBack: function(){
        //Create Play Button
        Play = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 75, "Button", this.LevelSelect, this, 0, 0, 1, 0);
        Play.anchor.setTo(0.5, 0.5);
        Play.scale.setTo(0.67);
        PlayText = this.game.add.bitmapText(Play.x, Play.y-8, "8Bit", "Play", 84);
        PlayText.anchor.setTo(0.5, 0.5);
        PlayText.scale.setTo(0.67);

        //Create Options Button
        Options = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200, "Button", this.StartOptions, this, 0, 0, 1, 0);
        Options.anchor.setTo(0.5, 0.5);
        Options.scale.setTo(0.67);
        OptionsText = this.game.add.bitmapText(Options.x, Options.y - 5, "8Bit", "Options", 52);
        OptionsText.anchor.setTo(0.5, 0.5);
        OptionsText.scale.setTo(0.67);

        Back.destroy();
        BackText.destroy();
        if (Fullscreen != undefined) Fullscreen.destroy();
        if (FullscreenText != undefined)FullscreenText.destroy();
        if (MusicOn != undefined) MusicOn.destroy();
        if (MusicOff != undefined) MusicOff.destroy();
        if (SoundOn != undefined) SoundOn.destroy();
        if (SoundOff != undefined) SoundOff.destroy();
        if (Level1 != undefined) Level1.destroy();
        if (Level2 != undefined) Level2.destroy();

        RoomNumber = 1;
    },

    TurnMusicOff: function(){
        MusicOff = this.game.add.button(this.game.world.centerX - 135, this.game.world.centerY - 100, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0); MusicOff.scale.setTo(0.67);
        MusicOn.destroy();
        Music = false;
        //Turn Music Off here
        MusicControl.pause();
    },

    TurnMusicOn: function(){
        MusicOn = this.game.add.button(this.game.world.centerX - 135, this.game.world.centerY - 100, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0); MusicOn.scale.setTo(0.67);
        MusicOff.destroy();
        Music = true;
        //Turn Music On here
        MusicControl.play();

    },

    TurnSoundOff: function(){
        SoundOff = this.game.add.button(this.game.world.centerX + 25, this.game.world.centerY - 100, "SoundOff", this.TurnSoundOn, this, 0, 0, 1, 0); SoundOff.scale.setTo(0.67);
        SoundOn.destroy();
        Sound = false;
        //Turn Sound Off here
    },

    TurnSoundOn: function() {
        SoundOn = this.game.add.button(this.game.world.centerX + 25, this.game.world.centerY - 100, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0); SoundOn.scale.setTo(0.67);
        SoundOff.destroy();
        Sound = true;
        //Turn Sound On here
    },

    GoToCourse1: function(){
        MusicControl.stop();
        Level1.destroy();
        Level2.destroy();
        Back.destroy();
        BackText.destroy();
        this.game.state.start("Level6");
    },

    GoToCourse2: function(){
        //this.game.state.start("GameState")
    },

    Fullscreen: function () {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.refresh();

        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        } else {
            this.game.scale.startFullScreen();
        }
    }

};