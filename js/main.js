const title = document.querySelector(".head__title");
const theme = document.querySelector(".theme");

const startQuizBtn = document.querySelector(".start__quiz"); // start Button
const quizRulesDiv = document.querySelector(".quiz__rules"); // show quiz rules
const exitQuizBtn = document.querySelector(".exit__quiz");  // exit Button
const continueQuizBtn = document.querySelector(".continue__quiz"); // continue Button
const quizcontainerDiv = document.querySelector(".quiz__container-box"); // show quiz 

const timerContainer = document.querySelector(".timer")
const timeLeft = document.querySelector(".time_left"); // time Left [div]
const timerCounter = document.querySelector(".timer_counter"); // time counter
const progress = document.querySelector(".progress") // progress


const optionList = document.querySelector(".option_list"); // opt

const quizFooter = document.querySelector(".numOfQuestion") // number of questions
const nextQuestionBtn = document.querySelector(".next_question"); // next question button

const resultContainer = document.querySelector(".result__container")  // result box
const comment = document.querySelector(".comment");  // comment


const replayQuiz = document.querySelector(".replay_quiz");  // replay quiz
const quitQuiz = document.querySelector(".quit_quiz");  // quit quiz







// Start Button
startQuizBtn.addEventListener("click", () => {

    quizRulesDiv.classList.add('active'); // show quiz rules box
    startQuizBtn.classList.add('active'); // hide start button
    title.classList.add('active');
    theme.classList.add('active');

})

// Exit Button
exitQuizBtn.addEventListener("click", () => {
    startQuizBtn.classList.remove('active') // show start Buttion
    quizRulesDiv.classList.remove('active'); // hide quiz rules box
    title.classList.remove('active');
    theme.classList.remove('active');

})

// Continue Button
continueQuizBtn.addEventListener("click", () => {

    quizcontainerDiv.classList.add('active'); // show quiz box
    quizRulesDiv.classList.remove('active'); // hide quiz rules box
    startQuizBtn.classList.add('active'); // hide start button
    resultContainer.classList.remove('active') // hide result box

    startTimer(15);  // callback function --> start time
    startProgress(0); // callback function --> start progress
    showQuestion(0); // callback function --> show the question
    questionCounter(1); // callback function --> question counter
})





let counter = 0;          // initial counter value
let progressLine = 0 ;    // initial progress value
let counterValue = 15;   // set the couter value 
let progressValue = 0;   // set the progress value
let que_num = 0;         // initial question number
let que_count = 1;      // initial question counter
let score = 0;           // initial score value





// NEXT QUESTION BUTTON
nextQuestionBtn.addEventListener("click", () => {
    if (que_num < quizData.length - 1) {
        que_num++;
        que_count++;
        showQuestion(que_num);
        questionCounter(que_count)
        clearInterval(counter);
        clearInterval(progressLine);
        startTimer(counterValue)
        startProgress(progressValue)
        timeLeft.innerHTML = "Time Left";
        nextQuestionBtn.classList.remove('active')
    }else{
        clearInterval(counter);
        clearInterval(progressLine);
        showResult();
    }
})



// SHOW THE [QUESTION] AND [OPTION] FUNCTION
function showQuestion(index) {
    const question = document.querySelector(".question"); // question


    question.innerHTML = `<span>${quizData[index].id}.</span> <span>${quizData[index].question}</span>`;

    optionList.innerHTML = `
    
    <div class="option">${quizData[index].option[0]}</div>
    <div class="option">${quizData[index].option[1]}</div>
    <div class="option">${quizData[index].option[2]}</div>
    <div class="option">${quizData[index].option[3]}</div>
    
    `;

    const option = optionList.querySelectorAll(".option");


    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)")
        
    }

    timerContainer.classList.remove('active');

}



// OPTION [ACTION] FUNCTION
function optionSelected(answer) {

    clearInterval(counter);
    clearInterval(progressLine);


    const userAns = answer.textContent;
    const correctAns = quizData[que_num].answer;
    const allOption = optionList.children.length;



    if (userAns == correctAns) {
        score += 1;
        answer.classList.add('correct');
    }else{
        answer.classList.add('incorrect');

        for (let i = 0; i < allOption; i++) {
            if (optionList.children[i].textContent == correctAns) {
                optionList.children[i].setAttribute("class","option correct")
            }
        }

    }

    for (let i = 0; i < allOption; i++) {
        optionList.children[i].classList.add('disabled');
    }


    nextQuestionBtn.classList.add('active')

}



// START THE TIMER FUNCTION
function startTimer(time) {

    counter = setInterval(timer, 1000);

    function timer(){

        timerCounter.textContent = time;
        time--;

        if (time < 9) {
            let addZero = timerCounter.textContent;
            timerCounter.textContent = "0" + addZero;
        }

        if (time < 0) {
            clearInterval(counter);
            timeLeft.textContent = "Time Off";

            timerContainer.classList.add('active');

            let correctAns = quizData[que_num].answer;
            const allOption = optionList.children.length;

            for (let i = 0; i < allOption; i++) {
                if (optionList.children[i].textContent == correctAns) {
                    optionList.children[i].setAttribute("class","option correct")
                }

            }

            for (let i = 0; i < allOption; i++) {
                optionList.children[i].classList.add('disabled');
            }

            nextQuestionBtn.classList.add('active')
        }
    }
}



// START THE PROGRESS
function startProgress(time) {

    progressLine = setInterval(timer, 34);

    function timer() {

        time += 1;

        progress.style.width = time + 'px';

        
            if (time > 385) {
            clearInterval(progressLine);
        }
           
    }
}






// SHOW THE NUMBER OF QUESTION 
function questionCounter(index){

    quizFooter.innerHTML = ` 
    <div class="numOfQuestion"><strong>${index}</strong> of <strong>${quizData.length}</strong> Question</div>`;
}



// SHOW THE RESULT
function showResult() {
    quizcontainerDiv.classList.remove('active'); // hie quiz
    quizRulesDiv.classList.remove('active'); // hide quiz rules
    startQuizBtn.classList.add('active'); // hide start button
    resultContainer.classList.add('active')


    if (score > 3) {
        comment.innerHTML = `<div>You've completed the Quiz!</div>
        <div>and congrats! 🎉, You got ${score} out of ${quizData.length}</div>`;
    }else if (score > 2) {
        comment.innerHTML = `<div>You've completed the Quiz!</div>
        <div>and nice 😎, You got ${score} out of ${quizData.length}</div>`;
    }else{
        comment.innerHTML = `<div>You've completed the Quiz!</div>
        <div>and sorry 😐, You got ${score} out of ${quizData.length}</div>`;
    }
}



// REPLAY BUTTON
replayQuiz.addEventListener("click", () => {

    quizcontainerDiv.classList.add('active');
    resultContainer.classList.remove('active');


    counterValue = 15;
    progressValue = 0;
    que_num = 0;
    que_count = 1;
    score = 0


    showQuestion(que_num);
    questionCounter(que_count)
    clearInterval(counter);
    clearInterval(progressLine);
    startTimer(counterValue)
    startProgress(progressValue)
    timeLeft.innerHTML = "Time Left";
    nextQuestionBtn.classList.remove('active')

})


// QUIT BUTTON
quitQuiz.addEventListener("click", () => {
    window.location.reload();
})
