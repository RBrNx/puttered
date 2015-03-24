/**
 * Created by b00231929 on 20/03/2015.
 */
var gameState = function(game){}
var Player;

gameState.prototype = {
    preload: function(){
        this.game.load.spritesheet("Shot", "Graphics/Player/Swing.png", 400, 400);
    },

    create: function() {
        Player = this.game.add.sprite(0, 880, "Shot");
        Player.animations.add("Swing");
        Player.scale.setTo(0.5, 0.5);

        Player.animations.play("Swing", 10, true);
    }
}