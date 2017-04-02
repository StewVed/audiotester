var zAppVersion = '2017-04-02'
, zAppPrefix = 'at'
, gameVars = {
    tone: null
  , vol: null
  , pan: null
  , panPos: {x:0, y:0, z:0}
  , lisn: null
  }
//let's do 18kHz to 22kHz as this isn't supposed to be proper HiFi
, fMin = 18
, fNow = 45
, fMax = 22000
;


function initContent() {
  var stuff = '<div id="cont">'
    //volume control slider from settings (modded)
    + '<div id="sli-vola-C" class="volCont">'
      + '<div id="sli-vola-g" class="volGrad"></div>'
      + '<div id="sli-vola-I" class="volInner">'
        + '<div id="sli-vola-T" class="vImg">◢</div>' //◢ &#9698;
      + '</div>'
    + '</div>'
    //2-Dimentional slider for surround panning
    + '<div id="sli-pan-C" class="balancer">'
      + '<button id="sli-pan-I" class="uButtons" style="height:4em;width:4em;margin:0;padding:0;position:relative;top:-1px;left:-1px;">Start</button>'
    + '</div>'
    //frequency control slider
    + '<div id="sli-freq-C" class="volCont">'
      + '<div id="sli-freq-g" class="volGrad"></div>'
      + '<div id="sli-freq-I" class="volInner">'
        + '<div id="sli-freq-T" class="nImg">♫</div>'
      + '</div>'
    + '</div>'
  + '</div>'
  ;
  return stuff;
}

function runApp() {
  var tmpFreq = parseFloat(storageLoad('frequency')) || 30;

  var tmpPan = storageLoad('panPosition');
  if (tmpPan) {
    var a = tmpPan.split(',');
    tmpPan = [];
    tmpPan.push(parseFloat(a[0]));
    tmpPan.push(parseFloat(a[1]));
  }
  else {
    tmpPan = [50,50];
  }

  //create all the stuff needed for the audio
  //debugger;
  audioCtx.destination.channelCountMode = 'max';
  gameVars.tone = audioCtx.createOscillator();
  gameVars.vol = audioCtx.createGain();
  gameVars.pan = audioCtx.createPanner();
  gameVars.lisn = audioCtx.listener; //this one doesn't appear to need connecting?
  //
  gameVars.tone.connect(gameVars.vol);
  gameVars.vol.connect(gameVars.pan);
  gameVars.tone.type = 'sine';

  //set the volume slider:
  mouseVars.start.target = document.getElementById('sli-vola-I');
  sliderUpdate([globVol], 0);
  //tg_changeSlider(tg_pitchNotes(72, 12, 69));
  //set the frequency slider:
  mouseVars.start.target = document.getElementById('sli-freq-I');
  sliderUpdate([tmpFreq], 0);
  //set the panning slider:
  mouseVars.start.target = document.getElementById('sli-pan-I');
  pannerInit();
  sliderUpdate(tmpPan, 0);


/*
  //default = 'sine' — other values are 'square', 'sawtooth', 'triangle' and 'custom'
  //gameVars.tone[num].frequency.value = 261.626; //Middle C
  //gameVars.tone[num].frequency.value = pitchNotes[60 + (num * 12)].toFixed(3); //C
  gameVars.tone.frequency.value = tg_pitchNotes(72, 12, 69);
  //C
  gameVars.vol.gain.value = (globVol / 100);
*/
  //in this version, the tone is always playing.
  //it is started and stopped by connecting/disconnecting the node.
  gameVars.tone.start();

}