var index = 0

document.getElementById("start").addEventListener("click", function(){
    document.getElementById("welcoming-screen").style.display = "none"
    document.getElementById("questions").style.display = "block"
    displayQuestion()
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
    // deduct time here
}
index++
if (index >= questions.length) {
    document.getElementById("questions").style.display = "none"
    document.getElementById("ending-screen").style.display = "block"
    return
}
displayQuestion()
}
document.getElementById("submit").addEventListener("click", function(){
    var initials = document.getElementById("initials").value
    var highscores = JSON.parse(localStorage.getItem("scores"))||[]
    var score = {
        initials
        // put time here
    }
    highscores.push(score)
    localStorage.setItem("scores", JSON.stringify(highscores))
    window.location.replace("scores.html")
})