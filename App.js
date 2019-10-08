var renderer, wireframe

var keysMap = {81: false, 113: false, 87: false, 119: false, 65: false, 97: false, 83: false, 115: false,
  37: false, 38: false, 39: false, 40: false}



function onKeyUp(e) {
    if (e.keyCode in keysMap) {
        keysMap[e.keyCode] = false
    }
}

function onKeyDown(e) {
  switch(e.keyCode) {
      case 49: //1
      active_camera = camera_top
      break
      case 50: //2
      active_camera = camera_persp
      break
      case 51: //3
      active_camera = camera_moving
      break
      case 52: //4
      wireframe = true;
      break
  }

  if (e.keyCode in keysMap) {
      keysMap[e.keyCode] = true
  }
}

function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
 //   update()
    render()
    requestAnimationFrame(animate)
}

//setup of scene
function init() {
    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement);

    createScene()
    createCameras()
    console.log(cannonShooter_1)


    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    //window.addEventListener("resize", onResize)
    animate()
 
}