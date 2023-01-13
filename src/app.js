import AlienShip from "./space_battle/AlienShip.js";
import USSAssembly from "./space_battle/USSAssembly.js";

const soldier = new USSAssembly
let alienShipArray = [];

let divEl = document.getElementById('uss');
let imgEl = document.createElement('img');
imgEl.src='../assets/images/uss1.gif';
divEl.appendChild(imgEl);

let alienImgDiv = document.getElementById("alien-wrap");
alienImgDiv.innerHTML = '';
for (let i = 0; i < 6; i++) {
    let imageEl=document.createElement('img');  
    imageEl.setAttribute('id', `img${i}`);
    imageEl.classList.add('alienship-img');
    imageEl.src='../assets/images/alienship3.gif';
    alienImgDiv.appendChild(imageEl);
}

function startGame() {
    alert('Welcome to Space Battle Game');
    let userInput = prompt('You want to start the Game? Yes or No?', '');

    if (userInput.toLowerCase() == 'yes') {
        formArmy();
        war();
        // winner();
    }
}

function formArmy() {
    for (let i = 0; i < 6; i++) {
        const alien = new AlienShip();
        alienShipArray.push(alien);
    }
}

function battle() {
    console.log('battle called');
    let alien = alienShipArray[0];
    soldier.attack(alien);
    let lastAttack = 'soldier';
    while (soldier.hull >= 0 || alien.hull >= 0) {
        if (soldier.hull > 0 && alien.hull <= 0) {
            alert('You have defeted the Alien successfully!!');
            let firstImage = alienImgDiv.firstChild;
            firstImage.src = '../assets/images/crashed.gif';
            alienShipArray.shift();
            alienImgDiv.removeChild(alienImgDiv.firstChild);
            console.log(JSON.stringify(alienShipArray));            
            return {winner: 'soldier'};                
        } else if (soldier.hull <= 0 && alien.hull > 0) {
            alert('Alien have defeted You!!');
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
        setTimeout(function(){
            let userPreferance = prompt('You want to continue game? Yes or No ?', '');
            console.log(userPreferance);
            if(userPreferance.toLowerCase() == 'yes') {
                war();
            } else {
                window.location.reload();
            }
        },
        1000);
    }
    winner();
}

function winner() {
    if(alienShipArray.length == 0) {
        alert('You won the battle!! Hurray!!');
    } else if (soldier.hull == 0) {
        alert('Alien won the battle!!');
    }
}

function resetGame() {
    window.location.reload();
    setTimeout(startGame,3000);
}

document.getElementById('start-btn').addEventListener('click',startGame);
document.getElementById('reset-btn').addEventListener('click',resetGame);