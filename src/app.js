import AlienShip from "./space_battle/AlienShip.js";
import USSAssembly from "./space_battle/USSAssembly.js";

const soldier = new USSAssembly
let alienShipArray = [];

function startGame() {
    alert('Welcome to Space Battle Game');
    let userInput = prompt('You want to start the Game? Yes or No?', '');

    if (userInput.toLowerCase() == 'yes') {
        formArmy();
        war();
        winner();
    }
}

function formArmy() {
    for (let i = 0; i < 6; i++) {
        const alien = new AlienShip();
        alienShipArray.push(alien);
    }
}

function placeImage() {
    let divEl = document.getElementById('uss');
    let imgEl = document.createElement('img');
    imgEl.src='../assets/images/uss1.gif';
    divEl.appendChild(imgEl);

    let div = document.getElementById("alien-wrap");
    div.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        let imageEl=document.createElement('img');  
        imageEl.setAttribute('id', `img${i}`);
        imageEl.classList.add('alienship-img');
        imageEl.src='../assets/images/alienship2.gif';
        div.appendChild(imageEl);
    }
}

placeImage();


function battle() {
    console.log('battle called');
    let alien = alienShipArray[0];
    soldier.attack(alien);
    let lastAttack = 'soldier';
    while (soldier.hull >= 0 || alien.hull >= 0) {
        if (soldier.hull > 0 && alien.hull <= 0) {
            alert('You have won!!');
            alienShipArray.shift();
            console.log(JSON.stringify(alienShipArray));
            return {winner: 'soldier'};                
        } else if (soldier.hull <= 0 && alien.hull > 0) {
            alert('Alien have won!!');
            return {winner: 'alien'};
        }
        if (lastAttack == 'soldier') {
            alien.attack(soldier);
            lastAttack = 'alien';
        } else {
            soldier.attack(alien);
            lastAttack = 'soldier';
        }
    }
}

function war() {
    console.log('war called');
    if(alienShipArray.length !== 0){
        const result = battle();
        console.log('final result: ' + result.winner);
        let userPreferance = prompt('You want to continue game? Yes or No ?', '');
        console.log(userPreferance);
        if(userPreferance.toLowerCase() == 'yes') {
            war();
        }
    }
}

function winner() {
    if(alienShipArray.length == 0) {
        alert('You won the battle!!');
    } else if (soldier.hull == 0) {
        alert('Alien won the battle!!');
    }
}

function resetGame() {
    setTimeout(startGame,3000);
}

document.getElementById('start-btn').addEventListener('click',startGame);
document.getElementById('reset-btn').addEventListener('click',resetGame);

// setTimeout(startGame,3000);