/**
 * Created by b00231929 on 20/03/2015.
 */
var gameState = function(game){};
var Player;
var Pause;

gameState.prototype = {
    preload: function(){
        this.game.load.spritesheet("Shot", "Graphics/Player/Swing.png", 400, 400);
        this.game.load.spritesheet("Pause", "Graphics/Buttons/Pause-Button.png", 400, 150);
    },

    create: function() {
        //Pause = this.game.add.button(1650, 300, "Pause", this.PauseGame, this, 0, 0, 1, 0);

        Player = this.game.add.sprite(0, 880, "Shot");
        Player.animations.add("Swing");
        Player.scale.setTo(0.5, 0.5);

        Player.animations.play("Swing", 10, true);
    },

    PauseGame: function(){


    }
};