//general.js
//universal helper functions

function clearChildren(element){
 while (element.firstChild) {
  logWrite("___________________________________________________");
  element.removeChild(element.firstChild);
 }
}