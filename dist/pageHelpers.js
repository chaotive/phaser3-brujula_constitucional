function fullscreen(){
    console.log("hola")
    var el = document.getElementById('game');

    if(el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen();
    }
    else {
        el.mozRequestFullScreen();
    }
}
