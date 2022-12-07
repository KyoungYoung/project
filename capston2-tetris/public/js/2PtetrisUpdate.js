import BLOCKS from "./blocks.js";
// DOM
const playground = document.querySelector(".Secondplayground > ul");
const gameText = document.querySelector(".game-Text");
const scoreDisplay = document.querySelector(".Secondscore");
const restartButton = document.querySelector(".game-Text > button");

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;


// variables
let score = 0; // 점수
let duration = 1000; // 내려가는 속도
let downInterval; // 
let levelstack = 0;
let tempMovingItem; // 무빙을 실질적으로 실행하기 전에 잠깐 담아두는 용도
let nextMovingItem = null;

const movingItem ={ // 다음 블럭의 타입과 좌표 정보를 갖고 있는 변수
    type:"", 
    direction: 3, // 화살표 위 방향 눌렀을때 좌우 돌리는 지표
    top: 0, // 좌표 기준 어디까지 내려와 있는지 표현
    left: 0, // 좌우값을 알려주는 역할
};

init()

// functions
function init(){
    tempMovingItem = {...movingItem}; // ... 사용하면 값만 가져와서 넣음 나중에 변경이 되어도 tempMovingItem은 변하지 않음
    for(let i = 0; i < GAME_ROWS; i++){ // 가로 10칸짜리 블록 세로 방향으로 20번 만들기
        prependNewLine()
    }
    score = 0; // restart 할 때 score 0으로 초기화
    generateNewBlock()
}

function prependNewLine(){
    // createElement() 지정한 tagName의 HTML 요소를 만들어 반환함. li, ul
    const li = document.createElement("li"); // li 추가
    const ul = document.createElement("ul"); // ul 추가
    for(let j = 0; j < GAME_COLS; j++){
        const matrix = document.createElement("li"); // 가로로 블럭 10칸 만들기
        //.prepend는 선택한 요소의 처음에 새로운 요소나 콘텐츠를 추가함
        ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
}

function renderBlocks(moveType=""){
    const {type, direction, top, left} = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving2");
    movingBlocks.forEach(moving=>{
        moving.classList.remove(type, "moving2");
    })
    // tempMovingItem.type
    // tempMovingItem.direction
    // tempMovingItem.top
    // tempMovingItem.left
    // 이렇게 사용하지 않기 위해 const {} = tempMovingItem 사용
    
    BLOCKS[type][direction].some(block => {
        const x = block[0] + left; // ul 안에 들어있는 li의 값
        const y = block[1] + top; // li의 row 값
        // const xxx = 조건 ? 참일 경우 : 거짓일 경우
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        
        if(isAvailable){
            // console.log(tempMovingItem)
            // console.log(moveType)
            target.classList.add(type, "moving2")
        }
 
        else{
            tempMovingItem = {... movingItem}
            if(moveType === 'retry'){
                clearInterval(downInterval);
                showGameOverText()
            }
            setTimeout(()=>{
                renderBlocks('retry');
                if(moveType === "top"){
                    seizeBlock();
                }
            },0)
            return true;
        }
    }); // tree의 0번째 인덱스 다 갖고옴
    movingItem.type = type;
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

function seizeBlock(){
    const movingBlocks = document.querySelectorAll(".moving2");
    movingBlocks.forEach(moving=>{
        moving.classList.remove("moving2");
        moving.classList.add("seized");
    })
    checkMatch()
}

function checkMatch(){
    const childNodes = playground.childNodes;
    childNodes.forEach(child=>{
        let matched = true;
        child.children[0].childNodes.forEach(li=>{
            if(!li.classList.contains("seized")){
                matched = false;
            }
        })
        if(matched){
            child.remove();
            prependNewLine();
            score++;
            levelstack++;
            scoreDisplay.innerText = score;
        }
    })
    generateNewBlock()
}
function generateNewBlock(){
    clearInterval(downInterval);
    downInterval = setInterval(()=>{
        moveBlock('top', 1)
    },duration)
    tempMovingItem = nextMovingItem
    nextMovingItem = null

    const blockArray = Object.entries(BLOCKS);
    const randomInex = Math.floor(Math.random() * blockArray.length);
    if(tempMovingItem == null){
        movingItem.type =blockArray[randomInex][0];
        movingItem.top = 0;
        movingItem.left = 3;
        movingItem.direction = 0;
        tempMovingItem = {...movingItem}
    }
    if(nextMovingItem == null){
        makeNewBlock()
    }
    renderBlocks();
}

function makeNewBlock(){
    const blockArray = Object.entries(BLOCKS);
    const randomInex = Math.floor(Math.random() * blockArray.length);
    movingItem.type =blockArray[randomInex][0];
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    nextMovingItem = {...movingItem}
    
    showNextBlock()
}
function checkEmpty(target){
    if(!target || target.classList.contains("seized")){
        return false;
    }
    return true;
}

function moveBlock(moveType, amount){
    tempMovingItem[moveType] += amount; // tempMovingItem의 left에 amount 만큼 더함
    renderBlocks(moveType);
}

function changeDirection(){
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlocks()
}

function dropBlock(){
    clearInterval(downInterval);
    downInterval = setInterval(()=>{
        moveBlock("top", 1)
    }, 4)
}


function showGameOverText(){
    gameText.style.display = "flex"
    divNextImg1.style.zIndex = "-1"
    divNextImg2.style.zIndex = "-1"
}
// event handling


document.addEventListener("keydown", e=>{
    switch(e.keyCode){
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;    
        case 38:
            changeDirection();
            break;
        case 191:
            dropBlock();
            break;
        case 96:
            dropBlock();
        default:
            break;
    }
})

restartButton.addEventListener("click",()=>{
    playground.innerHTML = "";
    gameText.style.display = "none"
    scoreDisplay.innerText = 0; // 다시 시작 버튼 눌렀을 때 스코어 0으로 초기화
    init()
})

function showNextBlock() {
    $("#divNextImg2").html(`<img src = "/${nextMovingItem.type}.png">`);
}