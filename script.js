

const GameBoard={
    gameboard:["X","O","X","X","","","","",""],

}

function Players(name){
    name:name
}

function genCircle(){
    let circle=document.createElement("div")
circle.classList.add("circle")
circle.textContent="O"
return circle

}

function genCross(){
let cross=document.createElement("div")
cross.classList.add("cross")
cross.textContent="X"
return cross
}
function validmoveC(event){
    if (!event.target.id){//encountered a big where clicking in the middle of O registers the O and not the sqyare
        console.log("clown")
        return
    }
    index=event.target.id
    let selectedSquare=document.getElementById(index)

    if (selectedSquare.childNodes.length==0) 
    {
        c=genCircle();
        selectedSquare.appendChild(c);
        addToArray(index,"O")
        
    }
    
    else console.log("clown")

}

let container=document.getElementById("container")
let i=0
while (i<9){
    let line=document.createElement("div")
    line.classList.add("line")
    k=i+3
    for (j=i;j<k;j++){
        let square=document.createElement("div")
        square.classList.add("square")
        square.addEventListener("click",event =>{validmoveC(event)})
        line.appendChild(square)
        square.id=j
    }
    i+=3
    container.appendChild(line)
}

//display form gameboard to array to display
for (index in GameBoard.gameboard){
    item=GameBoard.gameboard[index]
    let selectedSquare=document.getElementById(index)

    if (selectedSquare.childNodes.length==0) 
    {
        let selectedItem= false
        if (item=="X"){
            selectedItem=genCross()
            
        }
        else if (item=="O"){
            selectedItem=genCircle()
        }
        if (!selectedItem) continue;
        else selectedSquare.appendChild(selectedItem);
        addToArray(index,item)

    }
    else console.log("clown")

}

function addToArray(index,typeOfInput){//type of input can be cross or circle
    GameBoard.gameboard[index]=typeOfInput
    console.log(GameBoard.gameboard)

}

//to work on is the AI logic to find a suitable move to put cross

