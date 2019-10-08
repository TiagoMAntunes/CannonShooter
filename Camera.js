class Camera extends THREE.OrthographicCamera{
    constructor(x, y, z, vector){
        super(window.innerWidth/-2, window.innerWidth/2, window.innerHeight/2, window.innerHeight/-2, 1, 1000);

        this.position.set(x, y, z)

        this.lookAt(vector)

        this.zoom = 10

        this.updateProjectionMatrix()
    }

    rotateX(n){
        this.rotation.x = n
    }

    rotateY(n){
        this.rotation.y = n
    }

    rotateZ(n){
        this.rotation.z = n
    }
}