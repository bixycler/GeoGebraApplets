var gg=ggbApplet;
var timer = setInterval(onTimer, gg.getValue("FuseTime")*1000);

function onTimer(){
//console.log("onTimer(): anim="+gg.isAnimationRunning()+", tmFuse="+gg.getValue("tmFuse"));
  if(gg.getValue("tmFuse")<gg.getValue("FuseTime")){return;}
  updateAnimating();
  if(gg.getValue("xAutoSolve")){solveODE();}
}

function normalizeP(i,j,k){
  if(!gg.getValue("xZeroTotalP")){return;}
  let ps = gg.getXcoord("MPi"+i) + gg.getXcoord("MPi"+j) + gg.getXcoord("MPi"+k);
  gg.setCoords("MPi"+j, gg.getXcoord("MPi"+j)-ps/2, gg.getYcoord("MPi"+j));
  gg.setCoords("MPi"+k, gg.getXcoord("MPi"+k)-ps/2, gg.getYcoord("MPi"+k));
}

function burnFuse(){
  gg.setAnimating("tm",false);
  gg.setValue("tmFuse",0);
  gg.evalCommand('StartAnimation(tmFuse)');
}

// input params  (m,p,q) to ODE solver
function solveODE(){
  if(gg.getValue("ODEsolved")){return;}
  gg.setValue("ODEsolving",true);
  tm1 = gg.getValue("tm1").toFixed(2);
  tm2 = gg.getValue("tm2").toFixed(2);
  tm3 = gg.getValue("tm3").toFixed(2);
  tp1 = gg.getValue("tp1").toFixed(2);
  tp2 = gg.getValue("tp2").toFixed(2);
  tp3 = gg.getValue("tp3").toFixed(2);
  tq1 = gg.getValue("tq1").toFixed(2);
  tq2 = gg.getValue("tq2").toFixed(2);
  tq3 = gg.getValue("tq3").toFixed(2);
  console.log("solveODE(m,p,q): 1("+tm1+","+tp1+","+tq1+"), 2("+tm2+","+tp2+","+tq2+"), 3("+tm3+","+tp3+","+tq3+")");
  gg.setValue("m1",tm1);
  gg.setValue("m2",gg.getValue("tm2"));
  gg.setValue("m3",gg.getValue("tm3"));
  gg.setValue("ip1",gg.getValue("tp1"));
  gg.setValue("ip2",gg.getValue("tp2"));
  gg.setValue("ip3",gg.getValue("tp3"));
  gg.setValue("iq1",gg.getValue("tq1"));
  gg.setValue("iq2",gg.getValue("tq2"));
  gg.setValue("iq3",gg.getValue("tq3"));
}

function reset(){
  gg.setValue("tm",gg.getValue("tMin"));
}

// animating => play()/pause()
// => start/stopAnimation() & set animating 
function doPlayPause(){
  let anim = gg.getValue("animating");
  if(anim){play();}else{pause();}
}

function play(){
  console.log('play() while running = '+gg.isAnimationRunning());
  ggbApplet.startAnimation();
  gg.setValue("animating",true);
  gg.setCaption("butAnimation","Pause ⏸");
  gg.setCaption("T","T");
  solveODE();
}
function pause(){
  console.log('pause() while running = '+gg.isAnimationRunning());
  gg.stopAnimation();
  gg.setValue("animating",false);
  gg.setCaption("butAnimation","Play ▶");
  gg.setCaption("T","🤏T");
}

// isAnimationRunning() => animating
function updateAnimating(){
  let oanim = gg.getValue("animating");
  let anim = gg.isAnimationRunning();
  if((oanim==1)==anim){return;}
  gg.setValue("animating",anim);
  console.log("updateAnimating(): animating="+anim);
  doPlayPause();
}

function updateCaptions(){
  gg.setCaption("ms1","m1="+gg.getValue("tm1").toFixed(2));
  gg.setCaption("ms2","m2="+gg.getValue("tm2").toFixed(2));
  gg.setCaption("ms3","m3="+gg.getValue("tm3").toFixed(2));
}

function ggbOnInit() {
  reset();
  play();
}
