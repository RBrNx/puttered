/**
 * Created by b00231929 on 20/03/2015.
 */
var optionsMenu = function(game){}

optionsMenu.prototype = {
    preload: function(){

    },

    create: function(){
        this.game.make.text(this.game.world.centerX, this.game.world.centerY, "Options Menu", {font: "32px Arial", fill: this.generateHexColor() });

    },

    generateHexColor: function(){
    return "#" + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);

}

}