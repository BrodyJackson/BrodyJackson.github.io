'use strict'

const greatAtBox = document.getElementById('greatAt');
const messageOne = document.getElementById('paraOne');
greatAtBox.addEventListener("click", function(){

  const skillPictures = document.getElementsByClassName("skillImages");

  if (greatAtBox.classList.contains('skillsText-shrink')){
    greatAtBox.classList.remove("skillsText-shrink");
    document.getElementById("minusPic1").src = "images/minus.svg"

    for(let i = 0; i < skillPictures.length; i++){
      if(skillPictures[i].classList.contains("skillImages-dissapear"))
      {
        skillPictures[i].classList.remove("skillImages-dissapear");
      }
    }
    messageOne.classList.remove("workedWith-message-dissapear");
  }
  else{
    greatAtBox.classList.add("skillsText-shrink");
    for(let i = 0; i < skillPictures.length; i++){
      skillPictures[i].classList.add("skillImages-dissapear");
    }
    document.getElementById("minusPic1").src = "images/plus.svg";
    messageOne.classList.add("workedWith-message-dissapear");
  }
});
