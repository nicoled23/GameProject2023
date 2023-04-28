var interval;
var started = false;
var time = 0;

var arrayOfClicks = [];
var words = ['brazil.jpg', 'colombia.jpg', 'france.jpg', 'italy.jpg',
'netherlands.jpg', 'usa.jpg', 'UK.jpg', 'rusia.jpg',
'brazil.jpg', 'italy.jpg', 'france.jpg', 'netherlands.jpg',
'rusia.jpg', 'colombia.jpg', 'usa.jpg', 'UK.jpg',

];


 var arrayOfClicks = [];

 var ready = false;
 var numCompleted = 0;
 


 function start() {
    ready=true;
    shuffle();
    wordsSetUp();
    startTimer();
}
function startTimer() {
    if (started == false) {
        interval = setInterval(function () {
            time++;
            var myTime = document.querySelector("#timer");
            myTime.innerHTML = "Time Elapsed: " + time;
        }, 1000)
        started = true;
    }
}
function hide(cell) {
    cell.style.backgroundColor = "#c7c7ec";
    cell.innerHTML = "";
    cell.clicked = false;
}
function complete(cell) {
    numCompleted++;
    cell.completed = true;
    cell.style.backgroundColor = "lavander";
}

function restart() {
    location.reload();
}


function shuffle() {
    var currentIndex = words.length,
        temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.

        temporaryValue = words[currentIndex];
        words[currentIndex] = words[randomIndex];
        words[randomIndex] = temporaryValue;
    }
}
function release(cell) {
    cell.style.backgroundColor = "#c7c7ec";
    cell.innerHTML = '<img src=Images/' + cell.value + ' style: width=100%>';
    cell.clicked = true;
}


function wordsSetUp() {
    shuffle(words);
    var cells = document.querySelectorAll("td");
    for (var i = 0; i < cells.length; i++) {

        var cell = cells[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = words[i];

        cell.addEventListener("mouseenter", function () {
            if (this.completed == false && this.clicked == false)
                this.style.background = "palevioletred";
        });
        cell.addEventListener("mouseleave", function () {
            if (this.completed == false && this.clicked == false)
                this.style.background = "lavander";
        });
        cell.addEventListener('click', function () {
            if (ready == false)
                return;
            startTimer();
            if (this.clicked == false && this.completed == false) {
                arrayOfClicks.push(this);
                release(this);
            }


if (arrayOfClicks.length == 2) {
    if (arrayOfClicks[0].value == arrayOfClicks[1].value) { //if the match found
        complete(arrayOfClicks[0]);
        complete(arrayOfClicks[1]);
        arrayOfClicks = [];//reset
        if (numCompleted == 16) { //4x4 matrix has 16 elements, game over
            alert("You won in " + time + " seconds!");
            clearInterval(interval);
        }
    }
    else { //if the match is not found
        ready = false;
        var table = document.querySelector("#matrix");
        table.style.border = "5px dashed red";

        setTimeout(function () {
            //after a 500ms delay
            hide(arrayOfClicks[0]);
            hide(arrayOfClicks[1]);
            arrayOfClicks = [];
            ready = true;
            var table = document.querySelector("#matrix");
            table.style.border = "5px solid black ";
        }, 500);
    }
}
});
}
}

