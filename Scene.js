var camera_top, camera_persp, camera_moving //cameras
var scene, active_camera, active_shooter
var cannonShooter_1, cannonShooter_2, cannonShooter_3

var active_balls = []

function render() {
    renderer.render(scene, active_camera);
}

function createCannonShooter(x, y, z) {
    'use strict'
    let cannonShooter = new CannonShooter(x, y, z)
    scene.add(cannonShooter)

    return cannonShooter
}

function createArena(x, y, z){
    'use strict'
    let arena = new Arena(x, y, z)
    scene.add(arena)
}


function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(5))
    scene.background = new THREE.Color(0xe4edf5)

    createArena(0, 0, 0)

    cannonShooter_1 = createCannonShooter(60, 17.5, 0)
    cannonShooter_2 = createCannonShooter(60, 0, 0)
    cannonShooter_3 = createCannonShooter(60, -17.5, 0)

    active_shooter = cannonShooter_1
}

function traverseElements(obj) {
    if (obj instanceof THREE.Mesh)
        obj.material.wireframe = !obj.material.wireframe
    if (obj !== undefined)
        for (i in obj.children)
            traverseElements(obj.children[i])
  }


function update() {
    for (child in scene.children) {
        let obj = scene.children[child]
        if (obj.name == "shooter") {
            if (obj.position == active_shooter.position) 
                obj.activate()
            
            else
                obj.deactivate()
        }
        if (obj.name == "cannon_ball") {
            obj.update()
        }
    }

    active_shooter.update()

    for (n in active_balls) {
        if (active_balls[n].move() == 0) {
            active_balls.splice(n, 1)
        }
    }

    if (wireframe) {
        traverseElements(scene);
        wireframe = false;
    }
}

function createCameras() {
    'use strict'

    camera_top = new Camera(15, 0, 20, new THREE.Vector3(15, 0, 0 ))
    camera_persp = new PerspCamera(90, -40, 50, new THREE.Vector3(0, 0, 0))
    camera_moving = new Camera(-30, 14.5, 15, new THREE.Vector3(0, 14.5, 15))

    camera_persp.rotateZ(-130 * Math.PI / 180)

    active_camera = camera_top
}
