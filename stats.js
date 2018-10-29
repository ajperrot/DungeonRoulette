//stats.js
//management of the stats view

function updateCp(change){
 if(gPlayer.job.id == 3){
  logWrite("As a whale, your transaction was doubled!");
  change *= 2;
 }
 gPlayer.cp = gPlayer.cp + change;
 if(change >= 0){
  logWrite("You got "+change+"CP!");
 }else{
  logWrite("You lost "+(change*-1)+"CP.");
 }
 document.getElementById("cpDisplay").innerHTML = gPlayer.cp;
}

function updateEcp(change){
 if(gEnemy.job.id == 3){
  logWrite("As a whale, "+gEnemy.name+"'s transaction was doubled!");
  change *= 2;
 }
 gEnemy.cp = gEnemy.cp + change;
 if(change > 0){
  logWrite(gEnemy.name+" got "+change+"CP!");
 }else{
  logWrite(gEnemy.name+" lost "+(change*-1)+"CP.");
 }
}

function updateEhp(change){
 if(gEnemy.job.id == 4){
  change *=-1;
 }
 gEnemy.hp += change;
 if(change > 0){
  logWrite(gEnemy.name+" gained "+change+"HP!");
 }else{
  logWrite(gEnemy.name+" lost "+(change*-1)+"HP!");
 }
 if(gEnemy.hp <= 0){
  if(gEnemy.job.id != 10){
   logWrite(gEnemy.name+" was bested!");
   updateExp(gEnemy.exp+1);
   updateCp(Math.abs(gEnemy.cp));
   updateGxp(gEnemy.exp+1);
   reRoll();
  }else{
   logWrite("The owner lets out a ravenous scream!! You can hear it reverberate throughout the night as his body slowly disintegrates into pure darkness...");
   logWrite("You contemplate what just happened...");
   logWrite("You have apparently killed the owner...");
   logWrite("Woah...");
   logWrite("You realize that you are now entitled to the entire fortune stored within the casino's vaults, as well as fame and fortune for exposing and slaying one of the last remaining vampire kings...");
   logWrite("You'll probably donate all the blood, you don't see much other use for that...");
   logWrite("...");
   logWrite("As a gambling addict, you are baffled. despite the odds, you somehow scored the ultimate jackpot...");
   logWrite("All that's left to do is go home...");
   logWrite("--Dungeon Roulette was created by Souly in 2018 for the GMTK Game Jam.--");
   logWrite("Thank you SO MUCH for beating my game. It means everything to me to have people make an attempt to understand the things I create. I hope you had fun!");
   logWrite("THE END");
   gOver = true;
  }
 }
}

function updateExp(change){
 if(gPlayer.job.id == 9){
  logWrite("As a student, you learned from the experience!");
  change *= 2;
 }
 gPlayer.exp = gPlayer.exp + change;
 if(change >= 0){
  logWrite("You got "+change+"EXP!");
 }else{
  logWrite("You lost "+(change*-1)+"EXP.");
 }
 if(gPlayer.exp >= 10){
  logWrite("You leveled up! HUZZAH!!!! Soon enough you'll be able to challenge the most merciless of opponents!");
  gPlayer.exp = 0;
  gPlayer.lv++;
  genStats(gPlayer);
  document.getElementById("lvDisplay").innerHTML = gPlayer.lv;
  document.getElementById("hpDisplay").innerHTML = gPlayer.hp;
 }
 document.getElementById("expDisplay").innerHTML = gPlayer.exp;
}

function updateHp(change){
 if(gPlayer.job.id == 4){
  change *= -1;
 }
 gPlayer.hp = gPlayer.hp + change;
 if(change > 0){
  logWrite("You gained "+change+"HP!");
 }else{
  logWrite("You lost "+(change*-1)+"HP.");
 }
 document.getElementById("hpDisplay").innerHTML = gPlayer.hp;
 if(gPlayer.hp <= 0){
  logWrite("Softly, you draw your last breath. You knew this was possible, and it looks like what fate had in mind today.");
  logWrite("GAME OVER");
  gOver = true;
 }
}

function updateJob(newJob){
 logWrite("You are now a "+newJob.name+"!!");
 gPlayer.job = newJob;
 genStats(gPlayer);
 document.getElementById("hpDisplay").innerHTML = gPlayer.hp;
 document.getElementById("classDisplay").innerHTML = gPlayer.job.name;
 chooseSkill();
}

function updateGame(change){
 gGame = change;
 if(change == 0){
  logWrite("Your game changed to DUNGEON SLOTS!");
  document.getElementById("gameDisplay").innerHTML = ("DUNGEON SLOTS");
 }else if(change == 1){
  logWrite("Your game changed to DUNGEON ROULETTE!");
  document.getElementById("gameDisplay").innerHTML = ("DUNGEON ROULETTE");
 }
 document.getElementById("glvDisplay").innerHTML = gGames[gGame].glv;
 document.getElementById("gxpDisplay").innerHTML = gGames[gGame].gxp;
}

function updateGxp(change){
 gGames[gGame].gxp += change;
 if(change > 0){
  logWrite("The game seems to have gained "+change+"GXP!");
 }else{
  logWrite("The game somehow lost "+(change*-1)+"GXP.");
 }
 if(gGames[gGame].gxp >= 10){
  logWrite("The game has leveled up! Expect greater difficulty from now on!!");
  gGames[gGame].gxp = 0;
  gGames[gGame].glv++;
  document.getElementById("glvDisplay").innerHTML = gGames[gGame].glv;
 }
 document.getElementById("gxpDisplay").innerHTML = gGames[gGame].gxp;
 var totalGlv = 0;
 for(var i = 0; i < gGames.length; i++){
  totalGlv += gGames[i].glv;
 }
 if(totalGlv > 5){
  finalBoss();
 }
}

function updateSkills(keep){
 logWrite("You retained the skill: "+keep.name);
 gPlayer.skills = [];
 for(var i = 0; i < gSkills[gPlayer.job.id].length; i++){
  gPlayer.skills.push(gSkills[gPlayer.job.id][i]);
 }
 gPlayer.skills.push(keep);
 reRoll();
}
