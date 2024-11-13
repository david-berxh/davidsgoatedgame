let currentMoleTile;
let currPlantTile;
let highScore = 0;
let score = 0;
let gameOver = false;
let gameStarted = false;
let lives = 3;
let moleTimeOut; 
let moleInterval;
let plantInterval;

window.onload = function (){
    document.getElementById("startButton").addEventListener("click", startGame);
    document.getElementById("retryButton").addEventListener("click", resetGame);
    document.getElementById("retryButton").style.display = "none";
};

function startGame(){
    if(!gameStarted){
        setGame();
        gameStarted = true;
        document.getElementById("startButton").style.display = "none";
        lives = 3;
        updateLives();
    }
}

function setGame(){
    document.getElementById("board").innerHTML = "";
    for (let i = 0; i < 9; i++){
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile, false);
        tile.addEventListener("touchstart", selectTile, false); // Add touch event
        document.getElementById("board").appendChild(tile);
    }
    moleInterval = setInterval(setMole, 700);
    plantInterval = setInterval(setPlant, 700);
}

function getRandomTile(){
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole(){
    if (gameOver){
        clearTimeout(moleTimeOut);
        return;
    }  
    if(currentMoleTile){
        currentMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./spider_man_PNG26.png";
    let num;
    do {
        num = getRandomTile();
    } while (currPlantTile && currPlantTile.id == num);
    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);

    moleTimeOut = setTimeout(() => {
        if(currentMoleTile){
            currentMoleTile.innerHTML = "";
            loseLife();
        }
    }, 2000);
}

function setPlant() {
    if (gameOver){
        return;
    }
    if(currPlantTile){
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./pngimg.com - venom_PNG45.png";
    let num; 
    do {
        num = getRandomTile();
    } while (currentMoleTile && currentMoleTile.id == num);
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile(event){
    if(gameOver){
        return;
    }
    // Prevent default touch behavior
    if(event.type === "touchstart"){
        event.preventDefault();
    }
    if(this == currentMoleTile){
        score += 10;
        document.getElementById("score").innerHTML = score.toString();
        clearTimeout(moleTimeOut);
        currentMoleTile.innerHTML = "";
    }
    else if (this == currPlantTile){
        gameOver = true;
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        updateHighScore();
        document.getElementById("retryButton").style.display = "block";
        clearInterval(moleInterval);
        clearInterval(plantInterval);
    }
}

function loseLife(){
    lives--;
    updateLives();
    if (lives <= 0){
        gameOver = true;
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        updateHighScore();
        document.getElementById("retryButton").style.display = "block";
        clearInterval(moleInterval);
        clearInterval(plantInterval);
    }
}

function updateLives(){
    for (let i = 1; i <= 3; i++){
        const heart = document.getElementById(`life${i}`);
        if (i <= lives){
            heart.style.visibility = "visible";
        } else {
            heart.style.visibility = "hidden";
        }
    }
}

function resetGame(){
    score = 0;
    gameOver = false;
    gameStarted = false;
    lives = 3;
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    document.getElementById("score").innerHTML = score.toString();
    document.getElementById("retryButton").style.display = "none";
    updateLives();
    startGame();
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        document.getElementById("highScore").innerText = highScore.toString();
    }
}
