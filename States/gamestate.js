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
var Emitter;
var Radian = 0.0174532925;
var Started = false;
var Power = 0;
var LevelComplete = false;
var BallStationary;

gameState.prototype = {
    preload: function(){
        this.game.load.spritesheet("Shot", "Graphics/Player/Swing.png", 400, 400);
        this.game.load.spritesheet("Pause", "Graphics/Buttons/Pause-Button.png", 150, 150);
        this.game.load.image("Ball", "Graphics/Player/Ball.png");
        this.game.load.physics("Physics", "Graphics/Level_Assets/Level1/Physics3.json");
        this.game.load.image("Fairway", "Graphics/Level_Assets/Level1/Level1.png");
        this.game.load.image("FairwayHole", "Graphics/Level_Assets/Level1/Level1-Hole.png");
        this.game.load.image("Flag", "Graphics/Player/Flag.png");
        this.game.load.spritesheet("LButton", "Graphics/Buttons/Left-Button.png", 400, 150);
        this.game.load.spritesheet("RButton", "Graphics/Buttons/Right-Button.png", 400, 150);
        this.game.load.image("SwingButton", "Graphics/Buttons/Swing-Button.png");
        this.game.load.image("PowerBar", "Graphics/Buttons/Power-Bar.png");
        this.game.load.image("PowerFill", "Graphics/Buttons/Gradient.png");
        this.game.load.image("Arrow", "Graphics/Player/Arrow.png");
        this.game.load.image("Star", "Graphics/Level_Assets/Star.png");
        this.game.load.image("Block", "Graphics/Player/Block.png");

        this.game.world.setBounds(0, -500, 2500, 1580);
    },

    create: function() {
        //Pause = this.game.add.button(1650, 300, "Pause", this.PauseGame, this, 0, 0, 1, 0);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1400;


        Clouds = this.game.add.tileSprite(0,-500, 2500, 2160, "Clouds");
        Hills = this.game.add.sprite(0,0,"Hills");
        Hills.scale.setTo(2,0.75);
        FairwayHole = this.game.add.sprite(this.game.world.centerX, 543, "FairwayHole");
        this.game.physics.p2.enable(FairwayHole);
        FairwayHole.body.kinematic = true;
        FairwayHole.body.clearShapes();
        FairwayHole.body.loadPolygon("Physics", "Level1-Hole");


        Flag = this.game.add.sprite(2295, 578, "Flag");
        Flag.anchor.setTo(0.5, 1);

        Player = this.game.add.sprite(0, 470, "Shot");
        Player.animations.add("Swing");
        Player.scale.setTo(0.5, 0.5);
        Player.anchor.setTo(0, 0.5);
        //Player.animations.play("Swing", 10, false);

        Ball = this.game.add.sprite(Player.x + 125, 550, "Ball");
        Ball.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(Ball);
        Ball.body.clearShapes();
        Ball.scale.setTo(0.2, 0.2);
        Ball.body.loadPolygon("Physics", "Ball2");

        Block = this.game.add.sprite(Flag.x, Flag.y+10, "Block");
        this.game.physics.p2.enable(Block);
        Block.body.static = true;

        Fairway = this.game.add.sprite(this.game.world.centerX, 543, "Fairway");
        Fairway.anchor.setTo(0.5,0.5);


        var ballMaterial = this.game.physics.p2.createMaterial("ballMaterial", Ball.body);
        var groundMaterial = this.game.physics.p2.createMaterial("groundMaterial", FairwayHole.body);
        this.game.physics.p2.setWorldMaterial(groundMaterial, true, true, true, true);
        var contactMaterial = this.game.physics.p2.createContactMaterial(ballMaterial, groundMaterial);

        contactMaterial.friction = 0.5;
        contactMaterial.restitution = 0.5;


        if (Music == true) this.game.sound.play("Course1Music");

        LeftB = this.game.add.sprite(20, 920, "LButton");
        RightB = this.game.add.sprite(470, 920, "RButton");
        LeftB.fixedToCamera = true;
        RightB.fixedToCamera = true;
        LeftB.inputEnabled = true;
        RightB.inputEnabled = true;

        this.PowerB = this.game.add.sprite(1400, 830, "PowerBar");
        this.PowerF = this.game.add.sprite(1649, 1080, "PowerFill");
        this.PowerF.anchor.setTo(0.5, 1);
        this.PowerB.fixedToCamera = true;
        this.PowerF.fixedToCamera = true;
        this.PowerF.rotation = 181 * Radian;
        this.PowerF.visible = false;
        this.PowerB.visible = false;

        PauseB = this.game.add.button(1720, 50, "Pause", this.Pause, this, 0, 0, 1, 0);
        PauseB.fixedToCamera = true;

        Arrow = this.game.add.sprite(Ball.x, Ball.y, "Arrow");
        Arrow.anchor.setTo(0.5, 1);
        Arrow.scale.setTo(0.1, 0.1);
        Arrow.rotation = 181 * Radian;
        Arrow.angle = 60;

        SwingB = this.game.add.button(1400, 830, "SwingButton", this.Swing, this, 0, 0, 0, 0);
        SwingB.fixedToCamera = true;

        Emitter = this.game.add.emitter(Flag.x, Flag.y);
        Emitter.makeParticles("Star");
        Emitter.minParticleSpeed.setTo(-100, -300);
        Emitter.maxParticleSpeed.setTo(100, -1000);
        Emitter.minParticleScale = 0.1;
        Emitter.maxParticleScale = 0.1;
        Emitter.setAlpha(0.1, 0.6);
        Emitter.gravity = 250;
    },

    Swing: function() {
        if (Started == false && BallStationary == true) {
            this.PowerB.visible = true;
            this.PowerF.visible = true;
            Power = 0;
            Started = true;
        }
        else if (Started == true){
            //this.game.camera.follow(Ball, Phaser.Camera.FOLLOW_TOPDOWN);
            var VelocityX = (Power * Math.cos((Arrow.angle -90) * Radian) * 10);
            var VelocityY = (Power * Math.sin((Arrow.angle -90) * Radian) * 10);
            Ball.body.velocity.x += VelocityX;
            Ball.body.velocity.y += VelocityY;
            Started = false;
            this.PowerF.visible = false;
            this.PowerB.visible = false;
            Power = 0;
            this.PowerF.angle = -179;

        }


        Block.body.onBeginContact.add(this.StartEmitter, this);
    },


    update: function(){
        Clouds.tilePosition.x += 1;


        if (FairwayHole != undefined && Fairway != undefined) {

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


        if (Ball.body.velocity.x < 0.0015 && Ball.body.velocity.y < 0.0015 && Ball.body.velocity.x > -0.0015 && Ball.body.velocity.y > -0.0015){
            //console.log("Test");
            BallStationary = true;
            Arrow.visible = true;
            Arrow.position.setTo(Ball.x, Ball.y);
        }
        else if (Ball.body.velocity.x >= 0.0015 || Ball.body.velocity.y >= 0.0015 || Ball.body.velocity.x <= -0.0015 || Ball.body.velocity.y <= -0.0015 ){
            BallStationary = false;
            Arrow.visible = false;
        }

    },
    render: function(){
    },

    Pause: function(){
        console.log("Pause Button")

    },

    StartEmitter: function(target){
        if (LevelComplete != true){
        Emitter.flow(2000, 250, 5, 50);
            LevelComplete = true;
        }
    }



};