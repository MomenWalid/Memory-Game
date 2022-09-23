document.querySelector(".buttons span").onclick = function() {
    let yourName = prompt("Whats Your Name ?");

    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
        rotate();
    } else {
        document.querySelector(".name span").innerHTML = yourName;
        rotate();
        document.getElementById("start").play();
    }

    document.querySelector(".buttons").remove();

    if (true) {
        setTimeout(function() {
            let pic = document.querySelectorAll(".game-block .back");

            pic.forEach((e) => {
                e.style.transform = "rotateY(180deg)";
            });
        }, 4000);
    }
    time();
};

let duration = 1000;

let gameContainer = document.querySelector(".game-container");

let blocks = Array.from(gameContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener("click", function() {
        flipBlock(block);

        winGame(block);
    });
});

function flipBlock(selectedBlock) {
    selectedBlock.classList.add("flipped");

    let flippedBlocks = blocks.filter((flippedBlock) =>
        flippedBlock.classList.contains("flipped")
    );

    if (flippedBlocks.length === 2) {
        stopClicking();

        checkMatchedBlocks(flippedBlocks[0], flippedBlocks[1]);
    }
}

function stopClicking() {
    gameContainer.classList.add("no-clicking");

    setTimeout(() => {
        gameContainer.classList.remove("no-clicking");
    }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElment = document.querySelector(".tries span");

    if (firstBlock.dataset.team === secondBlock.dataset.team) {
        firstBlock.classList.remove("flipped");
        secondBlock.classList.remove("flipped");

        firstBlock.classList.add("match");
        secondBlock.classList.add("match");

        document.getElementById("success").play();
    } else {
        triesElment.innerHTML = parseInt(triesElment.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("flipped");
            secondBlock.classList.remove("flipped");
        }, duration);

        document.getElementById("fail").play();
    }
}

function shuffle(array) {
    let current = array.length;

    let temp, random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;
    }

    return array;
}

// Rotate the blocks in first of game

function rotate() {
    if (true) {
        setTimeout(function() {
            let pic = document.querySelectorAll(".game-block .back");

            pic.forEach((e) => {
                e.style.transform = "rotateY(0deg)";
            });
            stopClicking();
        }, 10);
    }
}

// make Timer For game
let timer;

function time() {
    let seconds = document.querySelector(".seconds");

    seconds.innerHTML = "64";

    timer = setInterval(function time() {
        seconds.innerHTML--;
        seconds.innerHTML =
            seconds.innerHTML < 10 ? `0${seconds.innerHTML}` : seconds.innerHTML;

        if (seconds.innerHTML === "00") {
            loseGame();
            clearInterval(timer);
        }
    }, duration);
}

// when the player Win the game

function winGame(selectedBlock) {
    let finishGame = blocks.filter((finish) =>
        finish.classList.contains("match")
    );

    if (finishGame.length === 20) {
        document.getElementById("win").play();

        clearInterval(timer);

        document.querySelector(".timer").innerHTML = "Winer";
        document.querySelector(".timer").style.color = "#009688";

        Swal.fire("Good job!", "You Do It", "success");

        newGame();
    }
}

// lose the game

function loseGame() {
    document.querySelector(".timer").innerHTML = "Loser";
    document.querySelector(".timer").style.color = "#e91e63";

    document.getElementById("lose").play();

    let faceBlock = document.querySelectorAll(".game-block .face");

    faceBlock.forEach((e) => {
        if (e.parentNode.classList.contains("match")) {
            e.style.transform = "rotateY(180deg)";

            e.style.borderColor = "#2196f3";
        } else {
            e.style.transform = "rotateY(0deg)";

            e.style.borderColor = "#e91e63";

            e.style.backgroundColor = "#e91e63";
        }

        Swal.fire("Game Over", "Try It Again Later", "error");

        newGame();
    });

    gameContainer.classList.add("no-clicking");
}

function newGame() {
    let div = document.createElement("div");

    div.style.cssText =
        "top: 50% ;position: absolute;left: 50%;transform: translate(-50%, -50%);background-color: #FFF;width: 250px;height: 200px;justify-content: center;display: flex;align-items: center;border-radius: 6px;";

    let span = document.createElement("span");
    span.style.cssText =
        "background-color: #F44336;color: #FFF;padding: 10px;border-radius: 6px;font-size: 20px;cursor: pointer;";
    let buttonText = document.createTextNode("New Game");

    span.appendChild(buttonText);
    div.appendChild(span);
    document.body.appendChild(div);

    span.onclick = function() {
        location.reload();
    };
}