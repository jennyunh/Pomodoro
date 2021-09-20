/* IDEAS: 
- everytime time is playing and u apply new settings, the animation keeps going
*/

import React from "react";
import "animate.css";
import {Button, Fade} from 'react-bootstrap';
import $ from 'jquery';

import Slider from '@material-ui/core/Slider';



class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionTitle: 'SESSION',
      sessionMin: '25',
      sessionSec: '00',
      sessionMinSet: '25',
      sessionSecSet: '00',
      play: false,
      breakSet: '5',
      breakTime: '5',
      break: false,
      open: false,
      increase: '00',
      decrease: '00',
      audio: 'Default Ring',
      audioChoice: '1',
      cycle: false,
      cycleChoice: 'No',
      status: "Time to Work.",
      startVolume: parseInt('1', 10),
      volumeSet: '0'
    };
    

    this.handlePlay = this.handlePlay.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBreakInc = this.handleBreakInc.bind(this);
    this.handleBreakDec = this.handleBreakDec.bind(this);
    this.handleSessionInc = this.handleSessionInc.bind(this);
    this.handleSessionDec = this.handleSessionDec.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handleAudioInc = this.handleAudioInc.bind(this);
    this.handleAudioDec = this.handleAudioDec.bind(this);
    this.handleCycleInc = this.handleCycleInc.bind(this);
    this.handleCycleDec = this.handleCycleDec.bind(this);
    this.src1 = "http://docs.google.com/uc?export=open&id=1ysHGftMEX943xIS2cid2UwrZrHhNo5_4";
    this.src2 = "http://docs.google.com/uc?export=open&id=145QrhkIhSptLvxpy7jk0CGsSl1rePoB0";
    this.src3 = "http://docs.google.com/uc?export=open&id=1s42vkkVEoaFW6SOBZF5RMyj7_iE06poy";
    this.src4 = "http://docs.google.com/uc?export=open&id=1EUJ3KgUVcy1e_ZvLHxMMzZBJ_ebONAuz";
    this.audio1 = new Audio(this.src1);
    this.audio2 = new Audio(this.src2);
    this.audio3 = new Audio(this.src3);
    this.audio4 = new Audio(this.src4);
    this.handlePie = this.handlePie.bind(this);
    this.handleStopAudio = this.handleStopAudio.bind(this);
    this.handleDefault = this.handleDefault.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
  }
  
  /*------------------------------------------------- */
         /* WHEN SETTINGS BUTTON IS CLICKED */
  /*------------------------------------------------- */

  handleClick() {
    this.setState(state => ({open: !this.state.open}))
    console.log("The Current Initial Play State is " + this.state.play);
  }

/*------------------------------------------------- */
          /* WHEN COMPONENT MOUNTS */
/*------------------------------------------------- */

  componentDidMount() {
    if ((this.state.play === true) && (this.state.break === false)) {
    this.initiateCountDown = setInterval(this.countDown, 1000);
    console.log("CONSOLE HAS BEEN MOUNTED")
  }

  else if (this.state.break === true) {
    console.log("CONSOLE HAS BEEN REMOUNTED FOR BREAK TIME");
    this.setState({sessionSec: '00'});
    this.setState({sessionMin: this.state.breakSet});
    this.initiateCountDown = setInterval(this.countDown, 1000);
  }

  }

/*------------------------------------------------- */
          /* WHEN COMPONENT UNMOUNTS */
/*------------------------------------------------- */

  componentWillUnmount() {
    clearInterval(this.initiateCountDown);
    console.log("CONSOLE HAS BEEN UNMOUNTED")
  }


  /*------------------------------------------------- */
          /* HANDLING PLAY BUTTON CLICK */
  /*------------------------------------------------- */

  handlePlay() {
    this.setState({play: !this.state.play})
      console.log("PLAY BUTTON HAS BEEN CLICKED");
      console.log("the final set time is " + this.state.sessionMin + ':' + this.state.sessionSec);
      console.log("current play state is " + this.state.play);
      

      if (this.state.play === true) {
        $('#Sun').addClass('Sun');
      $('#ClockHand').addClass('ClockHand');
      document.getElementById("apply").disabled = true;
      document.getElementById("default").disabled = true;
      this.componentDidMount();
   
    } 

    this.handlePie();
   

      if (this.state.play === false){
        $('#Sun').removeClass('Sun');
        $('#ClockHand').removeClass('ClockHand')
        document.getElementById("apply").disabled = false;
        document.getElementById("default").disabled = false;
        this.componentWillUnmount();
      } 

      
    }


  /*------------------------------------------------- */
          /* FUNCTION FOR COUNTING DOWN */
  /*------------------------------------------------- */
  countDown() {
    /* If the time is like 2:00, continue counting down starting from 59 seconds and minus 1 minute*/
    if ((this.state.sessionSec === '00') && (parseInt(this.state.sessionMin, 10) > 0)) {
      this.setState({sessionSec: '59'});
      this.setState({sessionMin: (parseInt(this.state.sessionMin, 10) - 1).toString()});
    }

    /* If the minutes is equal to or greater than zero, 
    and the seconds is greater than ten, 
    (implied: the seconds is also less than 59 seconds)
    keep subtracting 1 second. Leave the minutes alone. */
    else if ((parseInt(this.state.sessionSec, 10) > 10) && (parseInt(this.state.sessionMin, 10) >= 0)) {
      this.setState({sessionSec: (parseInt(this.state.sessionSec, 10) - 1).toString()});
    }

    /* If the minutes is equal to or greater than zero, and the seconds is greater than zero 
    (implied: and less than ten),
    keep subtracting 1 second, but attach a zero in front of the second (e.g: for 2 seconds it will be MIN:02) */
    else if ((parseInt(this.state.sessionMin, 10) >= 0) && (parseInt(this.state.sessionSec, 10) > 0)) {
      this.setState({sessionSec: '0' + (parseInt(this.state.sessionSec, 10) - 1).toString()});
    }

    /* If the session SECONDS reaches zero, the alarm will ring.
    The component will unmount,
    the break state will be set to true,
    and the component will be remounted to initiate the break = true route*/
    else if ((parseInt(this.state.sessionMin, 10) === 0) && (parseInt(this.state.sessionSec, 10) === 0) && (this.state.break === false))  {
this.setState({sessionSec: '00'})
console.log("SESSION TIMES UP! RING RING");

if (this.state.audioChoice === '1') {
  this.audio1.play();
}

else if (this.state.audioChoice === '2') {
this.audio2.play();
}

else if (this.state.audioChoice === '3') {
this.audio3.play()
}

else if (this.state.audioChoice === '4') {
this.audio4.play()
}
this.componentWillUnmount();
this.setState({break: true});
this.setState({sessionTitle: "BREAK"});
this.setState({status: "Time to Rest."})
this.componentDidMount();
    }

     /* WHEN BREAK TIME IS OVER, THERE ARE TWO OPTIONS: AUTO CYCLE OR STOP.*/
    else if ((parseInt(this.state.sessionMin, 10) === 0) && (parseInt(this.state.sessionSec, 10) === 0) && (this.state.break === true)) {
      this.setState({sessionSec: '00'});
      this.setState({sessionTitle: "SESSION"});
console.log("TIMES UP! BREAK IS OVER!");
$('.ClockHand').css({"animation-name": "clockSpin", "animation-timing-function": "linear", "animation-iteration-count": "infinite", "transform-origin": "136px 183px", "animation-duration": '0', "animation-play-state": "paused"});

if (this.state.audioChoice === '1') {
  this.audio1.play();
}

else if (this.state.audioChoice === '2') {
this.audio2.play();
}

else if (this.state.audioChoice === '3') {
this.audio3.play()
}

else if (this.state.audioChoice === '4') {
this.audio4.play()
}

/* OPTION ONE: AUTO CYCLE */
if (this.state.cycle === true) {
  this.componentWillUnmount();
  this.setState({sessionSec: '00'});
  this.setState({sessionMin: this.state.sessionMinSet});
  this.setState({status: "Time to Work."})
  this.componentDidMount();
  console.log("AUTO CYCLE STREAM")

}

/* OPTION TWO: NO CYCLE, STOP */
if (this.state.cycle === false) {
  this.handlePie();
this.componentWillUnmount();
this.setState({sessionSec: '00'});
    this.setState({sessionMin: this.state.sessionMinSet});
    this.setState({play: false})
    this.setState({status: "Time to Work."})
    console.log("NO CYCLE STREAM")

}



    }

    }
    

/*------------------------------------------------- */
          /* HANDLING RESET */
/*------------------------------------------------- */

    handleReset() {
      console.log("RESET BUTTON CLICKED")
      console.log("current play state is: " + this.state.play)
      this.setState({
        sessionTitle: 'SESSION',
      sessionMin: this.state.sessionMinSet,
      sessionSec: this.state.sessionSecSet,
      sessionMinSet: this.state.sessionMinSet,
      sessionSecSet: this.state.sessionSecSet,
      play: false,
      breakSet: this.state.breakSet,
      breakTime: this.state.breakSet,
      break: false,
      open: false,
      audio: this.state.audio,
      audioChoice: this.state.audioChoice,
      status: "Time to Work."
})

this.componentDidMount();
      $('#Sun').addClass('Sun'); 
      $('.Sun').css({"animation-name": "none"});
      $('#ClockHand').addClass('ClockHand');
      $('.ClockHand').css({"animation-name": "none"});

      document.getElementById("apply").disabled = false;
      document.getElementById("default").disabled = false;

      this.componentWillUnmount();

      

      
    }



  /*------------------------------------------------- */
    /* HANDLING INCREASE/DECREASE BREAK TIME BUTTON */
  /*------------------------------------------------- */

    handleBreakInc(){
      this.setState({breakSet: (parseInt(this.state.breakSet, 10) + 1).toString()})
    }

    handleBreakDec(){
      if (parseInt(this.state.breakSet, 10) > 1)
      {this.setState({breakSet: (parseInt(this.state.breakSet, 10) - 1).toString()})}
    }

/*------------------------------------------------- */
  /* HANDLING INCREASE/DECREASE SESSION TIME BUTTON */
/*------------------------------------------------- */

    handleSessionInc(){
      
      this.setState({sessionMinSet: (parseInt(this.state.sessionMinSet, 10) + 1).toString()})
      }

    
    handleSessionDec(){
        
      if (parseInt(this.state.sessionMinSet, 10) > 1)
      {this.setState({sessionMinSet: (parseInt(this.state.sessionMinSet, 10) - 1).toString()})
    }
        }
  
/*------------------------------------------------- */
    /* HANDLING AUDIO FILES */
/*------------------------------------------------- */

handleAudioInc() {
  if (parseInt(this.state.audioChoice, 10) < 4) {
this.setState({audioChoice: (parseInt(this.state.audioChoice, 10) + 1).toString()}) 

if (this.state.audioChoice === '1') {
  this.setState({audio: "Floating Ringer"})
}

else if (this.state.audioChoice === '2') {
  this.setState({audio: "Pensive"})
}

else if (this.state.audioChoice === '3') {
  this.setState({audio: "Omae Wa Mou"})
}

  }

else if (parseInt(this.state.audioChoice, 10) === 4) {
  this.setState({audioChoice: '1',
audio: "Default Ring"})
}

console.log(this.state.audio)
console.log(this.state.audioChoice)
}

handleAudioDec() {
  if (parseInt(this.state.audioChoice, 10) === 1) {
    this.setState({audioChoice: '4'})
    this.setState({audio: "Omae Wa Mou"})
  }

  else if (parseInt(this.state.audioChoice, 10) > 1) {
    this.setState({audioChoice: (parseInt(this.state.audioChoice, 10) - 1).toString()})
    
    if (this.state.audioChoice === '4') {
      this.setState({audio: "Pensive"})
    }

    else if (this.state.audioChoice === '3') {
      this.setState({audio: "Floating Ringer"})
    }

    else if (this.state.audioChoice === '2') {
      this.setState({audio: "Default Ring"})
    }
  }

  console.log(this.state.audio)
console.log(this.state.audioChoice)
}

/*------------------------------------------------- */
    /* HANDLING AUTO CYCLE SETTINGS */
/*------------------------------------------------- */

handleCycleInc() {
  this.setState({cycle: !this.state.cycle})

  if (this.state.cycle === false) {
    this.setState({cycleChoice: 'Yes'})
  }

  else {
    this.setState({cycleChoice: 'No'})
  }
  }


handleCycleDec() {
  this.setState({cycle: !this.state.cycle})

  if (this.state.cycle === false) {
    this.setState({cycleChoice: 'Yes'})
  }

  else {
    this.setState({cycleChoice: 'No'})
  }

}


  /*------------------------------------------------- */
          /* HANDLING APPLY SETTINGS BUTTON */
  /*------------------------------------------------- */

    handleApply() {
      console.log(this.state.sessionMinSet + ':' + this.state.sessionSecSet)
      this.setState({sessionMin: this.state.sessionMinSet});
      this.setState({sessionSec: this.state.sessionSecSet});
      this.setState({breakTime: this.state.breakSet});
      this.setState({play: true});
      console.log("Apply Button was Clicked");
      console.log('the set session time is ' + this.state.sessionMinSet + ':' + this.state.sessionSecSet);
      console.log('this set break time is ' + this.state.breakSet);
      console.log('the audio choice number is ' + this.state.audioChoice + " audio name is " + this.state.audio);
      console.log('the cycle setting is ' + this.state.cycleChoice)
      console.log('the set volume is ' + this.state.volumeSet)
      $('#Sun').addClass('Sun'); 
      $('.Sun').css({"animation-name": "none"});
      $('#ClockHand').addClass('ClockHand');
      $('.ClockHand').css({"animation-name": "none"});
    }
    
        
 /*------------------------------------------------- */
          /* HANDLING PIE ANIMATION*/
  /*------------------------------------------------- */

    handlePie() {
      let totalTimeMins = parseInt(this.state.sessionMinSet, 10) + parseInt(this.state.breakSet, 10);
      console.log("total time in minutes is " + totalTimeMins)
      let totalTimeSecs = totalTimeMins * 60;

      let totalTimeSecsStr = totalTimeSecs.toString() + "s";
      console.log("total time in seconds as a string " + totalTimeSecsStr)

      let percentageSession =  (parseInt(this.state.sessionMinSet, 10) / totalTimeMins) * 100;
      console.log(percentageSession)

      let dashArray = percentageSession + ' 100';
     console.log(dashArray)


 /* pie chart color circle*/
     document.getElementsByClassName('circle')[0].setAttribute('stroke-dasharray', dashArray);
     console.log(document.getElementsByClassName('circle')[0]);

     console.log("the current play state is: " + this.state.play);
/* If timer is going, clock hand must spin */
     if (this.state.play === true) {    
      $('.ClockHand').css({"animation-name": "clockSpin", "animation-timing-function": "linear", "animation-iteration-count": "infinite", "transform-origin": "136px 183px", "animation-duration": totalTimeSecsStr, "animation-play-state": "running"})
$('.Sun').css({"animation-name": "sunAni", "animation-timing-function": "ease-out", "animation-iteration-count": "infinite", "transform-origin": "center", "animation-duration": '4s', "animation-play-state": "running", "z-index": "-1"})

    console.log("PLAY STATE TRUE PATH")
    console.log(document.getElementById('ClockHand')); 
  console.log(document.getElementById('Sun'))}

/* Else if timer is paused, clock hand and sun must PAUSE */
    else if (this.state.play === false) {
      $('.ClockHand').css({"animation-name": "clockSpin", "animation-timing-function": "linear", "animation-iteration-count": "infinite", "transform-origin": "136px 183px", "animation-duration": totalTimeSecsStr, "animation-play-state": "paused"})
      $('.Sun').css({"animation-name": "sunAni", "animation-timing-function": "ease-out", "animation-iteration-count": "infinite", "transform-origin": "center", "animation-duration": '4s', "animation-play-state": "paused", "z-index": "-1"})
      console.log("PLAY STATE FALSE PATH")
      console.log(document.getElementById('ClockHand'));
      console.log(document.getElementById('Sun'));
    }

    console.log("HANDLE PIE HAS BEEN RUN"); 
    

      };
    
  /*------------------------------------------------- */
          /* HANDLING APPLY SETTINGS BUTTON */
  /*------------------------------------------------- */
handleStopAudio() {
  if (this.state.audioChoice === '1') {
    this.audio1.pause();
    this.audio1.currentTime = 0;
  }
  
  else if (this.state.audioChoice === '2') {
    this.audio2.pause();
    this.audio2.currentTime = 0;
  }
  
  else if (this.state.audioChoice === '3') {
    this.audio3.pause();
    this.audio3.currentTime = 0;
  }
  
  else if (this.state.audioChoice === '4') {
    this.audio4.pause();
    this.audio4.currentTime = 0;
  }
}
 
 /*------------------------------------------------- */
          /* HANDLING DEFAULT SETTINGS BUTTON */
/*------------------------------------------------- */

handleDefault(){
  this.setState({
    sessionTitle: 'SESSION',
    sessionMin: '25',
    sessionSec: '00',
    sessionMinSet: '25',
    sessionSecSet: '00',
    play: false,
    breakSet: '5',
    breakTime: '5',
    break: false,
    open: false,
    increase: '00',
    decrease: '00',
    audio: 'Default Ring',
    audioChoice: '1',
    cycle: false,
    cycleChoice: 'No',
    volume: 0.5
  })
}

/*------------------------------------------------- */
          /* HANDLING AUDIO VOLUME SLIDER */
/*------------------------------------------------- */
handleVolume(e, val){
  let newValue = val;
  let newVolume = newValue / 100;
  let newVolumeStr = newVolume.toString();
  this.setState({
    volumeSet: newVolumeStr})

if (this.state.audioChoice === '1') {
this.audio1.volume = this.state.volumeSet
console.log('the audios volume is now: ' + this.audio1.volume)
}

else if (this.state.audioChoice === '2') {
  this.audio2.volume = this.state.volumeSet
}

else if (this.state.audioChoice === '3') {
  this.audio3.volume = this.state.volumeSet
}

else if (this.state.audioChoice === '4') {
  this.audio4.volume = this.state.volumeSet
}
    
}


  /*------------------------------------------------- */
          /* RENDER DOM ELEMENTS BELOW */
  /*------------------------------------------------- */
  render() {

    return (<div id="body"> 


      <h1 className="animate__animated animate__jackInTheBox">Pomodoro Clock</h1>

      <h2 className="animate__animated animate__jackInTheBox">{this.state.status}</h2>

      <div id="container">

<div id="allPics" className="animate__animated animate__jackInTheBox">
      <svg id = "picture" width="270" height="340" viewBox="0 0 270 340" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Clock Svg 1">
<g id="undraw_season_change_f99v 1">
<path id="Ground" d="M130.696 249C202.878 249 261.392 246.604 261.392 243.648C261.392 240.693 202.878 238.297 130.696 238.297C58.5147 238.297 0 240.693 0 243.648C0 246.604 58.5147 249 130.696 249Z" fill="#D6D1B1"/>
<path id="Sun" d="M21.752 123.097C29.2302 123.097 35.2924 116.974 35.2924 109.421C35.2924 101.868 29.2302 95.7446 21.752 95.7446C14.2738 95.7446 8.21146 101.868 8.21146 109.421C8.21146 116.974 14.2738 123.097 21.752 123.097Z" fill="#FAC487"/>
<path id="TreeLeavesLeft" d="M33.2625 176.58C51.6329 176.58 66.5251 161.539 66.5251 142.984C66.5251 124.43 51.6329 109.388 33.2625 109.388C14.8921 109.388 0 124.43 0 142.984C0 161.539 14.8921 176.58 33.2625 176.58Z" fill="#07DA84"/>
<path id="Tree Leaves Right" d="M237.5 177C253.24 177 266 163.793 266 147.5C266 131.208 253.24 118 237.5 118C221.76 118 209 131.208 209 147.5C209 163.793 221.76 177 237.5 177Z" fill="#07DA84"/>
<path id="Left Trunk" d="M36.4687 244.177H29.6558L32.7615 137.924L36.4687 244.177Z" fill="#805E3C"/>
<path id="Left Tree Right Branch" d="M33.3626 158.062L40.6765 147.842L33.2625 160.592L32.461 159.175L33.3626 158.062Z" fill="#3F3D56"/>
<path id="Left Tree Left Branch" d="M32.5611 168.384L25.2474 158.163L32.6614 170.913L33.463 169.497L32.5611 168.384Z" fill="#3F3D56"/>
<path id="Right Trunk" d="M243.583 244.289H236.771L239.876 138.036L243.583 244.289Z" fill="#805E3C"/>
<path id="Right Tree Right Branch" d="M240.478 158.174L247.791 147.953L240.377 160.704L239.576 159.287L240.478 158.174Z" fill="#3F3D56"/>
<path id="Right Tree Left Branch" d="M239.676 168.495L232.362 158.275L239.776 171.025L240.578 169.609L239.676 168.495Z" fill="#3F3D56"/>
<path id="Clock Rim" d="M135.127 244.271C169.349 244.271 197.091 216.251 197.091 181.686C197.091 147.122 169.349 119.101 135.127 119.101C100.906 119.101 73.1635 147.122 73.1635 181.686C73.1635 216.251 100.906 244.271 135.127 244.271Z" fill="black"/>
<path id="ClockBackground" d="M135.127 239.09C166.516 239.09 191.961 213.39 191.961 181.686C191.961 149.983 166.516 124.282 135.127 124.282C103.738 124.282 78.2929 149.983 78.2929 181.686C78.2929 213.39 103.738 239.09 135.127 239.09Z" fill="white"/>
{/*  
<path id="Center Dot" d="M134.922 189.561C139.115 189.561 142.513 186.128 142.513 181.893C142.513 177.659 139.115 174.226 134.922 174.226C130.729 174.226 127.33 177.659 127.33 181.893C127.33 186.128 130.729 189.561 134.922 189.561Z" fill="black"/>
<path id="Top Clock Line" d="M136.563 127.184H133.28V133.401H136.563V127.184Z" fill="black"/>
<path id="Bottom Clock Line" d="M136.563 230.387H133.28V236.604H136.563V230.387Z" fill="black"/>
<path id="Left Clock Line" d="M86.9103 183.552V180.236H80.755V183.552H86.9103Z" fill="black"/>
<path id="Right Clock Line" d="M189.089 183.552V180.236H182.933V183.552H189.089Z" fill="black"/>
<path id="ClockHand" d="M132.733 185.222L135.539 178.743L170.693 198.408L132.733 185.222Z" fill="black">
</path> */}
<path id="Button Base" d="M143.129 103.973H127.125V122.624H143.129V103.973Z" fill="black"/>
<path id="Top Button" d="M135.127 109.154C145.325 109.154 153.593 106.835 153.593 103.973C153.593 101.112 145.325 98.7924 135.127 98.7924C124.928 98.7924 116.661 101.112 116.661 103.973C116.661 106.835 124.928 109.154 135.127 109.154Z" fill="black"/>
<path id="Left Hand" d="M169.699 192.773L168.673 194.224C168.673 194.224 163.955 199.819 163.749 197.125C163.544 194.431 167.237 192.566 167.237 192.566L169.289 191.323L169.699 192.773Z" fill="#FFB8B8"/>
<path id="Right Hand" d="M198.906 197.668L199.764 199.225C199.764 199.225 202.752 205.927 200.253 204.962C197.755 203.996 197.666 199.827 197.666 199.827L197.432 197.421L198.906 197.668Z" fill="#FFB8B8"/>
<path id="Hair" d="M194.287 170.054C197.737 170.054 200.534 167.228 200.534 163.743C200.534 160.258 197.737 157.433 194.287 157.433C190.836 157.433 188.039 160.258 188.039 163.743C188.039 167.228 190.836 170.054 194.287 170.054Z" fill="#774C05"/>
<path id="Right Leg" d="M193.705 215.569L194.526 220.957V222.615H199.245V220.543C199.245 220.543 199.45 216.813 198.629 215.776C197.809 214.74 193.705 215.569 193.705 215.569Z" fill="#FFB8B8"/>
<path id="Left Leg" d="M185.293 215.569L186.114 220.957V222.615H190.833V220.543C190.833 220.543 191.038 216.813 190.217 215.776C189.397 214.74 185.293 215.569 185.293 215.569Z" fill="#FFB8B8"/>
<path id="Right Arm" d="M188.468 172.289C188.468 172.289 186.653 173.255 187.893 175.453C189.133 177.651 196.407 200.39 196.407 200.39L200.603 199.187L196.902 184.806L194.783 175.767L188.468 172.289Z" fill="#FE5F55"/>
<path id="Face" d="M193.603 170.289C196.209 170.289 198.322 168.154 198.322 165.522C198.322 162.89 196.209 160.756 193.603 160.756C190.996 160.756 188.883 162.89 188.883 165.522C188.883 168.154 190.996 170.289 193.603 170.289Z" fill="#FFB8B8"/>
<path id="Neck" d="M195.757 166.247L195.141 175.987L190.833 172.879C190.833 172.879 192.269 167.076 191.859 166.662L195.757 166.247Z" fill="#FFB8B8"/>
<path id="Shirt" d="M195.757 175.158L191.115 171.687C191.115 171.687 188.986 170.806 188.37 171.843C187.755 172.879 184.677 188.214 186.319 191.115C186.319 191.115 195.141 192.981 196.988 191.944L197.809 186.556C197.809 186.556 198.835 183.241 197.193 181.168L195.757 175.158Z" fill="#FE5F55"/>
<path id="Left Arm" d="M189.602 172.05C189.602 172.05 187.96 170.806 186.524 172.879C185.088 174.951 167.853 191.323 167.853 191.323L170.725 194.639L182.01 185.106L189.191 179.303L189.602 172.05Z" fill="#FE5F55"/>
<path id="Skirt" d="M197.091 191.841C197.091 191.841 186.934 189.872 185.908 191.323L185.703 193.602C185.703 193.602 183.446 197.954 184.677 205C185.908 212.046 185.088 216.398 185.088 216.398C185.088 216.398 190.628 215.776 194.731 216.398C198.835 217.02 199.45 216.398 199.45 216.398L197.091 191.841Z" fill="#2F2E41"/>
<path id="Right Sock" d="M199.655 221.786L193.705 221.994L195.757 237.536C195.757 237.536 194.115 244.168 195.962 244.582C197.246 244.844 198.551 244.982 199.86 244.996C199.86 244.996 201.707 246.862 203.759 246.655C205.122 246.479 206.442 246.058 207.657 245.411C207.657 245.411 208.067 244.168 206.631 243.753C205.195 243.339 201.297 242.095 200.476 237.743L199.655 221.786Z" fill="#2F2E41"/>
<path id="Left Sock" d="M191.243 221.786L185.293 221.994L187.345 237.536C187.345 237.536 185.703 244.168 187.55 244.582C188.833 244.844 190.139 244.982 191.448 244.996C191.448 244.996 193.295 246.862 195.346 246.655C196.709 246.479 198.03 246.058 199.245 245.411C199.245 245.411 199.655 244.168 198.219 243.753C196.783 243.339 192.884 242.095 192.064 237.743L191.243 221.786Z" fill="#2F2E41"/>
<path id="PonyTail" d="M196.472 159.713C197.9 159.713 199.057 158.544 199.057 157.102C199.057 155.66 197.9 154.491 196.472 154.491C195.044 154.491 193.887 155.66 193.887 157.102C193.887 158.544 195.044 159.713 196.472 159.713Z" fill="#774C05"/>
<path id="Hair Wisp" d="M199.919 155.688C199.919 155.042 199.682 154.42 199.255 153.94C198.827 153.46 198.239 153.158 197.603 153.091C197.692 153.081 197.783 153.077 197.872 153.076C198.558 153.076 199.215 153.352 199.7 153.841C200.185 154.331 200.458 154.995 200.458 155.688C200.458 156.38 200.185 157.044 199.7 157.534C199.215 158.024 198.558 158.299 197.872 158.299C197.783 158.299 197.692 158.294 197.603 158.285C198.239 158.217 198.827 157.915 199.255 157.435C199.682 156.956 199.919 156.333 199.919 155.688Z" fill="#774C05"/>
<path id="Bangs" d="M193.56 165.017C195.94 165.017 197.869 163.848 197.869 162.405C197.869 160.963 195.94 159.794 193.56 159.794C191.18 159.794 189.251 160.963 189.251 162.405C189.251 163.848 191.18 165.017 193.56 165.017Z" fill="#774C05"/>
</g>
</g>
</svg>

{/* PIE CHART */}
<svg id="pie" viewBox="0 0 32 32" >
<circle className = "circle" r="16" cx="16" cy="16" />
</svg>

{/* OVERLAY clock hand, clock lines, girl, etc on top of the pie chart */}
<svg id="clockStuff" width="270" height="340" viewBox="0 0 270 340" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Center Dot" d="M134.922 189.561C139.115 189.561 142.513 186.128 142.513 181.893C142.513 177.659 139.115 174.226 134.922 174.226C130.729 174.226 127.33 177.659 127.33 181.893C127.33 186.128 130.729 189.561 134.922 189.561Z" fill="black"/>
<path id="Top Clock Line" d="M136.563 127.184H133.28V133.401H136.563V127.184Z" fill="black"/>
<path id="Bottom Clock Line" d="M136.563 230.387H133.28V236.604H136.563V230.387Z" fill="black"/>
<path id="Left Clock Line" d="M86.9103 183.552V180.236H80.755V183.552H86.9103Z" fill="black"/>
<path id="Right Clock Line" d="M189.089 183.552V180.236H182.933V183.552H189.089Z" fill="black"/>
<path className="ClockHand" id="ClockHand" d="M138.898 180.977L131.84 181.169L134.827 141L138.898 180.977Z" fill="black"/>
<path id="Left Hand" d="M169.699 192.773L168.673 194.224C168.673 194.224 163.955 199.819 163.749 197.125C163.544 194.431 167.237 192.566 167.237 192.566L169.289 191.323L169.699 192.773Z" fill="#FFB8B8"/>
<path id="Right Hand" d="M198.906 197.668L199.764 199.225C199.764 199.225 202.752 205.927 200.253 204.962C197.755 203.996 197.666 199.827 197.666 199.827L197.432 197.421L198.906 197.668Z" fill="#FFB8B8"/>
<path id="Hair" d="M194.287 170.054C197.737 170.054 200.534 167.228 200.534 163.743C200.534 160.258 197.737 157.433 194.287 157.433C190.836 157.433 188.039 160.258 188.039 163.743C188.039 167.228 190.836 170.054 194.287 170.054Z" fill="#774C05"/>
<path id="Right Leg" d="M193.705 215.569L194.526 220.957V222.615H199.245V220.543C199.245 220.543 199.45 216.813 198.629 215.776C197.809 214.74 193.705 215.569 193.705 215.569Z" fill="#FFB8B8"/>
<path id="Left Leg" d="M185.293 215.569L186.114 220.957V222.615H190.833V220.543C190.833 220.543 191.038 216.813 190.217 215.776C189.397 214.74 185.293 215.569 185.293 215.569Z" fill="#FFB8B8"/>
<path id="Right Arm" d="M188.468 172.289C188.468 172.289 186.653 173.255 187.893 175.453C189.133 177.651 196.407 200.39 196.407 200.39L200.603 199.187L196.902 184.806L194.783 175.767L188.468 172.289Z" fill="#FE5F55"/>
<path id="Face" d="M193.603 170.289C196.209 170.289 198.322 168.154 198.322 165.522C198.322 162.89 196.209 160.756 193.603 160.756C190.996 160.756 188.883 162.89 188.883 165.522C188.883 168.154 190.996 170.289 193.603 170.289Z" fill="#FFB8B8"/>
<path id="Neck" d="M195.757 166.247L195.141 175.987L190.833 172.879C190.833 172.879 192.269 167.076 191.859 166.662L195.757 166.247Z" fill="#FFB8B8"/>
<path id="Shirt" d="M195.757 175.158L191.115 171.687C191.115 171.687 188.986 170.806 188.37 171.843C187.755 172.879 184.677 188.214 186.319 191.115C186.319 191.115 195.141 192.981 196.988 191.944L197.809 186.556C197.809 186.556 198.835 183.241 197.193 181.168L195.757 175.158Z" fill="#FE5F55"/>
<path id="Left Arm" d="M189.602 172.05C189.602 172.05 187.96 170.806 186.524 172.879C185.088 174.951 167.853 191.323 167.853 191.323L170.725 194.639L182.01 185.106L189.191 179.303L189.602 172.05Z" fill="#FE5F55"/>
<path id="Skirt" d="M197.091 191.841C197.091 191.841 186.934 189.872 185.908 191.323L185.703 193.602C185.703 193.602 183.446 197.954 184.677 205C185.908 212.046 185.088 216.398 185.088 216.398C185.088 216.398 190.628 215.776 194.731 216.398C198.835 217.02 199.45 216.398 199.45 216.398L197.091 191.841Z" fill="#2F2E41"/>
<path id="Right Sock" d="M199.655 221.786L193.705 221.994L195.757 237.536C195.757 237.536 194.115 244.168 195.962 244.582C197.246 244.844 198.551 244.982 199.86 244.996C199.86 244.996 201.707 246.862 203.759 246.655C205.122 246.479 206.442 246.058 207.657 245.411C207.657 245.411 208.067 244.168 206.631 243.753C205.195 243.339 201.297 242.095 200.476 237.743L199.655 221.786Z" fill="#2F2E41"/>
<path id="Left Sock" d="M191.243 221.786L185.293 221.994L187.345 237.536C187.345 237.536 185.703 244.168 187.55 244.582C188.833 244.844 190.139 244.982 191.448 244.996C191.448 244.996 193.295 246.862 195.346 246.655C196.709 246.479 198.03 246.058 199.245 245.411C199.245 245.411 199.655 244.168 198.219 243.753C196.783 243.339 192.884 242.095 192.064 237.743L191.243 221.786Z" fill="#2F2E41"/>
<path id="PonyTail" d="M196.472 159.713C197.9 159.713 199.057 158.544 199.057 157.102C199.057 155.66 197.9 154.491 196.472 154.491C195.044 154.491 193.887 155.66 193.887 157.102C193.887 158.544 195.044 159.713 196.472 159.713Z" fill="#774C05"/>
<path id="Hair Wisp" d="M199.919 155.688C199.919 155.042 199.682 154.42 199.255 153.94C198.827 153.46 198.239 153.158 197.603 153.091C197.692 153.081 197.783 153.077 197.872 153.076C198.558 153.076 199.215 153.352 199.7 153.841C200.185 154.331 200.458 154.995 200.458 155.688C200.458 156.38 200.185 157.044 199.7 157.534C199.215 158.024 198.558 158.299 197.872 158.299C197.783 158.299 197.692 158.294 197.603 158.285C198.239 158.217 198.827 157.915 199.255 157.435C199.682 156.956 199.919 156.333 199.919 155.688Z" fill="#774C05"/>
<path id="Bangs" d="M193.56 165.017C195.94 165.017 197.869 163.848 197.869 162.405C197.869 160.963 195.94 159.794 193.56 159.794C191.18 159.794 189.251 160.963 189.251 162.405C189.251 163.848 191.18 165.017 193.56 165.017Z" fill="#774C05"/>

</svg>

</div>

        {/* SESSION SECTION */}
        <div id="session" className="animate__animated animate__jackInTheBox">


          {/* SESSION */}
          <p className="sessionTitle"><b>{this.state.sessionTitle}</b></p>
          <p className="minsSecs">MINS &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;SECS</p>
          <p id="sessionTime">{this.state.sessionMin}:{this.state.sessionSec}</p>


          {/* PLAY/PAUSE BUTTON */}
          <button id="playBtn" type="button" onClick={this.handlePlay} >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-pause-fill" viewBox="0 0 16 16">
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
            </svg></button>


          {/* RESTART BUTTON */}
          <button id="restartBtn" type="button" onClick={this.handleReset} ><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
          </svg>
          </button>

          {/* STOP AUDIO BUTTON */}
          <button id="stopAudioBtn" type="button" onClick={this.handleStopAudio} >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-bell-slash-fill" viewBox="0 0 16 16">
  <path d="M5.164 14H15c-1.5-1-2-5.902-2-7 0-.264-.02-.523-.06-.776L5.164 14zm6.288-10.617A4.988 4.988 0 0 0 8.995 2.1a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 7c0 .898-.335 4.342-1.278 6.113l9.73-9.73zM10 15a2 2 0 1 1-4 0h4zm-9.375.625a.53.53 0 0 0 .75.75l14.75-14.75a.53.53 0 0 0-.75-.75L.625 15.625z"/>
</svg>
          </button>

          <p id="creator">Created by Jenny H</p>
        </div>


        {/* SETTINGS SECTION */}
        <div id="container2" className="animate__animated animate__jackInTheBox">



{/* SETTINGS BUTTON */}

          <Button onClick={this.handleClick}
					aria-controls="settings"
					aria-expanded={this.state.open}
          className="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
          </Button>

<Fade in={this.state.open}>
          <div id="settings">
          <div id="settingsArea">
   
   {/* SESSION LENGTH */}
          <div id="sessionLength">
            <p className="sectionTitle"><b>SESSION LENGTH</b></p>
            <p className="minsSecsSettings">MINS</p>
            <p className="numberText">{this.state.sessionMinSet}</p>
            {/* DECREASE BUTTON */}
            <button onClick={this.handleSessionDec}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg></button>
            {/* INCREASE BUTTON */}
            <button onClick={this.handleSessionInc}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg></button>
          </div>

{/* SESSION BREAK */}
          <div id="breakLength">
            <p className="sectionTitle"><b>BREAK LENGTH</b></p>
            <p className="mins">MINS</p>
            <p className="numberText">{this.state.breakSet}</p>
            {/* DECREASE BUTTON */}
            <button onClick={this.handleBreakDec}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg></button>
            {/* INCREASE BUTTON */}
            <button onClick={this.handleBreakInc}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg></button>
          </div>

{/* SESSION AUDIO */}
          <div id="selectAudio">
            <p className="sectionTitle"><b>ALARM AUDIO</b></p>
            <p className="audioText"><b>{this.state.audio}</b></p>

            {/* DECREASE BUTTON */}
            <button onClick={this.handleAudioDec}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg> 
            </button>
            {/* INCREASE BUTTON */}
            <button onClick={this.handleAudioInc}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg></button>
<br/>
            {/* SOUND DECREASE ICON */}
            <svg id="soundDec" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-volume-down-fill" viewBox="0 0 16 16">
  <path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4zm3.025 4a4.486 4.486 0 0 1-1.318 3.182L10 10.475A3.489 3.489 0 0 0 11.025 8 3.49 3.49 0 0 0 10 5.525l.707-.707A4.486 4.486 0 0 1 12.025 8z"/>
</svg>
            {/* SLIDER */}
            <Slider id="slider" onChange={this.handleVolume} defaultValue={this.state.startVolume} aria-label="Default" valueLabelDisplay="auto" />
            
            {/* SOUND INCREASE ICON */}
            <svg id="soundInc" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
  <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
  <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
</svg>
          </div>

{/* SESSION REPEAT OPTION */}
<div id="repeat">
            <p className="sectionTitle"><b> AUTO CYCLE</b></p>
            <p className="audioText"><b>{this.state.cycleChoice}</b></p>

            {/* DECREASE BUTTON */}
            <button onClick={this.handleCycleDec}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg> 
            </button>
            {/* INCREASE BUTTON */}
            <button onClick={this.handleCycleInc}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg></button>
          </div>

{/* APPLY BUTTON */}
          <button id="apply" onClick={this.handleApply} type="button">APPLY</button> 
{/* DEFAULT BUTTON */}
          <button id="default" onClick={this.handleDefault} type="button">DEFAULT</button>

</div>
</div>
</Fade>



        </div>


      </div>


    </div>


    );
  }
};


export default Pomodoro;







/* CODE FOR SETTING SESSION LENGTH IN MIN:SEC FORMAT AND CAN CHANGE BY 30SEC INCREMENTS */

/*------------------------------------------------- */
  /* HANDLING INCREASE/DECREASE SESSION TIME BUTTON */
/*------------------------------------------------- */

/*


handleSessionInc(){
  if (this.state.sessionSecSet === '00')
  {this.setState({sessionSecSet: '30'})
}
  
  else {this.setState({sessionMinSet: (parseInt(this.state.sessionMinSet, 10) + 1).toString()})
this.setState({sessionSecSet: '00'})
}
  }


handleSessionDec(){
    if (
    (parseInt(this.state.sessionMinSet, 10) > 0) 
    && 
    (this.state.sessionSecSet=== '00')
    )
    {this.setState({sessionMinSet: (parseInt(this.state.sessionMinSet, 10) - 1).toString()})
    this.setState({sessionSecSet: '30'})
      }
      
    else if (
      (parseInt(this.state.sessionMinSet, 10) > 0) 
    && 
    (this.state.sessionSecSet === '30')
    )
    {
      this.setState({sessionSecSet: '00'})
    }

    else if (parseInt(this.state.sessionMinSet, 10) === 0
    &&
    this.state.sessionSecSet === '30')
    {
      this.setState({sessionSecSet: '00'})
    }

    }



*/
