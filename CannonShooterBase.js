class CannonShooterBase extends SceneObject {   
    constructor(x, y, z) {
        super()

        let baseMAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x6e7574})
        let wheelMAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x000000})
        let radius = 2
        let widthSegments = 20
        let heightSegments = 20
        let phiStart = 0
        let phiLength = 2 * Math.PI

        // add robot's base platform
        let base = super.createSceneObjBox(0, 0, 0, 20, 20, 2, baseMAT.clone())
        this.add(base)

        // add robot's wheels
        let wheel1 = super.createSceneObjSphere(-6.5, -6.5, -3, radius, widthSegments, heightSegments, phiStart, phiLength, wheelMAT.clone())
        let wheel2 = super.createSceneObjSphere(-6.5, 6.5, -3, radius, widthSegments, heightSegments, phiStart, phiLength, wheelMAT.clone())
        let wheel3 = super.createSceneObjSphere(6.5, -6.5, -3, radius, widthSegments, heightSegments, phiStart, phiLength, wheelMAT.clone())
        let wheel4 = super.createSceneObjSphere(6.5, 6.5, -3, radius, widthSegments, heightSegments, phiStart, phiLength, wheelMAT.clone())

        base.add(wheel1)
        base.add(wheel2)
        base.add(wheel3)
        base.add(wheel4)
        // position Robot's  Base
        this.position.set(x, y, z)
    }
}