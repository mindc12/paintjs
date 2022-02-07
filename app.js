const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode"); // fill button
const saveBtn = document.getElementById("jsSave"); // save button

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
//canvas.width = 700;
//canvas.height = 700; // css크기는 화면상 크기만 나타냄. 픽셀상의 화면 크기가 필요함

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE); //켄버스 기본색상을 하얀색으로 지정(안그럼 투명이 됨)

ctx.strokeStyle = INITIAL_COLOR; // 선의 기본 색상 지정
ctx.fillStyle = INITIAL_COLOR; // 채우기의 기본 색상 지정
ctx.lineWidth = 2.5; // 선의 기본 너비 지정

let painting = false;
let filling = false;

function stopPainting() {
    painting = false; 
}

function startPainting(){
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX; // clientX,Y는 화면 전체를 감지, offset은 canvas내에서만
    const y = event.offsetY;

    if(!painting){ //페인팅하지 않을 경우, 
        ctx.beginPath(); //마우스가 움직이는 경로 생성
        ctx.moveTo(x, y); //선 시작 좌표
    }else{
        ctx.lineTo(x, y); //페인팅이 참일 경우 선을 생성 (선 끝 좌표-이전 좌표와 이어짐)
        ctx.stroke(); //선 그리기
    }
}


function handleColorClick(event){
    const color = event.target.style.backgroundColor; //2. div의 배경색을 가져옴
    ctx.strokeStyle = color; // 3. strockStyle의 색이 위의 타겟 색으로 변경
    ctx.fillStyle = color; // 채우기색도 타겟색으로 변경
}

function handleRangeChange(event){
    const size = event.target.value; // 범위 값( step값이 0.1이라 0.1만큼 변화함)
    ctx.lineWidth = size; // 선두께를 input의 변경값으로 덮어씌움
}

function handleModeClick(){ //fill 버튼을 눌렀을 때
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    }else{
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(filling){ //filling이 참일 경우에만(버튼을 눌러서 fill 에서 paint로 보여질때)
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE); //지정범위 만큼의 색이채워진 사각형 생성
    }
}

function handleCM(event){
    event.preventDefault(); //contextmenu를 방지
}

function handleSaveClick(){
    const image = canvas.toDataURL(); // canvas를 이미지.png(default)로 변환
    const link = document.createElement("a");

    link.href= image; // href를 image(url)로 지정 후 다운로드는 이름을 설정해줘야함.
    link.download = "★Awesome_Paint★"; //download는 a의 attribute. 말그대로 링크로 가는 대신 다운로드 시킴
    link.click();
}


if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting); //마우스에서 손 뗄 때
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 canvas밖으로 벗어날 때
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); // context를 우클릭 했을 떼 나오는 메뉴를 다룸
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
    );
    //1.colors를 array형태로 바꾸고 각각의 요소에서 color라는 클릭 함수 실행시 handleColorClick 발생

    if(range){
        range.addEventListener("input", handleRangeChange);
    }//Brush size

    if(mode){
        mode.addEventListener("click", handleModeClick);
    }// fill버튼을 눌렀을 때

    if(saveBtn){
        saveBtn.addEventListener("click", handleSaveClick);
    }