class Arena extends SceneObject {   
    constructor(x, y, z) {
        super()

        let wallMAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x9fd4d4})
        let baseMAT = new THREE.MeshBasicMaterial({wireframe: true, color: 0x6e7574})
        let boxThickness = 1
        let boxWidth = 80
        let boxDepth = 60
        let boxHeight = 10

        // add arena's platform
        let bottom = super.createSceneObjBox(0, 0, 0, boxWidth, boxDepth, boxThickness, baseMAT.clone())
        this.add(bottom)

        // add arena's walls
        let wall1 = super.createSceneObjBox(0.5, -29.5, 5.5, boxWidth - 1, boxThickness, boxHeight, wallMAT.clone())
        let wall2 = super.createSceneObjBox(0.5, 29.5, 5.5, boxWidth - 1, boxThickness, boxHeight, wallMAT.clone())
        let wall3 = super.createSceneObjBox(-39.5, 0, 5.5, boxThickness, boxDepth, boxHeight, wallMAT.clone())

        bottom.add(wall1)
        bottom.add(wall2)
        bottom.add(wall3)

        // position Arena
        this.position.set(x, y, z)
    }
}