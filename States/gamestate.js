/**
 * Created by b00231929 on 20/03/2015.
 */
var gameState = function(game){};
var Player;
var Pause;
var Clouds;
var Fairway;
var Ball;
var Hills;
var Bush;
var Radian = 0.0174532925;
var Started = false;
var Power = 0;

gameState.prototype = {
    preload: function(){
        this.game.load.spritesheet("Shot", "Graphics/Player/Swing.png", 400, 400);
        this.game.load.spritesheet("Pause", "Graphics/Buttons/Pause-Button.png", 150, 150);
        this.game.load.image("Ball", "Graphics/Player/Ball.png");
        this.game.load.physics("BallPhys", "Graphics/Player/Ball.json");
        this.game.load.image("Fairway", "Graphics/Level_Assets/Level1/Level1.png");
        this.game.load.physics("FairwayPhys", "Graphics/Level_Assets/Level1/Level1.json");
        this.game.load.image("Bushes", "Graphics/Level_Assets/Level1/Level1-Bush.png");
        this.game.load.image("Flag", "Graphics/Player/Flag.png");
        this.game.load.spritesheet("LButton", "Graphics/Buttons/Left-Button.png", 400, 150);
        this.game.load.spritesheet("RButton", "Graphics/Buttons/Right-Button.png", 400, 150);
        this.game.load.image("SwingButton", "Graphics/Buttons/Swing-Button.png");
        this.game.load.image("PowerBar", "Graphics/Buttons/Power-Bar.png");
        this.game.load.image("PowerFill", "Graphics/Buttons/Gradient.png");
        this.game.load.image("Arrow", "Graphics/Player/Arrow.png");

        this.game.world.setBounds(0, -500, 2500, 1580);
    },

    create: function() {
        //Pause = this.game.add.button(1650, 300, "Pause", this.PauseGame, this, 0, 0, 1, 0);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1400;


        Clouds = this.game.add.tileSprite(0,-500, 2500, 2160, "Clouds");
        Hills = this.game.add.sprite(0,0,"Hills");
        Hills.scale.setTo(2,0.75);
        Bush = this.game.add.sprite(0,0, "Bushes");
        Fairway = this.game.add.sprite(this.game.world.centerX, 543, "Fairway");
        this.game.physics.p2.enable(Fairway, true);
        Fairway.body.static = true;
        Fairway.body.clearShapes();
        Fairway.body.loadPolygon("FairwayPhys", "Level1");


        Flag = this.game.add.sprite(2290, 354, "Flag");
        //this.game.physics.p2.enable(Flag, true);
        Flag.scale.setTo(0.6,0.6);

        Player = this.game.add.sprite(0, 470, "Shot");
        Player.animations.add("Swing");
        Player.scale.setTo(0.5, 0.5);
        Player.anchor.setTo(0, 0.5);
        //Player.animations.play("Swing", 10, false);

        Ball = this.game.add.sprite(Player.x + 125, Player.y + 60, "Ball");
        Ball.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(Ball, true);
        Ball.body.clearShapes();
        Ball.body.setCircle(9);
        Ball.scale.setTo(0.2, 0.2);

        var ballMaterial = this.game.physics.p2.createMaterial("ballMaterial", Ball.body);
        var groundMaterial = this.game.physics.p2.createMaterial("groundMaterial", Fairway.body);
        this.game.physics.p2.setWorldMaterial(groundMaterial, true, true, true, true);
        var contactMaterial = this.game.physics.p2.createContactMaterial(ballMaterial, groundMaterial);

        contactMaterial.friction = 0.3;
        contactMaterial.restitution = 0.5;



        if (Music == true) this.game.sound.play("Course1Music");

        LeftB = this.game.add.button(20, 920, "LButton", this.RotateLeft,this, 0, 0, 1, 0 );
        RightB = this.game.add.button(470, 920, "RButton", this.RotateRight, this, 0, 0, 1, 0);
        LeftB.fixedToCamera = true;
        RightB.fixedToCamera = true;

        Arrow = this.game.add.sprite(Ball.x, Ball.y, "Arrow");
        Arrow.anchor.setTo(0.5, 1);
        Arrow.scale.setTo(0.1, 0.1);
        Arrow.rotation = 181 * Radian;
        Arrow.angle = 60;

        SwingB = this.game.add.button(1400, 830, "SwingButton", this.Swing, this, 0, 0, 0, 0);
        SwingB.fixedToCamera = true;

        this.PowerB = this.game.add.sprite(1400, 830, "PowerBar");
        this.PowerB.visible = false;
        this.PowerB.fixedToCamera = true;
        this.PowerF = this.game.add.sprite(1649, 1080, "PowerFill");
        this.PowerF.visible = false;
        this.PowerF.fixedToCamera = true;
    },

    Swing: function() {
        if (Started == true){
           //this.game.camera.follow(Ball, Phaser.Camera.FOLLOW_TOPDOWN);
            var VelocityX = (Power * Math.cos((Arrow.angle -90) * Radian) * 10);
            var VelocityY = (Power * Math.sin((Arrow.angle - 90) * Radian) * 10);
            Ball.body.velocity.x = VelocityX;
            Ball.body.velocity.y = VelocityY;
            this.PowerF.visible = false;
            this.PowerB.visible = false;
            Started = false;

        }
        if (Started == false) {
            this.PowerF.anchor.setTo(0.5, 1);
            this.PowerB.visible = true;
            this.PowerF.visible = true;
            this.PowerF.rotation = 181 * Radian;
            Power = 0;
            Started = true;
        }
    },


    update: function(){
        Clouds.tilePosition.x += 1;

        //console.log(this.game.physicsBodyType)

        //this.game.physics.arcade.collide(Fairway, Ball);

        if (Fairway != undefined && Bush != undefined) {

            if (this.game.input.activePointer.isDown) {
                if (this.game.origDragPoint) {
                    // move the camera by the amount the mouse has moved since last update
                        this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.x;
                        this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.y;
                }
                // set new drag origin to current position
                this.game.origDragPoint = this.game.input.activePointer.position.clone();
            }
            else {
                this.game.origDragPoint = null;
            }
        }
    if (this.PowerF != undefined) {
        if (this.PowerF.angle <= -179) {
            this.Ticker = 1;

        }
        if (this.PowerF.angle >= 0){
            this.Ticker = -1;

        }
        if (this.PowerF.visible == true) {
            this.PowerF.angle += this.Ticker;
            Power += this.Ticker;
        }
    }

        if (Arrow != undefined){
            if (Arrow.visible == true && this.game.input.activePointer.isDown && LeftB.input.checkPointerOver(this.game.input.activePointer)){
                Arrow.angle -= 1;
            }
            if (Arrow.visible == true && this.game.input.activePointer.isDown && RightB.input.checkPointerOver(this.game.input.activePointer)){
                Arrow.angle += 1;
            }
        }

        console.log(Power);
    },
    render: function(){
    }



};