class CannonBall extends SceneObject {
    constructor(pos, v) {
        super()
        
        let MAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x0})
        let radius = 2
        let ball = super.createSceneObjSphere(-5, 0, 0, radius, 20, 20, 0, Math.PI * 2, MAT)
        this.radius = radius
        this.name = "cannon_ball"
        this.add(ball)

        this.position.set(pos.x, pos.y,pos.z)
        this.rotation.set(v.x, v.y, v.z)

        let init_velocity = Math.random() * 5 + 1
        this.speed = new THREE.Vector3(init_velocity * Math.cos(v.z), -init_velocity * Math.sin(v.z), 0);

        this.temp_pos = new THREE.Vector3(this.position.x, this.position.y, this.position.z);

        let axis = new THREE.AxesHelper(4)
        axis.position.set(-5, 0, 0)
        this.add(axis)


        // velocity
        this.velocity = new THREE.Vector3(init_velocity/radius, init_velocity/radius, 0);
    }

    // so far only moves horizontally
    move() {
        const delta_time = last_time != undefined && current_time != undefined ? (current_time - last_time) / 13 : 1;
        let friction = 0.97
        let gravity = 0.1
        let elasticity = 0.8

        this.temp_pos.x = this.position.x
        this.temp_pos.y = this.position.y

        //this.rotateX(-this.velocity.y * delta_time)

        // if ball stopped, return
        if (Math.abs(this.velocity.x) <= 0.05 && Math.abs(this.velocity.y) <= 0.05)
            return ;

        this.position.set(this.temp_pos.x, this.temp_pos.y, this.temp_pos.z)
        this.position.x += -this.speed.x * delta_time
        this.position.y += this.speed.y * delta_time


        // TODO handle bouncing && rotation

        // update velocity - Movimento Uniformemente Retardado
        this.speed.x *= friction
        this.speed.y *= friction
        this.speed.z *= friction
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.velocity.z *= friction

        // Check if ball hit Arena's walls
        if (this.position.x < -34) {
            this.speed.x *= -1
            this.position.x = -34
        }

        if(Math.abs(this.position.y) > 23){
            this.speed.y = -this.speed.y
            this.position.y = (this.position.y > 0? 23 : -23)
        }

        //this.add_vel.z -= gravity
    }

    update() {
    	if (ball_axis) {		// R ou r
    		this.children[1].visible = !this.children[1].visible
    		ball_axis = false
    	}
    }
}