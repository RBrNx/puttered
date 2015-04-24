/**
 * Created by b00231929 on 20/03/2015.
 */
var mainMenu = function(game){};
var Clouds;
var Logo;
var Play;
var PlayText;
var Options;
var OptionsText;
var Back;
var BackText;
var Fullscreen;
var FullscreenText;
var MusicOn;
var MusicOff;
var SoundOn;
var SoundOff;
var Level1;
var Level2;
var Title;
var Hole;
var Par;
var ScoreText;
var Score;
var ScoreArray = [];
var CoursePar;
var Overall;
var OverallText;
var CourseSelect;
var CourseSelectText;
var Retry;
var RetryText;
var BackgroundP;
var StatBoard;
var Statistics;
var BestScore;
var BestTime;
var TotalShotsText;
var WaterHit;
var RoomNumber;
var LastCourse = 1;
var CourseEnded = false;
var Leaderboard = false;
var HoleNumber = 0;

var Sound = true;
var Music = false;
var MusicControl;

mainMenu.prototype = {
    create: function(){
        //Set Menu Size to 1920 x 1080
        this.game.world.setBounds(0, 0, 1280, 720);

        //Start Menu Music
        MusicControl = this.game.add.audio("MainMenuMusic", 1, true);
        if (Music == true) MusicControl.play();

        //Load Background and Logo
        Clouds = this.game.add.tileSprite(0,0, 1920, 1080, "Clouds");
        Clouds.scale.setTo(0.67);
        var Hills = this.game.add.sprite(0,0,"Hills");
        Hills.scale.setTo(0.67);
        Logo = this.game.add.sprite(this.game.world.width/2, this.game.world.height/5, "Logo");
        Logo.anchor.setTo(0.5, 0.5);
        //Logo.scale.set(0.34);


        //Create Play Button
        Play = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 75, "Button", this.CourseSelect, this, 0, 0, 1, 0);
        Play.anchor.setTo(0.5, 0.5);
        Play.scale.setTo(0.67);
        PlayText = this.game.add.bitmapText(Play.x, Play.y-8, "8Bit", "Play", 84);
        PlayText.anchor.setTo(0.5, 0.5);
        PlayText.scale.setTo(0.67);

        //Create Options Button
        Options = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200, "Button", this.StartOptions, this, 0, 0, 1, 0);
        Options.anchor.setTo(0.5, 0.5);
        Options.scale.setTo(0.67);
        OptionsText = this.game.add.bitmapText(Options.x, Options.y-5, "8Bit", "Options", 52);
        OptionsText.anchor.setTo(0.5, 0.5);
        OptionsText.scale.setTo(0.67);

        //Set Room Number to Main Menu
        RoomNumber = 1;

        if (!localStorage.getItem("BestScore")){
            localStorage.setItem("BestScore", "0")
        }
        if (!localStorage.getItem("BestTime")){
            localStorage.setItem("BestTime", "0")
        }
        if (!localStorage.getItem("TotalShots")){
            localStorage.setItem("TotalShots", "0")
        }
        if (!localStorage.getItem("WaterHit")){
            localStorage.setItem("WaterHit", "0")
        }
    },

    update: function(){
        Clouds.tilePosition.x += 1;

        if (RoomNumber == 3) {
            if (Level2 != undefined && Level1 != undefined) {

                if (this.game.input.activePointer.isDown) {
                    if (this.game.origDragPoint) {
                        // move the camera by the amount the mouse has moved since last update
                        Level1.x -= this.game.origDragPoint.x - this.game.input.activePointer.position.x;
                        Level2.x -= this.game.origDragPoint.x - this.game.input.activePointer.position.x;
                    }
                    // set new drag origin to current position
                    this.game.origDragPoint = this.game.input.activePointer.position.clone();
                }
                else {
                    this.game.origDragPoint = null;
                }
                this.game.input.onUp.add(function () {
                    if (Math.pow(Level1.x - 640, 2) < Math.pow(Level2.x - 640, 2)) {
                        Level1.x = 640;
                        Level2.x = 960;
                    }
                    if (Math.pow(Level1.x - 640, 2) > Math.pow(Level2.x - 640, 2)) {
                        Level1.x = 320;
                        Level2.x = 640
                    }

                });
            }
        }

        if (CourseEnded == true && Leaderboard == false){
            this.EndOfLevel();
        }

    },

    render: function(){
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
    },

    StartOptions: function(){
        Back = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200, "Button", this.GoBack, this, 0, 0, 1, 0);
        Back.anchor.setTo(0.5, 0.5);
        Back.scale.setTo(0.67);
        BackText = this.game.add.bitmapText(Back.x, Back.y-10, "8Bit", "Back", 84);
        BackText.anchor.setTo(0.5, 0.5);
        BackText.scale.setTo(0.67);

        Fullscreen = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 75, "Button", this.Fullscreen, this, 0 ,0 ,1, 0);
        Fullscreen.anchor.setTo(0.5, 0.5);
        Fullscreen.scale.setTo(0.67);
        FullscreenText = this.game.add.bitmapText(Fullscreen.x, Fullscreen.y-5, "8Bit", "Fullscreen", 36);
        FullscreenText.anchor.setTo(0.5, 0.5);
        FullscreenText.scale.setTo(0.67);

        if(Music == true){
            MusicOn = this.game.add.button(this.game.world.centerX - 135, this.game.world.centerY - 100, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0);
            MusicOn.scale.setTo(0.67);
        }
        if(Sound == true){
            SoundOn = this.game.add.button(this.game.world.centerX + 25, this.game.world.centerY - 100, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0);
            SoundOn.scale.setTo(0.67);
        }
        if(Music == false) {
            MusicOff = this.game.add.button(this.game.world.centerX - 135, this.game.world.centerY - 100, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0);
            MusicOff.scale.setTo(0.67);
        }
        if(Sound == false) {
            SoundOff = this.game.add.button(this.game.world.centerX + 25, this.game.world.centerY - 100, "SoundOff", this.TurnSoundOn, this, 0, 0, 1, 0);
            SoundOff.scale.setTo(0.67);
        }
        Play.destroy();
        PlayText.destroy();
        Options.destroy();
        OptionsText.destroy();

        //Set Room Number to Options
        RoomNumber = 2;
    },

    EndOfLevel: function() {
        Leaderboard = true;
        RoomNumber = 4;
        Play.destroy();
        PlayText.destroy();
        Options.destroy();
        OptionsText.destroy();
        Logo.destroy();

        if (LastCourse == 1){
            BackgroundP = this.game.add.sprite(this.game.camera.x, this.game.camera.y, "BackgroundP");
            BackgroundP.scale.setTo(0.67);
            Title = this.game.add.bitmapText(this.game.world.centerX, 75, "8Bit2", "Grassy Land\n  Complete!", 64);
            Title.anchor.setTo(0.5);

            Hole = this.game.add.bitmapText(this.game.world.centerX - 550, this.game.world.centerY - 150, "8Bit2", "Hole\n\n\n   1\n\n   2\n\n   3\n\n   4\n\n " +
            "  5\n\n   6\n\n   7\n\n   8\n\n   9", 22);

            Par = this.game.add.bitmapText (this.game.world.centerX - 350, this.game.world.centerY - 150, "8Bit2", "Par\n\n\n  "+ ParArray[0] + "\n\n  " + ParArray[1] + "\n\n  " +
            ParArray[2] + "\n\n  " + ParArray[3] + "\n\n  " + ParArray[4] + "\n\n  " + ParArray[5] + "\n\n  " + ParArray[6] + "\n\n  " + ParArray[7] + "\n\n  " + ParArray[8], 22);

            ScoreText = this.game.add.bitmapText(this.game.world.centerX - 160, this.game.world.centerY - 150, "8Bit2", "Strokes", 22);
            for (var i = 0, space = 44; i < StrokeArray.length; i++, space += 44){
                Score = this.game.add.bitmapText(this.game.world.centerX - 160, this.game.world.centerY - 150 + space, "8Bit2", "\n     " + StrokeArray[i], 22);
                ScoreArray[i] = Score;
                if (StrokeArray[i] < ParArray[i]){
                    Score.tint = "0x00FF00";
                }
                else if (StrokeArray[i] > ParArray[i]){
                    Score.tint = "0xFF0000";
                }
                else if (StrokeArray[i] == ParArray[i]){
                    Score.tint = "0xFFFF00";
                }
            }


            for (var i = 0, sum = 0, sum2 = 0; i < StrokeArray.length; i++){
                sum += StrokeArray[i];
                sum2 += ParArray[i];
            }

            CoursePar = this.game.add.bitmapText(this.game.world.centerX + 100, this.game.world.centerY - 150, "8Bit2", "Par: 36\n\nStrokes: " + sum);
            var OverallScore = sum - sum2;
            Overall = this.game.add.bitmapText(this.game.world.centerX + 100, this.game.world.centerY, "8Bit2", "Overall\n Score\n");
            OverallText = this.game.add.bitmapText(this.game.world.centerX + 140, this.game.world.centerY + 75, "8Bit2", OverallScore.toString(), 64);
            if (OverallScore < sum2){
                OverallText.tint = "0x00FF00";
            }
            else if (OverallScore > sum2){
                OverallText.tint = "0xFF0000";
            }
            else if (OverallScore == sum2){
                OverallText.tint = "0xFFFF00";
            }

            if (OverallScore < Number(localStorage.getItem("BestScore"))){
                localStorage.setItem("BestScore", OverallScore.toString());
            }

            if (CourseTimer < Number(localStorage.getItem("BestTime"))) {
                localStorage.setItem("BestTime", CourseTimer.toString());
            }

            if ( (Number(localStorage.getItem("BestTime"))) == 0){
                localStorage.setItem("BestTime", CourseTimer.toString());
            }
            if (TotalShots > Number(localStorage.getItem("TotalShots"))) {
                localStorage.setItem("TotalShots", TotalShots.toString());
            }
            if (WaterHit > Number(localStorage.getItem("WaterHit"))) {
                localStorage.setItem("WaterHit", WaterHit.toString());
            }

            CourseSelect = this.game.add.button(this.game.world.centerX + 150, this.game.world.centerY + 275, "Button", this.CourseSelect, this, 0, 0, 1, 0);
            CourseSelect.anchor.setTo(0.5, 0.5);
            CourseSelect.scale.setTo(0.67);
            CourseSelectText = this.game.add.bitmapText(CourseSelect.x, CourseSelect.y-5, "8Bit", "Course\nSelect", 52);
            CourseSelectText.anchor.setTo(0.5, 0.5);
            CourseSelectText.scale.setTo(0.67);

            Retry = this.game.add.button(this.game.world.centerX + 450, this.game.world.centerY + 275, "Button", this.Retry, this, 0, 0, 1, 0);
            Retry.anchor.setTo(0.5, 0.5);
            Retry.scale.setTo(0.67);
            RetryText = this.game.add.bitmapText(Retry.x, Retry.y-7, "8Bit", "Retry", 72);
            RetryText.anchor.setTo(0.5, 0.5);
            RetryText.scale.setTo(0.67);
        }

    },

    CourseSelect: function() {

        if (RoomNumber == 1) {
            Play.destroy();
            PlayText.destroy();
            Options.destroy();
            OptionsText.destroy();
        }

        if (RoomNumber == 4) {
            CourseEnded = false;
            Leaderboard = false;
            Title.destroy();
            Hole.destroy();
            Par.destroy();
            ScoreText.destroy();
            for (i = 0; i < StrokeArray.length; i++){ ScoreArray[i].destroy();}
            //Score.destroy();
            CoursePar.destroy();
            Overall.destroy();
            OverallText.destroy();
            CourseSelect.destroy();
            CourseSelectText.destroy();
            Retry.destroy();
            RetryText.destroy();
            BackgroundP.destroy();
            Logo = this.game.add.sprite(this.game.world.width/2, this.game.world.height/5, "Logo");
            Logo.anchor.setTo(0.5, 0.5);
        }

        Back = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200, "Button", this.GoBack, this, 0, 0, 1, 0);
        Back.anchor.setTo(0.5, 0.5);
        Back.scale.setTo(0.67);
        BackText = this.game.add.bitmapText(Back.x, Back.y-10, "8Bit", "Back", 84);
        BackText.anchor.setTo(0.5, 0.5);
        BackText.scale.setTo(0.67);

        Level1 = this.game.add.button(this.game.world.centerX, this.game.world.centerY +75, "Level1", this.GoToCourse1, this, 0, 0, 1, 0);
        Level2 = this.game.add.button(Level1.x+320, this.game.world.centerY+75, "Level2", this.GoToCourse2, this, 0, 0, 1, 0);
        Level1.anchor.setTo(0.5, 0.5);
        Level1.scale.setTo(0.67);
        Level2.anchor.setTo(0.5, 0.5);
        Level2.scale.setTo(0.67);
        Level1.inputEnabled = true;
        //Level2.inputEnabled = true;

        //Set Room Number to Level Select
        RoomNumber = 3;

        Level1.events.onInputUp.add(this.GoToCourse1);
        /*Level2.events.onInputOver.add(function(){
         this.game.state.start("GameState")
         });*/


    },

    Retry: function(){
        if (LastCourse = 1){
            this.game.state.start("Level1");
        }
    },

    GoBack: function(){
        if (Play != undefined) Play.destroy();
        if (PlayText != undefined) PlayText.destroy();
        if (StatBoard != undefined) StatBoard.destroy();
        if (Title != undefined) Title.destroy();
        if (Statistics != undefined) Statistics.destroy();
        if (BestScoreText != undefined) BestScoreText.destroy();
        if (BestTimeText != undefined) BestTimeText.destroy();
        if (TotalShotsText != undefined) TotalShotsText.destroy();
        if (WaterHitText != undefined) WaterHitText.destroy();
        if (!Logo){
            Logo = this.game.add.sprite(this.game.world.width/2, this.game.world.height/5, "Logo");
            Logo.anchor.setTo(0.5, 0.5);
        }



        //Create Play Button
        Play = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 75, "Button", this.CourseSelect, this, 0, 0, 1, 0);
        Play.anchor.setTo(0.5, 0.5);
        Play.scale.setTo(0.67);
        PlayText = this.game.add.bitmapText(Play.x, Play.y-8, "8Bit", "Play", 84);
        PlayText.anchor.setTo(0.5, 0.5);
        PlayText.scale.setTo(0.67);

        //Create Options Button
        Options = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200, "Button", this.StartOptions, this, 0, 0, 1, 0);
        Options.anchor.setTo(0.5, 0.5);
        Options.scale.setTo(0.67);
        OptionsText = this.game.add.bitmapText(Options.x, Options.y - 5, "8Bit", "Options", 52);
        OptionsText.anchor.setTo(0.5, 0.5);
        OptionsText.scale.setTo(0.67);

        Back.destroy();
        BackText.destroy();
        if (Fullscreen != undefined) Fullscreen.destroy();
        if (FullscreenText != undefined)FullscreenText.destroy();
        if (MusicOn != undefined) MusicOn.destroy();
        if (MusicOff != undefined) MusicOff.destroy();
        if (SoundOn != undefined) SoundOn.destroy();
        if (SoundOff != undefined) SoundOff.destroy();
        if (Level1 != undefined) Level1.destroy();
        if (Level2 != undefined) Level2.destroy();

        RoomNumber = 1;
    },

    TurnMusicOff: function(){
        MusicOff = this.game.add.button(this.game.world.centerX - 135, this.game.world.centerY - 100, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0); MusicOff.scale.setTo(0.67);
        MusicOn.destroy();
        Music = false;
        //Turn Music Off here
        MusicControl.pause();
    },

    TurnMusicOn: function(){
        MusicOn = this.game.add.button(this.game.world.centerX - 135, this.game.world.centerY - 100, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0); MusicOn.scale.setTo(0.67);
        MusicOff.destroy();
        Music = true;
        //Turn Music On here
        MusicControl.play();

    },

    TurnSoundOff: function(){
        SoundOff = this.game.add.button(this.game.world.centerX + 25, this.game.world.centerY - 100, "SoundOff", this.TurnSoundOn, this, 0, 0, 1, 0); SoundOff.scale.setTo(0.67);
        SoundOn.destroy();
        Sound = false;
        //Turn Sound Off here
    },

    TurnSoundOn: function() {
        SoundOn = this.game.add.button(this.game.world.centerX + 25, this.game.world.centerY - 100, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0); SoundOn.scale.setTo(0.67);
        SoundOff.destroy();
        Sound = true;
        //Turn Sound On here
    },

    GoToCourse1: function(){
        MusicControl.stop();
        Level1.destroy();
        Level2.destroy();
        Back.destroy();
        BackText.destroy();
        Logo.destroy();

        StatBoard = this.game.add.sprite(this.game.world.centerX - 360, this.game.world.centerY + 75, "Scoreboard");
        StatBoard.anchor.setTo(0.5);
        StatBoard.scale.setTo(0.5);
        Title = this.game.add.bitmapText(this.game.world.centerX, 100, "8Bit", "Grassy Land", 84);
        Title.anchor.setTo(0.5);
        Statistics = this.game.add.bitmapText(StatBoard.x, this.game.world.centerY - 100, "8Bit", "Statistics", 32);
        Statistics.anchor.setTo(0.5);


        BestScoreText = this.game.add.bitmapText(StatBoard.x - 175, StatBoard.y - 100, "8Bit2", "Best Score: " + localStorage.getItem("BestScore"), 28);
        BestScoreText.tint = "0x000000";
        BestTimeText = this.game.add.bitmapText(StatBoard.x - 175, StatBoard.y - 25, "8Bit2", "Best Time: " + localStorage.getItem("BestTime"), 28);
        BestTimeText.tint = "0x000000";
        TotalShotsText = this.game.add.bitmapText(StatBoard.x - 175, StatBoard.y +50, "8Bit2", "Total Shots: " + Number(localStorage.getItem("TotalShots")).toString(), 28);
        TotalShotsText.tint = "0x000000";
        WaterHitText = this.game.add.bitmapText(StatBoard.x - 175, StatBoard.y + 125, "8Bit2", "Water Hit: " + localStorage.getItem("WaterHit"), 28);
        WaterHitText.tint = "0x000000";

        Play = this.game.add.button(this.game.world.centerX + 400, this.game.world.centerY + 250, "Button", this.Course1, this, 0, 0, 1, 0);
        Play.anchor.setTo(0.5, 0.5);
        Play.scale.setTo(0.67);
        PlayText = this.game.add.bitmapText(Play.x, Play.y-8, "8Bit", "Play", 84);
        PlayText.anchor.setTo(0.5, 0.5);
        PlayText.scale.setTo(0.67);

        Back = this.game.add.button(this.game.world.centerX + 100, this.game.world.centerY + 250, "Button", this.GoBack, this, 0, 0, 1, 0);
        Back.anchor.setTo(0.5, 0.5);
        Back.scale.setTo(0.67);
        BackText = this.game.add.bitmapText(Back.x, Back.y-10, "8Bit", "Back", 84);
        BackText.anchor.setTo(0.5, 0.5);
        BackText.scale.setTo(0.67);
    },

    GoToCourse2: function(){
        //this.game.state.start("GameState")
    },

    Course1: function(){
        MusicControl.stop();
        Play.destroy();
        PlayText.destroy();
        StatBoard.destroy();
        Title.destroy();
        Statistics.destroy();
        BestScoreText.destroy();
        BestTimeText.destroy();
        TotalShotsText.destroy();
        WaterHitText.destroy();
        this.game.state.start("Level1")
    },

    Fullscreen: function () {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.refresh();

        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        } else {
            this.game.scale.startFullScreen();
        }
    }

};