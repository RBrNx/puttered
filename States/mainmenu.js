/**
 * Created by b00231929 on 20/03/2015.
 */
var mainMenu = function(game){}
var Clouds;
var Play;
var Options

mainMenu.prototype = {
    create: function(){
        Clouds = this.game.add.tileSprite(0,0, 1920, 1080, "Clouds");
        var Hills = this.game.add.sprite(0,0,"Hills");
        var Logo = this.game.add.sprite(this.game.world.width/2, this.game.world.height/4, "Logo");

        Logo.anchor.setTo(0.5, 0.5);
        Logo.scale.set(0.5, 0.5);

        Play = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY, "PlayButtonUp", this.StartOptions, this);
        Options = this.game.add.button(this.game.world.centerX-200, this.game.world.centerY+200, "OpButtonUp", this.StartGame, this);



    },

    update: function(){
        Clouds.tilePosition.x += 1;



    },

    StartOptions: function(x){
      this.game.state.start("OptionsMenu");
    },

    StartGame: function(x){
        this.game.state.start("GameState");
    }
}