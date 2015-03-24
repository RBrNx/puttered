/**
 * Created by b00231929 on 20/03/2015.
 */
var mainMenu = function(game){};
var Clouds;
var Play;
var Options;
var Back;
var menuScreen;
var optionsScreen;

mainMenu.prototype = {
    create: function(){
        Clouds = this.game.add.tileSprite(0,0, 1920, 1080, "Clouds");
        var Hills = this.game.add.sprite(0,0,"Hills");
        var Logo = this.game.add.sprite(this.game.world.width/2, this.game.world.height/4, "Logo");
        Logo.anchor.setTo(0.5, 0.5);
        Logo.scale.set(0.5, 0.5);

        menuScreen = this.game.add.group();
        optionsScreen = this.game.add.group();

        Play = menuScreen.game.add.button(this.game.world.centerX-200, this.game.world.centerY, "PlayButtonUp", this.StartOptions, this);
        Options = menuScreen.game.add.button(this.game.world.centerX-200, this.game.world.centerY+200, "OpButtonUp", this.StartGame, this);

        Back = optionsScreen.game.add.button(this.game.world.centerX-200, this.game.world.centerY, "BackUp", this.GoBack, this);

        optionsScreen.setAll("Visible", false);
    },

    update: function(){
        Clouds.tilePosition.x += 1;
    },

    StartOptions: function(){
      this.menuScreen.setAll("Visible", false);
      this.optionsScreen.setAll("Visible", true);
    },

    StartGame: function(){
        this.game.state.start("GameState");
    },

    GoBack: function(){
        this.game.state.start("MainMenu");
    }
}