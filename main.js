let gameContainer = document.querySelector(".game-container");

let duration = 1000;

let blocks = Array.from(gameContainer.children);

let orderRange = [...Array(blocks.length).keys()];

let imgname;

// Select Game Mode

document.querySelectorAll(".mode li").forEach((li) => {
    li.addEventListener("click", (e) => {
        imgname = e.target.className;
        document.querySelector(".mode").remove();
    });
});

document.addEventListener("click", (e) => {
    //    select Game Level

    if (e.target.className == "easy") {
        blocks.forEach((e) => {
            e.remove();
        });

        e.target.style.backgroundColor = "#009688";
        document.querySelector(".buttons .hard").style.backgroundColor = "#F44336";
        document.querySelector(".buttons .normal").style.backgroundColor =
            "#F44336";

        gameLevel(9, imgname);

        startGame();
    } else if (e.target.className == "normal") {
        blocks.forEach((e) => {
            e.remove();
        });

        e.target.style.backgroundColor = "#009688";

        document.querySelector(".buttons .hard").style.backgroundColor = "#F44336";
        document.querySelector(".buttons .easy").style.backgroundColor = "#F44336";
        gameLevel(12, imgname);

        startGame();
    } else if (e.target.className == "hard") {
        blocks.forEach((e) => {
            e.remove();
        });

        e.target.style.backgroundColor = "#009688";

        document.querySelector(".buttons .easy").style.backgroundColor = "#F44336";
        document.querySelector(".buttons .normal").style.backgroundColor =
            "#F44336";
        gameLevel(15, imgname);

        startGame();
    }
});

function gameLevel(e, imgname) {
    for (let i = 1; i <= e; i++) {
        let divBlock1 = document.createElement("div");
        divBlock1.className = "game-block";
        divBlock1.setAttribute("data-pic", `pic-${i}`);

        let divFront1 = document.createElement("div");
        divFront1.className = "front face";

        let divBack1 = document.createElement("div");
        divBack1.className = "back face";

        let img1 = document.createElement("img");
        img1.src = `${imgname}/pic-${i}.png`;

        divBack1.appendChild(img1);

        divBlock1.appendChild(divFront1);

        divBlock1.appendChild(divBack1);

        gameContainer.appendChild(divBlock1);

        let divBlock2 = document.createElement("div");
        divBlock2.className = "game-block";
        divBlock2.setAttribute("data-pic", `pic-${i}`);

        let divFront2 = document.createElement("div");
        divFront2.className = "front face";

        let divBack2 = document.createElement("div");
        divBack2.className = "back face";

        let img2 = document.createElement("img");
        img2.src = `${imgname}/pic-${i}.png`;

        divBack2.appendChild(img2);

        divBlock2.appendChild(divFront2);

        divBlock2.appendChild(divBack2);

        gameContainer.appendChild(divBlock2);
    }
}

function startGame() {
    document.querySelector(".buttons .start").onclick = function() {
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

    // Update The Values

    gameContainer = document.querySelector(".game-container");

    blocks = Array.from(gameContainer.children);

    orderRange = [...Array(blocks.length).keys()];

    // //////////////////////////////////

    shuffle(orderRange);

    blocks.forEach((block, index) => {
        block.style.order = orderRange[index];

        block.addEventListener("click", function() {
            flipBlock(block);

            winGame(block);
        });
    });
}

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

    if (firstBlock.dataset.pic === secondBlock.dataset.pic) {
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

    timer = setInterval(function() {
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

    if (finishGame.length == blocks.length) {
        document.getElementById("win").play();

        clearInterval(timer);

        document.querySelector(".timer").innerHTML = "Winer";
        document.querySelector(".timer").style.color = "#009688";

        newGame();

        Swal.fire("Good job!", "You Do It", "success");
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

        newGame();

        Swal.fire("Game Over", "Try It Again Later", "error");
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