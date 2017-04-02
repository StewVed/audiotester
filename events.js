function keyDownEvents() {
  //this is for an editEnable input element
}
function keyDownGameEvents(theKey) {
  //this is for in-game events.
}
function keyUpEvents() {
  //this is for an editEnable input element
}
function keyUpGameEvents(theKey) {
  //this is for in-game events.
}
function mouseClickEvents() {
  var zButton = mouseVars.current.target;
    if (zButton.id === 'sli-pan-I') {
    if (zButton.innerHTML === 'Start') {
      zButton.innerHTML = 'Stop';
      zButton.classList.remove('uButtonRed');
      zButton.classList.add('uButtonGreen');
      gameVars.pan.connect(audioCtx.destination);
    } else {
      zButton.innerHTML = 'Start';
      zButton.classList.remove('uButtonGreen');
      zButton.classList.add('uButtonRed');
      gameVars.pan.disconnect(audioCtx.destination);
    }
  }
}

function mouseDownEvents() {
  //custom mouse/touch down events for your app go here
}
function mouseMoveEvents() {
  //custom mouse/touch move events for your app go here
}
function mouseMoveEnter(targ) {
  /*
   * use this for hovering over things.
   * eg. when you enter a new thing, highlight it.
  */
}
function mouseMoveOut(targ) {
  /*
   * opposite of enter...
   * eg. unhighlight something as the mouse moves off of it.
   *
  */
}
function mouseMoveOver(targ) {
  /*
   * for actively tracking while on an object.
   * eg. moving, dynamic tooltip.
  */
}
function mouseUpEvents() {
  //custom mouse/touch up events for your app go here
}

function mouseWheelEvents(targ, d) {
  if (targ.classList.contains('letScroll')) {
    //very dodgy hard-code - only one thing can be scrolled.
    targ = document.getElementById('toastPopup');
    var zSpeed;
    if (d < 0) {
      zSpeed = -1000;
    } else {
      zSpeed = 1000;
    }
    divScroller(targ, zSpeed, new Date().getTime());
  }
}

function gamePadsButtonDown(zButton) {
  //custom gamepad button down events for your app go here
}
function gamePadsButtonUp(zButton) {
  //custom gamepad button down events for your app go here
}

function anEvent() {
  /*
    this one is for evergy-saving with static games.
    If your game waits for an input and then does something,
    then put something here to set it going.
  */

  /*
    If your game has a running animation loop, you can use this var
    in your main loop to trigger stuff happening!
  */
  //gameVars.go = 1; //obviously, you can call it whatever you want...lol
}


function resizeEvents() {
  //make the balance circle a circle...
  document.getElementById('sli-pan-C').style.height =
  document.getElementById('sli-pan-C').offsetWidth + 'px';

  zTop = resizeCenter(document.body.offsetHeight, document.getElementById('cont').offsetHeight);
  document.getElementById('cont').style.top = zTop + 'px';
  document.getElementById('cont').style.left = resizeCenter(document.body.offsetWidth, document.getElementById('cont').offsetWidth) + 'px';

  //resizeRatio(16, 9); //for making it a specific aspect ratio...
}
//This should be the only function that has to be edited for sliders :)
function sliderEvents(sliderPercent, sve) {
  var sliderType = mouseVars.start.target.id.split('-')[1];

  if (sliderType === 'vola') {
    //update the app's volume
    globVol = sliderPercent[0];
    gameVars.vol.gain.value = (globVol / 100);
    if (sve && mouseVars.start.target.style.background.length) {
      storageSave('volume', globVol.toFixed(2));
    }
    sliderColors(sliderPercent);
  } else if (sliderType === 'freq') {
    //update the app's frequency
    tg_changeFreq(sliderPercent);
    if (sve && mouseVars.start.target.style.background.length) {
      storageSave('frequency', sliderPercent[0].toFixed(2));
    }
    sliderColors(sliderPercent);
  } else if (sliderType === 'pan') {
    //
    if (sve && (mouseVars.start.target.classList.contains('uButtonRed') ||mouseVars.start.target.classList.contains('uButtonGreen'))) {
      storageSave('panPosition', sliderPercent[0].toFixed(2) + ',' + sliderPercent[1].toFixed(2));
    }
    else {
      if (mouseVars.start.target.innerHTML == 'Start') {
        mouseVars.start.target.classList.add('uButtonRed');
      }
      else {
        mouseVars.start.target.classList.add('uButtonGreen');
      }
    }
    pannerPlace(sliderPercent);
  }
}

