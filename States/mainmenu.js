/**
 * Created by B00231929 on 20/03/2015.
 */

/**
 * Globals for use in main menu
 */
var mainMenu = function(game){};
/**
 * Variables to Hold Sprites and Text
 */
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
var Level1Text;
var Level2Text;

/**
 * Variables for the Local Storage and Online Leaderboards
 */
var Title;
var ScoreText;
var Score;
var ScoreArray = []; //Holds Bitmap Text Objects to Display the Score at the End of the Level
var HighScoresCourse1 = [];
var HighScoresCourse2 = [];
var Overall;
var OverallText;
var CourseSelect;
var CourseSelectText;
var Retry;
var RetryText;
var BackgroundP;
var StatBoard;
var Statistics;
var BestScoreText;
var BestTimeText;
var TotalShotsText;
var WaterHitText;
var TimesPlayedText;
var Course1TimesPlayed = 0;
var Course2TimesPlayed = 0;
var HighScoreBoard;
var LeaderboardText;
var RoomNumber;
var LastCourse = 0;
var CourseEnded = false;
var Leaderboard = false;
var HoleNumber = 0;
var LoadedNameCourse1 = [];
var LoadedScoreCourse1 = [];
var LoadedNameCourse2 = [];
var LoadedScoreCourse2 = [];
var LeaderboardFoundCourse1 = false;
var LeaderboardFoundCourse2 = false;
var results;

var CourseTimer = 0;

var Sound = true;
var Music = true;
var MusicControl;

mainMenu.prototype = {
    /**
     * Creates objects required for use within the main menu
     */
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

        /**
         * Deals with Course 1 Storage
         */
       if (!localStorage.getItem("Course1BestScore")){
            localStorage.setItem("Course1BestScore", "0")
        }
        if (!localStorage.getItem("Course1BestTime")){
            localStorage.setItem("Course1BestTime", "0")
        }
        if (!localStorage.getItem("Course1TotalShots")){
            localStorage.setItem("Course1TotalShots", "0")
        }
        if (!localStorage.getItem("Course1WaterHit")){
            localStorage.setItem("Course1WaterHit", "0")
        }
        if (!localStorage.getItem("Course1TimesPlayed")){
            localStorage.setItem("Course1TimesPlayed", "0")
        }

        /**
         * Deals with Course 2 Storage
         */
        if (!localStorage.getItem("Course2BestScore")){
            localStorage.setItem("Course2BestScore", "0")
        }
        if (!localStorage.getItem("Course2BestTime")){
            localStorage.setItem("Course2BestTime", "0")
        }
        if (!localStorage.getItem("Course2TotalShots")){
            localStorage.setItem("Course2TotalShots", "0")
        }
        if (!localStorage.getItem("Course2WaterHit")){
            localStorage.setItem("Course2WaterHit", "0")
        }
        if (!localStorage.getItem("Course2TimesPlayed")){
            localStorage.setItem("Course2TimesPlayed", "0")
        }

        var PostScores = confirm("Would you like to upload your score to the High Score table?");
        if (PostScores == true){
            var Name = prompt("Please enter your name");
            if (Name != null){

                $.ajax({
                    url: 'HighScores/SendData.php',
                    type: 'post',
                    data: {"name" : Name, "score" : -10, "hash": CryptoJS.MD5(Name + -10 + "15111994").toString(), "coursevalue" : 2},
                    success: function(data){
                        console.log(data);
                    }
                })
            }
        }
    },

    /**
     * Handles the game logic - physics, positions and rendering
     */
    update: function(){
        Clouds.tilePosition.x += 1;

        if (RoomNumber == 3) {
            if (Level2 != undefined && Level1 != undefined && Level1Text != undefined && Level2Text != undefined) {

                if (this.game.input.activePointer.isDown) {
                    if (this.game.origDragPoint) {
                        // move the camera by the amount the mouse has moved since last update
                        Level1.x -= this.game.origDragPoint.x - this.game.input.activePointer.position.x;
                        Level1Text.x -= this.game.origDragPoint.x - this.game.input.activePointer.position.x;
                        Level2.x -= this.game.origDragPoint.x - this.game.input.activePointer.position.x;
                        Level2Text.x -= this.game.origDragPoint.x - this.game.input.activePointer.position.x;
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
                        Level1Text.x = 640;
                        Level2Text.x = 960;
                    }
                    if (Math.pow(Level1.x - 640, 2) > Math.pow(Level2.x - 640, 2)) {
                        Level1.x = 320;
                        Level2.x = 640;
                        Level1Text.x = 320;
                        Level2Text.x = 640;
                    }

                });

                if(Level1Text.x < this.game.world.centerX || Level1Text.x > this.game.world.centerX){
                    Level1Text.alpha = (this.game.centerX - Level1Text.x)/1000
                }
                if (Level1Text.x == this.game.world.centerX){
                    Level1Text.alpha = 1;
                }
                if(Level2Text.x < this.game.world.centerX || Level2Text.x > this.game.world.centerX){
                    Level2Text.alpha = (this.game.centerX - Level2Text.x)/1000
                }
                if (Level2Text.x == this.game.world.centerX){
                    Level2Text.alpha = 1;
                }
            }
        }

        if (CourseEnded == true && Leaderboard == false){
            this.EndOfLevel();
        }

        if (LeaderboardFoundCourse1 == true){
            for (var i = 0, j = 0, space = 55; i < LoadedNameCourse1.length; i++, j+=3, space += 55) {
                LeaderNum = this.game.add.bitmapText(this.game.world.centerX + 20, this.game.world.centerY - 160 + space, "8Bit2", "\n" + (i+1) + ".   ", 38);
                LeaderName = this.game.add.bitmapText(this.game.world.centerX + 100, this.game.world.centerY - 160 + space, "8Bit2", "\n" + LoadedNameCourse1[i], 38);
                LeaderScore = this.game.add.bitmapText(this.game.world.centerX + 390, this.game.world.centerY - 160 + space, "8Bit2","\n" + LoadedScoreCourse1[i], 38);
                LeaderNum.tint = "0x000000";
                LeaderName.tint = "0x000000";
                LeaderScore.tint = "0x000000";
                HighScoresCourse1[j] = LeaderNum;
                HighScoresCourse1[j+1] = LeaderName;
                HighScoresCourse1[j+2] = LeaderScore;
            }
            LeaderboardFoundCourse1 = false;
        }

        if (LeaderboardFoundCourse2 == true){
            for (var i = 0, j = 0, space = 55; i < LoadedNameCourse2.length; i++, j+=3, space += 55) {
                LeaderNum = this.game.add.bitmapText(this.game.world.centerX + 20, this.game.world.centerY - 160 + space, "8Bit2", "\n" + (i+1) + ".   ", 38);
                LeaderName = this.game.add.bitmapText(this.game.world.centerX + 100, this.game.world.centerY - 160 + space, "8Bit2", "\n" + LoadedNameCourse2[i], 38);
                LeaderScore = this.game.add.bitmapText(this.game.world.centerX + 390, this.game.world.centerY - 160 + space, "8Bit2","\n" + LoadedScoreCourse2[i], 38);
                LeaderNum.tint = "0x000000";
                LeaderName.tint = "0x000000";
                LeaderScore.tint = "0x000000";
                HighScoresCourse2[j] = LeaderNum;
                HighScoresCourse2[j+1] = LeaderName;
                HighScoresCourse2[j+2] = LeaderScore;
            }
            LeaderboardFoundCourse2 = false;
        }

    },

    /**
     * used to output debug information
     */
    render: function(){
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
    },

    /**
     * Function sets up the menu for the options in the games main menu and handles buttons for sfx, music and full screen mode
     */
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

    /**
     * Function handles the creation of the stat display at the end of a level for players best time, score, water hazards and total shots
     */
    EndOfLevel: function() {
        Leaderboard = true;
        RoomNumber = 4;
        Play.destroy();
        PlayText.destroy();
        Options.destroy();
        OptionsText.destroy();
        Logo.visible = false;

        /**
         * If Course Played was Course 1...
         */
        if (LastCourse == 1) {

            BackgroundP = this.game.add.sprite(this.game.camera.x, this.game.camera.y, "BackgroundP");
            BackgroundP.scale.setTo(0.67);
            Title = this.game.add.bitmapText(this.game.world.centerX, 75, "8Bit2", "Grassy Land\n  Complete!", 64);
            Title.anchor.setTo(0.5);

            Hole = this.game.add.bitmapText(this.game.world.centerX - 550, this.game.world.centerY - 150, "8Bit2", "Hole\n\n\n   1\n\n   2\n\n   3\n\n   4\n\n " +
                "  5\n\n   6\n\n   7\n\n   8\n\n   9", 22);

            Par = this.game.add.bitmapText(this.game.world.centerX - 350, this.game.world.centerY - 150, "8Bit2", "Par\n\n\n  " + ParArray[0] + "\n\n  " + ParArray[1] + "\n\n  " +
                ParArray[2] + "\n\n  " + ParArray[3] + "\n\n  " + ParArray[4] + "\n\n  " + ParArray[5] + "\n\n  " + ParArray[6] + "\n\n  " + ParArray[7] + "\n\n  " + ParArray[8], 22);

            ScoreText = this.game.add.bitmapText(this.game.world.centerX - 160, this.game.world.centerY - 150, "8Bit2", "Strokes", 22);
            for (var i = 0, space = 44; i < StrokeArray.length; i++, space += 44) {
                Score = this.game.add.bitmapText(this.game.world.centerX - 160, this.game.world.centerY - 150 + space, "8Bit2", "\n     " + StrokeArray[i], 22);
                ScoreArray[i] = Score;
                if (StrokeArray[i] < ParArray[i]) {
                    Score.tint = "0x00FF00";
                }
                else if (StrokeArray[i] > ParArray[i]) {
                    Score.tint = "0xFF0000";
                }
                else if (StrokeArray[i] == ParArray[i]) {
                    Score.tint = "0xFFFF00";
                }
            }


            for (var i = 0, sum = 0, sum2 = 0; i < StrokeArray.length; i++) {
                sum += StrokeArray[i];
                sum2 += ParArray[i];
            }

            CoursePar = this.game.add.bitmapText(this.game.world.centerX + 100, this.game.world.centerY - 150, "8Bit2", "Par: " + sum2 + "\n\nStrokes: " + sum);
            var OverallScore = sum - sum2;
            Overall = this.game.add.bitmapText(this.game.world.centerX + 100, this.game.world.centerY, "8Bit2", "Overall\n Score\n");
            OverallText = this.game.add.bitmapText(this.game.world.centerX + 140, this.game.world.centerY + 75, "8Bit2", OverallScore.toString(), 64);
            if (OverallScore < sum2) {
                OverallText.tint = "0x00FF00";
            }
            else if (OverallScore > sum2) {
                OverallText.tint = "0xFF0000";
            }
            else if (OverallScore == sum2) {
                OverallText.tint = "0xFFFF00";
            }


            if (OverallScore < Number(localStorage.getItem("Course1BestScore"))) {
                localStorage.setItem("Course1BestScore", OverallScore.toString());
            }
            if ((Number(localStorage.getItem("Course1BestScore"))) == 0) {
                localStorage.setItem("Course1BestScore", OverallScore.toString());
            }

            SavedTimer = (CourseTimer / 60) / 60;

            if (SavedTimer < Number(localStorage.getItem("Course1BestTime"))) {
                localStorage.setItem("Course1BestTime", SavedTimer.toString());
            }

            if ((Number(localStorage.getItem("Course1BestTime"))) == 0) {
                localStorage.setItem("Course1BestTime", SavedTimer.toString());
            }
            if (TotalShots > Number(localStorage.getItem("Course1TotalShots"))) {
                localStorage.setItem("Course1TotalShots", TotalShots.toString());
            }
            if (WaterHit > Number(localStorage.getItem("Course1WaterHit"))) {
                localStorage.setItem("Course1WaterHit", WaterHit.toString());
            }
            if (Course1TimesPlayed > Number(localStorage.getItem("Course1TimesPlayed"))) {
                localStorage.setItem("Course1TimesPlayed", Course1TimesPlayed.toString());
            }

            var PostScores = confirm("Would you like to upload your score to the High Score table?");
            if (PostScores == true) {
                var Name = prompt("Please enter your name");
                if (Name != null) {
                    var HashKey = CryptoJS.MD5(Name + OverallScore + "1511994");

                    $.ajax({
                        url: 'HighScores/SendData.php',
                        type: 'post',
                            data: {"name": Name, "score": OverallScore, "hash": HashKey, "coursevalue" : "1"},
                        success: function (data) {
                            console.log(data);
                        }
                    })
                }
            }
        }



        /**
         * If Course Played was Course 2...
         */
        if (LastCourse == 2) {

            BackgroundP = this.game.add.sprite(this.game.camera.x, this.game.camera.y, "BackgroundP");
            BackgroundP.scale.setTo(0.67);
            Title = this.game.add.bitmapText(this.game.world.centerX, 75, "8Bit2", "Spaced Out\n  Complete!", 64);
            Title.anchor.setTo(0.5);

            Hole = this.game.add.bitmapText(this.game.world.centerX - 550, this.game.world.centerY - 150, "8Bit2", "Hole\n\n\n   1\n\n   2\n\n   3\n\n   4\n\n " +
                "  5\n\n   6\n\n   7\n\n   8\n\n   9", 22);

            Par = this.game.add.bitmapText(this.game.world.centerX - 350, this.game.world.centerY - 150, "8Bit2", "Par\n\n\n  " + ParArrayCourse2[0] + "\n\n  " + ParArrayCourse2[1] + "\n\n  " +
                ParArrayCourse2[2] + "\n\n  " + ParArrayCourse2[3] + "\n\n  " + ParArrayCourse2[4] + "\n\n  " + ParArrayCourse2[5] + "\n\n  " +
                ParArrayCourse2[6] + "\n\n  " + ParArrayCourse2[7] + "\n\n  " + ParArrayCourse2[8], 22);

            ScoreText = this.game.add.bitmapText(this.game.world.centerX - 160, this.game.world.centerY - 150, "8Bit2", "Strokes", 22);
            for (var i = 0, space = 44; i < StrokeArray.length; i++, space += 44) {
                Score = this.game.add.bitmapText(this.game.world.centerX - 160, this.game.world.centerY - 150 + space, "8Bit2", "\n     " + StrokeArrayCourse2[i], 22);
                ScoreArray[i] = Score;
                if (StrokeArrayCourse2[i] < ParArrayCourse2[i]) {
                    Score.tint = "0x00FF00";
                }
                else if (StrokeArrayCourse2[i] > ParArrayCourse2[i]) {
                    Score.tint = "0xFF0000";
                }
                else if (StrokeArrayCourse2[i] == ParArrayCourse2[i]) {
                    Score.tint = "0xFFFF00";
                }
            }


            for (var i = 0, sum = 0, sum2 = 0; i < StrokeArrayCourse2.length; i++) {
                sum += StrokeArrayCourse2[i];
                sum2 += ParArrayCourse2[i];
            }

            CoursePar = this.game.add.bitmapText(this.game.world.centerX + 100, this.game.world.centerY - 150, "8Bit2", "Par: " + sum2 + "\n\nStrokes: " + sum);
            var OverallScore = sum - sum2;
            Overall = this.game.add.bitmapText(this.game.world.centerX + 100, this.game.world.centerY, "8Bit2", "Overall\n Score\n");
            OverallText = this.game.add.bitmapText(this.game.world.centerX + 140, this.game.world.centerY + 75, "8Bit2", OverallScore.toString(), 64);
            if (OverallScore < sum2) {
                OverallText.tint = "0x00FF00";
            }
            else if (OverallScore > sum2) {
                OverallText.tint = "0xFF0000";
            }
            else if (OverallScore == sum2) {
                OverallText.tint = "0xFFFF00";
            }


            if (OverallScore < Number(localStorage.getItem("Course2BestScore"))) {
                localStorage.setItem("Course2BestScore", OverallScore.toString());
            }
            if ((Number(localStorage.getItem("Course2BestScore"))) == 0) {
                localStorage.setItem("Course2BestScore", OverallScore.toString());
            }

            SavedTimer = (CourseTimer / 60) / 60;

            if (SavedTimer < Number(localStorage.getItem("Course2BestTime"))) {
                localStorage.setItem("Course2BestTime", SavedTimer.toString());
            }

            if ((Number(localStorage.getItem("Course2BestTime"))) == 0) {
                localStorage.setItem("Course2BestTime", SavedTimer.toString());
            }
            if (TotalShots > Number(localStorage.getItem("Course2TotalShots"))) {
                localStorage.setItem("Course2TotalShots", TotalShots.toString());
            }
            if (WaterHit > Number(localStorage.getItem("Course2WaterHit"))) {
                localStorage.setItem("Course2WaterHit", WaterHit.toString());
            }
            if (Course2TimesPlayed > Number(localStorage.getItem("Course2TimesPlayed"))) {
                localStorage.setItem("Course2TimesPlayed", Course2TimesPlayed.toString());
            }

            var PostScores = confirm("Would you like to upload your score to the High Score table?");
            if (PostScores == true) {
                var Name = prompt("Please enter your name");
                if (Name != null) {
                    var HashKey = CryptoJS.MD5(Name + OverallScore + "1511994");

                    $.ajax({
                        url: 'HighScores/SendData.php',
                        type: 'post',
                        data: {"name": Name, "score": OverallScore, "hash": HashKey, "coursevalue" : "2"},
                        success: function (data) {
                            console.log(data);
                        }
                    })
                }
            }
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

    },

    /**
     * Sets up menu for selecting which course to play
     */
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

        Level1 = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 75, "Level1", this.GoToCourse1, this, 0, 0, 1, 0);
        Level1Text = this.game.add.bitmapText(Level1.x, Level1.y - 100, "8Bit", "Grassy Land", 48);
        Level2 = this.game.add.button(Level1.x+320, this.game.world.centerY + 75, "Level2", this.GoToCourse2, this, 0, 0, 1, 0);
        Level2Text = this.game.add.bitmapText(Level2.x, Level2.y - 100, "8Bit", "Spaced Out", 48);
        Level1.anchor.setTo(0.5, 0.5);
        Level1Text.anchor.setTo(0.5, 0.5);
        Level1.scale.setTo(0.67);
        Level2.anchor.setTo(0.5, 0.5);
        Level2Text.anchor.setTo(0.5, 0.5);
        Level2.scale.setTo(0.67);
        Level1.inputEnabled = true;
        //Level2.inputEnabled = true;

        //Set Room Number to Level Select
        RoomNumber = 3;


    },

    /**
     * Handles resarting a course
     */
    Retry: function(){
        if (LastCourse == 1){
            this.game.state.start("Level1");
        }
        if (LastCourse == 2){
            this.game.state.start("Level2-1");
        }

    },

    /**
     * Handles moving back in the menu
     */
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
        if (TimesPlayedText != undefined) TimesPlayedText.destroy();
        if (HighScoreBoard != undefined) HighScoreBoard.destroy();
        for (i = 0; i < HighScoresCourse1.length; i++) {HighScoresCourse1[i].destroy();}
        for (i = 0; i < HighScoresCourse2.length; i++) {HighScoresCourse2[i].destroy();}
        if (LeaderboardText != undefined) LeaderboardText.destroy();
        Logo.visible = true;


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
        if (Level1Text != undefined) Level1Text.destroy();
        if (Level2Text != undefined) Level2Text.destroy();

        RoomNumber = 1;
    },

    /**
     * Turns off the menu music
     */
    TurnMusicOff: function(){
        MusicOff = this.game.add.button(this.game.world.centerX - 135, this.game.world.centerY - 100, "MusicOff", this.TurnMusicOn, this, 0, 0, 1, 0); MusicOff.scale.setTo(0.67);
        MusicOn.destroy();
        Music = false;
        //Turn Music Off here
        MusicControl.pause();
    },

    /**
     * Turns on the menu music
     */
    TurnMusicOn: function(){
        MusicOn = this.game.add.button(this.game.world.centerX - 135, this.game.world.centerY - 100, "MusicOn", this.TurnMusicOff, this, 0, 0, 1, 0); MusicOn.scale.setTo(0.67);
        MusicOff.destroy();
        Music = true;
        //Turn Music On here
        MusicControl.play();

    },

    /**
     * Turns off sound effects in the game
     */
    TurnSoundOff: function(){
        SoundOff = this.game.add.button(this.game.world.centerX + 25, this.game.world.centerY - 100, "SoundOff", this.TurnSoundOn, this, 0, 0, 1, 0); SoundOff.scale.setTo(0.67);
        SoundOn.destroy();
        Sound = false;
        //Turn Sound Off here
    },

    /**
     * Turns on sound effects in the game
     */
    TurnSoundOn: function() {
        SoundOn = this.game.add.button(this.game.world.centerX + 25, this.game.world.centerY - 100, "SoundOn", this.TurnSoundOff, this, 0, 0, 1, 0); SoundOn.scale.setTo(0.67);
        SoundOff.destroy();
        Sound = true;
        //Turn Sound On here
    },

    /**
     * Handles starting course 1
     * @param button
     * @param pointer
     * @param isOver - uses button and pointer parameters to check if the mouse is over the button
     */
    GoToCourse1: function(button, pointer, isOver){
        if (isOver) {
            MusicControl.stop();
            Level1.destroy();
            Level2.destroy();
            Level1Text.destroy();
            Level2Text.destroy();
            Back.destroy();
            BackText.destroy();
            Logo.visible = false;

            StatBoard = this.game.add.sprite(this.game.world.centerX - 350, this.game.world.centerY + 75, "Scoreboard");
            StatBoard.anchor.setTo(0.5);
            StatBoard.scale.setTo(0.6, 0.6);
            Title = this.game.add.bitmapText(this.game.world.centerX, 60, "8Bit", "Grassy Land", 84);
            Title.anchor.setTo(0.5);
            Statistics = this.game.add.bitmapText(StatBoard.x, this.game.world.centerY - 130, "8Bit", "Statistics", 48);
            Statistics.anchor.setTo(0.5);


            BestScoreText = this.game.add.bitmapText(StatBoard.x - 220, StatBoard.y - 120, "8Bit2", "Best Score: " + localStorage.getItem("Course1BestScore"), 28);
            BestScoreText.tint = "0x000000";
            BestTimeClock = Number(localStorage.getItem("Course1BestTime"));
            if (BestTimeClock < 1) {
                BestTimeClock = this.round(60 * BestTimeClock);
                BestTimeText = this.game.add.bitmapText(StatBoard.x - 220, StatBoard.y - 45, "8Bit2", "Best Time: " + BestTimeClock + "s", 28);
                BestTimeText.tint = "0x000000";
            }
            else {
                BestTimeClock = ( Math.floor(BestTimeClock) + "m " + this.round((BestTimeClock * 60) % 60) + "s");
                BestTimeText = this.game.add.bitmapText(StatBoard.x - 220, StatBoard.y - 45, "8Bit2", "Best Time: " + BestTimeClock, 28);
                BestTimeText.tint = "0x000000";
            }

            TotalShotsText = this.game.add.bitmapText(StatBoard.x - 220, StatBoard.y + 30, "8Bit2", "Total Shots: " + Number(localStorage.getItem("Course1TotalShots")).toString(), 28);
            TotalShotsText.tint = "0x000000";
            WaterHitText = this.game.add.bitmapText(StatBoard.x - 220, StatBoard.y + 105, "8Bit2", "Water Hit: " + localStorage.getItem("Course1WaterHit"), 28);
            WaterHitText.tint = "0x000000";
            TimesPlayedText = this.game.add.bitmapText(StatBoard.x - 220, StatBoard.y + 180, "8Bit2", "Times Played: " + Number(localStorage.getItem("Course1TimesPlayed")).toString(), 28);
            TimesPlayedText.tint = "0x000000";

            HighScoreBoard = this.game.add.sprite(this.game.world.centerX + 250, this.game.world.centerY + 20, "Scoreboard");
            HighScoreBoard.anchor.setTo(0.5);
            HighScoreBoard.scale.setTo(0.625, 0.475);

            //Leaderboard
            LeaderboardText = this.game.add.bitmapText(HighScoreBoard.x, this.game.world.centerY - 140, "8Bit", "Leaderboard", 45);
            LeaderboardText.anchor.setTo(0.5);
            $.ajax({
                url: 'HighScores/TopScores.php',
                type: 'post',
                data: {"coursevalue" : 1},
                success: function(data){
                    //console.log(data);
                    LeaderboardFoundCourse1 = true;
                    results = JSON.parse(data);
                    i = 0;

                    results.forEach(function(result){
                        LoadedNameCourse1[i] = result.name;
                        LoadedScoreCourse1[i] = result.score;
                        //console.log(LoadedName[i] + " - " + LoadedScore[i]);
                        i++;
                    });
                }
            });

            Play = this.game.add.button(this.game.world.centerX + 400, this.game.world.centerY + 285, "Button", this.Course1, this, 0, 0, 1, 0);
            Play.anchor.setTo(0.5, 0.5);
            Play.scale.setTo(0.67);
            PlayText = this.game.add.bitmapText(Play.x, Play.y - 8, "8Bit", "Play", 84);
            PlayText.anchor.setTo(0.5, 0.5);
            PlayText.scale.setTo(0.67);

            Back = this.game.add.button(this.game.world.centerX + 100, this.game.world.centerY + 285, "Button", this.GoBack, this, 0, 0, 1, 0);
            Back.anchor.setTo(0.5, 0.5);
            Back.scale.setTo(0.67);
            BackText = this.game.add.bitmapText(Back.x, Back.y - 10, "8Bit", "Back", 84);
            BackText.anchor.setTo(0.5, 0.5);
            BackText.scale.setTo(0.67);
        }
    },

    /**
     * Handles starting course 2
     */
    GoToCourse2: function(button, pointer, isOver){
        if (isOver) {
            MusicControl.stop();
            Level1.destroy();
            Level2.destroy();
            Level1Text.destroy();
            Level2Text.destroy();
            Back.destroy();
            BackText.destroy();
            Logo.visible = false;

            StatBoard = this.game.add.sprite(this.game.world.centerX - 350, this.game.world.centerY + 75, "Scoreboard");
            StatBoard.anchor.setTo(0.5);
            StatBoard.scale.setTo(0.6, 0.6);
            Title = this.game.add.bitmapText(this.game.world.centerX, 60, "8Bit", "Spaced Out", 84);
            Title.anchor.setTo(0.5);
            Statistics = this.game.add.bitmapText(StatBoard.x, this.game.world.centerY - 130, "8Bit", "Statistics", 48);
            Statistics.anchor.setTo(0.5);


            BestScoreText = this.game.add.bitmapText(StatBoard.x - 220, StatBoard.y - 120, "8Bit2", "Best Score: " + localStorage.getItem("Course2BestScore"), 28);
            BestScoreText.tint = "0x000000";
            BestTimeClock = Number(localStorage.getItem("Course2BestTime"));
            if (BestTimeClock < 1) {
                BestTimeClock = this.round(60 * BestTimeClock);
                BestTimeText = this.game.add.bitmapText(StatBoard.x - 220, StatBoard.y - 45, "8Bit2", "Best Time: " + BestTimeClock + "s", 28);
                BestTimeText.tint = "0x000000";
            }
            else {
                BestTimeClock = ( Math.floor(BestTimeClock) + "m " + this.round((BestTimeClock * 60) % 60) + "s");
                BestTimeText = this.game.add.bitmapText(StatBoard.x - 220, StatBoard.y - 45, "8Bit2", "Best Time: " + BestTimeClock, 28);
                BestTimeText.tint = "0x000000";
            }

            TotalShotsText = this.game.add.bitmapText(StatBoard.x - 220, StatBoard.y + 30, "8Bit2", "Total Shots: " + Number(localStorage.getItem("Course2TotalShots")).toString(), 28);
            TotalShotsText.tint = "0x000000";
            WaterHitText = this.game.add.bitmapText(StatBoard.x - 220, StatBoard.y + 105, "8Bit2", "Water Hit: " + localStorage.getItem("Course2WaterHit"), 28);
            WaterHitText.tint = "0x000000";
            TimesPlayedText = this.game.add.bitmapText(StatBoard.x - 220, StatBoard.y + 180, "8Bit2", "Times Played: " + Number(localStorage.getItem("Course2TimesPlayed")).toString(), 28);
            TimesPlayedText.tint = "0x000000";

            HighScoreBoard = this.game.add.sprite(this.game.world.centerX + 250, this.game.world.centerY + 20, "Scoreboard");
            HighScoreBoard.anchor.setTo(0.5);
            HighScoreBoard.scale.setTo(0.625, 0.475);

            //Leaderboard
            LeaderboardText = this.game.add.bitmapText(HighScoreBoard.x, this.game.world.centerY - 140, "8Bit", "Leaderboard", 45);
            LeaderboardText.anchor.setTo(0.5);
            $.ajax({
                url: 'HighScores/TopScores.php',
                type: 'post',
                data: {"coursevalue" : 2},
                success: function(data){
                    //console.log(data);
                    LeaderboardFoundCourse2 = true;
                    results = JSON.parse(data);
                    i = 0;

                    results.forEach(function(result){
                        LoadedNameCourse2[i] = result.name;
                        LoadedScoreCourse2[i] = result.score;
                        //console.log(LoadedName[i] + " - " + LoadedScore[i]);
                        i++;
                    });
                }
            });

            Play = this.game.add.button(this.game.world.centerX + 400, this.game.world.centerY + 285, "Button", this.Course2, this, 0, 0, 1, 0);
            Play.anchor.setTo(0.5, 0.5);
            Play.scale.setTo(0.67);
            PlayText = this.game.add.bitmapText(Play.x, Play.y - 8, "8Bit", "Play", 84);
            PlayText.anchor.setTo(0.5, 0.5);
            PlayText.scale.setTo(0.67);

            Back = this.game.add.button(this.game.world.centerX + 100, this.game.world.centerY + 285, "Button", this.GoBack, this, 0, 0, 1, 0);
            Back.anchor.setTo(0.5, 0.5);
            Back.scale.setTo(0.67);
            BackText = this.game.add.bitmapText(Back.x, Back.y - 10, "8Bit", "Back", 84);
            BackText.anchor.setTo(0.5, 0.5);
            BackText.scale.setTo(0.67);
        }
    },

    /**
     * Deletes main menu objects and loads course 1
     */
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
        TimesPlayedText.destroy();
        HighScoreBoard.destroy();
        this.game.state.start("Level1")
    },

    /**
     * Deletes main menu objects and loads course 2
     */
    Course2: function(){
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
        TimesPlayedText.destroy();
        HighScoreBoard.destroy();
        this.game.state.start("Level2-1");
    },

    /**
     * Rounds numbers for displaying on stat board
     */
    round: function(value){
        value = +value;
        if (isNaN(value)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + 2) : 2)));

        // Shift back
        value = value.toString().split('e');
        return (+(value[0] + 'e' + (value[1] ? (+value[1] - 2) : -2))).toFixed(2);
    },

    /**
     * Makes the game fullscreen
     */
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