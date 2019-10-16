const ROT_SPEED = 6
class CannonShooter extends SceneObject {
	constructor(x, y, z) {
		super()

		// create materials
		let cannonMAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x4932a2})
		let wheelMAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x000000})

		// create primitives
		let cannon = super.createSceneObjCylinderRotXYZ(0, 0, 0, 2, 2, 15, 30, cannonMAT.clone(), 0, 0, 90 * Math.PI / 180)
		let wheel1 = super.createSceneObjSphere(1.5, -7, -2, 1, 20, 20, 0, Math.PI * 2, wheelMAT, 0);
		let wheel2 = super.createSceneObjSphere(-1.5, -7, -2, 1, 20, 20, 0, Math.PI * 2, wheelMAT, 0);
		let wheel3 = super.createSceneObjSphere(1.5, 0, -2, 1, 20, 20, 0, Math.PI * 2, wheelMAT, 0);
		let wheel4 = super.createSceneObjSphere(-1.5, 0, -2, 1, 20, 20, 0, Math.PI * 2, wheelMAT, 0);

		// add to object
		this.add(cannon)
		cannon.add(wheel1);
		cannon.add(wheel2);
		cannon.add(wheel3);
		cannon.add(wheel4);

		this.position.set(x, y, z)

		Object.defineProperty(this, "name", {value: "shooter"})
	}


    update() {
	    const delta_time = last_time != undefined && current_time != undefined ? (current_time - last_time) / 13 : 1;
	    if(keysMap[37]){//left arrow key
	        this.rotation.z += 0.005 * delta_time * ROT_SPEED;
	    }

	    if(keysMap[39]){//right arrow key
	        this.rotation.z -= 0.005 * delta_time * ROT_SPEED;
		}
		
		if (cannon_shoot) {
			cannon_shoot = false
			total_balls++
			
			let ball = new CannonBall(this.position, this.rotation, Math.random() * 5 + 1)

			if(total_balls == 1){
				camera_moving = new PerspCamera(10, 0, 10, scene.position)
				camera_moving.rotateZ(-90 * Math.PI / 180)
				ball.add(camera_moving)
			}

			scene.add(ball)
			active_balls.push(ball)
		}
	}

	activate() {
		let cannon = this.children[0]
	    cannon.material.color.setHex(0x499447)
	}

	deactivate() {
		let cannon = this.children[0]
	    cannon.material.color.setHex(0x4932a2)
	}
}