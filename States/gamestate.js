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
var Resume;
var Restart;
var Menu;
var Paused;
var CameraCenterX;
var CameraCenterY;

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
        this.game.load.image("Star", "Graphics/Level_Assets/star.png");
        this.game.load.image("Block", "Graphics/Player/Block.png");
        this.game.load.spritesheet("Resume", "Graphics/Buttons/Resume-Button.png", 400, 150);
        this.game.load.spritesheet("Menu", "Graphics/Buttons/Menu-Button.png", 400, 150);
        this.game.load.spritesheet("Restart", "Graphics/Buttons/Restart-Button.png", 400, 150);
        this.game.load.script("BlurX", "Filters/BlurX.js");
        this.game.load.script("BlurY", "Filters/BlurY.js");
        this.game.load.script("Gray", "Filters/Gray.js");

        this.game.world.setBounds(0, -500, 2500, 1580);
    },

    create: function() {
        //Pause = this.game.add.button(1650, 300, "Pause", this.PauseGame, this, 0, 0, 1, 0);
        Paused = false;
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

        MusicControl = this.game.add.audio("Course1Music");
        if (Music == true) MusicControl.play();
        //if (Music == true) this.game.sound.play("Course1Music");

        Arrow = this.game.add.sprite(Ball.x, Ball.y, "Arrow");
        Arrow.anchor.setTo(0.5, 1);
        Arrow.scale.setTo(0.1, 0.1);
        Arrow.rotation = 181 * Radian;
        Arrow.angle = 60;

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
        if (Started == false && BallStationary == true && LevelComplete != true && Paused != true) {
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


        Block.body.onBeginContact.add(this.LevelComplete, this);
    },


    update: function(){
        Clouds.tilePosition.x += 1;
        CameraCenterX = this.game.camera.x + this.game.camera.width/2;
        CameraCenterY = this.game.camera.y + this.game.camera.height/2;


        if (FairwayHole != undefined && Fairway != undefined) {

            if (this.game.input.activePointer.isDown && Paused != true) {
                if (LeftB.input.checkPointerOver(this.game.input.activePointer) != true && RightB.input.checkPointerOver(this.game.input.activePointer) != true && SwingB.input.checkPointerOver(this.game.input.activePointer) != true) {
                    if (this.game.origDragPoint) {
                        // move the camera by the amount the mouse has moved since last update
                        this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.x;
                        this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.y;
                    }
                }
                // set new drag origin to current position
                this.game.origDragPoint = this.game.input.activePointer.position.clone();
            }
            else {
                this.game.origDragPoint = null;
            }
        }
    if (this.PowerF != undefined && Paused != true) {
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

        if (Arrow != undefined  && Paused != true){
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
        if (!Paused) {
            Paused = true;

            this.Blur();

            if (Music == true) MusicOn = this.game.add.button(this.game.camera.x - 200, CameraCenterY - 200, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0);
            if (Sound == true) SoundOn = this.game.add.button(this.game.camera.x - 200, CameraCenterY, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0);
            if (Music == false) MusicOff = this.game.add.button(this.game.camera.x - 200, CameraCenterY - 200, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0);
            if (Sound == false) SoundOff = this.game.add.button(this.game.camera.x - 200, CameraCenterY, "SoundOff", this.TurnSoundOn, this, 0, 0, 1, 0);
            Resume = this.game.add.button(CameraCenterX, this.game.camera.y - 1600, "Resume", this.ResumeGame, this, 0, 0, 1, 0);
            Resume.anchor.setTo(0.5, 0.5);
            Restart = this.game.add.button(CameraCenterX, this.game.camera.y - 1400, "Restart", this.RestartCourse, this, 0, 0, 1, 0);
            Restart.anchor.setTo(0.5, 0.5);
            Menu = this.game.add.button(CameraCenterX, this.game.camera.y - 1200, "Menu", this.MainMenu, this, 0, 0, 1, 0);
            Menu.anchor.setTo(0.5, 0.5);

            this.game.add.tween(Resume).to({y: CameraCenterY - 200}, 200, Phaser.Easing.Linear.NONE, true);
            this.game.add.tween(Restart).to({y: CameraCenterY}, 200, Phaser.Easing.Linear.NONE, true);
            this.game.add.tween(Menu).to({y: CameraCenterY + 200}, 200, Phaser.Easing.Linear.NONE, true);
            if (Music == true) this.game.add.tween(MusicOn).to({x: (CameraCenterX) - 400}, 200, Phaser.Easing.Linear.NONE, true);
            if (Sound == true) this.game.add.tween(SoundOn).to({x: (CameraCenterX) - 400}, 200, Phaser.Easing.Linear.NONE, true);
            if (Music == false) this.game.add.tween(MusicOff).to({x: (CameraCenterX) - 400}, 200, Phaser.Easing.Linear.NONE, true);
            if (Sound == false)this.game.add.tween(SoundOff).to({x: (CameraCenterX) - 400}, 200, Phaser.Easing.Linear.NONE, true);

        }
    },

    ResumeGame: function(){
        Paused = false;

        this.Blur();

        this.game.add.tween(Resume).to({y: -1600}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(Restart).to({y: -1400}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(Menu).to({y: -1200}, 200, Phaser.Easing.Linear.NONE, true);
        if(Music == true)this.game.add.tween(MusicOn).to({x: -200}, 200, Phaser.Easing.Linear.NONE, true);
        if(Sound == true)this.game.add.tween(SoundOn).to({x: -200}, 200, Phaser.Easing.Linear.NONE, true);
        if(Music == false)this.game.add.tween(MusicOff).to({x: -200}, 200, Phaser.Easing.Linear.NONE, true);
        if(Sound == false) this.game.add.tween(SoundOff).to({x: -200}, 200, Phaser.Easing.Linear.NONE, true);

    },

    LevelComplete: function(){
        if (LevelComplete != true){
        Emitter.flow(2000, 250, 5, 50);
            LevelComplete = true;
            Arrow.visible = false;
        }
    },

    TurnMusicOff: function(){
        MusicOff = this.game.add.button(CameraCenterX - 400, CameraCenterY - 200, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0);
        MusicOn.destroy();
        Music = false;
        //Turn Music Off here
        MusicControl.pause();
    },

    TurnMusicOn: function(){
        MusicOn = this.game.add.button(CameraCenterX - 400, CameraCenterY - 200, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0);
        MusicOff.destroy();
        Music = true;
        //Turn Music On here
        MusicControl.resume();
    },

    TurnSoundOff: function(){
        SoundOff = this.game.add.button(CameraCenterX - 400, CameraCenterY, "SoundOff", this.TurnSoundOn, this, 0, 0, 1, 0);
        SoundOn.destroy();
        Sound = false;
        //Turn Sound Off here
    },

    TurnSoundOn: function() {
        SoundOn = this.game.add.button(CameraCenterX - 400, CameraCenterY, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0);
        SoundOff.destroy();
        Sound = true;
        //Turn Sound On here
    },

    MainMenu: function(){
        this.game.state.start("MainMenu");
        MusicControl.stop();
    },

    RestartCourse: function(){
        this.game.state.start("GameState");
        MusicControl.stop();
    },

    Blur: function(){
        if (Paused == true) {
            var BlurX = this.game.add.filter("BlurX");
            var BlurY = this.game.add.filter("BlurY");
            var Gray = this.game.add.filter("Gray");
            /*Fairway.filters = [BlurX, BlurY];
            Clouds.filters = [BlurX, BlurY];
            Ball.filters = [BlurX, BlurY];
            Player.filters = [BlurX, BlurY];
            LeftB.filters = [BlurX, BlurY];
            RightB.filters = [BlurX, BlurY];
            SwingB.filters = [BlurX, BlurY];
            Flag.filters = [BlurX, BlurY];
            Hills.filters = [BlurX, BlurY];
            Arrow.filters = [BlurX, BlurY];*/
            Fairway.filters = [Gray];
            Clouds.filters = [Gray];
            Ball.filters = [Gray];
            Player.filters = [Gray];
            LeftB.filters = [Gray];
            RightB.filters = [Gray];
            SwingB.filters = [Gray];
            Flag.filters = [Gray];
            Hills.filters = [Gray];
            Arrow.filters = [Gray];
        }

        else if (Paused == false){
            Fairway.filters = null;
            Clouds.filters = null;
            Ball.filters = null;
            Player.filters = null;
            LeftB.filters = null;
            RightB.filters = null;
            SwingB.filters = null;
            Flag.filters = null;
            Hills.filters = null;
            Arrow.filters = null;
        }
    }

};