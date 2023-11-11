var timeEl = document.querySelector("#time")
var time = questions.length * 10
var timerId
var index = 0 

function timerStart() {
    if (!timerId) {
        timerId = setInterval(function() {
            timeEl.textContent = time;
            time--;

            if (time < 0) {
                clearInterval(timerId);
            }
        }, 1000);
    }
}

document.getElementById("start").addEventListener("click", function(){
    document.getElementById("welcoming-screen").style.display = "none"
    document.getElementById("questions").style.display = "block"
    displayQuestion()
    timerStart()
})

function displayQuestion() {
var currentQuestion = questions[index]
document.getElementById("question-promt").innerText = currentQuestion.prompt
document.getElementById("selections").innerHTML = ""

for (var i = 0; i < currentQuestion.selections.length; i++) {
    var button = document.createElement("button")
    button.innerText = currentQuestion.selections[i]
    button.addEventListener("click", checkAnswer )
    document.getElementById("selections").appendChild(button)
}
}

function checkAnswer(event) {
var choice = event.target.innerText
var correct = questions[index].answer
if (choice !== correct) {
    time -= 10;

    if (time < 0) {
        time = 0;
    }
}


index++
if (index >= questions.length) {
    clearInterval(timerId)
    document.getElementById("questions").style.display = "none"
    document.getElementById("ending-screen").style.display = "block"
    document.getElementById("final-score").textContent = time
    return
}
displayQuestion()
}

function saveHighscore() {
    var initials = document.getElementById("initials").value
    var highscores = JSON.parse(localStorage.getItem("scores"))||[]
    var score = {
        initials,
        time: time,
    };
    
    highscores.push(score)
    localStorage.setItem("scores", JSON.stringify(highscores))
    
    var highscoresList = document.getElementById("highscores-list");
    highscoresList.innerHTML = "";

    highscores.forEach(function(score) {
        var listItem = document.createElement("li");
        
        var initialsSpan = document.createElement("span");
        initialsSpan.textContent = score.initials;
        
        var timeSpan = document.createElement("span");
        timeSpan.textContent = score.time;
        
        listItem.appendChild(initialsSpan);
        listItem.appendChild(document.createTextNode(": "));
        listItem.appendChild(timeSpan)
        
        highscoresList.appendChild(listItem);
    });
}



document.getElementById("submit").addEventListener("click", function() {
    saveHighscore();
    window.location.replace("scores.html");
})
