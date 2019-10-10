class SceneObject extends THREE.Object3D {
    constructor(x, y, z) {
        super()
        this.position.set(x, y, z)
    }

    createSceneObjBox(x, y, z, width, height, depth, material) {
        let geometry = new THREE.BoxGeometry(width, height, depth)
        let mesh = new THREE.Mesh(geometry, material)

        mesh.position.set(x, y, z)
        return mesh
    }

    createSceneObjSphere(x, y, z, radius, widthSegments, heightSegments, phiStart, phiLength, material) {
        let geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength)
        let mesh = new THREE.Mesh(geometry, material)
        
        mesh.position.set(x, y, z)
        return mesh
    }

    createSceneObjSphereRotY(x, y, z, radius, widthSegments, heightSegments, phiStart, phiLength, material, rotY) {
        let geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength)
        let mesh = new THREE.Mesh(geometry, material)
        
        mesh.position.set(x, y, z)
        mesh.rotation.y = rotY
        return mesh
    }

    createSceneObjCylinderRotX(x, y, z, radiusTop, radiusBottom, height, radialSegments, material, rotX) {
        let geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)
        let mesh = new THREE.Mesh(geometry, material)
        
        mesh.rotation.x = rotX
        mesh.position.set(x, y, z)
        return mesh
    }

    createSceneObjCylinderRotXYZ(x, y, z, radiusTop, radiusBottom, height, radialSegments, material, rotX, rotY, rotZ) {
        let geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)
        let mesh = new THREE.Mesh(geometry, material)
        
        mesh.rotation.x = rotX
        mesh.rotation.y = rotY
        mesh.rotation.z = rotZ
        mesh.position.set(x, y, z)
        return mesh
    }

    createSceneObjTorusRotXY(x, y, z, radius, tube, radialSegments, tubularSegments, material, rotX, rotY) {
        let geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments)
        let mesh = new THREE.Mesh(geometry, material)

        mesh.rotation.x = rotX
        mesh.rotation.y = rotY
        mesh.position.set(x, y, z)
        return mesh
    }

    getPosition(){
        return this.position
    }
}