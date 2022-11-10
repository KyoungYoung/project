// 메인 페이지 영화 목록 슬라이더 생성
const setupScrolling = () => {
    const container = [...document.querySelectorAll('.movie-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];

    container.forEach((item,i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
    })

}

// 서브 페이지 출연진 슬라이더 생성
// const castScrolling = () => {
//     const list = [...document.querySelectorAll('.cast-list')];
//     const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
//     const preBtn = [...document.querySelectorAll('.pre-btn')]; 

//     list.cast.forEach((item,j) => {
//         let containerDimensions = item.getBoundingClientRect();
//         let containerWidth = containerDimensions.width;

//         nxtBtn[j].addEventListener('click', () => {
//             item.scrollLeft += containerWidth;
//         })

//         preBtn[j].addEventListener('click', () => {
//             item.scrollLeft -= containerWidth;
//         })
//     })

// }

