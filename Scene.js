var camera_top, camera_persp, camera_moving //cameras
var scene, active_camera, active_shooter
var cannonShooter_1, cannonShooter_2, cannonShooter_3

function render() {
    renderer.render(scene, active_camera);
}

function createCannonShooter(x, y, z) {
    'use strict'
    let cannonShooter = new CannonShooter(x, y, z)
    scene.add(cannonShooter)

    return cannonShooter
}


function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(5))
    scene.background = new THREE.Color(0xe4edf5)

    cannonShooter_1 = createCannonShooter(50, 35, 1)
    cannonShooter_2 = createCannonShooter(50, 17.5, 1)
    cannonShooter_3 = createCannonShooter(50, 0, 1)

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
    }

    active_shooter.update()

    if (wireframe) {
        traverseElements(scene);
        wireframe = false;
    }
}

function createCameras() {
    'use strict'

    camera_top = new Camera(15, 15, 50, new THREE.Vector3(15, 15, 0 ))
    camera_persp = new PerspCamera(0, 35, 35, new THREE.Vector3(0, 0, 0))
    camera_moving = new Camera(-30, 14.5, 15, new THREE.Vector3(0, 14.5, 15))

//    camera_top.rotateZ(180 * Math.PI / 180)
//    camera_persp.rotateZ(Math.PI)

    active_camera = camera_top
}
