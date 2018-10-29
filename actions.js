//actions.js
//functions associated with each action

var gLog = document.getElementById("log");
var gGame = 0;

function Action(desc, func, name){
 this.desc = desc;
 this.func = func;
 this.name = name;
}

function logWrite(logText){
 var newPara = document.createElement("P");
 newPara.innerHTML = logText;
 gLog.appendChild(newPara);
 window.scrollTo(0,document.body.scrollHeight);
}

//process combat actions
function fighting(){
 return (gEnemy.hp > 0 && gPlayer.hp > 0);
}

function checkSpeed(user){
 if(user.priority > gPlayer.priority || user.priority > gEnemy.priority){
  return true;
 }else if(user.priority < gPlayer.priority || user.priority < gEnemy.priority){
  return false;
 }else if(user.spd >= gPlayer.spd && user.spd >= gEnemy.spd){
  return true;
 }
}

function combatTurn(pSkill){
 clearChildren(gList);
 if(gOver){
  gOver = false;
 }
 gMove = false;
 gEnemy.skills[Math.floor(Math.random()*gEnemy.skills.length)].func();
 if(checkSpeed(gPlayer)){
  if(gPlayer.burnout){
   gPlayer.burnout = false;
   logWrite("You failed to msuter an attack...");
  }else{
   pSkill(gPlayer);
  }
  if(fighting() && gOver == false){
   if(gEnemy.burnout){
    gEnemy.burnout = false;
    logWrite(gEnemy.name+" failed to muster an attack...");
   }else{
    gEnemyMove(gEnemy);
   }
  }
 }else{
  if(gEnemy.burnout){
   gEnemy.burnout = false;
   logWrite(gEnemy.name+" failed to muster an attack...");
  }else{
   gEnemyMove(gEnemy);
  }
  if(fighting() && gOver == false){
   if(gPlayer.burnout){
    gPlayer.burnout = false;
    logWrite("You failed to muster an attack...");
   }else{
    pSkill(gPlayer);
   }
  }
 }
 if(fighting() && gOver == false){
  if(gPlayer.job.id == 7){
   logWrite("You stumbled in a drunken stuppor...");
   updateHp(-1);
  }
  if(gEnemy.job.id == 7){
   logWrite(gEnemy.name+" stumbled in a drunked stuppor!");
   updateEhp(-1);
  }
  if(gPlayer.hyper){
   if(gPlayer.thisTurn == false){
    gPlayer.thisTurn = true;
   }else{
    logWrite("You felt restless!!!");
    pSkill(gPlayer);
    gPlayer.hyper = false;
    gPlayer.thisTurn = false;
   }
  }
  if(gEnemy.hyper){
   if(gEnemy.thisTurn == false){
    gEnemy.thisTurn = true;
   }else{
    logWrite(gEnemy.name+" felt restless!!!!");
    gEnemyMove(gEnemy);
    gEnemy.hyper = false;
    gEnemy.thisTurn = false;
   }
  }
 }
 if(gOver){
  //gOver = false;
  return;
 }else if(fighting()){
  chooseMove();
 }else{
  //if battle is over, end all status effects
  gPlayer.aim = false;
  gPlayer.burnout = false;
  gPlayer.defending = false;
  gPlayer.hyper = false;
  gPlayer.thisTurn = false;
  gPlayer.priority = 0;
 }
}

function queueMove(move){
 if(gMove){
  if(move == quickDraw || scaldingSplash){
   gPlayer.priority = 1;
  }
  combatTurn(move);
 }else{
  if(move == quickDraw || scaldingSplash){
   gEnemy.priority = 1;
  }
  gEnemyMove = move;
 }
}

function checkAim(user, dam){
 if(user.aim){
  user.aim = false;
  return (Math.ceil(dam*2.2) + Math.floor(Math.random()*3));
 }else{
  return dam;
 }
}

function checkDefense(target, dam){
 if(target.defending){
  logWrite(target.name+" successfully defended against the attack!");
  target.defending = false;
  dam = Math.floor(dam/2);
 }
 return dam;
}

//combat actions//

//attack
function attack(user){
 logWrite(user.name+" did a completely average maneuver!");
 var dam = user.atk;
 if(user.name == "You"){
  dam = checkDefense(gEnemy, dam);
  updateEhp(dam*-1)
 }else{
  dam = checkDefense(gPlayer, dam);
  updateHp(dam*-1);
 }
}
function qAttack(){
 queueMove(attack);
}
attackAction = new Action("a completely average attack", qAttack, "Attack!");

//bullet curtain
function bulletCurtain(user){
 var bonus = 0;
 if(user.aim){
  bonus = 1;
 }
 logWrite(user.name+" shot like a million times with an uzzi!!!");
 if(user.name == "You"){
  if(gEnemy.defending){
   bonus -= 1;
   gEnemy.defending = false;
  }
  if(gEnemy.job.id == 1 || gEnemy.job.id == 10){
   updateCp(5);
  }
  for(var i = 0; i < user.spd*2; i++){
   if(fighting() && gOver == false){
    updateEhp((Math.floor(Math.random()*2) + bonus)*-1);
   }
  }
 }else{
  if(gPlayer.defending){
   bonus -= 1;
   gPlayer.defending = false;
  }
  if(gPlayer.job.id == 1){
   updateEcp(5);
  }
  for(var i = 0; i < user.spd*2; i++){
   if(fighting() && gOver == false){
    updateHp((Math.floor(Math.random()*2) + bonus)*-1);
   }
  }
 }
}
function qBulletCurtain(){
 queueMove(bulletCurtain);
}
bulletCurtainAction = new Action("profitable against demons", qBulletCurtain, "!!!!BULLET CURTAIN!!!!");

//burnout
function burnout(user){
 logWrite(user.name+" did an EXHAUSTINGLY powerful combo!");
 attack(user);
 if(fighting() && gOver == false){
  attack(user);
 }
 if(user.hyper == false){
  user.burnout = true;
 }
}
function qBurnout(){
 queueMove(burnout);
}
burnoutAction = new Action("sacrifice your next move to perform a 2-hit combo this turn", qBurnout, "BURNOUT!");

//buyout
function buyout(user){
 if(user.name == "You"){
  if(gEnemy.job.id == 10){
   logWrite("The casino owner has no use for your chips!!");
  }else if(user.cp > gEnemy.lv){
   logWrite("You slipped "+gEnemy.name+" "+gEnemy.lv+"CP...")
   updateCp(gEnemy.lv*-1);
   updateEhp(gEnemy.hp*-1);
  }else{
   logWrite("You didn't have enough CP to bribe "+gEnemy.name+".");
  }
 }else if(user.cp > gPlayer.lv){
  logWrite(user.name+" slipped you "+gPlayer.lv+"CP and whispered in your ear...");
  updateEcp(gPlayer.lv*-1);
  logWrite("You accpeted the money and took a dive!");
  updateHp(gPlayer.hp*-1);
 }else{
  logWrite(user.name+" didn't have enough CP to bribe you!");
 }
}
function qBuyout(){
 queueMove(buyout);
}
buyoutAction = new Action("bribe your opponent their level in CP (x2 for whales) to take a dive", qBuyout, "Buyout?")

//coin toss
function coinToss(user){
 if(user.cp > 0){
  var dam = (user.atk*(Math.floor(Math.random()*2)*2));
  dam = checkAim(user, dam);
  logWrite(user.name+" threw a chip haphazardly!");
  if(user.name == "You"){
   updateCp(-1);
   dam = checkDefense(gEnemy, dam);
   updateEhp(dam*-1);
  }else{
   updateEcp(-1);
   dam = checkDefense(gPlayer, dam);
   updateHp(dam*-1);
  }
 }
}
function qCoinToss(){
 queueMove(coinToss);
}
coinTossAction = new Action("throw a chip for variable damage", qCoinToss, "Coin Toss?");

//cold brew
function coldBrew(user){
 logWrite(user.name+" drank a REAL cup of coffee!!");
 user.priority = 1;
 user.hyper = true;
 user.thisTurn = false;
 user.drunk = false;
}
function qColdBrew(){
 queueMove(coldBrew);
}
coldBrewAction = new Action("become highly caffinated for next turn", qColdBrew, "Cold Brew.");

//decompose
function decompose(user){
 logWrite(user.name+" is experiencing the circle of life!");
 if(user.name == "You"){
  if(user.job.id == 4){
   updateHp(10);
  }else{
   if(user.maxHP > user.hp){
    updateHp(Math.min(user.maxHp - user.hp, 10));
   }else{
    logWrite("Your HP was already full!")
   }
  }
 }else{
  if(user.job.id == 4){
   updateEhp(10);
  }else{
   if(user.maxHP > user.hp){
    updateHp(Math.min(user.maxHp - user.hp, 10));
   }else{
    logWrite(user.name+"'s HP was already full!")
   }
  }
 }
}
function qDecompose(){
 queueMove(decompose);
}
decomposeAction = new Action("heal up to 10 hp (zombies heal backwards)", qDecompose, "Decompose???");

//defend
function defend(user){
 logWrite(user.name+" took a defensive stance!")
 user.defending = true;
}
function qDefend(){
 queueMove(defend);
}
defendAction = new Action("take reduced damage from the next hit", qDefend, "Defend.");

//double shot
function doubleShot(user){
 if(user.cp >= 2 || user.job.id == 5){
  logWrite(user.name+" purchased TWO drinks from the house!!")
  if(user.name == "You"){
   if(user.job.id != 5){
    updateCp(-2);
   }
   updateHp(user.maxHp-user.hp);
  }else{
   if(user.job.id != 5){
    updateEcp(-2);
   }
   updateEhp(user.maxHp-user.hp);
  }
 }else{
  logWrite(user.name+" could not afford even two glasses of water...")
 }
}
function qDoubleShot(){
 queueMove(doubleShot);
}
doubleShotAction = new Action("pay 2CP (x2 for whales, staff drink free) to return to full health", qDoubleShot, "DOUBLE SHOT!")

//drain
function drain(user){
 logWrite(user.name+" tore into your juggular!!!");
 var dam = user.atk;
 dam = checkDefense(gPlayer, dam);
 updateHp(dam);
 updateEhp(dam);
}
function qDrain(){
 queueMove(drain);
}
drainAction = new Action("a move for hearts of true evil... How are you seeing this?", qDrain, "DRAIN");

//drink
function drink(user){
 if(user.cp > 0 || user.job.id == 5){
  logWrite(user.name+" purchased a drink from the house!")
  if(user.name == "You"){
   if(user.job.id != 5){
    updateCp(-1);
   }
   if(user.maxHp < user.hp){
    logWrite("Health was already full!");
   }else{
    updateHp(Math.min(gPlayer.maxHp - gPlayer.hp, Math.floor(user.maxHp/2)));
   }
  }else{
   if(user.job.id != 5){
    updateEcp(-1);
   }
   if(gEnemy.maxHp < user.hp){
    logWrite("Health was already full!");
   }else{
    updateEhp(Math.min(gEnemy.maxHp-gEnemy.hp, Math.floor(user.maxHp/2)));
   }
  }
 }else{
  logWrite(user.name+" could not afford even a glass of water...")
 }
}
function qDrink(){
 queueMove(drink);
}
drinkAction = new Action("spend 1CP to heal up to half your max HP (staff drink free)", qDrink, "Drink!");

//exorcism
function exorcism(user){
 logWrite(user.name+" brandished a crucifix!!");
 if(user.name == "You"){
  if(gEnemy.job.id == 4){
   updateCp(5);
   updateEhp(999);
  }else if(gEnemy.job.id == 11){
   logWrite(gEnemy.name+" let out a shreik!!");
   var dam = 50;
   dam = checkDefense(gEnemy, dam);
   updateCp(99);
   updateEhp(dam*-1);
  }else{
   logWrite("It had no apparent effect...");
  }
 }else{
  if(gPlayer.job.id == 4){
   updateEcp(5);
   updateHp(999);
  }else{
   logWrite("It had no apparent effect...");
  }
 }
}
function qExorcism(){
 queueMove(exorcism);
}
exorcismAction = new Action("get paid to insta-kill an undead", qExorcism, "EXORCISM!");

//gunshot
function gunshot(user){
 logWrite(user.name+" fired a piercing bullet!!");
 var dam = user.atk;
 dam = checkAim(user, dam);
 if(user.name == "You"){
  updateEhp(dam*-1)
 }else{
  updateHp(dam*-1);
 }
}
function qGunshot(){
 queueMove(gunshot);
}
gunshotAction = new Action("a slick attack which ignores defenses", qGunshot, "Gunshot.");

//hit and run
function hitAndRun(user){
 logWrite(user.name+" performed a daring yet cowardly combo!!")
 attack(user);
 if(fighting() && gOver == false){
  run(user);
 }
}
function qHitAndRun(){
 queueMove(hitAndRun);
}
hitAndRunAction = new Action("attack, then run if the target survives", qHitAndRun, "Hit And Run!!!");

//quick draw
function quickDraw(user){
 logWrite(user.name+" drew a pistol at the speed of sound!!!!");
 user.priority = 0;
 var dam = user.atk;
 dam = checkAim(user, dam);
 if(user.name == "You"){
  dam = checkDefense(gEnemy, dam);
  updateEhp(dam*-1)
 }else{
  dam = checkDefense(gPlayer, dam);
  updateHp(dam*-1);
 }
}
function qQuickDraw(){
 queueMove(quickDraw);
}
quickDrawAction = new Action("a fast action which hits a target before they can react", qQuickDraw, "Quick, Draw!");

//run
function run(user){
 logWrite(user.name+" got ready to sprint...")
 if(checkSpeed(user) || Math.floor(Math.random()*2) == 1){
  logWrite(user.name+" fled the battle graciously!");
  gEnemy.hp = 0;
  logWrite("Unfortunately, nothing was gained (but safety)!");
  updateGxp(1);
  reRoll();
 }else{
  logWrite(user.name+" failed to escape in time! Brace for impact!")
 }
}
function qRun(){
 queueMove(run);
}
runAction = new Action("escape the battle, gaining nothing but safety", qRun, "r-RUN!!!");

//scalding splash
function scaldingSplash(user){
 user.priority = 0;
 logWrite(user.name+" Spilled a cup of coffee, YEOWCH!!")
 if(user.name == "You"){
  if(gEnemy.drunk || gEnemy.aim){
   gEnemy.drunk = false;
   gEnemy.aim = false;
   gEnemy.burnout = true;
   updateEhp(user.atk);
  }else{
   logWrite(gEnemy.name+" dodged the attack!!!");
  }
 }else{
  if(gPlayer.drunk || gPlayer.aim){
   gPlayer.drunk = false;
   gPlayer.aim = false;
   gPlayer.burnout = true;
   updateHp(user.atk);
  }else{
   logWrite("You dodged the attack!!!");
  }
 }
}
function qScaldingSplash(){
 queueMove(scaldingSplash);
}
scaldingSplashAction = new Action("quickly stun a drunk or focusing enemy", qScaldingSplash, "Scalding Splash?!");

//scurry
function scurry(user){
 gEnemy.hp = 0;
 logWrite(user.name+" scurried away pathetically!");
 updateGxp(1);
 reRoll();
}
function qScurry(){
 queueMove(scurry);
}
scurryAction = new Action("100% chance to escape the battle, but look wimpy", qScurry, "s-s-s-s-SC-SCURRYYYY!!!!!!");

//serve
function serve(user){
 logWrite(user.name+" served a delicious 'White Russian!'");
 if(user.name == "You"){
  if(gEnemy.defending){
   logWrite(gEnemy.name+" did not accept the drink!");
   gEnemy.defending = false;
  }else{
   if(gEnemy.drunk){
    logWrite(gEnemy.name+" passed out from alchohol!");
    updateEhp(-99);
   }else{
    logWrite(gEnemy.name+" seems tipsy...");
    gEnemy.drunk = true;
    updateCp(gEnemy.cp);
    updateEcp(gEnemy.cp*-1);
    updateEhp(99);
   }
  }
 }else{
  if(gPlayer.defending){
   logWrite("You did not accept the drink!");
   gPlayer.defending = false;
  }else if(gPlayer.drunk){
   logWrite("You faded out...");
   updateHp(-100);
  }else{
  logWrite("You think you may have had too much to drink...");
  gPlayer.drunk = true;
  updateEcp(gPlayer.cp);
  updateCp(gPlayer.cp*-1);
  updateHp(100);
  }
 }
}
function qServe(){
 queueMove(serve);
}
serveAction = new Action("heal the enemy 100HP and take all their CP, but be careful, you make a STRONG drink", qServe, "Serve.");

//take aim
function takeAim(user){
 if(user.drunk){
  logWrite(user.name+" was too drunk to aim properly!");
 }else{
  logWrite(user.name+" focused with silent intensity...");
  user.aim = true;
 }
}
function qTakeAim(){
 queueMove(takeAim);
}
takeAimAction = new Action("boosts your next projectile attack", qTakeAim, "Take Aim...");

//non-combat action functions

function spinSlots(){
 logWrite("The slots spin violently, until...");
 gEvents[Math.floor(Math.random()*gEvents.length)]();
}

function insertCp(){
 clearChildren(gList);
 if(gPlayer.cp > 0){
  updateCp(-1);
  spinSlots();
 }else{
  logWrite("Unfortunately you are out of funding... You begin to consider alternative methods...");
  chooseInsert();
 }
}

function insertHp(){
 clearChildren(gList);
 if(gPlayer.hp > 1){
  updateHp(-1);
  spinSlots();
 }else{
  logWrite("'This is it..', you think to yourself. Your last ounce of life. There's nothing waiting for you outside this casino, so you choose to end it all...");
  logWrite("GAME OVER.")
 }
}

function spinRoulette(color){
 clearChildren(gList);
 logWrite("You place your bet on "+color+", and the roulette begins to spin hypnotically...");
 if(gPlayer.cp > 0){
  updateCp(-1);
 }else if(gPlayer.hp > 1){
  updateHp(-1);
 }else{
  logWrite("You're down you your last drop of blood... You slam it down on the table, and surrender yourself to eternity...");
  logWrite("GAME OVER");
  return;
 }
 var result = Math.floor(Math.random()*gEvents.length);
  if(result < 4){
   logWrite("It lands on Black-"+result+"!");
   if(color == "black"){
    updateCp(gGames[1].glv+5);
   }else if(color == "red"){
    updateHp(gPlayer.lv*-1);
   }else{
    updateGxp(2);
   }
  }else if(result < 8){
   logWrite("It lands on Red-"+result+"!");
   if(color == "black"){
    updateCp(gGames[1].glv*-1);
   }else if(color == "red"){
    updateHp(gPlayer.lv+5);
   }else{
    updateGxp(2);
   }
  }else{
   logWrite("It lands on Green-"+result+"!");
   if(color == "black"){
    updateCp(gGames[1].glv*-1);
   }else if(color == "red"){
    updateHp(gPlayer.lv*-1);
   }else{
    updateExp(8);
   }
  }
 gEvents[result]();
}

function betBlack(){
  spinRoulette("black");
}

function betRed(){
  spinRoulette("red");
}

function betGreen(){
  spinRoulette("green");
}

function playSlots(){
 clearChildren(gList);
 updateGame(0);
 logWrite("Welcome to the DUNGEON SLOTS! Please insert 1CP to play. You may also pay with your life!");
 chooseInsert();
}

function playRoulette(){
 clearChildren(gList);
 updateGame(1);
 logWrite("Hey, welcome to my table. Take a seat wherever you like. In this game, you bet on either black, red, or green. If the result is black, something good should happen, but red will put you in danger. Green events are neutral. A correct bet on black yeilds bonus CP, while a correct bet on red yeilds bonus HP. Betting correctly on green will yeild lots of exp, but is very uncommon. Betting incorrectly will entail the opposite, for green that means the game earning some GXP. Now then...");
 chooseColor();
}

function reRoll(){
 if(gOver == false){
  if(gGame ==0){
   chooseInsert();
  }else if(gGame ==1){
   chooseColor();
  }
 }
}

function jobAction(){
 clearChildren(gList);
 logWrite("Your body is enveloped in a strange light. Overwhelming tranquility fills your body for what feels like an eternity, however, you awake to find yourself in the same chair as before, in a brand new body!");
 updateJob(gNewJob);
}

function sameJob(){
 clearChildren(gList);
 logWrite("You denied the job opportunity. A fear of failure perhaps? The answer has eluded you all your life.");
 reRoll();
}

function acceptShot(){
 clearChildren(gList);
 logWrite("You accepted the shot! The other patrons look on with anticipation as they await your reaction...");
 if(Math.floor(Math.random()*2) == 0){
  if(gPlayer.job.id == 7 || gPlayer.job.id == 5){
   logWrite("This must be the hardest drink you've ever taken, but you can take it fine.");
   updateExp(2);
  }else{
   logWrite("What is this, pure alchohol?! It burns your mouth, and you begin to feel dizzy...");
   updateHp((Math.abs(gPlayer.lv*(Math.floor(Math.random()*4))))*-1);
  }
 }else if(Math.floor(Math.random()*2) == 0){
  logWrite("Awesome! It's your favorite drink! It feels good to take a chance sometimes...");
  if(gPlayer.hp < gPlayer.maxHp){
   updateHp(gPlayer.maxHp - gPlayer.hp);
  }
 }else{
  logWrite("WHOA, you were NOT expecting espresso! It's a little jarring but you feel ok.");
  gPlayer.drunk = false;
 }
 newGame();
}

function denyShot(){
 clearChildren(gList);
 logWrite("You denied the shot. Everyone calls you a prude, but you'll survive. This place is way to shady to be taking chances...");
 newGame();
}

function keepZero(){
 clearChildren(gList);
 var keep = gPlayer.skills[0];
 updateSkills(keep);
}

function keepOne(){
 clearChildren(gList);
 var keep = gPlayer.skills[1];
 updateSkills(keep);
}

function keepTwo(){
 clearChildren(gList);
 var keep = gPlayer.skills[2];
 updateSkills(keep);
}

function keepThree(){
 clearChildren(gList);
 var keep = gPlayer.skills[3];
 updateSkills(keep);
}
