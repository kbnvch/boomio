const stiliukas = document.createElement("style");
document.getElementsByTagName("head")[0].appendChild(stiliukas);
var myCanvas = document.createElement("canvas");
document.getElementsByTagName("body")[0].appendChild(myCanvas);






const cX = 300;
const cY = 100;
let brickNumber = 0;
let xe, ye;

myCanvas.style.position = "absolute";
myCanvas.style.left = cX + 'px';
myCanvas.style.top = cY + 'px';


myCanvas.style.zIndex = "100";
//myCanvas.style.width="300px";
//myCanvas.style.height="300px";
//myCanvas.width=myCanvas.offsetWidth;
//myCanvas.height=myCanvas.offsetHeight;

var ctx = myCanvas.getContext("2d");
myCanvas.width = myCanvas.height = 240;
myCanvas.addEventListener("mousedown", mouseDown, false);
myCanvas.addEventListener('mousemove', onmousemove, false);

const addStyles = (stylesheet, cssRules) => {
  if (stylesheet.styleSheet) {
    stylesheet.styleSheet.cssText = cssRules;
  } else {
    stylesheet.appendChild(document.createTextNode(cssRules));
  }
};
var areImagesLoaded = false;

function loadImage(src, callback) {
  var img = document.createElement("img");
  img.addEventListener(
    "load",
    function () {
      callback(img);
    },
    false
  );
  img.src = src;
}
/////////////////////////////
////// here is game loop:
var frcount = 0;
var countDownTillGameEnd = 200;   // <-- timer value till game end function is trigerred. adjust value
var now,
  dt = 0,
  last = timestamp(),
  step = 1 / 60;
var goExplosions = false;
function frame() {
  now = timestamp();
  dt = dt + Math.min(1, (now - last) / 1000);
  while (dt > step) {
    dt = dt - step;
    //update(step);
  }

  if (allowGameLoop == true && goExplosions == false) {
    clearScreen();
    drawPulsating();
    drawChest();
    drawBrics();
    drawHammer();
  }
  else if (goExplosions == true) {
    frcount++;
    clearScreen();
    drawPulsating();
    drawChest();
    drawBrics();
    drawExplosion();
    drawBrickParticles();
    drawLockFlying();
    drawHammer();

  }
  if (triggerGameEnd==true) {
    countDownTillGameEnd--;
    if(countDownTillGameEnd<=0){
      triggerGameEnd=false;
      fireGameEnded();  // this will fire when game ends;
    }
  }

  last = now;

  requestAnimationFrame(frame);
}



requestAnimationFrame(frame);

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

////////////////////////




var broken = [false, false, false, false, false, false, false, false, false, false,];

var brickImg1 = document.getElementById('brick1');
var brickImg2 = document.getElementById('brick2');
var brickImg3 = document.getElementById('brick3');
var brickImg4 = document.getElementById('brick4');
var brickImg5 = document.getElementById('brick5');
var brickImg6 = document.getElementById('brick6');
var brickImg7 = document.getElementById('brick7');
var brickImg8 = document.getElementById('brick8');

var explImg1 = document.getElementById('expl1');
var explImg2 = document.getElementById('expl2');
var explImg3 = document.getElementById('expl3');
var explImg4 = document.getElementById('expl4');
var explImg5 = document.getElementById('expl5');


var particleImg11 = document.getElementById('particle11');
var particleImg12 = document.getElementById('particle12');
var particleImg13 = document.getElementById('particle13');
var particleImg14 = document.getElementById('particle14');

var particleImg21 = document.getElementById('particle21');
var particleImg22 = document.getElementById('particle22');
var particleImg23 = document.getElementById('particle23');
var particleImg24 = document.getElementById('particle24');

var particleImg31 = document.getElementById('particle31');
var particleImg32 = document.getElementById('particle32');
var particleImg33 = document.getElementById('particle33');
var particleImg34 = document.getElementById('particle34');

var chestImg1 = document.getElementById('chest1');
var chestImg2 = document.getElementById('chest2');
var chestImg3 = document.getElementById('chest3');





var hammerImg = document.getElementById('HammerImage');
var backgroundImg = document.getElementById('BGImage');
var pulsatingImg = document.getElementById('PulsatingImage');
var lockImg = document.getElementById('LockImg');
var lockpar1Img = document.getElementById('Lockpart1Image');
var lockpar2Img = document.getElementById('Lockpart2Image');




let brickposx = [
  24 - 10,
  0 + 24 + 56 - 1 - 5,
  0 + 24 + 56 + 56 - 3,
  0 + 24 + 24 - 10 - 10,
  0 + 24 + 24 + 56 - 2 - 5 - 5,
  0 + 24 + 24 + 56 - 2 + 56 - 2,
  0 + 16 + 2 - 10,
  0 + 16 + 55 - 5,
  0 + 16 + 55 + 55 - 1,
  0 + 16 + 55 + 55 + 55
];

let brickposy = [
  myCanvas.height - (60) - 2,
  myCanvas.height - (60) - 2,
  myCanvas.height - (60) - 2,
  myCanvas.height - (60) - 56 + 2 - 2,
  myCanvas.height - (60) - 56 + 2 - 2,
  myCanvas.height - (60) - 56 + 2 - 2,
  myCanvas.height - (60) - 56 + 2 - 56 + 3 - 2,
  myCanvas.height - (60) - 56 + 2 - 53 + 2 - 2,
  myCanvas.height - (60) - 56 + 2 - 53 - 2 - 2,
  myCanvas.height - (60) - 56 + 2 - 53 + 5
];



function start() {

  clearScreen();
  drawChest();
  drawBrics();
  drawHammer();
  allowGameLoop = true;
  areImagesLoaded = true;
}

function clearScreen() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  //ctx.drawImage(backgroundImg, 0, 0, myCanvas.width, myCanvas.height);  // <<-- uncomment to draw the background image
}

let chest_width = 133;
let chest_hight = 145;
let chest_posx = (myCanvas.width / 2) - (chest_width / 2);
let chest_posy = myCanvas.height - chest_hight - 15;
let chest_to_display = 0;
let islockFlying = false;
let noMoreSmoke = false;
let triggerGameEnd = false;


function drawChest() {

  if (chest_to_display == 0)
    ctx.drawImage(chestImg1, chest_posx, chest_posy, chest_width, chest_hight);
  if (chest_to_display == 1)
    ctx.drawImage(chestImg1, chest_posx, chest_posy, chest_width, chest_hight)
  if (chest_to_display > 1) {
    ctx.drawImage(chestImg3, chest_posx, chest_posy, chest_width, chest_hight)
    triggerGameEnd=true;
  }

  if (chest_to_display == 0)
    ctx.drawImage(lockImg, (myCanvas.width / 2) - (lockImg.width / 2), myCanvas.height - lockImg.height - (chestImg1.height / 2));

}

var pulsatingAlpha = 1.0;
let ddt;
let mult01 = 0.8;
function drawPulsating() {
  ddt = (myCanvas.width / pulsatingImg.width);

  pulsatingAlpha = pulsatingAlpha * mult01;
  ctx.globalAlpha = pulsatingAlpha;
  ctx.drawImage(pulsatingImg, (myCanvas.width / 2) - (pulsatingImg.width * ddt / 2), myCanvas.height - pulsatingImg.height * ddt, pulsatingImg.width * ddt, pulsatingImg.height * ddt);
  ctx.globalAlpha = 1.0;
  if (pulsatingAlpha < 0.3)
    mult01 = 1.1;
  if (pulsatingAlpha > 0.998)
    mult01 = 0.96;

}

function drawBrics() {


  if (broken[0] == false)
    ctx.drawImage(brickImg1, brickposx[0], brickposy[0]);
  if (broken[1] == false)
    ctx.drawImage(brickImg2, brickposx[1], brickposy[1]);
  if (broken[2] == false)
    ctx.drawImage(brickImg3, brickposx[2], brickposy[2]);

  if (broken[3] == false)
    ctx.drawImage(brickImg4, brickposx[3], brickposy[3]);
  if (broken[4] == false)
    ctx.drawImage(brickImg3, brickposx[4], brickposy[4]);
  if (broken[5] == false)
    ctx.drawImage(brickImg5, brickposx[5], brickposy[5]);

  if (broken[6] == false)
    ctx.drawImage(brickImg6, brickposx[6], brickposy[6]);
  if (broken[7] == false)
    ctx.drawImage(brickImg4, brickposx[7], brickposy[7]);
  if (broken[8] == false)
    ctx.drawImage(brickImg7, brickposx[8], brickposy[8]);
  if (broken[9] == false)
    ctx.drawImage(brickImg8, brickposx[9], brickposy[9]);
}




let dx01; let dy01;
let dx02; let dy02;
let dx03; let dy03;
let dx04; let dy04;

function resetExplosions() {
  dx01 = explImg1.width; dy01 = explImg1.height;
  dx02 = explImg2.width; dy02 = explImg2.height;
  dx03 = explImg3.width; dy03 = explImg3.height;
  dx04 = explImg5.width; dy04 = explImg5.height;

  sp = 1.100;
  mult = 0.1;
  mult2 = 2.0;
  mult3 = 1.2;

  alpha = 1.0;
}
resetExplosions();
var sp = 1.100;
var mult = 0.1;
var alpha = 1.0;
var mult2 = 2.0;
var mult3 = 1.2;

function drawLockFlying() {

  if (islockFlying == false)
    return;


  ctx.drawImage(lockpar1Img, xe - 5 - mult2, ye - mult2 + 5 + mult, lockpar1Img.width, lockpar1Img.height);
  ctx.drawImage(lockpar2Img, xe + mult2 + 5, ye - mult2 + 5 + mult, lockpar2Img.width, lockpar2Img.height);


  mult = mult * 1.1;
  mult2 = mult2 * (mult3);
  mult3 = mult3 * 0.995;
  if (mult3 < 1.008) mult3 = 1.008;

}


function drawExplosion() {

  if (frcount < (60 * 2.1)) {
    sp = sp - 0.005;
    dx01 = dx01 * (sp); dy01 = dy01 * (sp);
    ctx.drawImage(explImg1, xe - (dx01 / 2), ye - (dy01 / 2), dx01, dy01);
  }

  if (noMoreSmoke == true) {
    return;
  }

  if (frcount < (60 * 0.51)) {
    dx02 = dx02 * 1.01; dy02 = dy02 * 1.01;
    ctx.drawImage(explImg2, xe - (dx02 / 2), ye - (dy02 / 2), dx02, dy02);
  }
  else if (frcount < (60 * 5.6)) {
    dx03 = dx03 * 1.002; dy03 = dy03 * 1.002;
    alpha = alpha * 0.96;
    ctx.globalAlpha = alpha;
    ctx.drawImage(explImg3, xe - (dx03 / 2), ye - (dy03 / 2), dx03, dy03);
    ctx.globalAlpha = 1.0;
  }

  if (frcount < (60 * 6)) {
    dx04 = dx04 * 1.010; dy04 = dy04 * 1.010;
    ctx.drawImage(explImg5, xe - (dx04 / 2), ye - (dy04 / 2), dx04, dy04);
  }


}


function drawBrickParticles() {
  if (explodedBrics >= 10)
    return;

  if ((brickNumber == 2 || brickNumber == 3 || brickNumber == 4 || brickNumber == 5 || brickNumber == 8 || brickNumber == 10) && frcount < (60 * 5.6)) {

    ctx.drawImage(particleImg11, xe - 5 - mult2, ye - mult2 + 5 + mult);
    ctx.drawImage(particleImg12, xe + mult2 + 5, ye - mult2 + 5 + mult);
    ctx.drawImage(particleImg13, xe - 5 - mult2, ye - 5 + mult2 + mult);
    ctx.drawImage(particleImg14, xe + 5 + mult2, ye - 6 + mult2 + mult);

    ctx.drawImage(particleImg14, xe - 0 - (mult2 * 0.7), ye - (mult2 * 0.6) + 0 + mult);
    ctx.drawImage(particleImg13, xe + (mult2 * 0.5) + 0, ye - mult2 + 0 + mult);
    ctx.drawImage(particleImg12, xe - 0 - mult2, ye - 0 + mult2 * 0.6 + mult);
    ctx.drawImage(particleImg11, xe + 0 + mult2 * 0.3, ye - 0 + mult2 + mult);

    mult = mult * 1.1;
    mult2 = mult2 * (mult3);
    mult3 = mult3 * 0.995;
    if (mult3 < 1.008) mult3 = 1.008;
  }
  if ((brickNumber == 1 || brickNumber == 9) && frcount < (60 * 5.6)) {

    ctx.drawImage(particleImg21, xe - 5 - mult2, ye - mult2 + 5 + mult);
    ctx.drawImage(particleImg22, xe + mult2 + 5, ye - mult2 + 5 + mult);
    ctx.drawImage(particleImg23, xe - 5 - mult2, ye - 5 + mult2 + mult);
    ctx.drawImage(particleImg24, xe + 5 + mult2, ye - 6 + mult2 + mult);

    ctx.drawImage(particleImg24, xe - 0 - (mult2 * 0.7), ye - (mult2 * 0.6) + 0 + mult);
    ctx.drawImage(particleImg23, xe + (mult2 * 0.5) + 0, ye - mult2 + 0 + mult);
    ctx.drawImage(particleImg22, xe - 0 - mult2, ye - 0 + mult2 * 0.6 + mult);
    ctx.drawImage(particleImg21, xe + 0 + mult2 * 0.3, ye - 0 + mult2 + mult);

    mult = mult * 1.1;
    mult2 = mult2 * (mult3);
    mult3 = mult3 * 0.995;
    if (mult3 < 1.008) mult3 = 1.008;
  }
  if ((brickNumber == 6 || brickNumber == 7) && frcount < (60 * 5.6)) {

    ctx.drawImage(particleImg31, xe - 5 - mult2, ye - mult2 + 5 + mult);
    ctx.drawImage(particleImg32, xe + mult2 + 5, ye - mult2 + 5 + mult);
    ctx.drawImage(particleImg33, xe - 5 - mult2, ye - 5 + mult2 + mult);
    ctx.drawImage(particleImg34, xe + 5 + mult2, ye - 6 + mult2 + mult);

    ctx.drawImage(particleImg34, xe - 0 - (mult2 * 0.7), ye - (mult2 * 0.6) + 0 + mult);
    ctx.drawImage(particleImg33, xe + (mult2 * 0.5) + 0, ye - mult2 + 0 + mult);
    ctx.drawImage(particleImg32, xe - 0 - mult2, ye - 0 + mult2 * 0.6 + mult);
    ctx.drawImage(particleImg31, xe + 0 + mult2 * 0.3, ye - 0 + mult2 + mult);

    mult = mult * 1.1;
    mult2 = mult2 * (mult3);
    mult3 = mult3 * 0.995;
    if (mult3 < 1.008) mult3 = 1.008;
  }

}


function drawHammer() {
  if (hammerImg != null)
    ctx.drawImage(hammerImg, cursorX, cursorY);
}

let cnvX = -1; let cnvY = -1;

let cursorX = 0; let cursorY = 0;
var allowGameLoop = false;
function onmousemove(event) {
  if (!areImagesLoaded) {
    return
  }
  cursorX = event.pageX - cX;
  cursorY = event.pageY - cY;
  allowGameLoop = true;
}
var explodedBrics = 0;
let ctn00 = 0;


function mouseDown(event) {
  if (!areImagesLoaded) {
    return
  }

  cnvX = event.pageX - cX;
  cnvY = event.pageY - cY;

  if (explodedBrics < 10) {
    brickNumber = 0;
    /// here we dedect click on bricks: 
    if (cnvX > brickposx[0] && cnvY > brickposy[0] && cnvX < brickposx[0] + brickImg1.width && cnvY < brickposy[0] + brickImg1.height && broken[0] == false) { explodedBrics++; brickNumber = 1; xe = cnvX, ye = cnvY; broken[0] = true; objectWasClicked(); }
    else if (cnvX > brickposx[1] && cnvY > brickposy[1] && cnvX < brickposx[1] + brickImg2.width && cnvY < brickposy[1] + brickImg2.height && broken[1] == false) { explodedBrics++; brickNumber = 2; xe = cnvX, ye = cnvY; broken[1] = true; objectWasClicked(); }
    else if (cnvX > brickposx[2] && cnvY > brickposy[2] && cnvX < brickposx[2] + brickImg3.width && cnvY < brickposy[2] + brickImg3.height && broken[2] == false) { explodedBrics++; brickNumber = 3; xe = cnvX, ye = cnvY; broken[2] = true; objectWasClicked(); }
    else if (cnvX > brickposx[3] && cnvY > brickposy[3] && cnvX < brickposx[3] + brickImg4.width && cnvY < brickposy[3] + brickImg4.height && broken[3] == false) { explodedBrics++; brickNumber = 4; xe = cnvX, ye = cnvY; broken[3] = true; objectWasClicked(); }
    else if (cnvX > brickposx[4] && cnvY > brickposy[4] && cnvX < brickposx[4] + brickImg3.width && cnvY < brickposy[4] + brickImg3.height && broken[4] == false) { explodedBrics++; brickNumber = 5; xe = cnvX, ye = cnvY; broken[4] = true; objectWasClicked(); }
    else if (cnvX > brickposx[5] && cnvY > brickposy[5] && cnvX < brickposx[5] + brickImg5.width && cnvY < brickposy[5] + brickImg5.height && broken[5] == false) { explodedBrics++; brickNumber = 6; xe = cnvX, ye = cnvY; broken[5] = true; objectWasClicked(); }
    else if (cnvX > brickposx[6] && cnvY > brickposy[6] && cnvX < brickposx[6] + brickImg6.width && cnvY < brickposy[6] + brickImg6.height && broken[6] == false) { explodedBrics++; brickNumber = 7; xe = cnvX, ye = cnvY; broken[6] = true; objectWasClicked(); }
    else if (cnvX > brickposx[7] && cnvY > brickposy[7] && cnvX < brickposx[7] + brickImg4.width && cnvY < brickposy[7] + brickImg4.height && broken[7] == false) { explodedBrics++; brickNumber = 8; xe = cnvX, ye = cnvY; broken[7] = true; objectWasClicked(); }
    else if (cnvX > brickposx[8] && cnvY > brickposy[8] && cnvX < brickposx[8] + brickImg7.width && cnvY < brickposy[8] + brickImg7.height && broken[8] == false) { explodedBrics++; brickNumber = 9; xe = cnvX, ye = cnvY; broken[8] = true; objectWasClicked(); }
    else if (cnvX > brickposx[9] && cnvY > brickposy[9] && cnvX < brickposx[9] + brickImg8.width && cnvY < brickposy[9] + brickImg8.height && broken[9] == false) { explodedBrics++; brickNumber = 10; xe = cnvX, ye = cnvY; broken[9] = true; objectWasClicked(); }
  } else {

    /// here we dedect click on chest:
    if (cnvX > chest_posx && cnvY > chest_posy && cnvX < chest_posx + chest_width && cnvY < chest_posy + chest_hight) { xe = cnvX, ye = cnvY; allowFlyingLocks(); chest_to_display++; objectWasClicked(); }

  }


  function allowFlyingLocks() {
    ctn00++;
    if (ctn00 == 1) { islockFlying = true; noMoreSmoke = true; }
    else islockFlying = false;

  }




  function objectWasClicked() {


    clearScreen();

    drawChest();
    drawBrics();


    resetExplosions();
    frcount = 0;
    goExplosions = true;


  }



}

function fireGameEnded() {
  // this will fire when game ends

}

const cssiukas = `
canvas {
    border:1px solid #055500;
    display: block;
    margin: 0 auto;
    image-rendering: high-quality        ;
  }
`;


addStyles(stiliukas, cssiukas);
start();
