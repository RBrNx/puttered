/**
 * Created by b00231929 on 20/03/2015.
 */
var gameState = function(game){};
var Player;
var Pause;
var Clouds;
var Fairway;
var Hills;
var Bush;

gameState.prototype = {
    preload: function(){
        this.game.load.spritesheet("Shot", "Graphics/Player/Swing.png", 400, 400);
        this.game.load.spritesheet("Pause", "Graphics/Buttons/Pause-Button.png", 400, 150);
        this.game.load.image("Ball", "Graphics/Player/Ball.png");
        this.game.load.image("Fairway", "Graphics/Level Assests/Level1/Level1.png");
        this.game.load.image("Bushes", "Graphics/Level Assests/Level1/Level1-Bush.png");
        this.game.load.image("Flag", "Graphics/Player/Flag.png");

        this.game.world.setBounds(0, -500, 2500, 1580);
    },

    create: function() {
        //Pause = this.game.add.button(1650, 300, "Pause", this.PauseGame, this, 0, 0, 1, 0);

        Clouds = this.game.add.tileSprite(0,-500, 2500, 2160, "Clouds");
        Hills = this.game.add.sprite(0,0,"Hills")
        Hills.scale.setTo(2,0.75);
        Bush = this.game.add.sprite(0,0, "Bushes");
        Fairway = this.game.add.sprite(0,0, "Fairway");

        Flag = this.game.add.sprite(2290, 354, "Flag");
        Flag.scale.setTo(0.6,0.6);

        Player = this.game.add.sprite(0, 470, "Shot");
        Player.animations.add("Swing");
        Player.scale.setTo(0.5, 0.5);
        Player.anchor.setTo(0, 0.5);
        //Player.animations.play("Swing", 10, false);

        Ball = this.game.add.sprite(Player.x + 125, Player.y+98, "Ball");
        Ball.scale.setTo(0.2, 0.2);
        Ball.anchor.setTo(0.5, 0.5);
    },

    update: function(){
        Clouds.tilePosition.x += 1;


        if (Fairway != undefined && Bush != undefined) {

            //this.game.input.onDown.add(this.updateButtons, this);

            if (this.game.input.activePointer.isDown) {
                if (this.game.origDragPoint) {
                    // move the camera by the amount the mouse has moved since last update
                        this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;
                        this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.position.y;
                }
                // set new drag origin to current position
                this.game.origDragPoint = this.game.input.activePointer.position.clone();
            }
            else {
                this.game.origDragPoint = null;
            }
        }
    }
};