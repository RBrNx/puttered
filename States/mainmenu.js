/**
 * Created by b00231929 on 20/03/2015.
 */
var mainMenu = function(game){}

mainMenu.prototype = {
    create: function(){
        var Clouds = this.game.add.sprite(0,0, "Clouds");
        var Hills = this.game.add.sprite(0,0, "Hills");
        var Logo = this.game.add.sprite(this.game.world.width/2, this.game.world.height/4, "Logo");

        Logo.anchor.setTo(0.5, 0.5);
        Logo.scale.set(0.5, 0.5);



    }
}