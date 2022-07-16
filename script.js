

const GameBoard={
    gameboard:["","","","x","","","","",""],

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
function validmove(event){
    if (!event.target.id){//encountered a big where clicking in the middle of O registers the O and not the sqyare
        return
    }
    index=event.target.id
    let selectedSquare=document.getElementById(index)

    if (selectedSquare.childNodes.length==0) 
    {
        c=genCircle();
        selectedSquare.appendChild(c);
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
        square.addEventListener("click",event =>{validmove(event)})
        line.appendChild(square)
        square.id=j
    }
    i+=3
    container.appendChild(line)
}
let test=document.querySelector(".square")
let cross=document.createElement("div")
cross.classList.add("cross")
cross.textContent="X"
test.appendChild(cross)

let test1=document.querySelectorAll(".square")[1]
let circle=document.createElement("div")
circle.classList.add("circle")
circle.textContent="O"
test1.appendChild(circle)







