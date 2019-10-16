class CannonBall extends SceneObject {
    constructor(pos, v) {
        super()
        
        let MAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x0})
        let radius = 2
        let ball = super.createSceneObjSphere(0, 0, 0, radius, 20, 20, 0, Math.PI * 2, MAT)
        this.radius = radius
        this.name = "cannon_ball"
        this.add(ball)

        this.position.set(pos.x, pos.y,pos.z)
        this.rotation.set(v.x, v.y, v.z)

        let init_velocity = Math.random() * 5 + 1
        this.speedx = - init_velocity * Math.cos(this.rotation.z)
        this.speedy = - init_velocity * Math.sin(this.rotation.z)


        let axis = new THREE.AxesHelper(4)
        axis.position.set(0, 0, 0)
        this.add(axis)
    }

    // so far only moves horizontally
    move() {
        const delta_time = last_time != undefined && current_time != undefined ? (current_time - last_time) / 40 : 1;
        let friction = 0.97
        let gravity = 0.1
        let elasticity = 0.8

        // if ball stopped, return
        if (Math.abs(this.speedx) <= 0.05 && Math.abs(this.speedy) <= 0.05)
            return ;

        // Friction force
        this.speedx *= friction
        this.speedy *= friction

        // Move the ball
        this.position.x += this.speedx *delta_time
        this.position.y += this.speedy *delta_time

        this.validateBoundaries()
    }

    update() {
    	if (ball_axis) {		// R ou r
    		this.children[1].visible = !this.children[1].visible
    		ball_axis = false
    	}
    }

    validateBoundaries() {
        //left wall
        if (this.position.x - this.radius <= -38.5) {
            this.position.x = -38.5 + this.radius
            this.speedx *= -1
        }

        //lower wall
        if (this.position.y - this.radius <= -28.5) {
            this.position.y = -28.5 + this.radius
            this.speedy *= -1
        }

        if (this.position.y + this.radius >= 28.5) {
            this.position.y = 28.5 - this.radius
            this.speedy *= -1
        }
    }
}