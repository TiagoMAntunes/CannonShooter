const SPEED_INIT = 30

class CannonBall extends SceneObject {
    constructor(pos, v) {
        super()
        
        let MAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x0})
        let ball = super.createSceneObjSphere(0, 0, 0, 1, 20, 20, 0, Math.PI * 2, MAT)
        this.add(ball)

        this.position.set(pos.x,pos.y,pos.z)

        this.rotation.x = v.x
        this.rotation.y = v.y
        this.rotation.z = v.z

        //this.add(new THREE.AxesHelper(1))
    }
}