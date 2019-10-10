class Arena extends SceneObject {   
    constructor(x, y, z) {
        super()

        let baseMAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x6e7574})
        let boxThickness = 1
        let boxWidth = 50
        let boxDepth = 30
        let boxHeight = 5

        // add arena's platform
        let bottom = super.createSceneObjBox(0, 0, 0, boxWidth, boxThickness, boxDepth, baseMAT.clone())
        this.add(bottom)

        // add arena's walls
        let wall1 = super.createSceneObjBox(0.5, 3, -14.5, boxWidth - 1, boxHeight, boxThickness, baseMAT.clone())
        let wall2 = super.createSceneObjBox(0.5, 3, 14.5, boxWidth - 1, boxHeight, boxThickness, baseMAT.clone())
        let wall3 = super.createSceneObjBox(-24.5, 3, 0, boxThickness, boxHeight, boxDepth, baseMAT.clone())

        bottom.add(wall1)
        bottom.add(wall2)
        bottom.add(wall3)

        // position Arena
        this.position.set(x, y, z)
    }
}