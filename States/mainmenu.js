/**
 * Created by b00231929 on 20/03/2015.
 */
var mainMenu = function(game){};
var Clouds;
var Play;
var Options;
var Back;
var MusicOn;
var MusicOff;
var SoundOn;
var SoundOff;
var Level1;
var Level2;
var RoomNumber;

var Sound;
var Music;
var MusicControl

mainMenu.prototype = {
    create: function(){
        Clouds = this.game.add.tileSprite(0,0, 1920, 1080, "Clouds");
        var Hills = this.game.add.sprite(0,0,"Hills");
        var Logo = this.game.add.sprite(this.game.world.width/2, this.game.world.height/4, "Logo");
        Logo.anchor.setTo(0.5, 0.5);
        Logo.scale.set(0.5, 0.5);

        Play = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY, "Play", this.LevelSelect, this, 0, 0, 1, 0);
        Options = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY+200, "Options", this.StartOptions, this, 0, 0, 1, 0);

        MusicControl = this.game.sound.play("MainMenuMusic");
        Music = true;
        Sound = true;

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
        //this.game.debug.inputInfo(32, 32);
    },

    StartOptions: function(){
        Back = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY + 100, "Back", this.GoBack, this, 0, 0, 1, 0);

        if(Music == true) MusicOn = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY - 100, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0);
        if(Sound == true) SoundOn = this.game.add.button(this.game.world.centerX + 50, this.game.world.centerY - 100, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0);
        if(Music == false) MusicOff = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY - 100, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0);
        if(Sound == false) SoundOff = this.game.add.button(this.game.world.centerX + 50, this.game.world.centerY - 100, "SoundOff", this.TurnSoundOn, this, 0, 0, 1, 0);
        Play.destroy();
        Options.destroy();

        RoomNumber = 2;
    },

    LevelSelect: function(){
        Play.destroy();
        Options.destroy();

        Back = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY + 200, "Back", this.GoBack, this, 0, 0, 1, 0);
        Level1 = this.game.add.button(this.game.world.centerX, this.game.world.centerY+75, "Level1", this.GoToLevel1, this, 0, 0, 1, 0);
        Level2 = this.game.add.button(Level1.x+480, this.game.world.centerY+75, "Level2", this.GoToLevel2, this, 0, 0, 1, 0);
        Level1.anchor.setTo(0.5, 0.5);
        Level2.anchor.setTo(0.5, 0.5);
        Level1.inputEnabled = true;
        Level2.inputEnabled = true;

        RoomNumber = 3;

        Level1.events.onInputUp.add(this.GoToLevel1);
        /*Level2.events.onInputOver.add(function(){
            this.game.state.start("GameState")
        });*/


    },

    GoBack: function(){
        Play = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY, "Play", this.LevelSelect, this, 0, 0, 1, 0);
        Options = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY+200, "Options", this.StartOptions, this, 0 ,0, 1, 0);

        Back.destroy();
        if (MusicOn != undefined) MusicOn.destroy();
        if (MusicOff != undefined) MusicOff.destroy();
        if (SoundOn != undefined) SoundOn.destroy();
        if (SoundOff != undefined) SoundOff.destroy();
        if (Level1 != undefined) Level1.destroy();
        if (Level2 != undefined) Level2.destroy();

        RoomNumber = 1;
    },

    TurnMusicOff: function(){
        MusicOff = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY -100, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0);
        MusicOn.destroy();
        Music = false;
        //Turn Music Off here
        MusicControl.stop("MainMenuMusic");
    },

    TurnMusicOn: function(){
        MusicOn = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY - 100, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0);
        MusicOff.destroy();
        Music = true;
        //Turn Music On here
        MusicControl.play("MainMenuMusic");
    },

    TurnSoundOff: function(){
        SoundOff = this.game.add.button(this.game.world.centerX+50, this.game.world.centerY - 100, "SoundOff", this.TurnSoundOn, this, 0, 0, 1, 0);
        SoundOn.destroy();
        Sound = false;
        //Turn Sound Off here
    },

    TurnSoundOn: function() {
        SoundOn = this.game.add.button(this.game.world.centerX + 50, this.game.world.centerY - 100, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0);
        SoundOff.destroy();
        Sound = true;
        //Turn Sound On here
    },

    GoToLevel1: function(){
        MusicControl.stop("MainMenuMusic");
        this.game.state.start("GameState");
    },

    GoToLevel2: function(){
        //this.game.state.start("GameState")
    }
};