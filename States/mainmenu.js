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

var Sound;
var Music;

mainMenu.prototype = {
    create: function(){
        Clouds = this.game.add.tileSprite(0,0, 1920, 1080, "Clouds");
        var Hills = this.game.add.sprite(0,0,"Hills");
        var Logo = this.game.add.sprite(this.game.world.width/2, this.game.world.height/4, "Logo");
        Logo.anchor.setTo(0.5, 0.5);
        Logo.scale.set(0.5, 0.5);

        Play = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY, "Play", this.StartGame, this, 0, 0, 1, 0);
        Options = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY+200, "Options", this.StartOptions, this, 0, 0, 1, 0);


    },

    update: function(){
        Clouds.tilePosition.x += 1;
    },

    StartOptions: function(){
        Back = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY + 100, "Back", this.GoBack, this, 0, 0, 1, 0);
        MusicOn = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY - 100, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0);
        SoundOn = this.game.add.button(this.game.world.centerX + 50, this.game.world.centerY - 100, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0);
        Play.destroy();
        Options.destroy();
    },

    StartGame: function(){
        this.game.state.start("GameState");
    },

    GoBack: function(){
        Play = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY, "Play", this.StartGame, this, 0, 0, 1, 0);
        Options = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY+200, "Options", this.StartOptions, this, 0 ,0, 1, 0);

        Back.destroy();
        if (Music == true) {MusicOn.destroy();}
        if (Music == false) {MusicOff.destroy();}
        if (Sound == true) {SoundOn.destroy();}
        if (Sound == false) {SoundOff.destroy();}
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

    TurnSoundOn: function(){
        SoundOn = this.game.add.button(this.game.world.centerX+50, this.game.world.centerY - 100, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0);
        SoundOff.destroy();
        Sound = true;
        //Turn Sound On here
    }
}