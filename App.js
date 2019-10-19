var renderer, wireframe = false
var cannon_shoot = false
var keysMap = {81: false, 113: false, 87: false, 119: false, 69: false, 101: false, 37: false, 39: false}
var ball_axis = false;
var last_time = undefined, current_time = undefined
var camera_ball
var first_cannon = true
var following_ball = false

function onKeyUp(e) {
    if (e.keyCode in keysMap) {
        keysMap[e.keyCode] = false
    }
}

function onKeyDown(e) {
  switch(e.keyCode) {
      case 49: //1
      active_camera = camera_top
      following_ball = false
      break
      case 50: //2
      active_camera = camera_persp
      following_ball = false
      break
      case 51: //3
      active_camera = camera_moving
      following_ball = true
      break
      case 52: //4
      wireframe = true;
      break
      case 81 || 113:  //Q ou q
      active_shooter = cannonShooter_1
      break
      case 87 || 119:  //W ou w
      active_shooter = cannonShooter_2
      break
      case 69 || 101:  //E ou e
      active_shooter = cannonShooter_3
      break
      case 32:
      cannon_shoot = true
      break
      case 82 || 114:   // R ou r
      ball_axis = !ball_axis
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
    last_time = current_time
    current_time = performance.now()
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