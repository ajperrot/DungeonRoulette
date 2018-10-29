//events.js
//possible outcomes of the dungeon games

var gNewJob;
var gOver = false;

function newGame(){
 if(gOver == false){
  updateExp(1);
  updateGxp(1);
  if(gOver == false){
   if(gGame == 0){
    chooseInsert();
   }else if(gGame ==1){
    chooseColor();
   }
  }
 }
}

function winCp(){
 if(gOver == false){
  logWrite("Suddenly, chips begin spilling out of the machine! SCORE!!!")
  updateCp(Math.ceil(Math.random()*10));
  newGame();
 }
}

function winHp(){
 if(gOver == false){
  logWrite("You feel a sudden jolt of energy, before noticing the game has injected you with additional blood! You quietly pray the blood is your own...");
  if(gPlayer.job.id == 4){
   updateHp(Math.abs(gPlayer.maxHp - gPlayer.hp) + (Math.floor(Math.random()*4)-2));
  }
  else{
   updateHp(Math.abs(gPlayer.lv*(Math.floor(Math.random()*6))));
  }
  if(gOver == false){
   newGame();
  }
 }
}

function loseHp(){
 if(gOver == false){
  logWrite("It's a trap!! The game itself attacks you?!");
  updateHp((Math.abs(gPlayer.lv*(Math.floor(Math.random()*3))))*-1);
  if(gOver == false){
   newGame();
  }
 }
}

function winExp(){
 if(gOver == false){
  logWrite("Your past decisions weigh heavily on you... But this was a smart one!");
  updateExp(Math.floor(Math.random()*4));
  reRoll();
 }
}

function changeJob(){
 if(gOver == false){
  gNewJob = gJobs[Math.floor(Math.random()*(gJobs.length - 1))];
  logWrite("CONGRATULATIONS! You have been BLESSED with the OPPORTUNITY to switch to the "+gNewJob.name+" class! Would you like to do so?");
  chooseJob();
 }
}

function shotOffer(){
 if(gOver == false){
  logWrite("What's this? The house has offered you a mysterious drink in a shot glass... Do you accept?");
  chooseShot();
 }
}

function changeGame(){
 if(gOver == false){
  logWrite("...Huh? The current game appears to be closing... What will you play now?");
  chooseGame();
 }
}

function mook(){
 if(gOver == false){
  gEnemy = new character(Math.floor(Math.random()*gGames[gGame].glv), 0,
                         Math.floor(Math.random()*gGames[gGame].glv),
                         gJobs[Math.floor(Math.random()*(gJobs.length-1))], ""
                        );
 logWrite("Hark! A lowly LV"+gEnemy.lv+" "+gEnemy.job.name+" challenges you!!");
 chooseMove();
 }
}

function duel(){
 if(gOver == false){
  gEnemy = new character(Math.ceil(Math.random()*gPlayer.lv), 1, gPlayer.lv,
                         gJobs[Math.floor(Math.random()*(gJobs.length-1))], ""
                        );
  logWrite("A duel has been ordained! BEHOLD! A LV"+gEnemy.lv+" "+gEnemy.job.name+"!!!");
  chooseMove();
 }
}

function midboss(){
 if(gOver == false){
  gEnemy = new character(gGames[gGame].glv, 2, gGames[gGame].glv,
                         gJobs[Math.floor(Math.random()*(gJobs.length-1))], ""
                        );
  logWrite("A MIDBOSS, in the form of "+gEnemy.job.name+", is attacking!! PREPARE YOURSELF.");
  chooseMove();
 }
}

function finalBoss(){
 gOver = true;
 gEnemy = new character(9999, 0, 5, gJobs[10], "");
 logWrite("Suddenly, you notice the casino is oddly quiet... You wonder how long you've been sitting at this game...");
 logWrite("The man who greeted you when you first entered approches you from behind, and speaks...");
 logWrite("Well, well! I have to say, I'm very impressed by how long you've survived... You've done so well, all my other patrons have died betting against you. Why, I may even have to close up shop soon... What a shame to do so after so many years... Thanks to you however, there's enough blood in these machines to keep me alive for millenia! Still... There's one final loose end I need to cut off before I can retire in peace...");
 gPlayer.hp = gPlayer.maxHp;
 document.getElementById("hpDisplay").innerHTML = gPlayer.hp;
 logWrite("The LV"+gEnemy.lv+" "+gEnemy.name+" is ATTEMPTING to MURDER you.");
 chooseMove();
}

var gEvents = [winCp, winHp, winExp, changeJob, loseHp, mook, duel, midboss, shotOffer, changeGame];