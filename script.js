

const GameBoard={gameboard:["x","x","x","x"],}

function Players(name){
    name:name
}

let container=document.getElementById("container")
let i=0
while (i<9){
    let line=document.createElement("div")
    line.classList.add("line")

    for (j=0;j<3;j++){
        let square=document.createElement("div")
        square.classList.add("square")
        line.appendChild(square)
    }
    i+=3
    container.appendChild(line)
}