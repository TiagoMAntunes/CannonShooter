class CannonBall extends SceneObject {
    constructor(pos, v, init_velocity) {
        super()
        
        let MAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x000000})

        let radius = 2
        this.ball = super.createSceneObjSphere(0, 0, 0, radius, 20, 20, 0, Math.PI * 2, MAT)
        this.radius = radius
        this.name = "cannon_ball"
        this.add(this.ball)

        this.position.set(pos.x, pos.y,pos.z)
        this.rotation.set(v.x, v.y, v.z)
        
        this.speedx = - init_velocity * Math.cos(this.rotation.z)
        this.speedy = - init_velocity * Math.sin(this.rotation.z)

        this.velocity = new THREE.Vector3()
        this.rotationAxis = new THREE.Vector3()
        this.velocity.set(this.speedx, this.speedy, 0)
        this.rotationAxis.set(0, 0, 1).cross(this.velocity).normalize()


        let axis = new THREE.AxesHelper(4)
        axis.position.set(0, 0, 0)
        this.ball.axis = axis
        this.ball.add(axis)

        this.ball.axis.visible = true
        if (!ball_axis) {
            this.ball.axis.visible = false
        } 

        camera_moving = new PerspCamera(10, 0, 10, scene.position)
		camera_moving.rotateZ(-90 * Math.PI / 180)
		this.add(camera_moving)
		if(following_ball){
			active_camera = camera_moving
		}
    }

    // so far only moves horizontally
    move() {
        const delta_time = last_time != undefined && current_time != undefined ? (current_time - last_time) / 40 : 1;
        let friction = 0.97
        let gravity = 0.01
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

        // Rotate the ball
        this.velocity.set(this.speedx, this.speedy, 0)
        this.rotationAxis.set(0, 0, 1).cross(this.velocity).normalize()

        var velocity_magnitude = this.velocity.length()
        var rotation_amount = velocity_magnitude * (Math.PI * 2) / this.radius

        this.ball.rotateOnWorldAxis(this.rotationAxis, rotation_amount)

        this.validateBoundaries()

    }

    update() {
    	if (ball_axis && !this.ball.axis.visible) {		// R ou r
    		this.ball.axis.visible = true
    	}
        else if (!ball_axis && this.ball.axis.visible) {
            this.ball.axis.visible = false
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