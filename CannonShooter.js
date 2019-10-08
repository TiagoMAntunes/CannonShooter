class CannonShooter extends SceneObject {
	constructor(x, y, z) {
		super()

		// add base
		let base = new CannonShooterBase(x, y, z + 3)
		Object.defineProperty(this, "name", {value: "Base"})
		this.add(base)

		// add cannon
		//let cannon = new Cannon(x, y, z)
	}
}