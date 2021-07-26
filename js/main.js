const startQuizBtn = document.querySelector(".start__quiz");
const quizRulesDiv = document.querySelector(".quiz__rules");
const exitQuizBtn = document.querySelector(".exit__quiz");
const continueQuizBtn = document.querySelector(".continue__quiz");


startQuizBtn.addEventListener("click", () => {

    quizRulesDiv.classList.add('active');
    startQuizBtn.classList.add('active');

})

exitQuizBtn.addEventListener("click", () => {

    window.location.reload();

})



