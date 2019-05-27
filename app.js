const app=()=>{
 const sound= document.querySelector(".sound");
 const play= document.querySelector(".play");
 const outline= document.querySelector(".moving-outline circle");
 const Video= document.querySelector('.video-container video');

 const sounds =document.querySelectorAll('.sound-picker button');
 const timeDisplay= document.querySelector('.time-display');
 const timeSelector= document.querySelectorAll('.time-select button');
 const outlinelength= outline.getTotalLength(); 
 let duration =600;
 outline.style.strokeDasharray=outlinelength;
 outline.style.strokeDashoffset=outlinelength;

 sounds.forEach(i=>{
    i .addEventListener('click', function(){
        sound.src=this.getAttribute('data-sound');
        Video.src=this.getAttribute('data-video');
        checkPlay(sound);
    });
 });
  play.addEventListener('click',()=>{
   checkPlay(sound);

  });

  


  timeSelector.forEach(option =>{
    option.addEventListener('click',function(){
        duration=this.getAttribute("data-time");
       
        timeDisplay.textContent =`${Math.floor(duration / 60)} :${Math.floor(duration % 60)}`;
    });
  });

  const checkPlay = sound=>{
      if(sound.paused){
          sound.play();
          Video.play();
          play.src='./svg/pause.svg';
      }
       else{
           sound.pause();
           Video.pause();
           play.src='./svg/play.svg';
       }
  };

  sound.ontimeupdate=()=>{
      let currentTime =sound.currentTime;
      let elapsedtime= duration-currentTime;
      let seconds =Math.floor(elapsedtime % 60);
      let minutes= Math.floor(elapsedtime / 60);

      let progress =outlinelength -(currentTime / duration)* outlinelength;
      outline.style.strokeDashoffset =progress;

      timeDisplay.textContent=`${minutes}:${seconds}`;
      if(currentTime>=duration){
          sound.pause();
          sound.currentTime=0;
          play.src="./svg/play.svg";
          Video.pause();

      }

  };

};

app();
