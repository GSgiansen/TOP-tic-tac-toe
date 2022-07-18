

const GameBoard={
    gameboard:["","","","","","","","",""],
    gameover:false,

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


let container=document.getElementById("container")
let i=0
while (i<9){
    let line=document.createElement("div")
    line.classList.add("line")
    k=i+3
    for (j=i;j<k;j++){
        let square=document.createElement("div")
        square.classList.add("square")
        square.addEventListener("click",event =>{playerMove(event)})
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

}

//to work on is the AI logic to find a suitable move to put cross

function playerMove(event){
    if (!event.target.id){//encountered a bug where clicking in the middle of O registers the O and not the sqyare
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
        check=checkWinner(getCircle())
        if (check){
            displayGameOver("player")
            return
        }
        setTimeout(AImove(),1000);
        
    }
    
    else console.log("clown")

}

function AImove(){
    setTimeout(function(){
    //scan array for empty 
    let emptySq=[]
    g=GameBoard.gameboard
    for (index in GameBoard.gameboard){
        if (!g[index]) {
            emptySq.push(index)
        }
    }
    if (emptySq.length==0) {
        console.log("squares filled")
        return

    }
    let randomindex=Math.floor(Math.random()*emptySq.length)
    addToArray(emptySq[randomindex],"X")


    let selectedSquare=document.getElementById(emptySq[randomindex])
    selectedSquare.appendChild(genCross())
    check=checkWinner(getCross())
    if (check){
        displayGameOver("AI")
    }
    
},500)}

function checkWinner(arr){
    //diff between at least 3 squares must be constant
    if (arr.length<3) return false;
    let dict =new Object()
    let numiterations=arr.length-2
    for (let i=0;i<numiterations;i++){
        console.log(arr[i],arr[i+1],arr[i+2])
        if (Math.abs(arr[i]-arr[i+1])==Math.abs(arr[i+1]-arr[i+2])){
            console.log("winner")
            return true
        }
    }

    return false

}

function getCross(){
    let arr=[]
    g=GameBoard.gameboard
    for (index in g){
        if (g[index]=="X"){
            arr.push(index)
        }
    }
    console.log(arr)
    return arr

}

function getCircle(){
    let arr=[]
    g=GameBoard.gameboard
    for (index in g){
        if (g[index]=="O"){
            arr.push(index)
        }
    }
    console.log(arr)
    return arr

}

function displayGameOver(winner){
    GameBoard.gameover=true
    let d= document.getElementById("display")
    console.log(d)
    d.textContent=winner+" has Won!"
    d.style.display="flex"
    
}