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

    cannonShooter_1 = createCannonShooter(60, 17.5, 10)
    cannonShooter_2 = createCannonShooter(60, 0, 10)
    cannonShooter_3 = createCannonShooter(60, -17.5, 10)

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
        active_balls[n].move() == 0
        
        for (let i = parseInt(n) + 1; i < active_balls.length; i++) {
            if (sphereCollision(active_balls[n], active_balls[i])) {
                console.log('Collision between ' + n + ' and ' + i)
                manageCollision(active_balls[n], active_balls[i])
            }
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


function sphereCollision(A,B) {
    return A.radius + B.radius >= Math.sqrt((A.position.x - B.position.x)**2 + (A.position.y - B.position.y) ** 2)
}

function manageCollision(A,B) {
    /*let speed = new THREE.Vector3()
    speed.addVectors(A.speed, B.speed)
    speed.divideScalar(2)
    A.speed = speed 
    B.speed = speed 
    
    let v1 = A.speed.clone()
    console.log(v1)
    let v2 = B.speed.clone()
    let x1 = A.position.clone()
    let x2 = B.position.clone()
    let s1 = v1.sub(v2).dot(x1.sub(x2))
    s1 /= x1.x**2 + x1.y**2
    x1.multiplyScalar(s1)
    //contas, contas, contas
    res1 = A.speed.clone().sub(x1.clone()) //resultado de A

    
    v1 = A.speed.clone()
    v2 = B.speed.clone()
    x1 = A.position.clone()
    x2 = B.position.clone()
    let s2 = v2.sub(v1).dot(x2.sub(x1))
    x1.multiplyScalar(s2)
    res2 = B.speed.clone().sub(x2.clone())

    A.speed = res1
    B.speed = res2
    */
}