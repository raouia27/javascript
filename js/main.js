
const search = document.getElementById('country');
const matchlist = document.getElementById('match-list');

const searchStates = async searchText => {
    const res = await fetch('../data/countries.json');
    
    const states = await res.json();
    console.log(states);

    //Get matches to current text input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`,'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });

    if(searchText.length === 0){
        matches = [];
        matchlist.innerHTML='';
    }

    outputHtml(matches);
    
};

//show resultes in html
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
        <div class="card card-body mb-1">
        <h4>${match.name} (${match.abbr}) <span class="text-danger">
        ${match.capital}</span></h4>
        <small>Lat: ${match.lat} / Long: ${match.long}</small>
        </div>
        `).join('');

        matchlist.innerHTML = html;
    }
}

search.addEventListener('input',() => searchStates(search.value));
var x = new Date().toLocaleString("en-us",{timeZone:matchlist.capital,timeStyle:'long',hourCycle:'h24'});

console.log(x)

document.getElementById("show").innerHTML = x;


//Alarm

var alarmSound = new Audio();
alarmSound.src='alarm.mp3';
var alarmTimer;
function setAlarm(button){
    var ms =document.getElementById('alarmTime').valueAsNumber;
    if(isNaN(ms)){
        alert('Invalid Date');
        return;

    }
    var alarm = new Date(ms);
    var alarmTime = new Date(alarm.getUTCFullYear,alarm.getUTCMonth(),alarm.getUTCDate(),alarm.getUTCHours(),alarm.getUTCMinutes(),alarm.getUTCMinutes());
    var differenceInMs = alarmTime.getTime() - (new Date()).getTime() ;
    if(differenceInMs < 0 ){
        alert('Specified time is already passed');
        return;
    }
    alarmTimer = setTimeout(initAlarm, differenceInMs);

    button.innerText="cancel Alarm";
    button.setAttribute('onclick','cancelAlarm(this);');

};

function cancelAlarm(button) {
    button.innerText='Set Alarm';
    button.setAttribute('onclick','setAlarm(this);');
    clearTimeout(alarmTimer);

}

function initAlarm() {
    alarmSound.play();
    document.getElementById('alarmOptions').style.display="";

};

function stopAlarm(){
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById('alarmOptions').style.display="none";
    cancelAlarm(document.getElementById('alarmButton'));
};

function snooze() {
    stopAlarm();
    setTimeout(initAlarm, 3600);
}


// miniteur
const startingMinutes = 10;
let time = startingMinutes * 60;

const countdownEl = document.getElementById('countdown');

setInterval(updateCountdown, 1000);
function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes} : ${seconds}`;
    time--;
}