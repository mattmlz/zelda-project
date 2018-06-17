import * as THREE from 'three'
class TorusGeometry
{
    /**
     * Constructor
     */
    constructor(radius, tube,radialSegments,tubularSegments,arc, color)
    {
        this.radius = radius
        this.tube = tube
        this.radialSegments = radialSegments
        this.tubularSegments = tubularSegments
        this.arc = arc
        this.color = color
    }

    /**
     * Methods
     */
    draw()
    {
        const textureLoader = new THREE.TextureLoader()
        const ring = textureLoader.load('./../assets/images/ring.png')
        ring.offset.y = .55
        ring.repeat.set(2,2)
        ring.wrapS = THREE.RepeatWrapping;
        ring.wrapT = THREE.RepeatWrapping;
        const torus = new THREE.Mesh(
            new THREE.TorusGeometry(this.radius, this.tube, this.radialSegments, this.tubularSegments, this.arc),
            new THREE.MeshBasicMaterial({ color : `#${this.color}`, map: ring })
        )
        return torus
    }
}

export default TorusGeometry