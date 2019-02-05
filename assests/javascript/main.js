const questions = [
    {question: "What is the Capital of California?", correct:"Sacramento", answers: ["Sacramento","San Diego","San Francisco","Los Angeles"]},
    {question: "What is the Capital of Arizona?", correct:"Pheonix", answers: ["Salt Lake City","Pheonix","Tempe","Scottsdale"]},
    {question: "What is the Capital of Florida?", correct:"Tallahassee", answers: ["Miami","Orlando","Tallahassee","New Orleans"]},
    {question: "What is the Capital of Texas?", correct:"Austin", answers: ["San Antonio","Houston","Dallas","Austin"]},
    {question: "What is the Capital of Wisconsin?", correct:"Madison", answers: ["Madison","La Crosse","Green Bay","Milwaukee"]},
];
var arrayQ = [];
for(x in questions){
    arrayQ.push(questions[x])
}
var timeLeft = 0; 
var clockRunning = false;
var intervalId;
var winCount=0;
var answered = false;

$('#startBut').click(startGame);

function startGame(){
    console.log("Start");
    newQuestion();
    //Reset
    //newQuestion;

}
function newQuestion(){
    if(arrayQ.length === 0){
        finalScreen();
    }
    else{
        var rando = Math.floor(Math.random()*arrayQ.length);
        var newQuestion = arrayQ[rando];
        //post question to box
        clear();        
        $('#question').html(`<h2>${newQuestion.question}</h2>`);
        
        for(i in newQuestion.answers){
            var cur = newQuestion.answers[i];
            $('#answers').append(`<input class="answer" type="radio" value="${cur}" name="inputAnswer"> ${cur}<br>`);
        }
        $('#buttons').html("<button id='ansBut' type='button' class='btn btn-warning'>Submit Answer</button>");
        $('#ansBut').click(()=>{answerHandler(newQuestion.correct)});
        //delete question from arrayQ
        arrayQ.splice(rando,1);
        answered =false;
        //Start Timer
        startTimmer(15);
    }

}
function answerHandler(answer){
    var cAns = "";
    cAns = answer;
    var ansArr = [];
    ansArr = $(".answer");
    for(z in ansArr){
        var here = ansArr[z];
        if(here.checked){
            console.log(here.value, "is checked");
            if(here.value == cAns){
                correct(here.value);     
                           
            } else{
                wrong(cAns);
            }
        }
    }
    ansArr = [];
    // console.log(ansArr);
}
function correct(ans){
    //set time out next Q
    //stopTimer
    stopTimer();
    if(!answered){
        $("#results").append("<h3>You're Right!</h3>");
        $("#results").append(`<h4>${ans} is the the correct!`);
        winCount++;
        answered = true;
        setTimeout(newQuestion, 5000);
    }
}
function wrong(ans){
    //set time out next Q
    //stopTimer
    if(!answered){
        stopTimer();
        $("#results").append("<h3>Sorry, That's Incorrect!</h3>");
        $("#results").append(`<h4>${ans} is the correct answer.`);
        answered = true;
        setTimeout(newQuestion, 5000);
    }
}

function timeUp(){
    //set time out next Q
    //stop
    $("#results").append("<h3>You ran out of time...</h3>");
    setTimeout(newQuestion, 5000);
}
function finalScreen(){
    clear();
    $('#question').html("<h1>ALL DONE</h1>");
    $('#results').html(`<h2>WINS: ${winCount} out of ${questions.length}</h2>`);
    stopTimer();
}
function clear(){
    $('#question').empty();
    $('#buttons').empty();
    $('#answers').empty();
    $('#results').empty();
    $('#timer').empty();
}

function startTimmer(tL) {
    if (!clockRunning) {
        timeLeft = tL;
        intervalId = setInterval(count,1000);
        clockRunning = true;
    }
}
function stopTimer(){
    clearInterval(intervalId);
    clockRunning = false;
    timeLeft = 0;
    $('#timer').empty();
    console.log("Times UP");
}
function count() {
    timeLeft--;
    if(timeLeft < 1){
        stopTimer();
        timeUp();
    } else{
        $('#timer').html(`Seconds Left: ${timeLeft}`);
        console.log(timeLeft);
    }
}