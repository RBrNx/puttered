/**
 * Created by b00231929 on 20/03/2015.
 */
var mainMenu = function(game){}

mainMenu.prototype = {
    create: function(){
        var mainMenu = this.game.add.sprite(this.game.world.width/2, this.game.world.height/2, "Logo");
        mainMenu.anchor.setTo(0.5, 0.5);
        mainMenu.scale.set(0.5, 0.5);

    }
}