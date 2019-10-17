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
 
function createNBalls() {
    let N = Math.floor(Math.random() * 10 + 1) // 1 - 11 balls to be generated
    
    for (i = 0; i < N; i++) {
        let x = Math.random()*70 - 35
        let y = Math.random()* 50 - 25
        let flag = true

// NOT WORKING!
 /*       while(flag) {
            flag = false
            for (index in active_balls) {
                let ball = active_balls[index]

                if ((ball.position.x <= x + 2 * ball.radius || ball.position.x <= x - 2 * ball.radius) && (ball.position.y <= y + 2 * ball.radius || ball.position.y <= y - 2 * ball.radius)) {
                    x = Math.random()*70 - 35
                    y = Math.random()* 50 - 25
                    flag = true
                }
            }
        }
*/
        let pos = new THREE.Vector3(x, y, 3)
        let v = new THREE.Vector3(0, 0, 0)
        let new_ball = new CannonBall(pos, v, 0)
        scene.add(new_ball);
        active_balls.push(new_ball)
    }
}


function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(5))
    scene.background = new THREE.Color(0xe4edf5)

    createArena(0, 0, 0)

    cannonShooter_1 = createCannonShooter(40, 17.5, 3)
    cannonShooter_2 = createCannonShooter(40, 0, 3)
    cannonShooter_3 = createCannonShooter(40, -17.5, 3)

    active_shooter = cannonShooter_1

    createNBalls()
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
        if (obj.name == "cannon_ball" && ball_axis) {
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
        // if ball out of arena -> make it invisible
        if (active_balls[n].position.x > 42) {
            active_balls[n].visible = false
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
    camera_persp = new PerspCamera(80, -35, 45, new THREE.Vector3(0, 0, 0))

    camera_persp.rotateZ(-130 * Math.PI / 180)

    active_camera = camera_top
}


function sphereCollision(A,B) {
    return A.radius + B.radius >= Math.sqrt((A.position.x - B.position.x)**2 + (A.position.y - B.position.y) ** 2)
}

function manageCollision(A,B) {
    let dx = A.position.x - B.position.x
    let dy = A.position.y - B.position.y
    let collision_angle = Math.atan2(dy, dx)
    let magnitude_1 = Math.sqrt(A.speedx ** 2 + A.speedy ** 2)
    let magnitude_2 = Math.sqrt(B.speedx ** 2 + B.speedy ** 2)
    let direction_1 = Math.atan2(A.speedy, A.speedx)
    let direction_2 = Math.atan2(B.speedy, B.speedx)

    let new_x_speed_1 = magnitude_1 * Math.cos(direction_1 - collision_angle)
    let new_y_speed_1 = magnitude_1 * Math.sin(direction_1 - collision_angle)
    let new_x_speed_2 = magnitude_2 * Math.cos(direction_2 - collision_angle)
    let new_y_speed_2 = magnitude_2 * Math.sin(direction_2 * collision_angle)

    let final_x_speed_1 = new_x_speed_2 //masses are equal so it simplifies
    let final_x_speed_2 = new_x_speed_1
    let final_y_speed_1 = new_y_speed_1
    let final_y_speed_2 = new_y_speed_2

    A.speedx = Math.cos(collision_angle) * final_x_speed_1 + Math.cos(collision_angle + Math.PI / 2)*final_y_speed_1
    A.speedy = Math.sin(collision_angle) * final_x_speed_1 + Math.sin(collision_angle + Math.PI / 2) * final_y_speed_1

    B.speedx = Math.cos(collision_angle) * final_x_speed_2 + Math.cos(collision_angle + Math.PI / 2)*final_y_speed_2
    B.speedy = Math.sin(collision_angle) * final_x_speed_2 + Math.sin(collision_angle + Math.PI / 2) * final_y_speed_2

}