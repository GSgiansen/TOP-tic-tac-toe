

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
    console.log(arr)
    for (let i=0;i<arr.length;i++){

        let newarr=arr.slice(0,i).concat(arr.slice(i+1))
        
        for (let j=0;j<newarr.length-1;j++){
            let newestarr=[arr[i],newarr[j],newarr[j+1]].sort()
            if (Math.abs(newestarr[0]-newestarr[1])==Math.abs(newestarr[1]-newestarr[2])){
                if (Math.abs(newestarr[0]-newestarr[1])%2==0 &&((newestarr[0]==0 && newestarr[2]==8) || (newestarr[0]==2 && newestarr[2]==6))){//calc even 
                    return true
                }
                else if(Math.abs(newestarr[0]-newestarr[1])==Math.abs(newestarr[1]-newestarr[2]) && Math.abs(newestarr[0]-newestarr[1])!=1){
                    if (Math.abs(newestarr[0]-newestarr[1])%2==1) return true
                }

                else if (Math.abs(newestarr[0]-newestarr[1])==Math.abs(newestarr[0]-newestarr[1]) &&Math.abs(newestarr[0]-newestarr[1])==1){
                    if (newestarr[0]==0 || newestarr[0]==3 || newestarr[0]==6){
                        return true
                    }
                }

            }


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
    return arr

}

function displayGameOver(winner){
    GameBoard.gameover=true
    let d= document.getElementById("display")
    d.textContent=winner+" has Won!"
    d.style.display="flex"
    
}

let resetbutton= document.getElementById("clickPvsC")

resetbutton.addEventListener("click",function(){
    document.location.reload(true)
})