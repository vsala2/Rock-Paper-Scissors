//we are writing the score variable outside of the function becuase we need to keep take of pass or previous score as well
        //writing in a object becuase all these values are related to each other.
        // const score = {
        //     wins: 0,
        //     losses: 0,
        //     ties: 0
        // };

let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0, 
    losses: 0,
    ties: 0
    };

updateScoreElement();

let isAutoPlaying = false; 
//setInterval returns a number to stop the autoplay. Always the id is different thats y we are initialling it outside
let intervalId;

function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(() =>{
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
    playGame('paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
    playGame('scissors');
    });

document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
    });

//keydown anywhere on the page, if user type r playgame with rock etc.
document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'r'){
        playGame('rock');
    } else if(event.key === 'p'){
        playGame('paper');
    } else if(event.key === 's'){
        playGame('scissors');
    }
}) 
function playGame(playerMove){
    const computerMove = pickComputerMove();

    let result = '';

    if(playerMove === 'scissors'){
        if(computerMove === 'rock'){
            result = 'You Lose';
        }else if(computerMove === 'paper'){
            result = 'You Win';
        }else if(computerMove === 'scissors'){
            result = 'Tie';
        }

    } else if(playerMove === 'paper'){
        if(computerMove === 'rock'){
            result = 'You Win';
        }else if(computerMove === 'paper'){
            result = 'Tie';
        }else if(computerMove === 'scissors'){
            result = 'You Lose';
        }
        
    } else if(playerMove === 'rock'){
        if(computerMove === 'rock'){
            result = 'Tie';
        }else if(computerMove === 'paper'){
            result = 'You Lose';
        }else if(computerMove === 'scissors'){
            result = 'You Win';
        }
    }

    if(result === 'You Win'){
        score.wins++;
    }
    else if(result === 'You Lose'){
        score.losses++;
    }else if(result === 'Tie'){
        score.ties++;
    }

    localStorage.setItem("score", JSON.stringify(score));

    document.querySelector('.js-result').innerHTML =  `${result}`;

    document.querySelector('.js-moves').innerHTML
        = `
        You
    <img src="images/${playerMove}-emoji.png" alt="${playerMove}" class="move-icon"/>
    <img src="images/${computerMove}-emoji.png" alt="${computerMove}" class="move-icon"/>
    Computer`;

    updateScoreElement();

//             alert(`Your picked ${playerMove}, computer picked ${computerMove}. ${result}.
// Win: ${score.wins}, Lose: ${score.losses}, Tie: ${score.ties}`);
}

function updateScoreElement(){
    document.querySelector('.js-score')
        .innerHTML = `Win: ${score.wins}, Lose: ${score.losses}, Tie: ${score.ties}`;

}

function pickComputerMove(){
    const value3 = Math.random();

    let computerMove = '';

    if(value3>=0 && value3< 1/3){
        computerMove = 'rock';
    }else if(value3 >= 1/3 && value3 < 2/3){
        computerMove = 'paper';
    }else if(value3 >= 2/3 && value3 < 1){
        computerMove = 'scissors';
    }

    return computerMove;

}