const SPEED_INIT = 30

class CannonBall extends SceneObject {
    constructor(pos, v) {
        super()
        
        let MAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x0})
        let ball = super.createSceneObjSphere(-5, 0, 0, 1, 20, 20, 0, Math.PI * 2, MAT)
        this.add(ball)

        this.position.set(pos.x,pos.y,pos.z)

        this.rotation.x = v.x
        this.rotation.y = v.y
        this.rotation.z = v.z

        console.log (this.rotation)

        this.power = Math.random() * 5 + 1

        this.add_vel = new THREE.Vector3();
        this.add_vel.x = Math.cos(this.rotation.x) * this.power
        this.add_vel.y = Math.sin(this.rotation.x) * this.power
        this.add_vel.z = 0

        console.log(this.add_vel)

        //this.add(new THREE.AxesHelper(1))

        
        this.velocity = new THREE.Vector3(this.add_vel.x, this.add_vel.y, this.add_vel.z);
        this.rotAxis = new THREE.Vector3(0, 1, 0)


    }

    // so far only moves horizontally
    move() {
        let friction = 0.97
        let gravity = 0.1
        let elasticity = 0.8

        this.position.x -= this.add_vel.x
        this.position.y += this.add_vel.y
    //    this.position.z += this.add_vel.z
        
        // if ball stopped, return
        if (Math.abs(this.velocity.x) <= 0.05 && Math.abs(this.velocity.y) <= 0.05)
            return 0;

        // TODO handle bouncing

        // Handle ball's rotation over itself ---- NOT WORKING
/*        this.rotAxis.set(0, 0, 1).cross(this.velocity).normalize();
        this.rotateOnWorldAxis(this.rotAxis, this.velocity.length * (2 * Math.PI) / 1)
*/
        // update velocity - Movimento Uniformemente Retardado
        this.add_vel.x *= friction
        this.add_vel.y *= friction
        //this.add_vel.z *= friction

        // Check if ball hit Arena's walls
        if (this.position.x <= -34) {
            this.add_vel.x *= -1
            this.position.x = -34
        }

        if (Math.abs(this.position.y) >= 24) {
            this.add_vel *= -1
            this.position.y = (this.position.y < 0 ?  -25 : 24)
        }

        //this.add_vel.z -= gravity
    }
}