class CannonShooterBase extends SceneObject {   
    constructor(x, y, z) {
        super()

        let baseMAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x6e7574})
        let boxThickness = 1
        let boxWidth = 30
        let boxDepth = 50
        let boxHeight = 5

        // add robot's base platform
        let bottom = super.createSceneObjBox(0, 0, 0, boxWidth, boxThickness, boxDepth, baseMAT.clone())
        this.add(bottom)

        // add robot's wheels
        let wall1 = super.createSceneObjBox(0, 3, -24.5, boxWidth - 2, boxHeight, boxThickness, baseMAT.clone())
        let wall2 = super.createSceneObjBox(0, 3, 24.5, boxWidth - 2, boxHeight, boxThickness, baseMAT.clone())
        let wall3 = super.createSceneObjBox(-14.5, 3, 0, boxThickness, boxHeight, boxDepth, baseMAT.clone())
        let wall4 = super.createSceneObjBox(14.5, 3, 0, boxThickness, boxHeight, boxDepth, baseMAT.clone())

        bottom.add(wall1)
        bottom.add(wall2)
        bottom.add(wall3)
        bottom.add(wall4)
        // position Robot's  Base
        this.position.set(x, y, z)
    }
}