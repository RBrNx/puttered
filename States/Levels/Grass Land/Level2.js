/**
 * Created by Conor on 14/04/2015.
 */
var Level1 = function(game){};
//Sprites
var Player;
var Clouds;
var Fairway;
var FairwayHole;
var Ball;
var Hills;
var Resume;
var Restart;
var Menu;
var BackgroundP;
var Scoreboard;

//Objects
var Emitter;
var ballMaterial;
var groundMaterial;
var contactMaterial;

//Variables
var Radian = 0.0174532925;
var Started = "false";
var Power = 0;
var LevelComplete = false;
var BallStationary;
var Paused;
var CameraCenterX;
var CameraCenterY;
var Timer;
var ScoreboardShown = false;
var StrokeArray = [];
var StrokeCount = 0;
var SavedBallVelX;
var SavedBallVelY;
var HoleNumber = 0;
var FinishSwing = false;
