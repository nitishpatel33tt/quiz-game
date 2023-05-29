let ques = document.getElementById('ques');
let opt1 = document.getElementById('opt1')
let opt2 = document.getElementById('opt2')
let opt3 = document.getElementById('opt3')
let opt4 = document.getElementById('opt4')
let options = document.querySelector('.quizopt');
let checkans = document.getElementById('checkAns')
let restart = document.getElementById('restart')
let noselected = document.getElementById('noselected');
let playerscore =  document.getElementById('score')



let correctAnswer,incorrectAnswer,optionsList , remainingQuestion = 10 , score = 0 , i=1 ,selectedcss;

//new question and update on ui 
async function newques() {
    let result = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple');
    let datas = await result.json();
    let data = datas.results[0];

   correctAnswer = data.correct_answer;
   incorrectAnswer = data.incorrect_answers;
   optionsList = incorrectAnswer;
   optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);

  ques.innerText = `${i}. ${data.question} `;
  opt1.innerText =optionsList[0];
  opt2.innerText =optionsList[1];
  opt3.innerText =optionsList[2];
  opt4.innerText =optionsList[3];
   checkans.disabled = false;
   noselected.style.display="none";
  optionselection();
}

function optionselection(){
    options.querySelectorAll('li').forEach((option) =>{
          option.addEventListener('click', () => {
              if(options.querySelector('.selected')){
                  const activeOption = options.querySelector('.selected');
                  activeOption.classList.remove('selected');
              }
              option.classList.add('selected');
              
          });
      });
}



function start(){
    newques();
}



//click on check answer (answer checking)
checkans.addEventListener("click", ()=>{
    checkans.disabled = true;
   
    if(options.querySelector('.selected')){
        let selectedsoption = (options.querySelector('.selected span')).textContent
         selectedcss = (options.querySelector('.selected'));
        if(selectedsoption==correctAnswer){
        score++;
        selectedcss.classList.remove("selected");
        selectedcss.classList.add("correctcss");
        checkans.disabled = false;
        setTimeout(()=>{
            selectedcss.classList.remove("correctcss");
        },250)
         }

        else {
            selectedcss.classList.remove("selected");
            selectedcss.classList.add("incorrectcss");
            checkans.disabled = false;
            console.log(correctAnswer);
            console.log(selectedsoption);
            setTimeout(()=>{
                selectedcss.classList.remove("incorrectcss");
            },250)
         }
        
        check();
        }
       
        else {
         
            noselected.innerText ="Please Select an option!"
            noselected.style.display="flex";
            noselected.classList.add("incorrectcss");
            setTimeout(()=>{
                noselected.style.display="none";
            },500)
            checkans.disabled = false;

        }
    
});


//restart game
restart.addEventListener("click",()=>{
    checkans.style.display = "flex ";
    restart.innerText = "Restart "
    playerscore.innerText ="";
    newques();
    score = 0 ;
    i = 1;
});


function check(){
   
    if(remainingQuestion == i){

        playerscore.innerText = `Your score : ${score}`
        checkans.style.display = "none";
        restart.innerText = "start a new game "
        playerscore.classList.add("correctcss");


    }
    else {
        newques();
        i++;

    }
}





    


