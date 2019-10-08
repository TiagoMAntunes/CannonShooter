var camera_top, camera_persp, camera_moving //cameras
var scene, active_camera
var cannonShooter_1, cannonShooter_2, cannonShooter_3

function render() {
    renderer.render(scene, active_camera);
}

function createCannonShooter(x, y, z) {
    'use strict'
    let cannonShooter = new CannonShooterBase(x, y, z)
    scene.add(cannonShooter)

    return cannonShooter
}


function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(5))
    scene.background = new THREE.Color(0xe4edf5)

    cannonShooter_1 = createCannonShooter(0, 0, 0)
 //   cannonShooter_2 = createCannonShooter(0, 30, 0)
 //   cannonShooter_3 = createCannonShooter(0, -30, 0)
}

function traverseElements(obj) {
    if (obj instanceof THREE.Mesh)
        obj.material.wireframe = !obj.material.wireframe
    if (obj !== undefined)
        for (i in obj.children)
            traverseElements(obj.children[i])
  }

/*
function update() {
    XXXXX.update()

    if (wireframe) {
        traverseElements(scene);
        wireframe = false;
    }
}
*/
function createCameras() {
    'use strict'

    camera_top = new Camera(0, 10, 0, new THREE.Vector3(0, 0, 0))
    camera_persp = new PerspCamera(0, 35, 35, new THREE.Vector3(0, 0, 0))
    camera_moving = new Camera(-30, 14.5, 15, new THREE.Vector3(0, 14.5, 15))

    camera_persp.rotateZ(180 * Math.PI / 180)

    active_camera = camera_top
}
