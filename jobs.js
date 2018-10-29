//jobs.js
//lists all job skills and stats

//job stats
var gJobs = [
 {name:"Drifter", hp:9, atk:3, spd:3, id:0},
 {name:"Speed Demon", hp:4, atk:3, spd:6, id:1},
 {name:"Gunslinger", hp:5, atk:4, spd:2, id:2},
 {name:"Whale", hp:6, atk:3, spd:4, id:3},
 {name:"Undead", hp:1, atk:2, spd:1, id:4},
 {name:"Bartender", hp:6, atk:2, spd:4, id:5},
 {name:"Demon Hunter", hp:4, atk:5, spd:4, id:6},
 {name:"Angry Drunk", hp:9, atk:5, spd:2, id:7},
 {name:"Barista", hp:7, atk:2, spd:5, id:8},
 {name:"Student", hp:4, atk:1, spd:3, id:9},
 {name:"Vampire Casino Don", hp:10, atk:5, spd:3, id:10}
];

//list of all skills by job#
var gSkills = new Array(11);

gSkills[0] = [attackAction, defendAction, runAction, drinkAction];
gSkills[1] = [attackAction, hitAndRunAction, burnoutAction];
gSkills[2] = [gunshotAction, quickDrawAction, takeAimAction];
gSkills[3] = [buyoutAction, doubleShotAction, coinTossAction];
gSkills[4] = [attackAction, defendAction, decomposeAction];
gSkills[5] = [attackAction, runAction, serveAction];
gSkills[6] = [attackAction, exorcismAction, bulletCurtainAction];
gSkills[7] = [doubleShotAction, hitAndRunAction, burnoutAction];
gSkills[8] = [scaldingSplashAction, coldBrewAction, burnoutAction];
gSkills[9] = [burnoutAction, defendAction, scurryAction];
gSkills[10] = [drainAction, drinkAction, doubleShotAction, burnoutAction, gunshotAction, quickDrawAction, takeAimAction, coinTossAction, exorcismAction, bulletCurtainAction, coldBrewAction, serveAction, attackAction, defendAction, scaldingSplashAction];