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
var moveLeft = false;
var moveRight = false;

var Sound;
var Music;

mainMenu.prototype = {
    create: function(){
        Clouds = this.game.add.tileSprite(0,0, 1920, 1080, "Clouds");
        var Hills = this.game.add.sprite(0,0,"Hills");
        var Logo = this.game.add.sprite(this.game.world.width/2, this.game.world.height/4, "Logo");
        Logo.anchor.setTo(0.5, 0.5);
        Logo.scale.set(0.5, 0.5);

        Play = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY, "Play", this.LevelSelect, this, 0, 0, 1, 0);
        Options = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY+200, "Options", this.StartOptions, this, 0, 0, 1, 0);

        Music = true;
        Sound = true;

        RoomNumber = 1;
    },

    update: function(){
        Clouds.tilePosition.x += 1;

        if (moveLeft == true) {
            if (Level1 != undefined) {

                if (Level1.x > 480) {
                    Level1.x -= 30;
                    Level2.x -= 30;
                    } else { moveLeft = false}
                }
        }

        if (moveRight == true) {
            if (Level1 != undefined) {
                if (Level1.x < this.game.world.centerX) {
                    Level1.x += 30;
                    Level2.x += 30;
                } else {
                    moveRight = false
                }
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

        Level1 = this.game.add.button(this.game.world.centerX, this.game.world.centerY+75, "Level1", this.Level1, this, 0, 0, 1, 0);
        Level2 = this.game.add.button(this.game.world.centerX+480, this.game.world.centerY+75, "Level2", this.Level2, this, 0, 0, 1, 0);
        Level1.anchor.setTo(0.5, 0.5);
        Level2.anchor.setTo(0.5, 0.5);

        RoomNumber = 3;

        this.listenSwipe(function(direction) {
            if (direction == "left"){
                 moveLeft = true;
            }

            if (direction == "right"){
                moveRight = true;
            }
        });
    },

    GoBack: function(){
        Play = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY, "Play", this.LevelSelect, this, 0, 0, 1, 0);
        Options = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY+200, "Options", this.StartOptions, this, 0 ,0, 1, 0);

        Back.destroy();
        if (Music == true) MusicOn.destroy();
        if (Music == false) MusicOff.destroy();
        if (Sound == true) SoundOn.destroy();
        if (Sound == false) SoundOff.destroy();

        RoomNumber = 1;
    },

    TurnMusicOff: function(){
        MusicOff = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY -100, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0);
        MusicOn.destroy();
        Music = false;
        //Turn Music Off here
    },

    TurnMusicOn: function(){
        MusicOn = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY - 100, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0);
        MusicOff.destroy();
        Music = true;
        //Turn Music On here
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

    listenSwipe: function(callback) {
        var eventDuration;
        var startPoint = {};
        var endPoint = {};
        var direction;
        var minimum = {
            duration: 75,
            distance: 150
        };

        this.game.input.onDown.add(function (pointer) {
            startPoint.x = pointer.clientX;
            startPoint.y = pointer.clientY;
        }, this);

        this.game.input.onUp.add(function (pointer) {
            direction = '';
            eventDuration = this.game.input.activePointer.duration;

            if (eventDuration > minimum.duration) {
                endPoint.x = pointer.clientX;
                endPoint.y = pointer.clientY;

                // Check direction
                if (endPoint.x - startPoint.x > minimum.distance) {
                    direction = 'right';
                } else if (startPoint.x - endPoint.x > minimum.distance) {
                    direction = 'left';
                } else if (endPoint.y - startPoint.y > minimum.distance) {
                    direction = 'bottom';
                } else if (startPoint.y - endPoint.y > minimum.distance) {
                    direction = 'top';
                }

                if (direction) {
                    callback(direction);
                }
            }
        }, this);
    }
};