//character.js
//character data

//game stats
var gSlots = {gxp:0, glv:1};
var gRoulette = {gxp:0, glv:1};
var gGames = [gSlots, gRoulette];
//player character
var gPlayer = new character(10, 0, 1, gJobs[0], "You");
//enemy combatant
var gEnemy;
//is this the player's move
var gMove = true;
//teh enemy's next attack
var gEnemyMove;

//generate stats for character based on level and job
function genStats(char){
 char.hp = char.job.hp*char.lv + 2;
 char.maxHp = char.hp;
 char.atk = char.job.atk*char.lv;
 char.spd = char.job.spd*char.lv;
 if(char.job.id == 7){
  char.drunk = true;
 }else{
  char.drunk = false;
 }
}

function character(cp, exp, lv, job, name){
 if(lv == 0){
  lv = 1
 }
  //shown stats
  this.hp = job.hp*lv;
  this.maxHp = this.hp;
  this.cp = cp;
  //this.sp = job.sp*lv;
  //this.maxSP = this.sp;
  this.exp = exp;
  this.lv = lv;
  this.job = job;
  if(name == ""){
   this.name = ("The Enemy "+job.name);
  }else{
   this.name = name;
   this.maxHp += 2;
   this.hp += 2;
  }
  //hidden stats
  this.atk = job.atk*lv;
  this.spd = job.spd*lv;
  this.aim = false;
  this.burnout = false;
  this.defending = false;
  if(job.id == 7){
   this.drunk = true;
  }else{
   this.drunk = false;
  }
  this.hyper = false;
  this.thisTurn = false;
  this.priority = 0;
  //skill array
  this.skills = gSkills[job.id];
}