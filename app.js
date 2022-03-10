const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//미리 배경을 흰색으로 만들기 : 안하면 저장했을때 배경이 투명상태
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);


ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;



let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}


function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){            //(누르기 전)
        ctx.beginPath();      //그릴 준비 완료
        ctx.moveTo(x, y);     //그릴곳은 여기..여기..여기..(마우스움직이는중..)
    }else{                    //(누른후)
        ctx.lineTo(x, y);     //여기까지야.. 아니..여기까지..여기여기(마우스움직이는중)
        ctx.stroke();         //응 그리고 있어. 어..거기..어..거기까지..
    }
}

function startPainting(event){
    painting = true;
}


function handColorClick(event){
    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    //console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}




function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}


function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}


//우클릭시 나오는 메뉴 불러서
function handleCM(event){

}



function handleSaveClick(){
    console.log("asdfasdf");
    const image = canvas.toDataURL("image/jpeg"); //캔버스를 이미지화시켜서 URL로 반환?? (구글링해봐~) : 뒤에 "" 아에 안쓰면 기본값 png임
    const link = document.createElement("a");
    link.href = image;
    link.download = "Padint-FILENAME";
    link.click();
}




if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",  handleCanvasClick);
    canvas.addEventListener("contextmenu" , handleCM);      //오른쪽 클릭시 나오는 메뉴
}


//console.log(colors);                  // 은 그냥 html 오브젝트들 묶음 [HTMLCollection]
//console.log(Array.from(colors));      // 이럼 오브젝트를 배열로 가져옴


Array.from(colors).forEach( color => {
    color.addEventListener("click" , handColorClick
)} );

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click" , handleModeClick);
}


if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}









