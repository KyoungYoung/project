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


var sound = new Howl({
    src: ['/plum.mp3'],
    volume: 0.3,
    autoplay: true,
    loop: true,
    onend : () => {
    console.log('Finished!');
    }
});
