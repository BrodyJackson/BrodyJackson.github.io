


let currentString = "0"; 
let resetFlag = false;
let firstZeroClicked = false; 

$(document).ready(update(currentString)); 

//https://marcbruederlin.github.io/particles.js/
//above links is documentation for background package I used
$(document).ready(function(){
    Particles.init({
        selector: '.background', 
        connectParticles: true,
        color: "#FFFFFF", 
        sizeVariations: 2
    }); 
}); 

//function which does all the calculation. Handler for button clicks which manipulates global variables
$(".button").on("click", function (e){
    let test = $(this).text().trim(); 
    console.log(test); 
    console.log(typeof test); 
    if(test == "X"){
        test = "*"; 
    }
    //if user wants to backspace
    if(test == "CE"){

        if(resetFlag == true){
            currentString = "0";
            resetFlag = false;  
        }
        
        if(!currentString == "0"){
            currentString = currentString.slice(0,-1);
            if(currentString == ""){
                currentString = "0"; 
            }
        }
         
        update(currentString); 
    }
    //if calcaulation finished then evaluate
    else if(test == "="){
        try{
            currentString = eval(currentString);
            resetFlag= true; 
        }
        catch(error){
            currentString = "ERROR";
            resetFlag= true; 
        }
        
        console.log(typeof currentString);  
    }
    //Otherwise add the button value entered into the view
    else{
        if (currentString == "0"){
            currentString = test;
            if(test == "0"){
                firstZeroClicked = true;
            } 
            if((test == ".")&&(firstZeroClicked == true)){
                currentString = "0.";
                firstZeroClicked = false; 
            }
        }
        else{ 
            currentString += test;     
        }
        
    }
    //update the view
    update(currentString)
})

//function which updates the text field with the current string
function update(string){
    $(".infoScreen").text(string); 
}