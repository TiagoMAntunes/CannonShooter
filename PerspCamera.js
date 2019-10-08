class PerspCamera extends THREE.PerspectiveCamera{
    constructor(x, y, z, vector){
        super((70, window.innerWidth / window.innerHeight, 1, 1000))

        this.position.set(x, y, z)

        this.lookAt(vector)

        this.up.set(0, 0, 1);
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