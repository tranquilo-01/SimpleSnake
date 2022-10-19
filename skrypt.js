const dimension_X = 800
const dimension_Y = 500

let dirX = 1
let dirY = 0

treat_pos_X = get_random_position(dimension_X)
treat_pos_Y = get_random_position(dimension_Y)

const size = 20
let X_positions = [200, 200]
let Y_positions = [200, 180]
let started = 0

let curr_score = 0
let max_score = 0

let ended = 0

let sleep = 200


function loaded() {
    console.log("Page loaded succesfully")
    wonsz()

}

function wonsz() {
    document.addEventListener("keydown", (event) => { change_direction(event) });

    let cnvs = document.getElementById("cnvs")
    let ctx = cnvs.getContext("2d")

    let max_score_div = document.getElementById("max_score")
    let curr_score_div = document.getElementById("curr_score")

    ctx.font = "50px minecraft"
    ctx.fillText("PRESS ANY KEY TO START", 60, 235)

    let licznik = setInterval(() => {
        if (started) {
            console.log(licznik)

            ctx.fillStyle = "green"
            ctx.fillRect(treat_pos_X, treat_pos_Y, size, size)

            let end_X = X_positions.pop()
            let end_Y = Y_positions.pop()

            if (ended == 0) {
                ctx.fillStyle = "white"
                ctx.fillRect(end_X, end_Y, size, size)

                ctx.fillStyle = "black"
                X_positions.unshift(X_positions[0] + (dirX * size))
                Y_positions.unshift(Y_positions[0] + (dirY * size))
                ctx.fillRect(X_positions[0], Y_positions[0], size, size)
            }

            //zjedzenie treata
            if (X_positions[0] == treat_pos_X && Y_positions[0] == treat_pos_Y) {
                let last_id = X_positions.length - 1
                X_positions.push(X_positions[last_id])
                Y_positions.push(Y_positions[last_id])

                treat_pos_X = get_random_position(dimension_X)
                treat_pos_Y = get_random_position(dimension_Y)

                ctx.fillStyle = "green"
                ctx.fillRect(treat_pos_X, treat_pos_Y, size, size)

                curr_score += 1
                if (curr_score > max_score) {
                    max_score = curr_score
                }


                max_score_div.textContent = "MAX SCORE: " + max_score
                curr_score_div.textContent = "SCORE: " + curr_score

            }

            if (detect_collision()) {
                // clearInterval(licznik)
                for (let i = 0; i < X_positions.length; i++) {
                    ctx.fillStyle = "red"
                    ctx.fillRect(X_positions[i], Y_positions[i], size, size)
                }
                ended = 1
                started = 0
                dirX = 0
                dirY = 0
                ctx.font = "50px minecraft"
                ctx.fillText("PRESS ANY KEY TO TRY AGAIN", 7, 235)
                sleep = 200
            }
        }
    }, sleep)
}


function change_direction(event) {
    change_direction_active = 0
    let cnvs = document.getElementById("cnvs")
    let ctx = cnvs.getContext("2d")
    let curr_score_div = document.getElementById("curr_score")

    if (started == 0) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, 1000, 1000)
        started = 1
    }

    if (ended == 1) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, 1000, 1000)
        X_positions = [200, 200]
        Y_positions = [200, 180]
        dirX = 1
        started = 1
        ended = 0
        curr_score = 0
        curr_score_div.textContent = "SCORE: " + curr_score
    }


    const key = event.key
    switch (key) {
        case "ArrowLeft":
            if (dirX != 1) {
                dirX = -1
                dirY = 0
                break;
            }

        case "ArrowRight":
            if (dirX != -1) {
                dirX = 1
                dirY = 0
                break;
            }
        case "ArrowUp":
            if (dirY != 1) {
                dirX = 0
                dirY = -1
                break;
            }
        case "ArrowDown":
            if (dirY != -1) {
                dirX = 0
                dirY = 1
                break;
            }
    }
}





function detect_collision() {
    // zwraca 1 jesli zderzenie, 0 jesli nie

    // wykrywanie zderzenia weza z samym soba
    let curr_X = X_positions[0]
    let curr_Y = Y_positions[0]
    for (let i = 1; i < X_positions.length; i++) {
        if (curr_X == X_positions[i] && curr_Y == Y_positions[i]) {
            return 1;
        }
    }

    // wykrywanie zderzenia ze sciana
    if (curr_X >= dimension_X || curr_X < 0 || curr_Y >= dimension_Y || curr_Y < 0) {
        return 1;
    }

    return 0;
}

function get_random_position(maks) {
    let p = Math.floor(Math.random() * maks)
    p = p - p % 20
    return p;
}

