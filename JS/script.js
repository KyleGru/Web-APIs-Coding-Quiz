//Variables for the timer.
var timeEl = document.querySelector("#time");
var time = questions.length * 10;
var timerId;

//Variable for the index of questions to begin.
var index = 0; 

//Function to start a timer for the quiz when the user clicks start.
function timerStart() {
    if (!timerId) {
        timerId = setInterval(function() {
            timeEl.textContent = time;
            time--;

            if (time < 0) {
                clearInterval(timerId);

                endQuiz();
            }
        }, 1000);
    }
}

//This function sends the user to the ending screen when the timer reaches 0 and returns a score of "out of time."
function endQuiz() {
    document.getElementById("questions").style.display = "none";
    document.getElementById("ending-screen").style.display = "block";
    document.getElementById("final-score").textContent = "Out of Time!";
}

//This tells the welcome screen to disapper when the start button is clicked and for the questions to appear.
document.getElementById("start").addEventListener("click", function(){
    document.getElementById("welcoming-screen").style.display = "none";
    document.getElementById("questions").style.display = "block";
    displayQuestion();
    timerStart();
})

//This function calls for the questions to display and for the quiz to begin.
function displayQuestion() {
var currentQuestion = questions[index];
document.getElementById("question-promt").innerText = currentQuestion.prompt;
document.getElementById("selections").innerHTML = "";

for (var i = 0; i < currentQuestion.selections.length; i++) {
    var button = document.createElement("button");
    button.innerText = currentQuestion.selections[i];
    button.addEventListener("click", checkAnswer);
    document.getElementById("selections").appendChild(button);
}
}

//The check answer function decides if the selection that the user clicks is correct or incorrect. 
//It also deducts 10 seconds from the timer for an incorrect selection.
function checkAnswer(event) {
var choice = event.target.innerText;
var correct = questions[index].answer;
var alertEl = document.getElementById("alert-message");
if (choice == correct) {
    alertEl.textContent = "Correct!";
} else {
    alertEl.textContent = "Incorrect!";    
    time -= 10;

    if (time < 0) {
        time = 0;
    }
}

//This sends the user to the ending screen where they can enter their initials and submit their score.
index++
if (index >= questions.length) {
    clearInterval(timerId);
    document.getElementById("questions").style.display = "none";
    document.getElementById("ending-screen").style.display = "block";
    document.getElementById("final-score").textContent = time;
    return
}
displayQuestion();
}

//This function takes gives the user the capability to save their score. 
function saveHighscore() {
    var initials = document.getElementById("initials").value;
    
    //This will take the score data and change it from a string into an object.
    var highscores = JSON.parse(localStorage.getItem("scores"))||[];
    var score = {
        initials,
        time: time,
    };
    
    highscores.push(score);
   
    //Turns the score data that was turned into an object back into a string in order for it to be displayed properly to the scores.html file.
    localStorage.setItem("scores", JSON.stringify(highscores));
    
    var highscoresList = document.getElementById("highscores-list");
    highscoresList.innerHTML = "";
    
    //This function displays the score on the scores.html file in a readable format
    highscores.forEach(function(score) {
        var listItem = document.createElement("li");
        
        var initialsSpan = document.createElement("span");
        initialsSpan.textContent = score.initials;
        
        var timeSpan = document.createElement("span");
        timeSpan.textContent = score.time;
        
        listItem.appendChild(initialsSpan);
        listItem.appendChild(document.createTextNode(": "));
        listItem.appendChild(timeSpan);
        
        highscoresList.appendChild(listItem);
    });
}
//Allows the user to press the enter key to submit their score and sends them to the scores.html upon pressing it.
document.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        document.getElementById("submit").click();
    }
})


//allows the user to click the submit button to submit their score and sends them to the scores.html upon clicking it.
document.getElementById("submit").addEventListener("click", function() {
    saveHighscore();
    window.location.replace("scores.html");
})

