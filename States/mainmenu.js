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
var MusicOn;
var MusicOff;
var SoundOn;
var SoundOff;
var Level1;
var Level2;
var RoomNumber;

var Sound = true;
var Music = true;
var MusicControl;

mainMenu.prototype = {
    create: function(){
        //Set Menu Size to 1920 x 1080
        this.game.world.setBounds(0, 0, 1920, 1080);

        //Start Menu Music
        MusicControl = this.game.add.audio("MainMenuMusic");
        if (Music == true) MusicControl.play();

        //Load Background and Logo
        Clouds = this.game.add.tileSprite(0,0, 1920, 1080, "Clouds");
        var Hills = this.game.add.sprite(0,0,"Hills");
        var Logo = this.game.add.sprite(this.game.world.width/2, this.game.world.height/4, "Logo");
        Logo.anchor.setTo(0.5, 0.5);
        Logo.scale.set(0.5, 0.5);

        //Create Play Button
        Play = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 75, "Button", this.LevelSelect, this, 0, 0, 1, 0);
        Play.anchor.setTo(0.5, 0.5);
        PlayText = this.game.add.bitmapText(Play.x, Play.y-10, "8Bit", "Play", 84);
        PlayText.anchor.setTo(0.5, 0.5);

        //Create Options Button
        Options = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 275, "Button", this.StartOptions, this, 0, 0, 1, 0);
        Options.anchor.setTo(0.5, 0.5);
        OptionsText = this.game.add.bitmapText(Options.x, Options.y-10, "8Bit", "Options", 52);
        OptionsText.anchor.setTo(0.5, 0.5);

        //Set Room Number to Main Menu
        RoomNumber = 1;
    },

    update: function(){
        Clouds.tilePosition.x += 1;

        if (RoomNumber = 3) {
            if (Level2 != undefined && Level1 != undefined) {

                //this.game.input.onDown.add(this.updateButtons, this);

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
                    if (Math.pow(Level1.x - 960, 2) < Math.pow(Level2.x - 960, 2)) {
                        Level1.x = 960;
                        Level2.x = 1440;
                    }
                    if (Math.pow(Level1.x - 960, 2) > Math.pow(Level2.x - 960, 2)) {
                        Level1.x = 480;
                        Level2.x = 960
                    }

                });
            }
        }

    },

    render: function(){
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
    },

    StartOptions: function(){
        Back = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 275, "Button", this.GoBack, this, 0, 0, 1, 0);
        Back.anchor.setTo(0.5, 0.5);
        BackText = this.game.add.bitmapText(Back.x, Back.y-10, "8Bit", "Back", 84);
        BackText.anchor.setTo(0.5, 0.5);

        if(Music == true) MusicOn = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0);
        if(Sound == true) SoundOn = this.game.add.button(this.game.world.centerX + 50, this.game.world.centerY, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0);
        if(Music == false) MusicOff = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0);
        if(Sound == false) SoundOff = this.game.add.button(this.game.world.centerX + 50, this.game.world.centerY, "SoundOff", this.TurnSoundOn, this, 0, 0, 1, 0);
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

        Back = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 275, "Button", this.GoBack, this, 0, 0, 1, 0);
        Back.anchor.setTo(0.5, 0.5);
        BackText = this.game.add.bitmapText(Back.x, Back.y-10, "8Bit", "Back", 84);
        BackText.anchor.setTo(0.5, 0.5);

        Level1 = this.game.add.button(this.game.world.centerX, this.game.world.centerY+75, "Level1", this.GoToLevel1, this, 0, 0, 1, 0);
        Level2 = this.game.add.button(Level1.x+480, this.game.world.centerY+75, "Level2", this.GoToLevel2, this, 0, 0, 1, 0);
        Level1.anchor.setTo(0.5, 0.5);
        Level2.anchor.setTo(0.5, 0.5);
        Level1.inputEnabled = true;
        Level2.inputEnabled = true;

        //Set Room Number to Level Select
        RoomNumber = 3;

        Level1.events.onInputUp.add(this.GoToLevel1);
        /*Level2.events.onInputOver.add(function(){
            this.game.state.start("GameState")
        });*/


    },

    GoBack: function(){
        //Create Play Button
        Play = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 75, "Button", this.LevelSelect, this, 0, 0, 1, 0);
        Play.anchor.setTo(0.5, 0.5);
        PlayText = this.game.add.bitmapText(Play.x, Play.y-10, "8Bit", "Play", 84);
        PlayText.anchor.setTo(0.5, 0.5);

        //Create Options Button
        Options = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 275, "Button", this.StartOptions, this, 0, 0, 1, 0);
        Options.anchor.setTo(0.5, 0.5);
        OptionsText = this.game.add.bitmapText(Options.x, Options.y-10, "8Bit", "Options", 52);
        OptionsText.anchor.setTo(0.5, 0.5);

        Back.destroy();
        BackText.destroy();
        if (MusicOn != undefined) MusicOn.destroy();
        if (MusicOff != undefined) MusicOff.destroy();
        if (SoundOn != undefined) SoundOn.destroy();
        if (SoundOff != undefined) SoundOff.destroy();
        if (Level1 != undefined) Level1.destroy();
        if (Level2 != undefined) Level2.destroy();

        RoomNumber = 1;
    },

    TurnMusicOff: function(){
        MusicOff = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0);
        MusicOn.destroy();
        Music = false;
        //Turn Music Off here
        MusicControl.pause();
    },

    TurnMusicOn: function(){
        MusicOn = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0);
        MusicOff.destroy();
        Music = true;
        //Turn Music On here
        //MusicControl.play();
        MusicControl.resume();

    },

    TurnSoundOff: function(){
        SoundOff = this.game.add.button(this.game.world.centerX+50, this.game.world.centerY, "SoundOff", this.TurnSoundOn, this, 0, 0, 1, 0);
        SoundOn.destroy();
        Sound = false;
        //Turn Sound Off here
    },

    TurnSoundOn: function() {
        SoundOn = this.game.add.button(this.game.world.centerX + 50, this.game.world.centerY, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0);
        SoundOff.destroy();
        Sound = true;
        //Turn Sound On here
    },

    GoToLevel1: function(){
        MusicControl.stop();
        Level1.destroy();
        Level2.destroy();
        Back.destroy();
        BackText.destroy();
        this.game.state.start("GameState");

    },

    GoToLevel2: function(){
        //this.game.state.start("GameState")
    }
};