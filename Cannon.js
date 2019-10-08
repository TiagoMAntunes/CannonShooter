class Cannon extends SceneObject {
	constructor(x, y, z) {
		super()

		// create materials
		let baseMAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x383836})
		let cannonMAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0xc2c9cf})

		// create components
		let base = super.createSceneObjSphere(0, 0, 2, 2, 20, 20, 0, Math.PI, baseMAT.clone())
        let rot_obj = new SceneObject(0, 0, 0)
        let cannon = super.createSceneObjCylinderRotX(0, 0, 4.5,  1.5, 1.5, 10, 20, cannonMAT.clone(), Math.PI / 2)

	}
}