import * as THREE from 'three'
class PlaneGeometry
{
    /**
     * Constructor
     */
    constructor(width, height, color)
    {
        this.width = width
        this.height = height
        this.color = color
    }

    /**
     * Methods
     */
    draw()
    {
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(this.width, this.height),
            new THREE.MeshBasicMaterial({ color : `#${this.color}`, side : THREE.DoubleSide})
        )
        return plane
    }
}

export default PlaneGeometry