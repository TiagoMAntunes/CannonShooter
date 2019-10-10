var renderer, wireframe

var keysMap = {81: false, 113: false, 87: false, 119: false, 69: false, 101: false, 37: false, 39: false}


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
      active_camera = camera_side
      break
      case 51: //3
      active_camera = camera_front
      break
      case 52: //4
      wireframe = true;
      break
      case 81 || 113: //Q ou q
      active_shooter = cannonShooter_1
      break
      case 87 || 119:  //W ou w
      active_shooter = cannonShooter_2
      break
      case 69 || 101:  //E ou e
      active_shooter = cannonShooter_3
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
    update()
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
 
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    window.addEventListener("resize", onResize)
    animate()
 
}