//actionList.js
//manages the action gList

var gList = document.getElementById("actionList");

function genButton(action){
 var button = document.createElement("BUTTON");
 button.classList.add("button");
 button.title = action.desc;
 button.onclick = action.func;
 button.innerHTML = action.name;
 return button;
}

function genList(buttons){
 var List = document.createElement("DIV");
 for(var i = 0; i < buttons.length; i++){
  List.appendChild(buttons[i]);
 }
 return List;
}

function chooseColor(){
 var buttons = []
 buttons.push(genButton(new Action("get CP if the result is good, lose CP otherwise", betBlack, "Bet on Black.")));
 buttons.push(genButton(new Action("get HP if the result is dangerous, lose HP otherwise", betRed, "Bet On Red.")));
 buttons.push(genButton(new Action("get Exp if the result is neutral, but give the game GXP otherwise", betGreen, "Bet On Green.")));
 gList.appendChild(genList(buttons));
}

function chooseGame(){
 var buttons = []
 buttons.push(genButton(new Action("play the simple DUNGEON SLOTS", playSlots, "Play Slots")));
 buttons.push(genButton(new Action("play the more difficult DUNGEON ROULETTE", playRoulette, "Play Roulette")))
 gList.appendChild(genList(buttons));
}

function chooseInsert(){
 var chip = genButton(new Action("bet 1CP", insertCp, "Insert Chip"));
 var blood = genButton(new Action("bet 1HP", insertHp, "Insert Blood"));
 var buttons = [chip, blood];
 gList.appendChild(genList(buttons));
}

function chooseJob(){
  var yes = genButton(new Action("switch classes", jobAction, "Yes!"));
  var no = genButton(new Action("keep current class", sameJob, "No."));
  var buttons = [yes, no];
  gList.appendChild(genList(buttons));
}

function chooseMove(){
  gMove = true;
  var buttons = [];
  for(var i = 0; i < gPlayer.skills.length; i++){
    buttons.push(genButton(gPlayer.skills[i]));
  }
  gList.appendChild(genList(buttons));
}

function chooseShot(){
  var buttons = [];
  buttons.push(genButton(new Action("drink it", acceptShot, "Yes?")));
  buttons.push(genButton(new Action("don't drink it", denyShot, "No...")));
  gList.appendChild(genList(buttons));
}

function chooseSkill(){
  logWrite("Choose a skill to take with you into your new class!");
  var buttons = [];
  buttons.push(genButton(new Action(gPlayer.skills[0].desc, keepZero, gPlayer.skills[0].name)));
  buttons.push(genButton(new Action(gPlayer.skills[1].desc, keepOne, gPlayer.skills[1].name)));
  buttons.push(genButton(new Action(gPlayer.skills[2].desc, keepTwo, gPlayer.skills[2].name)));
  buttons.push(genButton(new Action(gPlayer.skills[3].desc, keepThree, gPlayer.skills[3].name)));
  gList.appendChild(genList(buttons));
}