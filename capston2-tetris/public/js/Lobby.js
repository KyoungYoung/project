(function() {

    document.addEventListener("mousemove", tetris);
    const elem = document.querySelector("#tetris");

    function tetris(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.03}% ${50 - (_mouseY - _h) * 0.03}%`;
        let x = `${_depth2}, ${_depth1}`;
        elem.style.backgroundPosition = x;
    }
})();

const start_btn = document.querySelector(".start_btn");
const guide_btn = document.querySelector(".guide_btn");
const rank_btn = document.querySelector(".ranking_btn");
const guidepop = document.querySelector(".guide_popup");
const rankpop = document.querySelector(".rank_popup");
const closeGuide_btn = document.querySelector(".closeGuide_btn");
const closeRank_btn = document.querySelector(".closeRank_btn");
const sp_btn = document.querySelector(".single_btn");
const mp_btn = document.querySelector(".multi_btn");

// 버튼 스타일 지정
start_btn.addEventListener("mouseover", (event) => {
    event.target.style.filter = "saturate(200%)";
    event.target.style.color = "rgb(211, 211, 211)";
    start_btn.addEventListener("mouseleave", (event) => {
        event.target.style.filter = "saturate(100%)";
        event.target.style.color = "white";
    });
});
guide_btn.addEventListener("mouseover", (event) => {
    event.target.style.filter = "saturate(200%)";
    event.target.style.color = "rgb(211, 211, 211)";
    guide_btn.addEventListener("mouseleave", (event) => {
        event.target.style.filter = "saturate(100%)";
        event.target.style.color = "white";
    });
});
rank_btn.addEventListener("mouseover", (event) => {
    event.target.style.filter = "saturate(200%)";
    event.target.style.color = "rgb(211, 211, 211)";
    rank_btn.addEventListener("mouseleave", (event) => {
        event.target.style.filter = "saturate(100%)";
        event.target.style.color = "white";
    });
});
// 스타트 버튼으로 1P 2P 버튼 
start_btn.addEventListener("click", (event) => {
    event.target.style.visibility = "hidden";
    sp_btn.style.visibility = "visible";
    mp_btn.style.visibility = "visible";
});
sp_btn.addEventListener("click", (event) => {
    event.target.style.border = 0;
    event.target.addEventListener("mouseup", () => {
        // 1p, 2p 버튼 초기화
    });
});
mp_btn.addEventListener("click", (event) => {
    event.target.style.border = 0;
});

// 팝업 띄우기
guide_btn.addEventListener("click", () => {guidepop.style.display = 'flex';});
rank_btn.addEventListener("click", ()=>{rankpop.style.display = 'flex';});
// 팝업 닫기
closeGuide_btn.addEventListener("click", (event) => {
    guidepop.style.display = "none";
    event.target.addEventListener("mouseover", (event) => {
        event.target.style.color = "rgb(230, 236, 229)";
    });
    event.target.addEventListener("mouseleave", (event) => {
        event.target.style.color = "white";
    }); 
});
closeRank_btn.addEventListener("click", (event) => {
    rankpop.style.display = "none";
    event.target.addEventListener("mouseover", (event) => {
        event.target.style.color = "rgb(230, 236, 229)";
    });
    event.target.addEventListener("mouseleave", (event) => {
        event.target.style.color = "white";
    }); 
});
// 오버레이 클릭시 화면 초기화
const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", () => {
    guidepop.style.display = "none";
    rankpop.style.display = "none";
    start_btn.style.visibility = "visible";
    sp_btn.style.visibility = "hidden";
    mp_btn.style.visibility = "hidden";
});

const emojis = ["img_src/block1.png", "img_src/block2.png", "img_src/block3.png",
 "img_src/block4.png","img_src/block5.png","img_src/block6.png","img_src/block7.png","img_src/block8.png","img_src/block9.png"];

const generateDrops = () => {
    const drop = document.createElement("div");
    drop.classList.add("drop")

    let ran = Math.random() * 10;
    if(ran < 6) {
        drop.style.transform = "rotate(45deg)"; 
    } else {
        drop.style.transform = "rotate(90deg)"; 
    }
    
    setInterval( () => {
        drop.remove();
    }, 8000);
    
    drop.style.backgroundImage = `url(${ emojis[Math.floor(Math.random() * emojis.length)] })`;
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = Math.random() * 2 + 1 + "s"

    document.body.appendChild(drop)
}
setInterval(generateDrops, 100)

var sound = new Howl({
    src: ['/plum.mp3'],
    volume: 0.5,
    autoplay: true,
    loop: true,
    onend : () => {
    console.log('Finished!');
    }
});
