let isPlaying = false;
let sessionTime = document.querySelector('#session-minutes');
sessionTime.innerText = 25; //default
let started = false;
let isSession = true;





let playButton = document.querySelector('#play-button').addEventListener('click', () => Play());
let pauseButton = document.querySelector('#pause-button').addEventListener('click', () => HandleClock('pause'));
let stopButton = document.querySelector('#stop-button').addEventListener('click', () => HandleClock('stop'));
let refreshButton = document.querySelector('#refresh-button').addEventListener('click', () => HandleClock('refresh'));

//clock operation buttons
function Play () {
    if(isPlaying)
    {
         alert('Chill its already playing');
    }
    else{
        isPlaying = !isPlaying;
        HandleClock("play");
        if(isSession){
          document.querySelector('.session-title').classList.add("isActive");
        }

        started = true;
    }

}
function HandleClock(whichButton)
{
  switch (whichButton) 
  {
    case "play":
      if(!started){
        HandlePlay()
      }else {
        isPlaying = true;
      }
      break;
    case "pause":
        Pause()
      break;
    case "stop":
        Stop()
      break;
    case "refresh":
        Refresh()
      break; 
  }
}
function HandlePlay()
{
  //let x = setInterval(CountDown() , 1000);
  let x = setInterval(function() { CountDown();}, 1000);
}

//this function is called every 1 second by the set interval function
function CountDown()
{
  if(!isPlaying){
    return;
  }
  let timeLeft = document.querySelector(".clock").innerText;

  let splitTime = timeLeft.split(":");
  let min = parseInt(splitTime[0]);
  let sec = parseInt(splitTime[1]);
  let seconds = min*60 + sec;

  if(seconds != 0){
    seconds = seconds - 1;
  }
  else{
    if(isSession){
      //start break
      seconds = (document.querySelector('#break-minutes').innerText) * 60 ;
      document.querySelector(".clock").innerText = document.querySelector("#break-minutes").innerText;
      document.querySelector('.break-title').classList.add('isActive')
      document.querySelector('.session-title').classList.remove('isActive')
      isSession = false;
    }else {
      //start session
      seconds = (document.querySelector('#session-minutes').innerText) * 60;
      document.querySelector(".clock").innerText = document.querySelector("#session-minutes").innerText;
      document.querySelector('.session-title').classList.add('isActive')
      document.querySelector('.break-title').classList.remove('isActive')
      isSession = true;
    }
  }
  min = parseInt(seconds / 60);
  sec = seconds % 60;

  if(sec <= 9){
    sec = '0' + sec;
  }

  time = min + ":" + sec;
  
  document.querySelector(".clock").innerText = time;
}
function Pause () {
  if(isPlaying){
    isPlaying = !isPlaying;
  }
}

function Refresh () {
  //return these values to default
  document.querySelector('#session-minutes').innerText = 25; 
  document.querySelector('#break-minutes').innerText = 5; 
  Stop();

}

function Stop() {
  isPlaying = false;
  
  document.querySelector('.clock').innerText = sessionTime.innerText + ':00';
}



//Handling session button clicks

  let sessionDown = document.querySelector('#session-down').addEventListener('click', () => {
    if(!started){
      if(sessionTime.innerText > 1 ) {
        sessionTime.innerText = sessionTime.innerText -1;
       }
       document.querySelector(".clock").innerText = sessionTime.innerText + ":" + "00";
   }
  });
  let sessionUp = document.querySelector('#session-up').addEventListener('click', () => {
    if(!started){
      let intTime = parseInt(sessionTime.innerText); 
      sessionTime.innerText = intTime + 1 ;
      document.querySelector(".clock").innerText = sessionTime.innerText + ":" + "00";
    }
  });


let breakTime = document.querySelector('#break-minutes');
breakTime.innerText = 5;

//handling break button clicks
let breakDown = document.querySelector('#break-down').addEventListener('click', () => {
  if(!started){
    if(breakTime.innerText > 1 ) {
      breakTime.innerText = breakTime.innerText -1;
    }
  }

});
let breakUp = document.querySelector('#break-up').addEventListener('click', () => {
  if(!started){
    let intTime = parseInt(breakTime.innerText); 
    breakTime.innerText = intTime + 1 ;
  }

});