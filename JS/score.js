function displayHighscores() {
    highscoresList = document.getElementById("highscores-list");
    highscores = JSON.parse(localStorage.getItem("scores"))||[];
    highscores.sort(function(a, b) {
        return a.time - b.time;
    });

    // This function sets up the display of the scores
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
// Option to delete the list of highscores
function deleteHighscores() {
    window.localStorage.removeItem("scores");
    window.location.reload();
}

document.getElementById("delete").onclick = deleteHighscores;
displayHighscores();
