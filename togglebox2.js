'use strict'

const interested = document.getElementById('interested');
const messageTwo = document.getElementById('paraTwo');
interested.addEventListener("click", function(){

  const skillPictures = document.getElementsByClassName("skillImages2");

  if (interested.classList.contains('skillsText-shrink')){
    interested.classList.remove("skillsText-shrink");
    document.getElementById("minusPic2").src = "images/minus.svg"

    for(let i = 0; i < skillPictures.length; i++){
      if(skillPictures[i].classList.contains("skillImages-dissapear"))
      {
        skillPictures[i].classList.remove("skillImages-dissapear");
      }
    }
    messageTwo.classList.remove("workedWith-message-dissapear");
  }
  else{
    interested.classList.add("skillsText-shrink");
    for(let i = 0; i < skillPictures.length; i++){
      skillPictures[i].classList.add("skillImages-dissapear");
    }
    document.getElementById("minusPic2").src = "images/plus.svg";
    messageTwo.classList.add("workedWith-message-dissapear");
  }
});
