/**
 * Created by Conor on 14/04/2015.
 */
var level2_4 = function(game){};

level2_4.prototype = {
    /**
     * Pre-loads data for use in level 1
     */
    preload: function(){
        var loadingBar = this.add.sprite(this.game.camera.width/2, this.game.camera.height/2, "Loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);

        this.game.load.image("Fairway", "Graphics/Level_Assets/Spaced_Out/Level4/Level2-4.png");

        this.game.world.setBounds(0, 0, 3000, 1080);
    },

    /**
     * Creates objects for use in level 3
     */
    create: function() {
        Started = "false";
        Power = 0;
        LevelComplete = false;
        BallStationary = true;
        CameraCenterX = 0;
        CameraCenterY = 0;
        Timer = 0;
        Scoreboard = null;
        ScoreboardShown = false;
        StrokeCount = 0;
        SavedBallVelX = 0;
        SavedBallVelY = 0;
        prevBallX = 0;
        prevBallY = 0;
        HoleNumber = 3;
        FinishSwing = false;
        Paused = false;
        ballMaterial = null;
        groundMaterial = null;
        fairwayMaterial = null;
        Radian = 0.0174532925;
        WaterHazard = false;
        BackgroundP = null;

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 0;

        Space = this.game.add.sprite(0,0, "Space");
        Space.scale.setTo(1.6, 1.6);

        Water = this.game.add.sprite(1270, 810, "Water");
        Water.scale.setTo(0.9, 1);
        Water.animations.add("Water");
        Water.animations.play("Water", 5, true);
        Water.rotation = 270 * Radian;

        Block = this.game.add.sprite(2520, 550, "Block");
        Block.scale.setTo(6,12);
        this.game.physics.p2.enable(Block);
        Block.body.static = true;

        Ball = this.game.add.sprite(130, 520, "Ball");
        Ball.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(Ball);
        Ball.body.clearShapes();
        Ball.body.loadPolygon("Physics", "Ball");

        Fairway = this.game.add.sprite(this.game.world.centerX, 540, "Fairway");
        Fairway.anchor.setTo(0.5,0.5);
        this.game.physics.p2.enable(Fairway);
        Fairway.body.static = true;
        Fairway.body.clearShapes();
        Fairway.body.loadPolygon("Physics", "Level2-4-Hole");

        Player = this.game.add.sprite(130, 520, "Shot");
        Player.animations.add("Swing");
        Player.anchor.setTo(0.5, 0.5);

        ballMaterial = this.game.physics.p2.createMaterial("ballMaterial", Ball.body);
        groundMaterial = this.game.physics.p2.createMaterial("groundMaterial", Fairway.body);
        this.game.physics.p2.setWorldMaterial(groundMaterial, true, true, true, true);
        fairwayMaterial = this.game.physics.p2.createContactMaterial(ballMaterial, groundMaterial);
        fairwayMaterial.friction = 0.5;
        fairwayMaterial.restitution = 0.5;

        MusicControl = this.game.add.audio("Course2Music", 1, true);
        if (Music == true) MusicControl.play();
        GolfClap = this.game.add.audio("GolfClap");
        GolfSwing = this.game.add.audio("GolfSwing");
        Splash = this.game.add.audio("Splash");

        Emitter = this.game.add.emitter(Block.x, Block.y);
        Emitter.makeParticles("Star");
        Emitter.minParticleSpeed.setTo(300, 100);
        Emitter.maxParticleSpeed.setTo(1000, -100);
        Emitter.minParticleScale = 0.1;
        Emitter.maxParticleScale = 0.1;
        Emitter.setAlpha(0.1, 0.6);
        Emitter.gravity = 0;

        //Set up GUI - Arrow, Left + Right Buttons, Swing Button, Pause Button, Power Bar
        Arrow = this.game.add.sprite(Ball.x, Ball.y, "Arrow");
        Arrow.anchor.setTo(0.5, 1);
        Arrow.rotation = 181 * Radian;
        Arrow.angle = 60;

        LeftB = this.game.add.sprite(20, 610, "Button");
        LeftB.scale.setTo(0.67);
        LeftBText = this.game.add.bitmapText(LeftB.x + 115, LeftB.y + 10, "8Bit", "<", 100);
        LeftBText.scale.setTo(0.67);
        LeftBText.fixedToCamera = true;
        LeftB.fixedToCamera = true;
        LeftB.inputEnabled = true;

        RightB = this.game.add.sprite(300, 610, "Button");
        RightB.scale.setTo(0.67);
        RightBText = this.game.add.bitmapText(RightB.x + 125, RightB.y + 10, "8Bit", ">", 100);
        RightBText.scale.setTo(0.67);
        RightBText.fixedToCamera = true;
        RightB.fixedToCamera = true;
        RightB.inputEnabled = true;

        this.PowerB = this.game.add.sprite(950, 555, "PowerBar");
        this.PowerB.scale.setTo(0.67);
        this.PowerF = this.game.add.sprite(1117, 722, "PowerFill");
        this.PowerF.scale.setTo(0.67);
        this.PowerF.anchor.setTo(0.5, 1);
        this.PowerB.fixedToCamera = true;
        this.PowerF.fixedToCamera = true;
        this.PowerF.rotation = 181 * Radian;
        this.PowerF.visible = false;
        this.PowerB.visible = false;

        PauseB = this.game.add.button(1140, 30, "ButtonSq", this.Pause, this, 0, 0, 1, 0);
        PauseB.scale.setTo(0.67);
        PauseBText = this.game.add.bitmapText(PauseB.x + 21, PauseB.y + 10, "8Bit", "II", 100);
        PauseBText.scale.setTo(0.67);
        PauseB.fixedToCamera = true;
        PauseBText.fixedToCamera = true;

        SwingB = this.game.add.button(950, 555, "SwingButton", this.Swing, this, 0, 0, 0, 0);
        SwingB.scale.setTo(0.67);
        SwingB.fixedToCamera = true;

        HoleText = this.game.add.bitmapText(15, 15, "8Bit", "Hole\n   " + (HoleNumber + 1), 32);
        HoleText.scale.setTo(0.67);
        HoleText.fixedToCamera = true;

        ParText = this.game.add.bitmapText(115, 16, "8Bit", "Par: " + ParArrayCourse2[HoleNumber], 24);
        ParText.scale.setTo(0.67);
        ParText.fixedToCamera = true;

        ScoreText = this.game.add.bitmapText(115, 43, "8Bit", "Strokes: " + StrokeCount, 24);
        ScoreText.scale.setTo(0.67);
        ScoreText.fixedToCamera = true;

        this.game.camera.x = 0;
        this.game.camera.y = 3000;

    },

    /**
     * Handles game logic, positions and physics
     */
    update: function(){
        CameraCenterX = this.game.camera.x + this.game.camera.width/2;
        CameraCenterY = this.game.camera.y + this.game.camera.height/2;

        Space.x = this.game.camera.x * 0.4;
        Space.y = (this.game.camera.y * 0.4);

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                StrokeCount = ParArrayCourse2[HoleNumber];
                MusicControl.stop();
                this.LevelComplete();
            }
        }

        var PercentX, PercentY;
        PercentX = (Math.abs(Ball.body.velocity.x)/100) * 2;
        PercentY = (Math.abs(Ball.body.velocity.y)/100) * 2;

        if (Ball.body.velocity.x > 0.75 && Ball.body.velocity.x > 4){
            Ball.body.velocity.x -= PercentX;
        }
        else if (Ball.body.velocity.x > 0.75){
            Ball.body.velocity.x -= 1;
        }

        if (Ball.body.velocity.y > 0.75 && Ball.body.velocity.y > 4){
            Ball.body.velocity.y -= PercentY;
        }
        else if (Ball.body.velocity.y > 0.75){
            Ball.body.velocity.y -= 1;
        }

        if (Ball.body.velocity.x < -0.75 && Ball.body.velocity.x < -4){
            Ball.body.velocity.x += PercentX;
        }
        else if (Ball.body.velocity.x < -0.75){
            Ball.body.velocity.x += 1;
        }

        if (Ball.body.velocity.y < -0.75 && Ball.body.velocity.y < -4){
            Ball.body.velocity.y += PercentY;
        }
        else if (Ball.body.velocity.y < -0.75){
            Ball.body.velocity.y += 1;
        }



        //if (Ball != undefined) console.log(Ball.body.velocity.x, Ball.body.velocity.y);

        if (Fairway != undefined) {

            if (this.game.input.activePointer.isDown && Paused != true && LevelComplete != true && WaterHazard != true) {
                if (LeftB.input.checkPointerOver(this.game.input.activePointer) != true && RightB.input.checkPointerOver(this.game.input.activePointer) != true && SwingB.input.checkPointerOver(this.game.input.activePointer) != true) {
                    if (this.game.origDragPoint) {
                        // move the camera by the amount the mouse has moved since last update
                        this.game.camera.follow(null);
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

        if (this.game.input.activePointer.isDown && Paused != true && Scoreboard != undefined) {
            if (Scoreboard.input.checkPointerOver(this.game.input.activePointer)){
                this.game.state.start("Level2-5");
                MusicControl.stop();
            }
        }

        if (this.PowerF != undefined && Paused != true) {
            if (this.PowerF.angle <= -179) {
                this.Ticker = 1.5;

            }
            if (this.PowerF.angle >= 0){
                this.Ticker = -1.5;

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


        if (Ball.body.velocity.x < 0.75 && Ball.body.velocity.y < 0.75 && Ball.body.velocity.x > -0.75 && Ball.body.velocity.y > -0.75 && WaterHazard == false && Paused != true){
            Ball.body.velocity.x = 0;
            Ball.body.velocity.y = 0;
            BallStationary = true;
            prevBallX = Ball.x;
            prevBallY = Ball.y;
            if (LevelComplete != true) Arrow.visible = true;
            Arrow.position.setTo(Ball.x, Ball.y);
            if (LevelComplete != true) {
                Player.position.setTo(Ball.x - 25, Ball.y - 61);
                FinishSwing = false;
            }
        }
        else if (Ball.body.velocity.x >= 0.75 || Ball.body.velocity.y >= 0.75 || Ball.body.velocity.x <= -0.75 || Ball.body.velocity.y <= -0.75 ){
            BallStationary = false;
            Arrow.visible = false;
        }

        if (Ball.x >= Water.x && Ball.x <= Water.x + Water.height && Ball.y <= Water.y && Ball.y >= Water.y - Water.width && WaterHazard == false){
            this.WaterHazard();
        }

        if (LevelComplete == true && Timer < 300 && ScoreboardShown == false){
            Timer += 1;
        }

        if (WaterHazard == true && Timer < 240){
            Timer += 1;
        }

        if (Timer == 300 && LevelComplete == true){
            this.ShowScoreboard();
        }

        if (Timer == 240 && WaterHazard == true){
            this.WaterHazard();
        }

        if (Player.animations.currentAnim.frame == 12 && FinishSwing == false){
            this.FinishSwing();
        }

        Player.events.onAnimationComplete.add(function() {
            Player.animations.stop("Swing", true);
        }, this);

        if (Arrow.angle >= 0 && Arrow.angle <= 180){
            Player.scale.x = 1;
        }
        else{
            Player.scale.x = -1;
        }

        Block.body.onBeginContact.add(this.LevelComplete, this);

        CourseTimer += 1;

    },

    /**
     * Used to output debug info
     */
    render: function(){
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
        //if (Ball != undefined) this.game.debug.spriteInfo(Ball, 32, 32);
        //this.game.debug.inputInfo(32, 32);
        //if (Ball != undefined) console.log(Ball.body.velocity.x, Ball.body.velocity.y);
    },

    /**
     * Starts the players swing
     */
    Swing: function() {
        if (Started == "false" && BallStationary == true && LevelComplete != true && Paused != true) {
            this.PowerB.visible = true;
            this.PowerF.visible = true;
            Power = 0;
            Started = "true";
        }
        else if (Started == "true"){
            Player.animations.play("Swing", 20, false);
            this.PowerF.visible = false;
            this.PowerB.visible = false;
            Started = "false";

        }
    },

    /**
     * Ends the players swing
     */
    FinishSwing: function() {
        this.game.camera.follow(Ball, Phaser.Camera.FOLLOW_TOPDOWN);
        var VelocityX = ((Power * Math.cos((Arrow.angle -90) * Radian) * 10)) * 1.5;
        var VelocityY = ((Power * Math.sin((Arrow.angle -90) * Radian) * 10)) * 1.5;
        Ball.body.velocity.x += VelocityX;
        Ball.body.velocity.y += VelocityY;

        Power = 0;
        this.PowerF.angle = -179;
        StrokeCount += 1;
        TotalShots += 1;
        this.UpdateScore();
        FinishSwing = true;
        if(Sound == true)GolfSwing.play();
    },

    /**
     * Updates the players score
     */
    UpdateScore: function() {
        ScoreText.destroy();
        ScoreText = this.game.add.bitmapText(115, 43, "8Bit", "Strokes: " + StrokeCount, 24);
        ScoreText.scale.setTo(0.67);
        ScoreText.fixedToCamera = true;
    },

    /**
     * Handles player collisions with water hazards incrementing their stroke count and resets the ball
     */
    WaterHazard: function() {
        if (WaterHazard == true) {
            this.game.camera.follow(Ball, Phaser.Camera.FOLLOW_TOPDOWN);
            Timer = 0;
            Ball.reset(prevBallX, prevBallY);
            StrokeCount += 1;
            PenaltyStroke.destroy();
            BackgroundP.destroy();
            WaterHazard = false;
        }
        else if (WaterHazard == false) {
            if(Sound == true)Splash.play();
            WaterHit += 1;
            this.game.camera.follow(null);
            WaterHazard = true;
            //Ball.body.velocity.x = 7;
            //Ball.body.velocity.y = 7;
            BackgroundP = this.game.add.sprite(this.game.camera.x, this.game.camera.y, "BackgroundP");
            PenaltyStroke = this.game.add.bitmapText(CameraCenterX, CameraCenterY, "8Bit", "      Water Hazard!\n   +1 Penalty Stroke!", 50);
            PenaltyStroke.anchor.setTo(0.5);

        }
    },

    /**
     * Pauses the game
     */
    Pause: function(){
        if (!Paused && LevelComplete != true) {
            Paused = true;
            this.TurnOffCollisions();

            BackgroundP = this.game.add.sprite(this.game.camera.x, this.game.camera.y, "BackgroundP");

            if (Music == true) {
                MusicOn = this.game.add.button(this.game.camera.x - 100, CameraCenterY - 113, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0);
                MusicOn.scale.setTo(0.67);
            }
            if (Sound == true) {
                SoundOn = this.game.add.button(this.game.camera.x - 100, CameraCenterY + 8, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0);
                SoundOn.scale.setTo(0.67);
            }
            if (Music == false) {
                MusicOff = this.game.add.button(this.game.camera.x - 100, CameraCenterY - 113, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0);
                MusicOff.scale.setTo(0.67);
            }
            if (Sound == false) {
                SoundOff = this.game.add.button(this.game.camera.x - 100, CameraCenterY + 8, "SoundOff", this.TurnSoundOn, this, 0, 0, 1, 0);
                SoundOff.scale.setTo(0.67);
            }

            Resume = this.game.add.button(CameraCenterX, this.game.camera.y - 1700, "Button", this.ResumeGame, this, 0, 0, 1, 0);
            Resume.scale.setTo(0.67);
            Resume.anchor.setTo(0.5, 0.5);
            ResumeText = this.game.add.bitmapText(Resume.x, Resume.y - 10, "8Bit", "Resume", 56);
            ResumeText.scale.setTo(0.67);
            ResumeText.anchor.setTo(0.5, 0.5);

            Restart = this.game.add.button(CameraCenterX, this.game.camera.y - 1500, "Button", this.RestartCourse, this, 0, 0, 1, 0);
            Restart.scale.setTo(0.67);
            Restart.anchor.setTo(0.5, 0.5);
            RestartText = this.game.add.bitmapText(Restart.x, Restart.y - 10, "8Bit", "Restart\n Course", 50);
            RestartText.scale.setTo(0.67);
            RestartText.anchor.setTo(0.5, 0.5);

            Fullscreen = this.game.add.button(CameraCenterX, this.game.camera.y - 1300, "Button", this.Fullscreen, this, 0 ,0 ,1, 0);
            Fullscreen.scale.setTo(0.67);
            Fullscreen.anchor.setTo(0.5, 0.5);
            FullscreenText = this.game.add.bitmapText(Fullscreen.x, Fullscreen.y - 10, "8Bit", "Fullscreen", 36);
            FullscreenText.scale.setTo(0.67);
            FullscreenText.anchor.setTo(0.5, 0.5);

            Menu = this.game.add.button(CameraCenterX, this.game.camera.y - 1100, "Button", this.MainMenu, this, 0, 0, 1, 0);
            Menu.scale.setTo(0.67);
            Menu.anchor.setTo(0.5, 0.5);
            MenuText = this.game.add.bitmapText(Menu.x, Menu.y - 10, "8Bit", "Menu", 72);
            MenuText.scale.setTo(0.67);
            MenuText.anchor.setTo(0.5, 0.5);

            this.game.add.tween(Resume).to({y: CameraCenterY - 180}, 200, Phaser.Easing.Linear.NONE, true);
            this.game.add.tween(ResumeText).to({y: CameraCenterY - 185}, 200, Phaser.Easing.Linear.NONE, true);
            this.game.add.tween(Restart).to({y: CameraCenterY - 60}, 200, Phaser.Easing.Linear.NONE, true);
            this.game.add.tween(RestartText).to({y: CameraCenterY - 65}, 200, Phaser.Easing.Linear.NONE, true);
            this.game.add.tween(Fullscreen).to({y: CameraCenterY + 60}, 200, Phaser.Easing.Linear.NONE, true);
            this.game.add.tween(FullscreenText).to({y: CameraCenterY + 55}, 200, Phaser.Easing.Linear.NONE, true);
            this.game.add.tween(Menu).to({y: CameraCenterY + 180}, 200, Phaser.Easing.Linear.NONE, true);
            this.game.add.tween(MenuText).to({y: CameraCenterY + 175}, 200, Phaser.Easing.Linear.NONE, true);
            if (Music == true) this.game.add.tween(MusicOn).to({x: (CameraCenterX) - 260}, 200, Phaser.Easing.Linear.NONE, true);
            if (Sound == true) this.game.add.tween(SoundOn).to({x: (CameraCenterX) - 260}, 200, Phaser.Easing.Linear.NONE, true);
            if (Music == false) this.game.add.tween(MusicOff).to({x: (CameraCenterX) - 260}, 200, Phaser.Easing.Linear.NONE, true);
            if (Sound == false)this.game.add.tween(SoundOff).to({x: (CameraCenterX) - 260}, 200, Phaser.Easing.Linear.NONE, true);

        }
    },

    /**
     * Resumes the game
     */
    ResumeGame: function(){
        Paused = false;
        this.TurnOnCollisions();
        BackgroundP.destroy();

        this.game.add.tween(Resume).to({y: -1700}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(ResumeText).to({y: -1700}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(Restart).to({y: -1500}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(RestartText).to({y: -1500}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(Fullscreen).to({y: -1300}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(FullscreenText).to({y: -1300}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(Menu).to({y: -1100}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(MenuText).to({y: -1100}, 200, Phaser.Easing.Linear.NONE, true);
        if(Music == true)this.game.add.tween(MusicOn).to({x: -200}, 200, Phaser.Easing.Linear.NONE, true);
        if(Sound == true)this.game.add.tween(SoundOn).to({x: -200}, 200, Phaser.Easing.Linear.NONE, true);
        if(Music == false)this.game.add.tween(MusicOff).to({x: -200}, 200, Phaser.Easing.Linear.NONE, true);
        if(Sound == false) this.game.add.tween(SoundOff).to({x: -200}, 200, Phaser.Easing.Linear.NONE, true);

    },

    /**
     * Completes the level
     */
    LevelComplete: function(){
        if (LevelComplete != true){
            Emitter.flow(2000, 250, 5, 50);
            LevelComplete = true;
            Arrow.visible = false;
            //this.TurnOffCollisions();
            StrokeArrayCourse2[HoleNumber] = StrokeCount;
            if(Sound == true)GolfClap.play();
        }
    },

    /**
     * Displays the scoreboard
     */
    ShowScoreboard: function(){
        Timer = 0;
        ScoreboardShown = true;
        BackgroundP = this.game.add.sprite(this.game.camera.x, this.game.camera.y, "BackgroundP");
        BackgroundP.scale.setTo(0.67);
        Scoreboard = this.game.add.sprite(CameraCenterX, this.game.camera.y - 500, "Scoreboard");
        Scoreboard.scale.setTo(0.67);
        Scoreboard.inputEnabled = true;
        Scoreboard.anchor.setTo(0.5, 0.5);
        var CourseTitle = this.game.add.bitmapText(Scoreboard.x, Scoreboard.y - 200, "8Bit", "Spaced Out", 50);
        CourseTitle.anchor.setTo(0.5);

        var Hole = this.game.add.bitmapText(Scoreboard.x - 210, Scoreboard.y + 15, "8Bit", "Hole\n\n\n   1\n\n   2\n\n   3\n\n   4\n\n " +
            "  5\n\n   6\n\n   7\n\n   8\n\n   9", 22);

        var Par = this.game.add.bitmapText (Scoreboard.x - 10, Scoreboard.y + 15, "8Bit", "Par\n\n\n  "+ ParArrayCourse2[0] + "\n\n  " + ParArrayCourse2[1] + "\n\n  " +
            ParArrayCourse2[2] + "\n\n  " + ParArrayCourse2[3] + "\n\n  " + ParArrayCourse2[4] + "\n\n  " + ParArrayCourse2[5] + "\n\n  " +
            ParArrayCourse2[6] + "\n\n  " + ParArrayCourse2[7] + "\n\n  " + ParArrayCourse2[8], 22);

        var ScoreText = this.game.add.bitmapText(Scoreboard.x + 110, Scoreboard.y - 30, "8Bit", "Strokes", 22);

        var Continue = this.game.add.bitmapText(Scoreboard.x, Scoreboard.y + 430, "8Bit", "Tap Here to Continue", 16);
        Hole.anchor.setTo(0.5);
        Par.anchor.setTo(0.5);
        //Score.anchor.setTo(0.5);
        Continue.anchor.setTo(0.5);
        Continue.tint = 0x191919;

        this.game.add.tween(Scoreboard).to({y: CameraCenterY}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(CourseTitle).to({y: CameraCenterY - 265}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(Hole).to({y: CameraCenterY + 15}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(Par).to({y: CameraCenterY + 15}, 200, Phaser.Easing.Linear.NONE, true);
        //this.game.add.tween(Score).to({y: CameraCenterY - 150}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(ScoreText).to({y: CameraCenterY - 205}, 200, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(Continue).to({y: CameraCenterY + 265}, 200, Phaser.Easing.Linear.NONE, true);


        for (var i = 0, space = 44; i < StrokeArrayCourse2.length; i++, space += 44){
            var Score = this.game.add.bitmapText(Scoreboard.x + 125, (CameraCenterY - 199) + space, "8Bit2","\n     " + StrokeArrayCourse2[i], 22);
            //var Score = this.game.add.bitmapText(Scoreboard.x + 190, Scoreboard.y + 15 + space, "8Bit", "\n     " + StrokeArrayCourse2[i], 22);
            if (StrokeArrayCourse2[i] < ParArrayCourse2[i]){
                Score.tint = 0x00FF00;
            }
            else if (StrokeArrayCourse2[i] > ParArrayCourse2[i]){
                Score.tint = 0xFF0000;
            }
            else if (StrokeArrayCourse2[i] == ParArrayCourse2[i]){
                Score.tint = 0xDF7401;
            }
        }

    },

    /**
     * Turnds the music off
     */
    TurnMusicOff: function(){
        MusicOff = this.game.add.button(CameraCenterX - 260, CameraCenterY - 113, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0);
        MusicOff.scale.setTo(0.67);
        MusicOn.destroy();
        Music = false;
        //Turn Music Off here
        MusicControl.pause();
    },

    /**
     * Turns the music on
     */
    TurnMusicOn: function(){
        MusicOn = this.game.add.button(CameraCenterX - 260, CameraCenterY - 113, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0);
        MusicOff.destroy();
        MusicOn.scale.setTo(0.67);
        Music = true;
        //Turn Music On here
        MusicControl.play();
    },

    /**
     * Turns the sound effects off
     */
    TurnSoundOff: function(){
        SoundOff = this.game.add.button(CameraCenterX - 260, CameraCenterY + 8, "SoundOff", this.TurnSoundOn, this, 0, 0, 1, 0);
        SoundOn.destroy();
        SoundOff.scale.setTo(0.67);
        Sound = false;
        //Turn Sound Off here
    },

    /**
     * Turns the sound effects on
     */
    TurnSoundOn: function() {
        SoundOn = this.game.add.button(CameraCenterX - 260, CameraCenterY + 8, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0);
        SoundOff.destroy();
        SoundOn.scale.setTo(0.67);
        Sound = true;
        //Turn Sound On here
    },

    /**
     * Loads the main menu
     */
    MainMenu: function(){
        this.game.state.start("MainMenu");
        MusicControl.stop();
    },

    /**
     * Restarts the current course
     */
    RestartCourse: function(){
        this.game.state.start("Level2-1");
        MusicControl.stop();
    },

    /**
     * Makes the game fullscreen
     */
    Fullscreen: function() {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.refresh();

        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        } else {
            this.game.scale.startFullScreen();
        }
    },

    /**
     * Disables collisions in the game
     */
    TurnOffCollisions: function() {
        console.log("TurnOffCollisions");
        SavedBallVelX = Ball.body.velocity.x;
        SavedBallVelY = Ball.body.velocity.y;
        Ball.body.velocity.x = 0;
        Ball.body.velocity.y = 0;
        Fairway.body.clearCollision();
        Ball.body.clearCollision();
        Fairway.body.clearShapes();
        Ball.body.clearShapes();

    },

    /**
     * Enables collisions in the game
     */
    TurnOnCollisions: function() {
        console.log("TurnOnCollisions");
        this.game.physics.p2.enable(Fairway);
        this.game.physics.p2.enable(Ball);
        Fairway.body.loadPolygon("Physics", "Level2-4-Hole");
        Fairway.static = true;
        Ball.body.loadPolygon("Physics", "Ball");
        Ball.body.velocity.x = SavedBallVelX;
        Ball.body.velocity.y = SavedBallVelY;

        ballMaterial = this.game.physics.p2.createMaterial("ballMaterial", Ball.body);
        groundMaterial = this.game.physics.p2.createMaterial("groundMaterial", Fairway.body);
        this.game.physics.p2.setWorldMaterial(groundMaterial, true, true, true, true);
        contactMaterial = this.game.physics.p2.createContactMaterial(ballMaterial, groundMaterial);
        contactMaterial.friction = 0.5;
        contactMaterial.restitution = 0.5;
    }

};